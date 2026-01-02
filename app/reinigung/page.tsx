import type { Metadata } from 'next'
import ReinigungPageClient from '@/components/pages/services/ReinigungPageClient'

export const metadata: Metadata = {
  title: 'Umzugsreinigung mit Abnahmegarantie – Offerten vergleichen',
  description: 'Professionelle Umzugsreinigung mit Abnahmegarantie. Holen Sie jetzt kostenlose Offerten von geprüften Reinigungsfirmen in Ihrer Nähe ein und sparen Sie bis zu 40%.',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigung',
  },
  openGraph: {
    title: 'Umzugsreinigung mit Abnahmegarantie » Kostenlose Offerten vergleichen',
    description: 'Professionelle Umzugsreinigung mit Abnahmegarantie. Holen Sie jetzt kostenlose Offerten von geprüften Reinigungsfirmen in Ihrer Nähe ein und sparen Sie bis zu 40%.',
    url: 'https://online-offerten.ch/reinigung',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Umzugsreinigung mit Abnahmegarantie',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsreinigung mit Abnahmegarantie » Kostenlose Offerten vergleichen',
    description: 'Professionelle Umzugsreinigung mit Abnahmegarantie. Holen Sie jetzt kostenlose Offerten von geprüften Reinigungsfirmen in Ihrer Nähe ein und sparen Sie bis zu 40%.',
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

export default function ReinigungPage() {
  return <ReinigungPageClient />
}

