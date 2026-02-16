import type { Metadata } from 'next'
import ReinigungPageClient from '@/components/pages/services/ReinigungPageClient'

export const metadata: Metadata = {
  title: 'Reinigungsfirma Schweiz – Kostenlose Offerten vergleichen & sparen',
  description: 'Reinigung für Privatpersonen & Unternehmen: Kostenlos bis zu 5 Offerten von geprüften Reinigungsfirmen in der Schweiz vergleichen. Umzugsreinigung, Wohnungsreinigung & Büroreinigung. ✓ Abnahmegarantie ✓ 100% kostenlos',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigung',
  },
  openGraph: {
    title: 'Reinigungsfirma Schweiz – Kostenlose Offerten vergleichen & sparen',
    description: 'Reinigung für Privatpersonen & Unternehmen: Kostenlos bis zu 5 Offerten von geprüften Reinigungsfirmen in der Schweiz vergleichen.',
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
    title: 'Reinigungsfirma Schweiz – Kostenlose Offerten vergleichen & sparen',
    description: 'Reinigung für Privatpersonen & Unternehmen: Kostenlos Offerten von geprüften Reinigungsfirmen vergleichen.',
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



