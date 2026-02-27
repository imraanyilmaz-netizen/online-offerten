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
        // Sadece platform yorumlarını say
        const { count: totalReviewCount, error: countError } = await supabase
          .from('customer_reviews')
          .select('*', { count: 'exact', head: true })
          .eq('approval_status', 'approved')
          .eq('review_type', 'platform') // Sadece platform yorumları
        
        // Sadece platform yorumlarının rating'lerini al
        const { data: allReviews, error: reviewsError } = await supabase
          .from('customer_reviews')
          .select('rating')
          .eq('approval_status', 'approved')
          .eq('review_type', 'platform') // Sadece platform yorumları
        
        // Average rating hesapla
        let averageRating = 4.8
        if (allReviews && allReviews.length > 0) {
          const totalRating = allReviews.reduce((sum, review) => sum + (review.rating || 0), 0)
          averageRating = totalRating / allReviews.length
        }
        
        const totalCount = totalReviewCount || 0 // Real count only - no manipulation
        
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
    <div className="sticky bottom-0 bg-white md:bg-gradient-to-r md:from-green-700 md:via-green-600 md:to-emerald-600 w-full py-3 md:py-4 z-[2000] overflow-hidden will-change-transform shadow-[0_-2px_10px_rgba(0,0,0,0.1)] md:shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        {/* Mobile Layout - Sadece Buton */}
        <div className="md:hidden">
          <Link 
            href="/kostenlose-offerte-anfordern" 
            className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-center py-4 px-6 rounded-xl text-sm transition-colors"
          >
            Kostenlose Offerten anfordern
          </Link>
        </div>

        {/* Desktop Layout - Professional Design */}
        <div className="hidden md:flex flex-row items-center justify-between gap-8 min-w-0">
          {/* Left Section - Branding & CTA Text */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <div className="flex flex-col">
              <span className="text-white/70 text-xs font-medium tracking-wider">Ihre Anfrage ist kostenlos und unverbindlich</span>
              <span className="text-white text-xl font-bold tracking-tight">
                Jetzt Offerten vergleichen
              </span>
            </div>
          </div>

          {/* Middle Section - Rating Badge */}
          <div className="flex items-center gap-6 flex-1 justify-center">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[...Array(fullStars)].map((_, i) => (
                  <Star key={`full-${i}`} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
                {hasHalfStar && (
                  <div className="relative">
                    <Star size={18} className="text-white/30" />
                    <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                      <Star size={18} className="text-yellow-400 fill-yellow-400" />
                    </div>
                  </div>
                )}
                {[...Array(emptyStars)].map((_, i) => (
                  <Star key={`empty-${i}`} size={18} className="text-white/30" />
                ))}
              </div>
              <div className="h-4 w-px bg-white/30"></div>
              <span className="text-sm font-semibold text-white whitespace-nowrap">
                {stats.average_rating.toFixed(1)} von 5 · <Link href="/kunden-bewertungen" className="underline hover:text-white/80 transition-colors">{stats.review_count} Bewertungen</Link>
              </span>
            </div>
          </div>

          {/* Right Section - CTA Button */}
          <div className="flex-shrink-0">
            <Button
              asChild
              size="lg"
              className="bg-white text-green-700 hover:bg-green-50 hover:text-green-800 font-bold px-8 py-3.5 rounded-full whitespace-nowrap shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 group text-base"
            >
              <Link href="/kostenlose-offerte-anfordern" className="flex items-center gap-2">
                <span>Kostenlose Offerten anfordern</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterCTABanner



