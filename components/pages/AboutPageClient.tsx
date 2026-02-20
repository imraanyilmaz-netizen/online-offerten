'use client'

import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Users, HeartHandshake as Handshake, Target, Layers, Star, 
  Truck, Sparkles, Trash2, Paintbrush, ChevronLeft, ChevronRight, 
  ArrowRight, User, MapPin, CheckCircle, Building2, ShieldCheck, 
  Clock, FileText, Search, Award, ChevronRight as ChevronRightIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { formatDate, cn } from '@/lib/utils'
import { getGermanServiceName } from '@/src/lib/dataMapping.js'
import { locations } from '@/src/data/locations.js'

// Review Card Component
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
              &quot;{review_text}&quot;
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

  const [state, setState] = useState({
    reviews: initialReviews,
    canScrollLeft: false,
    canScrollRight: true,
  })

  const scrollContainerRef = useRef<HTMLDivElement>(null)

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
      handleScroll();
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
    const gap = 24;
    const scrollAmount = cardWidth + gap;
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  }, []);

  const mainCities = locations.filter((loc: any) => loc.showOnHome).slice(0, 8)
  
  return (
    <div className="bg-white">
      <main>
        {/* Hero Section with Image */}
        <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-green-50">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
                </li>
                <li><ChevronRightIcon className="w-4 h-4 text-gray-400" /></li>
                <li className="text-gray-900 font-medium" aria-current="page">Über uns</li>
              </ol>
            </nav>

            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              {/* Left: Text */}
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold text-sm mb-4">
                  <Award className="h-4 w-4 mr-2" />
                  Unabhängiges Vergleichsportal
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
                  Über Online-Offerten.ch
                </h1>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                  Wir sind eine <strong>unabhängige Schweizer Vergleichsplattform</strong> für Umzug, Reinigung und Malerarbeiten. Mit einer einzigen Anfrage erhalten Sie <strong>bis zu 5 kostenlose Offerten</strong> von geprüften Partnerfirmen in Ihrer Region.
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>100% kostenlos</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Geprüfte Partner</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Bis zu 5 Offerten</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Ganze Schweiz</span>
                  </div>
                </div>
              </div>

              {/* Right: Image */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="/umzug/vergleichsportal.webp"
                    alt="Online-Offerten.ch – Unabhängiges Vergleichsportal für Umzug, Reinigung und Malerarbeiten"
                    width={600}
                    height={450}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -left-4 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg hidden md:block">
                  <p className="text-sm font-bold">Schweizweit aktiv</p>
                  <p className="text-xs text-green-100">In allen Kantonen</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Geprüfte & versicherte Partnerfirmen — Trust Section (SEO: erstes sichtbares Inhaltselement nach Hero) */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 bg-green-100 border border-green-200 rounded-full text-green-700 font-semibold text-xs mb-4">
                IHRE SICHERHEIT
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nur geprüfte & versicherte Partnerfirmen
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Ihre Sicherheit steht bei uns an erster Stelle. Bevor eine Firma über Online-Offerten.ch Kundenanfragen erhalten kann, durchläuft sie einen <strong>strengen Prüf- und Verifizierungsprozess</strong>. So garantieren wir Ihnen höchste Qualität und Zuverlässigkeit.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
              {/* Left: Prüfprozess */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Unser Prüfprozess im Detail</h3>
                {[
                  {
                    step: "1",
                    title: "Pflicht: Betriebshaftpflichtversicherung",
                    description: "Jede Partnerfirma ist verpflichtet, eine gültige Betriebshaftpflichtversicherung nachzuweisen. Ohne diesen Nachweis ist es nicht möglich, Kundenanfragen zu erhalten.",
                    icon: FileText,
                    color: "bg-blue-100 text-blue-600"
                  },
                  {
                    step: "2",
                    title: "Manuelle Prüfung durch unser Team",
                    description: "Jedes eingereichte Versicherungsdokument wird von unseren Experten manuell geprüft – auf Gültigkeit, Deckungsumfang und Echtheit. Automatisierte Freigaben gibt es bei uns nicht.",
                    icon: Search,
                    color: "bg-amber-100 text-amber-600"
                  },
                  {
                    step: "3",
                    title: "Freigabe oder Ablehnung",
                    description: "Nur Firmen mit vollständiger und gültiger Versicherung werden freigeschaltet. Unvollständige oder ungültige Unterlagen führen zur sofortigen Ablehnung.",
                    icon: CheckCircle,
                    color: "bg-green-100 text-green-600"
                  },
                  {
                    step: "4",
                    title: "Kontinuierliche Überwachung",
                    description: "Wir überwachen die Gültigkeit aller Versicherungen laufend. Läuft eine Versicherung ab, wird die Firma automatisch gesperrt, bis ein aktueller Nachweis vorliegt.",
                    icon: Clock,
                    color: "bg-purple-100 text-purple-600"
                  }
                ].map((item, index) => {
                  const StepIcon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                        <StepIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: Trust Card */}
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-green-100">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
                    <ShieldCheck className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Verifiziert & versichert</h3>
                  <p className="text-gray-600">Jede aktive Partnerfirma ist vollständig geprüft</p>
                </div>
                <div className="space-y-4">
                  {[
                    "Gültige Betriebshaftpflichtversicherung nachgewiesen",
                    "Manuelle Dokumentenprüfung durch unser Team",
                    "Regelmässige Aktualisierung der Versicherungsnachweise",
                    "Sofortige Sperrung bei abgelaufener Versicherung",
                    "Maximale Transparenz und Sicherheit für Kunden"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-green-800 font-semibold">
                      🛡️ Ihr Schutz ist unsere Verantwortung
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      Wir vermitteln ausschliesslich Firmen, die unseren strengen Qualitäts- und Sicherheitsstandards entsprechen. So können Sie sich auf einen reibungslosen Ablauf verlassen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wer wir sind */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-5 gap-12 items-start">
              {/* Left: Content */}
              <div className="md:col-span-3">
                <div className="inline-flex items-center px-3 py-1 bg-green-50 border border-green-200 rounded-full text-green-700 font-semibold text-xs mb-4">
                  UNSERE GESCHICHTE
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Wer wir sind</h2>
                <div className="space-y-5 text-gray-700 leading-relaxed text-base md:text-lg">
                  <p>
                    Mit über <strong>6 Jahren Erfahrung</strong> in der Vermittlungsbranche verfolgen wir bei <strong>Online-Offerten.ch</strong> eine klare Mission: <strong>Die Suche nach Umzugsfirmen, Reinigungsfirmen und Malerbetrieben einfacher, transparenter und fairer zu gestalten.</strong>
                  </p>
                  <p>
                    Wer schon einmal einen Umzug organisiert oder eine Reinigungsfirma gesucht hat, kennt das Problem: Man verbringt Stunden damit, verschiedene Firmen einzeln zu suchen, anzurufen und Offerten anzufordern – ohne zu wissen, ob der Preis fair ist oder die Qualität stimmt.
                  </p>
                  <p>
                    <strong>Genau dieses Problem lösen wir.</strong> Mit einer einzigen Anfrage auf Online-Offerten.ch erhalten Sie bis zu 5 individuelle Offerten von geprüften Partnerfirmen aus Ihrer Region. Sie vergleichen die Angebote in Ruhe und entscheiden sich für die Firma, die am besten zu Ihnen passt – <strong>100 % kostenlos und unverbindlich</strong>.
                  </p>
                </div>
              </div>

              {/* Right: Key Facts Card */}
              <div className="md:col-span-2">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Auf einen Blick</h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Über 6 Jahre Erfahrung</p>
                        <p className="text-sm text-gray-600">Branchenkenntnis seit 2019</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Ganze Schweiz</p>
                        <p className="text-sm text-gray-600">Partner in allen Kantonen</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Layers className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">4 Dienstleistungen</p>
                        <p className="text-sm text-gray-600">Umzug, Reinigung, Maler, Räumung</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Geprüfte Partner</p>
                        <p className="text-sm text-gray-600">Qualität hat Priorität</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unsere Philosophie */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 bg-green-50 border border-green-200 rounded-full text-green-700 font-semibold text-xs mb-4">
                UNSERE PHILOSOPHIE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Fair für alle Beteiligten</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Uns liegen sowohl die Kundinnen und Kunden als auch die Partnerfirmen am Herzen.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Für Kunden */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Für Kunden</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Sie sparen Zeit und Geld, indem Sie mehrere Offerten mit nur einer Anfrage erhalten. Durch den transparenten Vergleich finden Sie den besten Preis bei der besten Qualität – ohne stundenlange Suche.
                </p>
                <ul className="space-y-2">
                  {['Bis zu 5 Offerten mit einer Anfrage', '100% kostenlos und unverbindlich', 'Geprüfte, regionale Firmen'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Für Partner */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-6">
                  <Handshake className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Für Partnerfirmen</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Jede Kundenanfrage wird an unser Partnernetzwerk weitergeleitet. Die ersten 5 Firmen, die sich für den Auftrag interessieren, erhalten die Möglichkeit, den Kunden direkt zu kontaktieren. Schnell sein lohnt sich!
                </p>
                <ul className="space-y-2">
                  {['Qualifizierte Anfragen aus der Region', 'Faire Chance auf jeden Auftrag', 'Keine Knebelverträge'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 max-w-3xl mx-auto">
              <div className="bg-green-600 rounded-2xl p-6 md:p-8 text-center">
                <p className="text-white text-base md:text-lg leading-relaxed">
                  <strong>Keine versteckten Kosten, keine Knebelverträge, keine Tricks</strong> – nur ehrliche Vermittlung mit echtem Mehrwert für alle Beteiligten.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Was uns unterscheidet */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 bg-green-50 border border-green-200 rounded-full text-green-700 font-semibold text-xs mb-4">
                UNSERE VORTEILE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Was uns unterscheidet</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Target,
                  title: "Maximal 5 Firmen",
                  description: "Ihre Anfrage geht an höchstens 5 passende Firmen. So bleiben die Chancen fair für alle Beteiligten.",
                  color: "bg-blue-100 text-blue-600"
                },
                {
                  icon: ShieldCheck,
                  title: "Geprüfte Partner",
                  description: "Jede Partnerfirma wird sorgfältig geprüft. Qualität und Zuverlässigkeit haben bei uns höchste Priorität.",
                  color: "bg-green-100 text-green-600"
                },
                {
                  icon: CheckCircle,
                  title: "100% kostenlos",
                  description: "Für Kunden ist unser Service vollständig kostenlos und unverbindlich. Keine versteckten Kosten.",
                  color: "bg-amber-100 text-amber-600"
                },
                {
                  icon: Layers,
                  title: "Alles an einem Ort",
                  description: "Umzug, Reinigung, Malerarbeiten, Räumung – alle Dienstleistungen rund um Ihr Zuhause vergleichen.",
                  color: "bg-purple-100 text-purple-600"
                }
              ].map((item, index) => {
                const IconComp = item.icon
                return (
                  <div 
                    key={index}
                    className="bg-gray-50 p-6 md:p-8 rounded-2xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                  >
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${item.color} mb-5`}>
                      <IconComp className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        
        {/* Wie es funktioniert */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 bg-green-50 border border-green-200 rounded-full text-green-700 font-semibold text-xs mb-4">
                SO EINFACH GEHT&apos;S
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Wie es funktioniert</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                In nur drei einfachen Schritten erhalten Sie passende Offerten von geprüften Firmen.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "1",
                  icon: FileText,
                  title: "Anfrage ausfüllen",
                  description: "Beschreiben Sie Ihr Projekt in unserem Formular. Je mehr Details Sie angeben, desto genauer werden die Offerten.",
                  color: "bg-blue-600"
                },
                {
                  step: "2",
                  icon: Search,
                  title: "Offerten erhalten",
                  description: "Ihre Anfrage wird an bis zu 5 passende Partnerfirmen in Ihrer Region weitergeleitet. Diese kontaktieren Sie direkt.",
                  color: "bg-green-600"
                },
                {
                  step: "3",
                  icon: CheckCircle,
                  title: "Vergleichen & wählen",
                  description: "Vergleichen Sie die Offerten in Ruhe. Die Entscheidung liegt bei Ihnen – 100% kostenlos und unverbindlich.",
                  color: "bg-amber-600"
                }
              ].map((step, index) => {
                const StepIcon = step.icon
                return (
                  <div 
                    key={index}
                    className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow"
                  >
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${step.color} mb-5`}>
                      <StepIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute top-4 right-4 text-5xl font-extrabold text-gray-100">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Unsere Dienstleistungen */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 bg-green-50 border border-green-200 rounded-full text-green-700 font-semibold text-xs mb-4">
                UNSERE SERVICES
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Unsere Dienstleistungen</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Wir vermitteln geprüfte Partnerfirmen für verschiedene Dienstleistungen in der ganzen Schweiz.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Truck,
                  title: "Umzüge",
                  description: "Privatumzüge, Geschäftsumzüge, internationale Umzüge und Spezialtransporte.",
                  link: "/umzugsfirma",
                  color: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                },
                {
                  icon: Sparkles,
                  title: "Reinigung",
                  description: "Wohnungsreinigung, Büroreinigung, Umzugsreinigung und weitere Reinigungsdienstleistungen.",
                  link: "/reinigung",
                  color: "bg-cyan-100 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white"
                },
                {
                  icon: Paintbrush,
                  title: "Malerarbeiten",
                  description: "Innen- und Aussenanstriche, Fassadenrenovation und Tapezierarbeiten.",
                  link: "/malerfirma",
                  color: "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white"
                },
                {
                  icon: Trash2,
                  title: "Räumung & Entsorgung",
                  description: "Professionelle Räumung und umweltgerechte Entsorgung von Möbeln und Abfällen.",
                  link: "/raeumung-entsorgung",
                  color: "bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white"
                }
              ].map((service, index) => {
                const ServiceIcon = service.icon
                return (
                  <Link
                    key={index}
                    href={service.link}
                    className="group bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl transition-colors ${service.color} mb-4`}>
                      <ServiceIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">{service.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">{service.description}</p>
                    <span className="text-green-600 text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Mehr erfahren <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Standorte */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 bg-green-50 border border-green-200 rounded-full text-green-700 font-semibold text-xs mb-4">
                REGIONALE ABDECKUNG
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Unsere Standorte</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Unser Partnernetzwerk erstreckt sich über alle Kantone der Schweiz.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
              {mainCities.map((city: any) => (
                <Link 
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="block bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 border border-gray-200 hover:border-green-300 px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {city.name}
                  </span>
                </Link>
              ))}
              <Link 
                href="/standorte"
                className="block bg-green-600 text-white hover:bg-green-700 px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200"
              >
                Alle Standorte →
              </Link>
            </div>
            <p className="text-center text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Egal ob Sie in Zürich, Bern, Basel, Luzern, Genf, Lausanne oder einer anderen Stadt wohnen – wir finden die passenden Dienstleister in Ihrer Region.
            </p>
          </div>
        </section>

        {/* Partner werden CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-green-600 to-green-700">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Sind Sie Dienstleister?</h2>
                <p className="text-lg text-green-100 mb-6 leading-relaxed">
                  Werden Sie Partner bei Online-Offerten.ch und erhalten Sie qualifizierte Kundenanfragen aus Ihrer Region. Erweitern Sie Ihre Reichweite und gewinnen Sie neue Aufträge.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Qualifizierte Anfragen aus Ihrer Region', 'Keine monatlichen Fixkosten', 'Einfache Registrierung in wenigen Minuten'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-white">
                      <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
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
              <div className="hidden md:flex justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 border border-white/20">
                  <Building2 className="w-24 h-24 text-white mx-auto mb-4" />
                  <p className="text-white text-center text-lg font-semibold">Partnerfirma werden</p>
                  <p className="text-green-200 text-center text-sm mt-1">Kostenlos registrieren</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        {state.reviews.length > 0 ? (
          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-3 py-1 bg-green-50 border border-green-200 rounded-full text-green-700 font-semibold text-xs mb-4">
                  KUNDENSTIMMEN
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Das sagen unsere Kunden
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Echte Erfahrungen von Menschen, die unseren Service genutzt haben.
                </p>
              </div>

              <div className="relative">
                <div 
                  ref={scrollContainerRef}
                  className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 -mb-8 gap-6 md:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  {state.reviews.map((review: any, index: number) => (
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

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Bereit für Ihren kostenlosen Vergleich?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Finden Sie in wenigen Minuten die besten Dienstleister für Ihr Vorhaben. Unverbindlich und unkompliziert – 100% kostenlos.
            </p>
            <Button
              size="lg"
              className="bg-green-600 text-white hover:bg-green-700 font-bold text-lg px-8 py-6"
              onClick={() => router.push('/kostenlose-offerte-anfordern')}
            >
              Jetzt kostenlose Offerten anfordern
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AboutPageClient
