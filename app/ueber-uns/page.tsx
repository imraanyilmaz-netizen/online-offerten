import type { Metadata } from 'next'
import AboutPageClient from '@/components/pages/AboutPageClient'

export const metadata: Metadata = {
  title: 'Über uns | Online-Offerten.ch - Ihre Experten für Umzug & Reinigung',
  description: 'Erfahren Sie mehr über Online-Offerten.ch, Ihre zuverlässige Plattform für Umzugs-, Reinigungs- und Räumungsdienste in der Schweiz. Unsere Mission, Vision und Werte.',
  keywords: ['über uns', 'online-offerten.ch', 'mission', 'vision', 'team', 'umzug vergleich', 'reinigung vergleich'],
  alternates: {
    canonical: 'https://online-offerten.ch/ueber-uns',
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}

