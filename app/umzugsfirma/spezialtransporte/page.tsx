import type { Metadata } from 'next'
import SpezialtransportePageClient from '@/components/pages/services/SpezialtransportePageClient'

export const metadata: Metadata = {
  title: 'Spezialtransporte: Kostenlose Offerten vergleichen',
  description: 'Spezialtransporte: Vergleichen Sie kostenlos mehrere geprüfte Firmen für Klavier-, Tresor- und Maschinentransport. Sicher, versichert und professionell. Jetzt Offerten anfordern!',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/spezialtransporte',
  },
  openGraph: {
    title: 'Spezialtransporte: Kostenlose Offerten vergleichen',
    description: 'Spezialtransporte: Vergleichen Sie kostenlos mehrere geprüfte Firmen für Klavier-, Tresor- und Maschinentransport. Sicher, versichert und professionell. Jetzt Offerten anfordern!',
    url: 'https://online-offerten.ch/umzugsfirma/spezialtransporte',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/b87025c3-7292-44e6-8a2c-7c1105b554bc.webp',
        width: 1200,
        height: 630,
        alt: 'Spezialtransporte',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spezialtransporte: Kostenlose Offerten vergleichen',
    description: 'Spezialtransporte: Vergleichen Sie kostenlos mehrere geprüfte Firmen für Klavier-, Tresor- und Maschinentransport.',
    images: ['https://online-offerten.ch/image/b87025c3-7292-44e6-8a2c-7c1105b554bc.webp'],
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

export default function SpezialtransportePage() {
  return <SpezialtransportePageClient />
}

