'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Award, Package, Sparkles, MapPin, Building, Globe, Users, Truck, Home } from 'lucide-react';
import { PiPianoKeysFill } from 'react-icons/pi';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import LocationSidebar from '@/components/locations/LocationSidebar';
import { cityServiceData } from '@/data/cityLocalBusinessData';
import { faqs } from '@/data/locationFaqs';

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

const UmzugsfirmaBernPageClient = () => {
  const city = "Bern";
  const locationData = locations.find(loc => loc.name === city);

  const metaTitle = "Umzugsfirma Bern: Zügelfirmen vergleichen & Umzugsunternemen finden » Mehrere Firmen vergleichen & bis zu 40% sparen";
  const metaDescription = "Umzugsfirma Bern: Vergleichen Sie mehrere Zügelfirmen Bern und Umzugsunternemen Bern. Umzugsfirma vergleichen Bern - Kostenlos und unverbindlich Offerten von geprüften Umzugsfirmen vergleichen. Privatumzug, Geschäftsumzug, Reinigung & mehr. Bis zu 40% sparen!";
  const canonicalUrl = '/umzugsfirma-bern';

  const advantages = [
    "Bis zu 40% sparen durch den Vergleich mehrerer Offerten.",
    "Nur geprüfte und bewertete Umzugsfirmen aus Bern.",
    "Kostenlose und unverbindliche Anfrage in nur 2 Minuten."
  ];

  const services = [
    {
      title: "Privatumzüge",
      text: "Vom kleinen Studio bis zum grossen Einfamilienhaus."
    },
    {
      title: "Geschäftsumzüge",
      text: "Effiziente und schnelle Büro- und Firmenumzüge."
    },
    {
      title: "Möbeltransport & Montage",
      text: "Sicherer Transport und fachgerechter Auf- und Abbau."
    },
    {
      title: "Umzugsreinigung",
      text: "Mit Abnahmegarantie für eine sorgenfreie Wohnungsübergabe."
    },
    {
      title: "Lagerung",
      text: "Sichere Einlagerung Ihrer Möbel und Kartons."
    }
  ];

  const faqItemsForSchema = faqs.move.concat(faqs.clean);
  const cityData = cityServiceData[city];
  
  // Service Schema with areaServed (correct for platform/aggregator model)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": cityData.displayName,
    "description": `Geprüfte Umzugsfirmen und Zügelfirmen in ${city} vergleichen. Kostenlose Offerten von professionellen Umzugsunternehmen.`,
    "serviceType": ["MovingCompany", "Moving and Storage", "CleaningService"],
    "provider": {
      "@type": "Organization",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch"
    },
    "areaServed": {
      "@type": "City",
      "name": city,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cityData.addressLocality,
        "addressRegion": cityData.addressRegion,
        "addressCountry": "CH"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": cityData.latitude,
        "longitude": cityData.longitude
      }
    },
    "url": `https://online-offerten.ch${canonicalUrl}`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CHF",
      "name": "Kostenlose Umzugsofferten"
    }
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
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      serviceSchema,
      faqSchema
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <div className="bg-white overflow-x-hidden">
        {/* Hero Section - Split Layout */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden"
          itemScope
          itemType="https://schema.org/Service"
        >
          {/* Background Image - Right Side */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${(locationData as any).image}')`,
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
                <h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 leading-tight break-words"
                  itemProp="name"
                >
                  Umzugsfirma{' '}
                  <span className="text-green-600 underline decoration-green-500 decoration-2 underline-offset-4">Bern</span>{' '}
                  für einen stressfreien Umzug.
                </h1>
                
                <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed font-medium break-words" itemProp="description">
                  Planen Sie einen Umzug in der Bundeshauptstadt? Vergleichen Sie mehrere{' '}
                  <span className="font-semibold text-green-600 underline decoration-green-400 decoration-1">Zügelfirmen Bern</span> und{' '}
                  <span className="font-semibold text-green-600 underline decoration-green-400 decoration-1">Umzugsunternemen Bern</span> auf unserer Plattform. Von der historischen Altstadt bis zur modernen Agglomeration – unsere geprüften Partner kennen Bern wie ihre Westentasche und sorgen für einen reibungslosen Umzug. Umzugsfirma vergleichen Bern: Kostenlos mehrere Offerten anfordern und bis zu 40% sparen!
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
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug&city=Bern"
                    className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-all transform hover:scale-105 group overflow-hidden w-full"
                  >
                    <Home className="w-6 h-6 text-green-600 mb-1.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Privatumzug</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Wohnung, Haus, WG-Zimmer</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                  
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=geschaeftsumzug&city=Bern"
                    className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-all transform hover:scale-105 group"
                  >
                    <Building className="w-6 h-6 text-green-600 mb-1.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Geschäftsumzug</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Büro, Ladenlokal, Werkstatt</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                  
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=international&city=Bern"
                    className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-all transform hover:scale-105 group"
                  >
                    <Globe className="w-6 h-6 text-green-600 mb-1.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Internationaler Umzug</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Umzüge ins oder aus dem Ausland</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                  
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=spezialtransport&city=Bern"
                    className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-all transform hover:scale-105 group"
                  >
                    <Package className="w-6 h-6 text-green-600 mb-1.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Spezialtransport</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Klavier, Tresor, Kunst & mehr</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                  
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=kleintransport&city=Bern"
                    className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-all transform hover:scale-105 group"
                  >
                    <Truck className="w-6 h-6 text-green-600 mb-1.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Kleintransport</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Einzelne Möbel, kleine Lasten</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                  
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=moebellift&city=Bern"
                    className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-all transform hover:scale-105 group"
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
                  <h2 className="text-3xl font-bold text-gray-800 mb-5 break-words">Umzugsfirma Bern: Zügelfirmen vergleichen und die beste Firma finden</h2>
                  <p className="text-gray-700 leading-relaxed mb-4 font-medium break-words w-full">Umzugsfirma Bern: Vergleichen Sie mehrere Zügelfirmen Bern und Umzugsunternemen Bern, um die beste Firma zu finden. Ein Umzug in Bern, der politischen und kulturellen Hauptstadt der Schweiz, erfordert eine sorgfältige Planung. Ob Sie innerhalb der historischen Altstadt, in ein modernes Quartier oder in die Agglomeration ziehen – mit einer professionellen Umzugsfirma Bern an Ihrer Seite wird der Prozess reibungslos und effizient. Ein professionelles Umzugsunternemen Bern ist nicht nur ein Transportdienstleister; es ist Ihr Projektmanager, Logistikpartner und Problemlöser in einem.</p>
                  <p className="text-gray-700 leading-relaxed font-medium break-words w-full">Eine erfahrene Zügelfirma in Bern kennt die Tücken der Stadt. Umzugsfirma vergleichen Bern über unser Portal – wir helfen Ihnen, mehrere geprüfte Umzugsfirmen zu vergleichen. Sie kümmert sich um die Organisation von Halteverbotszonen, plant die schnellste Route und stellt sicher, dass Ihr Hab und Gut sicher und unversehrt im neuen Zuhause ankommt. Der Vergleich mehrerer Umzugsfirmen Bern gibt Ihnen die Sicherheit, einen geprüften und versicherten Partner zu finden, der Ihren Ansprüchen gerecht wird. Durch den direkten Vergleich mehrerer Zügelfirmen Bern finden Sie das beste Preis-Leistungs-Verhältnis und sparen dabei erheblich.</p>
                </article>
              
                <div className="text-center bg-green-50 p-8 rounded-lg border-l-4 border-green-500 shadow-md w-full min-w-0 overflow-x-hidden">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 break-words">Umzugsfirma vergleichen Bern: Jetzt starten!</h3>
                  <p className="text-gray-700 mb-6 font-medium break-words w-full">Umzugsfirma Bern: Mit nur einer Anfrage erhalten Sie bis zu fünf kostenlose und unverbindliche Offerten von Top-Umzugsfirmen aus Bern. Vergleichen Sie mehrere Zügelfirmen Bern und Umzugsunternemen Bern und sparen Sie bis zu 40%.</p>
                  <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white group shadow-lg transform hover:scale-105 transition-transform">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Bern">
                      Umzugsfirmen vergleichen Bern & Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <article className="pt-8 border-t border-gray-200 space-y-6 w-full min-w-0">
                  <h2 className="text-3xl font-bold text-gray-800 break-words">Umzugsfirma Bern: Umzugskosten im Überblick</h2>
                  <p className="font-medium break-words w-full">Die Umzugskosten in Bern gehören zu den höchsten der Schweiz, lassen sich aber mit der richtigen Planung optimieren. Umzugsfirma vergleichen Bern: Durch den Vergleich mehrerer Zügelfirmen Bern und Umzugsunternemen Bern finden Sie das beste Angebot und sparen bis zu 40%. Die Kosten hängen von vielen Variablen ab.</p>
                </article>

                <article className="pt-8 border-t border-gray-200 space-y-6 w-full min-w-0">
                  <h2 className="text-3xl font-bold text-gray-800 break-words">Umzugsfirma vergleichen Bern: Ihre Vorteile</h2>
                  <p className="font-medium mb-4 break-words w-full">Umzugsfirma vergleichen Bern: Vergleichen Sie mehrere Zügelfirmen Bern und Umzugsunternemen Bern und profitieren Sie von folgenden Vorteilen:</p>
                  <div className="space-y-4">
                    <div className="flex items-start w-full min-w-0">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-800 break-words">Erhebliche Kosten sparen</h4>
                        <p className="text-gray-600 leading-relaxed break-words">Umzugsfirma Bern vergleichen: Durch den direkten Vergleich mehrerer Zügelfirmen Bern und Umzugsunternemen Bern finden Sie mühelos das beste Preis-Leistungs-Verhältnis und können erheblich sparen. Bis zu 40% Ersparnis möglich!</p>
                      </div>
                    </div>
                    <div className="flex items-start w-full min-w-0">
                      <Award className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-800 break-words">Geprüfte Qualität und Vertrauen</h4>
                        <p className="text-gray-600 leading-relaxed break-words">Wir vermitteln Ihnen ausschliesslich geprüfte, versicherte und top bewertete Umzugsfirmen aus der Region Bern. Alle Partner sind zertifiziert und versichert.</p>
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
                  <h2 className="text-3xl font-bold text-gray-800 break-words">Umzugsfirma Bern: Alle Dienstleistungen im Überblick</h2>
                  <p className="font-medium break-words w-full">Eine moderne Umzugsfirma in Bern bietet viel mehr als nur den Transport. Stellen Sie sich Ihr individuelles Servicepaket zusammen. Unsere Partner bieten folgende Dienstleistungen an:</p>
                  <div className="grid md:grid-cols-2 gap-6 mt-6 w-full">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2 break-words">
                        <Package className="mr-2 text-green-500 flex-shrink-0" /> 
                        <Link href="/privatumzug" className="text-green-600 hover:text-green-800 hover:underline break-words">Privatumzug</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Der klassische Wohnungswechsel, individuell auf Ihre Bedürfnisse zugeschnitten. Finden Sie die beste Umzugsfirma Bern für Ihren Privatumzug.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Building className="mr-2 text-green-500 flex-shrink-0" /> 
                        <Link href="/geschaeftsumzug" className="text-green-600 hover:text-green-800 hover:underline break-words">Geschäftsumzug</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Minimale Ausfallzeiten und sorgfältige Planung für Büros und Firmen. Professioneller Umzug für Unternehmen in Bern.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Globe className="mr-2 text-green-500 flex-shrink-0" /> 
                        <Link href="/internationale-umzuege" className="text-green-600 hover:text-green-800 hover:underline break-words">Internationale Umzüge</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Komplette Abwicklung inklusive Zollformalitäten. Umzug ins Ausland mit professioneller Unterstützung.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Package className="mr-2 text-green-500 flex-shrink-0" /> 
                        <Link href="/spezialtransporte" className="text-green-600 hover:text-green-800 hover:underline break-words">Spezialtransporte</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Transport für Klaviere, Tresore, Maschinen & Geräte. Professionelle Spezialtransporte in Bern.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <PiPianoKeysFill className="mr-2 text-green-500 flex-shrink-0" /> 
                        <Link href="/klaviertransport" className="text-green-600 hover:text-green-800 hover:underline break-words">Klaviertransport</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Professioneller Transport für Klaviere und Flügel. Spezialisierte Zügelfirmen für Klaviertransport in Bern.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Sparkles className="mr-2 text-green-500 flex-shrink-0" /> 
                        <Link href="/reinigung" className="text-green-600 hover:text-green-800 hover:underline break-words">Reinigung</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Professionelle Reinigungsdienstleistungen in Bern. Von Wohnungsreinigung bis Fassadenreinigung.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Sparkles className="mr-2 text-green-500 flex-shrink-0" /> 
                        <Link href="/umzugsreinigung" className="text-green-600 hover:text-green-800 hover:underline break-words">Umzugsreinigung</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Mit Abnahmegarantie für eine stressfreie Wohnungsübergabe. Professionelle Endreinigung nach dem Umzug.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Sparkles className="mr-2 text-green-500 flex-shrink-0" /> 
                        <Link href="/wohnungsreinigung" className="text-green-600 hover:text-green-800 hover:underline break-words">Wohnungsreinigung</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Gründliche Reinigung Ihrer Wohnung. Professionelle Wohnungsreinigung in Bern.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Sparkles className="mr-2 text-green-500 flex-shrink-0" /> 
                        <Link href="/hausreinigung" className="text-green-600 hover:text-green-800 hover:underline break-words">Hausreinigung</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Umfassende Reinigung für Ihr Haus. Professionelle Hausreinigung in Bern.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Sparkles className="mr-2 text-green-500 flex-shrink-0" /> 
                        <Link href="/fensterreinigung" className="text-green-600 hover:text-green-800 hover:underline break-words">Fensterreinigung</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Professionelle Fensterreinigung für strahlend saubere Fenster. Fensterreinigung in Bern.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <Sparkles className="mr-2 text-green-500 flex-shrink-0" /> 
                        <Link href="/fassadenreinigung" className="text-green-600 hover:text-green-800 hover:underline break-words">Fassadenreinigung</Link>
                      </h4>
                      <p className="text-gray-600 break-words">Professionelle Reinigung Ihrer Fassade. Fassadenreinigung in Bern für ein gepflegtes Äusseres.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-400 transition-colors w-full min-w-0 overflow-hidden">
                      <h4 className="font-semibold text-lg flex items-center mb-2">
                        <MapPin className="mr-2 text-green-500 flex-shrink-0" /> <span className="break-words">Möbellagerung</span></h4>
                      <p className="text-gray-600 break-words">Sichere Zwischenlagerung Ihrer Möbel, kurz- oder langfristig. Möbellagerung in Bern.</p>
                    </div>
                </div>
              </article>
              
                <article className="pt-8 border-t border-gray-200 space-y-6 w-full min-w-0">
                  <h2 className="text-3xl font-bold text-gray-800 break-words">Umzugsfirma Bern: Parkbewilligungen und Logistik</h2>
                  <p className="font-medium break-words w-full">Die Parkplatzsituation in Bern kann herausfordernd sein. Eine professionelle Umzugsfirma Bern nimmt Ihnen diesen Stress ab. Erfahrene Zügelfirmen Bern und Umzugsunternemen Bern beantragen bei der Stadtpolizei Bern die nötigen Halteverbotszonen für den Umzugstag. Umzugsfirma vergleichen Bern: Vergleichen Sie mehrere Anbieter, um die beste Logistik-Lösung zu finden. Das garantiert nicht nur einen Parkplatz direkt vor der Tür, sondern verkürzt auch die Laufwege und damit die Arbeitszeit und Ihre Kosten.</p>
              </article>
              
            </motion.main>

              <LocationSidebar 
                city={city} 
                districts={{
                  title: "Quartiere in Bern",
                  text: "Unsere Partner sind in allen Berner Quartieren für Sie im Einsatz:",
                  list: ["Innenstadt", "Mattenhof", "Länggasse", "Breitenrain", "Kirchenfeld", "Wabern", "Ostermundigen", "Köniz", "Muri", "Oberbottigen"]
                }}
                searches={undefined as any}
              />
          </div>
          

          <LocationPageNavigation allLocations={locations} currentCity={city} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UmzugsfirmaBernPageClient;
