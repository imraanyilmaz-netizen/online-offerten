import type { Metadata } from 'next'
import ChecklistsPageClient from '@/components/pages/tools/ChecklistsPageClient'

export const metadata: Metadata = {
  title: 'Umzugs-Checklisten | Umzug planen leicht gemacht',
  description: 'Umfassende Checklisten für jede Phase Ihres Umzugs. Vom Kistenpacken bis zur Adressänderung – mit unseren Tipps stressfrei umziehen.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/checklists',
  },
  openGraph: {
    title: 'Umzugs-Checklisten | Umzug planen leicht gemacht',
    description: 'Umfassende Checklisten für jede Phase Ihres Umzugs. Vom Kistenpacken bis zur Adressänderung – mit unseren Tipps stressfrei umziehen.',
    url: 'https://online-offerten.ch/umzugsfirma/checklists',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzugsfirma-kartons.webp',
        width: 1200,
        height: 630,
        alt: 'Umzugs-Checklisten',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugs-Checklisten | Umzug planen leicht gemacht',
    description: 'Umfassende Checklisten für jede Phase Ihres Umzugs. Vom Kistenpacken bis zur Adressänderung – mit unseren Tipps stressfrei umziehen.',
    images: ['https://online-offerten.ch/image/umzugsfirma-kartons.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function ChecklistsPage() {
  return <ChecklistsPageClient />
}



