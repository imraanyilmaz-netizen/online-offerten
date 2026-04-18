/**
 * Beliebte Zielländer für Auslandumzug inkl. SEO-Texte & Landing-Copy.
 * URLs: `/{category}/auslandumzug/{slug}` z. B. /umzugsfirma/auslandumzug/deutschland
 *
 * @typedef {Object} AuslandDestination
 * @property {string} name
 * @property {string} code ISO 3166-1 alpha-2
 * @property {string} slug URL-Segment (ASCII)
 * @property {string} flagEmoji
 * @property {string} metaTitle `<title>` / OpenGraph
 * @property {string} metaDescription
 * @property {string} heroTitle H1
 * @property {string} heroDescription Lead unter H1
 * @property {string} calculatorHeading H2 linker Kasten
 * @property {string} calculatorIntro Fliesstext Kasten
 */

const DESTINATIONS = [
  {
    name: 'Deutschland',
    code: 'DE',
    slug: 'deutschland',
    flagEmoji: '🇩🇪',
    metaTitle: 'Auslandsumzug Deutschland – Kostenlose Offerten vergleichen',
    metaDescription:
      'Umzug nach Deutschland ab der Schweiz: Kostenlos mehrere geprüfte Umzugsfirmen vergleichen, bis zu 40% sparen. Möbeltransport und Grenzübertritt – Zielland im Kostenrechner vorausgewählt.',
    heroTitle: 'Auslandsumzug Deutschland – Kostenlose Offerten vergleichen',
    heroDescription:
      'Umzug nach Deutschland ab der Schweiz: Vergleichen Sie kostenlos mehrere geprüfte Umzugsfirmen und sparen Sie bis zu 40% bei Ihrem Wohnungswechsel. Kostenorientierung für Möbeltransport und Grenzübertritt – das Zielland ist im Kostenrechner unten bereits für Sie vorausgewählt.',
    calculatorHeading: 'Offerte für Ihren Umzug nach Deutschland',
    calculatorIntro:
      'Der Rechner ist bereits auf Deutschland eingestellt (Abfahrt Schweiz). Ein internationaler Umzug hängt stark von Zollbestimmungen, Distanz und dem gewünschten Service ab – hier erhalten Sie eine erste Preisorientierung für Ihren Möbeltransport. Anschliessend können Sie unverbindlich massgeschneiderte Offerten von geprüften Zügelunternehmen vergleichen.',
  },
  {
    name: 'Frankreich',
    code: 'FR',
    slug: 'frankreich',
    flagEmoji: '🇫🇷',
    metaTitle: 'Auslandsumzug Frankreich – Kostenlose Offerten vergleichen',
    metaDescription:
      'Auslandsumzug und Umzug nach Frankreich ab der Schweiz: Geprüfte Umzugsfirmen vergleichen, bis zu 40% sparen. Zielland im Kostenrechner vorausgewählt.',
    heroTitle: 'Auslandsumzug Frankreich – Kostenlose Offerten vergleichen',
    heroDescription:
      'Umzug nach Frankreich ab der Schweiz: Vergleichen Sie kostenlos mehrere geprüfte Umzugsfirmen und sparen Sie bis zu 40% bei Ihrem Wohnungswechsel. Planen Sie Auswandern oder Möbeltransport – das Zielland ist im Kostenrechner unten bereits für Sie vorausgewählt.',
    calculatorHeading: 'Offerte für Ihren Umzug nach Frankreich',
    calculatorIntro:
      'Der Rechner ist bereits auf Frankreich eingestellt (Abfahrt Schweiz). Ein internationaler Umzug hängt stark von Zollbestimmungen, Distanz und dem gewünschten Service ab – hier erhalten Sie eine erste Preisorientierung für Ihren Möbeltransport. Anschliessend können Sie unverbindlich massgeschneiderte Offerten von geprüften Zügelunternehmen vergleichen.',
  },
  {
    name: 'Italien',
    code: 'IT',
    slug: 'italien',
    flagEmoji: '🇮🇹',
    metaTitle: 'Umzug Italien – Kostenlose Offerten für Ihren Auslandsumzug vergleichen',
    metaDescription:
      'Zügeln nach Italien ab der Schweiz: Zertifizierte Transportunternehmen vergleichen, bis zu 40% sparen. Umzug Italien unverbindlich kalkulieren – Zielland im Rechner aktiv.',
    heroTitle: 'Umzug Italien – Kostenlose Offerten für Ihren Auslandsumzug vergleichen',
    heroDescription:
      'Zügeln nach Italien ab der Schweiz: Sparen Sie Zeit und Geld, indem Sie unverbindlich Offerten von zertifizierten Transportunternehmen vergleichen. So reduzieren Sie Ihre Umzugskosten um bis zu 40%. Das Zielland ist im Rechner bereits aktiv.',
    calculatorHeading: 'Offerte für Ihren Umzug nach Italien',
    calculatorIntro:
      'Der Rechner ist bereits auf Italien eingestellt (Start in der Schweiz). Da ein grenzüberschreitender Umzug durch Faktoren wie Zollabwicklung, Kilometerzahl und Volumen bestimmt wird, bietet Ihnen dieses Tool eine schnelle erste Kostenschätzung. Vergleichen Sie danach in Ruhe die Angebote unserer geprüften Partner für Ihren stressfreien Start im Süden.',
  },
  {
    name: 'Österreich',
    code: 'AT',
    slug: 'oesterreich',
    flagEmoji: '🇦🇹',
    metaTitle: 'Auslandsumzug Österreich – Geprüfte Umzugsfirmen vergleichen',
    metaDescription:
      'Auslandsumzug und Umzug nach Österreich ab der Schweiz: Umzugsfirma und Wohnsitzverlegung – kostenlose Angebote, bis zu 40% sparen. Zielland im Kalkulator markiert.',
    heroTitle: 'Auslandsumzug Österreich – Geprüfte Umzugsfirmen vergleichen',
    heroDescription:
      'Umzug nach Österreich ab der Schweiz: Holen Sie sich kostenlos Angebote von erfahrenen Zügelfirmen ein und sparen Sie bis zu 40% der Kosten. Das Zielland ist im untenstehenden Kalkulator bereits für Sie markiert.',
    calculatorHeading: 'Kosten für Ihren Umzug nach Österreich berechnen',
    calculatorIntro:
      'Der Rechner ist bereits auf Österreich eingestellt (Abgangsort Schweiz). Die finalen Kosten für Ihre Wohnsitzverlegung hängen von der genauen Route, den Zolldokumenten und Zusatzleistungen ab. Nutzen Sie die erste Orientierung hier und vergleichen Sie im nächsten Schritt völlig unverbindlich die Offerten unserer spezialisierten Partnerfirmen.',
  },
  {
    name: 'Spanien',
    code: 'ES',
    slug: 'spanien',
    flagEmoji: '🇪🇸',
    metaTitle: 'Umzug nach Spanien – Kostenlose Offerten für Auswanderer vergleichen',
    metaDescription:
      'Transport und Umzug nach Spanien ab der Schweiz: Spedition und Möbeltransport vergleichen, bis zu 40% sparen. Auswandern – Zielland im Tool ausgewählt.',
    heroTitle: 'Umzug nach Spanien – Kostenlose Offerten für Auswanderer vergleichen',
    heroDescription:
      'Transport nach Spanien ab der Schweiz: Vergleichen Sie mit wenigen Klicks die Preise von professionellen Speditionen und Umzugsfirmen. Sparen Sie bis zu 40% bei Ihrem Weg auf die Iberische Halbinsel. Das Zielland ist im Tool bereits ausgewählt.',
    calculatorHeading: 'Offerte für Ihren Umzug nach Spanien',
    calculatorIntro:
      'Der Rechner ist bereits auf Spanien eingestellt (Abfahrt aus der Schweiz). Ein internationaler Möbeltransport über diese Distanz erfordert genaue Planung bezüglich Zoll und Logistik. Ermitteln Sie hier einen ersten Richtwert und vergleichen Sie anschliessend die detaillierten, unverbindlichen Angebote unserer qualifizierten Umzugspartner.',
  },
  {
    name: 'Portugal',
    code: 'PT',
    slug: 'portugal',
    flagEmoji: '🇵🇹',
    metaTitle: 'Auslandsumzug Portugal – Kostenlose Offerten schnell vergleichen',
    metaDescription:
      'Umzug Portugal ab der Schweiz: Auslandsumzug und Zügeln mit Zoll und langen Strecken – Partner vergleichen, bis zu 40% sparen. Zielland im Preisrechner hinterlegt.',
    heroTitle: 'Auslandsumzug Portugal – Kostenlose Offerten schnell vergleichen',
    heroDescription:
      'Zügeln nach Portugal ab der Schweiz: Starten Sie entspannt in Ihr neues Leben. Vergleichen Sie kostenlos erfahrene Umzugsunternehmen und sparen Sie bis zu 40% der Transportkosten. Das Zielland ist im Preisrechner schon hinterlegt.',
    calculatorHeading: 'Offerte für Ihren Umzug nach Portugal',
    calculatorIntro:
      'Der Rechner ist bereits auf Portugal eingestellt (Startpunkt Schweiz). Da die Strecke lang ist und das Umzugsgut sicher den Zoll passieren muss, gibt Ihnen unser Tool eine erste realistische Kosteneinschätzung. Danach haben Sie die Möglichkeit, Offerten von streng geprüften Zügelexperten massgeschneidert und unverbindlich zu vergleichen.',
  },
  {
    name: 'Belgien',
    code: 'BE',
    slug: 'belgien',
    flagEmoji: '🇧🇪',
    metaTitle: 'Auslandsumzug Belgien – Kostenlose Offerten vergleichen',
    metaDescription:
      'Umzug nach Belgien ab der Schweiz: Auslandsumzug mit geprüften Zügelfirmen vergleichen, bis zu 40% sparen. Möbeltransport – Zielland im Kostenrechner vorausgewählt.',
    heroTitle: 'Auslandumzug Belgien – Kostenlose Offerten vergleichen',
    heroDescription:
      'Umzug nach Belgien ab der Schweiz: Vergleichen Sie kostenlos mehrere geprüfte Umzugsfirmen und sparen Sie bis zu 40%. Das Zielland ist im Kostenrechner unten bereits für Sie vorausgewählt.',
    calculatorHeading: 'Offerte für Ihren Umzug nach Belgien',
    calculatorIntro:
      'Der Rechner ist bereits auf Belgien eingestellt (Abfahrt Schweiz). Grenznahe und internationale Umzüge hängen von Zoll, Route und Leistungsumfang ab – hier erhalten Sie eine erste Kostenschätzung. Anschliessend vergleichen Sie unverbindlich Offerten von geprüften Partnern.',
  },
  {
    name: 'Dänemark',
    code: 'DK',
    slug: 'daenemark',
    flagEmoji: '🇩🇰',
    metaTitle: 'Auslandsumzug Dänemark – Kostenlose Offerten vergleichen',
    metaDescription:
      'Umzug nach Dänemark ab der Schweiz: Spedition und Transport über lange Distanz – geprüfte Zügelfirmen vergleichen, bis zu 40% sparen. Zielland im Rechner vorausgewählt.',
    heroTitle: 'Auslandsumzug Dänemark – Kostenlose Offerten vergleichen',
    heroDescription:
      'Umzug nach Dänemark ab der Schweiz: Holen Sie kostenlos Offerten von erfahrenen Umzugsfirmen ein und sparen Sie bis zu 40%. Skandinavischer Fernumzug – das Zielland ist im Kostenrechner bereits vorausgewählt.',
    calculatorHeading: 'Offerte für Ihren Umzug nach Dänemark',
    calculatorIntro:
      'Der Rechner ist bereits auf Dänemark eingestellt (Abfahrt Schweiz). Lange Distanz und Zollformalitäten beeinflussen den Preis – dieses Tool liefert eine erste Orientierung. Danach vergleichen Sie unverbindlich massgeschneiderte Angebote unserer geprüften Partner.',
  },
]

/** @type {AuslandDestination[]} */
export const INTERNATIONAL_POPULAR_DESTINATIONS = DESTINATIONS

/** @param {string | undefined} slug */
export function findPopularDestinationBySlug(slug) {
  if (!slug || typeof slug !== 'string') return null
  const key = slug.trim().toLowerCase()
  return INTERNATIONAL_POPULAR_DESTINATIONS.find((d) => d.slug === key) ?? null
}

/** @param {string} categorySlug z. B. umzugsfirma */
export function getAuslandCountryPagePath(categorySlug, destinationSlug) {
  return `/${categorySlug}/auslandumzug/${destinationSlug}`
}
