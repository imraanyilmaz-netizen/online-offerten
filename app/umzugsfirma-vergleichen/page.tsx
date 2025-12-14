import type { Metadata } from 'next'
import UmzugsfirmaVergleichenPageClient from '@/components/pages/info/UmzugsfirmaVergleichenPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma vergleichen – Jetzt Offerten vergleichen & sparen',
  description: 'Vergleichen Sie schnell und kostenlos die besten Umzugsfirmen in der Schweiz für Ihren Privatumzug oder die Reinigung. Sparen Sie Zeit und Geld mit nur einer Anfrage! Bis zu 6 Offerten im Vergleich.',
  keywords: 'umzugsfirma vergleichen, umzugsfirma vergleich, zügelfirma vergleichen, zügelfirma vergleich, umzugsfirmen vergleichen, umzugsofferten vergleichen, umzugsofferten, angebote vergleichen, umzugsunternehmen schweiz, beste umzugsfirma, umzugsfirma schweiz vergleichen, umzugsfirma preisvergleich, zügelfirma preisvergleich, umzugsfirma kostenlos vergleichen, umzugsofferte vergleichen, umzugsfirma empfehlung, beste zügelfirma, umzugsfirma online vergleichen, umzugsfirma finden vergleichen, umzugsfirma schweiz, zügelfirma schweiz',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-vergleichen',
  },
}

export default function UmzugsfirmaVergleichenPage() {
  return <UmzugsfirmaVergleichenPageClient />
}
