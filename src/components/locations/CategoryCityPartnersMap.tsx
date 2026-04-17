'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Loader2, MapPin } from 'lucide-react'
import { loadGoogleMapsScript } from '@/lib/googleMapsLoader'
import { cn } from '@/lib/utils'

export type PartnerMapMarker = {
  id: string
  company_name: string
  slug?: string | null
  address_street?: string | null
  address_city?: string | null
  address_zip?: string | null
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildGeocodeQuery(p: PartnerMapMarker): string {
  const street = p.address_street?.trim()
  const zipCity = [p.address_zip ?? '', p.address_city ?? ''].filter(Boolean).join(' ').trim()
  if (street && zipCity) return `${street}, ${zipCity}, Switzerland`
  if (zipCity) return `${zipCity}, Switzerland`
  if (street) return `${street}, Switzerland`
  return ''
}

const GEO_DELAY_MS = 100

type MapStatus = 'idle' | 'loading' | 'ready' | 'empty' | 'error'

const hasGoogleMapsApiKey = Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)

export default function CategoryCityPartnersMap({
  partners,
  locationName,
  categorySlug,
}: {
  partners: PartnerMapMarker[]
  locationName: string
  categorySlug: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const listenersRef = useRef<google.maps.MapsEventListener[]>([])
  const [status, setStatus] = useState<MapStatus>('idle')

  const partnersKey = useMemo(
    () =>
      JSON.stringify(
        partners.map((p) => ({
          id: p.id,
          slug: p.slug,
          company_name: p.company_name,
          address_street: p.address_street,
          address_zip: p.address_zip,
          address_city: p.address_city,
        })),
      ),
    [partners],
  )

  useEffect(() => {
    const list: PartnerMapMarker[] = (() => {
      try {
        return JSON.parse(partnersKey) as PartnerMapMarker[]
      } catch {
        return []
      }
    })()
    if (!list.length || !containerRef.current || !hasGoogleMapsApiKey) return

    let cancelled = false

    const run = async () => {
      setStatus('loading')
      try {
        await loadGoogleMapsScript()
        if (cancelled || !containerRef.current) return

        const g = window.google
        if (!g?.maps) {
          setStatus('error')
          return
        }

        const el = containerRef.current
        const map = new g.maps.Map(el, {
          zoom: 11,
          center: { lat: 46.8182, lng: 8.2275 },
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        })
        const geocoder = new g.maps.Geocoder()

        const geocode = (address: string): Promise<google.maps.LatLngLiteral | null> =>
          new Promise((resolve) => {
            geocoder.geocode({ address, region: 'CH' }, (results, geocodeStatus) => {
              if (geocodeStatus === 'OK' && results?.[0]?.geometry?.location) {
                const loc = results[0].geometry.location
                resolve({ lat: loc.lat(), lng: loc.lng() })
              } else {
                resolve(null)
              }
            })
          })

        const cityCenter = await geocode(`${locationName}, Switzerland`)
        if (cancelled) return
        if (cityCenter) {
          map.setCenter(cityCenter)
          map.setZoom(12)
        }

        type Placed = { partner: PartnerMapMarker; position: google.maps.LatLngLiteral }
        const placed: Placed[] = []

        for (let i = 0; i < list.length; i++) {
          if (cancelled) return
          const partner = list[i]
          let q = buildGeocodeQuery(partner)
          if (!q && partner.address_city) {
            q = `${partner.address_city}, Switzerland`
          }
          if (!q) continue

          let pos = await geocode(q)
          if (!pos && partner.address_zip && partner.address_city) {
            pos = await geocode(`${partner.address_zip} ${partner.address_city}, Switzerland`)
          }
          if (pos) placed.push({ partner, position: pos })

          if (i < list.length - 1) {
            await new Promise((r) => setTimeout(r, GEO_DELAY_MS))
          }
        }

        if (cancelled) return

        if (placed.length === 0) {
          setStatus('empty')
          return
        }

        const usedKeys = new Set<string>()
        const jitter = (idx: number) => 0.00025 * (1 + (idx % 6))

        let infoWindow: google.maps.InfoWindow | null = null

        const bounds = new g.maps.LatLngBounds()

        placed.forEach(({ partner, position }, idx) => {
          let lat = position.lat
          let lng = position.lng
          const key = `${lat.toFixed(5)},${lng.toFixed(5)}`
          if (usedKeys.has(key)) {
            lat += jitter(idx) * Math.sin(idx * 2.1)
            lng += jitter(idx) * Math.cos(idx * 2.1)
          }
          usedKeys.add(`${lat.toFixed(5)},${lng.toFixed(5)}`)

          const marker = new g.maps.Marker({
            map,
            position: { lat, lng },
            title: partner.company_name,
          })
          markersRef.current.push(marker)
          bounds.extend({ lat, lng })

          const href = `/partner/${partner.slug || partner.id}`
          marker.addListener('click', () => {
            if (infoWindow) infoWindow.close()
            infoWindow = new g.maps.InfoWindow({
              content: `<div style="padding:6px 10px 10px;max-width:240px;font-family:system-ui,-apple-system,sans-serif;font-size:13px;line-height:1.35">
                <strong style="display:block;font-size:14px;color:#0f172a">${escapeHtml(partner.company_name)}</strong>
                <a href="${href}" style="display:inline-block;margin-top:8px;color:#059669;font-weight:600;text-decoration:none">Profil ansehen →</a>
              </div>`,
            })
            infoWindow.open({ map, anchor: marker })
          })
        })

        map.fitBounds(bounds, 56)
        const fitListener = g.maps.event.addListenerOnce(map, 'bounds_changed', () => {
          const z = map.getZoom()
          if (z != null && z > 15) map.setZoom(15)
          if (z != null && z < 9) map.setZoom(9)
        })
        listenersRef.current.push(fitListener)

        setStatus('ready')
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    void run()

    return () => {
      cancelled = true
      listenersRef.current.forEach((l) => l.remove())
      listenersRef.current = []
      markersRef.current.forEach((m) => m.setMap(null))
      markersRef.current = []
    }
  }, [partnersKey, locationName])

  if (!partners.length) return null

  if (!hasGoogleMapsApiKey) {
    return (
      <div
        className={cn(
          'rounded-2xl border border-dashed border-slate-300 bg-slate-50/90 p-8 text-center text-sm text-slate-600 dark:border-border dark:bg-muted/30 dark:text-muted-foreground',
        )}
        role="status"
      >
        Karte ist nicht konfiguriert (Google Maps API-Schlüssel fehlt).
      </div>
    )
  }

  const accentRing =
    categorySlug === 'reinigungsfirma'
      ? 'ring-sky-500/25'
      : categorySlug === 'malerfirma'
        ? 'ring-violet-500/25'
        : 'ring-emerald-500/25'

  const topBar =
    categorySlug === 'reinigungsfirma'
      ? 'from-sky-500 to-blue-600'
      : categorySlug === 'malerfirma'
        ? 'from-violet-500 to-fuchsia-600'
        : 'from-emerald-500 to-teal-600'

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-inner ring-1 dark:border-border dark:bg-muted/40',
        accentRing,
      )}
      aria-label={`Interaktive Karte: Partner in ${locationName}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 bg-white/90 px-4 py-3 dark:border-border dark:bg-card/90">
        <div className="flex items-center gap-2">
          <span
            className={cn('flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm', topBar)}
            aria-hidden
          >
            <MapPin className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-foreground">Partner auf der Karte</p>
            <p className="text-xs text-slate-600 dark:text-muted-foreground">
              {locationName} · Klicken Sie auf eine Markierung für Details
            </p>
          </div>
        </div>
        {status === 'loading' ? (
          <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
            Karte wird geladen…
          </span>
        ) : null}
      </div>
      <div className="relative aspect-[16/10] min-h-[280px] w-full sm:aspect-[21/9] sm:min-h-[320px]">
        <div ref={containerRef} className="absolute inset-0 h-full w-full" />
        {status === 'error' ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100/95 p-6 text-center text-sm text-slate-600 dark:bg-muted/80 dark:text-muted-foreground">
            Karte konnte nicht geladen werden. Bitte später erneut versuchen.
          </div>
        ) : null}
        {status === 'empty' ? (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100/95 p-6 text-center text-sm text-slate-600 dark:bg-muted/80 dark:text-muted-foreground">
            Für die angezeigten Partner konnten keine Standorte ermittelt werden.
          </div>
        ) : null}
      </div>
    </div>
  )
}
