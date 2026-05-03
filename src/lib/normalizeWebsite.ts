/**
 * Akzeptiert Domain wie "beispiel.ch", "www.beispiel.ch" oder volle URLs —
 * ergänzt fehlendes https:// für konsistente Speicherung.
 */
export function normalizeWebsite(raw: string): string {
  const trimmed = (raw || '').trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^\/+/, '')}`;
}
