import { Suspense } from 'react'
import { createStaticClient } from '@/lib/supabase/server'
import PartnerProfilePageClient from '@/components/pages/PartnerProfilePageClient'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// ISR: Sayfa 5 dakikada bir otomatik yenilenecek (300 saniye) - silinen partner'ların daha hızlı kaybolması için
export const revalidate = 300

async function getPartnerData(slug: string) {
  const supabase = createStaticClient()
  
  // Partner verilerini getir - sadece aktif partner'ları göster
  const { data: partnerData, error: partnerError } = await supabase
    .from('partners')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .single()

  if (partnerError || !partnerData) {
    return null
  }

  // Partner silinmişse veya aktif değilse null döndür (notFound() tetiklenecek)
  return partnerData
}

async function getPartnerReviewStats(partnerId: string) {
  const supabase = createStaticClient()
  
  // Sadece bu partner'a ait onaylı partner yorumlarını say (Schema.org için)
  // review_type = 'partner' olmalı - platform yorumları hariç
  const { data: reviews, error } = await supabase
    .from('customer_reviews')
    .select('rating')
    .eq('partner_id', partnerId)
    .eq('approval_status', 'approved')
    .eq('review_type', 'partner') // Sadece partner yorumları

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
  
  // Generate description - use message field (database column name)
  let description = partner.message || partner.description
  if (!description) {
    const city = partner.address_city ? ` in ${partner.address_city}` : ''
    description = `Bewertungen, Kontakt & Informationen zu ${partner.company_name}${city}. Jetzt kostenlose Offerte anfordern.`
  }

  // OG Image Priorität: hero_image > logo > generic
  const ogImage = partner.hero_image_url || partner.logo_url || 'https://online-offerten.ch/image/online-offerten.webp'

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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: partner.company_name,
        },
      ],
      locale: 'de_CH',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
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
    "description": partner.message || partner.description || `Bewertungen und Informationen zu ${partner.company_name}`,
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

  // BreadcrumbList Schema für SEO
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Startseite",
        "item": "https://online-offerten.ch"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Partner finden",
        "item": "https://online-offerten.ch/partner-suche"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": partner.company_name,
        "item": `https://online-offerten.ch/partner/${partner.slug}`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnerSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <PartnerProfilePageClient initialPartner={partner} />
      </Suspense>
    </>
  )
}

