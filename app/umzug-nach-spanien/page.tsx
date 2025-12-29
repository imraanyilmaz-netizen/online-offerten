import type { Metadata } from 'next'
import UmzugNachSpanienPageClient from '@/components/pages/international/UmzugNachSpanienPageClient'

export const metadata: Metadata = {
  title: 'Umzug nach Spanien: Ihr Guide für Kosten & Planung 2025',
  description: 'Alles für Ihren Umzug von der Schweiz nach Spanien. Entdecken Sie Kosten, Tipps für Zoll & NIE, Checklisten und vergleichen Sie die besten Firmen für Umzug und Reinigung.',
  keywords: 'umzug nach spanien, umzug schweiz spanien, umzugsfirma schweiz spanien, internationaler umzug spanien, umzug nach madrid, umzug nach barcelona, umzug nach valencia, umzugsfirma international, zügelfirma schweiz spanien, umzug schweiz nach spanien, umzugskosten schweiz spanien, umzugsfirma vergleichen spanien, günstiger umzug spanien, umzug nach spanien preise, umzug nach spanien kosten, umzugsfirma schweiz, internationaler umzug, auslandsumzug spanien',
  alternates: {
    canonical: 'https://online-offerten.ch/umzug-nach-spanien',
  },
  openGraph: {
    title: 'Umzug nach Spanien: Ihr Guide für Kosten & Planung 2025',
    description: 'Alles für Ihren Umzug von der Schweiz nach Spanien. Entdecken Sie Kosten, Tipps für Zoll & NIE, Checklisten und vergleichen Sie die besten Firmen für Umzug und Reinigung.',
    url: 'https://online-offerten.ch/umzug-nach-spanien',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Umzug nach Spanien',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzug nach Spanien: Ihr Guide für Kosten & Planung 2025',
    description: 'Alles für Ihren Umzug von der Schweiz nach Spanien. Entdecken Sie Kosten, Tipps für Zoll & NIE, Checklisten und vergleichen Sie die besten Firmen.',
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

export default function UmzugNachSpanienPage() {
  return <UmzugNachSpanienPageClient />
}
