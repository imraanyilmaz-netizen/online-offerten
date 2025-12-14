import type { Metadata } from 'next'
import BodenreinigungPageClient from '@/components/pages/services/BodenreinigungPageClient'

export const metadata: Metadata = {
  title: 'Bodenreinigung – Kostenlose Offerten vergleichen',
  description: 'Bodenreinigung für Parkett, Stein oder Teppich: Erhalten Sie kostenlose Offerten und vergleichen Sie qualifizierte Reinigungsfirmen in Ihrer Region.',
  keywords: 'bodenreinigung schweiz, bodenreinigung preise, teppichreinigung, parkettreinigung, fliesenreinigung, reinigungsfirma boden, bodenreinigung zürich, bodenreinigung bern',
  alternates: {
    canonical: 'https://online-offerten.ch/bodenreinigung',
  },
}

export default function BodenreinigungPage() {
  return <BodenreinigungPageClient />
}

