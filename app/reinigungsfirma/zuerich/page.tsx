import type { Metadata } from 'next'
import { Suspense } from 'react'
import ReinigungsfirmaStadtPageClient from '@/components/pages/info/ReinigungsfirmaStadtPageClient'

export const metadata: Metadata = {
  title: 'Reinigungsfirma Zürich finden – Bis zu 40% sparen',
  description: 'Reinigungsfirma Zürich finden ✓ Bis zu 5 kostenlose Offerten von geprüften Reinigungsfirmen in Zürich. Büroreinigung, Haushaltsreinigung, Endreinigung – professionell, sicher und bis zu 40% günstiger. Jetzt kostenlos Offerten anfordern!',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigungsfirma/zuerich',
  },
  openGraph: {
    title: 'Reinigungsfirma Zürich finden » Bis zu 40% sparen',
    description: 'Reinigungsfirma Zürich finden ✓ Bis zu 5 kostenlose Offerten von geprüften Reinigungsfirmen in Zürich. Büroreinigung, Haushaltsreinigung – professionell, sicher und bis zu 40% günstiger.',
    url: 'https://online-offerten.ch/reinigungsfirma/zuerich',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/reinigungsfirma-zuerich-finden.png',
        width: 1200,
        height: 630,
        alt: 'Reinigungsfirma Zürich finden',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reinigungsfirma Zürich finden » Bis zu 40% sparen',
    description: 'Reinigungsfirma Zürich finden ✓ Bis zu 5 kostenlose Offerten von geprüften Reinigungsfirmen in Zürich.',
    images: ['https://online-offerten.ch/image/reinigungsfirma-zuerich-finden.png'],
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

const stadtInfo = {
  name: 'Zürich',
  slug: 'zuerich',
  canonicalUrl: 'https://online-offerten.ch/reinigungsfirma/zuerich',
  description: 'Finden Sie die besten Reinigungsunternehmen in Zürich. Vergleichen Sie bis zu 5 kostenlose Offerten von geprüften Reinigungsanbietern in Zürich.',
}

export default function ReinigungsfirmaZuerichPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div></div>}>
      <ReinigungsfirmaStadtPageClient stadtInfo={stadtInfo} />
    </Suspense>
  )
}


















