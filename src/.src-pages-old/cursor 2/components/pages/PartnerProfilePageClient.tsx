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
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('customer_reviews')
        .select('*')
        .eq('partner_id', partner.id)
        .eq('approval_status', 'approved')
        .order('review_date', { ascending: false })
        .limit(20)

      if (reviewsError) {
        console.error('Error fetching reviews:', reviewsError)
      } else {
        setReviews(reviewsData || [])
        
        if (reviewsData && reviewsData.length > 0) {
          const totalRating = reviewsData.reduce((sum: number, review: any) => sum + (review.rating || 0), 0)
          const avg = totalRating / reviewsData.length
          setAverageRating(avg)
          setReviewCount(reviewsData.length)
          
          // Update partner object with calculated rating and review count
          setPartner((prev: any) => ({
            ...prev,
            average_rating: avg,
            review_count: reviewsData.length
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
    router.push(`/kostenlose-offerte-anfordern?partner=${partner.id}`)
  }, [router, partner?.id])

  if (!partner) {
    return <FullPageLoader />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerHero partner={partner} onGetOffer={handleGetOffer} />
      
      <div className="container mx-auto max-w-navbar px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {partner.description && (
              <Card>
                <CardHeader>
                  <CardTitle>Über uns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-line">{partner.description}</p>
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

