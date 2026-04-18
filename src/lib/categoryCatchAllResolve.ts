import {
  findServiceInCategory,
  getServiceCategoryBySlug,
} from '@/data/categories'
import { findPopularDestinationBySlug } from '@/data/internationalPopularDestinations'
import { locations } from '@/data/locations'
import {
  getServiceCityLandingMetadata,
  getServiceLandingMetadata,
} from '@/lib/serviceLanding/metadata'

const SITE = 'https://online-offerten.ch'

const SERVICE_TITLE: Record<string, string> = {
  umzugsfirma: 'Umzugsfirma',
  reinigungsfirma: 'Reinigungsfirma',
  malerfirma: 'Malerfirma',
}

export type ResolvedCategoryCatchAll = {
  title: string
  description: string
  canonical: string
}

export function resolveCategoryCatchAll(
  rawCategory: string,
  segmentList: string[] | undefined,
): ResolvedCategoryCatchAll | null {
  const cat = getServiceCategoryBySlug(rawCategory)
  if (!cat) return null

  const segs = Array.isArray(segmentList) ? segmentList.filter(Boolean) : []
  if (segs.length === 0 || segs.length > 2) return null

  if (segs.length === 1) {
    const only = segs[0]
    const loc = locations.find((l) => l.slug === only)
    if (loc) {
      const st = SERVICE_TITLE[cat.slug] || 'Anbieter'
      const title = `${st} ${loc.name} – Offerten vergleichen`
      const description = `${st} in ${loc.name} (Kanton ${loc.canton}): Geprüfte Anbieter vergleichen, kostenlose Offerten anfordern und bis zu 40% sparen.`
      const canonical = `${SITE}/${cat.slug}/${loc.slug}`
      return { title, description, canonical }
    }

    const svcMeta = getServiceLandingMetadata(cat.slug, only)
    if (!svcMeta) return null
    const { title, description, canonical } = svcMeta
    return { title, description, canonical }
  }

  const [serviceSeg, citySeg] = segs
  const svcForSeg = findServiceInCategory(cat.slug, serviceSeg)
  if (svcForSeg?.id === 'auslandumzug') {
    const dest = findPopularDestinationBySlug(citySeg)
    if (dest) {
      return {
        title: dest.metaTitle,
        description: dest.metaDescription,
        canonical: `${SITE}/${cat.slug}/auslandumzug/${dest.slug}`,
      }
    }
  }

  const loc = locations.find((l) => l.slug === citySeg)
  if (!loc) return null
  const svcMeta = getServiceCityLandingMetadata(cat.slug, serviceSeg, loc)
  if (!svcMeta) return null
  const { title, description, canonical } = svcMeta
  return { title, description, canonical }
}
