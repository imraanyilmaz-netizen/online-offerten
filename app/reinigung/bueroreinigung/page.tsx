import type { Metadata } from 'next'
import BueroreinigungPageClient from '@/components/pages/services/BueroreinigungPageClient'

export const metadata: Metadata = {
  title: 'Büroreinigung – Kostenlose Offerten vergleichen',
  description: 'Professionelle Büroreinigung. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Büroreinigung garantiert.',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigung/bueroreinigung',
  },
  openGraph: {
    title: 'Büroreinigung – Kostenlose Offerten vergleichen',
    description: 'Professionelle Büroreinigung. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach.',
    url: 'https://online-offerten.ch/reinigung/bueroreinigung',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/reinigungsfirma.webp',
        width: 1200,
        height: 630,
        alt: 'Büroreinigung',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Büroreinigung – Kostenlose Offerten vergleichen',
    description: 'Professionelle Büroreinigung. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen.',
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

export default function BueroreinigungPage() {
  return <BueroreinigungPageClient />
}

