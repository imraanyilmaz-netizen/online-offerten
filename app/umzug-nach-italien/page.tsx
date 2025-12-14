import type { Metadata } from 'next'
import UmzugNachItalienPageClient from '@/components/pages/international/UmzugNachItalienPageClient'

export const metadata: Metadata = {
  title: 'Umzug nach Italien: Ihr Guide für Kosten & Planung 2025',
  description: 'Alles für Ihren Umzug von der Schweiz nach Italien. Entdecken Sie Kosten, Zolltipps, Checklisten und vergleichen Sie die besten Umzugsfirmen für einen stressfreien Start in ',
  keywords: 'umzug nach italien, umzug schweiz italien, umzugsfirma schweiz italien, internationaler umzug italien, umzug nach rom, umzug nach mailand, umzug nach neapel, umzugsfirma international, zügelfirma schweiz italien, umzug schweiz nach italien, umzugskosten schweiz italien, umzugsfirma vergleichen italien, günstiger umzug italien, umzug nach italien preise, umzug nach italien kosten, umzugsfirma schweiz, internationaler umzug, auslandsumzug italien',
  alternates: {
    canonical: 'https://online-offerten.ch/umzug-nach-italien',
  },
}

export default function UmzugNachItalienPage() {
  return <UmzugNachItalienPageClient />
}
