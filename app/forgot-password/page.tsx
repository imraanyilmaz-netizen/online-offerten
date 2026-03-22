import type { Metadata } from 'next'
import { Suspense } from 'react'
import ForgotPasswordPageClient from '@/components/pages/ForgotPasswordPageClient'

export const metadata: Metadata = {
  title: 'Passwort vergessen',
  description: 'Setzen Sie Ihr Passwort für Ihr Online-Offerten-Konto zurück.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
        </div>
      }
    >
      <ForgotPasswordPageClient />
    </Suspense>
  )
}

