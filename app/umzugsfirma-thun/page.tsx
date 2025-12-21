import type { Metadata } from 'next'
import UmzugsfirmaThunPageClient from '@/components/pages/locations/UmzugsfirmaThunPageClient'

export const metadata: Metadata = {
  title: 'Umzugsfirma Thun | Ihr Umzugspartner am Thunersee | Online-Offerten.ch',
  description: 'Professionelle Umzugsfirma in Thun für private und geschäftliche Umzüge. Vergleichen Sie Offerten und sparen Sie bis zu 40% bei Ihrem Umzug.',
  keywords: 'umzugsfirma thun, umzug thun, zügelfirma thun, umzugsunternehmen thunersee, günstig umziehen thun',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-thun',
  },
  openGraph: {
    title: 'Umzugsfirma Thun | Ihr Umzugspartner am Thunersee',
    description: 'Professionelle Umzugsfirma in Thun für private und geschäftliche Umzüge. Vergleichen Sie Offerten und sparen Sie bis zu 40% bei Ihrem Umzug.',
    url: 'https://online-offerten.ch/umzugsfirma-thun',
    siteName: 'Online-Offerten.ch',
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Thun | Ihr Umzugspartner am Thunersee',
    description: 'Professionelle Umzugsfirma in Thun für private und geschäftliche Umzüge. Vergleichen Sie Offerten und sparen Sie bis zu 40% bei Ihrem Umzug.',
  },
}

export default function UmzugsfirmaThunPage() {
  return <UmzugsfirmaThunPageClient />
}
