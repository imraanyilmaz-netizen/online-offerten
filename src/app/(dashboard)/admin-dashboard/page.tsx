import type { Metadata } from 'next'
import { Suspense } from 'react'
import AdminDashboardLoader from './AdminDashboardLoader'
import DashboardSkeleton from '@/src/components/ui/DashboardSkeleton'


export const metadata: Metadata = {
  title: 'AdminDashboardPage - Online-Offerten.ch',
  description: '',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <AdminDashboardLoader />
    </Suspense>
  )
}
