import type { Metadata } from 'next'
import UmzugNachOesterreichPageClient from '@/components/pages/international/UmzugNachOesterreichPageClient'

export const metadata: Metadata = {
  title: 'Umzug nach Österreich: Kosten, Planung & Firmenvergleich 2025',
  description: 'Ihr kompletter Leitfaden für den Umzug von der Schweiz nach Österreich. Entdecken Sie Kosten, Zolltipps, Checklisten und vergleichen Sie die besten Firmen für Transport und Reinigung.',
  keywords: 'umzug nach österreich, umzug schweiz österreich, umzugsfirma schweiz österreich, internationaler umzug österreich, umzug nach wien, umzug nach salzburg, umzug nach graz, umzugsfirma international, zügelfirma schweiz österreich, umzug schweiz nach österreich, umzugskosten schweiz österreich, umzugsfirma vergleichen österreich, günstiger umzug österreich, umzug nach österreich preise, umzug nach österreich kosten, umzugsfirma schweiz, internationaler umzug, auslandsumzug österreich',
  alternates: {
    canonical: 'https://online-offerten.ch/umzug-nach-oesterreich',
  },
}

export default function UmzugNachOesterreichPage() {
  return <UmzugNachOesterreichPageClient />
}
