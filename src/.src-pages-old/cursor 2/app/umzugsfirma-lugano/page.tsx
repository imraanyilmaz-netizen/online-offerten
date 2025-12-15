import type { Metadata } from 'next'
import UmzugsfirmaLuganoPageClient from '@/components/pages/locations/UmzugsfirmaLuganoPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Lugano | Günstige Offerten | Top Service',
  description: 'Ihre Umzugsfirma in Lugano für einen stressfreien Umzug. Vergleichen Sie geprüfte Umzugsunternehmen und erhalten Sie die besten Offerten im Tessin.',
  keywords: 'umzugsfirma lugano, umzug lugano, zügelfirma lugano, umzugsunternehmen tessin, günstig umziehen lugano',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-lugano',
  },
}

export default function UmzugsfirmaLuganoPage() {
  return <UmzugsfirmaLuganoPageClient />
}
