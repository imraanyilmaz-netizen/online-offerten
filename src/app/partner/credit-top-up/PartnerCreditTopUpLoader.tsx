'use client'

import dynamic from 'next/dynamic'

const PartnerCreditTopUpPageClient = dynamic(
  () => import('@/components/pages/admin/PartnerCreditTopUpPageClient'),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600" />
      </div>
    ),
  }
)

export default function PartnerCreditTopUpLoader() {
  return <PartnerCreditTopUpPageClient />
}
