/**
 * Service-level FAQs für Kategorie-/Leistungsseiten.
 *
 * Ziel:
 *  - je Service maximal 5 evergreen, SEO-relevante Fragen (Kosten, Ablauf, Zeit, Leistungen, Vergleich)
 *  - Antworten als reiner Text (SSR-sicher, FAQPage-Schema tauglich)
 *  - optional `{city}`-Platzhalter – auf Standort-Seiten ersetzt
 *
 * Keine Tabellen/Komponenten hier: bewusst nur Q&A (Text).
 */

export type ServiceFaqItem = {
  question: string
  answer: string
}

type FaqDict = Record<string, ServiceFaqItem[]>

function applyCity(text: string, city?: string): string {
  if (!text.includes('{city}')) return text
  return city ? text.split('{city}').join(city) : text.split(' in {city}').join('').split('{city}').join('')
}

const UMZUG_FAQS: FaqDict = {
  privatumzug: [
    {
      question: 'Was kostet ein Privatumzug in der Schweiz?',
      answer:
        'Die Kosten hängen von Volumen, Distanz, Stockwerk und Zusatzleistungen wie Einpackservice oder Endreinigung ab. Als Richtwert gelten für eine 3-Zimmer-Wohnung inklusive Team CHF 1\u2019000–1\u2019800, für 4–5 Zimmer CHF 1\u2019800–3\u2019000. Durch den Vergleich mehrerer Offerten sparen Sie üblicherweise 20–40 %.',
    },
    {
      question: 'Wie viel Vorlaufzeit brauche ich für einen Privatumzug?',
      answer:
        'Für Werktags-Termine genügen oft 2–3 Wochen. Für Monatsende, Sommermonate oder grössere Haushalte empfehlen wir 4–8 Wochen. Wer eine Endreinigung mit Abnahmegarantie bucht, sollte diese gleich mit anfragen.',
    },
    {
      question: 'Welche Leistungen sind bei einem Privatumzug enthalten?',
      answer:
        'Standardmässig: De- und Remontage der Möbel, sicherer Transport und Anliefern im neuen Zuhause. Zusatzleistungen wie Einpackservice, Möbellift, Entsorgung alter Möbel oder die Endreinigung lassen sich auf Wunsch einbinden.',
    },
    {
      question: 'Wie finde ich die beste Umzugsfirma für meinen Privatumzug?',
      answer:
        'Vergleichen Sie mehrere Offerten auf Preis, enthaltene Leistungen, Haftpflichtversicherung und Kundenbewertungen. Achten Sie auf eine fixe Pauschale statt offener Stundenabrechnung – das schafft Planungssicherheit.',
    },
    {
      question: 'Was übernehme ich selbst, was die Umzugsfirma?',
      answer:
        'Sie entscheiden frei: Von reinem Transport (Sie packen selbst) bis zum Komplettumzug mit Einpacken, Möbelmontage und Endreinigung. Je mehr Sie selbst erledigen, desto günstiger wird die Offerte.',
    },
  ],
  geschaeftsumzug: [
    {
      question: 'Was kostet ein Geschäftsumzug in der Schweiz?',
      answer:
        'Ein Büroumzug wird individuell offeriert: Büromaterial, IT-Infrastruktur, Aktenarchiv und Mobiliar beeinflussen den Preis. Als Orientierung: kleine Büros ab CHF 1\u2019500, mittlere Firmen CHF 3\u2019000–8\u2019000, grössere Projekte werden nach Besichtigung kalkuliert.',
    },
    {
      question: 'Wie minimiere ich den Betriebsausfall beim Geschäftsumzug?',
      answer:
        'Planen Sie den Umzug über ein Wochenende oder in mehreren Etappen. Ein Projektplan mit IT-Abbau/-Aufbau, Beschriftungssystem und klarer Kommunikation ans Team reduziert Ausfallzeiten auf ein Minimum.',
    },
    {
      question: 'Ab wann sollte ein Unternehmensumzug geplant werden?',
      answer:
        'Für KMU empfehlen wir 2–3 Monate Vorlauf. Grössere Firmen mit 20+ Arbeitsplätzen oder sensibler IT-Infrastruktur profitieren von 4–6 Monaten Planung inklusive Raumplanung und Umzugskonzept.',
    },
    {
      question: 'Welche Zusatzleistungen sind bei Geschäftsumzügen üblich?',
      answer:
        'Abbau/Aufbau von Arbeitsplätzen und Serverracks, Spezialtransporte (Tresore, Laborgeräte), Aktenvernichtung nach DSG, Entsorgung alter Möbel sowie End- und Baureinigung der alten Räume.',
    },
    {
      question: 'Wie vergleiche ich Geschäftsumzug-Offerten richtig?',
      answer:
        'Achten Sie auf ein gleiches Leistungs-Scope (gleicher Umfang, gleiche Zusatzleistungen), Haftpflichtdeckung, Referenzen aus Ihrer Branche und einen klaren Zeitplan mit Meilensteinen.',
    },
  ],
  auslandumzug: [
    {
      question: 'Was kostet ein Auslandsumzug ab der Schweiz?',
      answer:
        'Preise variieren stark je nach Zielland, Volumen und Transportart (Strasse, Bahn, See, Luft). EU-Umzüge starten ab ca. CHF 2\u2019500; Überseeumzüge beginnen meist ab CHF 4\u2019000. Zoll, Zielgebühren und Versicherung sind separat zu kalkulieren.',
    },
    {
      question: 'Welche Dokumente brauche ich für den Auslandumzug?',
      answer:
        'Reisepass, Inventarliste (mehrsprachig), Zollformulare, ggf. Umzugsgut-Freinachweise und je nach Land ein gültiger Arbeits-/Wohnsitznachweis. Ihre Umzugsfirma unterstützt bei Zollformalitäten und Dokumenten.',
    },
    {
      question: 'Wie lange dauert ein Umzug ins Ausland?',
      answer:
        'Innerhalb Europas per LKW 2–10 Tage. Container per Schiff (Übersee) 4–10 Wochen je nach Destination. Luftfracht ist die schnellste Option (3–7 Tage), aber deutlich teurer.',
    },
    {
      question: 'Welche Versicherung ist beim Auslandumzug sinnvoll?',
      answer:
        'Eine internationale Umzugsgut-Versicherung zum Wiederbeschaffungswert wird empfohlen, zusätzlich zur Grundhaftung der Umzugsfirma. So sind Totalverlust, Beschädigung und Verzögerungsschäden gedeckt.',
    },
    {
      question: 'Wie finde ich eine seriöse Firma für den internationalen Umzug?',
      answer:
        'Achten Sie auf FIDI/FAIM-Zertifizierung, Erfahrung im Zielland, transparente Zollabwicklung, Haftpflichtversicherung und Kundenreferenzen. Vergleichen Sie 2–3 Offerten mit identischem Leistungsumfang.',
    },
  ],
  klaviertransport: [
    {
      question: 'Was kostet ein Klaviertransport in der Schweiz?',
      answer:
        'Ein normaler Klaviertransport innerhalb der gleichen Stadt kostet CHF 350–700. Flügel, Treppen oder grössere Distanzen können den Preis auf CHF 800–1\u2019500 heben. Ein Klavierlift ist bei engen Treppenhäusern oft nötig.',
    },
    {
      question: 'Wann ist ein Klavierlift oder Möbellift erforderlich?',
      answer:
        'Sobald ein Flügel oder Klavier nicht durchs Treppenhaus passt oder ab 3.–4. Obergeschoss wird ein Aussenlift empfohlen. Die Firma prüft dies bei der Besichtigung oder per Foto.',
    },
    {
      question: 'Muss ein Klavier nach dem Transport neu gestimmt werden?',
      answer:
        'Ja – durch Temperatur- und Luftfeuchtigkeitswechsel verstimmt sich das Instrument meist. Wir empfehlen die Stimmung 2–4 Wochen nach dem Umzug, damit sich das Holz akklimatisieren kann.',
    },
    {
      question: 'Welche Versicherung gilt bei einem Klaviertransport?',
      answer:
        'Eine Spezialtransport-Versicherung zum Zeitwert oder Wiederbeschaffungswert ist Standard. Prüfen Sie die Deckungssumme und Selbstbehalt. Seriöse Anbieter haben Erfahrung mit Yamaha, Steinway & Co. und dokumentieren den Zustand vor dem Transport.',
    },
    {
      question: 'Worauf sollte ich bei der Wahl einer Klaviertransport-Firma achten?',
      answer:
        'Spezialausrüstung (Klavierrollen, Gurte, Polsterung), Erfahrung mit Flügeltransport, positive Rezensionen und klare Versicherung. Günstigster Preis ist beim Klavier selten die beste Wahl.',
    },
  ],
  kleintransport: [
    {
      question: 'Was kostet ein Kleintransport in der Schweiz?',
      answer:
        'Innerhalb einer Stadt: CHF 120–300 für einzelne Möbel oder wenige Kartons. Bei grösseren Distanzen oder schwer zugänglichen Orten CHF 300–600. Preise hängen von Volumen, Zeit und Personal ab.',
    },
    {
      question: 'Wann lohnt sich ein Kleintransport statt eines Umzugsunternehmens?',
      answer:
        'Für einzelne Möbelstücke, IKEA-Abholungen, Nachlieferungen oder Garagenräumungen ist ein Kleintransport ideal. Bei ganzen Wohnungen lohnt sich ein regulärer Umzugsauftrag mit Pauschalpreis.',
    },
    {
      question: 'Welche Fahrzeuge werden für Kleintransporte eingesetzt?',
      answer:
        'Kastenwagen (6–12 m³) für Möbel, Sprinter mit Ladebordwand (bis 16 m³) für grössere Einzelstücke. Die Wahl richtet sich nach Volumen und Gewicht.',
    },
    {
      question: 'Brauche ich helfende Hände beim Kleintransport?',
      answer:
        'Die meisten Anbieter stellen 1–2 Träger:innen. Bei schweren Möbeln (Sofas, Waschmaschinen) oder engen Treppen lohnt sich ein 2-Personen-Team. Absprache und Offerte im Voraus klären.',
    },
    {
      question: 'Wie schnell ist ein Kleintransport verfügbar?',
      answer:
        'Viele Anbieter fahren noch am selben oder nächsten Werktag. Für fixe Termine am Wochenende oder Monatsende empfehlen wir 3–5 Tage Vorlauf.',
    },
  ],
  lagerung_service: [
    {
      question: 'Was kostet die Lagerung von Möbeln in der Schweiz?',
      answer:
        'Selfstorage-Boxen kosten ab CHF 40/Monat für kleine Abteile, CHF 150–300/Monat für Boxen in Umzugsgrösse. Professionelle Einlagerung (Möbellager mit Inventar) startet ab CHF 100/Monat je Kubikmeter.',
    },
    {
      question: 'Wann ist eine Zwischenlagerung sinnvoll?',
      answer:
        'Bei verzögertem Einzug, Sanierungen, Auslandsaufenthalten oder Unklarheiten zwischen Aus- und Einzug. Auch Firmen nutzen Lagerung für Saisonware, Archive oder während Büroumzügen.',
    },
    {
      question: 'Wie sicher sind professionelle Lagerräume?',
      answer:
        'Seriöse Lagerhäuser bieten Einbruchschutz, Rauchmelder, Kameraüberwachung und klimakontrollierte Räume für empfindliche Güter. Versicherung ist meist optional zubuchbar.',
    },
    {
      question: 'Kann ich jederzeit auf mein eingelagertes Gut zugreifen?',
      answer:
        'Bei Selfstorage: ja, 24/7 in vielen Anlagen. Bei professioneller Lagerung mit Inventar ist ein Zugang meist nach Voranmeldung möglich – dafür ist das Gut oft besser geschützt und versichert.',
    },
    {
      question: 'Wie lange kann ich einlagern?',
      answer:
        'Von wenigen Wochen bis mehreren Jahren – flexibel nach Bedarf. Die meisten Anbieter arbeiten mit monatlicher Abrechnung ohne lange Bindung.',
    },
  ],
  raeumung_service: [
    {
      question: 'Was kostet eine Wohnungs- oder Hausräumung?',
      answer:
        'Pro Zimmer rechnet man mit CHF 300–600 inklusive fachgerechter Entsorgung. Eine 3-Zimmer-Wohnung kostet ca. CHF 1\u2019000–1\u2019800, ein kleines Einfamilienhaus CHF 2\u2019000–4\u2019000 – abhängig vom Umfang.',
    },
    {
      question: 'Werden Möbel und Hausrat bei einer Räumung angerechnet?',
      answer:
        'Ja – gut erhaltene Möbel, Elektrogeräte oder Sammlerstücke können wertmindernd angerechnet werden. Seriöse Anbieter weisen Anrechnungen transparent in der Offerte aus.',
    },
    {
      question: 'Kann die Endreinigung mit Abnahmegarantie kombiniert werden?',
      answer:
        'Ja – viele Räumungsfirmen bieten Pauschalen inkl. Endreinigung nach Mietvertrag an. So übergeben Sie die Wohnung besenrein an Verwaltung/Vermieter mit schriftlicher Abnahmegarantie.',
    },
    {
      question: 'Wie schnell kann eine Räumung durchgeführt werden?',
      answer:
        'Kleine Wohnungen werden oft innerhalb eines Tages geräumt. Grössere Liegenschaften 2–5 Tage. Termine am Monatsende sollten 2–4 Wochen im Voraus reserviert werden.',
    },
    {
      question: 'Was passiert mit vertraulichen Dokumenten und Elektrogeräten?',
      answer:
        'Dokumente werden auf Wunsch aktenvernichtet (DSG-konform), Elektrogeräte in spezialisierte Recyclinghöfe gebracht und Sondermüll getrennt entsorgt – inklusive Nachweis.',
    },
  ],
  entsorgung_service: [
    {
      question: 'Was kostet eine Entsorgung oder Entrümpelung?',
      answer:
        'Kleinere Entsorgungen (Einzelmöbel, Keller, Estrich) starten bei CHF 250–500. Vollumfängliche Entrümpelungen kosten CHF 500–2\u2019500, abhängig von Volumen, Zugänglichkeit und Entsorgungsart.',
    },
    {
      question: 'Welche Abfälle werden vor Ort sortiert und fachgerecht entsorgt?',
      answer:
        'Sperrgut, Möbel, Elektrogeräte (WEEE), Metall, Holz, Papier/Karton, Bauschutt und Sondermüll werden getrennt. Wir arbeiten mit zertifizierten Recyclinghöfen und stellen auf Wunsch einen Entsorgungsnachweis aus.',
    },
    {
      question: 'Muss ich bei der Entsorgung dabei sein?',
      answer:
        'Nein – nach Übergabe eines Zugangsschlüssels erledigt das Team die Entsorgung eigenständig. Bei persönlichen Gegenständen oder Wertsachen empfehlen wir jedoch Anwesenheit oder vorgängige Sichtung.',
    },
    {
      question: 'Werden verwertbare Möbel zum Abzug angerechnet?',
      answer:
        'Ja – gut erhaltene Möbel und Geräte können den Preis reduzieren. Die Firma prüft bei der Offertstellung vor Ort oder per Fotos, was anrechenbar ist.',
    },
    {
      question: 'Wie finde ich eine seriöse Entsorgungsfirma?',
      answer:
        'Transparente Pauschalpreise, zertifizierte Recyclingpartner, VEVA-Konformität bei Sondermüll und klare Kundenrezensionen sind gute Indikatoren. Günstigster Preis ohne Entsorgungsnachweis ist ein Warnsignal.',
    },
  ],
}

const REINIGUNG_FAQS: FaqDict = {
  wohnungsreinigung: [
    {
      question: 'Was kostet eine Wohnungsreinigung in der Schweiz?',
      answer:
        'Für eine einmalige Wohnungsreinigung werden CHF 40–55 pro Stunde bzw. CHF 8–14 pro m² veranschlagt. Eine 3-Zimmer-Wohnung kostet ca. CHF 350–550, eine 4.5-Zimmer-Wohnung CHF 500–800.',
    },
    {
      question: 'Wie oft sollte eine Wohnung professionell gereinigt werden?',
      answer:
        'Für den Unterhalt empfehlen wir monatlich oder 14-täglich. Eine Grundreinigung (Fenster, Backofen, Kalkentfernung) lohnt sich 1–2 Mal pro Jahr.',
    },
    {
      question: 'Welche Leistungen sind bei einer Wohnungsreinigung enthalten?',
      answer:
        'Wischen, Staubsaugen, Bad & Küche inkl. Sanitär und Herd, Staubwischen auf allen Oberflächen sowie Müllentsorgung. Zusätzlich buchbar: Fenster, Backofen, Kühlschrank, Balkon.',
    },
    {
      question: 'Muss ich bei der Reinigung anwesend sein?',
      answer:
        'Nein – viele Kund:innen übergeben einen Schlüssel oder Code. Alternativ terminieren wir bei Ihrer Anwesenheit. Alle Reinigungskräfte sind versichert und geprüft.',
    },
    {
      question: 'Wie finde ich eine seriöse Reinigungsfirma?',
      answer:
        'Fixe Pauschalpreise statt Stundenabrechnung, Haftpflichtversicherung, Referenzen und positive Rezensionen sind gute Indikatoren. Klären Sie vor Buchung, welche Leistungen enthalten sind.',
    },
  ],
  hausreinigung: [
    {
      question: 'Was kostet eine Hausreinigung?',
      answer:
        'Je nach Grösse und Zustand CHF 500–1\u2019200 für ein Einfamilienhaus. Bei regelmässiger Reinigung sinkt der Stundensatz oft auf CHF 40–50/h gegenüber Einmalreinigungen.',
    },
    {
      question: 'Wie unterscheidet sich Hausreinigung von Wohnungsreinigung?',
      answer:
        'Häuser haben meist mehr Räume, Stockwerke und Aussenflächen. Balkone, Terrassen, Garage und Treppenhaus kommen oft hinzu. Die Offerte wird nach Flächen (m²) und Zusatzleistungen kalkuliert.',
    },
    {
      question: 'Was ist bei einer regelmässigen Hausreinigung zu beachten?',
      answer:
        'Ein fixer Wochentag, klare Leistungsliste (Check-liste) und Kommunikation schaffen Qualität. Saisonale Grundreinigungen (Frühjahrsputz, Fenster, Heizkörper) ergänzen den Unterhalt.',
    },
    {
      question: 'Werden Reinigungsmittel von der Firma mitgebracht?',
      answer:
        'Ja – Standardmittel sind bei seriösen Anbietern inbegriffen. Auf Wunsch werden biologische oder allergikerfreundliche Produkte eingesetzt.',
    },
    {
      question: 'Was unterscheidet Grundreinigung von Unterhaltsreinigung?',
      answer:
        'Die Unterhaltsreinigung erhält die Sauberkeit (regelmässig, schnell). Die Grundreinigung geht tiefer: Verkrustungen, Kalk, hinter Möbeln, Fenster, Geräte – meist 1–2x jährlich.',
    },
  ],
  buero_reinigung: [
    {
      question: 'Was kostet eine Büroreinigung pro m²?',
      answer:
        'Unterhaltsreinigung liegt bei CHF 3.50–6.50 pro m² und Intervall. Ein Büro mit 150 m² kostet pro Reinigung ca. CHF 500–900. Mit festem Auftrag (z. B. 2x/Woche) sinkt der Preis deutlich.',
    },
    {
      question: 'Wie oft sollte ein Büro gereinigt werden?',
      answer:
        'Je nach Personendichte 2–5 Mal pro Woche. Sanitärbereiche, Küche und Empfang benötigen tägliche Pflege, Einzelbüros reichen oft mit 2 Reinigungen pro Woche.',
    },
    {
      question: 'Welche Leistungen umfasst die Büroreinigung?',
      answer:
        'Staubwischen, Bodenreinigung, Sanitär, Küche/Teeküche, Müllentsorgung und Fensterinnenseiten nach Plan. Zusätzlich: Fenster aussen, Teppichreinigung, Polsterreinigung und Grundreinigung.',
    },
    {
      question: 'Gibt es Reinigung ausserhalb der Arbeitszeiten?',
      answer:
        'Ja – abends, frühmorgens oder am Wochenende, um den Betrieb nicht zu stören. Schlüsselübergabe und Sicherheitsanweisungen werden vertraglich geregelt.',
    },
    {
      question: 'Wie finde ich eine zuverlässige Büroreinigungsfirma?',
      answer:
        'Achten Sie auf Zertifizierungen (z. B. ISO 9001), transparente Leistungsbeschreibung, feste Ansprechpersonen, Haftpflichtversicherung und Referenzen vergleichbarer Büroflächen.',
    },
  ],
  umzugsreinigung: [
    {
      question: 'Was kostet eine Umzugs-/Endreinigung mit Abnahmegarantie?',
      answer:
        'Für eine 3-Zimmer-Wohnung rechnen Sie mit CHF 450–700, 4.5-Zimmer CHF 600–900. Die Abnahmegarantie bedeutet: bei Beanstandung durch die Verwaltung kommt die Firma kostenlos zurück.',
    },
    {
      question: 'Was ist eine Abnahmegarantie und wie funktioniert sie?',
      answer:
        'Die Firma garantiert schriftlich, dass die Wohnung bei der Mietabgabe die Anforderungen erfüllt. Moniert der/die Vermieter:in Mängel, werden diese kostenlos nachgebessert – üblicherweise innert 24–72 h.',
    },
    {
      question: 'Welche Bereiche werden bei der Endreinigung gereinigt?',
      answer:
        'Alle Räume inklusive Bad, Küche mit Backofen und Kühlschrank, Fenster innen/aussen mit Rahmen, Storen, Heizkörper, Schränke innen, Böden und Abstellraum. Auf Wunsch auch Keller/Estrich.',
    },
    {
      question: 'Wann sollte die Endreinigung gebucht werden?',
      answer:
        'Am besten 2–4 Wochen vor Übergabe. So bleibt Puffer für eventuelle Nachbesserungen. Die Reinigung wird meist 1–2 Tage vor der offiziellen Wohnungsübergabe durchgeführt.',
    },
    {
      question: 'Wer bezahlt die Endreinigung bei einem Mietumzug?',
      answer:
        'Gemäss Mietvertrag ist die Mietpartei für eine saubere Übergabe verantwortlich. In der Offerte werden die Kosten transparent aufgeführt; eine zweite Offerte (Kontrolle) empfiehlt sich.',
    },
  ],
  unterhaltsreinigung: [
    {
      question: 'Was kostet eine regelmässige Unterhaltsreinigung?',
      answer:
        'Für Privatkund:innen CHF 40–55 pro Stunde, für Firmen CHF 45–65 je nach Volumen. Bei wöchentlichen Einsätzen sinken die Stundensätze oft um 10–15 %.',
    },
    {
      question: 'Wie oft ist eine Unterhaltsreinigung sinnvoll?',
      answer:
        'Privat: wöchentlich oder 14-täglich. Im Büro 2–5 x/Woche. Die Intervalle richten sich nach Nutzung, Personendichte und Anforderungen (z. B. Arztpraxis, Kita).',
    },
    {
      question: 'Ist die Reinigungskraft immer dieselbe Person?',
      answer:
        'Bei seriösen Firmen meist ja – Sie erhalten eine feste Reinigungskraft. So bleibt die Qualität konstant und Wünsche müssen nicht jedes Mal neu erklärt werden.',
    },
    {
      question: 'Kann ich den Leistungsumfang flexibel anpassen?',
      answer:
        'Ja – saisonale Zusatzleistungen wie Fenster, Grundreinigung oder Teppich können jederzeit ergänzt werden. Ein monatliches Briefing hilft, den Plan zu optimieren.',
    },
    {
      question: 'Was ist der Unterschied zu einer Grundreinigung?',
      answer:
        'Unterhalt = regelmässig, schnell, oberflächlich (Staub, Böden, Sanitär). Grundreinigung = seltener, tiefgreifender (Kalk, Fenster, hinter Möbeln, Polster, Küchengeräte innen).',
    },
  ],
  grundreinigung: [
    {
      question: 'Was kostet eine Grundreinigung?',
      answer:
        'Abhängig von Fläche und Zustand CHF 12–25 pro m². Eine 100 m²-Wohnung kostet ca. CHF 1\u2019200–2\u2019500 für eine intensive Grundreinigung inklusive Fenster, Küche und Sanitär.',
    },
    {
      question: 'Was wird bei einer Grundreinigung alles gemacht?',
      answer:
        'Kalkentfernung, Fenster innen/aussen inkl. Rahmen und Storen, Backofen und Kühlschrank innen, Schränke innen, Heizkörper, hinter Möbeln, Bodenpflege und teilweise Polster/Teppich.',
    },
    {
      question: 'Wie oft ist eine Grundreinigung sinnvoll?',
      answer:
        '1–2 Mal jährlich (z. B. Frühjahr/Herbst). Bei Haustieren oder starker Nutzung auch quartalsweise. Vor Weihnachten ist sie besonders nachgefragt.',
    },
    {
      question: 'Wie lange dauert eine Grundreinigung?',
      answer:
        'Für eine 3-Zimmer-Wohnung rechnen 2 Personen mit 6–10 Stunden, 4.5-Zimmer 10–14 Stunden. Grundreinigungen werden meist an einem Tag abgeschlossen.',
    },
    {
      question: 'Lohnt sich Grundreinigung als Vorbereitung für einen Immobilienverkauf?',
      answer:
        'Ja – saubere, frische Räume wirken grösser und hochwertiger. Eine Grundreinigung vor Fotoshooting und Besichtigungen kann den Verkaufspreis positiv beeinflussen.',
    },
  ],
  baureinigung: [
    {
      question: 'Was kostet eine Baureinigung pro m²?',
      answer:
        'Baufeinreinigung: CHF 6–12 pro m². Bauendreinigung (grob): CHF 3–6 pro m². Preise hängen von Staubmenge, Materialresten und Zugänglichkeit ab.',
    },
    {
      question: 'Wann wird eine Baureinigung durchgeführt?',
      answer:
        'Nach Sanierung, Renovation oder Neubau – vor der Abgabe. Typische Phasen: Bauendreinigung (nach Rohbau/Ausbau) und Baufeinreinigung (vor Einzug), teilweise kombiniert.',
    },
    {
      question: 'Was unterscheidet Baureinigung von Endreinigung?',
      answer:
        'Baureinigung beseitigt Bauschutt, Silikon-, Farb- und Klebereste. Endreinigung ist die finale Vorbereitung für den Einzug. Oft werden beide kombiniert angeboten.',
    },
    {
      question: 'Welche Spezialwerkzeuge werden eingesetzt?',
      answer:
        'Industriesauger, Nassreiniger, Kantenreiniger, Silikonlöser, Farbabkratzer und Fensterreinigungs-Teleskopsysteme. Mitarbeitende tragen Schutzausrüstung (Atemschutz, Handschuhe).',
    },
    {
      question: 'Wie schnell kann die Baureinigung nach der Bauabnahme erfolgen?',
      answer:
        'Mit 7–14 Tagen Vorlauf sind Termine meist kein Problem. Bei grossen Projekten (ab 500 m²) und Monatsende empfehlen wir 3–4 Wochen Vorreservation.',
    },
  ],
  fensterreinigung: [
    {
      question: 'Was kostet eine Fensterreinigung in der Schweiz?',
      answer:
        'Pro Fensterflügel (innen+aussen, mit Rahmen und Storen) CHF 12–18. Für eine durchschnittliche 4-Zimmer-Wohnung rechnen Sie mit CHF 180–280.',
    },
    {
      question: 'Wie oft sollten Fenster professionell gereinigt werden?',
      answer:
        'Privat: 2–4 Mal pro Jahr. Bürogebäude und Ladenlokale: monatlich oder sogar wöchentlich. An stark befahrenen Strassen sind häufigere Reinigungen sinnvoll.',
    },
    {
      question: 'Werden auch Rahmen und Storen gereinigt?',
      answer:
        'Ja – eine Komplettreinigung umfasst Glasflächen innen und aussen, Rahmen, Storen, Rollläden und Fensterbänke. Storen mit starker Verschmutzung können Aufpreis verursachen.',
    },
    {
      question: 'Wie werden hohe Fenster oder schwer zugängliche Scheiben gereinigt?',
      answer:
        'Bis 3 m mit Teleskopstangen und entsalztem Wasser, darüber mit Hubarbeitsbühne, Hängegerüst oder Industriekletterern. Die Wahl richtet sich nach Gebäude und Sicherheit.',
    },
    {
      question: 'Gibt es eine Schlechtwetter-Garantie?',
      answer:
        'Viele Firmen verschieben bei Regen kostenlos. Moderne Reinigungsverfahren mit osmotisiertem Wasser können auch bei leichter Feuchtigkeit streifenfrei arbeiten.',
    },
  ],
  bodenreinigung: [
    {
      question: 'Was kostet eine professionelle Bodenreinigung?',
      answer:
        'Grundreinigung inkl. Pflege: CHF 5–12 pro m². Spezialbehandlungen (z. B. Parkett einölen, Linoleum einpflegen, Steinkristallisation) liegen bei CHF 15–30 pro m².',
    },
    {
      question: 'Welche Bodenarten werden professionell gereinigt?',
      answer:
        'Parkett, Laminat, Linoleum, Vinyl/PVC, Fliesen, Naturstein (Marmor, Granit), Teppich und Industrieböden. Jeder Belag erfordert spezifische Reinigungs- und Pflegemittel.',
    },
    {
      question: 'Was ist eine Bodenversiegelung und wann lohnt sie sich?',
      answer:
        'Eine Versiegelung schützt Boden vor Schmutz, Feuchtigkeit und Abnutzung. Bei stark beanspruchten Böden (Praxen, Schulen, Eingänge) empfehlen wir sie alle 1–3 Jahre.',
    },
    {
      question: 'Wie lange dauert die Trocknung nach der Reinigung?',
      answer:
        'Je nach Verfahren 30 Minuten bis mehrere Stunden. Bei Sprüh-Extraktion (Teppich): 2–6 Stunden. Bei Steinkristallisation: 4–12 Stunden – begehbar nach Freigabe.',
    },
    {
      question: 'Kann ich unterschiedliche Böden gleichzeitig reinigen lassen?',
      answer:
        'Ja – seriöse Firmen setzen pro Belag das passende Verfahren ein und kalkulieren einen Mischpreis. Dies ist besonders in Praxen und Büros mit mehreren Bodenarten üblich.',
    },
  ],
  fassadenreinigung: [
    {
      question: 'Was kostet eine Fassadenreinigung?',
      answer:
        'Abhängig von Höhe, Material und Verschmutzung CHF 8–25 pro m². Ein Einfamilienhaus kostet ca. CHF 1\u2019500–4\u2019000. Grossprojekte werden individuell kalkuliert.',
    },
    {
      question: 'Welche Verfahren werden bei der Fassadenreinigung angewendet?',
      answer:
        'Niederdruck (Putz, empfindliche Fassaden), Hochdruck (Beton), Heisswasser, Trockeneis (schonend), Sandstrahlen (grobe Verschmutzung) und chemische Behandlung gegen Algen/Moos.',
    },
    {
      question: 'Wie oft sollte eine Fassade gereinigt werden?',
      answer:
        'Alle 5–10 Jahre je nach Standort und Material. Stark bewitterte oder schattige Fassaden mit Algenbefall benötigen kürzere Intervalle. Eine zusätzliche Imprägnierung verlängert die Sauberkeitsphase.',
    },
    {
      question: 'Ist ein Gerüst für die Fassadenreinigung notwendig?',
      answer:
        'Bis ca. 4 m reicht oft eine Leiter oder Teleskopbürste. Darüber werden Gerüste, Hubbühnen oder Industriekletterer eingesetzt. Sicherheit und Gebäudeschutz haben Priorität.',
    },
    {
      question: 'Lohnt sich eine Fassadenimprägnierung nach der Reinigung?',
      answer:
        'Ja – eine Imprägnierung schützt vor Wassereinlagerung, Algen und Schmutz. Investition amortisiert sich über längere Sauberkeit und Schutz des Mauerwerks.',
    },
  ],
  hofreinigung: [
    {
      question: 'Was kostet eine Hof- oder Aussenreinigung?',
      answer:
        'Pro m² CHF 3–10 je nach Belag (Pflaster, Beton, Platten) und Verschmutzung. Kleinere Höfe (50 m²) kosten ab CHF 250; grössere Flächen 400–1\u2019500.',
    },
    {
      question: 'Wie wird Moos und Unkraut dauerhaft entfernt?',
      answer:
        'Mit Hochdruck, Heisswasser oder Dampf. Zusätzlich kann eine ökologische Unkrautbehandlung oder Fugenverfüllung (mit Sand/Fix) das Wachstum langfristig verhindern.',
    },
    {
      question: 'Können Pflaster- und Natursteinflächen empfindlich sein?',
      answer:
        'Ja – Natursteine (Granit, Porphyr) vertragen Hochdruck nur bedingt. Seriöse Firmen prüfen Material und Fugen vor der Reinigung und passen Druck sowie Verfahren an.',
    },
    {
      question: 'Wie wird das Schmutzwasser entsorgt?',
      answer:
        'Schmutzwasser darf nicht in die Strassenkanalisation. Seriöse Firmen nutzen Absaugtechnik und entsorgen fachgerecht – inklusive Entsorgungsnachweis bei gewerblichen Aufträgen.',
    },
    {
      question: 'Wann ist der beste Zeitpunkt für eine Hofreinigung?',
      answer:
        'Frühling (März–Mai) – nach Winter, vor der Gartenzeit. Herbst nach Laubfall reinigt optisch und verhindert rutschige Flächen im Winter.',
    },
  ],
}

const MALER_FAQS: FaqDict = {
  maler_service: [
    {
      question: 'Was kosten Malerarbeiten pro m²?',
      answer:
        'Für Wohnungen rechnen Sie mit CHF 25–45 pro m² Wandfläche (Malern inkl. Material). Decken CHF 20–35 pro m². Tapeten, Spachteln oder Gipsarbeiten kosten CHF 40–80 pro m² zusätzlich.',
    },
    {
      question: 'Wie lange dauern Malerarbeiten in einer Wohnung?',
      answer:
        'Eine 3-Zimmer-Wohnung (Wände + Decken) 3–5 Arbeitstage. Bei Farbwechsel mit Grundierung oder Spachtelarbeiten 5–8 Tage. Einzelne Räume oft an einem Tag fertig.',
    },
    {
      question: 'Welche Vorarbeiten sind bei Malerarbeiten nötig?',
      answer:
        'Abkleben, Abdecken (Böden/Möbel), Risse spachteln, Grundierung – je nach Zustand der Wände. Raufasertapete wird gestrichen, Strukturputz geglättet, Schimmel vorher saniert.',
    },
    {
      question: 'Was unterscheidet Innen- von Fassadenmalerarbeiten?',
      answer:
        'Innen: Dispersion, Silikat oder Mineralfarbe auf Putz/Tapete. Fassade: witterungsbeständige Silikon- oder Silikatfarbe, oft mit Grundierung/Hydrophobierung. Fassadenarbeiten benötigen Gerüst und Wetterfenster.',
    },
    {
      question: 'Wie finde ich einen zuverlässigen Maler?',
      answer:
        'Achten Sie auf Meisterbetrieb oder Zertifizierung, schriftliche Offerten mit Mengenangaben, Referenzfotos, Haftpflicht und klare Gewährleistungsfristen. Günstigster Preis ist bei Malerarbeiten selten nachhaltig.',
    },
  ],
}

const BY_CATEGORY: Record<string, FaqDict> = {
  umzugsfirma: UMZUG_FAQS,
  reinigungsfirma: REINIGUNG_FAQS,
  malerfirma: MALER_FAQS,
}

/** Generisches Fallback (max. 5) – falls zu einer serviceId nichts hinterlegt ist. */
function defaultFaqsForCategory(categorySlug: string, serviceLabel: string): ServiceFaqItem[] {
  const branche =
    categorySlug === 'reinigungsfirma'
      ? 'Reinigungsfirma'
      : categorySlug === 'malerfirma'
        ? 'Malerfirma'
        : 'Umzugsfirma'
  const branchePlural =
    categorySlug === 'reinigungsfirma'
      ? 'Reinigungsfirmen'
      : categorySlug === 'malerfirma'
        ? 'Malerfirmen'
        : 'Umzugsfirmen'

  return [
    {
      question: `Was kostet ${serviceLabel} in der Schweiz?`,
      answer: `Die Kosten für ${serviceLabel} hängen von Umfang, Anforderungen und Region ab. Durch den Vergleich mehrerer Offerten sparen Sie üblicherweise 20–40 %.`,
    },
    {
      question: `Wie läuft die Offertanfrage für ${serviceLabel} ab?`,
      answer: `Sie beschreiben Ihr Projekt in wenigen Minuten online. Anschliessend erhalten Sie unverbindliche Offerten von geprüften ${branchePlural}, die Sie in Ruhe vergleichen können.`,
    },
    {
      question: `Worauf sollte ich bei einer ${branche} achten?`,
      answer:
        'Transparente Pauschalpreise, Haftpflichtversicherung, Kundenbewertungen und ein klarer Leistungsumfang in der Offerte sind wichtige Qualitätsmerkmale.',
    },
    {
      question: `Wie viel Vorlaufzeit empfehlen Sie für ${serviceLabel}?`,
      answer: `Für Wochentage 2–3 Wochen, für Monatsende oder komplexere Aufträge 4–8 Wochen. So sichern Sie sich Ihren Wunschtermin und die beste Auswahl.`,
    },
    {
      question: `Ist die Offerte wirklich kostenlos und unverbindlich?`,
      answer: `Ja – die Offertanfrage ist kostenlos und unverbindlich. Sie entscheiden in Ruhe, welche Firma Sie beauftragen.`,
    },
  ]
}

/**
 * Service-spezifische FAQs (max. 5) – mit optionaler Stadt-Personalisierung.
 *
 * @param categorySlug z. B. "umzugsfirma"
 * @param serviceId    z. B. "privatumzug"
 * @param serviceLabel Anzeigename ("Privatumzug")
 * @param locationName optional, ersetzt `{city}` im Text (falls vorhanden)
 */
export function getServiceFaqs(
  categorySlug: string,
  serviceId: string,
  serviceLabel: string,
  locationName?: string
): ServiceFaqItem[] {
  const bucket = BY_CATEGORY[categorySlug]
  const list = bucket?.[serviceId] ?? defaultFaqsForCategory(categorySlug, serviceLabel)
  const trimmed = list.slice(0, 5)
  return trimmed.map((it) => ({
    question: applyCity(it.question, locationName),
    answer: applyCity(it.answer, locationName),
  }))
}
