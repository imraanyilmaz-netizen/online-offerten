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

const clearClientAuthArtifacts = () => {
  if (typeof window === 'undefined') return

  const authStorageKeys = Object.keys(localStorage).filter(
    (key) => key.includes('supabase') || key.includes('auth-token')
  )
  authStorageKeys.forEach((key) => localStorage.removeItem(key))
  sessionStorage.clear()

  document.cookie.split(';').forEach((rawCookie) => {
    const cookieName = rawCookie.split('=')[0]?.trim()
    if (!cookieName) return
    if (cookieName.includes('auth-token') || cookieName === COOKIE_NAME || cookieName.startsWith(`${COOKIE_NAME}.`)) {
      document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`
    }
  })
}

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

const syncAuthCookieFromSession = async (session: any): Promise<boolean> => {
  if (!session?.access_token || !session?.user?.id) return false

  const minimalSession = {
    access_token: session.access_token,
    user: {
      id: session.user.id,
      email: session.user.email,
      user_metadata: {
        role: session.user?.user_metadata?.role
      }
    }
  }

  const expires = new Date()
  expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days
  const secureFlag = window.location.protocol === 'https:' ? 'Secure;' : ''
  const cookieValue = encodeURIComponent(JSON.stringify(minimalSession))

  const MAX_COOKIE_SIZE = 3800
  if (cookieValue.length > MAX_COOKIE_SIZE) {
    let index = 0
    let offset = 0
    while (offset < cookieValue.length) {
      const chunk = cookieValue.substring(offset, offset + MAX_COOKIE_SIZE)
      const cookieName = index === 0 ? COOKIE_NAME : `${COOKIE_NAME}.${index}`
      document.cookie = `${cookieName}=${chunk}; path=/; expires=${expires.toUTCString()}; SameSite=Lax; ${secureFlag}`
      offset += MAX_COOKIE_SIZE
      index++
    }
  } else {
    document.cookie = `${COOKIE_NAME}=${cookieValue}; path=/; expires=${expires.toUTCString()}; SameSite=Lax; ${secureFlag}`
  }

  // Ensure cookie is readable before redirecting to protected route.
  return waitForCookie(600)
}

/** Eine klare Meldung pro Fehlerfall (gleiche Logik wie AuthContext, für Inline-Anzeige) */
function mapLoginErrorMessage(error: { message?: string } | null): string {
  if (!error?.message) {
    return 'Bitte überprüfen Sie Ihre E-Mail und Ihr Passwort.'
  }
  const m = error.message.toLowerCase()
  if (m.includes('email not confirmed') || m.includes('email_not_confirmed')) {
    return 'E-Mail-Adresse noch nicht bestätigt. Bitte prüfen Sie Ihren Posteingang.'
  }
  if (m.includes('invalid login') || m.includes('invalid credentials')) {
    return 'E-Mail oder Passwort ist nicht korrekt.'
  }
  if (m.includes('user not found')) {
    return 'Kein Konto mit dieser E-Mail-Adresse gefunden.'
  }
  if (m.includes('wrong password')) {
    return 'Das Passwort ist nicht korrekt.'
  }
  return 'Bitte überprüfen Sie Ihre E-Mail und Ihr Passwort.'
}

const LoginPageClient = () => {
  const { signIn, user, loading } = useAuth()
  const { toast } = useToast()
  const searchParams = useSearchParams()

  const pageTitle = 'Partner Login'
  const welcomeMessage = 'Willkommen zurück!'
  const pageSubtitle = 'Bitte geben Sie Ihre Daten ein, um sich anzumelden.'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRedirectingAfterLogin, setIsRedirectingAfterLogin] = useState(false)
  const [isValidatingCurrentSession, setIsValidatingCurrentSession] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [view, setView] = useState(searchParams?.toString().includes('register') ? 'register' : 'login')
  const [loginFormError, setLoginFormError] = useState<string | null>(null)
  const [failedLoginAttempts, setFailedLoginAttempts] = useState(0)

  /** Passwort-vergessen-Seite mit vorausgefüllter E-Mail (professioneller Flow) */
  const forgotPasswordHref =
    email.trim().length > 0
      ? `/forgot-password?email=${encodeURIComponent(email.trim())}`
      : '/forgot-password'

  // Keep /login loop-safe: validate current session first, then redirect if valid.

  const getDashboardHrefByRole = (role?: string) => {
    if (role === 'admin' || role === 'editor') return '/admin-dashboard'
    if (role === 'partner') return '/partner/dashboard'
    return '/'
  }

  useEffect(() => {
    let isMounted = true

    const validateCurrentSession = async () => {
      if (loading) return

      if (!user) {
        if (isMounted) {
          setIsValidatingCurrentSession(false)
        }
        return
      }

      setIsValidatingCurrentSession(true)
      const supabase = createClient()
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()

      if (!isMounted) return

      if (sessionError || !session?.access_token || !session?.user?.id) {
        console.warn('[LoginPage] Existing session missing/invalid, clearing auth artifacts', sessionError?.message)
        try {
          await supabase.auth.signOut()
        } catch (signOutError) {
          console.warn('[LoginPage] signOut during session validation failed:', signOutError)
        }
        clearClientAuthArtifacts()
        setIsValidatingCurrentSession(false)
        return
      }

      const { data: { user: verifiedUser }, error: userError } = await supabase.auth.getUser(session.access_token)
      if (userError || !verifiedUser) {
        console.warn('[LoginPage] Existing session failed server validation, clearing auth artifacts', userError?.message)
        try {
          await supabase.auth.signOut()
        } catch (signOutError) {
          console.warn('[LoginPage] signOut during getUser validation failed:', signOutError)
        }
        clearClientAuthArtifacts()
        setIsValidatingCurrentSession(false)
        return
      }

      const cookieReady = await syncAuthCookieFromSession(session)
      if (!cookieReady) {
        console.warn('[LoginPage] Cookie sync failed for existing session, forcing re-login')
        try {
          await supabase.auth.signOut()
        } catch (signOutError) {
          console.warn('[LoginPage] signOut after cookie sync failure failed:', signOutError)
        }
        clearClientAuthArtifacts()
        setIsValidatingCurrentSession(false)
        return
      }

      setIsValidatingCurrentSession(false)
      const redirectTarget = getDashboardHrefByRole(verifiedUser.user_metadata?.role)
      window.location.replace(redirectTarget)
    }

    validateCurrentSession()
    return () => {
      isMounted = false
    }
  }, [loading, user])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginFormError(null)
    setIsSubmitting(true)
    console.log('[LoginPage] handleLogin called:', { email })

    const { error } = await signIn(email, password, { silent: true })

    console.log('[LoginPage] signIn result:', { hasError: !!error, errorMessage: error?.message })

    if (!error) {
      setFailedLoginAttempts(0)
      console.log('[LoginPage] Login successful, waiting for auth state change...')
      setIsRedirectingAfterLogin(true)
      
      // Wait for onAuthStateChange event to fire and session to be saved
      const supabase = createClient()
      
      // Wait for SIGNED_IN event
      await new Promise<void>((resolve) => {
        const timeout = setTimeout(() => {
          console.warn('[LoginPage] Auth state change timeout, proceeding anyway')
          resolve()
        }, 800)
        
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
      await new Promise(resolve => setTimeout(resolve, 100))
      
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

      // Build cookie payload from current verified session (not from localStorage keys).
      if (session?.access_token && session?.user?.id) {
        const cookieReady = await syncAuthCookieFromSession(session)
        if (!cookieReady) {
          console.error('[LoginPage] ❌ Cookie sync failed after login')
          toast({
            variant: "destructive",
            title: "Fehler",
            description: "Anmeldung konnte nicht stabilisiert werden. Bitte erneut versuchen.",
          })
          setIsRedirectingAfterLogin(false)
          setIsSubmitting(false)
          return
        }
      } else {
        console.warn('[LoginPage] No valid session data available to sync cookie')
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
      setIsRedirectingAfterLogin(false)
      setFailedLoginAttempts((n) => n + 1)
      setLoginFormError(mapLoginErrorMessage(error))
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

  if (isRedirectingAfterLogin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 via-gray-50 to-blue-100 py-4 px-4">
        <div className="w-full max-w-md shadow-2xl rounded-2xl bg-white/80 backdrop-blur-sm border-none overflow-hidden p-8 text-center">
          <h1 className="text-2xl font-bold text-black mb-2">Anmeldung wird abgeschlossen</h1>
          <p className="text-gray-600">Bitte einen Moment warten...</p>
        </div>
      </div>
    )
  }

  if (!loading && user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 via-gray-50 to-blue-100 py-4 px-4">
        <div className="w-full max-w-md shadow-2xl rounded-2xl bg-white/80 backdrop-blur-sm border-none overflow-hidden p-8 text-center">
          <h1 className="text-2xl font-bold text-black mb-2">Sitzung wird überprüft</h1>
          <p className="text-gray-600">{isValidatingCurrentSession ? 'Bitte einen Moment warten...' : 'Weiterleitung wird vorbereitet...'}</p>
        </div>
      </div>
    )
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
                    {loginFormError && (
                      <div
                        role="alert"
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-left text-sm text-red-900"
                      >
                        <p className="font-semibold text-red-950">Anmeldung fehlgeschlagen</p>
                        <p className="mt-1 text-red-800">{loginFormError}</p>
                      </div>
                    )}
                    {failedLoginAttempts >= 3 && (
                      <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 text-left text-sm text-amber-950">
                        <p className="leading-relaxed">
                          Mehrere Anmeldeversuche sind fehlgeschlagen. Sie können Ihr Passwort zurücksetzen – wir senden
                          Ihnen einen Link per E-Mail.
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-3 w-full border-amber-300 bg-white font-semibold text-amber-950 hover:bg-amber-100"
                          asChild
                        >
                          <Link href={forgotPasswordHref}>Passwort zurücksetzen</Link>
                        </Button>
                      </div>
                    )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-semibold text-gray-700">E-Mail-Adresse</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="ihre.email@beispiel.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          setLoginFormError(null)
                          setFailedLoginAttempts(0)
                        }}
                        onInput={(e) => {
                          e.currentTarget.setCustomValidity('')
                        }}
                        onInvalid={(e) => {
                          const el = e.currentTarget
                          if (el.validity.valueMissing) {
                            el.setCustomValidity('Bitte geben Sie Ihre E-Mail-Adresse ein.')
                          } else if (el.validity.typeMismatch) {
                            el.setCustomValidity(
                              'Bitte geben Sie eine gültige E-Mail-Adresse ein (z. B. name@beispiel.ch).'
                            )
                          } else {
                            el.setCustomValidity('Bitte geben Sie eine gültige E-Mail-Adresse ein.')
                          }
                        }}
                        required
                        className="bg-white/70"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                          <Label htmlFor="password" className="font-semibold text-gray-700">Passwort</Label>
                          <Link
                            href={forgotPasswordHref}
                            className="text-sm font-medium text-green-600 hover:text-green-500 hidden md:inline"
                          >
                            Passwort vergessen?
                          </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value)
                            setLoginFormError(null)
                          }}
                          onInput={(e) => {
                            e.currentTarget.setCustomValidity('')
                          }}
                          onInvalid={(e) => {
                            const el = e.currentTarget
                            if (el.validity.valueMissing) {
                              el.setCustomValidity('Bitte geben Sie Ihr Passwort ein.')
                            } else {
                              el.setCustomValidity('')
                            }
                          }}
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



