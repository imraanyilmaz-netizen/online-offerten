'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { createClient } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, options?: any) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<{ error: any }>
  updateUserPassword: (newPassword: string) => Promise<{ data: any; error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const AUTH_COOKIE_NAME = 'sb-uhkiaodpzvhsuqfrwgih-auth-token'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast()
  const pathname = usePathname()
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
      await invalidateBrokenSession(userError?.message || 'getUser failed')
      return null
    }

    return { ...session, user: verifiedUser } as Session
  }, [invalidateBrokenSession, supabase])

  useEffect(() => {
    const initAuth = () => {
      const getSession = async () => {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        // Check for invalid token errors (missing sub claim, refresh token not found, etc.)
        if (error && (
          error.message?.includes('missing sub claim') || 
          error.message?.includes('invalid claim') ||
          error.message?.includes('JWT') ||
          error.message?.includes('Invalid Refresh Token') ||
          error.message?.includes('Refresh Token Not Found') ||
          error.message?.includes('refresh_token')
        )) {
          await invalidateBrokenSession(error.message)
          return
        }
        
        // Validate session has proper user structure
        if (session?.user && !session.user.id) {
          await invalidateBrokenSession('Session missing user.id')
          return
        }

        const validatedSession = await validateSessionWithServer(session)
        await handleSession(validatedSession)
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

          // PASSWORD_RECOVERY event: Kullanıcı şifre sıfırlama linkine tıkladı
          if (event === 'PASSWORD_RECOVERY' && session && !recoveryHandled.current) {
            recoveryHandled.current = true
            console.log('[AuthContext] PASSWORD_RECOVERY detected, session ready for password update')
            const validatedRecoverySession = await validateSessionWithServer(session)
            await handleSession(validatedRecoverySession)
            return
          }

          const validatedSession = await validateSessionWithServer(session)
          await handleSession(validatedSession)
        }
      )

      return () => subscription.unsubscribe()
    }

    // Defer auth initialization to improve initial page load
    const needsImmediateAuth = 
      pathname?.startsWith('/admin-dashboard') ||
      pathname?.startsWith('/partner/dashboard') ||
      pathname?.startsWith('/update-password') ||
      ['/login', '/forgot-password', '/partner-werden'].includes(pathname || '')

    let timeoutId: NodeJS.Timeout | number | null = null
    let cleanupFn: (() => void) | null = null

    if (needsImmediateAuth) {
      cleanupFn = initAuth()
    } else {
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        timeoutId = requestIdleCallback(initAuth as any, { timeout: 2000 })
      } else {
        timeoutId = setTimeout(initAuth, 100)
      }
    }

    return () => {
      if (timeoutId) {
        if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
          cancelIdleCallback(timeoutId as number)
        } else {
          clearTimeout(timeoutId as NodeJS.Timeout)
        }
      }
      if (cleanupFn) cleanupFn()
    }
  }, [handleSession, invalidateBrokenSession, pathname, supabase, validateSessionWithServer])

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

  const signIn = useCallback(async (email: string, password: string) => {
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
      userRole: data?.session?.user?.user_metadata?.role 
    })

    if (error) {
      let errorMessage = error.message || "Etwas ist schief gelaufen"
      // Übersetze häufige Fehlermeldungen
      if (error.message?.toLowerCase().includes('email not confirmed') || error.message?.toLowerCase().includes('email_not_confirmed')) {
        errorMessage = "E-Mail nicht bestätigt"
      } else if (error.message?.toLowerCase().includes('invalid login') || error.message?.toLowerCase().includes('invalid credentials')) {
        errorMessage = "Ungültige Anmeldedaten"
      } else if (error.message?.toLowerCase().includes('user not found')) {
        errorMessage = "Benutzer nicht gefunden"
      } else if (error.message?.toLowerCase().includes('wrong password')) {
        errorMessage = "Falsches Passwort"
      }
      toast({
        variant: "destructive",
        title: "Anmeldung fehlgeschlagen",
        description: errorMessage,
      })
    } else {
      console.log('[AuthContext] signIn successful, session should be set')
    }

    return { error }
  }, [toast, supabase])

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



