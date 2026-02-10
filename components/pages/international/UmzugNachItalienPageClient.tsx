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

const UmzugNachItalienPageClient = () => {
  const canonicalPath = '/umzugsfirma/internationale-umzuege/umzug-nach-italien';

  const metaTitle = "Umzug nach Italien: Ihr Guide für Kosten & Planung 2025";
  const metaDescription = "Alles für Ihren Umzug von der Schweiz nach Italien. Entdecken Sie Kosten, Zolltipps, Checklisten und vergleichen Sie die besten Umzugsfirmen für einen stressfreien Start in 'La Dolce Vita'.";
  const metaKeywords = "umzug nach italien, umzug schweiz italien, umzugsfirma schweiz italien, internationaler umzug italien, umzug nach rom, umzug nach mailand, umzug nach neapel, umzugsfirma international, zügelfirma schweiz italien, umzug schweiz nach italien, umzugskosten schweiz italien, umzugsfirma vergleichen italien, günstiger umzug italien, umzug nach italien preise, umzug nach italien kosten, umzugsfirma schweiz, internationaler umzug, internationale umzüge italien";

  const costTable = [
    { size: "1-Zimmer-Wohnung (ca. 15-20 m³)", cost: "2.200 – 3.800 CHF" },
    { size: "2.5-Zimmer-Wohnung (ca. 25-35 m³)", cost: "3.500 – 6.000 CHF" },
    { size: "4.5-Zimmer-Wohnung (ca. 40-55 m³)", cost: "5.800 – 9.000 CHF" },
    { size: "Haus / > 6 Zimmer (> 60 m³)", cost: "ab 8.500 CHF" }
  ];

  const costFactors = [
    { text: "**Volumen des Umzugsguts:** Der wichtigste Faktor für die Preisberechnung." },
    { text: "**Distanz und Maut:** Die italienischen Autobahngebühren ('pedaggio') können die Kosten erheblich beeinflussen." },
    { text: "**Service-Level:** Vom reinen Transport bis zum Full-Service-Paket ist alles möglich." },
    { text: "**Zugänglichkeit:** Enge Gassen in Altstädten oder Wohnungen ohne Lift ('ascensore') erfordern mehr Aufwand." },
    { text: "**Zollabwicklung:** Der administrative Aufwand wird oft als Pauschale berechnet." },
    { text: "**Verpackungsmaterial:** Professionelles Verpacken durch die Firma kostet extra." },
    { text: "**Spezialtransporte:** Ein Klavier oder Kunstwerke erfordern besondere Sorgfalt und Ausrüstung." },
    { text: "**Saison:** Umzüge im Sommer sind tendenziell teurer als in den Wintermonaten." }
  ];

  const movingChecklist = [
    "**3-4 Monate vorher:** Offerten von internationalen Umzugsfirmen einholen und vergleichen. Arbeits- oder Mietvertrag für Italien sichern.",
    "**2 Monate vorher:** Umzugsfirma fest buchen. Beantragung des 'Codice Fiscale' (italienische Steuernummer) in die Wege leiten.",
    "**1 Monat vorher:** Verträge in der Schweiz (Internet, Handy, Versicherungen) kündigen. Nachsendeauftrag einrichten. Umzugsgut sortieren und eine detaillierte Inventarliste erstellen.",
    "**2 Wochen vorher:** Mit dem Packen beginnen. Kartons klar und auf Italienisch beschriften (z.B. 'Cucina', 'Camera da letto'). Termin für die Wohnungsübergabe fixieren.",
    "**1 Woche vorher:** Adressänderungen bei Banken und Behörden melden. Eine Tasche mit allen wichtigen Dokumenten und persönlichen Gegenständen für die Reise packen.",
    "**Umzugstag:** Zählerstände in der alten Wohnung ablesen. Kontaktperson der Umzugsfirma für die Ankunft in Italien bereithalten."
  ];

  const whyCompareItems = [
    {
      title: "Erhebliche Kostenersparnis",
      text: "Profitieren Sie von den Preisunterschieden und sparen Sie bis zu 40% bei Ihren Umzugskosten."
    },
    {
      title: "Geprüfte Italien-Experten",
      text: "Wir arbeiten nur mit Firmen zusammen, die Erfahrung mit dem italienischen Zoll und den lokalen Gegebenheiten haben."
    },
    {
      title: "Leistungen nach Mass",
      text: "Ob reiner Transport oder das Rundum-sorglos-Paket mit Montage und Endreinigung – finden Sie den perfekten Service."
    },
    {
      title: "Keine bösen Überraschungen",
      text: "Transparente Offerten schützen Sie vor versteckten Kosten für Zoll, Maut oder andere Gebühren."
    }
  ];

  const faqs = [
    {
      question: "Was ist der 'Codice Fiscale' und wofür brauche ich ihn?",
      answer: "Der 'Codice Fiscale' ist die persönliche italienische Steuernummer. Sie benötigen ihn für fast alle administrativen Vorgänge in Italien: bei der Eröffnung eines Bankkontos, beim Abschluss eines Mietvertrags, für den Gesundheitsdienst und vieles mehr. Sie können ihn bereits vor Ihrem Umzug beim zuständigen italienischen Konsulat in der Schweiz beantragen."
    },
    {
      question: "Wie funktioniert die Anmeldung in Italien?",
      answer: "Innerhalb von 20 Tagen nach Ihrer Ankunft müssen Sie sich bei der Meldebehörde ('Ufficio Anagrafe') Ihrer neuen Wohngemeinde ('Comune') anmelden. Dieser Vorgang wird 'Iscrizione anagrafica' genannt. Hierfür benötigen Sie Ihren Pass, den 'Codice Fiscale' und einen Nachweis über Ihren Wohnsitz (z.B. Mietvertrag)."
    },
    {
      question: "Kann ich mein Auto problemlos nach Italien mitnehmen?",
      answer: "Ja, aber Sie müssen es innerhalb von drei Monaten nach Ihrer Anmeldung in Italien ummelden. Dieser Vorgang ('immatricolazione') kann bürokratisch sein. Sie benötigen unter anderem die europäische Konformitätsbescheinigung (COC) und müssen die Schweizer Kennzeichen abgeben. Eine spezialisierte Agentur ('agenzia di pratiche auto') kann dabei helfen."
    },
    {
      question: "Was sollte ich über das Packen für einen Auslandumzug wissen?",
      answer: "Verwenden Sie stabile Umzugskartons und packen Sie diese nicht zu schwer (maximal 15-20 kg). Beschriften Sie jeden Karton deutlich mit dem Inhalt und dem Zielraum auf Deutsch und Italienisch (z.B. 'Küche / Fragile' -> 'Cucina / Fragile'). Erstellen Sie eine detaillierte Inventarliste, die auch für den Zoll wichtig ist. Wertgegenstände und persönliche Dokumente sollten Sie immer persönlich transportieren."
    },
    {
      question: "Wie ist das italienische Gesundheitssystem organisiert?",
      answer: "Nach Ihrer Anmeldung in der Gemeinde können Sie sich beim nationalen Gesundheitsdienst ('Servizio Sanitario Nazionale', SSN) registrieren. Dazu gehen Sie zur lokalen Gesundheitsbehörde ('Azienda Sanitaria Locale', ASL). Nach der Registrierung erhalten Sie Ihre Gesundheitskarte ('Tessera Sanitaria') und können einen Hausarzt ('medico di base') wählen."
    }
  ];

  return (
    <>
      <div className="bg-gradient-to-b from-slate-50 via-gray-50 to-white">
        <section
          className="relative w-full bg-cover bg-center text-white"
        >
          <div className="absolute inset-0">
             <img alt="Hero image of Rome with Colosseum" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1552832230-c0197dd311b5" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
          </div>
          <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6 text-center py-28 md:py-40">
            <div
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-shadow-lg">Benvenuti in Italia: Ihr Umzug ins Land des Genusses</h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">Träumen Sie vom Leben unter der italienischen Sonne? Wir begleiten Sie auf Ihrem Weg von der Schweiz nach Italien – mit allem, was Sie für einen reibungslosen Umzug wissen müssen.</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
            <main className="lg:col-span-2 bg-white p-6 md:p-10 rounded-2xl shadow-xl space-y-10">
              <Section className="border-t-0 pt-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Von den Alpen ans Mittelmeer: Ihr Umzug nach Italien</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">Ein Umzug von der Schweiz nach Italien verspricht 'La Dolce Vita' – eine Mischung aus reicher Geschichte, unvergleichlicher Küche und atemberaubender Natur. Doch der Weg dorthin erfordert eine umsichtige Planung. Die Bürokratie kann herausfordernd sein, und die logistischen Aspekte eines internationalen Umzugs, insbesondere die Zollabwicklung, müssen sorgfältig gemeistert werden.</p>
                <p className="text-gray-700 leading-relaxed">Dieser Leitfaden ist Ihr zuverlässiger Partner auf diesem Weg. Wir beleuchten alle entscheidenden Etappen: von einer realistischen Kosteneinschätzung über die Tücken der italienischen Bürokratie (Stichwort 'Codice Fiscale') bis hin zur Wahl des perfekten Umzugsunternehmens. Unser Ziel ist es, Ihnen zu helfen, Fallstricke zu vermeiden, Kosten zu sparen und Ihren Start in Italien so angenehm wie möglich zu gestalten.</p>
                 <p className="text-gray-700 leading-relaxed mt-4">Durch den Vergleich von qualifizierten Umzugsspediteuren, die auf die Route Schweiz-Italien spezialisiert sind, stellen Sie sicher, dass Ihr Hab und Gut sicher und pünktlich ankommt. So können Sie sich auf das Wesentliche konzentrieren: den ersten Espresso in Ihrer neuen Nachbarschaftsbar, das Erkunden antiker Gassen oder das Rauschen des Meeres.</p>
              </Section>

              <Section>
                <SectionTitle icon={ShieldCheck} title="Clever starten: Warum sich der Vergleich von Umzugsfirmen auszahlt" />
                <p className="text-gray-700 leading-relaxed mb-8">Ein Umzug nach Italien kann je nach Anbieter stark im Preis variieren. Ein sorgfältiger Vergleich von Offerten ist der effektivste Weg, um das beste Preis-Leistungs-Verhältnis zu finden und sicherzustellen, dass das Unternehmen die spezifischen Anforderungen für Italien-Umzüge erfüllt.</p>
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
                <SectionTitle icon={Home} title="Die Umzugsplanung: Schritt für Schritt nach Italien" />
                <p className="text-gray-700 leading-relaxed mb-6">Eine gute Organisation ist entscheidend für einen stressfreien Umzug. Die Planung sollte frühzeitig beginnen, um alle administrativen und logistischen Aufgaben ohne Zeitdruck zu erledigen.</p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-8">
                  <p className="text-blue-800">Ein professionelles Umzugsunternehmen nimmt Ihnen viele Sorgen ab, von der sicheren Verpackung bis zur Zollanmeldung. Ihre persönliche Vorbereitung bleibt jedoch der Schlüssel zum Erfolg.</p>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Ihre Umzugs-Checkliste für Italien:</h3>
                <ul className="space-y-4">{movingChecklist.map((item, i) => <ListItem key={i}>{item}</ListItem>)}</ul>
              </Section>

              <Section>
                <SectionTitle icon={FileText} title="Zoll (Dogana): Was Sie für die Einfuhr wissen müssen" />
                 <p className="text-gray-700 leading-relaxed mb-6">Da die Schweiz kein EU-Mitglied ist, muss Ihr gesamtes Umzugsgut beim italienischen Zoll angemeldet werden. Unter bestimmten Voraussetzungen kann Ihr Haushalt als 'massserizie di trasloco' (Umzugsgut) zoll- und mehrwertsteuerfrei eingeführt werden.</p>
                 <p className="text-gray-700 leading-relaxed mb-6">Dafür müssen Sie Ihren Hauptwohnsitz nachweislich nach Italien verlegen, und die eingeführten Güter müssen sich seit mindestens sechs Monaten in Ihrem Besitz befinden. Eine genaue, bewertete Inventarliste (in zweifacher Ausfertigung, auf Italienisch) ist zwingend erforderlich.</p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <h4 className="font-bold text-yellow-900">Bürokratie-Tipp</h4>
                    <p className="text-yellow-800">Beauftragen Sie Ihre Umzugsfirma mit der Zollabwicklung. Spezialisierte Unternehmen kennen die genauen Verfahren, erstellen die erforderlichen Dokumente (wie die 'dichiarazione doganale') und sorgen für eine schnelle Abfertigung. Das erspart Ihnen viel Stress mit den italienischen Behörden.</p>
                </div>
              </Section>

              <Section>
                <SectionTitle title="Die Kosten: Was kostet ein Umzug nach Italien?" />
                <p className="text-gray-700 leading-relaxed mb-8">Die Kosten für einen Umzug von der Schweiz nach Italien werden von mehreren Faktoren beeinflusst: dem Volumen des Umzugsguts, der Entfernung (z.B. Zürich-Mailand vs. Genf-Sizilien), dem Serviceumfang und der Zugänglichkeit der Wohnorte. Die folgende Tabelle bietet eine grobe Kostenschätzung.</p>
                
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Richtpreise für einen Umzug nach Italien</h3>
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
                  <p className="text-xs text-gray-500 mt-4 italic">*Diese Preise sind Schätzungen. Die tatsächlichen Kosten hängen stark vom Anbieter, der Saison und den gewählten Zusatzleistungen ab.</p>
                </div>

                <h3 className="text-2xl font-semibold text-gray-800 mt-12 mb-6">Was den Endpreis beeinflusst:</h3>
                <ul className="space-y-4 columns-1 md:columns-2">{costFactors.map((item, i) => <ListItem key={i}>{item.text}</ListItem>)}</ul>
              </Section>
              
              <Section>
                <SectionTitle icon={HelpCircle} title="Häufig gestellte Fragen (FAQ) zum Umzug nach Italien" />
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
                    Jetzt Italien-Umzugsofferten erhalten
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
                  Profis für den Weg nach Süden
                </h3>
                <img alt="Ein Umzugswagen in einer malerischen italienischen Gasse" className="w-full h-56 object-cover rounded-lg shadow-md mb-3" src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9" />
                <p className="text-sm text-gray-600 mt-2">Vergleichen Sie Firmen, die sich mit den Besonderheiten von Umzügen nach Italien auskennen – von der Maut bis zur Bürokratie.</p>
              </div>
              <div
                className="bg-green-50 p-6 rounded-2xl shadow-lg border border-green-200"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center">
                  <Info size={24} className="mr-3" />
                  Wichtiger Tipp: Codice Fiscale
                </h3>
                <p className="text-green-700">Beantragen Sie Ihren 'Codice Fiscale' so früh wie möglich beim italienischen Konsulat. Ohne diese Steuernummer sind viele grundlegende Schritte in Italien blockiert.</p>
              </div>
            </aside>
          </div>
          <InternationalPageNavigation currentCountrySlug="umzug-nach-italien" />
        </div>
      </div>
    </>
  );
};

export default UmzugNachItalienPageClient;


