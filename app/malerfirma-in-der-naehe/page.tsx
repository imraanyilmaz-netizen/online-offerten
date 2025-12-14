import type { Metadata } from 'next'
import MalerfirmaInDerNaehePageClient from '@/components/pages/info/MalerfirmaInDerNaehePageClient'

export const metadata: Metadata = {
  title: 'Malerfirma in der Nähe finden & vergleichen » 6 Offerten kostenlos | Schweiz',
  description: 'Malerfirma in der Nähe finden: Vergleichen Sie kostenlos bis zu 6 Offerten von geprüften Malerfirmen für Innenanstrich, Aussenanstrich, Fassadenanstrich & Renovierung. Bis zu 40% sparen – schnell, sicher und unverbindlich.',
  keywords: 'malerfirma in der nähe, malerfirma schweiz, malerfirma vergleichen, malerfirma kostenlos vergleichen, maler finden, malerfirma zürich, malerfirma bern, malerfirma basel, malerfirma luzern, malerarbeiten vergleichen, innenanstrich, aussenanstrich, fassadenanstrich, wohnung streichen, malerfirma preisvergleich, malerfirma empfehlung, beste malerfirma, malerfirma online finden, malerfirma schweiz vergleichen, malerarbeiten schweiz, maler offerten, malerarbeiten preise',
  alternates: {
    canonical: 'https://online-offerten.ch/malerfirma-in-der-naehe',
  },
}

export default function MalerfirmaInDerNaehePage() {
  return <MalerfirmaInDerNaehePageClient />
}
