import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
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
    // Lazy load Supabase - defer to avoid blocking critical rendering path (3+ seconds)
    const fetchRating = async () => {
      // Delay significantly to prioritize critical rendering
      // This prevents blocking the initial render and improves LCP
      await new Promise(resolve => setTimeout(resolve, 3000));
      try {
        const { supabase } = await import('@/lib/supabaseClient');
        const { data, error } = await supabase.rpc('get_recent_average_rating');
        if (!error && data) {
          setStats({
            average_rating: data.average_rating || 0,
            review_count: (data.review_count || 0) + 142
          });
        } else {
          setStats(prev => ({ ...prev, review_count: 142 }));
        }
      } catch (error) {
        // Fallback if Supabase fails to load - don't block page
        setStats(prev => ({ ...prev, review_count: 142 }));
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
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="fixed bottom-4 left-0 right-0 z-[99999] flex justify-center"
      style={{ 
        position: 'fixed',
        pointerEvents: 'auto'
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
    </motion.div>
  );
};

export default FloatingReviewSummary;