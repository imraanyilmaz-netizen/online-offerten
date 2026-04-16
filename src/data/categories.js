/**
 * Branchen-Modell für Routing unter `app/[category]` und `app/[category]/[...slug]`.
 *
 * - **Kategorie-Hub:** `/{category.slug}` (z. B. /umzugsfirma, /reinigungsfirma)
 * - **Stadt:** `/{category.slug}/{location.slug}` (z. B. /reinigungsfirma/zuerich)
 * - **Leistung:** `/{category.slug}/{service.slug}`
 * - **Leistung + Stadt:** `/{category.slug}/{service.slug}/{location.slug}` (z. B. /umzugsfirma/geschaeftsumzug/zuerich)
 *
 * Pro Leistung: URL-Segment = `service.slug` oder `service.id` (z. B. `privatumzug` → /umzugsfirma/privatumzug).
 *
 * `id` bleibt der stabile Schlüssel (Formulare, SEO-Map, Partner-Logik). `slug` nur setzen,
 * wenn die URL vom id abweichen soll.
 */

/**
 * @param {Array<{ id: string, slug?: string, label: string, desc?: string }>} list
 */
function withServiceSlugs(list) {
  return list.map((s) => ({ ...s, slug: s.slug ?? s.id }))
}

export const serviceCategories = [
  {
    id: 'umzug',
    slug: 'umzugsfirma',
    label: 'Umzug',
    services: withServiceSlugs([
      { id: 'privatumzug', label: 'Privatumzug', desc: 'Wohnung, Haus, WG-Zimmer' },
      { id: 'geschaeftsumzug', label: 'Geschäftsumzug', desc: 'Büro, Ladenlokal, Werkstatt' },
      { id: 'auslandumzug', label: 'Auslandumzug', desc: 'Umzüge ins oder aus dem Ausland' },
      { id: 'spezialtransport', label: 'Spezialtransport', desc: 'Klavier, Tresor, Kunst & mehr' },
      { id: 'kleintransport', label: 'Kleintransport', desc: 'Einzelne Möbel, kleine Lasten' },
      { id: 'lagerung_service', label: 'Lagerung', desc: 'Möbel sicher einlagern' },
      { id: 'umzugsreinigung_opt', label: 'Endreinigung', desc: 'mit Abnahmegarantie' },
      { id: 'raeumung_service', label: 'Räumung' },
      { id: 'entsorgung_service', label: 'Entsorgung' },
    ]),
  },
  {
    id: 'reinigung',
    slug: 'reinigungsfirma',
    label: 'Reinigung',
    services: withServiceSlugs([
      { id: 'wohnungsreinigung', label: 'Wohnungsreinigung' },
      { id: 'hausreinigung', label: 'Hausreinigung' },
      { id: 'buero_reinigung', label: 'Büroreinigung' },
      { id: 'umzugsreinigung', label: 'Endreinigung', desc: 'mit Abnahmegarantie' },
      { id: 'unterhaltsreinigung', label: 'Unterhaltsreinigung' },
      { id: 'grundreinigung', label: 'Grundreinigung' },
      { id: 'baureinigung', label: 'Baureinigung' },
      { id: 'fensterreinigung', label: 'Fensterreinigung' },
      { id: 'bodenreinigung', label: 'Bodenreinigung' },
      { id: 'fassadenreinigung', label: 'Fassadenreinigung' },
      { id: 'hofreinigung', label: 'Hofreinigung' },
      { id: 'raeumung_service', label: 'Räumung' },
      { id: 'entsorgung_service', label: 'Entsorgung' },
    ]),
  },
  {
    id: 'maler',
    slug: 'malerfirma',
    label: 'Malerarbeiten',
    services: withServiceSlugs([{ id: 'maler_service', label: 'Malerarbeiten' }]),
  },
]

/** Alle Hub-Segmente für `generateStaticParams` von `app/[category]`. */
export const categoryHubSlugs = serviceCategories.map((c) => c.slug)

/** URL-Pfadsegment für eine Leistung (immer gesetzt nach `withServiceSlugs`). */
export function getServicePathSegment(service) {
  if (!service) return ''
  return service.slug ?? service.id
}

/** `/{categorySlug}/{segment}` für eine Leistungsdefinition */
export function getCategoryServicePath(categorySlug, service) {
  return `/${categorySlug}/${getServicePathSegment(service)}`
}

/** `/{categorySlug}/{serviceSegment}/{locationSlug}` */
export function getCategoryServiceCityPath(categorySlug, service, locationSlug) {
  return `/${categorySlug}/${getServicePathSegment(service)}/${locationSlug}`
}

/**
 * Statische Params für `app/[category]/[...slug]` (Catch-all, mind. ein Segment).
 * — je Kategorie: alle Städte, alle Leistungen, alle Kombinationen Leistung+Stadt.
 * @param {{ slug: string }[]} locationsList z. B. `locations` aus locations.js
 */
export function generateCategoryCatchAllStaticParams(locationsList) {
  const cityParams = serviceCategories.flatMap((cat) =>
    locationsList.map((loc) => ({ category: cat.slug, slug: [loc.slug] }))
  )
  const serviceParams = serviceCategories.flatMap((cat) =>
    cat.services.map((s) => ({
      category: cat.slug,
      slug: [getServicePathSegment(s)],
    }))
  )
  const serviceCityParams = serviceCategories.flatMap((cat) =>
    cat.services.flatMap((s) =>
      locationsList.map((loc) => ({
        category: cat.slug,
        slug: [getServicePathSegment(s), loc.slug],
      }))
    )
  )
  return [...cityParams, ...serviceParams, ...serviceCityParams]
}

/** @param {string} categoryId */
export function getServiceCategoryById(categoryId) {
  return serviceCategories.find((c) => c.id === categoryId) ?? null
}

/** @param {string} slug Hub-Slug z. B. umzugsfirma */
export function getServiceCategoryBySlug(slug) {
  return serviceCategories.find((c) => c.slug === slug) ?? null
}

/** @param {string} categoryId */
export function getServiceIdsForCategory(categoryId) {
  const cat = getServiceCategoryById(categoryId)
  return cat ? cat.services.map((s) => s.id) : []
}

/**
 * Leistung unter einer Kategorie finden: `segment` ist URL-Segment (slug) oder internes id.
 * @param {string} categorySlug z. B. umzugsfirma
 * @param {string} segment z. B. privatumzug
 */
export function findServiceInCategory(categorySlug, segment) {
  const cat = getServiceCategoryBySlug(categorySlug)
  if (!cat || !segment) return null
  const raw = segment.trim()
  const foldedSeg = foldServiceKey(raw)
  return (
    cat.services.find((s) => {
      const path = getServicePathSegment(s)
      return (
        path === raw ||
        s.id === raw ||
        foldServiceKey(path) === foldedSeg ||
        foldServiceKey(s.id) === foldedSeg
      )
    }) ?? null
  )
}

/** Diakritik vereinheitlichen (z. B. Nutzereingabe «geschäftsumzug» → services[].id geschaeftsumzug). */
function foldServiceKey(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .trim()
}

/** Nur aus `serviceCategories`: Service-IDs (lowercase + fold) → Anzeige-Label */
function buildLabelByServiceId() {
  /** @type {Record<string, string>} */
  const m = {}
  for (const cat of serviceCategories) {
    for (const s of cat.services) {
      const label = s.label
      const idKey = s.id.toLowerCase()
      const slugKey = getServicePathSegment(s).toLowerCase()
      m[idKey] = label
      m[foldServiceKey(s.id)] = label
      if (slugKey !== idKey) {
        m[slugKey] = label
        m[foldServiceKey(getServicePathSegment(s))] = label
      }
    }
  }
  return m
}

const labelByServiceId = buildLabelByServiceId()

/** @param {string} key */
function getSingleGermanServiceName(key) {
  if (!key) return ''
  const raw = key.toLowerCase().trim()
  const folded = foldServiceKey(key)
  if (labelByServiceId[raw]) return labelByServiceId[raw]
  if (labelByServiceId[folded]) return labelByServiceId[folded]
  if (folded.startsWith('malerarbeiten')) return labelByServiceId.maler_service ?? 'Malerarbeiten'
  return key
}

/** Deutsche Anzeigenamen für Service-Schlüssel — ausschließlich über definierte Service-IDs. */
export function getGermanServiceName(key) {
  if (!key) return ''
  const raw = key.toLowerCase().trim()
  const folded = foldServiceKey(key)
  if (labelByServiceId[raw]) return labelByServiceId[raw]
  if (labelByServiceId[folded]) return labelByServiceId[folded]
  const delimiters = / und | and | \+ | & /i
  if (delimiters.test(folded)) {
    return key
      .split(delimiters)
      .map((part) => getSingleGermanServiceName(part.trim()))
      .join(' & ')
  }
  return getSingleGermanServiceName(key)
}
