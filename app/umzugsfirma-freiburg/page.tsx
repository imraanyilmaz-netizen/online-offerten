import type { Metadata } from 'next'
import UmzugsfirmaFreiburgPageClient from '@/components/pages/locations/UmzugsfirmaFreiburgPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Freiburg | Umzug im Üechtland',
  description: 'Ihre Umzugsfirma in Freiburg für einen reibungslosen Umzug. Erhalten Sie kostenlose Offerten von geprüften Zügelfirmen in der Region Freiburg.',
  keywords: 'umzugsfirma freiburg, umzug freiburg, zügelfirma freiburg, umzugsunternehmen freiburg, üechtland umzug',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-freiburg',
  },
}

export default function UmzugsfirmaFreiburgPage() {
  return <UmzugsfirmaFreiburgPageClient />
}
