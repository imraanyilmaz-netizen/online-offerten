import type { Metadata } from 'next'
import UmzugNachDaenemarkPageClient from '@/components/pages/international/UmzugNachDaenemarkPageClient'

export const metadata: Metadata = {
  title: 'Umzug nach Dänemark: Kosten, Checkliste & Tipps für Ihr Hygge-Heim',
  description: 'Alles für Ihren Umzug nach Dänemark. Infos zu Kosten, eine komplette Checkliste inkl. CPR-Nummer und Tipps für den Start ins Hygge-Leben. Jetzt Offerten vergleichen!',
  keywords: 'umzug nach dänemark, umzug schweiz dänemark, umzugsfirma schweiz dänemark, internationaler umzug dänemark, umzug nach kopenhagen, umzug nach aarhus, umzug nach odense, umzugsfirma international, zügelfirma schweiz dänemark, umzug schweiz nach dänemark, umzugskosten schweiz dänemark, umzugsfirma vergleichen dänemark, günstiger umzug dänemark, umzug nach dänemark preise, umzug nach dänemark kosten, umzugsfirma schweiz, internationaler umzug, auslandsumzug dänemark',
  alternates: {
    canonical: 'https://online-offerten.ch/umzug-nach-daenemark',
  },
}

export default function UmzugNachDaenemarkPage() {
  return <UmzugNachDaenemarkPageClient />
}
