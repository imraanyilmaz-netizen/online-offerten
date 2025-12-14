import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Award, ShieldCheck, Star } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CleaningServiceReviews from '@/components/CleaningServiceReviews';
import CleaningRatgeberSidebar from '@/components/CleaningRatgeberSidebar';
import { supabase } from '@/lib/supabaseClient';
import { useUserLocation } from '@/hooks/useUserLocation';

const FassadenreinigungPage = () => {
  const router = useRouter();
  const { city, loading: locationLoading } = useUserLocation();
  
  const [reviewStats, setReviewStats] = useState({ 
    totalReviews: 142, 
    realReviewCount: 0,
    averageRating: 4.6 
  });

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=reinigung');
  };

  // SEO Data
  const metaTitle = "Fassadenreinigung – Kostenlose Offerten vergleichen";
  const metaDescription = "Fassadenreinigung für Haus oder Gebäude: Erhalten Sie kostenlose Offerten und vergleichen Sie erfahrene Reinigungsfirmen für nachhaltige Sauberkeit.";
  const metaKeywords = "fassadenreinigung schweiz, fassadenreinigung preise, hausfassade reinigen, reinigungsfirma fassade, fassadenreinigung zürich, fassadenreinigung bern, fassadenreinigung basel, algen entfernen fassade";
  const canonicalUrl = "https://online-offerten.ch/fassadenreinigung";

  // FAQ Data
  const faqItems = [
    {
      q: "Was kostet eine professionelle Fassadenreinigung?",
      a: "Die Kosten für Fassadenreinigung hängen von der Grösse der Fassade, der Höhe, dem Material, dem Verschmutzungsgrad und der Zugänglichkeit ab. Preise liegen typischerweise zwischen 10 und 30 CHF pro m². Ein durchschnittliches Einfamilienhaus kostet etwa 500-2000 CHF. Durch den Vergleich mehrerer Offerten können Sie bis zu 40% sparen."
    },
    {
      q: "Wie oft sollte ich meine Fassade reinigen lassen?",
      a: "Die optimale Reinigungsfrequenz hängt von verschiedenen Faktoren ab: Lage (städtisch vs. ländlich), Witterung, Material und individuelle Präferenzen. Viele Hausbesitzer lassen ihre Fassade alle 2-5 Jahre professionell reinigen. Regelmässige Fassadenreinigung hält die Fassade in optimalem Zustand und verhindert langfristige Schäden."
    },
    {
      q: "Welche Reinigungsmethoden werden verwendet?",
      a: "Verschiedene Fassadenmaterialien erfordern unterschiedliche Reinigungsmethoden: Putzfassaden können mit Hochdruckreinigung oder schonender Reinigung behandelt werden. Klinker oder Naturstein benötigen spezielle Methoden. Holzfassaden erfordern besonders schonende Reinigung. Professionelle Fassadenreinigungsfirmen kennen die richtigen Methoden für jedes Material."
    },
    {
      q: "Ist Fassadenreinigung umweltschonend?",
      a: "Moderne Fassadenreinigungsfirmen setzen auf umweltschonende Methoden und Reinigungsmittel. Biologische Reinigungsmittel sind effektiv gegen Algen und Moos, schonen aber die Umwelt. Zudem wird darauf geachtet, dass Reinigungswasser nicht unkontrolliert in die Umwelt gelangt."
    },
    {
      q: "Wie lange dauert eine Fassadenreinigung?",
      a: "Die Dauer hängt von der Grösse der Fassade, der Höhe und dem Verschmutzungsgrad ab. Ein durchschnittliches Einfamilienhaus benötigt etwa 1-2 Tage. Grössere Gebäude oder stark verschmutzte Fassaden können länger dauern."
    },
    {
      q: "Sind die Reinigungskräfte versichert?",
      a: "Ja, alle Reinigungsfirmen in unserem Netzwerk sind vollständig versichert. Ihre Mitarbeiter sind geschult für Höhensicherheit und haben die notwendigen Zertifikate. Sicherheit hat oberste Priorität bei Fassadenreinigung."
    },
    {
      q: "Welche Materialien können gereinigt werden?",
      a: "Professionelle Fassadenreinigung kann für alle gängigen Fassadenmaterialien durchgeführt werden: Putz, Klinker, Naturstein, Holz, Metall und mehr. Jedes Material erfordert spezielle Methoden und Reinigungsmittel, die professionelle Firmen kennen und anwenden."
    }
  ];

  // Fetch review stats dynamically
  useEffect(() => {
    const fetchReviewStats = async () => {
      const { data: statsData, error: statsError } = await supabase.rpc('get_recent_average_rating');
      
      if (statsError) {
        console.error('Error fetching review stats:', statsError);
        setReviewStats({ totalReviews: 142, realReviewCount: 0, averageRating: 4.6 });
      } else if (statsData) {
        const realCount = statsData.review_count || 0;
        setReviewStats({
          totalReviews: realCount + 142,
          realReviewCount: realCount,
          averageRating: statsData.average_rating || 4.6
        });
      }
    };
    
    fetchReviewStats();
  }, []);

  const faqItemsForSchema = faqItems.map(item => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.a
    }
  }));

  // Dynamic schema with review stats
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Fassadenreinigung",
    "name": "Professionelle Fassadenreinigung",
    "description": metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch"
    },
    ...(reviewStats.realReviewCount > 0 && reviewStats.averageRating > 0 ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": Number(reviewStats.averageRating.toFixed(1)),
        "reviewCount": reviewStats.realReviewCount,
        "bestRating": 5,
        "worstRating": 1
      }
    } : {}),
    "areaServed": {
      "@type": "Country",
      "name": "Switzerland",
      "identifier": "CH"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Fassadenreinigungsdienstleistungen",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Hochdruckreinigung von Fassaden"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Algen- und Moosentfernung"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Schonende Fassadenreinigung"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Graffiti-Entfernung"
          }
        }
      ]
    },
    "offers": {
      "@type": "Offer",
      "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=reinigung",
      "priceCurrency": "CHF",
      "price": "0",
      "availability": "https://schema.org/InStock",
      "name": "Kostenlose Offerte für Fassadenreinigung"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": faqItemsForSchema
    }
  }), [metaDescription, reviewStats, faqItemsForSchema]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://online-offerten.ch"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Reinigung",
        "item": "https://online-offerten.ch/reinigung"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Fassadenreinigung",
        "item": canonicalUrl
      }
    ]
  };

  // HowTo Schema for Ablauf section
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Ablauf unserer Fassadenreinigung – Schritt für Schritt",
    "description": "So funktioniert eine professionelle Fassadenreinigung",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Besichtigung und Offerte",
        "text": "Wir besichtigen Ihre Fassade, identifizieren das Material und erstellen eine genaue Offerte."
      },
      {
        "@type": "HowToStep",
        "name": "Terminvereinbarung",
        "text": "Nach der Auftragsbestätigung vereinbaren wir einen Termin, der zu Ihren Bedürfnissen passt."
      },
      {
        "@type": "HowToStep",
        "name": "Professionelle Reinigung",
        "text": "Unser professionelles Team reinigt Ihre Fassade gründlich mit den richtigen Methoden und Geräten."
      },
      {
        "@type": "HowToStep",
        "name": "Qualitätskontrolle",
        "text": "Nach Abschluss der Reinigung erfolgt eine Qualitätskontrolle für perfekte Ergebnisse."
      }
    ]
  };

  // Combine schemas using @graph format for multiple schemas
  const combinedSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        ...schema,
        "@context": "https://schema.org"
      },
      {
        ...breadcrumbSchema,
        "@context": "https://schema.org"
      },
      {
        ...howToSchema,
        "@context": "https://schema.org"
      }
    ]
  }), [schema, breadcrumbSchema, howToSchema]);

  return (
    <>
      
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
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <h1 className="text-3xl md:text-4xl font-extrabold mb-3 md:mb-4 text-gray-900">
                    Professionelle Fassadenreinigung
                  </h1>
                </motion.div>
                
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed"
                >
                  Professionelle Fassadenreinigung für ein gepflegtes Äusseres. Entfernung von Algen, Moos und Verschmutzungen. Über 12 Jahre Erfahrung. Reinigungsofferten online vergleichen und bis zu 40% sparen.
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
                  {/* H2: Warum eine professionelle Fassadenreinigung sinnvoll ist */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-6">Warum eine professionelle Fassadenreinigung sinnvoll ist</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Eine professionelle Fassadenreinigung bietet zahlreiche Vorteile, die über die reine Sauberkeit hinausgehen. Die Fassade ist das Aushängeschild Ihres Hauses und prägt den ersten Eindruck erheblich. Mit der Zeit sammeln sich Verschmutzungen, Algen, Moos, Staub und Witterungsspuren an, die nicht nur das Erscheinungsbild beeinträchtigen, sondern auch langfristige Schäden verursachen können. Professionelle Fassadenreinigung entfernt all diese Rückstände und gibt Ihrer Fassade wieder ein frisches, gepflegtes Aussehen. Zudem schützt regelmässige Fassadenreinigung vor langfristigen Schäden und verlängert die Lebensdauer der Fassade. Professionelle Reinigungsfirmen verfügen über das Fachwissen, die richtigen Geräte und umweltschonende Methoden, um auch schwer zugängliche Bereiche gründlich zu reinigen.
                  </p>

                  {/* H2: Unsere Leistungen im Bereich Fassadenreinigung */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6">Unsere Leistungen im Bereich Fassadenreinigung</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Unser Netzwerk geprüfter Reinigungsfirmen bietet ein umfassendes Leistungsspektrum für die Fassadenreinigung. Dazu gehören die gründliche Reinigung aller Fassadenmaterialien wie Putz, Klinker, Naturstein, Holz oder Metall. Wir bieten Hochdruckreinigung für robuste Materialien, schonende Reinigung für empfindliche Oberflächen, Algen- und Moosentfernung, Graffiti-Entfernung, sowie die Reinigung von Vordächern, Balkonen und Terrassen. Alle unsere Partnerfirmen arbeiten mit modernsten Reinigungstechniken und umweltfreundlichen Reinigungsmitteln. Besonders wichtig: Alle Reinigungsfirmen in unserem Netzwerk sind versichert, haben die richtige Ausrüstung für Höhenarbeit und ihre Mitarbeiter sind geschult für Sicherheit bei der Höhenarbeit.
                  </p>

                  {/* Bullet Points - Leistungen */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-lg text-gray-700">
                    <li>Hochdruckreinigung von Fassaden</li>
                    <li>Schonende Reinigung für empfindliche Materialien</li>
                    <li>Algen- und Moosentfernung</li>
                    <li>Graffiti-Entfernung</li>
                    <li>Reinigung von Putz-, Klinker- und Natursteinfassaden</li>
                    <li>Reinigung von Holz- und Metallfassaden</li>
                    <li>Reinigung von Vordächern, Balkonen und Terrassen</li>
                    <li>Höhenarbeit mit professioneller Ausrüstung</li>
                  </ul>

                  {/* CTA 1 - After Leistungen */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200 mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                      {city && !locationLoading 
                        ? `Professionelle Fassadenreinigung in ${city}`
                        : 'Professionelle Fassadenreinigung buchen'
                      }
                    </h3>
                    <p className="text-base text-gray-700 mb-3 md:mb-4">
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
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6">Vorteile unserer professionellen Fassadenreinigung</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Professionelle Fassadenreinigung bietet zahlreiche Vorteile gegenüber der eigenen Reinigung. Sie spart wertvolle Zeit und Mühe, da Fassadenreinigung oft Höhenarbeit erfordert und spezielle Ausrüstung benötigt. Professionelle Reinigungsfirmen haben die richtige Ausrüstung: Gerüste, Hubarbeitsbühnen oder Seilzugtechniken. Sie sind versichert und ihre Mitarbeiter sind geschult in Höhensicherheit. Zudem kennen sie die richtigen Methoden für jedes Fassadenmaterial und verwenden umweltschonende Reinigungsmittel. Durch den Vergleich mehrerer Offerten über unsere Plattform können Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten. Regelmässige professionelle Fassadenreinigung schützt vor langfristigen Schäden und erhält den Wert Ihrer Immobilie.
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
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-lg text-gray-700">
                    <li>Professionelle Reinigung mit umweltschonenden Methoden</li>
                    <li>Über 12 Jahre Erfahrung im Bereich Reinigung</li>
                    <li>Nur geprüfte, versicherte Reinigungsfirmen</li>
                    <li>Richtige Ausrüstung für Höhenarbeit</li>
                    <li>Geschulte Mitarbeiter mit Sicherheitszertifikaten</li>
                    <li>Flexible Terminplanung</li>
                    <li>Schutz vor langfristigen Schäden</li>
                  </ul>

                  {/* H2: Was bei einer gründlichen Fassadenreinigung gereinigt wird */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6">Was bei einer gründlichen Fassadenreinigung gereinigt wird</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Eine umfassende Fassadenreinigung beinhaltet die Reinigung aller Aussenwände eines Gebäudes. Dazu gehört die Entfernung von Algen, Moos, Staub, Vogelkot, Verschmutzungen durch Regen und Witterung, sowie gegebenenfalls Graffiti oder Farbrückstände. Die Reinigung umfasst alle Fassadenbereiche, inklusive schwer zugänglicher Stellen wie unter Vordächern, Balkonen oder Terrassen. Professionelle Reinigungskräfte verwenden spezielle Methoden und Geräte, um auch hartnäckige Rückstände gründlich zu entfernen. Zusätzlich werden oft auch Vordächer, Balkone, Terrassen und Einfahrten mitgereinigt. Eine professionelle Reinigung geht weit über das normale Abspritzen hinaus und sorgt für eine gründlich gereinigte, gepflegte Fassade, die den Wert Ihrer Immobilie erhält.
                  </p>

                  {/* H2: Fassadenreinigung für verschiedene Materialien */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6">Fassadenreinigung für verschiedene Materialien</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Verschiedene Fassadenmaterialien erfordern unterschiedliche Reinigungsmethoden und -mittel. Putzfassaden können mit Hochdruckreinigung oder schonender Reinigung behandelt werden, je nach Zustand und Alter. Klinker oder Naturstein benötigen spezielle Methoden, um die Oberfläche nicht zu beschädigen. Holzfassaden erfordern besonders schonende Reinigung, um das Material nicht zu schädigen. Metallfassaden benötigen spezielle Behandlung, um Korrosion zu vermeiden. Professionelle Fassadenreinigungsfirmen kennen die richtigen Methoden für jedes Material und passen ihre Technik entsprechend an. Sie verwenden die richtigen Reinigungsmittel und -methoden, um die Fassade gründlich zu reinigen, ohne sie zu beschädigen.
                  </p>

                  {/* Materialien Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/fassadenreinigung_materialien.png"
                      alt="Fassadenreinigung für verschiedene Materialien - Putz, Klinker, Naturstein, Holz"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Höhenarbeit und Sicherheit bei der Fassadenreinigung */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6">Höhenarbeit und Sicherheit bei der Fassadenreinigung</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Fassadenreinigung erfordert oft Höhenarbeit, was besondere Sicherheitsmassnahmen erfordert. Professionelle Reinigungsfirmen haben die richtige Ausrüstung: Gerüste, Hubarbeitsbühnen oder Seilzugtechniken. Sie sind versichert und ihre Mitarbeiter sind geschult in Höhensicherheit und haben die notwendigen Zertifikate. Dies ist besonders wichtig bei mehrstöckigen Gebäuden, Bürogebäuden oder schwer zugänglichen Fassaden. Sicherheit hat oberste Priorität bei Fassadenreinigung, und professionelle Firmen halten alle Sicherheitsvorschriften ein. Sie verwenden die richtige persönliche Schutzausrüstung und sichern ihre Arbeitsplätze entsprechend ab. Dies gibt Ihnen Sicherheit und schützt sowohl die Reinigungskräfte als auch Ihr Eigentum.
                  </p>

                  {/* Höhenarbeit Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/fassadenreinigung_hoehenarbeit.png"
                      alt="Höhenarbeit und Sicherheit bei der Fassadenreinigung - Professionelle Ausrüstung"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Moderne und umweltfreundliche Reinigungsmethoden */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6">Moderne und umweltfreundliche Reinigungsmethoden</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Moderne Fassadenreinigungsfirmen setzen zunehmend auf umweltschonende Methoden und Reinigungsmittel. Biologische Reinigungsmittel sind effektiv gegen Algen und Moos, schonen aber die Umwelt. Zudem wird darauf geachtet, dass Reinigungswasser nicht unkontrolliert in die Umwelt gelangt. Dies ist besonders wichtig in sensiblen Gebieten, in der Nähe von Gewässern oder in Naturschutzgebieten. Professionelle Reinigungsfirmen verwenden umweltschonende Methoden, die effektiv sind, aber gleichzeitig die Umwelt und die Gesundheit schützen. Sie achten darauf, dass keine schädlichen Chemikalien in die Umwelt gelangen und verwenden biologisch abbaubare Reinigungsmittel, wo immer möglich.
                  </p>

                  {/* Umweltfreundlich Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/umweltfreundliche_reinigungsmittel_modern.webp"
                      alt="Moderne und umweltfreundliche Reinigungsmethoden für Fassadenreinigung"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Ablauf unserer Fassadenreinigung – Schritt für Schritt */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6">Ablauf unserer Fassadenreinigung – Schritt für Schritt</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Der Ablauf einer professionellen Fassadenreinigung ist strukturiert und effizient. Zunächst erfolgt eine Besichtigung der Fassade, um den Umfang der Reinigung zu bestimmen, das Material zu identifizieren und eine genaue Offerte zu erstellen. Nach der Auftragsbestätigung wird ein Termin vereinbart, der zu Ihren Bedürfnissen passt. Am Reinigungstag erscheint das professionelle Reinigungsteam pünktlich mit allen notwendigen Geräten, Reinigungsmitteln und Sicherheitsausrüstung. Die Reinigung erfolgt systematisch Bereich für Bereich, beginnend mit den am stärksten verschmutzten Bereichen. Nach Abschluss der Reinigung erfolgt eine Qualitätskontrolle, und Sie erhalten eine gründlich gereinigte, gepflegte Fassade.
                  </p>

                  {/* Ablauf Steps */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-8">
                    <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
                      <li><strong>Besichtigung und Offerte:</strong> Wir besichtigen Ihre Fassade, identifizieren das Material und erstellen eine genaue Offerte.</li>
                      <li><strong>Terminvereinbarung:</strong> Nach der Auftragsbestätigung vereinbaren wir einen Termin, der zu Ihren Bedürfnissen passt.</li>
                      <li><strong>Professionelle Reinigung:</strong> Unser professionelles Team reinigt Ihre Fassade gründlich mit den richtigen Methoden und Geräten.</li>
                      <li><strong>Qualitätskontrolle:</strong> Nach Abschluss der Reinigung erfolgt eine Qualitätskontrolle für perfekte Ergebnisse.</li>
                    </ul>
                  </div>

                  {/* H2: Was kostet eine professionelle Fassadenreinigung? */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6">Was kostet eine professionelle Fassadenreinigung?</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Die Kosten für Fassadenreinigung hängen von der Grösse der Fassade, der Höhe, dem Material, dem Verschmutzungsgrad und der Zugänglichkeit ab. Preise liegen typischerweise zwischen 10 und 30 CHF pro m². Ein durchschnittliches Einfamilienhaus kostet etwa 500-2000 CHF. Grössere Gebäude, höhere Fassaden oder besonders verschmutzte Bereiche können höhere Kosten verursachen. Die Reinigungsmethode (Hochdruckreinigung vs. schonende Reinigung) und das Material beeinflussen ebenfalls die Kosten. Durch den Vergleich mehrerer Offerten über unsere Plattform können Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten. Alle Offerten sind kostenlos und unverbindlich.
                  </p>

                  {/* Trust Elements */}
                  <div className="my-6 md:my-8 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Über 12 Jahre Erfahrung im Bereich Reinigung</h3>
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <Award className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <div className="text-lg md:text-xl font-bold text-gray-900 mb-1">Über 12 Jahre Erfahrung</div>
                          <p className="text-sm md:text-base text-gray-700">Über 12 Jahre Erfahrung im Bereich Reinigung</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <div className="text-lg md:text-xl font-bold text-gray-900 mb-1">Qualitätsgarantie</div>
                          <p className="text-sm md:text-base text-gray-700">Qualitätsgarantie für professionelle Ergebnisse</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 fill-yellow-500" />
                          </div>
                        </div>
                        <div>
                          <div className="text-lg md:text-xl font-bold text-gray-900 mb-1">{reviewStats.averageRating.toFixed(1)}/5 Sterne Bewertung</div>
                          <p className="text-sm md:text-base text-gray-700">Von über {reviewStats.totalReviews} Kunden bewertet</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* H2: Warum wir der richtige Partner für Ihre Fassadenreinigung sind */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6">Warum wir der richtige Partner für Ihre Fassadenreinigung sind</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Mit über 12 Jahren Erfahrung im Bereich Reinigungsdienstleistungen sind wir der vertrauenswürdige Partner für Ihre Fassadenreinigung. Unser Netzwerk umfasst nur geprüfte, versicherte Reinigungsfirmen, die höchste Qualitätsstandards erfüllen. Alle Partnerfirmen haben die richtige Ausrüstung für Höhenarbeit, sind versichert und ihre Mitarbeiter sind geschult für Sicherheit. Sie verwenden moderne, umweltfreundliche Reinigungsmittel und kennen die richtigen Methoden für jedes Fassadenmaterial. Wir haben bereits über 500 zufriedene Kunden geholfen, die richtige Fassadenreinigungsfirma zu finden. Unser Service ist komplett kostenlos und unverbindlich – Sie zahlen nur für die Reinigung selbst, nicht für unsere Vermittlung. Zudem können Sie durch den Vergleich mehrerer Offerten bis zu 40% sparen.
                  </p>

                  {/* CTA 2 - After Richtiger Partner */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-blue-50 rounded-lg border border-blue-200 mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                      {city && !locationLoading 
                        ? `Professionelle Fassadenreinigung in ${city}`
                        : 'Jetzt kostenlose Offerten anfordern'
                      }
                    </h3>
                    <p className="text-base text-gray-700 mb-3 md:mb-4">
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
                    <CleaningServiceReviews />
                  </div>

                  {/* FAQ Section */}
                  <div className="mt-6 md:mt-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-6">Häufig gestellte Fragen zur Fassadenreinigung</h2>
                    <p className="text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
                      Häufig gestellte Fragen zur professionellen Fassadenreinigung: Was kostet eine professionelle Fassadenreinigung? Wie oft sollte ich meine Fassade reinigen lassen? Welche Reinigungsmethoden werden verwendet? Ist Fassadenreinigung umweltschonend? Wie lange dauert eine Fassadenreinigung? Sind die Reinigungskräfte versichert? Welche Materialien können gereinigt werden? Diese und weitere Fragen beantworten wir Ihnen gerne. Über unsere Plattform können Sie Reinigungsofferten online vergleichen und dabei bis zu 40% sparen.
                    </p>
                    <Accordion type="single" collapsible className="w-full">
                      {faqItems.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline text-gray-800 px-2 sm:px-4">
                            {item.q}
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
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-6">Weitere Reinigungsdienstleistungen</h2>
                    <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                      <Link href="/wohnungsreinigung"
                        className="block p-4 md:p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                      >
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Wohnungsreinigung</h3>
                        <p className="text-sm md:text-base text-gray-600">Professionelle Wohnungsreinigung mit Abnahmegarantie für eine sorgenfreie Wohnungsübergabe.</p>
                      </Link>
                      <Link href="/fensterreinigung"
                        className="block p-4 md:p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                      >
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Fensterreinigung</h3>
                        <p className="text-sm md:text-base text-gray-600">Streifenfreie Fensterreinigung innen und aussen von professionellen Reinigungsfirmen.</p>
                      </Link>
                      <Link href="/baureinigung"
                        className="block p-4 md:p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                      >
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Baureinigung</h3>
                        <p className="text-sm md:text-base text-gray-600">Gründliche Baureinigung nach Neubau oder Renovation für perfekte Resultate.</p>
                      </Link>
                    </div>
                  </div>

                  {/* CTA 3 - Final */}
                  <div className="mt-8 md:mt-12 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                      {city && !locationLoading 
                        ? `Professionelle Fassadenreinigung in ${city}`
                        : 'Jetzt unverbindliche Fassadenreinigungs-Offerte anfordern'
                      }
                    </h3>
                    <p className="text-base text-gray-700 mb-3 md:mb-4">
                      Reinigungsofferten online vergleichen und bis zu 40% sparen. Alle Offerten beinhalten professionelle Reinigung mit umweltschonenden Methoden. Ohne Aufpreis, ohne Verpflichtung. Starten Sie jetzt Ihre kostenlose Anfrage und finden Sie die perfekte Fassadenreinigungsfirma für Ihre Bedürfnisse.
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
                </motion.article>
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
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Jetzt Offerten anfordern</h3>
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

export default FassadenreinigungPage;
