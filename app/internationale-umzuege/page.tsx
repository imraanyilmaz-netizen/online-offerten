import type { Metadata } from 'next'
import { Suspense } from 'react'
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

const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
  </div>
)

export default function InternationaleUmzugPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <InternationaleUmzugPageClient />
    </Suspense>
  )
}

