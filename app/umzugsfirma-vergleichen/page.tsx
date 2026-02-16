import type { Metadata } from 'next'
import { Suspense } from 'react'
import UmzugsfirmaVergleichenPageClient from '@/components/pages/info/UmzugsfirmaVergleichenPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirmen vergleichen Schweiz – Kostenlose Offerten & bis zu 40% sparen',
  description: 'Umzugsfirmen vergleichen in der Schweiz ✓ Bis zu 5 kostenlose Offerten von geprüften Umzugsfirmen erhalten. Preise, Leistungen und Bewertungen transparent vergleichen. Jetzt starten und bis zu 40% sparen!',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-vergleichen',
  },
  openGraph: {
    title: 'Umzugsfirmen vergleichen Schweiz » Kostenlose Offerten & bis zu 40% sparen',
    description: 'Umzugsfirmen vergleichen in der Schweiz ✓ Bis zu 5 kostenlose Offerten von geprüften Umzugsfirmen. Preise transparent vergleichen und sparen.',
    url: 'https://online-offerten.ch/umzugsfirma-vergleichen',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/umzug/29dafe69-70a5-4e15-b5fe-fac7d8d03bc7.webp',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirmen vergleichen Schweiz',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirmen vergleichen Schweiz » Kostenlose Offerten & bis zu 40% sparen',
    description: 'Umzugsfirmen vergleichen in der Schweiz ✓ Bis zu 5 kostenlose Offerten von geprüften Umzugsfirmen.',
    images: ['https://online-offerten.ch/umzug/29dafe69-70a5-4e15-b5fe-fac7d8d03bc7.webp'],
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

export default function UmzugsfirmaVergleichenPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <UmzugsfirmaVergleichenPageClient />
    </Suspense>
  )
}
