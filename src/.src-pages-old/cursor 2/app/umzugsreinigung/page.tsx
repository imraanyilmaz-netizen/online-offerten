import type { Metadata } from 'next'
import UmzugsreinigungPageClient from '@/components/pages/services/UmzugsreinigungPageClient'

export const metadata: Metadata = {
  title: 'Umzugsreinigung mit Abnahmegarantie – Kostenlose Offerten vergleichen',
  description: 'Professionelle Umzugsreinigung mit 100% Abnahmegarantie: Über 12 Jahre Erfahrung. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Wohnungsübergabe garantiert.',
  keywords: 'umzugsreinigung mit abnahmegarantie, endreinigung wohnung, reinigungsfirma für umzug, wohnungsreinigung mit abnahmegarantie, umzugsreinigung preise, reinigungsofferte, endreinigung kosten, umzugsreinigung zürich, reinigung nach umzug, umzugsreinigung bern, umzugsreinigung basel',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsreinigung',
  },
}

export default function UmzugsreinigungPage() {
  return <UmzugsreinigungPageClient />
}

