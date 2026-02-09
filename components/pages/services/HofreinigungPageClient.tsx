'use client'

import React, { useMemo } from 'react';
// framer-motion removed - CSS for better INP
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
  const metaTitle = "Hofreinigung â€“ Kostenlose Offerten vergleichen";
  const metaDescription = "Professionelle Hofreinigung: Fordern Sie kostenlose Offerten an und vergleichen Sie Reinigungsfirmen fÃ¼r saubere Aussenbereiche und gepflegte Umgebung.";
  // Meta keywords removed - Google no longer uses this tag (since 2009)
  const canonicalUrl = '/reinigung/hofreinigung';

  // FAQ Data
  const faqItems = [
    {
      q: "Was kostet eine Hofreinigung?",
      a: "Die Kosten fÃ¼r Hofreinigung hÃ¤ngen von der GrÃ¶sse der FlÃ¤che, dem Verschmutzungsgrad, der Art der OberflÃ¤che und der ZugÃ¤nglichkeit ab. Preise liegen typischerweise zwischen 5 und 15 CHF pro mÂ². Ein durchschnittlicher Hof mit 50 mÂ² kostet etwa 250-750 CHF. GrÃ¶ssere FlÃ¤chen oder stark verschmutzte Bereiche kÃ¶nnen hÃ¶here Kosten verursachen. Durch den Vergleich mehrerer Offerten kÃ¶nnen Sie bis zu 40% sparen."
    },
    {
      q: "Welche Bereiche werden bei einer Hofreinigung gereinigt?",
      a: "Eine umfassende Hofreinigung beinhaltet: Reinigung von Einfahrten, Terrassen, Wegen, ParkplÃ¤tzen, Aussenbereichen, Entfernung von Moos und Algen, sowie gegebenenfalls Hochdruckreinigung von OberflÃ¤chen. Professionelle Reinigungsfirmen passen den Umfang der Reinigung an Ihre spezifischen BedÃ¼rfnisse an und kÃ¶nnen zusÃ¤tzliche Leistungen wie Kalkentfernung oder Ã–lfleckenentfernung anbieten."
    },
    {
      q: "Wie oft sollte eine Hofreinigung durchgefÃ¼hrt werden?",
      a: "Die optimale Reinigungsfrequenz hÃ¤ngt von verschiedenen Faktoren ab: Nutzung, Witterung, Lage und individuelle PrÃ¤ferenzen. Viele Hausbesitzer lassen ihre HÃ¶fe ein- bis zweimal jÃ¤hrlich professionell reinigen, typischerweise im FrÃ¼hjahr und Herbst. Bei starker Verschmutzung oder vor besonderen AnlÃ¤ssen kann Ã¶fter gereinigt werden. Professionelle Reinigungsfirmen beraten Sie gerne bei der optimalen Frequenz fÃ¼r Ihre spezifischen Aussenbereiche."
    },
    {
      q: "Ist Hochdruckreinigung fÃ¼r alle OberflÃ¤chen geeignet?",
      a: "Nicht alle OberflÃ¤chen vertragen Hochdruckreinigung. Empfindliche Materialien wie bestimmte Natursteine oder Holz benÃ¶tigen schonendere Methoden. Professionelle Reinigungsfirmen kennen die richtigen Methoden fÃ¼r jede OberflÃ¤che und passen den Druck und die Reinigungsmethode entsprechend an. Beton kann mit stÃ¤rkerem Druck gereinigt werden, wÃ¤hrend Naturstein oder Holz schonender behandelt werden mÃ¼ssen."
    },
    {
      q: "Wie lange dauert eine Hofreinigung?",
      a: "Die Dauer hÃ¤ngt von der GrÃ¶sse des Hofs und dem Verschmutzungsgrad ab. Ein durchschnittlicher Hof benÃ¶tigt etwa 2-4 Stunden. GrÃ¶ssere FlÃ¤chen oder stark verschmutzte Bereiche kÃ¶nnen lÃ¤nger dauern. Professionelle Reinigungsfirmen kÃ¶nnen Ihnen nach der Besichtigung eine genaue Zeitangabe geben."
    },
    {
      q: "Welche Reinigungsmethoden werden verwendet?",
      a: "Hofreinigung verwendet verschiedene Methoden je nach OberflÃ¤chentyp und Verschmutzungsgrad: Hochdruckreinigung fÃ¼r hartnÃ¤ckige Verschmutzungen, schonende Reinigung fÃ¼r empfindliche OberflÃ¤chen, spezielle Reinigungsmittel fÃ¼r Moos und Algen, sowie Kalkentfernung. Professionelle Reinigungsfirmen haben die richtigen Methoden und GerÃ¤te fÃ¼r jeden OberflÃ¤chentyp und verwenden die passenden Reinigungsmittel."
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
      "name": "Kostenlose Offerte fÃ¼r Hofreinigung"
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
        <section
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
                <div
                >
                  <h1 className="heading-1">
                    Professionelle Hofreinigung
                  </h1>
                </div>
                
                <p
                  className="text-base md:text-body mb-4 md:mb-6 leading-relaxed"
                >
                  Professionelle Reinigung von HÃ¶fen, Einfahrten, Terrassen und Aussenbereichen. GrÃ¼ndliche Reinigung fÃ¼r ein gepflegtes Ã„usseres. Reinigungsofferten online vergleichen und bis zu 40% sparen.
                </p>
                
                <div
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
                </div>

                {/* Additional Trust Elements */}
                <div
                  className="bg-blue-50 rounded-lg p-3 md:p-4 lg:p-6 flex flex-wrap gap-3 md:gap-4 lg:gap-6"
                >
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-body font-medium">Bis zu 40% sparen</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-body font-medium">Nur geprÃ¼fte Firmen</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-body font-medium">100% kostenlos & unverbindlich</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 md:py-12 lg:py-16 xl:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {/* Main Article */}
              <div className="lg:col-span-2">
                <article
                  className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 mb-6 md:mb-8"
                >
                  {/* H2: Warum eine professionelle Hofreinigung sinnvoll ist */}
                  <h2 className="heading-2">Warum eine professionelle Hofreinigung sinnvoll ist</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Eine professionelle Reinigung der HÃ¶fe ist essentiell fÃ¼r die Pflege und das Erscheinungsbild Ihrer Aussenbereiche. HÃ¶fe, Einfahrten, Terrassen und andere Aussenbereiche sind tÃ¤glich WitterungseinflÃ¼ssen, Schmutz, Verschmutzungen und organischen RÃ¼ckstÃ¤nden ausgesetzt. WÃ¤hrend regelmÃ¤ssiges Kehren und einfaches Wischen die OberflÃ¤che sauber hÃ¤lt, entfernt eine professionelle Reinigung hartnÃ¤ckige Verschmutzungen wie Ã–lflecken, Moos, Algen, Kalkablagerungen und eingetrockneten Schmutz, die bei normaler Reinigung nicht erreicht werden. Ein sauberer Hof verbessert das Erscheinungsbild erheblich, schafft einen positiven ersten Eindruck und erhÃ¶ht den Wert Ihrer Immobilie. Zudem trÃ¤gt regelmÃ¤ssige Reinigung zur Sicherheit bei, indem sie rutschige OberflÃ¤chen entfernt und UnfÃ¤lle verhindert.
                  </p>

                  {/* H2: Unsere Leistungen im Bereich Hofreinigung */}
                  <h2 className="heading-2">Unsere Leistungen im Bereich HÃ¶fe</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Unser Netzwerk geprÃ¼fter Reinigungsfirmen bietet ein umfassendes Leistungsspektrum fÃ¼r die Reinigung aller Arten von Aussenbereichen. Dazu gehÃ¶ren professionelle Einfahrtsreinigung, Terrassenreinigung, Wege- und Parkplatzreinigung, Hochdruckreinigung fÃ¼r hartnÃ¤ckige Verschmutzungen, Moos- und Algenentfernung, Kalkentfernung, Ã–lfleckenentfernung, sowie Grundreinigung fÃ¼r alle Aussenbereiche. Alle unsere Partnerfirmen arbeiten mit modernsten Reinigungstechniken, leistungsstarken Hochdruckreinigern und umweltfreundlichen Reinigungsmitteln. Besonders wichtig: Alle Reinigungsfirmen in unserem Netzwerk haben Erfahrung mit verschiedenen OberflÃ¤chen und kennen die richtigen Methoden fÃ¼r Beton, Naturstein, Pflastersteine, Kies und Holz.
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
                    <li>Hochdruckreinigung fÃ¼r hartnÃ¤ckige Verschmutzungen</li>
                    <li>Moos- und Algenentfernung</li>
                    <li>Kalkentfernung und Entkalkung</li>
                    <li>Ã–lfleckenentfernung</li>
                    <li>Grundreinigung fÃ¼r alle Aussenbereiche</li>
                  </ul>

                  {/* CTA 1 - After Leistungen */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200 mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                      {city && !locationLoading 
                        ? `Professionelle Reinigung der HÃ¶fe in ${city}`
                        : 'Professionelle Reinigung der HÃ¶fe buchen'
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
                    Eine professionelle Reinigung der HÃ¶fe bietet zahlreiche Vorteile gegenÃ¼ber der eigenen Reinigung. Sie entfernt hartnÃ¤ckige Verschmutzungen wie Ã–lflecken, Moos, Algen und Kalkablagerungen, die bei normaler Reinigung nicht erreicht werden. Professionelle Reinigungsfirmen haben spezielle GerÃ¤te wie Hochdruckreiniger, die fÃ¼r verschiedene OberflÃ¤chen entwickelt wurden und optimale Ergebnisse liefern. Sie kennen die richtigen Methoden und Reinigungsmittel fÃ¼r jeden OberflÃ¤chentyp und kÃ¶nnen empfindliche Materialien wie Naturstein oder Holz schonend reinigen. Zudem verlÃ¤ngert eine regelmÃ¤ssige professionelle Reinigung die Lebensdauer Ihrer Aussenbereiche erheblich und verbessert das Erscheinungsbild. Durch den Vergleich mehrerer Offerten Ã¼ber unsere Plattform kÃ¶nnen Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten.
                  </p>

                  {/* Bullet Points - Vorteile */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>Entfernung von hartnÃ¤ckigen Verschmutzungen wie Ã–lflecken, Moos und Algen</li>
                    <li>Nur geprÃ¼fte, versicherte Reinigungsfirmen</li>
                    <li>Spezielle GerÃ¤te wie Hochdruckreiniger fÃ¼r optimale Ergebnisse</li>
                    <li>Schonende Reinigung fÃ¼r empfindliche OberflÃ¤chen</li>
                    <li>Umweltfreundliche Reinigungsmittel</li>
                    <li>VerlÃ¤ngerung der Lebensdauer Ihrer Aussenbereiche</li>
                  </ul>

                  {/* H2: Was bei einer grÃ¼ndlichen Hofreinigung gereinigt wird */}
                  <h2 className="heading-2">Was bei einer grÃ¼ndlichen Hofreinigung gereinigt wird</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Eine grÃ¼ndliche Reinigung der HÃ¶fe beinhaltet die intensive Reinigung aller Aussenbereiche inklusive schwer zugÃ¤nglicher Stellen. Dazu gehÃ¶rt die Reinigung von Einfahrten und Zufahrten, Terrassen und Balkonen, Wegen und Gehwegen, ParkplÃ¤tzen und StellplÃ¤tzen, Garageneinfahrten, Aussentreppen und Podesten, sowie gegebenenfalls auch AussenwÃ¤nden und Fassaden. Professionelle Reinigungsfirmen entfernen Schmutz, Laub, Moos, Algen, Ã–lflecken, Kalkablagerungen, VerfÃ¤rbungen und andere hartnÃ¤ckige Verschmutzungen. Sie verwenden spezielle Methoden wie Hochdruckreinigung fÃ¼r optimale Ergebnisse und passen die Reinigungsmethode an den spezifischen OberflÃ¤chentyp an.
                  </p>

                  {/* H2: Hofreinigung fÃ¼r verschiedene Aussenbereiche (Einfahrt, Terrasse, Wege, ParkplÃ¤tze) */}
                  <h2 className="heading-2">Hofreinigung fÃ¼r verschiedene Aussenbereiche (Einfahrt, Terrasse, Wege, ParkplÃ¤tze)</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Professionelle Hofreinigung wird fÃ¼r alle Arten von Aussenbereichen angeboten, wobei jeder Bereich spezielle Reinigungsanforderungen hat. Einfahrtsreinigung entfernt Ã–lflecken, Schmutz und Verschmutzungen von Zufahrten und Garageneinfahrten. Terrassenreinigung entfernt Moos, Algen, Kalkablagerungen und VerfÃ¤rbungen von Terrassen und Balkonen. Wege- und Parkplatzreinigung beinhaltet die Reinigung von Gehwegen, ParkplÃ¤tzen und StellplÃ¤tzen. Jeder Aussenbereich hat unterschiedliche Verschmutzungen und erfordert spezielle Methoden. Professionelle Reinigungsfirmen kennen die richtigen Methoden fÃ¼r jeden Bereich und verwenden die passenden Reinigungsmittel und GerÃ¤te. UnabhÃ¤ngig von Ihrem Aussenbereich, alle Reinigungsfirmen in unserem Netzwerk haben Erfahrung mit verschiedenen Bereichen.
                  </p>

                  {/* H2: Hochdruckreinigung fÃ¼r Aussenbereiche - Effektive Methode fÃ¼r hartnÃ¤ckige Verschmutzungen */}
                  <h2 className="heading-2">Hochdruckreinigung fÃ¼r Aussenbereiche - Effektive Methode fÃ¼r hartnÃ¤ckige Verschmutzungen</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Hochdruckreinigung ist eine besonders effektive Methode fÃ¼r Aussenbereiche, die hartnÃ¤ckige Verschmutzungen wie Ã–lflecken, Moos, Algen, Kalkablagerungen oder eingetrockneten Schmutz entfernt. Professionelle Reinigungsfirmen haben leistungsstarke Hochdruckreiniger und kennen die richtigen Techniken fÃ¼r verschiedene OberflÃ¤chen. Wichtig ist, dass der Druck an das Material angepasst wird, um SchÃ¤den zu vermeiden. Beton kann mit stÃ¤rkerem Druck gereinigt werden, wÃ¤hrend Naturstein oder Holz schonender behandelt werden mÃ¼ssen. Hochdruckreinigung erreicht auch schwer zugÃ¤ngliche Stellen und entfernt tief sitzende Verschmutzungen grÃ¼ndlich. Professionelle Reinigungsfirmen verwenden die richtigen Druckeinstellungen und Reinigungsmittel fÃ¼r optimale Ergebnisse.
                  </p>

                  {/* Hochdruckreinigung Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/hochdruckreinigung_aussenbereich.png"
                      alt="Hochdruckreinigung fÃ¼r Aussenbereiche - Effektive Methode fÃ¼r hartnÃ¤ckige Verschmutzungen"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Reinigung verschiedener OberflÃ¤chen (Beton, Naturstein, Pflastersteine, Kies, Holz) */}
                  <h2 className="heading-2">Reinigung verschiedener OberflÃ¤chen (Beton, Naturstein, Pflastersteine, Kies, Holz)</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Aussenbereiche haben verschiedene OberflÃ¤chen, die unterschiedliche Reinigungsmethoden erfordern. Beton kann mit stÃ¤rkerem Druck gereinigt werden und vertrÃ¤gt aggressive Reinigungsmittel. Naturstein benÃ¶tigt schonende Reinigung ohne zu viel Druck, um das Material nicht zu beschÃ¤digen. Pflastersteine kÃ¶nnen mit Hochdruckreinigung gereinigt werden, wobei die Fugenreinigung besonders wichtig ist. KiesflÃ¤chen benÃ¶tigen spezielle Methoden zur Entfernung von Unkraut und Verschmutzungen. Holzterrassen erfordern vorsichtige Reinigung ohne zu viel Feuchtigkeit, um das Holz nicht zu schÃ¤digen. Professionelle Reinigungsfirmen kennen die richtigen Methoden fÃ¼r jeden OberflÃ¤chentyp und verwenden die passenden Reinigungsmittel und GerÃ¤te.
                  </p>

                  {/* OberflÃ¤chen Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/oberflaechenreinigung.png"
                      alt="Reinigung verschiedener OberflÃ¤chen - Beton, Naturstein, Pflastersteine, Kies, Holz"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Moos- und Algenentfernung - Vorbeugung und Entfernung */}
                  <h2 className="heading-2">Moos- und Algenentfernung - Vorbeugung und Entfernung</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Moos und Algen sind hÃ¤ufige Probleme in Aussenbereichen, besonders in feuchten oder schattigen Bereichen. Sie kÃ¶nnen rutschige OberflÃ¤chen verursachen und das Erscheinungsbild beeintrÃ¤chtigen. Professionelle Moos- und Algenentfernung verwendet spezielle Reinigungsmittel und Methoden, um Moos und Algen grÃ¼ndlich zu entfernen. ZusÃ¤tzlich kÃ¶nnen vorbeugende Massnahmen ergriffen werden, um das erneute Wachstum zu verhindern. Professionelle Reinigungsfirmen haben Erfahrung mit verschiedenen Arten von Moos und Algen und verwenden die richtigen Methoden fÃ¼r jeden Fall. RegelmÃ¤ssige Reinigung verhindert die Ansammlung von Moos und Algen und hÃ¤lt Aussenbereiche in optimalem Zustand.
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
                    Moderne Reinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmethoden, auch bei intensiven Hofreinigungen. Diese sind nicht nur besser fÃ¼r die Umwelt, sondern auch fÃ¼r Ihre Gesundheit und die Ihrer Familie. Biologische Reinigungsmittel sind besonders fÃ¼r Haushalte mit Kindern, Haustieren oder in sensiblen Gebieten empfehlenswert. Sie sind effektiv gegen Moos, Algen, Kalk und andere Verschmutzungen, schonen aber gleichzeitig die Umwelt und die Gesundheit. Unsere Partnerfirmen verwenden ausschliesslich zertifizierte, umweltfreundliche Reinigungsmittel und achten darauf, dass Reinigungswasser nicht unkontrolliert in die Kanalisation oder die Umwelt gelangt. Dies ist besonders wichtig in sensiblen Gebieten und fÃ¼r den Schutz der Umwelt.
                  </p>

                  {/* Umweltfreundlich Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/umweltfreundliche_reinigungsmittel_modern.webp"
                      alt="Moderne und umweltfreundliche Reinigungsmethoden fÃ¼r Hofreinigung"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Ablauf unserer Hofreinigung â€“ Schritt fÃ¼r Schritt */}
                  <h2 className="heading-2">Ablauf unserer Hofreinigung â€“ Schritt fÃ¼r Schritt</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Der Ablauf einer professionellen Hofreinigung ist strukturiert und grÃ¼ndlich. ZunÃ¤chst erfolgt eine Besichtigung der Aussenbereiche, um den Umfang der Reinigung zu bestimmen, den Verschmutzungsgrad zu beurteilen und eine genaue Offerte zu erstellen. Nach der AuftragsbestÃ¤tigung wird ein Termin vereinbart, der zu Ihren BedÃ¼rfnissen passt. Am Reinigungstag erscheint das professionelle Reinigungsteam pÃ¼nktlich mit allen notwendigen GerÃ¤ten, speziellen Reinigungsmitteln und AusrÃ¼stung fÃ¼r Hofreinigung. Die Reinigung erfolgt systematisch: Vorreinigung zur Entfernung von grobem Schmutz und Laub, Hauptreinigung mit Hochdruckreinigung oder anderen speziellen Methoden, Behandlung von problematischen Stellen wie Moos oder Ã–lflecken, und abschliessende Nachreinigung. Nach Abschluss der Reinigung erfolgt eine QualitÃ¤tskontrolle, und Sie erhalten saubere, gepflegte Aussenbereiche.
                  </p>

                  {/* Ablauf Image/Icon */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                      {[
                        { icon: Home, text: "Besichtigung und Offerte", textDetail: "Wir besichtigen Ihre Aussenbereiche, beurteilen den Verschmutzungsgrad und erstellen eine genaue Offerte." },
                        { icon: Calendar, text: "Terminvereinbarung", textDetail: "Nach der AuftragsbestÃ¤tigung vereinbaren wir einen Termin, der zu Ihren BedÃ¼rfnissen passt." },
                        { icon: Sparkles, text: "Professionelle Hofreinigung", textDetail: "Unser professionelles Team reinigt Ihre Aussenbereiche grÃ¼ndlich mit speziellen Methoden und GerÃ¤ten." },
                        { icon: CheckCircle, text: "QualitÃ¤tskontrolle", textDetail: "Nach Abschluss der Reinigung erfolgt eine QualitÃ¤tskontrolle fÃ¼r perfekte Ergebnisse." }
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
                    Die Kosten fÃ¼r Hofreinigung hÃ¤ngen von der GrÃ¶sse der FlÃ¤che, dem Verschmutzungsgrad, der Art der OberflÃ¤che und der ZugÃ¤nglichkeit ab. Preise liegen typischerweise zwischen 5 und 15 CHF pro mÂ². Ein durchschnittlicher Hof mit 50 mÂ² kostet etwa 250-750 CHF. GrÃ¶ssere FlÃ¤chen, stark verschmutzte Bereiche oder zusÃ¤tzliche Leistungen wie Moos- und Algenentfernung kÃ¶nnen hÃ¶here Kosten verursachen. Die genauen Kosten hÃ¤ngen von der GrÃ¶sse der FlÃ¤che, dem Zustand, dem Umfang der Reinigung und zusÃ¤tzlichen Leistungen ab. Durch den Vergleich mehrerer Offerten Ã¼ber unsere Plattform kÃ¶nnen Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten. Alle Offerten sind kostenlos und unverbindlich.
                  </p>

                  {/* H2: Wie oft sollte eine Hofreinigung durchgefÃ¼hrt werden? */}
                  <h2 className="heading-2">Wie oft sollte eine Hofreinigung durchgefÃ¼hrt werden?</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Die optimale Reinigungsfrequenz hÃ¤ngt von verschiedenen Faktoren ab: Nutzung, Witterung, Lage und individuelle PrÃ¤ferenzen. Viele Hausbesitzer lassen ihre HÃ¶fe ein- bis zweimal jÃ¤hrlich professionell reinigen, typischerweise im FrÃ¼hjahr und Herbst. Bei starker Verschmutzung, in Gebieten mit viel Regen oder Schatten, oder vor besonderen AnlÃ¤ssen kann Ã¶fter gereinigt werden. RegelmÃ¤ssige Reinigung verhindert die Ansammlung von hartnÃ¤ckigen Verschmutzungen wie Moos oder Algen und hÃ¤lt Aussenbereiche in optimalem Zustand. Professionelle Reinigungsfirmen beraten Sie gerne bei der optimalen Frequenz fÃ¼r Ihre spezifischen Aussenbereiche und berÃ¼cksichtigen dabei Faktoren wie Nutzung, Witterung und OberflÃ¤chentyp.
                  </p>

                  {/* H2: Warum wir der richtige Partner fÃ¼r Ihre Hofreinigung sind */}
                  <h2 className="heading-2">Warum wir der richtige Partner fÃ¼r Ihre HÃ¶fe sind</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Wir sind der vertrauenswÃ¼rdige Partner fÃ¼r Ihre HÃ¶fe. Unser Netzwerk umfasst nur geprÃ¼fte, versicherte Reinigungsfirmen, die hÃ¶chste QualitÃ¤tsstandards erfÃ¼llen und Erfahrung mit Aussenbereichen haben. Alle Partnerfirmen verwenden moderne, umweltfreundliche Reinigungsmittel und haben die richtige AusrÃ¼stung fÃ¼r Reinigung der HÃ¶fe, wie leistungsstarke Hochdruckreiniger und spezielle Reinigungsmittel. Sie kennen die richtigen Methoden fÃ¼r verschiedene OberflÃ¤chen und kÃ¶nnen empfindliche Materialien wie Naturstein oder Holz schonend reinigen. Wir haben bereits Ã¼ber 500 zufriedene Kunden geholfen, die richtige Reinigungsfirma fÃ¼r HÃ¶fe zu finden. Unser Service ist komplett kostenlos und unverbindlich â€“ Sie zahlen nur fÃ¼r die Reinigung selbst, nicht fÃ¼r unsere Vermittlung. Zudem kÃ¶nnen Sie durch den Vergleich mehrerer Offerten bis zu 40% sparen.
                  </p>

                  {/* Customer Reviews */}

                  {/* H2: HÃ¤ufig gestellte Fragen zur Hofreinigung */}
                  <div className="mt-8 md:mt-12">
                    <h2 className="heading-2">HÃ¤ufig gestellte Fragen zur Reinigung</h2>
                    <p className="text-body mb-6 md:mb-8 leading-relaxed">
                      HÃ¤ufig gestellte Fragen zur professionellen Reinigung der HÃ¶fe: Was kostet eine Hofreinigung? Welche Bereiche werden bei einer Hofreinigung gereinigt? Wie oft sollte eine Hofreinigung durchgefÃ¼hrt werden? Ist Hochdruckreinigung fÃ¼r alle OberflÃ¤chen geeignet? Wie lange dauert eine Hofreinigung? Welche Reinigungsmethoden werden verwendet? Werden umweltfreundliche Reinigungsmittel verwendet? Diese und weitere Fragen beantworten wir Ihnen gerne. Ãœber unsere Plattform kÃ¶nnen Sie Reinigungsofferten online vergleichen und dabei bis zu 40% sparen.
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
                      Reinigungsofferten online vergleichen und bis zu 40% sparen. Alle Offerten beinhalten professionelle Hofreinigung mit speziellen Methoden fÃ¼r Ihre Aussenbereiche. Ohne Aufpreis, ohne Verpflichtung. Starten Sie jetzt Ihre kostenlose Anfrage und finden Sie die perfekte Reinigungsfirma fÃ¼r Ihre BedÃ¼rfnisse.
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
                        <p className="text-sm text-gray-600">Professionelle Wohnungsreinigung mit Abnahmegarantie fÃ¼r eine sorgenfreie WohnungsÃ¼bergabe.</p>
                      </Link>
                      <Link href="/reinigung/fensterreinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <h4 className="font-bold text-gray-900 mb-2 text-lg">Fensterreinigung</h4>
                        <p className="text-sm text-gray-600">Streifenfreie Fensterreinigung innen und aussen von professionellen Reinigungsfirmen.</p>
                      </Link>
                      <Link href="/reinigung/grundreinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <h4 className="font-bold text-gray-900 mb-2 text-lg">Grundreinigung</h4>
                        <p className="text-sm text-gray-600">GrÃ¼ndliche Grundreinigung vom Profi fÃ¼r ein tiefenreines Zuhause.</p>
                      </Link>
                    </div>
                  </div>
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <aside
                  className="space-y-4 md:space-y-6"
                >
                  {/* Ratgeber Section */}
                  <CleaningRatgeberSidebar />
                </aside>
                
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
