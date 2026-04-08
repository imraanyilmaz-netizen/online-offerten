'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useAuth } from '@/src/contexts/SupabaseAuthContext'
import { useToast } from '@/src/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, Eye, EyeOff } from 'lucide-react'
// framer-motion removed - CSS for better INP
import RegistrationForm from '@/components/PartnerRegistrationForm/RegistrationForm'
import { postLoginHrefForRole, resolveAuthRole } from '@/src/lib/auth/role'

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
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-100 via-gray-50 to-blue-100 py-4 px-4">
    <div className="w-full max-w-md shadow-2xl rounded-2xl bg-white/80 backdrop-blur-sm border-none overflow-hidden p-8">
      <div className="h-9 w-3/4 max-w-xs bg-gray-200/80 rounded-md animate-pulse mx-auto mb-4" />
      <div className="h-4 w-full bg-gray-100/90 rounded animate-pulse mb-2" />
      <div className="h-4 w-5/6 bg-gray-100/90 rounded animate-pulse" />
    </div>
  </div>
)

const LoginPageClient = () => {
  const { signIn, user, loading } = useAuth()
  const { toast } = useToast()
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
  const [isRedirectingAfterLogin, setIsRedirectingAfterLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [view, setView] = useState(searchParams?.toString().includes('register') ? 'register' : 'login')
  const [loginFormError, setLoginFormError] = useState<string | null>(null)
  const [failedLoginAttempts, setFailedLoginAttempts] = useState(0)

  /** Passwort-vergessen-Seite mit vorausgefüllter E-Mail (professioneller Flow) */
  const forgotPasswordHref =
    email.trim().length > 0
      ? `/forgot-password?email=${encodeURIComponent(email.trim())}`
      : '/forgot-password'

  /** Zaten oturum açıksa: tam sayfa yönlendirme (proxy çerezleri okusun). */
  useLayoutEffect(() => {
    if (!mounted || loading || !user) return
    const href = postLoginHrefForRole(resolveAuthRole(user))
    window.location.replace(href)
  }, [mounted, loading, user])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginFormError(null)
    setIsSubmitting(true)

    const { error, session } = await signIn(email, password, { silent: true })

    if (error || !session?.user) {
      setIsRedirectingAfterLogin(false)
      if (error) {
        setFailedLoginAttempts((n) => n + 1)
        setLoginFormError(mapLoginErrorMessage(error))
      } else {
        setLoginFormError('Bitte überprüfen Sie Ihre E-Mail und Ihr Passwort.')
      }
      setIsSubmitting(false)
      return
    }

    setFailedLoginAttempts(0)
    setIsRedirectingAfterLogin(true)
    setIsSubmitting(false)

    const role = resolveAuthRole(session.user)
    const href = postLoginHrefForRole(role)

    if (role === 'admin' || role === 'editor') {
      toast({
        title: 'Anmeldung erfolgreich',
        description:
          role === 'editor'
            ? 'Sie werden zum Ratgeber-Bereich weitergeleitet...'
            : 'Sie werden zum Admin-Dashboard weitergeleitet...',
      })
    } else if (role === 'partner') {
      toast({
        title: 'Anmeldung erfolgreich',
        description: 'Sie werden zum Partner-Dashboard weitergeleitet...',
      })
    } else {
      toast({
        title: 'Anmeldung erfolgreich',
        description: 'Sie werden weitergeleitet...',
      })
    }

    window.location.assign(href)
  }

  if (!mounted) {
    return <LoginShellPlaceholder />
  }

  if (loading) {
    return <LoginShellPlaceholder />
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

  if (user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-100 via-gray-50 to-blue-100 py-4 px-4">
        <Loader2 className="h-10 w-10 animate-spin text-green-600" />
        <p className="mt-4 text-sm font-medium text-gray-700">Weiterleitung zum Dashboard…</p>
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
                      <div className="flex flex-wrap items-center justify-between gap-2">
                          <Label htmlFor="password" className="font-semibold text-gray-700">Passwort</Label>
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



