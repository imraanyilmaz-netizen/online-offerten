import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, MapPin, Truck, Sparkles, Brush as PaintBrush, BookOpen, Calendar } from 'lucide-react';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import CantonFlag from '@/components/CantonFlag';
import LocationFAQ from '@/components/locations/LocationFAQ';
import { faqs } from '@/data/locationFaqs';
import { supabase } from '@/lib/supabaseClient';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const ServiceSection = ({ title, intro, list, icon: Icon, delay, city, serviceKey }) => {
    return (
        <motion.section
            className="py-12 md:py-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay }}
        >
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                    <div className="p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-xl mr-4 shadow-sm">
                        {Icon && <Icon className="w-8 h-8 text-green-600" />}
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        {title}
                    </h2>
                </div>
                <div className="space-y-4 mb-6">
                    {Array.isArray(intro) ? intro.map((p, i) => (
                        <div 
                            key={i} 
                            className="text-gray-700 leading-relaxed text-base md:text-lg prose prose-lg max-w-none prose-headings:font-bold prose-a:text-green-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-bold" 
                            dangerouslySetInnerHTML={{ __html: p }} 
                        />
                    )) : intro ? (
                        <div 
                            className="text-gray-700 leading-relaxed text-base md:text-lg prose prose-lg max-w-none prose-headings:font-bold prose-a:text-green-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-bold" 
                            dangerouslySetInnerHTML={{ __html: intro }} 
                        />
                    ) : null}
                </div>
                <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        Unsere Leistungen
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                        {Array.isArray(list) ? list.map((item, index) => (
                            <li key={index} className="flex items-start group">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-gray-700 text-sm md:text-base">{item}</span>
                            </li>
                        )) : null}
                    </ul>
                </div>
                <div className="mt-8">
                    <Button asChild size="lg" className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white group shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 text-sm sm:text-base md:text-lg font-semibold justify-center sm:justify-start">
                        <Link href={`/kostenlose-offerte-anfordern?city=${city}&service=${serviceKey}`} className="flex items-center justify-center sm:justify-start w-full">
                            <span className="text-center sm:text-left">Jetzt Offerten anfordern für {title.split(' in')[0]}</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 flex-shrink-0 transition-transform group-hover:translate-x-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </motion.section>
    );
};

const DistrictsSection = ({ districts, city }) => {
    if (!districts || !districts.title) return null;
    return (
        <motion.section
            className="py-12 md:py-16 bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl shadow-lg border border-blue-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
        >
            <div className="container mx-auto px-6 md:px-8">
                <div className="flex items-center mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl mr-4 shadow-sm">
                        <MapPin className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900">{districts.title}</h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-8 text-base md:text-lg font-medium">{districts.text}</p>
                <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
                    <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-x-6 gap-y-3">
                        {districts.list.map((district, index) => (
                            <div key={index} className="flex items-center mb-3 break-inside-avoid group">
                                 <MapPin size={16} className="mr-2 text-blue-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                 <span className="text-gray-700 text-sm md:text-base font-medium">{district}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

const RatgeberSection = ({ city }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, slug, meta_description, featured_image_url, category, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching Ratgeber posts:', error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading || posts.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-12 md:py-16 bg-gradient-to-br from-green-50 via-white to-green-50 rounded-2xl mt-12 shadow-lg border border-green-100"
    >
      <div className="container mx-auto max-w-navbar px-4 md:px-6">
        <div className="flex items-center mb-8">
          <div className="p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-xl mr-4 shadow-sm">
            <BookOpen className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900">Ratgeber für {city}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/ratgeber/${post.slug}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 transform hover:-translate-y-2"
            >
              {post.featured_image_url && (
                <div className="w-full h-48 overflow-hidden bg-gray-200">
                  <ImageWithFallback
                    src={post.featured_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-5 md:p-6">
                {post.category && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full mb-3">
                    {post.category}
                  </span>
                )}
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                  {post.meta_description || 'Keine Beschreibung verfügbar.'}
                </p>
                <div className="flex items-center text-xs md:text-sm text-gray-500 pt-3 border-t border-gray-100">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(post.published_at).toLocaleDateString('de-DE')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const CombinedServicePage = ({ city, canton, namespace }) => {
  // Canonical URL oluştur
  const locationData = locations.find(loc => loc.name === city);
  const canonicalUrl = `https://online-offerten.ch/${locationData?.slug || `umzug-reinigung-maler-${city.toLowerCase()}`}`;

  const metaTitle = `Umzug, Reinigung & Malerarbeiten in ${city} – Offerten vergleichen`;
  const metaDescription = `Finden Sie geprüfte Umzugs-, Reinigungs- und Malerfirmen in ${city}. Vergleichen Sie mehrere Offerten und sparen Sie bis zu 40%.`;
  const metaKeywords = `Umzugsfirma ${city}, Reinigungsfirma ${city}, Malerfirma ${city}, Offerten ${city}`;

  const faqItemsForSchema = (faqs.move || []).concat(faqs.clean || []).concat(faqs.paint || []);
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": [
        `Umzugsfirma ${city}`, 
        `Zügelfirma ${city}`, 
        `Umzugsunternehmen ${city}`, 
        `Reinigungsfirma ${city}`, 
        `Malergeschäft ${city}`, 
        `Malerarbeit ${city}`, 
        "MovingCompany", 
        "CleaningService", 
        "Painter"
    ],
    "provider": {
      "@type": "Organization",
      "name": `Online-Offerten.ch - Services in ${city}`
    },
    "areaServed": {
      "@type": "City",
      "name": city,
      "address": {
          "@type": "PostalAddress",
          "addressRegion": canton.toUpperCase(),
          "addressCountry": "CH"
      }
    },
    "name": metaTitle,
    "description": metaDescription,
    "mainEntity": faqItemsForSchema.length > 0 ? {
        "@type": "FAQPage",
        "mainEntity": faqItemsForSchema.map(item => ({
            "@type": "Question",
            "name": (item.question?.de || item.question || '').replace('{city}', city),
            "acceptedAnswer": {
                "@type": "Answer",
                "text": (Array.isArray(item.answer) ? item.answer.map(ans => {
                    const content = ans?.de || ans || '';
                    return typeof content === 'string' ? content : (content.text?.de || content.text || '');
                }).join(' ') : (item.answer?.de || item.answer || '')).replace(/{city}/g, city)
            }
        })).filter(item => item.name)
    } : undefined
  };

  const sections = [
    {
        key: 'umzug',
        title: `Umzugsfirma ${city}`,
        intro: [`Finden Sie die beste Umzugsfirma in ${city}. Professionelle Umzugsunternehmen für Ihren Wohnungswechsel.`],
        list: ['Privatumzug', 'Geschäftsumzug', 'Internationaler Umzug', 'Spezialtransporte', 'Klaviertransport'],
        icon: Truck,
        serviceKey: 'umzug'
    },
    {
        key: 'reinigung',
        title: `Reinigungsfirma ${city}`,
        intro: [`Professionelle Reinigungsdienste in ${city}. Umzugsreinigung, Wohnungsreinigung und mehr.`],
        list: ['Wohnungsreinigung', 'Hausreinigung', 'Büroreinigung', 'Umzugsreinigung', 'Grundreinigung'],
        icon: Sparkles,
        serviceKey: 'reinigung'
    },
    {
        key: 'maler',
        title: `Malerfirma ${city}`,
        intro: [`Malerarbeiten in ${city}. Professionelle Malerbetriebe für Innen- und Aussenanstriche.`],
        list: ['Innenanstrich', 'Aussenanstrich', 'Fassadenanstrich', 'Renovation'],
        icon: PaintBrush,
        serviceKey: 'maler'
    },
  ];

  return (
    <>
      
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto max-w-navbar px-4 md:px-6 py-8">
          
          {/* Hero Section - Two Columns */}
          {(() => {
            const locationImage = locationData?.image || 'https://online-offerten.ch/image/umzug-reinigung-malerarbeiten-zuerich-offerten.webp';
            
            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-3 gap-0 items-center mb-12 md:mb-16"
              >
                {/* Left Column - Text Content */}
                <div className="md:col-span-2 bg-gray-100 p-6 md:p-8 lg:p-10 rounded-xl order-1 md:order-1">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                    Umzug, Reinigung & Malerarbeiten in {city}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                    Finden Sie geprüfte Umzugs-, Reinigungs- und Malerfirmen in {city}. Vergleichen Sie mehrere Offerten und sparen Sie bis zu 40%.
                  </p>
                  
                  {/* CTA Button */}
                  <Button 
                    onClick={() => window.location.href = `/kostenlose-offerte-anfordern?city=${city}`}
                    size="lg" 
                    className="bg-green-600 hover:bg-green-700 text-white text-base md:text-lg px-6 py-6 mb-6 group w-full md:w-auto"
                  >
                    Jetzt Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                  
                  {/* Benefits */}
                  <div className="bg-green-50 rounded-lg p-4 md:p-5 border border-green-100">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">Geprüfte Anbieter aus {city}</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">Unverbindliche Anfrage</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">Bis zu 40% sparen</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Right Column - Image */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="md:col-span-1 relative h-64 md:h-auto md:min-h-[400px] overflow-hidden order-2 md:order-2"
                >
                  <img 
                    src={locationImage}
                    alt={`Umzug, Reinigung & Malerarbeiten in ${city}`}
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                </motion.div>
              </motion.div>
            );
          })()}


          <main className="space-y-8 md:space-y-12">
            {sections.map((section, index) => (
                <ServiceSection key={section.key} {...section} delay={index * 0.2} city={city} />
            ))}
            
            {/* Districts section removed - no translation data available */}
          </main>

          {/* Ratgeber Section - Umzug Category */}
          <RatgeberSection city={city} />
          
          <LocationFAQ city={city} faqs={faqs} />

          <LocationPageNavigation allLocations={locations} currentCity={city} />
        </div>
      </div>
    </>
  );
};

export default CombinedServicePage;