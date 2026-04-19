'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import createGlobe, { type COBEOptions } from 'cobe'
import { useTheme } from 'next-themes'

const CH_ZRH: [number, number] = [47.3769, 8.5417]

/** Hub + worldwide destinations (lat, lng) for international moves */
const GLOBAL_MARKERS: { location: [number, number]; size: number }[] = [
  { location: CH_ZRH, size: 0.056 },
  { location: [40.7128, -74.006], size: 0.04 },
  { location: [34.0522, -118.2437], size: 0.036 },
  { location: [51.5074, -0.1278], size: 0.038 },
  { location: [48.8566, 2.3522], size: 0.036 },
  { location: [25.2048, 55.2708], size: 0.038 },
  { location: [19.076, 72.8777], size: 0.035 },
  { location: [35.6762, 139.6503], size: 0.04 },
  { location: [1.3521, 103.8198], size: 0.036 },
  { location: [-33.8688, 151.2093], size: 0.038 },
  { location: [-23.5505, -46.6333], size: 0.034 },
  { location: [-33.9249, 18.4241], size: 0.032 },
]

/** Arc routes from Switzerland hub across continents */
const GLOBAL_ARCS: { from: [number, number]; to: [number, number]; color: [number, number, number] }[] = [
  { from: CH_ZRH, to: [40.7128, -74.006], color: [0.14, 0.7, 0.52] },
  { from: CH_ZRH, to: [34.0522, -118.2437], color: [0.16, 0.68, 0.5] },
  { from: CH_ZRH, to: [51.5074, -0.1278], color: [0.12, 0.72, 0.55] },
  { from: CH_ZRH, to: [25.2048, 55.2708], color: [0.2, 0.7, 0.48] },
  { from: CH_ZRH, to: [19.076, 72.8777], color: [0.18, 0.66, 0.5] },
  { from: CH_ZRH, to: [35.6762, 139.6503], color: [0.15, 0.74, 0.54] },
  { from: CH_ZRH, to: [1.3521, 103.8198], color: [0.17, 0.69, 0.51] },
  { from: CH_ZRH, to: [-33.8688, 151.2093], color: [0.13, 0.71, 0.53] },
  { from: CH_ZRH, to: [-23.5505, -46.6333], color: [0.19, 0.67, 0.49] },
  { from: CH_ZRH, to: [-33.9249, 18.4241], color: [0.16, 0.65, 0.52] },
]

/** Equator-friendly tilt; auto-rotate reveals all continents */
const INITIAL_PHI = 0.9
const INITIAL_THETA = 0.26

const ORBIT_DECOR = [
  { emoji: '🇨🇭', ms: 22_000, delay: '0s' },
  { emoji: '🚚', ms: 27_000, delay: '-6.5s' },
  { emoji: '🚢', ms: 18_500, delay: '-3.2s' },
  { emoji: '✈️', ms: 24_000, delay: '-10s' },
] as const

/** Slow rotation + worldwide markers and arc routes */
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
    const phiStart = INITIAL_PHI
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
        theta: INITIAL_THETA,
        dark: isDark ? 1 : 0,
        diffuse: 1.18,
        scale: 1.14,
        offset: [0, 0.04],
        mapSamples: 14000,
        mapBrightness: isDark ? 5.8 : 7.2,
        baseColor: isDark ? [0.1, 0.14, 0.18] : [0.9, 0.94, 0.96],
        markerColor: emeraldMarker,
        glowColor: isDark ? [0.12, 0.28, 0.22] : [0.82, 0.94, 0.88],
        markers: GLOBAL_MARKERS,
        arcs: GLOBAL_ARCS,
        arcColor: [0.2, 0.75, 0.5],
        arcWidth: 0.95,
        arcHeight: 0.28,
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
      <svg
        className="pointer-events-none absolute inset-[-5%] h-[110%] w-[110%] text-emerald-600/35 dark:text-emerald-400/30"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <path
          className="globe-arc-route"
          d="M 6 38 Q 50 4 94 38"
          stroke="currentColor"
          strokeWidth="0.9"
          style={
            {
              ['--globe-arc-ms' as string]: '3.8s',
              ['--globe-arc-delay' as string]: '0s',
            } as CSSProperties
          }
        />
        <path
          className="globe-arc-route"
          d="M 10 72 Q 50 96 90 72"
          stroke="currentColor"
          strokeWidth="0.75"
          style={
            {
              ['--globe-arc-ms' as string]: '4.9s',
              ['--globe-arc-delay' as string]: '-1.4s',
            } as CSSProperties
          }
        />
        <path
          className="globe-arc-route"
          d="M 4 52 C 28 28 72 28 96 52"
          stroke="currentColor"
          strokeWidth="0.55"
          style={
            {
              ['--globe-arc-ms' as string]: '5.6s',
              ['--globe-arc-delay' as string]: '-2.2s',
            } as CSSProperties
          }
        />
      </svg>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {ORBIT_DECOR.map((row) => (
          <div
            key={row.emoji}
            className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2"
          >
            <div
              className="globe-orbit-arm h-full w-full"
              style={
                {
                  ['--globe-orbit-ms' as string]: `${row.ms}ms`,
                  ['--globe-orbit-delay' as string]: row.delay,
                } as CSSProperties
              }
            >
              <div
                className="globe-orbit-emoji absolute left-1/2 top-0 select-none text-[1.28rem] leading-none drop-shadow-[0_2px_3px_rgba(15,23,42,0.35)] sm:text-2xl dark:drop-shadow-[0_2px_5px_rgba(0,0,0,0.55)]"
                style={
                  {
                    ['--globe-orbit-ms' as string]: `${row.ms}ms`,
                    ['--globe-orbit-delay' as string]: row.delay,
                  } as CSSProperties
                }
              >
                {row.emoji}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
