import type { Metadata } from 'next'
import UmzugNachBelgienPageClient from '@/components/pages/international/UmzugNachBelgienPageClient'

export const metadata: Metadata = {
  title: 'Umzug nach Belgien | Günstige Umzugsfirmen aus der Schweiz',
  description: 'Planen Sie Ihren Umzug von der Schweiz nach Belgien? Vergleichen Sie hier professionelle und geprüfte Umzugsfirmen. Kostenlose Offerten für Privatumzug, Geschäftsumzug, Reinigung und Entsorgung.',
  keywords: 'umzug nach belgien, umzug schweiz belgien, umzugsfirma schweiz belgien, internationaler umzug belgien, umzug nach brüssel, umzug nach antwerpen, umzug nach gent, umzugsfirma international, zügelfirma schweiz belgien, umzug schweiz nach belgien, umzugskosten schweiz belgien, umzugsfirma vergleichen belgien, günstiger umzug belgien, umzug nach belgien preise, umzug nach belgien kosten, umzugsfirma schweiz, internationaler umzug, auslandsumzug belgien',
  alternates: {
    canonical: 'https://online-offerten.ch/umzug-nach-belgien',
  },
}

export default function UmzugNachBelgienPage() {
  return <UmzugNachBelgienPageClient />
}
