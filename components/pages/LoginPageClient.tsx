'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/SupabaseAuthContext'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import RegistrationForm from '@/components/PartnerRegistrationForm/RegistrationForm'
import { createClient } from '@/lib/supabase/client'

const LoginPageClient = () => {
  const { signIn, user, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const pageTitle = "Partner Login"
  const welcomeMessage = "Willkommen zurück!"
  const pageSubtitle = "Bitte geben Sie Ihre Daten ein, um sich anzumelden."

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [view, setView] = useState(typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('register') ? 'register' : 'login')
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [hasRedirected, setHasRedirected] = useState(false)

  // Redirect already authenticated users away from login page
  // Only redirect once to prevent loops
  useEffect(() => {
    if (!authLoading && user && !loginSuccess && !hasRedirected) {
      const userRole = user.user_metadata?.role
      if (userRole === 'admin' || userRole === 'partner') {
        setHasRedirected(true)
        const redirectPath = userRole === 'admin' ? '/admin-dashboard' : '/partner/dashboard'
        // Use router.replace to avoid adding to history
        router.replace(redirectPath)
      }
    }
  }, [user, authLoading, loginSuccess, hasRedirected, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await signIn(email, password)

    if (!error) {
      // Wait for auth state change event (more reliable than polling)
      const supabase = createClient()
      
      // Set up a promise that resolves when auth state changes to signed in
      const waitForAuth = (): Promise<{ user: any; role: string | null }> => {
        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Auth timeout'))
          }, 3000)
          
          const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
              clearTimeout(timeout)
              subscription.unsubscribe()
              const role = session.user.user_metadata?.role || null
              resolve({ user: session.user, role })
            } else if (event === 'TOKEN_REFRESHED' && session?.user) {
              // Token refreshed, user is authenticated
              clearTimeout(timeout)
              subscription.unsubscribe()
              const role = session.user.user_metadata?.role || null
              resolve({ user: session.user, role })
            }
          })
          
          // Also check current session in case auth state already changed
          supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
              clearTimeout(timeout)
              subscription.unsubscribe()
              const role = session.user.user_metadata?.role || null
              resolve({ user: session.user, role })
            }
          })
        })
      }
      
      try {
        const { role } = await waitForAuth()
        let redirectPath = null
        
        // Determine redirect path based on role
        if (role === 'admin') {
          redirectPath = '/admin-dashboard'
        } else if (role === 'partner') {
          redirectPath = '/partner/dashboard'
        }
        
        if (redirectPath) {
          setLoginSuccess(true)
          setLoading(false)
          toast({
            title: "Anmeldung erfolgreich",
            description: "Sie werden weitergeleitet...",
          })
          
          // Use window.location for full page reload to ensure middleware runs
          // This is critical for production (Vercel Edge runtime)
          window.location.href = redirectPath
        } else {
          setLoading(false)
          toast({
            variant: "destructive",
            title: "Anmeldung fehlgeschlagen",
            description: "Rolle konnte nicht ermittelt werden.",
          })
        }
      } catch (error) {
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Anmeldung fehlgeschlagen",
          description: "Session konnte nicht erstellt werden. Bitte versuchen Sie es erneut.",
        })
      }
    } else {
      setLoading(false)
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
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105" disabled={loading}>
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
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

