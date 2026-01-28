import type { Metadata } from 'next'
import UmzugsfirmaLuganoPageClient from '@/components/pages/locations/UmzugsfirmaLuganoPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Lugano | Günstige Offerten | Top Service',
  description: 'Ihre Umzugsfirma in Lugano für einen stressfreien Umzug. Vergleichen Sie geprüfte Umzugsunternehmen und erhalten Sie die besten Offerten im Tessin.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/lugano',
  },
  openGraph: {
    title: 'Umzugsfirma Lugano | Günstige Offerten | Top Service',
    description: 'Ihre Umzugsfirma in Lugano für einen stressfreien Umzug. Vergleichen Sie geprüfte Umzugsunternehmen und erhalten Sie die besten Offerten im Tessin.',
    url: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/lugano',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Lugano',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Lugano | Günstige Offerten | Top Service',
    description: 'Ihre Umzugsfirma in Lugano für einen stressfreien Umzug. Vergleichen Sie geprüfte Umzugsunternehmen und erhalten Sie die besten Offerten im Tessin.',
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

export default function UmzugsfirmaLuganoPage() {
  return <UmzugsfirmaLuganoPageClient />
}






