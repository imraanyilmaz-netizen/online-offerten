import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX = 5 // max 5 reviews per IP per hour

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = RATE_LIMIT_MAP.get(ip)

  if (!entry || now > entry.resetAt) {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
      { status: 429 }
    )
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 })
  }

  // Honeypot check - hidden field that bots fill in
  if (body.website) {
    return NextResponse.json({ success: true })
  }

  const {
    partner_id,
    customer_name,
    customer_email,
    rating,
    rating_price,
    rating_workflow,
    rating_administration,
    review_text,
    service_type,
    city,
  } = body as Record<string, any>

  // Validation
  if (!partner_id || typeof partner_id !== 'string') {
    return NextResponse.json({ error: 'Partner-ID fehlt.' }, { status: 400 })
  }
  if (!customer_name || typeof customer_name !== 'string' || customer_name.trim().length < 2) {
    return NextResponse.json(
      { error: 'Bitte geben Sie Ihren Namen ein (mindestens 2 Zeichen).' },
      { status: 400 }
    )
  }
  if (
    !customer_email ||
    typeof customer_email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer_email)
  ) {
    return NextResponse.json(
      { error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' },
      { status: 400 }
    )
  }
  if (typeof rating !== 'number' || rating < 0.5 || rating > 5) {
    return NextResponse.json(
      { error: 'Bitte geben Sie eine gültige Bewertung ab.' },
      { status: 400 }
    )
  }

  const validateSubRating = (val: unknown) =>
    val === null || val === undefined || (typeof val === 'number' && val >= 0.5 && val <= 5)

  if (!validateSubRating(rating_price) || !validateSubRating(rating_workflow) || !validateSubRating(rating_administration)) {
    return NextResponse.json(
      { error: 'Ungültige Teilbewertung.' },
      { status: 400 }
    )
  }

  if (review_text && (typeof review_text !== 'string' || review_text.length > 2000)) {
    return NextResponse.json(
      { error: 'Bewertungstext ist zu lang (max. 2000 Zeichen).' },
      { status: 400 }
    )
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Server-Konfigurationsfehler.' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  })

  // Verify partner exists and is active
  const { data: partner, error: partnerError } = await supabase
    .from('partners')
    .select('id, company_name')
    .eq('id', partner_id)
    .eq('status', 'active')
    .single()

  if (partnerError || !partner) {
    return NextResponse.json({ error: 'Partner nicht gefunden.' }, { status: 404 })
  }

  // Check for duplicate: same email + partner within last 24h
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const { data: existing } = await supabase
    .from('customer_reviews')
    .select('id')
    .eq('partner_id', partner_id)
    .eq('customer_email', customer_email.trim().toLowerCase())
    .gte('created_at', oneDayAgo)
    .limit(1)

  if (existing && existing.length > 0) {
    return NextResponse.json(
      { error: 'Sie haben diesen Partner bereits kürzlich bewertet.' },
      { status: 409 }
    )
  }

  const { error: insertError } = await supabase.from('customer_reviews').insert({
    partner_id,
    customer_name: customer_name.trim(),
    customer_email: customer_email.trim().toLowerCase(),
    rating,
    rating_price: rating_price || null,
    rating_workflow: rating_workflow || null,
    rating_administration: rating_administration || null,
    review_text: review_text ? review_text.trim() : null,
    review_date: new Date().toISOString(),
    service_type: service_type || null,
    city: city ? String(city).trim() : null,
    approval_status: 'pending',
    review_type: 'partner',
    show_on_homepage: false,
    is_verified: false,
  })

  if (insertError) {
    console.error('Review insert error:', insertError)
    return NextResponse.json(
      { error: 'Bewertung konnte nicht gespeichert werden.' },
      { status: 500 }
    )
  }

  return NextResponse.json({
    success: true,
    message: 'Vielen Dank! Ihre Bewertung wird nach Prüfung veröffentlicht.',
  })
}
