import type { Metadata } from 'next'
import { Suspense } from 'react'
import UmzugsoffertenPageClient from '@/components/pages/info/UmzugsoffertenPageClient'

export const metadata: Metadata = {
  title: 'Umzugsofferten kostenlos vergleichen » Bis zu 40% sparen | Online-Offerten.ch',
  description: 'Umzugsofferten kostenlos vergleichen ✓ Bis zu 6 Offerten von geprüften Umzugsfirmen erhalten. Umzug offerten Schweiz – schnell, sicher und bis zu 40% günstiger. Jetzt kostenlos Offerten anfordern!',
  keywords: 'Umzugsofferten, Umzug offerten, Umzugsofferten Schweiz, Umzugsofferten vergleichen, kostenlose Umzugsofferten, Umzugsfirma Offerten, Umzug Angebote, Umzugsofferten online, günstige Umzugsofferten, Umzugsofferten anfordern',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsofferten',
  },
  openGraph: {
    title: 'Umzugsofferten kostenlos vergleichen » Bis zu 40% sparen',
    description: 'Umzugsofferten kostenlos vergleichen ✓ Bis zu 6 Offerten von geprüften Umzugsfirmen erhalten. Umzug offerten Schweiz – schnell, sicher und bis zu 40% günstiger.',
    url: 'https://online-offerten.ch/umzugsofferten',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzugsservice-Schweiz/umzugsofferten-kostenlos-vergleichen.png',
        width: 1200,
        height: 630,
        alt: 'Umzugsofferten kostenlos vergleichen',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsofferten kostenlos vergleichen » Bis zu 40% sparen',
    description: 'Umzugsofferten kostenlos vergleichen ✓ Bis zu 6 Offerten von geprüften Umzugsfirmen erhalten.',
    images: ['https://online-offerten.ch/image/umzugsservice-Schweiz/umzugsofferten-kostenlos-vergleichen.png'],
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

export default function UmzugsoffertenPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <UmzugsoffertenPageClient />
    </Suspense>
  )
}

