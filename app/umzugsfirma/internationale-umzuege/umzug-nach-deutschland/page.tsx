import type { Metadata } from 'next'
import UmzugNachDeutschlandPageClient from '@/components/pages/international/UmzugNachDeutschlandPageClient'

export const metadata: Metadata = {
  title: 'Umzug nach Deutschland – Umzugsfirmen vergleichen',
  description: 'Planen Sie Ihren Umzug von der Schweiz nach Deutschland? Vergleichen Sie hier professionelle Umzugsfirmen für Privatumzug, Geschäftsumzug, Reinigung und Entsorgung. Holen Sie sich jetzt kostenlose Offerten.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/internationale-umzuege/umzug-nach-deutschland',
  },
  openGraph: {
    title: 'Umzug nach Deutschland | Umzugsfirmen aus der Schweiz vergleichen',
    description: 'Planen Sie Ihren Umzug von der Schweiz nach Deutschland? Vergleichen Sie hier professionelle Umzugsfirmen für Privatumzug, Geschäftsumzug, Reinigung und Entsorgung.',
    url: 'https://online-offerten.ch/umzugsfirma/internationale-umzuege/umzug-nach-deutschland',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/fotos/internationalen-umzuegen.webp',
        width: 1200,
        height: 630,
        alt: 'Umzug nach Deutschland',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzug nach Deutschland | Umzugsfirmen aus der Schweiz vergleichen',
    description: 'Planen Sie Ihren Umzug von der Schweiz nach Deutschland? Vergleichen Sie hier professionelle Umzugsfirmen für Privatumzug, Geschäftsumzug, Reinigung und Entsorgung.',
    images: ['https://online-offerten.ch/fotos/internationalen-umzuegen.webp'],
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

export default function UmzugNachDeutschlandPage() {
  return <UmzugNachDeutschlandPageClient />
}

