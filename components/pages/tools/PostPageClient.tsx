'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Tag, Folder, Home, ChevronRight, Loader2, ArrowLeft, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import TiptapRenderer from '@/components/AdminPanel/BlogManagement/TiptapRenderer.jsx';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import PostSidebar from '@/src/components/tools/PostSidebar';

const PostPageClient = () => {
    const params = useParams();
    const slug = params?.slug as string | undefined;
    const [post, setPost] = useState<any>(null);
    const [recentPosts, setRecentPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const ratgeberBasePath = '/ratgeber';

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            
            const { data: postData, error: postError } = await supabase
                .from('posts')
                .select('*, meta_title, faq, faq_title, faq_description, custom_html')
                .eq('slug', slug)
                .single();

            if (postError || !postData) {
                console.error('Error fetching post:', postError);
                setError('Beitrag konnte nicht gefunden werden.');
                setLoading(false);
                return;
            }
            
            setPost(postData);

            const { data: recentData, error: recentError } = await supabase
                .from('posts')
                .select('title, slug, featured_image_url')
                .eq('status', 'published')
                .neq('slug', slug)
                .order('published_at', { ascending: false })
                .limit(5);

            if (recentError) {
                console.error('Error fetching recent posts:', recentError);
            } else {
                setRecentPosts(recentData || []);
            }

            setLoading(false);
        };

        window.scrollTo(0, 0);
        fetchPost();
    }, [slug]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="w-12 h-12 animate-spin text-green-600" /></div>;
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold mb-4">Fehler</h1>
                <p className="text-gray-600">{error}</p>
                <Button asChild className="mt-4">
                    <Link href={ratgeberBasePath}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Zurück zum Ratgeber
                    </Link>
                </Button>
            </div>
        );
    }
    
    if (!post) return null;

    const canonicalUrl = `https://online-offerten.ch${ratgeberBasePath}/${slug}`;

    return (
        <>
            
            
            <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12 overflow-x-visible">
                <nav className="flex items-center text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-green-600 flex items-center">
                        <Home className="h-4 w-4 mr-1.5" /> Startseite
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-1.5" />
                    <Link href={ratgeberBasePath} className="hover:text-green-600">Ratgeber</Link>
                    <ChevronRight className="h-4 w-4 mx-1.5" />
                    <span className="font-medium text-gray-700 truncate max-w-[200px] md:max-w-xs">{post.meta_title && post.meta_title.trim() ? post.meta_title.trim() : post.title}</span>
                </nav>

                <div className="min-w-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <main className="lg:col-span-2 min-w-0 overflow-x-visible">
                            <article className="bg-white p-6 md:p-8 rounded-2xl shadow-lg overflow-visible min-w-0 max-w-full">
                            {post.featured_image_url && (
                                <ImageWithFallback
                                    src={post.featured_image_url}
                                    alt={post.title}
                                    className="w-full h-auto max-h-[500px] object-cover rounded-xl mb-8 shadow-md"
                                />
                            )}
                            <h1 className="text-[26px] font-extrabold text-gray-900 mb-4 leading-normal break-words w-full min-w-0 max-w-none -mx-6 md:-mx-8 px-6 md:px-8" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere', width: 'calc(100% + 3rem)', maxWidth: 'none', overflow: 'visible', textOverflow: 'unset', whiteSpace: 'normal' }}>{post.title && post.title.trim() ? post.title.trim() : (post.meta_title && post.meta_title.trim() ? post.meta_title.trim() : '')}</h1>
                            
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-6 border-b pb-4">
                                {post.category && (
                                    <div className="flex items-center">
                                        <Folder className="h-4 w-4 mr-1.5" />
                                        <span>{post.category}</span>
                                    </div>
                                )}
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1.5" />
                                    <span>{new Date(post.created_at).toLocaleDateString('de-DE')}</span>
                                </div>
                            </div>
                            
                            <TiptapRenderer jsonContent={post.content} />

                            {/* FAQ Section */}
                            {post.faq && Array.isArray(post.faq) && post.faq.length > 0 && post.faq.some((faq: any) => faq.question?.trim() && faq.answer?.trim()) && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="mt-16 pt-12 border-t border-gray-200"
                                >
                                    <div className="text-left mb-12">
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                                {post.faq_title && post.faq_title.trim() ? post.faq_title.trim() : 'Häufige Fragen (FAQ)'}
                                            </h2>
                                        <p className="text-base text-gray-600">
                                            {post.faq_description && post.faq_description.trim() ? post.faq_description.trim() : 'Antworten auf die wichtigsten Fragen'}
                                        </p>
                                    </div>
                                    <div className="w-full">
                                        <Accordion type="single" collapsible className="w-full space-y-4">
                                        {post.faq
                                            .filter((faq: any) => faq.question?.trim() && faq.answer?.trim())
                                            .map((faq: any, index: number) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 15 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                        transition={{ delay: index * 0.05, duration: 0.3 }}
                                                >
                                                    <AccordionItem 
                                                        value={`item-${index}`} 
                                                            className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                                                    >
                                                            <AccordionTrigger className="text-left hover:no-underline py-5 px-6 hover:bg-gray-50 transition-colors">
                                                                <h4 className="faq-question pr-8">{faq.question.trim()}</h4>
                                                        </AccordionTrigger>
                                                            <AccordionContent className="px-6 pb-6 pt-0">
                                                                <div className="pt-2 border-t border-gray-100">
                                                                    <p className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">{faq.answer.trim()}</p>
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </motion.div>
                                            ))}
                                    </Accordion>
                                    </div>
                                </motion.div>
                            )}

                             <Button asChild variant="outline" className="mt-8">
                                <Link href={ratgeberBasePath}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Zurück zur Übersicht
                                </Link>
                            </Button>
                        </article>
                    </main>
                    
                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <PostSidebar 
                            category={post.category}
                            tags={post.tags}
                            recentPosts={recentPosts}
                            ratgeberBasePath={ratgeberBasePath}
                        />
                    </aside>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostPageClient;