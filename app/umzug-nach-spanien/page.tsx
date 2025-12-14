import type { Metadata } from 'next'
import UmzugNachSpanienPageClient from '@/components/pages/international/UmzugNachSpanienPageClient'

export const metadata: Metadata = {
  title: 'Umzug nach Spanien: Ihr Guide für Kosten & Planung 2025',
  description: 'Alles für Ihren Umzug von der Schweiz nach Spanien. Entdecken Sie Kosten, Tipps für Zoll & NIE, Checklisten und vergleichen Sie die besten Firmen für Umzug und Reinigung.',
  keywords: 'umzug nach spanien, umzug schweiz spanien, umzugsfirma schweiz spanien, internationaler umzug spanien, umzug nach madrid, umzug nach barcelona, umzug nach valencia, umzugsfirma international, zügelfirma schweiz spanien, umzug schweiz nach spanien, umzugskosten schweiz spanien, umzugsfirma vergleichen spanien, günstiger umzug spanien, umzug nach spanien preise, umzug nach spanien kosten, umzugsfirma schweiz, internationaler umzug, auslandsumzug spanien',
  alternates: {
    canonical: 'https://online-offerten.ch/umzug-nach-spanien',
  },
}

export default function UmzugNachSpanienPage() {
  return <UmzugNachSpanienPageClient />
}
