import type { Metadata } from 'next'
import UmzugsfirmaLuzernPageClient from '@/components/pages/locations/UmzugsfirmaLuzernPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Luzern > Umzugsofferten vergleichen',
  description: 'Finden Sie die passende Zügelfirma & Reinigungsfirma in Luzern - Umzugsofferten vergleichen bis zu 40% sparen! - Kostenlose Offerten',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-luzern',
  },
  openGraph: {
    title: 'Umzugsfirma Luzern > Umzugsofferten vergleichen',
    description: 'Finden Sie die passende Zügelfirma & Reinigungsfirma in Luzern - Umzugsofferten vergleichen bis zu 40% sparen! - Kostenlose Offerten',
    url: 'https://online-offerten.ch/umzugsfirma-luzern',
    siteName: 'Online-Offerten.ch',
    locale: 'de_CH',
    type: 'website',
  },
}

export default function UmzugsfirmaLuzernPage() {
  return <UmzugsfirmaLuzernPageClient />
}
