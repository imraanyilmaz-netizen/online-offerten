'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAuth } from '@/contexts/SupabaseAuthContext'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import RegistrationForm from '@/components/PartnerRegistrationForm/RegistrationForm'

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    console.log('[LoginPage] handleLogin called:', { email })

    const { error } = await signIn(email, password)

    console.log('[LoginPage] signIn result:', { hasError: !!error, errorMessage: error?.message })

    setIsSubmitting(false)
    if (!error) {
      console.log('[LoginPage] Login successful')
      toast({
        title: "Anmeldung erfolgreich",
        description: "Sie werden weitergeleitet...",
      })
      // Redirect is handled automatically by ClientRouteProtection component
      // based on user role - no manual redirect needed
    } else {
      console.log('[LoginPage] Login failed:', error?.message)
      toast({
        variant: "destructive",
        title: "Anmeldung fehlgeschlagen",
        description: "Bitte überprüfen Sie Ihre E-Mail und Ihr Passwort.",
      })
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
      <motion.div
        layout
        variants={cardVariants}
        animate={view}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`w-full ${view === 'login' ? 'max-w-md' : 'max-w-navbar'} shadow-2xl rounded-2xl bg-white/80 backdrop-blur-sm border-none overflow-hidden`}
      >
        <AnimatePresence mode="wait">
          {view === 'login' ? (
            <motion.div
              key="login"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={formVariants}
              transition={{ duration: 0.5 }}
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
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={formVariants}
              transition={{ duration: 0.5 }}
            >
              <RegistrationForm embedded={true} onBackToLogin={() => setView('login')} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default LoginPageClient

