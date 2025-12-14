import type { Metadata } from 'next'
import UmzugsfirmaZurichPageClient from '@/components/pages/locations/UmzugsfirmaZurichPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Zürich: Zügelfirmen vergleichen & Umzugsunternemen finden » Mehrere Firmen vergleichen & bis zu 40% sparen',
  description: 'Umzugsfirma Zürich: Vergleichen Sie mehrere Zügelfirmen Zürich und Umzugsunternemen Zürich. Umzugsfirma vergleichen Zürich - Kostenlos und unverbindlich Offerten von geprüften Umzugsfirmen vergleichen. Privatumzug, Geschäftsumzug, Reinigung & mehr. Bis zu 40% sparen!',
  
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-zuerich',
  },
}

export default function UmzugsfirmaZurichPage() {
  return <UmzugsfirmaZurichPageClient />
}
