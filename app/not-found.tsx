import type { Metadata } from 'next'
import { Suspense } from 'react'
import NotFoundPageClient from '@/components/pages/NotFoundPageClient'

export const metadata: Metadata = {
  title: 'Seite nicht gefunden (404)',
  description: 'Die von Ihnen gesuchte Seite konnte nicht gefunden werden. Bitte überprüfen Sie die URL oder kehren Sie zur Startseite zurück.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <NotFoundPageClient />
    </Suspense>
  )
}

