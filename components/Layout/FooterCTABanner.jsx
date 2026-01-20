'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Star, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'

const FooterCTABanner = () => {
  const [stats, setStats] = useState({ 
    average_rating: 4.8, 
    review_count: 142 
  })
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const fetchRating = async () => {
      try {
        // Tüm onaylanmış yorumları say
        const { count: totalReviewCount, error: countError } = await supabase
          .from('customer_reviews')
          .select('*', { count: 'exact', head: true })
          .eq('approval_status', 'approved')
        
        // Tüm onaylanmış yorumların rating'lerini al
        const { data: allReviews, error: reviewsError } = await supabase
          .from('customer_reviews')
          .select('rating')
          .eq('approval_status', 'approved')
        
        // Average rating hesapla
        let averageRating = 4.8
        if (allReviews && allReviews.length > 0) {
          const totalRating = allReviews.reduce((sum, review) => sum + (review.rating || 0), 0)
          averageRating = totalRating / allReviews.length
        }
        
        const totalCount = (totalReviewCount || 0) + 142
        
        setStats({
          average_rating: averageRating,
          review_count: totalCount
        })
      } catch (error) {
        console.error('Error fetching review stats:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchRating()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // Sayfa 200px aşağı kaydırıldığında göster
      const scrollY = window.scrollY || window.pageYOffset
      setIsVisible(scrollY > 200)
    }

    // İlk kontrol
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading || !isVisible) {
    return null
  }

  const fullStars = Math.floor(stats.average_rating)
  const hasHalfStar = stats.average_rating % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="sticky bottom-0 bg-green-600 w-full py-4 px-2 md:px-6 z-[2000] overflow-hidden">
      <div className="container mx-auto max-w-navbar px-2 md:px-0">
        <div className="flex flex-row items-center justify-between gap-2 md:gap-6 min-w-0 relative" style={{ left: '4px', top: '-5px' }}>
          {/* Left Section - Text (Index 0) - Nur Desktop */}
          <div className="hidden md:flex items-center gap-4 order-1 md:order-1 flex-shrink-0">
            <div className="h-12 w-px bg-white/30"></div>
            <div className="text-white text-base md:text-lg font-bold leading-tight tracking-tight whitespace-nowrap h-8">
              Jetzt kostenlos Offerten einholen
            </div>
          </div>

          {/* Middle Section - Rating (Yeni tasarım) */}
          <div className="bg-green-600 rounded-lg px-3 py-2.5 md:px-5 md:py-3 flex items-center gap-2 md:gap-2 order-1 md:order-2 md:ml-4 flex-shrink-0 min-w-0">
            <div className="flex items-center gap-0.5 md:gap-1 flex-shrink-0">
              {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} size={16} className="md:w-4 md:h-4 text-yellow-400 fill-yellow-400" />
              ))}
              {hasHalfStar && (
                <div className="relative flex-shrink-0">
                  <Star size={16} className="md:w-4 md:h-4 text-gray-300" />
                  <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                    <Star size={16} className="md:w-4 md:h-4 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
              )}
              {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} size={16} className="md:w-4 md:h-4 text-gray-300" />
              ))}
            </div>
            <span className="text-xs md:text-xs font-bold text-white whitespace-nowrap min-w-0">
              <span className="md:hidden">Ø {stats.average_rating.toFixed(1)}/5 ({stats.review_count})</span>
              <span className="hidden md:inline">Ø {stats.average_rating.toFixed(1)}/5 ({stats.review_count} Kundenbewertungen)</span>
            </span>
          </div>

          {/* Right Section - Button */}
          <div className="order-2 md:order-3 flex-shrink-0">
            <Button
              asChild
              className="bg-white text-blue-600 hover:bg-gray-50 hover:text-blue-700 font-bold px-4 py-2.5 md:px-6 md:py-3 rounded-lg whitespace-nowrap shadow-md transition-all duration-200 hover:shadow-lg group text-xs md:text-base leading-tight"
            >
              <Link href="/kostenlose-offerte-anfordern" className="flex items-center">
                <span className="hidden sm:inline">ANFRAGE STARTEN</span>
                <span className="sm:hidden">ANFRAGE STARTEN</span>
                <ArrowRight className="ml-1 md:ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1 flex-shrink-0" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterCTABanner

