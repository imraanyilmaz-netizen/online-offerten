'use client'

import React from 'react';
import Link from 'next/link';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, FileText, Briefcase, Sparkles, Trash2, ShieldCheck, Home, Info, Truck, HelpCircle } from 'lucide-react';
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

const UmzugNachFrankreichPageClient = () => {
  const canonicalPath = '/umzugsfirma/internationale-umzuege/umzug-nach-frankreich';

  const metaTitle = "Umzug nach Frankreich: Umfassender Guide & Kosten 2025";
  const metaDescription = "Ihr kompletter Ratgeber für den Umzug von der Schweiz nach Frankreich. Erfahren Sie alles über Kosten, Zoll, Planung und finden Sie die besten Umzugsfirmen. Inklusive FAQ und Checkliste.";
  const metaKeywords = "umzug nach frankreich, umzug schweiz frankreich, umzugsfirma schweiz frankreich, internationaler umzug frankreich, umzug nach paris, umzug nach lyon, umzug nach marseille, umzugsfirma international, zügelfirma schweiz frankreich, umzug schweiz nach frankreich, umzugskosten schweiz frankreich, umzugsfirma vergleichen frankreich, günstiger umzug frankreich, umzug nach frankreich preise, umzug nach frankreich kosten, umzugsfirma schweiz, internationaler umzug, internationale umzüge frankreich";

  const costTable = [
    { size: "1-Zimmer-Wohnung (ca. 15-20 m³)", cost: "2.000 – 3.500 CHF" },
    { size: "2.5-Zimmer-Wohnung (ca. 25-35 m³)", cost: "3.200 – 5.800 CHF" },
    { size: "4.5-Zimmer-Wohnung (ca. 40-55 m³)", cost: "5.500 – 8.500 CHF" },
    { size: "Haus / > 6 Zimmer (> 60 m³)", cost: "ab 8.000 CHF" }
  ];

  const costFactors = [
    { text: "**Volumen & Gewicht:** Die wichtigste Berechnungsgrundlage für jedes Umzugsunternehmen." },
    { text: "**Distanz & Mautgebühren:** Die Strecke und anfallende Autobahngebühren in Frankreich fliessen in die Kalkulation ein." },
    { text: "**Service-Level:** Nur Transport oder Full-Service mit Ein- und Auspacken, Möbelmontage und Reinigung?" },
    { text: "**Stockwerk & Lift:** Schwierige Zugangswege (z.B. 5. Stock ohne Lift in Paris) erhöhen den Aufwand und Preis." },
    { text: "**Zollabwicklung:** Der administrative Aufwand für die Erstellung der Zolldokumente wird oft separat verrechnet." },
    { text: "**Versicherung:** Eine höhere Transportversicherung für wertvolle Gegenstände kostet extra." },
    { text: "**Spezialtransporte:** Klavier, Kunstwerke oder ein grosser Tresor erfordern spezielles Equipment und Personal." },
    { text: "**Saisonale Nachfrage:** Umzüge im Sommer oder zum Monatsende sind oft teurer als in der Nebensaison." }
  ];

  const movingChecklist = [
    "**3-4 Monate vorher:** Mehrere Umzugsofferten einholen und vergleichen. Arbeitsvertrag und Mietvertrag für Frankreich finalisieren.",
    "**2 Monate vorher:** Umzugsfirma definitiv buchen. Wichtige Dokumente (Pässe, Geburtsurkunden, etc.) zusammensuchen und ggf. übersetzen lassen.",
    "**1 Monat vorher:** Abonnements in der Schweiz kündigen (Internet, Fitnessstudio, etc.). Nachsendeauftrag bei der Post einrichten. Umzugsgut inventarisieren und entscheiden, was entsorgt wird.",
    "**2 Wochen vorher:** Umzugskartons packen und systematisch beschriften. Termin für die Wohnungsübergabe in der Schweiz vereinbaren.",
    "**1 Woche vorher:** Wichtige persönliche Gegenstände und Dokumente separat packen. Adressänderungen an Banken, Versicherungen und Behörden melden.",
    "**Umzugstag:** Bargeld für unvorhergesehene Ausgaben bereithalten. Zählerstände (Strom, Wasser, Gas) ablesen und protokollieren. Letzter Kontrollgang durch die leere Wohnung."
  ];

  const cleaningBenefits = [
    "**Garantierte Abnahme:** Das Reinigungsteam ist bei der Übergabe anwesend und führt bei Beanstandungen kostenlose Nachbesserungen durch.",
    "**Maximale Zeitersparnis:** Sie können sich voll und ganz auf Ihren neuen Lebensabschnitt in Frankreich konzentrieren.",
    "**Stressreduktion:** Vermeiden Sie Diskussionen mit der Verwaltung über die Putzqualität.",
    "**Kombinationsrabatte:** Buchen Sie Umzug und Reinigung zusammen und profitieren Sie oft von besseren Preisen."
  ];

  const whyCompareItems = [
    {
      title: "Bis zu 40% Kosten sparen",
      text: "Nutzen Sie die Preisunterschiede zwischen den Anbietern zu Ihrem Vorteil und senken Sie Ihre Umzugskosten erheblich."
    },
    {
      title: "Geprüfte Frankreich-Spezialisten",
      text: "Wir listen nur verifizierte Firmen mit Erfahrung bei Umzügen nach Frankreich. So ist Ihr Eigentum bestens geschützt."
    },
    {
      title: "Massgeschneiderte Lösungen",
      text: "Finden Sie Firmen, die genau das anbieten, was Sie brauchen – vom reinen Transport bis zum Full-Service-Paket inklusive Endreinigung."
    },
    {
      title: "Volle Kostentransparenz",
      text: "Detaillierte Offerten helfen Ihnen, alle Kostenpunkte wie Zoll, Versicherung und Zusatzleistungen im Voraus zu verstehen und zu budgetieren."
    }
  ];

  const faqs = [
    {
      question: "Benötige ich ein Visum für den Umzug nach Frankreich?",
      answer: "Als Schweizer Bürger benötigen Sie für die Einreise und einen Aufenthalt von bis zu 90 Tagen kein Visum. Planen Sie jedoch, länger als 90 Tage zu bleiben oder zu arbeiten, müssen Sie sich innerhalb der ersten drei Monate bei der zuständigen Präfektur oder Unterpräfektur an Ihrem neuen Wohnort anmelden und eine Aufenthaltserlaubnis ('Carte de Séjour') beantragen."
    },
    {
      question: "Kann ich mein Auto von der Schweiz nach Frankreich mitnehmen?",
      answer: "Ja, das ist möglich. Sie müssen Ihr Fahrzeug in Frankreich anmelden ('immatriculation') und die Schweizer Kennzeichen abgeben. Dafür benötigen Sie u.a. die Konformitätsbescheinigung (COC), den Schweizer Fahrzeugausweis und einen Nachweis über die entrichtete Mehrwertsteuer (TVA). Im Rahmen eines Umzugs kann das Fahrzeug als Umzugsgut deklariert und unter bestimmten Voraussetzungen von der TVA befreit werden. Ihre Umzugsfirma kann Sie hierzu beraten."
    },
    {
      question: "Wie finde ich eine Wohnung in Frankreich?",
      answer: "Die Wohnungssuche kann je nach Stadt anspruchsvoll sein. Beliebte Online-Portale sind SeLoger.com, Logic-Immo.com und LeBonCoin.fr. Bereiten Sie ein 'dossier de location' vor: eine Mappe mit Kopien Ihres Passes, Arbeitsvertrags, der letzten Lohnabrechnungen und oft auch einer Bürgschaft ('garant')."
    },
    {
      question: "Muss ich mein Umzugsgut versichern?",
      answer: "Seriöse Umzugsunternehmen bieten eine Basis-Transportversicherung an. Es ist jedoch sehr empfehlenswert, den genauen Umfang und die Deckungssumme zu prüfen und bei Bedarf eine Zusatzversicherung abzuschliessen, insbesondere für wertvolle oder zerbrechliche Gegenstände. Klären Sie dies detailliert mit der Umzugsfirma ab."
    },
    {
      question: "Was passiert mit meiner Schweizer Krankenversicherung?",
      answer: "Sobald Sie Ihren Wohnsitz in die EU verlegen und dort eine Arbeit aufnehmen, unterliegen Sie grundsätzlich dem Versicherungssystem des neuen Landes. Sie müssen sich in Frankreich bei der 'Caisse Primaire d'Assurance Maladie' (CPAM) anmelden. Kündigen Sie Ihre Schweizer Grundversicherung erst, wenn Sie die Aufnahmebestätigung aus Frankreich haben, um eine Versicherungslücke zu vermeiden."
    }
  ];

  return (
    <>
      <div className="bg-gradient-to-b from-slate-50 via-gray-50 to-white">
        <section
          className="relative w-full bg-cover bg-center text-white"
        >
          <div className="absolute inset-0">
             <img alt="Hero image of Paris with Eiffel Tower" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1502602898657-3e91760c0337" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
          </div>
          <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6 text-center py-28 md:py-40">
            <div
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-shadow-lg">Bienvenue en France: Ihr Umzug von der Schweiz</h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">Planen Sie Ihren Umzug ins Land der Lebensfreude? Wir führen Sie durch jeden Schritt – von der Organisation über die Kosten bis zum Vergleich der besten Umzugsunternehmen.</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
            <main className="lg:col-span-2 bg-white p-6 md:p-10 rounded-2xl shadow-xl space-y-10">
              <Section className="border-t-0 pt-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ihr Weg nach Frankreich: Ein Leitfaden für den perfekten Start</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">Ein Umzug von der Schweiz nach Frankreich ist mehr als nur ein Transport von A nach B. Es ist der Beginn eines neuen Lebenskapitels, geprägt von einer reichen Kultur, exzellenter Küche und malerischen Landschaften. Doch bevor Sie das 'Savoir-vivre' geniessen können, steht eine sorgfältige Planung an. Die administrativen und logistischen Hürden eines Auslandumzugs können komplex sein, insbesondere im Hinblick auf Zollbestimmungen und die Auswahl des richtigen Partners.</p>
                <p className="text-gray-700 leading-relaxed">Dieser umfassende Leitfaden soll Ihnen als verlässlicher Kompass dienen. Wir beleuchten alle wichtigen Aspekte Ihres Umzugs: von der detaillierten Kostenkalkulation über die notwendigen Zollformalitäten bis hin zur strategischen Auswahl der passenden Umzugsfirma. Das Ziel ist es, Ihnen nicht nur Geld und Zeit zu sparen, sondern auch den Stress zu minimieren, damit Ihre Ankunft in Frankreich so entspannt wie möglich verläuft.</p>
                 <p className="text-gray-700 leading-relaxed mt-4">Durch den Vergleich von qualifizierten, auf Frankreich-Umzüge spezialisierten Unternehmen stellen Sie sicher, dass Ihr wertvolles Umzugsgut in erfahrenen Händen ist. So können Sie sich auf die Vorfreude konzentrieren – auf Croissants zum Frühstück, Spaziergänge an der Seine oder die Sonne an der Côte d'Azur.</p>
              </Section>

              <Section>
                <SectionTitle icon={ShieldCheck} title="Der klügste erste Schritt: Umzugsfirmen vergleichen" />
                <p className="text-gray-700 leading-relaxed mb-8">Der Schlüssel zu einem erfolgreichen und preiswerten Umzug nach Frankreich liegt im systematischen Vergleich von Offerten. Die Preis- und Leistungsunterschiede sind oft enorm. Nur durch transparente Offerten können Sie versteckte Kosten aufdecken und ein Unternehmen finden, das Ihren individuellen Anforderungen gerecht wird.</p>
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
                <SectionTitle icon={Home} title="Die Umzugsplanung: Eine detaillierte Checkliste" />
                <p className="text-gray-700 leading-relaxed mb-6">Eine strukturierte Planung ist die halbe Miete. Ob Sie privat mit Ihrer Familie umziehen oder einen komplexen Firmenstandort verlagern, eine gute Organisation verhindert Chaos und unerwartete Probleme.</p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-8">
                  <p className="text-blue-800">Professionelle Umzugsfirmen unterstützen Sie bei jedem Schritt, von der Demontage der Möbel bis zur Zollabwicklung. Doch Ihre eigene Vorbereitung ist ebenso entscheidend.</p>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Ihre Umzugs-Checkliste für Frankreich:</h3>
                <ul className="space-y-4">{movingChecklist.map((item, i) => <ListItem key={i}>{item}</ListItem>)}</ul>
              </Section>

              <Section>
                <SectionTitle icon={FileText} title="Zollformalitäten: Reibungslos über die Grenze" />
                 <p className="text-gray-700 leading-relaxed mb-6">Der Umzug von der Schweiz (Nicht-EU) nach Frankreich (EU) erfordert eine Zollanmeldung für Ihr Umzugsgut. Auch wenn Umzugsgut in der Regel zoll- und steuerfrei eingeführt werden kann, müssen bestimmte Bedingungen erfüllt und die richtigen Formulare ausgefüllt werden.</p>
                 <p className="text-gray-700 leading-relaxed mb-6">Zu den Voraussetzungen gehört, dass Sie Ihren Hauptwohnsitz nach Frankreich verlegen und die Gegenstände seit mindestens sechs Monaten in Ihrem Besitz sind und von Ihnen genutzt wurden. Eine detaillierte Inventarliste (idealerweise auf Französisch) ist unerlässlich.</p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <h4 className="font-bold text-yellow-900">Profi-Tipp</h4>
                    <p className="text-yellow-800">Überlassen Sie die Zollabwicklung Ihrer Umzugsfirma! Erfahrene Unternehmen kennen die Prozeduren genau, erstellen die notwendigen Dokumente (z.B. Formular Cerfa n°10070) und sorgen für eine zügige Abfertigung an der Grenze. Das spart Ihnen enorm viel Zeit und Nerven.</p>
                </div>
              </Section>

              <Section>
                <SectionTitle title="Was kostet ein Umzug von der Schweiz nach Frankreich?" />
                <p className="text-gray-700 leading-relaxed mb-8">Die Kosten für einen Umzug nach Frankreich variieren stark und hängen von diversen Faktoren ab. Das Volumen Ihres Haushalts, die Distanz (z.B. Genf-Paris vs. Zürich-Nizza), die Zugänglichkeit der Wohnungen und der Umfang der gewünschten Dienstleistungen sind die Hauptpreistreiber. Die folgende Tabelle gibt Ihnen eine erste Orientierung.</p>
                
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Kostenschätzung für einen Umzug nach Frankreich</h3>
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
                  <p className="text-xs text-gray-500 mt-4 italic">*Dies sind Richtwerte. Die tatsächlichen Kosten können je nach Serviceumfang, Saison und Anbieter erheblich abweichen.</p>
                </div>

                <h3 className="text-2xl font-semibold text-gray-800 mt-12 mb-6">Diese Faktoren bestimmen den Endpreis:</h3>
                <ul className="space-y-4 columns-1 md:columns-2">{costFactors.map((item, i) => <ListItem key={i}>{item.text}</ListItem>)}</ul>
              </Section>
              
              <Section>
                <SectionTitle icon={Sparkles} title="Sorgenfreie Wohnungsübergabe dank Reinigung mit Abnahmegarantie" />
                <p className="text-gray-700 leading-relaxed mb-4">Die Endreinigung Ihrer Schweizer Mietwohnung ist ein entscheidender letzter Schritt vor dem Umzug. Um Ihre Mietkaution vollständig zurückzuerhalten, ist eine professionelle Reinigung nach Schweizer Standards mit Abnahmegarantie fast immer die beste Wahl.</p>
                <p className="text-gray-700 leading-relaxed font-semibold mb-8">Viele internationale Umzugsfirmen bieten diesen Service im Paket an, was die Koordination erheblich vereinfacht.</p>
                <ul className="space-y-4">{cleaningBenefits.map((item, i) => <ListItem key={i}>{item}</ListItem>)}</ul>
              </Section>
              
              <Section>
                <SectionTitle icon={HelpCircle} title="Häufig gestellte Fragen (FAQ)" />
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
                    Unverbindliche Frankreich-Offerten anfordern
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
                  Erfahrene Partner für Frankreich
                </h3>
                <img  alt="Ein Umzugswagen fährt durch eine französische Landschaft" className="w-full h-56 object-cover rounded-lg shadow-md mb-3" src="https://images.unsplash.com/photo-1552539618-1647f2950541" />
                <p className="text-sm text-gray-600 mt-2">Vergleichen Sie Offerten von qualifizierten Firmen, die die Routen und Bestimmungen für Umzüge nach Frankreich bestens kennen.</p>
              </div>
              <div
                className="bg-green-50 p-6 rounded-2xl shadow-lg border border-green-200"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center">
                  <Info size={24} className="mr-3" />
                  Wichtiger Hinweis: Anmeldung
                </h3>
                <p className="text-green-700">Vergessen Sie nicht, sich nach Ihrer Ankunft in Frankreich bei der lokalen 'Mairie' (Rathaus) und der zuständigen Präfektur anzumelden. Dies ist ein wichtiger Schritt für alle weiteren administrativen Prozesse.</p>
              </div>
            </aside>
          </div>
          <InternationalPageNavigation currentCountrySlug="umzug-nach-frankreich" />
        </div>
      </div>
    </>
  );
};

export default UmzugNachFrankreichPageClient;
