'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Award, Package, Sparkles, MapPin, Building, Globe, Users, Truck, Home } from 'lucide-react';
import { PiPianoKeysFill } from 'react-icons/pi';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import CantonFlag from '@/components/CantonFlag';
import LocationFAQ from '@/components/locations/LocationFAQ';
import { faqs } from '@/data/locationFaqs';
import LocationSidebar from '@/components/locations/LocationSidebar';

const AdvantageItem = ({ icon: Icon, title, text, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1 }}
      className="flex items-start"
    >
      {Icon && <Icon className="w-8 h-8 text-green-500 mr-4 mt-1 flex-shrink-0" />}
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-gray-600 leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
};

const UmzugsfirmaZurichPageClient = () => {
  const city = "Zürich";
  const locationData = locations.find(loc => loc.name === city);

  const metaTitle = "Umzugsfirma Zürich: Kostenlose Offerten vergleichen | Online-Offerten.ch";
  const metaDescription = "Kostenlose Offerten von geprüften Umzugsfirmen in Zürich vergleichen. Privatumzug, Geschäftsumzug & mehr. Bis zu 40% sparen!";
  const canonicalUrl = '/umzugsfirma-zuerich';

  const costTableRows = [
    { size: "1.5 - 2 Zimmer", staff: "2 Zügelmänner, 1 LKW", cost: "850 – 1'600" },
    { size: "2.5 - 3 Zimmer", staff: "3 Zügelmänner, 1 LKW", cost: "1'400 – 2'300" },
    { size: "3.5 - 4.5 Zimmer", staff: "3-4 Zügelmänner, 1-2 LKW", cost: "1'900 – 3'200" },
    { size: "5.5+ Zimmer / Haus", staff: "4-5 Zügelmänner, 2 LKW", cost: "3'000 – 5'500+" }
  ];

  const savingsTips = [
    "Antizyklisch umziehen: Meiden Sie Monatsenden und Wochenenden. Ein Umzug an einem Dienstag oder Mittwoch kann die Kosten um 20-30% senken.",
    "Strategisch selbst anpacken: Packen Sie Kisten selbst und demontieren Sie einfache Möbel. Das reduziert die teuren Arbeitsstunden der Profis.",
    "Frühbucher-Rabatte nutzen: Planen Sie mindestens 2-3 Monate im Voraus. Viele Firmen bieten bessere Konditionen für frühe Buchungen.",
    "Minimalismus-Prinzip anwenden: Ein Umzug ist die perfekte Gelegenheit zum Entrümpeln. Jedes Kilo weniger spart bares Geld.",
    "Gratis-Zügelmaterial verwenden: Fragen Sie in Supermärkten, Apotheken oder im Freundeskreis nach stabilen Bananen- oder Kopierpapierkisten."
  ];

  const faqItemsForSchema = faqs.move.concat(faqs.clean);
  
  // LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Umzugsfirmen in Zürich",
    "description": "Geprüfte Umzugsfirmen und Zügelfirmen in Zürich vergleichen. Kostenlose Offerten von professionellen Umzugsunternehmen.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zürich",
      "addressRegion": "ZH",
      "addressCountry": "CH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "47.3769",
      "longitude": "8.5417"
    },
    "areaServed": {
      "@type": "City",
      "name": "Zürich"
    },
    "serviceType": ["MovingCompany", "Moving and Storage", "CleaningService"],
    "url": "https://online-offerten.ch/umzugsfirma-zuerich",
    "telephone": "+41",
    "priceRange": "$$"
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItemsForSchema.map(item => ({
      "@type": "Question",
      "name": ((item.question as any).de || item.question as any).replace('{city}', city),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer.map(ans => typeof ans === 'string' ? ans : (ans.de || ans)).join(' ').replace(/{city}/g, city)
      }
    }))
  };

  // Combined Schema
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      localBusinessSchema,
      faqSchema
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <div className="bg-white overflow-x-hidden">
        {/* Hero Section - Split Layout */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden"
        >
          {/* Background Image - Right Side */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://online-offerten.ch/image/umzugsservice-Schweiz/umzugsfirma-zurich.avif')`,
              maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 100%)'
            }}
          ></div>
          
          {/* Gradient Overlay - White from left to right */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent"></div>
          
          {/* White shadow/glow effect towards the image */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 pointer-events-none"
            style={{
              boxShadow: 'inset -100px 0 100px -50px rgba(255, 255, 255, 0.8)'
            }}
          ></div>
          
          <div className="container mx-auto max-w-navbar px-4 md:px-6 relative z-10 overflow-x-hidden">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center min-h-[400px] md:min-h-[500px]">
              {/* Left Side - Content Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-white rounded-xl shadow-xl p-5 md:p-6 lg:p-7 w-full overflow-x-hidden"
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 leading-tight break-words">
                  Umzugsfirma Zürich – geprüfte Zügelfirmen vergleichen
                </h1>
                
                <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed font-medium break-words">
                  Kostenlose Offerten von geprüften Umzugsfirmen in{' '}
                  <span className="font-semibold text-green-600 underline decoration-green-400 decoration-1">Zürich</span>{' '}
                  vergleichen und die beste Firma für Ihren Umzug finden. Professionelle Zügelfirmen in Zürich bieten umfassende Dienstleistungen für Privatumzug, Geschäftsumzug, Auslandumzug und Spezialtransporte. Qualitativ hochwertige Umzugsunternehmen mit Reinigung, Räumung, Entsorgung und Lagerung. Mehrere Anbieter vergleichen und bis zu 40% sparen!
                </p>
                
                <div className="mb-4">
                  <p className="text-base md:text-lg font-bold text-gray-900 mb-1">
                    <span className="text-green-600 underline decoration-green-500 decoration-2 underline-offset-4">
                      Jetzt unverbindliche Offerte erhalten!
                    </span>
                  </p>
                </div>
                
                {/* Service Grid */}
                <div className="grid grid-cols-2 gap-2 md:gap-3 w-full">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&city=Zürich"
                    className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-all transform hover:scale-105 group overflow-hidden w-full"
                  >
                    <Home className="w-6 h-6 text-green-600 mb-1.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Privatumzug</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Wohnung, Haus, WG-Zimmer</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                  
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&city=Zürich"
                    className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-all transform hover:scale-105 group overflow-hidden w-full"
                  >
                    <Building className="w-6 h-6 text-green-600 mb-1.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Geschäftsumzug</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Büro, Ladenlokal, Werkstatt</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                  
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&city=Zürich"
                    className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-all transform hover:scale-105 group overflow-hidden w-full"
                  >
                    <Globe className="w-6 h-6 text-green-600 mb-1.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Internationaler Umzug</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Umzüge ins oder aus dem Ausland</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                  
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&city=Zürich"
                    className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-all transform hover:scale-105 group overflow-hidden w-full"
                  >
                    <Package className="w-6 h-6 text-green-600 mb-1.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Spezialtransport</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Klavier, Tresor, Kunst & mehr</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                  
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&city=Zürich"
                    className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-all transform hover:scale-105 group overflow-hidden w-full"
                  >
                    <Truck className="w-6 h-6 text-green-600 mb-1.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Kleintransport</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Einzelne Möbel, kleine Lasten</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                  
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&city=Zürich"
                    className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-all transform hover:scale-105 group overflow-hidden w-full"
                  >
                    <MapPin className="w-6 h-6 text-green-600 mb-1.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Möbellift</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Bis 400 kg, max. 27m Länge</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                </div>
              </motion.div>
              
              {/* Right Side - Image Area (handled by background) */}
              <div className="hidden md:block"></div>
            </div>
          </div>
        </motion.section>
        
        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 py-8 md:py-12 overflow-x-hidden">
          <div className="container mx-auto max-w-navbar px-4 md:px-6 overflow-x-hidden">
          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
            <motion.main 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-3 bg-white p-6 md:p-8 rounded-xl shadow-2xl space-y-12 w-full min-w-0 overflow-x-hidden"
            >
              <article className="w-full min-w-0">
                <h2 className="text-3xl font-bold text-gray-800 mb-5 break-words">Zügelfirmen in Zürich vergleichen und die beste Firma finden</h2>
                <p className="text-gray-700 leading-relaxed mb-4 font-medium break-words w-full">Zürich, die grösste Stadt der Schweiz, ist ein Anziehungspunkt für Menschen aus aller Welt. Ein Umzug in dieser dynamischen Metropole birgt jedoch besondere Herausforderungen. Dichter Verkehr, komplexe Parkregelungen und die Vielfalt der Wohnlagen – von Altstadtwohnungen bis zu modernen Neubauten am Stadtrand – machen die Wahl der richtigen Umzugsfirma zur wichtigsten Entscheidung Ihres Umzugsprojekts. Ein professionelles Umzugsunternehmen ist nicht nur ein Transportdienstleister; es ist Ihr Projektmanager, Logistikpartner und Problemlöser in einem.</p>
                <p className="text-gray-700 leading-relaxed font-medium break-words w-full">Eine erfahrene Zügelfirma in Zürich kennt die Tücken der Stadt. Über unser Portal können Sie mehrere geprüfte Umzugsfirmen vergleichen und die beste Lösung für Ihr Projekt finden. Professionelle Anbieter kümmern sich um die Organisation von Halteverbotszonen, planen die schnellste Route und stellen sicher, dass Ihr Hab und Gut, von der zerbrechlichen Vase bis zum schweren Designermöbel, sicher und unversehrt im neuen Zuhause ankommt. Der Vergleich mehrerer Anbieter gibt Ihnen die Sicherheit, einen geprüften und versicherten Partner zu finden, der Ihren Ansprüchen gerecht wird. Durch den direkten Vergleich finden Sie das beste Preis-Leistungs-Verhältnis und sparen dabei erheblich.</p>
              </article>

              <div className="text-center bg-green-50 p-8 rounded-lg border-l-4 border-green-500 shadow-md w-full min-w-0 overflow-x-hidden">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 break-words">Umzugsunternehmen in Zürich vergleichen: Jetzt starten!</h3>
                <p className="text-gray-700 mb-6 font-medium break-words w-full">Mit nur einer Anfrage erhalten Sie bis zu fünf kostenlose und unverbindliche Offerten von Top-Umzugsfirmen aus Zürich. Vergleichen Sie mehrere Anbieter und sparen Sie bis zu 40%.</p>
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white group shadow-lg transform hover:scale-105 transition-transform">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&city=Zürich">
                    Jetzt kostenlose Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <article className="pt-8 border-t border-gray-200 space-y-8 w-full min-w-0">
                <h2 className="text-3xl font-bold text-gray-800 break-words">Umzugskosten in Zürich im Überblick</h2>
                <p className="font-medium break-words w-full">Die Umzugskosten in Zürich gehören zu den höchsten der Schweiz, lassen sich aber mit der richtigen Planung optimieren. Durch den Vergleich mehrerer Anbieter finden Sie das beste Angebot und sparen bis zu 40%. Die Kosten hängen von vielen Variablen ab. Unsere Preistabelle gibt Ihnen eine realistische Einschätzung für einen Umzug innerhalb von Zürich. Für eine detaillierte Kostenberechnung nutzen Sie unseren <Link href="/umzugskosten-rechner" className="text-green-600 hover:text-green-800 underline font-semibold">Umzugskosten-Rechner</Link>, der Ihnen in nur 2 Minuten eine verlässliche Preis-Schätzung liefert.</p>
                
                <h3 className="text-2xl font-semibold text-gray-800 pt-4 break-words">Detaillierte Kostenschätzung für Ihren Zürich-Umzug</h3>
                 <div className="my-4 overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse rounded-lg overflow-hidden shadow">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4 font-semibold text-gray-700 border-b-2 border-gray-200">Wohnungsgrösse</th>
                                <th className="p-4 font-semibold text-gray-700 border-b-2 border-gray-200">Personal & LKW</th>
                                <th className="p-4 font-semibold text-gray-700 border-b-2 border-gray-200 text-right">Geschätzte Kosten (CHF)</th>
                            </tr>
                        </thead>
                        <tbody>
                          {costTableRows.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="p-4 border-b border-gray-200">{row.size}</td>
                                <td className="p-4 border-b border-gray-200">{row.staff}</td>
                                <td className="p-4 border-b border-gray-200 font-medium text-right">{row.cost}</td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-sm text-gray-600 italic">Hinweis: Diese Preise sind Schätzungen. Faktoren wie Stockwerk, Liftverfügbarkeit und Zusatzleistungen beeinflussen den Endpreis. Für eine exakte Kalkulation ist eine persönliche Umzugsofferte unerlässlich.</p>
              </article>

              <article className="pt-8 border-t border-gray-200 space-y-6 w-full min-w-0">
                <h2 className="text-3xl font-bold text-gray-800 break-words">Vorteile beim Firmenvergleich</h2>
                <p className="font-medium mb-4 break-words w-full">Vergleichen Sie mehrere Anbieter in Zürich und profitieren Sie von folgenden Vorteilen:</p>
                <div className="space-y-6 mt-6">
                    <AdvantageItem icon={null} title="Erhebliche Kosten sparen" text="Durch den direkten Vergleich mehrerer Anbieter finden Sie mühelos das beste Preis-Leistungs-Verhältnis und können erheblich sparen. Bis zu 40% Ersparnis möglich!" delay={1} />
                    <AdvantageItem icon={Award} title="Geprüfte Qualität und Vertrauen" text="Wir vermitteln Ihnen ausschliesslich geprüfte, versicherte und top bewertete Umzugsfirmen aus der Region Zürich. Alle Partner sind zertifiziert und versichert." delay={2} />
                    <AdvantageItem icon={CheckCircle} title="100% Kostenlos und unverbindlich" text="Ihre Anfrage generiert kostenlose Offerten. Sie entscheiden in Ruhe, ob und welche Offerte Sie annehmen. Keine versteckten Kosten." delay={3} />
                </div>
              </article>
              
              <article className="pt-8 border-t border-gray-200 space-y-6 w-full min-w-0">
                <h2 className="text-3xl font-bold text-gray-800 break-words">Checkliste für die perfekte Zügelfirma</h2>
                <p className="font-medium break-words w-full">Lassen Sie sich nicht von der erstbesten Offerte überzeugen. Vergleichen Sie mehrere Anbieter in Zürich. Eine gründliche Prüfung ist entscheidend für die beste Wahl.</p>
                <h3 className="text-2xl font-semibold text-gray-800 pt-4 break-words">Schritt 1: Detaillierte Offerten einholen</h3>
                <p className="break-words w-full">Eine seriöse offerten ist mehr als nur eine Zahl. Sie sollte alle Posten detailliert auflisten: Stundensätze, Mitarbeiterzahl, Fahrzeuggrösse, Versicherung und alle gebuchten Zusatzleistungen.</p>
                <h3 className="text-2xl font-semibold text-gray-800 pt-4 break-words">Schritt 2: Versicherungsschutz prüfen</h3>
                <p className="break-words w-full">Eine ausreichende Transport- und Betriebshaftpflichtversicherung ist nicht verhandelbar. Fragen Sie nach der Deckungssumme und lassen Sie sich diese bestätigen. Professionelle Firmen sind bis 100'000 CHF versichert.</p>
                <h3 className="text-2xl font-semibold text-gray-800 pt-4 break-words">Schritt 3: Bewertungen und Referenzen analysieren</h3>
                <p className="break-words w-full">Lesen Sie authentische Kundenbewertungen auf unserem Portal und anderen Portalen. Achten Sie auf Kommentare zu Pünktlichkeit, Sorgfalt und Teamfreundlichkeit.</p>
              </article>

              <article className="pt-8 border-t border-gray-200 space-y-6 w-full min-w-0">
                <h2 className="text-3xl font-bold text-gray-800 break-words">Günstig umziehen: Spartipps für Zürich</h2>
                 <p className="font-medium break-words w-full">Zürich ist teuer, aber Ihr Umzug muss es nicht sein. Mit diesen Insider-Tipps schonen Sie Ihr Budget:</p>
                <ul className="list-decimal list-inside space-y-4 text-gray-700 pl-4 marker:font-bold marker:text-blue-600">
                    {savingsTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                </ul>
              </article>
              
              <article className="pt-8 border-t border-gray-200 space-y-6 w-full min-w-0">
                <h2 className="text-3xl font-bold text-gray-800 break-words">Alle Dienstleistungen im Überblick</h2>
                <p className="font-medium break-words w-full">Eine moderne Umzugsfirma in Zürich bietet viel mehr als nur den Transport. Stellen Sie sich Ihr individuelles Servicepaket zusammen. Unsere Partner bieten folgende Dienstleistungen an:</p>
                <div className="grid md:grid-cols-2 gap-6 mt-6 w-full">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2 break-words">
                        <Package className="mr-2 text-blue-500 flex-shrink-0" /> 
                        <Link href="/privatumzug" className="text-blue-600 hover:text-blue-800 hover:underline break-words">Privatumzug</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Der klassische Wohnungswechsel, individuell auf Ihre Bedürfnisse zugeschnitten. Vom Einpacken über die Montage bis zum Auspacken – lehnen Sie sich entspannt zurück.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Building className="mr-2 text-blue-500 flex-shrink-0" /> 
                        <Link href="/geschaeftsumzug" className="text-blue-600 hover:text-blue-800 hover:underline break-words">Geschäftsumzug</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Minimale Ausfallzeiten und sorgfältige Planung für Büros und Firmen. Professioneller Umzug für Unternehmen in Zürich.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Globe className="mr-2 text-blue-500 flex-shrink-0" /> 
                        <Link href="/internationale-umzuege" className="text-blue-600 hover:text-blue-800 hover:underline break-words">Internationale Umzüge</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Komplette Abwicklung inklusive Zollformalitäten. Umzug ins Ausland mit professioneller Unterstützung.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Package className="mr-2 text-blue-500 flex-shrink-0" /> 
                        <Link href="/spezialtransporte" className="text-blue-600 hover:text-blue-800 hover:underline break-words">Spezialtransporte</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Transport für Klaviere, Tresore, Maschinen & Geräte. Professionelle Spezialtransporte in Zürich.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <PiPianoKeysFill className="mr-2 text-blue-500 flex-shrink-0" /> 
                        <Link href="/klaviertransport" className="text-blue-600 hover:text-blue-800 hover:underline break-words">Klaviertransport</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Professioneller Transport für Klaviere und Flügel. Spezialisierte Zügelfirmen für Klaviertransport in Zürich.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Sparkles className="mr-2 text-blue-500 flex-shrink-0" /> 
                        <Link href="/reinigung" className="text-blue-600 hover:text-blue-800 hover:underline break-words">Reinigung</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Professionelle Reinigungsdienstleistungen in Zürich. Von Wohnungsreinigung bis Fassadenreinigung.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Sparkles className="mr-2 text-blue-500 flex-shrink-0" /> 
                        <Link href="/umzugsreinigung" className="text-blue-600 hover:text-blue-800 hover:underline break-words">Umzugsreinigung</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Mit Abnahmegarantie für eine stressfreie Wohnungsübergabe. Professionelle Endreinigung nach dem Umzug.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Sparkles className="mr-2 text-blue-500 flex-shrink-0" /> 
                        <Link href="/wohnungsreinigung" className="text-blue-600 hover:text-blue-800 hover:underline break-words">Wohnungsreinigung</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Gründliche Reinigung Ihrer Wohnung. Professionelle Wohnungsreinigung in Zürich.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Sparkles className="mr-2 text-blue-500 flex-shrink-0" /> 
                        <Link href="/hausreinigung" className="text-blue-600 hover:text-blue-800 hover:underline break-words">Hausreinigung</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Umfassende Reinigung für Ihr Haus. Professionelle Hausreinigung in Zürich.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Sparkles className="mr-2 text-blue-500 flex-shrink-0" /> 
                        <Link href="/fensterreinigung" className="text-blue-600 hover:text-blue-800 hover:underline break-words">Fensterreinigung</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Professionelle Fensterreinigung für strahlend saubere Fenster. Fensterreinigung in Zürich.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Sparkles className="mr-2 text-blue-500 flex-shrink-0" /> 
                        <Link href="/fassadenreinigung" className="text-blue-600 hover:text-blue-800 hover:underline break-words">Fassadenreinigung</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Professionelle Reinigung Ihrer Fassade. Fassadenreinigung in Zürich für ein gepflegtes Äusseres.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <MapPin className="mr-2 text-blue-500 flex-shrink-0" /> <span className="break-words">Möbellagerung</span></h4>
                      <p className="text-gray-600 break-words">Sichere Zwischenlagerung Ihrer Möbel, kurz- oder langfristig. Möbellagerung in Zürich.</p>
                    </div>
                </div>
              </article>
              
              <article className="pt-8 border-t border-gray-200 space-y-6 w-full min-w-0">
                <h2 className="text-3xl font-bold text-gray-800 break-words">Parkbewilligungen und Logistik in Zürich</h2>
                <p className="font-medium break-words w-full">In kaum einer Schweizer Stadt ist die Parksituation so angespannt wie in Zürich. Eine professionelle Umzugsfirma nimmt Ihnen diesen Stress ab. Erfahrene Anbieter beantragen bei der Verkehrsdienstabteilung die nötigen Halteverbotszonen für den Umzugstag. Vergleichen Sie mehrere Anbieter, um die beste Logistik-Lösung zu finden. Das garantiert nicht nur einen Parkplatz direkt vor der Tür, sondern verkürzt auch die Laufwege und damit die Arbeitszeit und Ihre Kosten.</p>
              </article>

            </motion.main>

            <LocationSidebar 
              city={city} 
              districts={{
                title: "Stadtkreise von Zürich",
                text: "Unsere Partner sind in allen Zürcher Stadtkreisen für Sie im Einsatz:",
                list: ["Kreis 1 (Altstadt)", "Kreis 2 (Enge, Wollishofen)", "Kreis 3 (Wiedikon)", "Kreis 4 (Aussersihl)", "Kreis 5 (Industriequartier)", "Kreis 6 (Unterstrass, Oberstrass)", "Kreis 7 (Fluntern, Hottingen)", "Kreis 8 (Seefeld)", "Kreis 9 (Altstetten, Albisrieden)", "Kreis 10 (Wipkingen, Höngg)", "Kreis 11 (Oerlikon, Seebach)", "Kreis 12 (Schwamendingen)"]
              }}
              searches={undefined as any}
            />
          </div>
          
          <LocationFAQ city={city} faqs={faqs} />

          <LocationPageNavigation allLocations={locations} currentCity={city} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UmzugsfirmaZurichPageClient;
