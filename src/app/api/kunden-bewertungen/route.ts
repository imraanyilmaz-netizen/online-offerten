import { NextResponse } from 'next/server'
import { getMergedKundenBewertungenPage } from '@/lib/reviews/kundenBewertungenMerge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const offset = Math.max(0, parseInt(searchParams.get('offset') || '0', 10) || 0)
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10', 10) || 10))

  const { reviews, totalCount } = await getMergedKundenBewertungenPage(offset, limit)
  return NextResponse.json({ reviews, totalCount })
}
