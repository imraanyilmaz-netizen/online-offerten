/**
 * Geschäftsumzug — stadt-spezifischer Content für `/umzugsfirma/geschaeftsumzug/{slug}`.
 *
 * Ziel: Jede grössere Schweizer Stadt mit dichtem Büro-/KMU-Markt hat hier
 * einen handgeschriebenen Block, damit keine zwei Geschäftsumzug-Stadtseiten
 * gleich klingen. Der Fokus liegt auf:
 *   - typischen Bürogebieten / Geschäftsbezirken
 *   - Logistik-Hürden (Anlieferzonen, Tiefgaragen, Halteverbote)
 *   - Branchenmix der Stadt (Banken, Industrie, KMU, Retail)
 *
 * Felder:
 *  - kontext:    1 Satz "wie sieht die Stadt im Geschäftsumzug-Alltag aus"
 *  - logistik:   1 Satz "typische Anlieferzonen / Tiefgaragen / Hindernisse"
 *  - region:     1 Satz "Umgebung / Nachbargemeinden, in die Anbieter fahren"
 *  - vorOrtTipp: 1 Satz konkreter Praxistipp (Anlieferzeitfenster, IT-Pause etc.)
 */

export type GeschaeftsumzugCityBlock = {
  kontext: string
  logistik: string
  region: string
  vorOrtTipp: string
}

export const GESCHAEFTSUMZUG_CITY_CONTENT: Record<string, GeschaeftsumzugCityBlock> = {
  zuerich: {
    kontext:
      'Zürich ist der grösste Büromarkt der Schweiz – Banken und Versicherungen am Paradeplatz, Tech- und Kreativagenturen in Zürich-West (Hardbrücke, Prime Tower) und KMU-Cluster in Oerlikon, Altstetten und Wallisellen.',
    logistik:
      'In der City sind Anlieferzeitfenster (typisch 06–11 Uhr) und enge Tiefgaragen die Regel; in Zürich-West und Oerlikon stehen moderne Frachtaufzüge zur Verfügung.',
    region:
      'Geschäftsumzug-Anbieter fahren auch nach Wallisellen, Dübendorf, Schlieren, Opfikon, Glattbrugg und ins gesamte Zürcher Mittelland.',
    vorOrtTipp:
      'Halteverbots-Bewilligungen der Stadtpolizei Zürich brauchen ~10 Werktage – früh planen, sonst startet der Firmenumzug mit Stress.',
  },
  genf: {
    kontext:
      'Genf vereint internationale Organisationen rund um den Place des Nations, Banken in der Rue du Rhône und ein dichtes KMU-Gewebe in Carouge, Plan-les-Ouates (BioTech) und Meyrin (CERN-Korridor).',
    logistik:
      'Vieux-Carouge und die Genfer Altstadt haben enge Gassen, Tiefgaragen oft mit niedriger Einfahrtshöhe; im Vorortgürtel sind Anlieferzonen modern.',
    region:
      'Anbieter decken Carouge, Vernier, Lancy, Meyrin, Plan-les-Ouates, Onex, Versoix und das Pays de Gex (FR) ab.',
    vorOrtTipp:
      'In Genf ist eine Halteverbots-Bewilligung (Fondation des Parkings) Standard – beim Anbieter direkt mitanfragen.',
  },
  basel: {
    kontext:
      'Basel ist Pharma-Hub (Roche-Areal, Novartis Campus), Logistikknoten am Rheinhafen und KMU-Standort in Allschwil und Pratteln – jeder Standort hat eigene Anforderungen an einen Geschäftsumzug.',
    logistik:
      'Pharma-Areale haben strikte Sicherheits- und Anlieferregeln, Grossbasel hat enge Altstadtgassen, Kleinbasel und das Dreispitz-Areal sind besser per LKW erreichbar.',
    region:
      'Geschäftsumzug-Anbieter sind auch in Allschwil, Pratteln, Reinach, Birsfelden, Muttenz und im Dreiländereck Richtung Lörrach/St. Louis aktiv.',
    vorOrtTipp:
      'Auf Pharma-Arealen ist eine Vor-Anmeldung zwingend – Lieferschein, Personalausweis und Werks-Slot rechtzeitig klären.',
  },
  lausanne: {
    kontext:
      'Lausanne ist Bundesgericht, Sportverbände (CIO, FIFA in der Region), Versicherungen rund um Beaulieu und ein wachsender KMU-Markt in Ouchy und Sébeillon.',
    logistik:
      'Die Stadt liegt am Hang: Cité und Bourg haben enge Strassen mit Niveauwechseln, in Ouchy und Vidy sind die Zufahrten flacher und Tiefgaragen moderner.',
    region:
      'Geschäftsumzug-Partner fahren auch nach Renens, Crissier, Ecublens, Pully, Morges, Vevey und ins Lavaux.',
    vorOrtTipp:
      'Wegen der Hanglage in Lausanne lohnt eine Vor-Ort-Besichtigung – schmale Cargo-Lifte können den Aufwand verändern.',
  },
  bern: {
    kontext:
      'Bern ist Verwaltungs-Hauptstadt: Bundesverwaltung, Botschaftsviertel Kirchenfeld, Versicherungen im Wankdorf-Quartier und KMU-Cluster in Bümpliz, Liebefeld und Ittigen.',
    logistik:
      'Die UNESCO-Lauben in der Altstadt erlauben nur kleine Fahrzeuge und beschränkte Anlieferzeiten; in Wankdorf und Liebefeld sind Logistikflächen grosszügiger.',
    region:
      'Anbieter sind in Köniz, Ostermundigen, Ittigen, Muri, Worb, Belp und im Berner Mittelland (bis Lyss/Münsingen) tätig.',
    vorOrtTipp:
      'In der Berner Altstadt sind Geschäftsumzüge nur in engen Zeitfenstern erlaubt – Liefer-Slots ausserhalb der Stosszeiten anvisieren.',
  },
  winterthur: {
    kontext:
      'Winterthur kombiniert ehemalige Industrie­areale (Sulzer-Areal, Lokstadt, Stadtkern Töss) mit modernen Tech-/Service-Firmen und einem starken KMU-Mittelstand in Wülflingen und Veltheim.',
    logistik:
      'Lofts und Industrieumnutzungen haben oft grosszügige Frachtaufzüge; in der Altstadt sind die Treppenhäuser eng und die Anlieferzonen begrenzt.',
    region:
      'Geschäftsumzug-Anbieter decken Wülflingen, Seen, Töss, Effretikon, Frauenfeld und das Tösstal ab.',
    vorOrtTipp:
      'In Loft-Büros mit Industrieaufzug spart der Anbieter oft Aufpreise – Liftmasse und Tragkraft direkt in die Anfrage schreiben.',
  },
  luzern: {
    kontext:
      'Luzern ist KMU-Standort mit Tourismus, Versicherungen am Bahnhof und einem wachsenden Tech-Cluster in Ebikon und Rotkreuz – an der Schnittstelle zu Zug.',
    logistik:
      'Die Altstadtgassen rund um die Kapellbrücke sind autofrei oder eingeschränkt befahrbar; Bahnhofsnähe und Tribschen sind logistisch unkompliziert.',
    region:
      'Anbieter fahren auch nach Kriens, Emmen, Horw, Ebikon, Rotkreuz, Zug, Sursee und in den ganzen Vierwaldstättersee-Raum.',
    vorOrtTipp:
      'In der Luzerner Innenstadt liegen Anlieferzeitfenster oft 06–11 Uhr – Geschäftsumzüge starten am besten morgens früh.',
  },
  'st-gallen': {
    kontext:
      'St. Gallen lebt von Versicherungen (Helvetia, Mobiliar), Universität und Stickereiindustrie-Tradition; KMU-Cluster in Bruggen, Rotmonten und West.',
    logistik:
      'Erkerfassaden und schmale Treppenhäuser im Stiftsbezirk machen Möbeltransporte heikel; in den Aussenquartieren sind Tiefgaragen und Liftmasse besser.',
    region:
      'Geschäftsumzug-Partner sind in Gossau, Wittenbach, Herisau, Wil, Rorschach und im Appenzellerland aktiv.',
    vorOrtTipp:
      'Hanglagen am Rosenberg und Freudenberg im Winter beachten – nasse oder vereiste Strassen kosten Zeit.',
  },
  lugano: {
    kontext:
      'Lugano ist Finanzplatz, Tessiner Wirtschaftshauptstadt mit Privatbanken, Beratungsfirmen und einem wachsenden KMU-Markt rund um Pian Scairolo und Manno.',
    logistik:
      'Die ZTL-Zone in der Altstadt erlaubt nur eingeschränkte Zufahrt; in Pian Scairolo und Bioggio sind Industrieflächen mit Rampen Standard.',
    region:
      'Anbieter fahren auch nach Paradiso, Massagno, Manno, Bioggio, Locarno, Bellinzona und ins Mendrisiotto.',
    vorOrtTipp:
      'Für die ZTL Lugano braucht es eine Zufahrtsbewilligung – das im Geschäftsumzug-Auftrag klar markieren.',
  },
  zug: {
    kontext:
      'Zug ist Holding-Standort und Crypto Valley: viele internationale Hauptsitze, Treuhand-Cluster in der Baarerstrasse und im Suurstoffi-Areal in Risch-Rotkreuz.',
    logistik:
      'Bürohochhäuser am Zuger See und in Baar haben moderne Frachtaufzüge; in der Altstadt sind Zufahrten enger.',
    region:
      'Geschäftsumzug-Partner decken Baar, Cham, Steinhausen, Risch-Rotkreuz, Hünenberg, Walchwil und das Zugerland ab.',
    vorOrtTipp:
      'Für hochsensible Daten/Hardware (Treuhand, Crypto) ist eine versiegelte Transportplanung üblich – im Briefing benennen.',
  },
  bellinzona: {
    kontext:
      'Bellinzona ist Tessiner Verwaltungssitz: Kanton, Bundesstrafgericht und ein KMU-Mittelstand entlang der Magadinoebene.',
    logistik:
      'Die Burgenstadt-Altstadt hat enge Gassen und teilweise Einbahnführung; Zufahrten an die Industriezone Carasso und Giubiasco sind unkompliziert.',
    region:
      'Anbieter decken Giubiasco, Sant\'Antonino, Locarno, Lugano und das Bleniotal ab.',
    vorOrtTipp:
      'In der Altstadt sind Anlieferungen oft nur am frühen Morgen möglich – Slot mit dem Anbieter im Voraus fixieren.',
  },
  thun: {
    kontext:
      'Thun ist Verwaltungs- und Industrie­standort (RUAG, Meyer Burger), KMU-Stützpunkt für das Berner Oberland und Tor zum Tourismus am Thunersee.',
    logistik:
      'Die Hauptgasse mit Hochtrottoirs ist für LKW unpraktisch – Geschäftsumzug-Anbieter wählen Seitenstrassen oder Hofzufahrten.',
    region:
      'Anbieter sind in Steffisburg, Spiez, Heimberg, Uetendorf und im Berner Oberland bis Interlaken aktiv.',
    vorOrtTipp:
      'Für sicherheitsrelevante Standorte (RUAG-Umfeld) sind Sicherheitsabklärungen üblich – früh starten.',
  },
  schaffhausen: {
    kontext:
      'Schaffhausen ist Industriestadt (Georg Fischer, IWC) mit Erkerstadt-Altstadt und einem starken Pendler­einzugsgebiet aus Süddeutschland.',
    logistik:
      'In der Altstadt sind Erker und enge Türöffnungen typisch; im Mühlental und Industriegebiet stehen Rampen und Frachtaufzüge bereit.',
    region:
      'Geschäftsumzug-Anbieter fahren nach Neuhausen am Rheinfall, Thayngen, Stein am Rhein, Schaffhausen-Klettgau und über die Grenze nach Süddeutschland.',
    vorOrtTipp:
      'Cross-Border-Transporte (DE) brauchen Zollformulare – beim Geschäftsumzug-Anbieter direkt klären.',
  },
  chur: {
    kontext:
      'Chur ist Verwaltungssitz Graubündens: Kanton, Tourismus-Holdings, KMU im Rheinquartier und Industrie in Domat/Ems.',
    logistik:
      'Die Altstadt ist eng und teilweise autofrei; in Masans, Felsberg und Domat/Ems sind Industriezufahrten breit und unproblematisch.',
    region:
      'Anbieter decken Domat/Ems, Landquart, Davos, Klosters, das Engadin (Saisonzufahrten beachten) und das Prättigau ab.',
    vorOrtTipp:
      'Geschäftsumzüge nach Davos/Engadin lohnen sich ausserhalb der Hochsaison – Bergstrassen können im Winter Spezialfahrzeuge erfordern.',
  },
  uster: {
    kontext:
      'Uster ist Pendlerstadt mit modernen Bürobauten am Greifensee, Industrie/Logistik in Riedikon und KMU-Cluster Zentrum.',
    logistik:
      'Neubauten haben heutige Liftmasse und gute Anlieferzonen; in Bahnhofsnähe sind Halte-Flächen begrenzt.',
    region:
      'Anbieter fahren nach Greifensee, Volketswil, Wetzikon, Pfäffikon ZH, Dübendorf und ins Zürcher Oberland.',
    vorOrtTipp:
      'Wegen der Glattal-Lage sind Anbieter aus Zürich, Wallisellen und Dübendorf schnell vor Ort – mehrere Geschäftsumzug-Offerten lohnen sich.',
  },
  sitten: {
    kontext:
      'Sitten/Sion ist Walliser Wirtschaftshauptstadt: Verwaltung, Tourismus-Holdings, KMU in Bramois und ein wachsender Tech-/EnergyCluster.',
    logistik:
      'Walliser Altstadt-Treppen und enge Gassen rund um Tourbillon erschweren grosse LKW; im Rhonetal Richtung Bramois sind Zufahrten breit.',
    region:
      'Geschäftsumzug-Partner sind in Martigny, Conthey, Sierre, Brig-Glis und im ganzen Mittelwallis aktiv.',
    vorOrtTipp:
      'Walliser Sommernachmittage sind heiss – Geschäftsumzüge früh am Morgen schonen Material und Personal.',
  },
  'biel-bienne': {
    kontext:
      'Biel/Bienne ist Uhrenindustrie (Swatch, Rolex-Bienne), zweisprachige Verwaltung und ein dichtes Industrie-/KMU-Gewebe in Bözingen, Mett und Madretsch.',
    logistik:
      'Die Altstadt am Jurahang hat enge Strassen; Bözingen und das Industriegebiet sind LKW-tauglich.',
    region:
      'Anbieter fahren nach Lyss, Nidau, Brügg, Grenchen, Solothurn und ins Berner und Solothurner Seeland.',
    vorOrtTipp:
      'Die Uhren-Industrie hat strikte Sicherheits-/Anlieferprozesse – Geschäftsumzüge dort erfordern Vor-Anmeldung.',
  },
  'la-chaux-de-fonds': {
    kontext:
      'La Chaux-de-Fonds ist Welt-Uhrenhauptstadt (UNESCO): Manufakturen, Industriearchitektur im Schachbrett-Grundriss und KMU-Mittelstand.',
    logistik:
      'Die geraden Strassen erleichtern LKW-Zufahrten; Treppenhäuser sind hoch (oft 4. OG), aber breit.',
    region:
      'Geschäftsumzug-Anbieter decken Le Locle, Saint-Imier, Neuchâtel und den ganzen Jura ab.',
    vorOrtTipp:
      'Auf 1000 m Höhe sind Wintermonate hart – Termine bei Schnee bewusst auf trockene Tage legen.',
  },
  'rapperswil-jona': {
    kontext:
      'Rapperswil-Jona ist Tourismus-/Tech-Standort am oberen Zürichsee: HSR, KMU in Wagen und Curtiberg, dazu der Bürokorridor zur Linthebene.',
    logistik:
      'Schlossstädtchen-Gassen sind eng und teils stufig; in Jona dominieren moderne Mehrfamilien-/Bürohäuser mit guten Frachtaufzügen.',
    region:
      'Anbieter sind in Wollerau, Pfäffikon SZ, Rüti ZH, Schmerikon und im Linthgebiet tätig.',
    vorOrtTipp:
      'Für Stadtbereiche mit Fussgängerzone braucht es eine Zufahrtsbewilligung – im Auftrag explizit nennen.',
  },
  freiburg: {
    kontext:
      'Freiburg/Fribourg ist zweisprachig: Universität, Verwaltung, Versicherungen (TPF, Vivisol-Umfeld) und ein KMU-Mix in der Unterstadt sowie Villars-sur-Glâne.',
    logistik:
      'Die Niveauwechsel zwischen Ober- und Unterstadt machen Möbeltransporte aufwändig; in Villars-sur-Glâne und Düdingen sind Industrieflächen modern.',
    region:
      'Geschäftsumzug-Partner decken Villars-sur-Glâne, Bulle, Düdingen, Murten und das Sense-/Murtenbiet ab.',
    vorOrtTipp:
      'Für den Niveau­wechsel Ober-/Unterstadt lohnt eine Voraussichts-Begehung – Spezialequipment lieber einplanen.',
  },
  'yverdon-les-bains': {
    kontext:
      'Yverdon ist Hauptstadt der Waadtländer Nordregion: Verwaltung, Y-Parc Technologiepark und KMU-Mittelstand am Bahnhof und in Cheminet.',
    logistik:
      'Y-Parc und Pierre-de-Savoie haben moderne Anlieferzonen; in der Altstadt sind die Strassen schmaler.',
    region:
      'Anbieter sind in Grandson, Sainte-Croix, Estavayer-le-Lac, Payerne und im ganzen Nord-Vaud aktiv.',
    vorOrtTipp:
      'Im Y-Parc gibt es Sicherheitsslots an den Empfängen – Anlieferzeit mit dem Empfang vorab abstimmen.',
  },
  duebendorf: {
    kontext:
      'Dübendorf ist moderne Glattal-Stadt mit Innovationspark Innovaare-Korridor, Logistik-Standorten und KMU-Cluster nahe Stettbach.',
    logistik:
      'Die meisten Bürobauten haben moderne Tiefgaragen und Lifte; Glatt-Promenade hat längere Tragwege.',
    region:
      'Anbieter decken Wallisellen, Dietlikon, Volketswil, Wangen-Brüttisellen und den Glattalkorridor bis Zürich-Oerlikon ab.',
    vorOrtTipp:
      'Wegen Nähe zu Zürich sind Geschäftsumzug-Termine in Dübendorf oft kurzfristig verfügbar – mehrere Offerten anfragen.',
  },
  kriens: {
    kontext:
      'Kriens ist Industrie-/KMU-Standort am Pilatus-Hang mit dem Mall of Switzerland-Korridor und einem dichten Mittelstands-Mix in Mattenhof.',
    logistik:
      'Hanglagen oberhalb Mattenhof haben enge Quartierstrassen; in Mattenhof und Schweighof sind Anlieferzonen gross.',
    region:
      'Geschäftsumzug-Anbieter fahren nach Luzern, Horw, Emmen, Hergiswil und im westlichen Vierwaldstättersee.',
    vorOrtTipp:
      'Bei Hangbüros am Pilatus lohnt eine Foto-Beilage zur Zufahrt – kleinere Transporter sparen Aufschläge.',
  },
  dietikon: {
    kontext:
      'Dietikon ist Limmattaler KMU-Hub mit Industriekonversionen, Logistik (Silbern-Areal) und Bürobauten an der Limmattalbahn.',
    logistik:
      'Tiefgaragen mit Höhenbeschränkung sind im Limmattal verbreitet; Industrieareale haben Rampen und Lkw-Tauglichkeit.',
    region:
      'Anbieter decken Schlieren, Geroldswil, Oberengstringen, Spreitenbach AG und das ganze Limmattal ab.',
    vorOrtTipp:
      'Dank Limmattalbahn und A1-Anschluss sind Geschäftsumzug-Preise in Dietikon oft attraktiv – Vergleichsofferten lohnen sich.',
  },
  meyrin: {
    kontext:
      'Meyrin ist CERN-Korridor und industriell stark (ZIMEYSA): Forschung, Hightech-KMU und Logistik prägen den Geschäftsumzug-Alltag.',
    logistik:
      'CERN- und ZIMEYSA-Gebäude haben Sicherheits- und Zugangsregeln; in der Cité Meyrin sind Wege länger.',
    region:
      'Anbieter sind in Vernier, Satigny, Genf, Versoix und im Pays de Gex (FR) aktiv.',
    vorOrtTipp:
      'Anlieferungen am CERN benötigen einen Zugangsausweis und Vor-Anmeldung – im Auftrag vermerken.',
  },
  carouge: {
    kontext:
      'Carouge wirkt wie eine eigene Kleinstadt: Designagenturen, Boutiquen, Architekturbüros und KMU rund um die Place du Marché.',
    logistik:
      'Die Schachbrett-Altstadt mit vielen Einbahnen erfordert Erfahrung; in Carouge-Industrie und Acacias sind Zufahrten gut.',
    region:
      'Geschäftsumzug-Anbieter decken Genf, Lancy, Vernier, Plan-les-Ouates und Onex ab.',
    vorOrtTipp:
      'Für Boutiquen am Place du Marché ist die Anlieferung tagsüber heikel – frühe Stunden oder Wochenende einplanen.',
  },
  montreux: {
    kontext:
      'Montreux ist Tourismus, Eventwirtschaft (Jazz Festival, 2m2c) und Versicherungs-/Treuhand-Standort an der Riviera.',
    logistik:
      'Hangbüros oberhalb der Avenue des Alpes haben schmale Zufahrten; an der Promenade ist die Anlieferung flach und unkompliziert.',
    region:
      'Anbieter fahren nach Vevey, La Tour-de-Peilz, Villeneuve, Aigle und ins Lavaux.',
    vorOrtTipp:
      'Während des Jazz Festivals (Juli) sind Geschäftsumzüge im Stadtkern eingeschränkt – Termine ausserhalb der Festivalwoche planen.',
  },
  frauenfeld: {
    kontext:
      'Frauenfeld ist Thurgauer Kantons­hauptstadt: Verwaltung, Versicherungen, KMU in Kurzdorf und Industrie in Erzenholz.',
    logistik:
      'Die Altstadt-Häuser sind drei- bis viergeschossig mit Holztreppen; in Erzenholz und Gachnang sind Anlieferzonen LKW-tauglich.',
    region:
      'Geschäftsumzug-Anbieter decken Weinfelden, Wil, Aadorf, Kreuzlingen, Romanshorn und den Kanton Thurgau ab.',
    vorOrtTipp:
      'An Markttagen (Mi/Sa) ist die Innenstadt Frauenfeld voll – Termine auf andere Wochentage legen.',
  },
  wetzikon: {
    kontext:
      'Wetzikon ist Zürcher Oberland-Zentrum: Versicherungen, Bauunternehmen, Healthcare und KMU-Mittelstand entlang der Bahnhofstrasse.',
    logistik:
      'Neubauten haben moderne Aufzüge und Tiefgaragen; im historischen Kern sind Zufahrten enger.',
    region:
      'Anbieter sind in Hinwil, Pfäffikon ZH, Bauma, Uster und im ganzen Zürcher Oberland aktiv.',
    vorOrtTipp:
      'Wegen zentraler Lage zwischen Zürich und Rapperswil sind Geschäftsumzug-Preise hier oft attraktiv – Vergleich lohnt sich.',
  },
  baden: {
    kontext:
      'Baden ist ABB-Stadt: Industrie, Engineering und Forschung (ABB, Hitachi Energy), dazu Versicherungen und KMU in der Altstadt und in Dättwil.',
    logistik:
      'Die Bäderstadt-Altstadt hat enge Gassen und Hochtrottoirs; Dättwil und Wettingen-Industrie sind LKW-tauglich.',
    region:
      'Anbieter decken Wettingen, Ennetbaden, Neuenhof, Spreitenbach, Baden-Dättwil und das Aargauer Limmattal ab.',
    vorOrtTipp:
      'Am ABB-Areal gelten Werks-Zufahrtsregeln – Lieferschein, Personalliste und Slot vorab abstimmen.',
  },
}

export function getGeschaeftsumzugCityContent(
  locationSlug: string
): GeschaeftsumzugCityBlock | null {
  return GESCHAEFTSUMZUG_CITY_CONTENT[locationSlug.toLowerCase()] ?? null
}
