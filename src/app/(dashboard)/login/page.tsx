import type { Metadata } from 'next'
import { Suspense } from 'react'
import LoginPageClient from '@/components/pages/LoginPageClient'

export const metadata: Metadata = {
  title: 'Login | Online-Offerten.ch',
  description:
    'Login und Anmeldung für Partner: Melden Sie sich bei Online-Offerten.ch an, um Ihr Dashboard zu öffnen, Anfragen zu bearbeiten und Ihre Top Offerten zu verwalten. Neu hier? Die Registrierung erfolgt über «Partner werden».',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://online-offerten.ch/login',
  },
  openGraph: {
    title: 'Login | Online-Offerten.ch',
    description:
      'Hier einloggen: Partner-Login für Online-Offerten.ch. Dashboard öffnen, Anfragen bearbeiten und Ihre Top Offerten im Blick behalten. Registrierung für neue Partner über «Partner werden».',
    url: 'https://online-offerten.ch/login',
    siteName: 'Online-Offerten.ch',
    locale: 'de_CH',
    type: 'website',
  },
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <LoginPageClient />
    </Suspense>
  )
}



