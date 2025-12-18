import type { Metadata } from 'next'
import InternationaleUmzugPageClient from '@/components/pages/services/InternationaleUmzugPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirmen vergleichen für Auslandsumzug » Mehrere Firmen vergleichen & bis zu 40% sparen | Online Offerten vergleichen',
  description: 'Umzugsfirmen vergleichen für Auslandsumzug: Vergleichen Sie online mehrere geprüfte Umzugsfirmen und sparen Sie bis zu 40%. Kostenlos und unverbindlich Offerten von Fachfirmen für internationale Umzüge erhalten. Umzug nach Deutschland, Österreich, Frankreich, Spanien & ganz Europa.',
  alternates: {
    canonical: 'https://online-offerten.ch/internationale-umzuege',
  },
  openGraph: {
    title: 'Umzugsfirmen vergleichen für Auslandsumzug',
    description: 'Vergleichen Sie online mehrere geprüfte Umzugsfirmen und sparen Sie bis zu 40%. Kostenlos und unverbindlich Offerten von Fachfirmen für internationale Umzüge erhalten.',
    url: 'https://online-offerten.ch/internationale-umzuege',
  },
}

export default function InternationaleUmzugPage() {
  return <InternationaleUmzugPageClient />
}

