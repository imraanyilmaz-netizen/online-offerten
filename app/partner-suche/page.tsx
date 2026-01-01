import type { Metadata } from 'next'
import PartnerSearchPageClient from '@/components/pages/PartnerSearchPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirmen & Reinigungsfirmen Schweiz finden & vergleichen » Kostenlose Offerten',
  description: 'Finden Sie qualifizierte Umzugsfirmen und Reinigungsfirmen in Ihrer Region. Vergleichen Sie Bewertungen, Services und Preise von verifizierten Partnern auf Online-Offerten.ch.',
  alternates: {
    canonical: 'https://online-offerten.ch/partner-suche',
  },
  openGraph: {
    title: 'Umzugsfirmen & Reinigungsfirmen Schweiz finden & vergleichen » Kostenlose Offerten',
    description: 'Finden Sie qualifizierte Umzugsfirmen und Reinigungsfirmen in Ihrer Region. Vergleichen Sie Bewertungen, Services und Preise von verifizierten Partnern auf Online-Offerten.ch.',
    url: 'https://online-offerten.ch/partner-suche',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Partner Suche',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirmen & Reinigungsfirmen Schweiz finden & vergleichen » Kostenlose Offerten',
    description: 'Finden Sie qualifizierte Umzugsfirmen und Reinigungsfirmen in Ihrer Region. Vergleichen Sie Bewertungen, Services und Preise von verifizierten Partnern.',
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

export default function PartnerSearchPage() {
  return <PartnerSearchPageClient />
}

