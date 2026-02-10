import type { Metadata } from 'next'
import PartnerRegistrationPageClient from '@/components/pages/PartnerRegistrationPageClient'

export const metadata: Metadata = {
  title: 'Partner werden: Kostenlose Registrierung',
  description: 'Werden Sie Partner für Umzug, Reinigung und Malerarbeiten. Erhalten Sie qualifizierte Kundenanfragen aus Ihrer Region. Kostenlos registrieren & mehr Aufträge gewinnen.',
  alternates: {
    canonical: 'https://online-offerten.ch/partner-werden',
  },
  openGraph: {
    title: 'Partner werden: Kostenlose Registrierung',
    description: 'Werden Sie Partner für Umzug, Reinigung und Malerarbeiten. Erhalten Sie qualifizierte Kundenanfragen aus Ihrer Region. Kostenlos registrieren & mehr Aufträge gewinnen.',
    url: 'https://online-offerten.ch/partner-werden',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/online-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Partner werden',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partner werden: Kostenlose Registrierung',
    description: 'Werden Sie Partner für Umzug, Reinigung und Malerarbeiten. Erhalten Sie qualifizierte Kundenanfragen aus Ihrer Region.',
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

export default function PartnerRegistrationPage() {
  return <PartnerRegistrationPageClient />
}



