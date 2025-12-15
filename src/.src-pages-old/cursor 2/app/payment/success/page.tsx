import type { Metadata } from 'next'
import PaymentSuccessPageClient from '@/components/pages/payment/PaymentSuccessPageClient'

export const metadata: Metadata = {
  title: 'PaymentSuccessPage - Online-Offerten.ch',
  description: '',
  
  alternates: {
    canonical: 'https://online-offerten.ch/payment/success',
  },
}

export default function PaymentSuccessPage() {
  return <PaymentSuccessPageClient />
}
