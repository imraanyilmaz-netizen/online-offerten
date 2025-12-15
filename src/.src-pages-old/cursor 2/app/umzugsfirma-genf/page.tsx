import type { Metadata } from 'next'
import UmzugsfirmaGenfPageClient from '@/components/pages/locations/UmzugsfirmaGenfPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Genf | Top Umzugsunternehmen | Günstige Offerten',
  description: 'Ihre professionelle Umzugsfirma in Genf. Erhalten Sie kostenlose & unverbindliche Offerten von geprüften Umzugsunternehmen für Ihren Umzug in Genf.',
  keywords: 'umzugsfirma genf, umzug genf, zügelfirma genf, umzugsunternehmen genf, internationaler umzug genf, umzugsofferte genf',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-genf',
  },
}

export default function UmzugsfirmaGenfPage() {
  return <UmzugsfirmaGenfPageClient />
}
