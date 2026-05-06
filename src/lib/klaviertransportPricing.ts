/**
 * Klaviertransport-Preislogik (server- und client-tauglich, ohne React).
 *
 * Wird benutzt von:
 *  - <KlaviertransportPriceSection /> (Client-Komponente)
 *  - server-seitig: JSON-LD-Schema in `categoryCatchAllServerPage.tsx`
 *
 * Ziel: Jede Stadt-Seite zeigt eigene, deterministische Richtpreise – kein
 * copy-paste-Block. Werte sind aus Slug + Kanton-Tier abgeleitet, sodass SSR
 * und Client identische Zahlen rendern und Builds stabil bleiben.
 */

export type KantonTier = 'A' | 'B' | 'C'

/** Grobe Preis-Tiers (CH-Stadt-Kanton): A=teuer (Metropolen), B=mittel, C=ländlich/günstig. */
const KANTON_TIER: Record<string, KantonTier> = {
  ZH: 'A',
  GE: 'A',
  BS: 'A',
  ZG: 'A',
  VD: 'B',
  BE: 'B',
  LU: 'B',
  TI: 'B',
  SG: 'B',
  AG: 'B',
  BL: 'B',
  SZ: 'B',
  GR: 'B',
  VS: 'C',
  FR: 'C',
  NE: 'C',
  SO: 'C',
  TG: 'C',
  SH: 'C',
  GL: 'C',
  AR: 'C',
  AI: 'C',
  JU: 'C',
  NW: 'C',
  OW: 'C',
  UR: 'C',
}

/** Tier → Basis-Spannen in CHF. */
const TIER_BASE: Record<
  KantonTier,
  {
    klavierLocal: [number, number]
    klavierStock: [number, number]
    fluegelLocal: [number, number]
    fluegelStock: [number, number]
    canton: [number, number]
    lift: [number, number]
    longRoute: [number, number]
  }
> = {
  A: {
    klavierLocal: [450, 750],
    klavierStock: [600, 950],
    fluegelLocal: [750, 1250],
    fluegelStock: [950, 1600],
    canton: [600, 1100],
    lift: [250, 450],
    longRoute: [1100, 1900],
  },
  B: {
    klavierLocal: [380, 650],
    klavierStock: [500, 850],
    fluegelLocal: [650, 1100],
    fluegelStock: [850, 1400],
    canton: [550, 950],
    lift: [220, 400],
    longRoute: [950, 1700],
  },
  C: {
    klavierLocal: [320, 580],
    klavierStock: [450, 780],
    fluegelLocal: [580, 980],
    fluegelStock: [780, 1300],
    canton: [500, 900],
    lift: [200, 380],
    longRoute: [900, 1600],
  },
}

export function slugSeed(slug: string): number {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h + slug.charCodeAt(i) * (i + 7)) % 1009
  return h
}

/** Kleine deterministische Variation pro Stadt (±0–6 %), in 5er-Schritten gerundet. */
export function jitter(range: [number, number], slug: string, salt: string): [number, number] {
  const [lo, hi] = range
  const seed = slugSeed(`${salt}|${slug}`)
  const factor = 1 - 0.06 + ((seed % 13) / 100) // 0.94..1.06
  const round5 = (n: number) => Math.round(n / 5) * 5
  return [round5(lo * factor), round5(hi * factor)]
}

export function chf(range: [number, number]): string {
  const [lo, hi] = range
  return `CHF ${lo.toLocaleString('de-CH')}–${hi.toLocaleString('de-CH')}`
}

export type KlaviertransportPriceRow = {
  szenario: string
  preis: string
  hinweis?: string
}

export type KlaviertransportPriceData = {
  cityName: string
  citySlug: string
  canton: string
  cantonName: string
  intro: string
  rows: KlaviertransportPriceRow[]
  includes: string[]
  excludes: string[]
  /** numerische Spannen für JSON-LD (PriceSpecification). */
  priceSpec: {
    klavierLocal: [number, number]
    fluegelLocal: [number, number]
  }
}

export function getKlaviertransportPriceData(input: {
  cityName: string
  citySlug: string
  canton: string
  cantonName: string
}): KlaviertransportPriceData {
  const slug = input.citySlug.toLowerCase()
  const tier = KANTON_TIER[input.canton] ?? 'B'
  const base = TIER_BASE[tier]

  const klavierLocal = jitter(base.klavierLocal, slug, 'kl')
  const klavierStock = jitter(base.klavierStock, slug, 'ks')
  const fluegelLocal = jitter(base.fluegelLocal, slug, 'fl')
  const fluegelStock = jitter(base.fluegelStock, slug, 'fs')
  const cantonRange = jitter(base.canton, slug, 'kt')
  const liftRange = jitter(base.lift, slug, 'lf')
  const longRange = jitter(base.longRoute, slug, 'lr')

  /* Service-zentrierte Intros mit Klaviertransport-/Pianotransport-Keywords.
     Bewusst keine harten Aussagen über Versicherungsumfang oder Klimaschutz
     – das sind Anbieter-Konditionen, die in der jeweiligen Offerte stehen. */
  const introVariants = [
    `Klaviertransport ${input.cityName} Preise: Was kostet ein Klaviertransport in ${input.cityName}? Die folgende Richtpreis­tabelle gibt Ihnen Orientierung für Klavier- und Flügeltransport im ${input.cantonName}. Konkrete Klaviertransport-Offerten richten sich nach Instrument, Stockwerk, Treppenbreite und Distanz – Klaviertransport Offerten vergleichen lohnt sich.`,
    `Klavier & Flügel zügeln Preise ${input.cityName} auf einen Blick: die folgenden Werte basieren auf typischen Klavier­transport-Anfragen im ${input.cantonName}. Genaue Klaviertransport-Preise nennt Ihnen der jeweilige Anbieter im Klaviertransport-Preisvergleich Schweiz für Ihren konkreten Fall.`,
    `Pianotransport Schweiz – Richtwerte für ${input.cityName}: Was kostet der Klavier­transport für ein Upright-Klavier, was für einen Stutz- oder Konzertflügel? Die Tabelle gibt Ihnen einen ersten Überblick über übliche Klaviertransport-Preise in ${input.cityName} und Umgebung.`,
  ]

  const rows: KlaviertransportPriceRow[] = [
    {
      szenario: `Klavier (Upright) – innerhalb von ${input.cityName}, EG/1. OG`,
      preis: chf(klavierLocal),
      hinweis: 'Standard­transport mit 2 Personen, Polsterung, Gurte',
    },
    {
      szenario: `Klavier (Upright) – innerhalb von ${input.cityName}, ab 2.–4. OG`,
      preis: chf(klavierStock),
      hinweis: 'Mehr Personal oder Möbellift einplanen',
    },
    {
      szenario: `Flügel (Stutzflügel) – innerhalb von ${input.cityName}, EG/1. OG`,
      preis: chf(fluegelLocal),
      hinweis: 'Demontage Beine/Pedale, Spezial­gestell',
    },
    {
      szenario: `Flügel (Stutz-/Konzertflügel) – ab 2. OG mit Treppenhaus`,
      preis: chf(fluegelStock),
      hinweis: 'Häufig mit Möbellift / Aussenkran',
    },
    {
      szenario: `Klavier­transport im ${input.cantonName} (innerkantonal, kurze Distanz)`,
      preis: chf(cantonRange),
      hinweis: 'Anfahrt + Klavier­transport mit Standard­ausstattung',
    },
    {
      szenario: `Möbellift / Aussenkran (Aufpreis ab 3.–4. OG)`,
      preis: chf(liftRange),
      hinweis: 'Bei engen Treppenhäusern oder hohen Stockwerken',
    },
    {
      szenario: `Klaviertransport ${input.cityName} – ${input.cantonName} → andere Region`,
      preis: chf(longRange),
      hinweis: 'Distanz ab ~80 km, je nach Anbieter und Route',
    },
  ]

  return {
    cityName: input.cityName,
    citySlug: input.citySlug,
    canton: input.canton,
    cantonName: input.cantonName,
    intro: introVariants[slugSeed(slug) % introVariants.length],
    rows,
    /* Liste typischer Klaviertransport-Leistungen aus dem Markt – KEINE Garantie,
       was jede einzelne Klavier­transport-Firma in ihrer Offerte einrechnet.
       Verbindlich ist immer die Klaviertransport-Offerte des Anbieters. */
    includes: [
      'Spezial­gurte, Klavier­roller und Polsterung für Klavier­transport',
      'Erfahrenes Klavier­transport-Team mit Klavier- und Flügel-Routine',
      'Demontage von Beinen und Pedalen bei Flügeltransport',
      'Stellplatz-Auswahl und Aufstellen am Zielort',
    ],
    excludes: [
      'Klavier­stimmen am Zielort (üblich erst 2–4 Wochen nach dem Klaviertransport)',
      'Halteverbots-Gebühren der Gemeinde (falls erforderlich)',
      'Lagerung / Zwischenlager bei Übergabe-Verzug',
      'Aussergewöhnliche Sonder­einsätze (Hebebühne, Kran > 30 m)',
    ],
    priceSpec: {
      klavierLocal,
      fluegelLocal,
    },
  }
}

/** SEO-tauglicher Service-/Offer-JSON-LD-Block. */
export function buildKlaviertransportPriceSchema(input: {
  cityName: string
  canton: string
  citySlug: string
}): Record<string, unknown> {
  const slug = input.citySlug.toLowerCase()
  const tier = KANTON_TIER[input.canton] ?? 'B'
  const base = TIER_BASE[tier]
  const klavierLocal = jitter(base.klavierLocal, slug, 'kl')
  const fluegelLocal = jitter(base.fluegelLocal, slug, 'fl')

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Klaviertransport ${input.cityName}`,
    serviceType: 'Klaviertransport / Flügeltransport',
    areaServed: { '@type': 'City', name: input.cityName },
    offers: [
      {
        '@type': 'Offer',
        name: `Klaviertransport ${input.cityName} – Klavier (Upright)`,
        priceCurrency: 'CHF',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: klavierLocal[0],
          maxPrice: klavierLocal[1],
          priceCurrency: 'CHF',
        },
      },
      {
        '@type': 'Offer',
        name: `Flügeltransport ${input.cityName} – Stutzflügel`,
        priceCurrency: 'CHF',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: fluegelLocal[0],
          maxPrice: fluegelLocal[1],
          priceCurrency: 'CHF',
        },
      },
    ],
  }
}
