import type { Metadata } from 'next'
import GeschaeftsumzugPageClient from '@/components/pages/services/GeschaeftsumzugPageClient'

export const metadata: Metadata = {
  title: 'Geschäftsumzug: Kostenlose Offerten vergleichen | Online-Offerten.ch',
  description: 'Kosten für Büroumzug & Firmenumzug vergleichen. Geschäftsumzug in der Nähe: Gratis Offerten von geprüften Umzugsfirmen. Schnell, transparent und regional.',
  alternates: {
    canonical: 'https://online-offerten.ch/geschaeftsumzug',
  },
  openGraph: {
    title: 'Geschäftsumzug: Kostenlose Offerten vergleichen | Online-Offerten.ch',
    description: 'Kosten für Büroumzug & Firmenumzug vergleichen. Geschäftsumzug in der Nähe: Gratis Offerten von geprüften Umzugsfirmen.',
    url: 'https://online-offerten.ch/geschaeftsumzug',
  },
}

export default function GeschaeftsumzugPage() {
  return <GeschaeftsumzugPageClient />
}

