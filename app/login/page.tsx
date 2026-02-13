import type { Metadata } from 'next'
import { Suspense } from 'react'
import LoginPageClient from '@/components/pages/LoginPageClient'

export const metadata: Metadata = {
  title: 'Partner Login : Online-Offerten.ch',
  description: 'Melden Sie sich als Partner bei Online-Offerten.ch an, um Ihr Dashboard zu nutzen und Ihre Anfragen zu verwalten.',
  alternates: {
    canonical: 'https://online-offerten.ch/login',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <LoginPageClient />
    </Suspense>
  )
}



