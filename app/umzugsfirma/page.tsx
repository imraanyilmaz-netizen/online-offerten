import type { Metadata } from 'next'
import { Suspense } from 'react'
import UmzugsfirmaPageClient from '@/components/pages/info/UmzugsfirmaPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Schweiz – Geprüfte Umzugsunternehmen in Ihrer Nähe finden',
  description: 'Umzugsfirma in der Schweiz finden ✓ Geprüfte Umzugsunternehmen für Privatumzug, Geschäftsumzug & Spezialtransporte. Bis zu 5 kostenlose Offerten anfordern und bis zu 40% sparen!',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma',
  },
  openGraph: {
    title: 'Umzugsfirma Schweiz » Geprüfte Umzugsunternehmen in Ihrer Nähe finden',
    description: 'Umzugsfirma in der Schweiz finden ✓ Geprüfte Umzugsunternehmen für Privatumzug, Geschäftsumzug & Spezialtransporte. Bis zu 5 kostenlose Offerten!',
    url: 'https://online-offerten.ch/umzugsfirma',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzugsservice-Schweiz/umzugsfirma-finden-vergleichen.png',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma finden und vergleichen',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Schweiz » Geprüfte Umzugsunternehmen finden',
    description: 'Umzugsfirma in der Schweiz finden ✓ Geprüfte Umzugsunternehmen für Privatumzug & Geschäftsumzug.',
    images: ['https://online-offerten.ch/image/umzugsservice-Schweiz/umzugsfirma-finden-vergleichen.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function UmzugsfirmaPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <UmzugsfirmaPageClient />
    </Suspense>
  )
}


