import type { Metadata } from 'next'
import PartnerSearchPageClient from '@/components/pages/PartnerSearchPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirmen & Reinigungsfirmen Schweiz finden & vergleichen » Kostenlose Offerten',
  description: 'Finden Sie qualifizierte Umzugsfirmen und Reinigungsfirmen in Ihrer Region. Vergleichen Sie Bewertungen, Services und Preise von verifizierten Partnern auf Online-Offerten.ch.',
  keywords: ['partner suche', 'umzugsfirma finden', 'reinigungsfirma finden', 'zügelfirma schweiz', 'umzugsunternehmen', 'firmenvergleich', 'bewertungen'],
  alternates: {
    canonical: 'https://online-offerten.ch/partner-suche',
  },
}

export default function PartnerSearchPage() {
  return <PartnerSearchPageClient />
}

