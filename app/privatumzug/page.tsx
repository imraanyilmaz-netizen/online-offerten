import type { Metadata } from 'next'
import PrivateUmzugPageClient from '@/components/pages/services/PrivateUmzugPageClient'

export const metadata: Metadata = {
  title: 'Privatumzug Offerten vergleichen – Bis zu 40% sparen',
  description: 'Privatumzug Offerten kostenlos vergleichen ✓ Offerten von geprüften Umzugsfirmen vergleichen. Wohnungsumzug, Hausumzug – sicher, stressfrei und bis zu 40% günstiger. Jetzt kostenlos Offerten anfordern!',
  alternates: {
    canonical: 'https://online-offerten.ch/privatumzug',
    languages: {
      'de-CH': 'https://online-offerten.ch/privatumzug',
      'x-default': 'https://online-offerten.ch/privatumzug',
    },
  },
  openGraph: {
    title: 'Privatumzug Offerten vergleichen – Bis zu 40% sparen',
    description: 'Privatumzug Offerten kostenlos vergleichen ✓ Offerten von geprüften Umzugsfirmen vergleichen. Wohnungsumzug, Hausumzug – sicher, stressfrei und bis zu 40% günstiger.',
    url: 'https://online-offerten.ch/privatumzug',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzugsservice-Schweiz/privatumzug-offerten-kostenlos-vergleichen.png',
        width: 1200,
        height: 630,
        alt: 'Privatumzug Offerten vergleichen',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privatumzug Offerten vergleichen – Bis zu 40% sparen',
    description: 'Privatumzug Offerten kostenlos vergleichen ✓ Offerten von geprüften Umzugsfirmen vergleichen. Wohnungsumzug, Hausumzug – sicher, stressfrei und bis zu 40% günstiger.',
    images: ['https://online-offerten.ch/image/umzugsservice-Schweiz/privatumzug-offerten-kostenlos-vergleichen.png'],
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

export default function PrivateUmzugPage() {
  return (
    <>
      <link rel="alternate" hreflang="de-CH" href="https://online-offerten.ch/privatumzug" />
      <link rel="alternate" hreflang="x-default" href="https://online-offerten.ch/privatumzug" />
      <PrivateUmzugPageClient />
    </>
  )
}

