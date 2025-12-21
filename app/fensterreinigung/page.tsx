import type { Metadata } from 'next'
import FensterreinigungPageClient from '@/components/pages/services/FensterreinigungPageClient'

export const metadata: Metadata = {
  title: 'Fensterreinigung – Kostenlose Offerten vergleichen',
  description: 'Fensterreinigung vom Profi: Fordern Sie kostenlose Offerten an und vergleichen Sie Reinigungsfirmen für streifenfreie und professionelle Ergebnisse.',
  alternates: {
    canonical: 'https://online-offerten.ch/fensterreinigung',
  },
}

export default function FensterreinigungPage() {
  return <FensterreinigungPageClient />
}

