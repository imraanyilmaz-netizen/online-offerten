import type { Metadata } from 'next'
import ReinigungPageClient from '@/components/pages/services/ReinigungPageClient'

export const metadata: Metadata = {
  title: 'Reinigungsfirma – Kostenlose Offerten vergleichen | Online-Offerten.ch',
  description: 'Professionelle Reinigungsdienstleistungen für Wohnung, Haus und Büro. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen in Ihrer Region und sparen Sie bis zu 40%.',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigung',
  },
  openGraph: {
    title: 'Reinigungsfirma – Kostenlose Offerten vergleichen',
    description: 'Professionelle Reinigungsdienstleistungen für Wohnung, Haus und Büro. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen in Ihrer Region und sparen Sie bis zu 40%.',
    url: 'https://online-offerten.ch/reinigung',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/reinigungsfirma.webp',
        width: 1200,
        height: 630,
        alt: 'Reinigungsfirma',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reinigungsfirma – Kostenlose Offerten vergleichen',
    description: 'Professionelle Reinigungsdienstleistungen für Wohnung, Haus und Büro. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen in Ihrer Region.',
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

export default function ReinigungPage() {
  return <ReinigungPageClient />
}

