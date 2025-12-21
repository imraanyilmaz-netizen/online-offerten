import type { Metadata } from 'next'
import HausreinigungPageClient from '@/components/pages/services/HausreinigungPageClient'

export const metadata: Metadata = {
  title: 'Hausreinigung mit Abnahmegarantie – Kostenlose Offerten vergleichen',
  description: 'Professionelle Hausreinigung mit 100% Abnahmegarantie: Über 12 Jahre Erfahrung. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Hausreinigung garantiert.',
  alternates: {
    canonical: 'https://online-offerten.ch/hausreinigung',
  },
}

export default function HausreinigungPage() {
  return <HausreinigungPageClient />
}

