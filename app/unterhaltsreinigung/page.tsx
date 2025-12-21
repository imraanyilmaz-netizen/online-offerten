import type { Metadata } from 'next'
import UnterhaltsreinigungPageClient from '@/components/pages/services/UnterhaltsreinigungPageClient'

export const metadata: Metadata = {
  title: 'Unterhaltsreinigung – Kostenlose Offerten vergleichen',
  description: 'Unterhaltsreinigung für Büro, Haus oder Wohnung: Fordern Sie kostenlose Offerten an und vergleichen Sie professionelle Reinigungsservices bequem online.',
  alternates: {
    canonical: 'https://online-offerten.ch/unterhaltsreinigung',
  },
}

export default function UnterhaltsreinigungPage() {
  return <UnterhaltsreinigungPageClient />
}

