import type { Metadata } from 'next'
import InternationaleUmzugPageClient from '@/components/pages/services/InternationaleUmzugPageClient'

const canonicalUrl = '/umzugsfirma/internationale-umzuege'

// Service Schema - Enhanced
const serviceSchema = {
  "@type": "Service",
  "serviceType": "Internationale Umzüge",
  "name": "Internationale Umzüge Schweiz – Offerten vergleichen",
  "description": "Vergleichen Sie kostenlos Offerten von geprüften Umzugsfirmen für Ihren internationalen Umzug ab der Schweiz. Umzüge nach Deutschland, Österreich, Frankreich & ganz Europa – sicher, professionell und bis zu 40% günstiger.",
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
    "name": "Internationale Umzugs-Dienstleistungen",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Umzug Schweiz–Deutschland" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Umzug Schweiz–Österreich" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Umzug Schweiz–Frankreich" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Umzug Schweiz–Italien" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Umzug Schweiz–Spanien" } }
    ]
  },
  "offers": {
    "@type": "Offer",
    "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=international",
    "price": "0",
    "priceCurrency": "CHF",
    "name": "Kostenlose Offerten für internationale Umzüge vergleichen",
    "description": "Bis zu 5 kostenlose und unverbindliche Offerten von geprüften internationalen Umzugsfirmen erhalten"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Privatpersonen und Unternehmen, die ins Ausland umziehen"
  }
}

// WebPage Schema
const webPageSchema = {
  "@type": "WebPage",
  "name": "Internationale Umzüge Schweiz – Offerten vergleichen",
  "description": "Vergleichsportal für internationale Umzüge ab der Schweiz. Kostenlos Offerten von geprüften Umzugsunternehmen für Auslandsumzüge anfordern.",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "inLanguage": "de-CH",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch"
  },
  "about": { "@type": "Thing", "name": "Internationale Umzüge Offerten vergleichen" },
  "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".hero-description"] }
}

// BreadcrumbList Schema
const breadcrumbSchema = {
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://online-offerten.ch/" },
    { "@type": "ListItem", "position": 2, "name": "Umzugsfirma", "item": "https://online-offerten.ch/umzugsfirma" },
    { "@type": "ListItem", "position": 3, "name": "Internationale Umzüge", "item": `https://online-offerten.ch${canonicalUrl}` }
  ]
}

// FAQPage Schema
const faqSchema = {
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was kostet ein internationaler Umzug von der Schweiz aus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Kosten variieren stark. Ein Umzug mit einer 2-Zimmer-Wohnung nach Süddeutschland kann bei ca. 2.500 CHF beginnen, während derselbe Umzug nach Spanien oder Portugal eher 5.000–8.000 CHF kostet. Entscheidend sind Volumen, Distanz und Service-Level."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lange dauert ein internationaler Umzug?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die reine Transportzeit innerhalb Europas beträgt je nach Destination 1–5 Tage. Inklusive Packen, Zollabwicklung und Ausladen sollten Sie mit einer Gesamtdauer von 3–10 Tagen rechnen. Übersee-Umzüge per Schiff dauern mehrere Wochen."
      }
    },
    {
      "@type": "Question",
      "name": "Muss ich mein Umzugsgut verzollen (Stichwort: Übersiedlungsgut)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, bei einem Umzug von der Schweiz in ein EU-Land muss das Umzugsgut als 'Übersiedlungsgut' deklariert werden. Wenn Sie Ihren Wohnsitz nachweislich verlegen und die Güter seit mindestens 6 Monaten in Ihrem Besitz sind, ist die Einfuhr zoll- und mehrwertsteuerfrei."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Dokumente sind für die Zollabwicklung nötig?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typischerweise benötigen Sie: Eine Kopie Ihres Passes, eine Abmeldebestätigung aus der Schweiz, eine Anmeldebestätigung im neuen Land (oder Arbeitsvertrag/Mietvertrag) sowie eine detaillierte Inventarliste Ihres Umzugsguts."
      }
    },
    {
      "@type": "Question",
      "name": "Kann ich die Endreinigung meiner alten Wohnung in der Schweiz dazubuchen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, viele internationale Speditionen arbeiten mit lokalen Reinigungsinstituten zusammen oder bieten diesen Service selbst an. Ein Kombi-Paket für Umzug und Reinigung mit Abnahmegarantie ist die bequemste Lösung."
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
  title: 'Internationale Umzüge: Kostenlose Offerten vergleichen',
  description: 'Internationale Umzüge: Vergleichen Sie kostenlos mehrere geprüfte Umzugsfirmen und sparen Sie bis zu 40%. Offerten für Umzüge nach Deutschland, Österreich, Frankreich & ganz Europa.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/internationale-umzuege',
    languages: {
      'de-CH': 'https://online-offerten.ch/umzugsfirma/internationale-umzuege',
      'x-default': 'https://online-offerten.ch/umzugsfirma/internationale-umzuege',
    },
  },
  openGraph: {
    title: 'Internationale Umzüge: Kostenlose Offerten vergleichen',
    description: 'Internationale Umzüge: Vergleichen Sie kostenlos mehrere geprüfte Umzugsfirmen und sparen Sie bis zu 40%. Offerten für Umzüge nach Deutschland, Österreich, Frankreich & ganz Europa.',
    url: 'https://online-offerten.ch/umzugsfirma/internationale-umzuege',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzugsservice-Schweiz/lnternatIonale-umzuege.png',
        width: 1200,
        height: 630,
        alt: 'Internationale Umzüge Offerten vergleichen – Online-Offerten.ch',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Internationale Umzüge: Kostenlose Offerten vergleichen',
    description: 'Internationale Umzüge: Vergleichen Sie kostenlos mehrere geprüfte Umzugsfirmen und sparen Sie bis zu 40%.',
    images: ['https://online-offerten.ch/image/umzugsservice-Schweiz/lnternatIonale-umzuege.png'],
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

export default function InternationaleUmzugPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <InternationaleUmzugPageClient />
    </>
  )
}


