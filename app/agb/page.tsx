import type { Metadata } from 'next'
import { Suspense } from 'react'
import TermsAndConditionsPageClient from '@/components/pages/TermsAndConditionsPageClient'

export const metadata: Metadata = {
  title: 'Allgemeine Geschäftsbedingungen',
  description: 'Lesen Sie unsere Allgemeinen Geschäftsbedingungen (AGB) für Partnerfirmen. Gültig für Umzugsfirmen in der Schweiz.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://online-offerten.ch/agb',
  },
}

export default function TermsAndConditionsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <TermsAndConditionsPageClient />
    </Suspense>
  )
}



