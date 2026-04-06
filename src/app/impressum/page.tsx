import type { Metadata } from 'next'
import ImpressumPageClient from '@/components/pages/ImpressumPageClient'

export const metadata: Metadata = {
  title: 'Impressum',
  description:
    'Impressum und rechtliche Angaben zu Yilmaz Platform Solutions und Online-Offerten.ch – Kontakt, Handelsregister, Haftung und Urheberrecht.',
  alternates: {
    canonical: 'https://online-offerten.ch/impressum',
  },
}

export default function ImpressumPage() {
  return <ImpressumPageClient />
}
