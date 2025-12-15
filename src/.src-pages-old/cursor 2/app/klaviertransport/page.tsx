import type { Metadata } from 'next'
import KlaviertransportPageClient from '@/components/pages/services/KlaviertransportPageClient'

export const metadata: Metadata = {
  title: 'Klaviertransport: Zügelfirmen vergleichen für Klaviertransport » Mehrere Firmen vergleichen & bis zu 40% sparen',
  description: 'Klaviertransport: Vergleichen Sie mehrere Zügelfirmen für Klaviertransport und finden Sie die beste Firma. Kostenlos und unverbindlich Offerten von geprüften Spezialisten für Klavier Transport, Flügeltransport und Piano transportieren. Professionell, versichert und bis zu 40% günstiger.',
  alternates: {
    canonical: 'https://online-offerten.ch/klaviertransport',
  },
  openGraph: {
    title: 'Klaviertransport: Zügelfirmen vergleichen für Klaviertransport',
    description: 'Vergleichen Sie mehrere Zügelfirmen für Klaviertransport und finden Sie die beste Firma. Kostenlos und unverbindlich Offerten von geprüften Spezialisten.',
    url: 'https://online-offerten.ch/klaviertransport',
  },
}

export default function KlaviertransportPage() {
  return <KlaviertransportPageClient />
}

