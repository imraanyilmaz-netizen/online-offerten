import type { Metadata } from 'next'
import AdminDashboardPageClient from '@/components/pages/admin/AdminDashboardPageClient'

export const metadata: Metadata = {
  title: 'AdminDashboardPage - Online-Offerten.ch',
  description: '',
  
  alternates: {
    canonical: 'https://online-offerten.ch/admin-dashboard',
  },
}

export default function AdminDashboardPage() {
  return <AdminDashboardPageClient />
}
