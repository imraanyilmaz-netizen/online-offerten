import Link from 'next/link'

export type RatgeberIndexHeroProps = {
  articleCount: number
  categoryCount: number
  tagCount: number
  activeTag: string
  activeCategory: string
}

export function RatgeberIndexHero({
  articleCount,
  categoryCount,
  tagCount,
  activeTag,
  activeCategory,
}: RatgeberIndexHeroProps) {
  const hasFilter = Boolean(activeTag || activeCategory)

  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-slate-950">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-emerald-500/25 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-teal-400/20 blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 md:pb-20 md:pt-14">
        <nav aria-label="Brotkrumen" className="mb-10 text-sm text-slate-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Start
              </Link>
            </li>
            <li className="text-slate-600" aria-hidden>
              /
            </li>
            <li className="font-medium text-slate-200">Ratgeber</li>
          </ol>
        </nav>

        <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-emerald-300/90">
          Wissen &amp; Planung
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.05]">
          Ratgeber für Umzug, Reinigung &amp; mehr
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
          Praxisnahe Artikel, Checklisten und Orientierung für Ihre Offerten — kuratiert und
          verständlich aufbereitet.
        </p>

        <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-10 sm:max-w-xl sm:gap-8">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">Artikel</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums text-white sm:text-3xl">{articleCount}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">Kategorien</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums text-white sm:text-3xl">{categoryCount}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">Themen</dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums text-white sm:text-3xl">{tagCount}</dd>
          </div>
        </dl>

        {hasFilter ? (
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="text-sm text-slate-400">Aktive Auswahl:</span>
            {activeCategory ? (
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white">
                Kategorie: {activeCategory}
              </span>
            ) : null}
            {activeTag ? (
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-sm text-emerald-100">
                Schlagwort: {activeTag}
              </span>
            ) : null}
            <Link
              href="/ratgeber"
              className="text-sm font-semibold text-emerald-300 underline-offset-4 transition-colors hover:text-emerald-200 hover:underline"
            >
              Alle Artikel anzeigen
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  )
}
