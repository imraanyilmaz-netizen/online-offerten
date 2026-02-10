'use client'

import React from 'react';
import Link from 'next/link';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, FileText, Briefcase, ShieldCheck, Home, Landmark, CreditCard, Heart } from 'lucide-react';
import InternationalPageNavigation from '@/components/international/InternationalPageNavigation';

const Section = ({ children, className = '' }: any) => (
  <section
    className={`py-8 md:py-12 border-t border-gray-100 ${className}`}
  >
    {children}
  </section>
);

const SectionTitle = ({ icon, title }: any) => {
  const Icon = icon;
  return (
    <h2 className="heading-2 flex items-center">
      {Icon && <Icon size={32} className="mr-4 text-green-600" />}
      {title}
    </h2>
  );
};

const ListItem = ({ children }: any) => (
  <li className="flex items-start py-1">
    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
    <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: children }} />
  </li>
);

const UmzugNachDeutschlandPageClient = () => {
  const canonicalPath = '/umzugsfirma/internationale-umzuege/umzug-nach-deutschland';

  const metaTitle = "Umzug nach Deutschland | Umzugsfirmen aus der Schweiz vergleichen";
  const metaDescription = "Planen Sie Ihren Umzug von der Schweiz nach Deutschland? Vergleichen Sie hier professionelle Umzugsfirmen für Privatumzug, Geschäftsumzug, Reinigung und Entsorgung. Holen Sie sich jetzt kostenlose Offerten.";
  const metaKeywords = "umzug nach deutschland, umzug schweiz deutschland, umzugsfirma schweiz deutschland, internationaler umzug deutschland, umzug nach berlin, umzug nach münchen, umzug nach hamburg, umzug nach frankfurt, umzugsfirma international, zügelfirma schweiz deutschland, umzug schweiz nach deutschland, umzugskosten schweiz deutschland, umzugsfirma vergleichen deutschland, günstiger umzug deutschland, umzug nach deutschland preise, umzug nach deutschland kosten, umzugsfirma schweiz, internationaler umzug, internationale umzüge deutschland";

  const costTable = [
    { size: "1-Zimmer-Wohnung", cost: "CHF 2.500 – 2.800" },
    { size: "3-Zimmer-Wohnung", cost: "CHF 3.200 – 3.800" },
    { size: "5-Zimmer-Haus", cost: "CHF 5.000 – 5.800" }
  ];

  const movingSteps = [
    {
      title: "Umzugsanfrage online ausfüllen",
      text: "Geben Sie alle Details zu Ihrem geplanten Umzug nach Deutschland an: Wohnung, Möbel, Umzugskartons und gewünschte Zusatzservices wie Einlagerung."
    },
    {
      title: "Bis zu 5 geprüfte Umzugsunternehmen erstellen Offerten",
      text: "Kostenlos und unverbindlich erhalten Sie massgeschneiderte Angebote inklusive Angabe aller Kosten und Leistungen."
    },
    {
      title: "Vergleichen und stressfrei umziehen",
      text: "Wählen Sie die beste Umzugsfirma und profitieren Sie von professioneller Organisation beim Transport Ihres Übersiedlungsguts über die Grenze."
    }
  ];

  const whyCompareItems = [
    {
      title: "âœ… Geprüfte Umzugsunternehmen mit Erfahrung",
      text: "Alle Umzugsfirmen sind auf internationale Umzüge von der Schweiz nach Deutschland spezialisiert und kennen die Einfuhrbestimmungen und Zollvorschriften."
    },
    {
      title: "âœ… Bis zu 5 kostenlose Offerten in 24–48 Stunden",
      text: "Schnelle Bearbeitung Ihrer Anfrage durch erfahrene Dienstleister für Ihren geplanten Umzug ins Ausland."
    },
    {
      title: "âœ… Bis zu 40% Kosten sparen",
      text: "Direkter Vergleich von Preis und Service verschiedener Anbieter sichert Ihnen das beste Angebot für Ihre Übersiedlung."
    }
  ];

  return (
    <>
      
      <div className="bg-gradient-to-b from-slate-50 via-gray-50 to-white">
        <section
          className="relative w-full bg-cover bg-center text-white"
        >
          <div className="absolute inset-0">
             <img alt="Hero image of Berlin" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1569085938838-68ca30b9c10e" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
          </div>
          <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6 text-center py-24 md:py-32">
            <div
            >
              <h1 className="heading-1-white mb-4">Umzug nach Deutschland aus der Schweiz – Kostenlos bis zu 5 Offerten von geprüften Umzugsunternehmen erhalten</h1>
              <p className="text-body-white max-w-3xl mx-auto">Von der Planung über die Kosten bis zur Durchführung – vergleichen Sie die besten Umzugsfirmen für Ihren reibungslosen Start in Deutschland.</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <div className="items-start">
            <main className="bg-white p-6 md:p-10 rounded-2xl shadow-xl space-y-8">
              <Section className="border-t-0 pt-0">
                <h2 className="heading-2">Ihr Umzug nach Deutschland leicht gemacht: Professionelle Umzugsfirmen vergleichen und bis zu 40% sparen</h2>
                <p className="text-body mb-4">Der Umzug von der Schweiz nach Deutschland bringt besondere Herausforderungen mit sich: Als Drittland ausserhalb der Europäischen Union erfordert die Übersiedlung spezifische Zollformalitäten, sorgfältige Planung der Transportwege und zahlreiche administrative Schritte. Vom Ausfüllen des Zollformulars über die Inventarliste bis zur Anmeldung beim deutschen Einwohnermeldeamt – die Vorschriften und Dokumente können schnell überwältigend werden.</p>
                <p className="text-body">Die Lösung: Über Online-Offerten.ch erhalten Sie kostenlos bis zu 5 Offerten von geprüften Umzugsunternehmen, die auf Auslandsumzüge zwischen der Schweiz und Deutschland spezialisiert sind. Diese Umzugsprofis kennen alle Zollbestimmungen, übernehmen die Formalitäten und sorgen für einen reibungslosen Transport Ihres Hausrats.</p>
              </Section>

              <Section>
                <SectionTitle icon={ShieldCheck} title="Warum Online-Offerten.ch für Ihren Deutschland-Umzug wählen?" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {whyCompareItems.map((item, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <h4 className="heading-4 mb-2">{item.title}</h4>
                            <p className="text-body">{item.text}</p>
                        </div>
                    ))}
                </div>
              </Section>
              
              <Section>
                <SectionTitle icon={Home} title="So funktioniert Ihr Umzug nach Deutschland" />
                <div className="space-y-6">
                    {movingSteps.map((step, i) => (
                         <div key={i} className="flex items-start">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl mr-4">{i + 1}</div>
                            <div>
                                <h4 className="heading-4 mb-1">{step.title}</h4>
                                <p className="text-body">{step.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
              </Section>

              <Section>
                <SectionTitle icon={FileText} title="Zollformalitäten und benötigte Dokumente" />
                <p className="text-body mb-6">Beim Umzug von der Schweiz nach Deutschland verlassen Sie das Schweizer Zollgebiet und führen Ihr Umzugsgut in die EU ein. Folgende Dokumente benötigen Sie für die Einfuhr:</p>
                <div className="space-y-4 mb-6">
                  {[
                    { icon: FileText, text: "Formular 0350 der deutschen Zollbehörde – Zollanmeldung für Übersiedlungsgut aus einem Drittland" },
                    { icon: Landmark, text: "Abmeldebestätigung vom Schweizer Einwohnermeldeamt als Nachweis des Wohnsitzwechsels" },
                    { icon: Briefcase, text: "Detaillierte Inventarliste aller Gegenstände, Möbel und Sachen mit Angabe des ungefähren Wertes" },
                    { icon: CreditCard, text: "Reisepass oder Personalausweis als Identitätsnachweis bei der Einreise" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <item.icon className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
                <p className="text-body">Besondere Voraussetzungen gelten für Fahrzeuge, Waffen und gewerblich genutzte Waren. Die Regel für zollfreie Ausfuhr: Ihr Hausrat muss mindestens 6 Monate in Ihrem Besitz gewesen sein.</p>
              </Section>

              <Section>
                <SectionTitle icon={Home} title="Administrative Schritte in Deutschland" />
                <p className="text-body mb-6">Nach der Einreise erwarten Sie folgende behördliche Schritte:</p>
                <div className="space-y-4">
                  {[
                    { icon: Landmark, text: "Anmeldung beim Einwohnermeldeamt innerhalb einer Woche – Meldepflicht für jede Person mit Kopie des Mietvertrags" },
                    { icon: ShieldCheck, text: "Aufenthaltstitel beantragen – Auch als Schweizer Bürger für Aufenthalt über 3 Monate erforderlich" },
                    { icon: CreditCard, text: "Steuerliche Anmeldung beim Finanzamt – Bei Arbeitsvertrag in Deutschland obligatorisch" },
                    { icon: Heart, text: "Krankenkassenwechsel von Schweizer zu deutschem System organisieren" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <item.icon className="w-6 h-6 text-green-600 mr-4 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </Section>

              <Section>
                <SectionTitle title="Umzugskosten von der Schweiz nach Deutschland" />
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-300">
                        <th className="py-3 font-semibold text-gray-700">Wohnungsgrösse</th>
                        <th className="py-3 font-semibold text-gray-700 text-right">Typische Kosten</th>
                      </tr>
                    </thead>
                    <tbody>
                      {costTable.map((row, i) => (
                        <tr key={i} className="border-b border-slate-200 last:border-0">
                          <td className="py-3 text-gray-700">{row.size}</td>
                          <td className="py-3 text-gray-800 font-medium text-right">{row.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-body mt-6">Die Kosten variieren je nach Distanz zum Zielort, Maut auf der Strecke, gewünschten Zusatzservices und Verpackungsmaterial. <strong>Tipp:</strong> Durch den Vergleich mehrerer Offerten sparen unsere Kunden durchschnittlich 25–40% bei gleicher Leistung.</p>
              </Section>

              <Section>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 text-center">
                  <h2 className="heading-2 mb-4">Jetzt kostenlose Umzugsofferten anfordern</h2>
                  <p className="text-body mb-6 max-w-2xl mx-auto">Starten Sie Ihre Planung für den Umzug nach Deutschland noch heute. Erhalten Sie bis zu 5 kostenlose Offerten von geprüften Umzugsunternehmen mit Erfahrung bei internationalen Umzügen.</p>
                  <Button asChild className="bg-green-600 hover:bg-green-700 text-white group px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-lg">
                    <Link href="/kostenlose-offerte-anfordern?service=international">
                      Kostenlose Offerten für Ihren Deutschland-Umzug anfordern
                      <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1.5" />
                    </Link>
                  </Button>
                  <p className="text-sm text-gray-500 mt-4">100% kostenlos und unverbindlich. Bearbeitung Ihrer Anfrage innerhalb von 24–48 Stunden.</p>
                  <p className="text-body mt-6 max-w-2xl mx-auto">Vertrauen Sie auf geprüfte Umzugsprofis für Ihren Umzug von der Schweiz nach Deutschland – von der Organisation über die Zollstelle bis zu Ihrem neuen Zuhause.</p>
                </div>
              </Section>
            </main>
          </div>
          <InternationalPageNavigation currentCountrySlug="umzug-nach-deutschland" />
        </div>
      </div>
    </>
  );
};

export default UmzugNachDeutschlandPageClient;


