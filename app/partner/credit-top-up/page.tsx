import type { Metadata } from 'next'
import { Suspense } from 'react'
import PartnerCreditTopUpPageClient from '@/components/pages/admin/PartnerCreditTopUpPageClient'

// Force dynamic rendering - no static generation for partner panel
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'PartnerCreditTopUpPage - Online-Offerten.ch',
  description: '',
  
  alternates: {
    canonical: 'https://online-offerten.ch/partner/credit-top-up',
  },
}

export default function PartnerCreditTopUpPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <PartnerCreditTopUpPageClient />
    </Suspense>
  )
}
