import type { Metadata } from 'next'
import { createStaticClient } from '@/lib/supabase/server'
import UmzugsfirmaBernPageClient from '@/components/pages/locations/UmzugsfirmaBernPageClient'

// ISR: Incremental Static Regeneration
export const revalidate = 3600 // 1 Stunde – bessere Performance (TTFB)

const city = "Bern"
const canonicalUrl = '/umzugsfirma/bern'

// Bern-spezifische FAQs (aus Client Component übernommen für SSR Schema)
const bernFAQs = [
  {
    question: "Wie finde ich eine zuverlässige Umzugsfirma in Bern?",
    answer: "Am besten vergleichen Sie mehrere geprüfte Umzugsfirmen aus Bern. Achten Sie auf: Lokale Erfahrung: Kenntnisse mit Berner Altstadtgassen und Parkregelungen. Bewertungen: Echte Kundenfeedback auf unabhängigen Plattformen. Versicherung: Betriebshaftpflicht und Transportversicherung gemäss OR. Transparenz: Detaillierte Offerten ohne versteckte Kosten. Zertifizierungen: Mitgliedschaft bei Schweizer Umzugsverbänden."
  },
  {
    question: "Brauche ich eine Parkbewilligung für meinen Umzug in Bern?",
    answer: "Ja, in den meisten Fällen. In der Berner Altstadt und in vielen Quartieren benötigen Umzugsfirmen eine Halteverbotszone. Professionelle Umzugsunternehmen beantragen diese bei der Stadtpolizei Bern rechtzeitig (meist 1-2 Wochen im Voraus). Die Kosten hierfür sind meist in der Offerte enthalten und garantieren einen reservierten Parkplatz direkt vor Ihrer Haustür."
  },
  {
    question: "Wie lange im Voraus sollte ich eine Umzugsfirma in Bern buchen?",
    answer: "Für einen reibungslosen Ablauf empfehlen wir eine Buchung 4-6 Wochen im Voraus, besonders: Für Umzüge in der Altstadt (begrenzte Halteverbotszonen), an Monatsenden (Hauptumzugszeit), an Wochenenden (höhere Nachfrage), während der Sommermonate (Juni-September). Bei kurzfristigen Umzügen (unter 2 Wochen) ist die Auswahl an verfügbaren Terminen und Firmen eingeschränkter."
  },
  {
    question: "Welche Besonderheiten gibt es bei Umzügen in der Berner Altstadt?",
    answer: "Umzüge in der Berner Altstadt (UNESCO-Weltkulturerbe) erfordern spezielle Planung: Enge Gassen: Spezielle kleinere Umzugswagen erforderlich. Steile Treppen: Viele Altbauhäuser ohne Aufzug. Eingeschränkte Parkmöglichkeiten: Halteverbotszonen obligatorisch. Lärmbeschränkungen: Bestimmte Uhrzeiten für laute Arbeiten. Historische Gebäude: Besondere Sorgfalt beim Schutz von Treppen und Türen. Erfahrene Berner Umzugsfirmen kennen diese Herausforderungen und planen entsprechend."
  },
  {
    question: "Was ist im Full Service Umzug in Bern enthalten?",
    answer: "Ein Full Service Umzug in Bern umfasst typischerweise: Vor-Ort-Besichtigung: Kostenlose Einschätzung und Beratung. Professionelle Verpackung: Hochwertiges Material und fachgerechte Packtechnik. Schonender Transport: Geschulte Teams und geeignete Fahrzeuge. Möbelmontage/Demontage: Fachgerechte Handhabung aller Möbel. Auf- und Abbau: Betten, Schränke, Tische etc. Optionale Zusatzleistungen: Umzugsreinigung mit Abnahmegarantie, Entsorgung von Verpackungsmaterial, Zwischenlagerung in sicheren Lagern, Spezialtransporte (Klavier, Tresor, Kunst). Alle Leistungen werden in einem transparenten Fixpreis angeboten, ohne versteckte Kosten."
  }
]

// Service Schema - Enhanced
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Umzugsfirma-Vergleich",
  "name": "Umzugsfirma Bern – Offerten vergleichen",
  "description": "Vergleichen Sie geprüfte Umzugsfirmen und Umzugsunternehmen in Bern. Kostenlos bis zu 5 Offerten anfordern, Preise vergleichen und bis zu 40% sparen. Online-Offerten.ch ist Ihre Vergleichsplattform für Umzugsdienstleistungen in der Bundesstadt und im Kanton Bern.",
  "category": "Umzugsservice / Umzugsvermittlung",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "provider": {
    "@type": "Organization",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch",
    "logo": "https://online-offerten.ch/image/logo-icon.webp",
    "description": "Vergleichsplattform für Umzugsfirmen, Reinigungsfirmen und Malerfirmen in der Schweiz. Wir vermitteln kostenlose Offerten von geprüften Anbietern.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["German"]
    }
  },
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Kanton Bern",
    "containedInPlace": {
      "@type": "Country",
      "name": "Switzerland",
      "alternateName": "Schweiz"
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Umzugsdienstleistungen in Bern",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Privatumzug Bern" }
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Geschäftsumzug Bern" }
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Internationale Umzüge ab Bern" }
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Spezialtransporte Bern" }
      }
    ]
  },
  "offers": {
    "@type": "Offer",
    "url": `https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&city=${city}`,
    "price": "0",
    "priceCurrency": "CHF",
    "name": "Kostenlose Umzugsofferten vergleichen",
    "description": "Bis zu 5 kostenlose und unverbindliche Offerten von geprüften Umzugsfirmen in Bern erhalten"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Privatpersonen und Unternehmen, die in Bern umziehen möchten"
  }
}

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": bernFAQs.map(faq => ({
    "@type": "Question",
    "name": String(faq.question),
    "acceptedAnswer": {
      "@type": "Answer",
      "text": String(faq.answer)
    }
  }))
}

// WebPage Schema
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Umzugsfirma Bern – Zügelfirmen vergleichen & beste Offerte finden",
  "description": "Vergleichsportal für Umzugsfirmen in Bern und im Kanton Bern. Kostenlos Offerten von geprüften Umzugsunternehmen anfordern und Umzugskosten sparen.",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "inLanguage": "de-CH",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch"
  },
  "about": {
    "@type": "Thing",
    "name": "Umzugsfirmen in Bern vergleichen"
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".hero-description"]
  },
  "lastReviewed": new Date().toISOString().split('T')[0]
}

// Combined Schema
const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [
    webPageSchema,
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Startseite",
          "item": "https://online-offerten.ch/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Umzugsfirma in der Nähe",
          "item": "https://online-offerten.ch/umzugsfirma"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Umzugsfirma Bern",
          "item": `https://online-offerten.ch${canonicalUrl}`
        }
      ]
    },
    serviceSchema,
    faqSchema
  ]
}

// Fetch partners for Bern
async function getBernPartners() {
  try {
    const supabase = createStaticClient()
    
    const { data: umzugPartners, error } = await supabase
      .from('partners')
      .select('id, company_name, slug, address_city, address_zip, main_categories, service_regions, average_rating, review_count, logo_url, message')
      .eq('status', 'active')
      .not('company_name', 'is', null)
      .contains('main_categories', ['umzug'])
    
    if (error) {
      console.error('Error fetching Bern partners:', error)
      return []
    }
    
    if (!umzugPartners || umzugPartners.length === 0) {
      return []
    }
    
    // Filter for Bern region
    const bernPartners = umzugPartners.filter((partner: any) => {
      const partnerCity = partner.address_city?.toLowerCase() || ''
      const cityMatch = partnerCity.includes('bern') || partnerCity.includes('thun') || partnerCity.includes('biel') || partnerCity.includes('burgdorf') || partnerCity.includes('langenthal') || partnerCity.includes('köniz') || partnerCity.includes('ostermundigen') || partnerCity.includes('münsingen')
      
      let regionMatch = false
      if (partner.service_regions && Array.isArray(partner.service_regions)) {
        const regions = partner.service_regions.map((r: any) => 
          typeof r === 'string' ? r.trim().toLowerCase() : String(r).trim().toLowerCase()
        )
        regionMatch = regions.some((r: string) => {
          if (r === 'bern' || r === 'be') return true
          if (r.includes('bern')) return true
          if (r === 'kanton bern') return true
          if (r === 'deutschschweiz' || r.includes('deutschschweiz')) return true
          return false
        })
      }
      
      return cityMatch || regionMatch
    })
    
    // Sort by rating
    bernPartners.sort((a: any, b: any) => {
      const ratingA = a.average_rating || 0
      const ratingB = b.average_rating || 0
      if (ratingB !== ratingA) return ratingB - ratingA
      return (b.review_count || 0) - (a.review_count || 0)
    })
    
    return bernPartners.slice(0, 12)
  } catch (error) {
    console.error('Error in getBernPartners:', error)
    return []
  }
}

export const metadata: Metadata = {
  title: 'Umzugsfirma Bern – Zügelfirmen vergleichen & beste Offerte finden',
  description: '✓ Umzugsfirma in Bern gesucht? Vergleichen Sie geprüfte Zügelfirmen & Umzugsunternehmen im Kanton Bern. Kostenlos bis zu 5 Offerten anfordern – für Altstadt, Köniz, Ostermundigen & Umgebung. Bis zu 40% sparen!',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/bern',
    languages: {
      'de-CH': 'https://online-offerten.ch/umzugsfirma/bern',
      'x-default': 'https://online-offerten.ch/umzugsfirma/bern',
    },
  },
  openGraph: {
    title: 'Umzugsfirma Bern: Zügelfirmen vergleichen & bis zu 40% sparen',
    description: 'Vergleichen Sie jetzt Umzugsfirmen in Bern. Kostenlos bis zu 5 Offerten anfordern und den besten Anbieter für Ihren Umzug in der Bundesstadt finden.',
    url: 'https://online-offerten.ch/umzugsfirma/bern',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-bern-kostenlose-offerte.webp',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Bern – Zügelfirmen vergleichen auf Online-Offerten.ch',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Bern: Zügelfirmen vergleichen & beste Offerte finden',
    description: 'Geprüfte Umzugsfirmen in Bern vergleichen ✓ Kostenlos Offerten anfordern ✓ Bis zu 40% sparen beim Umzug im Kanton Bern.',
    images: ['https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-bern-kostenlose-offerte.webp'],
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

export default async function UmzugsfirmaBernPage() {
  const bernPartners = await getBernPartners()
  
  // ItemList Schema for partner listings
  const itemListSchema = bernPartners && bernPartners.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Geprüfte Umzugsfirmen in Bern",
    "description": "Liste von geprüften Umzugsunternehmen im Kanton Bern auf Online-Offerten.ch",
    "numberOfItems": bernPartners.length,
    "itemListElement": bernPartners.map((partner: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "LocalBusiness",
        "name": partner.company_name,
        "url": `https://online-offerten.ch/partner/${partner.slug || partner.id}`,
        ...(partner.logo_url && { "image": partner.logo_url }),
        "address": {
          "@type": "PostalAddress",
          "addressLocality": partner.address_city || "Bern",
          "addressRegion": "BE",
          "addressCountry": "CH"
        },
        ...(partner.review_count > 0 && partner.average_rating > 0 && {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": partner.average_rating.toString(),
            "reviewCount": partner.review_count.toString(),
            "bestRating": "5",
            "worstRating": "1"
          }
        }),
        ...(partner.message && {
          "description": partner.message.substring(0, 160)
        })
      }
    }))
  } : null

  return (
    <>
      {/* Schema.org Structured Data - Server-side rendered for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(combinedSchema)
        }}
      />
      {/* ItemList Schema for Partner Listings - Rich Results */}
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(itemListSchema)
          }}
        />
      )}
      <UmzugsfirmaBernPageClient bernPartners={bernPartners} />
    </>
  )
}


