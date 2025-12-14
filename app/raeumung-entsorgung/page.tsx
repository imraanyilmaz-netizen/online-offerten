import type { Metadata } from 'next'
import RaeumungEntsorgungPageClient from '@/components/pages/services/RaeumungEntsorgungPageClient'

export const metadata: Metadata = {
  title: 'Räumung & Entsorgung Schweiz finden & vergleichen » Kostenlose Offerten | Professionell & Günstig',
  description: 'Räumung & Entsorgung Schweiz: Vergleichen Sie kostenlos Offerten von geprüften Entsorgungsfirmen. Wohnungsräumung, Haushaltsauflösung, Kellerräumung & umweltgerechte Entsorgung – professionell und bis zu 40% günstiger. Jetzt Offerten anfordern!',
  keywords: 'räumung, entsorgung, räumung schweiz, entsorgung schweiz, räumung vergleichen, entsorgung vergleichen, wohnungsräumung, haushaltsauflösung, kellerräumung, büroräumung, entsorgungsfirma, räumungsfirma, entsorgungsfirma schweiz, räumungsfirma schweiz, räumung kostenlos, entsorgung kostenlos, räumung zürich, räumung bern, räumung basel, entsorgung zürich, entsorgung bern, entsorgung basel, räumung preisvergleich, entsorgung preisvergleich, räumung planen, entsorgung planen, räumung offerte, entsorgung offerte, räumung in der nähe, entsorgung in der nähe',
  alternates: {
    canonical: 'https://online-offerten.ch/raeumung-entsorgung',
  },
  openGraph: {
    title: 'Räumung & Entsorgung Schweiz finden & vergleichen',
    description: 'Vergleichen Sie kostenlos Offerten von geprüften Entsorgungsfirmen. Wohnungsräumung, Haushaltsauflösung, Kellerräumung & umweltgerechte Entsorgung.',
    url: 'https://online-offerten.ch/raeumung-entsorgung',
  },
}

export default function RaeumungEntsorgungPage() {
  return <RaeumungEntsorgungPageClient />
}

