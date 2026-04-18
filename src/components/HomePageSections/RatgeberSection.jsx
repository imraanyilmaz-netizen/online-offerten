import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
// Supabase lazy loaded to reduce initial bundle size
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const PostCard = ({ post }) => {
    const excerpt = post.meta_description || "Lesen Sie mehr...";
    const tags = Array.isArray(post.tags) ? post.tags : [];
    const postUrl = `/ratgeber/${post.slug}`;

    const getReadMoreText = (post) => {
        if (post.read_more_text && post.read_more_text.trim() !== '') {
            return post.read_more_text;
        }
        return `${post.title} - Weiterlesen`;
    };

    return (
        <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90 shadow-[0_2px_24px_-6px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.035] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200/70 hover:shadow-[0_18px_42px_-14px_rgba(15,23,42,0.14)] dark:border-border dark:bg-card/95 dark:ring-white/[0.06] dark:hover:border-emerald-800/55">
            <Link href={postUrl} className="block">
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img src={post.featured_image_url || "https://images.unsplash.com/photo-1504983875-d3b163aba9e6"} alt={post.title} className="h-full w-full object-cover transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-[1.02]" loading="lazy" decoding="async" width="400" height="225" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent opacity-90 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-100 dark:from-black/45" aria-hidden />
                </div>
            </Link>
            <CardContent className="flex flex-grow flex-col p-6">
                {post.category && (
                    <Badge variant="outline" className="mb-3 w-fit self-start border-emerald-200/90 bg-emerald-50/80 px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-950/35 dark:text-emerald-200">
                        {post.category}
                    </Badge>
                )}
                <h3 className="mb-2 flex-grow text-xl font-semibold leading-snug tracking-tight text-slate-950 transition-colors group-hover:text-emerald-800 dark:text-foreground dark:group-hover:text-emerald-300">
                    <Link href={postUrl}>{post.title}</Link>
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-muted-foreground">{excerpt}</p>

                <div className="mt-auto border-t border-slate-100 pt-4 dark:border-border">
                    <Button asChild variant="link" className="h-auto p-0 font-semibold text-emerald-800 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300">
                        <Link href={postUrl} className="inline-flex items-center gap-1">
                            {getReadMoreText(post)} <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};


const RatgeberSection = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Calculate number of visible cards based on screen size
    const getVisibleCardsCount = () => {
        if (typeof window === 'undefined') return 1;
        const width = window.innerWidth;
        if (width >= 1024) return 3; // lg
        if (width >= 640) return 2; // sm
        return 1; // mobile
    };

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
            setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const checkScrollability = () => {
        const el = scrollContainerRef.current;
        if (el) {
            const hasOverflow = el.scrollWidth > el.clientWidth;
            setCanScrollLeft(el.scrollLeft > 0);
            setCanScrollRight(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
            
            // Calculate current index for dots indicator
            const containerWidth = el.clientWidth;
            const scrollLeft = el.scrollLeft;
            const gap = 24; // gap-6 = 1.5rem = 24px
            const visibleCards = getVisibleCardsCount();
            const cardWidth = containerWidth / visibleCards; // Card width based on visible cards
            const cardWidthWithGap = cardWidth + gap;
            
            // Calculate which page we're on
            const pageIndex = Math.round(scrollLeft / cardWidthWithGap);
            const totalPages = Math.ceil(posts.length / visibleCards);
            setCurrentIndex(Math.min(Math.max(0, pageIndex), totalPages - 1));
        }
    };

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (el && posts.length > 0) {
            checkScrollability();
            el.addEventListener('scroll', checkScrollability, { passive: true });
            window.addEventListener('resize', checkScrollability);

            return () => {
                el.removeEventListener('scroll', checkScrollability);
                window.removeEventListener('resize', checkScrollability);
            };
        }
    }, [posts.length]);

    const scroll = (direction) => {
        const el = scrollContainerRef.current;
        if (el) {
            const scrollAmount = el.clientWidth * 0.85;
            el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const scrollToIndex = (index) => {
        const el = scrollContainerRef.current;
        if (el) {
            const containerWidth = el.clientWidth;
            const gap = 24; // gap-6 = 1.5rem = 24px
            const visibleCards = getVisibleCardsCount();
            const cardWidth = containerWidth / visibleCards;
            const cardWidthWithGap = cardWidth + gap;
            el.scrollTo({ left: index * cardWidthWithGap, behavior: 'smooth' });
        }
    };

    const visibleCards = getVisibleCardsCount();
    const totalPages = Math.ceil(posts.length / visibleCards);

    if (loading) {
        return (
            <div className="py-12 md:py-24 bg-gray-50 flex justify-center items-center">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
        );
    }
    
    if (posts.length === 0) {
        return null;
    }

    return (
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
                        ref={scrollContainerRef}
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

                    {/* Mobile & Desktop Navigation Arrows */}
                    <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                            "absolute top-1/2 -translate-y-1/2 -left-2 md:-left-4 z-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white flex transition-opacity duration-300",
                            canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
                        )}
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                            "absolute top-1/2 -translate-y-1/2 -right-2 md:-right-4 z-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white flex transition-opacity duration-300",
                            canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
                        )}
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                    </Button>
                </div>

                {/* Dots Indicator for Mobile */}
                {totalPages > 1 && (
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
    );
};

export default RatgeberSection;