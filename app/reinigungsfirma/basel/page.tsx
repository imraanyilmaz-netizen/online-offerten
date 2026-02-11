import type { Metadata } from 'next'
import { Suspense } from 'react'
import ReinigungsfirmaStadtPageClient from '@/components/pages/info/ReinigungsfirmaStadtPageClient'

export const metadata: Metadata = {
  title: 'Reinigungsfirma Basel finden – Bis zu 40% sparen',
  description: 'Reinigungsfirma Basel finden ✓ Bis zu 5 kostenlose Offerten von geprüften Reinigungsfirmen in Basel. Büroreinigung, Haushaltsreinigung, Endreinigung – professionell, sicher und bis zu 40% günstiger. Jetzt kostenlos Offerten anfordern!',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigungsfirma/basel',
  },
  openGraph: {
    title: 'Reinigungsfirma Basel finden » Bis zu 40% sparen',
    description: 'Reinigungsfirma Basel finden ✓ Bis zu 5 kostenlose Offerten von geprüften Reinigungsfirmen in Basel. Büroreinigung, Haushaltsreinigung – professionell, sicher und bis zu 40% günstiger.',
    url: 'https://online-offerten.ch/reinigungsfirma/basel',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/reinigungsfirma-basel-finden.png',
        width: 1200,
        height: 630,
        alt: 'Reinigungsfirma Basel finden',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reinigungsfirma Basel finden » Bis zu 40% sparen',
    description: 'Reinigungsfirma Basel finden ✓ Bis zu 5 kostenlose Offerten von geprüften Reinigungsfirmen in Basel.',
    images: ['https://online-offerten.ch/image/reinigungsfirma-basel-finden.png'],
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
  name: 'Basel',
  slug: 'basel',
  canonicalUrl: 'https://online-offerten.ch/reinigungsfirma/basel',
  description: 'Finden Sie die besten Reinigungsunternehmen in Basel. Vergleichen Sie bis zu 5 kostenlose Offerten von geprüften Reinigungsanbietern in Basel.',
}

export default function ReinigungsfirmaBaselPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div></div>}>
      <ReinigungsfirmaStadtPageClient stadtInfo={stadtInfo} />
    </Suspense>
  )
}


















