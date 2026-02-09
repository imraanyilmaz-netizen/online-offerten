import type { Metadata } from 'next'
import GuenstigUmziehenPageClient from '@/components/pages/info/GuenstigUmziehenPageClient'

export const metadata: Metadata = {
  title: 'Günstig umziehen in der Schweiz: So sparen Sie mit cleverer Planung und Offertenvergleich',
  description: 'Günstig umziehen in der Schweiz? Entdecken Sie bewährte Strategien, clevere Tricks und wie Sie durch den Vergleich von Umzugsfirmen Ihr Budget schonen. Bis zu 40% sparen mit unserem umfassenden Guide.',
  alternates: {
    canonical: 'https://online-offerten.ch/guenstig-umziehen',
  },
  openGraph: {
    title: 'Günstig umziehen in der Schweiz: So sparen Sie mit cleverer Planung und Offertenvergleich',
    description: 'Günstig umziehen in der Schweiz? Entdecken Sie bewährte Strategien, clevere Tricks und wie Sie durch den Vergleich von Umzugsfirmen Ihr Budget schonen. Bis zu 40% sparen mit unserem umfassenden Guide.',
    url: 'https://online-offerten.ch/guenstig-umziehen',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzugsfirma-kartons.webp',
        width: 1200,
        height: 630,
        alt: 'Günstig umziehen in der Schweiz',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Günstig umziehen in der Schweiz: So sparen Sie mit cleverer Planung und Offertenvergleich',
    description: 'Günstig umziehen in der Schweiz? Entdecken Sie bewährte Strategien, clevere Tricks und wie Sie durch den Vergleich von Umzugsfirmen Ihr Budget schonen. Bis zu 40% sparen mit unserem umfassenden Guide.',
    images: ['https://online-offerten.ch/image/umzugsfirma-kartons.webp'],
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

export default function GuenstigUmziehenPage() {
  return <GuenstigUmziehenPageClient />
}

















