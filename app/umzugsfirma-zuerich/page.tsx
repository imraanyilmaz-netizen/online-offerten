import type { Metadata } from 'next'
import UmzugsfirmaZurichPageClient from '@/components/pages/locations/UmzugsfirmaZurichPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Zürich: Kostenlose Offerten vergleichen | Online-Offerten.ch',
  description: 'Kostenlose Offerten von geprüften Umzugsfirmen in Zürich vergleichen. Privatumzug, Geschäftsumzug & mehr. Bis zu 40% sparen!',
  
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-zuerich',
  },
}

export default function UmzugsfirmaZurichPage() {
  return <UmzugsfirmaZurichPageClient />
}
