import type { Metadata } from 'next'
import UmzugsfirmaBernPageClient from '@/components/pages/locations/UmzugsfirmaBernPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Bern: Zügelfirmen vergleichen & Umzugsunternemen finden » Mehrere Firmen vergleichen & bis zu 40% sparen',
  description: 'Umzugsfirma Bern: Vergleichen Sie mehrere Zügelfirmen Bern und Umzugsunternemen Bern. Umzugsfirma vergleichen Bern - Kostenlos und unverbindlich Offerten von geprüften Umzugsfirmen vergleichen. Privatumzug, Geschäftsumzug, Reinigung & mehr. Bis zu 40% sparen!',
  
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-bern',
  },
}

export default function UmzugsfirmaBernPage() {
  return <UmzugsfirmaBernPageClient />
}
