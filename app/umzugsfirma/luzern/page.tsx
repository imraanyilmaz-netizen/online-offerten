import type { Metadata } from 'next'
import { createStaticClient } from '@/lib/supabase/server'
import UmzugsfirmaLuzernPageClient from '@/components/pages/locations/UmzugsfirmaLuzernPageClient'

// ISR: Incremental Static Regeneration
export const revalidate = 3600 // 1 Stunde – bessere Performance (TTFB)

const city = "Luzern"
const canonicalUrl = '/umzugsfirma/luzern'

// Luzern-spezifische FAQs
const luzernFAQs = [
  {
    question: "Wie finde ich eine zuverlässige Umzugsfirma in Luzern?",
    answer: "Vergleichen Sie mehrere Offerten von geprüften Umzugsfirmen in Luzern. Achten Sie auf lokale Erfahrung, besonders mit Umzügen in der Luzerner Altstadt und den verschiedenen Quartieren. Seriöse Firmen kennen die Parkregelungen, können Halteverbotszonen organisieren und haben Erfahrung mit den typischen Herausforderungen Luzerner Umzüge."
  },
  {
    question: "Was kostet ein Umzug innerhalb von Luzern?",
    answer: "Die Kosten variieren je nach Wohnungsgrösse, Distanz, Stockwerk und Zugänglichkeit. Ein Umzug innerhalb Luzerns kostet typischerweise zwischen 620 und 3'150 CHF für eine 3.5-Zimmer-Wohnung. Umzüge in höhere Stockwerke ohne Lift oder in die Altstadt können teurer sein. Vergleichen Sie mehrere Offerten, um das beste Angebot zu finden."
  },
  {
    question: "Gibt es Besonderheiten bei Umzügen in die Luzerner Altstadt?",
    answer: "Ja, die engen Gassen, begrenzten Parkmöglichkeiten und die vielen Altstadtgebäude ohne Lift erfordern sorgfältige Planung. Professionelle Umzugsfirmen beantragen Halteverbotszonen rechtzeitig und verwenden geeignete Fahrzeuge. Viele Gebäude haben steile Treppen, was den Transport beeinflusst."
  },
  {
    question: "Wie lange im Voraus sollte ich eine Umzugsfirma in Luzern buchen?",
    answer: "Für einen reibungslosen Ablauf empfehlen wir eine Buchung 4-6 Wochen im Voraus, besonders für Umzüge in die Altstadt oder während der Hauptumzugszeit (Monatsende). Kurzfristige Buchungen sind möglich, aber die Auswahl ist dann begrenzter. Frühbucher erhalten oft bessere Konditionen."
  },
  {
    question: "Bieten Umzugsfirmen in Luzern auch Endreinigung an?",
    answer: "Ja, viele Umzugsfirmen in Luzern bieten eine professionelle Endreinigung mit Abnahmegarantie an. Diese Kombination aus Umzug und Reinigung spart Zeit und Aufwand. Die Endreinigung stellt sicher, dass Sie Ihre Wohnung besenrein und in einwandfreiem Zustand an den Vermieter übergeben können."
  },
  {
    question: "Kann ich auch einen Umzug von Luzern in eine andere Stadt organisieren?",
    answer: "Ja, viele Umzugsfirmen in Luzern bieten auch Umzüge in andere Städte und Kantone an, wie Zürich, Bern oder Basel. Die zentrale Lage Luzerns in der Zentralschweiz macht solche Umzüge logistisch einfach. Vergleichen Sie mehrere Offerten, um das beste Angebot für Ihren Umzug zu finden."
  }
]

// Service Schema - Enhanced for rich results & clarification as comparison platform
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Umzugsfirma-Vergleich",
  "name": "Umzugsfirma Luzern – Offerten vergleichen",
  "description": "Vergleichen Sie geprüfte Umzugsfirmen und Umzugsunternehmen in Luzern. Kostenlos bis zu 5 Offerten anfordern, Preise vergleichen und bis zu 40% sparen. Online-Offerten.ch ist Ihre Vergleichsplattform für Umzugsdienstleistungen in der Zentralschweiz.",
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
    "name": "Kanton Luzern",
    "containedInPlace": {
      "@type": "Country",
      "name": "Switzerland",
      "alternateName": "Schweiz"
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Umzugsdienstleistungen in Luzern",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Privatumzug Luzern" }
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Geschäftsumzug Luzern" }
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Internationale Umzüge ab Luzern" }
      },
      {
        "@type": "Offer",
        "itemOffered": { "@type": "Service", "name": "Spezialtransporte Luzern" }
      }
    ]
  },
  "offers": {
    "@type": "Offer",
    "url": `https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&city=${city}`,
    "price": "0",
    "priceCurrency": "CHF",
    "name": "Kostenlose Umzugsofferten vergleichen",
    "description": "Bis zu 5 kostenlose und unverbindliche Offerten von geprüften Umzugsfirmen in Luzern erhalten"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Privatpersonen und Unternehmen, die in Luzern umziehen möchten"
  }
}

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": luzernFAQs.map(faq => ({
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
  "name": "Umzugsfirma in Luzern : Kostenlose Offerten einholen & vergleichen",
  "description": "Vergleichsportal für Umzugsfirmen in Luzern und der Zentralschweiz. Kostenlos Offerten von geprüften Umzugsunternehmen anfordern und Umzugskosten sparen.",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "inLanguage": "de-CH",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch"
  },
  "about": {
    "@type": "Thing",
    "name": "Umzugsfirmen in Luzern vergleichen"
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
          "name": "Umzugsfirma Luzern",
          "item": `https://online-offerten.ch${canonicalUrl}`
        }
      ]
    },
    serviceSchema,
    faqSchema
  ]
}

// Fetch partners for Luzern - Only Umzug companies
async function getLuzernPartners() {
  try {
    const supabase = createStaticClient()
    
    const { data: umzugPartners, error } = await supabase
      .from('partners')
      .select('id, company_name, slug, address_city, address_zip, main_categories, service_regions, average_rating, review_count, logo_url, message')
      .eq('status', 'active')
      .not('company_name', 'is', null)
      .contains('main_categories', ['umzug'])
    
    if (error) {
      console.error('Error fetching Luzern partners:', error)
      return []
    }
    
    if (!umzugPartners || umzugPartners.length === 0) {
      return []
    }
    
    // Filter for Luzern region
    const luzernPartners = umzugPartners.filter((partner: any) => {
      const partnerCity = partner.address_city?.toLowerCase() || ''
      const cityMatch = partnerCity.includes('luzern') || partnerCity.includes('lucerne') || partnerCity.includes('kriens') || partnerCity.includes('emmen') || partnerCity.includes('horw') || partnerCity.includes('ebikon')
      
      let regionMatch = false
      if (partner.service_regions && Array.isArray(partner.service_regions)) {
        const regions = partner.service_regions.map((r: any) => 
          typeof r === 'string' ? r.trim().toLowerCase() : String(r).trim().toLowerCase()
        )
        regionMatch = regions.some((r: string) => {
          if (r === 'luzern' || r === 'lucerne' || r === 'lu') return true
          if (r.includes('luzern') || r.includes('lucerne')) return true
          if (r === 'kanton luzern') return true
          if (r === 'zentralschweiz' || r.includes('zentralschweiz')) return true
          if (r === 'deutschschweiz' || r.includes('deutschschweiz')) return true
          return false
        })
      }
      
      return cityMatch || regionMatch
    })
    
    // Sort by rating
    luzernPartners.sort((a: any, b: any) => {
      const ratingA = a.average_rating || 0
      const ratingB = b.average_rating || 0
      if (ratingB !== ratingA) return ratingB - ratingA
      return (b.review_count || 0) - (a.review_count || 0)
    })
    
    return luzernPartners.slice(0, 12)
  } catch (error) {
    console.error('Error in getLuzernPartners:', error)
    return []
  }
}

export const metadata: Metadata = {
  title: 'Umzugsfirma in Luzern : Kostenlose Offerten einholen & vergleichen',
  description: 'Umzugsfirma in Luzern gesucht? ✓ Geprüfte Umzugsunternehmen in der Zentralschweiz vergleichen ✓ Kostenlos bis zu 5 Offerten anfordern ✓ Bis zu 40% sparen bei Privat- & Geschäftsumzug im Kanton Luzern.',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/luzern',
  },
  openGraph: {
    title: 'Umzugsfirma Luzern: Geprüfte Umzugsunternehmen vergleichen & bis zu 40% sparen',
    description: 'Vergleichen Sie jetzt Umzugsfirmen in Luzern. Kostenlos bis zu 5 Offerten anfordern, Umzugskosten berechnen und den besten Anbieter für Ihren Umzug im Kanton Luzern finden.',
    url: 'https://online-offerten.ch/umzugsfirma/luzern',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-luzern-kostenlose-offerte.webp',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma Luzern – Umzugsunternehmen vergleichen auf Online-Offerten.ch',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Luzern: Top Umzugsunternehmen vergleichen & sparen',
    description: 'Geprüfte Umzugsfirmen in Luzern vergleichen ✓ Kostenlos Offerten anfordern ✓ Bis zu 40% sparen beim Umzug im Kanton Luzern.',
    images: ['https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-luzern-kostenlose-offerte.webp'],
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

export default async function UmzugsfirmaLuzernPage() {
  const luzernPartners = await getLuzernPartners()
  
  // ItemList Schema for partner listings - helps Google show rich results
  const itemListSchema = luzernPartners && luzernPartners.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Geprüfte Umzugsfirmen in Luzern",
    "description": "Liste von geprüften Umzugsunternehmen im Kanton Luzern auf Online-Offerten.ch",
    "numberOfItems": luzernPartners.length,
    "itemListElement": luzernPartners.map((partner: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "LocalBusiness",
        "name": partner.company_name,
        "url": `https://online-offerten.ch/partner/${partner.slug || partner.id}`,
        ...(partner.logo_url && { "image": partner.logo_url }),
        "address": {
          "@type": "PostalAddress",
          "addressLocality": partner.address_city || "Luzern",
          "addressRegion": "LU",
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
      <UmzugsfirmaLuzernPageClient luzernPartners={luzernPartners} />
    </>
  )
}


