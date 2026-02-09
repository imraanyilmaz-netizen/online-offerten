import type { Metadata } from 'next'
import BaureinigungPageClient from '@/components/pages/services/BaureinigungPageClient'

export const metadata: Metadata = {
  title: 'Baureinigung – Kostenlose Offerten vergleichen',
  description: 'Baureinigung nach Neubau oder Renovation: Holen Sie kostenlose Offerten ein und vergleichen Sie zuverlässige Reinigungsfirmen für perfekte Resultate.',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigung/baureinigung',
  },
  openGraph: {
    title: 'Baureinigung – Kostenlose Offerten vergleichen',
    description: 'Baureinigung nach Neubau oder Renovation: Holen Sie kostenlose Offerten ein und vergleichen Sie zuverlässige Reinigungsfirmen für perfekte Resultate.',
    url: 'https://online-offerten.ch/reinigung/baureinigung',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/reinigungsfirma.webp',
        width: 1200,
        height: 630,
        alt: 'Baureinigung',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baureinigung – Kostenlose Offerten vergleichen',
    description: 'Baureinigung nach Neubau oder Renovation: Holen Sie kostenlose Offerten ein und vergleichen Sie zuverlässige Reinigungsfirmen.',
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

export default function BaureinigungPage() {
  return <BaureinigungPageClient />
}

