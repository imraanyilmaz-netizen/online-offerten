import type { Metadata } from 'next'
import WohnungsreinigungPageClient from '@/components/pages/services/WohnungsreinigungPageClient'

export const metadata: Metadata = {
  title: 'Wohnungsreinigung mit Abnahmegarantie – Kostenlose Offerten vergleichen',
  description: 'Professionelle Wohnungsreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Wohnungsübergabe garantiert.',
  alternates: {
    canonical: 'https://online-offerten.ch/wohnungsreinigung',
  },
}

export default function WohnungsreinigungPage() {
  return <WohnungsreinigungPageClient />
}

