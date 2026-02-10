import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
// framer-motion removed – using CSS animation for better INP
import { logoUrl } from '@/assets/logoConstants';
// Supabase will be lazy loaded

const StarRating = ({ rating, starSize = 14 }) => {
  const totalStars = 5;
  const displayRating = Math.round((rating || 0) * 2) / 2;
  const fullStars = Math.floor(displayRating);
  const hasHalfStar = displayRating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex text-yellow-400">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={starSize} className="fill-yellow-400" />
      ))}
      {hasHalfStar && (
        <div style={{ position: 'relative' }}>
            <Star key="half-empty" size={starSize} className="text-gray-300" />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
                <Star key="half-full" size={starSize} className="text-yellow-400 fill-yellow-400" />
            </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={starSize} className="text-gray-300" />
      ))}
    </div>
  );
};


const FloatingReviewSummary = () => {
  const [stats, setStats] = useState({ average_rating: 0, review_count: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lazy load Supabase - defer to avoid blocking critical rendering path
    const fetchRating = async () => {
      // Küçük gecikme ile critical rendering'i engellemeden yükle
      await new Promise(resolve => setTimeout(resolve, 1000));
      try {
        const { supabase } = await import('@/lib/supabaseClient');
        
        // Tüm onaylanmış yorumları say (sınırsız)
        const { count: totalReviewCount, error: countError } = await supabase
          .from('customer_reviews')
          .select('*', { count: 'exact', head: true })
          .eq('approval_status', 'approved');
        
        if (countError) {
          console.error('Error fetching review count:', countError);
        }
        
        // Tüm onaylanmış yorumların rating'lerini al (average hesaplamak için)
        const { data: allReviews, error: reviewsError } = await supabase
          .from('customer_reviews')
          .select('rating')
          .eq('approval_status', 'approved');
        
        if (reviewsError) {
          console.error('Error fetching reviews for average:', reviewsError);
        }
        
        // Average rating hesapla
        let averageRating = 0;
        if (allReviews && allReviews.length > 0) {
          const totalRating = allReviews.reduce((sum, review) => sum + (review.rating || 0), 0);
          averageRating = totalRating / allReviews.length;
        }
        
        setStats({
          average_rating: averageRating,
          review_count: totalReviewCount || 0  // Real count only - no manipulation
        });
      } catch (error) {
        // Fallback if Supabase fails to load - don't block page
        setStats({ average_rating: 0, review_count: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchRating();
  }, []);

  if (loading) {
    return null;
  }

  if (!stats.review_count || stats.review_count === 0 || !stats.average_rating || stats.average_rating === 0) {
    return null;
  }

  return (
    <div
      className="fixed bottom-4 left-0 right-0 z-[99999] flex justify-center animate-slide-up"
      style={{ 
        position: 'fixed',
        pointerEvents: 'auto',
        animation: 'slideUp 0.5s ease-out 0.7s both'
      }}
    >
      <div className="w-full max-w-navbar mx-auto px-4">
        <div className="flex justify-start">
          {/* Mobile view */}
          <div className="lg:hidden bg-white/90 backdrop-blur-md shadow-lg rounded-xl border border-gray-200 px-4 py-2 flex items-center space-x-4">
            <img src={logoUrl} alt="Website Logo" className="h-6 w-6 object-contain" loading="lazy" decoding="async" width="24" height="24" />
            <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-gray-800">{stats.average_rating.toFixed(1)}</span>
                <StarRating rating={stats.average_rating} />
            </div>
            <div className="h-6 w-px bg-gray-200"></div>
            <div className="text-center">
                 <span className="font-bold text-lg text-gray-800">{stats.review_count}</span>
                 <span className="text-xs text-gray-600 block leading-tight">Bewert.</span>
            </div>
          </div>
          
          {/* Desktop view */}
          <div className="hidden lg:flex bg-white/80 backdrop-blur-md shadow-lg rounded-xl border border-gray-200 px-4 py-2 flex items-center space-x-4">
            <img src={logoUrl} alt="Website Logo" className="h-6 w-6 object-contain" loading="lazy" decoding="async" width="24" height="24" />
            <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-gray-800">{stats.average_rating.toFixed(1)}</span>
                <StarRating rating={stats.average_rating} />
            </div>
            <div className="h-6 w-px bg-gray-200"></div>
            <div className="text-center">
                 <span className="font-bold text-lg text-gray-800">{stats.review_count}</span>
                 <span className="text-xs text-gray-600 block leading-tight">Bewertungen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingReviewSummary;