import type { Metadata } from 'next'
import ReinigungsfirmaInDerNaehePageClient from '@/components/pages/info/ReinigungsfirmaInDerNaehePageClient'

export const metadata: Metadata = {
  title: 'Reinigungsfirma in der Nähe finden & vergleichen » 6 Offerten kostenlos | Schweiz',
  description: 'Finden Sie die beste Reinigungsfirma in Ihrer Nähe. Vergleichen Sie kostenlos bis zu 6 Offerten von geprüften Reinigungsfirmen für Umzugsreinigung mit Abnahmegarantie, Büroreinigung, Fensterreinigung & mehr. Bis zu 40% sparen – schnell, sicher und unverbindlich.',
  keywords: 'reinigungsfirma in der nähe, reinigungsfirma schweiz, reinigungsfirma vergleichen, reinigungsfirma preisvergleich, reinigungsfirma kostenlos vergleichen, reinigungsfirma online finden, umzugsreinigung mit abnahmegarantie, reinigungsofferte, putzinstitut schweiz, endreinigung wohnung, günstige reinigungsfirma, reinigungsfirma zürich, reinigungsfirma bern, reinigungsfirma basel, büroreinigung, fensterreinigung, unterhaltsreinigung, baureinigung, reinigungsfirma empfehlung, beste reinigungsfirma',
  alternates: {
    canonical: 'https://online-offerten.ch/reinigungsfirma-in-der-naehe',
  },
}

export default function ReinigungsfirmaInDerNaehePage() {
  return <ReinigungsfirmaInDerNaehePageClient />
}
