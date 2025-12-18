import type { Metadata } from 'next'
import GeschaeftsumzugPageClient from '@/components/pages/services/GeschaeftsumzugPageClient'

export const metadata: Metadata = {
  title: 'Büroumzug & Firmenumzug – Geschäftsumzug Offerten kostenlos | Umzugsfirmen vergleichen',
  description: 'Kosten für Büroumzug & Firmenumzug vergleichen. Geschäftsumzug in der Nähe: Gratis Offerten von geprüften Umzugsfirmen. Schnell, transparent und regional.',
  keywords: 'büroumzug, firmenumzug, geschäftsumzug, umzugsfirmen, büroumzug kosten, firmenumzug kosten, angebote vergleichen, offerten kostenlos, büro zügeln, unternehmen umziehen, relocation service business, geschäftsumzug schweiz, büroumzug schweiz, firmenumzug schweiz, umzugsfirmen vergleichen, geschäftsumzug zürich, geschäftsumzug bern, geschäftsumzug basel',
  alternates: {
    canonical: 'https://online-offerten.ch/geschaeftsumzug',
  },
  openGraph: {
    title: 'Büroumzug & Firmenumzug – Geschäftsumzug Offerten kostenlos',
    description: 'Kosten für Büroumzug & Firmenumzug vergleichen. Geschäftsumzug in der Nähe: Gratis Offerten von geprüften Umzugsfirmen.',
    url: 'https://online-offerten.ch/geschaeftsumzug',
  },
}

export default function GeschaeftsumzugPage() {
  return <GeschaeftsumzugPageClient />
}

