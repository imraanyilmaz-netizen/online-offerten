import type { Metadata } from 'next'
import BueroreinigungPageClient from '@/components/pages/services/BueroreinigungPageClient'

export const metadata: Metadata = {
  title: 'Büroreinigung – Kostenlose Offerten vergleichen',
  description: 'Reinigung für Unternehmen: Professionelle Büroreinigung Offerten vergleichen. Kostenlos bis zu 5 Offerten von geprüften Reinigungsfirmen einholen & bis zu 40% sparen.',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigung/bueroreinigung',
  },
  openGraph: {
    title: 'Büroreinigung – Kostenlose Offerten vergleichen',
    description: 'Reinigung für Unternehmen: Professionelle Büroreinigung Offerten vergleichen. Kostenlos Offerten von geprüften Reinigungsfirmen einholen.',
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
    description: 'Reinigung für Unternehmen: Büroreinigung Offerten vergleichen. Kostenlos Offerten von geprüften Reinigungsfirmen einholen.',
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



