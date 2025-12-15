import type { Metadata } from 'next'
import NotFoundPageClient from '@/components/pages/NotFoundPageClient'

export const metadata: Metadata = {
  title: 'Seite nicht gefunden (404) | Online-offerten.ch',
  description: 'Die von Ihnen gesuchte Seite konnte nicht gefunden werden. Bitte überprüfen Sie die URL oder kehren Sie zur Startseite zurück.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return <NotFoundPageClient />
}

