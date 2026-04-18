'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/src/lib/supabase/client'
import { Loader2 } from 'lucide-react'
import PartnerHero from '@/components/PartnerProfilePageParts/PartnerHero'
import Sidebar from '@/components/PartnerProfilePageParts/Sidebar'
import ReviewsSection from '@/components/PartnerProfilePageParts/ReviewsSection'
import ImageGallery from '@/components/PartnerProfilePageParts/ImageGallery'
import PublicReviewForm from '@/components/PartnerProfilePageParts/PublicReviewForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'

const FullPageLoader = () => (
  <div className="fixed inset-0 z-[9999] flex h-screen w-full items-center justify-center bg-background">
    <Loader2 className="h-12 w-12 animate-spin text-primary" />
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

  const sectionLinks = [
    (partner.message || partner.description) && { id: 'about', label: 'Über uns' },
    partner.services?.length > 0 && { id: 'services', label: 'Dienstleistungen' },
    partner.images?.length > 0 && { id: 'gallery', label: 'Bilder' },
    { id: 'reviews', label: 'Bewertungen' },
  ].filter(Boolean) as Array<{ id: string; label: string }>

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-slate-50 to-white dark:from-emerald-950/25 dark:via-background dark:to-background">
      <PartnerHero 
        partner={partner} 
        onGetOffer={handleGetOffer}
        averageRating={averageRating}
        reviewCount={reviewCount}
      />
      
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="mb-8 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 bg-white/90 dark:bg-card/90 p-3 shadow-sm backdrop-blur">
          <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Schnellzugriff
          </div>
          <nav className="flex flex-wrap gap-2">
            {sectionLinks.map((link) => (
              <Link
                key={link.id}
                href={`#${link.id}`}
                scroll={true}
                className="rounded-xl border border-emerald-100 dark:border-emerald-800/60 bg-emerald-50/60 dark:bg-emerald-950/40 px-4 py-2 text-sm font-medium text-emerald-900 dark:text-emerald-100 transition-colors hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {(partner.message || partner.description) && (
              <Card id="about" className="scroll-mt-28 border-border bg-card text-card-foreground shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl tracking-tight text-foreground">Über uns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line leading-7 text-muted-foreground">
                    {partner.message || partner.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {partner.services && partner.services.length > 0 && (
              <Card id="services" className="scroll-mt-28 border-border bg-card text-card-foreground shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl tracking-tight text-foreground">
                    Unsere Dienstleistungen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {partner.services.map((service: string, index: number) => (
                      <span
                        key={index}
                        className="rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 text-sm font-medium text-emerald-800 dark:text-emerald-200"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {partner.images && partner.images.length > 0 && (
              <div id="gallery" className="scroll-mt-28">
                <ImageGallery images={partner.images} />
              </div>
            )}

            <div id="reviews" className="scroll-mt-28 space-y-6">
              <ReviewsSection
                reviews={reviews}
                reviewCount={reviewCount}
                formatDate={formatDate}
                onShowAllReviews={() => router.push(`/partner/${partner.slug}/reviews`)}
              />
              <PublicReviewForm
                partnerId={partner.id}
                partnerName={partner.company_name}
                offeredServices={partner.offered_services || []}
                mainCategories={partner.main_categories || []}
              />
            </div>
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



