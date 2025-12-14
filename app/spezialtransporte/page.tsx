import type { Metadata } from 'next'
import SpezialtransportePageClient from '@/components/pages/services/SpezialtransportePageClient'

export const metadata: Metadata = {
  title: 'Klaviertransport, Tresortransport & Maschinen Transport Schweiz » Spezialtransporte vergleichen & bis zu 40% sparen',
  description: 'Klaviertransport, Tresortransport und Maschinen & Geräte Transport: Vergleichen Sie kostenlos mehrere geprüfte Spezialtransport-Firmen. Klavier Transport, Tresor Transport, Maschinentransport – sicher, versichert und professionell. Jetzt Offerten anfordern!',
  alternates: {
    canonical: 'https://online-offerten.ch/spezialtransporte',
  },
  openGraph: {
    title: 'Klaviertransport, Tresortransport & Maschinen Transport Schweiz',
    description: 'Vergleichen Sie kostenlos mehrere geprüfte Spezialtransport-Firmen. Klavier Transport, Tresor Transport, Maschinentransport – sicher, versichert und professionell.',
    url: 'https://online-offerten.ch/spezialtransporte',
  },
}

export default function SpezialtransportePage() {
  return <SpezialtransportePageClient />
}

