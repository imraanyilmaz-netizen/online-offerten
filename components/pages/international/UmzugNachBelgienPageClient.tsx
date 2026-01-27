'use client'

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, FileText, Briefcase, Sparkles, Trash2, ShieldCheck, Home, Info, Truck } from 'lucide-react';

// Lazy load InternationalPageNavigation to reduce bundle size
const InternationalPageNavigation = dynamic(() => import('@/components/international/InternationalPageNavigation'), {
  loading: () => <div className="h-20 animate-pulse bg-gray-100 rounded-lg" />
});

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = '' }: SectionProps) => (
  <section
    className={`py-8 md:py-12 border-t border-gray-100 animate-fade-in-up ${className}`}
  >
    {children}
  </section>
);

import type { LucideIcon } from 'lucide-react';

interface SectionTitleProps {
  icon?: LucideIcon;
  title: string;
}

const SectionTitle = ({ icon, title }: SectionTitleProps) => {
  const Icon = icon;
  return (
    <h2 className="heading-2 flex items-center">
      {Icon && <Icon size={32} className="mr-4 text-green-600" />}
      {title}
    </h2>
  );
};

interface ListItemProps {
  children: string;
}

const ListItem = ({ children }: ListItemProps) => (
  <li className="flex items-start py-1">
    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
    <span className="text-gray-700" dangerouslySetInnerHTML={{ __html: children }} />
  </li>
);

const UmzugNachBelgienPageClient = () => {
  const canonicalPath = '/umzugsfirma/internationale-umzuege/umzug-nach-belgien';

  const metaTitle = "Umzug nach Belgien | Günstige Umzugsfirmen aus der Schweiz";
  const metaDescription = "Planen Sie Ihren Umzug von der Schweiz nach Belgien? Vergleichen Sie hier professionelle und geprüfte Umzugsfirmen. Kostenlose Offerten für Privatumzug, Geschäftsumzug, Reinigung und Entsorgung.";
  const metaKeywords = "umzug nach belgien, umzug schweiz belgien, umzugsfirma schweiz belgien, internationaler umzug belgien, umzug nach brüssel, umzug nach antwerpen, umzug nach gent, umzugsfirma international, zügelfirma schweiz belgien, umzug schweiz nach belgien, umzugskosten schweiz belgien, umzugsfirma vergleichen belgien, günstiger umzug belgien, umzug nach belgien preise, umzug nach belgien kosten, umzugsfirma schweiz, internationaler umzug, internationale umzüge belgien";

  const costTable = [
    { size: "1-2 Zimmer (ca. 15-25 m³)", cost: "1.700 – 3.000 CHF" },
    { size: "3 Zimmer (ca. 30-40 m³)", cost: "2.800 – 5.200 CHF" },
    { size: "4-5 Zimmer (ca. 45-60 m³)", cost: "4.500 – 7.000 CHF" }
  ];

  const costFactors = [
    "**Umzugsvolumen:** Die Menge Ihres Hausrats ist der grösste Kostenfaktor.",
    "**Entfernung:** Die Kilometer zwischen dem alten und neuen Wohnort.",
    "**Zusatzdienste:** Ein- und Auspackservice, Möbelmontage, Klaviertransport.",
    "**Zugänglichkeit:** Müssen Möbel über enge Treppenhäuser transportiert werden?",
    "**Versicherungsschutz:** Eine Transportversicherung für internationale Umzüge ist essenziell.",
    "**Zeitpunkt:** Die Nachfrage und Preise können je nach Saison schwanken."
  ];

  const movingSteps = [
    {
      title: "Detaillierte Planung",
      text: "Eine genaue Inventarliste ist die Basis für jede seriöse Offerte. Planen Sie, welche Möbel und Gegenstände mitumziehen sollen."
    },
    {
      title: "EU-Formalitäten",
      text: "Obwohl Belgien in der EU ist, gibt es administrative Schritte zu beachten. Ihr Umzugsunternehmen berät Sie zu allen notwendigen Dokumenten."
    },
    {
      title: "Sicherer Transport",
      text: "Von der Wahl des richtigen Fahrzeugs bis zur professionellen Verladung – die Experten sorgen dafür, dass alles sicher an Ihrem neuen Standort ankommt."
    }
  ];

  const cleaningBenefits = [
    "**Abnahmegarantie:** Das Unternehmen ist bei der Übergabe dabei und bessert bei Bedarf kostenlos nach.",
    "**Komplette Entlastung:** Konzentrieren Sie sich auf Ihren neuen Start, während Profis die Reinigung übernehmen.",
    "**Garantierte Sauberkeit:** Erfahrene Teams sorgen für ein Ergebnis, das jeden Vermieter überzeugt.",
    "**Effiziente Koordination:** Ein Partner für Umzug und Reinigung vereinfacht die gesamte Organisation."
  ];

  const disposalServices = [
    "Entsorgung von Altmöbeln und Sperrmüll",
    "Komplette Wohnungs- und Kellerräumungen",
    "Umweltgerechtes Recycling von Materialien",
    "Besenreine Übergabe der geräumten Flächen"
  ];

  const whyCompareItems = [
    {
      title: "Kosten optimieren",
      text: "Sparen Sie bis zu 40%, indem Sie die Preis- und Leistungsangebote verschiedener spezialisierter Umzugsunternehmen direkt vergleichen."
    },
    {
      title: "Qualität und Sicherheit",
      text: "Wir arbeiten ausschliesslich mit geprüften und bewerteten Partnern zusammen. So ist Ihr Hab und Gut während des gesamten Transports versichert und in sicheren Händen."
    },
    {
      title: "Massgeschneiderter Service",
      text: "Jeder Umzug ist einzigartig. Finden Sie die Firma, die exakt die Dienstleistungen anbietet, die Sie benötigen: vom Verpackungsservice bis zur Räumung."
    },
    {
      title: "Versteckte Gebühren vermeiden",
      text: "Durch detaillierte und transparente Offerten haben Sie von Anfang an die volle Kostenkontrolle und erleben keine bösen Überraschungen."
    }
  ];

  return (
    <>
      <div className="bg-gradient-to-b from-slate-50 via-gray-50 to-white">
        <section
          className="relative w-full bg-cover bg-center text-white animate-fade-in"
        >
          <div className="absolute inset-0">
             <img alt="Hero image of Brussels Grand Place" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1482959568443-5c8818cae8f6" loading="eager" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
          </div>
          <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6 text-center py-24 md:py-32">
            <div className="animate-fade-in-up-delay">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-shadow-lg">Umzug nach Belgien: Ihr Leitfaden für einen reibungslosen Start</h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">Stressfrei von der Schweiz ins Herz Europas. Vergleichen Sie jetzt die besten Umzugsunternehmen für Ihren Umzug nach Belgien und sparen Sie bares Geld.</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
            <main className="lg:col-span-2 bg-white p-6 md:p-10 rounded-2xl shadow-xl space-y-8">
              <Section className="border-t-0 pt-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Sorglos von der Schweiz nach Belgien umziehen</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">Ein Umzug von der Schweiz nach Belgien bedeutet den Sprung in das Zentrum Europas, reich an Kultur, Geschichte und internationalem Flair. Ob Sie aus beruflichen Gründen nach Brüssel ziehen, Ihr Unternehmen verlagern oder einen neuen Lebensabschnitt in Flandern oder Wallonien beginnen – eine gute Vorbereitung ist entscheidend. Ein internationaler Umzug bringt spezifische Herausforderungen mit sich, von der Logistik bis zu den administrativen Hürden innerhalb der EU.</p>
                <p className="text-gray-700 leading-relaxed">Um Ihnen den Start zu erleichtern, bieten wir Ihnen eine Plattform, auf der Sie schnell und einfach qualifizierte Umzugsfirmen finden. Erhalten Sie massgeschneiderte Offerten, die genau auf Ihre Bedürfnisse zugeschnitten sind – sei es für einen kompletten Privatumzug, einen spezialisierten Geschäftsumzug, die notwendige Endreinigung oder die Entsorgung von Altlasten. Beginnen Sie Ihr Abenteuer in Belgien bestens vorbereitet.</p>
              </Section>

              <Section>
                <SectionTitle icon={ShieldCheck} title="Preis und Leistung im Blick: Warum sich der Vergleich lohnt" />
                <p className="text-gray-700 leading-relaxed mb-6">Die Kosten für einen internationalen Umzug können stark variieren. Indem Sie mehrere Offerten vergleichen, erhalten Sie nicht nur den besten Preis, sondern auch die Sicherheit, einen zuverlässigen und erfahrenen Partner für Ihren Umzug nach Belgien zu finden. Transparenz ist der Schlüssel zu einem stressfreien Erlebnis.</p>
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
                <SectionTitle icon={Home} title="Privatumzug und Geschäftsumzug nach Belgien" />
                <p className="text-gray-700 leading-relaxed mb-4">Die Anforderungen an einen Privatumzug unterscheiden sich grundlegend von denen eines Geschäftsumzugs. Während bei einem privaten Wohnungswechsel die persönliche Betreuung und sorgfältige Behandlung des Hausrats im Vordergrund stehen, geht es bei einem Firmenumzug um Effizienz, minimale Betriebsunterbrechung und den sicheren Transfer von Akten und Technik.</p>
                <p className="text-gray-700 leading-relaxed mb-8">Unsere Partnerfirmen sind auf beide Szenarien spezialisiert. Sie erstellen einen detaillierten Umzugsplan, kümmern sich um die professionelle Verpackung und gewährleisten einen termingerechten Ablauf, damit Sie oder Ihr Unternehmen in Belgien schnell wieder startklar sind.</p>
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
                <SectionTitle title="Welche Kosten entstehen bei einem Umzug nach Belgien?" />
                <p className="text-gray-700 leading-relaxed mb-8">Die Kosten für einen Umzug von der Schweiz nach Belgien sind von mehreren Faktoren abhängig. Entscheidend sind das Ladevolumen (in m³), die genaue Distanz (z.B. von Zürich nach Brüssel), der gewünschte Serviceumfang (z.B. mit oder ohne Verpackungsservice) und die Gegebenheiten vor Ort wie Stockwerk und Lift.</p>
                
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Durchschnittliche Kosten (Schätzungen)</h3>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 font-semibold text-gray-600">Wohnungsgrösse</th>
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
                  <p className="text-xs text-gray-500 mt-3 italic">*Diese Richtwerte dienen der Orientierung. Genaue Preise erhalten Sie durch individuelle Offerten.</p>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">Preisbestimmende Faktoren:</h3>
                <ul className="space-y-3 columns-1 md:columns-2">{costFactors.map((item, i) => <ListItem key={i}>{item}</ListItem>)}</ul>
              </Section>
              
              <Section>
                <SectionTitle icon={Sparkles} title="Endreinigung in der Schweiz mit Abnahmegarantie" />
                <p className="text-gray-700 leading-relaxed mb-4">Verlassen Sie Ihre alte Wohnung in der Schweiz ohne Stress. Eine professionelle Endreinigung mit Abnahmegarantie ist der Schlüssel zur problemlosen Wohnungsübergabe und zur vollständigen Rückerstattung Ihrer Mietkaution. Die Reinigungsfirma kümmert sich um alle Details, auf die Ihre Verwaltung Wert legt.</p>
                <p className="text-gray-700 leading-relaxed font-semibold mb-6">Buchen Sie Umzug und Reinigung im Paket und profitieren Sie von attraktiven Kombi-Offerten und einem zentralen Ansprechpartner.</p>
                <ul className="space-y-3">{cleaningBenefits.map((item, i) => <ListItem key={i}>{item}</ListItem>)}</ul>
              </Section>

              <Section>
                <SectionTitle icon={Trash2} title="Platz schaffen: Entsorgung und Räumung" />
                <p className="text-gray-700 leading-relaxed mb-6">Nutzen Sie den Umzug, um sich von Dingen zu trennen, die Sie nicht mehr benötigen. Viele Umzugsunternehmen bieten einen umfassenden Service für die Räumung und fachgerechte Entsorgung von Möbeln, Elektroschrott und anderem Sperrmüll. Das schafft nicht nur Platz im neuen Zuhause, sondern reduziert auch das Transportvolumen und somit die Umzugskosten.</p>
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
                    Kostenlose Belgien-Umzugsofferten anfordern
                    <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1.5" />
                  </Link>
                </Button>
              </div>
            </main>

            <aside className="lg:col-span-1 space-y-8 self-start sticky top-28">
              <div 
                className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-fade-in-right"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Truck size={24} className="mr-3 text-blue-500" />
                  Ihr Umzug in besten Händen
                </h3>
                <img alt="Ein Umzugshelfer verlädt eine Box in einen Transporter" className="w-full h-56 object-cover rounded-lg shadow-md mb-3" src="https://images.unsplash.com/photo-1562905909-8e35a6e1993a" loading="lazy" />
                <p className="text-sm text-gray-600 mt-2">Unsere Partner verfügen über jahrelange Erfahrung mit Umzügen nach Belgien und kennen die lokalen Gegebenheiten.</p>
              </div>
              <div 
                className="bg-green-50 p-6 rounded-2xl shadow-lg border border-green-200 animate-fade-in-right-delay"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center">
                  <Info size={24} className="mr-3" />
                  Umzug innerhalb der EU
                </h3>
                <p className="text-green-700">Da Belgien Teil der EU ist, entfallen die aufwändigen Zollformalitäten, die bei Umzügen in Nicht-EU-Länder anfallen. Dennoch gibt es Meldepflichten vor Ort, über die Ihr Umzugsberater Sie informieren kann.</p>
              </div>
            </aside>
          </div>
          <InternationalPageNavigation currentCountrySlug="umzug-nach-belgien" />
        </div>
      </div>
    </>
  );
};

export default UmzugNachBelgienPageClient;
