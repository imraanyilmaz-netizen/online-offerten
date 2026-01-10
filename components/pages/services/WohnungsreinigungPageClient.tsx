'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Clock, CheckCircle, Users, Award, Star, Leaf, Home, Heart, Calendar } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CleaningServiceReviews from '@/components/CleaningServiceReviews';
import CleaningRatgeberSidebar from '@/components/CleaningRatgeberSidebar';
import { supabase } from '@/lib/supabaseClient';
import { useUserLocation } from '@/hooks/useUserLocation';

const WohnungsreinigungPageClient = () => {
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
  const metaTitle = "Wohnungsreinigung mit Abnahmegarantie – Kostenlose Offerten vergleichen";
  const metaDescription = "Professionelle Wohnungsreinigung mit 100% Abnahmegarantie. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen und vergleichen Sie Preise schnell und einfach. Sorgenfreie Wohnungsübergabe garantiert.";
  // Meta keywords removed - Google no longer uses this tag (since 2009)
  const canonicalUrl = '/wohnungsreinigung';

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

  // Fetch review stats dynamically - Tüm onaylanmış yorumlar (sınırsız)
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
    "serviceType": "Wohnungsreinigung mit Abnahmegarantie",
    "name": "Professionelle Wohnungsreinigung mit Abnahmegarantie",
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
      "name": "Wohnungsreinigungsdienstleistungen",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Umfassende Wohnungsreinigung mit Abnahmegarantie"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Küchen- und Badezimmerreinigung"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fenster- und Oberflächenreinigung"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Reinigung für Haushalte mit Haustieren"
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
      "name": "Kostenlose Offerte für Wohnungsreinigung mit Abnahmegarantie"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": faqItemsForSchema
    }
  }), [reviewStats, metaDescription, faqItemsForSchema]);

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
        "name": "Wohnungsreinigung",
        "item": canonicalUrl
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Ablauf unserer Wohnungsreinigung",
    "description": "Schritt-für-Schritt Anleitung für professionelle Wohnungsreinigung mit Abnahmegarantie",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Kostenlose Offerte anfordern",
        "text": "Reinigungsofferten online anfordern und vergleichen."
      },
      {
        "@type": "HowToStep",
        "name": "Besichtigung und Offerte erhalten",
        "text": "Die Reinigungsfirma besichtigt die Wohnung und erstellt eine detaillierte Offerte."
      },
      {
        "@type": "HowToStep",
        "name": "Termin vereinbaren",
        "text": "Vereinbaren Sie einen Termin, der zu Ihren Bedürfnissen passt."
      },
      {
        "@type": "HowToStep",
        "name": "Professionelle Reinigung durchführen",
        "text": "Das professionelle Reinigungsteam führt die Reinigung systematisch durch."
      },
      {
        "@type": "HowToStep",
        "name": "Qualitätskontrolle und Abnahme",
        "text": "Nach Abschluss erfolgt eine Qualitätskontrolle und Sie erhalten eine Abnahmegarantie."
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
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="w-full min-w-0"
                >
                  <h1 className="text-3xl md:text-4xl font-extrabold mb-3 md:mb-4 text-gray-900 break-words">
                    Professionelle Wohnungsreinigung mit Abnahmegarantie
                  </h1>
                </motion.div>
                
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed break-words w-full"
                >
                  Gründliche Wohnungsreinigung mit 100% Abnahmegarantie für eine sorgenfreie Übergabe. Reinigungsofferten online vergleichen und bis zu 40% sparen.
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
        <section className="py-8 md:py-12 lg:py-16 xl:py-24 overflow-x-hidden">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 overflow-x-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {/* Main Article */}
              <div className="lg:col-span-2 w-full min-w-0">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 mb-6 md:mb-8 w-full min-w-0 overflow-x-hidden"
                >
                  {/* H2: Warum eine professionelle Wohnungsreinigung sinnvoll ist */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-6 break-words">Warum eine professionelle Wohnungsreinigung sinnvoll ist</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed break-words w-full">
                    Eine professionelle Wohnungsreinigung bietet zahlreiche Vorteile, die über die reine Sauberkeit hinausgehen. Sie spart wertvolle Zeit, die Sie für Familie, Beruf oder Hobbys nutzen können. Professionelle Reinigungskräfte verfügen über das Fachwissen und die richtigen Geräte, um auch schwer zugängliche Stellen gründlich zu reinigen. Zudem trägt eine regelmässige professionelle Reinigung zur Gesundheit bei, indem sie Allergene, Bakterien und Viren effektiv entfernt. Besonders bei der Wohnungsübergabe ist eine professionelle Reinigung mit Abnahmegarantie unerlässlich, um sicherzustellen, dass alle Anforderungen des Vermieters erfüllt werden.
                  </p>

                  {/* H2: Unsere Leistungen im Bereich Wohnungsreinigung */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6 break-words">Unsere Leistungen im Bereich Reinigung</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed break-words w-full">
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
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-lg text-gray-700">
                    <li>Gründliche Reinigung aller Räume</li>
                    <li>Küchen- und Badezimmerreinigung</li>
                    <li>Fenster- und Oberflächenreinigung</li>
                    <li>Bodenreinigung inklusive Ecken und Kanten</li>
                    <li>Desinfektion von Oberflächen</li>
                    <li>Reinigung schwer zugänglicher Stellen</li>
                  </ul>

                  {/* CTA 1 - After Leistungen */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-green-50 rounded-lg border border-green-200 mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
                      {city && !locationLoading 
                        ? `Professionelle Wohnungsreinigung in ${city}`
                        : 'Professionelle Wohnungsreinigung buchen'
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

                  {/* H2: Vorteile unserer Reinigung mit Abnahmegarantie */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6 break-words">Vorteile unserer Reinigung mit Abnahmegarantie</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed break-words w-full">
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
                  <ul className="list-disc list-inside space-y-2 mb-6 md:mb-8 text-lg text-gray-700">
                    <li>100% Abnahmegarantie für sorgenfreie Übergabe</li>
                    <li>Nur geprüfte, versicherte Reinigungsfirmen</li>
                    <li>Umweltfreundliche Reinigungsmittel</li>
                    <li>Flexible Terminplanung</li>
                    <li>Bis zu 40% Kostenersparnis durch Vergleich</li>
                  </ul>

                  {/* H2: Was bei einer gründlichen Wohnungsreinigung gereinigt wird */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6 break-words">Was bei einer gründlichen Wohnungsreinigung gereinigt wird</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed break-words w-full">
                    Eine umfassende Reinigung beinhaltet die Reinigung aller Räume und Bereiche. Dazu gehören das Staubwischen aller Oberflächen, inklusive Regale, Schränke, Fensterbänke und Heizkörper. Die Böden werden gründlich gesaugt und gewischt, inklusive Ecken und Kanten. In der Küche werden Herd, Backofen, Kühlschrank, Spüle und Arbeitsflächen gereinigt. Das Badezimmer wird komplett gereinigt, inklusive Toilette, Dusche, Badewanne, Waschbecken und Fliesen. Fenster werden innen und aussen gereinigt, und alle Oberflächen werden desinfiziert. Eine professionelle Reinigung geht weit über das normale Putzen hinaus und sorgt für ein hygienisch sauberes Zuhause.
                  </p>

                  {/* H2: Reinigung für Haushalte mit Haustieren */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6 break-words">Reinigung für Haushalte mit Haustieren</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed break-words w-full">
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
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6 break-words">Moderne und umweltfreundliche Reinigungsmittel</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed break-words w-full">
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
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6 break-words">Ablauf unserer Wohnungsreinigung – Schritt für Schritt</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed break-words w-full">
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
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6">Was kostet eine professionelle Wohnungsreinigung?</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                    Die Kosten für Wohnungsreinigung variieren je nach Grösse der Wohnung, Umfang der Reinigung und Region. In der Regel werden Preise zwischen 25 und 50 CHF pro Stunde berechnet. Eine durchschnittliche 3-Zimmer-Wohnung benötigt etwa 3-4 Stunden, was Kosten von 75-200 CHF bedeutet. Grössere Wohnungen oder besonders verschmutzte Bereiche können höhere Kosten verursachen. Durch den Vergleich mehrerer Offerten über unsere Plattform können Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen mit Abnahmegarantie erhalten. Alle Offerten sind kostenlos und unverbindlich.
                  </p>

                  {/* H2: Warum wir der richtige Partner für Ihre Reinigung sind */}
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 md:mt-12 mb-4 md:mb-6 break-words">Warum wir der richtige Partner für Ihre Reinigung sind</h2>
                  <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed break-words w-full">
                    Wir sind der vertrauenswürdige Partner für Ihre Wohnungsreinigung. Unser Netzwerk umfasst nur geprüfte, versicherte Reinigungsfirmen, die höchste Qualitätsstandards erfüllen. Alle Partnerfirmen bieten eine 100% Abnahmegarantie und verwenden moderne, umweltfreundliche Reinigungsmittel. Wir haben bereits über 500 zufriedene Kunden geholfen, die richtige Reinigungsfirma zu finden. Unser Service ist komplett kostenlos und unverbindlich – Sie zahlen nur für die Reinigung selbst, nicht für unsere Vermittlung. Zudem können Sie durch den Vergleich mehrerer Offerten bis zu 40% sparen.
                  </p>

                  {/* Trust & Erfahrung Section */}
                  <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 mb-6 md:mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Vertrauen & Erfahrung</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="flex items-start">
                        <ShieldCheck className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-bold text-gray-900 text-base">100% Abnahmegarantie</p>
                          <p className="text-sm text-gray-600">Sorgenfreie Wohnungsübergabe</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          {reviewStats.reviewCount > 0 && reviewStats.averageRating > 0 && (
                            <>
                              <p className="font-bold text-gray-900 text-base">{reviewStats.averageRating.toFixed(1)}/5 Sterne Bewertung</p>
                              <p className="text-sm text-gray-600">Von {reviewStats.reviewCount} Kunden bewertet</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Reviews */}
                  <CleaningServiceReviews />

                  {/* H2: Häufig gestellte Fragen zur Wohnungsreinigung */}
                  <div className="mt-8 md:mt-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-6">Häufig gestellte Fragen zur Reinigung</h2>
                    <p className="text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
                      Häufig gestellte Fragen zur professionellen Reinigung mit Abnahmegarantie: Was kostet eine professionelle Reinigung? Was beinhaltet eine umfassende Reinigung? Wie lange dauert eine Reinigung? Was bedeutet Abnahmegarantie? Sind die Reinigungskräfte versichert? Kann ich die Reinigung flexibel planen? Diese und weitere Fragen beantworten wir Ihnen gerne. Über unsere Plattform können Sie Reinigungsofferten online vergleichen und dabei bis zu 40% sparen.
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

                  {/* H2: Jetzt unverbindliche Reinigungs-Offerte anfordern */}
                  <div className="mt-8 md:mt-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-6">Jetzt unverbindliche Reinigungs-Offerte anfordern</h2>
                    <p className="text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 md:mb-6">Weitere Reinigungsdienstleistungen</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <Link href="/umzugsreinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <h4 className="font-bold text-gray-900 mb-2 text-lg">Umzugsreinigung</h4>
                        <p className="text-sm text-gray-600">Professionelle Umzugsreinigung mit Abnahmegarantie für eine sorgenfreie Wohnungsübergabe.</p>
                      </Link>
                      <Link href="/fensterreinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <h4 className="font-bold text-gray-900 mb-2 text-lg">Fensterreinigung</h4>
                        <p className="text-sm text-gray-600">Streifenfreie Fensterreinigung innen und aussen von professionellen Reinigungsfirmen.</p>
                      </Link>
                      <Link href="/baureinigung" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <h4 className="font-bold text-gray-900 mb-2 text-lg">Baureinigung</h4>
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
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Jetzt Offerten anfordern</h3>
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

export default WohnungsreinigungPageClient;
