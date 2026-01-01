import type { Metadata } from 'next'
import UmzugsfirmaFreiburgPageClient from '@/components/pages/locations/UmzugsfirmaFreiburgPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Freiburg | Umzug im Üechtland',
  description: 'Ihre Umzugsfirma in Freiburg für einen reibungslosen Umzug. Erhalten Sie kostenlose Offerten von geprüften Zügelfirmen in der Region Freiburg.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-freiburg',
  },
  openGraph: {
    title: 'Umzugsfirma Freiburg | Umzug im Üechtland',
    description: 'Ihre Umzugsfirma in Freiburg für einen reibungslosen Umzug. Erhalten Sie kostenlose Offerten von geprüften Zügelfirmen in der Region Freiburg.',
    url: 'https://online-offerten.ch/umzugsfirma-freiburg',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Freiburg',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Freiburg | Umzug im Üechtland',
    description: 'Ihre Umzugsfirma in Freiburg für einen reibungslosen Umzug. Erhalten Sie kostenlose Offerten von geprüften Zügelfirmen in der Region Freiburg.',
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

export default function UmzugsfirmaFreiburgPage() {
  return <UmzugsfirmaFreiburgPageClient />
}
