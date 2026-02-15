'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Globe2, ChevronRight } from 'lucide-react'
import InternationalPageNavigation from '@/components/international/InternationalPageNavigation'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import InternationalCostCalculator from '@/components/international/InternationalCostCalculator'

const ArticleSection = () => {
  const faqItems = [
    {
      q: "Was kostet ein internationaler Umzug von der Schweiz aus?",
      a: "Die Kosten variieren stark. Ein Umzug mit einer 2-Zimmer-Wohnung nach Süddeutschland kann bei ca. 2.500 CHF beginnen, während derselbe Umzug nach Spanien oder Portugal eher 5.000 - 8.000 CHF kostet. Entscheidend sind Volumen, Distanz und Service-Level. Nutzen Sie unseren Kostenrechner für eine erste Schätzung."
    },
    {
      q: "Wie lange dauert ein internationaler Umzug?",
      a: "Die reine Transportzeit innerhalb Europas beträgt je nach Destination 1-5 Tage. Inklusive Packen, Zollabwicklung und Ausladen sollten Sie mit einer Gesamtdauer von 3-10 Tagen rechnen. Übersee-Umzüge per Schiff dauern mehrere Wochen."
    },
    {
      q: "Muss ich mein Umzugsgut verzollen (Stichwort: Übersiedlungsgut)?",
      a: "Ja, bei einem Umzug von der Schweiz in ein EU-Land muss das Umzugsgut als 'Übersiedlungsgut' deklariert werden. Wenn Sie Ihren Wohnsitz nachweislich verlegen und die Güter seit mindestens 6 Monaten in Ihrem Besitz sind, ist die Einfuhr zoll- und mehrwertsteuerfrei. Eine professionelle Umzugsfirma kümmert sich um die korrekte Deklaration."
    },
    {
      q: "Welche Dokumente sind für die Zollabwicklung nötig?",
      a: "Typischerweise benötigen Sie: Eine Kopie Ihres Passes, eine Abmeldebestätigung aus der Schweiz, eine Anmeldebestätigung im neuen Land (oder Arbeitsvertrag/Mietvertrag), sowie eine detaillierte Inventarliste Ihres Umzugsguts. Die Spedition stellt Ihnen die nötigen Formulare zur Verfügung."
    },
    {
      q: "Kann ich die Endreinigung meiner alten Wohnung in der Schweiz dazubuchen?",
      a: "Absolut. Viele internationale Speditionen arbeiten mit lokalen Reinigungsinstituten zusammen oder bieten diesen Service selbst an. Ein Kombi-Paket für Umzug und Reinigung mit Abnahmegarantie ist die bequemste Lösung für eine reibungslose Wohnungsübergabe."
    }
  ]

  return (
    <div className="prose prose-lg lg:prose-xl max-w-none text-slate-700 leading-relaxed text-left">
      {/* Warum Offerten vergleichen */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 md:p-8 rounded-xl mb-8">
          <h2 className="heading-2">Die wichtigsten Gründe, warum Sie internationale Umzugsofferten vergleichen sollten</h2>
          <ul className="space-y-3 list-none pl-0">
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span>Preisunterschiede von mehreren hundert bis tausend Franken sind bei internationalen Umzügen keine Seltenheit</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span>Leistungsumfang variiert stark: Manche Firmen bieten Full-Service mit Verpackung und Zollabfertigung, andere nur den reinen Transport</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span>Die Leistungen sind sowohl für private als auch gewerbliche Umzüge verfügbar – für Privatkunden wird dabei besonderer Wert auf Sicherheit und umfassenden Versicherungsschutz gelegt</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span>Erfahrung mit spezifischen Routen (z.B. Schweiz–Spanien) unterscheidet sich je nach Anbieter</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span>Transparente Offerten helfen, versteckte Kosten zu vermeiden</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span>Mit mehreren Angeboten in der Hand treffen Sie Ihre Entscheidung mit echter Planungssicherheit</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span>Die Anfrage über Online-Offerten.ch ist für Nutzer aus der Schweiz komplett kostenlos und ohne Buchungspflicht</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Planung */}
      <section className="mb-12">
        <h2 className="heading-2 mb-6">Internationale Umzüge planen: Von der ersten Idee bis zur Ankunft im Zielland</h2>
        <p className="mb-6 text-body">Die Durchführung eines internationalen Umzugs ist ein Prozess, der idealerweise Monate im Voraus beginnt. Je früher Sie mit den Vorbereitungen starten, desto entspannter wird der Ablauf – und desto besser können Sie Kosten und Aufwand kontrollieren.</p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="heading-3">6 Monate vor dem Umzug</h3>
            <p>Beginnen Sie mit der groben Planung. Klären Sie Ihre Aufenthaltsbewilligung im Zielland, informieren Sie sich über Kündigungsfristen Ihrer Wohnung in der Schweiz und recherchieren Sie Schulen oder Betreuungseinrichtungen für Kinder. Jetzt ist auch der richtige Zeitpunkt, erste internationale Umzugsofferten einzuholen, um ein Gefühl für das Budget zu bekommen.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h3 className="heading-3">3 Monate vor dem Umzug</h3>
            <p>Konkretisieren Sie Ihre Pläne. Kündigen Sie Ihre Wohnung fristgerecht, melden Sie sich bei Ihrer Gemeinde ab und informieren Sie Versicherungen sowie Banken über Ihren Wegzug. Erfassen Sie Ihr Umzugsvolumen möglichst genau – dies ist die Basis für präzise Offerten. Beginnen Sie mit dem Entrümpeln: Jeder Kubikmeter weniger spart Transportkosten.</p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
          <h3 className="heading-3 text-blue-800">1 Monat vor dem Umzug</h3>
          <p className="mb-4">Finalisieren Sie den Vertrag mit Ihrer gewählten Umzugsfirma. Bereiten Sie alle Dokumente für den Zoll vor: Eine detaillierte Inventarliste Ihres Umzugsguts ist in den meisten Fällen Pflicht. Bei Umzügen in EU-Länder gelten vereinfachte Regeln für Übersiedlungsgut, dennoch sind Nachweise wie Wohnsitzbestätigung und Ausfuhrformulare nötig. Beachten Sie Einfuhrbeschränkungen für bestimmte Güter wie Alkohol, Waffen oder Haustiere.</p>
        </div>

        <div className="mb-6">
          <h3 className="heading-3">Transportwege im Überblick</h3>
          <p>Für Europäumzüge ab der Schweiz ist der Strassentransport per Lkw die gängigste Lösung. Je nach Ziel – etwa Skandinavien oder die iberische Halbinsel – können Fahrten mehrere Tage dauern. Bei sehr grossen Distanzen oder Umzügen auf Inseln (z.B. Balearen) kommt eine Kombination aus Landtransport und Seefracht oder Fähre in Frage. Luftfracht ist nur selten notwendig und primär für Überseeumzüge relevant.</p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="heading-3 text-green-800">Praktische Tipps für Ihre Planung</h3>
          <ul className="space-y-2 list-none pl-0">
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span>Erfassen Sie Ihr Umzugsvolumen mit einer Raum-für-Raum-Liste</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span>Entrümpeln Sie konsequent – was Sie nicht brauchen, muss nicht transportiert werden</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span>Planen Sie Ferien oder freie Tage für den Umzugszeitraum ein</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span>Klären Sie frühzeitig, ob am Zielort Parkbewilligungen oder Halteverbote nötig sind</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
              <span>Holen Sie mehrere Offerten ein und vergleichen Sie nicht nur den Preis, sondern auch den Leistungsumfang</span>
            </li>
          </ul>
        </div>
        <p className="mt-6">Über Online-Offerten.ch finden Sie Partner, die Zollabfertigung, Verpackung und Transport als Gesamtpaket anbieten – oder Sie wählen gezielt Teilleistungen. Weiterführende Informationen finden Sie auch in unseren Ratgebern zu Themen wie Umzugskosten berechnen oder Endreinigung der alten Wohnung.</p>
      </section>

      {/* Umzug und Logistik */}
      <section className="mb-12">
        <img 
          src="/fotos/internationalen-umzuegen.webp" 
          alt="Internationale Umzüge - Professionelle Umzugsfirma" 
          className="rounded-xl shadow-lg w-full h-auto object-cover mb-4"
        />
        <h2 className="heading-2">Umzug und Logistik bei internationalen Umzügen</h2>
        <p className="mb-4">Ein internationaler Umzug stellt ganz besondere Anforderungen an die Logistik und Organisation. Damit Ihr Umzugsgut sicher und pünktlich am Zielort ankommt, ist eine präzise Planung und professionelle Durchführung unerlässlich. Unsere Umzugsfirma arbeitet mit einem weltweiten Netzwerk aus erfahrenen Partnern und Spezialisten zusammen, die sich auf internationale Umzüge ab der Schweiz spezialisiert haben.</p>
        <p className="mb-4">So profitieren Sie von einer umfassenden Lösung, die alle Aspekte Ihres Auslandsumzugs abdeckt – von der ersten Beratung über die Verpackung bis hin zur termingerechten Lieferung am neuen Wohnort.</p>
        <p className="mb-4">Unsere Umzugsunternehmen bieten Ihnen ein breites Spektrum an Dienstleistungen: Wir übernehmen die fachgerechte Verpackung Ihrer Möbel und persönlichen Gegenstände, organisieren den sicheren Transport über Land, See oder Luft und kümmern uns bei Bedarf um die Lagerung Ihres Umzugsguts. Auch die professionelle Zollabfertigung gehört zu unserem Service, damit Ihr Umzug reibungslos und ohne Verzögerungen abläuft.</p>
        <p>Unser Team aus Profis bringt langjährige Erfahrung in der Durchführung internationaler Umzüge mit und kennt die spezifischen Anforderungen und Herausforderungen, die ein Umzug ins Ausland mit sich bringt. Dank unserer engen Zusammenarbeit mit Partnern in der Schweiz und weltweit können wir flexibel auf Ihre Wünsche eingehen und individuelle Lösungen für jede Umzugsart anbieten.</p>
      </section>

      {/* Umzug und Sicherheit */}
      <section className="mb-12 bg-slate-50 p-6 md:p-8 rounded-xl">
        <h2 className="heading-2">Umzug und Sicherheit: Worauf Sie beim Auslandsumzug achten sollten</h2>
        <p className="mb-4">Die Sicherheit Ihrer Güter und das Wohl Ihrer Familie stehen bei einem Auslandsumzug an oberster Stelle. Als erfahrene Umzugsfirma wissen wir, wie wichtig es ist, dass Ihre wertvollen Gegenstände während des gesamten Umzugsprozesses optimal geschützt sind. Deshalb bieten wir Ihnen einen umfassenden Versicherungsschutz, der Ihr Umzugsgut gegen Verlust, Beschädigung oder Diebstahl absichert – egal, ob Sie innerhalb Europas oder in ein weiter entferntes Land umziehen.</p>
        <p className="mb-4">Unser spezieller Verpackungsservice ist auf die Anforderungen internationaler Umzüge zugeschnitten. Wir verwenden hochwertige Materialien und moderne Techniken, um Möbel, Elektrogeräte und empfindliche Gegenstände sicher zu verpacken und für den Transport vorzubereiten. So minimieren wir das Risiko von Transportschäden und sorgen dafür, dass alles unversehrt an Ihrem neuen Zuhause ankommt.</p>
        <p>Jeder Umzug ist einzigartig und bringt individuelle Herausforderungen mit sich. Deshalb legen wir grossen Wert auf eine persönliche Beratung und eine sorgfältige Planung, die auf Ihre Bedürfnisse und Wünsche abgestimmt ist. Unser Team aus erfahrenen Profis begleitet Sie bei jedem Schritt und steht Ihnen mit Know-how und Engagement zur Seite – von der ersten Kontaktaufnahme bis zur erfolgreichen Durchführung Ihres Umzugs.</p>
      </section>

      {/* Zollabwicklung */}
      <section className="mb-12">
        <h2 className="heading-2">Zollabwicklung bei internationalen Umzügen</h2>
        <p className="mb-4">Ein internationaler Umzug bringt nicht nur logistische Herausforderungen mit sich, sondern stellt auch hohe Anforderungen an die Zollabwicklung. Damit Ihr Umzugsgut sicher und ohne Verzögerungen an Ihrem neuen Zielort ankommt, ist eine professionelle und sorgfältige Zollabfertigung unerlässlich. Unsere Umzugsfirma aus der Schweiz verfügt über erfahrene Spezialisten, die sich bestens mit den aktuellen Vorschriften und Abläufen auskennen.</p>
        <p className="mb-4">Von der ersten Beratung bis zur finalen Übergabe Ihres Umzugsguts am Zielort begleiten wir Sie bei jedem Schritt der Zollabwicklung. Unsere Experten unterstützen Sie bei der Zusammenstellung und Erstellung aller notwendigen Dokumente, wie Inventarlisten, Ausfuhr- und Einfuhrpapiere sowie spezielle Nachweise, die je nach Land erforderlich sind.</p>
        <p>Durch unsere langjährige Erfahrung und die enge Zusammenarbeit mit Partnern in der Schweiz und weltweit stellen wir sicher, dass sämtliche Anforderungen der Zollbehörden erfüllt werden. Mit unserem umfassenden Service zur Zollabfertigung profitieren Sie von einem reibungslosen Ablauf: Wir übernehmen die Organisation, prüfen alle Unterlagen auf Vollständigkeit und sorgen dafür, dass Ihr Umzugsgut pünktlich und ohne unerwartete Komplikationen am neuen Wohnort eintrifft.</p>
      </section>

      {/* Länder-spezifische Umzüge - Bu bölüm çok uzun, devam edeceğim */}
      <section className="mb-12">
        <h2 className="heading-2">Umzüge in verschiedene Länder</h2>
        
        {/* Deutschland */}
        <div className="mb-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="heading-3">Umzug von der Schweiz nach Deutschland</h3>
          <p className="mb-4">Deutschland ist eines der häufigsten Zielländer für Auswanderer und Grenzgänger aus der Schweiz. Regionen wie Baden-Württemberg, Bayern oder die Metropolregion Berlin ziehen jährlich zahlreiche Schweizerinnen und Schweizer an – sei es für eine neue Arbeitsstelle, ein Studium oder um näher bei der Familie zu sein.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Zoll- und Grenzformalitäten</h4>
              <p className="text-sm">Obwohl Deutschland ein EU-Land ist, gilt die Schweiz als Drittland. Für Übersiedlungsgut benötigen Sie eine vollständige Inventarliste, eine Wohnsitzbestätigung und die entsprechenden Ausfuhr- bzw. Einfuhrformulare. An den Grenzübergängen (z.B. Basel, Schaffhausen, St. Margrethen) kann es zu Wartezeiten kommen.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Besonderheiten der Route</h4>
              <p className="text-sm">Die Distanzen variieren stark. Ein Umzug von Zürich nach Konstanz oder von Basel nach Freiburg im Breisgau ist in wenigen Stunden erledigt. Ein Umzug nach Berlin, Hamburg oder Köln hingegen bedeutet einen ganztägigen oder mehrtägigen Transport. Beachten Sie zudem Mautgebühren auf deutschen Autobahnen für Lkw sowie Umweltzonen in Städten wie Stuttgart, München oder Köln.</p>
            </div>
          </div>
        </div>

        {/* Italien */}
        <div className="mb-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6 mb-4">
            <div className="flex-1">
              <h3 className="heading-3">Umzug von der Schweiz nach Italien</h3>
              <p className="mb-4">Italien lockt mit Dolce Vita, mediterranem Klima und kulturellem Reichtum. Beliebte Ziele für Schweizer Auswanderer sind Mailand, die Region Como, die Toskana oder Rom – sei es für den Ruhestand, eine Zweitwohnung oder einen beruflichen Einsatz.</p>
              <div className="mb-4">
                <h4 className="font-semibold text-slate-800 mb-2">Herausforderungen der Route</h4>
                <p className="text-sm mb-4">Die Alpenüberquerung über Pässe wie den Gotthard oder den San Bernardino stellt besondere Anforderungen an den Transport. In Italien selbst erschweren enge Altstadtgassen und Zufahrtsbeschränkungen in historischen Zentren (z.B. ZTL-Zonen in Florenz, Siena oder Rom) die Lieferung.</p>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold text-slate-800 mb-2">Zoll- und Einfuhrbestimmungen</h4>
                <p className="text-sm mb-4">Als EU-Land gelten für Italien vereinfachte Regeln für Übersiedlungsgut. Dennoch benötigen Sie eine Inventarliste und müssen bei längerem Aufenthalt eine Aufenthaltsbewilligung beantragen.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Beispielrouten</h4>
                <ul className="text-sm space-y-1">
                  <li className="mb-6">• Zürich–Mailand: ca. 280 km, meist Tagesumzug möglich</li>
                  <li className="mb-6">• Lugano–Florenz: ca. 380 km, längere Fahrzeit durch Apennin</li>
                </ul>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex-shrink-0">
              <img 
                src="/fotos/umzug-schweiz-italien.webp" 
                alt="Umzug von der Schweiz nach Italien – Internationale Umzugsfirma" 
                className="rounded-xl shadow-lg w-full h-auto object-cover sticky top-4"
              />
            </div>
          </div>
        </div>

        {/* Diğer ülkeler - kısa tutacağım */}
        <div className="mb-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="heading-3">Umzug von der Schweiz nach Österreich</h3>
          <p className="mb-4">Österreich ist für viele Schweizer Familien und Berufstätige ein attraktives Ziel. Städte wie Wien, Graz, Innsbruck oder die Vorarlberger Region (Bregenz, Dornbirn) bieten Lebensqualität, kulturelle Nähe und gute Karrieremöglichkeiten.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Zollformalitäten</h4>
              <p className="text-sm">Österreich ist EU-Mitglied, daher gelten für Übersiedlungsgut aus der Schweiz die üblichen Drittland-Regelungen. Inventarliste, Wohnsitznachweis und Zolldokumente sind erforderlich.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Beispielrouten</h4>
              <ul className="text-sm space-y-1">
                <li>• St. Gallen–Bregenz: ca. 30 km, Kurzstreckenumzug</li>
                <li>• Genf–Wien: ca. 950 km, mehrtägiger Transport</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="heading-3">Umzug von der Schweiz nach Spanien</h3>
          <p className="mb-4">Spanien zählt zu den beliebtesten Auswanderungszielen überhaupt. Barcelona, Madrid, Valencia, die Costa Brava, die Costa del Sol oder die Balearen (Mallorca, Ibiza) locken mit Sonne, Meer und einem entspannten Lebensstil.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Die grosse Distanz</h4>
              <p className="text-sm">Von der Schweiz bis nach Spanien sind es je nach Zielort 1'000 bis 2'000 Kilometer. Ein Umzug dauert oft 2–3 Tage reine Fahrzeit. Bei grösseren Umzügen kann eine Zwischenlagerung sinnvoll sein.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Beispielrouten</h4>
              <ul className="text-sm space-y-1">
                <li>• Zürich–Barcelona: ca. 1'000 km</li>
                <li>• Basel–Madrid: ca. 1'400 km</li>
                <li>• Bern–Mallorca: Landtransport bis zur Küste, dann Fähre</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="heading-3">Umzug von der Schweiz nach Portugal</h3>
          <p className="mb-4">Portugal erfreut sich wachsender Beliebtheit bei Auswanderern und Remote-Workern aus der Schweiz. Lissabon, Porto und die Algarve bieten ein mildes Klima, vergleichsweise günstige Lebenshaltungskosten und eine hohe Lebensqualität.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Lange Strecke per Lkw</h4>
              <p className="text-sm">Von der Schweiz bis nach Portugal sind es rund 2'000 Kilometer – eine der längsten europäischen Umzugsrouten. Der Transport dauert in der Regel 3–4 Tage.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Beispielrouten</h4>
              <ul className="text-sm space-y-1">
                <li>• Zürich–Lissabon: ca. 1'900 km</li>
                <li>• Lausanne–Faro: ca. 2'100 km</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="heading-3">Umzug von der Schweiz in die Niederlande</h3>
          <p className="mb-4">Die Niederlande sind ein Magnet für internationale Fachkräfte und Studierende. Amsterdam, Den Haag, Rotterdam und Utrecht bieten ein kosmopolitisches Umfeld und zahlreiche Karrieremöglichkeiten.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Dichte Besiedelung</h4>
              <p className="text-sm">In niederländischen Städten herrscht chronischer Platzmangel. Enge Strassen, Grachten und eingeschränkte Parkmöglichkeiten für Lkw sind die Regel.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Beispielrouten</h4>
              <ul className="text-sm space-y-1">
                <li>• Basel–Amsterdam: ca. 700 km, Fahrzeit rund 7 Stunden</li>
                <li>• Zürich–Rotterdam: ca. 750 km</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="heading-3">Umzug von der Schweiz nach Belgien</h3>
          <p className="mb-4">Belgien – insbesondere Brüssel, Antwerpen, Gent und Brügge – zieht viele Schweizer an, die bei EU-Institutionen oder internationalen Unternehmen arbeiten.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Routenplanung</h4>
              <p className="text-sm">Je nach Startort führt die Route durch Deutschland oder Frankreich. Beachten Sie Mautgebühren und Umweltzonen entlang des Wegs.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Verkehr in Brüssel</h4>
              <p className="text-sm">Die belgische Hauptstadt ist berüchtigt für Staus und Parkraummangel. Eine genaue Zeitplanung und allenfalls reservierte Parkplätze sind entscheidend.</p>
            </div>
          </div>
        </div>

        <div className="mb-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="heading-3">Umzug von der Schweiz nach Dänemark</h3>
          <p className="mb-4">Dänemark – mit Kopenhagen, Aarhus und Odense – ist für Familien und Fachkräfte attraktiv, erfordert aber eine längere Anreise ab der Schweiz.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Route via Deutschland</h4>
              <p className="text-sm">Der Weg nach Dänemark führt durch ganz Deutschland. Je nach Zielort kommen Brücken- oder Fährpassagen hinzu (z.B. Storebæltbrücke, Fehmarnbelt-Fähre).</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Beispielrouten</h4>
              <ul className="text-sm space-y-1">
                <li>• Zürich–Kopenhagen: ca. 1'200 km, Fahrzeit rund 12–14 Stunden</li>
                <li>• Bern–Aarhus: ca. 1'100 km</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="heading-3">Umzug von der Schweiz nach Schweden</h3>
          <p className="mb-4">Schweden lockt mit hoher Lebensqualität, intakter Natur und attraktiven Arbeitsmöglichkeiten. Stockholm, Göteborg, Malmö und Uppsala gehören zu den beliebtesten Zielen.</p>
          <div className="mb-4">
            <h4 className="font-semibold text-slate-800 mb-2">Lange Distanz, komplexe Route</h4>
            <p className="text-sm">Der Weg nach Schweden führt durch Deutschland und Dänemark, oft mit Brücken oder Fähren. Die Transportdauer beträgt mehrere Tage.</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Beispielrouten</h4>
            <ul className="text-sm space-y-1">
              <li>• Basel–Stockholm: ca. 1'800 km</li>
              <li>• Zürich–Göteborg: ca. 1'500 km</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Kostenfaktoren */}
      <section className="mb-12 bg-gradient-to-br from-slate-50 to-blue-50 p-6 md:p-8 rounded-xl">
        <h2 className="heading-2">Kostenfaktoren bei internationalen Umzügen mit einem Umzugsunternehmen</h2>
        <p className="mb-6">Internationale Umzugskosten variieren stark. Eine seriöse Kalkulation ist die Grundlage für Ihre Budgetplanung und hilft, böse Überraschungen zu vermeiden. Die sorgfältige Planung und der sichere Transport der Umzugsgüter sind entscheidend für einen erfolgreichen internationalen Umzug.</p>
        
        <div className="bg-white p-6 rounded-lg mb-6">
          <h3 className="heading-3">Die wichtigsten Kostenfaktoren</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-300 p-3 text-left font-semibold">Faktor</th>
                  <th className="border border-slate-300 p-3 text-left font-semibold">Beschreibung</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-300 p-3">Distanz</td>
                  <td className="border border-slate-300 p-3">Kilometeranzahl und Fahrzeit beeinflussen den Preis direkt</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3">Umzugsvolumen</td>
                  <td className="border border-slate-300 p-3">Angabe in Kubikmetern (m³), abhängig von Wohnungsgrösse</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3">Stockwerk & Tragewege</td>
                  <td className="border border-slate-300 p-3">Höhere Stockwerke ohne Lift kosten mehr</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3">Zoll- & Mautgebühren</td>
                  <td className="border border-slate-300 p-3">Variieren je nach Route und Land</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3">Fähr- & Tunnelkosten</td>
                  <td className="border border-slate-300 p-3">Relevant bei Skandinavien, Inseln oder Alpenquerungen</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3">Verpackungsmaterial</td>
                  <td className="border border-slate-300 p-3">Professionelle Verpackung kostet extra, schützt aber</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3">Spezialtransport</td>
                  <td className="border border-slate-300 p-3">Klavier, Safe, Kunstwerke erfordern besonderes Handling</td>
                </tr>
                <tr>
                  <td className="border border-slate-300 p-3">Zusatzleistungen</td>
                  <td className="border border-slate-300 p-3">Demontage, Montage, Lagerung, Entsorgung, Reinigung</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <p className="mb-4"><strong>Grobe Orientierung:</strong> Ein Umzug einer 2,5-Zimmerwohnung von Zürich nach Stuttgart kostet deutlich weniger als ein vergleichbarer Umzug einer 4,5-Zimmerwohnung von Bern nach Barcelona. Die genauen Preise hängen von individuellen Faktoren ab und sollten immer auf Basis einer detaillierten Anfrage kalkuliert werden.</p>
            <p>Holen Sie über Online-Offerten.ch mehrere Offerten ein, um Preisunterschiede und Leistungsumfang transparent zu vergleichen.</p>
          </div>
          <div className="w-full md:w-1/2 flex-shrink-0">
            <img 
              src="/fotos/neu-modern-wohnungen-in-der-schweiz.webp" 
              alt="Modernes Wohnen in der Schweiz – Internationale Umzüge" 
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vorteile */}
      <section className="mb-12">
        <h2 className="heading-2">Vorteile, internationale Umzugsofferten zu vergleichen</h2>
        <p className="mb-6">Warum lohnt es sich, nicht einfach die erstbeste Umzugsfirma zu wählen, sondern mehrere Angebote zu vergleichen?</p>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Preistransparenz</h4>
            <p className="text-sm">Sie sehen sofort, welche Firma welchen Preis für welche Leistung verlangt</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Versteckte Kosten vermeiden</h4>
            <p className="text-sm">Detaillierte Offerten machen Zusatzkosten sichtbar</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Geprüfte Firmen</h4>
            <p className="text-sm">Online-Offerten.ch arbeitet nur mit verifizierten Umzugsunternehmen zusammen</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Passende Leistungen</h4>
            <p className="text-sm">Wählen Sie zwischen Full-Service und Teilservice je nach Bedürfnissen und Budget</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Qualitätssicherung</h4>
            <p className="text-sm">Vergleichen Sie Erfahrung, Kundenbewertungen und Versicherungsleistungen</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Stressreduktion</h4>
            <p className="text-sm">Mit klaren Offerten planen Sie entspannter</p>
          </div>
        </div>
        <p className="mb-4">Ein Full-Service-Angebot mit Verpackung, Transport, Zollabwicklung und Montage am Zielort kostet mehr als ein reiner Transport – bietet aber auch mehr Komfort und Sicherheit. Sie entscheiden, was zu Ihrer Situation passt.</p>
        <p>Online-Offerten.ch ist Ihre neutrale Plattform: Wir holen für Sie mehrere Offerten von geprüften Firmen ein, und Sie vergleichen in Ruhe. Die Anfrage ist kostenlos und unverbindlich – Sie gehen keine Verpflichtung ein.</p>
      </section>

      {/* So funktioniert es */}
      <section className="mb-12 bg-blue-50 p-6 md:p-8 rounded-xl">
        <h2 className="heading-2">So funktioniert der Vergleich von internationalen Umzugsofferten auf Online-Offerten.ch</h2>
        <p className="mb-6">Der Prozess ist einfach und für Nutzer aus der ganzen Schweiz verfügbar:</p>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-slate-800 mb-2">Schritt 1: Online-Formular ausfüllen</h4>
            <p className="text-sm">Geben Sie Ihre Angaben ein: Startort (z.B. Zürich), Zielort (z.B. Berlin), Wohnungsgrösse, Stockwerk, gewünschter Umzugstermin und besondere Gegenstände wie Klavier oder Antiquitäten.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-slate-800 mb-2">Schritt 2: Anfrage wird weitergeleitet</h4>
            <p className="text-sm">Ihre Anfrage geht an passende, geprüfte internationale Umzugsfirmen, die auf Ihre gewünschte Route spezialisiert sind.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-slate-800 mb-2">Schritt 3: Offerten erhalten</h4>
            <p className="text-sm">Sie erhalten mehrere Offerten direkt von den Umzugsfirmen – mit Preis, Leistungsumfang, Terminvorschlägen und Kontaktdaten.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-slate-800 mb-2">Schritt 4: Vergleichen</h4>
            <p className="text-sm">Stellen Sie Preise, Leistungen, Bewertungen und Versicherungslösungen gegenüber. Nehmen Sie sich Zeit für Ihre Wahl.</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-slate-800 mb-2">Schritt 5: Direkt buchen</h4>
            <p className="text-sm">Die Kontaktaufnahme und der Vertragsabschluss erfolgen ausschliesslich zwischen Ihnen und der ausgewählten Umzugsfirma – nicht mit Online-Offerten.ch.</p>
          </div>
        </div>
        <p className="mt-6 font-semibold">Wichtig: Der Service ist für Sie als Nutzer komplett kostenlos und unverbindlich. Es fallen keine versteckten Gebühren über die Plattform an.</p>
      </section>

      {/* CTA Section */}
      <div className="p-8 bg-blue-50 border border-blue-200 rounded-xl mb-12 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold text-blue-800 mb-4">Starten Sie sorgenfrei in Ihr neues Abenteuer</h3>
        <p className="mb-6">Ein internationaler Umzug muss nicht stressig sein. Mit dem richtigen Partner an Ihrer Seite können Sie sich auf das konzentrieren, was wirklich zählt: Ihr neues Leben im Ausland.</p>
        <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
          <Link href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=international">Jetzt kostenlose Offerten für den Auslandsumzug anfordern</Link>
        </Button>
      </div>

      <h3 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-6">Häufig gestellte Fragen (FAQ)</h3>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
              <h4 className="faq-question">{item.q}</h4>
            </AccordionTrigger>
            <AccordionContent className="text-base text-slate-600">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

const InternationaleUmzugPageClient = () => {
  const imageUrl = 'https://online-offerten.ch/image/umzugsservice-Schweiz/lnternatIonale-umzuege.png'



  const metaTitle = "Internationale Umzüge: Kostenlose Offerten vergleichen"
  const metaDescription = "Internationale Umzüge: Vergleichen Sie kostenlos mehrere geprüfte Umzugsfirmen und sparen Sie bis zu 40%. Offerten für Umzüge nach Deutschland, Österreich, Frankreich & ganz Europa."
  const canonicalUrl = "/umzugsfirma/internationale-umzuege"

  return (
    <>
      <div className="bg-gradient-to-b from-slate-50 to-white">
        <section
          className="relative w-full bg-gray-100 pt-[5px] pb-12 md:pb-16 overflow-hidden"
        >
          {/* Background Image - Right Side (Desktop only) */}
          <div 
            className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${imageUrl}')`,
              maskImage: 'linear-gradient(to left, transparent 0%, black 10%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to left, transparent 0%, black 10%, black 100%)'
            }}
          ></div>
          
          {/* Gradient Overlay (Desktop only) */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-100/90 to-transparent"></div>
          
          <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
            {/* Breadcrumb Navigation */}
            <nav className="mb-4 pt-4" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-green-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </li>
                <li>
                  <Link href="/umzugsfirma" className="hover:text-green-600 transition-colors">
                    Umzugsfirma
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </li>
                <li className="text-gray-900 font-medium" aria-current="page">
                  Internationale Umzüge
                </li>
              </ol>
            </nav>
            
            <div className="flex justify-start">
              <article className="w-full md:w-1/2 bg-gray-100 px-[1px] py-8 md:py-12 rounded-l-2xl md:rounded-l-2xl relative z-10">
                <div>
                  <h1 className="heading-1">
                    Internationale Umzug
                  </h1>
                  <p className="text-body mb-4">
                  Erhalten Sie in nur 5 Minuten bis zu 5 Angebote
                  </p>
                </div>
                <div className="mb-6">
                  <Button
                    asChild
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold group px-6 py-4 text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    <Link href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=international">
                      Umzugsunternehmen vergleichen
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
                <div className="bg-green-50 rounded-lg p-4 md:p-6 flex flex-col gap-4 md:gap-6 max-w-md">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-body font-medium">Bis zu 40% Ersparnis möglich</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-body font-medium">Mehrere Firmen online vergleichen</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-body font-medium">Kostenlos & unverbindlich</span>
                  </div>
                </div>
              </article>
            </div>
            
            {/* Image for Mobile/Tablet (below text) */}
            <div className="block lg:hidden mt-6">
                  <img
                    src={imageUrl}
                    alt="Professionelle Umzugsfirma bei internationalem Umzug - Mehrere Umzugsfirmen vergleichen für Auslandsumzug"
                className="w-full h-auto object-cover rounded-2xl shadow-lg"
                    loading="eager"
                    width="600"
                    height="400"
                  />
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
              <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
                <div className="bg-white rounded-2xl p-[1px]">
                  <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-gray-900 mb-6 leading-tight">
                    Offerte für Ihren Auslandsumzug ab Schweiz
                  </h1>
                  <h2 className="heading-2">
                    Internationale Umzüge ab der Schweiz – warum Offerten vergleichen so wichtig ist
                  </h2>
                  <p className="text-sm md:text-body leading-relaxed">
                    Ein internationaler Umzug von der Schweiz nach Europa ist weit mehr als ein einfacher Wohnungswechsel. Ob Sie als Familie nach Deutschland ziehen, eine neue Arbeitsstelle in den Niederlanden antreten oder Ihren Ruhestand in Portugal verbringen möchten – die Planung eines Auslandsumzugs bringt Herausforderungen mit sich, die bei einem Inlandsumzug schlicht nicht existieren. Von der Zollabwicklung über längere Transportwege bis hin zu unterschiedlichen Einreisebestimmungen je nach Zielland: Die Anforderungen sind vielfältig und die Kosten können je nach Route, Umzugsvolumen und gewählten Leistungen erheblich variieren.
                  </p>
                </div>
                <div>
                  <InternationalCostCalculator />
                </div>
              </div>
            </div>
        </section>

        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <ArticleSection />
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <InternationalPageNavigation currentCountrySlug="internationale-umzuege" />
        </div>

        <section className="py-12 md:py-20 bg-slate-100 mt-12 md:mt-16">
          <div className="container mx-auto max-w-7xl px-4 md:px-6 text-center">
            <div>
              <Globe2 className="mx-auto text-green-500 h-16 w-16 mb-4" />
              <h2 className="heading-2">Bereit für Ihr neues Zuhause im Ausland?</h2>
              <p className="text-slate-600 max-w-xl mx-auto mb-8">
                Starten Sie jetzt Ihre Anfrage und erhalten Sie unverbindliche Offerten von den besten internationalen Umzugsprofis.
              </p>
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white shadow-lg transform hover:scale-105 transition-transform duration-300 px-10 py-3">
                <Link href="/kostenlose-offerte-anfordern?service=international">Kostenlose Offerten anfordern</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default InternationaleUmzugPageClient



