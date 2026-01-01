import type { Metadata } from 'next'
import GuenstigUmziehenPageClient from '@/components/pages/info/GuenstigUmziehenPageClient'

export const metadata: Metadata = {
  title: 'Günstig umziehen: Der komplette Guide 2025 zum Sparen',
  description: 'Günstig umziehen in der Schweiz? Entdecken Sie über 1500 Wörter voller Expertentipps, Kosten-Checklisten und erfahren Sie, wie Sie mit dem richtigen Firmenvergleich bis zu 40% sparen.',
  alternates: {
    canonical: 'https://online-offerten.ch/guenstig-umziehen',
  },
  openGraph: {
    title: 'Günstig umziehen: Der komplette Guide 2025 zum Sparen',
    description: 'Günstig umziehen in der Schweiz? Entdecken Sie über 1500 Wörter voller Expertentipps, Kosten-Checklisten und erfahren Sie, wie Sie mit dem richtigen Firmenvergleich bis zu 40% sparen.',
    url: 'https://online-offerten.ch/guenstig-umziehen',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Günstig umziehen',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Günstig umziehen: Der komplette Guide 2025 zum Sparen',
    description: 'Günstig umziehen in der Schweiz? Entdecken Sie über 1500 Wörter voller Expertentipps, Kosten-Checklisten und erfahren Sie, wie Sie mit dem richtigen Firmenvergleich bis zu 40% sparen.',
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

export default function GuenstigUmziehenPage() {
  return <GuenstigUmziehenPageClient />
}
