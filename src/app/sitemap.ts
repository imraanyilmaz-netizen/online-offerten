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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createStaticClient()

  // ============================================
  // 1. STATIC PAGES — no lastModified (content rarely changes)
  //    Google determines freshness from its own crawl cycle
  // ============================================
  const staticPages: MetadataRoute.Sitemap = [
    // --- Homepage ---
    { url: `${BASE_URL}/` },

    // --- General pages (/login nicht: robots disallow → nicht indexieren via Sitemap) ---
    { url: `${BASE_URL}/kontakt` },
    { url: `${BASE_URL}/kostenlose-offerte-anfordern` },
    { url: `${BASE_URL}/kunden-bewertungen` },
    { url: `${BASE_URL}/offerten-portal` },
    { url: `${BASE_URL}/top-offerten-schweiz` },
    { url: `${BASE_URL}/partner-suche` },
    { url: `${BASE_URL}/partner-werden` },
    { url: `${BASE_URL}/standorte` },
    { url: `${BASE_URL}/ueber-uns` },
    { url: `${BASE_URL}/ratgeber` },

    // --- Umzug main service pages ---
    { url: `${BASE_URL}/umzugsfirma` },
    { url: `${BASE_URL}/umzugsfirma-vergleichen` },
    { url: `${BASE_URL}/umzugsofferten` },
    { url: `${BASE_URL}/guenstig-umziehen` },
    { url: `${BASE_URL}/malerarbeitenkosten` },
    { url: `${BASE_URL}/raeumung-entsorgung` },
    { url: `${BASE_URL}/umzugskosten-aargau` },

    { url: `${BASE_URL}/reinigung` },

    { url: `${BASE_URL}/malerfirma` },
  ]

  const categoryCityPages: MetadataRoute.Sitemap = serviceCategories.flatMap((cat) =>
    locations.map((loc) => ({ url: `${BASE_URL}/${cat.slug}/${loc.slug}` }))
  )

  const inDerNaehePages: MetadataRoute.Sitemap = [
    ...serviceCategories.map((cat) => ({ url: `${BASE_URL}/${cat.slug}-in-der-naehe` })),
    { url: `${BASE_URL}/reinigungsfirma-in-der-naehe` },
  ]

  const categoryServicePages: MetadataRoute.Sitemap = serviceCategories.flatMap((cat) =>
    cat.services.map((s) => ({
      url: `${BASE_URL}/${cat.slug}/${getServicePathSegment(s)}`,
    }))
  )

  const categoryServiceCityPages: MetadataRoute.Sitemap = serviceCategories.flatMap((cat) =>
    cat.services.flatMap((s) =>
      locations.map((loc) => ({
        url: `${BASE_URL}/${cat.slug}/${getServicePathSegment(s)}/${loc.slug}`,
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
