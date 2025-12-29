import type { Metadata } from 'next'
import GartenarbeitenPageClient from '@/components/pages/services/GartenarbeitenPageClient'

export const metadata: Metadata = {
  title: 'Gartenarbeiten Schweiz finden & vergleichen » Kostenlose Offerten | Landschaftsbau & Gartenpflege',
  description: 'Gartenarbeiten Schweiz: Vergleichen Sie kostenlos Offerten von geprüften Gärtnereien und Landschaftsbauern. Gartenpflege, Terrassenverlegung, Pool-Service & mehr – professionell und bis zu 40% günstiger. Jetzt Offerten anfordern!',
  keywords: 'gartenarbeiten, gartenarbeiten schweiz, gartenarbeiten vergleichen, gartenarbeiten kostenlos, gärtner finden, gärtnerei schweiz, landschaftsbau, landschaftsbau schweiz, gartenpflege, gartenpflege schweiz, terrassenverlegung, pool service, gartenhausbau, saunabau, gartenarbeiten preise, gartenarbeiten kosten, gärtnerei finden, gartenarbeiten zürich, gartenarbeiten bern, gartenarbeiten basel, gartenarbeiten luzern, gartenarbeiten preisvergleich, gartenarbeiten planen, gartenarbeiten offerte, gartenarbeiten in der nähe',
  alternates: {
    canonical: 'https://online-offerten.ch/gartenarbeiten',
  },
  openGraph: {
    title: 'Gartenarbeiten Schweiz finden & vergleichen',
    description: 'Vergleichen Sie kostenlos Offerten von geprüften Gärtnereien und Landschaftsbauern. Gartenpflege, Terrassenverlegung, Pool-Service & mehr.',
    url: 'https://online-offerten.ch/gartenarbeiten',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Gartenarbeiten Schweiz',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gartenarbeiten Schweiz finden & vergleichen',
    description: 'Vergleichen Sie kostenlos Offerten von geprüften Gärtnereien und Landschaftsbauern. Gartenpflege, Terrassenverlegung, Pool-Service & mehr.',
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

export default function GartenarbeitenPage() {
  return <GartenarbeitenPageClient />
}

