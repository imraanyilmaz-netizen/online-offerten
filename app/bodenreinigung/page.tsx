import type { Metadata } from 'next'
import BodenreinigungPageClient from '@/components/pages/services/BodenreinigungPageClient'

export const metadata: Metadata = {
  title: 'Bodenreinigung – Kostenlose Offerten vergleichen',
  description: 'Bodenreinigung für Parkett, Stein oder Teppich: Erhalten Sie kostenlose Offerten und vergleichen Sie qualifizierte Reinigungsfirmen in Ihrer Region.',
  alternates: {
    canonical: 'https://online-offerten.ch/bodenreinigung',
  },
  openGraph: {
    title: 'Bodenreinigung – Kostenlose Offerten vergleichen',
    description: 'Bodenreinigung für Parkett, Stein oder Teppich: Erhalten Sie kostenlose Offerten und vergleichen Sie qualifizierte Reinigungsfirmen in Ihrer Region.',
    url: 'https://online-offerten.ch/bodenreinigung',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Bodenreinigung',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bodenreinigung – Kostenlose Offerten vergleichen',
    description: 'Bodenreinigung für Parkett, Stein oder Teppich: Erhalten Sie kostenlose Offerten und vergleichen Sie qualifizierte Reinigungsfirmen.',
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

export default function BodenreinigungPage() {
  return <BodenreinigungPageClient />
}

