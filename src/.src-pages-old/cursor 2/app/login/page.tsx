import type { Metadata } from 'next'
import LoginPageClient from '@/components/pages/LoginPageClient'

export const metadata: Metadata = {
  title: 'Anmeldung - Partner & Admin Login | Online-Offerten.ch',
  description: 'Melden Sie sich als Partner oder Administrator bei Online-Offerten.ch an, um Ihr Dashboard zu nutzen und Ihre Anfragen zu verwalten.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginPage() {
  return <LoginPageClient />
}

