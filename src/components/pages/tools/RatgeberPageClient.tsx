'use client'

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import RatgeberSidebar from '@/src/components/tools/RatgeberSidebar';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

type Post = {
  id: string | number
  slug?: string | null
  title?: string | null
  category?: string | null
  meta_description?: string | null
  featured_image_url?: string | null
  created_at?: string | null
  read_more_text?: string | null
}

type RatgeberPageClientProps = {
  initialPosts: Post[]
  tagFilter?: string | null
}

const RatgeberPageClient = ({ initialPosts, tagFilter }: RatgeberPageClientProps) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts || []);
  const [visibleCount, setVisibleCount] = useState(10);
  
  const ratgeberBasePath = '/ratgeber';

  useEffect(() => {
    setPosts(initialPosts || [])
    setVisibleCount(10)
  }, [initialPosts, tagFilter])

  const getReadMoreText = (post: any) => {
    if (post.read_more_text && post.read_more_text.trim() !== '') {
      return post.read_more_text;
    }
    return `Weiterlesen`;
  };

  const formatPostDate = (value?: string | null) => {
    if (!value) return ''
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''
    return date.toLocaleDateString('de-DE')
  }

  const recentPosts = posts.slice(0, 5);

  return (
    <>
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <main className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-8">
                {posts.slice(0, visibleCount).map(post => {
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
                          <span>{formatPostDate(post.created_at)}</span>
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

              {/* Weitere Artikel laden */}
              {posts.length > visibleCount && (
                <div className="mt-10 text-center">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="group border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all"
                    onClick={() => setVisibleCount(prev => prev + 5)}
                  >
                    Weitere Artikel anzeigen
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              )}
            </main>
            
            <aside className="lg:col-span-4">
              <RatgeberSidebar recentPosts={recentPosts} />
            </aside>

          </div>
        </div>
      </div>
    </>
  );
};

export default RatgeberPageClient;


