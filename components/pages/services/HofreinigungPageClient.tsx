'use client'

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Award, ShieldCheck, Star, Home, Clock, Calendar, Sparkles } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CleaningRatgeberSidebar from '@/components/CleaningRatgeberSidebar';
import { useUserLocation } from '@/hooks/useUserLocation';

const HofreinigungPageClient = () => {
  const router = useRouter();
  const { city, loading: locationLoading } = useUserLocation();
  

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=reinigung&step=2');
  };

  // SEO Data
  const metaTitle = "Hofreinigung – Kostenlose Offerten vergleichen";
  const metaDescription = "Professionelle Hofreinigung: Fordern Sie kostenlose Offerten an und vergleichen Sie Reinigungsfirmen für saubere Aussenbereiche und gepflegte Umgebung.";
  // Meta keywords removed - Google no longer uses this tag (since 2009)
  const canonicalUrl = '/reinigung/hofreinigung';

  // FAQ Data
  const faqItems = [
    {
      q: "Was kostet eine Hofreinigung?",
      a: "Die Kosten für Hofreinigung hängen von der Grösse der Fläche, dem Verschmutzungsgrad, der Art der Oberfläche und der Zugänglichkeit ab. Preise liegen typischerweise zwischen 5 und 15 CHF pro m². Ein durchschnittlicher Hof mit 50 m² kostet etwa 250-750 CHF. Grössere Flächen oder stark verschmutzte Bereiche können höhere Kosten verursachen. Durch den Vergleich mehrerer Offerten können Sie bis zu 40% sparen."
    },
    {
      q: "Welche Bereiche werden bei einer Hofreinigung gereinigt?",
      a: "Eine umfassende Hofreinigung beinhaltet: Reinigung von Einfahrten, Terrassen, Wegen, Parkplätzen, Aussenbereichen, Entfernung von Moos und Algen, sowie gegebenenfalls Hochdruckreinigung von Oberflächen. Professionelle Reinigungsfirmen passen den Umfang der Reinigung an Ihre spezifischen Bedürfnisse an und können zusätzliche Leistungen wie Kalkentfernung oder Ölfleckenentfernung anbieten."
    },
    {
      q: "Wie oft sollte eine Hofreinigung durchgeführt werden?",
      a: "Die optimale Reinigungsfrequenz hängt von verschiedenen Faktoren ab: Nutzung, Witterung, Lage und individuelle Präferenzen. Viele Hausbesitzer lassen ihre Höfe ein- bis zweimal jährlich professionell reinigen, typischerweise im Frühjahr und Herbst. Bei starker Verschmutzung oder vor besonderen Anlässen kann öfter gereinigt werden. Professionelle Reinigungsfirmen beraten Sie gerne bei der optimalen Frequenz für Ihre spezifischen Aussenbereiche."
    },
    {
      q: "Ist Hochdruckreinigung für alle Oberflächen geeignet?",
      a: "Nicht alle Oberflächen vertragen Hochdruckreinigung. Empfindliche Materialien wie bestimmte Natursteine oder Holz benötigen schonendere Methoden. Professionelle Reinigungsfirmen kennen die richtigen Methoden für jede Oberfläche und passen den Druck und die Reinigungsmethode entsprechend an. Beton kann mit stärkerem Druck gereinigt werden, während Naturstein oder Holz schonender behandelt werden müssen."
    },
    {
      q: "Wie lange dauert eine Hofreinigung?",
      a: "Die Dauer hängt von der Grösse des Hofs und dem Verschmutzungsgrad ab. Ein durchschnittlicher Hof benötigt etwa 2-4 Stunden. Grössere Flächen oder stark verschmutzte Bereiche können länger dauern. Professionelle Reinigungsfirmen können Ihnen nach der Besichtigung eine genaue Zeitangabe geben."
    },
    {
      q: "Welche Reinigungsmethoden werden verwendet?",
      a: "Hofreinigung verwendet verschiedene Methoden je nach Oberflächentyp und Verschmutzungsgrad: Hochdruckreinigung für hartnäckige Verschmutzungen, schonende Reinigung für empfindliche Oberflächen, spezielle Reinigungsmittel für Moos und Algen, sowie Kalkentfernung. Professionelle Reinigungsfirmen haben die richtigen Methoden und Geräte für jeden Oberflächentyp und verwenden die passenden Reinigungsmittel."
    },
    {
      q: "Werden umweltfreundliche Reinigungsmittel verwendet?",
      a: "Ja, moderne Reinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmittel. Alle Reinigungsfirmen in unserem Netzwerk verwenden zertifizierte, umweltfreundliche Reinigungsmittel, die effektiv sind, aber gleichzeitig die Umwelt und die Gesundheit schonen. Zudem wird darauf geachtet, dass Reinigungswasser nicht unkontrolliert in die Kanalisation oder die Umwelt gelangt."
    }
  ];


  // Single JSON-LD Service schema
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Professionelle Hofreinigung",
    "serviceType": "Reinigungsvermittlung",
    "description": metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Switzerland"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=reinigung",
      "priceCurrency": "CHF",
      "price": "0",
      "name": "Kostenlose Offerte für Hofreinigung"
    }
  }), [metaDescription]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="bg-slate-50">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full py-8 md:py-12 lg:py-16 overflow-hidden"
        >
          {/* Background Image - Right Side */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://online-offerten.ch/reinigungsfirma/hofreinigung_hochdruckreiniger.png')`,
              maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 100%)'
            }}
          ></div>
          
          {/* Gradient Overlay - White from left to right with shadow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
          
          {/* White shadow/glow effect towards the image */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20 pointer-events-none"></div>
          <div 
            className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 pointer-events-none"
            style={{
              boxShadow: 'inset -100px 0 100px -50px rgba(255, 255, 255, 0.8)'
            }}
          ></div>
          
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
            <div className="max-w-full">
              {/* Text Section */}
              <div className="px-0 sm:px-4 py-4 sm:py-6 md:py-8 lg:py-12">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <h1 className="heading-1">
                    Professionelle Hofreinigung
                  </h1>
                </motion.div>
                
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-base md:text-body mb-4 md:mb-6 leading-relaxed"
                >
                  Professionelle Reinigung von Höfen, Einfahrten, Terrassen und Aussenbereichen. Gründliche Reinigung für ein gepflegtes Äusseres. Reinigungsofferten online vergleichen und bis zu 40% sparen.
                </motion.p>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mb-4 md:mb-6"
                >
                  <Button 
                    size="lg" 
                    onClick={handleCtaClick}
                    className="bg-green-700 hover:bg-green-800 text-white font-bold group w-full sm:w-auto px-6 py-4 text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Jetzt kostenlose Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>

                {/* Additional Trust Elements */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                  className="bg-blue-50 rounded-lg p-3 md:p-4 lg:p-6 flex flex-wrap gap-3 md:gap-4 lg:gap-6"
                >
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-body font-medium">Bis zu 40% sparen</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-body font-medium">Nur geprüfte Firmen</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-body font-medium">100% kostenlos & unverbindlich</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Main Content */}
        <section className="py-8 md:py-12 lg:py-16 xl:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {/* Main Article */}
              <div className="lg:col-span-2">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 mb-6 md:mb-8"
                >
                  {/* H2: Warum eine professionelle Hofreinigung sinnvoll ist */}
                  <h2 className="heading-2">Warum eine professionelle Hofreinigung sinnvoll ist</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Eine professionelle Reinigung der Höfe ist essentiell für die Pflege und das Erscheinungsbild Ihrer Aussenbereiche. Höfe, Einfahrten, Terrassen und andere Aussenbereiche sind täglich Witterungseinflüssen, Schmutz, Verschmutzungen und organischen Rückständen ausgesetzt. Während regelmässiges Kehren und einfaches Wischen die Oberfläche sauber hält, entfernt eine professionelle Reinigung hartnäckige Verschmutzungen wie Ölflecken, Moos, Algen, Kalkablagerungen und eingetrockneten Schmutz, die bei normaler Reinigung nicht erreicht werden. Ein sauberer Hof verbessert das Erscheinungsbild erheblich, schafft einen positiven ersten Eindruck und erhöht den Wert Ihrer Immobilie. Zudem trägt regelmässige Reinigung zur Sicherheit bei, indem sie rutschige Oberflächen entfernt und Unfälle verhindert.
                  </p>

                  {/* H2: Unsere Leistungen im Bereich Hofreinigung */}
                  <h2 className="heading-2">Unsere Leistungen im Bereich Höfe</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Unser Netzwerk geprüfter Reinigungsfirmen bietet ein umfassendes Leistungsspektrum für die Reinigung aller Arten von Aussenbereichen. Dazu gehören professionelle Einfahrtsreinigung, Terrassenreinigung, Wege- und Parkplatzreinigung, Hochdruckreinigung für hartnäckige Verschmutzungen, Moos- und Algenentfernung, Kalkentfernung, Ölfleckenentfernung, sowie Grundreinigung für alle Aussenbereiche. Alle unsere Partnerfirmen arbeiten mit modernsten Reinigungstechniken, leistungsstarken Hochdruckreinigern und umweltfreundlichen Reinigungsmitteln. Besonders wichtig: Alle Reinigungsfirmen in unserem Netzwerk haben Erfahrung mit verschiedenen Oberflächen und kennen die richtigen Methoden für Beton, Naturstein, Pflastersteine, Kies und Holz.
                  </p>

                  {/* Leistungen Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/hofreinigung_herbst_blaetter_entfernung.png"
                      alt="Hofreinigungsdienstleistungen - Professionelle Reinigung aller Aussenbereiche"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Leistungen */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>Einfahrtsreinigung und Zufahrtsreinigung</li>
                    <li>Terrassenreinigung und Balkonreinigung</li>
                    <li>Wege- und Parkplatzreinigung</li>
                    <li>Hochdruckreinigung für hartnäckige Verschmutzungen</li>
                    <li>Moos- und Algenentfernung</li>
                    <li>Kalkentfernung und Entkalkung</li>
                    <li>Ölfleckenentfernung</li>
                    <li>Grundreinigung für alle Aussenbereiche</li>
                  </ul>

                  {/* CTA 1 - After Leistungen */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200 mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                      {city && !locationLoading 
                        ? `Professionelle Reinigung der Höfe in ${city}`
                        : 'Professionelle Reinigung der Höfe buchen'
                      }
                    </h3>
                    <p className="text-body mb-3 md:mb-4">
                      Reinigungsofferten online vergleichen und bis zu 40% sparen.
                    </p>
                    <Button 
                      onClick={handleCtaClick} 
                      size="lg" 
                      className="bg-green-700 hover:bg-green-800 text-white w-full sm:w-auto text-base font-semibold"
                    >
                      Schnelle Anfrage senden
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>

                  {/* H2: Vorteile unserer professionellen Hofreinigung */}
                  <h2 className="heading-2">Vorteile unserer professionellen Hofreinigung</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Eine professionelle Reinigung der Höfe bietet zahlreiche Vorteile gegenüber der eigenen Reinigung. Sie entfernt hartnäckige Verschmutzungen wie Ölflecken, Moos, Algen und Kalkablagerungen, die bei normaler Reinigung nicht erreicht werden. Professionelle Reinigungsfirmen haben spezielle Geräte wie Hochdruckreiniger, die für verschiedene Oberflächen entwickelt wurden und optimale Ergebnisse liefern. Sie kennen die richtigen Methoden und Reinigungsmittel für jeden Oberflächentyp und können empfindliche Materialien wie Naturstein oder Holz schonend reinigen. Zudem verlängert eine regelmässige professionelle Reinigung die Lebensdauer Ihrer Aussenbereiche erheblich und verbessert das Erscheinungsbild. Durch den Vergleich mehrerer Offerten über unsere Plattform können Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten.
                  </p>

                  {/* Bullet Points - Vorteile */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>Entfernung von hartnäckigen Verschmutzungen wie Ölflecken, Moos und Algen</li>
                    <li>Nur geprüfte, versicherte Reinigungsfirmen</li>
                    <li>Spezielle Geräte wie Hochdruckreiniger für optimale Ergebnisse</li>
                    <li>Schonende Reinigung für empfindliche Oberflächen</li>
                    <li>Umweltfreundliche Reinigungsmittel</li>
                    <li>Verlängerung der Lebensdauer Ihrer Aussenbereiche</li>
                  </ul>

                  {/* H2: Was bei einer gründlichen Hofreinigung gereinigt wird */}
                  <h2 className="heading-2">Was bei einer gründlichen Hofreinigung gereinigt wird</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Eine gründliche Reinigung der Höfe beinhaltet die intensive Reinigung aller Aussenbereiche inklusive schwer zugänglicher Stellen. Dazu gehört die Reinigung von Einfahrten und Zufahrten, Terrassen und Balkonen, Wegen und Gehwegen, Parkplätzen und Stellplätzen, Garageneinfahrten, Aussentreppen und Podesten, sowie gegebenenfalls auch Aussenwänden und Fassaden. Professionelle Reinigungsfirmen entfernen Schmutz, Laub, Moos, Algen, Ölflecken, Kalkablagerungen, Verfärbungen und andere hartnäckige Verschmutzungen. Sie verwenden spezielle Methoden wie Hochdruckreinigung für optimale Ergebnisse und passen die Reinigungsmethode an den spezifischen Oberflächentyp an.
                  </p>

                  {/* H2: Hofreinigung für verschiedene Aussenbereiche (Einfahrt, Terrasse, Wege, Parkplätze) */}
                  <h2 className="heading-2">Hofreinigung für verschiedene Aussenbereiche (Einfahrt, Terrasse, Wege, Parkplätze)</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Professionelle Hofreinigung wird für alle Arten von Aussenbereichen angeboten, wobei jeder Bereich spezielle Reinigungsanforderungen hat. Einfahrtsreinigung entfernt Ölflecken, Schmutz und Verschmutzungen von Zufahrten und Garageneinfahrten. Terrassenreinigung entfernt Moos, Algen, Kalkablagerungen und Verfärbungen von Terrassen und Balkonen. Wege- und Parkplatzreinigung beinhaltet die Reinigung von Gehwegen, Parkplätzen und Stellplätzen. Jeder Aussenbereich hat unterschiedliche Verschmutzungen und erfordert spezielle Methoden. Professionelle Reinigungsfirmen kennen die richtigen Methoden für jeden Bereich und verwenden die passenden Reinigungsmittel und Geräte. Unabhängig von Ihrem Aussenbereich, alle Reinigungsfirmen in unserem Netzwerk haben Erfahrung mit verschiedenen Bereichen.
                  </p>

                  {/* H2: Hochdruckreinigung für Aussenbereiche - Effektive Methode für hartnäckige Verschmutzungen */}
                  <h2 className="heading-2">Hochdruckreinigung für Aussenbereiche - Effektive Methode für hartnäckige Verschmutzungen</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Hochdruckreinigung ist eine besonders effektive Methode für Aussenbereiche, die hartnäckige Verschmutzungen wie Ölflecken, Moos, Algen, Kalkablagerungen oder eingetrockneten Schmutz entfernt. Professionelle Reinigungsfirmen haben leistungsstarke Hochdruckreiniger und kennen die richtigen Techniken für verschiedene Oberflächen. Wichtig ist, dass der Druck an das Material angepasst wird, um Schäden zu vermeiden. Beton kann mit stärkerem Druck gereinigt werden, während Naturstein oder Holz schonender behandelt werden müssen. Hochdruckreinigung erreicht auch schwer zugängliche Stellen und entfernt tief sitzende Verschmutzungen gründlich. Professionelle Reinigungsfirmen verwenden die richtigen Druckeinstellungen und Reinigungsmittel für optimale Ergebnisse.
                  </p>

                  {/* Hochdruckreinigung Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/hochdruckreinigung_aussenbereich.png"
                      alt="Hochdruckreinigung für Aussenbereiche - Effektive Methode für hartnäckige Verschmutzungen"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Reinigung verschiedener Oberflächen (Beton, Naturstein, Pflastersteine, Kies, Holz) */}
                  <h2 className="heading-2">Reinigung verschiedener Oberflächen (Beton, Naturstein, Pflastersteine, Kies, Holz)</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Aussenbereiche haben verschiedene Oberflächen, die unterschiedliche Reinigungsmethoden erfordern. Beton kann mit stärkerem Druck gereinigt werden und verträgt aggressive Reinigungsmittel. Naturstein benötigt schonende Reinigung ohne zu viel Druck, um das Material nicht zu beschädigen. Pflastersteine können mit Hochdruckreinigung gereinigt werden, wobei die Fugenreinigung besonders wichtig ist. Kiesflächen benötigen spezielle Methoden zur Entfernung von Unkraut und Verschmutzungen. Holzterrassen erfordern vorsichtige Reinigung ohne zu viel Feuchtigkeit, um das Holz nicht zu schädigen. Professionelle Reinigungsfirmen kennen die richtigen Methoden für jeden Oberflächentyp und verwenden die passenden Reinigungsmittel und Geräte.
                  </p>

                  {/* Oberflächen Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/oberflaechenreinigung.png"
                      alt="Reinigung verschiedener Oberflächen - Beton, Naturstein, Pflastersteine, Kies, Holz"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Moos- und Algenentfernung - Vorbeugung und Entfernung */}
                  <h2 className="heading-2">Moos- und Algenentfernung - Vorbeugung und Entfernung</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Moos und Algen sind häufige Probleme in Aussenbereichen, besonders in feuchten oder schattigen Bereichen. Sie können rutschige Oberflächen verursachen und das Erscheinungsbild beeinträchtigen. Professionelle Moos- und Algenentfernung verwendet spezielle Reinigungsmittel und Methoden, um Moos und Algen gründlich zu entfernen. Zusätzlich können vorbeugende Massnahmen ergriffen werden, um das erneute Wachstum zu verhindern. Professionelle Reinigungsfirmen haben Erfahrung mit verschiedenen Arten von Moos und Algen und verwenden die richtigen Methoden für jeden Fall. Regelmässige Reinigung verhindert die Ansammlung von Moos und Algen und hält Aussenbereiche in optimalem Zustand.
                  </p>

                  {/* Moos- und Algenentfernung Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/moos_algenentfernung_dach.png"
                      alt="Moos- und Algenentfernung - Vorbeugung und Entfernung"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Moderne und umweltfreundliche Reinigungsmethoden */}
                  <h2 className="heading-2">Moderne und umweltfreundliche Reinigungsmethoden</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Moderne Reinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmethoden, auch bei intensiven Hofreinigungen. Diese sind nicht nur besser für die Umwelt, sondern auch für Ihre Gesundheit und die Ihrer Familie. Biologische Reinigungsmittel sind besonders für Haushalte mit Kindern, Haustieren oder in sensiblen Gebieten empfehlenswert. Sie sind effektiv gegen Moos, Algen, Kalk und andere Verschmutzungen, schonen aber gleichzeitig die Umwelt und die Gesundheit. Unsere Partnerfirmen verwenden ausschliesslich zertifizierte, umweltfreundliche Reinigungsmittel und achten darauf, dass Reinigungswasser nicht unkontrolliert in die Kanalisation oder die Umwelt gelangt. Dies ist besonders wichtig in sensiblen Gebieten und für den Schutz der Umwelt.
                  </p>

                  {/* Umweltfreundlich Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/umweltfreundliche_reinigungsmittel_modern.webp"
                      alt="Moderne und umweltfreundliche Reinigungsmethoden für Hofreinigung"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Ablauf unserer Hofreinigung – Schritt für Schritt */}
                  <h2 className="heading-2">Ablauf unserer Hofreinigung – Schritt für Schritt</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Der Ablauf einer professionellen Hofreinigung ist strukturiert und gründlich. Zunächst erfolgt eine Besichtigung der Aussenbereiche, um den Umfang der Reinigung zu bestimmen, den Verschmutzungsgrad zu beurteilen und eine genaue Offerte zu erstellen. Nach der Auftragsbestätigung wird ein Termin vereinbart, der zu Ihren Bedürfnissen passt. Am Reinigungstag erscheint das professionelle Reinigungsteam pünktlich mit allen notwendigen Geräten, speziellen Reinigungsmitteln und Ausrüstung für Hofreinigung. Die Reinigung erfolgt systematisch: Vorreinigung zur Entfernung von grobem Schmutz und Laub, Hauptreinigung mit Hochdruckreinigung oder anderen speziellen Methoden, Behandlung von problematischen Stellen wie Moos oder Ölflecken, und abschliessende Nachreinigung. Nach Abschluss der Reinigung erfolgt eine Qualitätskontrolle, und Sie erhalten saubere, gepflegte Aussenbereiche.
                  </p>

                  {/* Ablauf Image/Icon */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                      {[
                        { icon: Home, text: "Besichtigung und Offerte", textDetail: "Wir besichtigen Ihre Aussenbereiche, beurteilen den Verschmutzungsgrad und erstellen eine genaue Offerte." },
                        { icon: Calendar, text: "Terminvereinbarung", textDetail: "Nach der Auftragsbestätigung vereinbaren wir einen Termin, der zu Ihren Bedürfnissen passt." },
                        { icon: Sparkles, text: "Professionelle Hofreinigung", textDetail: "Unser professionelles Team reinigt Ihre Aussenbereiche gründlich mit speziellen Methoden und Geräten." },
                        { icon: CheckCircle, text: "Qualitätskontrolle", textDetail: "Nach Abschluss der Reinigung erfolgt eine Qualitätskontrolle für perfekte Ergebnisse." }
                      ].map((step, index) => {
                        const IconComponent = step.icon;
                        return (
                          <div key={index} className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-600 flex items-center justify-center mb-3">
                              <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                            </div>
                            <p className="text-xs md:text-sm text-gray-700 font-medium mb-1">{step.text}</p>
                            <p className="text-xs text-gray-600">{step.textDetail}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* H2: Was kostet eine professionelle Hofreinigung? */}
                  <h2 className="heading-2">Was kostet eine professionelle Hofreinigung?</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Die Kosten für Hofreinigung hängen von der Grösse der Fläche, dem Verschmutzungsgrad, der Art der Oberfläche und der Zugänglichkeit ab. Preise liegen typischerweise zwischen 5 und 15 CHF pro m². Ein durchschnittlicher Hof mit 50 m² kostet etwa 250-750 CHF. Grössere Flächen, stark verschmutzte Bereiche oder zusätzliche Leistungen wie Moos- und Algenentfernung können höhere Kosten verursachen. Die genauen Kosten hängen von der Grösse der Fläche, dem Zustand, dem Umfang der Reinigung und zusätzlichen Leistungen ab. Durch den Vergleich mehrerer Offerten über unsere Plattform können Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten. Alle Offerten sind kostenlos und unverbindlich.
                  </p>

                  {/* H2: Wie oft sollte eine Hofreinigung durchgeführt werden? */}
                  <h2 className="heading-2">Wie oft sollte eine Hofreinigung durchgeführt werden?</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Die optimale Reinigungsfrequenz hängt von verschiedenen Faktoren ab: Nutzung, Witterung, Lage und individuelle Präferenzen. Viele Hausbesitzer lassen ihre Höfe ein- bis zweimal jährlich professionell reinigen, typischerweise im Frühjahr und Herbst. Bei starker Verschmutzung, in Gebieten mit viel Regen oder Schatten, oder vor besonderen Anlässen kann öfter gereinigt werden. Regelmässige Reinigung verhindert die Ansammlung von hartnäckigen Verschmutzungen wie Moos oder Algen und hält Aussenbereiche in optimalem Zustand. Professionelle Reinigungsfirmen beraten Sie gerne bei der optimalen Frequenz für Ihre spezifischen Aussenbereiche und berücksichtigen dabei Faktoren wie Nutzung, Witterung und Oberflächentyp.
                  </p>

                  {/* H2: Warum wir der richtige Partner für Ihre Hofreinigung sind */}
                  <h2 className="heading-2">Warum wir der richtige Partner für Ihre Höfe sind</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Wir sind der vertrauenswürdige Partner für Ihre Höfe. Unser Netzwerk umfasst nur geprüfte, versicherte Reinigungsfirmen, die höchste Qualitätsstandards erfüllen und Erfahrung mit Aussenbereichen haben. Alle Partnerfirmen verwenden moderne, umweltfreundliche Reinigungsmittel und haben die richtige Ausrüstung für Reinigung der Höfe, wie leistungsstarke Hochdruckreiniger und spezielle Reinigungsmittel. Sie kennen die richtigen Methoden für verschiedene Oberflächen und können empfindliche Materialien wie Naturstein oder Holz schonend reinigen. Wir haben bereits über 500 zufriedene Kunden geholfen, die richtige Reinigungsfirma für Höfe zu finden. Unser Service ist komplett kostenlos und unverbindlich – Sie zahlen nur für die Reinigung selbst, nicht für unsere Vermittlung. Zudem können Sie durch den Vergleich mehrerer Offerten bis zu 40% sparen.
                  </p>

                  {/* Customer Reviews */}

                  {/* H2: Häufig gestellte Fragen zur Hofreinigung */}
                  <div className="mt-8 md:mt-12">
                    <h2 className="heading-2">Häufig gestellte Fragen zur Reinigung</h2>
                    <p className="text-body mb-6 md:mb-8 leading-relaxed">
                      Häufig gestellte Fragen zur professionellen Reinigung der Höfe: Was kostet eine Hofreinigung? Welche Bereiche werden bei einer Hofreinigung gereinigt? Wie oft sollte eine Hofreinigung durchgeführt werden? Ist Hochdruckreinigung für alle Oberflächen geeignet? Wie lange dauert eine Hofreinigung? Welche Reinigungsmethoden werden verwendet? Werden umweltfreundliche Reinigungsmittel verwendet? Diese und weitere Fragen beantworten wir Ihnen gerne. Über unsere Plattform können Sie Reinigungsofferten online vergleichen und dabei bis zu 40% sparen.
                    </p>
                    <Accordion type="single" collapsible className="w-full">
                      {faqItems.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline text-gray-800 px-2 sm:px-4">
                            <h4 className="faq-question">{item.q}</h4>
                          </AccordionTrigger>
                          <AccordionContent className="text-base text-gray-600 leading-relaxed pt-2 pb-4 px-2 sm:px-4">
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>

                  {/* H2: Jetzt unverbindliche Hofreinigungs-Offerte anfordern */}
                  <div className="mt-8 md:mt-12">
                    <h2 className="heading-2">Jetzt unverbindliche Reinigungs-Offerte anfordern</h2>
                    <p className="text-body mb-4 md:mb-6 leading-relaxed">
                      Reinigungsofferten online vergleichen und bis zu 40% sparen. Alle Offerten beinhalten professionelle Hofreinigung mit speziellen Methoden für Ihre Aussenbereiche. Ohne Aufpreis, ohne Verpflichtung. Starten Sie jetzt Ihre kostenlose Anfrage und finden Sie die perfekte Reinigungsfirma für Ihre Bedürfnisse.
                    </p>
                    <Button 
                      onClick={handleCtaClick} 
                      size="lg" 
                      className="bg-blue-700 hover:bg-blue-800 text-white w-full sm:w-auto text-base font-semibold"
                    >
                      Kostenlose Offerten anfordern
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>

                  {/* Internal Links */}
                  <div className="mt-8 md:mt-12">
                    <h3 className="heading-3">Weitere Reinigungsdienstleistungen</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <Link href="/reinigung/wohnungsreinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <h4 className="font-bold text-gray-900 mb-2 text-lg">Wohnungsreinigung</h4>
                        <p className="text-sm text-gray-600">Professionelle Wohnungsreinigung mit Abnahmegarantie für eine sorgenfreie Wohnungsübergabe.</p>
                      </Link>
                      <Link href="/reinigung/fensterreinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <h4 className="font-bold text-gray-900 mb-2 text-lg">Fensterreinigung</h4>
                        <p className="text-sm text-gray-600">Streifenfreie Fensterreinigung innen und aussen von professionellen Reinigungsfirmen.</p>
                      </Link>
                      <Link href="/reinigung/grundreinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <h4 className="font-bold text-gray-900 mb-2 text-lg">Grundreinigung</h4>
                        <p className="text-sm text-gray-600">Gründliche Grundreinigung vom Profi für ein tiefenreines Zuhause.</p>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.aside
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-4 md:space-y-6"
                >
                  {/* Ratgeber Section */}
                  <CleaningRatgeberSidebar />
                </motion.aside>
                
                {/* Sticky CTA Section - Outside aside for proper sticky behavior */}
                <div className="mt-4 md:mt-6 lg:sticky lg:top-24 lg:self-start">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 md:p-6 border border-blue-100">
                    <h3 className="heading-3">Jetzt Offerten anfordern</h3>
                    <p className="text-gray-700 mb-3 md:mb-4 text-base">
                      Kostenlos und unverbindlich Reinigungsofferten online vergleichen.
                    </p>
                    <Button 
                      onClick={handleCtaClick}
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white text-base font-semibold"
                    >
                      Offerten anfordern
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HofreinigungPageClient;
