import type { Metadata } from 'next'
import ContactPageClient from '@/components/pages/ContactPageClient'

export const metadata: Metadata = {
  title: 'Kontakt – Wir sind für Sie da',
  description: 'Haben Sie Fragen oder benötigen Sie Unterstützung? Kontaktieren Sie das Team von Online-Offerten.ch per E-Mail oder über unser Kontaktformular. Wir helfen Ihnen gerne weiter.',
  alternates: {
    canonical: 'https://online-offerten.ch/kontakt',
  },
  openGraph: {
    title: 'Kontakt – Wir sind für Sie da',
    description: 'Haben Sie Fragen oder benötigen Sie Unterstützung? Kontaktieren Sie das Team von Online-Offerten.ch per E-Mail oder über unser Kontaktformular. Wir helfen Ihnen gerne weiter.',
    url: 'https://online-offerten.ch/kontakt',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/online-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Kontakt',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kontakt – Wir sind für Sie da',
    description: 'Haben Sie Fragen oder benötigen Sie Unterstützung? Kontaktieren Sie das Team von Online-Offerten.ch per E-Mail oder über unser Kontaktformular.',
    images: ['https://online-offerten.ch/image/online-offerten.webp'],
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

export default function ContactPage() {
  return <ContactPageClient />
}

