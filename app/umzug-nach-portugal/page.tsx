import type { Metadata } from 'next'
import UmzugNachPortugalPageClient from '@/components/pages/international/UmzugNachPortugalPageClient'

export const metadata: Metadata = {
  title: 'Umzug nach Portugal: Kosten, Planung & Firmenvergleich 2025',
  description: 'Ihr Leitfaden für den Umzug von der Schweiz nach Portugal. Entdecken Sie Kosten, Tipps für Zoll & NIF, Checklisten und vergleichen Sie die besten Firmen für Umzug und Reinigung.',
  keywords: 'umzug nach portugal, umzug schweiz portugal, umzugsfirma schweiz portugal, internationaler umzug portugal, umzug nach lissabon, umzug nach porto, umzug nach faro, umzugsfirma international, zügelfirma schweiz portugal, umzug schweiz nach portugal, umzugskosten schweiz portugal, umzugsfirma vergleichen portugal, günstiger umzug portugal, umzug nach portugal preise, umzug nach portugal kosten, umzugsfirma schweiz, internationaler umzug, auslandsumzug portugal',
  alternates: {
    canonical: 'https://online-offerten.ch/umzug-nach-portugal',
  },
  openGraph: {
    title: 'Umzug nach Portugal: Kosten, Planung & Firmenvergleich 2025',
    description: 'Ihr Leitfaden für den Umzug von der Schweiz nach Portugal. Entdecken Sie Kosten, Tipps für Zoll & NIF, Checklisten und vergleichen Sie die besten Firmen für Umzug und Reinigung.',
    url: 'https://online-offerten.ch/umzug-nach-portugal',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Umzug nach Portugal',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzug nach Portugal: Kosten, Planung & Firmenvergleich 2025',
    description: 'Ihr Leitfaden für den Umzug von der Schweiz nach Portugal. Entdecken Sie Kosten, Tipps für Zoll & NIF, Checklisten und vergleichen Sie die besten Firmen.',
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

export default function UmzugNachPortugalPage() {
  return <UmzugNachPortugalPageClient />
}
