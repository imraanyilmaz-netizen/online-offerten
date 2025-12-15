import type { Metadata } from 'next'
import PrivateUmzugPageClient from '@/components/pages/services/PrivateUmzugPageClient'

export const metadata: Metadata = {
  title: 'Privatumzug Offerten kostenlos vergleichen » Bis zu 40% sparen',
  description: 'Privatumzug Offerten kostenlos vergleichen ✓ Offerten von geprüften Umzugsfirmen vergleichen. Wohnungsumzug, Hausumzug – sicher, stressfrei und bis zu 40% günstiger. Jetzt kostenlos Offerten anfordern!',
  alternates: {
    canonical: 'https://online-offerten.ch/privatumzug',
  },
  openGraph: {
    title: 'Privatumzug Offerten kostenlos vergleichen » Bis zu 40% sparen',
    description: 'Privatumzug Offerten kostenlos vergleichen ✓ Offerten von geprüften Umzugsfirmen vergleichen. Wohnungsumzug, Hausumzug – sicher, stressfrei und bis zu 40% günstiger.',
    url: 'https://online-offerten.ch/privatumzug',
    images: [
      {
        url: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/31d61ce9d2ebb52fb5f267adfccd6051.png',
        width: 1200,
        height: 630,
        alt: 'Privatumzug Offerten vergleichen',
      },
    ],
  },
}

export default function PrivateUmzugPage() {
  return <PrivateUmzugPageClient />
}

