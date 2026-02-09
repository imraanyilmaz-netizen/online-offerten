import React from 'react';
// Removed useTranslation
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, ShieldCheck, Send } from 'lucide-react';
import QualityBadge from './QualityBadge';
import StarRating from './StarRating';

const PartnerHero = ({ partner, onGetOffer, averageRating, reviewCount }) => {
  // Removed useTranslation
  const heroImageUrl = partner.hero_image_url || '/image/umzugsservice-Schweiz/umzug-reinigung-maler-gaertner-6-offerten-vergleichen.webp';
  
  // Gerçek yorum sayısı ve rating'i kullan (prop'tan gelen veya partner objesinden)
  const displayRating = averageRating !== undefined ? averageRating : (partner.average_rating || 0);
  const displayReviewCount = reviewCount !== undefined ? reviewCount : (partner.review_count || 0);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full py-8 md:py-12 lg:py-16 overflow-hidden bg-slate-50"
    >
      {/* Background Image - Right Side */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${heroImageUrl}')`,
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 100%)'
        }}
      ></div>
      
      {/* Gradient Overlay - White from left to right with shadow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
      
      {/* White shadow/glow effect towards the image */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20 pointer-events-none"></div>
      <div 
        className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 pointer-events-none"
        style={{
          boxShadow: 'inset -100px 0 100px -50px rgba(255, 255, 255, 0.8)'
        }}
      ></div>
      
      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="px-4 md:px-8 lg:px-10 py-6 md:py-8 lg:py-12">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
              className="flex-shrink-0 bg-white/90 rounded-2xl shadow-lg p-3 flex items-center justify-center mb-6 w-fit"
            >
              <img 
                src={partner.logo_url || '/image/logo-icon.avif'}
                alt={`${partner.company_name} Logo`} 
                className="max-w-40 max-h-40 md:max-w-48 md:max-h-48 w-auto h-auto object-contain"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/image/logo-icon.avif';
                }}
              />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6"
            >
              <h1 className="heading-1 mb-2">
                {partner.company_name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {displayRating > 0 && displayReviewCount > 0 && (
                  <div className="flex items-center">
                    <StarRating 
                      rating={displayRating} 
                      reviewCount={displayReviewCount} 
                      starSize={22} 
                      textSize="text-base"
                    />
                  </div>
                )}
                {partner.badge_tier && <QualityBadge tier={partner.badge_tier} />}
              </div>
            </motion.div>
            
            {/* "Angebot anfordern" butonu sadece aktif partner'lar için göster */}
            {partner.is_active && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-6"
              >
                <Button 
                  onClick={onGetOffer} 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg transition-transform transform hover:scale-105"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Angebot anfordern
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default PartnerHero;