import type { Metadata } from 'next'
import UmzugsfirmaBaselPageClient from '@/components/pages/locations/UmzugsfirmaBaselPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Basel » Günstig zügeln',
  description: 'Ihre Umzugsfirma in Basel für einen reibungslosen Umzug. Holen Sie kostenlose Offerten von geprüften Zügelfirmen und Reinigungsfirmen in der Region Basel ein.',
  keywords: 'umzugsfirma basel, zügelfirma basel, umzug basel, reinigung basel, umzugsreinigung, umzugsservice basel',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-basel',
  },
}

export default function UmzugsfirmaBaselPage() {
  return <UmzugsfirmaBaselPageClient />
}
