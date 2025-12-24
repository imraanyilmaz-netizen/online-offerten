import type { Metadata } from 'next'
import UmzugskostenRechnerPageClient from '@/components/pages/tools/UmzugskostenRechnerPageClient'

export const metadata: Metadata = {
  title: 'Umzugskosten-Rechner 2024: Kostenlos berechnen in 2 Minuten | Online-Offerten.ch',
  description: 'Umzugskosten kostenlos berechnen: In 2 Minuten wissen, was Ihr Umzug kostet! Unser Rechner liefert sofortige Preis-Schätzung für Umzüge in der Schweiz. Vergleichen Sie mehrere Angebote & sparen Sie bis zu 40%.',
  keywords: 'umzugskosten rechner, umzugskosten berechnen, umzugskosten schweiz, umzug preis berechnen, umzugskosten kalkulator, kosten umzug schweiz, umzugskosten schätzung, umzug preis, umzugskosten rechner schweiz, umzug kostenlos berechnen, umzugskosten pro zimmer, umzugskosten vergleich, umzugsfirma preise, umzugsunternehmen kosten, umzugspreis schweiz, umzugsbudget berechnen, umzugskosten schätzen, was kostet ein umzug, umzugskosten 2024, günstiger umzug, umzugsofferten vergleichen, umzugskosten sparen, umzugskosten zürich, umzugskosten genf, umzugskosten bern, umzugskosten basel, umzugskosten steuer absetzen, umzugskosten kalkulation, umzugskosten tabelle, umzugskosten nach distanz, umzugskosten nach zimmeranzahl, versteckte umzugskosten, umzugskosten checkliste',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugskosten-rechner',
  },
  openGraph: {
    title: 'Umzugskosten-Rechner 2024: Kostenlos berechnen in 2 Minuten',
    description: 'Umzugskosten kostenlos berechnen: In 2 Minuten wissen, was Ihr Umzug kostet! Unser Rechner liefert sofortige Preis-Schätzung für Umzüge in der Schweiz.',
    url: 'https://online-offerten.ch/umzugskosten-rechner',
    siteName: 'Online-Offerten.ch',
    locale: 'de_CH',
    type: 'website',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Umzugskosten-Rechner - Kostenlos berechnen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugskosten-Rechner 2024: Kostenlos berechnen',
    description: 'Umzugskosten kostenlos berechnen: In 2 Minuten wissen, was Ihr Umzug kostet!',
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

export default function UmzugskostenRechnerPage() {
  return <UmzugskostenRechnerPageClient />
}
