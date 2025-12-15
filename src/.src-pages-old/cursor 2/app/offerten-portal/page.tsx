import type { Metadata } from 'next'
import OffertenPortalPageClient from '@/components/pages/info/OffertenPortalPageClient'

export const metadata: Metadata = {
  title: 'Offertenportal für Umzug & Reinigung in der Schweiz',
  description: 'Finden Sie die besten Angebote für Ihren Umzug oder Ihre Reinigung. Vergleichen Sie kostenlos & unverbindlich geprüfte Firmen in Ihrer Nähe und sparen Sie.',
  keywords: 'Offertenportal, Umzug, Reinigung, Angebote, Firmen vergleichen, Schweiz, Offerten, Umzugsfirma, Reinigungsfirma',
  alternates: {
    canonical: 'https://online-offerten.ch/offerten-portal',
  },
}

export default function OffertenPortalPage() {
  return <OffertenPortalPageClient />
}
