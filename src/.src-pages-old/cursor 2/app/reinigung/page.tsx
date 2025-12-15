import type { Metadata } from 'next'
import ReinigungPageClient from '@/components/pages/services/ReinigungPageClient'

export const metadata: Metadata = {
  title: 'Umzugsreinigung mit Abnahmegarantie » Kostenlose Offerten vergleichen | Schweiz',
  description: 'Professionelle Umzugsreinigung mit Abnahmegarantie. Holen Sie jetzt kostenlose Offerten von geprüften Reinigungsfirmen in Ihrer Nähe ein und sparen Sie bis zu 40%.',
  keywords: 'umzugsreinigung mit abnahmegarantie, endreinigung wohnung, reinigungsfirma für umzug, wohnungsreinigung mit abnahmegarantie, umzugsreinigung preise, reinigungsofferte, endreinigung kosten, umzugsreinigung zürich, reinigung nach umzug, privatumzug reinigung',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigung',
  },
  openGraph: {
    title: 'Umzugsreinigung mit Abnahmegarantie » Kostenlose Offerten vergleichen',
    description: 'Professionelle Umzugsreinigung mit Abnahmegarantie. Holen Sie jetzt kostenlose Offerten von geprüften Reinigungsfirmen in Ihrer Nähe ein und sparen Sie bis zu 40%.',
    url: 'https://online-offerten.ch/reinigung',
  },
}

export default function ReinigungPage() {
  return <ReinigungPageClient />
}

