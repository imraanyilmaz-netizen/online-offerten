import { NextResponse } from 'next/server'
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

export const revalidate = 86400 // 24h ISR — Daten ändern sich nur jährlich

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

type ApiPayload = {
  scope: 'gemeinde' | 'kanton'
  scopeName: string
  fallbackUsed: boolean
  yearRange: [number, number]
  metrics: {
    years: number[]
    zuzuege: number[]
    wegzuege: number[]
    saldo: number[]
    intrakantonalZu: number[]
    intrakantonalWeg: number[]
  }
  source: typeof SOURCE_META & { displayName: string }
}

function buildPayload(
  result: MigrationCubeResult,
  fallbackUsed: boolean
): ApiPayload {
  const a = aggregateMigrationRows(result.rows)
  return {
    scope: result.scope,
    scopeName: result.scopeLabel,
    fallbackUsed,
    yearRange: result.yearRange,
    metrics: {
      years: a.years,
      zuzuege: a.zuzuegeTotal,
      wegzuege: a.wegzuegeTotal,
      saldo: a.saldo,
      intrakantonalZu: a.innerCantonZuzuege,
      intrakantonalWeg: a.innerCantonWegzuege,
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

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ slug: string }> }
) {
  const { slug } = await ctx.params
  const cleanSlug = String(slug || '').trim().toLowerCase()
  if (!cleanSlug) {
    return NextResponse.json({ error: 'slug fehlt' }, { status: 400 })
  }

  const bfsNr = BFS_GEMEINDE_NR_BY_SLUG[cleanSlug]
  const cantonCode = BFS_CANTON_BY_SLUG[cleanSlug]
  if (!bfsNr && !cantonCode) {
    return NextResponse.json(
      { error: `Keine BFS-Zuordnung für slug "${cleanSlug}".` },
      { status: 404 }
    )
  }

  // 1) Versuch: Gemeinde-Daten
  if (bfsNr) {
    try {
      const scopeName = humanizeSlug(cleanSlug)
      const data = await getMigrationStatsForGemeinde(bfsNr, scopeName)
      const payload = buildPayload(data, false)
      return NextResponse.json(payload, {
        headers: { 'Cache-Control': 's-maxage=86400, stale-while-revalidate=43200' },
      })
    } catch (err) {
      console.warn(
        `[stats/migration] Gemeinde-Abfrage für ${cleanSlug} (${bfsNr}) fehlgeschlagen:`,
        err instanceof Error ? err.message : err
      )
      // Fall durch zum Kanton-Fallback
    }
  }

  // 2) Fallback: Kanton-Daten
  if (cantonCode) {
    try {
      const cantonLabel = BFS_CANTON_LABEL[cantonCode] ?? cantonCode
      const data = await getMigrationStatsForKanton(cantonCode, cantonLabel)
      const payload = buildPayload(data, Boolean(bfsNr))
      return NextResponse.json(payload, {
        headers: { 'Cache-Control': 's-maxage=86400, stale-while-revalidate=43200' },
      })
    } catch (err) {
      console.error(
        `[stats/migration] Kanton-Abfrage für ${cleanSlug} (${cantonCode}) fehlgeschlagen:`,
        err
      )
    }
  }

  return NextResponse.json(
    { error: 'Statistik konnte derzeit nicht geladen werden.' },
    { status: 502 }
  )
}

function humanizeSlug(slug: string): string {
  return slug
    .split('-')
    .map((p) => (p.length === 0 ? p : p[0].toUpperCase() + p.slice(1)))
    .join(' ')
    .replace(/Ae/g, 'Ä')
    .replace(/Oe/g, 'Ö')
    .replace(/Ue/g, 'Ü')
    .replace(/St Gallen/i, 'St. Gallen')
    .replace(/Biel Bienne/i, 'Biel/Bienne')
}
