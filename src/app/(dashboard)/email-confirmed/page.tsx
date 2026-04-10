import type { Metadata } from 'next'
import EmailConfirmedPageClient from '@/components/pages/EmailConfirmedPageClient'

export const metadata: Metadata = {
  title: 'E-Mail bestätigt - Online-Offerten.ch',
  description: 'Ihre E-Mail-Adresse wurde erfolgreich bestätigt.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function EmailConfirmedPage() {
  return <EmailConfirmedPageClient />
}


