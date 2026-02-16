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

const UmzugNachPortugalPageClient = () => {
  const canonicalPath = '/umzugsfirma/internationale-umzuege/umzug-nach-portugal';

  const metaTitle = "Umzug nach Portugal: Kosten, Planung & Firmenvergleich 2026";
  const metaDescription = "Ihr Leitfaden für den Umzug von der Schweiz nach Portugal. Entdecken Sie Kosten, Tipps für Zoll & NIF, Checklisten und vergleichen Sie die besten Firmen für Umzug und Reinigung.";
  const metaKeywords = "umzug nach portugal, umzug schweiz portugal, umzugsfirma schweiz portugal, internationaler umzug portugal, umzug nach lissabon, umzug nach porto, umzug nach faro, umzugsfirma international, zügelfirma schweiz portugal, umzug schweiz nach portugal, umzugskosten schweiz portugal, umzugsfirma vergleichen portugal, günstiger umzug portugal, umzug nach portugal preise, umzug nach portugal kosten, umzugsfirma schweiz, internationaler umzug, internationale umzüge portugal";

  const costTable = [
    { size: "1-Zimmer-Wohnung (ca. 15-20 m³)", cost: "3.500 – 5.500 CHF" },
    { size: "2.5-Zimmer-Wohnung (ca. 25-35 m³)", cost: "5.000 – 8.000 CHF" },
    { size: "4.5-Zimmer-Wohnung (ca. 40-55 m³)", cost: "7.500 – 12.000 CHF" },
    { size: "Haus / > 6 Zimmer (> 60 m³)", cost: "ab 11.000 CHF" }
  ];

  const costFactors = [
    { text: "**Umzugsvolumen:** Der mit Abstand grösste Kostenfaktor." },
    { text: "**Distanz & Maut:** Die lange Strecke durch Frankreich und Spanien verursacht erhebliche Transport- und Mautkosten." },
    { text: "**Service-Paket:** Nur Transport oder das Rundum-sorglos-Paket mit Packen, Montage und Reinigung?" },
    { text: "**Zugänglichkeit:** Stockwerk, Liftverfügbarkeit und Parkmöglichkeiten an beiden Orten." },
    { text: "**Zollabwicklung:** Der administrative Aufwand wird von der Spedition meist pauschal verrechnet." },
    { text: "**Saison:** Umzüge in den Sommermonaten können aufgrund der hohen Nachfrage teurer sein." }
  ];

  const movingChecklist = [
    "**3-4 Monate vorher:** Umzugsofferten einholen und vergleichen. NIF-Nummer (Número de Identificação Fiscal) beantragen – dies ist online oder über Dienstleister möglich.",
    "**2 Monate vorher:** Umzugsfirma verbindlich buchen. Klären, ob auch die Reinigung der Schweizer Wohnung angeboten wird.",
    "**1 Monat vorher:** Verträge in der Schweiz kündigen (Krankenkasse, Handy, etc.). Abmeldung bei der Wohngemeinde vorbereiten. Post-Nachsendeauftrag einrichten.",
    "**2 Wochen vorher:** Eine detaillierte Inventarliste auf Portugiesisch oder Englisch erstellen. Systematisch mit dem Packen beginnen und Kartons beschriften.",
    "**1 Woche vorher:** Termin für die Wohnungsübergabe in der Schweiz festlegen. Wichtige Dokumente (Pässe, NIF-Bescheinigung, etc.) sicher und griffbereit aufbewahren.",
    "**Nach dem Umzug:** Anmeldung bei der lokalen Gemeinde (Junta de Freguesia) und beim Ausländeramt (SEF) vornehmen."
  ];

  const whyCompareItems = [
    {
      title: "Bis zu 40% Kosten sparen",
      text: "Finden Sie durch den Vergleich mehrerer Offerten die beste Offerte für Ihr Budget."
    },
    {
      title: "Erfahrene Portugal-Experten",
      text: "Wir vermitteln nur Unternehmen mit nachgewiesener Erfahrung bei Umzügen nach Portugal, inklusive Zollabwicklung."
    },
    {
      title: "Umzug & Reinigung im Paket",
      text: "Viele unserer Partner bieten Kombi-Pakete an. So wird der Transport und die Reinigung Ihrer alten Wohnung aus einer Hand erledigt."
    },
    {
      title: "Volle Kostentransparenz",
      text: "Erhalten Sie klare und detaillierte Offerten ohne versteckte Gebühren für Maut, Zoll oder andere Nebenkosten."
    }
  ];

  const faqs = [
    {
      question: "Kann meine Umzugsfirma auch die Endreinigung meiner Schweizer Wohnung übernehmen?",
      answer: "Ja, absolut! Viele auf internationale Umzüge spezialisierte Firmen bieten diesen Service an. Sie können den Umzug und die Reinigung mit Abnahmegarantie als Kombi-Paket buchen. Das spart Ihnen viel Organisation und garantiert eine problemlose Wohnungsübergabe. Fragen Sie in Ihrer Offertenanfrage gezielt danach."
    },
    {
      question: "Was bedeutet die 'Abnahmegarantie' bei der Reinigung?",
      answer: "Die Abnahmegarantie gibt Ihnen die Sicherheit, dass das Reinigungsunternehmen für die Sauberkeit bei der Wohnungsübergabe haftet. Sollte Ihr Vermieter Mängel finden, ist die Firma verpflichtet, kostenlos nachzureinigen, bis alles akzeptiert wird. So haben Sie keinerlei Risiko."
    },
    {
      question: "Benötige ich ein Visum für den Umzug nach Portugal?",
      answer: "Als Schweizer Bürger benötigen Sie für die Einreise und einen Aufenthalt von bis zu 90 Tagen kein Visum. Wenn Sie länger als drei Monate bleiben, müssen Sie sich bei der zuständigen Ausländerbehörde (Serviço de Estrangeiros e Fronteiras, SEF) registrieren und eine Aufenthaltsgenehmigung beantragen."
    },
    {
      question: "Kann ich mein Auto aus der Schweiz nach Portugal mitnehmen?",
      answer: "Ja, aber der Prozess der Ummeldung (Matriculação) ist komplex und kann teuer sein. Sie müssen das Fahrzeug innerhalb von 60 Tagen nach Erhalt Ihrer Aufenthaltsgenehmigung ummelden und dabei Einfuhrsteuern (ISV) entrichten. Es wird dringend empfohlen, sich vorab von einer spezialisierten Agentur ('agência de documentação') beraten zu lassen."
    },
    {
      question: "Wie funktioniert das Gesundheitssystem in Portugal?",
      answer: "Portugal hat ein öffentliches Gesundheitssystem (Serviço Nacional de Saúde, SNS), das durch Steuern finanziert wird. Nach Ihrer Anmeldung als Resident erhalten Sie eine SNS-Nutzernummer ('número de utente'), mit der Sie Zugang zu öffentlichen Gesundheitsdiensten haben. Viele Expats schliessen zusätzlich eine private Krankenversicherung ab, um Wartezeiten zu verkürzen und Zugang zu privaten Kliniken zu haben."
    }
  ];

  return (
    <>
      <div className="bg-gradient-to-b from-slate-50 via-gray-50 to-white">
        <section
          className="relative w-full bg-cover bg-center text-white"
        >
          <div className="absolute inset-0">
             <img alt="Hero image of Lisbon, Portugal" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1585250003309-694ff7628237" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
          </div>
          <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6 text-center py-28 md:py-40">
            <div
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-shadow-lg">Olá Portugal! Ihr Umzug an die Atlantikküste</h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">Von den Alpen an die Strände der Algarve. Wir machen Ihren Umzug nach Portugal einfach, sicher und unvergesslich.</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
            <main className="lg:col-span-2 bg-white p-6 md:p-10 rounded-2xl shadow-xl space-y-10">
              <Section className="border-t-0 pt-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Von der Schweiz nach Lissabon, Porto oder an die Algarve</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">Ein Umzug nach Portugal bedeutet mehr als nur einen Wohnortwechsel – es ist der Beginn eines Lebensabschnitts geprägt von Sonne, einer reichen Kultur und einer entspannten Lebensart. Portugal zieht mit seiner atemberaubenden Küste, historischen Städten und gastfreundlichen Bevölkerung immer mehr Schweizer an. Doch der Weg dorthin erfordert eine umsichtige Planung.</p>
                <p className="text-gray-700 leading-relaxed">Dieser umfassende Ratgeber begleitet Sie auf jedem Schritt Ihres Umzugs. Wir erklären, wie Sie die Kosten realistisch kalkulieren, die Zollformalitäten meistern und die wichtige NIF-Steuernummer beantragen. Zudem zeigen wir Ihnen, wie Sie das ideale Umzugsunternehmen finden, das nicht nur Ihr Hab und Gut sicher transportiert, sondern auf Wunsch auch die Endreinigung Ihrer Schweizer Wohnung mit Abnahmegarantie übernimmt.</p>
                 <p className="text-gray-700 leading-relaxed mt-4">Durch den Vergleich von Offerten stellen Sie sicher, dass Sie den besten Service zum fairsten Preis erhalten. So können Sie sich sorgenfrei auf Ihr neues Leben freuen: auf den ersten Pastel de Nata, Spaziergänge am Atlantik und das einzigartige portugiesische Lebensgefühl.</p>
              </Section>

              <Section>
                <SectionTitle icon={ShieldCheck} title="Intelligent vergleichen, sorglos umziehen" />
                <p className="text-gray-700 leading-relaxed mb-8">Die Preise für einen Umzug nach Portugal können stark schwanken. Ein sorgfältiger Vergleich von spezialisierten Umzugsfirmen ist der Schlüssel, um Tausende Franken zu sparen und einen verlässlichen Partner für die lange Strecke zu finden.</p>
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
                <SectionTitle icon={Home} title="Perfekte Planung für Ihr Abenteuer Portugal" />
                <p className="text-gray-700 leading-relaxed mb-6">Ein Umzug über eine so weite Distanz erfordert eine exzellente Organisation. Beginnen Sie frühzeitig mit der Planung, um administrative Hürden wie die Beantragung der NIF-Nummer und logistische Herausforderungen entspannt zu meistern.</p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-8">
                  <p className="text-blue-800">Eine professionelle Umzugsfirma ist hierbei unerlässlich. Sie sorgt nicht nur für den sicheren Transport, sondern berät Sie auch bei der Erstellung der notwendigen Dokumente für eine reibungslose Zollabfertigung.</p>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Ihre Checkliste für den Umzug nach Portugal:</h3>
                <ul className="space-y-4">{movingChecklist.map((item, i) => <ListItem key={i}>{item}</ListItem>)}</ul>
              </Section>

              <Section>
                <SectionTitle icon={FileText} title="Zoll und die wichtige NIF-Nummer" />
                 <p className="text-gray-700 leading-relaxed mb-6">Als Nicht-EU-Land muss Ihr Umzugsgut aus der Schweiz beim portugiesischen Zoll (Alfândega) deklariert werden. Bei einer Wohnsitzverlegung können Sie Ihr Hab und Gut als Übersiedlungsgut ('bens de mudança') zollfrei einführen.</p>
                 <p className="text-gray-700 leading-relaxed mb-6">Hierfür benötigen Sie die Abmeldebestätigung aus der Schweiz, Ihre NIF-Nummer, einen Nachweis über Ihren neuen Wohnsitz in Portugal (z.B. Mietvertrag) und eine detaillierte Inventarliste. Ihre Umzugsfirma wird Sie bei der Zusammenstellung dieser Dokumente unterstützen.</p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <h4 className="font-bold text-yellow-900">Profi-Tipp: Die NIF-Nummer ist entscheidend</h4>
                    <p className="text-yellow-800">Die NIF (Steuernummer) ist der Schlüssel zu fast allem in Portugal. Beantragen Sie diese so früh wie möglich. Ohne NIF können Sie kein Bankkonto eröffnen, keine Wohnung mieten und keinen Arbeitsvertrag unterzeichnen. Die Beantragung ist aus der Ferne möglich.</p>
                </div>
              </Section>

              <Section>
                <SectionTitle title="Was kostet ein Umzug nach Portugal?" />
                <p className="text-gray-700 leading-relaxed mb-8">Die Kosten für einen Umzug von der Schweiz nach Portugal sind aufgrund der grossen Distanz höher als bei Umzügen in Nachbarländer. Die Preise variieren stark je nach Volumen, Service und Route.</p>
                
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Richtpreise für einen Umzug nach Portugal</h3>
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
                  <p className="text-xs text-gray-500 mt-4 italic">*Diese Preise sind grobe Schätzungen. Holen Sie sich exakte Offerten für eine verlässliche Kalkulation.</p>
                </div>

                <h3 className="text-2xl font-semibold text-gray-800 mt-12 mb-6">Faktoren, die den Preis beeinflussen:</h3>
                <ul className="space-y-4 columns-1 md:columns-2">{costFactors.map((item, i) => <ListItem key={i}>{item.text}</ListItem>)}</ul>
              </Section>
              
              <Section>
                <SectionTitle icon={HelpCircle} title="Häufig gestellte Fragen (FAQ) zum Umzug nach Portugal" />
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
                    Jetzt Portugal-Umzugsofferten erhalten
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
                  Profis für die Langstrecke
                </h3>
                <img alt="Ein Umzugswagen fährt entlang der portugiesischen Atlantikküste" className="w-full h-56 object-cover rounded-lg shadow-md mb-3" src="https://images.unsplash.com/photo-1555881400-69a2384edcd4" />
                <p className="text-sm text-gray-600 mt-2">Vergleichen Sie Firmen, die auf die lange und anspruchsvolle Route nach Portugal spezialisiert sind.</p>
              </div>
              <div
                className="bg-green-50 p-6 rounded-2xl shadow-lg border border-green-200"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center">
                  <Info size={24} className="mr-3" />
                  Wichtiger Tipp: NIF-Nummer
                </h3>
                <p className="text-green-700">Die portugiesische Steuernummer (NIF) ist essenziell. Kümmern Sie sich darum, bevor Sie umziehen. Ohne sie geht fast nichts!</p>
              </div>
            </aside>
          </div>
          <InternationalPageNavigation currentCountrySlug="umzug-nach-portugal" />
        </div>
      </div>
    </>
  );
};

export default UmzugNachPortugalPageClient;


