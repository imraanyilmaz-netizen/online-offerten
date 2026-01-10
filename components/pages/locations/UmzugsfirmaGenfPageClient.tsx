'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Globe } from 'lucide-react';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import LocationSidebar from '@/components/locations/LocationSidebar';
import { faqs } from '@/data/locationFaqs';
import { supabase } from '@/lib/supabaseClient';

const UmzugsfirmaGenfPageClient = () => {
  const city = "Genf";
  const locationData = locations.find(loc => loc.name === city);

  const metaTitle = "Umzugsfirma Genf | Top Umzugsunternehmen | Günstige Offerten";
  const metaDescription = "Ihre professionelle Umzugsfirma in Genf. Erhalten Sie kostenlose & unverbindliche Offerten von geprüften Umzugsunternehmen für Ihren Umzug in Genf.";
  const metaKeywords = "umzugsfirma genf, umzug genf, zügelfirma genf, umzugsunternehmen genf, internationaler umzug genf, umzugsofferte genf";
  const canonicalUrl = '/umzugsfirma-genf';

  const services = [
    "Privat- und Geschäftsumzüge in und um Genf.",
    "Auslandumzug, insbesondere von und nach Frankreich.",
    "Professionelle Umzugsreinigung mit Abnahmegarantie.",
    "Möbellagerung in sicheren und modernen Lagerräumen.",
    "Spezialtransporte für Kunst und wertvolle Gegenstände."
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
      "serviceType": ["MovingCompany", "International Moving", "CleaningService"],
      "provider": {
        "@type": "Organization",
        "name": `Online-Offerten.ch - Umzugsfirmen in ${city}`
      },
      "areaServed": {
        "@type": "City",
        "name": "Genève"
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
              Umzugsfirma <span className="text-green-600 underline decoration-green-500 decoration-2 underline-offset-4">Genf</span> für einen stressfreien Umzug.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Planen Sie Ihren Umzug in der internationalen Stadt Genf? Finden Sie hier die besten Partner.
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
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Professionell umziehen in der internationalen Metropole</h2>
                <p className="text-gray-700 leading-relaxed mb-4">Genf, als Sitz vieler internationaler Organisationen, ist ein einzigartiger Ort für einen Umzug. Ob Sie aus dem Ausland zuziehen oder innerhalb der Stadt umziehen, unsere Partnerfirmen bieten massgeschneiderte Lösungen. Vergleichen Sie Offerten, um den besten Service für Ihre Bedürfnisse in Genf zu finden.</p>
              </article>

              <div className="text-center bg-gray-100 p-6 rounded-lg border-l-4 border-red-500">
                 <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white group shadow-lg">
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Genf">
                    Kostenlose Offerten für Genf erhalten
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              <article className="pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800">Spezialist für Auslandumzüge</h2>
                  <div className="p-4 bg-blue-50 rounded-lg border flex items-center mt-4">
                      <Globe className="h-8 w-8 text-blue-600 mr-4"/>
                      <p className="text-gray-700">Dank der Grenznähe zu Frankreich sind unsere Partner in Genf Experten für Auslandumzüge und Zollformalitäten.</p>
                  </div>
              </article>
              
              <article className="pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Unsere Dienstleistungen in Genf</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4 mt-4">
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

export default UmzugsfirmaGenfPageClient;
