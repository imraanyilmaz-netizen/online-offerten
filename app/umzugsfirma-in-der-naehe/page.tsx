import type { Metadata } from 'next'
import UmzugsfirmaInDerNaehePageClient from '@/components/pages/info/UmzugsfirmaInDerNaehePageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma in der Nähe finden & vergleichen » 6 Offerten kostenlos | Schweiz',
  description: 'Umzugsfirma in der Nähe finden: Vergleichen Sie kostenlos bis zu 6 Offerten von geprüften Umzugsfirmen für Privatumzug, Geschäftsumzug, Umzugsreinigung & mehr. Bis zu 40% sparen – schnell, sicher und unverbindlich.',
  keywords: 'umzugsfirma in der nähe, umzugsfirma schweiz, umzugsfirma vergleichen, umzugsfirma kostenlos vergleichen, umzugsfirma online finden, zügelfirma finden, zügelfirma schweiz, umzugsunternehmen schweiz, umzugsfirma vergleich, günstige umzugsfirma, umzugsfirma zürich, umzugsfirma bern, umzugsfirma basel, umzugsfirma luzern, umzugsfirma preisvergleich, umzugsfirma empfehlung, beste umzugsfirma, zügelfirma vergleichen, umzugsfirma schweiz vergleichen, privatumzug schweiz, geschäftsumzug schweiz, umzugsofferte, umzugsfirma in der nähe finden',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-in-der-naehe',
  },
}

export default function UmzugsfirmaInDerNaehePage() {
  return <UmzugsfirmaInDerNaehePageClient />
}
