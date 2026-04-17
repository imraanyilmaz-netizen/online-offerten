'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useAuth } from '@/src/contexts/SupabaseAuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, Eye, EyeOff } from 'lucide-react'
// framer-motion removed - CSS for better INP
import RegistrationForm from '@/components/PartnerRegistrationForm/RegistrationForm'

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

/** SSR ile ilk client çıktısı aynı olsun (useAuth loading/user farkı h1 vs CardTitle hydration hatası veriyordu). */
const LoginShellPlaceholder = () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 via-background to-blue-100 dark:from-emerald-950/50 dark:via-background dark:to-slate-900 py-4 px-4">
    <div className="w-full max-w-md shadow-2xl rounded-2xl bg-card/90 dark:bg-card/95 backdrop-blur-sm border border-border overflow-hidden p-8">
      <div className="h-9 w-3/4 max-w-xs bg-muted rounded-md animate-pulse mx-auto mb-4" />
      <div className="h-4 w-full bg-muted/80 rounded animate-pulse mb-2" />
      <div className="h-4 w-5/6 bg-muted/80 rounded animate-pulse" />
    </div>
  </div>
)

const LoginPageClient = () => {
  const { signIn, user, loading } = useAuth()
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- kasıtlı: hydration sonrası auth UI
    setMounted(true)
  }, [])

  const pageTitle = 'Partner Login'
  const welcomeMessage = 'Willkommen zurück!'
  const pageSubtitle = 'Bitte geben Sie Ihre Daten ein, um sich anzumelden.'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [view, setView] = useState(searchParams?.toString().includes('register') ? 'register' : 'login')
  const [loginFormError, setLoginFormError] = useState<string | null>(null)
  const [failedLoginAttempts, setFailedLoginAttempts] = useState(0)

  /** Passwort-vergessen-Seite mit vorausgefüllter E-Mail (professioneller Flow) */
  const forgotPasswordHref =
    email.trim().length > 0
      ? `/forgot-password?email=${encodeURIComponent(email.trim())}`
      : '/forgot-password'

  /** Bereits eingeloggt: AuthContext hat Session validiert — keine zweite getSession/getUser/Cookie-Kette (war sehr langsam). */
  const getDashboardHrefByRole = (role?: string) => {
    if (role === 'admin' || role === 'editor') return '/admin-dashboard'
    if (role === 'partner') return '/partner/dashboard'
    return '/'
  }

  useLayoutEffect(() => {
    if (!mounted || loading || !user) return
    const role = user.user_metadata?.role ?? user.app_metadata?.role
    window.location.replace(getDashboardHrefByRole(role))
  }, [mounted, loading, user])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginFormError(null)
    setIsSubmitting(true)
    console.log('[LoginPage] handleLogin called:', { email })

    const { error, session } = await signIn(email, password, { silent: true })

    console.log('[LoginPage] signIn result:', { hasError: !!error, errorMessage: error?.message })

    if (!error) {
      setFailedLoginAttempts(0)
      const role = session?.user?.user_metadata?.role ?? session?.user?.app_metadata?.role
      console.log('[LoginPage] Login successful, redirecting by session role', { role })
      setIsSubmitting(false)
      window.location.assign(getDashboardHrefByRole(role))
      return
    } else {
      console.log('[LoginPage] Login failed:', error?.message)
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

  if (!mounted) {
    return <LoginShellPlaceholder />
  }

  if (loading) {
    return <LoginShellPlaceholder />
  }

  if (user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-100 via-background to-blue-100 dark:from-emerald-950/50 dark:via-background dark:to-slate-900 py-4 px-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-sm font-medium text-muted-foreground">Weiterleitung zum Dashboard…</p>
      </div>
    )
  }

  return (
    <div 
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 via-background to-blue-100 dark:from-emerald-950/50 dark:via-background dark:to-slate-900 py-4 px-4 transition-all duration-500"
    >
      <div
        className={`w-full ${view === 'login' ? 'max-w-md' : 'max-w-navbar'} shadow-2xl rounded-2xl bg-card/90 dark:bg-card/95 backdrop-blur-sm border border-border overflow-hidden transition-all duration-300`}
      >
        
          {view === 'login' ? (
            <div
              key="login"
            >
              <Card className="w-full border-none bg-transparent shadow-none">
                <CardHeader className="text-center p-8">
                  <CardTitle className="text-3xl md:text-4xl font-extrabold text-foreground">
                    {pageTitle}
                  </CardTitle>
                  <CardDescription className="mt-3 text-muted-foreground">
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
                      <Label htmlFor="email" className="font-semibold text-foreground">E-Mail-Adresse</Label>
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
                        className="bg-background/80 dark:bg-muted/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                          <Label htmlFor="password" className="font-semibold text-foreground">Passwort</Label>
                          <Link
                            href={forgotPasswordHref}
                            className="text-sm font-medium text-green-600 hover:text-green-500 shrink-0"
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
                          className="bg-background/80 dark:bg-muted/30 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground"
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



