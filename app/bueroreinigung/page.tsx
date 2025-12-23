import type { Metadata } from 'next'
import BueroreinigungPageClient from '@/components/pages/services/BueroreinigungPageClient'

export const metadata: Metadata = {
  title: 'Büroreinigung – Kostenlose Offerten vergleichen',
  description: 'Professionelle Büroreinigung. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Büroreinigung garantiert.',
  alternates: {
    canonical: 'https://online-offerten.ch/bueroreinigung',
  },
}

export default function BueroreinigungPage() {
  return <BueroreinigungPageClient />
}

