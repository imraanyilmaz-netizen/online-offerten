import type { Metadata } from 'next'
import UmzugsfirmaLausannePageClient from '@/components/pages/locations/UmzugsfirmaLausannePageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Lausanne – Top Anbieter vergleichen',
  description: 'Ihre zuverlässige Umzugsfirma in Lausanne. Fordern Sie jetzt kostenlose Offerten von geprüften Umzugsunternehmen für Ihren Umzug am Genfersee an.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/lausanne',
  },
  openGraph: {
    title: 'Umzugsfirma Lausanne | Top Offerten | Stressfrei umziehen',
    description: 'Ihre zuverlässige Umzugsfirma in Lausanne. Fordern Sie jetzt kostenlose Offerten von geprüften Umzugsunternehmen für Ihren Umzug am Genfersee an.',
    url: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/lausanne',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Lausanne',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Lausanne | Top Offerten | Stressfrei umziehen',
    description: 'Ihre zuverlässige Umzugsfirma in Lausanne. Fordern Sie jetzt kostenlose Offerten von geprüften Umzugsunternehmen für Ihren Umzug am Genfersee an.',
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

export default function UmzugsfirmaLausannePage() {
  return <UmzugsfirmaLausannePageClient />
}






