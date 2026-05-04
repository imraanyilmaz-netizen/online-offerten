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
    lastZ: number
    lastW: number
    lastSaldo: number
    last5yZ: number
    avg5yYearly: number
    peakYear: number
    peakValue: number
    fiveYearGrowthPct: number | null
    intraShareLast: number
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

  const fiveStart = Math.max(0, last - 4)
  const last5yZ = a.zuzuegeTotal.slice(fiveStart, last + 1).reduce((s, v) => s + v, 0)
  const fiveYearWindow = a.zuzuegeTotal.slice(fiveStart, last + 1)
  const avg5yYearly = fiveYearWindow.length
    ? Math.round(fiveYearWindow.reduce((s, v) => s + v, 0) / fiveYearWindow.length)
    : 0

  let peakIdx = 0
  for (let i = 0; i < a.zuzuegeTotal.length; i++) {
    if (a.zuzuegeTotal[i] > a.zuzuegeTotal[peakIdx]) peakIdx = i
  }
  const peakYear = a.years[peakIdx]
  const peakValue = a.zuzuegeTotal[peakIdx]

  const fiveYearGrowthPct =
    fiveYearWindow.length >= 2 && fiveYearWindow[0] > 0
      ? ((fiveYearWindow[fiveYearWindow.length - 1] - fiveYearWindow[0]) / fiveYearWindow[0]) * 100
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
      last5yZ,
      avg5yYearly,
      peakYear,
      peakValue,
      fiveYearGrowthPct,
      intraShareLast,
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
  highlights: { label: string; value: string; tone: 'pos' | 'neg' | 'neu' }[]
}

/**
 * Erzeugt die SSR-Analyse-Texte für eine Stadt – wird direkt im DOM gerendert
 * und ist deshalb für Suchmaschinen sichtbar.
 */
export function buildCityMigrationAnalysis(
  data: CityMigrationData,
  cityName: string
): CityMigrationAnalysis {
  const fmt = (n: number) => n.toLocaleString('de-CH')
  const scopeLabel =
    data.scope === 'gemeinde' ? cityName : `dem Kanton ${data.scopeName}`
  const dataNoteSuffix = data.fallbackUsed
    ? ` (Datenbasis: Kanton ${data.scopeName}, da für ${cityName} keine separate Auswertung publiziert ist)`
    : ''

  const t = data.totals
  const trendText =
    t.fiveYearGrowthPct == null
      ? 'auf vergleichbarem Niveau'
      : Math.abs(t.fiveYearGrowthPct) < 3
        ? 'auf einem stabilen Niveau'
        : t.fiveYearGrowthPct > 0
          ? `rund ${Math.round(t.fiveYearGrowthPct)}% höher`
          : `rund ${Math.round(Math.abs(t.fiveYearGrowthPct))}% tiefer`

  const saldoText =
    t.lastSaldo > 0
      ? `einen positiven Wanderungssaldo von +${fmt(t.lastSaldo)} Personen`
      : t.lastSaldo < 0
        ? `einen negativen Wanderungssaldo von ${fmt(t.lastSaldo)} Personen`
        : 'einen ausgeglichenen Wanderungssaldo'

  const intraPercent = Math.round(t.intraShareLast * 100)
  const intraText =
    t.intraShareLast >= 0.4
      ? `Ein grosser Teil der Zuzüge (rund ${intraPercent}%) stammt aus dem gleichen Kanton — innerkantonale Mobilität ist überdurchschnittlich. Für Umzugsfirmen heisst das: viele kürzere Distanzen, aber hohe Frequenz.`
      : t.intraShareLast >= 0.2
        ? `Etwa ${intraPercent}% der Zuzüge sind innerkantonal — ein typisches Verhältnis aus Nahumzügen und Zuzug aus anderen Kantonen oder dem Ausland.`
        : `Nur rund ${intraPercent}% der Zuzüge stammen aus dem gleichen Kanton — die Mehrzahl kommt aus anderen Kantonen oder dem Ausland. Fernumzüge sind hier ein wichtiger Markt.`

  const headline = `Umzugsstatistik ${cityName}: ${fmt(t.lastZ)} Zuzüge im Jahr ${data.latestYear}`
  const intro = `Im Jahr ${data.latestYear} wurden in ${scopeLabel} ${fmt(t.lastZ)} Zuzüge gegenüber ${fmt(t.lastW)} Wegzügen registriert${dataNoteSuffix}. Daraus ergibt sich ${saldoText}.`

  const paragraph1 = `Im Fünfjahresdurchschnitt liegt der jährliche Zuzug bei rund ${fmt(t.avg5yYearly)} Personen, was die kontinuierlich hohe Nachfrage nach Wohnraum und Dienstleistungen rund um den Umzug erklärt. Im Vergleich zum Stand vor fünf Jahren liegen die aktuellen Zuzüge ${trendText}.`
  const paragraph2 = `${intraText} Wer in ${cityName} eine Umzugsfirma sucht, profitiert von dieser Marktdichte: Anbieter sind regelmässig im Einsatz, die Routinen für Parkbewilligungen, Lift- und Tragewege sind eingespielt, und Offerten lassen sich vergleichen, ohne lange auf Kapazitäten zu warten.`
  const paragraph3 = `Spitzenjahr im Beobachtungszeitraum (${data.yearRange[0]}–${data.yearRange[1]}) war ${t.peakYear} mit ${fmt(t.peakValue)} Zuzügen — ein Hinweis darauf, dass ${cityName} auch über längere Zeiträume zuverlässig auf der Schweizer Umzugslandkarte präsent ist.`

  const highlights: CityMigrationAnalysis['highlights'] = [
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
  ]

  return {
    headline,
    intro,
    paragraphs: [paragraph1, paragraph2, paragraph3],
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
  const trendDirection =
    t.fiveYearGrowthPct == null
      ? 'auf vergleichbarem Niveau'
      : t.fiveYearGrowthPct > 3
        ? `gestiegen (rund +${Math.round(t.fiveYearGrowthPct)}%)`
        : t.fiveYearGrowthPct < -3
          ? `gesunken (rund ${Math.round(t.fiveYearGrowthPct)}%)`
          : 'praktisch stabil'

  const saldoCommentary =
    t.lastSaldo > 0
      ? `Das ergibt einen positiven Wanderungssaldo von +${fmt(t.lastSaldo)} Personen — es ziehen mehr Personen zu als weg.`
      : t.lastSaldo < 0
        ? `Das ergibt einen negativen Wanderungssaldo von ${fmt(t.lastSaldo)} Personen — es ziehen mehr Personen weg als zu.`
        : 'Damit halten sich Zu- und Wegzüge weitgehend die Waage.'

  const items: CityFaqItem[] = [
    {
      question: `Wie viele Personen sind ${data.latestYear} nach ${cityName} gezogen?`,
      blocks: [
        {
          type: 'paragraph',
          text: `${dataNote}Laut der demografischen Bilanz des Bundesamts für Statistik wurden ${data.latestYear} insgesamt ${fmt(t.lastZ)} Zuzüge gezählt — diese Zahl umfasst Zuzüge aus dem Ausland, aus anderen Kantonen sowie aus anderen Gemeinden im gleichen Kanton.`,
        },
        {
          type: 'paragraph',
          text: `Im Fünfjahresdurchschnitt liegt der jährliche Zuzug bei rund ${fmt(t.avg5yYearly)} Personen. ${sourceFootnote}`,
        },
      ],
      plainAnswer: `${dataNote}${data.latestYear} wurden in ${cityName} ${fmt(t.lastZ)} Zuzüge registriert (Ausland + Interkantonal + Intrakantonal). Im Fünfjahresdurchschnitt sind es rund ${fmt(t.avg5yYearly)} Zuzüge pro Jahr. ${sourceFootnote}`,
    },
    {
      question: `Wie viele Personen verlassen ${cityName} pro Jahr?`,
      blocks: [
        {
          type: 'paragraph',
          text: `${data.latestYear} wurden ${fmt(t.lastW)} Wegzüge erfasst (ins Ausland, in andere Kantone und in andere Gemeinden des gleichen Kantons). ${saldoCommentary}`,
        },
      ],
      plainAnswer: `${data.latestYear}: ${fmt(t.lastW)} Wegzüge in ${cityName}. ${saldoCommentary} ${sourceFootnote}`,
    },
    {
      question: `Wie hat sich die Umzugsdynamik in ${cityName} in den letzten Jahren entwickelt?`,
      blocks: [
        {
          type: 'paragraph',
          text: `Verglichen mit dem Stand vor fünf Jahren sind die Zuzüge ${trendDirection}. Das Spitzenjahr im verfügbaren Zeitraum (${data.yearRange[0]}–${data.yearRange[1]}) war ${t.peakYear} mit ${fmt(t.peakValue)} Zuzügen.`,
        },
        {
          type: 'paragraph',
          text: `Für Umzugsfirmen bedeutet diese Stabilität, dass das Marktvolumen über mehrere Jahre planbar bleibt — und dass bei Spitzenmonaten (Frühjahr/Frühsommer) eine frühzeitige Offerte sinnvoll ist.`,
        },
      ],
      plainAnswer: `Im Fünfjahresvergleich ist die Anzahl der Zuzüge nach ${cityName} ${trendDirection}. Spitzenjahr: ${t.peakYear} mit ${fmt(t.peakValue)} Zuzügen.`,
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
