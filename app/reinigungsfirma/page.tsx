import type { Metadata } from 'next'
import { Suspense } from 'react'
import ReinigungsfirmaInDerNaehePageClient from '@/components/pages/info/ReinigungsfirmaInDerNaehePageClient'

export const metadata: Metadata = {
  title: 'Reinigungsfirma finden in der Schweiz | Offerten kostenlos vergleichen',
  description: 'Finden Sie geprüfte Reinigungsfirmen in Ihrer Region und vergleichen Sie bis zu 5 kostenlose Offerten für Umzugsreinigung, Haus- oder Büroreinigung.',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigungsfirma',
  },
  openGraph: {
    title: 'Reinigungsfirma finden in der Schweiz | Offerten kostenlos vergleichen',
    description: 'Finden Sie geprüfte Reinigungsfirmen in Ihrer Region und vergleichen Sie bis zu 5 kostenlose Offerten für Umzugsreinigung, Haus- oder Büroreinigung.',
    url: 'https://online-offerten.ch/reinigungsfirma',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/reinigungsfirma-finden.png',
        width: 1200,
        height: 630,
        alt: 'Reinigungsfirma in der Nähe finden',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reinigungsfirma finden in der Schweiz | Offerten kostenlos vergleichen',
    description: 'Finden Sie geprüfte Reinigungsfirmen in Ihrer Region und vergleichen Sie bis zu 5 kostenlose Offerten für Umzugsreinigung, Haus- oder Büroreinigung.',
    images: ['https://online-offerten.ch/image/reinigungsfirma-finden.png'],
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

export default function ReinigungsfirmaInDerNaehePage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div></div>}>
      <ReinigungsfirmaInDerNaehePageClient />
    </Suspense>
  )
}


