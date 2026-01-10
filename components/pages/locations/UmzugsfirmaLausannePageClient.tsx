'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import LocationSidebar from '@/components/locations/LocationSidebar';
import { faqs } from '@/data/locationFaqs';
import { supabase } from '@/lib/supabaseClient';

const UmzugsfirmaLausannePageClient = () => {
  const city = "Lausanne";
  const locationData = locations.find(loc => loc.name === city);

  const metaTitle = "Umzugsfirma Lausanne | Top Offerten | Stressfrei umziehen";
  const metaDescription = "Ihre zuverlässige Umzugsfirma in Lausanne. Fordern Sie jetzt kostenlose Offerten von geprüften Umzugsunternehmen für Ihren Umzug am Genfersee an.";
  const metaKeywords = "umzugsfirma lausanne, umzug lausanne, zügelfirma lausanne, umzugsunternehmen lausanne, umzug genfersee";
  const canonicalUrl = '/umzugsfirma-lausanne';

  const advantages = [
    "Lokale Unternehmen mit Erfahrung in Lausanne.",
    "Massgeschneiderte Lösungen für Privat- und Geschäftsumzüge.",
    "Professionelle Verpackungs- und Montageservices.",
    "Kostenloser und unverbindlicher Vergleich von Offerten."
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

        // TÜM onaylanmış yorumların rating'lerini al
        const { data: allReviews, error: reviewsError } = await supabase
          .from('customer_reviews')
          .select('rating')
          .eq('approval_status', 'approved');

        if (reviewsError) {
          console.error('Error fetching reviews for average:', reviewsError);
        }

        // TÜM yorumların average rating'i hesapla
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

        // O şehre özel yorum sayısı (opsiyonel - sayfa gösterimi için)
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
        "name": city
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
      <div className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          
          <motion.header 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16 pt-8"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4">
              Umzugsfirma <span className="text-green-600 underline decoration-green-500 decoration-2 underline-offset-4">Lausanne</span> für einen stressfreien Umzug.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Entspannt umziehen in der Olympischen Hauptstadt am Genfersee.
            </p>
          </motion.header>

          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
            <motion.main 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-3 bg-white p-6 md:p-8 rounded-xl shadow-xl space-y-8"
            >
              <article>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Stressfreier Umzug in der malerischen Stadt Lausanne</h2>
                <p className="text-gray-700 leading-relaxed mb-4">Lausanne, idyllisch am Genfersee gelegen, bietet eine hohe Lebensqualität und eine atemberaubende Kulisse. Ein Umzug in dieser Stadt erfordert eine gute Organisation. Unsere Partnerfirmen kennen die örtlichen Gegebenheiten und sorgen für einen reibungslosen Ablauf. Vergleichen Sie die besten Offerten und starten Sie Ihr neues Leben in Lausanne.</p>
              </article>

              <div className="text-center bg-gray-100 p-6 rounded-lg border-l-4 border-blue-500">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white group shadow-lg">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Lausanne">
                    Kostenlose Offerten für Lausanne erhalten
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <article className="pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800">Ihre Vorteile mit unseren Umzugspartnern</h2>
                  <ul className="list-none space-y-3 mt-4">
                    {advantages.map((item, index) => (
                      <li key={index} className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2"/>{item}</li>
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

export default UmzugsfirmaLausannePageClient;
