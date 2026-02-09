import type { Metadata } from 'next'
import { Suspense } from 'react'
import QuoteStatusPageClient from '@/components/pages/payment/QuoteStatusPageClient'

export const metadata: Metadata = {
  title: 'QuoteStatusPage - Online-Offerten.ch',
  description: '',
  
  alternates: {
    canonical: 'https://online-offerten.ch/anfrage-status',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function QuoteStatusPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <QuoteStatusPageClient />
    </Suspense>
  )
}
