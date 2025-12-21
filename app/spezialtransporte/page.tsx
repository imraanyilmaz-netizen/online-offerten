import type { Metadata } from 'next'
import SpezialtransportePageClient from '@/components/pages/services/SpezialtransportePageClient'

export const metadata: Metadata = {
  title: 'Spezialtransporte: Kostenlose Offerten vergleichen | Online-Offerten.ch',
  description: 'Spezialtransporte: Vergleichen Sie kostenlos mehrere geprüfte Firmen für Klavier-, Tresor- und Maschinentransport. Sicher, versichert und professionell. Jetzt Offerten anfordern!',
  alternates: {
    canonical: 'https://online-offerten.ch/spezialtransporte',
  },
  openGraph: {
    title: 'Spezialtransporte: Kostenlose Offerten vergleichen | Online-Offerten.ch',
    description: 'Spezialtransporte: Vergleichen Sie kostenlos mehrere geprüfte Firmen für Klavier-, Tresor- und Maschinentransport. Sicher, versichert und professionell. Jetzt Offerten anfordern!',
    url: 'https://online-offerten.ch/spezialtransporte',
  },
}

export default function SpezialtransportePage() {
  return <SpezialtransportePageClient />
}

