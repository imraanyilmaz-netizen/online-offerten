import type { Metadata } from 'next'
import { Suspense } from 'react'
import dynamicImport from 'next/dynamic'

// Client-only import - SSR devre dışı (eski SPA mantığı)
const PartnerDashboardPageClient = dynamicImport(
  () => import('@/components/pages/admin/PartnerDashboardPageClient'),
  { 
    ssr: false, // SSR'ı tamamen devre dışı bırak
    loading: () => (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
  }
)

// Force dynamic - no static generation for partner panel
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'PartnerDashboardPage - Online-Offerten.ch',
  description: '',
  alternates: {
    canonical: 'https://online-offerten.ch/partner/dashboard',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function PartnerDashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    }>
      <PartnerDashboardPageClient />
    </Suspense>
  )
}


