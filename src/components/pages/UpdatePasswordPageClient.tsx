'use client'

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useAuth } from '@/src/contexts/SupabaseAuthContext'
import { createClient } from '@/src/lib/supabase/client'
import { useToast } from '@/src/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, KeyRound, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
// framer-motion removed - CSS for better INP

/** Supabase leitet bei abgelaufenem/ungültigem Link mit error/error_code in Query oder Hash um */
function parseSupabaseUrlAuthError(): string | null {
  if (typeof window === 'undefined') return null
  const q = new URLSearchParams(window.location.search)
  let code = q.get('error_code') || q.get('error')
  if (!code && window.location.hash) {
    const raw = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : window.location.hash
    const h = new URLSearchParams(raw)
    code = h.get('error_code') || h.get('error')
  }
  return code || null
}

const AUTH_LOADING_TIMEOUT_MS = 20000

/** PKCE recovery: ilk yüklemede session gecikebilir; 2 sn sonra tek seferlik yenileme (sonsuz döngü yok) */
const RECOVERY_AUTO_RELOAD_MS = 2000
const RECOVERY_AUTO_RELOAD_KEY = 'pw_recovery_auto_reload_v1'

const UpdatePasswordPageClient = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)
  const [sessionError, setSessionError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [urlErrorCode, setUrlErrorCode] = useState<string | null>(null)
  const [authStuck, setAuthStuck] = useState(false)
  const { user, session, loading: authLoading, updateUserPassword } = useAuth()
  const { toast } = useToast()
  const sessionRef = useRef(session)
  const userRef = useRef(user)
  sessionRef.current = session
  userRef.current = user

  useLayoutEffect(() => {
    setUrlErrorCode(parseSupabaseUrlAuthError())
  }, [])

  // Recovery-Link (?code=): oturum 2 sn içinde gelmezse tek sefer sayfa yenilenir
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (parseSupabaseUrlAuthError()) return
    const params = new URLSearchParams(window.location.search)
    if (!params.get('code')) return
    if (sessionStorage.getItem(RECOVERY_AUTO_RELOAD_KEY) === '1') return

    if (sessionRef.current && userRef.current) {
      sessionStorage.removeItem(RECOVERY_AUTO_RELOAD_KEY)
      return
    }

    let cancelled = false
    const t = window.setTimeout(() => {
      if (cancelled) return
      if (parseSupabaseUrlAuthError()) return
      if (sessionRef.current && userRef.current) return
      sessionStorage.setItem(RECOVERY_AUTO_RELOAD_KEY, '1')
      window.location.reload()
    }, RECOVERY_AUTO_RELOAD_MS)

    return () => {
      cancelled = true
      window.clearTimeout(t)
    }
  }, [authLoading, session, user])

  useEffect(() => {
    if (!authLoading) {
      setAuthStuck(false)
    }
  }, [authLoading])

  useEffect(() => {
    if (urlErrorCode) return
    if (!authLoading) return
    const t = setTimeout(() => {
      setAuthStuck(true)
    }, AUTH_LOADING_TIMEOUT_MS)
    return () => clearTimeout(t)
  }, [authLoading, urlErrorCode])

  // Session hazır olduğunda formu göster (URL-Fehler von Supabase überspringen wir)
  useEffect(() => {
    if (urlErrorCode) return
    if (authLoading) return

    if (session && user) {
      setSessionReady(true)
      setSessionError(false)
    } else {
      const timer = setTimeout(() => {
        if (!session && !user) {
          setSessionError(true)
        }
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [authLoading, session, user, urlErrorCode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Fehler',
        description: 'Die Passwörter stimmen nicht überein.',
      })
      return
    }

    if (password.length < 6) {
      toast({
        variant: 'destructive',
        title: 'Fehler',
        description: 'Das Passwort muss mindestens 6 Zeichen lang sein.',
      })
      return
    }

    setLoading(true)

    const { error } = await updateUserPassword(password)

    setLoading(false)

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Fehler',
        description: 'Passwort konnte nicht aktualisiert werden: ' + error.message,
      })
    } else {
      setSuccess(true)
      toast({
        title: 'Erfolg!',
        description: 'Ihr Passwort wurde erfolgreich aktualisiert. Sie werden zum Login weitergeleitet.',
      })
      // Recovery session'ı temizle ve login'e yönlendir
      try {
        const supabase = createClient()
        await supabase.auth.signOut()
      } catch (e) {
        console.warn('[UpdatePassword] SignOut error:', e)
      }
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    }
  }

  // Erfolg-Ansicht
  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 dark:from-emerald-950/40 dark:to-slate-900 p-4">
        <Card className="w-full max-w-md backdrop-blur-sm bg-card/90 border border-border shadow-lg">
          <CardContent className="text-center py-12">
            <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
            <h2 className="text-2xl font-bold text-foreground mt-4">Passwort aktualisiert!</h2>
            <p className="text-muted-foreground mt-2">Sie werden zum Login weitergeleitet...</p>
            <Link href="/login">
              <Button className="mt-6 bg-green-600 hover:bg-green-700">
                Zum Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const urlErrorMessage =
    urlErrorCode === 'otp_expired'
      ? 'Der Link ist abgelaufen oder wurde bereits verwendet (z. B. durch ein zweites Öffnen oder eine E-Mail-Vorschau). Bitte fordern Sie einen neuen Link an.'
      : urlErrorCode
        ? 'Der Zugriff mit diesem Link ist nicht möglich. Bitte fordern Sie einen neuen Link zum Zurücksetzen des Passworts an.'
        : ''

  if (urlErrorCode) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 dark:from-emerald-950/40 dark:to-slate-900 p-4">
        <Card className="w-full max-w-md backdrop-blur-sm bg-card/90 border border-border shadow-lg">
          <CardContent className="text-center py-12">
            <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
            <h2 className="text-xl font-bold text-foreground mt-4">Link abgelaufen oder ungültig</h2>
            <p className="text-muted-foreground mt-2 text-left text-sm leading-relaxed">{urlErrorMessage}</p>
            <div className="flex flex-col gap-3 mt-6">
              <Link href="/forgot-password">
                <Button className="w-full bg-green-600 hover:bg-green-700">Neuen Link anfordern</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Zurück zum Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (authStuck && authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 dark:from-emerald-950/40 dark:to-slate-900 p-4">
        <Card className="w-full max-w-md backdrop-blur-sm bg-card/90 border border-border shadow-lg">
          <CardContent className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-amber-500" />
            <p className="mt-4 text-lg text-foreground font-medium">Sitzung lädt zu lange</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Bitte laden Sie die Seite neu. Falls das Problem bleibt, fordern Sie einen neuen Link an und öffnen Sie ihn
              in einem anderen Browser (oder im privaten Fenster).
            </p>
            <Button type="button" className="mt-6 w-full bg-green-600 hover:bg-green-700" onClick={() => window.location.reload()}>
              Seite neu laden
            </Button>
            <Link href="/forgot-password" className="mt-3 block">
              <Button variant="outline" className="w-full">
                Neuen Link anfordern
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Lade-Ansicht (Session wird vorbereitet)
  if (authLoading || (!sessionReady && !sessionError)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 dark:from-emerald-950/40 dark:to-slate-900 p-4">
        <Card className="w-full max-w-md backdrop-blur-sm bg-card/90 border border-border shadow-lg">
          <CardContent className="text-center py-12">
            <Loader2 className="mx-auto h-12 w-12 text-green-600 animate-spin" />
            <p className="mt-4 text-lg text-muted-foreground">Sitzung wird vorbereitet...</p>
            <p className="mt-2 text-sm text-muted-foreground">Bitte warten Sie einen Moment.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Fehler-Ansicht (kein gültiger Recovery-Link)
  if (sessionError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 dark:from-emerald-950/40 dark:to-slate-900 p-4">
        <Card className="w-full max-w-md backdrop-blur-sm bg-card/90 border border-border shadow-lg">
          <CardContent className="text-center py-12">
            <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
            <h2 className="text-xl font-bold text-foreground mt-4">Link abgelaufen oder ungültig</h2>
            <p className="text-muted-foreground mt-2">
              Der Link zum Zurücksetzen des Passworts ist abgelaufen oder ungültig. 
              Bitte fordern Sie einen neuen Link an.
            </p>
            <div className="flex flex-col gap-3 mt-6">
              <Link href="/forgot-password">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Neuen Link anfordern
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Zurück zum Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 dark:from-emerald-950/40 dark:to-slate-900 p-4"
    >
      <Card className="w-full max-w-md backdrop-blur-sm bg-card/90 border border-border shadow-lg">
        <CardHeader className="text-center">
          <KeyRound className="mx-auto h-12 w-12 text-green-600" />
          <CardTitle className="text-3xl font-extrabold text-foreground mt-4">Neues Passwort festlegen</CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Geben Sie Ihr neues Passwort ein, um wieder Zugriff auf Ihr Konto zu erhalten.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">Neues Passwort</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="bg-background/80 dark:bg-muted/30 border-input focus:border-primary focus:ring-primary pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Passwort bestätigen</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="bg-background/80 dark:bg-muted/30 border-input focus:border-primary focus:ring-primary pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Passwort aktualisieren
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default UpdatePasswordPageClient



