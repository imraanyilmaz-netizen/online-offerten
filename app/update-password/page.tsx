import type { Metadata } from 'next'
import UpdatePasswordPageClient from '@/components/pages/UpdatePasswordPageClient'

export const metadata: Metadata = {
  title: 'Passwort aktualisieren | Online-Offerten.ch',
  description: 'Aktualisieren Sie Ihr Passwort.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function UpdatePasswordPage() {
  return <UpdatePasswordPageClient />
}

