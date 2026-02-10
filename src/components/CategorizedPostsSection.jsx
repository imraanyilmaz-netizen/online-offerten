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
        <Card className="flex flex-col h-full overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100 rounded-xl">
            <Link href={`/ratgeber/${post.slug}`} className="block group">
                <div className="aspect-video overflow-hidden rounded-t-xl">
                    <img 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                        alt={post.title}
                        src={post.featured_image_url || fallbackImageUrl} 
                        onError={(e) => { e.target.onerror = null; e.target.src=fallbackImageUrl; }}
                    />
                </div>
            </Link>
            <CardContent className="p-6 flex flex-col flex-grow">
                {post.category && <Badge variant="secondary" className="mb-3 self-start bg-green-100 text-green-900">{post.category}</Badge>}
                <h3 className="text-xl font-bold mb-2 text-gray-900 flex-grow group-hover:text-green-700 transition-colors">
                    <Link href={`/ratgeber/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-gray-700 text-sm mb-4">{excerpt}</p>
                <div className="mt-auto">
                    <Button asChild variant="link" className="p-0 self-start text-green-700 hover:text-green-800 font-semibold">
                        <Link href={`/ratgeber/${post.slug}`}>
                            {getReadMoreText(post)} <ArrowRight className="ml-2 w-4 h-4" />
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