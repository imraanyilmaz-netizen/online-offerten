'use client'

import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react'
// framer-motion removed - CSS for better INP
import Link from 'next/link'
import { Award, Users, HeartHandshake as Handshake, Target, ClipboardList, Layers, Star, Truck, Sparkles, Trash2, Paintbrush, Leaf, ChevronLeft, ChevronRight, ArrowRight, User, MapPin, CheckCircle, Building2, ShieldCheck, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { formatDate, cn } from '@/lib/utils'
import { getGermanServiceName } from '@/src/lib/dataMapping.js'
import { locations } from '@/src/data/locations.js'

// Review Card Component (ana sayfadaki gibi)
interface ReviewCardProps {
  review: any;
  index: number;
}

const ReviewCard = memo(({ review, index }: ReviewCardProps) => {
  const { 
    customer_name, 
    city,
    review_date,
    rating,
    review_text,
    service_type,
    partner_name,
    partners: partner
  } = review;

  const serviceName = getGermanServiceName(service_type);
  
  // Dinamik yıldız hesaplama - Platform yorumları için sadece rating değeri kullanılır
  const displayRating = rating || 0
  const fullStars = Math.floor(displayRating)
  const decimalPart = displayRating % 1
  const hasHalfStar = decimalPart >= 0.25 && decimalPart < 0.75
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="h-full">
      <Card className="flex flex-col h-full bg-white shadow-lg rounded-xl overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 border border-gray-100">
        <CardContent className="p-6 flex-grow flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p className="font-bold text-gray-800">{customer_name}</p>
                <div className="flex items-center gap-2 mt-1">
                  {city && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin className="w-3 h-3 text-green-600" />
                      <span>{city}</span>
                    </div>
                  )}
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{formatDate(review_date)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Yıldızlar - Yorumun üstünde */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} size={16} className="text-yellow-400 fill-yellow-400" />
              ))}
              {hasHalfStar && (
                <div className="relative">
                  <Star size={16} className="text-gray-300" />
                  <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
              )}
              {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} size={16} className="text-gray-300" />
              ))}
            </div>
            <span className="font-bold text-base text-gray-900">{displayRating.toFixed(2)}</span>
          </div>
          
          {review_text && (
            <p className="text-gray-700 text-sm italic mb-4">
              "{review_text}"
            </p>
          )}

          <div className="mt-auto pt-4 space-y-3 border-t border-gray-100">
            <div className="flex flex-wrap items-center gap-2">
              {city && (
                <Badge variant="outline" className="bg-gray-50 border-gray-200 text-gray-700 font-medium">
                  <MapPin className="w-3 h-3 mr-1" />
                  {city}
                </Badge>
              )}
              {serviceName && (
                <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700 font-medium">
                  {serviceName}
                </Badge>
              )}
              {partner && partner.slug ? (
                <p className="text-xs text-gray-500">
                  Für Firma:{' '}
                  <Button asChild variant="link" className="p-0 h-auto text-xs">
                    <Link href={`/partner/${partner.slug}`} className="text-green-600 hover:underline">
                      {partner_name || partner.company_name}
                    </Link>
                  </Button>
                </p>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

ReviewCard.displayName = 'ReviewCard';

interface AboutPageClientProps {
  initialReviews?: any[];
}

const AboutPageClient = ({ initialReviews = [] }: AboutPageClientProps) => {
  const router = useRouter()

  // State for reviews and scroll
  const [state, setState] = useState({
    reviews: initialReviews,
    canScrollLeft: false,
    canScrollRight: true,
  })

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Scroll handlers
  const getVisibleCardsCount = useCallback(() => {
    if (typeof window === 'undefined') return 1;
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 640) return 2;
    return 1;
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setState(prev => ({
      ...prev,
      canScrollLeft: el.scrollLeft > 0,
      canScrollRight: el.scrollLeft < el.scrollWidth - el.clientWidth - 1
    }));
  }, []);

  const throttle = useCallback((func: () => void, limit: number) => {
    let inThrottle: boolean;
    return () => {
      if (!inThrottle) {
        func();
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }, []);

  const throttledHandleScroll = useMemo(() => throttle(handleScroll, 100), [handleScroll, throttle]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', throttledHandleScroll, { passive: true });
      window.addEventListener('resize', throttledHandleScroll, { passive: true });
      handleScroll(); // Initial check
      return () => {
        el.removeEventListener('scroll', throttledHandleScroll);
        window.removeEventListener('resize', throttledHandleScroll);
      };
    }
  }, [throttledHandleScroll, handleScroll]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('.flex-shrink-0')?.clientWidth || 0;
    const gap = 24; // gap-6 = 24px
    const scrollAmount = cardWidth + gap;
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  // Hauptstädte für Standort-Bereich
  const mainCities = locations.filter(loc => loc.showOnHome).slice(0, 8)
  
  return (
    <div className="bg-white">
      <main>
        {/* Hero Section - SEO H1 */}
        <div className="bg-gradient-to-b from-gray-50 to-white pt-16 pb-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <h1
              className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight text-center mb-6"
            >
              Über uns – Online-Offerten.ch
            </h1>
            <p
              className="text-lg md:text-xl text-gray-700 text-center max-w-4xl mx-auto leading-relaxed"
            >
              <strong>Online-Offerten.ch ist eine unabhängige Schweizer Vermittlungsplattform für Umzugs-, Reinigungs- und Malerofferten.</strong> Wir verbinden Privat- und Geschäftskunden mit geprüften, regionalen Partnerfirmen in der ganzen Schweiz.
            </p>
          </div>
        </div>

        {/* Was wir tun - Hauptinhalt */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="max-w-4xl mx-auto">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Was wir tun</h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-4 leading-relaxed">
                  <p>
                    <strong>Online-Offerten.ch</strong> ist eine unabhängige Schweizer Vermittlungsplattform, die Ihnen hilft, die passenden Dienstleister für Ihre Bedürfnisse zu finden – <strong>vollständig kostenlos und unverbindlich</strong>. Statt stundenlang im Internet zu suchen und verschiedene Firmen zu kontaktieren, können Sie mit einem einzigen Formular bis zu sechs passende Anbieter in Ihrer Nähe finden.
                  </p>
                  <p>
                    Nach dem Ausfüllen unseres Formulars wird Ihre Anfrage an <strong>bis zu sechs passende Anbieter in Ihrer Region</strong> weitergeleitet. Die Partnerfirmen kontaktieren Sie direkt mit individuellen Offerten. Der Vergleich ist <strong>100 % kostenlos und unverbindlich</strong> – die Entscheidung liegt vollständig bei Ihnen.
                  </p>
                  <p>
                    Wir sparen Ihnen Zeit, Geld und Nerven, indem wir Ihnen helfen, die richtige Firma schnell und einfach zu finden. Unsere geprüften Partnerfirmen sind in der ganzen Schweiz tätig und decken alle wichtigen Regionen ab – von Zürich und Bern über Basel und Luzern bis hin zu Genf, Lausanne und vielen weiteren Städten.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Warum Online-Offerten.ch - Vorteile */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Warum Online-Offerten.ch?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Wir machen die Suche nach dem richtigen Dienstleister einfach, schnell und kostenlos.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Clock className="w-8 h-8 text-green-600" />,
                  title: "Zeit sparen",
                  description: "Statt stundenlang zu suchen, erhalten Sie in wenigen Minuten bis zu sechs passende Offerten von geprüften Firmen in Ihrer Region."
                },
                {
                  icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
                  title: "Geprüfte Partner",
                  description: "Alle unsere Partnerfirmen werden sorgfältig geprüft und müssen hohe Qualitätsstandards erfüllen. Sie arbeiten nur mit seriösen Unternehmen zusammen."
                },
                {
                  icon: <CheckCircle className="w-8 h-8 text-green-600" />,
                  title: "100% kostenlos",
                  description: "Unser Service ist vollständig kostenlos und unverbindlich. Sie zahlen nichts für die Vermittlung und sind zu nichts verpflichtet."
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Wie es funktioniert */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Wie es funktioniert</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                In nur drei einfachen Schritten erhalten Sie passende Offerten von geprüften Firmen.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Anfrage ausfüllen",
                  description: "Beschreiben Sie Ihr Projekt in unserem Formular. Je mehr Details Sie angeben, desto genauer werden die Offerten."
                },
                {
                  step: "2",
                  title: "Offerten erhalten",
                  description: "Ihre Anfrage wird an bis zu sechs passende Partnerfirmen in Ihrer Region weitergeleitet. Diese kontaktieren Sie direkt mit individuellen Offerten."
                },
                {
                  step: "3",
                  title: "Vergleichen und wählen",
                  description: "Vergleichen Sie die Offerten in Ruhe. Die Entscheidung liegt vollständig bei Ihnen – 100% kostenlos und unverbindlich."
                }
              ].map((step, index) => (
                <div 
                  key={index}
                  className="text-center p-6"
                >
                  <div className="flex justify-center items-center h-16 w-16 rounded-full bg-green-100 mx-auto mb-4 border-2 border-green-200">
                    <span className="text-2xl font-bold text-green-700">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Unsere Dienstleistungen */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Unsere Dienstleistungen</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Wir vermitteln geprüfte Partnerfirmen für verschiedene Dienstleistungen in der ganzen Schweiz.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Truck className="w-10 h-10 text-green-600" />,
                  title: "Umzüge",
                  description: "Privatumzüge, Geschäftsumzüge, internationale Umzüge und Spezialtransporte wie Klaviertransporte."
                },
                {
                  icon: <Sparkles className="w-10 h-10 text-green-600" />,
                  title: "Reinigung",
                  description: "Wohnungsreinigung, Büroreinigung, Umzugsreinigung, Grundreinigung und viele weitere Reinigungsdienstleistungen."
                },
                {
                  icon: <Paintbrush className="w-10 h-10 text-green-600" />,
                  title: "Malerarbeiten",
                  description: "Innen- und Aussenanstriche, Fassadenrenovation, Tapezierarbeiten und Renovationsarbeiten."
                },
                {
                  icon: <Trash2 className="w-10 h-10 text-green-600" />,
                  title: "Räumung & Entsorgung",
                  description: "Professionelle Räumung und umweltgerechte Entsorgung von Möbeln und Abfällen."
                }
              ].map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Standorte - Regionale Abdeckung */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Unsere Standorte</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Wir vermitteln Partnerfirmen in der ganzen Schweiz – von den grossen Städten bis in die ländlichen Regionen.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
              {mainCities.map((city) => (
                <Link 
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="block bg-gray-50 hover:bg-green-50 text-gray-700 hover:text-green-700 border border-gray-200 hover:border-green-300 px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {city.name}
                </Link>
              ))}
              <Link 
                href="/standorte"
                className="block bg-green-50 text-green-700 border border-green-300 px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200"
              >
                ... und viele mehr
              </Link>
            </div>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Unser Netzwerk an Partnerfirmen erstreckt sich über alle Kantone der Schweiz. Egal ob Sie in Zürich, Bern, Basel, Luzern, Genf, Lausanne oder einer anderen Stadt wohnen – wir finden die passenden Dienstleister in Ihrer Region.
            </p>
          </div>
        </section>

        {/* Partner werden */}
        <section className="py-16 md:py-24 bg-green-600">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-4xl mx-auto">
              <Building2 className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Sind Sie Dienstleister?</h2>
              <p className="text-lg text-green-100 mb-8 leading-relaxed">
                Werden Sie Partner bei Online-Offerten.ch und erhalten Sie qualifizierte Kundenanfragen aus Ihrer Region. Wir verbinden Sie mit Privat- und Geschäftskunden, die genau Ihre Dienstleistungen suchen. Erweitern Sie Ihre Reichweite und gewinnen Sie neue Aufträge – <strong>kostenlos und unverbindlich</strong>.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-green-700 hover:bg-gray-100 font-bold text-lg px-8 py-6"
              >
                <Link href="/partner-werden" className="inline-flex items-center gap-2">
                  Jetzt Partner werden
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        {state.reviews.length > 0 ? (
          <section className="py-16 md:py-24 bg-slate-50">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Das sagen unsere Kundinnen & Kunden
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  100 % echte Stimmen – Erfahrungen von Menschen, die bereits mit uns umgezogen sind.
                </p>
              </div>

              <div className="relative">
                <div 
                  ref={scrollContainerRef}
                  className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 -mb-8 gap-6 md:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  {state.reviews.map((review, index) => (
                    <div key={review.id || index} className="flex-shrink-0 snap-start w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.34rem)]">
                      <ReviewCard review={review} index={index} />
                    </div>
                  ))}
        </div>

                <Button 
                  variant="outline" 
                  size="icon" 
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 -left-4 z-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white hidden md:flex transition-opacity duration-300",
                    state.canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                  onClick={() => scroll('left')}
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 -right-4 z-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white hidden md:flex transition-opacity duration-300",
                    state.canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                  onClick={() => scroll('right')}
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              <div className="text-center mt-8">
                <Button
                  asChild
                  variant="outline"
                  className="bg-white hover:bg-gray-50 border-gray-300 text-gray-900 font-semibold px-6 py-3"
                >
                  <Link href="/kunden-bewertungen" className="flex items-center gap-2">
                    Alle Bewertungen anzeigen
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        ) : null}

        {/* CTA Section */}
        <section className="bg-green-600 py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Starten Sie jetzt Ihre kostenlose Anfrage
            </h2>
            <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
              Finden Sie in Kürze die besten Dienstleister für Ihr Vorhaben. Unverbindlich und unkompliziert – 100% kostenlos.
            </p>
            <div>
              <Button
                size="lg"
                className="bg-white text-green-700 hover:bg-gray-100 font-bold text-lg px-8 py-6"
                onClick={() => router.push('/kostenlose-offerte-anfordern')}
              >
                Jetzt kostenlose Offerten anfordern
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AboutPageClient
