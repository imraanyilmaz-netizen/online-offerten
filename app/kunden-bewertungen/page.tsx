import { Suspense } from 'react'
import { createStaticClient } from '@/lib/supabase/server'
import KundenBewertungenPageClient from '@/components/pages/KundenBewertungenPageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kundenbewertungen - Echte Erfahrungen von zufriedenen Kunden',
  description: 'Lesen Sie echte Kundenbewertungen und Erfahrungen. Über 1000+ verifizierte Bewertungen von zufriedenen Kunden für Umzug, Reinigung & Renovierung.',
  alternates: {
    canonical: 'https://online-offerten.ch/kunden-bewertungen',
  },
  openGraph: {
    title: 'Kundenbewertungen - Echte Erfahrungen von zufriedenen Kunden',
    description: 'Über 1000+ verifizierte Bewertungen von zufriedenen Kunden',
    url: 'https://online-offerten.ch/kunden-bewertungen',
    siteName: 'Online-Offerten.ch',
    type: 'website',
    images: [
      {
        url: 'https://online-offerten.ch/image/online-offerten.webp',
        width: 1200,
        height: 630,
        alt: 'Kundenbewertungen - Online-Offerten.ch',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kundenbewertungen - Echte Erfahrungen',
    description: 'Über 1000+ verifizierte Bewertungen',
    images: ['https://online-offerten.ch/image/online-offerten.webp'],
  },
}

// ISR: Sayfa 5 dakikada bir otomatik yenilenecek
export const revalidate = 300

async function getInitialReviews() {
  const supabase = createStaticClient()
  
  // İlk 10 platform yorumunu getir
  const { data: reviews, error } = await supabase
    .from('customer_reviews')
      .select(`
        id, customer_name, rating, city, review_date, 
        review_text,
        service_type, partner_name,
        partners (slug, company_name)
      `)
    .eq('approval_status', 'approved')
    .eq('review_type', 'platform')
    .order('review_date', { ascending: false })
    .limit(10)

  // Toplam yorum sayısını al
  const { count: totalCount } = await supabase
    .from('customer_reviews')
    .select('*', { count: 'exact', head: true })
    .eq('approval_status', 'approved')
    .eq('review_type', 'platform')

  return {
    reviews: reviews || [],
    totalCount: totalCount || 0
  }
}

export default async function KundenBewertungenPage() {
  const { reviews, totalCount } = await getInitialReviews()

  // Schema.org CollectionPage - AggregateRating sadece Organization (ana sayfa) ve LocalBusiness (partner) sayfalarında
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Kundenbewertungen",
    "description": "Echte Kundenbewertungen und Erfahrungen von zufriedenen Kunden",
    "url": "https://online-offerten.ch/kunden-bewertungen",
    "publisher": {
      "@type": "Organization",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-gray-50">Loading...</div>}>
        <KundenBewertungenPageClient initialReviews={reviews} initialTotalCount={totalCount} />
      </Suspense>
    </>
  )
}

