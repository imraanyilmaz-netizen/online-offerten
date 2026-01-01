import type { Metadata } from 'next'
import ServicesPageClient from '@/components/pages/ServicesPageClient'

export const metadata: Metadata = {
  title: 'Dienstleistungen | Umzug, Reinigung, Räumung - Online-offerten.ch',
  description: 'Entdecken Sie unsere umfassenden Dienstleistungen für Umzug, Reinigung, Räumung und mehr in der Schweiz. Fordern Sie jetzt Ihre kostenlose offerten an.',
  alternates: {
    canonical: 'https://online-offerten.ch/services',
  },
  openGraph: {
    title: 'Dienstleistungen | Umzug, Reinigung, Räumung - Online-offerten.ch',
    description: 'Entdecken Sie unsere umfassenden Dienstleistungen für Umzug, Reinigung, Räumung und mehr in der Schweiz. Fordern Sie jetzt Ihre kostenlose offerten an.',
    url: 'https://online-offerten.ch/services',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Dienstleistungen',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dienstleistungen | Umzug, Reinigung, Räumung - Online-offerten.ch',
    description: 'Entdecken Sie unsere umfassenden Dienstleistungen für Umzug, Reinigung, Räumung und mehr in der Schweiz.',
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

export default function ServicesPage() {
  return <ServicesPageClient />
}

