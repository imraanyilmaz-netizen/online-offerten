import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {
  sanitizePartnerDashboardRpcPayload,
  type PartnerDashboardRpcRow,
} from '@/lib/partnerDashboardSanitize'

export const dynamic = 'force-dynamic'

function getSupabaseAnonEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }
  return { supabaseUrl, supabaseAnonKey }
}

/**
 * Liefert dieselben Daten wie `get_partner_dashboard_data`, entfernt aber aus
 * nicht gekauften Anfragen (available / missed) Kontaktfelder, damit sie nicht
 * im Browser-Netzwerk sichtbar sind.
 */
export async function GET(request: NextRequest) {
  try {
    const { supabaseUrl, supabaseAnonKey } = getSupabaseAnonEnv()
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    })

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const role = user.user_metadata?.role ?? user.app_metadata?.role
    if (role !== 'partner') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { data, error } = await supabase.rpc('get_partner_dashboard_data', {
      p_partner_id: user.id,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(sanitizePartnerDashboardRpcPayload(data as PartnerDashboardRpcRow | null))
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
