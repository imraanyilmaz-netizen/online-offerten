'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast()
  const pathname = usePathname()

  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const handleSession = useCallback(async (session: Session | null) => {
    setSession(session)
    setUser(session?.user ?? null)
    setLoading(false)
  }, [])

  useEffect(() => {
    const initAuth = () => {
      const getSession = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        handleSession(session)
      }

      getSession()

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          handleSession(session)
        }
      )

      return () => subscription.unsubscribe()
    }

    // Defer auth initialization to improve initial page load
    const needsImmediateAuth = 
      pathname?.startsWith('/admin-dashboard') ||
      pathname?.startsWith('/partner/dashboard') ||
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
  }, [handleSession, pathname, supabase])

  const signUp = useCallback(async (email: string, password: string, options?: any) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options,
    })

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign up Failed",
        description: error.message || "Something went wrong",
      })
    }

    return { error }
  }, [toast, supabase])

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign in Failed",
        description: error.message || "Something went wrong",
      })
    }

    return { error }
  }, [toast, supabase])

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut()

    if (error && error.message !== 'Session from session_id claim in JWT does not exist' && error.message !== 'Authentifizierungssitzung nicht gefunden.') {
      toast({
        variant: "destructive",
        title: "Sign out Failed",
        description: error.message || "Something went wrong",
      })
      return { error }
    }
    
    return { error: null }
  }, [toast, supabase])

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

