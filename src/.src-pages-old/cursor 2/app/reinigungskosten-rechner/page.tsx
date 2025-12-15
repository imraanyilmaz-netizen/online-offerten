import type { Metadata } from 'next'
import ReinigungskostenRechnerPageClient from '@/components/pages/tools/ReinigungskostenRechnerPageClient'

export const metadata: Metadata = {
  title: 'Was kostet eine Reinigung? - Reinigungskosten Reinigungsfirma Vergleichen',
  description: '⏱️ In 1 Minute Reinigungskosten berechnen! Kostenloser Reinigungskosten-Rechner mit sofortiger Schätzung. Vergleichen Sie Reinigungsofferten & sparen Sie bis zu 40%.',
  keywords: 'reinigungskosten rechner, kosten umzugsreinigung, preise reinigungsfirma, wohnungsreinigung kosten, reinigungsofferte, abnahmegarantie, reinigungskosten schweiz, reinigungskosten berechnen, umzugsreinigung kosten, endreinigung kosten, reinigungskosten pro m2, reinigungskosten rechner schweiz, reinigungskosten vergleichen, günstige reinigungskosten, reinigungsfirma preise, umzugsreinigung preise, wohnungsreinigung preise, reinigungskosten schätzen',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigungskosten-rechner',
  },
}

export default function ReinigungskostenRechnerPage() {
  return <ReinigungskostenRechnerPageClient />
}
