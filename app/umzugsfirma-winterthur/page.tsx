import type { Metadata } from 'next'
import UmzugsfirmaWinterthurPageClient from '@/components/pages/locations/UmzugsfirmaWinterthurPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Winterthur | Günstige Offerten | Top Service',
  description: 'Ihre Umzugsfirma in Winterthur für einen stressfreien Umzug. Vergleichen Sie geprüfte Umzugsunternehmen und erhalten Sie die besten Offerten.',
  keywords: 'umzugsfirma winterthur, umzug winterthur, zügelfirma winterthur, umzugsunternehmen winterthur, günstig umziehen winterthur',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-winterthur',
  },
}

export default function UmzugsfirmaWinterthurPage() {
  return <UmzugsfirmaWinterthurPageClient />
}
