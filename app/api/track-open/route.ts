import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

// 1x1 transparent GIF
const PIXEL = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64'
)

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')

  if (id) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

      if (supabaseUrl && serviceRoleKey) {
        const supabase = createClient(supabaseUrl, serviceRoleKey)
        // Nur beim ersten Öffnen setzen
        await supabase
          .from('partner_invitations')
          .update({ email_opened_at: new Date().toISOString() })
          .eq('id', id)
          .is('email_opened_at', null)
      }
    } catch (e) {
      console.error('Track open error:', e)
    }
  }

  return new Response(PIXEL, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  })
}


