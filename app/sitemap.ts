import { MetadataRoute } from 'next'
import { createStaticClient } from '@/lib/supabase/server'

// ISR: Sitemap regenerates in the background every hour
export const revalidate = 3600

const BASE_URL = 'https://online-offerten.ch'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createStaticClient()
  const now = new Date()

  // ============================================
  // 1. STATIC PAGES — Main + Services + Cities
  // ============================================
  const staticPages: MetadataRoute.Sitemap = [
    // --- Homepage ---
    { url: `${BASE_URL}/`, lastModified: now },

    // --- General pages ---
    { url: `${BASE_URL}/kontakt`, lastModified: now },
    { url: `${BASE_URL}/kostenlose-offerte-anfordern`, lastModified: now },
    { url: `${BASE_URL}/kunden-bewertungen`, lastModified: now },
    { url: `${BASE_URL}/offerten-portal`, lastModified: now },
    { url: `${BASE_URL}/partner-suche`, lastModified: now },
    { url: `${BASE_URL}/partner-werden`, lastModified: now },
    { url: `${BASE_URL}/standorte`, lastModified: now },
    { url: `${BASE_URL}/ueber-uns`, lastModified: now },
    { url: `${BASE_URL}/ratgeber`, lastModified: now },

    // --- Umzug main service pages ---
    { url: `${BASE_URL}/umzugsfirma`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma-in-der-naehe`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma-vergleichen`, lastModified: now },
    { url: `${BASE_URL}/umzugsofferten`, lastModified: now },
    { url: `${BASE_URL}/guenstig-umziehen`, lastModified: now },
    { url: `${BASE_URL}/malerarbeitenkosten`, lastModified: now },
    { url: `${BASE_URL}/raeumung-entsorgung`, lastModified: now },

    // --- Umzug sub-services ---
    { url: `${BASE_URL}/umzugsfirma/checklists`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/geschaeftsumzug`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/privatumzug`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/umzugshilfe`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/umzugskosten`, lastModified: now },
    { url: `${BASE_URL}/umzugskosten-aargau`, lastModified: now },

    // --- Spezialtransporte ---
    { url: `${BASE_URL}/umzugsfirma/spezialtransporte`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/spezialtransporte/klaviertransport`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/spezialtransporte/klaviertransport/kosten`, lastModified: now },

    // --- Internationale Umzüge ---
    { url: `${BASE_URL}/umzugsfirma/internationale-umzuege`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-belgien`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-daenemark`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-deutschland`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-frankreich`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-italien`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-oesterreich`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-portugal`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-spanien`, lastModified: now },

    // --- Umzugsfirma cities ---
    { url: `${BASE_URL}/umzugsfirma/zuerich`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/bern`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/basel`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/luzern`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/aargau`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/genf`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/lausanne`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/st-gallen`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/lugano`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/thun`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/biel-bienne`, lastModified: now },

    // --- Aargau sub-cities ---
    { url: `${BASE_URL}/umzugsfirma/aargau/aarau`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/aargau/baden`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/aargau/zofingen`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/aargau/brugg`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/aargau/wettingen`, lastModified: now },

    // --- Zürich sub-cities ---
    { url: `${BASE_URL}/umzugsfirma/zuerich/winterthur`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/zuerich/uster`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/zuerich/dietikon`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/zuerich/duebendorf`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/zuerich/schlieren`, lastModified: now },
    { url: `${BASE_URL}/umzugsfirma/zuerich/umzugsofferten-zuerich`, lastModified: now },

    // --- Reinigung main service pages ---
    { url: `${BASE_URL}/reinigung`, lastModified: now },
    { url: `${BASE_URL}/reinigung/umzugsreinigung`, lastModified: now },
    { url: `${BASE_URL}/reinigung/wohnungsreinigung`, lastModified: now },
    { url: `${BASE_URL}/reinigung/bueroreinigung`, lastModified: now },
    { url: `${BASE_URL}/reinigung/grundreinigung`, lastModified: now },
    { url: `${BASE_URL}/reinigung/fensterreinigung`, lastModified: now },
    { url: `${BASE_URL}/reinigung/hausreinigung`, lastModified: now },
    { url: `${BASE_URL}/reinigung/fassadenreinigung`, lastModified: now },
    { url: `${BASE_URL}/reinigung/baureinigung`, lastModified: now },
    { url: `${BASE_URL}/reinigung/bodenreinigung`, lastModified: now },
    { url: `${BASE_URL}/reinigung/hofreinigung`, lastModified: now },
    { url: `${BASE_URL}/reinigung/unterhaltsreinigung`, lastModified: now },
    { url: `${BASE_URL}/reinigung/reinigungskosten`, lastModified: now },

    // --- Reinigungsfirma cities ---
    { url: `${BASE_URL}/reinigungsfirma`, lastModified: now },
    { url: `${BASE_URL}/reinigungsfirma/zuerich`, lastModified: now },
    { url: `${BASE_URL}/reinigungsfirma/bern`, lastModified: now },
    { url: `${BASE_URL}/reinigungsfirma/basel`, lastModified: now },
    { url: `${BASE_URL}/reinigungsfirma/luzern`, lastModified: now },
    { url: `${BASE_URL}/reinigungsfirma/genf`, lastModified: now },
    { url: `${BASE_URL}/reinigungsfirma/lausanne`, lastModified: now },
    { url: `${BASE_URL}/reinigungsfirma/st-gallen`, lastModified: now },
    { url: `${BASE_URL}/reinigungsfirma/winterthur`, lastModified: now },

    // --- Malerfirma pages + cities ---
    { url: `${BASE_URL}/malerfirma`, lastModified: now },
    { url: `${BASE_URL}/malerfirma/zuerich`, lastModified: now },
    { url: `${BASE_URL}/malerfirma/bern`, lastModified: now },
    { url: `${BASE_URL}/malerfirma/basel`, lastModified: now },
    { url: `${BASE_URL}/malerfirma/genf`, lastModified: now },
    { url: `${BASE_URL}/malerfirma/lausanne`, lastModified: now },
    { url: `${BASE_URL}/malerfirma/luzern`, lastModified: now },
    { url: `${BASE_URL}/malerfirma/st-gallen`, lastModified: now },
    { url: `${BASE_URL}/malerfirma/winterthur`, lastModified: now },
  ]

  // ============================================
  // 2. DYNAMIC BLOG POSTS (real lastModified from Supabase)
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
  // 3. DYNAMIC PARTNER PROFILES (real lastModified from Supabase)
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
        lastModified: partner.updated_at ? new Date(partner.updated_at) : now,
      }))
  } catch (error) {
    console.error('Sitemap: Partner pages could not be fetched', error)
  }

  return [...staticPages, ...blogPages, ...partnerPages]
}
