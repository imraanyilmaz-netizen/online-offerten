import type { Metadata } from 'next'
import ServicesPageClient from '@/components/pages/ServicesPageClient'

export const metadata: Metadata = {
  title: 'Dienstleistungen | Umzug, Reinigung, Räumung - Online-offerten.ch',
  description: 'Entdecken Sie unsere umfassenden Dienstleistungen für Umzug, Reinigung, Räumung und mehr in der Schweiz. Fordern Sie jetzt Ihre kostenlose offerten an.',
  keywords: ['umzugsfirma', 'reinigungsfirma', 'räumungsfirma', 'Umzugshelfer', 'spezialtransporte', 'klaviertransport', 'lagerung', 'verpackungsservice'],
  alternates: {
    canonical: 'https://online-offerten.ch/services',
  },
}

export default function ServicesPage() {
  return <ServicesPageClient />
}

