import type { Metadata } from 'next'
import { Suspense } from 'react'
import UmzugsfirmaInDerNaehePageClient from '@/components/pages/info/UmzugsfirmaInDerNaehePageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma in der Nähe finden » Bis zu 40% sparen | Online-Offerten.ch',
  description: 'Umzugsfirma in der Nähe finden ✓ Bis zu 6 kostenlose Offerten von geprüften Umzugsfirmen in Ihrer Region. Privatumzug, Geschäftsumzug – schnell, sicher und bis zu 40% günstiger. Jetzt kostenlos Offerten anfordern!',
  keywords: 'Umzugsfirma in der Nähe, Umzugsfirma in der Nähe finden, Umzugsfirma in der Nähe Schweiz, Umzugsfirma in der Nähe vergleichen, Umzugsfirma in meiner Nähe, Umzugsfirma in der Nähe suchen, nahe Umzugsfirma, lokale Umzugsfirma, Umzugsfirma in der Region',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-in-der-naehe',
  },
  openGraph: {
    title: 'Umzugsfirma in der Nähe finden » Bis zu 40% sparen',
    description: 'Umzugsfirma in der Nähe finden ✓ Bis zu 6 kostenlose Offerten von geprüften Umzugsfirmen in Ihrer Region. Privatumzug, Geschäftsumzug – schnell, sicher und bis zu 40% günstiger.',
    url: 'https://online-offerten.ch/umzugsfirma-in-der-naehe',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzugsservice-Schweiz/umzugsfirma-in-der-naehe-finden.png',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma in der Nähe finden',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma in der Nähe finden » Bis zu 40% sparen',
    description: 'Umzugsfirma in der Nähe finden ✓ Bis zu 6 kostenlose Offerten von geprüften Umzugsfirmen in Ihrer Region.',
    images: ['https://online-offerten.ch/image/umzugsservice-Schweiz/umzugsfirma-in-der-naehe-finden.png'],
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

export default function UmzugsfirmaInDerNaehePage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <UmzugsfirmaInDerNaehePageClient />
    </Suspense>
  )
}
