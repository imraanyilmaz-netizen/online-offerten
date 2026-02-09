import type { Metadata } from 'next'
import UnterhaltsreinigungPageClient from '@/components/pages/services/UnterhaltsreinigungPageClient'

export const metadata: Metadata = {
  title: 'Unterhaltsreinigung – Kostenlose Offerten vergleichen',
  description: 'Unterhaltsreinigung für Büro, Haus oder Wohnung: Fordern Sie kostenlose Offerten an und vergleichen Sie professionelle Reinigungsservices bequem online.',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigung/unterhaltsreinigung',
  },
  openGraph: {
    title: 'Unterhaltsreinigung – Kostenlose Offerten vergleichen',
    description: 'Unterhaltsreinigung für Büro, Haus oder Wohnung: Fordern Sie kostenlose Offerten an und vergleichen Sie professionelle Reinigungsservices bequem online.',
    url: 'https://online-offerten.ch/reinigung/unterhaltsreinigung',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/reinigungsfirma.webp',
        width: 1200,
        height: 630,
        alt: 'Unterhaltsreinigung',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unterhaltsreinigung – Kostenlose Offerten vergleichen',
    description: 'Unterhaltsreinigung für Büro, Haus oder Wohnung: Fordern Sie kostenlose Offerten an und vergleichen Sie professionelle Reinigungsservices bequem online.',
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

export default function UnterhaltsreinigungPage() {
  return <UnterhaltsreinigungPageClient />
}

