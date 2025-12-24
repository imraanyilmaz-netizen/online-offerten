import type { Metadata } from 'next'
import ReinigungskostenRechnerPageClient from '@/components/pages/tools/ReinigungskostenRechnerPageClient'

export const metadata: Metadata = {
  title: 'Reinigungskosten-Rechner 2024: Kostenlos berechnen in 1 Minute | Online-Offerten.ch',
  description: 'Reinigungskosten kostenlos berechnen: In 1 Minute wissen, was Ihre Reinigung kostet! Unser Reinigungskosten-Rechner liefert sofortige Preis-Schätzung für Umzugsreinigung, Wohnungsreinigung & mehr in der Schweiz. Vergleichen Sie mehrere Angebote & sparen Sie bis zu 40%.',
  keywords: 'reinigungskosten rechner, reinigungskosten berechnen, reinigungskosten schweiz, umzugsreinigung kosten, wohnungsreinigung kosten, reinigungskosten rechner schweiz, reinigungskosten schätzen, kosten reinigung berechnen, reinigungskosten kalkulator, reinigung preis berechnen, umzugsreinigung preise, wohnungsreinigung preise, reinigungsfirma preise, reinigungskosten pro m2, endreinigung kosten, abnahmegarantie reinigung',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigungskosten-rechner',
  },
  openGraph: {
    title: 'Reinigungskosten-Rechner 2024: Kostenlos berechnen in 1 Minute',
    description: 'Reinigungskosten kostenlos berechnen: In 1 Minute wissen, was Ihre Reinigung kostet! Unser Reinigungskosten-Rechner liefert sofortige Preis-Schätzung für Umzugsreinigung, Wohnungsreinigung & mehr in der Schweiz.',
    url: 'https://online-offerten.ch/reinigungskosten-rechner',
    siteName: 'Online-Offerten.ch',
    locale: 'de_CH',
    type: 'website',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Reinigungskosten-Rechner - Kostenlos berechnen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reinigungskosten-Rechner 2024: Kostenlos berechnen',
    description: 'Reinigungskosten kostenlos berechnen: In 1 Minute wissen, was Ihre Reinigung kostet!',
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

export default function ReinigungskostenRechnerPage() {
  return <ReinigungskostenRechnerPageClient />
}
