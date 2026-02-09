'use client'

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, Sparkles, ShieldCheck, Clock, Users, Award, Square, CheckCircle, Star, Calendar, Home, Heart } from 'lucide-react';
import CleaningRatgeberSidebar from '@/components/CleaningRatgeberSidebar';
import { useUserLocation } from '@/hooks/useUserLocation';

const FensterreinigungPageClient = () => {
  const router = useRouter();
  const { city, loading: locationLoading } = useUserLocation();
  

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=reinigung&step=2');
  };

  // SEO Data
  const metaTitle = "Fensterreinigung – Kostenlose Offerten vergleichen";
  const metaDescription = "Fensterreinigung vom Profi: Fordern Sie kostenlose Offerten an und vergleichen Sie Reinigungsfirmen für streifenfreie und professionelle Ergebnisse.";
  // Meta keywords removed - Google no longer uses this tag (since 2009)
  const canonicalUrl = '/reinigung/fensterreinigung';

  // FAQ Data
  const faqItems = [
    {
      q: "Was kostet eine professionelle Fensterreinigung?",
      a: "Die Kosten für Fensterreinigung hängen von der Anzahl der Fenster, der Grösse, der Höhe und dem Schwierigkeitsgrad ab. Eine durchschnittliche Wohnung (10-15 Fenster) kostet etwa 150-300 CHF. Preise liegen typischerweise zwischen 5 und 15 CHF pro Fenster. Durch den Vergleich mehrerer Offerten können Sie bis zu 40% sparen."
    },
    {
      q: "Wie oft sollte ich meine Fenster professionell reinigen lassen?",
      a: "Die optimale Reinigungsfrequenz hängt von verschiedenen Faktoren ab: Lage (städtisch vs. ländlich), Witterung und individuelle Präferenzen. Viele Hausbesitzer lassen ihre Fenster 2-4 Mal pro Jahr professionell reinigen. Regelmässige Reinigung hält Fenster in optimalem Zustand und verlängert ihre Lebensdauer."
    },
    {
      q: "Wird auch die Aussenreinigung durchgeführt?",
      a: "Ja, professionelle Fensterreinigung umfasst sowohl die Innen- als auch die Aussenreinigung. Bei höheren Fenstern werden spezielle Geräte wie Teleskopstangen oder Hubarbeitsbühnen verwendet. Sicherheit hat oberste Priorität. Alle unsere Partnerfirmen sind versichert und ihre Mitarbeiter sind geschult für Höhenarbeit."
    },
    {
      q: "Wie lange dauert eine Fensterreinigung?",
      a: "Die Dauer hängt von der Anzahl und Grösse der Fenster ab. Eine durchschnittliche Wohnung (10-15 Fenster) benötigt etwa 2-3 Stunden. Grössere Häuser oder Bürogebäude können länger dauern. Professionelle Reinigungsfirmen arbeiten effizient und systematisch, um die Reinigung schnell und gründlich durchzuführen."
    },
    {
      q: "Kann ich nach der Reinigung sofort wieder die Fenster öffnen?",
      a: "Ja, nach der Reinigung können Sie die Fenster sofort wieder öffnen. Professionelle Reinigungsfirmen verwenden streifenfreie Methoden und trocknen die Fenster gründlich ab. Die verwendeten Reinigungsmittel sind umweltfreundlich und hinterlassen keine Rückstände."
    },
    {
      q: "Sind die Reinigungskräfte versichert?",
      a: "Ja, alle Reinigungsfirmen in unserem Netzwerk sind vollständig versichert. Dies umfasst Haftpflichtversicherung, Unfallversicherung und Versicherung für Höhenarbeit. Sie haben die Sicherheit, dass im Falle eines Schadens oder Unfalls die Versicherung greift. Alle Partnerfirmen müssen ihre Versicherungsnachweise vorlegen, bevor sie in unser Netzwerk aufgenommen werden."
    },
    {
      q: "Werden umweltfreundliche Reinigungsmittel verwendet?",
      a: "Ja, alle unsere Partnerfirmen verwenden ausschliesslich zertifizierte, umweltfreundliche Reinigungsmittel. Diese sind nicht nur besser für die Umwelt, sondern auch für Ihre Gesundheit und die Ihrer Familie. Biologische Reinigungsmittel sind besonders für Haushalte mit Kindern, Allergikern oder Haustieren empfehlenswert. Sie sind effektiv gegen Schmutz, Kalk und Bakterien, schonen aber gleichzeitig die Umwelt und die Gesundheit."
    }
  ];


  // Single JSON-LD Service schema
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": metaTitle,
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
      "name": "Kostenlose Offerte für Fensterreinigung"
    }
  }), [metaTitle, metaDescription]);

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
              backgroundImage: `url('https://online-offerten.ch/reinigungsfirma/fensterreinigung_profi_bei_der_arbeit.png')`,
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
                  <h1 
                    className="heading-1 break-words"
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
                    Professionelle Fensterreinigung
                  </h1>
                </motion.div>
                
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-base sm:text-body mb-8 leading-relaxed"
                >
                  Professionelle Fensterreinigung für strahlend saubere Fenster. Innen- und Aussenreinigung. Reinigungsofferten online vergleichen und bis zu 40% sparen.
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
                  {/* H2: Warum eine professionelle Fensterreinigung sinnvoll ist */}
                  <h2 className="heading-2 mb-6 break-words">Warum eine professionelle Fensterreinigung sinnvoll ist</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Eine professionelle Reinigung der Fenster bietet zahlreiche Vorteile, die über die reine Sauberkeit hinausgehen. Saubere Fenster lassen mehr natürliches Licht ins Haus, verbessern das Erscheinungsbild erheblich und steigern den Wert Ihrer Immobilie. Professionelle Reinigungskräfte verfügen über das Fachwissen und die richtigen Geräte, um auch schwer zugängliche Fenster gründlich zu reinigen. Zudem entfernen sie hartnäckige Rückstände wie Kalk, Vogelkot oder Insekten, die bei normaler Reinigung oft zurückbleiben. Besonders bei höheren Stockwerken oder schwer zugänglichen Fenstern ist professionelle Hilfe unerlässlich, da Sicherheit und Qualität oberste Priorität haben.
                  </p>
                  
                  {/* H2: Unsere Leistungen im Bereich Fensterreinigung */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Unsere Leistungen im Bereich Fenster</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Unser Netzwerk geprüfter Reinigungsfirmen bietet ein umfassendes Leistungsspektrum für die Reinigung der Fenster. Dazu gehören die gründliche Reinigung von Fensterscheiben innen und aussen, die Reinigung von Fensterrahmen und -bänken, die Reinigung von Fenstergriffen, die Entfernung von Kalkablagerungen, die Reinigung von Rollläden oder Jalousien, sowie die Reinigung von Türen mit Glas. Alle unsere Partnerfirmen arbeiten mit modernsten Reinigungstechniken und umweltfreundlichen Reinigungsmitteln für streifenfreie Ergebnisse. Besonders wichtig: Alle Reinigungsfirmen in unserem Netzwerk sind versichert und ihre Mitarbeiter sind geschult für Höhenarbeit und Sicherheit.
                  </p>

                  {/* Leistungen Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/fensterreinigung_profi.png"
                      alt="Fensterreinigungsdienstleistungen - Professionelle Reinigung aller Fenster"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Leistungen */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>Innen- und Aussenreinigung von Fenstern</li>
                    <li>Reinigung von Fensterrahmen und -bänken</li>
                    <li>Entfernung von Kalkablagerungen und Wasserflecken</li>
                    <li>Reinigung von Rollläden oder Jalousien</li>
                    <li>Reinigung von Türen mit Glas</li>
                    <li>Reinigung schwer zugänglicher Fenster</li>
                    <li>Höhenarbeit mit professioneller Ausrüstung</li>
                    <li>Streifenfreie Reinigung mit speziellen Techniken</li>
                  </ul>

                  {/* CTA 1 - After Leistungen */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200 mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                      {city && !locationLoading 
                        ? `Professionelle Reinigung der Fenster in ${city}`
                        : 'Professionelle Reinigung der Fenster buchen'
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

                  {/* H2: Vorteile unserer Fensterreinigung */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Vorteile unserer Fensterreinigung</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Professionelle Reinigung der Fenster bietet zahlreiche Vorteile gegenüber der eigenen Reinigung. Sie spart wertvolle Zeit, die Sie für Familie, Beruf oder Hobbys nutzen können. Professionelle Reinigungskräfte verwenden spezielle Techniken und Mittel für streifenfreie Ergebnisse, die bei normaler Reinigung schwer zu erreichen sind. Zudem haben sie die richtige Ausrüstung für Höhenarbeit und schwer zugängliche Fenster. Professionelle Reinigungsfirmen sind versichert, was Ihnen Sicherheit gibt. Durch den Vergleich mehrerer Offerten über unsere Plattform können Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten.
                  </p>

                  {/* Vorteile Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/reinigungsmittel_auf_tisch.webp"
                      alt="Vorteile professioneller Fensterreinigung - Streifenfreie Ergebnisse"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Vorteile */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>Streifenfreie Ergebnisse durch professionelle Techniken</li>
                    <li>Nur geprüfte, versicherte Reinigungsfirmen</li>
                    <li>Umweltfreundliche Reinigungsmittel</li>
                    <li>Flexible Terminplanung</li>
                    <li>Bis zu 40% Kostenersparnis durch Vergleich</li>
                    <li>Sicherheit bei Höhenarbeit garantiert</li>
                  </ul>

                  {/* H2: Was bei einer gründlichen Fensterreinigung gereinigt wird */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Was bei einer gründlichen Fensterreinigung gereinigt wird</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Eine umfassende Reinigung der Fenster beinhaltet die Reinigung aller Fenster und glasbezogenen Elemente. Dazu gehören die gründliche Reinigung der Fensterscheiben innen und aussen mit streifenfreien Methoden, die Reinigung von Fensterrahmen und -bänken, die Entfernung von Kalkablagerungen und Wasserflecken, die Reinigung von Fenstergriffen und Beschlägen, die Reinigung von Rollläden oder Jalousien, sowie die Reinigung von Türen mit Glas. Professionelle Reinigungskräfte verwenden spezielle Techniken und Mittel, um auch hartnäckige Rückstände wie Vogelkot, Insekten oder Pollen zu entfernen. Eine professionelle Reinigung geht weit über das normale Putzen hinaus und sorgt für strahlend saubere Fenster.
                  </p>

                  {/* H2: Fensterreinigung für hohe Gebäude und schwer zugängliche Fenster */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Fensterreinigung für hohe Gebäude und schwer zugängliche Fenster</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Fenster in höheren Stockwerken oder schwer zugänglichen Bereichen erfordern spezielle Ausrüstung und Fachkenntnisse. Professionelle Reinigungsfirmen haben die richtige Ausrüstung für Höhenarbeit: Leitern, Gerüste, Teleskopstangen oder spezielle Seilzugtechniken. Sie sind versichert und ihre Mitarbeiter sind geschult für Sicherheit bei der Höhenarbeit. Dies ist besonders wichtig bei mehrstöckigen Gebäuden, Bürogebäuden oder schwer zugänglichen Fenstern. Professionelle Reinigungsfirmen kennen die besten Techniken und verwenden die richtige Ausrüstung, um auch die höchsten Fenster sicher und gründlich zu reinigen.
                  </p>

                  {/* Hohe Gebäude Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/fensterreinigung_hohe_gebaeude_sicherheitsausruestung.png"
                      alt="Fensterreinigung für hohe Gebäude - Professionelle Höhenarbeit mit Sicherheitsausrüstung"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Moderne und umweltfreundliche Reinigungsmittel */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Moderne und umweltfreundliche Reinigungsmittel</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Moderne Reinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmittel. Diese sind nicht nur besser für die Umwelt, sondern auch für Ihre Gesundheit und die Ihrer Familie. Biologische Reinigungsmittel sind besonders für Haushalte mit Kindern, Allergikern oder Haustieren empfehlenswert. Sie sind effektiv gegen Schmutz, Kalk und Bakterien, schonen aber gleichzeitig die Umwelt und die Gesundheit. Unsere Partnerfirmen verwenden ausschliesslich zertifizierte, umweltfreundliche Reinigungsmittel und achten darauf, dass keine schädlichen Chemikalien zurückbleiben. Streifenfreie Ergebnisse werden mit umweltfreundlichen Mitteln erreicht.
                  </p>

                  {/* Umweltfreundlich Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/umweltfreundliche_reinigungsmittel_modern.webp"
                      alt="Umweltfreundliche Reinigungsmittel für Fensterreinigung - Biologische und gesundheitsschonende Produkte"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Ablauf unserer Fensterreinigung – Schritt für Schritt */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Ablauf unserer Fensterreinigung – Schritt für Schritt</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Der Ablauf einer professionellen Fensterreinigung ist strukturiert und effizient. Zunächst erfolgt eine Besichtigung der Fenster, um den Umfang der Reinigung zu bestimmen und eine genaue Offerte zu erstellen. Nach der Auftragsbestätigung wird ein Termin vereinbart, der zu Ihren Bedürfnissen passt. Am Reinigungstag erscheint das professionelle Reinigungsteam pünktlich mit allen notwendigen Geräten und Reinigungsmitteln. Die Reinigung erfolgt systematisch Fenster für Fenster, beginnend mit den am stärksten verschmutzten Bereichen. Nach Abschluss der Reinigung erfolgt eine Qualitätskontrolle, und Sie erhalten streifenfreie, strahlend saubere Fenster.
                  </p>

                  {/* Ablauf Image/Icon */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
                      {[
                        { icon: Home, text: "Kostenlose Offerte anfordern" },
                        { icon: Clock, text: "Besichtigung und Offerte erhalten" },
                        { icon: Calendar, text: "Termin vereinbaren" },
                        { icon: Sparkles, text: "Professionelle Reinigung durchführen" },
                        { icon: CheckCircle, text: "Qualitätskontrolle und Abnahme" }
                      ].map((step, index) => {
                        const IconComponent = step.icon;
                        return (
                          <div key={index} className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-600 flex items-center justify-center mb-3">
                              <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                            </div>
                            <p className="text-xs md:text-sm text-gray-700 font-medium">{step.text}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* H2: Was kostet eine professionelle Fensterreinigung? */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Was kostet eine professionelle Fensterreinigung?</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Die Kosten für Fensterreinigung hängen von der Anzahl der Fenster, der Grösse, der Höhe, der Zugänglichkeit und davon ab, ob innen, aussen oder beides gereinigt wird. Preise liegen typischerweise zwischen 5 und 15 CHF pro Fenster. Eine durchschnittliche Wohnung (10-15 Fenster) kostet etwa 150-300 CHF. Grössere Häuser oder Bürogebäude können höhere Kosten verursachen. Durch den Vergleich mehrerer Offerten über unsere Plattform können Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten. Alle Offerten sind kostenlos und unverbindlich.
                  </p>

                  {/* H2: Regelmässige vs. einmalige Fensterreinigung */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Regelmässige vs. einmalige Fensterreinigung</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Die optimale Reinigungsfrequenz hängt von verschiedenen Faktoren ab: Lage (städtisch vs. ländlich), Witterung, Anzahl der Fenster und individuelle Präferenzen. Viele Menschen lassen ihre Fenster ein- bis zweimal jährlich professionell reinigen, während andere häufiger reinigen lassen. Regelmässige Fensterreinigung hält Fenster in optimalem Zustand und verlängert ihre Lebensdauer. Einmalige Reinigungen sind ideal für besondere Anlässe wie Wohnungsübergabe, Umzug oder nach Renovationen. Professionelle Reinigungsfirmen bieten beide Optionen an und passen die Reinigung an Ihre Bedürfnisse an.
                  </p>

                  {/* H2: Warum wir der richtige Partner für Ihre Fensterreinigung sind */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Warum wir der richtige Partner für Ihre Fenster sind</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Wir sind der vertrauenswürdige Partner für Ihre Fenster. Unser Netzwerk umfasst nur geprüfte, versicherte Reinigungsfirmen, die höchste Qualitätsstandards erfüllen. Alle Partnerfirmen verwenden moderne, umweltfreundliche Reinigungsmittel und haben die richtige Ausrüstung für Höhenarbeit. Wir haben bereits über 500 zufriedene Kunden geholfen, die richtige Reinigungsfirma für Fenster zu finden. Unser Service ist komplett kostenlos und unverbindlich – Sie zahlen nur für die Reinigung selbst, nicht für unsere Vermittlung. Zudem können Sie durch den Vergleich mehrerer Offerten bis zu 40% sparen.
                  </p>

                  {/* CTA Banner Section */}
                  <div className="mt-6 md:mt-8 mb-6 md:mb-8">
                    <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-700 rounded-xl p-6 md:p-8 lg:p-10 shadow-xl">
                      {/* Header with icons */}
                      <div className="flex items-center justify-center mb-4 md:mb-6">
                        <div className="w-3 h-3 bg-blue-300 rounded-sm rotate-45 mr-2"></div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-tight">
                          Fensterreinigung – Kostenlose Offerten anfordern und bis zu 40% sparen
                        </h3>
                        <div className="w-3 h-3 bg-blue-300 rounded-sm rotate-45 ml-2"></div>
                      </div>
                      
                      {/* Features with checkmarks */}
                      <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-300 mr-3 flex-shrink-0" />
                          <span className="text-white text-base md:text-lg font-medium">100% kostenlos und unverbindlich</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-300 mr-3 flex-shrink-0" />
                          <span className="text-white text-base md:text-lg font-medium">Geprüfte Partner für streifenfreie Ergebnisse</span>
                      </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-300 mr-3 flex-shrink-0" />
                          <span className="text-white text-base md:text-lg font-medium">Transparente Preise ohne Verpflichtung</span>
                        </div>
                      </div>
                      
                      {/* CTA Button */}
                      <div className="flex justify-center">
                        <Button
                          onClick={handleCtaClick}
                          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
                        >
                          Kostenlose Offerten anfordern
                          <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Customer Reviews */}

                  {/* H2: Häufig gestellte Fragen zur Fensterreinigung */}
                  <div className="mt-8 md:mt-12">
                    <h2 className="heading-2 mb-6">Häufig gestellte Fragen zur Reinigung</h2>
                    <p className="text-body mb-6 md:mb-8">
                      Häufig gestellte Fragen zur professionellen Reinigung der Fenster: Was kostet eine professionelle Fensterreinigung? Wie oft sollte ich meine Fenster professionell reinigen lassen? Wird auch die Aussenreinigung durchgeführt? Wie lange dauert eine Fensterreinigung? Kann ich nach der Reinigung sofort wieder die Fenster öffnen? Sind die Reinigungskräfte versichert? Werden umweltfreundliche Reinigungsmittel verwendet? Diese und weitere Fragen beantworten wir Ihnen gerne. Über unsere Plattform können Sie Reinigungsofferten online vergleichen und dabei bis zu 40% sparen.
                    </p>
                    <Accordion type="single" collapsible className="w-full">
                      {faqItems.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-xl font-semibold text-left hover:no-underline text-gray-900 px-2 sm:px-4 py-4">
                            <h4 className="faq-question">{item.q}</h4>
                          </AccordionTrigger>
                          <AccordionContent className="text-body pt-2 pb-4 px-2 sm:px-4">
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>

                  {/* H2: Jetzt unverbindliche Reinigungs-Offerte anfordern */}
                  <div className="mt-8 md:mt-12">
                    <h2 className="heading-2 mb-6">Jetzt unverbindliche Reinigungs-Offerte anfordern</h2>
                    <p className="text-body mb-6">
                      Reinigungsofferten online vergleichen und bis zu 40% sparen. Alle Offerten beinhalten professionelle Reinigung mit streifenfreien Ergebnissen. Ohne Aufpreis, ohne Verpflichtung. Starten Sie jetzt Ihre kostenlose Anfrage und finden Sie die perfekte Reinigungsfirma für Ihre Bedürfnisse.
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
                    <h3 className="heading-3 mb-6">Weitere Reinigungsdienstleistungen</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <Link href="/reinigung/umzugsreinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <h4 className="heading-4 mb-2">Umzugsreinigung</h4>
                        <p className="text-sm text-gray-600">Professionelle Umzugsreinigung mit Abnahmegarantie für eine sorgenfreie Wohnungsübergabe.</p>
                      </Link>
                      <Link href="/reinigung/wohnungsreinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <h4 className="heading-4 mb-2">Wohnungsreinigung</h4>
                        <p className="text-sm text-gray-600">Gründliche Wohnungsreinigung mit 100% Abnahmegarantie für alle Räume.</p>
                      </Link>
                      <Link href="/reinigung/baureinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <h4 className="heading-4 mb-2">Baureinigung</h4>
                        <p className="text-sm text-gray-600">Gründliche Baureinigung nach Neubau oder Renovation für perfekte Resultate.</p>
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
                    <h3 className="heading-3 mb-4">Jetzt Offerten anfordern</h3>
                    <p className="text-body mb-3 md:mb-4">
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

export default FensterreinigungPageClient;
