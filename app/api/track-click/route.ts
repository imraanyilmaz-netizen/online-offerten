import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  const redirectUrl =
    req.nextUrl.searchParams.get('redirect') ||
    'https://online-offerten.ch/partner-werden'

  if (id) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

      if (supabaseUrl && serviceRoleKey) {
        const supabase = createClient(supabaseUrl, serviceRoleKey)
        await supabase
          .from('partner_invitations')
          .update({ link_clicked_at: new Date().toISOString() })
          .eq('id', id)
          .is('link_clicked_at', null)
      }
    } catch (e) {
      console.error('Track click error:', e)
    }
  }

  return NextResponse.redirect(new URL(redirectUrl), 307)
}
