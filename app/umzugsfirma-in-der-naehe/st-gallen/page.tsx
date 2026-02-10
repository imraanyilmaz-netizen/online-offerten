import type { Metadata } from 'next'
import { createStaticClient } from '@/lib/supabase/server'
import UmzugsfirmaStGallenPageClient from '@/components/pages/locations/UmzugsfirmaStGallenPageClient'

export const revalidate = 3600 // 1 Stunde – bessere Performance (TTFB)

const city = "St. Gallen"
const canonicalUrl = '/umzugsfirma-in-der-naehe/st-gallen'

const stGallenFAQs = [
  {
    question: "Wie finde ich eine kompetente Umzugsfirma in St. Gallen?",
    answer: "Vergleichen Sie auf Online-Offerten.ch geprüfte Umzugsfirmen in St. Gallen und der Ostschweiz. Achten Sie auf: Lokale Erfahrung in der Region St. Gallen. Kenntnisse der historischen Altstadt und ihrer engen Gassen. Kundenbewertungen und Versicherungsschutz. Transparente Offerten ohne versteckte Kosten."
  },
  {
    question: "Was kostet ein Umzug innerhalb von St. Gallen?",
    answer: "Für eine 3.5-Zimmer-Wohnung in St. Gallen rechnen Sie mit CHF 1'065 bis CHF 1'235. Faktoren wie Stockwerk, Liftverfügbarkeit und die Lage in der hügeligen Stadt beeinflussen den Preis. Vergleichen Sie mehrere Offerten für das beste Angebot."
  },
  {
    question: "Welche Herausforderungen gibt es bei Umzügen in der St. Galler Altstadt?",
    answer: "Die historische Altstadt von St. Gallen (UNESCO-Weltkulturerbe) hat besondere Anforderungen: Enge Gassen mit eingeschränkter Zufahrt. Historische Gebäude mit schmalen Treppenhäusern. Spezielle Parkregelungen in der Innenstadt. Erfahrene St. Galler Umzugsfirmen kennen diese Gegebenheiten."
  },
  {
    question: "Wie weit im Voraus sollte ich meinen Umzug in St. Gallen planen?",
    answer: "Wir empfehlen 4-6 Wochen Vorlauf, insbesondere: Zum Monatsende und an Wochenenden. Während der Sommermonate (höhere Nachfrage). Bei Umzügen in die Altstadt. Für kurzfristige Anfragen haben viele unserer Partner Express-Optionen."
  },
  {
    question: "Bedienen Umzugsfirmen in St. Gallen auch den gesamten Kanton?",
    answer: "Ja, unsere Partnerfirmen in St. Gallen sind in der gesamten Ostschweiz aktiv: Rorschach, Wil, Rapperswil-Jona, Gossau und weitere Orte. Auch kantonsübergreifende Umzüge nach Thurgau, Appenzell oder ins Rheintal werden angeboten. Vergleichen Sie die Offerten für Ihre gewünschte Strecke."
  }
]

const serviceSchema = {
  "@context": "https://schema.org", "@type": "Service",
  "serviceType": "Umzugsfirma-Vergleich",
  "name": "Umzugsfirma St. Gallen – Offerten vergleichen",
  "description": "Vergleichen Sie geprüfte Umzugsfirmen in St. Gallen und der Ostschweiz. Kostenlos bis zu 5 Offerten anfordern und bis zu 40% sparen.",
  "category": "Umzugsservice / Umzugsvermittlung",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "provider": {
    "@type": "Organization", "name": "Online-Offerten.ch", "url": "https://online-offerten.ch",
    "logo": "https://online-offerten.ch/image/logo-icon.avif",
    "description": "Vergleichsplattform für Umzugsfirmen, Reinigungsfirmen und Malerfirmen in der Schweiz.",
    "contactPoint": { "@type": "ContactPoint", "contactType": "customer service", "availableLanguage": ["German"] }
  },
  "areaServed": {
    "@type": "AdministrativeArea", "name": "Kanton St. Gallen",
    "containedInPlace": { "@type": "Country", "name": "Switzerland", "alternateName": "Schweiz" }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog", "name": "Umzugsdienstleistungen in St. Gallen",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Privatumzug St. Gallen" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Geschäftsumzug St. Gallen" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Umzug Ostschweiz" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Spezialtransporte St. Gallen" } }
    ]
  },
  "offers": {
    "@type": "Offer", "url": `https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&city=${encodeURIComponent(city)}`,
    "price": "0", "priceCurrency": "CHF", "name": "Kostenlose Umzugsofferten vergleichen"
  },
  "audience": { "@type": "Audience", "audienceType": "Privatpersonen und Unternehmen in St. Gallen und der Ostschweiz" }
}

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": stGallenFAQs.map(faq => ({ "@type": "Question", "name": String(faq.question), "acceptedAnswer": { "@type": "Answer", "text": String(faq.answer) } }))
}

const webPageSchema = {
  "@context": "https://schema.org", "@type": "WebPage",
  "name": "Umzugsfirma St. Gallen – Ostschweizer Umzugsprofis vergleichen",
  "description": "Vergleichsportal für Umzugsfirmen in St. Gallen und der Ostschweiz. Kostenlos Offerten anfordern.",
  "url": `https://online-offerten.ch${canonicalUrl}`, "inLanguage": "de-CH",
  "isPartOf": { "@type": "WebSite", "name": "Online-Offerten.ch", "url": "https://online-offerten.ch" },
  "about": { "@type": "Thing", "name": "Umzugsfirmen in St. Gallen vergleichen" },
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
      { "@type": "ListItem", "position": 3, "name": "Umzugsfirma St. Gallen", "item": `https://online-offerten.ch${canonicalUrl}` }
    ]},
    serviceSchema, faqSchema
  ]
}

async function getStGallenPartners() {
  try {
    const supabase = createStaticClient()
    const { data: umzugPartners, error } = await supabase
      .from('partners').select('id, company_name, slug, address_city, address_zip, main_categories, service_regions, average_rating, review_count, logo_url, message')
      .eq('status', 'active').not('company_name', 'is', null).contains('main_categories', ['umzug'])
    if (error || !umzugPartners || umzugPartners.length === 0) return []
    const filtered = umzugPartners.filter((partner: any) => {
      const pc = partner.address_city?.toLowerCase() || ''
      const cityMatch = pc.includes('st. gallen') || pc.includes('st.gallen') || pc.includes('gossau') || pc.includes('rorschach') || pc.includes('wil') || pc.includes('rapperswil')
      let regionMatch = false
      if (partner.service_regions && Array.isArray(partner.service_regions)) {
        const regions = partner.service_regions.map((r: any) => typeof r === 'string' ? r.trim().toLowerCase() : String(r).trim().toLowerCase())
        regionMatch = regions.some((r: string) => r === 'st. gallen' || r === 'sg' || r.includes('st. gallen') || r.includes('st.gallen') || r.includes('ostschweiz'))
      }
      return cityMatch || regionMatch
    })
    filtered.sort((a: any, b: any) => { const rA = a.average_rating || 0; const rB = b.average_rating || 0; if (rB !== rA) return rB - rA; return (b.review_count || 0) - (a.review_count || 0) })
    return filtered.slice(0, 12)
  } catch (error) { console.error('Error in getStGallenPartners:', error); return [] }
}

export const metadata: Metadata = {
  title: 'Umzugsfirma St. Gallen – Ostschweizer Umzugsprofis vergleichen',
  description: '✓ Umzugsfirma in St. Gallen gesucht? Vergleichen Sie geprüfte Umzugsunternehmen in der Ostschweiz. Kostenlos bis zu 5 Offerten anfordern und bis zu 40% sparen!',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/st-gallen',
    languages: { 'de-CH': 'https://online-offerten.ch/umzugsfirma-in-der-naehe/st-gallen', 'x-default': 'https://online-offerten.ch/umzugsfirma-in-der-naehe/st-gallen' },
  },
  openGraph: {
    title: 'Umzugsfirma St. Gallen: Ostschweizer Umzugsprofis vergleichen & sparen',
    description: 'Vergleichen Sie jetzt Umzugsfirmen in St. Gallen. Kostenlos bis zu 5 Offerten anfordern.',
    url: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/st-gallen', siteName: 'Online-Offerten.ch',
    images: [{ url: 'https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-st.gallen-offerten.webp', width: 1200, height: 630, alt: 'Umzugsfirma St. Gallen – Offerten vergleichen' }],
    locale: 'de_CH', type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Umzugsfirma St. Gallen: Ostschweizer Umzugsprofis vergleichen', description: 'Geprüfte Umzugsfirmen in St. Gallen vergleichen ✓ Kostenlos Offerten anfordern ✓ Bis zu 40% sparen.', images: ['https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-st.gallen-offerten.webp'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
}

export default async function UmzugsfirmaStGallenPage() {
  const stGallenPartners = await getStGallenPartners()
  const itemListSchema = stGallenPartners && stGallenPartners.length > 0 ? {
    "@context": "https://schema.org", "@type": "ItemList",
    "name": "Geprüfte Umzugsfirmen in St. Gallen", "numberOfItems": stGallenPartners.length,
    "itemListElement": stGallenPartners.map((partner: any, index: number) => ({
      "@type": "ListItem", "position": index + 1,
      "item": { "@type": "LocalBusiness", "name": partner.company_name, "url": `https://online-offerten.ch/partner/${partner.slug || partner.id}`,
        ...(partner.logo_url && { "image": partner.logo_url }),
        "address": { "@type": "PostalAddress", "addressLocality": partner.address_city || "St. Gallen", "addressRegion": "SG", "addressCountry": "CH" },
        ...(partner.review_count > 0 && partner.average_rating > 0 && { "aggregateRating": { "@type": "AggregateRating", "ratingValue": partner.average_rating.toString(), "reviewCount": partner.review_count.toString(), "bestRating": "5", "worstRating": "1" } }),
        ...(partner.message && { "description": partner.message.substring(0, 160) })
      }
    }))
  } : null
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }} />
      {itemListSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />}
      <UmzugsfirmaStGallenPageClient />
    </>
  )
}


