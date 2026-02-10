'use client'

import React from 'react';
import Link from 'next/link';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, FileText, Heart, Info, ShieldCheck, Sparkles, Star, Truck } from 'lucide-react';
import InternationalPageNavigation from '@/components/international/InternationalPageNavigation';

const Section = ({ children, className = '' }: any) => (
  <section
    className={`py-8 border-t border-gray-200 ${className}`}
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

const UmzugNachDaenemarkPageClient = () => {
  const canonicalPath = '/umzugsfirma/internationale-umzuege/umzug-nach-daenemark';

  const metaTitle = "Umzug nach Dänemark: Kosten, Checkliste & Tipps für Ihr Hygge-Heim";
  const metaDescription = "Alles für Ihren Umzug nach Dänemark. Infos zu Kosten, eine komplette Checkliste inkl. CPR-Nummer und Tipps für den Start ins Hygge-Leben. Jetzt Offerten vergleichen!";
  const metaKeywords = "umzug nach dänemark, umzug schweiz dänemark, umzugsfirma schweiz dänemark, internationaler umzug dänemark, umzug nach kopenhagen, umzug nach aarhus, umzug nach odense, umzugsfirma international, zügelfirma schweiz dänemark, umzug schweiz nach dänemark, umzugskosten schweiz dänemark, umzugsfirma vergleichen dänemark, günstiger umzug dänemark, umzug nach dänemark preise, umzug nach dänemark kosten, umzugsfirma schweiz, internationaler umzug, internationale umzüge dänemark";

  const costTable = [
    { size: "1-2 Zimmer (ca. 20-30 mÂ³)", cost: "3.000 – 5.000 CHF" },
    { size: "3-4 Zimmer (ca. 40-60 mÂ³)", cost: "5.000 – 7.500 CHF" },
    { size: "5+ Zimmer / Haus (ca. 70+ mÂ³)", cost: "7.000 – 11.000+ CHF" }
  ];

  const costFactors = [
    "**Umzugsvolumen:** Die Menge Ihrer Güter ist der primäre Kostenfaktor.",
    "**Distanz und Transportweg:** Längere Strecken und eventuelle Fähr- oder Brückengebühren.",
    "**Zusatzleistungen:** Einpackservice, Möbelmontage, Endreinigung.",
    "**Zollabwicklung:** Die professionelle Abwicklung der Zollformalitäten ist für einen reibungslosen Grenzübertritt unerlässlich.",
    "**Versicherung:** Eine adäquate Transportversicherung für Ihr Hab und Gut."
  ];

  const checklistMonths = [
    "Gültige Ausweisdokumente prüfen, ggf. Aufenthaltsgenehmigung beantragen.",
    "Umzugsofferten einholen und Umzugsfirma buchen.",
    "Mietvertrag in der Schweiz kündigen.",
    "Sich über das dänische System informieren: **CPR-Nummer (Personennummer)** und **MitID (digitale ID)**.",
    "Haushalt grosszügig ausmisten (skandinavisches Design liebt Minimalismus!)."
  ];

  const checklistWeeks = [
    "Adressänderungen bei Banken, Versicherungen, etc. vornehmen.",
    "Nachsendeauftrag bei der Schweizerischen Post einrichten.",
    "Umzugskartons packen und klar beschriften.",
    "Termin für Wohnungsübergabe und Endreinigung organisieren."
  ];

  const checklistDays = [
    "Wichtige Dokumente und persönliche Gegenstände separat packen.",
    "Eine 'Hygge-Box' für den ersten Abend vorbereiten: Kerzen, eine Decke, Tee.",
    "Zählerstände ablesen und fotografieren.",
    "Etwas dänische Kronen (DKK) für die ersten Tage besorgen."
  ];

  const prepTips = [
    "**CPR-Nummer ist alles:** Nach Ankunft sofort beim 'Borgerservice' (Bürgerservice) für Ihre CPR-Nummer anmelden. Sie ist der Schlüssel zum Gesundheitssystem, Bankkonto etc.",
    "**Mit dem Rad unterwegs:** Das Fahrrad ist in den Städten das wichtigste Verkehrsmittel. Machen Sie sich mit den Radwegen vertraut.",
    "**Lernen Sie 'Tak':** Ein einfaches 'Danke' auf Dänisch öffnet viele Türen. Die Dänen schätzen es, wenn man sich bemüht.",
    "**Bankkonto und MitID:** Ein dänisches Bankkonto und die digitale Signatur MitID sind für das alltägliche Leben unerlässlich.",
    "**Vereinskultur ('Foreningsliv'):** Treten Sie einem Verein bei, um schnell soziale Kontakte zu knüpfen."
  ];

  const attractionPoints = [
    "**Work-Life-Balance:** Flexible Arbeitszeiten und ein starker Fokus auf Freizeit und Familie.",
    "**Design und Ästhetik:** Dänisches Design prägt Architektur, Möbel und den öffentlichen Raum.",
    "**Sicherheit und Vertrauen:** Eine Gesellschaft, die auf hohem Vertrauen und sozialer Sicherheit basiert.",
    "**Natur und Küste:** Endlose Küstenlinien, Strände und eine zugängliche Natur laden zu Outdoor-Aktivitäten ein."
  ];

  return (
    <>
      <div className="bg-gradient-to-b from-slate-50 via-gray-50 to-white">
        <section
          className="relative w-full bg-cover bg-center text-white"
        >
          <div className="absolute inset-0">
             <img  alt="Hero image of Copenhagen" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1699202674728-f09520f59fbb" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
          </div>
          <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6 text-center py-24 md:py-32">
            <div
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-shadow-lg">Ihr Umzug nach Dänemark: Finden Sie Ihr Hygge</h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">Ihr kompletter Leitfaden für einen reibungslosen Umzug in das Land des Designs, der Lebensfreude und der Gemütlichkeit.</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
            <main className="lg:col-span-2 bg-white p-6 md:p-10 rounded-2xl shadow-xl space-y-8">
              <Section className="border-t-0 pt-0">
                <h2 className="heading-2 mb-4">ğŸ‡©ğŸ‡° Velkommen til Danmark!</h2>
                <p className="text-lg text-gray-600 leading-relaxed">Ein Umzug nach Dänemark ist der Beginn eines neuen Lebensgefühls: Hygge. Es ist die dänische Kunst, Glück in den kleinen, gemütlichen Dingen des Alltags zu finden. Ob Sie das urbane Leben in Kopenhagen, die Küstenlandschaften Jütlands oder den Charme der vielen Inseln suchen – Dänemark begrüsst Sie mit einer einzigartigen Mischung aus modernem Design, progressiver Gesellschaft und einer tiefen Verbundenheit zur Natur. Dieser Guide ist Ihr Kompass für einen perfekt organisierten Umzug von der Schweiz nach Dänemark.</p>
              </Section>

              <Section>
                <SectionTitle title="Was kostet ein Umzug nach Dänemark?" />
                <p className="text-gray-700 leading-relaxed mb-4">Die Kosten für einen Umzug nach Dänemark liegen generell etwas höher als für einen Umzug nach Deutschland, was auf das höhere Preisniveau in Dänemark zurückzuführen ist. Eine sorgfältige Planung und ein detaillierter Offertenvergleich sind daher entscheidend, um das Budget im Griff zu haben.</p>
                <p className="text-gray-700 leading-relaxed mb-8">Wichtige Faktoren sind das Volumen Ihres Hausrats, die zurückzulegende Distanz und spezielle Anforderungen wie der Transport über Fähren oder Brücken (z.B. Öresundbrücke). Zusatzleistungen wie ein Verpackungsservice oder die Möbelmontage beeinflussen den Preis ebenfalls.</p>
                
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Kostenübersicht für Ihren Umzug nach Dänemark</h3>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 font-semibold text-gray-600">Wohnungsgrösse / Volumen</th>
                        <th className="py-2 font-semibold text-gray-600 text-right">Geschätzte Kosten (CHF)</th>
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
                  <p className="text-xs text-gray-500 mt-3 italic">Diese Preise sind Schätzungen. Holen Sie für eine genaue Kalkulation immer mehrere individuelle Offerten ein.</p>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Welche Faktoren beeinflussen die Kosten?</h3>
                <ul className="space-y-3">{costFactors.map((item, i) => <ListItem key={i}>{item}</ListItem>)}</ul>
              </Section>

              <Section>
                <SectionTitle icon={Star} title="Offerten vergleichen und das beste Umzugsunternehmen finden" />
                <p className="text-gray-700 leading-relaxed mb-4">Der beste Weg, Kosten zu optimieren, ist der Vergleich von Offerten. Fordern Sie detaillierte Offerten von mehreren internationalen Speditionen an, die Erfahrung mit Umzügen nach Skandinavien haben. Achten Sie auf transparente Preisgestaltung und vergleichen Sie den Leistungsumfang genau.</p>
                <p className="text-gray-700 leading-relaxed">Nutzen Sie unsere Plattform, um mit nur einer Anfrage massgeschneiderte Offerten von qualifizierten Umzugspartnern zu erhalten. Das spart Zeit und hilft Ihnen, das beste Preis-Leistungs-Verhältnis für Ihren Dänemark-Umzug zu finden.</p>
              </Section>

              <Section>
                <SectionTitle icon={FileText} title="Checkliste für einen gelungenen Start in Dänemark" />
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-body mb-3">2-3 Monate vor dem Umzug</h4>
                    <ul className="space-y-2">{checklistMonths.map((item, i) => <ListItem key={i}>{item}</ListItem>)}</ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-body mb-3">2-4 Wochen vor dem Umzug</h4>
                    <ul className="space-y-2">{checklistWeeks.map((item, i) => <ListItem key={i}>{item}</ListItem>)}</ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-body mb-3">Die letzten Tage vor dem Umzug</h4>
                    <ul className="space-y-2">{checklistDays.map((item, i) => <ListItem key={i}>{item}</ListItem>)}</ul>
                  </div>
                </div>
              </Section>

              <Section>
                <SectionTitle icon={Sparkles} title="Praktische Tipps für das Leben in Dänemark" />
                <ul className="space-y-3">{prepTips.map((item, i) => <ListItem key={i}>{item}</ListItem>)}</ul>
              </Section>

              <Section>
                <SectionTitle icon={ShieldCheck} title="Ihr Dänemark-Umzug: Sicher und zuverlässig mit uns" />
                <p className="text-gray-700 leading-relaxed mb-4">Ein Umzug nach Dänemark erfordert Erfahrung, besonders mit den skandinavischen Gegebenheiten und Zollformalitäten. Wir arbeiten nur mit Umzugsunternehmen zusammen, die auf den Verkehr zwischen der Schweiz und Dänemark spezialisiert sind.</p>
                <p className="text-gray-700 leading-relaxed">Verlassen Sie sich auf einen kompletten Service, der von der Planung bis zur Ankunft alles abdeckt. So können Sie sich voll und ganz auf Ihr neues Hygge-Leben in Dänemark freuen.</p>
              </Section>

              <Section>
                <SectionTitle icon={Heart} title="Was macht Dänemark als neues Zuhause so attraktiv?" />
                <p className="text-gray-700 leading-relaxed mb-4">Dänemark wird regelmässig zu einem der glücklichsten Länder der Welt gekürt. Das liegt an einer einzigartigen Kombination aus sozialer Sicherheit, Work-Life-Balance und dem berühmten 'Hygge'-Lebensgefühl.</p>
                <ul className="space-y-3 mt-6">{attractionPoints.map((item, i) => <ListItem key={i}>{item}</ListItem>)}</ul>
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
              <div
                className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Truck size={24} className="mr-3 text-blue-500" />
                  Ihr Umzugsgut in besten Händen
                </h3>
                <img  alt="Ein Lastenrad steht in einer typisch dänischen Strasse" className="w-full h-56 object-cover rounded-lg shadow-md mb-3" src="https://images.unsplash.com/photo-1504846257989-a76209d9d2ac" />
                <p className="text-sm text-gray-600 mt-2">Unsere Partner garantieren eine fachgerechte Verpackung und einen sicheren Transport.</p>
              </div>
              <div
                className="bg-green-50 p-6 rounded-2xl shadow-lg border border-green-200"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center">
                  <Info size={24} className="mr-3" />
                  Wussten Sie schon?
                </h3>
                <p className="text-green-700">In Dänemark gibt es kein Wort für 'bitte', aber Höflichkeit wird durch einen freundlichen Tonfall und viele 'Tak' (Danke) ausgedrückt. Ausserdem hat das Land mehr Fahrräder als Einwohner.</p>
              </div>
            </aside>
          </div>
          <InternationalPageNavigation currentCountrySlug="umzug-nach-daenemark" />
        </div>
      </div>
    </>
  );
};

export default UmzugNachDaenemarkPageClient;


