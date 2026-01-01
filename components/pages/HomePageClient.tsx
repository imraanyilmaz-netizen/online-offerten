'use client'

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NextImage from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, Home, Sparkles, ChevronRight, Paintbrush, Sprout,
  FileText, GitCompareArrows, Award, KeyRound as UsersRound,
  MapPin, Calculator, ListChecks, BookOpen, ArrowRight,
  Star, User, ChevronLeft, Send, Loader2, HelpCircle,
  ShieldCheck, TrendingUp, Users, Search, Clock
} from 'lucide-react';
import MovingCostCalculator from '@/components/UmzugskostenRechnerSections/MovingCostCalculator';
import CleaningCostCalculator from '@/components/ReinigungskostenRechnerSections/CleaningCostCalculator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
// Supabase lazy loaded to reduce initial bundle size
import { formatDate, cn } from '@/lib/utils';
import { getGermanServiceName } from '@/lib/dataMapping';
import { locations } from '@/data/locations';

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
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>('umzug');
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

  // SEO Data - Optimized with keyword variations to avoid stuffing
  const metaDescription = "Kostenlose Offerten von geprüften Umzugs-, Reinigungs-, Maler- & Gärtnerfirmen aus Ihrer Region anfordern. Mehrere Angebote vergleichen und bis zu 40% sparen.";

  // Structured Data - SEO Optimized
  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://online-offerten.ch/"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Kostenlose Offerten für Umzug, Reinigung & Renovierung",
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
          "logo": "https://online-offerten.ch/image/online-offerten.ch.jpg"
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
      },
      {
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
        },
        "sameAs": [
          "https://online-offerten.ch"
        ]
      },
      {
        "@type": "QAPage",
        "mainEntity": {
          "@type": "Question",
          "name": "Wo kann ich kostenlose Offerten für Umzug und Reinigung vergleichen?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Auf Online-Offerten.ch finden Sie qualifizierte Umzugsfirmen & Reinigungsfirmen in Ihrer Region – verglichen, geprüft & bis zu 40% günstiger. Alle Offerten sind unverbindlich und transparent."
          }
        }
      }
    ]
  }), [metaDescription]);

  // Handlers
  const handleStartRequest = useCallback(() => {
    router.push('/kostenlose-offerte-anfordern');
  }, [router]);

  // Scroll handlers - optimized with useCallback (defined before useEffects that use them)
  const getVisibleCardsCount = useCallback(() => {
    if (typeof window === 'undefined') return 1;
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 640) return 2;
    return 1;
  }, []);

  const checkScrollability = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    }
  }, []);

  // Fetch Reviews - lazy load Supabase to reduce initial bundle
  // Delay fetch to prioritize hero rendering
  useEffect(() => {
    // If initial reviews are provided, skip fetch
    if (initialReviews && initialReviews.length > 0) {
      return;
    }
    
    // Delay fetch to allow hero to render first
    const timeoutId = setTimeout(() => {
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
          // Call checkScrollability after a small delay to ensure DOM is ready
          setTimeout(() => {
            const el = scrollContainerRef.current;
            if (el) {
              const hasOverflow = el.scrollWidth > el.clientWidth;
              setCanScrollLeft(el.scrollLeft > 0);
              setCanScrollRight(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
            }
          }, 50);
        }
      };

      fetchReviews();
    }, 100); // Small delay to prioritize hero rendering

    return () => clearTimeout(timeoutId);
  }, [initialReviews]);

  // Fetch Posts - lazy load Supabase to reduce initial bundle
  // Delay fetch to prioritize hero rendering
  useEffect(() => {
    // Delay fetch to allow hero to render first
    const timeoutId = setTimeout(() => {
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
    }, 200); // Delay to prioritize hero rendering

    return () => clearTimeout(timeoutId);
  }, [initialPosts]);

  const checkPostsScrollability = useCallback(() => {
    const el = postsScrollRef.current;
    if (el) {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      setCanScrollLeftPosts(el.scrollLeft > 0);
      setCanScrollRightPosts(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
      
      const containerWidth = el.clientWidth;
      const scrollLeft = el.scrollLeft;
      const gap = 24;
      const visibleCards = getVisibleCardsCount();
      const cardWidth = containerWidth / visibleCards;
      const cardWidthWithGap = cardWidth + gap;
      const pageIndex = Math.round(scrollLeft / cardWidthWithGap);
      const totalPages = Math.ceil(posts.length / visibleCards);
      setCurrentIndex(Math.min(Math.max(0, pageIndex), totalPages - 1));
    }
  }, [posts.length, getVisibleCardsCount]);

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
  }, [checkScrollability]);

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
  }, [posts.length, checkPostsScrollability]);

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
  const totalPages = useMemo(() => Math.ceil(posts.length / visibleCards), [posts.length, visibleCards]);

  const scrollToIndex = useCallback((index: number) => {
    const el = postsScrollRef.current;
    if (el) {
      const containerWidth = el.clientWidth;
      const gap = 24;
      const cardWidth = containerWidth / visibleCards;
      const cardWidthWithGap = cardWidth + gap;
      el.scrollTo({ left: index * cardWidthWithGap, behavior: 'smooth' });
    }
  }, [visibleCards]);

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="flex flex-col">
        <main className="flex-grow">
        {/* Hero Section - SEO Optimized */}
        <section 
          className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 py-16 md:py-24 overflow-hidden" 
          aria-label="Hero Section - Kostenlose Offerten für Umzug, Reinigung und Renovierung"
        >
            <div className="container mx-auto max-w-navbar px-4 md:px-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold text-sm mb-6">
                    Unverbindlich & transparent
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                  Kostenlose Offerten vergleichen & den passenden Anbieter finden
                  </h1>
                  <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                  Finden Sie qualifizierte Umzugs-, Reinigungs-, Maler- & Gärtnerfirmen in Ihrer Region – 
verglichen, geprüft & bis zu 40% günstiger. 
Endlich stressfrei: Vertrauenswürdige Partner finden & vergleichen
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={handleStartRequest}
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                    >
                      <Search className="mr-2 h-5 w-5" />
                      Jetzt Offerten vergleichen
                    </Button>
                    <Button
                      onClick={() => {
                        const element = document.getElementById('kosten-berechnen');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      variant="outline"
                      size="lg"
                      className="text-lg px-8 py-6"
                    >
                      <Calculator className="mr-2 h-5 w-5" />
                      Kosten berechnen
                    </Button>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    Die Anfrage ist kostenlos und unverbindlich.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                      <span>Geprüfte Anbieter aus Ihrer Region</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                      <span>Unverbindliche Anfrage – keine Verpflichtung</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                      <span>Schnelle Antworten innerhalb von 24h</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="flex items-center justify-center mb-6">
                    <NextImage 
                      src="/image/online-offerten.webp" 
                      alt="Online Offerten" 
                      width={600}
                      height={400}
                      className="w-full h-auto max-w-md rounded-lg"
                      priority
                      quality={85}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    />
                  </div>
                  <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-green-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                      Ihre Vorteile auf einen Blick
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Geprüfte Anbieter aus Ihrer Region</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <ShieldCheck className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Unverbindliche Anfrage</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <GitCompareArrows className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Mehrere Offerten vergleichen</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Award className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Transparente Preise & individuelle Offerten</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SEO Optimized Content Section */}
          <section className="py-8 md:py-12 bg-white">
            <div className="container mx-auto max-w-navbar px-4 md:px-6">
              <div className="max-w-4xl mx-auto">
                <div className="p-6 md:p-8 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    <strong>Online-Offerten.ch</strong> ist Ihr kostenloser Preisvergleich für{' '}
                    <Link href="/umzugsofferten" className="text-green-600 font-semibold hover:text-green-700 underline">
                      Umzugsofferten
                    </Link>
                    ,{' '}
                    <Link href="/reinigung" className="text-green-600 font-semibold hover:text-green-700 underline">
                      Reinigungsofferten
                    </Link>
                    ,{' '}
                    <Link href="/malerarbeiten" className="text-green-600 font-semibold hover:text-green-700 underline">
                      Malerarbeiten Offerten
                    </Link>
                    {' '}und{' '}
                    <Link href="/gartenarbeiten" className="text-green-600 font-semibold hover:text-green-700 underline">
                      Gartenarbeiten Offerten
                    </Link>
                    . Vergleichen Sie mehrere Angebote und finden Sie den besten Preis. Alle Offerten sind <strong>100% kostenlos & unverbindlich</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>
        
          {/* How It Works Section */}
          <section className="py-12 md:py-16 bg-gradient-to-br from-green-900 via-emerald-900 to-green-800 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 right-10 w-72 h-72 bg-green-700/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-700/30 rounded-full blur-3xl"></div>
            </div>
            
            <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
              <div className="text-center mb-8 md:mb-10">
                <p className="inline-block text-xs font-bold text-green-300 uppercase tracking-widest mb-3 px-3 py-1.5 bg-green-800/50 backdrop-blur-sm rounded-full border border-green-700/50">
                  WIE ES FUNKTIONIERT
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 tracking-tight leading-tight">
                  So funktioniert's
                </h2>
                <p className="text-base md:text-lg text-green-100 max-w-2xl mx-auto leading-relaxed">
                  In nur 3 Schritten erhalten Sie passende Offerten von geprüften Partnern.
                  </p>
                </div>

              <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-8">
                {[
                  { 
                    id: 1, 
                    title: "Formular ausfüllen", 
                    desc: "Beschreiben Sie Ihr Projekt in unserem intelligenten Formular. Je detaillierter Ihre Angaben, desto genauer die Offerten.", 
                    icon: FileText,
                    gradient: "from-green-500 to-emerald-600",
                    bgGradient: "from-green-50 to-emerald-50",
                    delay: 0.1
                  },
                  { 
                    id: 2, 
                    title: "Offerten vergleichen", 
                    desc: "Sie erhalten bis zu 4 kostenlose Offerten von qualifizierten Partnern – schnell und unverbindlich.", 
                    icon: GitCompareArrows,
                    gradient: "from-blue-500 to-cyan-600",
                    bgGradient: "from-blue-50 to-cyan-50",
                    delay: 0.2
                  },
                  { 
                    id: 3, 
                    title: "Anbieter wählen", 
                    desc: "Vergleichen Sie Preise und Leistungen und wählen Sie den besten Partner – einfach, sicher und transparent.", 
                    icon: UsersRound,
                    gradient: "from-purple-500 to-pink-600",
                    bgGradient: "from-purple-50 to-pink-50",
                    delay: 0.3
                  }
                ].map((step) => {
                  const IconComponent = step.icon;
                  return (
                  <div 
                    key={step.id} 
                      className="group relative"
                  >
                      {/* Card */}
                      <div className={`relative h-full bg-gradient-to-br ${step.bgGradient} rounded-xl p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 backdrop-blur-sm hover:-translate-y-1`}>
                        {/* Step number badge */}
                        <div className={`absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center text-white font-bold text-base shadow-lg ring-2 ring-green-900`}>
                        {step.id}
                      </div>
                        
                        {/* Icon container */}
                        <div className={`mb-4 w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                          <IconComponent className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>

                        {/* Content */}
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                        {step.title}
                      </h3>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {step.desc}
                      </p>
                        
                        {/* Arrow decoration */}
                        {step.id < 3 && (
                          <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                            <ChevronRight className="w-6 h-6 text-green-700/50 group-hover:text-green-400 transition-colors" />
                    </div>
                        )}
                  </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Trust badge */}
              <div className="max-w-xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-5 shadow-lg border border-white/20">
                  <div className="flex items-center justify-center gap-3 md:gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-md">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-base md:text-lg font-semibold text-white mb-1">
                        Geprüft und versichert
                      </p>
                      <p className="text-green-100 text-sm md:text-base">
                        Alle unsere Partner sind geprüft und versichert.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cost Calculators Section */}
          <section id="kosten-berechnen" className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto max-w-navbar px-4 md:px-6">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Kosten schnell berechnen
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Wählen Sie eine Kategorie und erhalten Sie sofort eine Kostenschätzung
                </p>
              </div>

              {/* Category Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 md:mb-12">
                <Button
                  onClick={() => setSelectedCalculator(selectedCalculator === 'umzug' ? null : 'umzug')}
                  size="lg"
                  className={`w-full sm:w-auto px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 ${
                    selectedCalculator === 'umzug'
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                      : 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-green-500'
                  }`}
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Umzugskosten berechnen
                </Button>
                <Button
                  onClick={() => setSelectedCalculator(selectedCalculator === 'reinigung' ? null : 'reinigung')}
                  size="lg"
                  className={`w-full sm:w-auto px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 ${
                    selectedCalculator === 'reinigung'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                      : 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-blue-500'
                  }`}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Reinigungskosten berechnen
                </Button>
              </div>

              {/* Calculator Display */}
              <div className="max-w-4xl mx-auto">
                {selectedCalculator === 'umzug' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MovingCostCalculator />
                  </motion.div>
                )}
                {selectedCalculator === 'reinigung' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CleaningCostCalculator />
                  </motion.div>
                )}
              </div>
            </div>
          </section>

          {/* Services Overview Section */}
          <section className="py-12 md:py-16 bg-gradient-to-b from-slate-50 via-gray-100 to-slate-100">
            <div className="container mx-auto max-w-navbar px-4 md:px-6">
              <div className="text-center mb-8 md:mb-10">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
                  Beliebte Dienstleistungen
                </h2>
                <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                  Von Privatumzug bis Gartenarbeiten – finden Sie den passenden Partner für Ihr Projekt.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Umzug */}
                <div className="rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white border-l-4 border-teal-500 p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-lg bg-teal-50">
                      <Home className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-teal-600">Umzug</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    Vergleichen Sie Umzug Offerten von professionellen Umzugsfirmen.
                  </p>
                  <ul className="space-y-3">
                    {[
                      { to: '/privatumzug', title: 'Privatumzug' },
                      { to: '/geschaeftsumzug', title: 'Geschäftsumzug' },
                      { to: '/internationale-umzuege', title: 'Internationale Umzüge' },
                      { to: '/spezialtransporte', title: 'Spezialtransporte' },
                      { to: '/klaviertransport', title: 'Klaviertransport' }
                    ].map((service) => (
                      <li key={service.to}>
                        <Link href={service.to}
                          className="group flex items-center text-gray-700 hover:text-teal-600 transition-colors text-base md:text-lg py-2 px-2 rounded-md hover:bg-teal-50"
                        >
                          <ArrowRight className="w-5 h-5 mr-2.5 text-teal-600 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                          <span className="group-hover:underline font-semibold">{service.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Reinigung */}
                <div className="rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white border-l-4 border-yellow-500 p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-lg bg-yellow-50">
                      <Sparkles className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-yellow-600">Reinigung</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-base leading-relaxed">
                    Vergleichen Sie Reinigung Offerten von professionellen Reinigungsfirmen.
                  </p>
                  <ul className="space-y-3">
                    {[
                      { to: '/wohnungsreinigung', title: 'Wohnungsreinigung' },
                      { to: '/hausreinigung', title: 'Hausreinigung' },
                      { to: '/bueroreinigung', title: 'Büroreinigung' },
                      { to: '/umzugsreinigung', title: 'Umzugsreinigung' },
                      { to: '/unterhaltsreinigung', title: 'Unterhaltsreinigung' },
                      { to: '/grundreinigung', title: 'Grundreinigung' },
                      { to: '/baureinigung', title: 'Baureinigung' },
                      { to: '/fensterreinigung', title: 'Fensterreinigung' }
                    ].map((service) => (
                      <li key={service.to}>
                        <Link href={service.to}
                          className="group flex items-center text-gray-700 hover:text-yellow-600 transition-colors text-base md:text-lg py-2 px-2 rounded-md hover:bg-yellow-50"
                        >
                          <ArrowRight className="w-5 h-5 mr-2.5 text-yellow-600 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                          <span className="group-hover:underline font-semibold">{service.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Malerarbeiten & Gartenarbeiten */}
                <div className="rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white border-l-4 border-blue-500 p-6 md:p-7">
                  {/* Malerarbeiten */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-lg bg-blue-50">
                        <Paintbrush className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-blue-600">Malerarbeiten</h3>
                    </div>
                    <p className="text-gray-600 mb-3 text-base leading-relaxed">
                      Vergleichen Sie Maler Offerten von professionellen Malerfirmen.
                    </p>
                    <ul className="space-y-3">
                      <li>
                        <Link href="/malerarbeiten"
                          className="group flex items-center text-gray-700 hover:text-blue-600 transition-colors text-base md:text-lg py-2 px-2 rounded-md hover:bg-blue-50"
                        >
                          <ArrowRight className="w-5 h-5 mr-2.5 text-blue-600 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                          <span className="group-hover:underline font-semibold">Malerarbeiten</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Gartenarbeiten */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-lg bg-green-50">
                        <Sprout className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-green-600">Gartenarbeiten</h3>
                    </div>
                    <p className="text-gray-600 mb-3 text-base leading-relaxed">
                      Vergleichen Sie Gartenarbeiten Offerten von professionellen Gartenfirmen.
                    </p>
                    <ul className="space-y-3">
                      <li>
                        <Link href="/gartenarbeiten"
                          className="group flex items-center text-gray-700 hover:text-green-600 transition-colors text-base md:text-lg py-2 px-2 rounded-md hover:bg-green-50"
                        >
                          <ArrowRight className="w-5 h-5 mr-2.5 text-green-600 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                          <span className="group-hover:underline font-semibold">Gartenarbeiten</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-green-50/30 overflow-hidden">
            <div className="container mx-auto max-w-navbar px-4 md:px-6">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                  Kosten sparen mit dem richtigen Anbieter – Offerten einfach vergleichen
                  </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Mit nur einer kostenlosen Anfrage erhalten Sie mehrere transparente Offerten von geprüften Partnern.
                  <br />
                  Sparen Sie Zeit und Geld und finden Sie den passenden Partner für Ihr Projekt.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                {/* Feature Card 1 */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <Home className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Offerten für Umzüge</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Vergleichen Sie Preise für private Umzüge, Geschäftsumzüge und internationale Transporte.
                    <br />
                    Sparen Sie bis zu 40 % mit professionellen Anbietern.
                  </p>
                </div>

                {/* Feature Card 2 */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Reinigungsofferten vergleichen</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Umzugsreinigung mit Abnahmegarantie sowie Wohnungs- und Büroreinigung.
                    <br />
                    Finden Sie geprüfte Profis für jeden Reinigungsbedarf.
                  </p>
                </div>

                {/* Feature Card 3 */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <Paintbrush className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Renovationsofferten vergleichen</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Malerarbeiten, Renovationen und Modernisierungen.
                    <br />
                    Vergleichen Sie transparente Preise für alle Renovationsprojekte.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
                <div className="max-w-full">
                  <div className="text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      Warum Offerten vergleichen?
                    </h3>
                    <div className="mt-8 prose prose-lg max-w-none text-gray-700 space-y-6 text-base md:text-lg leading-relaxed text-left">
                      <p>
                        Wenn Sie in der Schweiz einen Umzug, eine Reinigung oder Renovierungsarbeiten planen, ist das Einholen mehrerer Offerten ein entscheidender Schritt für eine fundierte Entscheidung. Ein Vergleich verschiedener Anbieter hilft Ihnen dabei, die beste Leistung zum fairen Preis zu finden – unabhängig davon, ob es sich um einen Privatumzug, eine professionelle Reinigung oder eine Renovation handelt.
                    </p>

                      <div>
                        <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 mt-6">
                          Mehr Transparenz bei Umzugsofferten
                        </h4>
                        <p>
                          Gerade bei Umzügen können sich Preise und Leistungen je nach Anbieter deutlich unterscheiden. Durch den Vergleich mehrerer <Link href="/umzugsofferten" className="text-green-600 hover:text-green-700 font-semibold underline">Umzugsofferten</Link> sparen Sie Geld und stellen sicher, dass alle wichtigen Leistungen – von der Verpackung bis zur Montage am Zielort – transparent aufgeführt sind.
                    </p>
                  </div>

                      <div>
                        <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 mt-6">
                          Reinigungsofferten vergleichen lohnt sich
                        </h4>
                        <p>
                          Auch bei Reinigungsarbeiten gibt es grosse Unterschiede bei Preis, Umfang und Servicequalität. Ob Umzugsreinigung mit Abnahmegarantie, Wohnungs- oder Büroreinigung – durch den Vergleich mehrerer Reinigungsofferten finden Sie ein Angebot, das zu Ihrem Budget und Ihren Qualitätsansprüchen passt.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 mt-6">
                          Renovierungsofferten für langfristige Investitionen
                        </h4>
                        <p>
                          Renovations- und <Link href="/malerfirma" className="text-green-600 hover:text-green-700 font-semibold underline">Malerarbeiten</Link> sind oft langfristige Investitionen. Ein sorgfältiger Vergleich mehrerer Renovierungsofferten hilft Ihnen, unnötige Kosten zu vermeiden und einen zuverlässigen Anbieter zu finden.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 mt-6">
                          Offerten vergleichen – einfach & kostenlos
                        </h4>
                        <p>
                          Online-Offerten.ch macht das Offerten vergleichen in der Schweiz einfach und effizient. Nach Auswahl Ihres gewünschten Services erhalten Sie mehrere transparente Offerten von geprüften Anbietern aus Ihrer Region. Alle Partner werden sorgfältig geprüft und erfüllen hohe Qualitätsstandards.
                        </p>
                        <p className="mt-4">
                          Starten Sie jetzt Ihren Offertenvergleich und finden Sie den passenden Anbieter für Umzug, Reinigung oder Renovierung – kostenlos und unverbindlich.
                        </p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white group px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                      <Link href="/kostenlose-offerte-anfordern">
                        Jetzt kostenlose Offerten anfordern
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
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
          <section className="py-16 md:py-24 bg-gradient-to-br from-green-900 via-emerald-900 to-green-800 overflow-hidden relative">
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
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">
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
                <p className="text-lg text-green-50 font-medium">
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
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Planen Sie Ihren Umzug effizient mit unseren praktischen Tools und hilfreichen Ratgebern.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {[
                  { icon: <Calculator />, title: 'Umzugskosten-Rechner', description: 'Erhalten Sie in wenigen Schritten eine unverbindliche Schätzung Ihrer Umzugskosten.', linkTo: '/umzugskosten-rechner', button: 'Jetzt berechnen' },
                  { icon: <Sparkles />, title: 'Reinigungskosten-Rechner', description: 'Kalkulieren Sie schnell und einfach die Kosten für Ihre Umzugsreinigung.', linkTo: '/reinigungskosten-rechner', button: 'Kosten berechnen' },
                  { icon: <ListChecks />, title: 'Umzugs-Checklisten', description: 'Behalten Sie jederzeit den Überblick mit unseren übersichtlichen Umzugs-Checklisten.', linkTo: '/checklisten', button: 'Checkliste ansehen' },
                  { icon: <BookOpen />, title: 'Ratgeber & Tipps', description: 'Profitieren Sie von unserem Expertenwissen rund um Umzug und Reinigung.', linkTo: '/ratgeber', button: 'Jetzt informieren' }
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

          {/* FAQ Section */}
          <section className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto max-w-navbar px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center mb-4">
                    <HelpCircle className="w-8 h-8 md:w-10 md:h-10 text-green-600 mr-3" />
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
                      Häufig gestellte Fragen
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600 mt-4">
                    Alles, was Sie über unseren Service wissen möchten
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-4">
                  {[
                    {
                      value: "faq-1",
                      question: "Wie funktioniert der Offertenvergleich auf Online-Offerten.ch?",
                      answer: "Der Prozess ist ganz einfach: Füllen Sie unser kurzes Online-Formular aus und beschreiben Sie Ihr Projekt (Umzug, Reinigung, Malerarbeiten oder Gartenpflege). Wir leiten Ihre Anfrage dann an bis zu 4 passende, geprüfte Partnerfirmen aus Ihrer Region weiter. Diese senden Ihnen innerhalb kurzer Zeit kostenlose und unverbindliche Offerten zu. Sie können die Angebote in Ruhe vergleichen und das beste für sich auswählen."
                    },
                    {
                      value: "faq-2",
                      question: "Ist der Service wirklich kostenlos und unverbindlich?",
                      answer: "Ja, absolut! Die Nutzung von Online-Offerten.ch ist für Sie vollständig kostenlos und unverbindlich. Sie zahlen nichts für die Vermittlung oder den Vergleich der Offerten. Kosten entstehen nur, wenn Sie sich für eine der angebotenen Firmen entscheiden und deren Dienstleistung in Anspruch nehmen. Es gibt keine versteckten Gebühren oder verpflichtende Verträge."
                    },
                    {
                      value: "faq-3",
                      question: "Wie viele Offerten erhalte ich und wie schnell?",
                      answer: "Sie erhalten in der Regel zwischen 3 und 4 passende Offerten von verschiedenen Partnerfirmen. Die meisten Firmen antworten innerhalb von 24-48 Stunden auf Ihre Anfrage. In dringenden Fällen können Sie auch schneller Offerten erhalten. Alle Offerten werden Ihnen direkt per E-Mail zugesendet, sodass Sie sie bequem vergleichen können."
                    },
                    {
                      value: "faq-4",
                      question: "Sind die Partnerfirmen geprüft und versichert?",
                      answer: "Ja, alle Partnerfirmen auf unserer Plattform werden von uns sorgfältig geprüft. Wir verifizieren ihre Geschäftslizenzen, Versicherungen und Qualifikationen. Zudem sammeln wir regelmässig Kundenbewertungen, um sicherzustellen, dass nur zuverlässige und professionelle Firmen in unserem Netzwerk sind. Ihre Sicherheit und Zufriedenheit stehen für uns an erster Stelle."
                    },
                    {
                      value: "faq-5",
                      question: "Bin ich verpflichtet, eine der Offerten anzunehmen?",
                      answer: "Nein, Sie sind zu nichts verpflichtet. Der gesamte Service ist vollständig unverbindlich. Sie können alle Offerten in Ruhe vergleichen und entscheiden, ob Sie eine davon annehmen möchten oder nicht. Es entstehen keine Kosten oder Verpflichtungen, wenn Sie keine der Offerten annehmen. Sie können den Service jederzeit kostenlos nutzen, ohne sich festzulegen."
                    },
                    {
                      value: "faq-6",
                      question: "Kann ich durch den Vergleich wirklich sparen?",
                      answer: "Ja, durch den Vergleich mehrerer Offerten können Sie durchschnittlich 20-40% sparen. Verschiedene Firmen haben unterschiedliche Preismodelle und können Ihnen bessere Konditionen anbieten. Durch den direkten Vergleich sehen Sie sofort, welche Firma das beste Preis-Leistungs-Verhältnis für Ihr Projekt bietet. Zudem können Sie auch die Leistungen und Bewertungen der Firmen vergleichen."
                    },
                    {
                      value: "faq-7",
                      question: "Für welche Dienstleistungen kann ich Offerten anfordern?",
                      answer: "Sie können Offerten für Umzüge (Privatumzug, Geschäftsumzug, Auslandumzug, Spezialtransporte), Reinigungsdienstleistungen (Wohnungsreinigung, Büroreinigung, Umzugsreinigung, Grundreinigung), Malerarbeiten (Innen- und Aussenanstriche) sowie Gartenpflege anfordern. Unser Netzwerk umfasst geprüfte Partnerfirmen für alle diese Bereiche in der ganzen Schweiz."
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={item.value}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <AccordionItem value={item.value} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow px-6">
                        <AccordionTrigger className="text-left hover:no-underline py-5 text-base md:text-lg font-semibold text-gray-800 hover:text-green-600 transition-colors">
                          <div className="flex items-start">
                            <HelpCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 mt-1" />
                            <span>{item.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-0 pb-5 text-gray-600 leading-relaxed text-base md:text-lg pl-8">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </motion.div>
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
                  <div className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed space-y-3">
                    <p>
                      Planen Sie frühzeitig und sichern Sie sich die besten Termine. Geprüfte Umzugs-, Reinigungs-, Maler- und Gartenfirmen sind besonders in den Sommermonaten und rund um Kündigungstermine schnell ausgebucht.
                    </p>
                    <p>
                      Starten Sie jetzt Ihre kostenlose Anfrage und erhalten Sie mehrere Offerten – unverbindlich und ohne Verpflichtung.
                  </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {[
                    { title: 'Kostenlose Offerten anfordern', text: 'Fordern Sie kostenlos und unverbindlich mehrere Offerten von geprüften Umzugs-, Reinigungs-, Maler- und Gartenfirmen an. Vergleichen Sie Preise und Leistungen und finden Sie den passenden Partner für Ihr Projekt.' },
                    { title: 'Zeit & Geld sparen', text: 'Vergleichen Sie mehrere Offerten und sparen Sie wertvolle Zeit, Geld und Aufwand bei der Suche nach dem richtigen Anbieter.' },
                    { title: 'Die beste Firma finden', text: 'Finden Sie die passende Firma in Ihrer Nähe – mit nur wenigen Klicks, einfach und stressfrei.' }
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

