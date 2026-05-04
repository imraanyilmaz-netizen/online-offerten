/**
 * Server-only Migration-Statistik-Helfer.
 *
 * - Wird sowohl von der API-Route (`/api/stats/migration/[slug]`) als auch
 *   direkt von Server-Pages (z. B. `categoryCatchAllServerPage.tsx`) genutzt.
 * - Greift direkt auf den BFS-PXWeb-Adapter zu (kein eigener HTTP-Hop).
 * - Liefert sowohl die rohen Daten als auch fertig formatierte SEO-Texte
 *   und FAQ-Einträge (für JSON-LD).
 */

import 'server-only'

import {
  BFS_CANTON_BY_SLUG,
  BFS_CANTON_LABEL,
  BFS_GEMEINDE_NR_BY_SLUG,
} from '@/data/bfsLocationIds'
import {
  aggregateMigrationRows,
  getMigrationStatsForGemeinde,
  getMigrationStatsForKanton,
  type MigrationCubeResult,
} from '@/lib/bfs/migrationCube'
import type { CityFaqItem } from '@/lib/cityPageFaqs'

export type CityMigrationData = {
  scope: 'gemeinde' | 'kanton'
  scopeName: string
  fallbackUsed: boolean
  yearRange: [number, number]
  latestYear: number
  metrics: {
    years: number[]
    zuzuege: number[]
    wegzuege: number[]
    saldo: number[]
    intrakantonalZu: number[]
    intrakantonalWeg: number[]
  }
  totals: {
    /** Aktuellster Jahreswert (latestYear). */
    lastZ: number
    lastW: number
    lastSaldo: number
    /** Anteil der Zuzüge aus dem gleichen Kanton im latestYear (0..1). */
    intraShareLast: number
    /** Year-over-Year (latestYear vs. latestYear-1). */
    previousYear: number | null
    previousYearZ: number | null
    previousYearW: number | null
    previousYearSaldo: number | null
    /** Prozentuale YoY-Veränderung der Zuzüge. `null` wenn Vorjahr nicht verfügbar. */
    yoyZuzuegePct: number | null
    /** Prozentuale YoY-Veränderung der Wegzüge. `null` wenn Vorjahr nicht verfügbar. */
    yoyWegzuegePct: number | null
  }
  source: {
    publisher: string
    publisherShort: string
    cubeId: string
    cubeTitle: string
    catalogUrl: string
    opendataSwiss: string
    license: string
    displayName: string
  }
}

const SOURCE_META = {
  publisher: 'Bundesamt für Statistik (BFS)',
  publisherShort: 'BFS',
  cubeId: 'px-x-0102020000_201',
  cubeTitle: 'Demografische Bilanz nach institutionellen Gliederungen',
  catalogUrl:
    'https://www.bfs.admin.ch/bfs/de/home/statistiken/bevoelkerung/migration-integration.html',
  opendataSwiss: 'https://opendata.swiss/de/dataset?keywords_de=Wanderung',
  license: 'opendata.swiss-Nutzungsbedingungen (CC BY)',
}

/**
 * Lädt BFS-Daten für eine City (Gemeinde-bevorzugt, Fallback Kanton).
 * Liefert null, falls weder Gemeinde- noch Kantonsdaten verfügbar sind.
 */
export async function getCityMigrationData(
  slug: string,
  cityName: string
): Promise<CityMigrationData | null> {
  const cleanSlug = String(slug || '').trim().toLowerCase()
  if (!cleanSlug) return null

  const bfsNr = BFS_GEMEINDE_NR_BY_SLUG[cleanSlug]
  const cantonCode = BFS_CANTON_BY_SLUG[cleanSlug]
  if (!bfsNr && !cantonCode) return null

  let result: MigrationCubeResult | null = null
  let fallbackUsed = false

  if (bfsNr) {
    try {
      result = await getMigrationStatsForGemeinde(bfsNr, cityName)
    } catch (err) {
      console.warn(
        `[migrationStats] Gemeinde-Abfrage fehlgeschlagen für ${cleanSlug} (BFS ${bfsNr}):`,
        err instanceof Error ? err.message : err
      )
    }
  }

  if (!result && cantonCode) {
    const cantonLabel = BFS_CANTON_LABEL[cantonCode] ?? cantonCode
    try {
      result = await getMigrationStatsForKanton(cantonCode, cantonLabel)
      fallbackUsed = Boolean(bfsNr) // gemeinde requested, kanton geliefert
    } catch (err) {
      console.error(
        `[migrationStats] Kanton-Abfrage fehlgeschlagen für ${cleanSlug} (${cantonCode}):`,
        err instanceof Error ? err.message : err
      )
    }
  }

  if (!result) return null

  const a = aggregateMigrationRows(result.rows)
  if (a.years.length === 0) return null

  const lastIdx = a.years.length - 1
  const last = lastIdx
  const lastZ = a.zuzuegeTotal[last] ?? 0
  const lastW = a.wegzuegeTotal[last] ?? 0
  const lastSaldo = a.saldo[last] ?? 0

  // Year-over-Year: latestYear vs. latestYear-1.
  // Aeltere Jahre (1981..latestYear-2) werden bewusst NICHT mehr in die
  // Textanalyse einbezogen — relevant ist der aktuelle Jahresvergleich.
  const prevIdx = last - 1
  const hasPrev = prevIdx >= 0
  const previousYear = hasPrev ? (a.years[prevIdx] ?? null) : null
  const previousYearZ = hasPrev ? (a.zuzuegeTotal[prevIdx] ?? null) : null
  const previousYearW = hasPrev ? (a.wegzuegeTotal[prevIdx] ?? null) : null
  const previousYearSaldo = hasPrev ? (a.saldo[prevIdx] ?? null) : null

  const yoyZuzuegePct =
    hasPrev && previousYearZ != null && previousYearZ > 0
      ? ((lastZ - previousYearZ) / previousYearZ) * 100
      : null
  const yoyWegzuegePct =
    hasPrev && previousYearW != null && previousYearW > 0
      ? ((lastW - previousYearW) / previousYearW) * 100
      : null

  const intraShareLast = lastZ > 0 ? (a.innerCantonZuzuege[last] ?? 0) / lastZ : 0

  return {
    scope: result.scope,
    scopeName: result.scopeLabel,
    fallbackUsed,
    yearRange: result.yearRange,
    latestYear: a.years[last],
    metrics: {
      years: a.years,
      zuzuege: a.zuzuegeTotal,
      wegzuege: a.wegzuegeTotal,
      saldo: a.saldo,
      intrakantonalZu: a.innerCantonZuzuege,
      intrakantonalWeg: a.innerCantonWegzuege,
    },
    totals: {
      lastZ,
      lastW,
      lastSaldo,
      intraShareLast,
      previousYear,
      previousYearZ,
      previousYearW,
      previousYearSaldo,
      yoyZuzuegePct,
      yoyWegzuegePct,
    },
    source: {
      ...SOURCE_META,
      displayName:
        result.scope === 'gemeinde'
          ? `${result.scopeLabel} (BFS-Nr. ${result.bfsCode}, Cube ${SOURCE_META.cubeId})`
          : `${result.scopeLabel} (Kantonsdaten, Cube ${SOURCE_META.cubeId})`,
    },
  }
}

export type CityMigrationAnalysis = {
  headline: string
  intro: string
  paragraphs: string[]
  /**
   * Stadt-spezifischer „Lokaler Tipp" (Variation gegen Duplicate-Content):
   * Grossstadt → Parkbewilligung/Verkehr; Kleingemeinde → enge Strassen;
   * Mittelgrosse Orte → Mischung aus beidem.
   */
  localTip: { headline: string; text: string }
  highlights: { label: string; value: string; tone: 'pos' | 'neg' | 'neu' }[]
}

/**
 * Bekannte Schweizer Grossstaedte (Hauptzentren). Wird zusaetzlich durch
 * BFS-Datenwerte abgesichert: hohe lastZ-Werte signalisieren ebenfalls
 * urbane Dichte.
 */
const BIG_CITY_SLUGS = new Set([
  'zuerich',
  'basel',
  'genf',
  'bern',
  'lausanne',
  'winterthur',
  'luzern',
  'st-gallen',
  'lugano',
  'biel-bienne',
])

/** Klassifiziert eine Stadt nach Groesse fuer den Lokaltipp. */
function classifyCitySize(
  data: CityMigrationData,
  slug?: string
): 'gross' | 'mittel' | 'klein' {
  const cleanSlug = (slug || '').trim().toLowerCase()
  if (cleanSlug && BIG_CITY_SLUGS.has(cleanSlug)) return 'gross'
  // Datenbasiert: jaehrliche Zuzuege als Naeherung fuer Stadtgroesse
  const z = data.totals.lastZ
  if (z >= 8000) return 'gross'
  if (z >= 1500) return 'mittel'
  return 'klein'
}

function buildLocalTip(
  size: 'gross' | 'mittel' | 'klein',
  cityName: string
): { headline: string; text: string } {
  if (size === 'gross') {
    return {
      headline: `Lokaler Tipp für ${cityName}`,
      text: `In städtischen Zentren wie ${cityName} sind begrenzter Parkraum und Halteverbots-Bewilligungen die häufigsten Knackpunkte am Umzugstag. Erfahrene Umzugsfirmen kümmern sich rechtzeitig um die Bewilligung beim Tiefbauamt und stellen Halteverbots-Schilder mindestens 14 Tage im Voraus auf — das verhindert Zeitverlust durch Suchparkplätze und mehrfaches Umparkieren.`,
    }
  }
  if (size === 'mittel') {
    return {
      headline: `Lokaler Tipp für ${cityName}`,
      text: `${cityName} kombiniert urbane Erreichbarkeit mit überschaubarer Verkehrsdichte. Trotzdem lohnt sich eine kurze Vorbesichtigung mit der Umzugsfirma: schmale Hauseingänge, Lift-Innenmasse und Treppenhäuser sind in mittelgrossen Orten häufig der entscheidende Detailpunkt für eine realistische Offerte und einen reibungslosen Tagesablauf.`,
    }
  }
  return {
    headline: `Lokaler Tipp für ${cityName}`,
    text: `In ländlich geprägten Gemeinden wie ${cityName} sind enge Dorfstrassen, schmale Hofzufahrten und niedrige Toreinfahrten typische Aspekte. Seriöse Umzugsfirmen klären vorab die Fahrzeuggrösse (kleiner Lkw vs. Sattelzug), prüfen Wendekreise und planen — falls nötig — einen Umladepunkt mit kleinerem Fahrzeug ein, damit am Umzugstag keine Verzögerungen entstehen.`,
  }
}

/**
 * Erzeugt die SSR-Analyse-Texte für eine Stadt – wird direkt im DOM gerendert
 * und ist deshalb für Suchmaschinen sichtbar.
 */
export function buildCityMigrationAnalysis(
  data: CityMigrationData,
  cityName: string,
  slug?: string
): CityMigrationAnalysis {
  const fmt = (n: number) => n.toLocaleString('de-CH')
  const scopeLabel =
    data.scope === 'gemeinde' ? cityName : `dem Kanton ${data.scopeName}`
  const dataNoteSuffix = data.fallbackUsed
    ? ` (Datenbasis: Kanton ${data.scopeName}, da für ${cityName} keine separate Auswertung publiziert ist)`
    : ''

  const t = data.totals

  // Headline + Intro fokussieren auf den Wanderungssaldo (Netto-Effekt) —
  // dieser Wert ist intuitiv interpretierbar (Stadt waechst/schrumpft).
  // Brutto-Zuzuege/-Wegzuege erscheinen als ergaenzende Detailinformation.
  const saldoSign = t.lastSaldo > 0 ? '+' : t.lastSaldo < 0 ? '−' : ''
  const saldoAbsFmt = fmt(Math.abs(t.lastSaldo))

  // Headline im CH-Stil: „Zügeltrend" ist die Schweizer Variante zu
  // „Umzugstrend" und wirkt lokal vertrauter — ohne den SEO-Fokus auf
  // „Umzugsfirma" zu verlieren (das Keyword bleibt in URL/Title/H1 erhalten).
  const headline =
    t.lastSaldo > 0
      ? `Zügeltrend ${cityName} ${data.latestYear}: Wanderungssaldo von +${fmt(t.lastSaldo)} Personen`
      : t.lastSaldo < 0
        ? `Zügeltrend ${cityName} ${data.latestYear}: Wanderungssaldo von −${saldoAbsFmt} Personen`
        : `Zügeltrend ${cityName} ${data.latestYear}: ausgeglichene Wanderungsbilanz`

  // Bewusst ohne Brutto-Zahlen (33'906/31'703 etc.). Diese stehen
  // bereits in den KPI-Karten — im Fliesstext nur die intuitive
  // Saldo-/Trend-Aussage, damit der Text nicht von Grosszahlen erschlagen wird.
  const intro =
    t.lastSaldo > 0
      ? `In ${scopeLabel} ergab sich für das Jahr ${data.latestYear} ein positiver Wanderungssaldo von ${saldoSign}${saldoAbsFmt} Personen${dataNoteSuffix} — die Stadt ist durch Zuzüge also effektiv gewachsen.`
      : t.lastSaldo < 0
        ? `In ${scopeLabel} ergab sich für das Jahr ${data.latestYear} ein negativer Wanderungssaldo von ${saldoSign}${saldoAbsFmt} Personen${dataNoteSuffix} — netto haben mehr Personen den Ort verlassen, als zugezogen sind.`
        : `In ${scopeLabel} hielten sich Zu- und Wegzüge im Jahr ${data.latestYear} weitgehend die Waage${dataNoteSuffix} — der Wanderungssaldo ist praktisch ausgeglichen.`

  const intraPercent = Math.round(t.intraShareLast * 100)
  const intraText =
    t.intraShareLast >= 0.4
      ? `Ein grosser Teil der Zuzüge (rund ${intraPercent} %) stammt aus dem gleichen Kanton — die innerkantonale Mobilität ist überdurchschnittlich hoch. Für Umzugsfirmen heisst das: viele kürzere Distanzen bei hoher Frequenz.`
      : t.intraShareLast >= 0.2
        ? `Etwa ${intraPercent} % dieser Zuzüge erfolgten innerkantonal — ein typisches Verhältnis zwischen lokalen Umzügen und dem Zuzug aus anderen Kantonen oder dem Ausland.`
        : `Nur rund ${intraPercent} % der Zuzüge stammen aus dem gleichen Kanton — die Mehrzahl kommt aus anderen Kantonen oder dem Ausland. Fernumzüge sind in ${cityName} ein wichtiger Markt.`

  // Year-over-Year-Vergleich (latestYear vs. Vorjahr) — historische Werte
  // (1981..latestYear-2) werden bewusst nicht mehr beschrieben.
  // Schwellen:
  //   |yoy| < 1%  → „praktisch stabil"
  //   1% .. 4.99% → „leichter Anstieg/Rückgang"
  //   ≥ 5%        → „Anstieg/Rückgang"
  const STABILITY_THRESHOLD_PCT = 1
  const SLIGHT_THRESHOLD_PCT = 5

  const yoyZuPct = t.yoyZuzuegePct
  const yoyZ = yoyZuPct == null ? null : Math.round(Math.abs(yoyZuPct))
  const directionZuzuege: 'Anstieg' | 'Rückgang' | 'stabil' | null =
    yoyZuPct == null
      ? null
      : Math.abs(yoyZuPct) < STABILITY_THRESHOLD_PCT
        ? 'stabil'
        : yoyZuPct > 0
          ? 'Anstieg'
          : 'Rückgang'
  const isZuzuegeSlight =
    yoyZuPct != null && Math.abs(yoyZuPct) >= STABILITY_THRESHOLD_PCT && Math.abs(yoyZuPct) < SLIGHT_THRESHOLD_PCT
  const paragraph1 =
    t.previousYear && yoyZ != null && directionZuzuege
      ? directionZuzuege === 'stabil'
        ? `Im Vergleich zum Vorjahr ${t.previousYear} ist die Zahl der Zuzüge nach ${cityName} praktisch unverändert geblieben.`
        : directionZuzuege === 'Anstieg'
          ? `Im Vergleich zum Vorjahr ${t.previousYear} ist die Zahl der Zuzüge nach ${cityName}${isZuzuegeSlight ? ' leicht' : ''} um rund ${yoyZ} % gestiegen.`
          : `Im Vergleich zum Vorjahr ${t.previousYear} ist die Zahl der Zuzüge nach ${cityName}${isZuzuegeSlight ? ' jedoch leicht' : ' jedoch'} um rund ${yoyZ} % zurückgegangen.`
      : `Vergleichswerte zu den Zuzügen aus dem Vorjahr sind für ${cityName} aktuell nicht verfügbar.`

  // SEO-Hinweis: „Umzugsfirma" bleibt im Hauptsatz (URL-Keyword),
  // „Zügelunternehmen" wird zusätzlich als Schweizer Variante erwähnt —
  // natürliche Synonym-Anreicherung statt Keyword-Spam.
  const paragraph2 = `${intraText} Wer in ${cityName} eine Umzugsfirma — in der Schweiz auch Zügelunternehmen genannt — sucht, profitiert von dieser Marktdichte: Die Anbieter sind regelmässig im Einsatz, wodurch die Routinen für Parkverbotsbewilligungen, Möbellifte und Tragewege bestens eingespielt sind. Offerten lassen sich unkompliziert vergleichen, ohne dass mit langen Wartezeiten bei den Kapazitäten gerechnet werden muss.`

  // Wegzug-YoY: ergänzt den Trend, sodass der Leser sofort die aktuelle
  // Marktrichtung versteht (nur latestYear vs. Vorjahr — keine Langzeit-Linie).
  const yoyWePct = t.yoyWegzuegePct
  const yoyW = yoyWePct == null ? null : Math.round(Math.abs(yoyWePct))
  const directionWegzuege: 'Anstieg' | 'Rückgang' | 'stabil' | null =
    yoyWePct == null
      ? null
      : Math.abs(yoyWePct) < STABILITY_THRESHOLD_PCT
        ? 'stabil'
        : yoyWePct > 0
          ? 'Anstieg'
          : 'Rückgang'
  const isWegzuegeSlight =
    yoyWePct != null && Math.abs(yoyWePct) >= STABILITY_THRESHOLD_PCT && Math.abs(yoyWePct) < SLIGHT_THRESHOLD_PCT
  const paragraph3 =
    t.previousYear && yoyW != null && directionWegzuege
      ? directionWegzuege === 'stabil'
        ? `Bei den Wegzügen liegt der Wert praktisch auf Vorjahresniveau — die Marktdynamik in ${cityName} bleibt damit weitgehend stabil.`
        : directionWegzuege === 'Anstieg'
          ? `Bei den Wegzügen ist gegenüber dem Vorjahr ${t.previousYear} ein${isWegzuegeSlight ? ' leichter' : ''} Anstieg von rund ${yoyW} % zu verzeichnen — ein Indikator dafür, dass${isWegzuegeSlight ? ' etwas' : ''} mehr Personen ${cityName} verlassen haben als noch im Jahr zuvor.`
          : `Bei den Wegzügen ist gegenüber dem Vorjahr ${t.previousYear} ein${isWegzuegeSlight ? ' leichter' : ''} Rückgang von rund ${yoyW} % zu verzeichnen — die Stadt verliert${isWegzuegeSlight ? ' geringfügig' : ''} weniger Einwohner als noch im Jahr zuvor.`
      : `Eine belastbare Vorjahres-Veränderung der Wegzüge lässt sich für ${cityName} aktuell nicht ausweisen.`

  const size = classifyCitySize(data, slug)
  const localTip = buildLocalTip(size, cityName)

  // Reihenfolge: erst der intuitive Netto-Effekt (Saldo), dann die
  // einzelnen Bewegungsgroessen — so liest die Karte „grosses Bild zuerst".
  const highlights: CityMigrationAnalysis['highlights'] = [
    {
      label: `Wanderungssaldo ${data.latestYear}`,
      value: t.lastSaldo > 0 ? `+${fmt(t.lastSaldo)}` : fmt(t.lastSaldo),
      tone: t.lastSaldo > 0 ? 'pos' : t.lastSaldo < 0 ? 'neg' : 'neu',
    },
    {
      label: 'Innerkantonal',
      value: `${intraPercent}%`,
      tone: 'neu',
    },
    {
      label: `Zuzüge ${data.latestYear}`,
      value: fmt(t.lastZ),
      tone: 'pos',
    },
    {
      label: `Wegzüge ${data.latestYear}`,
      value: fmt(t.lastW),
      tone: 'neg',
    },
  ]

  return {
    headline,
    intro,
    paragraphs: [paragraph1, paragraph2, paragraph3],
    localTip,
    highlights,
  }
}

/**
 * Erzeugt zusätzliche, datengetriebene FAQ-Einträge für die Stadt.
 * Werden vor den statischen FAQs eingespeist und in das FAQ-JSON-LD integriert.
 */
export function buildStatBasedFaqItems(
  data: CityMigrationData,
  cityName: string
): CityFaqItem[] {
  const fmt = (n: number) => n.toLocaleString('de-CH')
  const t = data.totals
  const dataNote = data.fallbackUsed
    ? `Datengrundlage ist der Kanton ${data.scopeName}, da für ${cityName} keine separate Gemeinde-Auswertung publiziert wird. `
    : ''
  const sourceFootnote = `Quelle: ${data.source.publisher}, „${data.source.cubeTitle}" (${data.source.cubeId}), Stand ${data.latestYear}.`

  const intraPercent = Math.round(t.intraShareLast * 100)

  // Year-over-Year-Beschreibung — bewusst keine Mehrjahres-Aussagen.
  const yoyZuPctRaw = t.yoyZuzuegePct
  const yoyZuRound = yoyZuPctRaw == null ? null : Math.round(Math.abs(yoyZuPctRaw))
  const yoyZuDirection =
    yoyZuPctRaw == null
      ? null
      : Math.abs(yoyZuPctRaw) < 1
        ? 'praktisch stabil geblieben'
        : yoyZuPctRaw > 0
          ? `gestiegen (rund +${yoyZuRound}%)`
          : `gesunken (rund -${yoyZuRound}%)`

  const yoyWePctRaw = t.yoyWegzuegePct
  const yoyWeRound = yoyWePctRaw == null ? null : Math.round(Math.abs(yoyWePctRaw))
  const yoyWeDirection =
    yoyWePctRaw == null
      ? null
      : Math.abs(yoyWePctRaw) < 1
        ? 'praktisch stabil geblieben'
        : yoyWePctRaw > 0
          ? `gestiegen (rund +${yoyWeRound}%)`
          : `gesunken (rund -${yoyWeRound}%)`

  // FAQ-Kommentar zum Saldo — bewusst ohne Wiederholung der Brutto-Zahlen.
  const saldoCommentary =
    t.lastSaldo > 0
      ? 'Damit ziehen netto mehr Personen zu als weg — die Stadt wächst durch Wanderung.'
      : t.lastSaldo < 0
        ? 'Damit ziehen netto mehr Personen weg als zu — die Stadt verliert durch Wanderung Einwohner.'
        : 'Damit halten sich Zu- und Wegzüge weitgehend die Waage.'

  const items: CityFaqItem[] = [
    {
      question: `Wie viele Personen sind ${data.latestYear} nach ${cityName} gezogen?`,
      blocks: [
        {
          type: 'paragraph',
          text: `${dataNote}Laut der demografischen Bilanz des Bundesamts für Statistik wurden ${data.latestYear} in ${cityName} ${fmt(t.lastZ)} Zuzüge gezählt — diese Zahl umfasst Zuzüge aus dem Ausland, aus anderen Kantonen sowie aus anderen Gemeinden im gleichen Kanton.`,
        },
        {
          type: 'paragraph',
          text:
            t.previousYear && yoyZuDirection
              ? `Im Vergleich zum Vorjahr ${t.previousYear} sind die Zuzüge damit ${yoyZuDirection}. ${sourceFootnote}`
              : sourceFootnote,
        },
      ],
      plainAnswer:
        t.previousYear && yoyZuDirection
          ? `${dataNote}${data.latestYear}: ${fmt(t.lastZ)} Zuzüge in ${cityName}. Gegenüber dem Vorjahr ${t.previousYear} sind die Zuzüge ${yoyZuDirection}. ${sourceFootnote}`
          : `${dataNote}${data.latestYear} wurden in ${cityName} ${fmt(t.lastZ)} Zuzüge registriert. ${sourceFootnote}`,
    },
    {
      question: `Wie viele Personen verlassen ${cityName} pro Jahr?`,
      blocks: [
        {
          type: 'paragraph',
          text: `${data.latestYear} wurden in ${cityName} ${fmt(t.lastW)} Wegzüge erfasst (ins Ausland, in andere Kantone und in andere Gemeinden des gleichen Kantons). ${saldoCommentary}`,
        },
      ],
      plainAnswer: `${data.latestYear}: ${fmt(t.lastW)} Wegzüge in ${cityName}. ${saldoCommentary} ${sourceFootnote}`,
    },
    {
      question: `Wie hat sich der Umzugstrend in ${cityName} im Vergleich zum Vorjahr entwickelt?`,
      blocks: [
        {
          type: 'paragraph',
          text:
            t.previousYear && yoyZuDirection && yoyWeDirection
              ? `Gegenüber dem Vorjahr ${t.previousYear} sind die Zuzüge nach ${cityName} ${yoyZuDirection}, die Wegzüge ${yoyWeDirection}.`
              : `Belastbare Vorjahreswerte sind für ${cityName} aktuell nicht verfügbar.`,
        },
        {
          type: 'paragraph',
          text: `Diese Vorjahresbetrachtung bildet die aktuelle Marktdynamik in ${cityName} ab — ohne Verzerrung durch weit zurückliegende Jahre. Für Umzugsfirmen bedeutet sie: planbare Auslastung im laufenden Jahr und realistische Erwartungen für die kommenden Saisonspitzen.`,
        },
      ],
      plainAnswer:
        t.previousYear && yoyZuDirection
          ? `Im Jahresvergleich ${t.previousYear} → ${data.latestYear} sind die Zuzüge nach ${cityName} ${yoyZuDirection}.`
          : `Vorjahresvergleich für ${cityName} ist aktuell nicht verfügbar.`,
    },
    {
      question: `Wie viele Umzüge in ${cityName} sind innerkantonal?`,
      blocks: [
        {
          type: 'paragraph',
          text: `Rund ${intraPercent}% der ${data.latestYear} gezählten Zuzüge stammen aus dem gleichen Kanton (${data.scope === 'gemeinde' ? data.scopeName : 'Auswertungsgebiet'}). Das umfasst typische Nahumzüge zwischen Nachbargemeinden und Quartierwechsel innerhalb der Region.`,
        },
        {
          type: 'paragraph',
          text:
            t.intraShareLast >= 0.4
              ? 'Damit liegt die innerkantonale Quote überdurchschnittlich hoch — das spricht für viele Kurzdistanzumzüge und eine hohe regionale Mobilität.'
              : t.intraShareLast >= 0.2
                ? 'Das entspricht einer typischen Mischung aus Nahumzügen und überregionalem Zuzug.'
                : 'Damit liegt der innerkantonale Anteil eher tief — Fernumzüge aus anderen Kantonen oder dem Ausland prägen den Markt.',
        },
      ],
      plainAnswer: `Rund ${intraPercent}% der Zuzüge nach ${cityName} stammen aus dem gleichen Kanton (${data.latestYear}, BFS). Der Rest verteilt sich auf interkantonalen Zuzug und Einwanderung aus dem Ausland.`,
    },
  ]

  return items
}
