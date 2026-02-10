import type { Metadata } from 'next'
import GeschaeftsumzugPageClient from '@/components/pages/services/GeschaeftsumzugPageClient'

const canonicalUrl = '/umzugsfirma/geschaeftsumzug'

// Service Schema - Enhanced
const serviceSchema = {
  "@type": "Service",
  "serviceType": "Geschäftsumzug",
  "name": "Geschäftsumzug Schweiz – Offerten vergleichen",
  "description": "Vergleichen Sie kostenlos Offerten von geprüften Umzugsfirmen für Ihren Geschäftsumzug in der Schweiz. Büroumzug, Firmenumzug, Lagerumzug – professionell, termingerecht und bis zu 40% günstiger.",
  "category": "Umzugsservice / Umzugsvermittlung",
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
    "name": "Geschäftsumzug-Dienstleistungen",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Büroumzug" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Lagerumzug" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Firmenstandort-Umzug" } }
    ]
  },
  "offers": {
    "@type": "Offer",
    "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=geschaeftsumzug",
    "price": "0",
    "priceCurrency": "CHF",
    "name": "Kostenlose Offerten für Geschäftsumzug vergleichen",
    "description": "Bis zu 5 kostenlose und unverbindliche Offerten von geprüften Umzugsfirmen für Ihren Geschäftsumzug erhalten"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Unternehmen und Geschäftskunden in der Schweiz"
  }
}

// WebPage Schema
const webPageSchema = {
  "@type": "WebPage",
  "name": "Geschäftsumzug Schweiz – Offerten vergleichen",
  "description": "Vergleichsportal für Geschäftsumzüge in der Schweiz. Kostenlos Offerten von geprüften Umzugsunternehmen für Büro- und Firmenumzüge anfordern.",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "inLanguage": "de-CH",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch"
  },
  "about": { "@type": "Thing", "name": "Geschäftsumzug-Offerten vergleichen" },
  "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".hero-description"] }
}

// BreadcrumbList Schema
const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://online-offerten.ch/" },
    { "@type": "ListItem", "position": 2, "name": "Umzugsfirma", "item": "https://online-offerten.ch/umzugsfirma" },
    { "@type": "ListItem", "position": 3, "name": "Geschäftsumzug", "item": `https://online-offerten.ch${canonicalUrl}` }
  ]
}

// FAQPage Schema
const faqSchema = {
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was kostet ein Büroumzug?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Kosten für einen Büroumzug hängen von Umfang, Distanz und Aufwand ab. Ein kleiner Büroumzug kann ab 2.000 CHF beginnen, grössere Firmenumzüge kosten oft 10.000 CHF oder mehr. Holen Sie kostenlose Offerten ein, um die besten Preise zu vergleichen."
      }
    },
    {
      "@type": "Question",
      "name": "Wie finde ich die richtige Firma für meinen Firmenumzug?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vergleichen Sie Angebote regionaler Umzugsfirmen in Ihrer Nähe für einen professionellen Firmenumzug. Über unsere Plattform erhalten Sie schnell passende Offerten von geprüften Partnern. Achten Sie auf Versicherungen, positive Bewertungen und Spezialisierung auf Geschäftsumzüge."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lange dauert ein Geschäftsumzug?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Dauer hängt von der Unternehmensgrösse und dem Umfang ab. Kleinere Büros können an einem Wochenende umziehen, grössere Unternehmen benötigen mehrere Tage. Eine genaue Zeitplanung erfolgt nach einer Vor-Ort-Besichtigung."
      }
    },
    {
      "@type": "Question",
      "name": "Was übernehmen professionelle Umzugsfirmen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Professionelle Umzugsfirmen übernehmen die komplette Planung, Demontage und Montage von Büromöbeln, den sicheren Transport von IT-Equipment, Verpackungsservice, Zwischenlagerung, Entsorgung von Altmobiliar und die Koordination mit Handwerkern am neuen Standort."
      }
    }
  ]
}

// Combined Schema
const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [webPageSchema, breadcrumbSchema, serviceSchema, faqSchema]
}

export const metadata: Metadata = {
  title: 'Geschäftsumzug: Kostenlose Offerten vergleichen',
  description: 'Kosten für Büroumzug & Firmenumzug vergleichen. Geschäftsumzug in der Nähe: Gratis Offerten von geprüften Umzugsfirmen. Schnell, transparent und regional.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/geschaeftsumzug',
    languages: {
      'de-CH': 'https://online-offerten.ch/umzugsfirma/geschaeftsumzug',
      'x-default': 'https://online-offerten.ch/umzugsfirma/geschaeftsumzug',
    },
  },
  openGraph: {
    title: 'Geschäftsumzug: Kostenlose Offerten vergleichen',
    description: 'Kosten für Büroumzug & Firmenumzug vergleichen. Geschäftsumzug in der Nähe: Gratis Offerten von geprüften Umzugsfirmen.',
    url: 'https://online-offerten.ch/umzugsfirma/geschaeftsumzug',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzugsservice-Schweiz/gescheftsumzug.png',
        width: 1200,
        height: 630,
        alt: 'Geschäftsumzug Offerten vergleichen – Online-Offerten.ch',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Geschäftsumzug: Kostenlose Offerten vergleichen',
    description: 'Kosten für Büroumzug & Firmenumzug vergleichen. Geschäftsumzug in der Nähe: Gratis Offerten von geprüften Umzugsfirmen.',
    images: ['https://online-offerten.ch/image/umzugsservice-Schweiz/gescheftsumzug.png'],
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

export default function GeschaeftsumzugPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <GeschaeftsumzugPageClient />
    </>
  )
}


