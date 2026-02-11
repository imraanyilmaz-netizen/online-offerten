import type { Metadata } from 'next'
import AargauCityPageClient from '@/components/pages/locations/cities/AargauCityPageClient'

export const metadata: Metadata = {
  title: 'Zofingen Umzugsfirma – Geprüfte Anbieter vergleichen',
  description: 'Umzugsfirma Zofingen finden ✓ Geprüfte Zügelfirmen und Umzugsunternehmen in Zofingen vergleichen & bis zu 40% sparen. Kostenlose Offerten für Privat- & Geschäftsumzug.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/aargau/zofingen',
  },
  openGraph: {
    title: 'Zofingen Umzugsfirma – Geprüfte Anbieter vergleichen',
    description: 'Geprüfte Zügelfirmen und Umzugsunternehmen in Zofingen vergleichen & bis zu 40% sparen. Kostenlose Offerten.',
    url: 'https://online-offerten.ch/umzugsfirma/aargau/zofingen',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-aargau-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Zofingen',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zofingen Umzugsfirma – Geprüfte Anbieter vergleichen',
    description: 'Geprüfte Zügelfirmen in Zofingen vergleichen & bis zu 40% sparen.',
    images: ['https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-aargau-offerten.webp'],
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

export default function ZofingenPage() {
  return <AargauCityPageClient city="zofingen" />
}

