import type { Metadata } from 'next'
import UmzugNachFrankreichPageClient from '@/components/pages/international/UmzugNachFrankreichPageClient'

export const metadata: Metadata = {
  title: 'Umzug nach Frankreich: Umfassender Guide & Kosten 2025',
  description: 'Ihr kompletter Ratgeber für den Umzug von der Schweiz nach Frankreich. Erfahren Sie alles über Kosten, Zoll, Planung und finden Sie die besten Umzugsfirmen. Inklusive FAQ und Checkliste.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/internationale-umzuege/umzug-nach-frankreich',
  },
  openGraph: {
    title: 'Umzug nach Frankreich: Umfassender Guide & Kosten 2025',
    description: 'Ihr kompletter Ratgeber für den Umzug von der Schweiz nach Frankreich. Erfahren Sie alles über Kosten, Zoll, Planung und finden Sie die besten Umzugsfirmen.',
    url: 'https://online-offerten.ch/umzugsfirma/internationale-umzuege/umzug-nach-frankreich',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/fotos/internationalen-umzuegen.webp',
        width: 1200,
        height: 630,
        alt: 'Umzug nach Frankreich',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzug nach Frankreich: Umfassender Guide & Kosten 2025',
    description: 'Ihr kompletter Ratgeber für den Umzug von der Schweiz nach Frankreich. Erfahren Sie alles über Kosten, Zoll, Planung und finden Sie die besten Umzugsfirmen.',
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

export default function UmzugNachFrankreichPage() {
  return <UmzugNachFrankreichPageClient />
}

