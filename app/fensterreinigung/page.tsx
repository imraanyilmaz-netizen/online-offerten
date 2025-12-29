import type { Metadata } from 'next'
import FensterreinigungPageClient from '@/components/pages/services/FensterreinigungPageClient'

export const metadata: Metadata = {
  title: 'Fensterreinigung – Kostenlose Offerten vergleichen',
  description: 'Fensterreinigung vom Profi: Fordern Sie kostenlose Offerten an und vergleichen Sie Reinigungsfirmen für streifenfreie und professionelle Ergebnisse.',
  alternates: {
    canonical: 'https://online-offerten.ch/fensterreinigung',
  },
  openGraph: {
    title: 'Fensterreinigung – Kostenlose Offerten vergleichen',
    description: 'Fensterreinigung vom Profi: Fordern Sie kostenlose Offerten an und vergleichen Sie Reinigungsfirmen für streifenfreie und professionelle Ergebnisse.',
    url: 'https://online-offerten.ch/fensterreinigung',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Fensterreinigung',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fensterreinigung – Kostenlose Offerten vergleichen',
    description: 'Fensterreinigung vom Profi: Fordern Sie kostenlose Offerten an und vergleichen Sie Reinigungsfirmen für streifenfreie und professionelle Ergebnisse.',
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

export default function FensterreinigungPage() {
  return <FensterreinigungPageClient />
}

