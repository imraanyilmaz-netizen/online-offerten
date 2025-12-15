import type { Metadata } from 'next'
import TermsAndConditionsPageClient from '@/components/pages/TermsAndConditionsPageClient'

export const metadata: Metadata = {
  title: 'Allgemeine Geschäftsbedingungen | Online-Offerten.ch',
  description: 'Lesen Sie unsere Allgemeinen Geschäftsbedingungen (AGB) für Partnerfirmen. Gültig für Umzugsfirmen in der Schweiz.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://online-offerten.ch/agb',
  },
}

export default function TermsAndConditionsPage() {
  return <TermsAndConditionsPageClient />
}

