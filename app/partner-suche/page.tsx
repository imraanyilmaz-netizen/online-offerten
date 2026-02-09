import type { Metadata } from 'next'
import { createStaticClient } from '@/lib/supabase/server'
import PartnerSearchPageClient from '@/components/pages/PartnerSearchPageClient'

// ISR: Her 5 dakikada yenilenecek
export const revalidate = 300

async function getPartners() {
  const supabase = createStaticClient()
  
  const { data, error } = await supabase
    .from('partners')
    .select('id, company_name, slug, address_street, address_city, address_zip, main_categories, offered_services, service_regions, average_rating, review_count, badge_tier, logo_url, hero_image_url, message')
    .eq('status', 'active')
    .order('average_rating', { ascending: false })

  if (error) {
    console.error('Error fetching partners:', error)
    return []
  }

  return data || []
}

export const metadata: Metadata = {
  title: 'Umzugsfirma, Reinigungsfirma & Malerfirma in der Schweiz finden und vergleichen!',
  description: 'Finden Sie qualifizierte Umzugsfirmen, Reinigungsfirmen und Malerfirmen in Ihrer Region. Vergleichen Sie Bewertungen, Services und Preise von verifizierten Partnern auf Online-Offerten.ch.',
  alternates: {
    canonical: 'https://online-offerten.ch/partner-suche',
  },
  openGraph: {
    title: 'Umzugsfirma, Reinigungsfirma & Malerfirma in der Schweiz finden und vergleichen!',
    description: 'Finden Sie qualifizierte Umzugsfirmen, Reinigungsfirmen und Malerfirmen in Ihrer Region. Vergleichen Sie Bewertungen, Services und Preise von verifizierten Partnern auf Online-Offerten.ch.',
    url: 'https://online-offerten.ch/partner-suche',
    siteName: 'Online-Offerten.ch',
    images: [
      {
        url: 'https://online-offerten.ch/image/online-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Umzugsfirma, Reinigungsfirma & Malerfirma in der Schweiz finden und vergleichen',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umzugsfirma, Reinigungsfirma & Malerfirma in der Schweiz finden und vergleichen!',
    description: 'Finden Sie qualifizierte Umzugsfirmen, Reinigungsfirmen und Malerfirmen in Ihrer Region. Vergleichen Sie Bewertungen, Services und Preise von verifizierten Partnern.',
    images: ['https://online-offerten.ch/image/online-offerten.webp'],
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

export default async function PartnerSearchPage() {
  const partners = await getPartners()

  // JSON-LD ItemList Schema für SEO
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Umzugsfirmen & Reinigungsfirmen Schweiz",
    "description": "Geprüfte Umzugsfirmen und Reinigungsfirmen in der Schweiz finden und vergleichen.",
    "url": "https://online-offerten.ch/partner-suche",
    "numberOfItems": partners.length,
    "itemListElement": partners.slice(0, 50).map((partner: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "LocalBusiness",
        "name": partner.company_name,
        "url": `https://online-offerten.ch/partner/${partner.slug}`,
        ...(partner.address_city && {
          "address": {
            "@type": "PostalAddress",
            "addressLocality": partner.address_city,
            "postalCode": partner.address_zip || "",
            "addressCountry": "CH"
          }
        }),
        ...(partner.average_rating > 0 && partner.review_count > 0 && {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": partner.average_rating.toString(),
            "reviewCount": partner.review_count.toString(),
            "bestRating": "5",
            "worstRating": "1"
          }
        }),
        ...(partner.logo_url && { "logo": partner.logo_url }),
        ...(partner.message && { "description": partner.message })
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <PartnerSearchPageClient initialPartners={partners} />
    </>
  )
}
