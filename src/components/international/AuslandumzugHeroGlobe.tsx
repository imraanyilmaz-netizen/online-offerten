'use client'

import { useEffect, useRef } from 'react'
import createGlobe, { type COBEOptions } from 'cobe'
import { useTheme } from 'next-themes'

const CH_ZRH: [number, number] = [47.3769, 8.5417]

/** Rough center of continental Europe for camera aim (lat, lng) */
const EU_FOCUS_LAT = 50
const EU_FOCUS_LNG = 12

/**
 * Aim COBE so Europe faces the user (phi = horizontal spin, theta = tilt).
 * Tuned from lat/lng then slightly adjusted so the continent fills the circle.
 */
function initialEuropeAngles() {
  const lngRad = (EU_FOCUS_LNG * Math.PI) / 180
  const latRad = (EU_FOCUS_LAT * Math.PI) / 180
  const phi = Math.PI - lngRad
  const theta = Math.PI / 2 - latRad - 0.08
  return { phi, theta: Math.max(0.22, Math.min(0.72, theta)) }
}

/** Slow rotation + markers from CH to popular EU destinations */
export default function AuslandumzugHeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    let globe: ReturnType<typeof createGlobe> | null = null
    let rafId = 0
    const { phi: phiStart, theta: thetaEurope } = initialEuropeAngles()
    let phi = phiStart

    const mount = () => {
      cancelAnimationFrame(rafId)
      globe?.destroy()
      globe = null
      phi = phiStart

      const w = Math.max(2, Math.floor(wrapper.clientWidth))
      const h = Math.max(2, Math.floor(wrapper.clientHeight))
      const dpr = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1)

      const emeraldMarker: [number, number, number] = isDark ? [0.25, 0.92, 0.62] : [0.06, 0.55, 0.38]
      const opts: COBEOptions = {
        devicePixelRatio: dpr,
        width: w * dpr,
        height: h * dpr,
        phi,
        theta: thetaEurope,
        dark: isDark ? 1 : 0,
        diffuse: 1.18,
        scale: 1.14,
        offset: [0, 0.04],
        mapSamples: 14000,
        mapBrightness: isDark ? 5.8 : 7.2,
        baseColor: isDark ? [0.1, 0.14, 0.18] : [0.9, 0.94, 0.96],
        markerColor: emeraldMarker,
        glowColor: isDark ? [0.12, 0.28, 0.22] : [0.82, 0.94, 0.88],
        markers: [
          { location: CH_ZRH, size: 0.055 },
          { location: [52.52, 13.405], size: 0.04 },
          { location: [48.8566, 2.3522], size: 0.038 },
          { location: [41.9028, 12.4964], size: 0.038 },
          { location: [40.4168, -3.7038], size: 0.036 },
          { location: [50.8503, 4.3517], size: 0.034 },
        ],
        arcs: [
          { from: CH_ZRH, to: [52.52, 13.405], color: [0.15, 0.72, 0.48] },
          { from: CH_ZRH, to: [48.8566, 2.3522], color: [0.12, 0.68, 0.52] },
          { from: CH_ZRH, to: [41.9028, 12.4964], color: [0.18, 0.7, 0.45] },
        ],
        arcColor: [0.2, 0.75, 0.5],
        arcWidth: 1.15,
        arcHeight: 0.22,
        markerElevation: 0.06,
      }

      globe = createGlobe(canvas, opts)

      const tick = () => {
        phi += 0.0014
        globe?.update({ phi })
        rafId = requestAnimationFrame(tick)
      }
      rafId = requestAnimationFrame(tick)
    }

    mount()

    const ro = new ResizeObserver(() => {
      mount()
    })
    ro.observe(wrapper)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      globe?.destroy()
    }
  }, [isDark])

  return (
    <div
      ref={wrapperRef}
      className="relative mx-auto aspect-square w-full max-w-[min(100%,420px)] lg:max-w-[480px] rounded-full shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)] ring-1 ring-emerald-500/15 dark:shadow-[0_24px_70px_-24px_rgba(0,0,0,0.65)] dark:ring-emerald-400/20"
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full rounded-full"
        style={{ contain: 'strict' }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/[0.07] via-transparent to-teal-500/[0.06] dark:from-emerald-400/[0.08]" />
    </div>
  )
}
