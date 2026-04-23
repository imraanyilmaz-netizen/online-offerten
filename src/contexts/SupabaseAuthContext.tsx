'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
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
  ) => Promise<{ error: any; session: Session | null }>
  signOut: () => Promise<{ error: any }>
  updateUserPassword: (newPassword: string) => Promise<{ data: any; error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/** GoTrue / getSession / getUser hataları: oturumu tamamen temizlemek gerekir. */
function shouldInvalidateAuthError(error: { message?: string; code?: string } | null | undefined): boolean {
  if (!error) return false
  const code = error.code
  if (
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
    msg.includes('jwt expired') ||
    msg.includes('invalid jwt') ||
    raw.includes('JWT')
  )
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast()

  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  /** Verhindert ewiges loading=true wenn getSession/getUser hängen (Navbar / Dashboard). */
  useEffect(() => {
    const t = window.setTimeout(() => {
      setLoading((prev) => {
        if (!prev) return prev
        if (process.env.NODE_ENV === 'development') {
          console.warn('[AuthContext] Auth-Init dauert ungewöhnlich lange — loading wird freigegeben')
        }
        return false
      })
    }, 20000)
    return () => clearTimeout(t)
  }, [])

  const handleSession = useCallback((session: Session | null) => {
    setSession(session)
    setUser(session?.user ?? null)
    setLoading(false)
  }, [])

  const invalidateBrokenSession = useCallback(async (reason: string) => {
    try {
      // Use scope:'local' so only THIS device/tab is signed out.
      // Without a scope, Supabase defaults to 'global' which revokes ALL
      // sessions for the user across every device — causing other devices to
      // be kicked out just because one device had a transient JWT error.
      await supabase.auth.signOut({ scope: 'local' })
    } catch (signOutError) {
      void signOutError
    }
    handleSession(null)
  }, [handleSession, supabase])

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

          handleSession(session)
        } catch (e) {
          const err = e as { message?: string; code?: string }
          if ((e as { name?: string })?.name === 'AbortError') {
            if (process.env.NODE_ENV === 'development') {
              console.warn('[AuthContext] getSession aborted (lock contention) — keeping loading=true, will retry via onAuthStateChange')
            }
            // Do NOT set loading=false here. User stays null while loading=true,
            // which keeps the dashboard skeleton visible instead of triggering a
            // redirect to /login. The onAuthStateChange subscription (which is
            // still active) will fire the next auth event and call handleSession,
            // properly resolving loading. The 20-second timeout is the safety net.
            return
          }
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
        (event: string, session: Session | null) => {
          // INITIAL_SESSION: normally getSession() handles this, but if getSession()
          // threw an AbortError (lock contention) we still need INITIAL_SESSION to
          // set the correct auth state. Calling handleSession twice with the same
          // data is harmless — the second call is a no-op if state hasn't changed.
          // So we let INITIAL_SESSION through as a reliable fallback.

          if (session?.user && !session.user.id) {
            void invalidateBrokenSession('Session missing user.id in onAuthStateChange')
            return
          }

          handleSession(session)
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
  }, [handleSession, invalidateBrokenSession, supabase])

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      void data

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
      }

      return { error, session: data?.session ?? null }
    },
    [toast, supabase]
  )

  const signOut = useCallback(async () => {
    // 1️⃣ Supabase oturumunu kapat
    try {
      await supabase.auth.signOut()
    } catch (e) {
      void e
    }

    // 2️⃣ Auth state'i hemen sıfırla
    setUser(null)
    setSession(null)

    return { error: null }
  }, [supabase])

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



