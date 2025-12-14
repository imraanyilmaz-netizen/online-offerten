import type { Metadata } from 'next'
import ChecklistsPageClient from '@/components/pages/tools/ChecklistsPageClient'

export const metadata: Metadata = {
  title: 'Umzugs-Checklisten | Umzug planen leicht gemacht',
  description: 'Umfassende Checklisten für jede Phase Ihres Umzugs. Vom Kistenpacken bis zur Adressänderung – mit unseren Tipps stressfrei umziehen.',
  
  alternates: {
    canonical: 'https://online-offerten.ch/checklists',
  },
}

export default function ChecklistsPage() {
  return <ChecklistsPageClient />
}
