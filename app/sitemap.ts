import { MetadataRoute } from 'next'
import { createStaticClient } from '@/lib/supabase/server'

// ISR: Sitemap her 1 saatte bir arka planda yenilenir
export const revalidate = 3600

const BASE_URL = 'https://online-offerten.ch'

// ============================================
// Sitemap Index Yapısı — Google'a net site yapısı gösterir
// 0 = Ana sayfalar + Servis sayfaları
// 1 = Şehir sayfaları (umzugsfirma, reinigungsfirma, malerfirma)
// 2 = Blog yazıları (ratgeber)
// 3 = Partner profilleri
// ============================================
export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const supabase = createStaticClient()

  // ============================================
  // 0: ANA SAYFALAR + SERVİS SAYFALARI
  // ============================================
  if (id === 0) {
    return [
      // --- Ana Sayfa ---
      { url: `${BASE_URL}/` },

      // --- Genel Sayfalar ---
      { url: `${BASE_URL}/kontakt` },
      { url: `${BASE_URL}/kostenlose-offerte-anfordern` },
      { url: `${BASE_URL}/kunden-bewertungen` },
      { url: `${BASE_URL}/offerten-portal` },
      { url: `${BASE_URL}/partner-suche` },
      { url: `${BASE_URL}/partner-werden` },
      { url: `${BASE_URL}/standorte` },
      { url: `${BASE_URL}/ueber-uns` },
      { url: `${BASE_URL}/ratgeber` },

      // --- Umzug Ana Servis Sayfaları ---
      { url: `${BASE_URL}/umzugsfirma` },
      { url: `${BASE_URL}/umzugsfirma-in-der-naehe` },
      { url: `${BASE_URL}/umzugsfirma-vergleichen` },
      { url: `${BASE_URL}/umzugsofferten` },
      { url: `${BASE_URL}/guenstig-umziehen` },
      { url: `${BASE_URL}/malerarbeitenkosten` },
      { url: `${BASE_URL}/raeumung-entsorgung` },

      // --- Umzug Alt Servisler ---
      { url: `${BASE_URL}/umzugsfirma/checklists` },
      { url: `${BASE_URL}/umzugsfirma/geschaeftsumzug` },
      { url: `${BASE_URL}/umzugsfirma/privatumzug` },
      { url: `${BASE_URL}/umzugsfirma/umzugshilfe` },
      { url: `${BASE_URL}/umzugsfirma/umzugskosten` },
      { url: `${BASE_URL}/umzugskosten-aargau` },

      // --- Spezialtransporte ---
      { url: `${BASE_URL}/umzugsfirma/spezialtransporte` },
      { url: `${BASE_URL}/umzugsfirma/spezialtransporte/klaviertransport` },
      { url: `${BASE_URL}/umzugsfirma/spezialtransporte/klaviertransport/kosten` },

      // --- Internationale Umzüge ---
      { url: `${BASE_URL}/umzugsfirma/internationale-umzuege` },
      { url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-belgien` },
      { url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-daenemark` },
      { url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-deutschland` },
      { url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-frankreich` },
      { url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-italien` },
      { url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-oesterreich` },
      { url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-portugal` },
      { url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-spanien` },

      // --- Reinigung Ana Servis Sayfaları ---
      { url: `${BASE_URL}/reinigung` },
      { url: `${BASE_URL}/reinigung/umzugsreinigung` },
      { url: `${BASE_URL}/reinigung/wohnungsreinigung` },
      { url: `${BASE_URL}/reinigung/bueroreinigung` },
      { url: `${BASE_URL}/reinigung/grundreinigung` },
      { url: `${BASE_URL}/reinigung/fensterreinigung` },
      { url: `${BASE_URL}/reinigung/hausreinigung` },
      { url: `${BASE_URL}/reinigung/fassadenreinigung` },
      { url: `${BASE_URL}/reinigung/baureinigung` },
      { url: `${BASE_URL}/reinigung/bodenreinigung` },
      { url: `${BASE_URL}/reinigung/hofreinigung` },
      { url: `${BASE_URL}/reinigung/unterhaltsreinigung` },
      { url: `${BASE_URL}/reinigung/reinigungskosten` },

      // --- Malerfirma Ana Sayfa ---
      { url: `${BASE_URL}/malerfirma` },
    ]
  }

  // ============================================
  // 1: ŞEHİR SAYFALARI
  // ============================================
  if (id === 1) {
    return [
      // --- Umzugsfirma Şehirler ---
      { url: `${BASE_URL}/umzugsfirma/zuerich` },
      { url: `${BASE_URL}/umzugsfirma/bern` },
      { url: `${BASE_URL}/umzugsfirma/basel` },
      { url: `${BASE_URL}/umzugsfirma/luzern` },
      { url: `${BASE_URL}/umzugsfirma/aargau` },
      { url: `${BASE_URL}/umzugsfirma/genf` },
      { url: `${BASE_URL}/umzugsfirma/lausanne` },
      { url: `${BASE_URL}/umzugsfirma/st-gallen` },
      { url: `${BASE_URL}/umzugsfirma/lugano` },
      { url: `${BASE_URL}/umzugsfirma/thun` },
      { url: `${BASE_URL}/umzugsfirma/biel-bienne` },

      // --- Aargau Alt Şehirler ---
      { url: `${BASE_URL}/umzugsfirma/aargau/aarau` },
      { url: `${BASE_URL}/umzugsfirma/aargau/baden` },
      { url: `${BASE_URL}/umzugsfirma/aargau/zofingen` },
      { url: `${BASE_URL}/umzugsfirma/aargau/brugg` },
      { url: `${BASE_URL}/umzugsfirma/aargau/wettingen` },

      // --- Zürich Alt Şehirler ---
      { url: `${BASE_URL}/umzugsfirma/zuerich/winterthur` },
      { url: `${BASE_URL}/umzugsfirma/zuerich/uster` },
      { url: `${BASE_URL}/umzugsfirma/zuerich/dietikon` },
      { url: `${BASE_URL}/umzugsfirma/zuerich/duebendorf` },
      { url: `${BASE_URL}/umzugsfirma/zuerich/schlieren` },
      { url: `${BASE_URL}/umzugsfirma/zuerich/umzugsofferten-zuerich` },

      // --- Reinigungsfirma Şehirler ---
      { url: `${BASE_URL}/reinigungsfirma` },
      { url: `${BASE_URL}/reinigungsfirma/zuerich` },
      { url: `${BASE_URL}/reinigungsfirma/bern` },
      { url: `${BASE_URL}/reinigungsfirma/basel` },
      { url: `${BASE_URL}/reinigungsfirma/luzern` },
      { url: `${BASE_URL}/reinigungsfirma/genf` },
      { url: `${BASE_URL}/reinigungsfirma/lausanne` },
      { url: `${BASE_URL}/reinigungsfirma/st-gallen` },
      { url: `${BASE_URL}/reinigungsfirma/winterthur` },

      // --- Malerfirma Şehirler ---
      { url: `${BASE_URL}/malerfirma/zuerich` },
      { url: `${BASE_URL}/malerfirma/bern` },
      { url: `${BASE_URL}/malerfirma/basel` },
      { url: `${BASE_URL}/malerfirma/genf` },
      { url: `${BASE_URL}/malerfirma/lausanne` },
      { url: `${BASE_URL}/malerfirma/luzern` },
      { url: `${BASE_URL}/malerfirma/st-gallen` },
      { url: `${BASE_URL}/malerfirma/winterthur` },
    ]
  }

  // ============================================
  // 2: BLOG YAZILARI (Supabase'den — gerçek lastModified)
  // ============================================
  if (id === 2) {
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
      console.error('Sitemap: Blog yazıları çekilemedi', error)
      return []
    }
  }

  // ============================================
  // 3: PARTNER PROFİLLERİ (Supabase'den — gerçek lastModified)
  // ============================================
  if (id === 3) {
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
          lastModified: partner.updated_at ? new Date(partner.updated_at) : undefined,
        }))
    } catch (error) {
      console.error('Sitemap: Partner sayfaları çekilemedi', error)
      return []
    }
  }

  return []
}
