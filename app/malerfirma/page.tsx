import type { Metadata } from 'next'
import { Suspense } from 'react'
import MalerfirmaPageClient from '@/components/pages/info/MalerfirmaPageClient'

export const metadata: Metadata = {
  title: 'Malerfirma finden & vergleichen » Bis zu 40% sparen | Online-Offerten.ch',
  description: 'Malerfirma finden und vergleichen ✓ Bis zu 6 kostenlose Offerten von geprüften Malerfirmen in der Schweiz. Innenanstrich, Aussenanstrich, Fassadenanstrich – professionell, sicher und bis zu 40% günstiger. Jetzt kostenlos Offerten anfordern!',
  alternates: {
    canonical: 'https://online-offerten.ch/malerfirma',
  },
  openGraph: {
    title: 'Malerfirma finden & vergleichen » Bis zu 40% sparen',
    description: 'Malerfirma finden und vergleichen ✓ Bis zu 6 kostenlose Offerten von geprüften Malerfirmen in der Schweiz. Innenanstrich, Aussenanstrich, Fassadenanstrich – professionell und bis zu 40% günstiger.',
    url: 'https://online-offerten.ch/malerfirma',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/malerarbeiten/malerfirma-finden-vergleichen.png',
        width: 1200,
        height: 630,
        alt: 'Malerfirma finden und vergleichen',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malerfirma finden & vergleichen » Bis zu 40% sparen',
    description: 'Malerfirma finden und vergleichen ✓ Bis zu 6 kostenlose Offerten von geprüften Malerfirmen in der Schweiz.',
    images: ['https://online-offerten.ch/image/malerarbeiten/malerfirma-finden-vergleichen.png'],
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

export default function MalerfirmaPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <MalerfirmaPageClient />
    </Suspense>
  )
}

