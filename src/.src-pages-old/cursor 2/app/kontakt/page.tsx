import type { Metadata } from 'next'
import ContactPageClient from '@/components/pages/ContactPageClient'

export const metadata: Metadata = {
  title: 'Kontakt | Online-Offerten.ch - Wir sind für Sie da',
  description: 'Haben Sie Fragen oder benötigen Sie Unterstützung? Kontaktieren Sie das Team von Online-Offerten.ch per E-Mail oder über unser Kontaktformular. Wir helfen Ihnen gerne weiter.',
  keywords: ['kontakt', 'online-offerten.ch', 'e-mail', 'telefon', 'adresse', 'kontaktformular', 'support'],
  alternates: {
    canonical: 'https://online-offerten.ch/kontakt',
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}

