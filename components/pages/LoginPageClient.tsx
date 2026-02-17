'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/SupabaseAuthContext'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, Eye, EyeOff } from 'lucide-react'
// framer-motion removed - CSS for better INP
import RegistrationForm from '@/components/PartnerRegistrationForm/RegistrationForm'
import { createClient } from '@/lib/supabase/client'

const COOKIE_NAME = 'sb-uhkiaodpzvhsuqfrwgih-auth-token'

// Helper function to wait for cookie to be set
const waitForCookie = async (maxWait = 2000): Promise<boolean> => {
  const startTime = Date.now()
  while (Date.now() - startTime < maxWait) {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [name, ...rest] = cookie.trim().split('=')
      if (name && rest.length > 0) {
        acc[name] = decodeURIComponent(rest.join('='))
      }
      return acc
    }, {} as Record<string, string>)
    
    // Check if cookie exists (either full cookie or split cookies)
    if (cookies[COOKIE_NAME] || cookies[`${COOKIE_NAME}.0`]) {
      console.log('[LoginPage] Cookie found, ready to redirect')
      return true
    }
    
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  console.warn('[LoginPage] Cookie not found after waiting')
  return false
}

const LoginPageClient = () => {
  const { signIn } = useAuth()
  const { toast } = useToast()
  const searchParams = useSearchParams()

  const pageTitle = "Partner Login"
  const welcomeMessage = "Willkommen zurück!"
  const pageSubtitle = "Bitte geben Sie Ihre Daten ein, um sich anzumelden."

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [view, setView] = useState(searchParams?.toString().includes('register') ? 'register' : 'login')

  // Kullanıcı zaten giriş yapmışsa paneline yönlendir
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const userRole = session.user?.user_metadata?.role
        if (userRole === 'admin' || userRole === 'editor') {
          window.location.href = '/admin-dashboard'
        } else if (userRole === 'partner') {
          window.location.href = '/partner/dashboard'
        } else {
          window.location.href = '/'
        }
      }
    }
    checkSession()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    console.log('[LoginPage] handleLogin called:', { email })

    const { error } = await signIn(email, password)

    console.log('[LoginPage] signIn result:', { hasError: !!error, errorMessage: error?.message })

    if (!error) {
      console.log('[LoginPage] Login successful, waiting for auth state change...')
      
      // Wait for onAuthStateChange event to fire and session to be saved
      const supabase = createClient()
      
      // Wait for SIGNED_IN event
      await new Promise<void>((resolve) => {
        const timeout = setTimeout(() => {
          console.warn('[LoginPage] Auth state change timeout, proceeding anyway')
          resolve()
        }, 2000)
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          console.log('[LoginPage] Auth state change:', { event, hasSession: !!session })
          if (event === 'SIGNED_IN' && session) {
            clearTimeout(timeout)
            subscription.unsubscribe()
            resolve()
          }
        })
      })
      
      // Wait a bit more for localStorage to be updated
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Get session to determine user role
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError || !session) {
        console.error('[LoginPage] Failed to get session after login:', sessionError)
        toast({
          variant: "destructive",
          title: "Fehler",
          description: "Session konnte nicht abgerufen werden.",
        })
        setIsSubmitting(false)
        return
      }

      const userRole = session.user?.user_metadata?.role
      console.log('[LoginPage] User role detected:', userRole)

      // Debug: Check all localStorage keys
      const allKeys = Object.keys(localStorage)
      const supabaseKeys = allKeys.filter(key => key.includes('supabase') || key.includes('auth-token'))
      console.log('[LoginPage] localStorage keys:', { allKeys, supabaseKeys })

      // Manually sync localStorage to cookie as backup
      // This ensures cookie is set before redirect
      let sessionValue = localStorage.getItem(COOKIE_NAME)
      
      // If not found with exact name, try to find any Supabase auth token
      if (!sessionValue) {
        for (const key of supabaseKeys) {
          if (key.includes('auth-token')) {
            sessionValue = localStorage.getItem(key)
            console.log('[LoginPage] Found session in different key:', key)
            break
          }
        }
      }
      
      if (sessionValue) {
        // Cookie is now handled by the storage adapter with automatic splitting.
        // Just trigger a re-sync by reading the storage (getItem syncs to cookie).
        const supabaseForSync = createClient()
        await supabaseForSync.auth.getSession() // This triggers getItem → setCookieWithSplit
        
        console.log('[LoginPage] Cookie synced via storage adapter')
        
        // Verify cookie was set
        await new Promise(resolve => setTimeout(resolve, 200))
        const cookiesAfter = document.cookie
        const cookieSet = cookiesAfter.includes(COOKIE_NAME)
        console.log('[LoginPage] Cookie verification:', { cookieSet })
        
        if (!cookieSet) {
          console.error('[LoginPage] ❌ Cookie was NOT set! Attempting manual fallback...')
          // Manual fallback: set minimal cookie for middleware
          try {
            const fullSession = JSON.parse(sessionValue)
            const minimal = JSON.stringify({
              access_token: fullSession.access_token,
              user: {
                id: fullSession.user?.id,
                email: fullSession.user?.email,
                user_metadata: { role: fullSession.user?.user_metadata?.role }
              }
            })
            const expires = new Date()
            expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000)
            const secureFlag = window.location.protocol === 'https:' ? 'Secure;' : ''
            document.cookie = `${COOKIE_NAME}=${encodeURIComponent(minimal)}; path=/; expires=${expires.toUTCString()}; SameSite=Lax; ${secureFlag}`
            console.log('[LoginPage] Manual minimal cookie set as fallback')
          } catch (e) {
            console.error('[LoginPage] Manual fallback failed:', e)
          }
        }
      } else {
        console.warn('[LoginPage] No session value in localStorage to sync', { 
          checkedKey: COOKIE_NAME,
          supabaseKeys 
        })
      }

      // Wait for cookie to be set before redirecting
      console.log('[LoginPage] Waiting for cookie to be set...')
      const cookieReady = await waitForCookie(1000)
      
      if (!cookieReady) {
        console.warn('[LoginPage] Cookie not ready, but proceeding with redirect anyway')
      }

      // Redirect based on role using window.location.href for full page reload
      // This ensures middleware intercepts the request properly
      if (userRole === 'admin' || userRole === 'editor') {
        console.log('[LoginPage] Redirecting admin/editor to /admin-dashboard')
        toast({
          title: "Anmeldung erfolgreich",
          description: userRole === 'editor' ? "Sie werden zum Ratgeber-Bereich weitergeleitet..." : "Sie werden zum Admin-Dashboard weitergeleitet...",
        })
        window.location.href = '/admin-dashboard'
      } else if (userRole === 'partner') {
        console.log('[LoginPage] Redirecting partner to /partner/dashboard')
        toast({
          title: "Anmeldung erfolgreich",
          description: "Sie werden zum Partner-Dashboard weitergeleitet...",
        })
        window.location.href = '/partner/dashboard'
      } else {
        console.log('[LoginPage] No specific role, redirecting to home')
      toast({
        title: "Anmeldung erfolgreich",
        description: "Sie werden weitergeleitet...",
      })
        window.location.href = '/'
      }
    } else {
      console.log('[LoginPage] Login failed:', error?.message)
      toast({
        variant: "destructive",
        title: "Anmeldung fehlgeschlagen",
        description: "Bitte überprüfen Sie Ihre E-Mail und Ihr Passwort.",
      })
      setIsSubmitting(false)
    }
  }

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  }
  
  const cardVariants = {
    login: { height: 'auto' },
    register: { height: 'auto' },
  }

  return (
    <div 
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 via-gray-50 to-blue-100 py-4 px-4 transition-all duration-500"
    >
      <div
        className={`w-full ${view === 'login' ? 'max-w-md' : 'max-w-navbar'} shadow-2xl rounded-2xl bg-white/80 backdrop-blur-sm border-none overflow-hidden transition-all duration-300`}
      >
        
          {view === 'login' ? (
            <div
              key="login"
            >
              <Card className="w-full border-none bg-transparent shadow-none">
                <CardHeader className="text-center p-8">
                  <CardTitle className="text-3xl md:text-4xl font-extrabold text-black">
                    {pageTitle}
                  </CardTitle>
                  <CardDescription className="mt-3 text-gray-600">
                    {welcomeMessage} {pageSubtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-semibold text-gray-700">E-Mail-Adresse</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="ihre.email@beispiel.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/70"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                          <Label htmlFor="password" className="font-semibold text-gray-700">Passwort</Label>
                          <Link href="/forgot-password" className="text-sm font-medium text-green-600 hover:text-green-500 hidden md:inline">
                              Passwort vergessen?
                          </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="bg-white/70 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105" disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Anmelden
                    </Button>
                  </form>
                  <div className="mt-6 text-center text-sm">
                    Noch kein Partner?{' '}
                    <button onClick={() => setView('register')} className="font-medium text-green-600 hover:text-green-500">
                      Jetzt registrieren
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div
              key="register"
            >
              <RegistrationForm embedded={true} onBackToLogin={() => setView('login')} />
            </div>
          )}
        
      </div>
    </div>
  )
}

export default LoginPageClient



