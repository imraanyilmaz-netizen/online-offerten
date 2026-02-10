import type { Metadata } from 'next'
import KlaviertransportPageClient from '@/components/pages/services/KlaviertransportPageClient'

const canonicalUrl = '/umzugsfirma/spezialtransporte/klaviertransport'

// Service Schema - Enhanced
const serviceSchema = {
  "@type": "Service",
  "serviceType": "Klaviertransport",
  "name": "Klaviertransport Schweiz – Offerten vergleichen",
  "description": "Vergleichen Sie kostenlos Offerten von geprüften Spezialisten für Klaviertransport in der Schweiz. Flügeltransport, Piano-Transport & mehr – professionell versichert und bis zu 40% günstiger.",
  "category": "Spezialtransport / Musikinstrumenten-Transport",
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
    "name": "Klaviertransport-Dienstleistungen",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Klaviertransport (Pianino)" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Flügeltransport" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Spezialinstrumenten-Transport" } }
    ]
  },
  "offers": {
    "@type": "Offer",
    "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=spezialtransport&special_transport_type=klaviertransport",
    "price": "0",
    "priceCurrency": "CHF",
    "name": "Kostenlose Offerten für Klaviertransport vergleichen",
    "description": "Bis zu 5 kostenlose und unverbindliche Offerten von geprüften Klaviertransport-Spezialisten erhalten"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Privatpersonen und Institutionen, die Klaviere oder Flügel in der Schweiz transportieren lassen möchten"
  }
}

// WebPage Schema
const webPageSchema = {
  "@type": "WebPage",
  "name": "Klaviertransport Schweiz – Offerten vergleichen",
  "description": "Vergleichsportal für Klaviertransport in der Schweiz. Kostenlos Offerten von geprüften Spezialisten für Klavier- und Flügeltransport anfordern.",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "inLanguage": "de-CH",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch"
  },
  "about": { "@type": "Thing", "name": "Klaviertransport-Offerten vergleichen" },
  "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".hero-description"] }
}

// BreadcrumbList Schema
const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://online-offerten.ch/" },
    { "@type": "ListItem", "position": 2, "name": "Umzugsfirma", "item": "https://online-offerten.ch/umzugsfirma" },
    { "@type": "ListItem", "position": 3, "name": "Spezialtransporte", "item": "https://online-offerten.ch/umzugsfirma/spezialtransporte" },
    { "@type": "ListItem", "position": 4, "name": "Klaviertransport", "item": `https://online-offerten.ch${canonicalUrl}` }
  ]
}

// FAQPage Schema
const faqSchema = {
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wie viel kostet ein Klaviertransport in der Schweiz?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Kosten variieren stark je nach Instrumententyp (Klavier, Flügel), Gewicht, Distanz, Stockwerken und Zugänglichkeit. Die Preise liegen oft ab etwa 380 CHF, können aber je nach Aufwand höher sein. Für genaue Preise empfiehlt sich eine individuelle Offerte."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lange dauert der Transport eines Klaviers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Dauer hängt von der Entfernung, den Zugangsbedingungen und der Vorbereitung ab. Ein gut geplanter Transport innerhalb einer Stadt kann meist an einem Tag erledigt werden."
      }
    },
    {
      "@type": "Question",
      "name": "Wie erhalte ich ein Angebot?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sie können ein kostenloses und unverbindliches Angebot über das Online-Formular anfordern, in dem Sie Details zu Ihrem Instrument und den Transportbedingungen angeben."
      }
    },
    {
      "@type": "Question",
      "name": "Gibt es versteckte Kosten beim Klaviertransport?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Seriöse Anbieter arbeiten mit Festpreisen und transparenter Kostendarstellung, sodass keine versteckten Kosten entstehen. Zusatzleistungen wie Einlagerung oder Demontage können separat berechnet werden."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Versicherungen bieten Sie für den Klaviertransport an?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Professionelle Klaviertransporte sind umfassend gegen Schäden versichert, sodass Ihr Instrument während des gesamten Transports geschützt ist."
      }
    },
    {
      "@type": "Question",
      "name": "Wie bereiten Sie ein Klavier für den Transport vor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Das Instrument wird fachgerecht gesichert, bewegliche Teile wie Deckel und Tastenklappe werden fixiert, und es wird mit Schutzdecken und Folien vor Kratzern und Stossen geschützt. Bei Flügeln werden oft Füsse und Pedale demontiert."
      }
    },
    {
      "@type": "Question",
      "name": "Transportieren Sie auch Konzertflügel oder andere grosse Instrumente?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, der Transport von Konzertflügeln ist eine Spezialität vieler Klaviertransportfirmen. Auch andere Tasteninstrumente wie Cembali oder Digitalpianos werden fachgerecht transportiert."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist der Unterschied zwischen einem normalen Umzug und einem Klaviertransport?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein Klaviertransport erfordert spezielles Know-how, Ausrüstung und Erfahrung, da Klaviere sehr empfindlich und schwer sind. Normale Umzugsfirmen verfügen oft nicht über die nötigen Mittel und Kenntnisse."
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
  title: 'Klaviertransport: Kostenlose Offerten vergleichen',
  description: 'Kostenlose Offerten von geprüften Spezialisten für Klaviertransport vergleichen. Flügeltransport, Piano-Transport & mehr. Professionell versichert, bis zu 40% sparen!',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/spezialtransporte/klaviertransport',
    languages: {
      'de-CH': 'https://online-offerten.ch/umzugsfirma/spezialtransporte/klaviertransport',
      'x-default': 'https://online-offerten.ch/umzugsfirma/spezialtransporte/klaviertransport',
    },
  },
  openGraph: {
    title: 'Klaviertransport: Kostenlose Offerten vergleichen',
    description: 'Kostenlose Offerten von geprüften Spezialisten für Klaviertransport vergleichen. Flügeltransport, Piano-Transport & mehr.',
    url: 'https://online-offerten.ch/umzugsfirma/spezialtransporte/klaviertransport',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/bilder/klaviertransport.avif',
        width: 1200,
        height: 630,
        alt: 'Klaviertransport Offerten vergleichen – Online-Offerten.ch',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Klaviertransport: Kostenlose Offerten vergleichen',
    description: 'Kostenlose Offerten von geprüften Spezialisten für Klaviertransport vergleichen. Flügeltransport, Piano-Transport & mehr.',
    images: ['https://online-offerten.ch/bilder/klaviertransport.avif'],
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

export default function KlaviertransportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <KlaviertransportPageClient />
    </>
  )
}


