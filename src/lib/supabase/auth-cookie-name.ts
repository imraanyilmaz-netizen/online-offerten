/**
 * @supabase/supabase-js ile aynı kural: `sb-<project-ref>-auth-token`
 * (hostname'in ilk etiketi, örn. xyz.supabase.co → xyz)
 */
export function getSupabaseAuthCookieName(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) return ''
  try {
    const host = new URL(url).hostname
    const projectRef = host.split('.')[0]
    if (!projectRef) return ''
    return `sb-${projectRef}-auth-token`
  } catch {
    return ''
  }
}
