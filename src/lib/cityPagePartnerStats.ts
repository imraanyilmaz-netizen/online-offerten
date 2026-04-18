export type CantonPeerLocation = { name: string; slug: string; canton: string }

/**
 * Weitere Einträge aus `locations` im gleichen Kanton (ohne aktuelle Stadt), für Region-Teaser.
 */
export function getCantonPeerLocations(
  all: CantonPeerLocation[],
  canton: string,
  excludeSlug: string,
  limit = 10
): CantonPeerLocation[] {
  const peers = all.filter((l) => l.canton === canton && l.slug !== excludeSlug)
  peers.sort((a, b) => a.name.localeCompare(b.name, 'de-CH'))
  return peers.slice(0, Math.max(0, limit))
}
