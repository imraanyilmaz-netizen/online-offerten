import type { Metadata } from 'next'
import ReinigungsfirmaInDerNaehePageClient from '@/components/pages/info/ReinigungsfirmaInDerNaehePageClient'

export const metadata: Metadata = {
  title: 'Reinigungsfirma in der Nähe finden & vergleichen » 6 Offerten kostenlos | Schweiz',
  description: 'Finden Sie die beste Reinigungsfirma in Ihrer Nähe. Vergleichen Sie kostenlos bis zu 6 Offerten von geprüften Reinigungsfirmen für Umzugsreinigung mit Abnahmegarantie, Büroreinigung, Fensterreinigung & mehr. Bis zu 40% sparen – schnell, sicher und unverbindlich.',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigungsfirma-in-der-naehe',
  },
}

export default function ReinigungsfirmaInDerNaehePage() {
  return <ReinigungsfirmaInDerNaehePageClient />
}
