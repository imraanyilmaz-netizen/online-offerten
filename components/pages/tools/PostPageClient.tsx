'use client'

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Calendar, Folder, Home, ChevronRight, ArrowLeft } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import TiptapRenderer from '@/components/AdminPanel/BlogManagement/TiptapRenderer.jsx';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import PostSidebar from '@/src/components/tools/PostSidebar';

interface PostPageClientProps {
    initialPost?: any;
    initialRecentPosts?: any[];
}

const PostPageClient = ({ initialPost, initialRecentPosts = [] }: PostPageClientProps) => {
    const params = useParams();
    const slug = params?.slug as string | undefined;
    
    const ratgeberBasePath = '/ratgeber';

    const post = initialPost;
    const recentPosts = initialRecentPosts;

    if (!post) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold mb-4">Fehler</h1>
                <p className="text-gray-600">Beitrag konnte nicht gefunden werden.</p>
                <Button asChild className="mt-4">
                    <Link href={ratgeberBasePath}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Zurück zum Ratgeber
                    </Link>
                </Button>
            </div>
        );
    }

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
                                    loading="eager"
                                    fetchPriority="high"
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
                                <div
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
                                                <div
                                                    key={index}
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
                                                </div>
                                            ))}
                                    </Accordion>
                                    </div>
                                </div>
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

