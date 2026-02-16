import type { Metadata } from 'next'
import { createStaticClient } from '@/lib/supabase/server'
import UmzugsfirmaLuganoPageClient from '@/components/pages/locations/UmzugsfirmaLuganoPageClient'

export const revalidate = 3600 // 1 Stunde – bessere Performance (TTFB)

const city = "Lugano"
const canonicalUrl = '/umzugsfirma/lugano'

const luganoFAQs = [
  {
    question: "Wie finde ich eine erfahrene Umzugsfirma im Tessin?",
    answer: "Über Online-Offerten.ch vergleichen Sie geprüfte Umzugsfirmen in Lugano und im Tessin. Achten Sie auf: Erfahrung mit Umzügen in der hügeligen Tessiner Landschaft. Italienisch- und deutschsprachige Teams. Versicherungsschutz und Referenzen. Transparente Preisgestaltung."
  },
  {
    question: "Was kostet ein Umzug innerhalb von Lugano?",
    answer: "Für eine 3.5-Zimmer-Wohnung rechnen Sie mit CHF 1'070 bis CHF 1'240. Die Kosten hängen von Stockwerk, Liftverfügbarkeit und Zusatzleistungen ab. In Lugano können Hanglagen und enge Strassen den Aufwand beeinflussen."
  },
  {
    question: "Welche Besonderheiten gibt es bei Umzügen im Tessin?",
    answer: "Das Tessin hat einige Besonderheiten für Umzüge: Hügelige Topografie und enge Bergstrassen. Mediterrane Bauweise mit oft engen Treppenhäusern. Grenznahe Lage zu Italien (internationale Umzüge). Zweisprachigkeit (Italienisch/Deutsch). Lokale Umzugsfirmen in Lugano kennen diese Gegebenheiten bestens."
  },
  {
    question: "Kann ich einen Umzug von der Deutschschweiz nach Lugano organisieren?",
    answer: "Ja, viele unserer Partnerfirmen bieten Langstreckenumzüge von der Deutschschweiz nach Lugano an. Durch den Gotthard-Tunnel ist die Verbindung gut. Planen Sie für solche Umzüge etwas mehr Vorlaufzeit ein und vergleichen Sie die Offerten, da die Distanzkosten variieren können."
  },
  {
    question: "Bieten Umzugsfirmen in Lugano auch Lagerungsmöglichkeiten?",
    answer: "Ja, viele unserer Partner in Lugano bieten sichere Möbellagerung an: Klimatisierte Lagerhallen für empfindliche Gegenstände. Kurz- und Langzeitlagerung. Flexible Vertragslaufzeiten. Versicherter Lagerbestand. Ideal für Zwischenlösungen bei Umzügen oder Renovierungen."
  }
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Umzugsfirma-Vergleich",
  "name": "Umzugsfirma Lugano – Offerten vergleichen",
  "description": "Vergleichen Sie geprüfte Umzugsfirmen in Lugano und im Tessin. Kostenlos bis zu 5 Offerten anfordern und bis zu 40% sparen.",
  "category": "Umzugsservice / Umzugsvermittlung",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "provider": {
    "@type": "Organization", "name": "Online-Offerten.ch", "url": "https://online-offerten.ch",
    "logo": "https://online-offerten.ch/image/logo-icon.webp",
    "description": "Vergleichsplattform für Umzugsfirmen, Reinigungsfirmen und Malerfirmen in der Schweiz.",
    "contactPoint": { "@type": "ContactPoint", "contactType": "customer service", "availableLanguage": ["German", "Italian"] }
  },
  "areaServed": {
    "@type": "AdministrativeArea", "name": "Kanton Tessin",
    "containedInPlace": { "@type": "Country", "name": "Switzerland", "alternateName": "Schweiz" }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog", "name": "Umzugsdienstleistungen in Lugano",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Privatumzug Lugano" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Geschäftsumzug Lugano" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Internationale Umzüge ab Lugano" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Spezialtransporte Tessin" } }
    ]
  },
  "offers": {
    "@type": "Offer", "url": `https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&city=${city}`,
    "price": "0", "priceCurrency": "CHF", "name": "Kostenlose Umzugsofferten vergleichen",
    "description": "Bis zu 5 kostenlose Offerten von geprüften Umzugsfirmen in Lugano erhalten"
  },
  "audience": { "@type": "Audience", "audienceType": "Privatpersonen und Unternehmen in Lugano und im Tessin" }
}

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": luganoFAQs.map(faq => ({ "@type": "Question", "name": String(faq.question), "acceptedAnswer": { "@type": "Answer", "text": String(faq.answer) } }))
}

const webPageSchema = {
  "@context": "https://schema.org", "@type": "WebPage",
  "name": "Umzugsfirma Lugano – Umzugsangebote im Tessin vergleichen",
  "description": "Vergleichsportal für Umzugsfirmen in Lugano und im Tessin. Kostenlos Offerten anfordern.",
  "url": `https://online-offerten.ch${canonicalUrl}`, "inLanguage": "de-CH",
  "isPartOf": { "@type": "WebSite", "name": "Online-Offerten.ch", "url": "https://online-offerten.ch" },
  "about": { "@type": "Thing", "name": "Umzugsfirmen in Lugano vergleichen" },
  "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".hero-description"] },
  "lastReviewed": new Date().toISOString().split('T')[0]
}

const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [
    webPageSchema,
    { "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://online-offerten.ch/" },
      { "@type": "ListItem", "position": 2, "name": "Umzugsfirma in der Nähe", "item": "https://online-offerten.ch/umzugsfirma" },
      { "@type": "ListItem", "position": 3, "name": "Umzugsfirma Lugano", "item": `https://online-offerten.ch${canonicalUrl}` }
    ]},
    serviceSchema, faqSchema
  ]
}

async function getLuganoPartners() {
  try {
    const supabase = createStaticClient()
    const { data: umzugPartners, error } = await supabase
      .from('partners').select('id, company_name, slug, address_city, address_zip, main_categories, service_regions, average_rating, review_count, logo_url, message')
      .eq('status', 'active').not('company_name', 'is', null).contains('main_categories', ['umzug'])
    if (error || !umzugPartners || umzugPartners.length === 0) return []
    const filtered = umzugPartners.filter((partner: any) => {
      const pc = partner.address_city?.toLowerCase() || ''
      const cityMatch = pc.includes('lugano') || pc.includes('bellinzona') || pc.includes('locarno') || pc.includes('mendrisio') || pc.includes('chiasso')
      let regionMatch = false
      if (partner.service_regions && Array.isArray(partner.service_regions)) {
        const regions = partner.service_regions.map((r: any) => typeof r === 'string' ? r.trim().toLowerCase() : String(r).trim().toLowerCase())
        regionMatch = regions.some((r: string) => r === 'lugano' || r === 'ti' || r.includes('tessin') || r.includes('ticino'))
      }
      return cityMatch || regionMatch
    })
    filtered.sort((a: any, b: any) => { const rA = a.average_rating || 0; const rB = b.average_rating || 0; if (rB !== rA) return rB - rA; return (b.review_count || 0) - (a.review_count || 0) })
    return filtered.slice(0, 12)
  } catch (error) { console.error('Error in getLuganoPartners:', error); return [] }
}

export const metadata: Metadata = {
  title: 'Umzugsfirma Lugano – Umzugsangebote im Tessin vergleichen',
  description: '✓ Umzugsfirma in Lugano gesucht? Vergleichen Sie geprüfte Umzugsunternehmen im Tessin. Kostenlos bis zu 5 Offerten anfordern und bis zu 40% sparen!',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma/lugano',
  },
  openGraph: {
    title: 'Umzugsfirma Lugano: Umzugsangebote im Tessin vergleichen & sparen',
    description: 'Vergleichen Sie jetzt Umzugsfirmen in Lugano. Kostenlos Offerten anfordern.',
    url: 'https://online-offerten.ch/umzugsfirma/lugano', siteName: 'Online-Offerten.ch',
    images: [{ url: 'https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-lugano-kostenlose-offerte.webp', width: 1200, height: 630, alt: 'Umzugsfirma Lugano – Offerten vergleichen' }],
    locale: 'de_CH', type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Umzugsfirma Lugano: Umzugsangebote im Tessin vergleichen', description: 'Geprüfte Umzugsfirmen in Lugano vergleichen ✓ Kostenlos Offerten anfordern ✓ Bis zu 40% sparen.', images: ['https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-lugano-kostenlose-offerte.webp'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
}

export default async function UmzugsfirmaLuganoPage() {
  const luganoPartners = await getLuganoPartners()
  const itemListSchema = luganoPartners && luganoPartners.length > 0 ? {
    "@context": "https://schema.org", "@type": "ItemList",
    "name": "Geprüfte Umzugsfirmen in Lugano", "numberOfItems": luganoPartners.length,
    "itemListElement": luganoPartners.map((partner: any, index: number) => ({
      "@type": "ListItem", "position": index + 1,
      "item": { "@type": "LocalBusiness", "name": partner.company_name, "url": `https://online-offerten.ch/partner/${partner.slug || partner.id}`,
        ...(partner.logo_url && { "image": partner.logo_url }),
        "address": { "@type": "PostalAddress", "addressLocality": partner.address_city || "Lugano", "addressRegion": "TI", "addressCountry": "CH" },
        ...(partner.review_count > 0 && partner.average_rating > 0 && { "aggregateRating": { "@type": "AggregateRating", "ratingValue": partner.average_rating.toString(), "reviewCount": partner.review_count.toString(), "bestRating": "5", "worstRating": "1" } }),
        ...(partner.message && { "description": partner.message.substring(0, 160) })
      }
    }))
  } : null
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }} />
      {itemListSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />}
      <UmzugsfirmaLuganoPageClient />
    </>
  )
}


