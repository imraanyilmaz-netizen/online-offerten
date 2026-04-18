'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, ArrowRight } from 'lucide-react'

/**
 * Desktop mega-menu panel: link grid + optional featured image column (lg+).
 */
export default function NavbarMegaMenuNav({
  label,
  baseHref = null,
  links,
  featured,
  isOpen,
  onOpen,
  onScheduleClose,
  onToggleMenu,
  onNavigate,
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onScheduleClose}>
      <div
        className={`flex items-center gap-0.5 rounded-xl border px-2.5 py-1.5 text-sm font-semibold transition-all duration-200 ${
          isOpen
            ? 'border-emerald-200/90 bg-emerald-50/90 text-slate-900 shadow-sm dark:border-emerald-800/80 dark:bg-emerald-950/55 dark:text-foreground'
            : 'border-transparent text-gray-600 hover:border-emerald-100/90 hover:bg-emerald-50/50 hover:text-gray-900 dark:text-muted-foreground dark:hover:border-emerald-900/60 dark:hover:bg-emerald-950/35 dark:hover:text-foreground'
        }`}
      >
        {baseHref ? (
          <Link
            prefetch={false}
            href={baseHref}
            className="px-1 py-0.5 leading-none text-gray-800 hover:text-emerald-900 dark:text-foreground dark:hover:text-emerald-400"
          >
            {label}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onOpen}
            className="px-1 py-0.5 leading-none text-gray-800 hover:text-emerald-900 dark:text-foreground dark:hover:text-emerald-400"
          >
            {label}
          </button>
        )}
        <button
          type="button"
          aria-label={`${label} Menü öffnen`}
          aria-expanded={isOpen}
          onClick={onToggleMenu}
          className="inline-flex items-center justify-center rounded-lg p-1 text-gray-500 transition-colors hover:bg-emerald-100/80 hover:text-emerald-800 dark:text-muted-foreground dark:hover:bg-emerald-950/80 dark:hover:text-emerald-300"
        >
          <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <div
        className={`absolute left-1/2 top-[calc(100%+12px)] z-[4000] w-[min(52rem,calc(100vw-1.5rem))] max-w-[calc(100vw-1.5rem)] -translate-x-1/2 transition-all duration-200 ease-out ${
          isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-2 opacity-0 pointer-events-none'
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-[0_28px_90px_-20px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/[0.04] backdrop-blur-xl dark:border-border dark:bg-popover/95 dark:shadow-[0_28px_90px_-20px_rgba(0,0,0,0.55)] dark:ring-white/10">
          <div className="flex min-h-[17rem]">
            <div className="min-w-0 flex-1 p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">{label}</span>
                <span className="h-px min-w-[2rem] flex-1 bg-gradient-to-r from-emerald-200 via-slate-200/80 to-transparent dark:from-emerald-800/80 dark:via-border dark:to-transparent" />
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {links.map((link) => {
                  const Icon = link.Icon
                  return (
                    <Link
                      key={link.to}
                      href={link.to}
                      prefetch={false}
                      onClick={onNavigate}
                      className="group/link flex gap-3 rounded-xl border border-slate-100/90 bg-gradient-to-br from-slate-50/90 to-white p-3 shadow-sm transition-all duration-150 hover:border-emerald-200/80 hover:from-emerald-50/80 hover:to-white hover:shadow-md dark:border-border dark:from-muted/40 dark:to-background dark:hover:border-emerald-800/70 dark:hover:from-emerald-950/50 dark:hover:to-background"
                    >
                      {Icon ? (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm ring-1 ring-slate-200/70 transition-colors duration-150 group-hover/link:bg-emerald-600 group-hover/link:text-white group-hover/link:ring-emerald-500/30 dark:bg-card dark:ring-border dark:group-hover/link:bg-emerald-600 dark:group-hover/link:text-white dark:group-hover/link:ring-emerald-500/30">
                          <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
                        </span>
                      ) : null}
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-slate-800 group-hover/link:text-emerald-950 dark:text-foreground dark:group-hover/link:text-emerald-300">
                          {link.text}
                        </span>
                        {link.desc ? (
                          <span className="mt-0.5 block text-xs leading-snug text-slate-500 group-hover/link:text-slate-600 dark:text-muted-foreground dark:group-hover/link:text-muted-foreground">
                            {link.desc}
                          </span>
                        ) : null}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {featured ? (
              <Link
                href={featured.href}
                prefetch={false}
                onClick={onNavigate}
                className="group/feat relative hidden w-[min(17.5rem,34vw)] min-w-[13rem] shrink-0 lg:flex lg:flex-col"
              >
                <div className="relative h-full min-h-[17rem] flex-1 overflow-hidden bg-slate-900">
                  <Image
                    src={featured.imageSrc}
                    alt={featured.imageAlt}
                    fill
                    className="object-cover opacity-95 transition duration-700 ease-out group-hover/feat:scale-[1.06] group-hover/feat:opacity-100"
                    sizes="(min-width: 1024px) 280px, 0vw"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-slate-900/10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/25 to-transparent opacity-80 mix-blend-soft-light" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-100/95">Empfohlen</p>
                    <p className="mt-1.5 text-lg font-bold leading-snug tracking-tight">{featured.title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/85">{featured.subtitle}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-50">
                      {featured.cta}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/feat:translate-x-0.5" strokeWidth={2.5} aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
