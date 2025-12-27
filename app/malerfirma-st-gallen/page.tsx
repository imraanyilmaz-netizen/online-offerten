import type { Metadata } from 'next'
import { Suspense } from 'react'
import MalerfirmaStGallenPageClient from '@/components/pages/locations/MalerfirmaStGallenPageClient'

export const metadata: Metadata = {
  title: 'Malerfirma in St. Gallen finden » Bis zu 40% sparen | Online-Offerten.ch',
  description: 'Malerfirma in St. Gallen finden ✓ Bis zu 6 kostenlose Offerten von geprüften Malerfirmen in St. Gallen. Innenanstrich, Aussenanstrich, Fassadenanstrich – professionell, sicher und bis zu 40% günstiger. Jetzt kostenlos Offerten anfordern!',
  keywords: 'Malerfirma St. Gallen, Malerfirma in St. Gallen, Maler St. Gallen, Malerarbeiten St. Gallen, Innenanstrich St. Gallen, Aussenanstrich St. Gallen, Fassadenanstrich St. Gallen, Malerfirma St. Gallen vergleichen, Malerbetrieb St. Gallen',
  alternates: {
    canonical: 'https://online-offerten.ch/malerfirma-st-gallen',
  },
  openGraph: {
    title: 'Malerfirma in St. Gallen finden » Bis zu 40% sparen',
    description: 'Malerfirma in St. Gallen finden ✓ Bis zu 6 kostenlose Offerten von geprüften Malerfirmen in St. Gallen. Innenanstrich, Aussenanstrich – professionell, sicher und bis zu 40% günstiger.',
    url: 'https://online-offerten.ch/malerfirma-st-gallen',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/malerfirma-st-gallen-finden.png',
        width: 1200,
        height: 630,
        alt: 'Malerfirma in St. Gallen finden',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malerfirma in St. Gallen finden » Bis zu 40% sparen',
    description: 'Malerfirma in St. Gallen finden ✓ Bis zu 6 kostenlose Offerten von geprüften Malerfirmen in St. Gallen.',
    images: ['https://online-offerten.ch/image/malerfirma-st-gallen-finden.png'],
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

export default function MalerfirmaStGallenPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div></div>}>
      <MalerfirmaStGallenPageClient />
    </Suspense>
  )
}
