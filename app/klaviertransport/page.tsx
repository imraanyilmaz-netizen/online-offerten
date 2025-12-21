import type { Metadata } from 'next'
import KlaviertransportPageClient from '@/components/pages/services/KlaviertransportPageClient'

export const metadata: Metadata = {
  title: 'Klaviertransport: Kostenlose Offerten vergleichen | Online-Offerten.ch',
  description: 'Kostenlose Offerten von geprüften Spezialisten für Klaviertransport vergleichen. Flügeltransport, Piano-Transport & mehr. Professionell versichert, bis zu 40% sparen!',
  alternates: {
    canonical: 'https://online-offerten.ch/klaviertransport',
  },
  openGraph: {
    title: 'Klaviertransport: Kostenlose Offerten vergleichen',
    description: 'Kostenlose Offerten von geprüften Spezialisten für Klaviertransport vergleichen. Flügeltransport, Piano-Transport & mehr.',
    url: 'https://online-offerten.ch/klaviertransport',
  },
}

export default function KlaviertransportPage() {
  return <KlaviertransportPageClient />
}

