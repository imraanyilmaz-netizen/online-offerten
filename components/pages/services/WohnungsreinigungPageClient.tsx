'use client'

import React, { useMemo } from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Clock, CheckCircle, Users, Award, Star, Leaf, Home, Heart, Calendar } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CleaningRatgeberSidebar from '@/components/CleaningRatgeberSidebar';
import { useUserLocation } from '@/hooks/useUserLocation';

const WohnungsreinigungPageClient = () => {
  const router = useRouter();
  const { city, loading: locationLoading } = useUserLocation();
  

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=reinigung&step=2');
  };

  // SEO Data
  const metaTitle = "Wohnungsreinigung mit Abnahmegarantie – Kostenlose Offerten vergleichen";
  const metaDescription = "Professionelle Wohnungsreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Wohnungsübergabe garantiert.";
  // Meta keywords removed - Google no longer uses this tag (since 2009)
  const canonicalUrl = '/reinigung/wohnungsreinigung';

  // FAQ Data
  const faqItems = [
    {
      q: "Was kostet eine professionelle Wohnungsreinigung mit Abnahmegarantie?",
      a: "Die Kosten für Wohnungsreinigung mit Abnahmegarantie hängen von der Grösse der Wohnung, dem Zustand und dem Umfang der Reinigung ab. Eine durchschnittliche 3-Zimmer-Wohnung kostet etwa 400-900 CHF. Die Abnahmegarantie ist in der Regel im Preis enthalten und gibt Ihnen die Sicherheit, dass die Wohnung den Anforderungen entspricht. Durch den Vergleich mehrerer Offerten können Sie bis zu 40% sparen."
    },
    {
      q: "Was bedeutet Abnahmegarantie bei der Wohnungsreinigung?",
      a: "Die Abnahmegarantie bedeutet, dass die Reinigungsfirma garantiert, dass die Wohnung den Anforderungen für die Übergabe entspricht. Sollte der Vermieter oder neue Eigentümer bei der Übergabe Mängel feststellen, wird die Reinigungsfirma kostenlos nachbessern, bis die Wohnung den Anforderungen entspricht. Dies gibt Ihnen maximale Sicherheit und spart Zeit und Nerven bei der Wohnungsübergabe."
    },
    {
      q: "Was beinhaltet eine umfassende Wohnungsreinigung?",
      a: "Eine umfassende Wohnungsreinigung beinhaltet: gründliche Reinigung aller Räume, Reinigung der Böden inklusive Ecken und Kanten, Reinigung der Küche inklusive Herd, Backofen und Kühlschrank, gründliche Reinigung des Badezimmers, Reinigung der Fenster innen und aussen, sowie Reinigung von Heizkörpern, Lichtschaltern und Steckdosen. Zusätzlich werden alle Oberflächen desinfiziert und schwer zugängliche Stellen gründlich gereinigt."
    },
    {
      q: "Wie lange dauert eine professionelle Wohnungsreinigung?",
      a: "Die Dauer hängt von der Grösse der Wohnung und dem Zustand ab. Eine durchschnittliche 3-Zimmer-Wohnung benötigt etwa 3-5 Stunden. Grössere Wohnungen oder stark verschmutzte Bereiche können länger dauern. Professionelle Reinigungsteams arbeiten effizient und systematisch, um optimale Ergebnisse in angemessener Zeit zu erzielen."
    },
    {
      q: "Kann ich die Reinigung flexibel planen?",
      a: "Ja, die meisten Reinigungsfirmen bieten flexible Termine an. Sie können die Reinigung nach Ihren Bedürfnissen planen, einschliesslich Reinigung während Ihrer Abwesenheit oder zu bestimmten Zeiten. Viele Firmen bieten auch Notfall-Reinigungen an, falls Sie kurzfristig eine Reinigung benötigen, beispielsweise bei einer unerwarteten Wohnungsübergabe."
    },
    {
      q: "Sind die Reinigungskräfte versichert?",
      a: "Ja, seriöse Reinigungsfirmen haben eine Betriebshaftpflichtversicherung und ihre Mitarbeiter sind versichert. Dies schützt Sie vor Haftung bei Unfällen oder Schäden während der Reinigung. Alle Reinigungsfirmen in unserem Netzwerk sind geprüft und versichert, sodass Sie sicher sein können, dass Sie professionell und zuverlässig bedient werden."
    },
    {
      q: "Werden umweltfreundliche Reinigungsmittel verwendet?",
      a: "Ja, moderne Reinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmittel. Diese sind nicht nur besser für die Umwelt, sondern auch für Ihre Gesundheit und die Ihrer Familie. Biologische Reinigungsmittel sind besonders für Haushalte mit Kindern, Allergikern oder Haustieren empfehlenswert. Unsere Partnerfirmen verwenden ausschliesslich zertifizierte, umweltfreundliche Reinigungsmittel."
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
      "name": "Kostenlose Offerte für Wohnungsreinigung"
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
        <section
          className="relative w-full py-8 md:py-12 lg:py-16 overflow-hidden"
        >
          {/* Background Image - Right Side */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://online-offerten.ch/reinigungsfirma/wohnungsreinigung_hero_header.webp')`,
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
          
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10 overflow-x-hidden">
            <div className="max-w-full w-full min-w-0">
              {/* Text Section */}
              <div className="px-0 sm:px-4 py-4 sm:py-6 md:py-8 lg:py-12 w-full min-w-0 overflow-x-hidden">
                <div
                  className="w-full min-w-0"
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
                    Professionelle Wohnungsreinigung mit Abnahmegarantie
                  </h1>
                </div>
                
                <p
                  className="text-body text-gray-700 mb-8 leading-relaxed break-words w-full"
                >
                  Gründliche Wohnungsreinigung mit 100% Abnahmegarantie für eine sorgenfreie Übergabe. Reinigungsofferten online vergleichen und bis zu 40% sparen.
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
                    <span className="text-sm md:text-base text-gray-700 font-medium">Bis zu 40% sparen</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-base text-gray-700 font-medium">Nur geprüfte Firmen</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-base text-gray-700 font-medium">100% kostenlos & unverbindlich</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 md:py-12 lg:py-16 xl:py-24 overflow-x-hidden">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 overflow-x-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {/* Main Article */}
              <div className="lg:col-span-2 w-full min-w-0">
                <article
                  className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 mb-6 md:mb-8 w-full min-w-0 overflow-x-hidden"
                >
                  {/* H2: Warum eine professionelle Wohnungsreinigung sinnvoll ist */}
                  <h2 className="heading-2 mb-6 break-words">Warum eine professionelle Wohnungsreinigung sinnvoll ist</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Eine professionelle Wohnungsreinigung bietet zahlreiche Vorteile, die über die reine Sauberkeit hinausgehen. Sie spart wertvolle Zeit, die Sie für Familie, Beruf oder Hobbys nutzen können. Professionelle Reinigungskräfte verfügen über das Fachwissen und die richtigen Geräte, um auch schwer zugängliche Stellen gründlich zu reinigen. Zudem trägt eine regelmässige professionelle Reinigung zur Gesundheit bei, indem sie Allergene, Bakterien und Viren effektiv entfernt. Besonders bei der Wohnungsübergabe ist eine professionelle Reinigung mit Abnahmegarantie unerlässlich, um sicherzustellen, dass alle Anforderungen des Vermieters erfüllt werden.
                  </p>

                  {/* H2: Unsere Leistungen im Bereich Wohnungsreinigung */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Unsere Leistungen im Bereich Reinigung</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Unser Netzwerk geprüfter Reinigungsfirmen bietet ein umfassendes Leistungsspektrum für die professionelle Reinigung. Dazu gehören die gründliche Reinigung aller Räume, inklusive Küche, Badezimmer, Wohnzimmer und Schlafzimmer. Wir bieten auch spezialisierte Dienstleistungen wie Fensterreinigung, Bodenreinigung, Fassadenreinigung und Baureinigung an. Alle unsere Partnerfirmen arbeiten mit modernsten Reinigungstechniken und umweltfreundlichen Reinigungsmitteln. Besonders wichtig: Alle Reinigungsfirmen in unserem Netzwerk bieten eine 100% Abnahmegarantie, sodass Sie sicher sein können, dass die Wohnung den Anforderungen entspricht.
                  </p>

                  {/* Leistungen Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/professionelle_wohnungsreinigung_team.webp"
                      alt="Wohnungsreinigungsdienstleistungen - Professionelle Reinigung aller Räume"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Leistungen */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>Gründliche Reinigung aller Räume</li>
                    <li>Küchen- und Badezimmerreinigung</li>
                    <li>Fenster- und Oberflächenreinigung</li>
                    <li>Bodenreinigung inklusive Ecken und Kanten</li>
                    <li>Desinfektion von Oberflächen</li>
                    <li>Reinigung schwer zugänglicher Stellen</li>
                  </ul>

                  {/* CTA 1 - After Leistungen */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200 mb-6 md:mb-8">
                    <h3 className="heading-3 mb-4">
                      {city && !locationLoading 
                        ? `Professionelle Wohnungsreinigung in ${city}`
                        : 'Professionelle Wohnungsreinigung buchen'
                      }
                    </h3>
                    <p className="text-body mb-4">
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

                  {/* H2: Vorteile unserer Reinigung mit Abnahmegarantie */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Vorteile unserer Reinigung mit Abnahmegarantie</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Die Abnahmegarantie ist ein entscheidender Vorteil bei der professionellen Reinigung. Sie bedeutet, dass die Reinigungsfirma garantiert, dass die Wohnung den Anforderungen für die Übergabe entspricht. Sollte der Vermieter oder neue Eigentümer Mängel feststellen, wird die Reinigungsfirma kostenlos nachbessern, bis die Wohnung den Anforderungen entspricht. Dies gibt Ihnen maximale Sicherheit und spart Zeit und Nerven. Zusätzlich profitieren Sie von unserer über 12-jährigen Erfahrung im Bereich Reinigungsdienstleistungen und von unserem Netzwerk geprüfter, versicherter Reinigungsfirmen.
                  </p>

                  {/* Abnahmegarantie Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/reinigungsmittel_auf_tisch.webp"
                      alt="Reinigung mit Abnahmegarantie - Vorher und Nachher Vergleich"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Vorteile */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>100% Abnahmegarantie für sorgenfreie Übergabe</li>
                    <li>Nur geprüfte, versicherte Reinigungsfirmen</li>
                    <li>Umweltfreundliche Reinigungsmittel</li>
                    <li>Flexible Terminplanung</li>
                    <li>Bis zu 40% Kostenersparnis durch Vergleich</li>
                  </ul>

                  {/* H2: Was bei einer gründlichen Wohnungsreinigung gereinigt wird */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Was bei einer gründlichen Wohnungsreinigung gereinigt wird</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Eine umfassende Reinigung beinhaltet die Reinigung aller Räume und Bereiche. Dazu gehören das Staubwischen aller Oberflächen, inklusive Regale, Schränke, Fensterbänke und Heizkörper. Die Böden werden gründlich gesaugt und gewischt, inklusive Ecken und Kanten. In der Küche werden Herd, Backofen, Kühlschrank, Spüle und Arbeitsflächen gereinigt. Das Badezimmer wird komplett gereinigt, inklusive Toilette, Dusche, Badewanne, Waschbecken und Fliesen. Fenster werden innen und aussen gereinigt, und alle Oberflächen werden desinfiziert. Eine professionelle Reinigung geht weit über das normale Putzen hinaus und sorgt für ein hygienisch sauberes Zuhause.
                  </p>

                  {/* H2: Reinigung für Haushalte mit Haustieren */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Reinigung für Haushalte mit Haustieren</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Haushalte mit Haustieren haben besondere Anforderungen bei der Reinigung. Haare, Gerüche und Flecken erfordern spezielle Reinigungsmethoden und -mittel. Professionelle Reinigungsfirmen kennen die besten Techniken zur Entfernung von Tierhaaren, zur Neutralisierung von Gerüchen und zur Behandlung von Flecken. Sie verwenden tierfreundliche Reinigungsmittel, die für Haustiere unbedenklich sind, und achten besonders auf die Reinigung von Bereichen, in denen sich Haustiere häufig aufhalten. Eine regelmässige professionelle Reinigung ist besonders wichtig für Haushalte mit Haustieren, um Allergene zu reduzieren und ein gesundes Wohnumfeld zu gewährleisten.
                  </p>

                  {/* Haustiere Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/reinigung_haustierhaushalt_katze.webp"
                      alt="Reinigung für Haushalte mit Haustieren - Tierfreundliche Reinigungsmittel"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Moderne und umweltfreundliche Reinigungsmittel */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Moderne und umweltfreundliche Reinigungsmittel</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Moderne Reinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmittel. Diese sind nicht nur besser für die Umwelt, sondern auch für Ihre Gesundheit und die Ihrer Familie. Biologische Reinigungsmittel sind besonders für Haushalte mit Kindern, Allergikern oder Haustieren empfehlenswert. Sie sind effektiv gegen Schmutz und Bakterien, schonen aber gleichzeitig die Umwelt und die Gesundheit. Unsere Partnerfirmen verwenden ausschliesslich zertifizierte, umweltfreundliche Reinigungsmittel und achten darauf, dass keine schädlichen Chemikalien in Ihrer Wohnung zurückbleiben.
                  </p>

                  {/* Umweltfreundlich Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/umweltfreundliche_reinigungsmittel_modern.webp"
                      alt="Umweltfreundliche Reinigungsmittel - Biologische und gesundheitsschonende Produkte"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Ablauf unserer Wohnungsreinigung – Schritt für Schritt */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Ablauf unserer Wohnungsreinigung – Schritt für Schritt</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Der Ablauf einer professionellen Wohnungsreinigung ist strukturiert und effizient. Zunächst erfolgt eine Besichtigung der Wohnung, um den Umfang der Reinigung zu bestimmen und eine genaue Offerte zu erstellen. Nach der Auftragsbestätigung wird ein Termin vereinbart, der zu Ihren Bedürfnissen passt. Am Reinigungstag erscheint das professionelle Reinigungsteam pünktlich mit allen notwendigen Geräten und Reinigungsmitteln. Die Reinigung erfolgt systematisch Raum für Raum, beginnend mit den am stärksten verschmutzten Bereichen. Nach Abschluss der Reinigung erfolgt eine Qualitätskontrolle, und Sie erhalten eine Abnahmegarantie. Sollten Sie mit dem Ergebnis nicht zufrieden sein, wird kostenlos nachgebessert.
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

                  {/* H2: Was kostet eine professionelle Wohnungsreinigung? */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6">Was kostet eine professionelle Wohnungsreinigung?</h2>
                  <p className="text-body mb-6">
                    Die Kosten für Wohnungsreinigung variieren je nach Grösse der Wohnung, Umfang der Reinigung und Region. In der Regel werden Preise zwischen 25 und 50 CHF pro Stunde berechnet. Eine durchschnittliche 3-Zimmer-Wohnung benötigt etwa 3-4 Stunden, was Kosten von 75-200 CHF bedeutet. Grössere Wohnungen oder besonders verschmutzte Bereiche können höhere Kosten verursachen. Durch den Vergleich mehrerer Offerten über unsere Plattform können Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen mit Abnahmegarantie erhalten. Alle Offerten sind kostenlos und unverbindlich.
                  </p>

                  {/* H2: Warum wir der richtige Partner für Ihre Reinigung sind */}
                  <h2 className="heading-2 mt-8 md:mt-12 mb-6 break-words">Warum wir der richtige Partner für Ihre Reinigung sind</h2>
                  <p className="text-body mb-6 break-words w-full">
                    Wir sind der vertrauenswürdige Partner für Ihre Wohnungsreinigung. Unser Netzwerk umfasst nur geprüfte, versicherte Reinigungsfirmen, die höchste Qualitätsstandards erfüllen. Alle Partnerfirmen bieten eine 100% Abnahmegarantie und verwenden moderne, umweltfreundliche Reinigungsmittel. Wir haben bereits über 500 zufriedene Kunden geholfen, die richtige Reinigungsfirma zu finden. Unser Service ist komplett kostenlos und unverbindlich – Sie zahlen nur für die Reinigung selbst, nicht für unsere Vermittlung. Zudem können Sie durch den Vergleich mehrerer Offerten bis zu 40% sparen.
                  </p>

                  {/* CTA Banner Section */}
                  <div className="mt-6 md:mt-8 mb-6 md:mb-8">
                    <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-700 rounded-xl p-6 md:p-8 lg:p-10 shadow-xl">
                      {/* Header with icons */}
                      <div className="flex items-center justify-center mb-4 md:mb-6">
                        <div className="w-3 h-3 bg-blue-300 rounded-sm rotate-45 mr-2"></div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-tight">
                          Kostenlose Offerten anfordern und bis zu 40% sparen
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
                          <span className="text-white text-base md:text-lg font-medium">Geprüfte Partner mit Abnahmegarantie</span>
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


                  {/* H2: Häufig gestellte Fragen zur Wohnungsreinigung */}
                  <div className="mt-8 md:mt-12">
                    <h2 className="heading-2 mb-6">Häufig gestellte Fragen zur Reinigung</h2>
                    <p className="text-body mb-6 md:mb-8">
                      Häufig gestellte Fragen zur professionellen Reinigung mit Abnahmegarantie: Was kostet eine professionelle Reinigung? Was beinhaltet eine umfassende Reinigung? Wie lange dauert eine Reinigung? Was bedeutet Abnahmegarantie? Sind die Reinigungskräfte versichert? Kann ich die Reinigung flexibel planen? Diese und weitere Fragen beantworten wir Ihnen gerne. Über unsere Plattform können Sie Reinigungsofferten online vergleichen und dabei bis zu 40% sparen.
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
                      Reinigungsofferten online vergleichen und bis zu 40% sparen. Alle Offerten beinhalten eine 100% Abnahmegarantie. Ohne Aufpreis, ohne Verpflichtung. Starten Sie jetzt Ihre kostenlose Anfrage und finden Sie die perfekte Reinigungsfirma für Ihre Wohnung.
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
                        <p className="text-body text-sm">Professionelle Umzugsreinigung mit Abnahmegarantie für eine sorgenfreie Wohnungsübergabe.</p>
                      </Link>
                      <Link href="/reinigung/fensterreinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <h4 className="heading-4 mb-2">Fensterreinigung</h4>
                        <p className="text-body text-sm">Streifenfreie Fensterreinigung innen und aussen von professionellen Reinigungsfirmen.</p>
                      </Link>
                      <Link href="/reinigung/baureinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <h4 className="heading-4 mb-2">Baureinigung</h4>
                        <p className="text-body text-sm">Gründliche Baureinigung nach Neubau oder Renovation für perfekte Resultate.</p>
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
                    <h3 className="heading-3 mb-4">Jetzt Offerten anfordern</h3>
                    <p className="text-body mb-4">
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

export default WohnungsreinigungPageClient;


