import type { Metadata } from 'next'
import { createStaticClient } from '@/lib/supabase/server'
import UmzugsfirmaGenfPageClient from '@/components/pages/locations/UmzugsfirmaGenfPageClient'

// ISR: Incremental Static Regeneration
export const revalidate = 3600 // 1 Stunde – bessere Performance (TTFB)

const city = "Genf"
const canonicalUrl = '/umzugsfirma-in-der-naehe/genf'

// Genf-spezifische FAQs
const genfFAQs = [
  {
    question: "Wie finde ich die passende Umzugsfirma in Genf?",
    answer: "Vergleichen Sie auf Online-Offerten.ch mehrere geprüfte Umzugsfirmen aus Genf. Achten Sie auf: Erfahrung mit internationalen Umzügen (Genf ist eine internationale Stadt). Kundenbewertungen und Referenzen. Transportversicherung und Betriebshaftpflicht. Transparente Offerten ohne versteckte Kosten. Zweisprachige Kommunikation (Französisch/Deutsch)."
  },
  {
    question: "Was kostet ein Umzug innerhalb von Genf?",
    answer: "Die Umzugskosten in Genf variieren je nach Wohnungsgrösse und Aufwand. Für eine 3.5-Zimmer-Wohnung rechnen Sie mit CHF 1'120 bis CHF 1'300. Faktoren wie Stockwerk, Liftverfügbarkeit und Zusatzleistungen beeinflussen den Preis. In Genf sind die Kosten aufgrund der hohen Lebenshaltungskosten tendenziell etwas höher als in anderen Schweizer Städten."
  },
  {
    question: "Gibt es Besonderheiten bei internationalen Umzügen ab Genf?",
    answer: "Ja, Genf liegt direkt an der französischen Grenze, was internationale Umzüge besonders häufig macht. Unsere Partnerfirmen sind Experten für: Zollformalitäten bei Umzügen nach Frankreich und in die EU. Grenzüberschreitende Transportdokumente. Doppelbesteuerungsabkommen und Abmeldung. Koordination mit Behörden auf beiden Seiten der Grenze."
  },
  {
    question: "Wie organisiere ich einen Umzug zwischen Genf und Frankreich?",
    answer: "Für einen Umzug zwischen Genf und Frankreich benötigen Sie eine Umzugsfirma mit Erfahrung im grenzüberschreitenden Verkehr. Wichtig sind: Rechtzeitige Planung (4-8 Wochen Vorlauf). Klärung der Zollformalitäten. Inventarliste für den Grenzübertritt. Versicherungsschutz für den internationalen Transport. Unsere Partner in Genf begleiten Sie durch den gesamten Prozess."
  },
  {
    question: "Welche Zusatzleistungen bieten Umzugsfirmen in Genf?",
    answer: "Umzugsfirmen in Genf bieten umfassende Services: Professionelle Verpackung und Demontage. Umzugsreinigung mit Abnahmegarantie. Sichere Möbellagerung in modernen Lagerräumen. Spezialtransporte für Kunst und wertvolle Gegenstände. Entsorgung und Räumung. Internationale Umzugsberatung und Zollabwicklung."
  }
]

// Service Schema - Enhanced
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Umzugsfirma-Vergleich",
  "name": "Umzugsfirma Genf – Offerten vergleichen",
  "description": "Vergleichen Sie geprüfte Umzugsfirmen in Genf. Kostenlos bis zu 5 Offerten anfordern und bis zu 40% sparen. Online-Offerten.ch ist Ihre Vergleichsplattform für Umzugsdienstleistungen in Genf und Umgebung.",
  "category": "Umzugsservice / Umzugsvermittlung",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "provider": {
    "@type": "Organization",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch",
    "logo": "https://online-offerten.ch/image/logo-icon.avif",
    "description": "Vergleichsplattform für Umzugsfirmen, Reinigungsfirmen und Malerfirmen in der Schweiz. Wir vermitteln kostenlose Offerten von geprüften Anbietern.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["German", "French"]
    }
  },
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Kanton Genf",
    "containedInPlace": {
      "@type": "Country",
      "name": "Switzerland",
      "alternateName": "Schweiz"
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Umzugsdienstleistungen in Genf",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Privatumzug Genf" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Geschäftsumzug Genf" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Internationale Umzüge ab Genf" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Spezialtransporte Genf" } }
    ]
  },
  "offers": {
    "@type": "Offer",
    "url": `https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&city=${city}`,
    "price": "0",
    "priceCurrency": "CHF",
    "name": "Kostenlose Umzugsofferten vergleichen",
    "description": "Bis zu 5 kostenlose und unverbindliche Offerten von geprüften Umzugsfirmen in Genf erhalten"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Privatpersonen und Unternehmen, die in Genf umziehen möchten"
  }
}

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": genfFAQs.map(faq => ({
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
  "name": "Umzugsfirma Genf – Professionelle Umzugsofferten vergleichen",
  "description": "Vergleichsportal für Umzugsfirmen in Genf. Kostenlos Offerten von geprüften Umzugsunternehmen anfordern und Umzugskosten sparen.",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "inLanguage": "de-CH",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch"
  },
  "about": {
    "@type": "Thing",
    "name": "Umzugsfirmen in Genf vergleichen"
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
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://online-offerten.ch/" },
        { "@type": "ListItem", "position": 2, "name": "Umzugsfirma in der Nähe", "item": "https://online-offerten.ch/umzugsfirma-in-der-naehe" },
        { "@type": "ListItem", "position": 3, "name": "Umzugsfirma Genf", "item": `https://online-offerten.ch${canonicalUrl}` }
      ]
    },
    serviceSchema,
    faqSchema
  ]
}

// Fetch partners for Genf
async function getGenfPartners() {
  try {
    const supabase = createStaticClient()
    const { data: umzugPartners, error } = await supabase
      .from('partners')
      .select('id, company_name, slug, address_city, address_zip, main_categories, service_regions, average_rating, review_count, logo_url, message')
      .eq('status', 'active')
      .not('company_name', 'is', null)
      .contains('main_categories', ['umzug'])
    
    if (error || !umzugPartners || umzugPartners.length === 0) return []
    
    const genfPartners = umzugPartners.filter((partner: any) => {
      const partnerCity = partner.address_city?.toLowerCase() || ''
      const cityMatch = partnerCity.includes('genf') || partnerCity.includes('genève') || partnerCity.includes('carouge') || partnerCity.includes('lancy') || partnerCity.includes('vernier') || partnerCity.includes('meyrin')
      
      let regionMatch = false
      if (partner.service_regions && Array.isArray(partner.service_regions)) {
        const regions = partner.service_regions.map((r: any) => typeof r === 'string' ? r.trim().toLowerCase() : String(r).trim().toLowerCase())
        regionMatch = regions.some((r: string) => r === 'genf' || r === 'ge' || r.includes('genf') || r.includes('genève') || r === 'romandie' || r.includes('westschweiz'))
      }
      return cityMatch || regionMatch
    })
    
    genfPartners.sort((a: any, b: any) => {
      const ratingA = a.average_rating || 0
      const ratingB = b.average_rating || 0
      if (ratingB !== ratingA) return ratingB - ratingA
      return (b.review_count || 0) - (a.review_count || 0)
    })
    
    return genfPartners.slice(0, 12)
  } catch (error) {
    console.error('Error in getGenfPartners:', error)
    return []
  }
}

export const metadata: Metadata = {
  title: 'Umzugsfirma Genf – Professionelle Umzugsofferten vergleichen',
  description: '✓ Umzugsfirma in Genf gesucht? Vergleichen Sie geprüfte Umzugsunternehmen in Genf. Kostenlos bis zu 5 Offerten anfordern – auch für internationale Umzüge nach Frankreich. Bis zu 40% sparen!',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/genf',
    languages: {
      'de-CH': 'https://online-offerten.ch/umzugsfirma-in-der-naehe/genf',
      'x-default': 'https://online-offerten.ch/umzugsfirma-in-der-naehe/genf',
    },
  },
  openGraph: {
    title: 'Umzugsfirma Genf: Professionelle Offerten vergleichen & bis zu 40% sparen',
    description: 'Vergleichen Sie jetzt Umzugsfirmen in Genf. Kostenlos bis zu 5 Offerten anfordern – auch für internationale Umzüge.',
    url: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/genf',
    siteName: 'Online-Offerten.ch',
    images: [{ url: 'https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-genf-offerten.webp', width: 1200, height: 630, alt: 'Umzugsfirma Genf – Offerten vergleichen auf Online-Offerten.ch' }],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Genf: Professionelle Umzugsofferten vergleichen',
    description: 'Geprüfte Umzugsfirmen in Genf vergleichen ✓ Kostenlos Offerten anfordern ✓ Bis zu 40% sparen.',
    images: ['https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-genf-offerten.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export default async function UmzugsfirmaGenfPage() {
  const genfPartners = await getGenfPartners()
  
  const itemListSchema = genfPartners && genfPartners.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Geprüfte Umzugsfirmen in Genf",
    "description": "Liste von geprüften Umzugsunternehmen in Genf auf Online-Offerten.ch",
    "numberOfItems": genfPartners.length,
    "itemListElement": genfPartners.map((partner: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "LocalBusiness",
        "name": partner.company_name,
        "url": `https://online-offerten.ch/partner/${partner.slug || partner.id}`,
        ...(partner.logo_url && { "image": partner.logo_url }),
        "address": { "@type": "PostalAddress", "addressLocality": partner.address_city || "Genf", "addressRegion": "GE", "addressCountry": "CH" },
        ...(partner.review_count > 0 && partner.average_rating > 0 && {
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": partner.average_rating.toString(), "reviewCount": partner.review_count.toString(), "bestRating": "5", "worstRating": "1" }
        }),
        ...(partner.message && { "description": partner.message.substring(0, 160) })
      }
    }))
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }} />
      {itemListSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />}
      <UmzugsfirmaGenfPageClient />
    </>
  )
}


