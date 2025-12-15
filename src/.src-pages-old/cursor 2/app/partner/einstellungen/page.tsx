import type { Metadata } from 'next'
import PartnerSettingsPageClient from '@/components/pages/admin/PartnerSettingsPageClient'

export const metadata: Metadata = {
  title: 'PartnerSettingsPage - Online-Offerten.ch',
  description: '',
  
  alternates: {
    canonical: 'https://online-offerten.ch/partner/einstellungen',
  },
}

export default function PartnerSettingsPage() {
  return <PartnerSettingsPageClient />
}
