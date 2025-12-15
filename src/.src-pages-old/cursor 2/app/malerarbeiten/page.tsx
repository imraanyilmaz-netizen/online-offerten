import type { Metadata } from 'next'
import MalerarbeitenPageClient from '@/components/pages/services/MalerarbeitenPageClient'

export const metadata: Metadata = {
  title: 'Malerarbeiten Schweiz finden & vergleichen » Kostenlose Offerten | Bis zu 40% sparen',
  description: 'Malerarbeiten Schweiz: Vergleichen Sie kostenlos Offerten von geprüften Malerfirmen. Innenanstrich, Aussenanstrich, Fassadenanstrich & Renovierung – sicher, professionell und bis zu 40% günstiger. Jetzt Offerten anfordern!',
  keywords: 'malerarbeiten, malerarbeiten schweiz, malerarbeiten vergleichen, malerarbeiten kostenlos, malerfirma, malerfirma schweiz, malerfirma vergleichen, maler finden, innenanstrich, aussenanstrich, fassadenanstrich, wohnung streichen, malerfirma zürich, malerfirma bern, malerfirma basel, malerfirma luzern, maler offerten, malerarbeiten preise, maler kosten schweiz, innenanstrich kosten, fassade streichen preise, wohnung streichen kosten, malerfirma finden, malerfirma in der nähe, malerarbeiten preisvergleich, malerarbeiten planen, malerarbeiten offerte',
  alternates: {
    canonical: 'https://online-offerten.ch/malerarbeiten',
  },
  openGraph: {
    title: 'Malerarbeiten Schweiz finden & vergleichen',
    description: 'Vergleichen Sie kostenlos Offerten von geprüften Malerfirmen. Innenanstrich, Aussenanstrich, Fassadenanstrich & Renovierung.',
    url: 'https://online-offerten.ch/malerarbeiten',
    images: [
      {
        url: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/1633bb6a22ddc3924f0c0576a88ab9a8.png',
        width: 1200,
        height: 630,
        alt: 'Malerarbeiten Schweiz',
      },
    ],
  },
}

export default function MalerarbeitenPage() {
  return <MalerarbeitenPageClient />
}

