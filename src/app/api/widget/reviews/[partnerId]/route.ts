import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ partnerId: string }> }
) {
  const { partnerId } = await params

  if (!partnerId) {
    return NextResponse.json(
      { error: 'Partner ID or slug is required' },
      { status: 400, headers: CORS_HEADERS }
    )
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500, headers: CORS_HEADERS }
    )
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  })

  const url = new URL(req.url)
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '5', 10), 20)
  const type = url.searchParams.get('type') || 'list'

  const isUUID = UUID_REGEX.test(partnerId)
  const filterColumn = isUUID ? 'id' : 'slug'

  const partnerResult = await supabase
    .from('partners')
    .select('id, company_name, slug, logo_url, average_rating, review_count')
    .eq(filterColumn, partnerId)
    .eq('status', 'active')
    .single()

  if (partnerResult.error || !partnerResult.data) {
    return NextResponse.json(
      { error: 'Partner not found' },
      { status: 404, headers: CORS_HEADERS }
    )
  }

  const partner = partnerResult.data

  const reviewsResult = await supabase
    .from('customer_reviews')
    .select(
      'id, customer_name, rating, rating_price, rating_workflow, rating_administration, review_text, review_date, service_type, city'
    )
    .eq('partner_id', partner.id)
    .eq('approval_status', 'approved')
    .eq('review_type', 'partner')
    .order('review_date', { ascending: false })
    .limit(limit)

  const reviews = reviewsResult.data || []

  const totalRating = reviews.reduce((sum, r) => sum + (r.rating || 0), 0)
  const averageRating =
    reviews.length > 0
      ? Math.round((totalRating / reviews.length) * 10) / 10
      : partner.average_rating || 0

  return NextResponse.json(
    {
      partner: {
        company_name: partner.company_name,
        slug: partner.slug,
        logo_url: partner.logo_url,
        average_rating: averageRating,
        review_count: partner.review_count || reviews.length,
      },
      reviews: type === 'badge' ? [] : reviews,
    },
    { status: 200, headers: CORS_HEADERS }
  )
}
