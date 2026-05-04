/**
 * Schnell-Verifikation: BFS PX-Web Roh-Daten fuer Stadt Zuerich (BFS 261).
 *
 * Zweck: zeigen, welche Werte die offizielle BFS-API tatsaechlich
 * fuer 2023 und 2024 liefert — um die in der Web-App angezeigten
 * Zahlen 1:1 zu validieren.
 *
 * Aufruf: node scripts/verify-zurich-bfs-data.mjs
 */

const CUBE_BASE = 'https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-0102020000_201'
const CUBE_URL = `${CUBE_BASE}/px-x-0102020000_201.px`

const BFS_NR = 261 // Stadt Zuerich
const YEARS = ['2023', '2024']
const COMPONENTS = {
  '4': 'Einwanderung (Ausland)',
  '5': 'Interkantonaler Zuzug',
  '6': 'Intrakantonaler Zuzug',
  '7': 'Auswanderung (Ausland)',
  '8': 'Interkantonaler Wegzug',
  '9': 'Intrakantonaler Wegzug',
}

function fmt(n) {
  return Number(n).toLocaleString('de-CH')
}

async function loadMeta() {
  const res = await fetch(CUBE_URL, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`Meta-Fetch ${res.status}`)
  return res.json()
}

function findGemeindeCode(meta, bfsNr) {
  const gli = meta.variables.find((v) =>
    v.code === 'Kanton (-) / Bezirk (>>) / Gemeinde (......)'
  )
  if (!gli) throw new Error('Gliederungs-Variable nicht gefunden')
  for (let i = 0; i < gli.valueTexts.length; i++) {
    const label = gli.valueTexts[i]
    const m = /^\.{6}(\d{1,4})\s/.exec(label)
    if (m && parseInt(m[1], 10) === bfsNr) {
      return { code: gli.values[i], label }
    }
  }
  return null
}

async function queryRow(scopeCode) {
  const body = {
    query: [
      { code: 'Jahr', selection: { filter: 'item', values: YEARS } },
      {
        code: 'Kanton (-) / Bezirk (>>) / Gemeinde (......)',
        selection: { filter: 'item', values: [scopeCode] },
      },
      {
        code: 'Staatsangehörigkeit (Kategorie)',
        selection: { filter: 'item', values: ['0'] },
      },
      { code: 'Geschlecht', selection: { filter: 'item', values: ['0'] } },
      {
        code: 'Demografische Komponente',
        selection: { filter: 'item', values: Object.keys(COMPONENTS) },
      },
    ],
    response: { format: 'json-stat2' },
  }
  const res = await fetch(CUBE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Query ${res.status}: ${await res.text()}`)
  return res.json()
}

function parseRows(json) {
  // Dimension-Reihenfolge → Multiplikatoren fuer Linearisierung
  const dimOrder = json.id
  const dimSizes = json.size
  const mults = new Array(dimOrder.length).fill(1)
  for (let d = dimOrder.length - 2; d >= 0; d--) {
    mults[d] = mults[d + 1] * dimSizes[d + 1]
  }
  const dimOf = new Map(dimOrder.map((d, i) => [d, i]))

  const yearDim = json.dimension['Jahr']
  const compDim = json.dimension['Demografische Komponente']
  const yearIdx = normalizeIndex(yearDim.category.index)
  const compIdx = normalizeIndex(compDim.category.index)

  const out = {}
  for (const [yearLabel, yPos] of Object.entries(yearIdx)) {
    out[yearLabel] = {}
    for (const compCode of Object.keys(COMPONENTS)) {
      const cPos = compIdx[compCode]
      if (cPos == null) continue
      const indices = new Array(dimOrder.length).fill(0)
      indices[dimOf.get('Jahr')] = yPos
      indices[dimOf.get('Demografische Komponente')] = cPos
      let lin = 0
      for (let d = 0; d < dimOrder.length; d++) lin += indices[d] * mults[d]
      out[yearLabel][compCode] = json.value[lin]
    }
  }
  return out
}

function normalizeIndex(idx) {
  if (Array.isArray(idx)) {
    const m = {}
    idx.forEach((c, p) => (m[c] = p))
    return m
  }
  return idx
}

;(async () => {
  console.log('--- BFS PX-Web Verifikation: Stadt Zuerich (BFS 261) ---\n')
  console.log('Cube:', 'px-x-0102020000_201')
  console.log('Quelle:', 'https://www.pxweb.bfs.admin.ch')
  console.log('')

  const meta = await loadMeta()
  const found = findGemeindeCode(meta, BFS_NR)
  if (!found) {
    console.error('BFS-Nr', BFS_NR, 'nicht im Cube gefunden!')
    process.exit(1)
  }
  console.log('Cube-Label  :', found.label)
  console.log('Cube-Code   :', found.code)
  console.log('')

  const json = await queryRow(found.code)
  const rows = parseRows(json)

  for (const year of YEARS) {
    if (!rows[year]) {
      console.log(`Jahr ${year}: keine Daten`)
      continue
    }
    const r = rows[year]
    const z = (r['4'] ?? 0) + (r['5'] ?? 0) + (r['6'] ?? 0)
    const w = (r['7'] ?? 0) + (r['8'] ?? 0) + (r['9'] ?? 0)
    const saldo = z - w
    console.log(`========== Jahr ${year} ==========`)
    for (const [code, label] of Object.entries(COMPONENTS)) {
      console.log(`  ${code} ${label.padEnd(28)} = ${fmt(r[code] ?? 0).padStart(7)}`)
    }
    console.log(`  ─────────────────────────────────────────`)
    console.log(`  Σ Zuzüge   (4+5+6)            = ${fmt(z).padStart(7)}`)
    console.log(`  Σ Wegzüge  (7+8+9)            = ${fmt(w).padStart(7)}`)
    console.log(`  Wanderungssaldo               = ${fmt(saldo).padStart(7)}`)
    console.log('')
  }

  if (rows['2023'] && rows['2024']) {
    const z2023 = (rows['2023']['4'] ?? 0) + (rows['2023']['5'] ?? 0) + (rows['2023']['6'] ?? 0)
    const z2024 = (rows['2024']['4'] ?? 0) + (rows['2024']['5'] ?? 0) + (rows['2024']['6'] ?? 0)
    const yoy = z2023 > 0 ? ((z2024 - z2023) / z2023) * 100 : null
    console.log('========== YoY 2023 → 2024 ==========')
    console.log(`  Zuzüge 2023        = ${fmt(z2023)}`)
    console.log(`  Zuzüge 2024        = ${fmt(z2024)}`)
    console.log(`  Veraenderung       = ${yoy == null ? 'n/a' : (yoy > 0 ? '+' : '') + yoy.toFixed(2) + '%'}`)
    console.log('')
  }

  console.log('Vergleichsquelle (manuell pruefbar):')
  console.log(' https://www.pxweb.bfs.admin.ch/pxweb/de/px-x-0102020000_201/px-x-0102020000_201/px-x-0102020000_201.px/')
})().catch((err) => {
  console.error('Fehler:', err)
  process.exit(1)
})
