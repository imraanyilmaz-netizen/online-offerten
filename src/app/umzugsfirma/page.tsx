import type { Metadata } from 'next'
import UmzugsfirmaPageClient from './UmzugsfirmaPageContent'

export const metadata: Metadata = {
  title: 'Umzugsfirma Schweiz | Geprüfte Anbieter vergleichen',
  description: 'Finden Sie eine passende Umzugsfirma in der Schweiz und vergleichen Sie geprüfte Anbieter für Privat- und Geschäftsumzug sowie Spezialtransporte.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma',
  },
  openGraph: {
    title: 'Umzugsfirma Schweiz | Geprüfte Anbieter vergleichen',
    description: 'Finden Sie eine passende Umzugsfirma in der Schweiz und vergleichen Sie geprüfte Anbieter für Privat- und Geschäftsumzug sowie Spezialtransporte.',
    url: 'https://online-offerten.ch/umzugsfirma',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzugsservice-Schweiz/umzugsfirma-finden-vergleichen.png',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma finden und vergleichen',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Schweiz | Geprüfte Anbieter vergleichen',
    description: 'Finden Sie eine passende Umzugsfirma in der Schweiz und vergleichen Sie geprüfte Anbieter für Privat- und Geschäftsumzug sowie Spezialtransporte.',
    images: ['https://online-offerten.ch/image/umzugsservice-Schweiz/umzugsfirma-finden-vergleichen.png'],
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

const CANONICAL_URL = 'https://online-offerten.ch/umzugsfirma'

const umzugsfirmaJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Startseite',
          item: 'https://online-offerten.ch/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Umzugsfirma',
          item: CANONICAL_URL,
        },
      ],
    },
    {
      '@type': 'Service',
      name: 'Umzugsfirma finden und vergleichen',
      serviceType: 'Umzugsservice',
      description:
        'Finden Sie die beste Umzugsfirma in der Schweiz. Vergleichen Sie bis zu 5 kostenlose Offerten von geprüften Umzugsfirmen für Privatumzug, Geschäftsumzug und mehr.',
      provider: {
        '@type': 'Organization',
        name: 'Online-Offerten.ch',
        url: 'https://online-offerten.ch',
        logo: 'https://online-offerten.ch/image/logo-icon.webp',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Switzerland',
      },
      offers: {
        '@type': 'Offer',
        url: 'https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2',
        priceCurrency: 'CHF',
        price: '0',
        name: 'Kostenlose Umzugsfirma Offerten',
      },
    },
  ],
}

export default function UmzugsfirmaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(umzugsfirmaJsonLd) }}
      />
      <UmzugsfirmaPageClient />
    </>
  )
}


