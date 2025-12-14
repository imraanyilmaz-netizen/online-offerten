import type { Metadata } from 'next'
import PartnerRegistrationPageClient from '@/components/pages/PartnerRegistrationPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma, Reinigungsfirma, Malerbetrieb & Gartenbau Partner werden | Kostenlose Registrierung',
  description: 'Werden Sie Partner für Umzug, Reinigung, Malerarbeiten & Gartenbau. Erhalten Sie qualifizierte Kundenanfragen aus Ihrer Region. Kostenlos registrieren & mehr Aufträge gewinnen.',
  keywords: ['umzugsfirma partner werden', 'reinigungsfirma partner werden', 'malerbetrieb partner werden', 'gartenbau partner werden', 'umzugsfirma registrieren'],
  alternates: {
    canonical: 'https://online-offerten.ch/partner-werden',
  },
}

export default function PartnerRegistrationPage() {
  return <PartnerRegistrationPageClient />
}

