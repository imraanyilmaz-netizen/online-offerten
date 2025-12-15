import type { Metadata } from 'next'
import UmzugNachFrankreichPageClient from '@/components/pages/international/UmzugNachFrankreichPageClient'

export const metadata: Metadata = {
  title: 'Umzug nach Frankreich: Umfassender Guide & Kosten 2025',
  description: 'Ihr kompletter Ratgeber für den Umzug von der Schweiz nach Frankreich. Erfahren Sie alles über Kosten, Zoll, Planung und finden Sie die besten Umzugsfirmen. Inklusive FAQ und Checkliste.',
  keywords: 'umzug nach frankreich, umzug schweiz frankreich, umzugsfirma schweiz frankreich, internationaler umzug frankreich, umzug nach paris, umzug nach lyon, umzug nach marseille, umzugsfirma international, zügelfirma schweiz frankreich, umzug schweiz nach frankreich, umzugskosten schweiz frankreich, umzugsfirma vergleichen frankreich, günstiger umzug frankreich, umzug nach frankreich preise, umzug nach frankreich kosten, umzugsfirma schweiz, internationaler umzug, auslandsumzug frankreich',
  alternates: {
    canonical: 'https://online-offerten.ch/umzug-nach-frankreich',
  },
}

export default function UmzugNachFrankreichPage() {
  return <UmzugNachFrankreichPageClient />
}
