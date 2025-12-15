import type { Metadata } from 'next'
import ReviewPageClient from '@/components/pages/payment/ReviewPageClient'

export const metadata: Metadata = {
  title: 'ReviewPage - Online-Offerten.ch',
  description: '',
  
  alternates: {
    canonical: 'https://online-offerten.ch/bewertung',
  },
}

export default function ReviewPage() {
  return <ReviewPageClient />
}
