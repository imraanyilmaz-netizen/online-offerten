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

export function stripUnpaidQuoteContactFields<T extends Record<string, unknown>>(quote: T): T {
  const out = { ...quote } as Record<string, unknown>
  for (const key of STRIP_FROM_UNPAID_QUOTE) {
    if (key in out) delete out[key]
  }
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
