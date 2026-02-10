import type { Metadata } from 'next'
import SpezialtransportePageClient from '@/components/pages/services/SpezialtransportePageClient'

const canonicalUrl = '/umzugsfirma/spezialtransporte'

// Service Schema - Enhanced
const serviceSchema = {
  "@type": "Service",
  "serviceType": "Spezialtransporte",
  "name": "Spezialtransporte Schweiz – Offerten vergleichen",
  "description": "Vergleichen Sie kostenlos Offerten von geprüften Firmen für Spezialtransporte in der Schweiz. Klaviertransport, Tresortransport, Maschinentransport – sicher, versichert und professionell.",
  "category": "Umzugsservice / Spezialtransport",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "provider": {
    "@type": "Organization",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch",
    "logo": "https://online-offerten.ch/image/logo-icon.webp",
    "description": "Vergleichsplattform für Umzugsfirmen in der Schweiz",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["German"]
    }
  },
  "areaServed": {
    "@type": "Country",
    "name": "Switzerland",
    "alternateName": "Schweiz"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Spezialtransport-Dienstleistungen",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Klaviertransport" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tresortransport" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Maschinentransport" } }
    ]
  },
  "offers": {
    "@type": "Offer",
    "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=spezialtransport",
    "price": "0",
    "priceCurrency": "CHF",
    "name": "Kostenlose Offerten für Spezialtransporte vergleichen",
    "description": "Bis zu 5 kostenlose und unverbindliche Offerten von geprüften Spezialtransport-Firmen erhalten"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Privatpersonen und Unternehmen, die Spezialtransporte in der Schweiz benötigen"
  }
}

// WebPage Schema
const webPageSchema = {
  "@type": "WebPage",
  "name": "Spezialtransporte Schweiz – Offerten vergleichen",
  "description": "Vergleichsportal für Spezialtransporte in der Schweiz. Kostenlos Offerten von geprüften Spezialisten für Klavier-, Tresor- und Maschinentransport anfordern.",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "inLanguage": "de-CH",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch"
  },
  "about": { "@type": "Thing", "name": "Spezialtransport-Offerten vergleichen" },
  "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".hero-description"] }
}

// BreadcrumbList Schema
const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://online-offerten.ch/" },
    { "@type": "ListItem", "position": 2, "name": "Umzugsfirma", "item": "https://online-offerten.ch/umzugsfirma" },
    { "@type": "ListItem", "position": 3, "name": "Spezialtransporte", "item": `https://online-offerten.ch${canonicalUrl}` }
  ]
}

// Combined Schema (no FAQ on this page)
const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [webPageSchema, breadcrumbSchema, serviceSchema]
}

export const metadata: Metadata = {
  title: 'Spezialtransporte: Kostenlose Offerten vergleichen',
  description: 'Spezialtransporte: Vergleichen Sie kostenlos mehrere geprüfte Firmen für Klavier-, Tresor- und Maschinentransport. Sicher, versichert und professionell. Jetzt Offerten anfordern!',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/spezialtransporte',
    languages: {
      'de-CH': 'https://online-offerten.ch/umzugsfirma/spezialtransporte',
      'x-default': 'https://online-offerten.ch/umzugsfirma/spezialtransporte',
    },
  },
  openGraph: {
    title: 'Spezialtransporte: Kostenlose Offerten vergleichen',
    description: 'Spezialtransporte: Vergleichen Sie kostenlos mehrere geprüfte Firmen für Klavier-, Tresor- und Maschinentransport. Sicher, versichert und professionell. Jetzt Offerten anfordern!',
    url: 'https://online-offerten.ch/umzugsfirma/spezialtransporte',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/b87025c3-7292-44e6-8a2c-7c1105b554bc.webp',
        width: 1200,
        height: 630,
        alt: 'Spezialtransporte Offerten vergleichen – Online-Offerten.ch',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spezialtransporte: Kostenlose Offerten vergleichen',
    description: 'Spezialtransporte: Vergleichen Sie kostenlos mehrere geprüfte Firmen für Klavier-, Tresor- und Maschinentransport.',
    images: ['https://online-offerten.ch/image/b87025c3-7292-44e6-8a2c-7c1105b554bc.webp'],
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

export default function SpezialtransportePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <SpezialtransportePageClient />
    </>
  )
}


