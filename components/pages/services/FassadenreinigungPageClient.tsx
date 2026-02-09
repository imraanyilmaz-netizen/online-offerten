'use client'

import React, { useMemo } from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Award, ShieldCheck, Star } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CleaningRatgeberSidebar from '@/components/CleaningRatgeberSidebar';
import { useUserLocation } from '@/hooks/useUserLocation';

const FassadenreinigungPageClient = () => {
  const router = useRouter();
  const { city, loading: locationLoading } = useUserLocation();
  

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=reinigung&step=2');
  };

  // SEO Data
  const metaTitle = "Fassadenreinigung â€“ Kostenlose Offerten vergleichen";
  const metaDescription = "Fassadenreinigung fÃ¼r Haus oder GebÃ¤ude: Erhalten Sie kostenlose Offerten und vergleichen Sie erfahrene Reinigungsfirmen fÃ¼r nachhaltige Sauberkeit.";
  // Meta keywords removed - Google no longer uses this tag (since 2009)
  const canonicalUrl = '/reinigung/fassadenreinigung';

  // FAQ Data
  const faqItems = [
    {
      q: "Was kostet eine professionelle Fassadenreinigung?",
      a: "Die Kosten fÃ¼r Fassadenreinigung hÃ¤ngen von der GrÃ¶sse der Fassade, der HÃ¶he, dem Material, dem Verschmutzungsgrad und der ZugÃ¤nglichkeit ab. Preise liegen typischerweise zwischen 10 und 30 CHF pro mÂ². Ein durchschnittliches Einfamilienhaus kostet etwa 500-2000 CHF. Durch den Vergleich mehrerer Offerten kÃ¶nnen Sie bis zu 40% sparen."
    },
    {
      q: "Wie oft sollte ich meine Fassade reinigen lassen?",
      a: "Die optimale Reinigungsfrequenz hÃ¤ngt von verschiedenen Faktoren ab: Lage (stÃ¤dtisch vs. lÃ¤ndlich), Witterung, Material und individuelle PrÃ¤ferenzen. Viele Hausbesitzer lassen ihre Fassade alle 2-5 Jahre professionell reinigen. RegelmÃ¤ssige Fassadenreinigung hÃ¤lt die Fassade in optimalem Zustand und verhindert langfristige SchÃ¤den."
    },
    {
      q: "Welche Reinigungsmethoden werden verwendet?",
      a: "Verschiedene Fassadenmaterialien erfordern unterschiedliche Reinigungsmethoden: Putzfassaden kÃ¶nnen mit Hochdruckreinigung oder schonender Reinigung behandelt werden. Klinker oder Naturstein benÃ¶tigen spezielle Methoden. Holzfassaden erfordern besonders schonende Reinigung. Professionelle Fassadenreinigungsfirmen kennen die richtigen Methoden fÃ¼r jedes Material."
    },
    {
      q: "Ist Fassadenreinigung umweltschonend?",
      a: "Moderne Fassadenreinigungsfirmen setzen auf umweltschonende Methoden und Reinigungsmittel. Biologische Reinigungsmittel sind effektiv gegen Algen und Moos, schonen aber die Umwelt. Zudem wird darauf geachtet, dass Reinigungswasser nicht unkontrolliert in die Umwelt gelangt."
    },
    {
      q: "Wie lange dauert eine Fassadenreinigung?",
      a: "Die Dauer hÃ¤ngt von der GrÃ¶sse der Fassade, der HÃ¶he und dem Verschmutzungsgrad ab. Ein durchschnittliches Einfamilienhaus benÃ¶tigt etwa 1-2 Tage. GrÃ¶ssere GebÃ¤ude oder stark verschmutzte Fassaden kÃ¶nnen lÃ¤nger dauern."
    },
    {
      q: "Sind die ReinigungskrÃ¤fte versichert?",
      a: "Ja, alle Reinigungsfirmen in unserem Netzwerk sind vollstÃ¤ndig versichert. Ihre Mitarbeiter sind geschult fÃ¼r HÃ¶hensicherheit und haben die notwendigen Zertifikate. Sicherheit hat oberste PrioritÃ¤t bei Fassadenreinigung."
    },
    {
      q: "Welche Materialien kÃ¶nnen gereinigt werden?",
      a: "Professionelle Fassadenreinigung kann fÃ¼r alle gÃ¤ngigen Fassadenmaterialien durchgefÃ¼hrt werden: Putz, Klinker, Naturstein, Holz, Metall und mehr. Jedes Material erfordert spezielle Methoden und Reinigungsmittel, die professionelle Firmen kennen und anwenden."
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
      "name": "Kostenlose Offerte fÃ¼r Fassadenreinigung"
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
              backgroundImage: `url('https://online-offerten.ch/reinigungsfirma/fassadenreinigung_hochdruck_profi.png')`,
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
                    Professionelle Fassadenreinigung
                  </h1>
                </div>
                
                <p
                  className="text-base md:text-body mb-4 md:mb-6 leading-relaxed"
                >
                  Professionelle Fassadenreinigung fÃ¼r ein gepflegtes Ã„usseres. Entfernung von Algen, Moos und Verschmutzungen. Reinigungsofferten online vergleichen und bis zu 40% sparen.
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
                  {/* H2: Warum eine professionelle Fassadenreinigung sinnvoll ist */}
                  <h2 className="heading-2">Warum eine professionelle Fassadenreinigung sinnvoll ist</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Eine professionelle Reinigung der Fassade bietet zahlreiche Vorteile, die Ã¼ber die reine Sauberkeit hinausgehen. Die Fassade ist das AushÃ¤ngeschild Ihres Hauses und prÃ¤gt den ersten Eindruck erheblich. Mit der Zeit sammeln sich Verschmutzungen, Algen, Moos, Staub und Witterungsspuren an, die nicht nur das Erscheinungsbild beeintrÃ¤chtigen, sondern auch langfristige SchÃ¤den verursachen kÃ¶nnen. Professionelle Reinigung entfernt all diese RÃ¼ckstÃ¤nde und gibt Ihrer Fassade wieder ein frisches, gepflegtes Aussehen. Zudem schÃ¼tzt regelmÃ¤ssige Reinigung vor langfristigen SchÃ¤den und verlÃ¤ngert die Lebensdauer der Fassade. Professionelle Reinigungsfirmen verfÃ¼gen Ã¼ber das Fachwissen, die richtigen GerÃ¤te und umweltschonende Methoden, um auch schwer zugÃ¤ngliche Bereiche grÃ¼ndlich zu reinigen.
                  </p>

                  {/* H2: Unsere Leistungen im Bereich Fassadenreinigung */}
                  <h2 className="heading-2">Unsere Leistungen im Bereich Fassade</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Unser Netzwerk geprÃ¼fter Reinigungsfirmen bietet ein umfassendes Leistungsspektrum fÃ¼r die Reinigung der Fassade. Dazu gehÃ¶ren die grÃ¼ndliche Reinigung aller Fassadenmaterialien wie Putz, Klinker, Naturstein, Holz oder Metall. Wir bieten Hochdruckreinigung fÃ¼r robuste Materialien, schonende Reinigung fÃ¼r empfindliche OberflÃ¤chen, Algen- und Moosentfernung, Graffiti-Entfernung, sowie die Reinigung von VordÃ¤chern, Balkonen und Terrassen. Alle unsere Partnerfirmen arbeiten mit modernsten Reinigungstechniken und umweltfreundlichen Reinigungsmitteln. Besonders wichtig: Alle Reinigungsfirmen in unserem Netzwerk sind versichert, haben die richtige AusrÃ¼stung fÃ¼r HÃ¶henarbeit und ihre Mitarbeiter sind geschult fÃ¼r Sicherheit bei der HÃ¶henarbeit.
                  </p>

                  {/* Bullet Points - Leistungen */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>Hochdruckreinigung von Fassaden</li>
                    <li>Schonende Reinigung fÃ¼r empfindliche Materialien</li>
                    <li>Algen- und Moosentfernung</li>
                    <li>Graffiti-Entfernung</li>
                    <li>Reinigung von Putz-, Klinker- und Natursteinfassaden</li>
                    <li>Reinigung von Holz- und Metallfassaden</li>
                    <li>Reinigung von VordÃ¤chern, Balkonen und Terrassen</li>
                    <li>HÃ¶henarbeit mit professioneller AusrÃ¼stung</li>
                  </ul>

                  {/* CTA 1 - After Leistungen */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200 mb-6 md:mb-8">
                    <h3 className="heading-3">
                      {city && !locationLoading 
                        ? `Professionelle Reinigung der Fassade in ${city}`
                        : 'Professionelle Reinigung der Fassade buchen'
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

                  {/* H2: Vorteile unserer professionellen Fassadenreinigung */}
                  <h2 className="heading-2">Vorteile unserer professionellen Fassadenreinigung</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Professionelle Reinigung der Fassade bietet zahlreiche Vorteile gegenÃ¼ber der eigenen Reinigung. Sie spart wertvolle Zeit und MÃ¼he, da Fassadenreinigung oft HÃ¶henarbeit erfordert und spezielle AusrÃ¼stung benÃ¶tigt. Professionelle Reinigungsfirmen haben die richtige AusrÃ¼stung: GerÃ¼ste, HubarbeitsbÃ¼hnen oder Seilzugtechniken. Sie sind versichert und ihre Mitarbeiter sind geschult in HÃ¶hensicherheit. Zudem kennen sie die richtigen Methoden fÃ¼r jedes Fassadenmaterial und verwenden umweltschonende Reinigungsmittel. Durch den Vergleich mehrerer Offerten Ã¼ber unsere Plattform kÃ¶nnen Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten. RegelmÃ¤ssige professionelle Reinigung schÃ¼tzt vor langfristigen SchÃ¤den und erhÃ¤lt den Wert Ihrer Immobilie.
                  </p>

                  {/* Vorteile Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/reinigungsmittel_auf_tisch.webp"
                      alt="Vorteile professioneller Fassadenreinigung - Umweltschonende Methoden"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Vorteile */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-body">
                    <li>Professionelle Reinigung mit umweltschonenden Methoden</li>
                    <li>Nur geprÃ¼fte, versicherte Reinigungsfirmen</li>
                    <li>Richtige AusrÃ¼stung fÃ¼r HÃ¶henarbeit</li>
                    <li>Geschulte Mitarbeiter mit Sicherheitszertifikaten</li>
                    <li>Flexible Terminplanung</li>
                    <li>Schutz vor langfristigen SchÃ¤den</li>
                  </ul>

                  {/* H2: Was bei einer grÃ¼ndlichen Fassadenreinigung gereinigt wird */}
                  <h2 className="heading-2">Was bei einer grÃ¼ndlichen Fassadenreinigung gereinigt wird</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Eine umfassende Fassadenreinigung beinhaltet die Reinigung aller AussenwÃ¤nde eines GebÃ¤udes. Dazu gehÃ¶rt die Entfernung von Algen, Moos, Staub, Vogelkot, Verschmutzungen durch Regen und Witterung, sowie gegebenenfalls Graffiti oder FarbrÃ¼ckstÃ¤nde. Die Reinigung umfasst alle Fassadenbereiche, inklusive schwer zugÃ¤nglicher Stellen wie unter VordÃ¤chern, Balkonen oder Terrassen. Professionelle ReinigungskrÃ¤fte verwenden spezielle Methoden und GerÃ¤te, um auch hartnÃ¤ckige RÃ¼ckstÃ¤nde grÃ¼ndlich zu entfernen. ZusÃ¤tzlich werden oft auch VordÃ¤cher, Balkone, Terrassen und Einfahrten mitgereinigt. Eine professionelle Reinigung geht weit Ã¼ber das normale Abspritzen hinaus und sorgt fÃ¼r eine grÃ¼ndlich gereinigte, gepflegte Fassade, die den Wert Ihrer Immobilie erhÃ¤lt.
                  </p>

                  {/* H2: Fassadenreinigung fÃ¼r verschiedene Materialien */}
                  <h2 className="heading-2">Fassadenreinigung fÃ¼r verschiedene Materialien</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Verschiedene Fassadenmaterialien erfordern unterschiedliche Reinigungsmethoden und -mittel. Putzfassaden kÃ¶nnen mit Hochdruckreinigung oder schonender Reinigung behandelt werden, je nach Zustand und Alter. Klinker oder Naturstein benÃ¶tigen spezielle Methoden, um die OberflÃ¤che nicht zu beschÃ¤digen. Holzfassaden erfordern besonders schonende Reinigung, um das Material nicht zu schÃ¤digen. Metallfassaden benÃ¶tigen spezielle Behandlung, um Korrosion zu vermeiden. Professionelle Fassadenreinigungsfirmen kennen die richtigen Methoden fÃ¼r jedes Material und passen ihre Technik entsprechend an. Sie verwenden die richtigen Reinigungsmittel und -methoden, um die Fassade grÃ¼ndlich zu reinigen, ohne sie zu beschÃ¤digen.
                  </p>

                  {/* Materialien Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/fassadenreinigung_materialien.png"
                      alt="Fassadenreinigung fÃ¼r verschiedene Materialien - Putz, Klinker, Naturstein, Holz"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: HÃ¶henarbeit und Sicherheit bei der Fassadenreinigung */}
                  <h2 className="heading-2">HÃ¶henarbeit und Sicherheit bei der Fassadenreinigung</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Fassadenreinigung erfordert oft HÃ¶henarbeit, was besondere Sicherheitsmassnahmen erfordert. Professionelle Reinigungsfirmen haben die richtige AusrÃ¼stung: GerÃ¼ste, HubarbeitsbÃ¼hnen oder Seilzugtechniken. Sie sind versichert und ihre Mitarbeiter sind geschult in HÃ¶hensicherheit und haben die notwendigen Zertifikate. Dies ist besonders wichtig bei mehrstÃ¶ckigen GebÃ¤uden, BÃ¼rogebÃ¤uden oder schwer zugÃ¤nglichen Fassaden. Sicherheit hat oberste PrioritÃ¤t bei Fassadenreinigung, und professionelle Firmen halten alle Sicherheitsvorschriften ein. Sie verwenden die richtige persÃ¶nliche SchutzausrÃ¼stung und sichern ihre ArbeitsplÃ¤tze entsprechend ab. Dies gibt Ihnen Sicherheit und schÃ¼tzt sowohl die ReinigungskrÃ¤fte als auch Ihr Eigentum.
                  </p>

                  {/* HÃ¶henarbeit Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/fassadenreinigung_hoehenarbeit.png"
                      alt="HÃ¶henarbeit und Sicherheit bei der Fassadenreinigung - Professionelle AusrÃ¼stung"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Moderne und umweltfreundliche Reinigungsmethoden */}
                  <h2 className="heading-2">Moderne und umweltfreundliche Reinigungsmethoden</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Moderne Fassadenreinigungsfirmen setzen zunehmend auf umweltschonende Methoden und Reinigungsmittel. Biologische Reinigungsmittel sind effektiv gegen Algen und Moos, schonen aber die Umwelt. Zudem wird darauf geachtet, dass Reinigungswasser nicht unkontrolliert in die Umwelt gelangt. Dies ist besonders wichtig in sensiblen Gebieten, in der NÃ¤he von GewÃ¤ssern oder in Naturschutzgebieten. Professionelle Reinigungsfirmen verwenden umweltschonende Methoden, die effektiv sind, aber gleichzeitig die Umwelt und die Gesundheit schÃ¼tzen. Sie achten darauf, dass keine schÃ¤dlichen Chemikalien in die Umwelt gelangen und verwenden biologisch abbaubare Reinigungsmittel, wo immer mÃ¶glich.
                  </p>

                  {/* Umweltfreundlich Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/umweltfreundliche_reinigungsmittel_modern.webp"
                      alt="Moderne und umweltfreundliche Reinigungsmethoden fÃ¼r Fassadenreinigung"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Ablauf unserer Fassadenreinigung â€“ Schritt fÃ¼r Schritt */}
                  <h2 className="heading-2">Ablauf unserer Fassadenreinigung â€“ Schritt fÃ¼r Schritt</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Der Ablauf einer professionellen Fassadenreinigung ist strukturiert und effizient. ZunÃ¤chst erfolgt eine Besichtigung der Fassade, um den Umfang der Reinigung zu bestimmen, das Material zu identifizieren und eine genaue Offerte zu erstellen. Nach der AuftragsbestÃ¤tigung wird ein Termin vereinbart, der zu Ihren BedÃ¼rfnissen passt. Am Reinigungstag erscheint das professionelle Reinigungsteam pÃ¼nktlich mit allen notwendigen GerÃ¤ten, Reinigungsmitteln und SicherheitsausrÃ¼stung. Die Reinigung erfolgt systematisch Bereich fÃ¼r Bereich, beginnend mit den am stÃ¤rksten verschmutzten Bereichen. Nach Abschluss der Reinigung erfolgt eine QualitÃ¤tskontrolle, und Sie erhalten eine grÃ¼ndlich gereinigte, gepflegte Fassade.
                  </p>

                  {/* Ablauf Steps */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-8">
                    <ul className="list-disc list-inside space-y-3 text-body">
                      <li><strong>Besichtigung und Offerte:</strong> Wir besichtigen Ihre Fassade, identifizieren das Material und erstellen eine genaue Offerte.</li>
                      <li><strong>Terminvereinbarung:</strong> Nach der AuftragsbestÃ¤tigung vereinbaren wir einen Termin, der zu Ihren BedÃ¼rfnissen passt.</li>
                      <li><strong>Professionelle Reinigung:</strong> Unser professionelles Team reinigt Ihre Fassade grÃ¼ndlich mit den richtigen Methoden und GerÃ¤ten.</li>
                      <li><strong>QualitÃ¤tskontrolle:</strong> Nach Abschluss der Reinigung erfolgt eine QualitÃ¤tskontrolle fÃ¼r perfekte Ergebnisse.</li>
                    </ul>
                  </div>

                  {/* H2: Was kostet eine professionelle Fassadenreinigung? */}
                  <h2 className="heading-2">Was kostet eine professionelle Fassadenreinigung?</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Die Kosten fÃ¼r Fassadenreinigung hÃ¤ngen von der GrÃ¶sse der Fassade, der HÃ¶he, dem Material, dem Verschmutzungsgrad und der ZugÃ¤nglichkeit ab. Preise liegen typischerweise zwischen 10 und 30 CHF pro mÂ². Ein durchschnittliches Einfamilienhaus kostet etwa 500-2000 CHF. GrÃ¶ssere GebÃ¤ude, hÃ¶here Fassaden oder besonders verschmutzte Bereiche kÃ¶nnen hÃ¶here Kosten verursachen. Die Reinigungsmethode (Hochdruckreinigung vs. schonende Reinigung) und das Material beeinflussen ebenfalls die Kosten. Durch den Vergleich mehrerer Offerten Ã¼ber unsere Plattform kÃ¶nnen Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten. Alle Offerten sind kostenlos und unverbindlich.
                  </p>

                  {/* H2: Warum wir der richtige Partner fÃ¼r Ihre Fassadenreinigung sind */}
                  <h2 className="heading-2">Warum wir der richtige Partner fÃ¼r Ihre Fassade sind</h2>
                  <p className="text-body mb-4 md:mb-6 leading-relaxed">
                    Wir sind der vertrauenswÃ¼rdige Partner fÃ¼r Ihre Fassade. Unser Netzwerk umfasst nur geprÃ¼fte, versicherte Reinigungsfirmen, die hÃ¶chste QualitÃ¤tsstandards erfÃ¼llen. Alle Partnerfirmen haben die richtige AusrÃ¼stung fÃ¼r HÃ¶henarbeit, sind versichert und ihre Mitarbeiter sind geschult fÃ¼r Sicherheit. Sie verwenden moderne, umweltfreundliche Reinigungsmittel und kennen die richtigen Methoden fÃ¼r jedes Fassadenmaterial. Wir haben bereits Ã¼ber 500 zufriedene Kunden geholfen, die richtige Reinigungsfirma fÃ¼r Fassaden zu finden. Unser Service ist komplett kostenlos und unverbindlich â€“ Sie zahlen nur fÃ¼r die Reinigung selbst, nicht fÃ¼r unsere Vermittlung. Zudem kÃ¶nnen Sie durch den Vergleich mehrerer Offerten bis zu 40% sparen.
                  </p>

                  {/* CTA 2 - After Richtiger Partner */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-blue-50 rounded-lg border border-blue-200 mb-6 md:mb-8">
                    <h3 className="heading-3">
                      {city && !locationLoading 
                        ? `Professionelle Reinigung der Fassade in ${city}`
                        : 'Jetzt kostenlose Offerten anfordern'
                      }
                    </h3>
                    <p className="text-body mb-3 md:mb-4">
                      Reinigungsofferten online vergleichen und bis zu 40% sparen. Ohne Aufpreis, ohne Verpflichtung.
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

                  {/* Customer Reviews */}
                  <div className="mt-8 md:mt-12">
                  </div>

                  {/* FAQ Section */}
                  <div className="mt-6 md:mt-12">
                    <h2 className="heading-2">HÃ¤ufig gestellte Fragen zur Reinigung</h2>
                    <p className="text-body mb-6 md:mb-8 leading-relaxed">
                      HÃ¤ufig gestellte Fragen zur professionellen Reinigung der Fassade: Was kostet eine professionelle Fassadenreinigung? Wie oft sollte ich meine Fassade reinigen lassen? Welche Reinigungsmethoden werden verwendet? Ist Fassadenreinigung umweltschonend? Wie lange dauert eine Fassadenreinigung? Sind die ReinigungskrÃ¤fte versichert? Welche Materialien kÃ¶nnen gereinigt werden? Diese und weitere Fragen beantworten wir Ihnen gerne. Ãœber unsere Plattform kÃ¶nnen Sie Reinigungsofferten online vergleichen und dabei bis zu 40% sparen.
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

                  {/* Internal Links */}
                  <div className="mt-8 md:mt-12">
                    <h2 className="heading-2">Weitere Reinigungsdienstleistungen</h2>
                    <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                      <Link href="/reinigung/wohnungsreinigung"
                        className="block p-4 md:p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                      >
                        <h3 className="heading-3">Wohnungsreinigung</h3>
                        <p className="text-sm md:text-base text-gray-600">Professionelle Wohnungsreinigung mit Abnahmegarantie fÃ¼r eine sorgenfreie WohnungsÃ¼bergabe.</p>
                      </Link>
                      <Link href="/reinigung/fensterreinigung"
                        className="block p-4 md:p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                      >
                        <h3 className="heading-3">Fensterreinigung</h3>
                        <p className="text-sm md:text-base text-gray-600">Streifenfreie Fensterreinigung innen und aussen von professionellen Reinigungsfirmen.</p>
                      </Link>
                      <Link href="/reinigung/baureinigung"
                        className="block p-4 md:p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                      >
                        <h3 className="heading-3">Baureinigung</h3>
                        <p className="text-sm md:text-base text-gray-600">GrÃ¼ndliche Baureinigung nach Neubau oder Renovation fÃ¼r perfekte Resultate.</p>
                      </Link>
                    </div>
                  </div>

                  {/* CTA 3 - Final */}
                  <div className="mt-8 md:mt-12 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="heading-3">
                      {city && !locationLoading 
                        ? `Professionelle Reinigung der Fassade in ${city}`
                        : 'Jetzt unverbindliche Reinigungs-Offerte anfordern'
                      }
                    </h3>
                    <p className="text-body mb-3 md:mb-4">
                      Reinigungsofferten online vergleichen und bis zu 40% sparen. Alle Offerten beinhalten professionelle Reinigung mit umweltschonenden Methoden. Ohne Aufpreis, ohne Verpflichtung. Starten Sie jetzt Ihre kostenlose Anfrage und finden Sie die perfekte Fassadenreinigungsfirma fÃ¼r Ihre BedÃ¼rfnisse.
                    </p>
                    <Button 
                      onClick={handleCtaClick} 
                      size="lg" 
                      className="bg-green-700 hover:bg-green-800 text-white w-full sm:w-auto text-base font-semibold"
                    >
                      Jetzt kostenlose Offerten anfordern
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <aside className="space-y-4 md:space-y-6">
                  {/* Ratgeber Sidebar */}
                  <CleaningRatgeberSidebar />
                </aside>
                
                {/* Sticky CTA Section - Outside aside for proper sticky behavior */}
                <div className="mt-4 md:mt-6 lg:sticky lg:top-24 lg:self-start">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 md:p-6 border border-blue-100">
                    <h3 className="heading-3">Jetzt Offerten anfordern</h3>
                    <p className="text-gray-700 mb-3 md:mb-4 text-base">Kostenlos und unverbindlich Reinigungsofferten online vergleichen.</p>
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

export default FassadenreinigungPageClient;
