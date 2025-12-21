import type { Metadata } from 'next'
import UmzugsfirmaVergleichenPageClient from '@/components/pages/info/UmzugsfirmaVergleichenPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma vergleichen: Kostenlose Offerten & bis zu 40% sparen',
  description: 'Vergleichen Sie schnell und kostenlos die besten Umzugsfirmen in der Schweiz für Ihren Privatumzug oder die Reinigung. Sparen Sie Zeit und Geld mit nur einer Anfrage! Bis zu 6 Offerten im Vergleich.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-vergleichen',
  },
}

export default function UmzugsfirmaVergleichenPage() {
  return <UmzugsfirmaVergleichenPageClient />
}
