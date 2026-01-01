import type { Metadata } from 'next'
import { Suspense } from 'react'
import MalerfirmaBernPageClient from '@/components/pages/locations/MalerfirmaBernPageClient'

export const metadata: Metadata = {
  title: 'Malerfirma in Bern finden » Bis zu 40% sparen | Online-Offerten.ch',
  description: 'Malerfirma in Bern finden ✓ Bis zu 6 kostenlose Offerten von geprüften Malerfirmen in Bern. Innenanstrich, Aussenanstrich, Fassadenanstrich – professionell, sicher und bis zu 40% günstiger. Jetzt kostenlos Offerten anfordern!',
  alternates: {
    canonical: 'https://online-offerten.ch/malerfirma-bern',
  },
  openGraph: {
    title: 'Malerfirma in Bern finden » Bis zu 40% sparen',
    description: 'Malerfirma in Bern finden ✓ Bis zu 6 kostenlose Offerten von geprüften Malerfirmen in Bern. Innenanstrich, Aussenanstrich – professionell, sicher und bis zu 40% günstiger.',
    url: 'https://online-offerten.ch/malerfirma-bern',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/malerfirma-bern-finden.png',
        width: 1200,
        height: 630,
        alt: 'Malerfirma in Bern finden',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malerfirma in Bern finden » Bis zu 40% sparen',
    description: 'Malerfirma in Bern finden ✓ Bis zu 6 kostenlose Offerten von geprüften Malerfirmen in Bern.',
    images: ['https://online-offerten.ch/image/malerfirma-bern-finden.png'],
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

export default function MalerfirmaBernPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div></div>}>
      <MalerfirmaBernPageClient />
    </Suspense>
  )
}
