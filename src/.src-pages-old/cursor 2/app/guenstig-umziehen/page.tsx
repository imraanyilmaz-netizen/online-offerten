import type { Metadata } from 'next'
import GuenstigUmziehenPageClient from '@/components/pages/info/GuenstigUmziehenPageClient'

export const metadata: Metadata = {
  title: 'Günstig umziehen: Der komplette Guide 2025 zum Sparen',
  description: 'Günstig umziehen in der Schweiz? Entdecken Sie über 1500 Wörter voller Expertentipps, Kosten-Checklisten und erfahren Sie, wie Sie mit dem richtigen Firmenvergleich bis zu 40% sparen.',
  keywords: 'günstig umziehen, umzugskosten sparen, preiswert umziehen, zügelfirma preise, umzugsfirma vergleich, kosten umzug schweiz, umzugstipps, umzugsbudget, umzugsfirma günstig, billig umziehen, umzug planen kosten',
  alternates: {
    canonical: 'https://online-offerten.ch/guenstig-umziehen',
  },
}

export default function GuenstigUmziehenPage() {
  return <GuenstigUmziehenPageClient />
}
