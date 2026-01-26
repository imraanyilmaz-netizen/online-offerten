import type { Metadata } from 'next'
import UmzugsfirmaBielBiennePageClient from '@/components/pages/locations/UmzugsfirmaBielBiennePageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Biel/Bienne | Experten für Ihren Umzug',
  description: 'Finden Sie die beste Umzugsfirma in Biel/Bienne. Profitieren Sie von zweisprachigen Teams und erhalten Sie kostenlose Offerten für Ihren Umzug.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/biel-bienne',
  },
  openGraph: {
    title: 'Umzugsfirma Biel/Bienne | Experten für Ihren Umzug',
    description: 'Finden Sie die beste Umzugsfirma in Biel/Bienne. Profitieren Sie von zweisprachigen Teams und erhalten Sie kostenlose Offerten für Ihren Umzug.',
    url: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/biel-bienne',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Biel/Bienne',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Biel/Bienne | Experten für Ihren Umzug',
    description: 'Finden Sie die beste Umzugsfirma in Biel/Bienne. Profitieren Sie von zweisprachigen Teams und erhalten Sie kostenlose Offerten für Ihren Umzug.',
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

export default function UmzugsfirmaBielBiennePage() {
  return <UmzugsfirmaBielBiennePageClient />
}



