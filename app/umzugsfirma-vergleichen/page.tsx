import type { Metadata } from 'next'
import UmzugsfirmaVergleichenPageClient from '@/components/pages/info/UmzugsfirmaVergleichenPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Vergleich Schweiz: Kostenlose Offerten vergleichen',
  description: 'Umzugsfirma Vergleich Schweiz – Vergleichen Sie schnell und kostenlos die besten Umzugsfirmen in der Schweiz für Ihren Privatumzug oder die Reinigung. Sparen Sie Zeit und Geld mit nur einer Anfrage! Bis zu 5 Offerten im Vergleich.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-vergleichen',
  },
  openGraph: {
    title: 'Umzugsfirma Vergleich Schweiz: Kostenlose Offerten & bis zu 40% sparen',
    description: 'Umzugsfirma Vergleich Schweiz – Vergleichen Sie schnell und kostenlos die besten Umzugsfirmen in der Schweiz. Sparen Sie Zeit und Geld mit nur einer Anfrage!',
    url: 'https://online-offerten.ch/umzugsfirma-vergleichen',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzugsfirma-kartons.webp',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma vergleichen',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Vergleich Schweiz: Kostenlose Offerten & bis zu 40% sparen',
    description: 'Umzugsfirma Vergleich Schweiz – Vergleichen Sie schnell und kostenlos die besten Umzugsfirmen in der Schweiz.',
    images: ['https://online-offerten.ch/image/umzugsfirma-kartons.webp'],
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

export default function UmzugsfirmaVergleichenPage() {
  return <UmzugsfirmaVergleichenPageClient />
}


