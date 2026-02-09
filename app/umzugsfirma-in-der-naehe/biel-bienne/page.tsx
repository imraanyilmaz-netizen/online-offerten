import type { Metadata } from 'next'
import { createStaticClient } from '@/lib/supabase/server'
import UmzugsfirmaBielBiennePageClient from '@/components/pages/locations/UmzugsfirmaBielBiennePageClient'

export const revalidate = 3600 // 1 Stunde – bessere Performance (TTFB)

const city = "Biel/Bienne"
const canonicalUrl = '/umzugsfirma-in-der-naehe/biel-bienne'

const bielFAQs = [
  {
    question: "Was zeichnet Umzugsfirmen in Biel/Bienne aus?",
    answer: "Umzugsfirmen in Biel/Bienne zeichnen sich durch ihre Zweisprachigkeit (Deutsch/Französisch) aus. Sie kennen die lokalen Gegebenheiten der grössten zweisprachigen Stadt der Schweiz und bieten massgeschneiderte Lösungen. Über Online-Offerten.ch vergleichen Sie mehrere geprüfte Anbieter."
  },
  {
    question: "Was kostet ein Umzug in Biel/Bienne?",
    answer: "Für eine 3.5-Zimmer-Wohnung rechnen Sie mit CHF 1'078 bis CHF 1'248. Die Kosten variieren je nach Stockwerk, Liftverfügbarkeit und gewünschten Zusatzleistungen. In Biel/Bienne sind die Umzugskosten im Vergleich zu Grossstädten wie Zürich oder Genf moderat."
  },
  {
    question: "Gibt es zweisprachige Umzugsunternehmen in Biel/Bienne?",
    answer: "Ja, viele Umzugsfirmen in Biel/Bienne haben zweisprachige Teams (Deutsch und Französisch). Dies ist ein grosser Vorteil bei der Kommunikation und sorgt dafür, dass alle Ihre Wünsche klar verstanden werden, unabhängig von Ihrer Sprachpräferenz."
  },
  {
    question: "Wie organisiere ich einen Umzug in der zweisprachigen Stadt?",
    answer: "Ein Umzug in Biel/Bienne ist unkompliziert: Fordern Sie kostenlose Offerten auf Online-Offerten.ch an. Vergleichen Sie Preise und Bewertungen der lokalen Anbieter. Wählen Sie die Firma, die Ihren Anforderungen am besten entspricht. Profitieren Sie von zweisprachigem Service und lokaler Expertise."
  },
  {
    question: "Welche Umzugsleistungen werden in Biel/Bienne angeboten?",
    answer: "Unsere Partner in Biel/Bienne bieten umfassende Dienstleistungen: Professioneller Ein- und Auspackservice. Möbel-Demontage und -Montage. Spezialtransporte (Klaviere, Kunstgegenstände). Endreinigung mit Abnahmegarantie. Fachgerechte Entsorgung und Räumung. Möbellagerung."
  }
]

const serviceSchema = {
  "@context": "https://schema.org", "@type": "Service",
  "serviceType": "Umzugsfirma-Vergleich",
  "name": "Umzugsfirma Biel/Bienne – Offerten vergleichen",
  "description": "Vergleichen Sie geprüfte Umzugsfirmen in Biel/Bienne. Kostenlos bis zu 5 Offerten anfordern, zweisprachige Experten finden und bis zu 40% sparen.",
  "category": "Umzugsservice / Umzugsvermittlung",
  "url": `https://online-offerten.ch${canonicalUrl}`,
  "provider": {
    "@type": "Organization", "name": "Online-Offerten.ch", "url": "https://online-offerten.ch",
    "logo": "https://online-offerten.ch/image/logo-icon.avif",
    "description": "Vergleichsplattform für Umzugsfirmen, Reinigungsfirmen und Malerfirmen in der Schweiz.",
    "contactPoint": { "@type": "ContactPoint", "contactType": "customer service", "availableLanguage": ["German", "French"] }
  },
  "areaServed": {
    "@type": "City", "name": "Biel/Bienne",
    "containedInPlace": { "@type": "Country", "name": "Switzerland", "alternateName": "Schweiz" }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog", "name": "Umzugsdienstleistungen in Biel/Bienne",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Privatumzug Biel/Bienne" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Geschäftsumzug Biel/Bienne" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Spezialtransporte Biel/Bienne" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Umzugsreinigung Biel/Bienne" } }
    ]
  },
  "offers": {
    "@type": "Offer", "url": `https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&city=Biel-Bienne`,
    "price": "0", "priceCurrency": "CHF", "name": "Kostenlose Umzugsofferten vergleichen"
  },
  "audience": { "@type": "Audience", "audienceType": "Privatpersonen und Unternehmen in Biel/Bienne" }
}

const faqSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": bielFAQs.map(faq => ({ "@type": "Question", "name": String(faq.question), "acceptedAnswer": { "@type": "Answer", "text": String(faq.answer) } }))
}

const webPageSchema = {
  "@context": "https://schema.org", "@type": "WebPage",
  "name": "Umzugsfirma Biel/Bienne – Zweisprachige Umzugsexperten vergleichen",
  "description": "Vergleichsportal für Umzugsfirmen in Biel/Bienne. Kostenlos Offerten von zweisprachigen Umzugsunternehmen anfordern.",
  "url": `https://online-offerten.ch${canonicalUrl}`, "inLanguage": "de-CH",
  "isPartOf": { "@type": "WebSite", "name": "Online-Offerten.ch", "url": "https://online-offerten.ch" },
  "about": { "@type": "Thing", "name": "Umzugsfirmen in Biel/Bienne vergleichen" },
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
      { "@type": "ListItem", "position": 3, "name": "Umzugsfirma Biel/Bienne", "item": `https://online-offerten.ch${canonicalUrl}` }
    ]},
    serviceSchema, faqSchema
  ]
}

async function getBielPartners() {
  try {
    const supabase = createStaticClient()
    const { data: umzugPartners, error } = await supabase
      .from('partners').select('id, company_name, slug, address_city, address_zip, main_categories, service_regions, average_rating, review_count, logo_url, message')
      .eq('status', 'active').not('company_name', 'is', null).contains('main_categories', ['umzug'])
    if (error || !umzugPartners || umzugPartners.length === 0) return []
    const filtered = umzugPartners.filter((partner: any) => {
      const pc = partner.address_city?.toLowerCase() || ''
      const cityMatch = pc.includes('biel') || pc.includes('bienne') || pc.includes('nidau') || pc.includes('brügg') || pc.includes('lyss')
      let regionMatch = false
      if (partner.service_regions && Array.isArray(partner.service_regions)) {
        const regions = partner.service_regions.map((r: any) => typeof r === 'string' ? r.trim().toLowerCase() : String(r).trim().toLowerCase())
        regionMatch = regions.some((r: string) => r === 'biel' || r === 'bienne' || r.includes('biel') || r === 'be' || r.includes('bern') || r.includes('seeland'))
      }
      return cityMatch || regionMatch
    })
    filtered.sort((a: any, b: any) => { const rA = a.average_rating || 0; const rB = b.average_rating || 0; if (rB !== rA) return rB - rA; return (b.review_count || 0) - (a.review_count || 0) })
    return filtered.slice(0, 12)
  } catch (error) { console.error('Error in getBielPartners:', error); return [] }
}

export const metadata: Metadata = {
  title: 'Umzugsfirma Biel/Bienne – Zweisprachige Umzugsexperten vergleichen',
  description: '✓ Umzugsfirma in Biel/Bienne gesucht? Vergleichen Sie zweisprachige Umzugsunternehmen. Kostenlos bis zu 5 Offerten anfordern und bis zu 40% sparen!',
  alternates: {
    canonical: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/biel-bienne',
    languages: { 'de-CH': 'https://online-offerten.ch/umzugsfirma-in-der-naehe/biel-bienne', 'x-default': 'https://online-offerten.ch/umzugsfirma-in-der-naehe/biel-bienne' },
  },
  openGraph: {
    title: 'Umzugsfirma Biel/Bienne: Zweisprachige Umzugsexperten vergleichen',
    description: 'Vergleichen Sie jetzt Umzugsfirmen in Biel/Bienne. Kostenlos Offerten anfordern.',
    url: 'https://online-offerten.ch/umzugsfirma-in-der-naehe/biel-bienne', siteName: 'Online-Offerten.ch',
    images: [{ url: 'https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-biel-bienne-offerten.webp', width: 1200, height: 630, alt: 'Umzugsfirma Biel/Bienne – Offerten vergleichen' }],
    locale: 'de_CH', type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Umzugsfirma Biel/Bienne: Zweisprachige Umzugsexperten vergleichen', description: 'Geprüfte Umzugsfirmen in Biel/Bienne vergleichen ✓ Kostenlos Offerten anfordern ✓ Bis zu 40% sparen.', images: ['https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-biel-bienne-offerten.webp'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
}

export default async function UmzugsfirmaBielBiennePage() {
  const bielPartners = await getBielPartners()
  const itemListSchema = bielPartners && bielPartners.length > 0 ? {
    "@context": "https://schema.org", "@type": "ItemList",
    "name": "Geprüfte Umzugsfirmen in Biel/Bienne", "numberOfItems": bielPartners.length,
    "itemListElement": bielPartners.map((partner: any, index: number) => ({
      "@type": "ListItem", "position": index + 1,
      "item": { "@type": "LocalBusiness", "name": partner.company_name, "url": `https://online-offerten.ch/partner/${partner.slug || partner.id}`,
        ...(partner.logo_url && { "image": partner.logo_url }),
        "address": { "@type": "PostalAddress", "addressLocality": partner.address_city || "Biel/Bienne", "addressRegion": "BE", "addressCountry": "CH" },
        ...(partner.review_count > 0 && partner.average_rating > 0 && { "aggregateRating": { "@type": "AggregateRating", "ratingValue": partner.average_rating.toString(), "reviewCount": partner.review_count.toString(), "bestRating": "5", "worstRating": "1" } }),
        ...(partner.message && { "description": partner.message.substring(0, 160) })
      }
    }))
  } : null
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }} />
      {itemListSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />}
      <UmzugsfirmaBielBiennePageClient />
    </>
  )
}
