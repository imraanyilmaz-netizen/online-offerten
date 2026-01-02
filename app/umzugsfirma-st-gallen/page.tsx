import type { Metadata } from 'next'
import UmzugsfirmaStGallenPageClient from '@/components/pages/locations/UmzugsfirmaStGallenPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma St. Gallen – Top Anbieter vergleichen',
  description: 'Ihre Umzugsfirma in St. Gallen für einen stressfreien Umzug. Vergleichen Sie geprüfte Umzugsunternehmen und erhalten Sie die besten Offerten.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-st-gallen',
  },
  openGraph: {
    title: 'Umzugsfirma St. Gallen | Günstige Offerten | Top Service',
    description: 'Ihre Umzugsfirma in St. Gallen für einen stressfreien Umzug. Vergleichen Sie geprüfte Umzugsunternehmen und erhalten Sie die besten Offerten.',
    url: 'https://online-offerten.ch/umzugsfirma-st-gallen',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma St. Gallen',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma St. Gallen | Günstige Offerten | Top Service',
    description: 'Ihre Umzugsfirma in St. Gallen für einen stressfreien Umzug. Vergleichen Sie geprüfte Umzugsunternehmen und erhalten Sie die besten Offerten.',
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

export default function UmzugsfirmaStGallenPage() {
  return <UmzugsfirmaStGallenPageClient />
}
