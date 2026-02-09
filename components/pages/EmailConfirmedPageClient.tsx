'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle, MailCheck, ArrowRight } from 'lucide-react'
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const EmailConfirmedPageClient = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [countdown, setCountdown] = useState(10)
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsRedirecting(true)
          router.push('/login')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleManualRedirect = () => {
    setIsRedirecting(true)
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center p-4">
      <div
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 text-center">
          {/* Success Icon with Animation */}
          <div
            className="mb-6 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
              <div className="relative bg-green-100 rounded-full p-4">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h1
            className="heading-2 mb-4"
          >
            E-Mail bestätigt!
          </h1>

          <p
            className="text-body mb-8"
          >
            Ihre E-Mail-Adresse wurde erfolgreich bestätigt. Sie werden in{' '}
            <span className="font-bold text-green-600 text-xl">{countdown}</span> Sekunden
            automatisch zur Anmeldeseite weitergeleitet.
          </p>

          {/* Mail Icon */}
          <div
            className="mb-8 flex justify-center"
          >
            <MailCheck className="w-12 h-12 text-green-500" />
          </div>

          {/* Manual Redirect Button */}
          <div
          >
            <Button
              onClick={handleManualRedirect}
              disabled={isRedirecting}
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              {isRedirecting ? (
                'Weiterleitung...'
              ) : (
                <>
                  Jetzt anmelden
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Info Text */}
          <p
            className="mt-6 text-sm text-gray-500"
          >
            Falls die automatische Weiterleitung nicht funktioniert, klicken Sie auf den Button oben.
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmailConfirmedPageClient
