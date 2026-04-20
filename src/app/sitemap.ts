import { MetadataRoute } from 'next'
import { createStaticClient } from '@/src/lib/supabase/server'
import {
  getServicePathSegment,
  serviceCategories,
} from '@/data/categories'
import { locations } from '@/data/locations'

// ISR: Sitemap regenerates in the background every hour
export const revalidate = 3600

const BASE_URL = 'https://online-offerten.ch'

/**
 * Wichtigste SEO-Städte (Wirtschaftszentren). Diese erhalten erhöhte
 * Sitemap-Priority, damit Google seine Crawl-Kapazität bevorzugt dort investiert.
 * Kein Filter – alle anderen Städte bleiben weiter in der Sitemap, nur mit
 * niedrigerer Priority.
 */
const PRIORITY_CITY_SLUGS = new Set([
  'zuerich', 'genf', 'basel', 'bern', 'lausanne',
  'winterthur', 'luzern', 'st-gallen', 'lugano', 'biel-bienne',
  'thun', 'koeniz', 'la-chaux-de-fonds', 'schaffhausen', 'fribourg',
  'chur', 'neuenburg', 'uster', 'sion', 'zug',
])

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createStaticClient()

  // ============================================
  // 1. STATIC PAGES — no lastModified (content rarely changes)
  //    Google determines freshness from its own crawl cycle
  // ============================================
  const staticPages: MetadataRoute.Sitemap = [
    // --- Homepage ---
    { url: `${BASE_URL}/`, priority: 1.0, changeFrequency: 'daily' },

    // --- General pages (/login nicht: robots disallow → nicht indexieren via Sitemap) ---
    { url: `${BASE_URL}/kontakt`, priority: 0.5 },
    { url: `${BASE_URL}/kostenlose-offerte-anfordern`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/kunden-bewertungen`, priority: 0.6, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/offerten-portal`, priority: 0.7 },
    { url: `${BASE_URL}/top-offerten-schweiz`, priority: 0.7 },
    { url: `${BASE_URL}/partner-suche`, priority: 0.7 },
    { url: `${BASE_URL}/partner-werden`, priority: 0.5 },
    { url: `${BASE_URL}/standorte`, priority: 0.7 },
    { url: `${BASE_URL}/ueber-uns`, priority: 0.4 },
    { url: `${BASE_URL}/ratgeber`, priority: 0.6, changeFrequency: 'weekly' },

    // --- Umzug main service pages ---
    { url: `${BASE_URL}/umzugsfirma`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/umzugsfirma-vergleichen`, priority: 0.8 },
    { url: `${BASE_URL}/umzugsofferten`, priority: 0.8 },
    { url: `${BASE_URL}/guenstig-umziehen`, priority: 0.7 },
    { url: `${BASE_URL}/malerarbeitenkosten`, priority: 0.7 },
    { url: `${BASE_URL}/raeumung-entsorgung`, priority: 0.7 },
    { url: `${BASE_URL}/umzugskosten-aargau`, priority: 0.6 },

    { url: `${BASE_URL}/reinigung`, priority: 0.9, changeFrequency: 'weekly' },

    { url: `${BASE_URL}/malerfirma`, priority: 0.9, changeFrequency: 'weekly' },
  ]

  const categoryCityPages: MetadataRoute.Sitemap = serviceCategories.flatMap((cat) =>
    locations.map((loc) => ({
      url: `${BASE_URL}/${cat.slug}/${loc.slug}`,
      priority: PRIORITY_CITY_SLUGS.has(loc.slug) ? 0.8 : 0.6,
      changeFrequency: 'weekly' as const,
    }))
  )

  const inDerNaehePages: MetadataRoute.Sitemap = [
    ...serviceCategories.map((cat) => ({
      url: `${BASE_URL}/${cat.slug}-in-der-naehe`,
      priority: 0.6,
    })),
    { url: `${BASE_URL}/reinigungsfirma-in-der-naehe`, priority: 0.6 },
  ]

  const categoryServicePages: MetadataRoute.Sitemap = serviceCategories.flatMap((cat) =>
    cat.services.map((s) => ({
      url: `${BASE_URL}/${cat.slug}/${getServicePathSegment(s)}`,
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    }))
  )

  const categoryServiceCityPages: MetadataRoute.Sitemap = serviceCategories.flatMap((cat) =>
    cat.services.flatMap((s) =>
      locations.map((loc) => ({
        url: `${BASE_URL}/${cat.slug}/${getServicePathSegment(s)}/${loc.slug}`,
        priority: PRIORITY_CITY_SLUGS.has(loc.slug) ? 0.7 : 0.5,
        changeFrequency: 'monthly' as const,
      }))
    )
  )

  // ============================================
  // 2. DYNAMIC BLOG POSTS — real lastModified from Supabase
  // ============================================
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const { data: posts } = await supabase
      .from('posts')
      .select('slug, updated_at, published_at, created_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    blogPages = (posts || [])
      .filter((post: any) => post.slug)
      .map((post: any) => ({
        url: `${BASE_URL}/ratgeber/${post.slug}`,
        lastModified: new Date(post.updated_at || post.published_at || post.created_at),
      }))
  } catch (error) {
    console.error('Sitemap: Blog posts could not be fetched', error)
  }

  // ============================================
  // 3. DYNAMIC PARTNER PROFILES — real lastModified from Supabase
  // ============================================
  let partnerPages: MetadataRoute.Sitemap = []
  try {
    const { data: partners } = await supabase
      .from('partners')
      .select('slug, updated_at')
      .eq('status', 'active')
      .not('slug', 'is', null)

    partnerPages = (partners || [])
      .filter((partner: any) => partner.slug)
      .map((partner: any) => ({
        url: `${BASE_URL}/partner/${partner.slug}`,
        ...(partner.updated_at && { lastModified: new Date(partner.updated_at) }),
      }))
  } catch (error) {
    console.error('Sitemap: Partner pages could not be fetched', error)
  }

  return [
    ...staticPages,
    ...categoryCityPages,
    ...categoryServicePages,
    ...categoryServiceCityPages,
    ...inDerNaehePages,
    ...blogPages,
    ...partnerPages,
  ]
}
