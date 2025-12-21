import type { Metadata } from 'next'
import UmzugsfirmaZurichPageClient from '@/components/pages/locations/UmzugsfirmaZurichPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Zürich > Umzugsofferten vergleichen',
  description: 'Finden Sie die passende Zügelfirma & Reinigungsfirma in Zürich - Umzugsofferten vergleichen bis zu 40% sparen! - Kostenlose Offerten',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-zuerich',
  },
  openGraph: {
    title: 'Umzugsfirma Zürich > Umzugsofferten vergleichen',
    description: 'Finden Sie die passende Zügelfirma & Reinigungsfirma in Zürich - Umzugsofferten vergleichen bis zu 40% sparen! - Kostenlose Offerten',
    url: 'https://online-offerten.ch/umzugsfirma-zuerich',
    siteName: 'Online-Offerten.ch',
    locale: 'de_CH',
    type: 'website',
  },
}

export default function UmzugsfirmaZurichPage() {
  return <UmzugsfirmaZurichPageClient />
}
