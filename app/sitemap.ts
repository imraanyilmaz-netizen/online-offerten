import { MetadataRoute } from 'next'
import { createStaticClient } from '@/lib/supabase/server'

// ISR: Sitemap her 1 saatte bir arka planda yenilenir
// Yeni blog yazıları veya partner sayfaları max 1 saat içinde sitemap'e eklenir
export const revalidate = 3600

const BASE_URL = 'https://online-offerten.ch'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createStaticClient()

  // ============================================
  // 1. STATIK SAYFALAR (kodda sabit)
  // ============================================
  const staticPages: MetadataRoute.Sitemap = [
    // Ana Sayfa
    {
      url: `${BASE_URL}/`,
      changeFrequency: 'daily',
      priority: 1.0,
    },

    // Genel Sayfalar
    {
      url: `${BASE_URL}/agb`,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/datenschutz`,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/kontakt`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/kostenlose-offerte-anfordern`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/kunden-bewertungen`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/offerten-portal`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/partner-suche`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/partner-werden`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/standorte`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ueber-uns`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },

    // Ratgeber Übersicht
    {
      url: `${BASE_URL}/ratgeber`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // ============================================
    // Umzugsfirma Sayfaları
    // ============================================
    {
      url: `${BASE_URL}/umzugsfirma`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzugsfirma-in-der-naehe`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsfirma-vergleichen`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzugsofferten`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guenstig-umziehen`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/malerarbeitenkosten`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/raeumung-entsorgung`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // Umzugsfirma Dienste
    {
      url: `${BASE_URL}/umzugsfirma/checklists`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzugsfirma/geschaeftsumzug`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzugsfirma/privatumzug`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzugsfirma/umzugshilfe`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzugsfirma/umzugskosten`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzugskosten-aargau`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // Spezialtransporte
    {
      url: `${BASE_URL}/umzugsfirma/spezialtransporte`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzugsfirma/spezialtransporte/klaviertransport`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzugsfirma/spezialtransporte/klaviertransport/kosten`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // Internationale Umzüge
    {
      url: `${BASE_URL}/umzugsfirma/internationale-umzuege`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-belgien`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-daenemark`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-deutschland`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-frankreich`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-italien`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-oesterreich`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-portugal`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-spanien`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Umzugsfirma Şehir Sayfaları
    {
      url: `${BASE_URL}/umzugsfirma/aargau`,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/umzugsfirma/basel`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzugsfirma/bern`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzugsfirma/biel-bienne`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzugsfirma/genf`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzugsfirma/lausanne`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzugsfirma/lugano`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzugsfirma/luzern`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzugsfirma/st-gallen`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzugsfirma/thun`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzugsfirma/zuerich`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // Aargau Alt Şehirler
    {
      url: `${BASE_URL}/umzugsfirma/aargau/aarau`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsfirma/aargau/baden`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsfirma/aargau/zofingen`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsfirma/aargau/brugg`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsfirma/aargau/wettingen`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // Zürich Alt Şehirler
    {
      url: `${BASE_URL}/umzugsfirma/zuerich/winterthur`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsfirma/zuerich/uster`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsfirma/zuerich/dietikon`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsfirma/zuerich/duebendorf`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsfirma/zuerich/schlieren`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsfirma/zuerich/umzugsofferten-zuerich`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // ============================================
    // Reinigung Sayfaları
    // ============================================
    {
      url: `${BASE_URL}/reinigung`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reinigung/baureinigung`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reinigung/bodenreinigung`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reinigung/bueroreinigung`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reinigung/fassadenreinigung`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reinigung/fensterreinigung`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reinigung/grundreinigung`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reinigung/hausreinigung`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reinigung/hofreinigung`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reinigung/umzugsreinigung`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reinigung/unterhaltsreinigung`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reinigung/wohnungsreinigung`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reinigung/reinigungskosten`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // Reinigungsfirma Şehir Sayfaları
    {
      url: `${BASE_URL}/reinigungsfirma`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/reinigungsfirma/zuerich`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reinigungsfirma/basel`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reinigungsfirma/bern`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reinigungsfirma/genf`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reinigungsfirma/lausanne`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reinigungsfirma/luzern`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reinigungsfirma/st-gallen`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/reinigungsfirma/winterthur`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // ============================================
    // Malerfirma Sayfaları
    // ============================================
    {
      url: `${BASE_URL}/malerfirma`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/malerfirma/zuerich`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/malerfirma/basel`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/malerfirma/bern`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/malerfirma/genf`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/malerfirma/lausanne`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/malerfirma/luzern`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/malerfirma/st-gallen`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/malerfirma/winterthur`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // ============================================
  // 2. DİNAMİK BLOG YAZILARI (Supabase'den)
  // ============================================
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const { data: posts } = await supabase
      .from('posts')
      .select('slug, updated_at, published_at, created_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    blogPages = (posts || [])
      .filter(post => post.slug)
      .map(post => ({
        url: `${BASE_URL}/ratgeber/${post.slug}`,
        lastModified: new Date(post.updated_at || post.published_at || post.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
  } catch (error) {
    console.error('Sitemap: Blog yazıları çekilemedi', error)
  }

  // ============================================
  // 3. DİNAMİK PARTNER SAYFALARI (Supabase'den)
  // ============================================
  let partnerPages: MetadataRoute.Sitemap = []
  try {
    const { data: partners } = await supabase
      .from('partners')
      .select('slug, updated_at')
      .eq('status', 'active')
      .not('slug', 'is', null)

    partnerPages = (partners || [])
      .filter(partner => partner.slug)
      .map(partner => ({
        url: `${BASE_URL}/partner/${partner.slug}`,
        lastModified: partner.updated_at ? new Date(partner.updated_at) : undefined,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))
  } catch (error) {
    console.error('Sitemap: Partner sayfaları çekilemedi', error)
  }

  // Tüm sayfaları birleştir
  return [...staticPages, ...blogPages, ...partnerPages]
}

