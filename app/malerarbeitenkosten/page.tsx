import type { Metadata } from 'next'
import MalerarbeitenPageClient from '@/components/pages/services/MalerarbeitenPageClient'

export const metadata: Metadata = {
  title: 'Malerarbeiten Schweiz: Kostenlose Offerten vergleichen',
  description: 'Malerarbeiten Schweiz: Vergleichen Sie kostenlos Offerten von geprüften Malerfirmen. Innenanstrich, Aussenanstrich, Fassadenanstrich & Renovierung – sicher, professionell und bis zu 40% günstiger. Jetzt Offerten anfordern!',
  alternates: {
    canonical: 'https://online-offerten.ch/malerarbeitenkosten',
  },
  openGraph: {
    title: 'Malerarbeiten Schweiz finden & vergleichen',
    description: 'Vergleichen Sie kostenlos Offerten von geprüften Malerfirmen. Innenanstrich, Aussenanstrich, Fassadenanstrich & Renovierung.',
    url: 'https://online-offerten.ch/malerarbeitenkosten',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/bilder/malerarbeiten-600-400.webp',
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
    images: ['https://online-offerten.ch/bilder/malerarbeiten-600-400.webp'],
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

export default function MalerarbeitenKostenPage() {
  return <MalerarbeitenPageClient />
}



