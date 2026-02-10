'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Star, 
  User, 
  ArrowRight,
  MessageSquare,
  CheckCircle,
  Truck,
  Sparkles,
  Paintbrush,
  Home,
  Building2,
  FileText,
  MapPin
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { formatDate } from '@/lib/utils'
import { getGermanServiceName } from '@/src/lib/dataMapping.js'

interface Review {
  id: string
  customer_name: string
  city: string
  review_date: string
  rating: number // Platform yorumları iÃ§in sadece rating değeri var
  review_text?: string
  service_type?: string
  partner_name?: string
  partners?: {
    slug: string
    company_name: string
  }
}

interface KundenBewertungenPageClientProps {
  initialReviews: Review[]
  initialTotalCount: number
}

const ReviewCard = ({ review }: { review: Review }) => {
  const serviceName = getGermanServiceName(review.service_type)
  
  // Dinamik yıldız hesaplama - Platform yorumları iÃ§in sadece rating değeri kullanılır
  // Veritabanından gelen rating değerine göre yıldızlar dinamik hesaplanır
  const displayRating = review.rating || 0
  const fullStars = Math.floor(displayRating)
  const decimalPart = displayRating % 1
  // 0.25-0.74 arası yarım yıldız, 0.75+ bir sonraki tam yıldıza yakın (tam yıldız sayılır)
  const hasHalfStar = decimalPart >= 0.25 && decimalPart < 0.75
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  
  return (
    <Card className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center border-2 border-green-200">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-bold text-gray-900">{review.customer_name}</p>
              <div className="flex items-center gap-3 flex-wrap">
                {review.city && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="font-medium">{review.city}</span>
                  </div>
                )}
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-500">{formatDate(review.review_date)}</span>
              </div>
            </div>
          </div>
          {/* Desktop: Sağ üstte göster */}
          <div className="hidden md:flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-0.5">
              {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} size={14} className="text-yellow-400 fill-yellow-400" />
              ))}
              {hasHalfStar && (
                <div className="relative">
                  <Star size={14} className="text-gray-300" />
                  <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
              )}
              {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} size={14} className="text-gray-300" />
              ))}
            </div>
            <span className="font-bold text-lg text-gray-900">
              {displayRating.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Mobil: Yorum textinin üstünde göster */}
        <div className="md:hidden flex items-center gap-2 mb-4 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-200 w-fit">
          <div className="flex items-center gap-0.5">
            {[...Array(fullStars)].map((_, i) => (
              <Star key={`full-mobile-${i}`} size={14} className="text-yellow-400 fill-yellow-400" />
            ))}
            {hasHalfStar && (
              <div className="relative">
                <Star size={14} className="text-gray-300" />
                <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            )}
            {[...Array(emptyStars)].map((_, i) => (
              <Star key={`empty-mobile-${i}`} size={14} className="text-gray-300" />
            ))}
          </div>
          <span className="font-bold text-lg text-gray-900">
            {displayRating.toFixed(2)}
          </span>
        </div>
        
        {review.review_text && (
          <div className="mb-4">
            <div className="flex items-start gap-2">
              <MessageSquare className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" />
              <p className="text-body italic">
                "{review.review_text}"
              </p>
            </div>
          </div>
        )}


        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100">
          {review.city && (
            <Badge variant="outline" className="bg-gray-50 border-gray-200 text-gray-700 font-medium">
              <MapPin className="w-3 h-3 mr-1" />
              {review.city}
            </Badge>
          )}
          {serviceName && (
            <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700 font-medium">
              {serviceName}
            </Badge>
          )}
          {review.partners?.slug && (
            <Link 
              href={`/partner/${review.partners.slug}`}
              className="text-xs text-gray-500 hover:text-green-600 transition-colors"
            >
              Für: {review.partner_name || review.partners.company_name}
            </Link>
          )}
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verifiziert
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

const services = [
  { name: 'Umzug', icon: Truck, href: '/umzugsfirma' },
  { name: 'Wohnungsreinigung', icon: Home, href: '/reinigung/wohnungsreinigung' },
  { name: 'Hausreinigung', icon: Building2, href: '/reinigung/hausreinigung' },
  { name: 'Büroreinigung', icon: Building2, href: '/reinigung/bueroreinigung' },
  { name: 'Umzugsreinigung', icon: Sparkles, href: '/reinigung/umzugsreinigung' },
  { name: 'Malerarbeiten', icon: Paintbrush, href: '/malerfirma-in-der-naehe' },
]

const KundenBewertungenPageClient = ({ 
  initialReviews, 
  initialTotalCount 
}: KundenBewertungenPageClientProps) => {
  const router = useRouter()
  const supabase = createClient()
  
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialReviews.length < initialTotalCount)
  const [totalCount, setTotalCount] = useState(initialTotalCount)

  const loadMoreReviews = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const { data: newReviews, error } = await supabase
        .from('customer_reviews')
        .select(`
          id, customer_name, rating, city, review_date, 
          review_text,
          service_type, partner_name,
          partners (slug, company_name)
        `)
        .eq('approval_status', 'approved')
        .eq('review_type', 'platform')
        .order('review_date', { ascending: false })
        .range(reviews.length, reviews.length + 9)

      if (error) {
        console.error('Error loading more reviews:', error)
      } else if (newReviews) {
        setReviews(prev => [...prev, ...newReviews])
        setHasMore(reviews.length + newReviews.length < totalCount)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }, [reviews.length, totalCount, hasMore, loading, supabase])

  const handleGetOffer = () => {
    router.push('/kostenlose-offerte-anfordern')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <Badge className="bg-yellow-400 text-green-900 font-bold px-4 py-1">
                {totalCount}+ Verifizierte Bewertungen
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Echte Erfahrungen von zufriedenen Kunden
            </h1>
            <p className="text-xl md:text-2xl text-green-50 mb-8 leading-relaxed">
              Lesen Sie, was unsere Kunden über unsere Partner sagen. Über {totalCount} verifizierte Bewertungen helfen Ihnen bei der Entscheidung.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-200" />
                <span className="text-lg font-semibold">100% Verifiziert</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-200" />
                <span className="text-lg font-semibold">Echte Kunden</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content - Reviews List */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Alle Kundenbewertungen
                </h2>
                <p className="text-gray-600">
                  {totalCount} verifizierte Bewertungen von zufriedenen Kunden
                </p>
              </div>

              {reviews.length === 0 ? (
                <Card className="p-12 text-center">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    Noch keine Bewertungen
                  </h3>
                  <p className="text-gray-500">
                    Seien Sie der Erste, der eine Bewertung hinterlässt!
                  </p>
                </Card>
              ) : (
                <>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="mt-8 text-center">
                      <Button
                        onClick={loadMoreReviews}
                        disabled={loading}
                        size="lg"
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-semibold"
                      >
                        {loading ? (
                          <>
                            <span className="animate-spin mr-2">â³</span>
                            Lade weitere Bewertungen...
                          </>
                        ) : (
                          <>
                            Weiter anzeigen
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Services - Professional Design */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50 overflow-hidden">
                  <CardContent className="p-0">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                      <h3 className="text-lg font-bold text-white">
                        Unsere Dienstleistungen
                      </h3>
                      <p className="text-green-100 text-sm mt-1">
                        Professionelle Lösungen für Ihr Projekt
                      </p>
                    </div>
                    
                    {/* Service Links */}
                    <div className="p-4">
                      <div className="space-y-1">
                        {services.map((service, index) => {
                          const Icon = service.icon
                          return (
                            <Link
                              key={service.name}
                              href={service.href}
                              className="flex items-center gap-4 p-3 rounded-xl hover:bg-green-50 transition-all duration-200 group border border-transparent hover:border-green-200 hover:shadow-sm"
                            >
                              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-100 to-emerald-50 flex items-center justify-center group-hover:from-green-500 group-hover:to-emerald-500 transition-all duration-300 shadow-sm">
                                <Icon className="w-5 h-5 text-green-600 group-hover:text-white transition-colors" />
                              </div>
                              <div className="flex-1">
                                <span className="font-semibold text-gray-800 group-hover:text-green-700 transition-colors block">
                                  {service.name}
                                </span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                    
                    {/* Footer CTA */}
                    <div className="px-4 pb-4">
                      <Link 
                        href="/kostenlose-offerte-anfordern"
                        className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-center font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Jetzt Offerte anfordern
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default KundenBewertungenPageClient



