import type { Metadata } from 'next'
import { Suspense } from 'react'
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

const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-100">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
  </div>
)

export default function GeschaeftsumzugPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <GeschaeftsumzugPageClient />
    </Suspense>
  )
}

