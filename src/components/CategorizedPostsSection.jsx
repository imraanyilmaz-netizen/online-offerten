import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PostCard = ({ post }) => {
    const excerpt = post.meta_description || "Lesen Sie mehr...";
    const fallbackImageUrl = "https://images.unsplash.com/photo-1504983875-d3b163aba9e6?q=80&w=2070&auto=format&fit=crop";

    const getReadMoreText = (post) => {
        if (post.read_more_text && post.read_more_text.trim() !== '') {
            return post.read_more_text;
        }
        return `Weiterlesen`;
    };

    return (
        <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90 shadow-[0_2px_24px_-6px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.035] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200/70 hover:shadow-[0_18px_42px_-14px_rgba(15,23,42,0.14)] dark:border-border dark:bg-card/95 dark:ring-white/[0.06] dark:hover:border-emerald-800/55">
            <Link href={`/ratgeber/${post.slug}`} className="block">
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img 
                        className="h-full w-full object-cover transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-[1.02]" 
                        alt={post.title}
                        src={post.featured_image_url || fallbackImageUrl} 
                        onError={(e) => { e.target.onerror = null; e.target.src=fallbackImageUrl; }}
                    />
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
                    <Link href={`/ratgeber/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-muted-foreground">{excerpt}</p>
                <div className="mt-auto border-t border-slate-100 pt-4 dark:border-border">
                    <Button asChild variant="link" className="h-auto p-0 font-semibold text-emerald-800 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300">
                        <Link href={`/ratgeber/${post.slug}`} className="inline-flex items-center gap-1">
                            {getReadMoreText(post)} <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

const CategorizedPostsSection = ({ category, title, description }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            if (!category) {
                setLoading(false);
                return;
            }
            
            setLoading(true);
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('status', 'published')
                .eq('category', category)
                .order('published_at', { ascending: false })
                .limit(3);

            if (error) {
                console.error('Error fetching categorized posts:', error);
            } else {
                setPosts(data);
            }
            setLoading(false);
        };
        fetchPosts();
    }, [category]);

    if (loading) {
        return (
            <div className="py-12 md:py-16 flex justify-center items-center">
                <Loader2 className="w-8 h-8 animate-spin text-green-600" />
            </div>
        );
    }
    
    if (posts.length === 0) {
        return null;
    }

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
                        <BookOpen className="w-8 h-8 text-green-600" />
                        {title}
                    </h2>
                    {description && (
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            {description}
                        </p>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
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

export default CategorizedPostsSection;