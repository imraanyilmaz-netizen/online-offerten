/**
 * Swiss municipalities with >10k inhabitants (BFS / historical ranking table).
 * Slugs are URL segments under /umzugsfirma/:slug (existing pages may not cover all).
 */
export const locations = [
  { name: 'Zürich', slug: 'zuerich', canton: 'ZH' },
  { name: 'Genf', slug: 'genf', canton: 'GE' },
  { name: 'Basel', slug: 'basel', canton: 'BS' },
  { name: 'Lausanne', slug: 'lausanne', canton: 'VD' },
  { name: 'Bern', slug: 'bern', canton: 'BE' },
  { name: 'Winterthur', slug: 'winterthur', canton: 'ZH' },
  { name: 'Luzern', slug: 'luzern', canton: 'LU' },
  { name: 'St. Gallen', slug: 'st-gallen', canton: 'SG' },
  { name: 'Lugano', slug: 'lugano', canton: 'TI' },
  { name: 'Biel/Bienne', slug: 'biel-bienne', canton: 'BE' },
  { name: 'Thun', slug: 'thun', canton: 'BE' },
  { name: 'Bellinzona', slug: 'bellinzona', canton: 'TI' },
  { name: 'Köniz', slug: 'koeniz', canton: 'BE' },
  { name: 'Freiburg', slug: 'freiburg', canton: 'FR' },
  { name: 'Schaffhausen', slug: 'schaffhausen', canton: 'SH' },
  { name: 'La Chaux-de-Fonds', slug: 'la-chaux-de-fonds', canton: 'NE' },
  { name: 'Chur', slug: 'chur', canton: 'GR' },
  { name: 'Uster', slug: 'uster', canton: 'ZH' },
  { name: 'Sitten', slug: 'sitten', canton: 'VS' },
  { name: 'Vernier', slug: 'vernier', canton: 'GE' },
  { name: 'Lancy', slug: 'lancy', canton: 'GE' },
  { name: 'Neuenburg', slug: 'neuenburg', canton: 'NE' },
  { name: 'Emmen', slug: 'emmen', canton: 'LU' },
  { name: 'Zug', slug: 'zug', canton: 'ZG' },
  { name: 'Yverdon-les-Bains', slug: 'yverdon-les-bains', canton: 'VD' },
  { name: 'Dübendorf', slug: 'duebendorf', canton: 'ZH' },
  { name: 'Kriens', slug: 'kriens', canton: 'LU' },
  { name: 'Dietikon', slug: 'dietikon', canton: 'ZH' },
  { name: 'Rapperswil-Jona', slug: 'rapperswil-jona', canton: 'SG' },
  { name: 'Meyrin', slug: 'meyrin', canton: 'GE' },
  { name: 'Montreux', slug: 'montreux', canton: 'VD' },
  { name: 'Frauenfeld', slug: 'frauenfeld', canton: 'TG' },
  { name: 'Wetzikon', slug: 'wetzikon', canton: 'ZH' },
  { name: 'Wädenswil', slug: 'waedenswil', canton: 'ZH' },
  { name: 'Baar', slug: 'baar', canton: 'ZG' },
  { name: 'Bulle', slug: 'bulle', canton: 'FR' },
  { name: 'Wil', slug: 'wil', canton: 'SG' },
  { name: 'Horgen', slug: 'horgen', canton: 'ZH' },
  { name: 'Carouge', slug: 'carouge', canton: 'GE' },
  { name: 'Kreuzlingen', slug: 'kreuzlingen', canton: 'TG' },
  { name: 'Bülach', slug: 'buelach', canton: 'ZH' },
  { name: 'Aarau', slug: 'aarau', canton: 'AG' },
  { name: 'Nyon', slug: 'nyon', canton: 'VD' },
  { name: 'Riehen', slug: 'riehen', canton: 'BS' },
  { name: 'Allschwil', slug: 'allschwil', canton: 'BL' },
  { name: 'Wettingen', slug: 'wettingen', canton: 'AG' },
  { name: 'Opfikon', slug: 'opfikon', canton: 'ZH' },
  { name: 'Renens', slug: 'renens', canton: 'VD' },
  { name: 'Kloten', slug: 'kloten', canton: 'ZH' },
  { name: 'Schlieren', slug: 'schlieren', canton: 'ZH' },
  { name: 'Vevey', slug: 'vevey', canton: 'VD' },
  { name: 'Baden', slug: 'baden', canton: 'AG' },
  { name: 'Reinach', slug: 'reinach', canton: 'BL' },
  { name: 'Adliswil', slug: 'adliswil', canton: 'ZH' },
  { name: 'Onex', slug: 'onex', canton: 'GE' },
  { name: 'Volketswil', slug: 'volketswil', canton: 'ZH' },
  { name: 'Glarus Nord', slug: 'glarus-nord', canton: 'GL' },
  { name: 'Pully', slug: 'pully', canton: 'VD' },
  { name: 'Regensdorf', slug: 'regensdorf', canton: 'ZH' },
  { name: 'Olten', slug: 'olten', canton: 'SO' },
  { name: 'Martigny', slug: 'martigny', canton: 'VS' },
  { name: 'Thalwil', slug: 'thalwil', canton: 'ZH' },
  { name: 'Gossau', slug: 'gossau', canton: 'SG' },
  { name: 'Muttenz', slug: 'muttenz', canton: 'BL' },
  { name: 'Monthey', slug: 'monthey', canton: 'VS' },
  { name: 'Ostermundigen', slug: 'ostermundigen', canton: 'BE' },
  { name: 'Grenchen', slug: 'grenchen', canton: 'SO' },
  { name: 'Illnau-Effretikon', slug: 'illnau-effretikon', canton: 'ZH' },
  { name: 'Wallisellen', slug: 'wallisellen', canton: 'ZH' },
  { name: 'Val-de-Ruz', slug: 'val-de-ruz', canton: 'NE' },
  { name: 'Cham', slug: 'cham', canton: 'ZG' },
  { name: 'Wohlen', slug: 'wohlen', canton: 'AG' },
  { name: 'Siders', slug: 'siders', canton: 'VS' },
  { name: 'Solothurn', slug: 'solothurn', canton: 'SO' },
  { name: 'Pratteln', slug: 'pratteln', canton: 'BL' },
  { name: 'Burgdorf', slug: 'burgdorf', canton: 'BE' },
  { name: 'Freienbach', slug: 'freienbach', canton: 'SZ' },
  { name: 'Einsiedeln', slug: 'einsiedeln', canton: 'SZ' },
  { name: 'Morges', slug: 'morges', canton: 'VD' },
  { name: 'Steffisburg', slug: 'steffisburg', canton: 'BE' },
  { name: 'Binningen', slug: 'binningen', canton: 'BL' },
  { name: 'Lyss', slug: 'lyss', canton: 'BE' },
  { name: 'Locarno', slug: 'locarno', canton: 'TI' },
  { name: 'Herisau', slug: 'herisau', canton: 'AR' },
  { name: 'Langenthal', slug: 'langenthal', canton: 'BE' },
  { name: 'Schwyz', slug: 'schwyz', canton: 'SZ' },
  { name: 'Arbon', slug: 'arbon', canton: 'TG' },
  { name: 'Mendrisio', slug: 'mendrisio', canton: 'TI' },
  { name: 'Küsnacht', slug: 'kuesnacht', canton: 'ZH' },
  { name: 'Stäfa', slug: 'staefa', canton: 'ZH' },
  { name: 'Liestal', slug: 'liestal', canton: 'BL' },
  { name: 'Thônex', slug: 'thonex', canton: 'GE' },
  { name: 'Meilen', slug: 'meilen', canton: 'ZH' },
  { name: 'Oftringen', slug: 'oftringen', canton: 'AG' },
  { name: 'Horw', slug: 'horw', canton: 'LU' },
  { name: 'Amriswil', slug: 'amriswil', canton: 'TG' },
  { name: 'Ebikon', slug: 'ebikon', canton: 'LU' },
  { name: 'Richterswil', slug: 'richterswil', canton: 'ZH' },
  { name: 'Rheinfelden', slug: 'rheinfelden', canton: 'AG' },
  { name: 'Küssnacht (SZ)', slug: 'kuessnacht-sz', canton: 'SZ' },
  { name: 'Zollikon', slug: 'zollikon', canton: 'ZH' },
  { name: 'Uzwil', slug: 'uzwil', canton: 'SG' },
  { name: 'Versoix', slug: 'versoix', canton: 'GE' },
  { name: 'Gland', slug: 'gland', canton: 'VD' },
  { name: 'Brig-Glis', slug: 'brig-glis', canton: 'VS' },
  { name: 'Muri bei Bern', slug: 'muri-bei-bern', canton: 'BE' },
  { name: 'Ecublens', slug: 'ecublens', canton: 'VD' },
  { name: 'Buchs', slug: 'buchs', canton: 'SG' },
  { name: 'Münsingen', slug: 'muensingen', canton: 'BE' },
  { name: 'Spiez', slug: 'spiez', canton: 'BE' },
  { name: 'Brugg', slug: 'brugg', canton: 'AG' },
  { name: 'Chêne-Bougeries', slug: 'chene-bougeries', canton: 'GE' },
  { name: 'Delsberg', slug: 'delsberg', canton: 'JU' },
  { name: 'Glarus', slug: 'glarus', canton: 'GL' },
  { name: 'Rüti (ZH)', slug: 'rueti', canton: 'ZH' },
  { name: 'Le Grand-Saconnex', slug: 'le-grand-saconnex', canton: 'GE' },
  { name: 'Prilly', slug: 'prilly', canton: 'VD' },
  { name: 'Affoltern am Albis', slug: 'affoltern-am-albis', canton: 'ZH' },
  { name: 'Villars-sur-Glâne', slug: 'villars-sur-glane', canton: 'FR' },
  { name: 'Arth', slug: 'arth', canton: 'SZ' },
  { name: 'Pfäffikon', slug: 'pfaeffikon', canton: 'ZH' },
  { name: 'Spreitenbach', slug: 'spreitenbach', canton: 'AG' },
  { name: 'Zofingen', slug: 'zofingen', canton: 'AG' },
  { name: 'La Tour-de-Peilz', slug: 'la-tour-de-peilz', canton: 'VD' },
  { name: 'Münchenstein', slug: 'muenchenstein', canton: 'BL' },
  { name: 'Altstätten', slug: 'altstaetten', canton: 'SG' },
  { name: 'Bassersdorf', slug: 'bassersdorf', canton: 'ZH' },
  { name: 'Veyrier', slug: 'veyrier', canton: 'GE' },
  { name: 'Weinfelden', slug: 'weinfelden', canton: 'TG' },
  { name: 'Worb', slug: 'worb', canton: 'BE' },
  { name: 'Belp', slug: 'belp', canton: 'BE' },
  { name: 'Ittigen', slug: 'ittigen', canton: 'BE' },
  { name: 'Männedorf', slug: 'maennedorf', canton: 'ZH' },
  { name: 'Hinwil', slug: 'hinwil', canton: 'ZH' },
  { name: 'Romanshorn', slug: 'romanshorn', canton: 'TG' },
  { name: 'Risch', slug: 'risch', canton: 'ZG' },
  { name: 'Oberwil', slug: 'oberwil', canton: 'BL' },
  { name: 'Möhlin', slug: 'moehlin', canton: 'AG' },
  { name: 'Lenzburg', slug: 'lenzburg', canton: 'AG' },
  { name: 'Davos', slug: 'davos', canton: 'GR' },
  { name: 'Maur', slug: 'maur', canton: 'ZH' },
  { name: 'Suhr', slug: 'suhr', canton: 'AG' },
  { name: 'Zollikofen', slug: 'zollikofen', canton: 'BE' },
  { name: 'Plan-les-Ouates', slug: 'plan-les-ouates', canton: 'GE' },
  { name: 'Val-de-Travers', slug: 'val-de-travers', canton: 'NE' },
  { name: 'Sarnen', slug: 'sarnen', canton: 'OW' },
  { name: 'Flawil', slug: 'flawil', canton: 'SG' },
  { name: 'Neuhausen am Rheinfall', slug: 'neuhausen-am-rheinfall', canton: 'SH' },
  { name: 'Aigle', slug: 'aigle', canton: 'VD' },
  { name: 'Lutry', slug: 'lutry', canton: 'VD' },
  { name: 'Birsfelden', slug: 'birsfelden', canton: 'BL' },
  { name: 'Sursee', slug: 'sursee', canton: 'LU' },
  { name: 'Aesch', slug: 'aesch', canton: 'BL' },
  { name: 'Naters', slug: 'naters', canton: 'VS' },
  { name: 'Gossau (ZH)', slug: 'gossau-zuerich', canton: 'ZH' },
  { name: 'Bernex', slug: 'bernex', canton: 'GE' },
  { name: 'Münchenbuchsee', slug: 'muenchenbuchsee', canton: 'BE' },
  { name: 'Crans-Montana', slug: 'crans-montana', canton: 'VS' },
  { name: 'Wald (ZH)', slug: 'wald', canton: 'ZH' },
  { name: 'Steinhausen', slug: 'steinhausen', canton: 'ZG' },
  { name: 'Payerne', slug: 'payerne', canton: 'VD' },
  { name: 'Urdorf', slug: 'urdorf', canton: 'ZH' },
  /* Kantonale Hub-Seiten (keine Einzelgemeinde in der Rangliste) */
  { name: 'Aargau', slug: 'aargau', canton: 'AG' },
  { name: 'Thurgau', slug: 'thurgau', canton: 'TG' },
];

/** CH-Kantone: Code → deutscher Name (Ergänzung zu `locations[].canton`). */
export const cantonMap = {
  AG: 'Aargau',
  AI: 'Appenzell Innerrhoden',
  AR: 'Appenzell Ausserrhoden',
  BE: 'Bern',
  BL: 'Basel-Landschaft',
  BS: 'Basel-Stadt',
  FR: 'Freiburg',
  GE: 'Genf',
  GL: 'Glarus',
  GR: 'Graubünden',
  JU: 'Jura',
  LU: 'Luzern',
  NE: 'Neuenburg',
  NW: 'Nidwalden',
  OW: 'Obwalden',
  SG: 'St. Gallen',
  SH: 'Schaffhausen',
  SO: 'Solothurn',
  SZ: 'Schwyz',
  TG: 'Thurgau',
  TI: 'Tessin',
  UR: 'Uri',
  VD: 'Waadt',
  VS: 'Wallis',
  ZG: 'Zug',
  ZH: 'Zürich',
};

/** @param {string} key */
export const getFullCantonName = (key) => cantonMap[key] || key;

/**
 * Optionale «Lokal»-Inhalte für Branchen-Stadtseiten (`/{category}/{city}`).
 * Schlüssel: `location.slug` (z. B. zuerich) → Kategorie-Slug (`umzugsfirma` | `reinigungsfirma` | `malerfirma`).
 * Wert `null` oder fehlender Eintrag: kein zusätzlicher Spotlight-Block.
 *
 * @type {Record<string, Partial<Record<string, {
 *   kicker: string
 *   title: string
 *   paragraphs: string[]
 *   highlights?: { label: string; value: string }[] | null
 * } | null>>}
 */
export const locationCategorySpotlights = {
  zuerich: {
    umzugsfirma: {
      kicker: 'Kurzportrait',
      title: 'Umzug in Zürich: Limmatstadt, Seeufer, enge Zufahrten',
      paragraphs: [
        'Zürich mischt historische Gassen in der Altstadt mit modernen Hochhäusern am See und dicht bebauten Quartieren – genau dort entscheiden Liftmass, Parkzonen und kurze Haltefenster oft mehr als die reine Kilometerzahl.',
        'Erfahrene Zügelunternehmen planen mit Ihnen Tragewege, Material und Zeitfenster; für Spezialtransporte oder Fernumzüge lohnt sich früh eine Offerte, damit Kapazitäten und Abläufe zu Ihrem Termin passen.',
      ],
      highlights: [
        { label: 'Typische Herausforderungen', value: 'Parkbewilligungen, enge Treppenhäuser, See- und Hügelquartiere' },
        { label: 'Praktischer Tipp', value: 'Haltezone und Lift früh abstimmen – spart Stress am Umzugstag.' },
      ],
    },
    reinigungsfirma: {
      kicker: 'Region',
      title: 'Reinigung in Zürich: von der Altstadtwohnung bis zum Büro am Prime Tower',
      paragraphs: [
        'In der Stadt Zürich sind kurze Wege und hohe Termintreue gefragt – ob Unterhaltsreinigung, Büro oder eine Endreinigung mit Abnahmegarantie vor der Übergabe.',
        'Vergleichen Sie mehrere Offerten, klären Sie Umfang, Zeitfenster und Abnahme schriftlich; so bleiben auch bei komplexen Objekten oder grossen Flächen die Erwartungen klar.',
      ],
      highlights: [
        { label: 'Schwerpunkt', value: 'Wohnungsübergaben, Gewerbeflächen, regelmässige Einsätze' },
        { label: 'Lohn sich zu klären', value: 'Abnahme, Nachbesserung und was zur Grundausstattung gehört.' },
      ],
    },
    malerfirma: {
      kicker: 'Vor Ort',
      title: 'Malerarbeiten in Zürich: MFH, Loft und klassische Altbauwohnungen',
      paragraphs: [
        'Zürich bietet viele unterschiedliche Baualtersklassen – vom Gründerzeithaus bis zur Betonoptik in Neubauten. Gute Angebote trennen Vorbereitung, Anstrichsystem und Nacharbeiten klar.',
        'Regionale Maler kennen typische Untergründe und können realistische Termine nennen. Mit mehreren Offerten sehen Sie schnell, wo Material und Stundenansatz zusammenpassen.',
      ],
      highlights: [
        { label: 'Häufige Themen', value: 'Untergrund prüfen, Feuchträume, Farb- und Systemwahl' },
        { label: 'Vergleich', value: 'Mehrere detaillierte Angebote – weniger Überraschungen bei der Rechnung.' },
      ],
    },
  },
  bern: {
    umzugsfirma: {
      kicker: 'Kurzportrait',
      title: 'Umzug in Bern: Lauben, Matte und Hanglagen rund um die Aare',
      paragraphs: [
        'Die Berner Altstadt mit Lauben und Kopfsteinpflaster stellt andere Anforderungen als moderne Quartiere in Bümpliz oder Breitenrain – Trassen, Parken und Schutz der Liegenschaft wollen gut geplant sein.',
        'Zuverlässige Umzugsfirmen berücksichtigen Zufahrten, Tragwege und mögliche Schutzmaterialien. Eine zentrale Offertenanfrage hilft, Kapazitäten und Preise für Ihren Wunschtermin transparent zu vergleichen.',
      ],
      highlights: [
        { label: 'Besonderheit', value: 'UNESCO-Altstadt, enge Gassen, teils steile Zufahrten' },
        { label: 'Planung', value: 'Besichtigung und Massen – besonders bei Möbeln mit Sondermass.' },
      ],
    },
    reinigungsfirma: {
      kicker: 'Region',
      title: 'Reinigung in Bern: Bundesstadt mit Quartieren von der Matte bis Bümpliz',
      paragraphs: [
        'Bern verbindet dicht bebaute Innenstadtbereiche mit grünen Aussenquartieren – Reinigungsfirmen fahren kurze Wege, müssen aber oft Park- und Zugangsregeln der Liegenschaften beachten.',
        'Für Endreinigungen mit Abnahmegarantie oder regelmässige Objektbetreuung lohnt der Vergleich mehrerer Offerten: Umfang, Termine und was bei der Abnahme gilt sollten von Anfang an klar sein.',
      ],
      highlights: [
        { label: 'Häufig nachgefragt', value: 'Übergaben, Büroflächen, Unterhaltsreinigung in MFH' },
        { label: 'Vor dem Start', value: 'Schlüssel, Zugang, Besonderheiten (Haustiere, Böden).' },
      ],
    },
    malerfirma: {
      kicker: 'Gebäude',
      title: 'Malerarbeiten in Bern: Sandstein, Lauben und klassische Fassaden',
      paragraphs: [
        'In Bern begegnen Maler oft sensiblen Untergründen und Denkmalschutz-Themen – gerade in der Altstadt und bei älteren Mehrfamilienhäusern zählen Vorbereitung und abgestimmte Systeme.',
        'Laden Sie mehrere Angebote ein, die Leistung und Ausschlüsse klar benennen. So lässt sich fair vergleichen, ohne dass Nacharbeiten oder Material später das Budget sprengen.',
      ],
      highlights: [
        { label: 'Typisch Bern', value: 'Historische Bausubstanz, sorgfältige Untergrundvorbereitung' },
        { label: 'Tipp', value: 'Farbmuster und Trocknungszeiten bei Aussenarbeiten früh festlegen.' },
      ],
    },
  },
}

/**
 * @param {string} locationSlug z. B. zuerich
 * @param {string} categorySlug z. B. umzugsfirma
 * @returns {{ kicker: string, title: string, paragraphs: string[], highlights?: { label: string, value: string }[] | null } | null}
 */
export function getLocationCategorySpotlight(locationSlug, categorySlug) {
  const row = locationCategorySpotlights[locationSlug]
  if (!row) return null
  const block = row[categorySlug]
  if (block == null) return null
  return block
}

export const cantonOptions = Object.entries(cantonMap)
  .map(([value, label]) => ({ value, label }))
  .sort((a, b) => a.label.localeCompare(b.label, 'de-CH'));
