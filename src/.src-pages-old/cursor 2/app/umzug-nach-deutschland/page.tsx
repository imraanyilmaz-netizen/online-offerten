import type { Metadata } from 'next'
import UmzugNachDeutschlandPageClient from '@/components/pages/international/UmzugNachDeutschlandPageClient'

export const metadata: Metadata = {
  title: 'Umzug nach Deutschland | Umzugsfirmen aus der Schweiz vergleichen',
  description: 'Planen Sie Ihren Umzug von der Schweiz nach Deutschland? Vergleichen Sie hier professionelle Umzugsfirmen für Privatumzug, Geschäftsumzug, Reinigung und Entsorgung. Holen Sie sich jetzt kostenlose Offerten.',
  keywords: 'umzug nach deutschland, umzug schweiz deutschland, umzugsfirma schweiz deutschland, internationaler umzug deutschland, umzug nach berlin, umzug nach münchen, umzug nach hamburg, umzug nach frankfurt, umzugsfirma international, zügelfirma schweiz deutschland, umzug schweiz nach deutschland, umzugskosten schweiz deutschland, umzugsfirma vergleichen deutschland, günstiger umzug deutschland, umzug nach deutschland preise, umzug nach deutschland kosten, umzugsfirma schweiz, internationaler umzug, auslandsumzug deutschland',
  alternates: {
    canonical: 'https://online-offerten.ch/umzug-nach-deutschland',
  },
}

export default function UmzugNachDeutschlandPage() {
  return <UmzugNachDeutschlandPageClient />
}
