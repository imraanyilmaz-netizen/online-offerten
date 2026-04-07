'use client'

import dynamic from 'next/dynamic'
import DashboardSkeleton from '@/src/components/ui/DashboardSkeleton'

const AdminDashboardPageClient = dynamic(
  () => import('@/components/pages/admin/AdminDashboardPageClient'),
  {
    ssr: false,
    loading: () => <DashboardSkeleton />,
  }
)

export default function AdminDashboardLoader() {
  return <AdminDashboardPageClient />
}
