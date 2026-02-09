import type { Metadata } from 'next'
import ReinigungskostenRechnerPageClient from '@/components/pages/tools/ReinigungskostenRechnerPageClient'

export const metadata: Metadata = {
  title: 'Reinigungskosten berechnen: Was kostet eine Reinigung in der Schweiz?',
  description: 'Endreinigung Wohnung Kosten 2026: Der komplette Schweizer Kostenguide für stressfreie Wohnungsübergabe. Detaillierte Preistabellen, regionale Unterschiede und 10 bewährte Spartipps die wirklich funktionieren. Bis zu 30% sparen durch Preisvergleich.',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigung/reinigungskosten',
  },
  openGraph: {
    title: 'Reinigungskosten berechnen: Was kostet eine Reinigung in der Schweiz?',
    description: 'Reinigungskosten kostenlos berechnen: In 1 Minute wissen, was Ihre Reinigung kostet! Unser Reinigungskosten-Rechner liefert sofortige Preis-Schätzung für Umzugsreinigung, Wohnungsreinigung & mehr in der Schweiz.',
    url: 'https://online-offerten.ch/reinigung/reinigungskosten',
    siteName: 'Online-Offerten.ch',
    locale: 'de_CH',
    type: 'website',
    images: [
      {
        url: 'https://online-offerten.ch/image/reinigungsfirma.webp',
        width: 1200,
        height: 630,
        alt: 'Reinigungskosten berechnen: Was kostet eine Reinigung in der Schweiz?',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reinigungskosten berechnen: Was kostet eine Reinigung in der Schweiz?',
    description: 'Reinigungskosten kostenlos berechnen: In 1 Minute wissen, was Ihre Reinigung kostet!',
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

export default function ReinigungskostenPage() {
  return <ReinigungskostenRechnerPageClient />
}

