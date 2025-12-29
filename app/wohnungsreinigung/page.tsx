import type { Metadata } from 'next'
import WohnungsreinigungPageClient from '@/components/pages/services/WohnungsreinigungPageClient'

export const metadata: Metadata = {
  title: 'Wohnungsreinigung mit Abnahmegarantie – Kostenlose Offerten vergleichen',
  description: 'Professionelle Wohnungsreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Wohnungsübergabe garantiert.',
  alternates: {
    canonical: 'https://online-offerten.ch/wohnungsreinigung',
  },
  openGraph: {
    title: 'Wohnungsreinigung mit Abnahmegarantie – Kostenlose Offerten vergleichen',
    description: 'Professionelle Wohnungsreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach.',
    url: 'https://online-offerten.ch/wohnungsreinigung',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Wohnungsreinigung mit Abnahmegarantie',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wohnungsreinigung mit Abnahmegarantie – Kostenlose Offerten vergleichen',
    description: 'Professionelle Wohnungsreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen.',
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

export default function WohnungsreinigungPage() {
  return <WohnungsreinigungPageClient />
}

