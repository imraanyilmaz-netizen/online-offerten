'use client'

import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Users, HeartHandshake as Handshake, Target, Layers, Star, 
  Truck, Sparkles, Trash2, Paintbrush, ChevronLeft, ChevronRight, 
  ArrowRight, MapPin, CheckCircle, Building2, ShieldCheck, 
  Clock, FileText, Search, Award, ChevronRight as ChevronRightIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { formatDate, cn, getCustomerInitials } from '@/lib/utils'
import { getGermanServiceName } from '@/data/categories'
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
    partners: rawPartners,
  } = review
  const partner = Array.isArray(rawPartners) ? rawPartners[0] : rawPartners

  const serviceName = getGermanServiceName(service_type);
  const displayRating = rating || 0
  const fullStars = Math.floor(displayRating)
  const decimalPart = displayRating % 1
  const hasHalfStar = decimalPart >= 0.25 && decimalPart < 0.75
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="h-full">
      <Card className="flex flex-col h-full bg-card shadow-lg rounded-xl overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 border border-border">
        <CardContent className="p-6 flex-grow flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/60 dark:to-green-950/40 border border-green-200/80 dark:border-green-800/80 flex items-center justify-center shrink-0"
                aria-hidden
              >
                <span className="text-xs font-bold text-green-700 dark:text-green-300 tracking-tight select-none">
                  {getCustomerInitials(customer_name)}
                </span>
              </div>
              <div>
                <p className="font-bold text-foreground">{customer_name}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {city ? (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3 text-green-600" />
                      <span>{city}</span>
                    </div>
                  ) : null}
                  {city ? (
                    <span className="text-xs text-muted-foreground/70" aria-hidden>
                      •
                    </span>
                  ) : null}
                  <span className="text-xs text-muted-foreground">{formatDate(review_date)}</span>
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
                  <Star size={16} className="text-muted-foreground/45" />
                  <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
              )}
              {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} size={16} className="text-muted-foreground/45" />
              ))}
            </div>
            <span className="font-bold text-base text-foreground">{displayRating.toFixed(2)}</span>
          </div>
          
          {review_text && (
            <p className="text-muted-foreground text-sm italic mb-4">
              &quot;{review_text}&quot;
            </p>
          )}

          <div className="mt-auto pt-4 space-y-3 border-t border-border">
            <div className="flex flex-wrap items-center gap-2">
              {city && (
                <Badge variant="outline" className="bg-muted/40 border-border text-muted-foreground font-medium">
                  <MapPin className="w-3 h-3 mr-1" />
                  {city}
                </Badge>
              )}
              {serviceName && (
                <Badge variant="outline" className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 font-medium">
                  {serviceName}
                </Badge>
              )}
              {partner && partner.slug ? (
                <p className="text-xs text-muted-foreground">
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

  const mainCities = locations
  
  return (
    <div className="bg-background">
      <main>
        {/* Hero Section with Image */}
        <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-muted/40 via-card to-green-50/80 dark:from-background dark:via-card dark:to-green-950/40">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-green-600 transition-colors">Startseite</Link>
                </li>
                <li><ChevronRightIcon className="w-4 h-4 text-muted-foreground/70" /></li>
                <li className="text-foreground font-medium" aria-current="page">Über uns</li>
              </ol>
            </nav>

            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              {/* Left: Text */}
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold text-sm mb-4">
                  <Award className="h-4 w-4 mr-2" />
                  Unabhängiges Vergleichsportal
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6 leading-tight">
                  Über Online-Offerten.ch
                </h1>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
                  Wir sind eine <strong>unabhängige Schweizer Vergleichsplattform</strong> für Umzug, Reinigung und Malerarbeiten. Mit einer einzigen Anfrage erhalten Sie <strong>bis zu 5 kostenlose Offerten</strong> von geprüften Partnerfirmen in Ihrer Region.
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>100% kostenlos</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Geprüfte Versicherung</span>
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
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-border">
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
        <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-card dark:from-green-950/30 dark:via-emerald-950/25 dark:to-background">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-full text-green-700 dark:text-green-300 font-semibold text-xs mb-4">
                IHRE SICHERHEIT
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Nur geprüfte & versicherte Partnerfirmen
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Ihre Sicherheit bei der Versicherung der Partner steht bei uns an erster Stelle: Bevor eine Firma über Online-Offerten.ch Kundenanfragen erhalten kann, müssen <strong>Versicherungsnachweise</strong> (Betriebshaftpflicht) eingereicht werden – <strong>diese Dokumente prüfen wir manuell</strong>. Eine umfassende Qualitäts- oder Betriebsprüfung der Firmen führen wir nicht durch; die Wahl des Anbieters treffen Sie selbst.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
              {/* Left: Prüfprozess */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground mb-2">Unser Prüfprozess im Detail</h3>
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
                    description: "Jedes eingereichte Versicherungsdokument wird von uns manuell geprüft – auf Gültigkeit, Deckungsumfang und Echtheit. Automatisierte Freigaben gibt es bei uns nicht.",
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
                    <div key={index} className="flex items-start gap-4 bg-card rounded-xl p-4 shadow-sm border border-border">
                      <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                        <StepIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-foreground mb-1">{item.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: Trust Card */}
              <div className="bg-card rounded-2xl p-8 md:p-10 shadow-xl border border-green-100 dark:border-green-900/60">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
                    <ShieldCheck className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Versicherte Partner</h3>
                  <p className="text-muted-foreground">Jede aktive Partnerfirma weist einen geprüften Versicherungsnachweis nach</p>
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
                      <span className="text-muted-foreground font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="bg-green-50 dark:bg-green-950/40 rounded-xl p-4 text-center">
                    <p className="text-sm text-green-800 dark:text-green-200 font-semibold">
                      🛡️ Ihr Schutz ist unsere Verantwortung
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-300/90 mt-1">
                      Wir vermitteln Firmen, deren Versicherungsnachweise unseren Anforderungen entsprechen. Die Beurteilung von Preis, Leistung und Zuverlässigkeit obliegt Ihnen beim Vergleich der Offerten.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wer wir sind */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid md:grid-cols-5 gap-12 items-start">
              {/* Left: Content */}
              <div className="md:col-span-3">
                <div className="inline-flex items-center px-3 py-1 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-full text-green-700 dark:text-green-300 font-semibold text-xs mb-4">
                  UNSERE GESCHICHTE
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Wer wir sind</h2>
                <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
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
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/30 rounded-2xl p-8 border border-green-100 dark:border-green-900/50">
                  <h3 className="text-xl font-bold text-foreground mb-6">Auf einen Blick</h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-950/60 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Über 6 Jahre Erfahrung</p>
                        <p className="text-sm text-muted-foreground">Branchenkenntnis seit 2019</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-950/60 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Ganze Schweiz</p>
                        <p className="text-sm text-muted-foreground">Partner in allen Kantonen</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-950/60 flex items-center justify-center flex-shrink-0">
                        <Layers className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">4 Dienstleistungen</p>
                        <p className="text-sm text-muted-foreground">Umzug, Reinigung, Maler, Räumung</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-950/60 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Geprüfte Partner</p>
                        <p className="text-sm text-muted-foreground">Qualität hat Priorität</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unsere Philosophie */}
        <section className="py-16 md:py-24 bg-muted/40">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-full text-green-700 dark:text-green-300 font-semibold text-xs mb-4">
                UNSERE PHILOSOPHIE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Fair für alle Beteiligten</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Uns liegen sowohl die Kundinnen und Kunden als auch die Partnerfirmen am Herzen.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Für Kunden */}
              <div className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Für Kunden</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Sie sparen Zeit und Geld, indem Sie mehrere Offerten mit nur einer Anfrage erhalten. Durch den transparenten Vergleich finden Sie den besten Preis bei der besten Qualität – ohne stundenlange Suche.
                </p>
                <ul className="space-y-2">
                  {['Bis zu 5 Offerten mit einer Anfrage', '100% kostenlos und unverbindlich', 'Geprüfte, regionale Firmen'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Für Partner */}
              <div className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-6">
                  <Handshake className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Für Partnerfirmen</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Jede Kundenanfrage wird an unser Partnernetzwerk weitergeleitet. Die ersten 5 Firmen, die sich für den Auftrag interessieren, erhalten die Möglichkeit, den Kunden direkt zu kontaktieren. Schnell sein lohnt sich!
                </p>
                <ul className="space-y-2">
                  {['Qualifizierte Anfragen aus der Region', 'Faire Chance auf jeden Auftrag', 'Keine Knebelverträge'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
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
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-full text-green-700 dark:text-green-300 font-semibold text-xs mb-4">
                UNSERE VORTEILE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Was uns unterscheidet</h2>
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
                  title: "Geprüfte Versicherungsnachweise",
                  description: "Bei der Registrierung prüfen wir die eingereichten Versicherungsdokumente (z. B. Betriebshaftpflicht). Die Firmenauswahl und Qualitätsbeurteilung treffen Sie beim Offertenvergleich.",
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
                    className="bg-muted/40 p-6 md:p-8 rounded-2xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border"
                  >
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${item.color} mb-5`}>
                      <IconComp className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        
        {/* Wie es funktioniert */}
        <section className="py-16 md:py-24 bg-muted/40">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-full text-green-700 dark:text-green-300 font-semibold text-xs mb-4">
                SO EINFACH GEHT&apos;S
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Wie es funktioniert</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
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
                    className="relative bg-card rounded-2xl p-8 shadow-sm border border-border text-center hover:shadow-lg transition-shadow"
                  >
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${step.color} mb-5`}>
                      <StepIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute top-4 right-4 text-5xl font-extrabold text-muted-foreground/20">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Unsere Dienstleistungen */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-full text-green-700 dark:text-green-300 font-semibold text-xs mb-4">
                UNSERE SERVICES
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Unsere Dienstleistungen</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
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
                    className="group bg-muted/40 p-6 rounded-2xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl transition-colors ${service.color} mb-4`}>
                      <ServiceIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-green-600 transition-colors">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">{service.description}</p>
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
        <section className="py-16 md:py-24 bg-muted/40">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-full text-green-700 dark:text-green-300 font-semibold text-xs mb-4">
                REGIONALE ABDECKUNG
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Unsere Standorte</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Unser Partnernetzwerk erstreckt sich über alle Kantone der Schweiz.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
              {mainCities.map((city: any) => (
                <Link 
                  key={city.slug}
                  href={`/umzugsfirma/${city.slug}`}
                  className="block bg-card hover:bg-muted/80 dark:hover:bg-green-950/40 text-muted-foreground hover:text-green-700 dark:hover:text-green-300 border border-border hover:border-green-300/80 dark:hover:border-green-700 px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200"
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
            <p className="text-center text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
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
                  className="bg-card text-green-700 hover:bg-muted font-bold text-lg px-8 py-6"
                >
                  <Link href="/partner-werden" className="inline-flex items-center gap-2">
                    Jetzt Partner werden
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="bg-card/10 backdrop-blur-sm rounded-2xl p-10 border border-white/20">
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
          <section className="py-16 md:py-24 bg-card">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-3 py-1 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-full text-green-700 dark:text-green-300 font-semibold text-xs mb-4">
                  KUNDENSTIMMEN
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Das sagen unsere Kunden
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                    "absolute top-1/2 -translate-y-1/2 -left-4 z-10 rounded-full bg-card/80 backdrop-blur-sm shadow-lg hover:bg-card hidden md:flex transition-opacity duration-300",
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
                    "absolute top-1/2 -translate-y-1/2 -right-4 z-10 rounded-full bg-card/80 backdrop-blur-sm shadow-lg hover:bg-card hidden md:flex transition-opacity duration-300",
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
                  className="bg-card hover:bg-muted/40 border-border text-foreground font-semibold px-6 py-3"
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
        <section className="bg-card py-14 md:py-20">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="relative overflow-hidden rounded-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/fotos/offerten.webp')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/45" />

              <div className="relative z-10 grid lg:grid-cols-3 gap-6 lg:gap-10 items-center p-6 md:p-8">
                <div className="lg:col-span-2 text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Das passende Umzugsunternehmen finden mit Online-offerten.ch
                  </h2>
                  <p className="text-lg text-white/90 max-w-2xl">
                    Finden Sie in wenigen Minuten die besten Dienstleister für Ihr Vorhaben. Unverbindlich und unkompliziert - 100% kostenlos.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-5 md:p-6 shadow-lg">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-6 whitespace-nowrap"
                  >
                    <Link href="/kostenlose-offerte-anfordern">
                      Kostenlose Offerten anfordern
                    </Link>
                  </Button>
                  <p className="text-muted-foreground text-base leading-relaxed mt-4">
                    Schnell, kostenlos und unverbindlich.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AboutPageClient
