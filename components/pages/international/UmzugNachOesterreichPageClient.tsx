'use client'

import React from 'react';
import Link from 'next/link';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, FileText, Sparkles, ShieldCheck, Home, Info, Truck, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import InternationalPageNavigation from '@/components/international/InternationalPageNavigation';

const Section = ({ children, className = '' }: any) => (
  <section
    className={`py-10 md:py-14 border-t border-gray-100 ${className}`}
  >
    {children}
  </section>
);

const SectionTitle = ({ icon, title }: any) => {
  const Icon = icon;
  return (
    <h2 className="heading-2 flex items-center">
      {Icon && <Icon size={36} className="mr-4 text-green-600" />}
      {title}
    </h2>
  );
};

const ListItem = ({ children, icon: Icon = CheckCircle }: any) => (
  <li className="flex items-start py-2">
    <Icon className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
    <span className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: children }} />
  </li>
);

const UmzugNachOesterreichPageClient = () => {
  const canonicalPath = '/umzugsfirma/internationale-umzuege/umzug-nach-oesterreich';

  const metaTitle = "Umzug nach Österreich: Kosten, Planung & Firmenvergleich 2025";
  const metaDescription = "Ihr kompletter Leitfaden für den Umzug von der Schweiz nach Österreich. Entdecken Sie Kosten, Zolltipps, Checklisten und vergleichen Sie die besten Firmen für Transport und Reinigung.";
  const metaKeywords = "umzug nach österreich, umzug schweiz österreich, umzugsfirma schweiz österreich, internationaler umzug österreich, umzug nach wien, umzug nach salzburg, umzug nach graz, umzugsfirma international, zügelfirma schweiz österreich, umzug schweiz nach österreich, umzugskosten schweiz österreich, umzugsfirma vergleichen österreich, günstiger umzug österreich, umzug nach österreich preise, umzug nach österreich kosten, umzugsfirma schweiz, internationaler umzug, internationale umzüge österreich";

  const costTable = [
    { size: "1-Zimmer-Wohnung (ca. 15-20 m³)", cost: "1.800 – 3.200 CHF" },
    { size: "2.5-Zimmer-Wohnung (ca. 25-35 m³)", cost: "3.000 – 5.500 CHF" },
    { size: "4.5-Zimmer-Wohnung (ca. 40-55 m³)", cost: "5.000 – 8.000 CHF" },
    { size: "Haus / > 6 Zimmer (> 60 m³)", cost: "ab 7.500 CHF" }
  ];

  const costFactors = [
    { text: "**Umzugsvolumen:** Der grösste Kostenfaktor. Je mehr Sie mitnehmen, desto teurer." },
    { text: "**Distanz & Maut:** Die Strecke und Autobahngebühren (Vignette in AT) spielen eine Rolle." },
    { text: "**Service-Umfang:** Nur Transport oder auch Packservice, Möbelmontage und Reinigung?" },
    { text: "**Zugänglichkeit:** Stockwerk, Liftverfügbarkeit und Parkmöglichkeiten vor Ort." },
    { text: "**Zollabwicklung:** Der administrative Aufwand wird meist pauschal verrechnet." },
    { text: "**Versicherung:** Eine höhere Transportversicherung für wertvolles Gut kostet extra." }
  ];

  const movingChecklist = [
    "**3 Monate vorher:** Umzugsofferten vergleichen und einholen. Miet- oder Arbeitsvertrag in Österreich unterzeichnen.",
    "**2 Monate vorher:** Umzugsfirma verbindlich buchen. Klären, ob die Firma auch die Reinigung der Schweizer Wohnung anbietet.",
    "**1 Monat vorher:** Abmeldung bei der Schweizer Wohngemeinde vorbereiten. Verträge (Versicherungen, Mobilfunk etc.) kündigen. Post-Nachsendeauftrag einrichten.",
    "**2 Wochen vorher:** Mit dem systematischen Packen beginnen. Umzugsgut inventarisieren und Kartons beschriften.",
    "**1 Woche vorher:** Termin für die Wohnungsübergabe in der Schweiz festlegen. Wichtige Dokumente griffbereit halten.",
    "**Nach dem Umzug:** Innerhalb von drei Tagen nach Einzug in Österreich beim zuständigen Meldeamt anmelden ('Meldezettel')."
  ];

  const whyCompareItems = [
    {
      title: "Bis zu 40% Kosten sparen",
      text: "Durch den direkten Vergleich mehrerer Offerten finden Sie mühelos die günstigste Offerte."
    },
    {
      title: "Geprüfte Österreich-Experten",
      text: "Wir vermitteln nur Firmen mit Erfahrung im Verkehr zwischen der Schweiz und Österreich, inklusive Zollabwicklung."
    },
    {
      title: "Umzug & Reinigung aus einer Hand",
      text: "Viele unserer Partner bieten Kombi-Pakete für den Transport und die Endreinigung mit Abnahmegarantie an."
    },
    {
      title: "Volle Kostentransparenz",
      text: "Erhalten Sie klare Offerten ohne versteckte Gebühren für Zoll, Maut oder andere unvorhergesehene Ausgaben."
    }
  ];

  const faqs = [
    {
      question: "Bieten Umzugsfirmen auch die Reinigung meiner alten Wohnung in der Schweiz an?",
      answer: "Ja, viele auf internationale Umzüge spezialisierte Firmen bieten einen Kombi-Service an. Sie können den Umzug und die Endreinigung mit Abnahmegarantie für Ihre Schweizer Wohnung als Paket buchen. Das ist äusserst praktisch, da Sie nur einen Ansprechpartner haben und sicher sein können, dass die Wohnung pünktlich und sauber übergeben wird. Fragen Sie bei Ihrer Offertenanfrage explizit nach diesem Service!"
    },
    {
      question: "Was ist die 'Abnahmegarantie' bei der Umzugsreinigung?",
      answer: "Die Abnahmegarantie bedeutet, dass das Reinigungsunternehmen dafür haftet, dass die Wohnung vom Vermieter abgenommen wird. Sollte der Vermieter bei der Übergabe Mängel an der Reinigung feststellen, ist die Firma verpflichtet, kostenlos nachzubessern, bis alles in Ordnung ist. Das gibt Ihnen maximale Sicherheit und erspart Ihnen Diskussionen am Übergabetag."
    },
    {
      question: "Wie melde ich mich in Österreich an?",
      answer: "Sie müssen sich innerhalb von drei Tagen nach dem Einzug in Ihre neue Wohnung beim zuständigen Meldeamt (Magistratisches Bezirksamt in Städten oder Gemeindeamt) anmelden. Dafür benötigen Sie ein ausgefülltes 'Meldezettel'-Formular, Ihren Reisepass oder Personalausweis. Die Anmeldung ist kostenlos."
    },
    {
      question: "Kann ich mein Auto aus der Schweiz mitnehmen?",
      answer: "Ja, das ist möglich. Sie müssen Ihr Fahrzeug jedoch innerhalb eines Monats nach der Wohnsitzanmeldung in Österreich ummelden. Dafür ist eine technische Überprüfung ('Einzelgenehmigung') und die Entrichtung der Normverbrauchsabgabe (NoVA) erforderlich. Der Prozess kann komplex sein, daher lohnt sich die Beratung bei einem Automobilclub."
    },
    {
      question: "Was muss ich bei der Zollanmeldung als 'Übersiedlungsgut' beachten?",
      answer: "Um Ihr Hab und Gut zollfrei einführen zu können, müssen Sie nachweisen, dass Sie Ihren Wohnsitz von der Schweiz nach Österreich verlegen. Erstellen Sie eine detaillierte Liste aller Gegenstände (Inventarliste). Das Zollformular ZBefr 2a wird von Ihrer Umzugsfirma vorbereitet und bei der Grenzüberschreitung vorgelegt. Ihr Spediteur kümmert sich in der Regel um den gesamten Ablauf."
    }
  ];

  return (
    <>
      <div className="bg-gradient-to-b from-slate-50 via-gray-50 to-white">
        <section
          className="relative w-full bg-cover bg-center text-white"
        >
          <div className="absolute inset-0">
             <img alt="Hero image of Vienna, Austria" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1700396050407-1cadaf4c9a5c" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
          </div>
          <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6 text-center py-28 md:py-40">
            <div
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-shadow-lg">Servus in Österreich: Ihr Umzug ins Alpenparadies</h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">Von Schweizer Bergen zu österreichischer Gemütlichkeit. Wir machen Ihren internationalen Umzug einfach und stressfrei. Planen Sie jetzt Ihren Start ins neue Leben.</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
            <main className="lg:col-span-2 bg-white p-6 md:p-10 rounded-2xl shadow-xl space-y-10">
              <Section className="border-t-0 pt-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Von Zürich nach Wien: Ihr Leitfaden für den Österreich-Umzug</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">Ein Umzug von der Schweiz nach Österreich ist dank der kulturellen und sprachlichen Nähe oft unkomplizierter als in andere Länder, erfordert aber dennoch eine sorgfältige Organisation. Die gemeinsame Grenze und die Mitgliedschaft Österreichs in der EU vereinfachen viele, aber nicht alle, administrativen Schritte.</p>
                <p className="text-gray-700 leading-relaxed">Dieser Ratgeber führt Sie durch den gesamten Prozess. Wir zeigen Ihnen, wie Sie die Kosten realistisch einschätzen, welche Zolldokumente (Stichwort: Übersiedlungsgut) unerlässlich sind und wie Sie das beste Umzugsunternehmen finden, das vielleicht sogar die Reinigung Ihrer alten Wohnung übernimmt. Das Ziel ist es, Ihnen einen reibungslosen Übergang zu ermöglichen, damit Sie sich schnell in Ihrer neuen Heimat wohlfühlen.</p>
                 <p className="text-gray-700 leading-relaxed mt-4">Durch den Vergleich von Umzugsfirmen, die auf die Strecke Schweiz-Österreich spezialisiert sind, sichern Sie sich nicht nur den besten Preis, sondern auch einen Partner, der sich mit allen Formalitäten auskennt. So können Sie sich auf das Wesentliche freuen: das erste Wiener Schnitzel, die Erkundung der neuen Stadt und die berühmte österreichische Gastfreundschaft.</p>
              </Section>

              <Section>
                <SectionTitle icon={ShieldCheck} title="Kosten sparen, Nerven schonen: Firmenvergleich lohnt sich" />
                <p className="text-gray-700 leading-relaxed mb-8">Die Preise für einen Umzug nach Österreich können sich von Anbieter zu Anbieter stark unterscheiden. Ein gründlicher Vergleich ist der Schlüssel, um ein optimales Preis-Leistungs-Verhältnis zu erzielen und einen erfahrenen Partner für Ihren Auslandsumzug zu finden.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {whyCompareItems.map((item, i) => (
                        <div key={i} className="bg-slate-50 p-5 rounded-lg border border-slate-200 transition-all duration-300 hover:shadow-md hover:border-green-200">
                            <h4 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h4>
                            <p className="text-gray-600">{item.text}</p>
                        </div>
                    ))}
                </div>
              </Section>
              
              <Section>
                <SectionTitle icon={Home} title="Perfekt geplant: Ihr Umzug nach Österreich" />
                <p className="text-gray-700 leading-relaxed mb-6">Eine gute Vorbereitung ist die halbe Miete. Beginnen Sie frühzeitig mit der Planung, um alle logistischen und bürokratischen Hürden stressfrei zu meistern.</p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-8">
                  <p className="text-blue-800">Ein professionelles Umzugsunternehmen ist hier Gold wert. Es kümmert sich um den sicheren Transport, die Verpackung und die korrekte Zollanmeldung Ihres Hab und Guts.</p>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Ihre Checkliste für den Umzug nach Österreich:</h3>
                <ul className="space-y-4">{movingChecklist.map((item, i) => <ListItem key={i}>{item}</ListItem>)}</ul>
              </Section>

              <Section>
                <SectionTitle icon={FileText} title="Zollformalitäten: Übersiedlungsgut anmelden" />
                 <p className="text-gray-700 leading-relaxed mb-6">Obwohl Österreich und die Schweiz Nachbarländer sind, muss Ihr Umzugsgut am Zoll angemeldet werden, da die Schweiz kein EU-Mitglied ist. Ihr Haushalt kann jedoch als 'Übersiedlungsgut' zollfrei eingeführt werden.</p>
                 <p className="text-gray-700 leading-relaxed mb-6">Die Voraussetzungen dafür sind: Sie verlegen Ihren Hauptwohnsitz nachweislich nach Österreich und die mitgeführten Gegenstände sind seit mindestens sechs Monaten in Ihrem Gebrauch. Ein zentrales Dokument hierfür ist das Formular 'ZBefr 2a'.</p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <h4 className="font-bold text-yellow-900">Profi-Tipp für den Zoll</h4>
                    <p className="text-yellow-800">Überlassen Sie die Zollabwicklung Ihrer Umzugsfirma. Erfahrene Spediteure kennen die Prozeduren, füllen die Formulare korrekt aus und sorgen für eine zügige Grenzabfertigung. Das spart Ihnen wertvolle Zeit und Nerven.</p>
                </div>
              </Section>

              <Section>
                <SectionTitle title="Die Kosten im Blick: Was kostet ein Umzug nach Österreich?" />
                <p className="text-gray-700 leading-relaxed mb-8">Die Kosten für einen Umzug von der Schweiz nach Österreich hängen vom Volumen, der Distanz (z.B. Genf-Wien vs. St. Gallen-Bregenz) und dem gewünschten Servicelevel ab. Die folgende Tabelle gibt Ihnen eine erste Orientierung.</p>
                
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Richtpreise für einen Umzug nach Österreich</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-max text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-2 font-semibold text-gray-600">Wohnungsgrösse / Ladevolumen</th>
                          <th className="py-3 px-2 font-semibold text-gray-600 text-right">Geschätzte Kosten (CHF)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {costTable.map((row, i) => (
                          <tr key={i} className="border-b border-slate-200 last:border-0 hover:bg-slate-100">
                            <td className="py-4 px-2 text-gray-700">{row.size}</td>
                            <td className="py-4 px-2 text-gray-800 font-medium text-right">{row.cost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-500 mt-4 italic">*Diese Preise sind Schätzungen. Holen Sie sich genaue Offerten für eine präzise Kalkulation.</p>
                </div>

                <h3 className="text-2xl font-semibold text-gray-800 mt-12 mb-6">Faktoren, die den Preis beeinflussen:</h3>
                <ul className="space-y-4 columns-1 md:columns-2">{costFactors.map((item, i) => <ListItem key={i}>{item.text}</ListItem>)}</ul>
              </Section>
              
              <Section>
                <SectionTitle icon={HelpCircle} title="Häufig gestellte Fragen (FAQ) zum Umzug nach Österreich" />
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                        <h4 className="faq-question">{faq.question}</h4>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 leading-relaxed">
                        <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Section>

              <div className="mt-12 text-center">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white group px-12 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-lg">
                  <Link href="/kostenlose-offerte-anfordern?service=international">
                    Jetzt Österreich-Umzugsofferten erhalten
                    <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1.5" />
                  </Link>
                </Button>
              </div>
            </main>

            <aside className="lg:col-span-1 space-y-8 self-start sticky top-28">
              <div
                className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Truck size={24} className="mr-3 text-blue-500" />
                  Profis für den Nachbarn
                </h3>
                <img alt="Ein Umzugswagen fährt durch eine malerische österreichische Landschaft" className="w-full h-56 object-cover rounded-lg shadow-md mb-3" src="https://images.unsplash.com/photo-1697977113242-6311a55ad223" />
                <p className="text-sm text-gray-600 mt-2">Vergleichen Sie Firmen, die die Route Schweiz-Österreich wie ihre Westentasche kennen und alle Formalitäten für Sie erledigen.</p>
              </div>
              <div
                className="bg-green-50 p-6 rounded-2xl shadow-lg border border-green-200"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center">
                  <Info size={24} className="mr-3" />
                  Wichtiger Tipp: Meldezettel
                </h3>
                <p className="text-green-700">Vergessen Sie nicht die 3-Tages-Frist! Die Anmeldung Ihres neuen Wohnsitzes in Österreich muss schnell erfolgen, um Strafen zu vermeiden.</p>
              </div>
            </aside>
          </div>
          <InternationalPageNavigation currentCountrySlug="umzug-nach-oesterreich" />
        </div>
      </div>
    </>
  );
};

export default UmzugNachOesterreichPageClient;


