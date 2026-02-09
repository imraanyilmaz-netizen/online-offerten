import type { Metadata } from 'next'
import GrundreinigungPageClient from '@/components/pages/services/GrundreinigungPageClient'

export const metadata: Metadata = {
  title: 'Grundreinigung – Kostenlose Offerten vergleichen',
  description: 'Gründliche Grundreinigung vom Profi: Erhalten Sie kostenlose Angebote von zertifizierten Reinigungsfirmen und wählen Sie den besten Anbieter aus.',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigung/grundreinigung',
  },
  openGraph: {
    title: 'Grundreinigung – Kostenlose Offerten vergleichen',
    description: 'Gründliche Grundreinigung vom Profi: Erhalten Sie kostenlose Angebote von zertifizierten Reinigungsfirmen und wählen Sie den besten Anbieter aus.',
    url: 'https://online-offerten.ch/reinigung/grundreinigung',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/reinigungsfirma.webp',
        width: 1200,
        height: 630,
        alt: 'Grundreinigung',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grundreinigung – Kostenlose Offerten vergleichen',
    description: 'Gründliche Grundreinigung vom Profi: Erhalten Sie kostenlose Angebote von zertifizierten Reinigungsfirmen.',
    images: ['https://online-offerten.ch/image/reinigungsfirma.webp'],
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

export default function GrundreinigungPage() {
  return <GrundreinigungPageClient />
}

