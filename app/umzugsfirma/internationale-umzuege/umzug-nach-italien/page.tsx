import type { Metadata } from 'next'
import UmzugNachItalienPageClient from '@/components/pages/international/UmzugNachItalienPageClient'

export const metadata: Metadata = {
  title: 'Umzug nach Italien: Kosten & Planung 2025',
  description: 'Alles für Ihren Umzug von der Schweiz nach Italien. Entdecken Sie Kosten, Zolltipps, Checklisten und vergleichen Sie die besten Umzugsfirmen für einen stressfreien Start in Italien.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/internationale-umzuege/umzug-nach-italien',
  },
  openGraph: {
    title: 'Umzug nach Italien: Ihr Guide für Kosten & Planung 2025',
    description: 'Alles für Ihren Umzug von der Schweiz nach Italien. Entdecken Sie Kosten, Zolltipps, Checklisten und vergleichen Sie die besten Umzugsfirmen für einen stressfreien Start in Italien.',
    url: 'https://online-offerten.ch/umzugsfirma/internationale-umzuege/umzug-nach-italien',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/fotos/internationalen-umzuegen.webp',
        width: 1200,
        height: 630,
        alt: 'Umzug nach Italien',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzug nach Italien: Ihr Guide für Kosten & Planung 2025',
    description: 'Alles für Ihren Umzug von der Schweiz nach Italien. Entdecken Sie Kosten, Zolltipps, Checklisten und vergleichen Sie die besten Umzugsfirmen.',
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

export default function UmzugNachItalienPage() {
  return <UmzugNachItalienPageClient />
}

