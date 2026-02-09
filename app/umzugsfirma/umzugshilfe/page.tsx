import type { Metadata } from 'next'
import { Suspense } from 'react'
import UmzugshilfePageClient from '@/components/pages/services/UmzugshilfePageClient'

export const metadata: Metadata = {
  title: 'Umzugshilfe finden & vergleichen – Kostenlose Offerten',
  description: 'Umzugshilfe finden ✓ Bis zu 5 kostenlose Offerten von geprüften Umzugshelfern und Umzugsfirmen. Professionelle Umzugshilfe für Privatumzug, Geschäftsumzug – schnell, sicher und bis zu 40% günstiger. Jetzt kostenlos Offerten anfordern!',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/umzugshilfe',
  },
  openGraph: {
    title: 'Umzugshilfe finden & vergleichen » Kostenlose Offerten',
    description: 'Umzugshilfe finden ✓ Bis zu 5 kostenlose Offerten von geprüften Umzugshelfern und Umzugsfirmen. Professionelle Umzugshilfe für Privatumzug, Geschäftsumzug – schnell, sicher und bis zu 40% günstiger.',
    url: 'https://online-offerten.ch/umzugsfirma/umzugshilfe',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzugsservice-Schweiz/umzugshilfe-finden-vergleichen.png',
        width: 1200,
        height: 630,
        alt: 'Umzugshilfe finden & vergleichen',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugshilfe finden & vergleichen » Kostenlose Offerten',
    description: 'Umzugshilfe finden ✓ Bis zu 5 kostenlose Offerten von geprüften Umzugshelfern und Umzugsfirmen.',
    images: ['https://online-offerten.ch/image/umzugsservice-Schweiz/umzugshilfe-finden-vergleichen.png'],
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

export default function UmzugshilfePage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <UmzugshilfePageClient />
    </Suspense>
  )
}

