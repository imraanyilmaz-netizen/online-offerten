'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/src/lib/supabase/client'
import { useToast } from '@/src/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, MailCheck, AlertCircle } from 'lucide-react'
import Link from 'next/link'
// framer-motion removed - CSS for better INP

const ForgotPasswordPageClient = () => {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    const raw = searchParams.get('email')
    if (!raw) return
    try {
      const decoded = decodeURIComponent(raw).trim()
      if (decoded.length > 0) {
        setEmail(decoded)
      }
    } catch {
      // ungültige Kodierung ignorieren
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://online-offerten.ch/update-password',
    })

    setLoading(false)

    if (resetError) {
      setError('Beim Senden des Passwort-Reset-Links ist ein Fehler aufgetreten: ' + resetError.message)
      toast({
        variant: 'destructive',
        title: 'Fehler',
        description: resetError.message,
      })
    } else {
      setMessage('Falls diese E-Mail-Adresse registriert ist, wurde ein Link zum Zurücksetzen des Passworts gesendet. Bitte überprüfen Sie Ihren Posteingang.')
      toast({
        title: 'E-Mail gesendet',
        description: 'Bitte überprüfen Sie Ihren Posteingang für den Link zum Zurücksetzen des Passworts.',
      })
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 dark:from-emerald-950/40 dark:to-slate-900 py-4 px-4"
    >
      <Card className="w-full max-w-md backdrop-blur-sm bg-card/90 border border-border shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold text-foreground">Passwort vergessen?</CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Kein Problem! Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {message ? (
            <div className="text-center p-4 bg-green-100/80 border border-green-200 rounded-lg">
              <MailCheck className="mx-auto h-12 w-12 text-green-600" />
              <p className="mt-4 text-green-800 font-medium">{message}</p>
              <div className="mt-6 text-center text-sm">
                <Link href="/login" className="font-medium text-green-600 hover:text-green-500">
                  Zurück zum Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="ihre.email@beispiel.com"
                  className="bg-background/80 dark:bg-muted/30 border-input focus:border-primary focus:ring-primary"
                />
              </div>
              {error && (
                <div className="text-center p-4 bg-red-100/80 border border-red-200 rounded-lg">
                  <AlertCircle className="mx-auto h-8 w-8 text-red-600" />
                  <p className="mt-2 text-red-800 text-sm">{error}</p>
                </div>
              )}
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Zurücksetzen-Link senden
              </Button>
              <div className="mt-6 text-center text-sm">
                <Link href="/login" className="font-medium text-green-600 hover:text-green-500">
                  Zurück zum Login
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ForgotPasswordPageClient



