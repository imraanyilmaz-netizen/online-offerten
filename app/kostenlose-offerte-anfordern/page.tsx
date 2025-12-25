import type { Metadata } from 'next'
import { Suspense } from 'react'
import QuoteFormPageClient from '@/components/pages/payment/QuoteFormPageClient'

export const metadata: Metadata = {
  title: 'Kostenlose Offerten anfordern – Umzug, Reinigung & Renovierung | Online-Offerten.ch',
  description: 'Kostenlose Offerten von geprüften Umzugs-, Reinigungs- und Renovierungsfirmen anfordern. Vergleichen Sie mehrere Angebote und sparen Sie bis zu 40%. Unverbindlich & kostenlos.',
  
  alternates: {
    canonical: 'https://online-offerten.ch/kostenlose-offerte-anfordern',
  },
  openGraph: {
    title: 'Kostenlose Offerten anfordern – Umzug, Reinigung & Renovierung',
    description: 'Kostenlose Offerten von geprüften Umzugs-, Reinigungs- und Renovierungsfirmen anfordern. Vergleichen Sie mehrere Angebote und sparen Sie bis zu 40%.',
    url: 'https://online-offerten.ch/kostenlose-offerte-anfordern',
  },
}

export default function QuoteFormPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    }>
      <QuoteFormPageClient />
    </Suspense>
  )
}
