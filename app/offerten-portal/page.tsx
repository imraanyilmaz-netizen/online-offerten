import type { Metadata } from 'next'
import { Suspense } from 'react'
import OffertenPortalPageClient from '@/components/pages/info/OffertenPortalPageClient'

export const metadata: Metadata = {
  title: 'Offertenportal Schweiz – Offerten kostenlos vergleichen | Online-Offerten.ch',
  description: 'Offertenportal Schweiz ✓ Vergleichen Sie kostenlos & unverbindlich bis zu 5 Offerten für Umzug, Reinigung & Malerarbeiten von geprüften Firmen. Jetzt Offerten anfordern & bis zu 40% sparen!',
  alternates: {
    canonical: 'https://online-offerten.ch/offerten-portal',
  },
  openGraph: {
    title: 'Offertenportal Schweiz » Offerten kostenlos vergleichen',
    description: 'Ihr Vergleichsportal für Umzug, Reinigung & Malerarbeiten in der Schweiz. Bis zu 5 kostenlose Offerten von geprüften Firmen aus Ihrer Region. Jetzt vergleichen!',
    url: 'https://online-offerten.ch/offerten-portal',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/online-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Offertenportal Schweiz – Offerten vergleichen',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Offertenportal Schweiz » Offerten kostenlos vergleichen',
    description: 'Ihr Vergleichsportal für Umzug, Reinigung & Malerarbeiten in der Schweiz. Jetzt kostenlos Offerten vergleichen!',
    images: ['https://online-offerten.ch/image/online-offerten.webp'],
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

export default function OffertenPortalPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <OffertenPortalPageClient />
    </Suspense>
  )
}
