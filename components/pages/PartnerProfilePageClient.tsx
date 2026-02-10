'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/use-toast'
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
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()
  
  const [partner, setPartner] = useState(initialPartner)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  const [averageRating, setAverageRating] = useState(0)
  const [reviewCount, setReviewCount] = useState(0)

  const fetchReviews = useCallback(async () => {
    if (!partner?.id) return

    try {
      // Sadece bu partner'a ait onaylı partner yorumlarını al
      // review_type = 'partner' olmalı - platform yorumları hariÃ§
      const { count: totalReviewCount, error: countError } = await supabase
        .from('customer_reviews')
        .select('*', { count: 'exact', head: true })
        .eq('partner_id', partner.id)
        .eq('approval_status', 'approved')
        .eq('review_type', 'partner') // Sadece partner yorumları

      if (countError) {
        console.error('Error fetching review count:', countError)
      }

      // Tüm yorumları al (average rating hesaplamak iÃ§in)
      // Sadece partner yorumları
      const { data: allReviewsData, error: allReviewsError } = await supabase
        .from('customer_reviews')
        .select('rating')
        .eq('partner_id', partner.id)
        .eq('approval_status', 'approved')
        .eq('review_type', 'partner') // Sadece partner yorumları

      if (allReviewsError) {
        console.error('Error fetching all reviews:', allReviewsError)
      }

      // Son 20 yorumu gösterilmek iÃ§in al
      // Sadece partner yorumları
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('customer_reviews')
        .select('*')
        .eq('partner_id', partner.id)
        .eq('approval_status', 'approved')
        .eq('review_type', 'partner') // Sadece partner yorumları
        .order('review_date', { ascending: false })
        .limit(20)

      if (reviewsError) {
        console.error('Error fetching reviews:', reviewsError)
      } else {
        setReviews(reviewsData || [])
        
        // GerÃ§ek toplam yorum sayısını kullan
        const realReviewCount = totalReviewCount || 0
        setReviewCount(realReviewCount)
        
        // Average rating'i tüm yorumlardan hesapla
        if (allReviewsData && allReviewsData.length > 0) {
          const totalRating = allReviewsData.reduce((sum: number, review: any) => sum + (review.rating || 0), 0)
          const avg = totalRating / allReviewsData.length
          setAverageRating(avg)
          
          // Update partner object with calculated rating and real review count
          setPartner((prev: any) => ({
            ...prev,
            average_rating: avg,
            review_count: realReviewCount
          }))
        } else {
          // Yorum yoksa sıfırla
          setAverageRating(0)
          setPartner((prev: any) => ({
            ...prev,
            average_rating: 0,
            review_count: 0
          }))
        }
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
    <div className="min-h-screen bg-gray-50">
      <PartnerHero 
        partner={partner} 
        onGetOffer={handleGetOffer}
        averageRating={averageRating}
        reviewCount={reviewCount}
      />
      
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {(partner.message || partner.description) && (
              <Card>
                <CardHeader>
                  <CardTitle>Über uns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-body whitespace-pre-line">{partner.message || partner.description}</p>
                </CardContent>
              </Card>
            )}

            {partner.services && partner.services.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Unsere Dienstleistungen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {partner.services.map((service: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
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

          <div className="lg:col-span-1">
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



