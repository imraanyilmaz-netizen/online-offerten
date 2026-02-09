import type { Metadata } from 'next'
import { createStaticClient } from '@/lib/supabase/server'
import UmzugsfirmaThunPageClient from '@/components/pages/locations/UmzugsfirmaThunPageClient'

export const revalidate = 3600 // 1 Stunde – bessere Performance (TTFB)

const city = "Thun"
const canonicalUrl = '/umzugsfirma-in-der-naehe/thun'

const thunFAQs = [
  {
    question: "Wie finde ich eine lokale Umzugsfirma in Thun?",
    answer: "Über Online-Offerten.ch vergleichen Sie geprüfte Umzugsfirmen in Thun und am Thunersee. Achten Sie auf: Lokale Erfahrung mit den Gegebenheiten in Thun. Ortskenntnis für enge Altstadtgassen. Bewertungen und Referenzen. Versicherungsschutz und transparente Preise."
  },
  {
    question: "Was kostet ein Umzug in Thun und Umgebung?",
    answer: "Für eine 3.5-Zimmer-Wohnung in Thun rechnen Sie mit CHF 1'075 bis CHF 1'245. Die Kosten hängen von Stockwerk, Liftverfügbarkeit, Distanz und Zusatzleistungen ab. Umzüge ins Berner Oberland können aufgrund der Bergstrassen etwas teurer sein."
  },
  {
    question: "Gibt es Besonderheiten bei Umzügen in der Thuner Altstadt?",
    answer: "Ja, die Thuner Altstadt hat einige Besonderheiten: Enge Gassen mit eingeschränkter Zufahrt für grosse Fahrzeuge. Historische Gebäude mit schmalen Treppenhäusern. Parkplatzregelungen und Halteverbotszonen. Erfahrene Umzugsfirmen in Thun kennen diese Herausforderungen und planen entsprechend."
  },
  {
    question: "Wie weit im Voraus sollte ich eine Umzugsfirma in Thun buchen?",
    answer: "Buchen Sie idealerweise 4-6 Wochen im Voraus, besonders: Zum Monatsende (Hauptumzugszeit). In der Ferienzeit (höhere Nachfrage). Für Umzüge in die Altstadt. Viele unserer Partner in Thun bieten bei frühzeitiger Buchung attraktive Konditionen."
  },
  {
    question: "Bieten Umzugsfirmen in Thun auch Umzüge ins Berner Oberland an?",
    answer: "Ja, unsere Partnerfirmen in Thun bedienen die gesamte Region: Umzüge nach Interlaken, Spiez, Frutigen und weitere Orte im Berner Oberland. Spezialfahrzeuge für Bergstrassen und alpine Regionen. Erfahrung mit den besonderen Anforderungen im Oberland."
  }
]

const serviceSchema = {
  "@context": "https://schema.org", "@type": "Service",
  "serviceType": "Umzugsfirma-Vergleich",
  "name": "Umzugsfirma Thun – Offerten vergleichen",
  "description": "Vergleichen Sie geprüfte Umzugsfirmen in Thun am Thunersee. Kostenlos bis zu 5 Offerten anfordern und bis zu 40% sparen.",
  "category": "Umzugsservice / Umzugsvermittlung",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "provider": {
    "@type": "Organization", "name": "Online-Offerten.ch", "url": "https://online-offerten.ch",
    "logo": "https://online-offerten.ch/image/logo-icon.avif",
    "description": "Vergleichsplattform für Umzugsfirmen, Reinigungsfirmen und Malerfirmen in der Schweiz.",
    "contactPoint": { "@type": "ContactPoint", "contactType": "customer service", "availableLanguage": ["German"] }
  },
  "areaServed": {
    "@type": "City", "name": "Thun",
    "containedInPlace": { "@type": "Country", "name": "Switzerland", "alternateName": "Schweiz" }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog", "name": "Umzugsdienstleistungen in Thun",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Privatumzug Thun" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Geschäftsumzug Thun" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Umzug ins Berner Oberland" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Spezialtransporte Thun" } }
    ]
  },
  "offers": {
    "@type": "Offer", "url": `https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&city=${city}`,
    "price": "0", "priceCurrency": "CHF", "name": "Kostenlose Umzugsofferten vergleichen"
  },
  "audience": { "@type": "Audience", "audienceType": "Privatpersonen und Unternehmen in Thun und am Thunersee" }
}

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": thunFAQs.map(faq => ({ "@type": "Question", "name": String(faq.question), "acceptedAnswer": { "@type": "Answer", "text": String(faq.answer) } }))
}

const webPageSchema = {
  "@context": "https://schema.org", "@type": "WebPage",
  "name": "Umzugsfirma Thun – Umzugspartner am Thunersee finden & vergleichen",
  "description": "Vergleichsportal für Umzugsfirmen in Thun. Kostenlos Offerten anfordern.",
  "url": `https://online-offerten.ch${canonicalUrl}`, "inLanguage": "de-CH",
  "isPartOf": { "@type": "WebSite", "name": "Online-Offerten.ch", "url": "https://online-offerten.ch" },
  "about": { "@type": "Thing", "name": "Umzugsfirmen in Thun vergleichen" },
  "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".hero-description"] },
  "lastReviewed": new Date().toISOString().split('T')[0]
}

const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [
    webPageSchema,
    { "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://online-offerten.ch/" },
      { "@type": "ListItem", "position": 2, "name": "Umzugsfirma in der Nähe", "item": "https://online-offerten.ch/umzugsfirma-in-der-naehe" },
      { "@type": "ListItem", "position": 3, "name": "Umzugsfirma Thun", "item": `https://online-offerten.ch${canonicalUrl}` }
    ]},
    serviceSchema, faqSchema
  ]
}

async function getThunPartners() {
  try {
    const supabase = createStaticClient()
    const { data: umzugPartners, error } = await supabase
      .from('partners').select('id, company_name, slug, address_city, address_zip, main_categories, service_regions, average_rating, review_count, logo_url, message')
      .eq('status', 'active').not('company_name', 'is', null).contains('main_categories', ['umzug'])
    if (error || !umzugPartners || umzugPartners.length === 0) return []
    const filtered = umzugPartners.filter((partner: any) => {
      const pc = partner.address_city?.toLowerCase() || ''
      const cityMatch = pc.includes('thun') || pc.includes('spiez') || pc.includes('interlaken') || pc.includes('steffisburg') || pc.includes('heimberg')
      let regionMatch = false
      if (partner.service_regions && Array.isArray(partner.service_regions)) {
        const regions = partner.service_regions.map((r: any) => typeof r === 'string' ? r.trim().toLowerCase() : String(r).trim().toLowerCase())
        regionMatch = regions.some((r: string) => r === 'thun' || r.includes('thun') || r === 'be' || r.includes('bern') || r.includes('oberland'))
      }
      return cityMatch || regionMatch
    })
    filtered.sort((a: any, b: any) => { const rA = a.average_rating || 0; const rB = b.average_rating || 0; if (rB !== rA) return rB - rA; return (b.review_count || 0) - (a.review_count || 0) })
    return filtered.slice(0, 12)
  } catch (error) { console.error('Error in getThunPartners:', error); return [] }
}

export const metadata: Metadata = {
  title: 'Umzugsfirma Thun – Umzugspartner am Thunersee finden & vergleichen',
  description: '✓ Umzugsfirma in Thun gesucht? Vergleichen Sie geprüfte Umzugsunternehmen am Thunersee. Kostenlos bis zu 5 Offerten anfordern und bis zu 40% sparen!',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/thun',
    languages: { 'de-CH': 'https://online-offerten.ch/umzugsfirma-in-der-naehe/thun', 'x-default': 'https://online-offerten.ch/umzugsfirma-in-der-naehe/thun' },
  },
  openGraph: {
    title: 'Umzugsfirma Thun: Umzugspartner am Thunersee finden & vergleichen',
    description: 'Vergleichen Sie jetzt Umzugsfirmen in Thun. Kostenlos bis zu 5 Offerten anfordern.',
    url: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/thun', siteName: 'Online-Offerten.ch',
    images: [{ url: 'https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-thun-kostenlose-offerte.webp', width: 1200, height: 630, alt: 'Umzugsfirma Thun – Offerten vergleichen' }],
    locale: 'de_CH', type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Umzugsfirma Thun: Umzugspartner am Thunersee finden & vergleichen', description: 'Geprüfte Umzugsfirmen in Thun vergleichen ✓ Kostenlos Offerten anfordern ✓ Bis zu 40% sparen.', images: ['https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-thun-kostenlose-offerte.webp'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
}

export default async function UmzugsfirmaThunPage() {
  const thunPartners = await getThunPartners()
  const itemListSchema = thunPartners && thunPartners.length > 0 ? {
    "@context": "https://schema.org", "@type": "ItemList",
    "name": "Geprüfte Umzugsfirmen in Thun", "numberOfItems": thunPartners.length,
    "itemListElement": thunPartners.map((partner: any, index: number) => ({
      "@type": "ListItem", "position": index + 1,
      "item": { "@type": "LocalBusiness", "name": partner.company_name, "url": `https://online-offerten.ch/partner/${partner.slug || partner.id}`,
        ...(partner.logo_url && { "image": partner.logo_url }),
        "address": { "@type": "PostalAddress", "addressLocality": partner.address_city || "Thun", "addressRegion": "BE", "addressCountry": "CH" },
        ...(partner.review_count > 0 && partner.average_rating > 0 && { "aggregateRating": { "@type": "AggregateRating", "ratingValue": partner.average_rating.toString(), "reviewCount": partner.review_count.toString(), "bestRating": "5", "worstRating": "1" } }),
        ...(partner.message && { "description": partner.message.substring(0, 160) })
      }
    }))
  } : null
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }} />
      {itemListSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />}
      <UmzugsfirmaThunPageClient />
    </>
  )
}
