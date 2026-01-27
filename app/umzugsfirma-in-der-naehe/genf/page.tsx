import type { Metadata } from 'next'
import UmzugsfirmaGenfPageClient from '@/components/pages/locations/UmzugsfirmaGenfPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Genf – Top Anbieter vergleichen',
  description: 'Ihre professionelle Umzugsfirma in Genf. Erhalten Sie kostenlose & unverbindliche Offerten von geprüften Umzugsunternehmen für Ihren Umzug in Genf.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/genf',
  },
  openGraph: {
    title: 'Umzugsfirma Genf | Top Umzugsunternehmen | Günstige Offerten',
    description: 'Ihre professionelle Umzugsfirma in Genf. Erhalten Sie kostenlose & unverbindliche Offerten von geprüften Umzugsunternehmen für Ihren Umzug in Genf.',
    url: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/genf',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Genf',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Genf | Top Umzugsunternehmen | Günstige Offerten',
    description: 'Ihre professionelle Umzugsfirma in Genf. Erhalten Sie kostenlose & unverbindliche Offerten von geprüften Umzugsunternehmen für Ihren Umzug in Genf.',
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

export default function UmzugsfirmaGenfPage() {
  return <UmzugsfirmaGenfPageClient />
}





