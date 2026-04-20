import type { Metadata } from 'next'
import { getServiceCategoryBySlug, findServiceInCategory } from '@/data/categories'
import { locations } from '@/data/locations'
import { resolveCategoryCatchAll } from '@/lib/categoryCatchAllResolve'
import { getPartnersForCategoryLocation } from '@/lib/partners/forLocation'

/**
 * Entscheidet, ob eine Stadt-Landingpage derzeit „thin" ist
 * (keine echten Partner verknüpft) und deshalb besser `noindex` bekommt.
 *
 * Google bewertet so eine Seite nicht negativ gegen die Gesamt-Site, und das
 * Crawl-Budget geht an Seiten mit echtem Inhalt. `follow: true` bleibt, damit
 * interne Links (z.B. zu Ratgeber, andere Städte) weiterhin Linkjuice leiten.
 *
 * Hinweis: `getPartnersForCategoryLocation` ist mit `react.cache` versehen –
 * dieselbe Abfrage in der Page-Komponente läuft daher innerhalb desselben
 * Requests nur einmal.
 */
async function shouldNoindexDueToThinCity(
  rawCategory: string,
  segments: string[]
): Promise<boolean> {
  const cat = getServiceCategoryBySlug(rawCategory)
  if (!cat) return false
  const segs = segments.filter(Boolean)

  if (segs.length === 1) {
    const loc = locations.find((l) => l.slug === segs[0])
    if (!loc) return false
    const partners = await getPartnersForCategoryLocation(cat.slug, {
      name: loc.name,
      slug: loc.slug,
      canton: loc.canton,
    })
    return partners.length === 0
  }

  if (segs.length === 2) {
    const svc = findServiceInCategory(cat.slug, segs[0])
    if (!svc) return false
    // Auslandumzug hat keine Partner-basierte Stadt-Struktur – niemals noindex
    if (svc.id === 'auslandumzug') return false
    const loc = locations.find((l) => l.slug === segs[1])
    if (!loc) return false
    const partners = await getPartnersForCategoryLocation(cat.slug, {
      name: loc.name,
      slug: loc.slug,
      canton: loc.canton,
    })
    return partners.length === 0
  }

  return false
}

export async function buildCategoryCatchAllMetadata(
  rawCategory: string,
  segments: string[],
): Promise<Metadata> {
  const resolved = resolveCategoryCatchAll(rawCategory, segments)
  if (!resolved) return { title: 'Seite nicht gefunden' }

  const { title, description, canonical } = resolved
  const noindex = await shouldNoindexDueToThinCity(rawCategory, segments)

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Online-Offerten.ch',
      locale: 'de_CH',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: noindex
      ? {
          index: false,
          follow: true,
          googleBot: { index: false, follow: true },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  }
}
