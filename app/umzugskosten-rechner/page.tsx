import type { Metadata } from 'next'
import UmzugskostenRechnerPageClient from '@/components/pages/tools/UmzugskostenRechnerPageClient'

export const metadata: Metadata = {
  title: 'Umzugskosten-Rechner: Kostenlose Schätzung in 2 Minuten | Online-Offerten.ch',
  description: 'In 2 Minuten wissen, was Ihr Umzug kostet! Kostenloser Umzugskosten-Rechner mit sofortiger Preis-Schätzung. Vergleichen Sie mehrere Angebote & sparen Sie bis zu 40%.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugskosten-rechner',
  },
}

export default function UmzugskostenRechnerPage() {
  return <UmzugskostenRechnerPageClient />
}
