import type { Metadata } from 'next'
import UmzugskostenRechnerPageClient from '@/components/pages/tools/UmzugskostenRechnerPageClient'

export const metadata: Metadata = {
  title: 'Umzugskosten berechnen: Kostenlos & schnell',
  description: 'Umzugskosten berechnen: Kosten Umzugsunternehmen, Umziehen Kosten & Umzugsfirma Kosten Tabelle. Kostenloser Umzugskosten-Rechner für die Schweiz. In 2 Minuten wissen, was Ihr Umzug kostet! Vergleichen Sie mehrere Angebote & sparen Sie bis zu 40%.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugskosten-rechner',
  },
  openGraph: {
    title: 'Umzugskosten berechnen: Kosten Umzugsunternehmen & Umzugsfirma Kosten Tabelle',
    description: 'Umzugskosten berechnen: Kosten Umzugsunternehmen, Umziehen Kosten & Umzugsfirma Kosten Tabelle. Kostenloser Umzugskosten-Rechner für die Schweiz. In 2 Minuten wissen, was Ihr Umzug kostet!',
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
    title: 'Umzugskosten berechnen: Kosten Umzugsunternehmen & Umzugsfirma Kosten Tabelle',
    description: 'Umzugskosten berechnen: Kosten Umzugsunternehmen, Umziehen Kosten & Umzugsfirma Kosten Tabelle. Kostenloser Rechner für die Schweiz.',
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
