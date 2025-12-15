import type { Metadata } from 'next'
import PartnerDashboardPageClient from '@/components/pages/admin/PartnerDashboardPageClient'

export const metadata: Metadata = {
  title: 'PartnerDashboardPage - Online-Offerten.ch',
  description: '',
  
  alternates: {
    canonical: 'https://online-offerten.ch/partner/dashboard',
  },
}

export default function PartnerDashboardPage() {
  return <PartnerDashboardPageClient />
}
