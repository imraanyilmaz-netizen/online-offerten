import type { Metadata } from 'next'
import UmzugsfirmaAargauPageClient from '@/components/pages/locations/UmzugsfirmaAargauPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Aargau | Top Umzugsunternehmen im Kanton',
  description: 'Finden Sie die beste Umzugsfirma im Aargau. Vergleichen Sie lokale, geprüfte Partner für Ihren Umzug und erhalten Sie unverbindliche Offerten.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-aargau',
  },
  openGraph: {
    title: 'Umzugsfirma Aargau | Top Umzugsunternehmen im Kanton',
    description: 'Finden Sie die beste Umzugsfirma im Aargau. Vergleichen Sie lokale, geprüfte Partner für Ihren Umzug und erhalten Sie unverbindliche Offerten.',
    url: 'https://online-offerten.ch/umzugsfirma-aargau',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Aargau',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Aargau | Top Umzugsunternehmen im Kanton',
    description: 'Finden Sie die beste Umzugsfirma im Aargau. Vergleichen Sie lokale, geprüfte Partner für Ihren Umzug und erhalten Sie unverbindliche Offerten.',
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

export default function UmzugsfirmaAargauPage() {
  return <UmzugsfirmaAargauPageClient />
}
