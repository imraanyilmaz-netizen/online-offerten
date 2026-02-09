import type { Metadata } from 'next'
import PaymentCancelPageClient from '@/components/pages/payment/PaymentCancelPageClient'

export const metadata: Metadata = {
  title: 'PaymentCancelPage - Online-Offerten.ch',
  description: '',
  
  alternates: {
    canonical: 'https://online-offerten.ch/payment/cancel',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function PaymentCancelPage() {
  return <PaymentCancelPageClient />
}
