import { faqs as rawFaqs } from '@/data/locationFaqs.js'
import {
  getKlaviertransportCityContent,
  type KlaviertransportCityBlock,
} from '@/data/klaviertransportCityContent'
import {
  getGeschaeftsumzugCityContent,
  type GeschaeftsumzugCityBlock,
} from '@/data/geschaeftsumzugCityContent'

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

/** Pseudozufalls-Index aus Slug — deterministisch, stabil über Builds. */
function pickByCity(slug: string, max: number, salt = ''): number {
  const s = `${salt}|${slug}`.toLowerCase()
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h + s.charCodeAt(i) * (i + 3)) % 1031
  return h % Math.max(1, max)
}

/** Pro Kanton typische Klaviertransport-Hürden – damit jeder Text einzigartig wirkt. */
const KLAVIER_KANTON_KONTEXT: Record<string, string> = {
  ZH: 'enge Altstadtgassen, Hangquartiere am Zürichsee und strenge Halteverbots-Regeln',
  GE: 'schmale Gassen in der Vieille-Ville, Jura-Hänge und stark frequentierte Zufahrten',
  BS: 'historische Altstadthäuser, Kopfsteinpflaster und enge Innenhöfe',
  VD: 'Hanglagen oberhalb des Genfersees, Treppen­quartiere und Weinberg­zufahrten',
  BE: 'UNESCO-Lauben, Sandstein-Treppenhäuser und steile Aare-Quartiere',
  LU: 'Altstadt mit Kapellbrücke-Quartier, hügelige Stadtlagen und schmale Gassen',
  AG: 'Altstadtkerne (Aarau, Baden, Brugg), Treppenhäuser im Mittelland und ländliche Zufahrten',
  TG: 'Bodensee-Ortskerne, Riegelbau-Häuser und schmale Dorfzufahrten',
  SG: 'Altstadt mit Erkern, hügelige Lagen rund um den Bodensee und Appenzellerland-Verbindungen',
  TI: 'enge Tessiner Altstadtgassen, Gebirgsstrassen und Riviera-Hanglagen',
  GR: 'Hochgebirgs-Strassen, Engadiner Dorfzentren und Saisonzufahrten',
  VS: 'Walliser Bergorte, schmale Walliserhäuser-Treppen und Talstrassen',
  ZG: 'Seehang-Quartiere, Altstadt­gassen und kompakte Wohngebiete',
  FR: 'Ober- und Unterstadt-Niveauwechsel, Sandstein­bauten und enge Altstadtgassen',
  NE: 'Steillagen über dem See, Jura-Höhen und Altstadt­zonen',
  SH: 'Altstadt mit Erkerfassaden, Rhein-Hanglagen und Fussgängerzonen',
  SO: 'Barockaltstadt, schmale Treppenhäuser und Aare-Brückenzufahrten',
  SZ: 'Bergdörfer, schmale Talstrassen und Hangquartiere am Vierwaldstättersee',
  BL: 'Vorort-Strassen, Hanglagen und enge Reihenhausquartiere',
  TG_default: 'Dorfzentren mit historischer Bausubstanz und engen Zufahrten',
}

/**
 * Keyword-Schluss-Sätze – ein Pool von SEO-zentrierten Closing-Sätzen, die
 * stadt-deterministisch ausgewählt werden. Sie weben "Klaviertransport
 * vergleichen / Preisvergleich / Pianotransport Schweiz / Klavier & Flügel
 * zügeln / Professioneller Klaviertransport" auf natürliche Art ein und
 * sagen NICHT, was online-offerten.ch tut oder nicht tut – sie sprechen
 * vom Service "Klaviertransport".
 *
 * Wichtig: keine harten Garantien (Versicherung *inklusive*, Klimaschutz
 * *garantiert*) formulieren – das ist Sache des einzelnen Anbieters.
 */
function klavierKeywordCloser(locationName: string, slug: string): string {
  const closers = [
    `Klaviertransport Offerten vergleichen in ${locationName}: eine kurze Anfrage genügt, mehrere Klaviertransport-Anbieter melden sich mit individuellen Preisen.`,
    `Klaviertransport Preisvergleich Schweiz – für ${locationName} sehen Sie auf einen Blick, wie sich Preise, Leistungen und Optionen für Klavier- und Flügeltransport unterscheiden.`,
    `Klavier & Flügel zügeln in ${locationName}: ob Upright, Stutzflügel oder Konzertflügel – die Klaviertransport-Anbieter im Vergleich nennen Ihnen direkt einen Klaviertransport-Preis für Ihren konkreten Fall.`,
    `Pianotransport Schweiz, lokal in ${locationName} ausgeführt: vom kurzen Transport innerhalb der Stadt bis zum Klavier­transport in einen anderen Kanton – Angebote nebeneinander vergleichen, statt jede Firma einzeln anzurufen.`,
    `Professioneller Klaviertransport in der Schweiz, ganz konkret für ${locationName}: passende Spezialisten kontaktieren Sie über eine einzige Anfrage – kostenlos, ohne lange Suche, mit mehreren Klaviertransport-Offerten zum Vergleich.`,
    `Klaviertransport ${locationName} Preise auf einen Blick: vom Upright-Klavier im Erdgeschoss bis zum Konzertflügel im Altbau – die Klaviertransport-Anbieter rechnen Ihren Fall individuell durch.`,
  ]
  return closers[pickByCity(slug, closers.length, 'k')]
}

/** Variante mit handgeschriebenem City-Block (zuerich, basel, dietikon, …). */
function klaviertransportLocalTextFromCityBlock(
  locationName: string,
  canton: string,
  block: KlaviertransportCityBlock,
  slug: string
): { headline: string; paragraphs: string[]; bullets: string[] } {
  const k = `Kanton ${canton}`
  /* Headline-Pool stadtspezifisch – sonst wäre jede Block-Stadt mit derselben
     H2 ausgestattet. */
  const headlinePool = [
    `Klaviertransport ${locationName}: Klavier & Flügel zügeln vor Ort`,
    `Pianotransport in ${locationName} – Praxis, Routen, Logistik`,
    `Vor Ort in ${locationName}: Klavier­transport zwischen Altbau und Hanglage`,
    `Klaviertransport-Anbieter ${locationName}: Klavier, Flügel & schwere Instrumente`,
    `Professioneller Klaviertransport in ${locationName} (${canton})`,
  ]
  const headline = headlinePool[pickByCity(slug, headlinePool.length, 'hb')]

  return {
    headline,
    paragraphs: [
      `${block.kontext} ${block.zugang}`,
      `${block.region} ${klavierKeywordCloser(locationName, slug)}`,
      `${locationName} (${k}) – Praxistipp: ${block.vorOrtTipp}`,
    ],
    bullets: [
      `Klaviertransport ${locationName}: Anfrage in wenigen Minuten`,
      `Klaviertransport-Anbieter mit Routen-Erfahrung rund um ${locationName}`,
      'Klavier (Upright) und Flügel (Stutz-/Konzertflügel) – beides möglich',
      'Bis zu 5 Klaviertransport-Offerten zum direkten Vergleich',
    ],
  }
}

/** Fallback: kanton-basierte Variation (wenn keine handgeschriebene Stadt vorliegt). */
function klaviertransportLocalTextFallback(
  locationName: string,
  canton: string,
  locationSlug?: string
): { headline: string; paragraphs: string[]; bullets: string[] } {
  const slug = (locationSlug ?? locationName).toLowerCase()
  const k = `Kanton ${canton}`
  const kontext = KLAVIER_KANTON_KONTEXT[canton] ?? `typische Schweizer Zufahrten und Treppenhäuser`

  const headlines = [
    `Klaviertransport ${locationName}: Klavier & Flügel zügeln in der Schweiz`,
    `Klaviertransport in ${locationName} – Pianotransport, Flügel & Preise`,
    `Klavier­transport ${locationName}: Klavier­transport-Offerten vergleichen`,
    `Professioneller Klaviertransport in ${locationName} (${canton})`,
    `Pianotransport Schweiz – Klavier­transport in ${locationName}`,
  ]

  /* Reine Service-Texte zum Klaviertransport in {locationName}; keine
     Plattform-/Vergleichsportal-Sätze. Closer am Ende ist der Keyword-Satz. */
  const intros = [
    `Ein Klaviertransport in ${locationName} (${k}) ist Präzisionsarbeit: Klaviere wiegen 200–400 kg, Flügel bis zu 500 kg. Spezialisierte Klaviertransport-Anbieter bringen passendes Equipment, Spezialgurte und Klavier­roller mit – damit Klavier oder Flügel sicher in den nächsten Raum, das nächste Stockwerk oder den nächsten Kanton kommen. ${klavierKeywordCloser(locationName, slug)}`,
    `Wer in ${locationName} einen Klavier- oder Flügeltransport plant, denkt an mehr als nur die Kilometer: ${kontext} machen jede Tour einzigartig. Genau dafür gibt es spezialisierte Klaviertransport-Anbieter, die Klavier und Flügel als Spezialgut bewegen – statt sie wie eine gewöhnliche Möbel­position mitzuführen. ${klavierKeywordCloser(locationName, slug)}`,
    `Klaviertransport in ${locationName}: ob Upright, Stutzflügel oder Konzertflügel – Klaviertransport-Anbieter mit Erfahrung in ${kontext} kennen die typischen Hürden, vom engen Treppenhaus bis zur Hangstrasse. ${klavierKeywordCloser(locationName, slug)}`,
    `Für einen Klaviertransport in ${locationName} zählen Erfahrung mit ${kontext}, das passende Equipment (Spezialgurte, Klavierroller, ggf. Möbellift) und eine sorgfältige Planung von Türen, Aufzug und Stockwerken. ${klavierKeywordCloser(locationName, slug)}`,
  ]

  const followUps = [
    `Klavier­transport-Anbieter in ${locationName} arbeiten je nach Lage mit Klavier­rollern, Spezialgurten und Polsterung; bei höheren Stockwerken oder schmalen Treppenhäusern wird oft ein Aussen- oder Möbellift eingesetzt. Welche Lösung in Ihrem konkreten Fall sinnvoll ist, beschreibt der Anbieter in seiner Klaviertransport-Offerte.`,
    `Marken wie Yamaha, Steinway, Kawai, Bechstein, Schimmel oder Bösendorfer werden von erfahrenen Klaviertransport-Profis als Spezialgut behandelt – mit Demontage von Beinen und Pedalen bei Flügeln, sicherem Aufladen und Aufstellen am Zielort in ${locationName}.`,
    `Damit der Klaviertransport in ${locationName} reibungslos läuft, klären die Anbieter im Voraus Punkte wie Aufzug-Innenmasse, Türöffnungen, Bodenbelastung am Zielort und – wo nötig – Halteverbot oder Parkbewilligung. Diese Details sehen Sie direkt in den jeweiligen Klaviertransport-Offerten.`,
    `Nach einem Klavier- oder Flügeltransport empfehlen Klavierbauer, das Instrument 2–4 Wochen später stimmen zu lassen, damit sich Holz und Saiten am neuen Standort in ${locationName} akklimatisieren können. Manche Klaviertransport-Anbieter bieten die Stimmung gleich als optionale Zusatzleistung an.`,
  ]

  const bulletsPool = [
    `Klaviertransport ${locationName} – Klavier & Flügel zügeln aus einer Hand`,
    `Klaviertransport-Anbieter mit Erfahrung in ${kontext}`,
    `Pianotransport Schweiz: Upright, Stutz- und Konzertflügel`,
    `Klaviertransport-Offerten direkt mit Klaviertransport-Preisen vergleichen`,
    `Spezial­equipment: Klavierroller, Gurte, Polsterung, ggf. Möbellift`,
    `Halteverbot / Parkbewilligung in ${locationName} mit dem Anbieter koordiniert`,
    `Klaviertransport Preisvergleich Schweiz – ohne lange Google-Suche`,
    `Professioneller Klaviertransport in der Schweiz, lokal für ${locationName}`,
  ]

  const idxH = pickByCity(slug, headlines.length, 'h')
  const idxI = pickByCity(slug, intros.length, 'i')
  const idxF = pickByCity(slug, followUps.length, 'f')

  const startBullet = pickByCity(slug, bulletsPool.length, 'b')
  const bullets = [
    bulletsPool[startBullet],
    bulletsPool[(startBullet + 2) % bulletsPool.length],
    bulletsPool[(startBullet + 4) % bulletsPool.length],
    bulletsPool[(startBullet + 6) % bulletsPool.length],
  ]

  return {
    headline: headlines[idxH],
    paragraphs: [intros[idxI], followUps[idxF]],
    bullets,
  }
}

/**
 * Klaviertransport-Stadtinhalt mit zwei Stufen:
 *  1) Wenn für den Slug ein handgeschriebener City-Block vorliegt
 *     (`klaviertransportCityContent.ts`), nutzen wir den – maximale Lokalität.
 *  2) Andernfalls Kanton-basierte Variation als Fallback.
 *
 * In beiden Pfaden bleibt der Text bewusst service-zentriert (Klavier­transport,
 * Pianotransport, Klavier & Flügel zügeln). Plattform-/Portal-Sätze gibt es
 * nicht – Google soll die Seite als Klavier­transport-Inhalt für die Stadt
 * lesen, nicht als Werbung für online-offerten.ch.
 */
function klaviertransportLocalText(
  locationName: string,
  canton: string,
  locationSlug?: string
): { headline: string; paragraphs: string[]; bullets: string[] } {
  const slug = (locationSlug ?? locationName).toLowerCase()
  if (locationSlug) {
    const block = getKlaviertransportCityContent(locationSlug)
    if (block) {
      return klaviertransportLocalTextFromCityBlock(locationName, canton, block, slug)
    }
  }
  return klaviertransportLocalTextFallback(locationName, canton, locationSlug)
}

/* -------------------------------------------------------------------------- */
/* Geschäftsumzug / Firmenumzug / Büroumzug                                   */
/* -------------------------------------------------------------------------- */

/**
 * Pro Kanton typische B2B-Geschäftsumzug-Realitäten (Bürobezirke, Anliefer-
 * zonen, Innenstadt-Verkehr) – damit jeder Fallback-Text einzigartig wirkt.
 * Bewusst auf Business-Logistik fokussiert: Loading Zones, Anlieferzeit­
 * fenster, Nachtanlieferung – KEINE privaten Wohn-Statistiken.
 */
const GESCHAEFT_KANTON_KONTEXT: Record<string, string> = {
  ZH: 'dichte Business-Districts (Paradeplatz, Zürich-West, Oerlikon) mit strengen Loading-Zone-Zeitfenstern und Nachtanlieferungs­regelungen',
  GE: 'internationale Organisationen, Privatbanken und enge Innenstadt-Verkehrs­zonen rund um Place des Nations und Rive',
  BS: 'Pharma-Campus (Roche, Novartis), Rheinhafen-Logistik und Anlieferzonen mit Werks-Sicherheits­regeln',
  VD: 'Versicherungs-/Tech-Hubs am Genfersee, Hang-Bürolagen und Tagesverkehr mit Loading-Slots',
  BE: 'Verwaltungs- und Versicherungsstandorte, UNESCO-Lauben mit beschränkten Anlieferzeit­fenstern und Wankdorf-Bürotürme',
  LU: 'Banken am Bahnhofquartier, KMU-Cluster in Ebikon/Rotkreuz und enge Altstadt-Loading-Zones',
  AG: 'Industrie-/Tech-Hubs (ABB-Baden) und KMU-Bürozonen mit klaren Werks-Anlieferregeln',
  TG: 'Bodensee-Industrie, KMU-Bürocluster und schmale Anliefer­zufahrten in den Stadtkernen',
  SG: 'Versicherungs-Headquarter, Stiftsbezirk-Anlieferungen und Industrie­zonen in Bruggen',
  TI: 'Tessiner ZTL-Zonen mit Zufahrts­bewilligung, Privatbanken und Industrieflächen in Pian Scairolo/Manno',
  GR: 'Verwaltungs- und Tourismus-Holdings, Bergstrassen-Logistik und Industriezone Domat/Ems',
  VS: 'Walliser Verwaltungs-/Energie-Cluster, Talstrassen und Industriezonen entlang der Rhone',
  ZG: 'Holding-/Crypto-Sitze (Baarerstrasse, Suurstoffi), moderne Bürohäuser mit Frachtaufzügen',
  FR: 'Universitäts- und Verwaltungs­umfeld, Niveauwechsel zwischen Ober- und Unterstadt mit Spezial-Anlieferung',
  NE: 'Uhrenmanufakturen mit Werks-Sicherheit, Schachbrett-Stadt­grundrisse und Industrie-Loading',
  SH: 'Industriestadt mit Cross-Border-Logistik nach Süddeutschland und Werks-Anlieferzonen (Georg Fischer, IWC)',
  SO: 'KMU-Mittelstand, Aare-Brücken­zufahrten und Industriezone West',
  SZ: 'Holding-/KMU-Sitze (Pfäffikon, Wollerau), Hang-Bürozonen und schmale Anlieferzonen',
  BL: 'Vorort-Bürozentren, Industrie­zonen Pratteln/Muttenz und Anliefer­slots an Pendlerstrassen',
  NW: 'Stansstadt-Industrie, KMU-Bürozonen und enge Tal-Anlieferzufahrten',
  OW: 'Alpine Verwaltungs- und Industrie­standorte mit kleinräumigen Loading-Zones',
  AR: 'KMU-Cluster, Stickerei-/Textil­tradition und enge Anlieferzonen in den Altstadt­kernen',
  AI: 'Kleinstadt-Bürostrukturen, Tourismus-KMU und ländliche Anliefer­zufahrten',
  GL: 'Industrie­tradition, Talverwaltung und kompakte Geschäfts­zentren',
  UR: 'Reuss-Talverwaltung, Logistikknoten Erstfeld und enge Tal-Anlieferungen',
  JU: 'Uhren-Industrie, Verwaltungs­strukturen und Cross-Border-Logistik nach Frankreich',
}

/**
 * B2B-Marketplace-Satz für Geschäftsumzug-Stadtseiten.
 * Die Plattform stellt klar: Wir vergleichen, wir transportieren nicht.
 */
const GESCHAEFT_MARKETPLACE_LINE =
  'Online-Offerten.ch ist ein B2B-Vergleichsportal für Geschäftsumzüge – wir führen den Firmenumzug nicht selbst durch. Nach einer einzigen Anfrage erhalten Sie bis zu 5 Offerten von auf Geschäftsumzüge spezialisierten Partnern – kostenlos und unverbindlich.'

/** B2B-Closer mit Downtime-/IT-Server-/Wochenend-Schicht-Schwerpunkt. */
function geschaeftKeywordCloser(locationName: string, slug: string): string {
  const closers = [
    `Geschäftsumzug Offerten vergleichen in ${locationName}: bis zu 5 B2B-Partner zeigen ihren Plan für Downtime, IT-Migration und Wochenend-Schicht.`,
    `Firmenumzug ${locationName}: Server-Migration, Loading-Zone-Slot und Mitarbeiter-Onboarding am Montag – die Anbieter zeigen das Konzept im Vergleich.`,
    `Büroumzug ${locationName} – vom Einzelbüro bis zum mehrstöckigen Firmensitz: Geschäftsumzug-Spezialisten kalkulieren Downtime, Wochenend-Schichten und IT-Server-Umzug individuell.`,
    `B2B-Geschäftsumzug ${locationName}: ob 10 oder 100 Arbeitsplätze, Firmenumzug-Profis planen Cut-Over, Loading Zones und Nacht-Anlieferung gemeinsam mit Ihnen.`,
    `Professioneller Geschäftsumzug in ${locationName}: über das B2B-Vergleichsportal Online-Offerten.ch erreichen Sie passende Firmenumzug-Spezialisten mit einer einzigen Anfrage.`,
  ]
  return closers[pickByCity(slug, closers.length, 'gk')]
}

/** Variante mit handgeschriebenem City-Block. */
function geschaeftsumzugLocalTextFromCityBlock(
  locationName: string,
  canton: string,
  block: GeschaeftsumzugCityBlock,
  slug: string
): { headline: string; paragraphs: string[]; bullets: string[] } {
  const k = `Kanton ${canton}`
  const headlinePool = [
    `Geschäftsumzug ${locationName}: Business-District, Loading Zones, IT-Slot`,
    `Firmenumzug in ${locationName} – Anlieferzeitfenster, Server-Migration, Innenstadt-Verkehr`,
    `Vor Ort in ${locationName}: B2B-Geschäftsumzug zwischen Bürotürmen und KMU-Quartier`,
    `Büroumzug-Anbieter ${locationName}: Loading Zone, Nacht­anlieferung, Frachtaufzug`,
    `Professioneller Geschäftsumzug in ${locationName} (${canton}) – B2B fokussiert`,
  ]
  const headline = headlinePool[pickByCity(slug, headlinePool.length, 'ghb')]

  return {
    headline,
    paragraphs: [
      `${block.kontext} ${block.logistik}`,
      `${block.region} ${geschaeftKeywordCloser(locationName, slug)}`,
      `${locationName} (${k}) – B2B-Praxistipp: ${block.vorOrtTipp}`,
      GESCHAEFT_MARKETPLACE_LINE,
    ],
    bullets: [
      `B2B-Geschäftsumzug ${locationName}: Anfrage in wenigen Minuten`,
      `Auf Geschäftsumzüge spezialisierte Partner aus ${locationName} und Umgebung`,
      'IT-Server-Umzug, Aktenarchiv, Mobiliar – als ein Projekt geplant',
      'Wochenend-Schichten und Nachtanlieferung möglich',
      'Bis zu 5 Firmenumzug-Offerten kostenlos vergleichen',
    ],
  }
}

/** Fallback: kanton-basierte B2B-Variation. */
function geschaeftsumzugLocalTextFallback(
  locationName: string,
  canton: string,
  locationSlug?: string
): { headline: string; paragraphs: string[]; bullets: string[] } {
  const slug = (locationSlug ?? locationName).toLowerCase()
  const k = `Kanton ${canton}`
  const kontext =
    GESCHAEFT_KANTON_KONTEXT[canton] ??
    `typische Schweizer Bürolagen, Innenstadt-Loading-Zones und Anlieferzeit­fenster`

  const headlines = [
    `Geschäftsumzug ${locationName}: B2B-Firmenumzug & Büroumzug-Profis`,
    `Firmenumzug in ${locationName} – Loading Zones, IT-Server, Wochenend-Schichten`,
    `Geschäftsumzug ${locationName}: B2B-Offerten von Firmenumzug-Spezialisten`,
    `Professioneller Geschäftsumzug in ${locationName} (${canton}) – B2B fokussiert`,
    `Büroumzug ${locationName} – Geschäftsumzug-Anbieter im B2B-Vergleich`,
  ]

  const intros = [
    `Ein Geschäftsumzug in ${locationName} (${k}) ist B2B-Projektarbeit: IT-Server, Aktenarchiv, Konferenz­technik und Mobiliar müssen mit minimalem Betriebs­ausfall verlagert werden. Auf Geschäftsumzüge spezialisierte Partner kennen ${kontext} und planen Cut-Over, Beschriftungs­system und Loading-Slots gemeinsam mit Ihnen. ${geschaeftKeywordCloser(locationName, slug)}`,
    `Wer in ${locationName} einen Firmenumzug plant, denkt an Downtime, IT-Server-Migration und Mitarbeiter­produktivität gleichzeitig. Genau dafür gibt es Geschäftsumzug-Spezialisten mit Erfahrung in ${kontext} – sie übernehmen Abbau, Transport und Aufbau, koordinieren Wochenend-Schichten und revisions­sichere Aktenvernichtung. ${geschaeftKeywordCloser(locationName, slug)}`,
    `Büroumzug in ${locationName}: ob Einzelbüro, KMU mit 20 Arbeitsplätzen oder mehrstöckiges Firmen-HQ – B2B-Geschäftsumzug-Profis erstellen einen Projektplan mit Meilensteinen, IT-Cut-Over, Wochenend-Schichten und klaren Verantwortlich­keiten pro Etage. ${geschaeftKeywordCloser(locationName, slug)}`,
    `Für einen reibungslosen Geschäftsumzug in ${locationName} zählen B2B-Erfahrung mit ${kontext}, geschultes Team für Server- und Mobiliar­transport, sowie eine sorgfältige Planung von Loading Zones, Nachtanlieferung und Frachtaufzug-Slots. ${geschaeftKeywordCloser(locationName, slug)}`,
  ]

  const followUps = [
    `Geschäftsumzug-Spezialisten in ${locationName} planen den Firmenumzug typischerweise über eine Wochenend-Schicht (Fr-So) oder in Etappen, damit der Betriebs­ausfall minimal bleibt. Beschriftungs­system, IT-Cut-Over und ein fester Projekt­leiter pro Stockwerk sind Standard – die Konditionen sehen Sie direkt in den B2B-Geschäftsumzug-Offerten.`,
    `Branchen wie Banken, Treuhand, Anwalts­kanzleien und Pharma-KMU haben in ${locationName} besondere Anforderungen an Datenschutz, Server-Migration und revisions­sichere Aktenvernichtung. Erfahrene Geschäftsumzug-Profis arbeiten nach DSG und dokumentieren das Akten­handling in nummerierten Boxen.`,
    `Damit der Geschäftsumzug in ${locationName} reibungslos läuft, klären gute B2B-Anbieter im Voraus Loading Zones, Halteverbots-Bewilligungen, Liftmasse, Bodenbelastung und – falls nötig – Nachtanlieferungs-Slots mit der Liegenschafts­verwaltung. Diese Punkte stehen transparent in der Firmenumzug-Offerte.`,
    `Zusätzlich zum Möbel- und Server-Transport bieten Geschäftsumzug-Firmen in ${locationName} oft Gewerbe­abnahme­begleitung mit dem Vermieter, Entsorgung von Altmobiliar, Spezial­transporte (Tresor, Server-Rack, Laborgerät) und Zollabwicklung bei grenz­überschreitenden Standorten. All das vergleichen Sie B2B-transparent in den Büroumzug-Offerten.`,
  ]

  const bulletsPool = [
    `B2B-Geschäftsumzug ${locationName} – Büro, Ladenlokal, Werkstatt aus einer Hand`,
    `Firmenumzug-Spezialisten mit Erfahrung in ${kontext}`,
    `Büroumzug Schweiz: Wochenend-Schichten, IT-Server-Cut-Over, Beschriftungs­system`,
    `Geschäftsumzug-Offerten B2B vergleichen – Konzept, Zeitplan, Preis`,
    `Spezial­equipment: Hubwagen, Server-Trolley, Roll­container, Möbellift`,
    `Loading Zone & Anlieferzeit­fenster in ${locationName} koordiniert`,
    `Akten­handling nach DSG, optionale revisions­sichere Aktenvernichtung`,
    `Auf Geschäftsumzüge spezialisierte Partner – kein Privatumzug-Generalist`,
  ]

  const idxH = pickByCity(slug, headlines.length, 'gh')
  const idxI = pickByCity(slug, intros.length, 'gi')
  const idxF = pickByCity(slug, followUps.length, 'gf')

  const startBullet = pickByCity(slug, bulletsPool.length, 'gb')
  const bullets = [
    bulletsPool[startBullet],
    bulletsPool[(startBullet + 2) % bulletsPool.length],
    bulletsPool[(startBullet + 4) % bulletsPool.length],
    bulletsPool[(startBullet + 6) % bulletsPool.length],
  ]

  return {
    headline: headlines[idxH],
    paragraphs: [intros[idxI], followUps[idxF], GESCHAEFT_MARKETPLACE_LINE],
    bullets,
  }
}

/**
 * Geschäftsumzug-Stadtinhalt mit zwei Stufen:
 *  1) handgeschriebener City-Block (geschaeftsumzugCityContent.ts) – Top-30
 *  2) Kanton-basierte Variation als Fallback
 *
 * Service-zentrierte Sprache: "Geschäftsumzug", "Firmenumzug", "Büroumzug".
 * Keine Plattform-/Vergleichsportal-Werbesätze – Google soll die Seite als
 * lokalen Geschäftsumzug-Inhalt für die Stadt lesen.
 */
function geschaeftsumzugLocalText(
  locationName: string,
  canton: string,
  locationSlug?: string
): { headline: string; paragraphs: string[]; bullets: string[] } {
  const slug = (locationSlug ?? locationName).toLowerCase()
  if (locationSlug) {
    const block = getGeschaeftsumzugCityContent(locationSlug)
    if (block) {
      return geschaeftsumzugLocalTextFromCityBlock(locationName, canton, block, slug)
    }
  }
  return geschaeftsumzugLocalTextFallback(locationName, canton, locationSlug)
}

export function getCityPageLocalContent(
  categorySlug: string,
  locationName: string,
  canton: string,
  options?: { serviceId?: string; locationSlug?: string }
): { headline: string; paragraphs: string[]; bullets: string[] } {
  const k = `Kanton ${canton}`

  if (categorySlug === 'umzugsfirma' && options?.serviceId === 'klaviertransport') {
    return klaviertransportLocalText(locationName, canton, options.locationSlug)
  }

  if (categorySlug === 'umzugsfirma' && options?.serviceId === 'geschaeftsumzug') {
    return geschaeftsumzugLocalText(locationName, canton, options.locationSlug)
  }

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
        'geprüfte Partner – Sie wählen den passenden Malerbetrieb',
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
