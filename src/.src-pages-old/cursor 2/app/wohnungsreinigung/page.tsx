import type { Metadata } from 'next'
import WohnungsreinigungPageClient from '@/components/pages/services/WohnungsreinigungPageClient'

export const metadata: Metadata = {
  title: 'Wohnungsreinigung mit Abnahmegarantie – Kostenlose Offerten vergleichen',
  description: 'Professionelle Wohnungsreinigung mit 100% Abnahmegarantie: Über 12 Jahre Erfahrung. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Wohnungsübergabe garantiert.',
  keywords: 'wohnungsreinigung mit abnahmegarantie, wohnungsreinigung schweiz, wohnungsreinigung preise, wohnungsreinigung kosten, reinigungsfirma wohnung, professionelle wohnungsreinigung, abnahmegarantie reinigung, wohnungsreinigung zürich, wohnungsreinigung bern, wohnungsreinigung basel, wohnungsreinigung luzern, wohnungsreinigung offerte, endreinigung wohnung',
  alternates: {
    canonical: 'https://online-offerten.ch/wohnungsreinigung',
  },
}

export default function WohnungsreinigungPage() {
  return <WohnungsreinigungPageClient />
}

