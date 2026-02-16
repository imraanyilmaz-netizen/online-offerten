import type { Metadata } from 'next'
import { createStaticClient } from '@/lib/supabase/server'
import UmzugsfirmaLausannePageClient from '@/components/pages/locations/UmzugsfirmaLausannePageClient'

export const revalidate = 3600 // 1 Stunde – bessere Performance (TTFB)

const city = "Lausanne"
const canonicalUrl = '/umzugsfirma/lausanne'

const lausanneFAQs = [
  {
    question: "Wie wähle ich eine seriöse Umzugsfirma in Lausanne?",
    answer: "Vergleichen Sie auf Online-Offerten.ch mehrere geprüfte Umzugsfirmen in Lausanne. Achten Sie auf: Lokale Erfahrung in den steilen Quartieren von Lausanne. Gute Bewertungen auf unabhängigen Plattformen. Betriebshaftpflicht und Transportversicherung. Transparente Preisgestaltung ohne versteckte Kosten."
  },
  {
    question: "Was kostet ein Umzug innerhalb von Lausanne?",
    answer: "Für eine 3.5-Zimmer-Wohnung rechnen Sie mit CHF 1'090 bis CHF 1'260. Die Kosten variieren je nach Stockwerk, Liftverfügbarkeit und Zusatzleistungen. Die Hanglage vieler Quartiere in Lausanne kann den Aufwand erhöhen. Vergleichen Sie mehrere Offerten für den besten Preis."
  },
  {
    question: "Gibt es besondere Herausforderungen beim Umzug in Lausanne?",
    answer: "Ja, Lausanne hat aufgrund seiner Hanglage am Genfersee einige Besonderheiten: Steile Strassen in vielen Quartieren. Enge Zufahrten in der historischen Altstadt. Parkregelungen und Halteverbotszonen. Treppen und fehlende Lifte in Altbauten. Erfahrene Lausanner Umzugsfirmen kennen diese Herausforderungen."
  },
  {
    question: "Wie lange im Voraus sollte ich meinen Umzug in Lausanne planen?",
    answer: "Planen Sie mindestens 4-6 Wochen im Voraus, besonders: Zum Monatsende (Hauptumzugszeit). In den Sommermonaten (Juni-September). Bei Umzügen in der Altstadt. Für kurzfristige Umzüge ist die Auswahl eingeschränkter, aber viele unserer Partner in Lausanne bieten auch Express-Services an."
  },
  {
    question: "Bieten Umzugsfirmen in Lausanne auch Reinigungsservices?",
    answer: "Ja, viele unserer Partnerfirmen in Lausanne bieten neben dem Umzug auch Reinigungsservices an: Umzugsreinigung mit Abnahmegarantie. Professionelle Endreinigung nach Schweizer Standard. Fensterreinigung und Grundreinigung. Sie können beide Leistungen über Online-Offerten.ch vergleichen und kombinieren."
  }
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Umzugsfirma-Vergleich",
  "name": "Umzugsfirma Lausanne – Offerten vergleichen",
  "description": "Vergleichen Sie geprüfte Umzugsfirmen in Lausanne am Genfersee. Kostenlos bis zu 5 Offerten anfordern und bis zu 40% sparen.",
  "category": "Umzugsservice / Umzugsvermittlung",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "provider": {
    "@type": "Organization",
    "name": "Online-Offerten.ch",
    "url": "https://online-offerten.ch",
    "logo": "https://online-offerten.ch/image/logo-icon.webp",
    "description": "Vergleichsplattform für Umzugsfirmen, Reinigungsfirmen und Malerfirmen in der Schweiz.",
    "contactPoint": { "@type": "ContactPoint", "contactType": "customer service", "availableLanguage": ["German", "French"] }
  },
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Kanton Waadt",
    "containedInPlace": { "@type": "Country", "name": "Switzerland", "alternateName": "Schweiz" }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Umzugsdienstleistungen in Lausanne",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Privatumzug Lausanne" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Geschäftsumzug Lausanne" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Internationale Umzüge ab Lausanne" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Spezialtransporte Lausanne" } }
    ]
  },
  "offers": {
    "@type": "Offer",
    "url": `https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&city=${city}`,
    "price": "0", "priceCurrency": "CHF",
    "name": "Kostenlose Umzugsofferten vergleichen",
    "description": "Bis zu 5 kostenlose Offerten von geprüften Umzugsfirmen in Lausanne erhalten"
  },
  "audience": { "@type": "Audience", "audienceType": "Privatpersonen und Unternehmen in Lausanne" }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": lausanneFAQs.map(faq => ({
    "@type": "Question", "name": String(faq.question),
    "acceptedAnswer": { "@type": "Answer", "text": String(faq.answer) }
  }))
}

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Umzugsfirma Lausanne – Umzugsangebote am Genfersee vergleichen",
  "description": "Vergleichsportal für Umzugsfirmen in Lausanne. Kostenlos Offerten anfordern und Umzugskosten sparen.",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "inLanguage": "de-CH",
  "isPartOf": { "@type": "WebSite", "name": "Online-Offerten.ch", "url": "https://online-offerten.ch" },
  "about": { "@type": "Thing", "name": "Umzugsfirmen in Lausanne vergleichen" },
  "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".hero-description"] },
  "lastReviewed": new Date().toISOString().split('T')[0]
}

const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [
    webPageSchema,
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://online-offerten.ch/" },
        { "@type": "ListItem", "position": 2, "name": "Umzugsfirma in der Nähe", "item": "https://online-offerten.ch/umzugsfirma" },
        { "@type": "ListItem", "position": 3, "name": "Umzugsfirma Lausanne", "item": `https://online-offerten.ch${canonicalUrl}` }
      ]
    },
    serviceSchema,
    faqSchema
  ]
}

async function getLausannePartners() {
  try {
    const supabase = createStaticClient()
    const { data: umzugPartners, error } = await supabase
      .from('partners')
      .select('id, company_name, slug, address_city, address_zip, main_categories, service_regions, average_rating, review_count, logo_url, message')
      .eq('status', 'active').not('company_name', 'is', null).contains('main_categories', ['umzug'])
    if (error || !umzugPartners || umzugPartners.length === 0) return []
    const filtered = umzugPartners.filter((partner: any) => {
      const pc = partner.address_city?.toLowerCase() || ''
      const cityMatch = pc.includes('lausanne') || pc.includes('renens') || pc.includes('morges') || pc.includes('vevey') || pc.includes('montreux') || pc.includes('pully')
      let regionMatch = false
      if (partner.service_regions && Array.isArray(partner.service_regions)) {
        const regions = partner.service_regions.map((r: any) => typeof r === 'string' ? r.trim().toLowerCase() : String(r).trim().toLowerCase())
        regionMatch = regions.some((r: string) => r === 'lausanne' || r === 'vd' || r.includes('waadt') || r.includes('vaud') || r === 'romandie' || r.includes('westschweiz'))
      }
      return cityMatch || regionMatch
    })
    filtered.sort((a: any, b: any) => { const rA = a.average_rating || 0; const rB = b.average_rating || 0; if (rB !== rA) return rB - rA; return (b.review_count || 0) - (a.review_count || 0) })
    return filtered.slice(0, 12)
  } catch (error) { console.error('Error in getLausannePartners:', error); return [] }
}

export const metadata: Metadata = {
  title: 'Umzugsfirma Lausanne – Umzugsangebote am Genfersee vergleichen',
  description: '✓ Umzugsfirma in Lausanne gesucht? Vergleichen Sie geprüfte Umzugsunternehmen am Genfersee. Kostenlos bis zu 5 Offerten anfordern und bis zu 40% sparen!',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/lausanne',
  },
  openGraph: {
    title: 'Umzugsfirma Lausanne: Umzugsangebote am Genfersee vergleichen & sparen',
    description: 'Vergleichen Sie jetzt Umzugsfirmen in Lausanne. Kostenlos bis zu 5 Offerten anfordern.',
    url: 'https://online-offerten.ch/umzugsfirma/lausanne',
    siteName: 'Online-Offerten.ch',
    images: [{ url: 'https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-lausanne-kostenlose-offerte.webp', width: 1200, height: 630, alt: 'Umzugsfirma Lausanne – Offerten vergleichen' }],
    locale: 'de_CH', type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma Lausanne: Umzugsangebote am Genfersee vergleichen',
    description: 'Geprüfte Umzugsfirmen in Lausanne vergleichen ✓ Kostenlos Offerten anfordern ✓ Bis zu 40% sparen.',
    images: ['https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-lausanne-kostenlose-offerte.webp'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
}

export default async function UmzugsfirmaLausannePage() {
  const lausannePartners = await getLausannePartners()
  const itemListSchema = lausannePartners && lausannePartners.length > 0 ? {
    "@context": "https://schema.org", "@type": "ItemList",
    "name": "Geprüfte Umzugsfirmen in Lausanne",
    "description": "Liste von geprüften Umzugsunternehmen in Lausanne auf Online-Offerten.ch",
    "numberOfItems": lausannePartners.length,
    "itemListElement": lausannePartners.map((partner: any, index: number) => ({
      "@type": "ListItem", "position": index + 1,
      "item": {
        "@type": "LocalBusiness", "name": partner.company_name,
        "url": `https://online-offerten.ch/partner/${partner.slug || partner.id}`,
        ...(partner.logo_url && { "image": partner.logo_url }),
        "address": { "@type": "PostalAddress", "addressLocality": partner.address_city || "Lausanne", "addressRegion": "VD", "addressCountry": "CH" },
        ...(partner.review_count > 0 && partner.average_rating > 0 && { "aggregateRating": { "@type": "AggregateRating", "ratingValue": partner.average_rating.toString(), "reviewCount": partner.review_count.toString(), "bestRating": "5", "worstRating": "1" } }),
        ...(partner.message && { "description": partner.message.substring(0, 160) })
      }
    }))
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }} />
      {itemListSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />}
      <UmzugsfirmaLausannePageClient />
    </>
  )
}


