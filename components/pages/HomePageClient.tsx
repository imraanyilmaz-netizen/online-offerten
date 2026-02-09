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
  User, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  MapPin
} from 'lucide-react';
// Framer Motion kaldırıldı - kullanılmıyor
// Supabase lazy loaded to reduce initial bundle size
import { formatDate, cn } from '@/lib/utils';
import { getGermanServiceName } from '@/src/lib/dataMapping.js';
import { locations } from '@/data/locations';

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

  // Dinamik yıldız hesaplama - Platform yorumları için sadece rating değeri kullanılır
  // Veritabanından gelen rating değerine göre yıldızlar dinamik hesaplanır
  const displayRating = rating || 0
  const fullStars = Math.floor(displayRating)
  const decimalPart = displayRating % 1
  // 0.25-0.74 arası yarım yıldız, 0.75+ bir sonraki tam yıldıza yakın (tam yıldız sayılır)
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
            <p className="text-body italic mb-4">
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
            </div>
            {partner && partner.slug ? (
              <p className="text-xs text-gray-500">
                Für Firma:{' '}
                <Button asChild variant="link" className="p-0 h-auto text-xs">
                  <Link href={`/partner/${partner.slug}`} className="text-gray-900 hover:underline font-bold">
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
    <Card className="flex flex-col h-full overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
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
        <h3 className="text-xl font-bold mb-2 text-gray-900 flex-grow group-hover:text-green-700">
          <Link href={postUrl}>{post.title}</Link>
        </h3>
        <p className="text-gray-700 text-sm mb-4">{excerpt}</p>
        <div className="mt-auto">
          <Button asChild variant="link" className="p-0 self-start text-green-700 hover:text-green-800 font-semibold">
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
    selectedCategory: 'Alle' as string
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

  return (
    <>
        
          {/* Customer Reviews Section */}
          {state.reviews.length > 0 ? (
            <section className="py-16 md:py-24 bg-slate-50">
              <div className="container mx-auto max-w-navbar px-4 md:px-6">
                <div className="text-center mb-12">
                  <h2 className="heading-2">
                    Das sagen unsere Kundinnen & Kunden
                  </h2>
                  <p className="mt-4 text-body max-w-2xl mx-auto">
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

                {/* Alle Bewertungen anzeigen Button */}
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

          {/* Partner werden Section */}
          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Side - Text Content */}
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-2">
                      Werden Sie Partner bei Online-Offerten.ch
                    </p>
                    <h2 className="heading-2">
                      Sind Sie Dienstleister?
                    </h2>
                    <p className="text-body leading-relaxed">
                      Wir verbinden Sie mit potenziellen Kunden in Ihrer Region, die genau Ihre Dienstleistungen suchen. Erweitern Sie Ihre Reichweite und gewinnen Sie neue Aufträge
                    </p>
                  </div>
                  <Button asChild size="lg" className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 text-lg font-semibold">
                    <Link href="/partner-werden" className="inline-flex items-center">
                      Jetzt Partner werden
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>

                {/* Right Side - Image Collage */}
                <div className="relative">
                  <div className="relative w-full aspect-square max-w-md mx-auto">
                    <NextImage
                      src="/image/c6bed9bf-0e88-4eaf-b57f-0938374cdb53.webp"
                      alt="Partner werden"
                      width={600}
                      height={600}
                      className="w-full h-full object-cover rounded-2xl"
                      priority={false}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Nationwide Presence Section */}
          <section className="py-[50px] bg-gradient-to-br from-green-900 via-emerald-900 to-green-800 overflow-hidden relative">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 right-10 w-72 h-72 bg-green-700/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl"></div>
            </div>
            
            <div className="container mx-auto max-w-navbar px-4 md:px-6 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8">
                  <div className="flex items-center justify-center mb-4 text-green-300">
                    <MapPin className="w-8 h-8 md:w-10 md:h-10 mr-3" />
                    <h2 className="heading-2-white">
                      In der ganzen Schweiz für Sie da
                    </h2>
                  </div>
                  <p className="text-lg text-green-100 max-w-2xl mx-auto">
                    Unser Netzwerk an Umzugs- und Reinigungsfirmen erstreckt sich über alle Kantone.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
                  {locations.filter(city => city?.slug).map((city) => {
                    const cityHref = `/${city.slug}`;
                    return (
                    <Link 
                      key={city.slug}
                      href={cityHref}
                      className="block bg-white/20 backdrop-blur-sm text-white border border-white/30 px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:bg-white/30 hover:border-white/50 hover:scale-105 transform transition-all duration-200"
                    >
                      {city.name}
                    </Link>
                    );
                  })}
                  <Link href="/standorte" 
                    className="block bg-white/10 backdrop-blur-sm text-green-100 border border-white/20 px-4 py-2 rounded-full text-sm font-medium shadow-lg cursor-pointer hover:bg-white/20 hover:text-white hover:scale-105 transform transition-all duration-200"
                  >
                    ... und viele mehr!
                  </Link>
                </div>
                <p className="text-base md:text-lg text-green-50 font-medium mb-4">
                  Unser Netzwerk an Umzugs- und Reinigungsfirmen erstreckt sich über alle Kantone.
                </p>
                <p className="text-base md:text-lg text-green-50 font-medium mb-4">
                  Online-Offerten.ch ist ein Portal, das als Vermittlungsplattform für geprüfte Anbieter in der ganzen Schweiz dient und Ihnen hilft, passende Dienstleister einfach und sicher zu vergleichen.
                </p>
                <p className="text-lg text-green-50 font-medium">
                  Finden Sie noch heute den idealen Partner für Ihr Vorhaben.
                </p>
              </div>
            </div>
          </section>

          {/* Useful Tools Section */}
          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Left Side - Text Content */}
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-green-600 mb-2">Nützliche Helfer für Ihren Umzug und Reinigung</p>
                    <h2 
                      className="heading-2"
                      style={{
                        fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                        fontWeight: 700,
                      }}
                    >
                      Planen Sie Ihren Umzug und Ihre Reinigung effizient mit unseren praktischen Tools und hilfreichen Ratgebern
                    </h2>
                    <p className="text-body leading-relaxed">
                      Unsere Tools helfen Ihnen, Umzugskosten realistisch einzuschätzen und optimal zu planen. Nutzen Sie unsere Rechner und Checklisten für einen reibungslosen Umzug.
                    </p>
                  </div>
                  <div className="mt-6 rounded-xl overflow-hidden">
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
                    <Link key={tool.title} href={tool.linkTo} className="block group">
                      <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-green-500 bg-white rounded-xl overflow-hidden">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                            {tool.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            {tool.description}
                          </p>
                          <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 group-hover:bg-green-50">
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
            <section className="py-12 md:py-24 bg-white">
              <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                {/* Header */}
                <div className="mb-8">
                  <p className="text-sm font-semibold text-green-600 mb-2">Tipps, Tricks und wertvolle Informationen</p>
                  <h2 
                    className="heading-2 mb-4"
                    style={{
                      fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                      fontWeight: 700,
                    }}
                  >
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
                            onClick={() => setState(prev => ({ ...prev, selectedCategory: category }))}
                            className={cn(
                              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                              state.selectedCategory === category
                                ? "bg-[#0d4d2c] text-white"
                                : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                            )}
                          >
                            {category}
                          </button>
                        ))}
                      </div>

                      {/* Articles Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredPosts.slice(0, 6).map((post: any) => {
                          const postUrl = `/ratgeber/${post.slug}`;
                          const isOverview = post.category?.toLowerCase().includes('übersicht') || post.title?.toLowerCase().includes('übersicht');
                          
                          return (
                            <Link key={post.id} href={postUrl} className="group">
                              <Card className="flex flex-row h-full overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 hover:border-green-500">
                                <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0">
                                  <NextImage
                                    src={post.featured_image_url || "https://images.unsplash.com/photo-1504983875-d3b163aba9e6"}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    loading="lazy"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    priority={false}
                                  />
                                </div>
                                <CardContent className="p-4 sm:p-6 flex flex-col justify-center flex-1">
                                  <Badge 
                                    variant="secondary" 
                                    className="mb-2 self-start bg-blue-600 text-white hover:bg-blue-700 w-fit"
                                  >
                                    {isOverview ? 'Übersicht' : 'Artikel'}
                                  </Badge>
                                  <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                                    {post.title}
                                  </h3>
                                </CardContent>
                              </Card>
                            </Link>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}
              </div>
            </section>
          ) : null}
    </>
  );
};

export default HomePageClient;

