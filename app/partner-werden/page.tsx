import type { Metadata } from 'next'
import PartnerRegistrationPageClient from '@/components/pages/PartnerRegistrationPageClient'

export const metadata: Metadata = {
  title: 'Partner werden | Kundenanfragen für Umzug, Reinigung & Malerarbeiten',
  description:
    'Jetzt als Partnerbetrieb bei Online-Offerten.ch registrieren und qualifizierte Kundenanfragen aus Ihrer Region erhalten. Kostenlos, unverbindlich und mit voller Kontrolle pro Anfrage.',
  alternates: {
    canonical: 'https://online-offerten.ch/partner-werden',
  },
  openGraph: {
    title: 'Partner werden bei Online-Offerten.ch',
    description:
      'Registrieren Sie Ihren Betrieb für Umzug, Reinigung oder Malerarbeiten und erhalten Sie qualifizierte Kundenanfragen aus Ihrer Region.',
    url: 'https://online-offerten.ch/partner-werden',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/online-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Partner werden',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partner werden bei Online-Offerten.ch',
    description:
      'Kostenlos registrieren und passende Kundenanfragen für Umzug, Reinigung und Malerarbeiten erhalten.',
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

export default function PartnerRegistrationPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Partner werden bei Online-Offerten.ch',
    description:
      'Registrierung für Partnerbetriebe in den Bereichen Umzug, Reinigung und Malerarbeiten in der Schweiz.',
    url: 'https://online-offerten.ch/partner-werden',
    mainEntity: {
      '@type': 'Organization',
      name: 'Online Offerten',
      url: 'https://online-offerten.ch',
      email: 'info@online-offerten.ch',
      areaServed: 'CH',
      knowsAbout: ['Umzug', 'Reinigung', 'Malerarbeiten', 'Offertenvergleich'],
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Ist die Registrierung als Partner kostenlos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja. Die Registrierung ist kostenlos und unverbindlich.',
        },
      },
      {
        '@type': 'Question',
        name: 'Für welche Branchen ist die Partnerschaft geeignet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Partner werden können Betriebe aus Umzug, Reinigung und Malerarbeiten in der ganzen Schweiz.',
        },
      },
      {
        '@type': 'Question',
        name: 'Muss ich jede Anfrage bearbeiten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nein. Sie entscheiden pro Anfrage selbst, ob Sie reagieren und eine Offerte senden möchten.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PartnerRegistrationPageClient />
    </>
  )
}



