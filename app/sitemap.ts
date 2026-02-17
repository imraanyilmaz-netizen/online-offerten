import { MetadataRoute } from 'next'
import { createStaticClient } from '@/lib/supabase/server'

// ISR: Sitemap regenerates in the background every hour
export const revalidate = 3600

const BASE_URL = 'https://online-offerten.ch'

// ============================================
// Sitemap Index — Next.js generates /sitemap.xml (index)
// plus /sitemap/0.xml, /sitemap/1.xml, /sitemap/2.xml, /sitemap/3.xml
//
// 0 = Main pages + Service pages
// 1 = City pages (umzugsfirma, reinigungsfirma, malerfirma)
// 2 = Blog posts (ratgeber) — real lastModified from DB
// 3 = Partner profiles — real lastModified from DB
// ============================================
export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
}

export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  const supabase = createStaticClient()
  const now = new Date()

  // Safe comparison — URL params may arrive as string at runtime
  const segmentId = Number(id)

  // ============================================
  // 0: MAIN + SERVICE PAGES
  // ============================================
  if (segmentId === 0) {
    return [
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

      // --- Malerfirma main ---
      { url: `${BASE_URL}/malerfirma`, lastModified: now },
    ]
  }

  // ============================================
  // 1: CITY PAGES
  // ============================================
  if (segmentId === 1) {
    return [
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

      // --- Malerfirma cities ---
      { url: `${BASE_URL}/malerfirma/zuerich`, lastModified: now },
      { url: `${BASE_URL}/malerfirma/bern`, lastModified: now },
      { url: `${BASE_URL}/malerfirma/basel`, lastModified: now },
      { url: `${BASE_URL}/malerfirma/genf`, lastModified: now },
      { url: `${BASE_URL}/malerfirma/lausanne`, lastModified: now },
      { url: `${BASE_URL}/malerfirma/luzern`, lastModified: now },
      { url: `${BASE_URL}/malerfirma/st-gallen`, lastModified: now },
      { url: `${BASE_URL}/malerfirma/winterthur`, lastModified: now },
    ]
  }

  // ============================================
  // 2: BLOG POSTS (real lastModified from Supabase)
  // ============================================
  if (segmentId === 2) {
    try {
      const { data: posts } = await supabase
        .from('posts')
        .select('slug, updated_at, published_at, created_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      return (posts || [])
        .filter((post: any) => post.slug)
        .map((post: any) => ({
          url: `${BASE_URL}/ratgeber/${post.slug}`,
          lastModified: new Date(post.updated_at || post.published_at || post.created_at),
        }))
    } catch (error) {
      console.error('Sitemap: Blog posts could not be fetched', error)
      return []
    }
  }

  // ============================================
  // 3: PARTNER PROFILES (real lastModified from Supabase)
  // ============================================
  if (segmentId === 3) {
    try {
      const { data: partners } = await supabase
        .from('partners')
        .select('slug, updated_at')
        .eq('status', 'active')
        .not('slug', 'is', null)

      return (partners || [])
        .filter((partner: any) => partner.slug)
        .map((partner: any) => ({
          url: `${BASE_URL}/partner/${partner.slug}`,
          lastModified: partner.updated_at ? new Date(partner.updated_at) : now,
        }))
    } catch (error) {
      console.error('Sitemap: Partner pages could not be fetched', error)
      return []
    }
  }

  return []
}
