import type { Metadata } from 'next'
import HofreinigungPageClient from '@/components/pages/services/HofreinigungPageClient'

export const metadata: Metadata = {
  title: 'Hofreinigung – Kostenlose Offerten vergleichen',
  description: 'Professionelle Hofreinigung: Fordern Sie kostenlose Offerten an und vergleichen Sie Reinigungsfirmen für saubere Außenbereiche und gepflegte Umgebung.',
  alternates: {
    canonical: 'https://online-offerten.ch/hofreinigung',
  },
}

export default function HofreinigungPage() {
  return <HofreinigungPageClient />
}

