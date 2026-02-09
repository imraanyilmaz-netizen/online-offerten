import type { Metadata } from 'next'
import UmzugNachOesterreichPageClient from '@/components/pages/international/UmzugNachOesterreichPageClient'

export const metadata: Metadata = {
  title: 'Umzug nach Österreich: Kosten & Planung 2025',
  description: 'Ihr kompletter Leitfaden für den Umzug von der Schweiz nach Österreich. Entdecken Sie Kosten, Zolltipps, Checklisten und vergleichen Sie die besten Firmen für Transport und Reinigung.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/internationale-umzuege/umzug-nach-oesterreich',
  },
  openGraph: {
    title: 'Umzug nach Österreich: Kosten, Planung & Firmenvergleich 2025',
    description: 'Ihr kompletter Leitfaden für den Umzug von der Schweiz nach Österreich. Entdecken Sie Kosten, Zolltipps, Checklisten und vergleichen Sie die besten Firmen für Transport und Reinigung.',
    url: 'https://online-offerten.ch/umzugsfirma/internationale-umzuege/umzug-nach-oesterreich',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/fotos/internationalen-umzuegen.webp',
        width: 1200,
        height: 630,
        alt: 'Umzug nach Österreich',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzug nach Österreich: Kosten, Planung & Firmenvergleich 2025',
    description: 'Ihr kompletter Leitfaden für den Umzug von der Schweiz nach Österreich. Entdecken Sie Kosten, Zolltipps, Checklisten und vergleichen Sie die besten Firmen.',
    images: ['https://online-offerten.ch/fotos/internationalen-umzuegen.webp'],
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

export default function UmzugNachOesterreichPage() {
  return <UmzugNachOesterreichPageClient />
}

