import type { Metadata } from 'next'
import PrivacyPolicyPageClient from '@/components/pages/PrivacyPolicyPageClient'

export const metadata: Metadata = {
  title: 'Datenschutzbestimmungen',
  description: 'Erfahren Sie, wie wir Ihre Daten schützen. Unsere Datenschutzbestimmungen gemäss Schweizer DSG.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://online-offerten.ch/datenschutz',
  },
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyPageClient />
}

