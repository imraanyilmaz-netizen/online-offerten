import type { Metadata } from 'next'
import { Suspense } from 'react'
import PartnerDashboardLoader from './PartnerDashboardLoader'
import DashboardSkeleton from '@/src/components/ui/DashboardSkeleton'


export const metadata: Metadata = {
  title: 'PartnerDashboardPage - Online-Offerten.ch',
  description: '',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PartnerDashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <PartnerDashboardLoader />
    </Suspense>
  )
}
