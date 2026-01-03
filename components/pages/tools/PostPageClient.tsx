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
import PostSidebar from '@/components/tools/PostSidebar';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

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
                .select('*, meta_title, faq')
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
                .order('published_at', { ascending: false })
                .limit(5);

            if (recentError) {
                console.error('Error fetching recent posts:', recentError);
            } else {
                setRecentPosts(recentData);
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
            
            
            <div className="container mx-auto max-w-navbar px-4 py-8 md:py-12">
                <nav className="flex items-center text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-green-600 flex items-center">
                        <Home className="h-4 w-4 mr-1.5" /> Startseite
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-1.5" />
                    <Link href={ratgeberBasePath} className="hover:text-green-600">Ratgeber</Link>
                    <ChevronRight className="h-4 w-4 mx-1.5" />
                    <span className="font-medium text-gray-700 truncate max-w-[200px] md:max-w-xs">{post.meta_title && post.meta_title.trim() ? post.meta_title.trim() : post.title}</span>
                </nav>

                <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                    <main className="lg:col-span-8">
                        <article className="bg-white p-6 md:p-8 rounded-2xl shadow-lg">
                            {post.featured_image_url && (
                                <ImageWithFallback
                                    src={post.featured_image_url}
                                    alt={post.title}
                                    className="w-full h-auto max-h-[500px] object-cover rounded-xl mb-8 shadow-md"
                                />
                            )}
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{post.meta_title && post.meta_title.trim() ? post.meta_title.trim() : post.title}</h1>
                            
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-6 border-b pb-4">
                                {post.category && (
                                    <div className="flex items-center">
                                        <Folder className="h-4 w-4 mr-1.5" />
                                        <span>{post.category}</span>
                                    </div>
                                )}
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1.5" />
                                    <span>{new Date(post.published_at || post.created_at).toLocaleDateString('de-DE')}</span>
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
                                    className="mt-12 pt-8 border-t border-gray-200"
                                >
                                    <div className="flex items-center mb-8">
                                        <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-full mr-4 shadow-sm">
                                            <HelpCircle className="w-7 h-7 text-green-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                                Häufige Fragen (FAQ)
                                            </h2>
                                            <p className="text-sm text-gray-500 mt-1">Antworten auf die wichtigsten Fragen</p>
                                        </div>
                                    </div>
                                    <Accordion type="single" collapsible className="w-full space-y-3">
                                        {post.faq
                                            .filter((faq: any) => faq.question?.trim() && faq.answer?.trim())
                                            .map((faq: any, index: number) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 15 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                                >
                                                    <AccordionItem 
                                                        value={`item-${index}`} 
                                                        className="border border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50/50 shadow-sm hover:shadow-lg transition-all duration-300 mb-3 overflow-hidden group"
                                                    >
                                                        <AccordionTrigger className="text-left hover:no-underline py-5 px-6 text-base md:text-lg font-semibold text-gray-800 hover:text-green-600 transition-colors">
                                                            <div className="flex items-start gap-4 w-full">
                                                                <div className="flex-shrink-0 mt-0.5">
                                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                                                                        <span className="text-white font-bold text-sm">{index + 1}</span>
                                                                    </div>
                                                                </div>
                                                                <span className="flex-1 pr-4 leading-snug">{faq.question.trim()}</span>
                                                            </div>
                                                        </AccordionTrigger>
                                                        <AccordionContent className="pt-2 pb-6 px-6 text-gray-700 leading-relaxed">
                                                            <div className="flex items-start gap-4 pl-14">
                                                                <div className="w-1 h-auto bg-gradient-to-b from-green-400 to-green-500 rounded-full flex-shrink-0 min-h-[40px]"></div>
                                                                <div className="flex-1 bg-green-50/50 rounded-lg p-4 border-l-4 border-green-400">
                                                                    <p className="whitespace-pre-wrap leading-relaxed text-base">{faq.answer.trim()}</p>
                                                                </div>
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </motion.div>
                                            ))}
                                    </Accordion>
                                </motion.div>
                            )}

                            {post.tags && post.tags.length > 0 && (
                                <div className="mt-8 pt-6 border-t">
                                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                                        <Tag className="h-5 w-5 mr-2 text-green-600"/>
                                        Tags
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag: string) => (
                                            <Badge key={tag} variant="secondary" asChild className="">
                                                <Link href={`${ratgeberBasePath}?tag=${encodeURIComponent(tag)}`}>
                                                    #{tag}
                                                </Link>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Internal Links Section */}
                            <div className="mt-8 pt-6 border-t">
                                <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                                        Weitere Informationen
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-3">Services</h4>
                                            <ul className="space-y-2">
                                                <li>
                                                    <Link href="/umzugsfirma" className="text-green-600 hover:text-green-700 font-medium underline">
                                                        Umzugsfirmen vergleichen
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/reinigung" className="text-green-600 hover:text-green-700 font-medium underline">
                                                        Reinigungsfirmen finden
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/malerfirma" className="text-green-600 hover:text-green-700 font-medium underline">
                                                        Malerfirmen vergleichen
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-3">Tools & Ratgeber</h4>
                                            <ul className="space-y-2">
                                                <li>
                                                    <Link href="/umzugskosten-rechner" className="text-green-600 hover:text-green-700 font-medium underline">
                                                        Umzugskosten berechnen
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/reinigungskosten-rechner" className="text-green-600 hover:text-green-700 font-medium underline">
                                                        Reinigungskosten berechnen
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/checklisten" className="text-green-600 hover:text-green-700 font-medium underline">
                                                        Umzugs-Checklisten
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={ratgeberBasePath} className="text-green-600 hover:text-green-700 font-medium underline">
                                                        Alle Ratgeber-Artikel
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                             <Button asChild variant="outline" className="mt-8">
                                <Link href={ratgeberBasePath}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Zurück zur Übersicht
                                </Link>
                            </Button>
                        </article>
                    </main>

                    <aside className="lg:col-span-4 mt-12 lg:mt-0">
                        <PostSidebar 
                            category={post.category} 
                            tags={post.tags}
                            recentPosts={recentPosts.filter(p => p.slug !== slug)}
                            ratgeberBasePath={ratgeberBasePath}
                        />
                    </aside>
                </div>
            </div>
        </>
    );
};

export default PostPageClient;