import type { Metadata } from 'next'
import OffertenPortalPageClient from '@/components/pages/info/OffertenPortalPageClient'

export const metadata: Metadata = {
  title: 'Offertenportal für Umzug & Reinigung in der Schweiz',
  description: 'Finden Sie die besten Angebote für Ihren Umzug oder Ihre Reinigung. Vergleichen Sie kostenlos & unverbindlich geprüfte Firmen in Ihrer Nähe und sparen Sie.',
  alternates: {
    canonical: 'https://online-offerten.ch/offerten-portal',
  },
  openGraph: {
    title: 'Offertenportal für Umzug & Reinigung in der Schweiz',
    description: 'Finden Sie die besten Angebote für Ihren Umzug oder Ihre Reinigung. Vergleichen Sie kostenlos & unverbindlich geprüfte Firmen in Ihrer Nähe und sparen Sie.',
    url: 'https://online-offerten.ch/offerten-portal',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/online-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Offertenportal',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Offertenportal für Umzug & Reinigung in der Schweiz',
    description: 'Finden Sie die besten Angebote für Ihren Umzug oder Ihre Reinigung. Vergleichen Sie kostenlos & unverbindlich geprüfte Firmen in Ihrer Nähe.',
    images: ['https://online-offerten.ch/image/online-offerten.webp'],
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

export default function OffertenPortalPage() {
  return <OffertenPortalPageClient />
}
