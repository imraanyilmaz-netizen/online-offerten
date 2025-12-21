import type { Metadata } from 'next'
import GrundreinigungPageClient from '@/components/pages/services/GrundreinigungPageClient'

export const metadata: Metadata = {
  title: 'Grundreinigung – Kostenlose Offerten vergleichen',
  description: 'Gründliche Grundreinigung vom Profi: Erhalten Sie kostenlose Angebote von zertifizierten Reinigungsfirmen und wählen Sie den besten Anbieter aus.',
  alternates: {
    canonical: 'https://online-offerten.ch/grundreinigung',
  },
}

export default function GrundreinigungPage() {
  return <GrundreinigungPageClient />
}

