import type { Metadata } from 'next'
import RaeumungEntsorgungPageClient from '@/components/pages/services/RaeumungEntsorgungPageClient'

export const metadata: Metadata = {
  title: 'Räumung & Entsorgung Schweiz: Kostenlose Offerten',
  description: 'Räumung & Entsorgung Schweiz: Vergleichen Sie kostenlos Offerten von geprüften Entsorgungsfirmen. Wohnungsräumung, Haushaltsauflösung, Kellerräumung & umweltgerechte Entsorgung – professionell und bis zu 40% günstiger. Jetzt Offerten anfordern!',
  alternates: {
    canonical: 'https://online-offerten.ch/raeumung-entsorgung',
  },
  openGraph: {
    title: 'Räumung & Entsorgung Schweiz finden & vergleichen',
    description: 'Vergleichen Sie kostenlos Offerten von geprüften Entsorgungsfirmen. Wohnungsräumung, Haushaltsauflösung, Kellerräumung & umweltgerechte Entsorgung.',
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
    title: 'Räumung & Entsorgung Schweiz finden & vergleichen',
    description: 'Vergleichen Sie kostenlos Offerten von geprüften Entsorgungsfirmen. Wohnungsräumung, Haushaltsauflösung, Kellerräumung & umweltgerechte Entsorgung.',
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



