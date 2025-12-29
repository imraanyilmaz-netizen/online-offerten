import type { Metadata } from 'next'
import UmzugsfirmaZurichPageClient from '@/components/pages/locations/UmzugsfirmaZurichPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Zürich > Umzugsofferten vergleichen',
  description: 'Finden Sie die passende Zügelfirma & Reinigungsfirma in Zürich - Umzugsofferten vergleichen bis zu 40% sparen! - Kostenlose Offerten',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-zuerich',
  },
  openGraph: {
    title: 'Umzugsfirma Zürich > Umzugsofferten vergleichen',
    description: 'Finden Sie die passende Zügelfirma & Reinigungsfirma in Zürich - Umzugsofferten vergleichen bis zu 40% sparen! - Kostenlose Offerten',
    url: 'https://online-offerten.ch/umzugsfirma-zuerich',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Zürich',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Zürich > Umzugsofferten vergleichen',
    description: 'Finden Sie die passende Zügelfirma & Reinigungsfirma in Zürich - Umzugsofferten vergleichen bis zu 40% sparen!',
    images: ['https://online-offerten.ch/image/services-professionals.png'],
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

export default function UmzugsfirmaZurichPage() {
  return <UmzugsfirmaZurichPageClient />
}
