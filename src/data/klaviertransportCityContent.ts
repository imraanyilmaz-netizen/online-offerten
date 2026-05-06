/**
 * Klaviertransport — stadt-spezifischer Content für `/umzugsfirma/klaviertransport/{slug}`.
 *
 * Ziel: Jede grössere Stadt-Seite hat hier einen handgeschriebenen Block, damit
 * keine zwei Seiten gleich klingen ("Vor Ort in [CITY]" mit echten lokalen
 * Hinweisen – Altstadt, Zufahrten, typische Quartiere, Lift-/Halteverbots-
 * Themen).
 *
 * Felder:
 *  - kontext:    1 Satz "wie sieht die Stadt im Klaviertransport-Alltag aus"
 *  - zugang:     1 Satz "typische Treppenhäuser / Zufahrten / Hindernisse"
 *  - region:     1 Satz "Umgebung / Nachbargemeinden, in die Partner fahren"
 *  - vorOrtTipp: 1 Satz konkreter Praxistipp (Halteverbot, Klavierlift, etc.)
 *
 * Wenn ein Slug nicht hinterlegt ist, fällt `klaviertransportLocalText` in
 * `cityPageFaqs.ts` auf die Kanton-basierte Fallback-Logik zurück.
 */

export type KlaviertransportCityBlock = {
  kontext: string
  zugang: string
  region: string
  vorOrtTipp: string
}

export const KLAVIERTRANSPORT_CITY_CONTENT: Record<string, KlaviertransportCityBlock> = {
  zuerich: {
    kontext:
      'Zürich mischt Altstadt-Gassen, dichte See- und Hangquartiere (Enge, Wollishofen, Hottingen) mit modernen Hochhäusern in Zürich-West – jede Lage hat ihre eigene Klaviertransport-Logik.',
    zugang:
      'Im Niederdorf und in der Altstadt sind Treppenhäuser oft schmal und gewunden, in den oberen Quartieren stehen viele Klaviere im 3.–5. OG ohne ausreichenden Aufzug.',
    region:
      'Klaviertransport-Spezialisten aus der Region decken auch Küsnacht, Zollikon, Adliswil, Schlieren, Dübendorf und Wallisellen ab.',
    vorOrtTipp:
      'In der Stadt Zürich braucht es für den Halteverbots-Antrag (Dienstabteilung Verkehr) typischerweise 10 Werktage Vorlauf – früh planen.',
  },
  genf: {
    kontext:
      'Genf vereint die enge Vieille-Ville auf dem Hügel mit den dicht bebauten Quartieren Eaux-Vives, Pâquis und Plainpalais – die Wege zum Instrument sind selten gerade.',
    zugang:
      'Viele Genfer Altbauten haben kleine Aufzüge oder enge Wendeltreppen; Hangstrassen Richtung Champel und Florissant verlangen erfahrene Crews.',
    region:
      'Zum Einsatzgebiet zählen üblicherweise Carouge, Vernier, Lancy, Meyrin, Onex und das Umland bis nach Versoix oder Bernex.',
    vorOrtTipp:
      'In Genf erleichtert eine kurze Halteverbots-Bewilligung (Fondation des Parkings) das Beladen direkt vor dem Hauseingang.',
  },
  basel: {
    kontext:
      'Grossbasel mit Münster, Spalentor und der Rittergasse hat schmale Gassen und Kopfsteinpflaster, Kleinbasel ist mit Riehen und Hirzbrunnen flacher und besser zugänglich.',
    zugang:
      'Historische Treppenhäuser, kleine Aufzüge und Erker prägen die Innenstadt – häufig wird ein Aussenlift über das Fenster oder den Innenhof eingesetzt.',
    region:
      'Spezialisten fahren auch nach Riehen, Allschwil, Binningen, Birsfelden, Muttenz und ins Dreiländereck Richtung Lörrach/St. Louis.',
    vorOrtTipp:
      'Wer in Basel-Stadt parkieren lassen muss, beantragt die Bewilligung beim Verkehrs- und Bevölkerungsdienst (VBD) frühzeitig vor dem Transporttag.',
  },
  lausanne: {
    kontext:
      'Lausanne ist eine Treppenstadt: vom See bei Ouchy bis hoch nach Sauvabelin und Chailly liegen mehrere Quartiers­ebenen mit teils sehr steilen Zufahrten.',
    zugang:
      'Cité, Bourg und Sous-Gare haben enge, kurvige Strassen; in Beaulieu und Vidy sind die Liftmasse besser, aber die Zugangswege oft länger.',
    region:
      'Anbieter sind regelmässig auch in Pully, Renens, Prilly, Ecublens, Morges und Lutry unterwegs.',
    vorOrtTipp:
      'Gerade in Lausanne hilft ein Foto vom Treppenhaus und vom Stellplatz vor dem Haus, damit das Angebot wirklich passt – Hanglage einplanen.',
  },
  bern: {
    kontext:
      'Die UNESCO-Altstadt mit Lauben, Kornhausgasse und Matte stellt jede Klaviertransport-Crew vor andere Anforderungen als Bümpliz, Holligen oder Wankdorf.',
    zugang:
      'Sandsteinfassaden, niedrige Lauben­durchgänge und enge Kopfstein­pflaster-Gassen bedeuten oft längere Tragwege; in den Aussenquartieren sind die Liftmasse moderner.',
    region:
      'Aktive Einsatzgebiete sind in der Regel Köniz, Ostermundigen, Ittigen, Muri, Worb und das Berner Mittelland bis Lyss/Münsingen.',
    vorOrtTipp:
      'Für die Kernzone der Altstadt (mit Anlieferzeit­fenstern) lohnt sich eine Bewilligung der Stadt Bern – Klaviertransporte ausserhalb der Stosszeiten verursachen am wenigsten Stress.',
  },
  winterthur: {
    kontext:
      'Winterthur kombiniert die kompakte Altstadt mit Industrieumnutzungen (Sulzer-Areal, Lokstadt) und ruhigen Wohnquartieren wie Töss, Veltheim und Mattenbach.',
    zugang:
      'Die Altstadt-Liegenschaften haben oft enge Treppenhäuser, in den ehemaligen Industrie-Lofts dafür grosszügige Frachtaufzüge – das macht jeden Auftrag anders.',
    region:
      'Klaviertransport-Partner fahren auch nach Wülflingen, Seen, Effretikon, Frauenfeld und ins Tösstal.',
    vorOrtTipp:
      'Loft-Wohnungen mit Industrieaufzug sparen oft Aufpreise – einfach Liftmass und Ladegrenze in der Anfrage angeben.',
  },
  luzern: {
    kontext:
      'Luzern lebt von der Altstadt zwischen Reuss und Vierwaldstättersee, dazu kommen Hangquartiere wie Wesemlin, Bramberg und Tribschen mit teils steilen Zufahrten.',
    zugang:
      'Altstadtgassen wie Hertensteinstrasse oder Rössligasse erlauben oft nur schmale Fahrzeuge; Treppenhäuser im Bramberg-Quartier sind eng und mehrstöckig.',
    region:
      'Im Einsatzgebiet liegen üblicherweise Kriens, Emmen, Horw, Ebikon, Sursee und der ganze Vierwaldstättersee-Raum.',
    vorOrtTipp:
      'In der Luzerner Innenstadt gelten Anlieferzeit­fenster (typisch 06–11 Uhr); für einen ruhigen Klaviertransport früh am Morgen anfragen.',
  },
  'st-gallen': {
    kontext:
      'St. Gallen ist eine Hangstadt mit Stiftsbezirk, Erkern und engen Altstadtgassen, dazu kommen ruhigere Quartiere in Bruggen, Riethüsli und Rotmonten.',
    zugang:
      'Erkerfassaden, schmale Treppenhäuser und teils steile Zufahrten am Rosenberg und Freudenberg verlangen erfahrene Crews und manchmal einen Aussenlift.',
    region:
      'Anbieter decken auch Gossau, Wittenbach, Herisau, Wil, Rorschach und das Appenzellerland ab.',
    vorOrtTipp:
      'Die Hanglagen rund um den Rosenberg sind im Winter rutschig – Klaviertransporte werden gern auf trockene Tage verschoben.',
  },
  lugano: {
    kontext:
      'Luganos Altstadt rund um die Piazza della Riforma ist verkehrsbeschränkt, oben am Berg (Castagnola, Brè, Ruvigliana) wird es schnell steil und kurvig.',
    zugang:
      'Tessiner Altbauten haben oft kleine Aufzüge und sehr enge Treppenkurven; Konzertflügel kommen häufig per Aussenkran ins Wohnzimmer.',
    region:
      'Klaviertransport-Spezialisten fahren auch nach Paradiso, Massagno, Locarno, Bellinzona und ins Mendrisiotto.',
    vorOrtTipp:
      'Für die ZTL-Zone in Luganos Altstadt braucht es eine Zufahrts­bewilligung – vor der Buchung mit dem Anbieter abklären.',
  },
  'biel-bienne': {
    kontext:
      'Biel/Bienne verbindet die Altstadt am Jurahang mit dem flachen Seequartier, Mett, Madretsch und Bözingen – zweisprachig, vielseitig, logistisch unterschiedlich.',
    zugang:
      'In der Altstadt zählt jeder Meter zwischen Lauben­dächern und Stützmauern; Richtung Bözingen sind die Strassen breiter und Aufzüge moderner.',
    region:
      'Einsätze gehen oft auch nach Lyss, Nidau, Brügg, Grenchen und ins Berner und Solothurner Seeland.',
    vorOrtTipp:
      'In der Bieler Altstadt helfen frühe Vormittagstermine – sonst stauen Lieferdienste und Marktstände den Halt vor der Tür.',
  },
  thun: {
    kontext:
      'Thun mischt Altstadt mit Schlossberg, Hauptgasse mit Hochtrottoirs und ruhige Aare-Quartiere wie Lauenen, Allmendingen und Strättligen.',
    zugang:
      'Die Hauptgasse mit ihren Hochtrottoirs ist für Klaviertransporte unpraktisch – Anbieter wählen oft Seitengassen mit Halteverbot.',
    region:
      'Aktive Region: Steffisburg, Spiez, Heimberg, Uetendorf und das Berner Oberland bis Interlaken.',
    vorOrtTipp:
      'Wer am Schlossberg wohnt, plant Aussenlift oder Treppenraupe von Anfang an mit – die schmalen Treppen sind kein Standardfall.',
  },
  bellinzona: {
    kontext:
      'Bellinzona thront mit drei UNESCO-Burgen über dem Verzasca­tal; die Altstadtgassen am Castelgrande sind eng und teils nur in einer Richtung befahrbar.',
    zugang:
      'Altbau-Treppenhäuser sind oft niedrig und schmal, dafür sind die Quartiere am Stadtrand (Daro, Carasso) gut zugänglich.',
    region:
      'Klaviertransport-Partner fahren auch nach Giubiasco, Locarno, Lugano und ins Bleniotal.',
    vorOrtTipp:
      'Für die Burgen­strassen lohnt eine Vor-Ort-Besichtigung – Klaviertransporte um die Castelli werden meist mit kleinem Spezialfahrzeug erledigt.',
  },
  koeniz: {
    kontext:
      'Köniz ist polyzentrisch: Liebefeld, Wabern und Niederwangen wirken städtisch, Schliern, Mittelhäusern und Niederscherli sind ländlich-ruhig.',
    zugang:
      'In Liebefeld und Wabern sind moderne Lift­anlagen die Regel; in den Aussenweilern stehen Klaviere oft in Einfamilien­häusern mit guter Zufahrt.',
    region:
      'Spezialisten kombinieren Köniz häufig mit Bern, Belp, Muri, Kehrsatz und Riggisberg.',
    vorOrtTipp:
      'Wer in einer engen Quartier­strasse wohnt, klärt vorab, ob der Klaviertransport-LKW vor dem Haus halten kann oder ein Schubkarren-Trolley nötig ist.',
  },
  freiburg: {
    kontext:
      'Freiburg ist eine Stadt mit zwei Niveaus: Oberstadt mit Kathedrale und enger Bourg, Unterstadt mit der Saane und der Auge – verbunden durch Treppen und Funiculaire.',
    zugang:
      'Die Sandstein­häuser der Oberstadt haben charaktervolle, aber sehr enge Treppenhäuser; in der Unterstadt sind die Räume oft niedriger.',
    region:
      'Klaviertransport-Anbieter fahren regelmässig auch nach Villars-sur-Glâne, Bulle, Düdingen und ins Sense- und Murtenbiet.',
    vorOrtTipp:
      'Beim Niveau­wechsel zwischen Ober- und Unterstadt empfiehlt sich ein erfahrener Anbieter – Treppenraupen oder Klavierroller sind hier Standard.',
  },
  schaffhausen: {
    kontext:
      'Schaffhausen lebt von der Altstadt mit Erkern und Riegelfassaden, dazu kommen die Hänge zum Munot und das eher flache Niklausen­quartier.',
    zugang:
      'Erkerräume sind oft tief, aber Türöffnungen knapp – Klaviere müssen häufig leicht gekippt werden, um durch die Eingänge zu kommen.',
    region:
      'Einsatzgebiete decken Neuhausen am Rheinfall, Thayngen, Stein am Rhein und das Klettgau ab.',
    vorOrtTipp:
      'Für die Anlieferung in der Altstadt sind die frühen Stunden ideal – sonst steht der Lieferverkehr in den engen Gassen Schlange.',
  },
  'la-chaux-de-fonds': {
    kontext:
      'La Chaux-de-Fonds ist im Schachbrettmuster gebaut – grosse, gerade Strassen, hohe Altbauten mit klassischen Wohnungen und Uhren-Manufakturen.',
    zugang:
      'Die Treppenhäuser sind oft hoch (4. OG), aber breit; das macht Klavier­transporte mit Roller und Gurten gut planbar.',
    region:
      'Anbieter sind auch in Le Locle, Saint-Imier, Neuenburg und im ganzen Jura aktiv.',
    vorOrtTipp:
      'Im Winter ist das Hochplateau auf 1000 m hart – Klaviertransporte werden bei Schnee gerne auf den nächsten trockenen Tag verschoben.',
  },
  chur: {
    kontext:
      'Chur ist die älteste Stadt der Schweiz: enge Altstadtgassen, der Bischofs­hof und Quartiere wie Masans, Lürlibad und Rheinquartier mit ganz unterschiedlicher Bausubstanz.',
    zugang:
      'In der Altstadt sind Treppen oft holzig und steil; in den moderneren Quartieren am Rheinufer ist die Zufahrt einfacher.',
    region:
      'Klaviertransport-Spezialisten decken Domat/Ems, Felsberg, Landquart, Davos, das Engadin und das Prättigau ab.',
    vorOrtTipp:
      'Für Transporte ins Engadin oder nach Davos lohnt eine frühzeitige Anfrage – Bergstrassen können im Winter Spezialfahrzeuge nötig machen.',
  },
  uster: {
    kontext:
      'Uster ist eine Pendlerstadt am Greifensee mit modernen Wohnüberbauungen und einer kompakten Altstadt rund um die reformierte Kirche.',
    zugang:
      'Die meisten Liegenschaften haben heutige Liftmasse und gerade Treppenhäuser – Klaviertransporte sind hier oft Standardfälle.',
    region:
      'Einsatzgebiet: Greifensee, Volketswil, Wetzikon, Pfäffikon ZH, Dübendorf und der ganze Zürcher Oberlandkorridor.',
    vorOrtTipp:
      'Wer am See wohnt, plant das Halteverbot für die Anlieferung – Strandpromenade und Seeweg haben begrenzte Halteflächen.',
  },
  sitten: {
    kontext:
      'Sitten/Sion liegt zwischen Tourbillon und Valère; die Altstadt ist verwinkelt, die Quartiere am Stadtrand (Champsec, Vissigen, Bramois) sind moderner.',
    zugang:
      'Walliserhäuser-Treppen sind charakteristisch eng; in den Neubauten am Rhonetal sind Liftmasse und Zufahrt unproblematisch.',
    region:
      'Klaviertransport-Partner sind auch in Martigny, Conthey, Sierre, Crans-Montana und im ganzen Mittelwallis tätig.',
    vorOrtTipp:
      'Im Sommer sind Walliser Mittagsstunden heiss – ein Klaviertransport am frühen Morgen schont das Instrument und die Crew.',
  },
  zug: {
    kontext:
      'Zug verbindet Altstadt am See mit den Hangquartieren am Zugerberg und modernen Wohn­überbauungen im Norden (Aabach, Herti).',
    zugang:
      'Am Zugerberg sind die Strassen kurvig und teils steil; in den Neubauten gibt es grosszügige Lifte und gute Zufahrten.',
    region:
      'Einsatzgebiete: Baar, Cham, Steinhausen, Risch, Hünenberg, Walchwil und das ganze Zugerbiet.',
    vorOrtTipp:
      'Wer am See wohnt, plant 10 Min. Pufferzeit für Halten ein – Seestrasse und Promenade sind verkehrsstark.',
  },
  'yverdon-les-bains': {
    kontext:
      'Yverdon ist die Hauptstadt der Waadtländer Nordregion: kompakte Altstadt am Schlossplatz, dazu moderne Quartiere wie Pierre-de-Savoie und Cheminet.',
    zugang:
      'Die Altstadt­häuser sind solide gebaut, oft mit breiten Treppen­häusern; in den jüngeren Überbauungen ist die Zufahrt einfach.',
    region:
      'Klaviertransport-Partner decken auch Grandson, Sainte-Croix, Estavayer-le-Lac und Payerne ab.',
    vorOrtTipp:
      'Bei einem Transport zum Schlossplatz lohnt eine Halteverbots-Bewilligung der Stadt – sonst sind die Stellplätze schnell besetzt.',
  },
  duebendorf: {
    kontext:
      'Dübendorf ist eine moderne Glattal-Stadt mit Flugplatz-Geschichte – viele Mehrfamilien­häuser aus den 70er-/80er-Jahren und neue Überbauungen wie Stettbach.',
    zugang:
      'Die Liftmasse sind meist gut, aber Treppenhäuser in 60er/70er-Bauten sind teils eng; an der Glatt-Promenade sind Wege länger.',
    region:
      'Im Einsatzgebiet liegen Wallisellen, Wangen-Brüttisellen, Dietlikon, Volketswil und der Glattalkorridor bis Zürich-Oerlikon.',
    vorOrtTipp:
      'Wegen der Nähe zur Stadt Zürich ist Dübendorf für Klaviertransport-Anbieter sehr gut erreichbar – Termine sind oft kurzfristig möglich.',
  },
  kriens: {
    kontext:
      'Kriens liegt am Pilatus-Hang: Mattenhof am Tal, Obernau und Hergiswald deutlich höher mit kurvigen Anfahrten und schöner Aussicht.',
    zugang:
      'Hanglagen bedeuten oft Wendehammer und schmale Quartier­strassen; Treppenhäuser in den Hochhäusern am Mattenhof sind dafür modern.',
    region:
      'Aktive Region: Luzern, Horw, Emmen, Hergiswil und der ganze westliche Vierwaldstättersee.',
    vorOrtTipp:
      'Bei Hangwohnungen am Pilatus lohnt sich ein Foto der Zufahrt – manche Anbieter setzen einen kleineren Transporter ein.',
  },
  dietikon: {
    kontext:
      'Dietikon liegt mitten im Limmattal: moderne Wohn­überbauungen am Bahnhof, Industrie­konversionen und ruhige Einfamilien­haus-Quartiere im Schöneggquartier.',
    zugang:
      'Neubauten haben grosszügige Tief­garagen und Lifte; in älteren Liegenschaften an der Bahnhofstrasse können Treppenhäuser enger sein.',
    region:
      'Spitalbahn-, Limmattalbahn- und Autobahnzugang machen Dietikon für Klaviertransport-Spezialisten aus Zürich, Aargau und Baselbiet sehr schnell erreichbar.',
    vorOrtTipp:
      'Dank Limmattalbahn und A1-Anschluss sind Klaviertransporte aus Zürich oft günstiger als gedacht – Vergleichsofferten lohnen sich.',
  },
  'rapperswil-jona': {
    kontext:
      'Rapperswil-Jona schmiegt sich an den oberen Zürichsee: historisches Schlossstädtchen mit Kopfsteinpflaster, dazu Wohnquartiere von Curtiberg bis Wagen.',
    zugang:
      'Schlossstädtchen­gassen sind eng und teils stufig; in Jona dominieren moderne Mehrfamilien­häuser mit guten Lifte.',
    region:
      'Anbieter fahren auch nach Wollerau, Pfäffikon SZ, Rüti ZH und das Linthgebiet.',
    vorOrtTipp:
      'Für Stadtbereiche mit Fussgänger­zone braucht es vorab eine Zufahrts­bewilligung – sonst fährt der Klaviertransport-LKW nicht hinein.',
  },
  meyrin: {
    kontext:
      'Meyrin ist Genfs grösste Vorstadt mit Cité Meyrin, dem CERN-Korridor und ruhigen Wohnquartieren – viele Hochhäuser und gute öffentliche Verkehrsanbindung.',
    zugang:
      'Die Hochhäuser haben grosszügige Frachtaufzüge; in den Cité-Bauten der 60er-Jahre sind Treppenhäuser teilweise enger.',
    region:
      'Klaviertransport-Partner kombinieren Meyrin oft mit Vernier, Satigny, Genf, Versoix und dem Pays de Gex (FR).',
    vorOrtTipp:
      'Anlieferungen am CERN-Korridor benötigen einen Zugangs­ausweis – das vorab im Formular vermerken spart Zeit.',
  },
  montreux: {
    kontext:
      'Montreux liegt eingebettet zwischen Genfersee und Lavaux-Hängen – die Promenade ist flach, dahinter steigt das Gelände schnell stark an.',
    zugang:
      'Hangwohnungen oberhalb der Avenue des Alpes haben oft schmale Zufahrten; an der Seepromenade ist die Anlieferung dafür unkompliziert.',
    region:
      'Anbieter fahren auch nach Vevey, La Tour-de-Peilz, Villeneuve, Aigle und das Lavaux.',
    vorOrtTipp:
      'Während des Jazz Festivals (Juli) sind Klaviertransporte im Stadtkern eingeschränkt – Termine ausserhalb des Festivals planen.',
  },
  frauenfeld: {
    kontext:
      'Frauenfeld besteht aus der historischen Altstadt mit Murg-Brücke und ruhigen Aussen­quartieren wie Kurzdorf, Erzenholz und Gachnang.',
    zugang:
      'Altstadt­häuser sind oft drei- bis viergeschossig mit klassischen Holztreppen; in den Aussenquartieren sind die Liftmasse gut.',
    region:
      'Einsatzgebiet: Weinfelden, Wil, Aadorf, Kreuzlingen, Romanshorn und der ganze Kanton Thurgau.',
    vorOrtTipp:
      'Für Klaviertransporte am Marktplatz sind die Markttage (Mi/Sa) ungünstig – andere Wochentage planen.',
  },
  wetzikon: {
    kontext:
      'Wetzikon liegt im Zürcher Oberland an der Strecke Zürich–Rapperswil – Kempten, Robenhausen und Unterwetzikon haben jeweils eigene Bauarten.',
    zugang:
      'Die Mehrzahl der Wohngebäude stammt aus den letzten 40 Jahren mit modernen Aufzügen; nur die Altbauten am Bahnhofplatz sind enger.',
    region:
      'Anbieter decken Hinwil, Pfäffikon ZH, Bauma, Uster und das gesamte Zürcher Oberland ab.',
    vorOrtTipp:
      'Wegen der zentralen Lage zwischen Zürich und Rapperswil sind die Klaviertransport-Preise in Wetzikon oft im günstigeren Bereich.',
  },
  waedenswil: {
    kontext:
      'Wädenswil ist eine Hangstadt am linken Zürichsee – vom See bis zum Etzel ziehen sich Quartiere wie Au, Eichweid, Beichlen und Stocken.',
    zugang:
      'Hanglagen bedeuten oft serpentinige Quartier­strassen und längere Tragwege; am See sind die Zufahrten flacher.',
    region:
      'Einsatzgebiet: Horgen, Richterswil, Pfäffikon SZ, Thalwil, Adliswil und das ganze Zimmerberg-Gebiet.',
    vorOrtTipp:
      'Bei Hanglagen oberhalb der Bahnlinie lohnt sich ein Aussenlift – die Treppen ins 2. OG haben oft enge Wendelpodeste.',
  },
}

export function getKlaviertransportCityContent(
  locationSlug: string
): KlaviertransportCityBlock | null {
  return KLAVIERTRANSPORT_CITY_CONTENT[locationSlug.toLowerCase()] ?? null
}
