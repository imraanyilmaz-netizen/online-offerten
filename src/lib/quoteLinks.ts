/** Deep links into kostenlose-offerte-anfordern by category + service id (matches categories.js). */
export function quoteHrefForCategoryService(categorySlug: string, serviceId: string): string {
  if (categorySlug === 'umzugsfirma') {
    if (serviceId === 'raeumung_service') {
      return '/kostenlose-offerte-anfordern?service=raeumung&step=2&raeumungArt=raeumung'
    }
    if (serviceId === 'entsorgung_service') {
      return '/kostenlose-offerte-anfordern?service=raeumung&step=3&raeumungArt=entsorgung'
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
