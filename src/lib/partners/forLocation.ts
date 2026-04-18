import { createStaticClient } from '@/src/lib/supabase/server'
import { cantonMap } from '@/data/locations'

/** URL-Slug der Kategorie → main_categories in DB */
const CATEGORY_SLUG_TO_MAIN: Record<string, string> = {
  umzugsfirma: 'umzug',
  reinigungsfirma: 'reinigung',
  malerfirma: 'maler',
}

function fold(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .trim()
}

export type LocationForPartners = {
  name: string
  slug: string
  canton: string
}

function locationNameVariants(name: string): string[] {
  const parts = name.split('/').map((p) => fold(p.trim())).filter(Boolean)
  const variants = new Set<string>()
  for (const p of parts) {
    variants.add(p)
    variants.add(p.replace(/[^a-z0-9äöü]/g, ''))
  }
  variants.add(fold(name.replace(/\s*\/\s*/g, ' ')))
  return [...variants].filter((v) => v.length >= 3)
}

function partnerMatchesLocation(
  partner: {
    address_city?: string | null
    service_regions?: unknown
  },
  loc: LocationForPartners
): boolean {
  const cityFold = fold(partner.address_city || '')
  for (const v of locationNameVariants(loc.name)) {
    if (v.length >= 4 && cityFold.includes(v)) return true
    if (v.length >= 3 && cityFold.includes(v)) return true
  }

  const slugSpaced = fold(loc.slug.replace(/-/g, ' '))
  if (slugSpaced.length >= 4 && cityFold.includes(slugSpaced)) return true

  const cantonName = cantonMap[loc.canton as keyof typeof cantonMap]
  const cantonFold = cantonName ? fold(cantonName) : ''
  const cantonShort = fold(loc.canton)

  const regions = Array.isArray(partner.service_regions) ? partner.service_regions : []
  const regionStrs = regions.map((r) => fold(String(r)))

  for (const r of regionStrs) {
    if (!r) continue
    if (r === cantonShort || r === fold(loc.slug)) return true
    if (
      cantonFold &&
      (r === cantonFold || r.includes(cantonFold) || cantonFold.includes(r))
    ) {
      return true
    }
    for (const v of locationNameVariants(loc.name)) {
      if (v.length >= 4 && (r.includes(v) || v.includes(r))) return true
    }
    if (slugSpaced.length >= 4 && r.includes(slugSpaced)) return true
  }

  return false
}

export async function getPartnersForCategoryLocation(
  categorySlug: string,
  location: LocationForPartners
) {
  const main = CATEGORY_SLUG_TO_MAIN[categorySlug]
  if (!main) return []

  try {
    const supabase = createStaticClient()
    const { data: rows, error } = await supabase
      .from('partners')
      .select(
        'id, company_name, slug, address_street, address_city, address_zip, main_categories, service_regions, average_rating, review_count, logo_url, hero_image_url, message, badge_tier'
      )
      .eq('status', 'active')
      .not('company_name', 'is', null)
      .contains('main_categories', [main])

    if (error || !rows?.length) return []

    const filtered = rows.filter((p) => partnerMatchesLocation(p, location))
    filtered.sort((a, b) => {
      const ra = a.average_rating || 0
      const rb = b.average_rating || 0
      if (rb !== ra) return rb - ra
      return (b.review_count || 0) - (a.review_count || 0)
    })
    return filtered
  } catch {
    return []
  }
}
