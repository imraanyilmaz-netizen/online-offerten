import type { Metadata } from 'next'
import MalerarbeitenPageClient from '@/components/pages/services/MalerarbeitenPageClient'

export const metadata: Metadata = {
  title: 'Malerarbeiten Schweiz: Kostenlose Offerten vergleichen',
  description: 'Malerarbeiten Schweiz: Vergleichen Sie kostenlos Offerten von geprüften Malerfirmen. Innenanstrich, Aussenanstrich, Fassadenanstrich & Renovierung – sicher, professionell und bis zu 40% günstiger. Jetzt Offerten anfordern!',
  alternates: {
    canonical: 'https://online-offerten.ch/malerarbeiten',
  },
  openGraph: {
    title: 'Malerarbeiten Schweiz finden & vergleichen',
    description: 'Vergleichen Sie kostenlos Offerten von geprüften Malerfirmen. Innenanstrich, Aussenanstrich, Fassadenanstrich & Renovierung.',
    url: 'https://online-offerten.ch/malerarbeiten',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/1633bb6a22ddc3924f0c0576a88ab9a8.png',
        width: 1200,
        height: 630,
        alt: 'Malerarbeiten Schweiz',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malerarbeiten Schweiz finden & vergleichen',
    description: 'Vergleichen Sie kostenlos Offerten von geprüften Malerfirmen. Innenanstrich, Aussenanstrich, Fassadenanstrich & Renovierung.',
    images: ['https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/1633bb6a22ddc3924f0c0576a88ab9a8.png'],
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

export default function MalerarbeitenPage() {
  return <MalerarbeitenPageClient />
}

