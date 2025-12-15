import type { Metadata } from 'next'
import QuoteFormPageClient from '@/components/pages/payment/QuoteFormPageClient'

export const metadata: Metadata = {
  title: 'QuoteFormPage - Online-Offerten.ch',
  description: '',
  
  alternates: {
    canonical: 'https://online-offerten.ch/kostenlose-offerte-anfordern',
  },
}

export default function QuoteFormPage() {
  return <QuoteFormPageClient />
}
