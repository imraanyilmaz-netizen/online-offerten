import type { Metadata } from 'next'
import QuoteFormPageClient from '@/components/pages/payment/QuoteFormPageClient'

export const metadata: Metadata = {
  title: 'Free Quote Request - Online-Offerten.ch',
  description: 'Request a free quote for moving, cleaning, painting, and other services',
  
  alternates: {
    canonical: 'https://online-offerten.ch/free-quote-request',
  },
}

export default function QuoteFormPage() {
  return <QuoteFormPageClient />
}

