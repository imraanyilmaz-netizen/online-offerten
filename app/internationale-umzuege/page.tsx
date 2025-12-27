import type { Metadata } from 'next'
import InternationaleUmzugPageClient from '@/components/pages/services/InternationaleUmzugPageClient'

export const metadata: Metadata = {
  title: 'Internationale Umzüge: Kostenlose Offerten vergleichen | Online-Offerten.ch',
  description: 'Internationale Umzüge: Vergleichen Sie kostenlos mehrere geprüfte Umzugsfirmen und sparen Sie bis zu 40%. Offerten für Umzüge nach Deutschland, Österreich, Frankreich & ganz Europa.',
  alternates: {
    canonical: 'https://online-offerten.ch/internationale-umzuege',
  },
  openGraph: {
    title: 'Internationale Umzüge: Kostenlose Offerten vergleichen | Online-Offerten.ch',
    description: 'Internationale Umzüge: Vergleichen Sie kostenlos mehrere geprüfte Umzugsfirmen und sparen Sie bis zu 40%. Offerten für Umzüge nach Deutschland, Österreich, Frankreich & ganz Europa.',
    url: 'https://online-offerten.ch/internationale-umzuege',
  },
}

export default function InternationaleUmzugPage() {
  return <InternationaleUmzugPageClient />
}

