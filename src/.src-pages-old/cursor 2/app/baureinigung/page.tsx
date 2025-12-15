import type { Metadata } from 'next'
import BaureinigungPageClient from '@/components/pages/services/BaureinigungPageClient'

export const metadata: Metadata = {
  title: 'Baureinigung – Kostenlose Offerten vergleichen',
  description: 'Baureinigung nach Neubau oder Renovation: Holen Sie kostenlose Offerten ein und vergleichen Sie zuverlässige Reinigungsfirmen für perfekte Resultate.',
  keywords: 'baureinigung schweiz, reinigung nach bauarbeiten, bauschutt entfernen, baureinigung preise, reinigungsfirma bau, baureinigung zürich, baureinigung bern, reinigung nach renovierung',
  alternates: {
    canonical: 'https://online-offerten.ch/baureinigung',
  },
}

export default function BaureinigungPage() {
  return <BaureinigungPageClient />
}

