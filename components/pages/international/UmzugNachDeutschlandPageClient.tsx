'use client'

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, FileText, Briefcase, Sparkles, Trash2, ShieldCheck, Home, Info, Truck } from 'lucide-react';
import InternationalPageNavigation from '@/components/international/InternationalPageNavigation';

const Section = ({ children, className = '' }: any) => (
  <motion.section
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.6 }}
    className={`py-8 md:py-12 border-t border-gray-100 ${className}`}
  >
    {children}
  </motion.section>
);

const SectionTitle = ({ icon, title }: any) => {
  const Icon = icon;
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center">
      <Icon size={32} className="mr-4 text-green-600" />
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
  const canonicalPath = '/umzug-nach-deutschland';

  const metaTitle = "Umzug nach Deutschland | Umzugsfirmen aus der Schweiz vergleichen";
  const metaDescription = "Planen Sie Ihren Umzug von der Schweiz nach Deutschland? Vergleichen Sie hier professionelle Umzugsfirmen für Privatumzug, Geschäftsumzug, Reinigung und Entsorgung. Holen Sie sich jetzt kostenlose Offerten.";
  const metaKeywords = "umzug nach deutschland, umzug schweiz deutschland, umzugsfirma schweiz deutschland, internationaler umzug deutschland, umzug nach berlin, umzug nach münchen, umzug nach hamburg, umzug nach frankfurt, umzugsfirma international, zügelfirma schweiz deutschland, umzug schweiz nach deutschland, umzugskosten schweiz deutschland, umzugsfirma vergleichen deutschland, günstiger umzug deutschland, umzug nach deutschland preise, umzug nach deutschland kosten, umzugsfirma schweiz, internationaler umzug, internationale umzüge deutschland";

  const costTable = [
    { size: "1-2 Zimmer (ca. 15-25 m³)", cost: "1.800 – 3.200 CHF" },
    { size: "3 Zimmer (ca. 30-40 m³)", cost: "3.000 – 5.500 CHF" },
    { size: "4-5 Zimmer (ca. 45-60 m³)", cost: "4.800 – 7.500 CHF" },
    { size: "Haus / >6 Zimmer (>65 m³)", cost: "ab 7.000 CHF" }
  ];

  const costFactors = [
    "**Volumen des Umzugsguts:** Je mehr Sie mitnehmen, desto höher die Kosten.",
    "**Distanz:** Die Entfernung zwischen Lade- und Entladeort ist ein Hauptfaktor.",
    "**Zusatzleistungen:** Verpackungsservice, Möbelmontage, Klaviertransport.",
    "**Zugänglichkeit:** Stockwerk, Liftverfügbarkeit, Parkmöglichkeiten für den LKW.",
    "**Zollabwicklung:** Gebühren und administrativer Aufwand.",
    "**Saison:** Umzüge in der Hochsaison (Sommer) können teurer sein.",
    "**Versicherung:** Der Abschluss einer Transportversicherung ist empfehlenswert."
  ];

  const movingSteps = [
    {
      title: "Planung & Inventarliste",
      text: "Erstellen Sie eine detaillierte Liste aller zu transportierenden Gegenstände. Dies ist die Grundlage für eine genaue Offerte."
    },
    {
      title: "Zollformalitäten klären",
      text: "Für den Umzug von der Schweiz (Nicht-EU) nach Deutschland (EU) müssen Sie Umzugsgut beim Zoll deklarieren. Eine professionelle Firma übernimmt dies für Sie."
    },
    {
      title: "Transport & Logistik",
      text: "Die Firma organisiert den passenden LKW, die sichere Verladung und den Transport Ihrer Güter an den neuen Wohn- oder Geschäftssitz."
    }
  ];

  const cleaningBenefits = [
    "**Abnahmegarantie:** Das Reinigungsunternehmen ist bei der Wohnungsübergabe anwesend und führt bei Beanstandungen eine kostenlose Nachreinigung durch.",
    "**Zeitersparnis:** Sie müssen sich nicht selbst um die aufwendige Reinigung kümmern.",
    "**Professionelles Ergebnis:** Erfahrene Reinigungsteams wissen genau, worauf Vermieter achten.",
    "**Komplettservice:** Oft können Sie Umzug und Reinigung aus einer Hand buchen und so von Paketpreisen profitieren."
  ];

  const disposalServices = [
    "Fachgerechte Entsorgung von Sperrmüll",
    "Räumung von Kellern und Dachböden",
    "Demontage und Abtransport alter Möbel",
    "Recycling von Elektroschrott und anderen Materialien"
  ];

  const whyCompareItems = [
    {
      title: "Erhebliche Kostenersparnis",
      text: "Die Preisunterschiede zwischen den Anbietern können erheblich sein. Durch den Vergleich mehrerer Offerten können Sie bis zu 40% der Umzugskosten sparen."
    },
    {
      title: "Geprüfte Qualität finden",
      text: "Wir listen nur verifizierte und bewertete Umzugsunternehmen. So stellen Sie sicher, dass Ihr Eigentum in professionellen Händen ist."
    },
    {
      title: "Passende Dienstleistungen",
      text: "Finden Sie Firmen, die genau die Dienstleistungen anbieten, die Sie benötigen – vom reinen Transport über die Endreinigung bis zur kompletten Räumung."
    },
    {
      title: "Versteckte Kosten vermeiden",
      text: "Detaillierte Offerten helfen Ihnen, alle potenziellen Kosten wie Zollgebühren, Versicherungen und Zusatzleistungen im Voraus zu erkennen."
    }
  ];

  return (
    <>
      
      <div className="bg-gradient-to-b from-slate-50 via-gray-50 to-white">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full bg-cover bg-center text-white"
        >
          <div className="absolute inset-0">
             <img alt="Hero image of Berlin" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1569085938838-68ca30b9c10e" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
          </div>
          <div className="relative z-10 container mx-auto max-w-navbar px-4 md:px-6 text-center py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-shadow-lg">Umzug nach Deutschland: Ihr kompletter Leitfaden</h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">Von der Planung über die Kosten bis zur Durchführung – vergleichen Sie die besten Umzugsfirmen für Ihren reibungslosen Start in Deutschland.</p>
            </motion.div>
          </div>
        </motion.section>

        <div className="container mx-auto max-w-navbar px-4 md:px-6 py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
            <main className="lg:col-span-2 bg-white p-6 md:p-10 rounded-2xl shadow-xl space-y-8">
              <Section className="border-t-0 pt-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Von der Schweiz nach Deutschland: Sicher und effizient umziehen</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">Ein Umzug von der Schweiz nach Deutschland ist ein grosser Schritt, der eine sorgfältige Planung erfordert. Ob es ein Privatumzug in eine neue Stadt oder ein kompletter Geschäftsumzug ist, die Komplexität eines internationalen Umzugs sollte nicht unterschätzt werden. Zollformalitäten, Transportlogistik und die Suche nach einem vertrauenswürdigen Partner sind entscheidend. Hier erfahren Sie alles, was Sie für einen erfolgreichen Umzug wissen müssen und wie Sie durch den Vergleich von professionellen Umzugsfirmen Zeit und Geld sparen können.</p>
                <p className="text-gray-700 leading-relaxed">Unser Portal hilft Ihnen, schnell und unkompliziert geprüfte Unternehmen zu finden, die auf internationale Umzüge spezialisiert sind. So können Sie sich auf das Wesentliche konzentrieren: Ihr neues Leben in Deutschland.</p>
              </Section>

              <Section>
                <SectionTitle icon={ShieldCheck} title="Warum Sie Umzugsfirmen vergleichen sollten" />
                <p className="text-gray-700 leading-relaxed mb-6">Der Vergleich von Offerten ist der wichtigste Schritt, um die Kosten und die Qualität Ihres Umzugs zu optimieren. Jedes Unternehmen hat unterschiedliche Preisstrukturen und Spezialisierungen. Ein direkter Vergleich gibt Ihnen die nötige Transparenz, um die beste Entscheidung für Ihre Bedürfnisse zu treffen.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {whyCompareItems.map((item, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.text}</p>
                        </div>
                    ))}
                </div>
              </Section>
              
              <Section>
                <SectionTitle icon={Home} title="Privat- oder Geschäftsumzug: So gelingt der Wechsel" />
                <p className="text-gray-700 leading-relaxed mb-4">Egal ob Sie privat umziehen oder den Standort Ihres Unternehmens verlegen – beide Szenarien haben ihre eigenen Herausforderungen. Ein Privatumzug erfordert eine detaillierte persönliche Planung, während bei einem Geschäftsumzug die Minimierung von Ausfallzeiten und der sichere Transport von Firmeneigentum im Vordergrund stehen.</p>
                <p className="text-gray-700 leading-relaxed mb-8">Professionelle Umzugsfirmen bieten massgeschneiderte Lösungen für beide Fälle. Sie unterstützen Sie bei der Demontage, dem sicheren Verpacken und dem Wiederaufbau am neuen Standort.</p>
                <div className="space-y-6">
                    {movingSteps.map((step, i) => (
                         <div key={i} className="flex items-start">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl mr-4">{i + 1}</div>
                            <div>
                                <h4 className="font-bold text-lg text-gray-800 mb-1">{step.title}</h4>
                                <p className="text-gray-600">{step.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
              </Section>

              <Section>
                <SectionTitle title="Was kostet ein Umzug von der Schweiz nach Deutschland?" />
                <p className="text-gray-700 leading-relaxed mb-8">Die Kosten für einen internationalen Umzug hängen von vielen Faktoren ab. Dazu gehören das Volumen des Umzugsguts (in m³), die Distanz zwischen dem alten und neuen Wohnort, die Zugänglichkeit der Wohnungen (Stockwerk, Lift) und die gewünschten Zusatzleistungen wie Verpackungsservice, Möbelmontage oder die Endreinigung.</p>
                
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Durchschnittliche Umzugskosten (Richtwerte)</h3>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 font-semibold text-gray-600">Wohnungsgrösse / Ladevolumen</th>
                        <th className="py-2 font-semibold text-gray-600 text-right">Geschätzte Kosten</th>
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
                  <p className="text-xs text-gray-500 mt-3 italic">*Dies sind Schätzungen. Die tatsächlichen Kosten können je nach Anbieter und Serviceumfang variieren.</p>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">Faktoren, die den Preis beeinflussen:</h3>
                <ul className="space-y-3 columns-1 md:columns-2">{costFactors.map((item, i) => <ListItem key={i}>{item}</ListItem>)}</ul>
              </Section>
              
              <Section>
                <SectionTitle icon={Sparkles} title="Reinigung mit Abnahmegarantie: Ein sorgenfreier Abschluss" />
                <p className="text-gray-700 leading-relaxed mb-4">Bei einem Umzug aus einer Mietwohnung in der Schweiz ist eine professionelle Endreinigung mit Abnahmegarantie unerlässlich. Dies stellt sicher, dass Sie Ihre Mietkaution vollständig zurückerhalten und sich nicht um Nachreinigungen kümmern müssen.</p>
                <p className="text-gray-700 leading-relaxed font-semibold mb-6">Viele Umzugsfirmen bieten die Reinigung als Kombi-Paket an. Das spart Ihnen Zeit und Koordinationsaufwand.</p>
                <ul className="space-y-3">{cleaningBenefits.map((item, i) => <ListItem key={i}>{item}</ListItem>)}</ul>
              </Section>

              <Section>
                <SectionTitle icon={Trash2} title="Entsorgung & Räumung von Wohnungen & Kellern" />
                <p className="text-gray-700 leading-relaxed mb-6">Ein Umzug ist die perfekte Gelegenheit, um sich von unnötigem Ballast zu befreien. Professionelle Umzugsfirmen bieten oft auch die fachgerechte Entsorgung von alten Möbeln, Elektroschrott oder Sperrmüll an. Dies umfasst die Räumung von ganzen Wohnungen, Kellern oder Dachböden.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {disposalServices.map((item, i) => (
                    <div key={i} className="flex items-center bg-gray-50 p-4 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </Section>

              <div className="mt-10 text-center">
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white group px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  <Link href="/kostenlose-offerte-anfordern?service=international">
                    Jetzt kostenlose Offerten erhalten
                    <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1.5" />
                  </Link>
                </Button>
              </div>
            </main>

            <aside className="lg:col-span-1 space-y-8 self-start sticky top-28">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Truck size={24} className="mr-3 text-blue-500" />
                  Geprüfte Partner
                </h3>
                <img  alt="Umzugshelfer tragen eine Kiste in einen LKW" className="w-full h-56 object-cover rounded-lg shadow-md mb-3" src="https://images.unsplash.com/photo-1696583545337-05099b905626" />
                <p className="text-sm text-gray-600 mt-2">Vergleichen Sie Offerten von qualifizierten und erfahrenen Umzugsunternehmen für internationale Umzüge.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="bg-green-50 p-6 rounded-2xl shadow-lg border border-green-200"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center">
                  <Info size={24} className="mr-3" />
                  Zoll-Information
                </h3>
                <p className="text-green-700">Als Umzugsgut gilt Hausrat, der seit mindestens 6 Monaten in Ihrem Besitz ist. Bei korrekter Deklaration ist die Einfuhr nach Deutschland zollfrei. Ihr Umzugsunternehmen hilft Ihnen bei den Formularen.</p>
              </motion.div>
            </aside>
          </div>
          <InternationalPageNavigation currentCountrySlug="umzug-nach-deutschland" />
        </div>
      </div>
    </>
  );
};

export default UmzugNachDeutschlandPageClient;
