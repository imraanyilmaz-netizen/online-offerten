import type { Metadata } from 'next'
import UmzugsfirmaLuzernPageClient from '@/components/pages/locations/UmzugsfirmaLuzernPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Luzern » Günstig zügeln | Top-Firmen',
  description: 'Ihre Umzugsfirma in Luzern für einen stressfreien Umzug. Vergleichen Sie kostenlose Offerten von geprüften Zügelfirmen und Reinigungsfirmen in der Region Luzern.',
  keywords: 'umzugsfirma luzern, zügelfirma luzern, umzug luzern, reinigung luzern, umzugsreinigung, umzugsservice luzern',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-luzern',
  },
}

export default function UmzugsfirmaLuzernPage() {
  return <UmzugsfirmaLuzernPageClient />
}
