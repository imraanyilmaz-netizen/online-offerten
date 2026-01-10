'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ShieldCheck, Users, Clock, Star, TrendingUp, Award } from 'lucide-react'

interface TrustSignalsProps {
  variant?: 'compact' | 'full' | 'hero'
  showLabels?: boolean
  className?: string
}

export default function TrustSignals({ variant = 'full', showLabels = true, className = '' }: TrustSignalsProps) {
  const [stats, setStats] = useState({
    customerCount: 0,
    partnerCount: 0,
    reviewCount: 0,
    averageRating: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const supabase = createClient()
        
        // Fetch partner count
        const { count: partnerCount } = await supabase
          .from('partners')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active')

        // Tüm onaylanmış yorumları say (sınırsız)
        const { count: totalReviewCount, error: countError } = await supabase
          .from('customer_reviews')
          .select('*', { count: 'exact', head: true })
          .eq('approval_status', 'approved')
        
        if (countError) {
          console.error('Error fetching review count:', countError)
        }
        
        // Tüm onaylanmış yorumların rating'lerini al (average hesaplamak için)
        const { data: allReviews, error: reviewsError } = await supabase
          .from('customer_reviews')
          .select('rating')
          .eq('approval_status', 'approved')
        
        if (reviewsError) {
          console.error('Error fetching reviews for average:', reviewsError)
        }
        
        // Average rating hesapla
        let averageRating = 0
        if (allReviews && allReviews.length > 0) {
          const totalRating = allReviews.reduce((sum: number, review: any) => sum + (review.rating || 0), 0)
          averageRating = totalRating / allReviews.length
        }

        // Estimate customer count (based on quotes or reviews)
        const { count: quoteCount } = await supabase
          .from('customer_quotes')
          .select('*', { count: 'exact', head: true })

        setStats({
          customerCount: quoteCount || 10000, // Fallback to 10k if not available
          partnerCount: partnerCount || 500, // Fallback to 500 if not available
          reviewCount: totalReviewCount || 0, // Tüm onaylanmış yorumlar
          averageRating: averageRating, // Gerçek rating
        })
      } catch (error) {
        console.error('Error fetching trust signals:', error)
        // Set fallback values
        setStats({
          customerCount: 10000,
          partnerCount: 500,
          reviewCount: 0,
          averageRating: 0,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className={`flex items-center justify-center gap-2 ${className}`}>
        <div className="animate-pulse flex gap-4">
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(0)}'000+`
    return `${num}+`
  }

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center gap-4 text-sm ${className}`}>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-green-600" />
          <span className="font-semibold text-gray-900">{formatNumber(stats.customerCount)}</span>
          {showLabels && <span className="text-gray-600">Kunden</span>}
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-green-600" />
          <span className="font-semibold text-gray-900">{formatNumber(stats.partnerCount)}+</span>
          {showLabels && <span className="text-gray-600">Partner</span>}
        </div>
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span className="font-semibold text-gray-900">{stats.averageRating.toFixed(1)}/5</span>
          {showLabels && <span className="text-gray-600">({stats.reviewCount} Bewertungen)</span>}
        </div>
      </div>
    )
  }

  if (variant === 'hero') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 text-center">
          <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{formatNumber(stats.customerCount)}</div>
          {showLabels && <div className="text-xs text-gray-600 mt-1">Zufriedene Kunden</div>}
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 text-center">
          <ShieldCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{formatNumber(stats.partnerCount)}+</div>
          {showLabels && <div className="text-xs text-gray-600 mt-1">Geprüfte Partner</div>}
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 text-center">
          <Star className="h-8 w-8 text-yellow-500 fill-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}/5</div>
          {showLabels && <div className="text-xs text-gray-600 mt-1">Durchschnittliche Bewertung</div>}
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 text-center">
          <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.reviewCount}</div>
          {showLabels && <div className="text-xs text-gray-600 mt-1">Bewertungen</div>}
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 text-center">
          <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">2h</div>
          {showLabels && <div className="text-xs text-gray-600 mt-1">Schnelle Antwort</div>}
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 text-center">
          <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">40%</div>
          {showLabels && <div className="text-xs text-gray-600 mt-1">Bis zu 40% sparen</div>}
        </div>
      </div>
    )
  }

  // Full variant (default)
  return (
    <div className={`bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 border border-green-200 ${className}`}>
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
        Warum Online-Offerten.ch?
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-xl p-4 shadow-md text-center">
          <Users className="h-10 w-10 text-green-600 mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-900 mb-1">{formatNumber(stats.customerCount)}</div>
          {showLabels && <div className="text-sm text-gray-600">Zufriedene Kunden</div>}
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md text-center">
          <ShieldCheck className="h-10 w-10 text-green-600 mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-900 mb-1">{formatNumber(stats.partnerCount)}+</div>
          {showLabels && <div className="text-sm text-gray-600">Geprüfte Partner</div>}
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md text-center">
          <Star className="h-10 w-10 text-yellow-500 fill-yellow-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.averageRating.toFixed(1)}/5</div>
          {showLabels && <div className="text-sm text-gray-600">Durchschnittliche Bewertung</div>}
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md text-center">
          <Award className="h-10 w-10 text-green-600 mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.reviewCount}</div>
          {showLabels && <div className="text-sm text-gray-600">Bewertungen</div>}
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md text-center">
          <Clock className="h-10 w-10 text-green-600 mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-900 mb-1">2h</div>
          {showLabels && <div className="text-sm text-gray-600">Schnelle Antwort</div>}
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md text-center">
          <TrendingUp className="h-10 w-10 text-green-600 mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-900 mb-1">40%</div>
          {showLabels && <div className="text-sm text-gray-600">Bis zu 40% sparen</div>}
        </div>
      </div>
    </div>
  )
}














