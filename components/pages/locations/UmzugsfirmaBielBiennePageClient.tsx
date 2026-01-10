'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Users } from 'lucide-react';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import LocationSidebar from '@/components/locations/LocationSidebar';
import { faqs } from '@/data/locationFaqs';
import { supabase } from '@/lib/supabaseClient';

const UmzugsfirmaBielBiennePageClient = () => {
  const city = "Biel/Bienne";
  const locationData = locations.find(loc => loc.name === city);

  const metaTitle = "Umzugsfirma Biel/Bienne | Experten für Ihren Umzug";
  const metaDescription = "Finden Sie die beste Umzugsfirma in Biel/Bienne. Profitieren Sie von zweisprachigen Teams und erhalten Sie kostenlose Offerten für Ihren Umzug.";
  const metaKeywords = "umzugsfirma biel, zügelfirma bienne, umzug biel/bienne, zweisprachiger umzug, umzugsunternehmen jura";
  const canonicalUrl = '/umzugsfirma-biel-bienne';

  const services = [
    "Professioneller Ein- und Auspackservice",
    "Möbel-Demontage und -Montage durch erfahrene Schreiner",
    "Spezialtransporte für Klaviere oder Kunstgegenstände",
    "Endreinigung mit Abnahmegarantie",
    "Fachgerechte Entsorgung und Räumung"
  ];

  // Review stats state - hem toplam hem şehre özel veriler için
  const [reviewStats, setReviewStats] = useState({ 
    totalReviewCount: 0,        // ✅ TÜM yorumların sayısı (Google için)
    totalAverageRating: 0,      // ✅ TÜM yorumların ortalaması (Google için)
    cityReviews: [] as any[],   // ✅ O şehre özel son 10 yorum (sayfa ve structured data için)
    cityReviewCount: 0          // ✅ O şehre özel yorum sayısı (sayfa gösterimi için - opsiyonel)
  });

  // Fetch review stats dynamically
  useEffect(() => {
    const fetchReviewStats = async () => {
      try {
        // 1. TÜM onaylanmış yorumları say ve average hesapla (Google aggregateRating için)
        const { count: totalReviewCount, error: countError } = await supabase
          .from('customer_reviews')
          .select('*', { count: 'exact', head: true })
          .eq('approval_status', 'approved');

        if (countError) {
          console.error('Error fetching total review count:', countError);
        }

        const { data: allReviews, error: reviewsError } = await supabase
          .from('customer_reviews')
          .select('rating')
          .eq('approval_status', 'approved');

        if (reviewsError) {
          console.error('Error fetching reviews for average:', reviewsError);
        }

        let totalAverageRating = 0;
        if (allReviews && allReviews.length > 0) {
          const totalRating = allReviews.reduce((sum: number, review: any) => sum + (review.rating || 0), 0);
          totalAverageRating = totalRating / allReviews.length;
        }

        // 2. O şehre özel SON 10 yorumu al (sayfa gösterimi ve structured data review array için)
        const { data: cityReviewsData, error: cityReviewsError } = await supabase
          .from('customer_reviews')
          .select('id, customer_name, rating, review_text, review_date, service_type, city')
          .eq('approval_status', 'approved')
          .ilike('city', `%${city}%`)
          .order('review_date', { ascending: false })
          .limit(10);

        if (cityReviewsError) {
          console.error('Error fetching city reviews:', cityReviewsError);
        }

        const { count: cityReviewCount, error: cityCountError } = await supabase
          .from('customer_reviews')
          .select('*', { count: 'exact', head: true })
          .eq('approval_status', 'approved')
          .ilike('city', `%${city}%`);

        if (cityCountError) {
          console.error('Error fetching city review count:', cityCountError);
        }

        setReviewStats({
          totalReviewCount: totalReviewCount || 0,
          totalAverageRating: totalAverageRating,
          cityReviews: cityReviewsData || [],
          cityReviewCount: cityReviewCount || 0
        });
      } catch (error) {
        console.error('Error in fetchReviewStats:', error);
        setReviewStats({ 
          totalReviewCount: 0, 
          totalAverageRating: 0, 
          cityReviews: [],
          cityReviewCount: 0
        });
      }
    };
    
    fetchReviewStats();
  }, [city]);

  const faqItemsForSchema = faqs.move.concat(faqs.clean);
  
  // Dynamic schema with review stats
  const schemaData = useMemo(() => {
    // Review structured data'ları oluştur - O şehre özel son 10 yorumdan
    const reviewSchemas = (reviewStats.cityReviews || []).map((review: any) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.customer_name || "Anonymous"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating || 0,
        "bestRating": 5,
        "worstRating": 1
      },
      "reviewBody": review.review_text || "",
      "datePublished": review.review_date || new Date().toISOString()
    }));

    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": ["MovingCompany", "CleaningService"],
      "provider": {
        "@type": "Organization",
        "name": `Online-Offerten.ch - Umzugsfirmen in ${city}`
      },
      "areaServed": {
        "@type": "City",
        "name": "Biel/Bienne"
      },
      "name": metaTitle,
      "description": metaDescription,
      // ✅ Google için: TÜM yorumların toplamı ve ortalaması
      ...(reviewStats.totalReviewCount > 0 && reviewStats.totalAverageRating > 0 ? {
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": reviewStats.totalAverageRating.toFixed(1),
          "reviewCount": reviewStats.totalReviewCount.toString(),
          "bestRating": "5",
          "worstRating": "1"
        }
      } : {}),
      // ✅ Google için: O şehre özel son 10 yorum (structured data review array)
      ...(reviewSchemas.length > 0 ? {
        "review": reviewSchemas
      } : {}),
      "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": faqItemsForSchema.map(item => ({
          "@type": "Question",
          "name": ((item.question as any).de || item.question as any).replace('{city}', city),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer.map(ans => typeof ans === 'string' ? ans : (ans.de || ans)).join(' ').replace(/{city}/g, city)
          }
        }))
      }
    };
  }, [city, metaTitle, metaDescription, reviewStats, faqItemsForSchema]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50 py-12 md:py-16">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          
          <motion.header 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16 pt-8"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4 text-shadow-md">
              Umzugsfirma <span className="text-green-600 underline decoration-green-500 decoration-2 underline-offset-4">Biel/Bienne</span> für einen stressfreien Umzug.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Ihr Partner für einen reibungslosen Umzug in der grössten zweisprachigen Stadt der Schweiz.
            </p>
          </motion.header>

          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
            <motion.main 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-3 bg-white p-6 md:p-8 rounded-xl shadow-2xl space-y-10"
            >
              <article>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Willkommen in Biel/Bienne – Umziehen leicht gemacht</h2>
                <p className="text-gray-700 leading-relaxed mb-4">Ein Umzug in der Uhrenmetropole Biel/Bienne, wo deutsche und französische Kultur aufeinandertreffen, ist eine besondere Erfahrung. Unsere lokalen Partnerfirmen sind auf die Gegebenheiten der Stadt spezialisiert und unterstützen Sie kompetent bei jedem Schritt. Vergleichen Sie jetzt und finden Sie das perfekte Umzugsunternehmen.</p>
              </article>

              <div className="mt-8 text-center bg-teal-50 p-6 rounded-lg border-l-4 border-teal-500">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Bereit für Ihren Umzug?</h3>
                <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white group shadow-lg">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Biel-Bienne">
                    Kostenlose Offerten für Biel/Bienne anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <article className="pt-8 border-t border-gray-200 space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Zweisprachigkeit als Vorteil</h2>
                  <p>Die Kommunikation ist der Schlüssel zu einem erfolgreichen Umzug. In Biel/Bienne, wo Deutsch und Französisch gleichermassen gesprochen werden, bieten unsere Partnerfirmen oft zweisprachige Teams an. So werden alle Ihre Wünsche verstanden und Missverständnisse vermieden.</p>
                  <div className="p-4 bg-gray-50 rounded-lg border flex items-center">
                      <Users className="mx-auto h-8 w-8 text-teal-600 mr-4"/>
                      <p className="text-gray-700">Profitieren Sie von lokalen, zweisprachigen Umzugsteams, die Ihre Sprache sprechen.</p>
                  </div>
              </article>
              
              <article className="pt-8 border-t border-gray-200 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Umfassende Dienstleistungen für Ihren Umzug</h2>
                <p>Unsere Partner bieten mehr als nur den Transport. Stellen Sie sich Ihr individuelles Servicepaket zusammen:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
                  {services.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </article>
            </motion.main>

            <LocationSidebar city={city} districts={undefined as any} searches={undefined as any} />
          </div>
          

          <LocationPageNavigation allLocations={locations} currentCity={city} />
        </div>
      </div>
    </>
  );
};

export default UmzugsfirmaBielBiennePageClient;
