import type { Metadata } from 'next'
import UmzugsfirmaBielBiennePageClient from '@/components/pages/locations/UmzugsfirmaBielBiennePageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Biel/Bienne | Experten für Ihren Umzug',
  description: 'Finden Sie die beste Umzugsfirma in Biel/Bienne. Profitieren Sie von zweisprachigen Teams und erhalten Sie kostenlose Offerten für Ihren Umzug.',
  keywords: 'umzugsfirma biel, zügelfirma bienne, umzug biel/bienne, zweisprachiger umzug, umzugsunternehmen jura',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-biel-bienne',
  },
}

export default function UmzugsfirmaBielBiennePage() {
  return <UmzugsfirmaBielBiennePageClient />
}
