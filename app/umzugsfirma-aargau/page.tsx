import type { Metadata } from 'next'
import UmzugsfirmaAargauPageClient from '@/components/pages/locations/UmzugsfirmaAargauPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Aargau | Top Umzugsunternehmen im Kanton',
  description: 'Finden Sie die beste Umzugsfirma im Aargau. Vergleichen Sie lokale, geprüfte Partner für Ihren Umzug und erhalten Sie unverbindliche Offerten.',
  keywords: 'umzugsfirma aargau, umzug aargau, zügelfirma aargau, umzugsunternehmen aargau, rüebliland umzug',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-aargau',
  },
}

export default function UmzugsfirmaAargauPage() {
  return <UmzugsfirmaAargauPageClient />
}
