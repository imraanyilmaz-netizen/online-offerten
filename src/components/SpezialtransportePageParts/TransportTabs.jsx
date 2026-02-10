import React from 'react';
// framer-motion removed - CSS for better INP
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckSquare, Shield, Cog, FileText, HelpCircle, Wrench } from 'lucide-react';
import { PiPianoKeysFill } from 'react-icons/pi';

const Section = ({ title, icon, children, delay = 0 }) => (
  <div
    className="pt-8"
  >
    <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
      {icon}
      {title}
    </h3>
    <div className="prose max-w-none">{children}</div>
  </div>
);

const PriceTable = ({ prices }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-200 p-3 bg-gray-50 text-sm font-semibold text-gray-600">Leistung</th>
            <th className="border-b-2 border-gray-200 p-3 bg-gray-50 text-sm font-semibold text-gray-600">Richtpreis</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border-b border-gray-200 p-3">{item.item}</td>
              <td className="border-b border-gray-200 p-3 font-medium">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TransportCategory = ({ categoryData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-green-700 text-center">{categoryData.title}</h2>
      
      <Section title={categoryData.article.title} icon={<FileText className="mr-3 text-green-500" />}>
        {categoryData.article.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </Section>

      <Section title={categoryData.pricing.title} icon={null} delay={1}>
        <p>{categoryData.pricing.intro}</p>
        {categoryData.pricing.table ? (
          <PriceTable prices={categoryData.pricing.table} />
        ) : (
          <ul className="list-disc list-inside space-y-2">
            {categoryData.pricing.factors?.map((factor, i) => <li key={i}>{factor}</li>)}
          </ul>
        )}
        <p className="text-sm italic text-gray-500 mt-2">{categoryData.pricing.disclaimer}</p>
      </Section>
      
      <Section title={categoryData.faq.title} icon={<HelpCircle className="mr-3 text-green-500" />} delay={2}>
        <p className="mb-4">{categoryData.faq.intro}</p>
        <Accordion type="single" collapsible className="w-full">
          {categoryData.faq.questions.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b">
              <AccordionTrigger className="font-semibold text-left text-base md:text-lg hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6">
                <div className="prose max-w-none">
                  <p>{faq.a}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <Section title={categoryData.materials.title} icon={<Wrench className="mr-3 text-green-500" />} delay={3}>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          {categoryData.materials.items.map((item, index) => (
            <li key={index} className="flex items-center">
              <CheckSquare className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
};

const TransportTabs = () => {
  // Piano Transport Data
  const pianoData = {
    title: "Klaviertransport: Professioneller Klavier Transport für Ihr Instrument",
    article: {
      title: "Klaviertransport: Professioneller Klavier Transport in besten Händen",
      paragraphs: [
        "Ein Klavier ist ein empfindliches Instrument, das bei einem Transport höchste Sorgfalt erfordert. Unsachgemässer Transport kann zu irreparablen Schäden an Mechanik, Resonanzboden oder Oberfläche führen. Unsere spezialisierten Partner transportieren Ihr Instrument sicher und professionell.",
        "Klaviere unterscheiden sich stark: Ein Pianino wiegt 150-300 kg, während ein Konzertflügel über 500 kg schwer sein kann. Unsere Profis kennen die Anforderungen jedes Typs und wissen, wie Ihr Instrument optimal geschützt transportiert wird.",
        "Die grösste Herausforderung sind oft bauliche Gegebenheiten: enge Treppenhäuser, hohe Stockwerke ohne Lift oder schmale Türen. Wir prüfen den Transportweg sorgfältig und setzen bei Bedarf Spezialequipment wie Möbellift oder mobilen Kran ein."
      ]
    },
    pricing: {
      title: "Kosten für einen Klaviertransport",
      intro: "Die Kosten variieren je nach Art des Klaviers, der Distanz und den Gegebenheiten vor Ort (z.B. Stockwerke, enge Treppenhäuser). Hier ist eine grobe Orientierung:",
      table: [
        { item: "Pianino / Klavier (bis 130cm Höhe)", price: "CHF 350 – 600" },
        { item: "Kleiner Flügel (bis 180cm Länge)", price: "CHF 500 – 850" },
        { item: "Konzertflügel (über 180cm Länge)", price: "CHF 700 – 1.200+" },
        { item: "Zuschlag pro Stockwerk (ohne Lift)", price: "CHF 50 – 100" }
      ],
      disclaimer: "Dies sind Schätzpreise. Für eine exakte Offerte fordern Sie bitte eine kostenlose Offerte an."
    },
    faq: {
      title: "Häufige Fragen & Antworten",
      intro: "Hier finden Sie Antworten auf die wichtigsten Fragen rund um den Klaviertransport. Unsere Experten geben Einblicke und Tipps für eine reibungslose Abwicklung.",
      questions: [
        { q: "Ist mein Klavier während des Transports versichert?", a: "Ja, absolut. Alle unsere Partner verfügen über eine umfassende Transport- und Haftpflichtversicherung, die speziell für solche wertvollen Güter ausgelegt ist. Die genauen Deckungssummen und Bedingungen sind transparent in der jeweiligen Offerte aufgeführt, sodass Sie volle Sicherheit haben." },
        { q: "Wie lange dauert ein Klaviertransport?", a: "Ein Standard-Klaviertransport innerhalb derselben Stadt dauert in der Regel 2-4 Stunden. Diese Zeit umfasst die sorgfältige Vorbereitung und Verpackung, den eigentlichen Transport und das Platzieren am neuen Standort. Bei längeren Distanzen, komplexen Treppenhäusern oder wenn ein Kran benötigt wird, kann der Zeitaufwand entsprechend höher sein." },
        { q: "Muss mein Klavier nach dem Transport gestimmt werden?", a: "Ja, das ist sehr empfehlenswert. Durch die Bewegung und vor allem durch die Veränderung des Raumklimas (Temperatur, Luftfeuchtigkeit) wird sich die Stimmung Ihres Klaviers verändern. Warten Sie nach dem Transport ca. 2-3 Wochen, damit sich das Holz an die neue Umgebung anpassen kann, bevor Sie einen Fachmann für das Stimmen engagieren." },
        { q: "Kann ich mein Klavier nicht einfach selbst mit Freunden transportieren?", a: "Davon raten wir dringend ab. Das Risiko von schweren Schäden am Instrument (z.B. Risse im Resonanzboden, beschädigte Mechanik) oder am Gebäude (z.B. Kratzer im Parkett, beschädigte Wände) ist enorm hoch. Zudem besteht eine erhebliche Verletzungsgefahr für Sie und Ihre Helfer. Profis verfügen über das richtige Equipment, die Erfahrung und die Versicherung." },
        { q: "Was genau beeinflusst den Preis eines Klaviertransports?", a: "Die Hauptfaktoren sind: der Typ und das Gewicht des Klaviers (Flügel ist teurer als Pianino), die Transportdistanz, die Anzahl der Stockwerke an beiden Orten (besonders ohne Lift), die Zugänglichkeit (enge Gänge, Türen) und ob Spezialgeräte wie ein Kran benötigt werden. Eine transparente Offerte listet alle diese Punkte auf." }
      ]
    },
    materials: {
      title: "Benötigtes Material & Equipment",
      items: [
        "Spezielle Tragegurte (Kreuzgurte)",
        "Gepolsterte Rollbretter / Klavierroller",
        "Dicke Schutzdecken & Luftpolsterfolie",
        "Kantenschutz aus Kunststoff oder Karton",
        "Werkzeug zur Demontage (bei Flügeln)",
        "ggf. Möbellift oder mobiler Kran"
      ]
    }
  };

  // Safe Transport Data
  const safeData = {
    title: "Tresortransport: Sicherer und diskreter Tresor Transport",
    article: {
      title: "Tresortransport: Sicherer und diskreter Tresor Transport mit höchster Sicherheit",
      paragraphs: [
        "Der Transport eines Tresors erfordert Fachwissen, Spezialequipment und absolute Diskretion. Unsere geprüften Partner transportieren Ihren Wertschutzschrank sicher und unauffällig an seinen neuen Bestimmungsort.",
        "Tresore unterscheiden sich stark: Ein Möbeltresor wiegt oft unter 150 kg, während ein Wertschutzschrank mehrere Tonnen schwer und im Boden verankert sein kann. Unsere Experten analysieren Ihren Tresor und wählen die passende Transportmethode.",
        "Wir planen jeden Transport sorgfältig. Vor dem Transport prüfen wir den gesamten Weg, messen Türen und Gänge aus und kümmern uns um alle notwendigen Genehmigungen. Die fachgerechte Demontage der Verankerung erfolgt mit Spezialwerkzeug – diskret und professionell."
      ]
    },
    pricing: {
      title: "Kosten für einen Tresortransport",
      intro: "Die Kosten hängen stark vom Gewicht des Tresors, dem Transportweg und dem Aufwand für die Verankerung ab.",
      table: [
        { item: "Tresor bis 150 kg", price: "CHF 400 – 700" },
        { item: "Tresor 150 - 300 kg", price: "CHF 600 – 1.100" },
        { item: "Tresor 300 - 500 kg", price: "CHF 900 – 1.800" },
        { item: "Tresor über 500 kg", price: "Auf Anfrage" }
      ],
      disclaimer: "Preise sind Richtwerte. Stockwerkzuschläge und besondere Anforderungen können zusätzliche Kosten verursachen."
    },
    faq: {
      title: "Häufige Fragen & Antworten",
      intro: "Hier finden Sie Antworten auf die wichtigsten Fragen rund um den Tresortransport. Unsere Experten geben Einblicke und Tipps für eine reibungslose Abwicklung.",
      questions: [
        { q: "Was muss ich vor dem Tresortransport beachten?", a: "Der Tresor muss vollständig leer sein. Bitte informieren Sie uns im Voraus so genau wie möglich über das Gewicht (oft auf einer Plakette im Inneren zu finden), die Aussenmasse und, falls bekannt, die Art der aktuellen Verankerung. Je mehr Details wir haben, desto präziser können wir planen." },
        { q: "Wie wird die Diskretion während des Transports gewährleistet?", a: "Diskretion ist unser oberstes Gebot. Unsere Partner verwenden neutrale, unbeschriftete Fahrzeuge. Die Mitarbeiter tragen unauffällige Arbeitskleidung und führen den Transport schnell und leise durch, um keine Aufmerksamkeit bei Nachbarn oder Passanten zu erregen." },
        { q: "Wird der Tresor am neuen Ort wieder fachgerecht verankert?", a: "Ja, die professionelle Montage und Verankerung gemäss den Herstellervorgaben ist ein wesentlicher Bestandteil unseres Services, sofern Sie dies wünschen. Dies ist entscheidend für die Sicherheit und den Versicherungsschutz." },
        { q: "Warum ist das Gewicht des Tresors so entscheidend für den Preis?", a: "Das Gewicht bestimmt direkt den Personalaufwand (Anzahl der Mitarbeiter), das benötigte Equipment (z.B. normaler Treppensteiger vs. Schwerlast-Roboter) und ob eventuell ein Kran notwendig ist. Ein höheres Gewicht bedeutet exponentiell mehr Aufwand und Risiko, was sich im Preis widerspiegelt." },
        { q: "Mein Treppenhaus ist extrem eng. Ist ein Transport trotzdem möglich?", a: "In den meisten Fällen ja. Unsere Experten führen eine genaue Prüfung des Transportweges durch. Manchmal müssen Türen ausgehängt oder Geländer temporär entfernt werden. Es gibt sehr kompakte, aber leistungsstarke Hebegeräte für solche Fälle. Sollte es unmöglich sein, wird dies bei der Besichtigung transparent kommuniziert." }
      ]
    },
    materials: {
      title: "Benötigtes Material & Equipment",
      items: [
        "Elektrische Schwerlast-Treppensteiger",
        "Hydraulische Heber & Pumpen",
        "Schwerlast-Rollwagen (Panzerrollen)",
        "Spezialwerkzeug für Verankerungen",
        "Fahrzeuge mit Ladebordwand oder Kran",
        "Bodenschutzplatten aus Metall oder Kunststoff"
      ]
    }
  };

  // Machinery Transport Data
  const machineryData = {
    title: "Maschinen Transport: Transport für Maschinen & Geräte",
    article: {
      title: "Maschinen Transport: Professioneller Transport für Maschinen & Geräte mit Präzision",
      paragraphs: [
        "Der Transport von Industriemaschinen, medizinischen Geräten oder IT-Infrastruktur erfordert präzise Planung und technisches Know-how. Unsere Partner transportieren Ihre wertvollen Maschinen sicher und minimieren Ausfallzeiten.",
        "Jeder Maschinentransport beginnt mit einer detaillierten Planung. Wir berücksichtigen Ihre Produktionszyklen, prüfen vor Ort die Gegebenheiten und erstellen einen passgenauen Zeitplan. Eine Besichtigung ist meist unerlässlich, um alle Details zu erfassen.",
        "Qualifizierte Techniker demontieren Ihre Maschine fachgerecht. Empfindliche Komponenten werden gesondert verpackt, jedes Teil wird beschriftet. Für den Transport setzen wir Spezialequipment wie Kräne, Gabelstapler oder Schwerlastfahrwerke ein – bei Bedarf organisieren wir auch Sondergenehmigungen."
      ]
    },
    pricing: {
      title: "Kosten für Maschinentransporte",
      intro: "Die Kosten für Maschinentransporte sind sehr individuell und werden in der Regel nach einer Besichtigung und auf Basis des Aufwands kalkuliert. Faktoren sind:",
      factors: [
        "Gewicht, Grösse und Wert der Maschine",
        "Aufwand für Demontage und Remontage",
        "Erforderliches Equipment (z.B. Kran, Spezialverpackung)",
        "Transportdistanz und Zugänglichkeit vor Ort",
        "Notwendigkeit von Sondergenehmigungen"
      ],
      disclaimer: "Fordern Sie eine unverbindliche offerten für eine genaue Kostenkalkulation an."
    },
    faq: {
      title: "Häufige Fragen & Antworten",
      intro: "Hier finden Sie Antworten auf die wichtigsten Fragen rund um den Maschinentransport. Unsere Experten geben Einblicke und Tipps für eine reibungslose Abwicklung.",
      questions: [
        { q: "Bieten Sie auch innerbetriebliche Maschinenverschiebungen an?", a: "Ja, absolut. Ein grosser Teil unserer Aufträge sind interne Umstellungen, zum Beispiel bei der Optimierung von Produktionslinien oder der Umstrukturierung einer Werkshalle. Wir übernehmen die komplette Verlagerung von einem Standort zum anderen innerhalb Ihres Firmengeländes." },
        { q: "Ist eine Besichtigung vor dem Transport immer notwendig?", a: "Bei 99% aller Maschinentransporte ist eine Besichtigung vor Ort unerlässlich. Nur so können unsere Experten den Aufwand korrekt einschätzen, potenzielle Schwierigkeiten identifizieren und einen detaillierten, sicheren Plan erstellen. Eine offerten ohne Besichtigung wäre unseriös und birgt Risiken für beide Seiten." },
        { q: "Welche Informationen sind für eine erste Anfrage hilfreich?", a: "Je mehr Details, desto besser. Ideal sind: Maschinentyp und Hersteller, technische Datenblätter (mit Gewicht und Massen), Fotos der Maschine und der Umgebung (Zugangswege, Türen, Hallentore) sowie die genauen Adressen des Start- und Zielortes." },
        { q: "Wie wird die Ausfallzeit meiner Produktion so gering wie möglich gehalten?", a: "Minimierung der Downtime ist unser Hauptziel. Wir planen den Transport detailliert und führen ihn oft an Wochenenden, Feiertagen oder während Ihrer geplanten Betriebspausen durch. Eine enge Abstimmung mit Ihrer Produktionsleitung ist dabei der Schlüssel zum Erfolg." },
        { q: "Wie sind meine teuren Maschinen während des Transports versichert?", a: "Unsere Partner verfügen über spezielle Maschinen- und Transportversicherungen (z.B. Verkehrshaftungsversicherung), die auch sehr hohe Werte abdecken. Die Deckungssumme wird auf den Wert Ihrer Maschine angepasst. Alle Details zur Versicherung werden transparent in der offerten ausgewiesen." }
      ]
    },
    materials: {
      title: "Benötigtes Material & Equipment",
      items: [
        "Industrieroller und Schwerlastfahrwerke",
        "Mobile Autokräne und Hallenkräne",
        "Hydraulische Hebesysteme (Litzenheber)",
        "Massgefertigte Transportkisten aus Holz",
        "Spezialwerkzeuge für De- und Remontage",
        "Luftkissen-Transportsysteme für empfindliche Böden"
      ]
    }
  };

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <Tabs defaultValue="piano" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 bg-gray-200 h-auto rounded-xl p-1">
            <TabsTrigger value="piano" className="py-3 px-4 flex items-center justify-center gap-2 text-base data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg font-semibold">
              <PiPianoKeysFill size={22} /> Klaviertransport
            </TabsTrigger>
            <TabsTrigger value="safe" className="py-3 px-4 flex items-center justify-center gap-2 text-base data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg font-semibold">
              <Shield size={20} /> Tresortransport
            </TabsTrigger>
            <TabsTrigger value="machinery" className="py-3 px-4 flex items-center justify-center gap-2 text-base data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg font-semibold">
              <Cog size={20} /> Maschinen & Geräte
            </TabsTrigger>
          </TabsList>
          <div className="mt-8 bg-white p-6 md:p-10 rounded-2xl shadow-xl border">
            <TabsContent value="piano">
              <TransportCategory categoryData={pianoData} />
            </TabsContent>
            <TabsContent value="safe">
              <TransportCategory categoryData={safeData} />
            </TabsContent>
            <TabsContent value="machinery">
              <TransportCategory categoryData={machineryData} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default TransportTabs;
