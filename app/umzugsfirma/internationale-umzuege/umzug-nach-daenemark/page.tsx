import type { Metadata } from 'next'
import UmzugNachDaenemarkPageClient from '@/components/pages/international/UmzugNachDaenemarkPageClient'

export const metadata: Metadata = {
  title: 'Umzug nach Dänemark: Kosten & Checkliste 2025',
  description: 'Alles für Ihren Umzug nach Dänemark. Infos zu Kosten, eine komplette Checkliste inkl. CPR-Nummer und Tipps für den Start ins Hygge-Leben. Jetzt Offerten vergleichen!',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/internationale-umzuege/umzug-nach-daenemark',
  },
  openGraph: {
    title: 'Umzug nach Dänemark: Kosten, Checkliste & Tipps für Ihr Hygge-Heim',
    description: 'Alles für Ihren Umzug nach Dänemark. Infos zu Kosten, eine komplette Checkliste inkl. CPR-Nummer und Tipps für den Start ins Hygge-Leben. Jetzt Offerten vergleichen!',
    url: 'https://online-offerten.ch/umzugsfirma/internationale-umzuege/umzug-nach-daenemark',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/fotos/internationalen-umzuegen.webp',
        width: 1200,
        height: 630,
        alt: 'Umzug nach Dänemark',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzug nach Dänemark: Kosten, Checkliste & Tipps für Ihr Hygge-Heim',
    description: 'Alles für Ihren Umzug nach Dänemark. Infos zu Kosten, eine komplette Checkliste inkl. CPR-Nummer und Tipps für den Start ins Hygge-Leben.',
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

export default function UmzugNachDaenemarkPage() {
  return <UmzugNachDaenemarkPageClient />
}

