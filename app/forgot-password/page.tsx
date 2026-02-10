import type { Metadata } from 'next'
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
  return <ForgotPasswordPageClient />
}

