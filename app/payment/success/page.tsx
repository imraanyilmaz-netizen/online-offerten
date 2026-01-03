import type { Metadata } from 'next'
import { Suspense } from 'react'
import PaymentSuccessPageClient from '@/components/pages/payment/PaymentSuccessPageClient'

export const metadata: Metadata = {
  title: 'PaymentSuccessPage - Online-Offerten.ch',
  description: '',
  
  alternates: {
    canonical: 'https://online-offerten.ch/payment/success',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <PaymentSuccessPageClient />
    </Suspense>
  )
}
