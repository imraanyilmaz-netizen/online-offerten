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
  // Ortak lastModified tarihi – sitemap yenilendiğinde güncellenir
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    // Ana Sayfa
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },

    // Genel Sayfalar (AGB & Datenschutz sind noindex → nicht in Sitemap)
    {
      url: `${BASE_URL}/kontakt`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/kostenlose-offerte-anfordern`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/kunden-bewertungen`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/offerten-portal`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/partner-suche`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/partner-werden`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/standorte`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/ueber-uns`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },

    // Ratgeber Übersicht
    {
      url: `${BASE_URL}/ratgeber`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },

    // ============================================
    // Umzugsfirma Sayfaları (Ana Servis)
    // ============================================
    {
      url: `${BASE_URL}/umzugsfirma`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umzugsfirma-in-der-naehe`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsfirma-vergleichen`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsofferten`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guenstig-umziehen`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/malerarbeitenkosten`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/raeumung-entsorgung`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Umzugsfirma Dienste (Alt Servisler)
    {
      url: `${BASE_URL}/umzugsfirma/checklists`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/umzugsfirma/geschaeftsumzug`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsfirma/privatumzug`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsfirma/umzugshilfe`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/umzugsfirma/umzugskosten`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugskosten-aargau`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Spezialtransporte
    {
      url: `${BASE_URL}/umzugsfirma/spezialtransporte`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsfirma/spezialtransporte/klaviertransport`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/umzugsfirma/spezialtransporte/klaviertransport/kosten`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // Internationale Umzüge
    {
      url: `${BASE_URL}/umzugsfirma/internationale-umzuege`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-belgien`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-daenemark`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-deutschland`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-frankreich`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-italien`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-oesterreich`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-portugal`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/umzugsfirma/internationale-umzuege/umzug-nach-spanien`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // Umzugsfirma Şehir Sayfaları (Büyük Şehirler)
    {
      url: `${BASE_URL}/umzugsfirma/zuerich`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsfirma/bern`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsfirma/basel`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsfirma/luzern`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsfirma/aargau`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umzugsfirma/genf`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/umzugsfirma/lausanne`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/umzugsfirma/st-gallen`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/umzugsfirma/lugano`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/umzugsfirma/thun`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/umzugsfirma/biel-bienne`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },

    // Aargau Alt Şehirler
    {
      url: `${BASE_URL}/umzugsfirma/aargau/aarau`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/umzugsfirma/aargau/baden`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/umzugsfirma/aargau/zofingen`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/umzugsfirma/aargau/brugg`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/umzugsfirma/aargau/wettingen`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // Zürich Alt Şehirler
    {
      url: `${BASE_URL}/umzugsfirma/zuerich/winterthur`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/umzugsfirma/zuerich/uster`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/umzugsfirma/zuerich/dietikon`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/umzugsfirma/zuerich/duebendorf`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/umzugsfirma/zuerich/schlieren`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/umzugsfirma/zuerich/umzugsofferten-zuerich`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },

    // ============================================
    // Reinigung Sayfaları (Ana Servis)
    // ============================================
    {
      url: `${BASE_URL}/reinigung`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Reinigung Alt Servisleri
    {
      url: `${BASE_URL}/reinigung/umzugsreinigung`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/reinigung/wohnungsreinigung`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/reinigung/bueroreinigung`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/reinigung/grundreinigung`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/reinigung/fensterreinigung`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/reinigung/hausreinigung`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/reinigung/fassadenreinigung`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/reinigung/baureinigung`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/reinigung/bodenreinigung`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/reinigung/hofreinigung`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/reinigung/unterhaltsreinigung`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/reinigung/reinigungskosten`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // Reinigungsfirma Şehir Sayfaları
    {
      url: `${BASE_URL}/reinigungsfirma`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/reinigungsfirma/zuerich`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/reinigungsfirma/bern`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/reinigungsfirma/basel`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/reinigungsfirma/luzern`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/reinigungsfirma/genf`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/reinigungsfirma/lausanne`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/reinigungsfirma/st-gallen`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/reinigungsfirma/winterthur`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },

    // ============================================
    // Malerfirma Sayfaları
    // ============================================
    {
      url: `${BASE_URL}/malerfirma`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/malerfirma/zuerich`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/malerfirma/bern`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/malerfirma/basel`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/malerfirma/genf`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/malerfirma/lausanne`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/malerfirma/luzern`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/malerfirma/st-gallen`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/malerfirma/winterthur`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
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
      .filter((post: any) => post.slug)
      .map((post: any) => ({
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
      .filter((partner: any) => partner.slug)
      .map((partner: any) => ({
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

