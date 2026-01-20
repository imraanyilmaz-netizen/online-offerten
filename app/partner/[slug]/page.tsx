import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import PartnerProfilePageClient from '@/components/pages/PartnerProfilePageClient'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

async function getPartnerData(slug: string) {
  const supabase = await createClient()
  
  // Partner inaktif olsa bile verileri getir - yorumlar herzaman gösterilsin
  const { data: partnerData, error: partnerError } = await supabase
    .from('partners')
    .select('*')
    .eq('slug', slug)
    .single()

  if (partnerError || !partnerData) {
    return null
  }

  return partnerData
}

async function getPartnerReviewStats(partnerId: string) {
  const supabase = await createClient()
  
  // Alle genehmigten Reviews für diesen Partner zählen (für Schema.org und Google)
  // Nur genehmigte Reviews werden gezählt, da diese im Admin-Bereich freigegeben wurden
  const { data: reviews, error } = await supabase
    .from('customer_reviews')
    .select('rating')
    .eq('partner_id', partnerId)
    .eq('approval_status', 'approved')

  if (error || !reviews || reviews.length === 0) {
    return {
      reviewCount: 0,
      averageRating: 0
    }
  }

  const reviewCount = reviews.length
  const totalRating = reviews.reduce((sum: number, review: any) => sum + (review.rating || 0), 0)
  const averageRating = totalRating / reviewCount

  return {
    reviewCount,
    averageRating: Math.round(averageRating * 10) / 10 // Auf 1 Dezimalstelle runden
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const partner = await getPartnerData(params.slug)
  
  if (!partner) {
    return {
      title: 'Partner nicht gefunden',
    }
  }

  const title = `${partner.company_name} | Bewertungen und Informationen`
  
  // Generate description
  let description = partner.description
  if (!description) {
    const city = partner.address_city ? ` in ${partner.address_city}` : ''
    description = `Bewertungen, Kontakt & Informationen zu ${partner.company_name}${city}. Jetzt kostenlose Offerte anfordern.`
  }

  return {
    title,
    description,
    alternates: {
      canonical: `https://online-offerten.ch/partner/${partner.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://online-offerten.ch/partner/${partner.slug}`,
      siteName: 'Online-Offerten.ch',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function PartnerProfilePage({ params }: { params: { slug: string } }) {
  const partner = await getPartnerData(params.slug)

  if (!partner) {
    notFound()
  }

  // Review-Statistiken für Schema.org laden
  const reviewStats = await getPartnerReviewStats(partner.id)

  // Schema.org LocalBusiness mit AggregateRating generieren
  const partnerSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": partner.company_name,
    "url": `https://online-offerten.ch/partner/${partner.slug}`,
    "description": partner.description || `Bewertungen und Informationen zu ${partner.company_name}`,
    ...(partner.logo_url && {
      "logo": partner.logo_url
    }),
    ...(partner.address_street && partner.address_city && {
      "address": {
        "@type": "PostalAddress",
        "streetAddress": partner.address_street,
        "addressLocality": partner.address_city,
        "postalCode": partner.address_zip || "",
        "addressCountry": "CH"
      }
    }),
    ...(partner.phone && {
      "telephone": partner.phone
    }),
    ...(partner.email && {
      "email": partner.email
    }),
    ...(reviewStats.reviewCount > 0 && reviewStats.averageRating > 0 && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": reviewStats.averageRating.toString(),
        "reviewCount": reviewStats.reviewCount.toString(),
        "bestRating": "5",
        "worstRating": "1"
      }
    })
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnerSchema) }}
      />
    <Suspense fallback={<div>Loading...</div>}>
      <PartnerProfilePageClient initialPartner={partner} />
    </Suspense>
    </>
  )
}

