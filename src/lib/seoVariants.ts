/**
 * Deterministische Title/Description-Varianten für Stadt-Landingpages.
 *
 * Ziel:
 *  - Keine 100 % identischen Templates über alle Seiten (verhindert „doorway"/
 *    spammy-Signale & Title-Rewrites durch Google)
 *  - Pro Stadt-/Service-Kombination eine stabile, zufällig wirkende Variante
 *  - Keywords (Service, Stadt, "Kostenlose Offerten", "bis zu 40%") bleiben in
 *    jeder Variante erhalten – nur Formulierung ändert sich natürlich.
 */

/** Einfacher, deterministischer Hash (identisch zum slugChecksum in cityHeroImage). */
function slugHash(key: string): number {
  let h = 0
  for (let i = 0; i < key.length; i++) {
    h = (h + key.charCodeAt(i) * (i + 1)) % 1009
  }
  return h
}

function pick<T>(arr: readonly T[], key: string): T {
  return arr[slugHash(key) % arr.length]
}

// ---------------------------------------------------------------------------
// City-only  —  /{category}/{stadt}
// ---------------------------------------------------------------------------

type CityCtx = {
  branche: string // z.B. "Umzugsfirma"
  branchePlural: string // z.B. "Umzugsfirmen"
  stadt: string
  kanton: string
}

const CITY_TITLE_VARIANTS = [
  ({ branche, stadt }: CityCtx) =>
    `${branche} ${stadt}: Kostenlose Offerten vergleichen & bis zu 40% sparen`,
  ({ branche, stadt }: CityCtx) =>
    `${branche} in ${stadt} finden – Offerten vergleichen & sparen`,
  ({ branchePlural, stadt, kanton }: CityCtx) =>
    `Top ${branchePlural} in ${stadt} (${kanton}) – jetzt Offerten einholen`,
  ({ branche, stadt }: CityCtx) =>
    `${stadt}: ${branche} vergleichen & bis zu 5 Offerten erhalten`,
  ({ branche, stadt }: CityCtx) =>
    `${branche} ${stadt} gesucht? Kostenlose Offerten vergleichen`,
] as const

const CITY_DESC_VARIANTS = [
  ({ branche, stadt, kanton }: CityCtx) =>
    `${branche} in ${stadt} (Kanton ${kanton}) finden: Bis zu 5 kostenlose Offerten von geprüften Anbietern vergleichen und bis zu 40% sparen – schnell, regional & unverbindlich.`,
  ({ branche, stadt }: CityCtx) =>
    `Sie suchen eine ${branche} in ${stadt}? Vergleichen Sie kostenlose Offerten von geprüften Anbietern und sparen Sie bis zu 40% – regional, schnell und unverbindlich.`,
  ({ branchePlural, stadt }: CityCtx) =>
    `${branchePlural} in ${stadt} kostenlos vergleichen: Fordern Sie bis zu 5 Offerten von geprüften Profis an und sparen Sie bis zu 40% – einfach, transparent und unverbindlich.`,
  ({ branchePlural, stadt, kanton }: CityCtx) =>
    `Geprüfte ${branchePlural} in ${stadt} (${kanton}) und Umgebung: Offerten kostenlos vergleichen, Preise direkt senken und bis zu 40% sparen – unverbindlich.`,
] as const

/** Deterministische Variante anhand eines stabilen Schlüssels (z.B. city slug). */
export function cityLandingVariants(ctx: CityCtx, hashKey: string): {
  title: string
  description: string
} {
  const titleFn = pick(CITY_TITLE_VARIANTS, `t|${hashKey}`)
  const descFn = pick(CITY_DESC_VARIANTS, `d|${hashKey}`)
  return { title: titleFn(ctx), description: descFn(ctx) }
}

// ---------------------------------------------------------------------------
// Service + City  —  /{category}/{service}/{stadt}
// ---------------------------------------------------------------------------

type SvcCityCtx = {
  service: string // z.B. "Privatumzug"
  stadt: string
  kanton: string
  branche: string // z.B. "Umzugsfirma"
  branchePlural: string // z.B. "Umzugsfirmen"
}

const SVC_CITY_TITLE_VARIANTS = [
  ({ service, stadt }: SvcCityCtx) =>
    `${service} ${stadt}: Kostenlose Offerten vergleichen & bis zu 40% sparen`,
  ({ service, stadt }: SvcCityCtx) =>
    `${service} in ${stadt} – Offerten vergleichen & Geld sparen`,
  ({ service, stadt, kanton }: SvcCityCtx) =>
    `${service} ${stadt} (${kanton}): Jetzt kostenlose Offerten einholen`,
  ({ service, stadt }: SvcCityCtx) =>
    `${service} ${stadt}: Bis zu 5 Offerten von geprüften Anbietern`,
  ({ service, stadt }: SvcCityCtx) =>
    `Günstige ${service} in ${stadt} – Offerten kostenlos vergleichen`,
] as const

const SVC_CITY_DESC_VARIANTS = [
  ({ service, stadt, kanton }: SvcCityCtx) =>
    `${service} in ${stadt} (Kanton ${kanton}): Bis zu 5 kostenlose Offerten von geprüften Anbietern vergleichen und bis zu 40% sparen – schnell, regional & unverbindlich.`,
  ({ service, stadt }: SvcCityCtx) =>
    `Sie planen ${service} in ${stadt}? Jetzt kostenlose Offerten von geprüften Profis vergleichen und bis zu 40% sparen – unverbindlich & transparent.`,
  ({ service, stadt, branchePlural }: SvcCityCtx) =>
    `${service} in ${stadt}: Kostenlos bis zu 5 Offerten von geprüften ${branchePlural} einholen, Preise vergleichen und den besten Anbieter Ihrer Region wählen.`,
  ({ service, stadt, kanton, branchePlural }: SvcCityCtx) =>
    `Geprüfte ${branchePlural} für ${service} in ${stadt} (${kanton}): Offerten kostenlos vergleichen und bis zu 40% sparen – schnell & unverbindlich.`,
] as const

export function serviceCityLandingVariants(ctx: SvcCityCtx, hashKey: string): {
  title: string
  description: string
} {
  const titleFn = pick(SVC_CITY_TITLE_VARIANTS, `t|${hashKey}`)
  const descFn = pick(SVC_CITY_DESC_VARIANTS, `d|${hashKey}`)
  return { title: titleFn(ctx), description: descFn(ctx) }
}
