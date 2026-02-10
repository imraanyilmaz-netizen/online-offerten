import type { Metadata } from 'next'
import StandortePageClient from '@/components/pages/StandortePageClient'

export const metadata: Metadata = {
  title: 'Standorte: Umzugsfirmen & Reinigungsfirmen Schweiz',
  description: 'Finden Sie Umzugsfirmen und Reinigungsfirmen in allen Schweizer Städten. Von Zürich bis Genf, von Basel bis Bern - wir haben Partner in Ihrer Nähe.',
  alternates: {
    canonical: 'https://online-offerten.ch/standorte',
  },
  openGraph: {
    title: 'Standorte: Umzugsfirmen & Reinigungsfirmen Schweiz',
    description: 'Finden Sie Umzugsfirmen und Reinigungsfirmen in allen Schweizer Städten. Von Zürich bis Genf, von Basel bis Bern - wir haben Partner in Ihrer Nähe.',
    url: 'https://online-offerten.ch/standorte',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/online-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Standorte',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Standorte: Umzugsfirmen & Reinigungsfirmen Schweiz',
    description: 'Finden Sie Umzugsfirmen und Reinigungsfirmen in allen Schweizer Städten. Von Zürich bis Genf, von Basel bis Bern.',
    images: ['https://online-offerten.ch/image/online-offerten.webp'],
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

export default function StandortePage() {
  return <StandortePageClient />
}



