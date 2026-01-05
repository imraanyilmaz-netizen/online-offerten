'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Award, Package, Sparkles, MapPin, Building, Globe, Users, Truck, Home, ShieldCheck, Clock, Star } from 'lucide-react';
import { PiPianoKeysFill } from 'react-icons/pi';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import LocationSidebar from '@/components/locations/LocationSidebar';
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
  const canonicalUrl = '/umzugsfirma-luzern';

  const costTableRows = [
    { size: "1.5 - 2 Zimmer", staff: "2 Zügelmänner, 1 LKW", cost: "800 – 1'500" },
    { size: "2.5 - 3 Zimmer", staff: "3 Zügelmänner, 1 LKW", cost: "1'200 – 2'000" },
    { size: "3.5 - 4.5 Zimmer", staff: "3-4 Zügelmänner, 1-2 LKW", cost: "1'600 – 2'800" },
    { size: "5.5+ Zimmer / Haus", staff: "4-5 Zügelmänner, 2 LKW", cost: "2'500 – 5'000+" }
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

  const faqItemsForSchema = faqs.move.concat(faqs.clean);
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": ["MovingCompany", "Moving and Storage", "CleaningService"],
    "provider": {
      "@type": "Organization",
      "name": `Online-Offerten.ch - Umzugsfirmen in ${city}`
    },
    "areaServed": {
      "@type": "City",
      "name": "Luzern",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Luzern",
        "addressRegion": "LU",
        "addressCountry": "CH"
      }
    },
    "name": metaTitle,
    "description": metaDescription,
    "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": faqItemsForSchema.map(item => ({
            "@type": "Question",
            "name": ((item.question as any).de || item.question as any).replace('{city}', city),
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer.map((ans: any) => typeof ans === 'string' ? ans : (ans.de || ans)).join(' ').replace(/{city}/g, city)
            }
        }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="bg-white overflow-x-hidden w-full max-w-full">
        {/* Hero Section - Split Layout */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-full py-12 md:py-16 lg:py-20 overflow-hidden"
          itemScope
          itemType="https://schema.org/Service"
        >
          {/* Background Image - Right Side */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${(locationData as any)?.image || 'https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-luzern-kostenlose-offerte.webp'}')`,
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
          
          <div className="container mx-auto max-w-navbar px-4 md:px-6 relative z-10 overflow-x-hidden w-full max-w-full">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center min-h-[400px] md:min-h-[500px] w-full">
              {/* Left Side - Content Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-white rounded-xl shadow-xl p-5 md:p-6 lg:p-7 w-full max-w-full overflow-x-hidden overflow-wrap break-words"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-semibold text-green-600">Luzern & Zentralschweiz</span>
                </div>
                <h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 leading-tight break-words"
                  itemProp="name"
                >
                  Umzugsfirma{' '}
                  <span className="text-green-600 underline decoration-green-500 decoration-2 underline-offset-4">Luzern</span>{' '}
                  vergleichen: Kostenlose Offerten
                </h1>
                
                <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed font-medium break-words overflow-wrap-anywhere" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }} itemProp="description">
                  Umzugsfirma Luzern vergleichen: Kostenlose Offerten von geprüften Umzugsfirmen in{' '}
                  <span className="font-semibold text-green-600 underline decoration-green-400 decoration-1">Luzern</span>{' '}
                  und der Zentralschweiz. Professionelle Zügelfirmen in Luzern bieten umfassende Dienstleistungen für Privatumzug, Geschäftsumzug, Auslandumzug und Spezialtransporte. Qualitativ hochwertige Umzugsunternehmen mit Reinigung, Räumung, Entsorgung und Lagerung. Mehrere Anbieter vergleichen und bis zu 40% sparen!
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
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug&city=Luzern"
                    className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-all transform hover:scale-105 group overflow-hidden w-full"
                  >
                    <Home className="w-6 h-6 text-green-600 mb-1.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Privatumzug</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Wohnung, Haus, WG-Zimmer</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                  
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=geschaeftsumzug&city=Luzern"
                    className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-all transform hover:scale-105 group overflow-hidden w-full"
                  >
                    <Building className="w-6 h-6 text-green-600 mb-1.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Geschäftsumzug</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Büro, Ladenlokal, Werkstatt</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                  
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=international&city=Luzern"
                    className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-all transform hover:scale-105 group overflow-hidden w-full"
                  >
                    <Globe className="w-6 h-6 text-green-600 mb-1.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Internationaler Umzug</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Umzüge ins oder aus dem Ausland</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                  
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=spezialtransport&city=Luzern"
                    className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-all transform hover:scale-105 group overflow-hidden w-full"
                  >
                    <Package className="w-6 h-6 text-green-600 mb-1.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Spezialtransport</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Klavier, Tresor, Kunst & mehr</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Main Content Section */}
        <div className="container mx-auto max-w-navbar px-4 md:px-6 py-12 md:py-16 lg:py-20 w-full max-w-full overflow-x-hidden">
          <div className="grid lg:grid-cols-4 gap-8 md:gap-12 items-start w-full">
            {/* Main Content - 3 columns */}
            <motion.main 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 space-y-12 w-full min-w-0 overflow-x-hidden"
            >
              {/* Why Compare Section */}
              <article className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8 border border-gray-100 w-full min-w-0 overflow-x-hidden">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6 break-words overflow-wrap-anywhere">Warum Umzugsfirmen in Luzern vergleichen?</h2>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 break-words overflow-wrap-anywhere">
                  Ein Umzug in Luzern, der wunderschönen Stadt am Vierwaldstättersee, erfordert sorgfältige Planung und eine zuverlässige Umzugsfirma an Ihrer Seite. Ob Sie innerhalb der malerischen Altstadt, in einen modernen Vorort oder aus einem anderen Kanton nach Luzern ziehen – der Vergleich mehrerer Anbieter ist der Schlüssel zu einem erfolgreichen und kostengünstigen Umzug.
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 break-words overflow-wrap-anywhere">
                  Die Preise für Umzugsdienstleistungen in Luzern können erheblich variieren. Während einige Umzugsfirmen sehr günstige Pauschalpreise anbieten, können andere bei ähnlichen Leistungen deutlich höhere Kosten verlangen. Ein systematischer Vergleich hilft Ihnen nicht nur, das beste Preis-Leistungs-Verhältnis zu finden, sondern auch sicherzustellen, dass Sie mit einem seriösen und zuverlässigen Unternehmen zusammenarbeiten.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  {advantages.map((advantage, index) => (
                    <AdvantageItem
                      key={index}
                      icon={advantage.icon}
                      title={advantage.title}
                      text={advantage.text}
                      delay={index}
                    />
                  ))}
                </div>
              </article>

              {/* Services Section */}
              <article className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8 border border-gray-100 w-full min-w-0 overflow-x-hidden">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6 break-words overflow-wrap-anywhere">Umzugsleistungen in Luzern: Von A bis Z</h2>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 break-words overflow-wrap-anywhere">
                  Professionelle Umzugsfirmen in Luzern bieten ein breites Spektrum an Dienstleistungen, um Ihren Umzug so reibungslos wie möglich zu gestalten. Egal, ob Sie einen einfachen Wohnungsumzug, einen komplexen Geschäftsumzug oder einen speziellen Transport benötigen – die richtige Firma hat die Erfahrung und das Equipment, um Ihre Anforderungen zu erfüllen.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  {services.map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-green-300 transition-colors"
                      >
                        <div className="flex items-start gap-3 md:gap-4">
                          <div className="p-2 md:p-3 bg-green-100 rounded-lg flex-shrink-0">
                            <Icon className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 break-words">{service.title}</h3>
                            <p className="text-sm md:text-base text-gray-600 leading-relaxed break-words overflow-wrap-anywhere">{service.text}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </article>

              {/* Cost Overview Section */}
              <article className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8 border border-gray-100 w-full min-w-0 overflow-x-hidden">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6 break-words overflow-wrap-anywhere">Umzugskosten in Luzern: Ihr Überblick</h2>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 break-words overflow-wrap-anywhere">
                  Die Kosten für einen Umzug in Luzern hängen von verschiedenen Faktoren ab. Die Grösse Ihrer Wohnung, die Entfernung zwischen altem und neuem Zuhause, die Anzahl der Stockwerke, das Umzugsdatum und gewünschte Zusatzleistungen beeinflussen den Gesamtpreis. Als grobe Orientierungshilfe können Sie mit folgenden Richtwerten rechnen:
                </p>
                <div className="overflow-x-auto mt-6 w-full max-w-full">
                  <table className="w-full max-w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm" style={{ minWidth: '100%' }}>
                    <thead className="bg-green-600 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Wohnungsgrösse</th>
                        <th className="px-4 py-3 text-left font-semibold">Personal & Equipment</th>
                        <th className="px-4 py-3 text-left font-semibold">Kosten (CHF)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {costTableRows.map((row, index) => (
                        <tr key={index} className="hover:bg-green-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-800">{row.size}</td>
                          <td className="px-4 py-3 text-gray-600">{row.staff}</td>
                          <td className="px-4 py-3 font-semibold text-green-600">{row.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 italic mt-4">
                  * Diese Preise sind Richtwerte für einen Umzug innerhalb von Luzern. Die tatsächlichen Kosten können je nach Distanz, Stockwerk, Umzugsdatum und gewünschten Zusatzleistungen variieren. Eine kostenlose Besichtigung vor Ort ermöglicht eine präzise Offerte.
                </p>
              </article>

              {/* Savings Tips Section */}
              <article className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8 border border-gray-100 w-full min-w-0 overflow-x-hidden">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6 break-words overflow-wrap-anywhere">Clevere Spartipps für Ihren Umzug in Luzern</h2>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 break-words overflow-wrap-anywhere">
                  Mit ein paar strategischen Massnahmen können Sie die Kosten für Ihren Umzug in Luzern erheblich reduzieren. Die folgenden Tipps helfen Ihnen dabei, Geld zu sparen, ohne dabei auf Qualität oder Sicherheit verzichten zu müssen.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  {savingsTips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 md:p-6 border border-green-200"
                    >
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3 flex items-center gap-2 break-words">
                        <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                        <span className="break-words overflow-wrap-anywhere">{tip.title}</span>
                      </h3>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed break-words overflow-wrap-anywhere">{tip.description}</p>
                    </motion.div>
                  ))}
                </div>
              </article>

              {/* Location Specific Section */}
              <article className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8 border border-gray-100 w-full min-w-0 overflow-x-hidden">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6 break-words overflow-wrap-anywhere">Umzugslogistik in Luzern: Besonderheiten und Herausforderungen</h2>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6 break-words overflow-wrap-anywhere">
                  Luzern als Stadt am Vierwaldstättersee mit seiner historischen Altstadt und den engen Gassen stellt besondere Anforderungen an Umzugsfirmen. Erfahrene Zügelfirmen in Luzern kennen die örtlichen Gegebenheiten und wissen, wie man mit den Herausforderungen umgeht.
                </p>
                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Parkbewilligungen und Verkehrssituation</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In der Luzerner Altstadt und in vielen zentralen Quartieren ist die Parksituation besonders angespannt. Eine professionelle Umzugsfirma beantragt bei der Stadt Luzern die notwendigen Halteverbotszonen für den Umzugstag. Dies garantiert nicht nur einen Parkplatz direkt vor Ihrer Haustür, sondern verkürzt auch die Laufwege und damit die Arbeitszeit und Ihre Kosten.
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-6 md:mt-8 mb-3 md:mb-4 break-words overflow-wrap-anywhere">Altstadt und enge Gassen</h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-3 md:mb-4 break-words overflow-wrap-anywhere">
                  Die malerische Altstadt von Luzern mit ihren engen Gassen und verwinkelten Strassen erfordert spezielles Equipment und viel Erfahrung. Lokale Umzugsfirmen kennen die Zugänge, wissen, welche Fahrzeuge passen und können auch schwierige Umzugssituationen professionell meistern. Bei Altbauwohnungen mit engen Treppenhäusern oder ohne Lift ist Erfahrung besonders wichtig.
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-6 md:mt-8 mb-3 md:mb-4 break-words overflow-wrap-anywhere">Regionale Expertise</h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed break-words overflow-wrap-anywhere">
                  Umzugsfirmen aus Luzern und der Zentralschweiz kennen nicht nur die Stadt selbst, sondern auch die umliegenden Gemeinden wie Kriens, Emmen, Ebikon oder Horw. Diese regionale Expertise ermöglicht es ihnen, Umzüge innerhalb der Region besonders effizient und kostengünstig durchzuführen.
                </p>
              </article>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-2xl p-6 md:p-8 lg:p-12 text-center text-white w-full min-w-0 overflow-x-hidden">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 break-words overflow-wrap-anywhere px-2">Starten Sie jetzt Ihren Vergleich!</h2>
                <p className="text-base md:text-lg lg:text-xl text-green-100 mb-6 md:mb-8 max-w-2xl mx-auto break-words overflow-wrap-anywhere px-2">
                  Vergleichen Sie kostenlos mehrere Umzugsfirmen in Luzern und finden Sie das beste Angebot für Ihren Umzug. Einfach, schnell und völlig unverbindlich.
                </p>
                <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-bold text-lg px-8 py-6 shadow-xl">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug&city=Luzern">
                    Jetzt kostenlose Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.main>

            {/* Sidebar */}
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
          

          <LocationPageNavigation allLocations={locations} currentCity={city} />
        </div>
      </div>
    </>
  );
};

export default UmzugsfirmaLuzernPageClient;
