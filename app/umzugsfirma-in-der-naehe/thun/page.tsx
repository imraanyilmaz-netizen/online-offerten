import type { Metadata } from 'next'
import UmzugsfirmaThunPageClient from '@/components/pages/locations/UmzugsfirmaThunPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Thun: Ihr Umzugspartner am Thunersee',
  description: 'Professionelle Umzugsfirma in Thun für private und geschäftliche Umzüge. Vergleichen Sie Offerten und sparen Sie bis zu 40% bei Ihrem Umzug.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/thun',
  },
  openGraph: {
    title: 'Umzugsfirma Thun | Ihr Umzugspartner am Thunersee',
    description: 'Professionelle Umzugsfirma in Thun für private und geschäftliche Umzüge. Vergleichen Sie Offerten und sparen Sie bis zu 40% bei Ihrem Umzug.',
    url: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/thun',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Thun',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Thun | Ihr Umzugspartner am Thunersee',
    description: 'Professionelle Umzugsfirma in Thun für private und geschäftliche Umzüge. Vergleichen Sie Offerten und sparen Sie bis zu 40% bei Ihrem Umzug.',
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

export default function UmzugsfirmaThunPage() {
  return <UmzugsfirmaThunPageClient />
}





