import type { Metadata } from 'next'
import { Suspense } from 'react'
import UmzugsfirmaPageClient from '@/components/pages/info/UmzugsfirmaPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Schweiz | Geprüfte Anbieter vergleichen',
  description: 'Finden Sie eine passende Umzugsfirma in der Schweiz und vergleichen Sie geprüfte Anbieter für Privat- und Geschäftsumzug sowie Spezialtransporte.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma',
  },
  openGraph: {
    title: 'Umzugsfirma Schweiz | Geprüfte Anbieter vergleichen',
    description: 'Finden Sie eine passende Umzugsfirma in der Schweiz und vergleichen Sie geprüfte Anbieter für Privat- und Geschäftsumzug sowie Spezialtransporte.',
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
    title: 'Umzugsfirma Schweiz | Geprüfte Anbieter vergleichen',
    description: 'Finden Sie eine passende Umzugsfirma in der Schweiz und vergleichen Sie geprüfte Anbieter für Privat- und Geschäftsumzug sowie Spezialtransporte.',
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


