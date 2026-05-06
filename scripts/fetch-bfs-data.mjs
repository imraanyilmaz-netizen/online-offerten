/**
 * Fetch all BFS PX-Web migration data and save to data/bfs/migration-cache.json
 *
 * Run: npm run fetch-bfs
 *
 * Fetches all locations in parallel (CONCURRENCY = 10) with automatic retry.
 * Typical runtime: ~30–60 seconds for all ~190 entries.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_FILE = path.join(ROOT, 'data/bfs/migration-cache.json')
const CONCURRENCY = 10

const CUBE_URL =
  'https://www.pxweb.bfs.admin.ch/api/v1/de/px-x-0102020000_201/px-x-0102020000_201.px'

const VAR_GLIEDERUNG = 'Kanton (-) / Bezirk (>>) / Gemeinde (......)'
const VAR_JAHR = 'Jahr'
const VAR_KOMPONENTE = 'Demografische Komponente'
const VAR_NATIONALITAET = 'Staatsangehörigkeit (Kategorie)'
const VAR_GESCHLECHT = 'Geschlecht'
const COMPONENT_INDICES = ['4', '5', '6', '7', '8', '9']
const COMPONENT_KEY = {
  '4': 'einwanderung', '5': 'interkantonalerZuzug', '6': 'intrakantonalerZuzug',
  '7': 'auswanderung', '8': 'interkantonalerWegzug', '9': 'intrakantonalerWegzug',
}

// ---------------------------------------------------------------------------
// Location data
// ---------------------------------------------------------------------------

const BFS_GEMEINDE_NR_BY_SLUG = {
  zuerich: 261, genf: 6621, basel: 2701, lausanne: 5586, bern: 351,
  winterthur: 230, luzern: 1061, 'st-gallen': 3203, lugano: 5192,
  'biel-bienne': 371, thun: 942, bellinzona: 5002, koeniz: 355,
  freiburg: 2196, schaffhausen: 2939, 'la-chaux-de-fonds': 6421, chur: 3901,
  uster: 198, sitten: 6266, vernier: 6643, lancy: 6628, neuenburg: 6458,
  emmen: 1024, zug: 1711, 'yverdon-les-bains': 5938, duebendorf: 191,
  kriens: 1059, dietikon: 243, 'rapperswil-jona': 3340, meyrin: 6630,
  montreux: 5886, frauenfeld: 4566, wetzikon: 121, waedenswil: 293, baar: 1701,
  bulle: 2125, wil: 3427, horgen: 295, carouge: 6608, kreuzlingen: 4671,
  buelach: 53, aarau: 4001, nyon: 5724, riehen: 2703, allschwil: 2762,
  wettingen: 4045, opfikon: 66, renens: 5591, kloten: 62, schlieren: 247,
  vevey: 5890, baden: 4021, reinach: 2773, adliswil: 131, onex: 6631,
  volketswil: 199, 'glarus-nord': 1630, pully: 5590, regensdorf: 96,
  olten: 2581, martigny: 6136, thalwil: 141, gossau: 3443, muttenz: 2770,
  monthey: 6153, ostermundigen: 363, grenchen: 2546, 'illnau-effretikon': 296,
  wallisellen: 69, 'val-de-ruz': 6487, cham: 1702, wohlen: 4082, siders: 6248,
  solothurn: 2601, pratteln: 2831, burgdorf: 404, freienbach: 1322,
  einsiedeln: 1301, morges: 5642, steffisburg: 939, binningen: 2765, lyss: 306,
  locarno: 5113, herisau: 3001, langenthal: 329, schwyz: 1372, arbon: 4401,
  mendrisio: 5254, kuesnacht: 154, staefa: 158, liestal: 2829, thonex: 6640,
  meilen: 156, oftringen: 4280, horw: 1058, amriswil: 4461, ebikon: 1054,
  richterswil: 138, rheinfelden: 4258, 'kuessnacht-sz': 1331, zollikon: 161,
  uzwil: 3408, versoix: 6644, gland: 5721, 'brig-glis': 6002,
  'muri-bei-bern': 356, ecublens: 5635, buchs: 3271, muensingen: 616,
  spiez: 768, brugg: 4095, 'chene-bougeries': 6612, delsberg: 6711,
  glarus: 1632, rueti: 118, 'le-grand-saconnex': 6623, prilly: 5589,
  'affoltern-am-albis': 2, 'villars-sur-glane': 2228, arth: 1362,
  pfaeffikon: 177, spreitenbach: 4040, zofingen: 4289, 'la-tour-de-peilz': 5889,
  muenchenstein: 2769, altstaetten: 3251, bassersdorf: 52, veyrier: 6645,
  weinfelden: 4946, worb: 627, belp: 861, ittigen: 362, maennedorf: 155,
  hinwil: 117, romanshorn: 4436, risch: 1707, oberwil: 2771, moehlin: 4254,
  lenzburg: 4201, davos: 3851, maur: 195, suhr: 4012, zollikofen: 361,
  'plan-les-ouates': 6633, 'val-de-travers': 6512, sarnen: 1407, flawil: 3402,
  'neuhausen-am-rheinfall': 2937, aigle: 5401, lutry: 5606, birsfelden: 2766,
  sursee: 1103, aesch: 2761, naters: 6007, 'gossau-zuerich': 115,
  bernex: 6607, muenchenbuchsee: 546, 'crans-montana': 6253, wald: 120,
  steinhausen: 1708, payerne: 5822, urdorf: 250,
}

const BFS_CANTON_BY_SLUG = {
  zuerich: 'ZH', genf: 'GE', basel: 'BS', lausanne: 'VD', bern: 'BE',
  winterthur: 'ZH', luzern: 'LU', 'st-gallen': 'SG', lugano: 'TI',
  'biel-bienne': 'BE', thun: 'BE', bellinzona: 'TI', koeniz: 'BE',
  freiburg: 'FR', schaffhausen: 'SH', 'la-chaux-de-fonds': 'NE', chur: 'GR',
  uster: 'ZH', sitten: 'VS', vernier: 'GE', lancy: 'GE', neuenburg: 'NE',
  emmen: 'LU', zug: 'ZG', 'yverdon-les-bains': 'VD', duebendorf: 'ZH',
  kriens: 'LU', dietikon: 'ZH', 'rapperswil-jona': 'SG', meyrin: 'GE',
  montreux: 'VD', frauenfeld: 'TG', wetzikon: 'ZH', waedenswil: 'ZH',
  baar: 'ZG', bulle: 'FR', wil: 'SG', horgen: 'ZH', carouge: 'GE',
  kreuzlingen: 'TG', buelach: 'ZH', aarau: 'AG', nyon: 'VD', riehen: 'BS',
  allschwil: 'BL', wettingen: 'AG', opfikon: 'ZH', renens: 'VD', kloten: 'ZH',
  schlieren: 'ZH', vevey: 'VD', baden: 'AG', reinach: 'BL', adliswil: 'ZH',
  onex: 'GE', volketswil: 'ZH', 'glarus-nord': 'GL', pully: 'VD',
  regensdorf: 'ZH', olten: 'SO', martigny: 'VS', thalwil: 'ZH', gossau: 'SG',
  muttenz: 'BL', monthey: 'VS', ostermundigen: 'BE', grenchen: 'SO',
  'illnau-effretikon': 'ZH', wallisellen: 'ZH', 'val-de-ruz': 'NE', cham: 'ZG',
  wohlen: 'AG', siders: 'VS', solothurn: 'SO', pratteln: 'BL', burgdorf: 'BE',
  freienbach: 'SZ', einsiedeln: 'SZ', morges: 'VD', steffisburg: 'BE',
  binningen: 'BL', lyss: 'BE', locarno: 'TI', herisau: 'AR', langenthal: 'BE',
  schwyz: 'SZ', arbon: 'TG', mendrisio: 'TI', kuesnacht: 'ZH', staefa: 'ZH',
  liestal: 'BL', thonex: 'GE', meilen: 'ZH', oftringen: 'AG', horw: 'LU',
  amriswil: 'TG', ebikon: 'LU', richterswil: 'ZH', rheinfelden: 'AG',
  'kuessnacht-sz': 'SZ', zollikon: 'ZH', uzwil: 'SG', versoix: 'GE',
  gland: 'VD', 'brig-glis': 'VS', 'muri-bei-bern': 'BE', ecublens: 'VD',
  buchs: 'SG', muensingen: 'BE', spiez: 'BE', brugg: 'AG',
  'chene-bougeries': 'GE', delsberg: 'JU', glarus: 'GL', rueti: 'ZH',
  'le-grand-saconnex': 'GE', prilly: 'VD', 'affoltern-am-albis': 'ZH',
  'villars-sur-glane': 'FR', arth: 'SZ', pfaeffikon: 'ZH', spreitenbach: 'AG',
  zofingen: 'AG', 'la-tour-de-peilz': 'VD', muenchenstein: 'BL',
  altstaetten: 'SG', bassersdorf: 'ZH', veyrier: 'GE', weinfelden: 'TG',
  worb: 'BE', belp: 'BE', ittigen: 'BE', maennedorf: 'ZH', hinwil: 'ZH',
  romanshorn: 'TG', risch: 'ZG', oberwil: 'BL', moehlin: 'AG', lenzburg: 'AG',
  davos: 'GR', maur: 'ZH', suhr: 'AG', zollikofen: 'BE',
  'plan-les-ouates': 'GE', 'val-de-travers': 'NE', sarnen: 'OW', flawil: 'SG',
  'neuhausen-am-rheinfall': 'SH', aigle: 'VD', lutry: 'VD', birsfelden: 'BL',
  sursee: 'LU', aesch: 'BL', naters: 'VS', 'gossau-zuerich': 'ZH',
  bernex: 'GE', muenchenbuchsee: 'BE', 'crans-montana': 'VS', wald: 'ZH',
  steinhausen: 'ZG', payerne: 'VD', urdorf: 'ZH', aargau: 'AG', thurgau: 'TG',
}

const BFS_CANTON_LABEL = {
  ZH: 'Zürich', BE: 'Bern / Berne', LU: 'Luzern', UR: 'Uri', SZ: 'Schwyz',
  OW: 'Obwalden', NW: 'Nidwalden', GL: 'Glarus', ZG: 'Zug',
  FR: 'Fribourg / Freiburg', SO: 'Solothurn', BS: 'Basel-Stadt',
  BL: 'Basel-Landschaft', SH: 'Schaffhausen', AR: 'Appenzell Ausserrhoden',
  AI: 'Appenzell I.Rh.', SG: 'St. Gallen',
  GR: 'Graubünden / Grigioni / Grischun', AG: 'Aargau', TG: 'Thurgau',
  TI: 'Ticino', VD: 'Vaud', VS: 'Valais / Wallis', NE: 'Neuchâtel',
  GE: 'Genève', JU: 'Jura',
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function fetchWithRetry(url, opts, label) {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const res = await fetch(url, opts)
      if (res.status === 429) {
        const wait = attempt * 2000
        process.stdout.write(`\n  ⚠ 429 ${label} — wait ${wait / 1000}s…`)
        await sleep(wait)
        continue
      }
      if (res.status >= 500) {
        const wait = attempt * 1500
        await sleep(wait)
        continue
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res
    } catch (err) {
      if (attempt === 5) throw err
      await sleep(attempt * 1500)
    }
  }
}

function normalizeIndex(idx) {
  if (Array.isArray(idx)) {
    const m = {}
    idx.forEach((code, pos) => (m[code] = pos))
    return m
  }
  return idx
}

function parseJsonStat2(j) {
  const yearDim = j.dimension[VAR_JAHR]
  const compDim = j.dimension[VAR_KOMPONENTE]
  if (!yearDim || !compDim) return []

  const yearIndex = normalizeIndex(yearDim.category.index)
  const compIndex = normalizeIndex(compDim.category.index)
  const dimOrder = j.id
  const dimSizes = j.size
  const dimOf = new Map(dimOrder.map((d, i) => [d, i]))
  const yearPosInId = dimOf.get(VAR_JAHR)
  const compPosInId = dimOf.get(VAR_KOMPONENTE)
  if (yearPosInId === undefined || compPosInId === undefined) return []

  const mults = new Array(dimOrder.length).fill(1)
  for (let d = dimOrder.length - 2; d >= 0; d--) mults[d] = mults[d + 1] * dimSizes[d + 1]

  const result = new Map()
  for (const [yearLabel, yPos] of Object.entries(yearIndex)) {
    const yearNum = parseInt(yearLabel, 10)
    if (Number.isNaN(yearNum)) continue
    const row = {
      year: yearNum, einwanderung: 0, interkantonalerZuzug: 0, intrakantonalerZuzug: 0,
      auswanderung: 0, interkantonalerWegzug: 0, intrakantonalerWegzug: 0,
    }
    for (const compCode of COMPONENT_INDICES) {
      const cPos = compIndex[compCode]
      if (cPos === undefined) continue
      const indices = new Array(dimOrder.length).fill(0)
      indices[yearPosInId] = yPos
      indices[compPosInId] = cPos
      let lin = 0
      for (let d = 0; d < dimOrder.length; d++) lin += indices[d] * mults[d]
      const v = j.value[lin]
      if (typeof v === 'number') row[COMPONENT_KEY[compCode]] = v
    }
    result.set(yearNum, row)
  }
  return [...result.values()].sort((a, b) => a.year - b.year)
}

async function queryByCode(scopeCode, scope, scopeLabel, meta) {
  const body = {
    query: [
      { code: VAR_JAHR, selection: { filter: 'all', values: ['*'] } },
      { code: VAR_GLIEDERUNG, selection: { filter: 'item', values: [scopeCode] } },
      { code: VAR_NATIONALITAET, selection: { filter: 'item', values: ['0'] } },
      { code: VAR_GESCHLECHT, selection: { filter: 'item', values: ['0'] } },
      { code: VAR_KOMPONENTE, selection: { filter: 'item', values: [...COMPONENT_INDICES] } },
    ],
    response: { format: 'json-stat2' },
  }
  const res = await fetchWithRetry(CUBE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  }, scopeLabel)
  const json = await res.json()
  const rows = parseJsonStat2(json)
  if (rows.length === 0) throw new Error('No rows in response')
  const years = rows.map((r) => r.year).sort((a, b) => a - b)
  return { scope, scopeLabel, bfsCode: scopeCode, rows, yearRange: [years[0], years[years.length - 1]] }
}

// ---------------------------------------------------------------------------
// Concurrency pool — run N tasks at a time
// ---------------------------------------------------------------------------

async function pool(tasks, concurrency) {
  const results = new Array(tasks.length)
  let index = 0

  async function worker() {
    while (index < tasks.length) {
      const i = index++
      try {
        results[i] = { status: 'fulfilled', value: await tasks[i]() }
      } catch (err) {
        results[i] = { status: 'rejected', reason: err }
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker))
  return results
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('Fetching BFS cube metadata…')
  const metaRes = await fetchWithRetry(CUBE_URL, { headers: { Accept: 'application/json' } }, 'metadata')
  const meta = await metaRes.json()

  const gli = meta.variables.find((v) => v.code === VAR_GLIEDERUNG)
  if (!gli) throw new Error('Gliederungs-Variable not found')
  const bfsNrToCode = new Map()
  const cantonLabelToCode = new Map()
  gli.valueTexts.forEach((label, idx) => {
    const code = gli.values[idx]
    const m = /^\.{6}(\d{1,4})\s/.exec(label)
    if (m) { bfsNrToCode.set(parseInt(m[1], 10), code); return }
    if (label.startsWith('- ')) cantonLabelToCode.set(label.slice(2).trim(), code)
  })
  console.log(`  ${bfsNrToCode.size} Gemeinden, ${cantonLabelToCode.size} Kantone in cube\n`)

  // Load existing cache (resume support)
  let entries = {}
  if (fs.existsSync(OUT_FILE)) {
    try {
      entries = JSON.parse(fs.readFileSync(OUT_FILE, 'utf-8')).entries ?? {}
      console.log(`Resuming — ${Object.keys(entries).length} entries already cached`)
    } catch {}
  }

  // Build task list
  const tasks = []

  // Gemeinden
  for (const [slug, bfsNr] of Object.entries(BFS_GEMEINDE_NR_BY_SLUG)) {
    const key = `gemeinde:${bfsNr}`
    if (entries[key]) continue
    const code = bfsNrToCode.get(bfsNr)
    if (!code) { console.warn(`  ⚠ ${slug} (BFS ${bfsNr}) not in cube`); continue }
    tasks.push(async () => {
      const result = await queryByCode(code, 'gemeinde', slug, meta)
      entries[key] = result
      process.stdout.write(`  ✓ ${slug}\n`)
      return key
    })
  }

  // Kantone (unique codes only)
  const uniqueCantons = [...new Set(Object.values(BFS_CANTON_BY_SLUG))]
  for (const cantonCode of uniqueCantons) {
    const key = `kanton:${cantonCode}`
    if (entries[key]) continue
    const label = BFS_CANTON_LABEL[cantonCode] ?? cantonCode
    const code = cantonLabelToCode.get(label)
    if (!code) { console.warn(`  ⚠ Canton ${cantonCode} not in cube`); continue }
    tasks.push(async () => {
      const result = await queryByCode(code, 'kanton', label, meta)
      entries[key] = result
      process.stdout.write(`  ✓ ${cantonCode}\n`)
      return key
    })
  }

  console.log(`Fetching ${tasks.length} entries with concurrency=${CONCURRENCY}…\n`)
  const start = Date.now()

  const results = await pool(tasks, CONCURRENCY)

  const failed = results.filter((r) => r.status === 'rejected')
  if (failed.length) {
    console.warn(`\n  ${failed.length} failures:`)
    failed.forEach((r) => console.warn(`    ✗ ${r.reason?.message}`))
  }

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true })
  fs.writeFileSync(OUT_FILE, JSON.stringify({ generatedAt: new Date().toISOString(), entries }, null, 2))

  const elapsed = ((Date.now() - start) / 1000).toFixed(1)
  console.log(`\n✅ Done in ${elapsed}s — ${results.length - failed.length} fetched, ${failed.length} failed`)
  console.log(`📄 ${OUT_FILE}`)
}

main().catch((err) => { console.error('Fatal:', err); process.exit(1) })
