import { faqs as rawFaqs } from '@/data/locationFaqs.js'

export type CityFaqBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'table'; caption: string; rows: { size: string; cost: string }[] }
  | { type: 'cta'; text: string; buttonText: string; href: string }

export type CityFaqItem = {
  question: string
  blocks: CityFaqBlock[]
  /** Plain answer for JSON-LD */
  plainAnswer: string
}

type FaqBucketKey = 'move' | 'clean' | 'paint'

const CATEGORY_TO_BUCKET: Record<string, FaqBucketKey> = {
  umzugsfirma: 'move',
  reinigungsfirma: 'clean',
  malerfirma: 'paint',
}

export function cityQuoteHref(categorySlug: string, locationName: string): string {
  const city = encodeURIComponent(locationName)
  if (categorySlug === 'umzugsfirma') {
    return `/kostenlose-offerte-anfordern?service=umzug&step=2&city=${city}`
  }
  if (categorySlug === 'reinigungsfirma') {
    return `/kostenlose-offerte-anfordern?service=reinigung&step=2&city=${city}`
  }
  return `/kostenlose-offerte-anfordern?service=maler&step=2&city=${city}`
}

function replaceCity(s: string, city: string): string {
  return s.split('{city}').join(city)
}

function pickDe(v: { de?: string; en?: string } | undefined): string {
  return typeof v?.de === 'string' ? v.de : ''
}

function blocksToPlainText(blocks: CityFaqBlock[]): string {
  const parts: string[] = []
  for (const b of blocks) {
    if (b.type === 'paragraph') parts.push(b.text)
    if (b.type === 'table') {
      parts.push(b.caption)
      for (const r of b.rows) parts.push(`${r.size}: ${r.cost}`)
    }
    if (b.type === 'cta') parts.push(`${b.text} ${b.buttonText}`)
  }
  return parts.join(' ').replace(/\s+/g, ' ').trim()
}

function processAnswerBlocks(
  answer: unknown[],
  city: string,
  categorySlug: string
): CityFaqBlock[] {
  const out: CityFaqBlock[] = []
  for (const raw of answer) {
    if (!raw || typeof raw !== 'object') continue
    const block = raw as Record<string, unknown>

    if (block.type === 'table' && Array.isArray(block.data)) {
      const cap = pickDe(block.caption as { de?: string })
      out.push({
        type: 'table',
        caption: replaceCity(cap, city),
        rows: (block.data as { size: string; cost: string }[]).map((row) => ({
          size: row.size,
          cost: row.cost,
        })),
      })
      continue
    }

    if (block.type === 'calculator_link') {
      const text = pickDe(block.text as { de?: string })
      const buttonText = pickDe(block.buttonText as { de?: string })
      out.push({
        type: 'cta',
        text: replaceCity(text, city),
        buttonText: replaceCity(buttonText, city),
        href: cityQuoteHref(categorySlug, city),
      })
      continue
    }

    const line = pickDe(block as { de?: string })
    if (line) {
      out.push({ type: 'paragraph', text: replaceCity(line, city) })
    }
  }
  return out
}

/** German FAQs for a category + city (Umzug, Reinigung, Maler). */
export function getCityFaqsForCategory(categorySlug: string, city: string): CityFaqItem[] {
  const bucket = CATEGORY_TO_BUCKET[categorySlug]
  if (!bucket) return []

  const list = rawFaqs[bucket] as Array<{
    question: { de?: string }
    answer: unknown[]
  }>

  return list.map((item) => {
    const q = replaceCity(pickDe(item.question), city)
    const blocks = processAnswerBlocks(item.answer ?? [], city, categorySlug)
    return {
      question: q,
      blocks,
      plainAnswer: blocksToPlainText(blocks),
    }
  })
}

export function getCityPageLocalContent(
  categorySlug: string,
  locationName: string,
  canton: string
): { headline: string; paragraphs: string[]; bullets: string[] } {
  const k = `Kanton ${canton}`

  if (categorySlug === 'umzugsfirma') {
    return {
      headline: `Umzug in ${locationName}: regional planen, Offerten vergleichen`,
      paragraphs: [
        `In ${locationName} (${k}) unterstützen Sie geprüfte Umzugsfirmen bei Privat- und Geschäftsumzügen – von der Besichtigung über Verpackung und Transport bis zur Möbellagerung. Mit einer Anfrage auf Online-Offerten.ch erhalten Sie bis zu fünf vergleichbare Offerten und behalten den Überblick über Leistung und Preis.`,
        `Lokale Zügelunternehmen kennen typische Wohnformen, Zufahrten und behördliche Vorgaben in ${locationName}. Für Spezialtransporte, Fernumzüge oder feste Termine lohnt sich eine frühzeitige Offerte; so können Sie Kapazitäten und Preise realistisch einplanen.`,
      ],
      bullets: [
        'Ein Anfrageformular, mehrere geprüfte Anbieter aus der Region',
        'Kostenlos & unverbindlich – Sie entscheiden, wen Sie beauftragen',
        'Transparente Leistungen: Versicherung, Material, Zusatzservices klären',
      ],
    }
  }

  if (categorySlug === 'reinigungsfirma') {
    return {
      headline: `Reinigung in ${locationName}: Haushalt, Büro & Endreinigung`,
      paragraphs: [
        `Reinigungsfirmen in ${locationName} (${k}) übernehmen Unterhaltsreinigung, Umzugsreinigung mit Abnahmegarantie, Büroreinigung und Spezialaufträge. Über unsere Plattform vergleichen Sie Offerten von Partnern, die in Ihrer Region aktiv sind – ohne endloses Einzelanfragen.`,
        `Besonders bei der Wohnungsübergabe zählen Termintreue und dokumentierte Arbeit. Klären Sie Umfang, Abnahme und Nachbesserung vorab schriftlich; unsere Partner gewähren in der Regel klare Zusagen zur Abnahmegarantie.`,
      ],
      bullets: [
        'Endreinigung & Abnahmegarantie für stressfreie Übergaben',
        'Flexible Einsätze: Wohnung, Haus, Gewerbe in und um ' + locationName,
        'Mehrere Offerten vergleichen, einen Anbieter wählen',
      ],
    }
  }

  if (categorySlug === 'malerfirma') {
    return {
      headline: `Malerarbeiten in ${locationName}: Angebote einholen & vergleichen`,
      paragraphs: [
        `Malerfirmen in ${locationName} (${k}) kalkulieren nach Fläche, Untergrund, Anstrichsystem und Vorarbeiten. Ein detailliertes Angebot sollte Material, Arbeitsaufwand, Anzahl Anstriche und Ausschlüsse klar benennen – genau dafür lohnt der Vergleich mehrerer Offerten.`,
        `Ob Renovation vor Einzug, frischer Anstrich vor Verkauf oder Teilarbeiten: regionale Betriebe sind schnell vor Ort. Nutzen Sie eine zentrale Anfrage, um passende Maler zu erreichen und realistische Preise für ${locationName} zu erhalten.`,
      ],
      bullets: [
        'Klare Angebote: Vorbereitung, Material, Anstriche, Reinigung',
        'Geprüfte Partner – Sie wählen den passenden Malerbetrieb',
        'Kostenlose Offerten – unverbindlich vergleichen',
      ],
    }
  }

  return {
    headline: `Anbieter in ${locationName}`,
    paragraphs: [
      `In ${locationName} (${k}) finden Sie passende Fachbetriebe und vergleichen Offerten bequem online.`,
    ],
    bullets: [],
  }
}

export function buildCityFaqJsonLd(items: CityFaqItem[]): Record<string, unknown> | null {
  if (items.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.plainAnswer,
      },
    })),
  }
}
