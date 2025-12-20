'use client'

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, Home, Sparkles, Recycle, ChevronRight, Paintbrush, Sprout,
  FileText, GitCompareArrows, Award, KeyRound as UsersRound,
  MapPin, Calculator, ListChecks, BookOpen, ArrowRight,
  Star, User, ChevronLeft, Send, Loader2
} from 'lucide-react';
// Supabase lazy loaded to reduce initial bundle size
import { formatDate, cn } from '@/lib/utils';
import { getGermanServiceName } from '@/lib/dataMapping';
import { locations } from '@/data/locations';

// Service Card Component
interface ServiceCardProps {
  serviceId: string;
  label: string;
  subLabel: string;
  icon: React.ReactNode;
  onClick: (serviceId: string) => void;
  isSelected: boolean;
  colors: string;
}

const ServiceCard = React.memo(({ serviceId, label, subLabel, icon, onClick, isSelected, colors }: ServiceCardProps) => {
  return (
    <div
      className="w-full cursor-pointer"
      onClick={() => onClick(serviceId)}
    >
      <div className={`w-full bg-white border rounded-lg p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-200 group ${
        isSelected 
          ? 'border-green-500 ring-2 ring-green-500/50 bg-green-50/50' 
          : 'border-gray-200 hover:border-gray-300'
      }`}>
        <div className="flex items-center flex-1">
          {icon && (
            <div className={`mr-4 p-2.5 rounded-full ${colors} flex-shrink-0`}>
              {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement, { size: 20, className: 'text-current' }) : icon}
            </div>
          )}
          <div className="flex-1 min-w-0 text-left">
            <div className="font-semibold text-base text-gray-800 mb-0.5">{label}</div>
            <div className="text-sm text-gray-500 truncate">{subLabel}</div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 ml-2" />
      </div>
    </div>
  );
});

// Review Card Component
interface ReviewCardProps {
  review: any;
  index: number;
}

const ReviewCard = ({ review, index }: ReviewCardProps) => {
  const { 
    customer_name, 
    city,
    review_date,
    rating,
    rating_price,
    rating_workflow,
    rating_administration,
    review_text,
    service_type,
    partner_name,
    partners: partner
  } = review;

  const serviceName = getGermanServiceName(service_type);

  const DetailRating = ({ label, rating }: { label: string; rating: number }) => (
    <div className="flex justify-between items-center text-sm">
      <p className="text-gray-600">{label}</p>
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className={`text-yellow-400 ${i < rating ? 'fill-yellow-400' : 'fill-transparent'}`} />
          ))}
        </div>
        <span className="font-semibold text-gray-700 w-6 text-right">{(rating || 0).toFixed(1)}</span>
      </div>
    </div>
  );

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
                <p className="font-bold text-gray-800">{customer_name}, {city}</p>
                <p className="text-xs text-gray-500">{formatDate(review_date)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-yellow-400">
              <Star size={20} className="fill-current" />
              <span className="font-bold text-lg text-gray-800">{(rating || 0).toFixed(1)}</span>
            </div>
          </div>
          
          {review_text && (
            <p className="text-gray-700 text-sm italic mb-4">
              "{review_text}"
            </p>
          )}

          <div className="space-y-3 mb-4 border-t border-b border-gray-100 py-4">
            {rating_price && <DetailRating label="Preiseinhaltung" rating={rating_price} />}
            {rating_workflow && <DetailRating label="Arbeitsablauf" rating={rating_workflow} />}
            {rating_administration && <DetailRating label="Verwaltung" rating={rating_administration} />}
          </div>

          <div className="mt-auto pt-4 space-y-3">
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
      </CardContent>
    </Card>
    </div>
  );
};

// Post Card Component
interface PostCardProps {
  post: any;
}

const PostCard = ({ post }: PostCardProps) => {
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
        <div className="aspect-video overflow-hidden">
          <img src={post.featured_image_url || "https://images.unsplash.com/photo-1504983875-d3b163aba9e6"} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" decoding="async" width="400" height="225" />
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
};

interface HomePageClientProps {
  initialReviews?: any[];
  initialPosts?: any[];
}

const HomePageClient = ({ initialReviews = [], initialPosts = [] }: HomePageClientProps) => {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Prevent hydration mismatch by only showing conditional content after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [reviews, setReviews] = useState(initialReviews);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [posts, setPosts] = useState(initialPosts);
  const [postsLoading, setPostsLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const postsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeftPosts, setCanScrollLeftPosts] = useState(false);
  const [canScrollRightPosts, setCanScrollRightPosts] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // SEO Data - Optimized for "Offerten" keyword - Local SEO focus
  const metaTitle = "Offerten vergleichen – Umzug, Reinigung & Renovierung aus Ihrer Region";
  const metaDescription = "Offerten vergleichen und bis zu 40% sparen. Kostenlose Offerten von geprüften Umzugs-, Reinigungs-, Maler- & Gärtnerfirmen aus Ihrer Region.";
  // Meta keywords removed - Google no longer uses meta keywords for ranking

  // Services
  const services = useMemo(() => [
    { id: 'umzug', label: 'Umzug Offerten vergleichen', subLabel: 'Privat, Geschäftlich, International', icon: <Home />, colors: 'bg-blue-100 text-blue-600' },
    { id: 'reinigung', label: 'Reinigung Offerten vergleichen', subLabel: 'Umzugs-, Büro-, Fensterreinigung', icon: <Sparkles />, colors: 'bg-yellow-100 text-yellow-500' },
    { id: 'maler', label: 'Maler Offerten vergleichen', subLabel: 'Innen-, Aussenanstrich, Fassaden', icon: <Paintbrush />, colors: 'bg-pink-100 text-pink-500' },
    { id: 'raeumung', label: 'Räumung & Entsorgung', subLabel: 'Wohnungsräumung, Entrümpelung', icon: <Recycle />, colors: 'bg-purple-100 text-purple-500' },
    { id: 'garten', label: 'Gartenarbeiten Offerten vergleichen', subLabel: 'Gartenpflege, Landschaftsbau', icon: <Sprout />, colors: 'bg-green-100 text-green-600' },
  ], []);

  const features = ['Mit einer Anfrage mehrere Anbieter finden', 'Offerten vergleichen', 'Geprüfte Firmen aus Ihrer Region', 'Unverbindlich und gratis'];

  // Structured Data - SEO Optimized
  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": metaTitle,
    "description": metaDescription,
    "alternateName": "Offerten Portal aus Ihrer Region",
    "serviceType": [
      "Umzugsdienst",
      "Reinigungsdienst",
      "Malerarbeiten",
      "Gartenarbeiten",
      "Räumung & Entsorgung"
    ],
    "provider": {
      "@type": "Organization",
      "@id": "https://online-offerten.ch/#organization",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch",
      "logo": "https://online-offerten.ch/image/online-offerten.ch.jpg",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "info@online-offerten.ch",
        "areaServed": "CH",
        "availableLanguage": ["de"]
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "Switzerland",
      "identifier": "CH"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CHF",
      "availability": "https://schema.org/InStock",
      "url": "https://online-offerten.ch/kostenlose-offerte-anfordern"
    }
  }), []);

  // Handlers
  const handleServiceSelection = useCallback((serviceType: string) => {
    setSelectedService(prevService => prevService === serviceType ? null : serviceType);
  }, []);

  const handleStartRequest = useCallback(() => {
    if (selectedService) {
      router.push(`/kostenlose-offerte-anfordern?service=${selectedService}`);
    }
  }, [selectedService, router]);

  // Fetch Reviews - lazy load Supabase to reduce initial bundle
  useEffect(() => {
    // If initial reviews are provided, skip fetch
    if (initialReviews && initialReviews.length > 0) {
      return;
    }
    
    const fetchReviews = async () => {
      setReviewsLoading(true);
      try {
        // Lazy load Supabase client only when needed
        const { supabase } = await import('@/lib/supabaseClient');
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('customer_reviews')
          .select(`
            id, customer_name, rating, city, review_date, 
            rating_price, rating_workflow, rating_administration, 
            review_text,
            service_type, partner_name,
            partners (slug, company_name)
          `)
          .eq('approval_status', 'approved')
          .eq('show_on_homepage', true)
          .not('partner_id', 'is', null)
          .order('review_date', { ascending: false })
          .limit(9);
        
        if (reviewsError) {
          console.error('Error fetching reviews:', reviewsError);
        } else {
          setReviews(reviewsData || []);
        }
      } catch (error) {
        console.error('Error loading Supabase:', error);
      } finally {
        setReviewsLoading(false);
        checkScrollability();
      }
    };

    fetchReviews();
  }, [initialReviews]);

  // Fetch Posts - lazy load Supabase to reduce initial bundle
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Lazy load Supabase client only when needed
        const { supabase } = await import('@/lib/supabaseClient');
        const { data, error } = await supabase
          .from('posts')
          .select('id, title, slug, meta_description, featured_image_url, category, tags')
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(9);

        if (error) {
          console.error('Error fetching posts:', error);
        } else {
          setPosts(data || []);
        }
      } catch (error) {
        console.error('Error loading Supabase:', error);
      } finally {
        setPostsLoading(false);
      }
    };
    fetchPosts();
  }, [initialPosts]);

  // Scroll handlers
  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    }
  };

  const checkPostsScrollability = () => {
    const el = postsScrollRef.current;
    if (el) {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      setCanScrollLeftPosts(el.scrollLeft > 0);
      setCanScrollRightPosts(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
      
      const containerWidth = el.clientWidth;
      const scrollLeft = el.scrollLeft;
      const gap = 24;
      const getVisibleCardsCount = () => {
        if (typeof window === 'undefined') return 1;
        const width = window.innerWidth;
        if (width >= 1024) return 3;
        if (width >= 640) return 2;
        return 1;
      };
      const visibleCards = getVisibleCardsCount();
      const cardWidth = containerWidth / visibleCards;
      const cardWidthWithGap = cardWidth + gap;
      const pageIndex = Math.round(scrollLeft / cardWidthWithGap);
      const totalPages = Math.ceil(posts.length / visibleCards);
      setCurrentIndex(Math.min(Math.max(0, pageIndex), totalPages - 1));
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      window.addEventListener('resize', checkScrollability);
      el.addEventListener('scroll', checkScrollability, { passive: true });
      return () => {
        window.removeEventListener('resize', checkScrollability);
        el.removeEventListener('scroll', checkScrollability);
      };
    }
  }, []);

  useEffect(() => {
    const el = postsScrollRef.current;
    if (el && posts.length > 0) {
      checkPostsScrollability();
      el.addEventListener('scroll', checkPostsScrollability, { passive: true });
      window.addEventListener('resize', checkPostsScrollability);
      return () => {
        el.removeEventListener('scroll', checkPostsScrollability);
        window.removeEventListener('resize', checkPostsScrollability);
      };
    }
  }, [posts.length]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.9;
      el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollPosts = (direction: 'left' | 'right') => {
    const el = postsScrollRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.85;
      el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const getVisibleCardsCount = () => {
    if (typeof window === 'undefined') return 1;
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 640) return 2;
    return 1;
  };

  const visibleCards = getVisibleCardsCount();
  const totalPages = Math.ceil(posts.length / visibleCards);

  const scrollToIndex = (index: number) => {
    const el = postsScrollRef.current;
    if (el) {
      const containerWidth = el.clientWidth;
      const gap = 24;
      const cardWidth = containerWidth / visibleCards;
      const cardWidthWithGap = cardWidth + gap;
      el.scrollTo({ left: index * cardWidthWithGap, behavior: 'smooth' });
    }
  };

  return (
    <>
      
      <div className="flex flex-col">
        <main className="flex-grow">
        {/* Hero Section - SEO Optimized */}
        <section 
          className="py-16 md:py-24 lg:py-28 bg-gradient-to-br from-white via-green-50/30 to-white" 
          style={{ minHeight: '600px' }}
          aria-label="Hero Section - Umzug und Reinigung Offerten vergleichen"
        >
            <div className="container mx-auto max-w-navbar px-4 md:px-6">
              <article className="max-w-navbar mx-auto text-center md:text-left">
                {/* Mobile: H1 and Subheading */}
                <div className="lg:hidden">
                  {/* Main H1 - SEO Optimized */}
                  <h1 className="text-[2.4rem] md:text-4xl lg:text-6xl font-extrabold text-gray-900 mb-4 md:mb-5 leading-tight tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-green-700 to-gray-900">
                      Umzug, Reinigung
                    </span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-green-700 to-gray-900">
                      und Renovierung
                    </span>
                  </h1>
                  <p className="text-base md:text-lg text-gray-700 mb-5 md:mb-6 leading-relaxed">
                    Vergleichen Sie kostenlos mehrere Offerten für Umzug, Reinigung, Renovierung 
                    und weitere Dienstleistungen in der ganzen Schweiz. Finden Sie geprüfte Anbieter 
                    aus Ihrer Region und sparen Sie Zeit und Geld.
                  </p>
                </div>

              {/* Mobile Layout */}
              <div className="lg:hidden">
                <div className="text-left">

                  {/* SEO Optimized Image - Mobile */}
                  <div className="mb-5 md:mb-6">
                    <figure className="relative w-full">
                      <picture>
                        <source
                          type="image/avif"
                          srcSet="https://online-offerten.ch/privatumzug/umzug-reinigung-maler-gertner-min-600-192.avif 800w, https://online-offerten.ch/privatumzug/umzug-reinigung-maler-gertner-min-600-192.avif 1200w"
                          sizes="(max-width: 768px) 800px, 1200px"
                        />
                        <img  
                          alt="Professionelle Dienstleister für Umzug, Reinigung, Malerarbeiten und Gartenarbeiten in der Schweiz. Umzugshelfer, Reinigungskräfte, Maler und Gärtner bei der Arbeit."
                          className="w-full h-full object-contain"
                          src="https://online-offerten.ch/privatumzug/umzug-reinigung-maler-gaertner-6-offerten-vergleichen.avif"
                          sizes="(max-width: 768px) 800px, 1200px"
                          fetchPriority="high"
                          loading="eager"
                          width="1200"
                          height="675"
                          style={{ display: 'block' }}
                          decoding="async"
                          itemProp="image"
                        />
                      </picture>
                      <figcaption className="sr-only">
                        Professionelle Dienstleister für Umzug, Reinigung, Malerarbeiten und Gartenarbeiten in der Schweiz
                      </figcaption>
                    </figure>
                  </div>

                  {/* H2 for Service Selection - SEO Hierarchy */}
                  <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 md:mb-6 text-left">
                    Einfach gratis mehrere Offerten einholen
                  </h4>
                  
                  <div className="space-y-3 mb-8">
                    {services.map((service) => (
                      <ServiceCard
                        key={service.id}
                        serviceId={service.id}
                        label={service.label}
                        subLabel={service.subLabel}
                        icon={service.icon}
                        onClick={handleServiceSelection}
                        isSelected={selectedService === service.id}
                        colors={service.colors}
                      />
                    ))}
                  </div>

                  {isMounted && selectedService && (
                    <Button 
                      size="lg" 
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-5 text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={handleStartRequest}
                    >
                      Anfrage jetzt starten
                    </Button>
                  )}
                  {!isMounted && (
                    <div style={{ height: '80px' }} aria-hidden="true" />
                  )}
                </div>
              </div>

               {/* Features Section - Mobile - SEO Optimized */}
               <div className="lg:hidden mt-5 md:mt-6 text-left">
                 <aside aria-label="Vorteile und Garantien" className="text-left">
                   <ul className="flex flex-col items-start gap-5 md:gap-6" role="list">
                    {features.map((feature, index) => (
                      <li 
                        key={index}
                        className="flex items-center text-gray-900 text-base md:text-lg font-semibold"
                        itemProp="featureList"
                      >
                        <div className="flex-shrink-0 mr-3" aria-hidden="true">
                          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md">
                            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                          </div>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>

              {/* Desktop Layout - SEO Optimized */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <div className="text-left">
                  {/* Main H1 - Desktop */}
                  <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-gray-900 mb-4 md:mb-6 leading-tight tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-green-700 to-gray-900">
                      Umzug, Reinigung
                    </span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-green-700 to-gray-900">
                      und Renovierung
                    </span>
                  </h1>
                  <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-5 md:mb-6 leading-relaxed">
                    Vergleichen Sie kostenlos mehrere Offerten für Umzug, Reinigung, Renovierung 
                    und weitere Dienstleistungen in der ganzen Schweiz. Finden Sie geprüfte Anbieter 
                    aus Ihrer Region und sparen Sie Zeit und Geld.
                  </p>

                  {/* SEO Optimized Image - Desktop */}
                  <figure
                    className="relative w-full mb-5 md:mb-6"
                  >
                    <picture>
                      <source
                        type="image/avif"
                        srcSet="https://online-offerten.ch/privatumzug/umzug-reinigung-maler-gertner-min-600-192.avif 1600w"
                        sizes="(max-width: 1200px) 1200px, 1600px"
                      />
                      <img  
                      alt="Professionelle Dienstleister für Umzug, Reinigung, Malerarbeiten und Gartenarbeiten in der Schweiz. Umzugshelfer, Reinigungskräfte, Maler und Gärtner bei der Arbeit."
                        className="w-full h-full object-contain"
                        src="https://online-offerten.ch/privatumzug/umzug-reinigung-maler-gaertner-6-offerten-vergleichen.avif"
                        sizes="(max-width: 1200px) 1200px, 1600px"
                        fetchPriority="high"
                        loading="eager"
                      width="1600"
                      height="900"
                      style={{ display: 'block' }}
                      decoding="async"
                      itemProp="image"
                      />
                    </picture>
                    <figcaption className="sr-only">
                      Professionelle Dienstleister für Umzug, Reinigung, Malerarbeiten und Gartenarbeiten in der Schweiz
                    </figcaption>
                  </figure>

                  {/* SEO Optimized Features */}
                  <div className="mt-5 md:mt-6">
                    <aside aria-label="Vorteile und Garantien">
                      <ul className="flex flex-col items-start gap-5 md:gap-6" role="list">
                        {features.map((feature, index) => (
                          <li 
                            key={index}
                            className="flex items-center text-gray-900 text-lg md:text-xl font-semibold"
                            itemProp="featureList"
                          >
                            <div className="flex-shrink-0 mr-3" aria-hidden="true">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                                <CheckCircle2 className="w-5 h-5 text-white" />
                              </div>
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </aside>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center md:text-left">
                    Einfach gratis mehrere Offerten einholen
                  </h2>
                  
                  <div className="space-y-3">
                  {services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      serviceId={service.id}
                      label={service.label}
                      subLabel={service.subLabel}
                      icon={service.icon}
                      onClick={handleServiceSelection}
                      isSelected={selectedService === service.id}
                      colors={service.colors}
                    />
                  ))}
                  </div>

                  <div className="mt-6" style={{ minHeight: '80px' }}>
                    {isMounted && selectedService ? (
                      <Button 
                        size="lg" 
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                        onClick={handleStartRequest}
                      >
                        Anfrage jetzt starten
                        <ArrowRight className="w-5 h-5 ml-2 inline-block" />
                      </Button>
                    ) : (
                      <div
                        style={{ height: '80px' }}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>
              </div>
              </article>
            </div>
          </section>
        
          {/* How It Works Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 via-slate-100 to-gray-200 overflow-hidden">
            <div className="container mx-auto max-w-navbar px-4 md:px-6">
              <div className="text-center mb-16 md:mb-24">
                <p className="text-sm md:text-base font-semibold text-green-600 uppercase tracking-wider mb-2">
                  Wie es funktioniert
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
                  So funktioniert der Offertenvergleich in der Schweiz
                </h2>
                <p className="text-md md:text-lg text-slate-600 max-w-2xl mx-auto">
                  Mit Online-Offerten vergleichen Sie in nur wenigen Minuten mehrere Angebote 
                  für Umzug, Reinigung und Handwerkerleistungen in der Schweiz.
                </p>
                </div>

              <div className="relative max-w-2xl md:max-w-3xl mx-auto">
                {[
                  { id: 1, title: "Formular ausfüllen", desc: "Geben Sie in 2 Minuten Ihre Wünsche an – den Rest übernehmen wir.", icon: <FileText className="w-10 h-10 md:w-12 md:h-12 text-green-600" /> },
                  { id: 2, title: "Offerten vergleichen", desc: "Sie erhalten passende Offerten – schnell, kostenlos und ohne Verpflichtung.", icon: <GitCompareArrows className="w-10 h-10 md:w-12 md:h-12 text-green-600" /> },
                  { id: 3, title: "Anbieter wählen", desc: "Entscheiden Sie sich für den besten Anbieter – und lehnen Sie sich zurück.", icon: <UsersRound className="w-10 h-10 md:w-12 md:h-12 text-green-600" /> }
                ].map((step, index) => (
                  <div 
                    key={step.id} 
                    className="flex items-start mb-10 md:mb-12"
                  >
                    <div className="flex flex-col items-center mr-6 md:mr-8 relative pt-1">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-green-500 z-10 mb-2">
                        {step.icon}
                      </div>
                      {index < 2 && (
                        <div 
                          className="absolute top-full left-1/2 w-1 bg-green-300 -translate-x-1/2"
                          style={{ height: 'calc(100% - 4rem)' }}
                        />
                      )}
                      <div className="absolute -top-2 -left-2 md:-top-3 md:-left-3 w-8 h-8 md:w-10 md:h-10 bg-slate-800 text-white rounded-full flex items-center justify-center text-sm md:text-base font-bold shadow-lg z-20 ring-2 ring-white">
                        {step.id}
                      </div>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-out flex-1 border border-gray-200">
                      <h3 className="text-xl md:text-2xl font-semibold text-slate-800 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 text-sm md:text-base">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-16 md:mt-20 flex flex-col items-center text-center">
                <Award className="w-12 h-12 md:w-14 md:h-14 text-green-500 mb-4" />
                <p className="text-md md:text-lg text-slate-700 max-w-xl mx-auto leading-relaxed">
                  Alle unsere Partner sind geprüft und versichert – für Ihre volle Sicherheit bei jedem Auftrag.
                </p>
              </div>
            </div>
          </section>

          {/* Services Overview Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-gray-100 to-slate-100">
            <div className="container mx-auto max-w-navbar px-4 md:px-6">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                  Umzug, Reinigung & Handwerker Offerten vergleichen
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                  Von Privatumzug bis Gartenarbeiten – finden Sie den passenden Partner für Ihr Projekt. Professionell, zuverlässig und zu fairen Preisen.
                </p>
              </div>

              <div className="space-y-6 md:space-y-8">
                {/* Umzug */}
                <div className="rounded-xl shadow-xl hover:shadow-2xl overflow-hidden bg-white border-l-4 border-teal-500">
                  <div className="grid md:grid-cols-2 gap-0 md:grid-flow-dense">
                    <div className="relative h-64 md:h-auto overflow-hidden md:col-start-2">
                      <img
                        src="https://online-offerten.ch/image/umzugsfirma.avif"
                        alt="Professionelle Umzugsfirma für Privat- und Geschäftsumzüge in der ganzen Schweiz"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        width="600"
                        height="400"
                      />
                    </div>
                    <div className="p-6 md:p-8 flex flex-col md:col-start-1 md:row-start-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-teal-50">
                          <Home className="w-6 h-6 text-teal-600" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-teal-600 mb-0">Umzug</h3>
                      </div>
                      <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed font-medium">
                        Vergleichen Sie Umzug Offerten von professionellen Umzugsfirmen in der Schweiz und finden Sie das beste Angebot für Ihren Umzug.
                      </p>
                      <ul className="space-y-2">
                        {[
                          { to: '/privatumzug', title: 'Privatumzug' },
                          { to: '/geschaeftsumzug', title: 'Geschäftsumzug' },
                          { to: '/internationale-umzuege', title: 'Internationale Umzüge' },
                          { to: '/spezialtransporte', title: 'Spezialtransporte' },
                          { to: '/klaviertransport', title: 'Klaviertransport' }
                        ].map((service) => (
                          <li key={service.to}>
                            <Link href={service.to}
                              className="group flex items-center text-gray-700 hover:text-teal-600 transition-colors text-sm md:text-base"
                            >
                              <ArrowRight className="w-4 h-4 mr-2 text-teal-600 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                              <span className="group-hover:underline">{service.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Reinigung */}
                <div className="rounded-xl shadow-xl hover:shadow-2xl overflow-hidden bg-white border-l-4 border-yellow-500">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-auto overflow-hidden">
                      <img
                        src="https://online-offerten.ch/privatumzug/reinigungsfirma.avif"
                        alt="Professionelle Reinigungsdienstleistungen für Wohnungen, Häuser und Büros in der Schweiz"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        width="600"
                        height="400"
                      />
                    </div>
                    <div className="p-6 md:p-8 flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-yellow-50">
                          <Sparkles className="w-6 h-6 text-yellow-600" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-yellow-600 mb-0">Reinigung</h3>
                      </div>
                      <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed font-medium">
                        Vergleichen Sie Reinigung Offerten von professionellen Reinigungsfirmen in der Schweiz und finden Sie das beste Angebot für Ihre Reinigung.
                      </p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <ul className="space-y-2">
                          {[
                            { to: '/wohnungsreinigung', title: 'Wohnungsreinigung' },
                            { to: '/hausreinigung', title: 'Hausreinigung' },
                            { to: '/bueroreinigung', title: 'Büroreinigung' },
                            { to: '/umzugsreinigung', title: 'Umzugsreinigung' },
                            { to: '/unterhaltsreinigung', title: 'Unterhaltsreinigung' },
                            { to: '/grundreinigung', title: 'Grundreinigung' }
                          ].map((service) => (
                            <li key={service.to}>
                              <Link href={service.to}
                                className="group flex items-center text-gray-700 hover:text-yellow-600 transition-colors text-sm md:text-base"
                              >
                                <ArrowRight className="w-4 h-4 mr-2 text-yellow-600 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                                <span className="group-hover:underline">{service.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <ul className="space-y-2">
                          {[
                            { to: '/baureinigung', title: 'Baureinigung' },
                            { to: '/fensterreinigung', title: 'Fensterreinigung' },
                            { to: '/bodenreinigung', title: 'Bodenreinigung' },
                            { to: '/fassadenreinigung', title: 'Fassadenreinigung' },
                            { to: '/hofreinigung', title: 'Hofreinigung' }
                          ].map((service) => (
                            <li key={service.to}>
                              <Link href={service.to}
                                className="group flex items-center text-gray-700 hover:text-yellow-600 transition-colors text-sm md:text-base"
                              >
                                <ArrowRight className="w-4 h-4 mr-2 text-yellow-600 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                                <span className="group-hover:underline">{service.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Malerarbeiten & Gartenarbeiten */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  <div className="rounded-xl shadow-xl hover:shadow-2xl overflow-hidden bg-white border-l-4 border-blue-500">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative h-64 md:h-auto overflow-hidden">
                        <img
                          src="https://online-offerten.ch/bilder/malerarbeiten-600-400.webp"
                          alt="Professionelle Malerarbeiten für Innen- und Außenbereiche in der Schweiz"
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          width="600"
                          height="400"
                        />
                      </div>
                      <div className="p-6 md:p-8 flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-blue-50">
                            <Paintbrush className="w-6 h-6 text-blue-600" />
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-0">Malerarbeiten</h3>
                        </div>
                        <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed font-medium">
                          Vergleichen Sie Maler Offerten von professionellen Malerfirmen in der Schweiz und finden Sie das beste Angebot für Ihre Malerarbeiten.
                        </p>
                        <ul className="space-y-2">
                          <li>
                            <Link href="/malerarbeiten"
                              className="group flex items-center text-gray-700 hover:text-blue-600 transition-colors text-sm md:text-base"
                            >
                              <ArrowRight className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                              <span className="group-hover:underline">Malerarbeiten</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl shadow-xl hover:shadow-2xl overflow-hidden bg-white border-l-4 border-green-500">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative h-64 md:h-auto overflow-hidden">
                        <img
                          src="https://online-offerten.ch/bilder/gartenarbeiten-600-400.webp"
                          alt="Professionelle Gartenpflege und Landschaftsbau in der Schweiz"
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          width="600"
                          height="400"
                        />
                      </div>
                      <div className="p-6 md:p-8 flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-green-50">
                            <Sprout className="w-6 h-6 text-green-600" />
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold text-green-600 mb-0">Gartenarbeiten</h3>
                        </div>
                        <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed font-medium">
                          Vergleichen Sie Gartenarbeiten Offerten von professionellen Gartenfirmen in der Schweiz und finden Sie das beste Angebot für Ihre Gartenarbeiten.
                        </p>
                        <ul className="space-y-2">
                          <li>
                            <Link href="/gartenarbeiten"
                              className="group flex items-center text-gray-700 hover:text-green-600 transition-colors text-sm md:text-base"
                            >
                              <ArrowRight className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                              <span className="group-hover:underline">Gartenarbeiten</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto max-w-navbar px-4 md:px-6">
              <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                <div className="text-left">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
                    Umzug, Reinigung & Renovierung – Wir übernehmen die schwere Arbeit
                  </h2>
                  
                  <div className="prose prose-lg text-gray-700 max-w-none space-y-4">
                    <p className="text-base md:text-lg leading-relaxed">
                      Wenn Sie in der Schweiz auf der Suche nach professionellen Dienstleistungen sind, dann ist das Offerten vergleichen Schweiz der erste wichtige Schritt zu einer fundierten Entscheidung. Unabhängig davon, ob Sie einen Umzug planen, eine gründliche Reinigung benötigen oder Handwerker für Ihr Projekt suchen – der Vergleich mehrerer Angebote hilft Ihnen dabei, die beste Lösung für Ihre individuellen Bedürfnisse zu finden.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed">
                      Für viele Schweizer Haushalte und Unternehmen steht am Anfang eines jeden Projekts die Frage nach den Kosten. Gerade bei Umzug Offerten können die Preise zwischen verschiedenen Anbietern erheblich variieren. Ein Umzug ist nicht nur eine logistische Herausforderung, sondern auch eine finanzielle Investition. Durch einen sorgfältigen Vergleich können Sie nicht nur Geld sparen, sondern auch sicherstellen, dass alle notwendigen Leistungen im Preis inbegriffen sind – von der professionellen Verpackung Ihrer Möbel bis hin zur Montage am Zielort.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed">
                      Ähnlich verhält es sich mit Reinigung Offerten. Ob Sie eine Umzugsreinigung benötigen, die Wohnungsübergabe erfolgreich meistern möchten oder eine regelmäßige Büroreinigung suchen – jede Situation erfordert spezifische Leistungen. Professionelle Reinigungsfirmen bieten unterschiedliche Pakete und Servicelevel an. Ein Vergleich ermöglicht es Ihnen, genau das Angebot zu finden, das zu Ihrem Budget und Ihren Qualitätsansprüchen passt. Zudem können Sie so sicherstellen, dass wichtige Aspekte wie Versicherungsschutz, Abnahmegarantien und Umweltfreundlichkeit der Reinigungsmittel berücksichtigt werden.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed">
                      Neben Umzugs- und Reinigungsdienstleistungen spielen auch Handwerker Angebote eine zentrale Rolle im Schweizer Markt. Ob Malerarbeiten, Gartenpflege, Renovierungen oder spezielle Handwerksleistungen – qualifizierte Fachkräfte sind gefragt. Der Vergleich verschiedener Angebote hilft Ihnen dabei, nicht nur die wirtschaftlichste Lösung zu finden, sondern auch einen Handwerker zu identifizieren, der über die notwendige Expertise, Referenzen und Versicherungen verfügt. Dies ist besonders wichtig, da viele Handwerksarbeiten eine langfristige Investition darstellen und Fehler teuer werden können.
                    </p>
                    <p className="text-base md:text-lg leading-relaxed">
                      Online-Offerten.ch vereinfacht diesen Vergleichsprozess erheblich. Anstatt stundenlang im Internet zu recherchieren und unzählige Telefonate zu führen, können Sie mit nur einer kostenlosen Anfrage mehrere geprüfte Anbieter erreichen. Unsere Plattform verbindet Sie mit qualifizierten Firmen in Ihrer Region, die Ihnen detaillierte und transparente Offerten zukommen lassen. So sparen Sie nicht nur Zeit, sondern gewinnen auch die Sicherheit, eine fundierte Entscheidung zu treffen. Alle Partner in unserem Netzwerk wurden sorgfältig geprüft und erfüllen hohe Qualitätsstandards. Starten Sie noch heute Ihren Vergleich und finden Sie den idealen Dienstleister für Ihr Projekt.
                    </p>
                  </div>

                  <div className="mt-10">
                    <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white group px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                      <Link href="/kostenlose-offerte-anfordern">
                        Jetzt kostenlose Offerten anfordern
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="relative w-full max-w-md lg:max-w-lg">
                    <div className="absolute -top-8 -left-8 w-32 h-32 bg-green-100 rounded-full opacity-50"></div>
                    <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-blue-100 rounded-full opacity-50"></div>
                    <img
                      src="https://online-offerten.ch/privatumzug/umzug-reinigung-maler-gaertner-6-offerten-vergleichen.avif"
                      alt="Zufriedene Kundin und Umzugshelfer vor einem Umzugswagen in den Schweizer Bergen."
                      className="relative w-full h-auto object-contain rounded-lg z-10"
                      loading="lazy"
                      width="600"
                      height="400"
                      decoding="async"
                      style={{ display: 'block' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Customer Reviews Section */}
          {reviewsLoading && reviews.length === 0 ? (
            <section className="py-20 bg-gray-50">
              <div className="container mx-auto px-4 text-center">
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-12"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                        <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                        <div className="h-12 bg-gray-300 rounded w-full mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/3 ml-auto"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ) : reviews.length > 0 ? (
            <section className="py-16 md:py-24 bg-slate-50">
              <div className="container mx-auto max-w-navbar px-4 md:px-6">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Das sagen unsere Kundinnen & Kunden
                  </h2>
                  <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    100 % echte Stimmen – Erfahrungen von Menschen, die bereits mit uns umgezogen sind.
                  </p>
                </div>

                <div className="relative">
                  <div 
                    ref={scrollContainerRef}
                    className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 -mb-8 gap-6 md:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                  >
                    {reviews.map((review, index) => (
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
                      canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
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
                      canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </section>
          ) : null}

          {/* Nationwide Presence Section */}
          <section className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto max-w-navbar px-4 md:px-6">
              <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8">
                  <div className="flex items-center justify-center mb-4 text-green-600">
                    <MapPin className="w-8 h-8 md:w-10 md:h-10 mr-3" />
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
                      In der ganzen Schweiz für Sie da
                    </h2>
                  </div>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">
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
                      className="block bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm hover:bg-teal-200 hover:text-teal-900 hover:scale-105 transform transition-all duration-200"
                    >
                      {city.name}
                    </Link>
                    );
                  })}
                  <Link href="/standorte" 
                    className="block bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-sm font-medium shadow-sm cursor-pointer hover:bg-slate-200 hover:text-slate-700 hover:scale-105 transform transition-all duration-200"
                  >
                    ... und viele mehr!
                  </Link>
                </div>
                <p className="text-lg text-slate-700 font-medium">
                  Finden Sie noch heute den idealen Partner für Ihr Vorhaben.
                </p>
              </div>
            </div>
          </section>

          {/* Useful Tools Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-gray-100">
            <div className="container mx-auto max-w-navbar px-4">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Nützliche Helfer für Ihren Umzug</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Planen Sie Ihren Umzug optimal mit unseren praktischen Tools und Ratgebern.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {[
                  { icon: <Calculator />, title: 'Umzugskosten-Rechner', description: 'Erhalten Sie eine schnelle Schätzung Ihrer Umzugskosten.', linkTo: '/umzugskosten-rechner', button: 'Tool nutzen' },
                  { icon: <Sparkles />, title: 'Reinigungskosten-Rechner', description: 'Kalkulieren Sie die Kosten für Ihre Umzugsreinigung.', linkTo: '/reinigungskosten-rechner', button: 'Tool nutzen' },
                  { icon: <ListChecks />, title: 'Checklisten', description: 'Behalten Sie den Überblick mit unseren detaillierten Umzugs-Checklisten.', linkTo: '/checklisten', button: 'Tool nutzen' },
                  { icon: <BookOpen />, title: 'Ratgeber & Tipps', description: 'Profitieren Sie von unserem Expertenwissen rund um Umzug, Reinigung und Lagerung.', linkTo: '/ratgeber', button: 'Tool nutzen' }
                ].map((tool) => (
                  <div key={tool.title} className="h-full">
                    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-transparent hover:border-green-500 bg-white rounded-xl overflow-hidden">
                      <div className="p-6 pb-4">
                        <div className="flex items-center mb-3">
                          <div className="p-3 bg-green-100 text-green-600 rounded-lg mr-4">
                            {React.cloneElement(tool.icon, { size: 28 })}
                          </div>
                          <h3 className="text-xl font-semibold text-gray-800">{tool.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed min-h-[40px]">{tool.description}</p>
                      </div>
                      <div className="p-6 pt-0 mt-auto">
                        <Button asChild variant="ghost" className="w-full text-green-600 hover:bg-green-50 hover:text-green-700 group">
                          <Link href={tool.linkTo}>
                            {tool.button}
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Ratgeber Section */}
          {postsLoading ? (
            <div className="py-12 md:py-24 bg-gray-50 flex justify-center items-center">
              <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
          ) : posts.length > 0 ? (
            <section className="py-12 md:py-24 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
                    <BookOpen className="w-8 h-8 text-green-600" />
                    Unser Ratgeber
                  </h2>
                  <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Tipps, Tricks und wertvolle Informationen rund um Umzug, Reinigung und mehr.
                  </p>
                </div>

                <div className="relative">
                  <div
                    ref={postsScrollRef}
                    className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 -mb-8 gap-6 md:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                  >
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="flex-shrink-0 snap-start w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.34rem)]"
                      >
                        <PostCard post={post} />
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 -left-2 md:-left-4 z-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white flex transition-opacity duration-300",
                      canScrollLeftPosts ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                    onClick={() => scrollPosts('left')}
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 -right-2 md:-right-4 z-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white flex transition-opacity duration-300",
                      canScrollRightPosts ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                    onClick={() => scrollPosts('right')}
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                  </Button>
                </div>

                {isMounted && totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-6 md:hidden">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => scrollToIndex(index)}
                        className={cn(
                          "transition-all duration-300 rounded-full",
                          index === currentIndex
                            ? "w-3 h-3 bg-green-600"
                            : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                        )}
                        aria-label={`Go to page ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
                <div className="text-center mt-12">
                  <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 text-white">
                    <Link href="/ratgeber">
                      Alle Artikel ansehen <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          ) : null}

          {/* Final CTA Section */}
          <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-[1300px] mx-auto">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-xl mb-6 border-2 border-gray-100">
                    <Send className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight">
                    Bereit für den nächsten Schritt?
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Planen Sie frühzeitig und sichern Sie sich die besten Termine. Geprüfte Umzugs-, Reinigungs-, Maler- und Gartenfirmen sind besonders in den Sommermonaten und rund um Kündigungstermine schnell ausgebucht. Starten Sie jetzt Ihre kostenlose Anfrage und vergleichen Sie Offerten – ohne Verpflichtung.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {[
                    { title: 'Kostenlose Offerten', text: 'Fordern Sie jetzt kostenlos und unverbindlich Offerten von geprüften Umzugs-, Reinigungs-, Maler- und Gartenfirmen an. Vergleichen Sie Preise und Leistungen und finden Sie den idealen Partner für Ihr Projekt.' },
                    { title: 'Zeit & Geld sparen', text: 'Vergleichen Sie Offerten und sparen Sie wertvolle Zeit, Geld und Nerven bei der Suche.' },
                    { title: 'Beste Firma finden', text: 'Finden Sie die beste Firma in Ihrer Nähe – mit nur wenigen Klicks und ohne Stress.' }
                  ].map((benefit) => (
                    <div key={benefit.title} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-xl mb-2">{benefit.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{benefit.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white group px-12 py-6 text-lg font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Link href="/kostenlose-offerte-anfordern">
                      Jetzt kostenlos vergleichen
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <p className="text-gray-500 mt-10 text-center text-sm font-medium">
                    online-offerten.ch – Ihr zuverlässiger Partner für professionelle Umzüge, Reinigungen, Malerarbeiten und Gartenpflege in der ganzen Schweiz. Geprüfte Firmen, faire Preise, bis zu 40% sparen.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default HomePageClient;
