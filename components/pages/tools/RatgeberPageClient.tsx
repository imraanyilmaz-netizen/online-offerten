'use client'

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Loader2, ArrowRight } from 'lucide-react';
import RatgeberSidebar from '@/src/components/tools/RatgeberSidebar';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import SEO from '@/src/components/SEO';

const RatgeberPageClient = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const ratgeberBasePath = '/ratgeber';
  
  const metaTitle = "Ratgeber & Tipps für Umzug, Reinigung & Lagerung";
  const metaDescription = "Expertenwissen und praktische Tipps für Ihren Umzug, die Endreinigung und die richtige Lagerung. Machen Sie Ihren Übergang einfacher mit unserem Ratgeber.";
  const metaKeywords = "ratgeber, umzugsratgeber, reinigungsratgeber, umzugstipps, reinigungstipps, umzugscheckliste, reinigungscheckliste, umzug planen, schweiz, umzugsguide, reinigungsguide, lagerung tipps";

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const params = new URLSearchParams(searchParams?.toString());
      const tagFilter = params.get('tag');

      let query = supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (tagFilter) {
        // nur Beiträge mit diesem Tag
        query = query.contains('tags', [tagFilter.toLowerCase()]);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching posts:', error);
        setError('Beiträge konnten nicht geladen werden.');
      } else {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [searchParams?.toString()]);

  const getReadMoreText = (post: any) => {
    if (post.read_more_text && post.read_more_text.trim() !== '') {
      return post.read_more_text;
    }
    return `Weiterlesen`;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="w-12 h-12 animate-spin text-green-600" /></div>;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Fehler</h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  const recentPosts = posts.slice(0, 5);

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        keywords={metaKeywords}
        canonicalUrl={`https://online-offerten.ch${ratgeberBasePath}`}
        ogImageUrl="https://online-offerten.ch/image/online-offerten.ch.jpg"
        schemaMarkup={posts.length > 0 ? {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": metaTitle,
          "description": metaDescription,
          "url": `https://online-offerten.ch${ratgeberBasePath}`,
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": posts.slice(0, 10).filter(post => post?.slug).map((post, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": post.title,
              "url": `https://online-offerten.ch${ratgeberBasePath}/${post.slug}`
            }))
          }
        } : {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": metaTitle,
          "description": metaDescription,
          "url": `https://online-offerten.ch${ratgeberBasePath}`
        }}
      />
      <div className="bg-gray-50/70">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <div className="text-center mb-12">
            <h1 className="text-[36px] font-extrabold text-gray-900 mb-4 leading-tight">
              Unser Ratgeber
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hier finden Sie nützliche Artikel, Tipps und Checklisten rund um Umzug, Reinigung und weitere Dienstleistungen, um Ihnen die Planung zu erleichtern.
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <main className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-8">
                {posts.map(post => {
                  if (!post?.slug) return null;
                  const postHref = `${ratgeberBasePath}/${post.slug}`;
                  return (
                  <Link 
                    key={post.id} 
                    href={postHref}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row items-center"
                  >
                    <div className="w-full md:w-1/3 h-48 md:h-full overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow w-full md:w-2/3">
                      {post.category && (
                        <Badge variant="secondary" className="mb-2 self-start">
                          {post.category}
                        </Badge>
                      )}
                      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors duration-300">
                        {post.title}
                      </h2>
                      <p className="text-gray-700 text-sm mb-4 flex-grow line-clamp-3">
                        {post.meta_description || "Keine Beschreibung verfügbar."}
                      </p>
                      <div className="mt-auto flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{new Date(post.created_at).toLocaleDateString('de-DE')}</span>
                        </div>
                        <div className="text-green-700 font-semibold text-sm flex items-center">
                          {getReadMoreText(post)} <ArrowRight className="ml-1.5 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                  );
                })}
              </div>
            </main>
            
            <aside className="lg:col-span-4 mt-12 lg:mt-0">
              <RatgeberSidebar recentPosts={recentPosts} />
            </aside>

          </div>
        </div>
      </div>
    </>
  );
};

export default RatgeberPageClient;


