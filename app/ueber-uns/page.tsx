import type { Metadata } from 'next'
import AboutPageClient from '@/components/pages/AboutPageClient'

export const metadata: Metadata = {
  title: 'Über uns – Ihre Experten für Umzug & Reinigung',
  description: 'Erfahren Sie mehr über Online-Offerten.ch, Ihre zuverlässige Plattform für Umzugs-, Reinigungs- und Räumungsdienste in der Schweiz. Unsere Mission, Vision und Werte.',
  alternates: {
    canonical: 'https://online-offerten.ch/ueber-uns',
  },
  openGraph: {
    title: 'Über uns – Ihre Experten für Umzug & Reinigung',
    description: 'Erfahren Sie mehr über Online-Offerten.ch, Ihre zuverlässige Plattform für Umzugs-, Reinigungs- und Räumungsdienste in der Schweiz. Unsere Mission, Vision und Werte.',
    url: 'https://online-offerten.ch/ueber-uns',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Über uns',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Über uns – Ihre Experten für Umzug & Reinigung',
    description: 'Erfahren Sie mehr über Online-Offerten.ch, Ihre zuverlässige Plattform für Umzugs-, Reinigungs- und Räumungsdienste in der Schweiz.',
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

export default function AboutPage() {
  return <AboutPageClient />
}

