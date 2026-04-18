'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Star, 
  ArrowRight,
  MessageSquare,
  CheckCircle,
  MapPin
} from 'lucide-react'
import { formatDate, getCustomerInitials } from '@/lib/utils'
import { getGermanServiceName } from '@/data/categories'

interface Review {
  id: string
  customer_name: string
  city: string
  review_date: string
  rating: number // Platform yorumları için sadece rating değeri var
  review_text?: string
  service_type?: string
  partner_name?: string
  /** Supabase nested select returns an array for FK embeds */
  partners?: { slug: string; company_name: string }[]
}

interface KundenBewertungenPageClientProps {
  initialReviews: Review[]
  initialTotalCount: number
}

const ReviewCard = ({ review }: { review: Review }) => {
  const partner = review.partners?.[0]
  const serviceName = getGermanServiceName(review.service_type)
  
  // Exakte Sternfüllung: 4.8 => letzter Stern 80% gefüllt, 4.5 => 50%, 4.0 => 4 volle Sterne
  const displayRating = Math.max(0, Math.min(5, Number(review.rating) || 0))
  
  return (
    <Card className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center border-2 border-green-200 shrink-0"
              aria-hidden
            >
              <span className="text-sm font-bold text-green-700 tracking-tight select-none">
                {getCustomerInitials(review.customer_name)}
              </span>
            </div>
            <div>
              <p className="font-bold text-gray-900">{review.customer_name}</p>
              <div className="flex items-center gap-3 flex-wrap">
                {review.city ? (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="font-medium">{review.city}</span>
                  </div>
                ) : null}
                {review.city ? (
                  <span className="text-sm text-gray-400" aria-hidden>
                    •
                  </span>
                ) : null}
                <span className="text-sm text-gray-500">{formatDate(review.review_date)}</span>
              </div>
            </div>
          </div>
          {/* Desktop: Sağ üstte göster */}
          <div className="hidden md:flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => {
                const fillPercent = Math.max(0, Math.min(100, (displayRating - i) * 100))
                return (
                  <div key={i} className="relative w-[14px] h-[14px]">
                    <Star size={14} className="absolute inset-0 text-gray-300" />
                    {fillPercent > 0 && (
                      <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <span className="font-bold text-lg text-gray-900">
              {displayRating.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Mobil: Yorum textinin üstünde göster */}
        <div className="md:hidden flex items-center gap-2 mb-4 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-200 w-fit">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => {
              const fillPercent = Math.max(0, Math.min(100, (displayRating - i) * 100))
              return (
                <div key={`mobile-${i}`} className="relative w-[14px] h-[14px]">
                  <Star size={14} className="absolute inset-0 text-gray-300" />
                  {fillPercent > 0 && (
                    <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    </div>
                  )}
                </div>
              )
            })}
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
          {partner?.slug && (
            <Link 
              href={`/partner/${partner.slug}`}
              className="text-xs text-gray-500 hover:text-green-600 transition-colors"
            >
              Für: {review.partner_name || partner.company_name}
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

const serviceButtons = [
  { label: 'Umzug & Reinigung', href: '/kostenlose-offerte-anfordern?step=3&service=umzug&umzugArt=privatumzug&endreinigung=ja' },
  { label: 'Nur Umzug', href: '/kostenlose-offerte-anfordern?step=2&service=umzug' },
  { label: 'Nur Reinigung', href: '/kostenlose-offerte-anfordern?service=reinigung&step=2' },
  { label: 'Büroumzug', href: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=geschaeftsumzug' },
  { label: 'Entsorgung', href: '/kostenlose-offerte-anfordern?service=raeumung&step=2' },
  { label: 'Klavierumzug', href: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=klaviertransport&special_transport_type=klaviertransport' },
]

const KundenBewertungenPageClient = ({ 
  initialReviews, 
  initialTotalCount 
}: KundenBewertungenPageClientProps) => {
  const router = useRouter()

  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialReviews.length < initialTotalCount)
  const [totalCount, setTotalCount] = useState(initialTotalCount)
  const [selectedServiceHref, setSelectedServiceHref] = useState(serviceButtons[0]?.href || '/kostenlose-offerte-anfordern')
  const selectedService = serviceButtons.find((item) => item.href === selectedServiceHref) || serviceButtons[0]

  const loadMoreReviews = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const params = new URLSearchParams({
        offset: String(reviews.length),
        limit: '10',
      })
      const res = await fetch(`/api/kunden-bewertungen?${params.toString()}`)
      if (!res.ok) {
        console.error('Error loading more reviews:', res.status)
        return
      }
      const data = (await res.json()) as { reviews: Review[]; totalCount: number }
      const newReviews = data.reviews || []
      const tc = typeof data.totalCount === 'number' ? data.totalCount : totalCount
      setTotalCount(tc)
      setReviews((prev) => {
        const merged = [...prev, ...newReviews]
        setHasMore(merged.length < tc)
        return merged
      })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }, [reviews.length, totalCount, hasMore, loading])

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
                            <span className="animate-spin mr-2">⏳</span>
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
                <Card className="border border-gray-200 shadow-lg bg-white overflow-hidden">
                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Welche Dienstleistung benötigen Sie?
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Kostenlos Offerten einholen
                    </p>
                    <div className="space-y-2">
                      {serviceButtons.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => setSelectedServiceHref(item.href)}
                          className={`w-full flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors ${
                            selectedServiceHref === item.href
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-200 bg-white text-gray-800 hover:border-green-300 hover:bg-green-50 hover:text-green-700'
                          }`}
                        >
                          <span>{item.label}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                    <div className="pt-4 mt-4 border-t border-gray-100">
                      <Link
                        href={selectedService?.href || '/kostenlose-offerte-anfordern'}
                        className="block w-full bg-green-600 hover:bg-green-700 text-white text-center font-semibold py-3 rounded-lg transition-colors"
                      >
                        Offerte für {selectedService?.label || 'Ihre Auswahl'} anfordern
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



