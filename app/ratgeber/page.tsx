import type { Metadata } from 'next'
import { Suspense } from 'react'
import RatgeberPageClient from '@/components/pages/tools/RatgeberPageClient'

export const metadata: Metadata = {
  title: 'Ratgeber & Tipps für Umzug, Reinigung & Lagerung | Online-Offerten.ch',
  description: 'Expertenwissen und praktische Tipps für Ihren Umzug, die Endreinigung und die richtige Lagerung. Machen Sie Ihren Übergang einfacher mit unserem Ratgeber.',
  keywords: 'ratgeber, umzugsratgeber, reinigungsratgeber, umzugstipps, reinigungstipps, umzugscheckliste, reinigungscheckliste, umzug planen, schweiz, umzugsguide, reinigungsguide, lagerung tipps',
  alternates: {
    canonical: 'https://online-offerten.ch/ratgeber',
  },
}

export default function RatgeberPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <RatgeberPageClient />
    </Suspense>
  )
}
