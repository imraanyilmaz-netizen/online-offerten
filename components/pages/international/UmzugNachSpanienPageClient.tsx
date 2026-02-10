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

const UmzugNachSpanienPageClient = () => {
  const canonicalPath = '/umzugsfirma/internationale-umzuege/umzug-nach-spanien';

  const metaTitle = "Umzug nach Spanien: Ihr Guide für Kosten & Planung 2025";
  const metaDescription = "Alles für Ihren Umzug von der Schweiz nach Spanien. Entdecken Sie Kosten, Tipps für Zoll & NIE, Checklisten und vergleichen Sie die besten Firmen für Umzug und Reinigung.";
  const metaKeywords = "umzug nach spanien, umzug schweiz spanien, umzugsfirma schweiz spanien, internationaler umzug spanien, umzug nach madrid, umzug nach barcelona, umzug nach valencia, umzugsfirma international, zügelfirma schweiz spanien, umzug schweiz nach spanien, umzugskosten schweiz spanien, umzugsfirma vergleichen spanien, günstiger umzug spanien, umzug nach spanien preise, umzug nach spanien kosten, umzugsfirma schweiz, internationaler umzug, internationale umzüge spanien";

  const costTable = [
    { size: "1-Zimmer-Wohnung (ca. 15-20 mÂ³)", cost: "2.800 – 4.500 CHF" },
    { size: "2.5-Zimmer-Wohnung (ca. 25-35 mÂ³)", cost: "4.200 – 7.000 CHF" },
    { size: "4.5-Zimmer-Wohnung (ca. 40-55 mÂ³)", cost: "6.500 – 11.000 CHF" },
    { size: "Haus / > 6 Zimmer (> 60 mÂ³)", cost: "ab 10.000 CHF" }
  ];

  const costFactors = [
    { text: "**Umzugsvolumen:** Der grösste Kostenfaktor. Je mehr Sie mitnehmen, desto teurer." },
    { text: "**Distanz & Maut:** Die lange Strecke und Mautgebühren in Frankreich und Spanien sind ein wesentlicher Punkt." },
    { text: "**Service-Level:** Nur Transport oder das Komplettpaket mit Packen, Montage und Reinigung?" },
    { text: "**Zugänglichkeit:** Enge Altstadtgassen oder Wohnungen ohne Aufzug ('ascensor') erhöhen den Aufwand." },
    { text: "**Zollabwicklung:** Der administrative Aufwand wird von der Spedition meist pauschal berechnet." },
    { text: "**Saison:** Umzüge in den Sommermonaten sind aufgrund der hohen Nachfrage oft teurer." }
  ];

  const movingChecklist = [
    "**3-4 Monate vorher:** Offerten von internationalen Umzugsfirmen einholen. Die NIE-Nummer (NÃºmero de IdentificaciÃ³n de Extranjero) beim spanischen Konsulat beantragen.",
    "**2 Monate vorher:** Umzugsfirma definitiv buchen. Arbeits- oder Mietvertrag in Spanien sichern.",
    "**1 Monat vorher:** Verträge in der Schweiz kündigen (Internet, Krankenkasse, etc.). Post-Nachsendeauftrag einrichten. Umzugsgut ausmisten und eine detaillierte Inventarliste (auf Spanisch) erstellen.",
    "**2 Wochen vorher:** Mit dem Packen beginnen. Kartons klar mit Zielraum und Inhalt beschriften. Termin für Wohnungsübergabe und Endreinigung in der Schweiz fixieren.",
    "**1 Woche vorher:** Wichtige Dokumente (Pässe, NIE-Bescheinigung, Verträge) separat und griffbereit halten. Adressänderungen bei Banken melden.",
    "**Nach dem Umzug:** Innerhalb von 3 Monaten beim Einwohnermeldeamt ('Ayuntamiento') anmelden ('empadronamiento')."
  ];

  const whyCompareItems = [
    {
      title: "Kosten drastisch senken",
      text: "Sparen Sie bis zu 40%, indem Sie Offerten von mehreren auf Spanien spezialisierten Firmen vergleichen."
    },
    {
      title: "Geprüfte Spanien-Profis",
      text: "Wir arbeiten nur mit Unternehmen, die den spanischen Zoll und die logistischen Herausforderungen kennen."
    },
    {
      title: "Umzug & Reinigung in Einem",
      text: "Buchen Sie Umzug und Endreinigung mit Abnahmegarantie im Paket für maximale Sorgenfreiheit."
    },
    {
      title: "Keine versteckten Kosten",
      text: "Transparente Offerten schützen Sie vor unerwarteten Gebühren für Zoll, Maut oder andere Aufschläge."
    }
  ];

  const faqs = [
    {
      question: "Kann die Umzugsfirma auch die Reinigung meiner alten Wohnung in der Schweiz übernehmen?",
      answer: "Ja, viele unserer Partnerfirmen bieten genau diesen Kombi-Service an! Sie können den Umzug nach Spanien und die Endreinigung Ihrer Schweizer Wohnung mit Abnahmegarantie als praktisches Gesamtpaket buchen. So haben Sie nur einen Vertragspartner und können sicher sein, dass die Wohnungsübergabe reibungslos verläuft. Erwähnen Sie diesen Wunsch einfach in Ihrer Offertenanfrage."
    },
    {
      question: "Was bedeutet die 'Abnahmegarantie' bei der Umzugsreinigung?",
      answer: "Die Abnahmegarantie sichert Ihnen zu, dass die Reinigungsfirma für eine erfolgreiche Wohnungsübergabe an Ihren Vermieter haftet. Sollten bei der Übergabe Reinigungsmängel beanstandet werden, muss die Firma kostenlos nachreinigen. Das gibt Ihnen 100%ige Sicherheit und erspart Ihnen jeglichen Stress."
    },
    {
      question: "Was ist der Unterschied zwischen NIE und 'Empadronamiento'?",
      answer: "Die **NIE** ('NÃºmero de IdentificaciÃ³n de Extranjero') ist Ihre persönliche Identifikationsnummer als Ausländer in Spanien und für alle rechtlichen und finanziellen Angelegenheiten (z.B. Kontoeröffnung, Arbeitsvertrag) unerlässlich. Das **'Empadronamiento'** ist die Anmeldung Ihres Wohnsitzes bei der Gemeinde ('Ayuntamiento'), ähnlich der Anmeldung in der Schweiz. Sie benötigen es unter anderem für die Anmeldung im Gesundheitssystem oder für die Schule Ihrer Kinder."
    },
    {
      question: "Kann ich mein Schweizer Auto in Spanien weiterfahren?",
      answer: "Für eine begrenzte Zeit ja. Wenn Sie Ihren Hauptwohnsitz nach Spanien verlegen, müssen Sie Ihr Auto jedoch ummelden. Dies muss in der Regel innerhalb von 6 Monaten geschehen. Der Prozess ('matriculaciÃ³n') beinhaltet technische Prüfungen und die Zahlung von Steuern. Es ist oft einfacher, dies über eine lokale Agentur ('gestorÃ­a') abzuwickeln."
    },
    {
      question: "Wie finde ich eine Wohnung in Spanien?",
      answer: "Beliebte Immobilienportale sind Idealista, Fotocasa und Pisos.com. Es ist oft ratsam, zunächst eine temporäre Unterkunft (z.B. über Airbnb) zu buchen und vor Ort nach einer langfristigen Wohnung zu suchen. Die Anforderungen für Mietverträge sind oft strenger als in der Schweiz (z.B. Arbeitsvertrag, Gehaltsnachweise)."
    }
  ];

  return (
    <>
      <div className="bg-gradient-to-b from-slate-50 via-gray-50 to-white">
        <section
          className="relative w-full bg-cover bg-center text-white"
        >
          <div className="absolute inset-0">
             <img alt="Hero image of Barcelona, Spain" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1587789202069-f57c8a434d03" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
          </div>
          <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6 text-center py-28 md:py-40">
            <div
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-shadow-lg">Â¡Hola EspaÃ±a! Ihr Umzug unter die Sonne</h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">Träumen Sie von Tapas, Fiestas und Meeresrauschen? Wir organisieren Ihren Umzug von der Schweiz nach Spanien – einfach, sicher und stressfrei.</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
            <main className="lg:col-span-2 bg-white p-6 md:p-10 rounded-2xl shadow-xl space-y-10">
              <Section className="border-t-0 pt-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Von den Alpen an die Costa del Sol: Ihr Umzug nach Spanien</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">Ein Umzug von der Schweiz nach Spanien ist der Traum vieler, die sich nach Sonne, einem entspannten Lebensstil und reicher Kultur sehnen. Doch der Weg ins neue Leben erfordert eine gründliche Vorbereitung. Die spanische Bürokratie, insbesondere die Beantragung der NIE-Nummer, sowie die Zollabwicklung stellen oft die grössten Hürden dar.</p>
                <p className="text-gray-700 leading-relaxed">Dieser Leitfaden ist Ihr Kompass für einen erfolgreichen Start. Wir beleuchten alle wichtigen Aspekte: von den Umzugskosten und der korrekten Zollanmeldung Ihres Hausrats bis hin zur Auswahl der perfekten Umzugsfirma, die Ihnen sogar die Reinigung der alten Wohnung in der Schweiz abnimmt. Unser Ziel ist es, Ihnen einen reibungslosen und kosteneffizienten Umzug zu ermöglichen.</p>
                 <p className="text-gray-700 leading-relaxed mt-4">Durch den Vergleich von spezialisierten Umzugsunternehmen stellen Sie sicher, dass Ihr Eigentum sicher und termingerecht in Madrid, Barcelona oder an der Küste ankommt. So können Sie sich entspannt auf das Wesentliche konzentrieren: das Geniessen des spanischen Lebensgefühls.</p>
              </Section>

              <Section>
                <SectionTitle icon={ShieldCheck} title="Clever vergleichen, entspannt ankommen" />
                <p className="text-gray-700 leading-relaxed mb-8">Die Kosten für einen Umzug nach Spanien können erheblich variieren. Ein transparenter Offertenvergleich ist unerlässlich, um das beste Preis-Leistungs-Verhältnis zu finden und einen Partner zu wählen, der Erfahrung mit den spanischen Gegebenheiten hat.</p>
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
                <SectionTitle icon={Home} title="Ihre Umzugsplanung: Schritt für Schritt nach Spanien" />
                <p className="text-gray-700 leading-relaxed mb-6">Eine strukturierte Planung ist der Schlüssel zu einem erfolgreichen Umzug nach Spanien. Beginnen Sie mehrere Monate im Voraus, um alle administrativen und logistischen Aufgaben ohne Hektik zu bewältigen.</p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-8">
                  <p className="text-blue-800">Ein professionelles Umzugsunternehmen ist eine grosse Entlastung. Es übernimmt nicht nur den Transport, sondern hilft auch bei der Erstellung der notwendigen Dokumente für den Zoll.</p>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Ihre Umzugs-Checkliste für Spanien:</h3>
                <ul className="space-y-4">{movingChecklist.map((item, i) => <ListItem key={i}>{item}</ListItem>)}</ul>
              </Section>

              <Section>
                <SectionTitle icon={FileText} title="Zoll und Bürokratie: Was Sie wissen müssen" />
                 <p className="text-gray-700 leading-relaxed mb-6">Da die Schweiz nicht zur EU gehört, muss Ihr gesamtes Umzugsgut beim spanischen Zoll (Aduana) angemeldet werden. Als Übersiedlungsgut kann Ihr Haushalt jedoch zoll- und steuerfrei eingeführt werden.</p>
                 <p className="text-gray-700 leading-relaxed mb-6">Voraussetzung dafür ist die offizielle Wohnsitzverlegung nach Spanien. Sie benötigen eine Bestätigung Ihrer Abmeldung in der Schweiz, Ihre NIE-Nummer und eine detaillierte, bewertete Inventarliste Ihrer Güter auf Spanisch.</p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                    <h4 className="font-bold text-yellow-900">Profi-Tipp: NIE-Nummer</h4>
                    <p className="text-yellow-800">Beantragen Sie Ihre NIE-Nummer so früh wie möglich! Ohne diese Identifikationsnummer für Ausländer können Sie in Spanien weder ein Bankkonto eröffnen noch einen Miet- oder Arbeitsvertrag unterzeichnen. Die Bearbeitung kann mehrere Wochen dauern.</p>
                </div>
              </Section>

              <Section>
                <SectionTitle title="Kostenkalkulation: Was kostet ein Umzug nach Spanien?" />
                <p className="text-gray-700 leading-relaxed mb-8">Die Kosten für einen Umzug von der Schweiz nach Spanien hängen stark vom Volumen, der Distanz (z.B. Genf-Barcelona vs. Zürich-MÃ¡laga) und dem Servicelevel ab. Die folgende Tabelle bietet eine grobe Orientierung.</p>
                
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Richtpreise für einen Umzug nach Spanien</h3>
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
                  <p className="text-xs text-gray-500 mt-4 italic">*Diese Preise sind Schätzungen. Die tatsächlichen Kosten variieren je nach Anbieter, Saison und Zusatzleistungen wie Reinigung oder De-/Montage.</p>
                </div>

                <h3 className="text-2xl font-semibold text-gray-800 mt-12 mb-6">Was den Endpreis beeinflusst:</h3>
                <ul className="space-y-4 columns-1 md:columns-2">{costFactors.map((item, i) => <ListItem key={i}>{item.text}</ListItem>)}</ul>
              </Section>
              
              <Section>
                <SectionTitle icon={HelpCircle} title="Häufig gestellte Fragen (FAQ) zum Umzug nach Spanien" />
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
                    Jetzt Spanien-Umzugsofferten erhalten
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
                  Profis für den sonnigen Süden
                </h3>
                <img alt="Ein Umzugswagen parkt an einer spanischen Küstenstrasse" className="w-full h-56 object-cover rounded-lg shadow-md mb-3" src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4" />
                <p className="text-sm text-gray-600 mt-2">Vergleichen Sie Firmen, die Erfahrung mit langen Distanzen und den spanischen Zollbestimmungen haben.</p>
              </div>
              <div
                className="bg-green-50 p-6 rounded-2xl shadow-lg border border-green-200"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center">
                  <Info size={24} className="mr-3" />
                  Wichtiger Tipp: NIE-Nummer
                </h3>
                <p className="text-green-700">Kümmern Sie sich frühzeitig um die NIE-Nummer. Ohne sie geht in Spanien fast nichts! Planen Sie mehrere Wochen für die Bearbeitung ein.</p>
              </div>
            </aside>
          </div>
          <InternationalPageNavigation currentCountrySlug="umzug-nach-spanien" />
        </div>
      </div>
    </>
  );
};

export default UmzugNachSpanienPageClient;


