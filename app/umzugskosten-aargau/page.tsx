import type { Metadata } from 'next'
import UmzugskostenAargauPageClient from '@/components/pages/locations/UmzugskostenAargauPageClient'

export const metadata: Metadata = {
  title: 'Umzugskosten Aargau – Preise & Kostenfaktoren 2025',
  description: 'Umzugskosten Aargau berechnen ✓ Detaillierte Preisübersicht & Spartipps. Kostenlose Offerten vergleichen & bis zu 40% sparen. Regionale Preisunterschiede erklärt.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugskosten-aargau',
  },
  openGraph: {
    title: 'Umzugskosten Aargau – Preise & Kostenfaktoren 2025',
    description: 'Detaillierte Preisübersicht für Umzüge im Aargau. Kostenfaktoren, Spartipps und regionale Vergleiche.',
    url: 'https://online-offerten.ch/umzugskosten-aargau',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-aargau-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Umzugskosten Aargau',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugskosten Aargau – Preise & Kostenfaktoren 2025',
    description: 'Detaillierte Preisübersicht für Umzüge im Aargau',
    images: ['https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-aargau-offerten.webp'],
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

export default function UmzugskostenAargauPage() {
  return <UmzugskostenAargauPageClient />
}

