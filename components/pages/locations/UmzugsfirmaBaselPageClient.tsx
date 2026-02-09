'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, ShieldCheck, Package, Sparkles, MapPin, ChevronRight, Calculator, TrendingUp, FileText, Mail, BarChart3, Star } from 'lucide-react';
import Image from 'next/image';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import BaselSidebar from '@/components/locations/BaselSidebar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const AdvantageItem = ({ text, delay }: any) => {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1 + 0.5 }}
      className="flex items-start"
    >
      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
      <span className="text-gray-700 leading-relaxed">{text}</span>
    </motion.li>
  );
};

interface UmzugsfirmaBaselPageClientProps {
  baselPartners?: any[]
}

const UmzugsfirmaBaselPageClient = ({ baselPartners = [] }: UmzugsfirmaBaselPageClientProps) => {
  const city = "Basel";
  const locationData = locations.find(loc => loc.name === city);

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

  const extraServices = [
    { icon: Package, title: "Ein- & Auspackservice", text: "Lassen Sie Ihr Umzugsgut von Profis sicher verpacken." },
    { icon: Sparkles, title: "Umzugsreinigung", text: "Mit Abnahmegarantie für eine problemlose Wohnungsübergabe." },
    { icon: MapPin, title: "Möbellagerung", text: "Falls Sie Möbel temporär einlagern müssen." }
  ];

  const platformAdvantages = [
    "Nur eine Anfrage für mehrere Offerten.",
    "Alle Partnerfirmen sind von uns geprüft und bewertet.",
    "100% kostenloser und unverbindlicher Service.",
    "Direkter Vergleich spart nachweislich Kosten.",
    "Lokale Expertise für einen reibungslosen Ablauf in Basel."
  ];

  // FAQ Schema - Basel spezifische FAQs
  const baselFAQs = [
    {
      question: "Wie finde ich eine zuverlässige Umzugsfirma in Basel?",
      answer: "Am besten vergleichen Sie mehrere geprüfte Umzugsfirmen aus Basel. Achten Sie auf: Lokale Erfahrung: Kenntnisse mit Basler Altstadtgassen und Parkregelungen. Bewertungen: Echte Kundenfeedback auf unabhängigen Plattformen. Versicherung: Betriebshaftpflicht und Transportversicherung gemäss OR. Transparenz: Detaillierte Offerten ohne versteckte Kosten. Zertifizierungen: Mitgliedschaft bei Schweizer Umzugsverbänden."
    },
    {
      question: "Brauche ich eine Parkbewilligung für meinen Umzug in Basel?",
      answer: "Ja, in den meisten Fällen. In der Basler Altstadt und in vielen Quartieren benötigen Umzugsfirmen eine Halteverbotszone. Professionelle Umzugsunternehmen beantragen diese bei der Stadtpolizei Basel rechtzeitig (meist 1-2 Wochen im Voraus). Die Kosten hierfür sind meist in der Offerte enthalten und garantieren einen reservierten Parkplatz direkt vor Ihrer Haustür."
    },
    {
      question: "Wie lange im Voraus sollte ich eine Umzugsfirma in Basel buchen?",
      answer: "Für einen reibungslosen Ablauf empfehlen wir eine Buchung 4-6 Wochen im Voraus, besonders: Für Umzüge in der Altstadt (begrenzte Halteverbotszonen), an Monatsenden (Hauptumzugszeit), an Wochenenden (höhere Nachfrage), während der Sommermonate (Juni-September). Bei kurzfristigen Umzügen (unter 2 Wochen) ist die Auswahl an verfügbaren Terminen und Firmen eingeschränkter."
    },
    {
      question: "Welche Besonderheiten gibt es bei Umzügen in der Basler Altstadt?",
      answer: "Umzüge in der Basler Altstadt erfordern spezielle Planung: Enge Gassen: Spezielle kleinere Umzugswagen erforderlich. Steile Treppen: Viele Altbauhäuser ohne Aufzug. Eingeschränkte Parkmöglichkeiten: Halteverbotszonen obligatorisch. Lärmbeschränkungen: Bestimmte Uhrzeiten für laute Arbeiten. Historische Gebäude: Besondere Sorgfalt beim Schutz von Treppen und Türen. Erfahrene Basler Umzugsfirmen kennen diese Herausforderungen und planen entsprechend."
    },
    {
      question: "Was ist im Full Service Umzug in Basel enthalten?",
      answer: "Ein Full Service Umzug in Basel umfasst typischerweise: Vor-Ort-Besichtigung: Kostenlose Einschätzung und Beratung. Professionelle Verpackung: Hochwertiges Material und fachgerechte Packtechnik. Schonender Transport: Geschulte Teams und geeignete Fahrzeuge. Möbelmontage/Demontage: Fachgerechte Handhabung aller Möbel. Auf- und Abbau: Betten, Schränke, Tische etc. Optionale Zusatzleistungen: Umzugsreinigung mit Abnahmegarantie, Entsorgung von Verpackungsmaterial, Zwischenlagerung in sicheren Lagern, Spezialtransporte (Klavier, Tresor, Kunst). Alle Leistungen werden in einem transparenten Fixpreis angeboten, ohne versteckte Kosten."
    }
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section 
        className="relative w-full py-12 md:py-16 overflow-hidden bg-white z-20" 
        aria-label="Umzugsfirma Basel - Kostenlose Offerten"
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
                    alt="Professionelle Zügelfirma in Basel - Umzugsunternehmen bei der Arbeit"
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
                  <span className="text-sm font-medium text-white">Kanton Basel</span>
                </div>

                {/* Heading - H1 = SEO Title */}
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
                  <span className="text-yellow-400">Basel</span>{' '}
                  – Günstige Umzugsanbieter vergleichen & sparen
                </h1>
                  
                {/* Description */}
                <p className="text-base text-white/90 mb-8 leading-relaxed" itemProp="description">
                  Einfach und professionell umziehen. Finden Sie hier die besten Umzugs- und Reinigungsfirmen für Ihren Umzug in und um Basel.
                </p>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    asChild
                    size="lg" 
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 group"
                  >
                    <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Basel">
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
          
          {/* Breadcrumb Navigation */}
          <nav className="mt-4 sm:mt-6 pt-4 px-4 sm:px-0" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-green-600 transition-colors">
                  Startseite
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
                Umzugsfirma Basel
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
              <h2 className="heading-2">
                Günstige Umzugsfirma Basel finden – Kostenlos Offerten vergleichen & bis zu 40% sparen
              </h2>
              <div className="text-gray-700 mb-8 leading-relaxed space-y-6">
                <p>
                  Die Organisation Ihres Umzugs nach Basel war noch nie so einfach: Mit unserem Service erhalten Sie kostenlose Offerten für Ihren Umzug und/oder die Endreinigung Ihrer Wohnung in Basel – professionell, zuverlässig und ohne versteckte Kosten.
                </p>
                
                <div>
                  <h3 className="heading-3">
                    Ihr Umzug nach Basel mit unseren Partnerfirmen – professionell & zuverlässig:
                  </h3>
                  <p>
                    Basel stellt einzigartige Anforderungen an Umzugsfirmen: Historische Altstadtgassen, Rhein-Überquerungen zwischen Gross- und Kleinbasel, grenzüberschreitende Logistik nach Deutschland und Frankreich. Unsere geprüften Partnerfirmen in Basel beherrschen das gesamte Basler Umzugs-ABC – von Parkbewilligungen bei der Stadtpolizei Basel bis zur sensiblen Handhabung denkmalgeschützter Gebäude. Sie erhalten lokale Experten, die Basel kennen wie ihre Westentasche.
                  </p>
                </div>
                
                <div>
                  <h3 className="heading-3">
                    Unsere Umzugsfirmen in Basel – Ihre Experten für Transport & Reinigung:
                  </h3>
                  <p>
                    Die Wahl der richtigen Umzugsfirma in Basel entscheidet über Erfolg oder Stress. Unsere sorgfältig ausgewählten Partnerunternehmen in Basel-Stadt und Basel-Landschaft bieten komplette Umzugsdienstleistungen: professionelle Transporte innerhalb Basels, grenzüberschreitende Umzüge im Dreiländereck und rechtsverbindliche Endreinigungen mit Abnahmegarantie. Mit einer Anfrage vergleichen Sie mehrere geprüfte Anbieter und finden das beste Preis-Leistungs-Verhältnis für Ihren Basler Umzug.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Services - Basel Özel */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <BaselSidebar />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Geprüfte Umzugsfirmen in Basel - Partner Liste */}
      {baselPartners && baselPartners.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4" style={{ textAlign: 'center' }}>
                Geprüfte Umzugsfirmen in Basel
              </h2>
              <p className="font-medium max-w-3xl mx-auto" style={{ textAlign: 'center' }}>
                Unsere Partner sind erfahrene Umzugsunternehmen mit langjähriger Erfahrung in Basel und der Region. Über Online-Offerten.ch vergleichen Sie mehrere kostenlose und unverbindliche Offerten für Ihren Umzug.
              </p>
            </div>
            
            <div className="space-y-4">
              {baselPartners.map((partner: any) => {
                const rating = partner.average_rating || 0
                const reviewCount = partner.review_count || 0
                const partnerSlug = partner.slug || partner.id
                
                return (
                  <Link 
                    key={partner.id} 
                    href={`/partner/${partnerSlug}`}
                    className="group flex items-center gap-4 md:gap-6 bg-white rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-lg transition-all duration-300 p-4 md:p-5"
                  >
                    {/* Logo */}
                    <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center p-2 group-hover:border-green-300 transition-colors">
                      {partner.logo_url ? (
                        <Image
                          src={partner.logo_url}
                          alt={`${partner.company_name} logo`}
                          width={80}
                          height={80}
                          className="object-contain w-full h-full"
                          unoptimized
                        />
                      ) : (
                        <Image
                          src="/image/logo-icon.avif"
                          alt="Default logo"
                          width={80}
                          height={80}
                          className="object-contain w-full h-full"
                        />
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-grow min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-4">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors truncate">
                          {partner.company_name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 flex-shrink-0">
                          <MapPin className="w-4 h-4 mr-1 text-green-600" />
                          <span className="font-medium">Umzugsfirma in {city}</span>
                        </div>
                      </div>
                      
                      {/* Über uns */}
                      {partner.message && (
                        <p className="text-sm text-gray-600 mt-1 truncate">
                          {partner.message.length > 100
                            ? `${partner.message.substring(0, 100)}...`
                            : partner.message
                          }
                        </p>
                      )}
                      
                      {/* Bewertungen */}
                      {reviewCount > 0 && (
                        <div className="flex items-center mt-2 gap-1">
                          <div className="flex items-center text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.round(rating) ? 'fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-700 font-semibold ml-1">{rating.toFixed(1)}</span>
                          <span className="text-xs text-gray-500">({reviewCount} Bewertungen)</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex-shrink-0 hidden md:flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-50 group-hover:bg-green-100 flex items-center justify-center transition-colors">
                        <ArrowRight className="w-5 h-5 text-green-600 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
              <Button 
                asChild
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 text-lg rounded-lg shadow-xl"
              >
                <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Basel">
                  Kostenlose Offerten anfordern
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="heading-2">
              Umzugsfirma finden Basel leicht gemacht:
            </h2>
            <p className="text-body font-medium">
              Jetzt starten: Umzugsfirma Basel finden und Offerten vergleichen – 100% kostenlos, unverbindlich und ohne Registrierung.
            </p>
          </div>
          
          <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none -mx-4 md:mx-0 px-4 md:px-0 scrollbar-hide">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 w-[85vw] md:w-auto snap-start md:snap-none">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="heading-3">Anfrage stellen</h3>
              <p className="text-gray-600 leading-relaxed">
                Geben Sie Umzugsdatum, Wohnungsgrösse, Start- und Zielort an. Je genauer Ihre Angaben, desto präziser sind die Offerten.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 w-[85vw] md:w-auto snap-start md:snap-none">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="heading-3">Offerten vergleichen</h3>
              <p className="text-gray-600 leading-relaxed">
                Erhalten Sie bis zu 5 Offerten von Umzugsunternehmen Basel. Die Anbieter nehmen direkt Kontakt mit Ihnen auf und erstellen individuelle Offerten.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 w-[85vw] md:w-auto snap-start md:snap-none">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="heading-3">Beste Firma wählen</h3>
              <p className="text-gray-600 leading-relaxed">
                Vergleichen Sie Preise, Leistungen und Bewertungen. Wählen Sie den besten Umzugsanbieter in Basel für Ihren Umzug aus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <main className="space-y-12">

            <article className="pt-8 border-t border-gray-200 space-y-6 w-full min-w-0">
                <h2 className="heading-2 mb-6">Was kostet ein Umzug mit einer Umzugsfirma in Basel?</h2>
                <p className="text-body mb-4 leading-relaxed">
                  Die Umzugskosten für einen Umzug mit einer professionellen Umzugsfirma in Basel richten sich nach dem individuellen Aufwand. Massgeblich sind dabei Faktoren wie die Distanz zwischen Start- und Zieladresse, die Anzahl der Stockwerke, die Verfügbarkeit eines Lifts, das Umzugsvolumen sowie gewünschte Zusatzleistungen.
                </p>
                <p className="text-body mb-6 leading-relaxed">
                  Die angegebenen Richtwerte beziehen sich auf Umzüge ab oder innerhalb von Basel und dienen ausschliesslich zur Orientierung. Preisunterschiede können je nach Wohnsituation, Zugänglichkeit der Liegenschaft und Umfang des Umzugsguts entstehen.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Hourly Rates Table */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex-shrink-0">
                      <h3 className="heading-3 !text-white">Umzugspreise - Kosten pro Stunde</h3>
                    </div>
                    <div className="overflow-x-auto flex-1">
                      <table className="w-full table-fixed">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left heading-4 border-b border-gray-200 w-2/3">Umzugswagen und Zügelmänner (ca. 25 m³)</th>
                            <th className="px-4 py-3 text-right heading-4 border-b border-gray-200 w-1/3">Preis</th>
                          </tr>
                        </thead>
                        <tbody>
                          {hourlyRates.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 border-b border-gray-100 text-gray-700">{row.service}</td>
                              <td className="px-4 py-3 border-b border-gray-100 text-right font-semibold text-green-600">{row.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Room Size Costs Table */}
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex-shrink-0">
                      <h3 className="heading-3 !text-white">Umzugskosten nach Zimmergrössen</h3>
                    </div>
                    <div className="overflow-x-auto flex-1">
                      <table className="w-full table-fixed">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left heading-4 border-b border-gray-200 w-2/3">Anzahl Zimmer</th>
                            <th className="px-4 py-3 text-right heading-4 border-b border-gray-200 w-1/3">Umzugskosten durchschnittlich (CHF)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {costTableRows.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 border-b border-gray-100 text-gray-700">{row.size}</td>
                              <td className="px-4 py-3 border-b border-gray-100 text-right font-semibold text-green-600">{row.cost}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg px-6 py-4 border border-gray-200">
                  <p className="text-body italic leading-relaxed">
                    Alle Angaben verstehen sich exklusive Mehrwertsteuer. Kosten für An- und Rückfahrt, Verpackungsmaterial sowie zusätzliche Leistungen werden in der Regel nach individuellem Aufwand berechnet und separat ausgewiesen.
                  </p>
                </div>
            </article>

            <article className="pt-8 border-t border-gray-200 space-y-6 w-full min-w-0">
              <h2 className="heading-2">Warum über Online-Offerten.ch?</h2>
              <p className="text-body leading-relaxed">Profitieren Sie von einem einfachen und transparenten Prozess:</p>
              <ul className="space-y-4 mt-4">
                  {platformAdvantages.map((item, index) => (
                      <AdvantageItem key={index} text={item} delay={index + 1} />
                  ))}
              </ul>
            </article>
          </main>
        </div>
      </section>

      {/* FAQ Section - Basel spezifisch */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="heading-2">
              Häufige Fragen zu Umzügen in Basel
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Antworten auf die wichtigsten Fragen rund um Umzüge in Basel
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {baselFAQs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-2 mb-4"
                >
                  <AccordionTrigger className="text-xl font-semibold text-gray-900 hover:no-underline py-4">
                    <h4 className="faq-question">{faq.question}</h4>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
        
      {/* Navigation Section */}
      <section className="py-12 md:py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <LocationPageNavigation allLocations={locations} currentCity={city} />
        </div>
      </section>
    </div>
  );
};

export default UmzugsfirmaBaselPageClient;
