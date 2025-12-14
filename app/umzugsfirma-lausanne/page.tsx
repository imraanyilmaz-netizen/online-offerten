import type { Metadata } from 'next'
import UmzugsfirmaLausannePageClient from '@/components/pages/locations/UmzugsfirmaLausannePageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Lausanne | Top Offerten | Stressfrei umziehen',
  description: 'Ihre zuverlässige Umzugsfirma in Lausanne. Fordern Sie jetzt kostenlose Offerten von geprüften Umzugsunternehmen für Ihren Umzug am Genfersee an.',
  keywords: 'umzugsfirma lausanne, umzug lausanne, zügelfirma lausanne, umzugsunternehmen lausanne, umzug genfersee',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-lausanne',
  },
}

export default function UmzugsfirmaLausannePage() {
  return <UmzugsfirmaLausannePageClient />
}
