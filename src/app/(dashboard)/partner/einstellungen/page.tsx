import type { Metadata } from 'next'
import { Suspense } from 'react'
import PartnerSettingsLoader from './PartnerSettingsLoader'


export const metadata: Metadata = {
  title: 'PartnerSettingsPage - Online-Offerten.ch',
  description: '',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PartnerSettingsPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    }>
      <PartnerSettingsLoader />
    </Suspense>
  )
}
