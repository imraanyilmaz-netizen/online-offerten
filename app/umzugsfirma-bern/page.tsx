import type { Metadata } from 'next'
import UmzugsfirmaBernPageClient from '@/components/pages/locations/UmzugsfirmaBernPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Bern: Zügelfirmen vergleichen & sparen',
  description: 'Umzugsfirma Bern: Vergleichen Sie mehrere Zügelfirmen Bern und Umzugsunternemen Bern. Umzugsfirma vergleichen Bern - Kostenlos und unverbindlich Offerten von geprüften Umzugsfirmen vergleichen. Privatumzug, Geschäftsumzug, Reinigung & mehr. Bis zu 40% sparen!',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-bern',
    languages: {
      'de-CH': 'https://online-offerten.ch/umzugsfirma-bern',
      'x-default': 'https://online-offerten.ch/umzugsfirma-bern',
    },
  },
  openGraph: {
    title: 'Umzugsfirma Bern: Zügelfirmen vergleichen & Umzugsunternemen finden',
    description: 'Umzugsfirma Bern: Vergleichen Sie mehrere Zügelfirmen Bern und Umzugsunternemen Bern. Kostenlos und unverbindlich Offerten von geprüften Umzugsfirmen vergleichen.',
    url: 'https://online-offerten.ch/umzugsfirma-bern',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Bern',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Bern: Zügelfirmen vergleichen & Umzugsunternemen finden',
    description: 'Umzugsfirma Bern: Vergleichen Sie mehrere Zügelfirmen Bern und Umzugsunternemen Bern. Kostenlos und unverbindlich Offerten von geprüften Umzugsfirmen vergleichen.',
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

export default function UmzugsfirmaBernPage() {
  return (
    <>
      <UmzugsfirmaBernPageClient />
    </>
  )
}
