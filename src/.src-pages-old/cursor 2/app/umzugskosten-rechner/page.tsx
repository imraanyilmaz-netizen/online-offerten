import type { Metadata } from 'next'
import UmzugskostenRechnerPageClient from '@/components/pages/tools/UmzugskostenRechnerPageClient'

export const metadata: Metadata = {
  title: 'Was kostet ein Umzug? - Umzugskosten Umzugsfirma Vergleichen',
  description: '⏱️ In 2 Minuten wissen, was Ihr Umzug kostet! Kostenloser Umzugskosten-Rechner mit sofortiger Preis-Schätzung. Vergleichen Sie Offerten & sparen Sie bis zu 40%.',
  keywords: 'umzugskosten berechnen, kosten für den umzug, umzugsbudget, preiskalkulator, kostenlose umzugsschätzung, was kostet mein umzug, umzugspreis sofort wissen, kostenlose umzugsangebote, umzugskosten rechner, umzugskosten schweiz, umzugskosten online berechnen, umzugskosten kalkulator, umzugspreis berechnen, umzugskosten schätzen, umzugskosten rechner schweiz, umzugskosten vergleichen, günstige umzugskosten, umzugskosten pro zimmer, umzugskosten pro km',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugskosten-rechner',
  },
}

export default function UmzugskostenRechnerPage() {
  return <UmzugskostenRechnerPageClient />
}
