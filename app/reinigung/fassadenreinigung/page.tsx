import type { Metadata } from 'next'
import FassadenreinigungPageClient from '@/components/pages/services/FassadenreinigungPageClient'

export const metadata: Metadata = {
  title: 'Fassadenreinigung – Kostenlose Offerten vergleichen',
  description: 'Fassadenreinigung für Haus oder Gebäude: Erhalten Sie kostenlose Offerten und vergleichen Sie erfahrene Reinigungsfirmen für nachhaltige Sauberkeit.',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigung/fassadenreinigung',
  },
  openGraph: {
    title: 'Fassadenreinigung – Kostenlose Offerten vergleichen',
    description: 'Fassadenreinigung für Haus oder Gebäude: Erhalten Sie kostenlose Offerten und vergleichen Sie erfahrene Reinigungsfirmen für nachhaltige Sauberkeit.',
    url: 'https://online-offerten.ch/reinigung/fassadenreinigung',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/reinigungsfirma.webp',
        width: 1200,
        height: 630,
        alt: 'Fassadenreinigung',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fassadenreinigung – Kostenlose Offerten vergleichen',
    description: 'Fassadenreinigung für Haus oder Gebäude: Erhalten Sie kostenlose Offerten und vergleichen Sie erfahrene Reinigungsfirmen.',
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

export default function FassadenreinigungPage() {
  return <FassadenreinigungPageClient />
}

