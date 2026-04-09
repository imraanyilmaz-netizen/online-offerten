'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/src/lib/supabase/client'
import { Loader2 } from 'lucide-react'
import PartnerHero from '@/components/PartnerProfilePageParts/PartnerHero'
import Sidebar from '@/components/PartnerProfilePageParts/Sidebar'
import ReviewsSection from '@/components/PartnerProfilePageParts/ReviewsSection'
import ImageGallery from '@/components/PartnerProfilePageParts/ImageGallery'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'

const FullPageLoader = () => (
  <div className="fixed inset-0 z-[9999] flex h-screen w-full items-center justify-center bg-white">
    <Loader2 className="h-12 w-12 animate-spin text-green-600" />
  </div>
)

interface PartnerProfilePageClientProps {
  initialPartner: any
}

const PartnerProfilePageClient = ({ initialPartner }: PartnerProfilePageClientProps) => {
  const router = useRouter()
  const supabase = createClient()
  
  const [partner, setPartner] = useState(initialPartner)
  const [reviews, setReviews] = useState([])
  const [averageRating, setAverageRating] = useState(0)
  const [reviewCount, setReviewCount] = useState(0)

  const fetchReviews = useCallback(async () => {
    if (!partner?.id) return

    try {
      const [countResult, allRatingsResult, latestReviewsResult] = await Promise.all([
        supabase
          .from('customer_reviews')
          .select('*', { count: 'exact', head: true })
          .eq('partner_id', partner.id)
          .eq('approval_status', 'approved')
          .eq('review_type', 'partner'),
        supabase
          .from('customer_reviews')
          .select('rating')
          .eq('partner_id', partner.id)
          .eq('approval_status', 'approved')
          .eq('review_type', 'partner'),
        supabase
          .from('customer_reviews')
          .select('*')
          .eq('partner_id', partner.id)
          .eq('approval_status', 'approved')
          .eq('review_type', 'partner')
          .order('review_date', { ascending: false })
          .limit(20),
      ])

      if (countResult.error) {
        console.error('Error fetching review count:', countResult.error)
      }
      if (allRatingsResult.error) {
        console.error('Error fetching all reviews:', allRatingsResult.error)
      }
      if (latestReviewsResult.error) {
        console.error('Error fetching reviews:', latestReviewsResult.error)
      }

      setReviews(latestReviewsResult.data || [])

      const realReviewCount = countResult.count || 0
      setReviewCount(realReviewCount)

      const allReviewsData = allRatingsResult.data || []
      if (allReviewsData.length > 0) {
        const totalRating = allReviewsData.reduce((sum: number, review: any) => sum + (review.rating || 0), 0)
        const avg = totalRating / allReviewsData.length
        setAverageRating(avg)
        setPartner((prev: any) => ({
          ...prev,
          average_rating: avg,
          review_count: realReviewCount,
        }))
      } else {
        setAverageRating(0)
        setPartner((prev: any) => ({
          ...prev,
          average_rating: 0,
          review_count: 0,
        }))
      }
    } catch (error) {
      console.error('Error loading reviews:', error)
    }
  }, [partner?.id, supabase])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  const handleGetOffer = useCallback(() => {
    const categories = partner?.main_categories || []
    const hasUmzug = categories.includes('umzug')
    const hasReinigung = categories.includes('reinigung')
    const hasMaler = categories.includes('maler')

    let serviceParam = ''
    if (hasUmzug) {
      serviceParam = '' // Umzug ist Standard, kein extra Parameter nötig
    } else if (hasReinigung) {
      serviceParam = '&service=reinigung&step=2'
    } else if (hasMaler) {
      serviceParam = '&service=maler&step=2'
    }

    router.push(`/kostenlose-offerte-anfordern?partner=${partner.id}${serviceParam}`)
  }, [router, partner?.id, partner?.main_categories])

  if (!partner) {
    return <FullPageLoader />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-slate-50 to-white">
      <PartnerHero 
        partner={partner} 
        onGetOffer={handleGetOffer}
        averageRating={averageRating}
        reviewCount={reviewCount}
      />
      
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {(partner.message || partner.description) && (
              <Card className="border-slate-200/70 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl tracking-tight text-slate-900">Über uns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line leading-7 text-slate-700">
                    {partner.message || partner.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {partner.services && partner.services.length > 0 && (
              <Card className="border-slate-200/70 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl tracking-tight text-slate-900">
                    Unsere Dienstleistungen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {partner.services.map((service: string, index: number) => (
                      <span
                        key={index}
                        className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {partner.images && partner.images.length > 0 && (
              <ImageGallery images={partner.images} />
            )}

            <ReviewsSection
              reviews={reviews}
              reviewCount={reviewCount}
              formatDate={formatDate}
              onShowAllReviews={() => router.push(`/partner/${partner.slug}/reviews`)}
            />
          </div>

          <div className="lg:col-span-1 lg:sticky lg:top-24 lg:self-start">
            <Sidebar 
              partner={partner} 
              averageRating={averageRating}
              reviewCount={reviewCount}
              onGetOffer={handleGetOffer}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnerProfilePageClient



