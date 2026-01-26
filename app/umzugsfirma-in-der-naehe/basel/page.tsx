import type { Metadata } from 'next'
import UmzugsfirmaBaselPageClient from '@/components/pages/locations/UmzugsfirmaBaselPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Basel » Günstig zügeln',
  description: 'Ihre Umzugsfirma in Basel für einen reibungslosen Umzug. Holen Sie kostenlose Offerten von geprüften Zügelfirmen und Reinigungsfirmen in der Region Basel ein.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/basel',
  },
  openGraph: {
    title: 'Umzugsfirma Basel » Günstig zügeln',
    description: 'Ihre Umzugsfirma in Basel für einen reibungslosen Umzug. Holen Sie kostenlose Offerten von geprüften Zügelfirmen und Reinigungsfirmen in der Region Basel ein.',
    url: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/basel',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Basel',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Basel » Günstig zügeln',
    description: 'Ihre Umzugsfirma in Basel für einen reibungslosen Umzug. Holen Sie kostenlose Offerten von geprüften Zügelfirmen und Reinigungsfirmen in der Region Basel ein.',
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

export default function UmzugsfirmaBaselPage() {
  return <UmzugsfirmaBaselPageClient />
}




