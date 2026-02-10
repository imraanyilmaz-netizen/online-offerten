import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { BookOpen, Loader2, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CleaningRatgeberSidebar = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // Sadece reinigung kategorisindeki Ratgeber'ları çek
        // Önce tüm published postları çek, sonra client-side'da filtrele
        const { data: allPosts, error } = await supabase
          .from('posts')
          .select('id, title, slug, meta_description, featured_image_url, category')
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(20);
        
        if (error) {
          console.error('Error fetching posts:', error);
          setPosts([]);
        } else {
          // Client-side'da reinigung kategorisini filtrele (case-insensitive)
          const cleaningPosts = (allPosts || []).filter(post => {
            const category = (post.category || '').toLowerCase();
            return category === 'reinigung' || category.includes('reinigung');
          }).slice(0, 3);
          
          setPosts(cleaningPosts);
          
          // Debug
          console.log('All posts:', allPosts?.length);
          console.log('Cleaning posts filtered:', cleaningPosts.length);
          console.log('Categories found:', [...new Set(allPosts?.map(p => p.category))]);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg md:text-xl font-bold text-gray-900">Ratgeber</h3>
      </div>
      <div className="space-y-4">
        {posts.filter(post => post?.slug).map((post) => (
          <Link
            key={post.id}
            href={`/ratgeber/${post.slug}`}
            className="block group"
          >
            <Card className="hover:shadow-md transition-shadow border border-gray-200">
              <CardContent className="p-4">
                {post.featured_image_url && (
                  <div className="aspect-video overflow-hidden rounded-lg mb-3">
                    <img
                      src={post.featured_image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
                <h4 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                {post.meta_description && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {post.meta_description}
                  </p>
                )}
                <div className="flex items-center text-sm text-blue-600 font-medium group-hover:text-blue-700">
                  Weiterlesen
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <Link href="/ratgeber?category=reinigung"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
        >
          Alle Ratgeber anzeigen
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default CleaningRatgeberSidebar;

