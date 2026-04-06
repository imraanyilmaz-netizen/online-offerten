'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { useToast } from '@/src/components/ui/use-toast'
import { createClient } from '@/src/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, options?: any) => Promise<{ error: any }>
  signIn: (
    email: string,
    password: string,
    options?: { silent?: boolean }
  ) => Promise<{ error: any }>
  signOut: () => Promise<{ error: any }>
  updateUserPassword: (newPassword: string) => Promise<{ data: any; error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const AUTH_COOKIE_NAME = 'sb-uhkiaodpzvhsuqfrwgih-auth-token'

/** GoTrue / getSession / getUser hataları: oturumu tamamen temizlemek gerekir. */
function shouldInvalidateAuthError(error: { message?: string; code?: string } | null | undefined): boolean {
  if (!error) return false
  const code = error.code
  if (
    code === 'refresh_token_not_found' ||
    code === 'refresh_token_already_used' ||
    code === 'session_expired' ||
    code === 'session_not_found' ||
    code === 'bad_jwt'
  ) {
    return true
  }
  const msg = (error.message || '').toLowerCase()
  const raw = error.message || ''
  return (
    msg.includes('missing sub claim') ||
    msg.includes('invalid claim') ||
    msg.includes('invalid refresh token') ||
    msg.includes('refresh token not found') ||
    msg.includes('refresh_token') ||
    msg.includes('jwt expired') ||
    msg.includes('invalid jwt') ||
    raw.includes('JWT')
  )
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast()
  const recoveryHandled = useRef(false)

  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const clearClientAuthStorage = useCallback(() => {
    if (typeof window === 'undefined') return

    const authStorageKeys = Object.keys(localStorage).filter(
      (key) => key.includes('supabase') || key.includes('auth-token')
    )
    authStorageKeys.forEach((key) => localStorage.removeItem(key))
    sessionStorage.clear()

    document.cookie.split(';').forEach((rawCookie) => {
      const cookieName = rawCookie.split('=')[0]?.trim()
      if (!cookieName) return
      if (cookieName.includes('auth-token') || cookieName === AUTH_COOKIE_NAME || cookieName.startsWith(`${AUTH_COOKIE_NAME}.`)) {
        document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`
      }
    })
  }, [])

  const handleSession = useCallback(async (session: Session | null) => {
    console.log('[AuthContext] handleSession called:', { 
      hasSession: !!session, 
      userEmail: session?.user?.email,
      userRole: session?.user?.user_metadata?.role 
    })
    setSession(session)
    setUser(session?.user ?? null)
    setLoading(false)
  }, [])

  const invalidateBrokenSession = useCallback(async (reason: string) => {
    console.warn('[AuthContext] Invalid session detected:', reason)
    try {
      await supabase.auth.signOut()
    } catch (signOutError) {
      console.warn('[AuthContext] Error during signOut while invalidating session:', signOutError)
    }
    clearClientAuthStorage()
    await handleSession(null)
  }, [clearClientAuthStorage, handleSession, supabase])

  const validateSessionWithServer = useCallback(async (session: Session | null) => {
    if (!session) return null

    const { data: { user: verifiedUser }, error: userError } = await supabase.auth.getUser()
    if (userError || !verifiedUser) {
      await invalidateBrokenSession(userError?.message || userError?.code || 'getUser failed')
      return null
    }

    return { ...session, user: verifiedUser } as Session
  }, [invalidateBrokenSession, supabase])

  useEffect(() => {
    const initAuth = () => {
      const getSession = async () => {
        try {
          const { data: { session }, error } = await supabase.auth.getSession()

          if (error && shouldInvalidateAuthError(error)) {
            await invalidateBrokenSession(error.message || error.code || 'getSession error')
            return
          }

          // Validate session has proper user structure
          if (session?.user && !session.user.id) {
            await invalidateBrokenSession('Session missing user.id')
            return
          }

          const validatedSession = await validateSessionWithServer(session)
          await handleSession(validatedSession)
        } catch (e) {
          const err = e as { message?: string; code?: string }
          if (shouldInvalidateAuthError(err)) {
            await invalidateBrokenSession(err.message || err.code || 'getSession threw')
            return
          }
          console.error('[AuthContext] getSession unexpected error:', e)
          setLoading(false)
        }
      }

      getSession()

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('[AuthContext] onAuthStateChange:', { 
            event, 
            hasSession: !!session,
            userEmail: session?.user?.email,
            userRole: session?.user?.user_metadata?.role 
          })
          
          // Handle token refresh errors
          if (event === 'TOKEN_REFRESHED' && !session) {
            await invalidateBrokenSession('Token refresh failed')
            return
          }
          
          // Validate session on auth state change
          if (session?.user && !session.user.id) {
            await invalidateBrokenSession('Session missing user.id in onAuthStateChange')
            return
          }

          // PASSWORD_RECOVERY: Session kommt direkt nach gültigem Recovery-Link – kein zusätzliches getUser(),
          // sonst kann validateSessionWithServer hängen oder die Recovery-Session fälschlich invalidieren.
          if (event === 'PASSWORD_RECOVERY' && session && !recoveryHandled.current) {
            recoveryHandled.current = true
            console.log('[AuthContext] PASSWORD_RECOVERY detected, applying session without extra getUser() round-trip')
            await handleSession(session)
            return
          }

          const validatedSession = await validateSessionWithServer(session)
          await handleSession(validatedSession)
        }
      )

      return () => subscription.unsubscribe()
    }

    // Always initialize auth immediately so Navbar/session state is ready on first paint.
    // (Deferred requestIdleCallback caused long or stuck "loading" on public pages.)
    const cleanupFn = initAuth()

    return () => {
      cleanupFn()
    }
  }, [handleSession, invalidateBrokenSession, supabase, validateSessionWithServer])

  const signUp = useCallback(async (email: string, password: string, options?: any) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'https://online-offerten.ch/email-confirmed',
        ...options,
      },
    })

    if (error) {
      let errorMessage = error.message || "Etwas ist schief gelaufen"
      // Übersetze häufige Fehlermeldungen
      if (error.message?.toLowerCase().includes('email not confirmed') || error.message?.toLowerCase().includes('email_not_confirmed')) {
        errorMessage = "E-Mail nicht bestätigt"
      } else if (error.message?.toLowerCase().includes('invalid login')) {
        errorMessage = "Ungültige Anmeldedaten"
      } else if (error.message?.toLowerCase().includes('user already registered')) {
        errorMessage = "Benutzer ist bereits registriert"
      }
      toast({
        variant: "destructive",
        title: "Registrierung fehlgeschlagen",
        description: errorMessage,
      })
    }

    return { error }
  }, [toast, supabase])

  const signIn = useCallback(
    async (email: string, password: string, options?: { silent?: boolean }) => {
      const silent = options?.silent === true
      console.log('[AuthContext] signIn called:', { email })
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('[AuthContext] signIn result:', {
        hasError: !!error,
        errorMessage: error?.message,
        hasSession: !!data?.session,
        userEmail: data?.session?.user?.email,
        userRole: data?.session?.user?.user_metadata?.role,
      })

      if (error) {
        let errorMessage = error.message || 'Etwas ist schief gelaufen'
        if (
          error.message?.toLowerCase().includes('email not confirmed') ||
          error.message?.toLowerCase().includes('email_not_confirmed')
        ) {
          errorMessage = 'E-Mail nicht bestätigt'
        } else if (
          error.message?.toLowerCase().includes('invalid login') ||
          error.message?.toLowerCase().includes('invalid credentials')
        ) {
          errorMessage = 'Ungültige Anmeldedaten'
        } else if (error.message?.toLowerCase().includes('user not found')) {
          errorMessage = 'Benutzer nicht gefunden'
        } else if (error.message?.toLowerCase().includes('wrong password')) {
          errorMessage = 'Falsches Passwort'
        }
        if (!silent) {
          toast({
            variant: 'destructive',
            title: 'Anmeldung fehlgeschlagen',
            description: errorMessage,
          })
        }
      } else {
        console.log('[AuthContext] signIn successful, session should be set')
      }

      return { error }
    },
    [toast, supabase]
  )

  const signOut = useCallback(async () => {
    // 1️⃣ Supabase oturumunu kapat
    try {
      await supabase.auth.signOut()
    } catch (e) {
      console.warn('[AuthContext] signOut error (ignored):', e)
    }

    // 2️⃣ Auth state'i hemen sıfırla
    setUser(null)
    setSession(null)

    // 3️⃣ Auth storage/cookie temizliği
    clearClientAuthStorage()

    return { error: null }
  }, [clearClientAuthStorage, supabase])

  const updateUserPassword = useCallback(async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      toast({
        variant: "destructive",
        title: "Passwortaktualisierung fehlgeschlagen",
        description: error.message || "Etwas ist schiefgelaufen.",
      })
    } else {
      toast({
        title: "Passwort erfolgreich aktualisiert",
        description: "Ihr Passwort wurde erfolgreich geändert.",
      })
    }
    return { data, error }
  }, [toast, supabase])

  const value = useMemo(() => ({
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateUserPassword,
  }), [user, session, loading, signUp, signIn, signOut, updateUserPassword])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}



