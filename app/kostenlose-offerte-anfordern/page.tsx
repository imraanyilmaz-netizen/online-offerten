import type { Metadata } from 'next'
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
  return <QuoteFormPageClient />
}
