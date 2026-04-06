import type { Metadata } from 'next'
import { Suspense } from 'react'
import PaymentSuccessPageClient from '@/components/pages/payment/PaymentSuccessPageClient'

// Force dynamic - no static generation for payment status
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Payment Status - Online-Offerten.ch',
  description: 'Zahlungsstatus für Partner-Guthaben',
  
  robots: {
    index: false,
    follow: false,
  },
}

export default function PartnerPaymentStatusPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <PaymentSuccessPageClient />
    </Suspense>
  )
}


