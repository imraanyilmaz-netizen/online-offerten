'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle } from 'lucide-react';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import LocationSidebar from '@/components/locations/LocationSidebar';
import { faqs } from '@/data/locationFaqs';
import { supabase } from '@/lib/supabaseClient';

const UmzugsfirmaStGallenPageClient = () => {
  const city = "St. Gallen";
  const locationData = locations.find(loc => loc.name === city);

  const metaTitle = "Umzugsfirma St. Gallen | Günstige Offerten | Top Service";
  const metaDescription = "Ihre Umzugsfirma in St. Gallen für einen stressfreien Umzug. Vergleichen Sie geprüfte Umzugsunternehmen und erhalten Sie die besten Offerten.";
  const metaKeywords = "umzugsfirma st. gallen, umzug st. gallen, zügelfirma st. gallen, umzugsunternehmen st. gallen, günstig umziehen st. gallen";
  const canonicalUrl = '/umzugsfirma-st-gallen';

  const advantages = [
    "Lokale Expertise für schnelle und reibungslose Abläufe.",
    "Flexible Dienstleistungen: Von reinen Transporten bis zum Full-Service-Umzug.",
    "Transparente Preise ohne versteckte Kosten.",
    "Kostenlose und unverbindliche Vergleichsofferten."
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
          totalReviewCount: totalReviewCount || 0,        // ✅ Google için: TÜM yorumlar
          totalAverageRating: totalAverageRating,         // ✅ Google için: TÜM yorumların ortalaması
          cityReviews: cityReviewsData || [],             // ✅ Sayfa + Google için: O şehre özel son 10
          cityReviewCount: cityReviewCount || 0           // ✅ Sayfa gösterimi için (opsiyonel)
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
        "name": "Online-Offerten.ch - Umzugsfirmen in " + city
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
          "ratingValue": reviewStats.totalAverageRating.toFixed(1),  // ✅ TÜM yorumların ortalaması
          "reviewCount": reviewStats.totalReviewCount.toString(),     // ✅ TÜM yorumların sayısı (örn: 1247)
          "bestRating": "5",
          "worstRating": "1"
        }
      } : {}),
      // ✅ Google için: O şehre özel son 10 yorum (structured data review array)
      ...(reviewSchemas.length > 0 ? {
        "review": reviewSchemas  // ✅ O şehre özel yorumlar
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
              Umzugsfirma <span className="text-green-600 underline decoration-green-500 decoration-2 underline-offset-4">St. Gallen</span> für einen stressfreien Umzug.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Von der Olma Stadt zu Ihrem neuen Zuhause – wir finden die besten Umzugspartner für Sie.
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
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Einfach und effizient umziehen in St. Gallen</h2>
                <p className="text-gray-700 leading-relaxed mb-4">St. Gallen, bekannt für seine Stiftskirche und die malerische Altstadt, ist ein attraktiver Wohnort. Ein Umzug hierher sollte genauso positiv sein. Mit Online-Offerten.ch vergleichen Sie schnell und unkompliziert die besten Umzugsfirmen der Region.</p>
              </article>

              <div className="text-center bg-gray-100 p-6 rounded-lg border-l-4 border-gray-400">
                 <Button asChild size="lg" className="bg-gray-800 hover:bg-gray-900 text-white group shadow-lg">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=St. Gallen">
                    Offerten für St. Gallen anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <article className="pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800">Wir sind in der gesamten Region St. Gallen für Sie da</h2>
                  <p className="mt-4">Unsere Partnerfirmen bedienen nicht nur die Stadt St. Gallen, sondern auch die umliegenden Gemeinden und den gesamten Kanton. Egal ob Sie innerhalb der Stadt oder in eine Nachbargemeinde ziehen, wir haben den richtigen Partner für Sie.</p>
              </article>
              
              <article className="pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center"><BookOpen className="mr-3"/>St. Gallens Geschichte und Umzug</h2>
                  <p className="mt-4">Die Geschichte St. Gallens, geprägt von ihrer berühmten Stiftsbibliothek und dem Textilhandel, spiegelt sich in ihrer vielfältigen Architektur und Kultur wider. Ein Umzug in dieser historischen Stadt bedeutet oft auch, sich an neue Gegebenheiten anzupassen. Unsere Umzugspartner kennen die Besonderheiten der Stadt und sorgen für einen reibungslosen Übergang, damit Sie sich schnell in Ihrem neuen Zuhause wohlfühlen.</p>
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

export default UmzugsfirmaStGallenPageClient;
