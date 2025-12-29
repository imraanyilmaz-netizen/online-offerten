import type { Metadata } from 'next'
import KlaviertransportPageClient from '@/components/pages/services/KlaviertransportPageClient'

export const metadata: Metadata = {
  title: 'Klaviertransport: Kostenlose Offerten vergleichen | Online-Offerten.ch',
  description: 'Kostenlose Offerten von geprüften Spezialisten für Klaviertransport vergleichen. Flügeltransport, Piano-Transport & mehr. Professionell versichert, bis zu 40% sparen!',
  alternates: {
    canonical: 'https://online-offerten.ch/klaviertransport',
  },
  openGraph: {
    title: 'Klaviertransport: Kostenlose Offerten vergleichen',
    description: 'Kostenlose Offerten von geprüften Spezialisten für Klaviertransport vergleichen. Flügeltransport, Piano-Transport & mehr.',
    url: 'https://online-offerten.ch/klaviertransport',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Klaviertransport',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Klaviertransport: Kostenlose Offerten vergleichen',
    description: 'Kostenlose Offerten von geprüften Spezialisten für Klaviertransport vergleichen. Flügeltransport, Piano-Transport & mehr.',
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

export default function KlaviertransportPage() {
  return <KlaviertransportPageClient />
}

