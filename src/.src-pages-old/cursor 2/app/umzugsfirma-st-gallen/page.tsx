import type { Metadata } from 'next'
import UmzugsfirmaStGallenPageClient from '@/components/pages/locations/UmzugsfirmaStGallenPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma St. Gallen | Günstige Offerten | Top Service',
  description: 'Ihre Umzugsfirma in St. Gallen für einen stressfreien Umzug. Vergleichen Sie geprüfte Umzugsunternehmen und erhalten Sie die besten Offerten.',
  keywords: 'umzugsfirma st. gallen, umzug st. gallen, zügelfirma st. gallen, umzugsunternehmen st. gallen, günstig umziehen st. gallen',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-st-gallen',
  },
}

export default function UmzugsfirmaStGallenPage() {
  return <UmzugsfirmaStGallenPageClient />
}
