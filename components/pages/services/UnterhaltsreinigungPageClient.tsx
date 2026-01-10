'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Clock, CheckCircle, Users, Award, Star, Home, Heart, Calendar, RotateCw } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CleaningServiceReviews from '@/components/CleaningServiceReviews';
import CleaningRatgeberSidebar from '@/components/CleaningRatgeberSidebar';
import { supabase } from '@/lib/supabaseClient';
import { useUserLocation } from '@/hooks/useUserLocation';

const UnterhaltsreinigungPageClient = () => {
  const router = useRouter();
  const { city, loading: locationLoading } = useUserLocation();
  
  const [reviewStats, setReviewStats] = useState({ 
    reviewCount: 0,
    averageRating: 0 
  });

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=reinigung&step=2');
  };

  // SEO Data
  const metaTitle = "Unterhaltsreinigung – Kostenlose Offerten vergleichen";
  const metaDescription = "Unterhaltsreinigung für Büro, Haus oder Wohnung: Fordern Sie kostenlose Offerten an und vergleichen Sie professionelle Reinigungsservices bequem online.";
  // Meta keywords removed - Google no longer uses this tag (since 2009)
  const canonicalUrl = '/unterhaltsreinigung';

  // FAQ Data
  const faqItems = [
    {
      q: "Was kostet eine regelmässige Unterhaltsreinigung?",
      a: "Die Kosten für Unterhaltsreinigung hängen von der Grösse der Wohnung, der Reinigungsfrequenz und dem Umfang der Leistungen ab. Preise liegen typischerweise zwischen 20 und 40 CHF pro Stunde oder 0.80-1.50 CHF pro m². Eine durchschnittliche 3-Zimmer-Wohnung benötigt etwa 2-3 Stunden pro Reinigung. Durch den Vergleich mehrerer Offerten können Sie bis zu 40% sparen."
    },
    {
      q: "Wie oft sollte eine Unterhaltsreinigung durchgeführt werden?",
      a: "Die optimale Reinigungsfrequenz hängt von Ihren individuellen Bedürfnissen ab. Viele Haushalte wählen wöchentliche, zweiwöchentliche oder monatliche Reinigung. Die Frequenz kann auch angepasst werden, wenn sich Ihre Bedürfnisse ändern. Professionelle Reinigungsfirmen beraten Sie gerne bei der optimalen Frequenz für Ihre Wohnung."
    },
    {
      q: "Was beinhaltet eine umfassende Unterhaltsreinigung?",
      a: "Eine umfassende Unterhaltsreinigung beinhaltet: Staubwischen aller Oberflächen, Reinigung der Böden (Saugen und Wischen), Reinigung der Sanitäranlagen, Leeren der Abfalleimer, Reinigung der Küchenbereiche, sowie gegebenenfalls Reinigung der Fenster. Der genaue Umfang kann individuell vereinbart werden."
    },
    {
      q: "Kann ich die Reinigungszeiten flexibel gestalten?",
      a: "Ja, die meisten Reinigungsfirmen bieten flexible Zeiten an. Sie können die Reinigungstermine nach Ihren Bedürfnissen planen, einschliesslich Reinigung während Ihrer Abwesenheit oder zu bestimmten Zeiten. Die Reinigungsfrequenz kann auch angepasst werden, wenn sich Ihre Bedürfnisse ändern."
    },
    {
      q: "Sind die Reinigungskräfte vertrauenswürdig?",
      a: "Ja, seriöse Reinigungsfirmen prüfen ihre Mitarbeiter sorgfältig und haben Vertrauensschutzmassnahmen. Alle Reinigungsfirmen in unserem Netzwerk sind versichert und ihre Mitarbeiter sind geschult. Viele Firmen bieten auch Versicherungsschutz für den Fall von Schäden oder Diebstahl."
    },
    {
      q: "Wie lange dauert eine Unterhaltsreinigung?",
      a: "Die Dauer hängt von der Grösse der Wohnung und dem Umfang der Reinigung ab. Eine durchschnittliche 3-Zimmer-Wohnung benötigt etwa 2-3 Stunden. Grössere Wohnungen oder zusätzliche Leistungen können länger dauern. Professionelle Reinigungsfirmen können Ihnen eine genaue Zeitangabe nach der Besichtigung geben."
    },
    {
      q: "Werden umweltfreundliche Reinigungsmittel verwendet?",
      a: "Ja, moderne Reinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmittel. Alle Reinigungsfirmen in unserem Netzwerk verwenden zertifizierte, umweltfreundliche Reinigungsmittel, die effektiv sind, aber gleichzeitig die Umwelt und die Gesundheit schonen."
    }
  ];

  // Fetch review stats dynamically - Sadece gerçek yorumlar
  useEffect(() => {
    const fetchReviewStats = async () => {
      try {
        // Tüm onaylanmış yorumları say (sınırsız)
        const { count: totalReviewCount, error: countError } = await supabase
          .from('customer_reviews')
          .select('*', { count: 'exact', head: true })
          .eq('approval_status', 'approved');
        
        if (countError) {
          console.error('Error fetching review count:', countError);
        }
        
        // Tüm onaylanmış yorumların rating'lerini al (average hesaplamak için)
        const { data: allReviews, error: reviewsError } = await supabase
          .from('customer_reviews')
          .select('rating')
          .eq('approval_status', 'approved');
        
        if (reviewsError) {
          console.error('Error fetching reviews for average:', reviewsError);
        }
        
        // Average rating hesapla
        let averageRating = 0;
        if (allReviews && allReviews.length > 0) {
          const totalRating = allReviews.reduce((sum: number, review: any) => sum + (review.rating || 0), 0);
          averageRating = totalRating / allReviews.length;
        }
        
        setReviewStats({
          reviewCount: totalReviewCount || 0,
          averageRating: averageRating
        });
      } catch (error) {
        console.error('Error in fetchReviewStats:', error);
        setReviewStats({ reviewCount: 0, averageRating: 0 });
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
    "serviceType": "Unterhaltsreinigung",
    "name": "Regelmässige Unterhaltsreinigung",
    "description": metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch"
    },
    ...(reviewStats.reviewCount > 0 && reviewStats.averageRating > 0 ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": Number(reviewStats.averageRating.toFixed(1)),
        "reviewCount": reviewStats.reviewCount,
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
      "name": "Unterhaltsreinigungsdienstleistungen",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wöchentliche Unterhaltsreinigung"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Zweiwöchentliche Unterhaltsreinigung"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Monatliche Unterhaltsreinigung"
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
      "name": "Kostenlose Offerte für Unterhaltsreinigung"
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
        "name": "Unterhaltsreinigung",
        "item": canonicalUrl
      }
    ]
  };

  // HowTo Schema for Ablauf section
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Ablauf unserer Unterhaltsreinigung – Schritt für Schritt",
    "description": "So funktioniert eine professionelle Unterhaltsreinigung",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Besichtigung und Offerte",
        "text": "Wir besichtigen Ihre Wohnung, besprechen die Reinigungsfrequenz und erstellen eine genaue Offerte."
      },
      {
        "@type": "HowToStep",
        "name": "Reinigungsplan erstellen",
        "text": "Nach der Auftragsbestätigung erstellen wir einen Reinigungsplan, der zu Ihren Bedürfnissen passt."
      },
      {
        "@type": "HowToStep",
        "name": "Professionelle Reinigung",
        "text": "Unser professionelles Team reinigt Ihre Wohnung gründlich mit den richtigen Methoden und Geräten."
      },
      {
        "@type": "HowToStep",
        "name": "Qualitätskontrolle",
        "text": "Nach Abschluss der Reinigung erfolgt eine kurze Qualitätskontrolle für perfekte Ergebnisse."
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
              backgroundImage: `url('https://online-offerten.ch/reinigungsfirma/unterhaltsreinigung_hero.png')`,
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
                    Professionelle Unterhaltsreinigung
                  </h1>
                </motion.div>
                
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed"
                >
                  Regelmässige Unterhaltsreinigung für ein kontinuierlich sauberes Zuhause. Flexible Reinigungsfrequenz – wöchentlich, zweiwöchentlich oder monatlich. Reinigungsofferten online vergleichen und bis zu 40% sparen.
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
                  {/* H2: Warum eine professionelle Unterhaltsreinigung sinnvoll ist */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-6">Warum eine professionelle Unterhaltsreinigung sinnvoll ist</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Eine professionelle regelmässige Reinigung bietet zahlreiche Vorteile, die über die reine Sauberkeit hinausgehen. Sie spart wertvolle Zeit, die Sie für Familie, Beruf oder Hobbys nutzen können. Ihr Zuhause bleibt kontinuierlich sauber und gepflegt, ohne dass Sie selbst Zeit investieren müssen. Professionelle Reinigungskräfte verfügen über das Fachwissen und die richtigen Geräte, um auch schwer zugängliche Stellen gründlich zu reinigen. Zudem trägt eine regelmässige professionelle Reinigung zur Gesundheit bei, indem sie Allergene, Bakterien und Viren effektiv entfernt. Besonders für berufstätige Personen, Familien mit Kindern oder Senioren ist eine regelmässige Reinigung eine grosse Entlastung.
                  </p>
                  
                  {/* H2: Unsere Leistungen im Bereich Unterhaltsreinigung */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6">Unsere Leistungen im Bereich Reinigung</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Unser Netzwerk geprüfter Reinigungsfirmen bietet ein umfassendes Leistungsspektrum für die regelmässige Reinigung. Dazu gehören die regelmässige Reinigung aller Räume, inklusive Küche, Badezimmer, Wohnzimmer und Schlafzimmer. Wir bieten flexible Reinigungsfrequenzen: wöchentliche, zweiwöchentliche oder monatliche Reinigung. Alle unsere Partnerfirmen arbeiten mit modernsten Reinigungstechniken und umweltfreundlichen Reinigungsmitteln. Besonders wichtig: Alle Reinigungsfirmen in unserem Netzwerk sind versichert, ihre Mitarbeiter sind vertrauenswürdig und geschult, und sie bieten flexible Terminplanung, die sich an Ihre Bedürfnisse anpasst.
                  </p>

                  {/* Leistungen Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/unterhaltsreinigung_leistungen.png"
                      alt="Unterhaltsreinigungsdienstleistungen - Professionelle regelmässige Reinigung"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Leistungen */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-lg text-gray-700">
                    <li>Regelmässige Reinigung aller Räume</li>
                    <li>Staubwischen aller Oberflächen</li>
                    <li>Gründliche Bodenreinigung (Saugen und Wischen)</li>
                    <li>Küchenreinigung inklusive Arbeitsflächen und Spüle</li>
                    <li>Badezimmerreinigung inklusive Sanitäranlagen</li>
                    <li>Entleerung von Abfalleimern</li>
                    <li>Grundlegende Ordnung und Aufräumen</li>
                    <li>Fensterreinigung auf Wunsch</li>
                  </ul>

                  {/* CTA 1 - After Leistungen */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200 mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                      {city && !locationLoading 
                        ? `Professionelle Unterhaltsreinigung in ${city}`
                        : 'Professionelle Unterhaltsreinigung buchen'
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

                  {/* H2: Vorteile unserer regelmässigen Unterhaltsreinigung */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6">Vorteile unserer regelmässigen Unterhaltsreinigung</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Regelmässige Unterhaltsreinigung bietet zahlreiche Vorteile gegenüber sporadischer Reinigung. Sie spart wertvolle Zeit und Mühe, da Sie keine grossen Reinigungsaktionen mehr durchführen müssen. Ihr Zuhause bleibt kontinuierlich sauber und gepflegt, was zu einem angenehmeren Wohnumfeld führt. Die regelmässige Reinigung verhindert die Ansammlung von Schmutz und erleichtert spätere Grundreinigungen erheblich. Zudem trägt sie zur Gesundheit bei, indem sie Allergene, Bakterien und Viren regelmässig entfernt. Professionelle Reinigungsfirmen sind versichert und ihre Mitarbeiter sind geschult, was Ihnen Sicherheit und Vertrauen gibt. Durch den Vergleich mehrerer Offerten über unsere Plattform können Sie bis zu 40% sparen.
                  </p>

                  {/* Vorteile Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/reinigungsmittel_auf_tisch.webp"
                      alt="Vorteile regelmässiger Unterhaltsreinigung - Kontinuierlich sauberes Zuhause"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Bullet Points - Vorteile */}
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-lg text-gray-700">
                    <li>Kontinuierlich sauberes Zuhause ohne eigenen Zeitaufwand</li>
                    <li>Nur geprüfte, versicherte Reinigungsfirmen</li>
                    <li>Flexible Reinigungsfrequenz – wöchentlich, zweiwöchentlich, monatlich</li>
                    <li>Vertrauenswürdige, geschulte Reinigungskräfte</li>
                    <li>Umweltfreundliche Reinigungsmittel</li>
                    <li>Anpassbare Reinigungspläne</li>
                  </ul>

                  {/* H2: Was bei einer umfassenden Unterhaltsreinigung gereinigt wird */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6">Was bei einer umfassenden Unterhaltsreinigung gereinigt wird</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Eine umfassende Reinigung beinhaltet die Reinigung aller Räume und Bereiche. Dazu gehören das Staubwischen aller Oberflächen, inklusive Regale, Schränke, Fensterbänke und Heizkörper. Die Böden werden gründlich gesaugt und gewischt, inklusive Ecken und Kanten. In der Küche werden Herd, Arbeitsflächen, Spüle und gegebenenfalls Kühlschrank gereinigt. Das Badezimmer wird komplett gereinigt, inklusive Waschbecken, Spiegel, Dusche oder Badewanne. Abfalleimer werden geleert, und es wird grundlegende Ordnung geschaffen. Fenster können auf Wunsch ebenfalls gereinigt werden. Eine professionelle Reinigung geht über das normale Putzen hinaus und sorgt für ein hygienisch sauberes Zuhause.
                  </p>

                  {/* H2: Unterhaltsreinigung für verschiedene Räume und Bereiche */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6">Unterhaltsreinigung für verschiedene Räume und Bereiche</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Professionelle Reinigung wird für alle Räume und Bereiche angeboten, von kleinen Studios bis hin zu grossen Familienhäusern. Jeder Raum hat seine eigenen Besonderheiten: Küchen erfordern die Reinigung von Arbeitsflächen, Herd und Spüle, während Badezimmer besondere Aufmerksamkeit für Sanitäranlagen benötigen. Wohnzimmer und Schlafzimmer benötigen gründliches Staubwischen und Bodenreinigung. Professionelle Reinigungsfirmen passen ihre Methoden und den Umfang der Reinigung an die spezifischen Anforderungen jedes Raumes an. Unabhängig von der Grösse oder Art der Räume, alle Reinigungsfirmen in unserem Netzwerk bieten flexible Reinigungspläne, die sich an Ihre Bedürfnisse anpassen.
                  </p>

                  {/* Räume Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/unterhaltsreinigung_raeume.png"
                      alt="Unterhaltsreinigung für verschiedene Räume und Bereiche - Küche, Bad, Wohnzimmer"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Flexible Reinigungsfrequenz – wöchentlich, zweiwöchentlich, monatlich */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6">Flexible Reinigungsfrequenz – wöchentlich, zweiwöchentlich, monatlich</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Die optimale Reinigungsfrequenz hängt von verschiedenen Faktoren ab: Grösse der Wohnung, Anzahl der Bewohner, Lebensstil und individuelle Präferenzen. Viele Haushalte wählen wöchentliche Reinigung für maximale Sauberkeit, während andere zweiwöchentliche oder monatliche Reinigung bevorzugen. Professionelle Reinigungsfirmen beraten Sie gerne bei der Wahl der passenden Frequenz für Ihre Wohnung. Die Frequenz kann auch angepasst werden, wenn sich Ihre Bedürfnisse ändern. Flexibilität ist ein wichtiger Vorteil bei der Unterhaltsreinigung, da Sie die Reinigung an Ihren Lebensstil anpassen können.
                  </p>

                  {/* Frequenz Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/unterhaltsreinigung_frequenz.png"
                      alt="Flexible Reinigungsfrequenz - Wöchentlich, zweiwöchentlich, monatlich"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Moderne und umweltfreundliche Reinigungsmittel */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6">Moderne und umweltfreundliche Reinigungsmittel</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Moderne Reinigungsfirmen setzen zunehmend auf umweltfreundliche und gesundheitsschonende Reinigungsmittel. Diese sind nicht nur besser für die Umwelt, sondern auch für Ihre Gesundheit und die Ihrer Familie. Biologische Reinigungsmittel sind besonders für Haushalte mit Kindern, Allergikern oder Haustieren empfehlenswert. Sie sind effektiv gegen Schmutz und Bakterien, schonen aber gleichzeitig die Umwelt und die Gesundheit. Unsere Partnerfirmen verwenden ausschliesslich zertifizierte, umweltfreundliche Reinigungsmittel und achten darauf, dass keine schädlichen Chemikalien in Ihrer Wohnung zurückbleiben. Dies ist besonders wichtig bei regelmässiger Reinigung, da die Reinigungsmittel regelmässig verwendet werden.
                  </p>

                  {/* Umweltfreundlich Image */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden">
                    <img
                      src="https://online-offerten.ch/reinigungsfirma/umweltfreundliche_reinigungsmittel_modern.webp"
                      alt="Moderne und umweltfreundliche Reinigungsmittel für Unterhaltsreinigung"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* H2: Ablauf unserer Unterhaltsreinigung – Schritt für Schritt */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6">Ablauf unserer Unterhaltsreinigung – Schritt für Schritt</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Der Ablauf einer professionellen Unterhaltsreinigung ist strukturiert und effizient. Zunächst erfolgt eine Besichtigung der Wohnung, um den Umfang der Reinigung zu bestimmen, die Reinigungsfrequenz zu besprechen und eine genaue Offerte zu erstellen. Nach der Auftragsbestätigung wird ein Reinigungsplan erstellt, der zu Ihren Bedürfnissen passt. Am vereinbarten Reinigungstag erscheint das professionelle Reinigungsteam pünktlich mit allen notwendigen Geräten und Reinigungsmitteln. Die Reinigung erfolgt systematisch Raum für Raum, beginnend mit den am stärksten genutzten Bereichen. Nach Abschluss der Reinigung erfolgt eine kurze Qualitätskontrolle, und Sie erhalten ein sauberes, gepflegtes Zuhause.
                  </p>

                  {/* Ablauf Steps */}
                  <div className="my-6 md:my-8 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-8">
                    <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
                      <li><strong>Besichtigung und Offerte:</strong> Wir besichtigen Ihre Wohnung, besprechen die Reinigungsfrequenz und erstellen eine genaue Offerte.</li>
                      <li><strong>Reinigungsplan erstellen:</strong> Nach der Auftragsbestätigung erstellen wir einen Reinigungsplan, der zu Ihren Bedürfnissen passt.</li>
                      <li><strong>Professionelle Reinigung:</strong> Unser professionelles Team reinigt Ihre Wohnung gründlich mit den richtigen Methoden und Geräten.</li>
                      <li><strong>Qualitätskontrolle:</strong> Nach Abschluss der Reinigung erfolgt eine kurze Qualitätskontrolle für perfekte Ergebnisse.</li>
                    </ul>
                  </div>

                  {/* H2: Was kostet eine professionelle Unterhaltsreinigung? */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6">Was kostet eine professionelle Unterhaltsreinigung?</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Die Kosten für regelmässige Reinigung hängen von der Grösse der Wohnung, der Reinigungsfrequenz und dem Umfang der Leistungen ab. Preise liegen typischerweise zwischen 20 und 40 CHF pro Stunde oder 0.80-1.50 CHF pro m². Eine durchschnittliche 3-Zimmer-Wohnung benötigt etwa 2-3 Stunden pro Reinigung. Bei wöchentlicher Reinigung bedeutet dies monatliche Kosten von etwa 160-480 CHF, bei zweiwöchentlicher Reinigung etwa 80-240 CHF. Grössere Wohnungen oder zusätzliche Leistungen können höhere Kosten verursachen. Durch den Vergleich mehrerer Offerten über unsere Plattform können Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten. Alle Offerten sind kostenlos und unverbindlich.
                  </p>

                  {/* H2: Warum wir der richtige Partner für Ihre Unterhaltsreinigung sind */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6">Warum wir der richtige Partner für Ihre Reinigung sind</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Wir sind der vertrauenswürdige Partner für Ihre regelmässige Reinigung. Unser Netzwerk umfasst nur geprüfte, versicherte Reinigungsfirmen, die höchste Qualitätsstandards erfüllen. Alle Partnerfirmen verwenden moderne, umweltfreundliche Reinigungsmittel und bieten flexible Reinigungspläne, die sich an Ihre Bedürfnisse anpassen. Ihre Mitarbeiter sind vertrauenswürdig, geschult und versichert. Wir haben bereits über 500 zufriedene Kunden geholfen, die richtige Reinigungsfirma zu finden. Unser Service ist komplett kostenlos und unverbindlich – Sie zahlen nur für die Reinigung selbst, nicht für unsere Vermittlung. Zudem können Sie durch den Vergleich mehrerer Offerten bis zu 40% sparen.
                  </p>

                  {/* CTA 2 - After Richtiger Partner */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-blue-50 rounded-lg border border-blue-200 mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                      {city && !locationLoading 
                        ? `Professionelle Unterhaltsreinigung in ${city}`
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
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-6">Häufig gestellte Fragen zur Reinigung</h2>
                    <p className="text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
                      Häufig gestellte Fragen zur professionellen Reinigung: Was kostet eine regelmässige Reinigung? Wie oft sollte eine Reinigung durchgeführt werden? Was beinhaltet eine umfassende Reinigung? Kann ich die Reinigungszeiten flexibel gestalten? Sind die Reinigungskräfte vertrauenswürdig? Wie lange dauert eine Reinigung? Werden umweltfreundliche Reinigungsmittel verwendet? Diese und weitere Fragen beantworten wir Ihnen gerne. Über unsere Plattform können Sie Reinigungsofferten online vergleichen und dabei bis zu 40% sparen.
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
                        ? `Professionelle Unterhaltsreinigung in ${city}`
                        : 'Jetzt unverbindliche Unterhaltsreinigungs-Offerte anfordern'
                      }
                    </h3>
                    <p className="text-base text-gray-700 mb-3 md:mb-4">
                      Reinigungsofferten online vergleichen und bis zu 40% sparen. Alle Offerten beinhalten professionelle Reinigung mit flexibler Terminplanung. Ohne Aufpreis, ohne Verpflichtung. Starten Sie jetzt Ihre kostenlose Anfrage und finden Sie die perfekte Reinigungsfirma für Ihre Bedürfnisse.
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

export default UnterhaltsreinigungPageClient;
