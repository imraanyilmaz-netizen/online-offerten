import type { Metadata } from 'next'
import StandortePageClient from '@/components/pages/StandortePageClient'

export const metadata: Metadata = {
  title: 'Standorte | Umzugsfirmen & Reinigungsfirmen in der ganzen Schweiz',
  description: 'Finden Sie Umzugsfirmen und Reinigungsfirmen in allen Schweizer Städten. Von Zürich bis Genf, von Basel bis Bern - wir haben Partner in Ihrer Nähe.',
  keywords: ['standorte', 'umzugsfirma schweiz', 'reinigungsfirma schweiz', 'umzugsfirma zürich', 'umzugsfirma bern'],
  alternates: {
    canonical: 'https://online-offerten.ch/standorte',
  },
}

export default function StandortePage() {
  return <StandortePageClient />
}

