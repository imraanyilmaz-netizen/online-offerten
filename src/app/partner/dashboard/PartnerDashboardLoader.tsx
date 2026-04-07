'use client'

import dynamic from 'next/dynamic'
import DashboardSkeleton from '@/src/components/ui/DashboardSkeleton'

/** Nur Client: kein SSR → keine Hydration-Mismatch mit Auth. getUser-Timeout im AuthContext. */
const PartnerDashboardPageClient = dynamic(
  () => import('@/components/pages/admin/PartnerDashboardPageClient'),
  {
    ssr: false,
    loading: () => <DashboardSkeleton />,
  }
)

export default function PartnerDashboardLoader() {
  return <PartnerDashboardPageClient />
}
