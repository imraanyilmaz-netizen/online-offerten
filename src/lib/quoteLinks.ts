/** Deep links into kostenlose-offerte-anfordern by category + service id (matches categories.js). */
export function quoteHrefForCategoryService(
  categorySlug: string,
  serviceId: string,
  /** ISO2 Zielland (nur Auslandumzug), z. B. DE – setzt `ziel` für Step 2 Länder-Felder */
  internationalZielCode?: string
): string {
  if (categorySlug === 'umzugsfirma') {
    if (serviceId === 'raeumung_service') {
      return '/kostenlose-offerte-anfordern?service=raeumung&step=2&raeumungArt=raeumung'
    }
    if (serviceId === 'entsorgung_service') {
      return '/kostenlose-offerte-anfordern?service=raeumung&step=3&raeumungArt=entsorgung'
    }
    // Form / Step1 use id `international`, not categories.js `auslandumzug`
    if (serviceId === 'auslandumzug') {
      const base =
        '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=international'
      if (internationalZielCode && /^[A-Za-z]{2}$/.test(internationalZielCode.trim())) {
        return `${base}&ziel=${encodeURIComponent(internationalZielCode.trim().toUpperCase())}`
      }
      return base
    }
    return `/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=${encodeURIComponent(serviceId)}`
  }

  if (categorySlug === 'reinigungsfirma') {
    if (serviceId === 'raeumung_service') {
      return '/kostenlose-offerte-anfordern?service=raeumung&step=2&raeumungArt=raeumung'
    }
    if (serviceId === 'entsorgung_service') {
      return '/kostenlose-offerte-anfordern?service=raeumung&step=3&raeumungArt=entsorgung'
    }
    return `/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=${encodeURIComponent(serviceId)}`
  }

  return '/kostenlose-offerte-anfordern?service=maler&step=2'
}
