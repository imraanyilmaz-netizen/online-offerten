'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/SupabaseAuthContext'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, KeyRound, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
// framer-motion removed - CSS for better INP

const UpdatePasswordPageClient = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)
  const [sessionError, setSessionError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { user, session, loading: authLoading, updateUserPassword } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Session hazır olduğunda formu göster
  useEffect(() => {
    if (authLoading) return

    if (session && user) {
      setSessionReady(true)
      setSessionError(false)
    } else {
      // Auth yüklendi ama session yok → hata
      const timer = setTimeout(() => {
        if (!session && !user) {
          setSessionError(true)
        }
      }, 3000) // 3 saniye bekle (code exchange zaman alabilir)
      return () => clearTimeout(timer)
    }
  }, [authLoading, session, user])

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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-4">
        <Card className="w-full max-w-md backdrop-blur-sm bg-white/70 shadow-lg border-none">
          <CardContent className="text-center py-12">
            <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-800 mt-4">Passwort aktualisiert!</h2>
            <p className="text-gray-600 mt-2">Sie werden zum Login weitergeleitet...</p>
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

  // Lade-Ansicht (Session wird vorbereitet)
  if (authLoading || (!sessionReady && !sessionError)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-4">
        <Card className="w-full max-w-md backdrop-blur-sm bg-white/70 shadow-lg border-none">
          <CardContent className="text-center py-12">
            <Loader2 className="mx-auto h-12 w-12 text-green-600 animate-spin" />
            <p className="mt-4 text-lg text-gray-600">Sitzung wird vorbereitet...</p>
            <p className="mt-2 text-sm text-gray-500">Bitte warten Sie einen Moment.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Fehler-Ansicht (kein gültiger Recovery-Link)
  if (sessionError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-4">
        <Card className="w-full max-w-md backdrop-blur-sm bg-white/70 shadow-lg border-none">
          <CardContent className="text-center py-12">
            <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
            <h2 className="text-xl font-bold text-gray-800 mt-4">Link abgelaufen oder ungültig</h2>
            <p className="text-gray-600 mt-2">
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
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-4"
    >
      <Card className="w-full max-w-md backdrop-blur-sm bg-white/70 shadow-lg border-none">
        <CardHeader className="text-center">
          <KeyRound className="mx-auto h-12 w-12 text-green-600" />
          <CardTitle className="text-3xl font-extrabold text-gray-800 mt-4">Neues Passwort festlegen</CardTitle>
          <CardDescription className="text-gray-600 mt-2">
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
                  className="bg-white/80 border-gray-300 focus:border-green-500 focus:ring-green-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
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
                  className="bg-white/80 border-gray-300 focus:border-green-500 focus:ring-green-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
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



