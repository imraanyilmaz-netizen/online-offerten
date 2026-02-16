'use client'

import React, { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, MailCheck, AlertCircle, MonitorSmartphone } from 'lucide-react'
import Link from 'next/link'
// framer-motion removed - CSS for better INP
import useMediaQuery from '@/hooks/useMediaQuery'

const ForgotPasswordPageClient = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const { toast } = useToast()
  const supabase = createClient()
  const isMobile = useMediaQuery('(max-width: 768px)')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://online-offerten.ch/auth/callback?next=/update-password',
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
  
  const renderMobileWarning = () => (
    <div className="text-center p-4 bg-yellow-100/80 border border-yellow-200 rounded-lg">
      <MonitorSmartphone className="mx-auto h-12 w-12 text-yellow-600" />
      <p className="mt-4 text-yellow-800 font-medium">
        Bitte führen Sie die Passwort-Wiederherstellung auf einem Desktop-Computer durch.
      </p>
      <Link href="/login">
        <Button className="mt-6 w-full bg-green-600 hover:bg-green-700">
          Zurück zum Login
        </Button>
      </Link>
    </div>
  )

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 py-4 px-4"
    >
      <Card className="w-full max-w-md backdrop-blur-sm bg-white/70 shadow-lg border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold text-gray-800">Passwort vergessen?</CardTitle>
          {!isMobile && (
            <CardDescription className="text-gray-600 mt-2">
              Kein Problem! Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {isMobile ? renderMobileWarning() : message ? (
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
                  className="bg-white/80 border-gray-300 focus:border-green-500 focus:ring-green-500"
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



