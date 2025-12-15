import type { Metadata } from 'next'
import QuoteStatusPageClient from '@/components/pages/payment/QuoteStatusPageClient'

export const metadata: Metadata = {
  title: 'QuoteStatusPage - Online-Offerten.ch',
  description: '',
  
  alternates: {
    canonical: 'https://online-offerten.ch/anfrage-status',
  },
}

export default function QuoteStatusPage() {
  return <QuoteStatusPageClient />
}
