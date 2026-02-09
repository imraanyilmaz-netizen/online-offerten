'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/SupabaseAuthContext'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, KeyRound } from 'lucide-react'
// framer-motion removed - CSS for better INP

const UpdatePasswordPageClient = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { updateUserPassword } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

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
      toast({
        title: 'Erfolg!',
        description: 'Ihr Passwort wurde erfolgreich aktualisiert. Sie werden zum Login weitergeleitet.',
      })
      setTimeout(() => router.push('/login'), 2000)
    }
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
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="bg-white/80 border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Passwort bestätigen</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="bg-white/80 border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
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

