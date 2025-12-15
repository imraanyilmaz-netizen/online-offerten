import type { Metadata } from 'next'
import FassadenreinigungPageClient from '@/components/pages/services/FassadenreinigungPageClient'

export const metadata: Metadata = {
  title: 'Fassadenreinigung – Kostenlose Offerten vergleichen',
  description: 'Fassadenreinigung für Haus oder Gebäude: Erhalten Sie kostenlose Offerten und vergleichen Sie erfahrene Reinigungsfirmen für nachhaltige Sauberkeit.',
  keywords: 'fassadenreinigung schweiz, fassadenreinigung preise, hausfassade reinigen, reinigungsfirma fassade, fassadenreinigung zürich, fassadenreinigung bern, fassadenreinigung basel, algen entfernen fassade',
  alternates: {
    canonical: 'https://online-offerten.ch/fassadenreinigung',
  },
}

export default function FassadenreinigungPage() {
  return <FassadenreinigungPageClient />
}

