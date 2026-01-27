'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Award, Package, Sparkles, MapPin, Building, Globe, Users, Truck, Home, ShieldCheck, Clock, Star, ChevronRight, Calculator, TrendingUp } from 'lucide-react';
import { PiPianoKeysFill } from 'react-icons/pi';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import LocationSidebar from '@/components/locations/LocationSidebar';
import Image from 'next/image';
import { faqs } from '@/data/locationFaqs';

const AdvantageItem = ({ icon: Icon, title, text, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1 }}
      className="flex items-start min-w-0"
    >
      {Icon && <Icon className="w-6 h-6 md:w-8 md:h-8 text-green-500 mr-3 md:mr-4 mt-1 flex-shrink-0" />}
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-gray-800 text-sm md:text-base break-words mb-1">{title}</h4>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed break-words overflow-wrap-anywhere">{text}</p>
      </div>
    </motion.div>
  );
};

const UmzugsfirmaLuzernPageClient = () => {
  const city = "Luzern";
  const locationData = locations.find(loc => loc.name === city);

  const metaTitle = "Umzugsfirma Luzern vergleichen: Kostenlose Offerten";
  const metaDescription = "Umzugsfirma Luzern vergleichen: Kostenlose Offerten von geprüften Umzugsfirmen in Luzern. Privatumzug, Geschäftsumzug & mehr. Bis zu 40% sparen!";
  const canonicalUrl = '/umzugsfirma-in-der-naehe/luzern';

  // Cost table data - Hourly rates
  const hourlyRates = [
    { service: "1 Umzugswagen + 1 Zügelmann", price: "CHF 110.-" },
    { service: "1 Umzugswagen + 2 Zügelmänner", price: "CHF 170.-" },
    { service: "1 Umzugswagen + 3 Zügelmänner", price: "CHF 210.-" },
    { service: "2 Umzugswagen + 4 Zügelmänner", price: "CHF 270.-" },
    { service: "2 Umzugswagen + 5 Zügelmänner", price: "CHF 325.-" },
    { service: "2 Umzugswagen + 6 Zügelmänner", price: "CHF 395.-" }
  ];

  // Cost table data - By room size
  const costTableRows = [
    { size: "1.5-Zimmer-Wohnung", cost: "CHF 620 - 660" },
    { size: "2.5-Zimmer-Wohnung", cost: "CHF 660 - 980" },
    { size: "3.5-Zimmer-Wohnung", cost: "CHF 1'080 - 1'250" },
    { size: "4.5-Zimmer-Wohnung", cost: "CHF 1'420 - 1'890" },
    { size: "5.5-Zimmer-Wohnung", cost: "CHF 1'980 - 2'490" },
    { size: "6.5-Zimmer-Wohnung", cost: "CHF 2'490 - 3'150" }
  ];

  const savingsTips = [
    { 
      title: "Flexibles Datum wählen", 
      description: "Umzüge unter der Woche sind deutlich günstiger als am Wochenende. Ein Umzug an einem Dienstag oder Mittwoch kann die Kosten um 20-30% senken." 
    },
    { 
      title: "Eigenleistung erbringen", 
      description: "Packen Sie Ihre Kartons selbst und demontieren Sie einfache Möbel. Das reduziert die teuren Arbeitsstunden der Profis erheblich." 
    },
    { 
      title: "Richtig ausmisten", 
      description: "Je weniger Umzugsgut, desto günstiger der Umzug. Verkaufen oder spenden Sie alles, was Sie nicht mehr brauchen, bevor Sie umziehen." 
    },
    { 
      title: "Offerten genau vergleichen", 
      description: "Achten Sie auf alle in der Offerte enthaltenen Leistungen wie Versicherung, Verpackungsmaterial oder Halteverbotszonen." 
    },
    { 
      title: "Frühzeitig buchen", 
      description: "Planen und buchen Sie Ihre Umzugsfirma mindestens 6-8 Wochen im Voraus, um von besseren Preisen und mehr Auswahl zu profitieren." 
    }
  ];

  const services = [
    { title: "Privatumzüge", icon: Home, text: "Vom kleinen Studio bis zum grossen Einfamilienhaus. Professionelle Umzugsunternehmen in Luzern kümmern sich um jeden privaten Umzug." },
    { title: "Geschäftsumzüge", icon: Building, text: "Effiziente und schnelle Büro- und Firmenumzüge. Minimale Geschäftsunterbrechung garantiert." },
    { title: "Spezialtransporte", icon: Package, text: "Klaviertransport, Tresortransport und Transport von Kunstgegenständen. Professionelle Spezialisten für empfindliche Güter." },
    { title: "Umzugsreinigung", icon: Sparkles, text: "Endreinigung mit Abnahmegarantie für eine sorgenfreie Wohnungsübergabe an Ihren Vermieter." },
    { title: "Lagerung", icon: Truck, text: "Sichere Einlagerung Ihrer Möbel und Kartons für kurze oder längere Zeiträume." },
    { title: "Auslandumzug", icon: Globe, text: "Umzüge ins oder aus dem Ausland. Professionelle Zollabwicklung und internationale Logistik." }
  ];

  const advantages = [
    {
      icon: CheckCircle,
      title: "Bis zu 6 Offerten vergleichen",
      text: "Mit nur einer Anfrage erhalten Sie bis zu 6 kostenlose und unverbindliche Offerten von qualitätsgeprüften Umzugsfirmen in Luzern. So haben Sie die perfekte Vergleichsgrundlage und finden das beste Preis-Leistungs-Verhältnis."
    },
    {
      icon: ShieldCheck,
      title: "Geprüfte Partnerfirmen",
      text: "Wir arbeiten ausschliesslich mit etablierten und versicherten Umzugsunternehmen zusammen. Alle Partner in unserem Netzwerk wurden sorgfältig ausgewählt und erfüllen hohe Qualitätsstandards."
    },
    {
      icon: Star,
      title: "Bis zu 40% sparen",
      text: "Durch den direkten Vergleich mehrerer Offerten finden Sie mühelos das beste Angebot und sparen bares Geld. Studien zeigen, dass Kunden durch den Vergleich durchschnittlich 30-40% der Umzugskosten einsparen können."
    },
    {
      icon: Clock,
      title: "Kostenlos & Unverbindlich",
      text: "Unser Service ist für Sie komplett kostenfrei. Sie entscheiden ohne Druck, ob Sie eine Offerte annehmen. Es gibt keine versteckten Gebühren oder Verpflichtungen."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://online-offerten.ch/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": `Umzugsfirma ${city}`,
            "item": `https://online-offerten.ch${canonicalUrl}`
          }
        ]
      },
      {
        "@type": "Service",
        "serviceType": "Umzugsvermittlung",
        "name": metaTitle,
        "description": metaDescription,
        "provider": {
          "@type": "Organization",
          "name": "Online-Offerten.ch",
          "url": "https://online-offerten.ch"
        },
        "areaServed": {
          "@type": "City",
          "name": city,
          "containedInPlace": {
            "@type": "Country",
            "name": "Switzerland"
          }
        },
        "offers": {
          "@type": "Offer",
          "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&city=" + city,
          "priceCurrency": "CHF",
          "price": "0"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="bg-white overflow-x-hidden">
        {/* Hero Section - Ana Sayfa Stili */}
        <section 
          className="relative w-full py-12 md:py-16 overflow-hidden bg-white z-20" 
          aria-label="Umzugsfirma Luzern - Kostenlose Offerten"
          itemScope
          itemType="https://schema.org/Service"
        >
          <div className="container mx-auto max-w-7xl px-0 sm:px-4 md:px-6">
            <div className="bg-white rounded-none sm:rounded-2xl overflow-hidden shadow-none sm:shadow-xl">
              <div className="flex flex-col lg:flex-row-reverse">
                {/* Right Side - Image (40% on desktop) */}
                <div className="w-full lg:w-[40%] relative">
                  <div className="relative w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[500px]">
                    <Image 
                      src={(locationData as any)?.image || '/image/default-umzug.jpg'}
                      alt="Professionelle Zügelfirma in Luzern - Umzugsunternehmen bei der Arbeit"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                </div>

                {/* Left Side - Green Content Area (60% on desktop) */}
                <div className="w-full lg:w-[60%] bg-[#0d4d2c] relative px-4 sm:px-8 md:px-12 py-6 sm:py-10 md:py-12 lg:py-16">
                  {/* Yellow Badge - Top Right */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-yellow-400 rounded-full px-4 py-2 shadow-lg z-10">
                    <p className="text-black text-xs sm:text-sm font-bold text-center leading-tight">
                      Kostenlos &<br />unverbindlich
                    </p>
                  </div>

                  {/* Badge */}
                  <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                    <span className="text-sm font-medium text-white">Luzern & Zentralschweiz</span>
                  </div>

                  {/* Heading */}
                  <h1 
                    className="heading-1-white pr-20 sm:pr-24"
                  itemProp="name"
                    style={{
                      fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                      fontWeight: 700,
                      textAlign: 'start',
                      letterSpacing: 'normal',
                      wordSpacing: '0px',
                      fontStyle: 'normal',
                      textTransform: 'none',
                      textDecoration: 'none',
                      textIndent: '0px'
                    }}
                >
                  Umzugsfirma{' '}
                    <span className="text-yellow-400">Luzern</span>{' '}
                  vergleichen: Kostenlose Offerten
                </h1>
                
                  {/* Description */}
                  <p className="text-base sm:text-lg text-white/90 mb-8 leading-relaxed" itemProp="description">
                    Umzugsfirma Luzern vergleichen: Kostenlose Offerten von geprüften Umzugsfirmen in Luzern und der Zentralschweiz. Professionelle Zügelfirmen in Luzern bieten umfassende Dienstleistungen für Privatumzug, Geschäftsumzug, Auslandumzug und Spezialtransporte. Qualitativ hochwertige Umzugsunternehmen mit Reinigung, Räumung, Entsorgung und Lagerung. Mehrere Anbieter vergleichen und bis zu 40% sparen!
                </p>
                
                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Button 
                      asChild
                      size="lg" 
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 group"
                    >
                      <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Luzern">
                        Kostenlose Offerten anfordern
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                    </Button>
                    <Button 
                      asChild
                      variant="outline"
                      size="lg" 
                      className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-6 text-lg rounded-lg shadow-sm hover:shadow-md"
                  >
                      <Link href="/umzugsfirma/umzugskosten">
                        <Calculator className="w-5 h-5 mr-2" />
                        Kosten berechnen
                  </Link>
                    </Button>
                  </div>
                  
                  {/* Trust Badges */}
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div className="flex items-center gap-2 text-white">
                      <CheckCircle className="w-5 h-5 text-yellow-400" />
                      <span className="font-medium">100% kostenlos</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <ShieldCheck className="w-5 h-5 text-yellow-400" />
                      <span className="font-medium">Geprüfte Partner</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <TrendingUp className="w-5 h-5 text-yellow-400" />
                      <span className="font-medium">Bis zu 40% sparen</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Breadcrumb Navigation - Hero Altında */}
            <nav className="mt-4 sm:mt-6 pt-4 px-4 sm:px-0" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-green-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </li>
                <li>
                  <Link href="/umzugsfirma-in-der-naehe" className="hover:text-green-600 transition-colors">
                    Umzugsfirma in der Nähe
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </li>
                <li className="text-gray-900 font-medium" aria-current="page">
                  Umzugsfirma Luzern
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* Two Column Layout: Content Left, Services Right */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column - Content */}
              <div className="lg:col-span-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Umzugsfirma Luzern: Full Service Umzug für einen stressfreien Umzug in der Zentralschweiz
                </h2>
                <div className="text-gray-700 mb-8 leading-relaxed space-y-4">
                  <p>
                    Planen Sie einen Umzug in Luzern und suchen eine zuverlässige Umzugsfirma? Unser Full Service Umzug in Luzern bietet Ihnen eine komplett sorgenfreie Lösung – von der ersten Planung bis zum letzten ausgepackten Karton. Als erfahrene Umzugsfirma Luzern übernehmen wir nicht nur den Transport, sondern das gesamte Umzugsprojekt: professionelle Verpackung mit hochwertigem Material, schonender Transport durch speziell geschulte Teams, fachgerechte Möbelmontage und auf Wunsch auch gründliche Umzugsreinigung mit Abnahmegarantie.
                  </p>
                  <p>
                    Unsere Zügelfirma Luzern kennt die Besonderheiten der Zentralschweiz: die engen Gassen der Altstadt, die Parkregelungen in den verschiedenen Quartieren und die effizientesten Routen für einen reibungslosen Ablauf. Wir beantragen die notwendigen Halteverbotszonen bei der Stadt Luzern und planen jeden Umzug individuell nach Ihren Bedürfnissen – egal ob Privatumzug innerhalb Luzerns, Geschäftsumzug mit minimalen Ausfallzeiten oder spezieller Transport für Klavier, Tresor oder Kunstgegenstände.
                  </p>
                  <p>
                    Mit unserer Full Service Lösung müssen Sie sich um nichts kümmern. Unsere geprüften Umzugsunternehmen in Luzern sind versichert, zertifiziert und verfügen über langjährige Erfahrung in der Region. Transparente Fixpreise ohne versteckte Kosten und persönliche Betreuung gehören zu unserem Standard. <strong>Vergleichen Sie jetzt kostenlos mehrere Offerten von Top-Umzugsfirmen in Luzern und sparen Sie bis zu 40% bei Ihrem Umzug.</strong>
                  </p>
                </div>
              </div>
              
              {/* Right Column - Services - Luzern Özel */}
              <div className="lg:col-span-4">
                <div className="sticky top-24">
                  <LocationSidebar 
                    city={city} 
                    districts={{
                      title: "Stadtteile in Luzern",
                      text: "Unsere Partner sind in allen Quartieren von Luzern für Sie im Einsatz:",
                      list: [
                        "Altstadt",
                        "Neustadt",
                        "Wesemlin",
                        "Tribschen",
                        "Bramberg",
                        "Hirschmatt",
                        "Maihof",
                        "Biregg",
                        "Littau",
                        "Reussbühl",
                        "Würzenbach",
                        "Stadtteil Nord"
                      ]
                    }}
                    searches={undefined as any}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <main className="space-y-12">
              <article className="pt-8 border-t border-gray-200 space-y-6 w-full min-w-0">
                <h2 className="typography-h2 mb-6">Was kostet ein Umzug mit einer Umzugsfirma in Luzern?</h2>
                <p className="typography-p mb-4">
                  Die Umzugskosten für einen Umzug mit einer professionellen Umzugsfirma in Luzern richten sich nach dem individuellen Aufwand. Massgeblich sind dabei Faktoren wie die Distanz zwischen Start- und Zieladresse, die Anzahl der Stockwerke, die Verfügbarkeit eines Lifts, das Umzugsvolumen sowie gewünschte Zusatzleistungen.
                </p>
                <p className="typography-p mb-6">
                  Die angegebenen Richtwerte beziehen sich auf Umzüge ab oder innerhalb von Luzern und dienen ausschliesslich zur Orientierung. Preisunterschiede können je nach Wohnsituation, Zugänglichkeit der Liegenschaft und Umfang des Umzugsguts entstehen.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Hourly Rates Table */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex-shrink-0">
                      <h3 className="typography-h3 !text-white">Umzugspreise - Kosten pro Stunde</h3>
                    </div>
                    <div className="overflow-x-auto flex-1">
                      <table className="w-full table-fixed">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left typography-h4 border-b border-gray-200 w-2/3">Umzugswagen und Zügelmänner (ca. 25 m³)</th>
                            <th className="px-4 py-3 text-right typography-h4 border-b border-gray-200 w-1/3">Preis</th>
                          </tr>
                        </thead>
                        <tbody>
                          {hourlyRates.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 border-b border-gray-100 typography-p">{row.service}</td>
                              <td className="px-4 py-3 border-b border-gray-100 text-right typography-p font-semibold text-green-600">{row.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Room Size Costs Table */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex-shrink-0">
                      <h3 className="typography-h3 !text-white">Umzugskosten nach Zimmergrössen</h3>
                    </div>
                    <div className="overflow-x-auto flex-1">
                      <table className="w-full table-fixed">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left typography-h4 border-b border-gray-200 w-2/3">Anzahl Zimmer</th>
                            <th className="px-4 py-3 text-right typography-h4 border-b border-gray-200 w-1/3">Umzugskosten durchschnittlich (CHF)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {costTableRows.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 border-b border-gray-100 typography-p">{row.size}</td>
                              <td className="px-4 py-3 border-b border-gray-100 text-right typography-p font-semibold text-green-600">{row.cost}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                  <div className="bg-gray-50 rounded-lg px-6 py-4 border border-gray-200">
                  <p className="typography-p text-gray-600 italic">
                    Alle Angaben verstehen sich exklusive Mehrwertsteuer. Kosten für An- und Rückfahrt, Verpackungsmaterial sowie zusätzliche Leistungen werden in der Regel nach individuellem Aufwand berechnet und separat ausgewiesen.
                  </p>
                </div>
                </article>

                <article className="pt-8 border-t border-gray-200 space-y-6 w-full min-w-0">
                  <h2 className="text-3xl font-bold text-gray-800 break-words">Umzugsfirma vergleichen Luzern: Ihre Vorteile</h2>
                  <p className="font-medium mb-4 break-words w-full">Umzugsfirma vergleichen Luzern: Vergleichen Sie mehrere Zügelfirmen Luzern und Umzugsunternemen Luzern und profitieren Sie von folgenden Vorteilen:</p>
                  <div className="space-y-4">
                    <div className="flex items-start w-full min-w-0">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-800 break-words">Erhebliche Kosten sparen</h4>
                        <p className="text-gray-600 leading-relaxed break-words">Umzugsfirma Luzern vergleichen: Durch den direkten Vergleich mehrerer Zügelfirmen Luzern und Umzugsunternemen Luzern finden Sie mühelos das beste Preis-Leistungs-Verhältnis und können erheblich sparen. Bis zu 40% Ersparnis möglich!</p>
                      </div>
                    </div>
                    <div className="flex items-start w-full min-w-0">
                      <Award className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-800 break-words">Geprüfte Qualität und Vertrauen</h4>
                        <p className="text-gray-600 leading-relaxed break-words">Wir vermitteln Ihnen ausschliesslich geprüfte, versicherte und top bewertete Umzugsfirmen aus der Region Luzern. Alle Partner sind zertifiziert und versichert.</p>
                      </div>
                    </div>
                    <div className="flex items-start w-full min-w-0">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-800 break-words">100% Kostenlos und unverbindlich</h4>
                        <p className="text-gray-600 leading-relaxed break-words">Ihre Anfrage generiert kostenlose Offerten. Sie entscheiden in Ruhe, ob und welche Offerte Sie annehmen. Keine versteckten Kosten.</p>
                      </div>
                    </div>
                  </div>
              </article>

              <article className="pt-8 border-t border-gray-200 space-y-6 w-full min-w-0">
                  <h2 className="text-3xl font-bold text-gray-800 break-words">Umzugsfirma Luzern: Alle Dienstleistungen im Überblick</h2>
                  <p className="font-medium break-words w-full">Eine moderne Umzugsfirma in Luzern bietet viel mehr als nur den Transport. Stellen Sie sich Ihr individuelles Servicepaket zusammen. Unsere Partner bieten folgende Dienstleistungen an:</p>
                  <div className="grid md:grid-cols-2 gap-6 mt-6 w-full">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2 break-words">
                        <Package className="mr-2 text-green-500 flex-shrink-0" /> 
                        <Link href="/umzugsfirma/privatumzug" className="text-green-600 hover:text-green-800 hover:underline break-words">Privatumzug</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Der klassische Wohnungswechsel, individuell auf Ihre Bedürfnisse zugeschnitten. Finden Sie die beste Umzugsfirma Luzern für Ihren Privatumzug.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Building className="mr-2 text-green-500 flex-shrink-0" /> 
                        <Link href="/umzugsfirma/geschaeftsumzug" className="text-green-600 hover:text-green-800 hover:underline break-words">Geschäftsumzug</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Minimale Ausfallzeiten und sorgfältige Planung für Büros und Firmen. Professioneller Umzug für Unternehmen in Luzern.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Globe className="mr-2 text-green-500 flex-shrink-0" /> 
                        <Link href="/umzugsfirma/internationale-umzuege" className="text-green-600 hover:text-green-800 hover:underline break-words">Internationale Umzüge</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Komplette Abwicklung inklusive Zollformalitäten. Umzug ins Ausland mit professioneller Unterstützung.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Package className="mr-2 text-green-500 flex-shrink-0" /> 
                        <Link href="/umzugsfirma/spezialtransporte" className="text-green-600 hover:text-green-800 hover:underline break-words">Spezialtransporte</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Transport für Klaviere, Tresore, Maschinen & Geräte. Professionelle Spezialtransporte in Luzern.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <PiPianoKeysFill className="mr-2 text-green-500 flex-shrink-0" /> 
                        <Link href="/umzugsfirma/klaviertransport" className="text-green-600 hover:text-green-800 hover:underline break-words">Klaviertransport</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Professioneller Transport für Klaviere und Flügel. Spezialisierte Zügelfirmen für Klaviertransport in Luzern.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <MapPin className="mr-2 text-green-500 flex-shrink-0" /> <span className="break-words">Möbellagerung</span></h4>
                      <p className="text-gray-600 break-words">Sichere Zwischenlagerung Ihrer Möbel, kurz- oder langfristig. Möbellagerung in Luzern.</p>
                    </div>
                </div>
              </article>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="text-center bg-green-50 p-8 rounded-lg border-l-4 border-green-500 shadow-md w-full min-w-0 overflow-x-hidden">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 break-words">Umzugsfirma vergleichen Luzern: Jetzt starten!</h3>
                  <p className="text-gray-700 mb-6 font-medium break-words w-full">Umzugsfirma Luzern: Mit nur einer Anfrage erhalten Sie bis zu fünf kostenlose und unverbindliche Offerten von Top-Umzugsfirmen aus Luzern. Vergleichen Sie mehrere Zügelfirmen Luzern und Umzugsunternemen Luzern und sparen Sie bis zu 40%.</p>
                  <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white group shadow-lg transform hover:scale-105 transition-transform">
                    <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Luzern">
                      Umzugsfirmen vergleichen Luzern & Offerten anfordern
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              </motion.div>
              
                <article className="pt-8 border-t border-gray-200 space-y-6 w-full min-w-0">
                  <h2 className="text-3xl font-bold text-gray-800 break-words">Umzugsfirma Luzern: Parkbewilligungen und Logistik</h2>
                  <p className="font-medium break-words w-full">Die Parkplatzsituation in Luzern kann herausfordernd sein. Eine professionelle Umzugsfirma Luzern nimmt Ihnen diesen Stress ab. Erfahrene Zügelfirmen Luzern und Umzugsunternemen Luzern beantragen bei der Stadt Luzern die nötigen Halteverbotszonen für den Umzugstag. Umzugsfirma vergleichen Luzern: Vergleichen Sie mehrere Anbieter, um die beste Logistik-Lösung zu finden. Das garantiert nicht nur einen Parkplatz direkt vor der Tür, sondern verkürzt auch die Laufwege und damit die Arbeitszeit und Ihre Kosten.</p>
              </article>
            </main>
          </div>
        </section>
          
        {/* Navigation Section */}
        <section className="py-12 md:py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <LocationPageNavigation allLocations={locations} currentCity={city} />
        </div>
        </section>
      </div>
    </>
  );
};

export default UmzugsfirmaLuzernPageClient;
