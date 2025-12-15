import type { Metadata } from 'next'
import PartnerCreditTopUpPageClient from '@/components/pages/admin/PartnerCreditTopUpPageClient'

export const metadata: Metadata = {
  title: 'PartnerCreditTopUpPage - Online-Offerten.ch',
  description: '',
  
  alternates: {
    canonical: 'https://online-offerten.ch/partner/credit-top-up',
  },
}

export default function PartnerCreditTopUpPage() {
  return <PartnerCreditTopUpPageClient />
}
