import type { Metadata } from 'next'
import ZurichCityPageClient from '@/components/pages/locations/cities/ZurichCityPageClient'

export const metadata: Metadata = {
  title: 'Winterthur Umzugsfirma – Geprüfte Anbieter vergleichen',
  description: 'Umzugsfirma Winterthur finden ✓ Geprüfte Zügelfirmen und Umzugsunternehmen in Winterthur vergleichen & bis zu 40% sparen. Kostenlose Offerten für Privat- & Geschäftsumzug.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/zuerich/winterthur',
  },
  openGraph: {
    title: 'Winterthur Umzugsfirma – Geprüfte Anbieter vergleichen',
    description: 'Geprüfte Zügelfirmen und Umzugsunternehmen in Winterthur vergleichen & bis zu 40% sparen. Kostenlose Offerten.',
    url: 'https://online-offerten.ch/umzugsfirma/zuerich/winterthur',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-zuerich-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Winterthur',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Winterthur Umzugsfirma – Geprüfte Anbieter vergleichen',
    description: 'Geprüfte Zügelfirmen in Winterthur vergleichen & bis zu 40% sparen.',
    images: ['https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-zuerich-offerten.webp'],
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

export default function WinterthurPage() {
  return <ZurichCityPageClient city="winterthur" />
}

