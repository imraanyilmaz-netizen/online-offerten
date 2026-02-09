import type { Metadata } from 'next'
import UmzugNachBelgienPageClient from '@/components/pages/international/UmzugNachBelgienPageClient'

export const metadata: Metadata = {
  title: 'Umzug nach Belgien – Umzugsfirmen vergleichen',
  description: 'Planen Sie Ihren Umzug von der Schweiz nach Belgien? Vergleichen Sie hier professionelle und geprüfte Umzugsfirmen. Kostenlose Offerten für Privatumzug, Geschäftsumzug, Reinigung und Entsorgung.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/internationale-umzuege/umzug-nach-belgien',
  },
  openGraph: {
    title: 'Umzug nach Belgien | Günstige Umzugsfirmen aus der Schweiz',
    description: 'Planen Sie Ihren Umzug von der Schweiz nach Belgien? Vergleichen Sie hier professionelle und geprüfte Umzugsfirmen. Kostenlose Offerten für Privatumzug, Geschäftsumzug, Reinigung und Entsorgung.',
    url: 'https://online-offerten.ch/umzugsfirma/internationale-umzuege/umzug-nach-belgien',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/fotos/internationalen-umzuegen.webp',
        width: 1200,
        height: 630,
        alt: 'Umzug nach Belgien',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzug nach Belgien | Günstige Umzugsfirmen aus der Schweiz',
    description: 'Planen Sie Ihren Umzug von der Schweiz nach Belgien? Vergleichen Sie hier professionelle und geprüfte Umzugsfirmen.',
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

export default function UmzugNachBelgienPage() {
  return <UmzugNachBelgienPageClient />
}

