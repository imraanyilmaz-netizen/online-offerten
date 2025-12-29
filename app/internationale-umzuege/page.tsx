import type { Metadata } from 'next'
import InternationaleUmzugPageClient from '@/components/pages/services/InternationaleUmzugPageClient'

export const metadata: Metadata = {
  title: 'Internationale Umzüge: Kostenlose Offerten vergleichen | Online-Offerten.ch',
  description: 'Internationale Umzüge: Vergleichen Sie kostenlos mehrere geprüfte Umzugsfirmen und sparen Sie bis zu 40%. Offerten für Umzüge nach Deutschland, Österreich, Frankreich & ganz Europa.',
  alternates: {
    canonical: 'https://online-offerten.ch/internationale-umzuege',
  },
  openGraph: {
    title: 'Internationale Umzüge: Kostenlose Offerten vergleichen | Online-Offerten.ch',
    description: 'Internationale Umzüge: Vergleichen Sie kostenlos mehrere geprüfte Umzugsfirmen und sparen Sie bis zu 40%. Offerten für Umzüge nach Deutschland, Österreich, Frankreich & ganz Europa.',
    url: 'https://online-offerten.ch/internationale-umzuege',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Internationale Umzüge',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Internationale Umzüge: Kostenlose Offerten vergleichen | Online-Offerten.ch',
    description: 'Internationale Umzüge: Vergleichen Sie kostenlos mehrere geprüfte Umzugsfirmen und sparen Sie bis zu 40%.',
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

export default function InternationaleUmzugPage() {
  return <InternationaleUmzugPageClient />
}

