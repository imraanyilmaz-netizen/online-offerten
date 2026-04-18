import { createStaticClient } from '@/src/lib/supabase/server'

/**
 * Aggregierte Kennzahlen aus der `reviews`-Tabelle (id, name, rating, comment, created_at).
 * Nur Zeilen mit gesetztem `rating` werden gezählt und in den Durchschnitt einbezogen.
 */
export type PlatformReviewsTableStats = {
  count: number
  averageRating: number | null
}

export async function getPlatformReviewsTableStats(): Promise<PlatformReviewsTableStats> {
  try {
    const supabase = createStaticClient()
    const [countRes, ratingsRes] = await Promise.all([
      supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .not('rating', 'is', null),
      supabase.from('reviews').select('rating').not('rating', 'is', null),
    ])

    if (countRes.error || ratingsRes.error) {
      return { count: 0, averageRating: null }
    }

    const rows = ratingsRes.data ?? []
    const ratings = rows
      .map((r: { rating?: number | null }) => r.rating)
      .filter((n): n is number => typeof n === 'number' && Number.isFinite(n) && n > 0)

    const count = countRes.count ?? ratings.length
    if (ratings.length === 0) {
      return { count: count || 0, averageRating: null }
    }

    const sum = ratings.reduce((a, b) => a + b, 0)
    const averageRating = Math.round((sum / ratings.length) * 10) / 10
    return { count: count || ratings.length, averageRating }
  } catch {
    return { count: 0, averageRating: null }
  }
}
