import type { Metadata } from 'next'
import { Suspense } from 'react'
import QuoteFormPageClient from '@/components/pages/payment/QuoteFormPageClient'

export const metadata: Metadata = {
  title: 'Kostenlose Offerten anfordern – Umzug & Reinigung',
  description: 'Kostenlose Offerten von geprüften Umzugs-, Reinigungs- und Renovierungsfirmen anfordern. Vergleichen Sie mehrere Angebote und sparen Sie bis zu 40%. Unverbindlich & kostenlos.',
  
  alternates: {
    canonical: 'https://online-offerten.ch/kostenlose-offerte-anfordern',
  },
  openGraph: {
    title: 'Kostenlose Offerten anfordern – Umzug, Reinigung & Renovierung',
    description: 'Kostenlose Offerten von geprüften Umzugs-, Reinigungs- und Renovierungsfirmen anfordern. Vergleichen Sie mehrere Angebote und sparen Sie bis zu 40%.',
    url: 'https://online-offerten.ch/kostenlose-offerte-anfordern',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/online-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Kostenlose Offerten anfordern',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kostenlose Offerten anfordern – Umzug, Reinigung & Renovierung',
    description: 'Kostenlose Offerten von geprüften Umzugs-, Reinigungs- und Renovierungsfirmen anfordern. Vergleichen Sie mehrere Angebote und sparen Sie bis zu 40%.',
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

export default function QuoteFormPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    }>
      <QuoteFormPageClient />
    </Suspense>
  )
}


