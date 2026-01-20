import type { Metadata } from 'next'
import GeschaeftsumzugPageClient from '@/components/pages/services/GeschaeftsumzugPageClient'

export const metadata: Metadata = {
  title: 'Geschäftsumzug: Kostenlose Offerten vergleichen',
  description: 'Kosten für Büroumzug & Firmenumzug vergleichen. Geschäftsumzug in der Nähe: Gratis Offerten von geprüften Umzugsfirmen. Schnell, transparent und regional.',
  alternates: {
    canonical: 'https://online-offerten.ch/geschaeftsumzug',
    languages: {
      'de-CH': 'https://online-offerten.ch/geschaeftsumzug',
      'x-default': 'https://online-offerten.ch/geschaeftsumzug',
    },
  },
  openGraph: {
    title: 'Geschäftsumzug: Kostenlose Offerten vergleichen',
    description: 'Kosten für Büroumzug & Firmenumzug vergleichen. Geschäftsumzug in der Nähe: Gratis Offerten von geprüften Umzugsfirmen.',
    url: 'https://online-offerten.ch/geschaeftsumzug',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Geschäftsumzug',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Geschäftsumzug: Kostenlose Offerten vergleichen',
    description: 'Kosten für Büroumzug & Firmenumzug vergleichen. Geschäftsumzug in der Nähe: Gratis Offerten von geprüften Umzugsfirmen.',
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

export default function GeschaeftsumzugPage() {
  return (
    <>
      <link rel="alternate" hrefLang="de-CH" href="https://online-offerten.ch/geschaeftsumzug" />
      <link rel="alternate" hrefLang="x-default" href="https://online-offerten.ch/geschaeftsumzug" />
      <GeschaeftsumzugPageClient />
    </>
  )
}

