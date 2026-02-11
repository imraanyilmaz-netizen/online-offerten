import type { Metadata } from 'next'
import AargauCityPageClient from '@/components/pages/locations/cities/AargauCityPageClient'

export const metadata: Metadata = {
  title: 'Brugg Umzugsfirma – Geprüfte Anbieter vergleichen',
  description: 'Umzugsfirma Brugg finden ✓ Geprüfte Zügelfirmen und Umzugsunternehmen in Brugg vergleichen & bis zu 40% sparen. Kostenlose Offerten für Privat- & Geschäftsumzug.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/aargau/brugg',
  },
  openGraph: {
    title: 'Brugg Umzugsfirma – Geprüfte Anbieter vergleichen',
    description: 'Geprüfte Zügelfirmen und Umzugsunternehmen in Brugg vergleichen & bis zu 40% sparen. Kostenlose Offerten.',
    url: 'https://online-offerten.ch/umzugsfirma/aargau/brugg',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-aargau-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Brugg',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brugg Umzugsfirma – Geprüfte Anbieter vergleichen',
    description: 'Geprüfte Zügelfirmen in Brugg vergleichen & bis zu 40% sparen.',
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

export default function BruggPage() {
  return <AargauCityPageClient city="brugg" />
}

