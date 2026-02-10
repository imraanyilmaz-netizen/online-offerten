import type { Metadata } from 'next'
import HofreinigungPageClient from '@/components/pages/services/HofreinigungPageClient'

export const metadata: Metadata = {
  title: 'Hofreinigung – Kostenlose Offerten vergleichen',
  description: 'Professionelle Hofreinigung: Fordern Sie kostenlose Offerten an und vergleichen Sie Reinigungsfirmen für saubere Aussenbereiche und gepflegte Umgebung.',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigung/hofreinigung',
  },
  openGraph: {
    title: 'Hofreinigung – Kostenlose Offerten vergleichen',
    description: 'Professionelle Hofreinigung: Fordern Sie kostenlose Offerten an und vergleichen Sie Reinigungsfirmen für saubere Aussenbereiche und gepflegte Umgebung.',
    url: 'https://online-offerten.ch/reinigung/hofreinigung',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/reinigungsfirma.webp',
        width: 1200,
        height: 630,
        alt: 'Hofreinigung',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hofreinigung – Kostenlose Offerten vergleichen',
    description: 'Professionelle Hofreinigung: Fordern Sie kostenlose Offerten an und vergleichen Sie Reinigungsfirmen für saubere Aussenbereiche.',
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

export default function HofreinigungPage() {
  return <HofreinigungPageClient />
}



