import type { Metadata } from 'next'
import UmzugsfirmaAargauPageClient from '@/components/pages/locations/UmzugsfirmaAargauPageClient'

export const metadata: Metadata = {
  title: 'Zügelfirma Aargau » Top Umzugsunternehmen vergleichen & sparen',
  description: 'Zügelfirma Aargau finden ✓ Geprüfte Umzugsunternehmen in Aarau, Baden, Zofingen vergleichen & bis zu 40% sparen. Kostenlose Offerten für Privat- & Geschäftsumzug.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-aargau',
  },
  openGraph: {
    title: 'Zügelfirma Aargau » Top Umzugsunternehmen vergleichen & sparen',
    description: 'Zügelfirma Aargau finden ✓ Geprüfte Umzugsunternehmen in Aarau, Baden, Zofingen vergleichen & bis zu 40% sparen. Kostenlose Offerten für Privat- & Geschäftsumzug.',
    url: 'https://online-offerten.ch/umzugsfirma-aargau',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/services-professionals.png',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Aargau',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zügelfirma Aargau » Top Umzugsunternehmen vergleichen & sparen',
    description: 'Zügelfirma Aargau finden ✓ Geprüfte Umzugsunternehmen in Aarau, Baden, Zofingen vergleichen & bis zu 40% sparen. Kostenlose Offerten für Privat- & Geschäftsumzug.',
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

export default function UmzugsfirmaAargauPage() {
  return <UmzugsfirmaAargauPageClient />
}
