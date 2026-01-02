import type { Metadata } from 'next'
import HausreinigungPageClient from '@/components/pages/services/HausreinigungPageClient'

export const metadata: Metadata = {
  title: 'Hausreinigung mit Abnahmegarantie – Offerten vergleichen',
  description: 'Professionelle Hausreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Hausreinigung garantiert.',
  alternates: {
    canonical: 'https://online-offerten.ch/hausreinigung',
  },
  openGraph: {
    title: 'Hausreinigung mit Abnahmegarantie – Offerten vergleichen',
    description: 'Professionelle Hausreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach.',
    url: 'https://online-offerten.ch/hausreinigung',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Hausreinigung mit Abnahmegarantie',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hausreinigung mit Abnahmegarantie – Offerten vergleichen',
    description: 'Professionelle Hausreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen.',
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

export default function HausreinigungPage() {
  return <HausreinigungPageClient />
}

