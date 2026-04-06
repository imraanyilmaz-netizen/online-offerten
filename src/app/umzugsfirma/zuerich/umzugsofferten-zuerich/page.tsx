import type { Metadata } from 'next'
import { Suspense } from 'react'
import UmzugsoffertenZuerichPageClient from '@/components/pages/info/UmzugsoffertenZuerichPageClient'

export const metadata: Metadata = {
  title: 'Umzugsofferten Zürich – kostenlos vergleichen & passende Zügelfirma finden',
  description: 'Umzugsofferten Zürich kostenlos vergleichen ✓ In wenigen Minuten zur passenden Zügelfirma. Bis zu 5 geprüfte Offerten von Umzugsfirmen in Zürich. Jetzt kostenlos anfordern!',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/zuerich/umzugsofferten-zuerich',
  },
  openGraph: {
    title: 'Umzugsofferten Zürich – kostenlos vergleichen & passende Zügelfirma finden',
    description: 'Umzugsofferten Zürich kostenlos vergleichen ✓ In wenigen Minuten zur passenden Zügelfirma. Bis zu 5 geprüfte Offerten von Umzugsfirmen in Zürich.',
    url: 'https://online-offerten.ch/umzugsfirma/zuerich/umzugsofferten-zuerich',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzugsservice-Schweiz/umzugsofferten-zuerich.png',
        width: 1200,
        height: 630,
        alt: 'Umzugsofferten Zürich vergleichen',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsofferten Zürich – kostenlos vergleichen',
    description: 'Umzugsofferten Zürich kostenlos vergleichen ✓ In wenigen Minuten zur passenden Zügelfirma.',
    images: ['https://online-offerten.ch/image/umzugsservice-Schweiz/umzugsofferten-zuerich.png'],
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

export default function UmzugsoffertenZuerichPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <UmzugsoffertenZuerichPageClient />
    </Suspense>
  )
}



