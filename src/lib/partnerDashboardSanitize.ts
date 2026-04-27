/**
 * Partner hat für «verfügbare» / verpasste Anfragen noch nicht bezahlt — Kontaktdaten
 * dürfen in API-Antworten nicht vorkommen (Browser-Netzwerk).
 */

const STRIP_FROM_UNPAID_QUOTE: string[] = [
  'email',
  'phone',
  'firstname',
  'lastname',
  'salutation',
  'from_street',
  'to_street',
  'preferredtime',
]

/** Erste Zeichen inkl. Ländervorwahl sichtbar, Rest verborgen (z. B. +4179748…). */
export function maskPhoneForPartnerPreview(phone: string | null | undefined): string | null {
  if (phone == null || typeof phone !== 'string') return null
  const trimmed = phone.trim()
  if (!trimmed) return null
  const visible = 8
  if (trimmed.length <= visible) return `${trimmed}….`
  return `${trimmed.slice(0, visible)}….`
}

/**
 * Nur ein Teaser: erster Buchstabe der lokalen Part, dann …., letzte zwei Zeichen vor @,
 * Domain verkürzt (z. B. j….rt@g….com).
 */
export function maskEmailForPartnerPreview(email: string | null | undefined): string | null {
  if (email == null || typeof email !== 'string') return null
  const trimmed = email.trim()
  if (!trimmed) return null
  const at = trimmed.indexOf('@')
  if (at < 1) return null
  const local = trimmed.slice(0, at)
  const domain = trimmed.slice(at + 1).trim()
  if (!domain) return null

  let localMasked: string
  if (local.length === 1) {
    localMasked = `${local}….`
  } else if (local.length === 2) {
    localMasked = `${local.charAt(0)}….${local.charAt(1)}`
  } else {
    const first = local.charAt(0)
    const lastTwo = local.slice(-2)
    localMasked = `${first}….${lastTwo}`
  }

  const lastDot = domain.lastIndexOf('.')
  const tld = lastDot >= 0 ? domain.slice(lastDot + 1) : domain
  const domainBody = lastDot >= 0 ? domain.slice(0, lastDot) : ''
  const domainMasked =
    domainBody.length > 0 ? `${domainBody.charAt(0)}….${tld}` : `….${tld}`

  return `${localMasked}@${domainMasked}`
}

export function stripUnpaidQuoteContactFields<T extends Record<string, unknown>>(quote: T): T {
  const out = { ...quote } as Record<string, unknown>

  const rawPhone = out.phone
  const rawEmail = out.email
  const phonePreview =
    typeof rawPhone === 'string' ? maskPhoneForPartnerPreview(rawPhone) : null
  const emailPreview =
    typeof rawEmail === 'string' ? maskEmailForPartnerPreview(rawEmail) : null

  for (const key of STRIP_FROM_UNPAID_QUOTE) {
    if (key in out) delete out[key]
  }

  if (phonePreview) out.phone_preview = phonePreview
  if (emailPreview) out.email_preview = emailPreview

  return out as T
}

export type PartnerDashboardRpcRow = {
  available_quotes?: Record<string, unknown>[] | null
  missed_quotes?: Record<string, unknown>[] | null
  purchased_quotes?: unknown
  archived_quotes?: unknown
  viewed_quote_ids?: unknown
  [key: string]: unknown
}

export function sanitizePartnerDashboardRpcPayload(data: PartnerDashboardRpcRow | null): PartnerDashboardRpcRow | null {
  if (!data || typeof data !== 'object') return data

  return {
    ...data,
    available_quotes: (data.available_quotes || []).map((q) => stripUnpaidQuoteContactFields(q as Record<string, unknown>)),
    missed_quotes: (data.missed_quotes || []).map((q) => stripUnpaidQuoteContactFields(q as Record<string, unknown>)),
  }
}
