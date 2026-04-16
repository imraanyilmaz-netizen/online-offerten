import { createStaticClient } from '@/src/lib/supabase/server'

/** Einheitliche Form für /kunden-bewertungen (customer_reviews + reviews) */
export type KundenBewertungReview = {
  id: string
  customer_name: string
  city: string
  review_date: string
  rating: number
  review_text?: string
  service_type?: string
  partner_name?: string
  partners?: { slug: string; company_name: string }[]
}

function parseReviewTime(iso: string | null | undefined): number {
  if (!iso) return 0
  const t = new Date(iso).getTime()
  return Number.isFinite(t) ? t : 0
}

function mapCustomerReviewRow(r: Record<string, unknown>): KundenBewertungReview {
  const rawP = r.partners
  const partners: KundenBewertungReview['partners'] = Array.isArray(rawP)
    ? (rawP as KundenBewertungReview['partners'])
    : rawP && typeof rawP === 'object'
      ? [rawP as { slug: string; company_name: string }]
      : undefined
  return {
    id: String(r.id),
    customer_name: String(r.customer_name || 'Kunde'),
    city: String(r.city || ''),
    review_date: String(r.review_date || ''),
    rating: Number(r.rating) || 0,
    review_text: r.review_text ? String(r.review_text) : undefined,
    service_type: r.service_type ? String(r.service_type) : undefined,
    partner_name: r.partner_name ? String(r.partner_name) : undefined,
    partners: partners && partners.length > 0 ? partners : undefined,
  }
}

function mapSimpleReviewRow(r: Record<string, unknown>): KundenBewertungReview {
  return {
    id: `reviews-${String(r.id)}`,
    customer_name: (r.name != null && String(r.name).trim()) || 'Kunde',
    city: '',
    review_date: String(r.created_at || ''),
    rating: Number(r.rating) || 0,
    review_text: r.comment != null && String(r.comment).trim() ? String(r.comment) : undefined,
    service_type: undefined,
    partner_name: undefined,
    partners: undefined,
  }
}

/**
 * Lädt genehmigte Plattform-Bewertungen (`customer_reviews`) und Einträge aus `reviews`,
 * sortiert nach Datum (neu zuerst), paginiert mit offset/limit.
 */
export async function getMergedKundenBewertungenPage(
  offset: number,
  limit: number
): Promise<{ reviews: KundenBewertungReview[]; totalCount: number }> {
  const safeOffset = Math.max(0, offset)
  const safeLimit = Math.min(100, Math.max(1, limit))

  const supabase = createStaticClient()

  const [crRes, countCrRes, simpleRes, countSimpleRes] = await Promise.all([
    supabase
      .from('customer_reviews')
      .select(
        `
        id, customer_name, rating, city, review_date,
        review_text, service_type, partner_name,
        partners (slug, company_name)
      `
      )
      .eq('approval_status', 'approved')
      .eq('review_type', 'platform'),
    supabase
      .from('customer_reviews')
      .select('*', { count: 'exact', head: true })
      .eq('approval_status', 'approved')
      .eq('review_type', 'platform'),
    supabase.from('reviews').select('id, name, rating, comment, created_at').not('rating', 'is', null),
    supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .not('rating', 'is', null),
  ])

  const unified: KundenBewertungReview[] = []

  if (!crRes.error && crRes.data) {
    for (const r of crRes.data as Record<string, unknown>[]) {
      unified.push(mapCustomerReviewRow(r))
    }
  }

  if (!simpleRes.error && simpleRes.data) {
    for (const r of simpleRes.data as Record<string, unknown>[]) {
      unified.push(mapSimpleReviewRow(r))
    }
  }

  unified.sort((a, b) => parseReviewTime(b.review_date) - parseReviewTime(a.review_date))

  const totalCount =
    (!countCrRes.error ? countCrRes.count ?? 0 : 0) +
    (!countSimpleRes.error ? countSimpleRes.count ?? 0 : 0)

  return {
    reviews: unified.slice(safeOffset, safeOffset + safeLimit),
    totalCount,
  }
}

/**
 * Startseite & Über uns: Kundenstimmen-Karussell (`show_on_homepage` + Tabelle `reviews`)
 * sowie konsolidierte Kennzahlen für Hero & Schema.org.
 */
export async function getHomepageReviewsBundle(carouselLimit = 6): Promise<{
  carouselReviews: KundenBewertungReview[]
  ratingStats: { averageRating: number; reviewCount: number }
}> {
  const supabase = createStaticClient()
  const poolLimit = 40
  const outLimit = Math.min(50, Math.max(1, carouselLimit))

  const [
    crHomeRes,
    simpleHomeRes,
    crRatingsRes,
    simpleRatingsRes,
    countCrRes,
    countSimpleRes,
  ] = await Promise.all([
    supabase
      .from('customer_reviews')
      .select(
        `
        id, customer_name, rating, city, review_date,
        review_text, service_type, partner_name,
        partners (slug, company_name)
      `
      )
      .eq('approval_status', 'approved')
      .eq('review_type', 'platform')
      .eq('show_on_homepage', true)
      .order('review_date', { ascending: false })
      .limit(poolLimit),
    supabase
      .from('reviews')
      .select('id, name, rating, comment, created_at')
      .not('rating', 'is', null)
      .order('created_at', { ascending: false })
      .limit(poolLimit),
    supabase
      .from('customer_reviews')
      .select('rating')
      .eq('approval_status', 'approved')
      .eq('review_type', 'platform'),
    supabase.from('reviews').select('rating').not('rating', 'is', null),
    supabase
      .from('customer_reviews')
      .select('*', { count: 'exact', head: true })
      .eq('approval_status', 'approved')
      .eq('review_type', 'platform'),
    supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .not('rating', 'is', null),
  ])

  const unified: KundenBewertungReview[] = []

  if (!crHomeRes.error && crHomeRes.data) {
    for (const r of crHomeRes.data as Record<string, unknown>[]) {
      unified.push(mapCustomerReviewRow(r))
    }
  }
  if (!simpleHomeRes.error && simpleHomeRes.data) {
    for (const r of simpleHomeRes.data as Record<string, unknown>[]) {
      unified.push(mapSimpleReviewRow(r))
    }
  }

  unified.sort((a, b) => parseReviewTime(b.review_date) - parseReviewTime(a.review_date))

  const reviewCount =
    (!countCrRes.error ? countCrRes.count ?? 0 : 0) +
    (!countSimpleRes.error ? countSimpleRes.count ?? 0 : 0)

  const ratingNums: number[] = []
  if (!crRatingsRes.error && crRatingsRes.data) {
    for (const row of crRatingsRes.data as { rating?: number | null }[]) {
      const n = Number(row.rating)
      if (Number.isFinite(n) && n > 0) ratingNums.push(n)
    }
  }
  if (!simpleRatingsRes.error && simpleRatingsRes.data) {
    for (const row of simpleRatingsRes.data as { rating?: number | null }[]) {
      const n = Number(row.rating)
      if (Number.isFinite(n) && n > 0) ratingNums.push(n)
    }
  }

  const averageRating =
    ratingNums.length > 0
      ? Math.round((ratingNums.reduce((s, n) => s + n, 0) / ratingNums.length) * 10) / 10
      : 0

  return {
    carouselReviews: unified.slice(0, outLimit),
    ratingStats: {
      reviewCount,
      averageRating,
    },
  }
}
