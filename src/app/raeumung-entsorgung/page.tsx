import type { Metadata } from 'next'
import RaeumungEntsorgungPageClient from '@/components/pages/services/RaeumungEntsorgungPageClient'

export const metadata: Metadata = {
  title: 'Räumung & Entsorgung Schweiz vergleichen | Kostenlose Offerten',
  description: 'Vergleichen Sie bis zu 5 kostenlose Offerten für Räumung und Entsorgung in der Schweiz. Geprüfte Firmen, transparente Preise und schnelle Abwicklung.',
  alternates: {
    canonical: 'https://online-offerten.ch/raeumung-entsorgung',
  },
  openGraph: {
    title: 'Räumung & Entsorgung Schweiz vergleichen | Kostenlose Offerten',
    description: 'Bis zu 5 kostenlose Offerten für Räumung und Entsorgung in der Schweiz vergleichen. Geprüfte Firmen und transparente Preise.',
    url: 'https://online-offerten.ch/raeumung-entsorgung',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzugsservice-Schweiz/entsorgung-min.png',
        width: 1200,
        height: 630,
        alt: 'Räumung & Entsorgung Schweiz',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Räumung & Entsorgung Schweiz vergleichen | Kostenlose Offerten',
    description: 'Bis zu 5 kostenlose Offerten für Räumung und Entsorgung in der Schweiz vergleichen. Geprüfte Firmen und transparente Preise.',
    images: ['https://online-offerten.ch/image/umzugsservice-Schweiz/entsorgung-min.png'],
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

export default function RaeumungEntsorgungPage() {
  return <RaeumungEntsorgungPageClient />
}



