'use client'

import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// Sadece kullanılan ikonları import et
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  MapPin
} from 'lucide-react';
// Framer Motion kaldırıldı - kullanılmıyor
// Supabase lazy loaded to reduce initial bundle size
import { formatDate, cn, getCustomerInitials } from '@/lib/utils';
import { getGermanServiceName } from '@/data/categories';
import { locations } from '@/data/locations';

const getCantonFlagSrc = (canton?: string): string => {
  switch ((canton || '').toUpperCase()) {
    case 'ZH':
      return '/kanton/zh.svg'
    case 'BE':
      return '/kanton/be.svg'
    case 'BS':
      return '/kanton/bs.svg'
    case 'LU':
      return '/kanton/lu.svg'
    case 'SG':
      return '/kanton/sg.svg'
    case 'AG':
      return '/kanton/ag.svg'
    case 'AI':
      return '/kanton/ai.svg'
    case 'AR':
      return '/kanton/ar.svg'
    case 'BL':
      return '/kanton/bl.svg'
    case 'FR':
      return '/kanton/fr.svg'
    case 'GE':
      return '/kanton/ge.svg'
    case 'GL':
      return '/kanton/gl.svg'
    case 'GR':
      return '/kanton/gr.svg'
    case 'JU':
      return '/kanton/ju.svg'
    case 'VD':
      return '/kanton/vd.svg'
    case 'NE':
      return '/kanton/ne.svg'
    case 'NW':
      return '/kanton/nw.svg'
    case 'OW':
      return '/kanton/ow.svg'
    case 'SH':
      return '/kanton/sh.svg'
    case 'SO':
      return '/kanton/so.svg'
    case 'SZ':
      return '/kanton/sz.svg'
    case 'TI':
      return '/kanton/ti.svg'
    case 'TG':
      return '/kanton/tg.svg'
    case 'UR':
      return '/kanton/ur.svg'
    case 'VS':
      return '/kanton/vs.svg'
    case 'ZG':
      return '/kanton/zg.svg'
    default:
      return '/kanton/ch.svg'
  }
}

const additionalHomeCantons = [
  { name: 'Uri', canton: 'UR' },
  { name: 'Schwyz', canton: 'SZ' },
  { name: 'Obwalden', canton: 'OW' },
  { name: 'Nidwalden', canton: 'NW' },
  { name: 'Glarus', canton: 'GL' },
  { name: 'Zug', canton: 'ZG' },
  { name: 'Fribourg', canton: 'FR' },
  { name: 'Solothurn', canton: 'SO' },
  { name: 'Basel-Landschaft', canton: 'BL' },
  { name: 'Schaffhausen', canton: 'SH' },
  { name: 'Graubünden', canton: 'GR' },
  { name: 'Thurgau', canton: 'TG' },
  { name: 'Neuchâtel', canton: 'NE' },
  { name: 'Jura', canton: 'JU' },
  { name: 'Valais', canton: 'VS' }
];

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

  // Exakte Sternfüllung: 4.8 => letzter Stern 80% gefüllt, 4.5 => 50%, 4.0 => 4 volle Sterne
  const displayRating = Math.max(0, Math.min(5, Number(rating) || 0))

  return (
    <div className="h-full">
      <Card className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/80 hover:shadow-lg dark:border-border dark:bg-card/95 dark:ring-white/10 dark:hover:border-emerald-800/70">
        <CardContent className="flex flex-grow flex-col p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-green-50 dark:from-emerald-950/50 dark:to-emerald-950/25 border border-green-200/80 dark:border-emerald-800/60 flex items-center justify-center shrink-0"
                aria-hidden
              >
                <span className="text-xs font-bold text-green-700 dark:text-emerald-300 tracking-tight select-none">
                  {getCustomerInitials(customer_name)}
                </span>
              </div>
              <div>
                <p className="font-bold text-gray-800 dark:text-foreground">{customer_name}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {city ? (
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-muted-foreground">
                      <MapPin className="w-3 h-3 text-green-600" />
                      <span>{city}</span>
                    </div>
                  ) : null}
                  {city ? (
                    <span className="text-xs text-gray-400 dark:text-muted-foreground/50" aria-hidden>
                      •
                    </span>
                  ) : null}
                  <span className="text-xs text-gray-500 dark:text-muted-foreground">{formatDate(review_date)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Yıldızlar - Yorumun üstünde */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => {
                const fillPercent = Math.max(0, Math.min(100, (displayRating - i) * 100))
                return (
                  <div key={i} className="relative w-4 h-4">
                    <Star size={16} className="absolute inset-0 text-gray-300 dark:text-muted-foreground/40" />
                    {fillPercent > 0 && (
                      <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <span className="font-bold text-base text-gray-900 dark:text-foreground">{displayRating.toFixed(2)}</span>
          </div>
          
          {review_text && (
            <p className="text-body italic mb-4">
              "{review_text}"
            </p>
          )}

          <div className="mt-auto pt-4 space-y-3 border-t border-gray-100 dark:border-border">
            <div className="flex flex-wrap items-center gap-2">
              {city && (
                <Badge variant="outline" className="bg-gray-50 border-gray-200 text-gray-700 font-medium dark:bg-muted dark:border-border dark:text-foreground">
                  <MapPin className="w-3 h-3 mr-1" />
                  {city}
                </Badge>
              )}
            {serviceName && (
              <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700 font-medium dark:bg-emerald-950/40 dark:border-emerald-800/60 dark:text-emerald-300">
                {serviceName}
              </Badge>
            )}
            </div>
            {partner && partner.slug ? (
              <p className="text-xs text-gray-500 dark:text-muted-foreground">
                Für Firma:{' '}
                <Button asChild variant="link" className="p-0 h-auto text-xs">
                  <Link href={`/partner/${partner.slug}`} className="text-gray-900 hover:underline font-bold dark:text-foreground">
                    {partner_name || partner.company_name}
                  </Link>
                </Button>
              </p>
            ) : null}
        </div>
      </CardContent>
    </Card>
    </div>
  );
});

ReviewCard.displayName = 'ReviewCard';

// Post Card Component
interface PostCardProps {
  post: any;
}

const PostCard = memo(({ post }: PostCardProps) => {
  if (!post?.slug) return null;
  
  const excerpt = post.meta_description || "Lesen Sie mehr...";
  const tags = Array.isArray(post.tags) ? post.tags : [];
  const postUrl = `/ratgeber/${post.slug}`;

  const getReadMoreText = (post: any) => {
    if (post.read_more_text && post.read_more_text.trim() !== '') {
      return post.read_more_text;
    }
    return `${post.title} - Weiterlesen`;
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden border-border bg-card transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-border">
      <Link href={postUrl} className="block group">
        <div className="aspect-video overflow-hidden relative">
          <NextImage 
            src={post.featured_image_url || "https://images.unsplash.com/photo-1504983875-d3b163aba9e6"} 
            alt={post.title} 
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105" 
            loading="lazy" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <CardContent className="p-6 flex flex-col flex-grow">
        {post.category && <Badge variant="secondary" className="mb-2 self-start">{post.category}</Badge>}
        <h3 className="text-xl font-bold mb-2 text-gray-900 flex-grow group-hover:text-green-700 dark:text-foreground dark:group-hover:text-emerald-400">
          <Link href={postUrl}>{post.title}</Link>
        </h3>
        <p className="text-gray-700 text-sm mb-4 dark:text-muted-foreground">{excerpt}</p>
        <div className="mt-auto">
          <Button asChild variant="link" className="p-0 self-start text-green-700 hover:text-green-800 font-semibold dark:text-emerald-400 dark:hover:text-emerald-300">
            <Link href={postUrl}>
              {getReadMoreText(post)} <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

PostCard.displayName = 'PostCard';

interface HomePageClientProps {
  initialReviews?: any[];
  initialPosts?: any[];
}

const HomePageClient = ({ initialReviews = [], initialPosts = [] }: HomePageClientProps) => {
  const router = useRouter();
  // State'leri birleştir - daha az re-render
  const [state, setState] = useState({
    isMounted: false,
    reviews: initialReviews,
    reviewsLoading: false,
    posts: initialPosts,
    postsLoading: false,
    canScrollLeft: false,
    canScrollRight: true,
    canScrollLeftPosts: false,
    canScrollRightPosts: false,
    selectedCategory: 'Alle' as string,
    visiblePostsCount: 6
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const postsScrollRef = useRef<HTMLDivElement>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setState(prev => ({ ...prev, isMounted: true }));
  }, []);


  // Scroll handlers - optimized with useCallback (defined before useEffects that use them)
  const getVisibleCardsCount = useCallback(() => {
    if (typeof window === 'undefined') return 1;
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 640) return 2;
    return 1;
  }, []);

  // Throttle function for scroll events (better mobile performance)
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

  // Scroll handler
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setState(prev => ({
      ...prev,
      canScrollLeft: el.scrollLeft > 0,
      canScrollRight: el.scrollLeft < el.scrollWidth - el.clientWidth - 1
    }));
  }, []);

  // Throttled scroll handler (100ms throttle for mobile performance)
  const throttledHandleScroll = useMemo(() => throttle(handleScroll, 100), [handleScroll, throttle]);

  // Posts scroll handler
  const handlePostsScroll = useCallback(() => {
    const el = postsScrollRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth;
    setState(prev => ({
      ...prev,
      canScrollLeftPosts: el.scrollLeft > 0,
      canScrollRightPosts: hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 1
    }));
  }, []);

  // Throttled posts scroll handler (100ms throttle for mobile performance)
  const throttledHandlePostsScroll = useMemo(() => throttle(handlePostsScroll, 100), [handlePostsScroll, throttle]);

  // Throttled scroll event listeners for better mobile performance
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', throttledHandleScroll, { passive: true });
      window.addEventListener('resize', throttledHandleScroll, { passive: true });
      return () => {
        el.removeEventListener('scroll', throttledHandleScroll);
        window.removeEventListener('resize', throttledHandleScroll);
      };
    }
  }, [throttledHandleScroll]);

  useEffect(() => {
    const el = postsScrollRef.current;
    if (el && state.posts.length > 0) {
      handlePostsScroll();
      el.addEventListener('scroll', throttledHandlePostsScroll, { passive: true });
      window.addEventListener('resize', throttledHandlePostsScroll, { passive: true });
      return () => {
        el.removeEventListener('scroll', throttledHandlePostsScroll);
        window.removeEventListener('resize', throttledHandlePostsScroll);
      };
    }
  }, [state.posts.length, handlePostsScroll, throttledHandlePostsScroll]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.9;
      el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  }, []);

  const scrollPosts = useCallback((direction: 'left' | 'right') => {
    const el = postsScrollRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.85;
      el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  }, []);

  const visibleCards = useMemo(() => getVisibleCardsCount(), [getVisibleCardsCount]);

  // useMemo ile filtered posts
  const filteredPosts = useMemo(() => {
    if (state.selectedCategory === 'Alle') return state.posts;
    const formatCategory = (cat: string) => {
      if (!cat) return '';
      return cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
    };
    return state.posts.filter((p: any) => formatCategory(p.category) === state.selectedCategory);
  }, [state.posts, state.selectedCategory]);

  const uniqueCategories = useMemo(() => {
    const cats = Array.from(new Set(state.posts.map((p: any) => p.category).filter(Boolean)));
    const formatCategory = (cat: string) => {
      if (!cat) return '';
      return cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
    };
    return ['Alle', ...cats.map(formatCategory)];
  }, [state.posts]);

  const homeLocationItems = useMemo(() => {
    const linkedLocations = locations
      .filter((city) => city?.slug)
      .map((city) => ({ ...city, isLinked: true }));

    const existingCantons = new Set(linkedLocations.map((item) => item.canton));
    const unlinkedCantons = additionalHomeCantons
      .filter((item) => !existingCantons.has(item.canton))
      .map((item) => ({
        ...item,
        slug: null,
        isLinked: false
      }));

    return [...linkedLocations, ...unlinkedCantons];
  }, []);

  return (
    <>
        
          {/* Customer Reviews Section */}
          {state.reviews.length > 0 ? (
            <section className="border-t border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-white py-16 dark:border-border dark:from-background dark:via-muted/20 dark:to-background md:py-24">
              <div className="container mx-auto max-w-navbar px-4 md:px-6">
                <div className="mb-12 text-center">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                    Stimmen
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-foreground md:text-3xl">
                    Das sagen unsere Kundinnen &amp; Kunden
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-muted-foreground md:text-lg">
                    Echte Bewertungen – transparent und nachvollziehbar.
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
                      "absolute top-1/2 -translate-y-1/2 -left-4 z-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white hidden md:flex transition-opacity duration-300 dark:bg-card/90 dark:hover:bg-card",
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
                      "absolute top-1/2 -translate-y-1/2 -right-4 z-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white hidden md:flex transition-opacity duration-300 dark:bg-card/90 dark:hover:bg-card",
                      state.canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>

                {/* Alle Bewertungen anzeigen Button */}
                <div className="text-center mt-8">
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-xl border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 shadow-sm hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-border dark:bg-card dark:text-foreground dark:hover:border-emerald-700 dark:hover:bg-emerald-950/30"
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

          {/* Nationwide Presence Section */}
          <section className="relative overflow-hidden border-t border-slate-200/80 bg-slate-50 py-16 dark:border-border dark:bg-muted/20 md:py-20">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute right-10 top-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
              <div className="absolute bottom-20 left-10 h-96 w-96 rounded-full bg-teal-400/15 blur-3xl" />
            </div>

            <div className="container relative z-10 mx-auto max-w-navbar px-4 md:px-6">
              <div className="mx-auto max-w-4xl text-center">
                <div className="mb-10">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                    Standorte
                  </p>
                  <div className="mt-3 flex flex-col items-center gap-3 md:flex-row md:justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-md ring-1 ring-slate-200/80 dark:bg-card dark:text-emerald-400 dark:ring-border">
                      <MapPin className="h-6 w-6 md:h-7 md:w-7" />
                    </div>
                    <h2 className="max-w-3xl text-2xl font-semibold tracking-tight text-slate-950 dark:text-foreground md:text-3xl md:leading-tight">
                      In der ganzen Schweiz: geprüfte Anbieter für Umzug, Reinigung &amp; Malerarbeiten
                    </h2>
                  </div>
                  <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-muted-foreground md:text-lg">
                    Von Zürich und Bern bis Lausanne, Lugano und in die Ostschweiz –{' '}
                    <span className="font-semibold text-emerald-800 dark:text-emerald-400">regional stark vernetzt</span>.
                  </p>
                </div>
                <div className="mx-auto mb-10 max-w-4xl">
                  <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
                    {homeLocationItems.map((item) => {
                      const cardClassName =
                        'flex items-center justify-between rounded-xl border border-slate-200/90 bg-white/90 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-900/[0.02] transition-all duration-200 dark:border-border dark:bg-card/90 dark:text-foreground dark:ring-white/5 md:text-base';

                      const cardContent = (
                        <>
                          <span className="inline-flex items-center gap-2">
                            <span
                              aria-hidden="true"
                              className="w-6 h-4 rounded-sm border border-gray-200 shadow-sm flex-shrink-0 overflow-hidden dark:border-border"
                            >
                              <img
                                src={getCantonFlagSrc(item.canton)}
                                alt={`${item.canton} Kantonsflagge`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </span>
                            <span>{item.name}</span>
                          </span>
                          <span className="text-xs md:text-sm bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-bold dark:bg-muted dark:text-foreground">
                            {item.canton}
                          </span>
                        </>
                      );

                      if (item.isLinked && item.slug) {
                        return (
                          <Link
                            key={item.slug}
                            href={`/umzugsfirma/${item.slug}`}
                            className={`${cardClassName} hover:border-emerald-300 hover:bg-emerald-50/60 hover:shadow-md dark:hover:border-emerald-700 dark:hover:bg-emerald-950/35`}
                          >
                            {cardContent}
                          </Link>
                        );
                      }

                      return (
                        <div key={item.canton} className={cardClassName}>
                          {cardContent}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <p className="mb-4 text-base font-medium leading-relaxed text-slate-600 dark:text-muted-foreground md:text-lg">
                  Mit einer Anfrage mehrere passende Offerten – Leistungen transparent vergleichen und den richtigen Partner wählen.
                </p>
                <p className="text-lg font-semibold text-slate-800 dark:text-foreground">
                  Jetzt starten und den idealen Anbieter finden.
                </p>
              </div>
            </div>
          </section>

          {/* Partner werden Section */}
          <section className="border-t border-slate-200/80 bg-white py-16 dark:border-border dark:bg-background md:py-24">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="space-y-6">
                  <div>
                    <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                      Partnerprogramm
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-foreground md:text-3xl">
                      Sind Sie Dienstleister?
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-muted-foreground md:text-lg">
                      Wir verbinden Sie mit Auftraggebern in Ihrer Region. Reichweite erhöhen, qualifizierte Anfragen erhalten.
                    </p>
                  </div>
                  <Button
                    asChild
                    size="lg"
                    className="rounded-xl border-2 border-emerald-600 bg-white px-8 py-6 text-lg font-semibold text-emerald-700 shadow-sm hover:bg-emerald-50 dark:bg-card dark:text-emerald-300 dark:hover:bg-emerald-950/40"
                  >
                    <Link href="/partner-werden" className="inline-flex items-center">
                      Jetzt Partner werden
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>

                {/* Right Side - Image Collage */}
                <div className="relative">
                  <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/90 shadow-[0_24px_48px_-24px_rgba(15,23,42,0.2)] ring-1 ring-slate-900/[0.04] dark:border-border dark:ring-white/10">
                    <NextImage
                      src="/image/c6bed9bf-0e88-4eaf-b57f-0938374cdb53.webp"
                      alt="Partner werden"
                      width={600}
                      height={600}
                      className="h-full w-full object-cover"
                      priority={false}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Useful Tools Section */}
          <section className="border-t border-slate-200/80 bg-slate-50/40 py-16 dark:border-border dark:bg-muted/15 md:py-24">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
              <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="space-y-6">
                  <div>
                    <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                      Tools &amp; Ratgeber
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-foreground md:text-3xl md:leading-tight">
                      Planen Sie Umzug &amp; Reinigung mit klaren Hilfsmitteln
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-muted-foreground md:text-lg">
                      Rechner und Checklisten für realistische Kosten und ruhigere Abläufe.
                    </p>
                  </div>
                  <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/90 shadow-md ring-1 ring-slate-900/[0.03] dark:border-border dark:ring-white/10">
                    <NextImage
                      src="/fotos/182259.webp"
                      alt="Nützliche Helfer für Ihren Umzug und Reinigung"
                      width={500}
                      height={300}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Right Side - Tool Cards (3 cards stacked) */}
                <div className="space-y-6">
                  {[
                    { title: 'Umzugskosten-Rechner', description: 'Erhalten Sie in wenigen Schritten eine unverbindliche Schätzung Ihrer Umzugskosten.', linkTo: '/umzugsfirma/umzugskosten', button: 'Jetzt berechnen' },
                    { title: 'Reinigungskosten-Rechner', description: 'Kalkulieren Sie schnell und einfach die Kosten für Ihre Umzugsreinigung.', linkTo: '/reinigung/reinigungskosten', button: 'Kosten berechnen' },
                    { title: 'Umzugs-Checklisten', description: 'Behalten Sie jederzeit den Überblick mit unseren übersichtlichen Umzugs-Checklisten. Unsere Checklisten beantworten zudem häufig gestellte Fragen rund um die Umzugsplanung.', linkTo: '/umzugsfirma/checklists', button: 'Checkliste ansehen' }
                  ].map((tool) => (
                    <Link key={tool.title} href={tool.linkTo} className="group block">
                      <Card className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-md ring-1 ring-slate-900/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200/90 hover:shadow-lg dark:border-border dark:bg-card/95 dark:ring-white/10 dark:hover:border-emerald-800/70">
                        <CardContent className="p-6">
                          <h3 className="mb-3 text-xl font-semibold text-slate-900 transition-colors group-hover:text-emerald-700 dark:text-foreground dark:group-hover:text-emerald-400">
                            {tool.title}
                          </h3>
                          <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-muted-foreground">
                            {tool.description}
                          </p>
                          <Button
                            variant="outline"
                            className="w-full rounded-xl border-emerald-600/80 font-semibold text-emerald-800 hover:bg-emerald-50 dark:border-emerald-500/50 dark:text-emerald-300 dark:hover:bg-emerald-950/40"
                          >
                            {tool.button}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>


          {/* Ratgeber Section */}
          {state.posts.length > 0 ? (
            <section className="border-t border-slate-200/80 bg-white py-12 dark:border-border dark:bg-background md:py-24">
              <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                <div className="mb-10">
                  <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                    Wissen
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-foreground md:text-3xl">
                    Unser Ratgeber
                  </h2>
                </div>

                {/* Category Filter */}
                {(() => {
                  // uniqueCategories ve filteredPosts artık useMemo ile hesaplanıyor

                  return (
                    <>
                      <div className="flex flex-wrap gap-3 mb-8">
                        {uniqueCategories.map((category) => (
                          <button
                            key={category}
                            onClick={() => setState(prev => ({ ...prev, selectedCategory: category, visiblePostsCount: 6 }))}
                            className={cn(
                              'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                              state.selectedCategory === category
                                ? 'bg-emerald-600 text-white shadow-md'
                                : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-border dark:bg-card dark:text-foreground dark:hover:border-muted-foreground/40'
                            )}
                          >
                            {category}
                          </button>
                        ))}
                      </div>

                      {/* Articles Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredPosts.slice(0, state.visiblePostsCount).map((post: any) => {
                          const postUrl = `/ratgeber/${post.slug}`;

                          return (
                            <Link key={post.id} href={postUrl} className="group block h-full">
                              <Card className="flex h-full min-h-[9.5rem] flex-row overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90 shadow-[0_2px_24px_-6px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.035] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200/70 hover:shadow-[0_18px_42px_-14px_rgba(15,23,42,0.14)] dark:border-border dark:bg-card/95 dark:shadow-[0_2px_28px_-8px_rgba(0,0,0,0.45)] dark:ring-white/[0.06] dark:hover:border-emerald-800/55">
                                <div className="relative w-[8.25rem] flex-shrink-0 self-stretch sm:w-40">
                                  <NextImage
                                    src={post.featured_image_url || "https://images.unsplash.com/photo-1504983875-d3b163aba9e6"}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.04] group-hover:brightness-[1.02]"
                                    loading="lazy"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    priority={false}
                                  />
                                  <div
                                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-slate-950/5 to-transparent opacity-80 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-100 dark:from-black/50 dark:via-black/10"
                                    aria-hidden
                                  />
                                </div>
                                <CardContent className="flex flex-1 flex-col justify-center gap-1.5 p-4 sm:gap-2 sm:p-6 sm:pl-5">
                                  <Badge
                                    variant="outline"
                                    className="mb-0.5 w-fit border-emerald-200/90 bg-emerald-50/80 px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-emerald-900 shadow-none dark:border-emerald-800/60 dark:bg-emerald-950/35 dark:text-emerald-200"
                                  >
                                    {post.category || 'Ratgeber'}
                                  </Badge>
                                  <h3 className="line-clamp-2 text-base font-semibold leading-snug tracking-tight text-slate-950 transition-colors group-hover:text-emerald-800 dark:text-foreground dark:group-hover:text-emerald-300 sm:text-lg">
                                    {post.title}
                                  </h3>
                                  <p className="line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-muted-foreground">
                                    {post.meta_description || ''}
                                  </p>
                                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-800/85 transition-colors duration-200 group-hover:text-emerald-800 dark:text-emerald-400/90 dark:group-hover:text-emerald-300">
                                    Zum Artikel
                                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                                  </span>
                                </CardContent>
                              </Card>
                            </Link>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}

                {/* Mehr Ratgeber anzeigen Button */}
                {filteredPosts.length > state.visiblePostsCount && (
                  <div className="mt-10 text-center">
                    <Button
                      variant="outline"
                      size="lg"
                      className="group rounded-xl border-emerald-600 font-semibold text-emerald-700 hover:bg-emerald-600 hover:text-white dark:border-emerald-500 dark:text-emerald-300 dark:hover:bg-emerald-600 dark:hover:text-white"
                      onClick={() => setState(prev => ({ ...prev, visiblePostsCount: prev.visiblePostsCount + 6 }))}
                    >
                      Weitere Ratgeber-Artikel anzeigen
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                )}
              </div>
            </section>
          ) : null}
    </>
  );
};

export default HomePageClient;



