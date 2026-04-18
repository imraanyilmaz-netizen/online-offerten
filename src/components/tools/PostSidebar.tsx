'use client'

import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tag, Folder, Clock, ArrowRight, List } from 'lucide-react'
import type { TocItem } from '@/lib/ratgeber/toc'

const PLACEHOLDER_IMG = 'https://online-offerten.ch/image/online-offerten.webp'

type RecentPost = {
  title?: string | null
  slug?: string | null
  featured_image_url?: string | null
}

type PostSidebarProps = {
  category?: string | null
  tags?: string[]
  recentPosts?: RecentPost[]
  ratgeberBasePath?: string
  tableOfContents?: TocItem[]
}

const PostSidebar: React.FC<PostSidebarProps> = ({
  category,
  tags,
  recentPosts,
  ratgeberBasePath = '/ratgeber',
  tableOfContents = [],
}) => {
  const [activeSection, setActiveSection] = React.useState('')

  React.useEffect(() => {
    if (!tableOfContents || tableOfContents.length === 0) return

    const handleScroll = () => {
      const sections = tableOfContents
        .map((item) => document.getElementById(item.id))
        .filter((section): section is HTMLElement => section !== null)

      let current = ''
      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 150 && rect.bottom >= 150) {
          current = section.id
          break
        }
      }

      if (!current) {
        for (const section of sections) {
          const rect = section.getBoundingClientRect()
          if (rect.top > 150) {
            current = section.id
            break
          }
        }
      }

      if (current && current !== activeSection) {
        setActiveSection(current)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tableOfContents, activeSection])

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  return (
    <div className="space-y-8 lg:sticky lg:top-28 lg:self-start">
      {tableOfContents && tableOfContents.length > 0 ? (
        <Card className="hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-sm ring-1 ring-slate-900/[0.03] dark:border-border dark:bg-card/95 dark:ring-white/[0.05] lg:block">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-muted-foreground">
              <List className="h-4 w-4 text-emerald-700 dark:text-emerald-400" aria-hidden />
              Auf dieser Seite
            </CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="space-y-1" aria-label="Inhaltsverzeichnis">
              {tableOfContents.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`block rounded-xl py-2 text-sm transition-colors ${
                    item.level === 3 ? 'pl-5 pr-2' : 'px-3'
                  } ${
                    activeSection === item.id
                      ? 'bg-emerald-50 font-semibold text-emerald-900 dark:bg-emerald-950/45 dark:text-emerald-100'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950 dark:text-muted-foreground dark:hover:bg-muted/50 dark:hover:text-foreground'
                  }`}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </CardContent>
        </Card>
      ) : null}

      <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-white to-emerald-50/40 p-6 shadow-[0_2px_28px_-12px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/[0.04] dark:border-border dark:from-card dark:via-card dark:to-emerald-950/25 dark:ring-white/[0.06]">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-foreground">
            Offerten vergleichen
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-muted-foreground">
            Bis zu fünf unverbindliche Angebote von geprüften Anbietern — kostenlos und in wenigen Minuten.
          </p>
        </div>
        <Button
          asChild
          className="mt-5 w-full rounded-xl bg-emerald-700 font-semibold text-white shadow-sm hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
        >
          <Link href="/kostenlose-offerte-anfordern" rel="noopener noreferrer">
            Jetzt Offerten einholen
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>

      {recentPosts && recentPosts.length > 0 ? (
        <Card className="rounded-2xl border border-slate-200/80 bg-white/95 shadow-sm ring-1 ring-slate-900/[0.03] dark:border-border dark:bg-card/95 dark:ring-white/[0.05]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-muted-foreground">
              <Clock className="h-4 w-4 text-emerald-700 dark:text-emerald-400" aria-hidden />
              Weitere Artikel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-5">
              {recentPosts
                .filter((recentPost) => recentPost?.slug)
                .map((recentPost, index) => {
                  const postHref = `${ratgeberBasePath}/${recentPost.slug}`
                  return (
                    <li key={recentPost.slug} className="flex gap-3">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-[0.6875rem] font-bold text-white dark:bg-slate-800">
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={postHref}
                          className="group flex gap-3 rounded-lg outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
                        >
                          <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-900/[0.06] dark:bg-muted">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={recentPost.featured_image_url || PLACEHOLDER_IMG}
                              alt=""
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                              width={80}
                              height={56}
                              loading="lazy"
                              decoding="async"
                              aria-hidden
                            />
                          </div>
                          <span className="line-clamp-2 text-sm font-medium leading-snug text-slate-900 transition-colors group-hover:text-emerald-800 dark:text-foreground dark:group-hover:text-emerald-300">
                            {recentPost.title}
                          </span>
                        </Link>
                      </div>
                    </li>
                  )
                })}
            </ul>
          </CardContent>
        </Card>
      ) : null}

      {(category || (tags && tags.length > 0)) && (
        <Card className="rounded-2xl border border-slate-200/80 bg-white/95 shadow-sm ring-1 ring-slate-900/[0.03] dark:border-border dark:bg-card/95 dark:ring-white/[0.05]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-muted-foreground">
              <Folder className="h-4 w-4 text-emerald-700 dark:text-emerald-400" aria-hidden />
              Einordnung
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {category ? (
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-muted-foreground">
                  Kategorie
                </h3>
                <Link
                  href={`${ratgeberBasePath}?${new URLSearchParams({ category }).toString()}`}
                  className="inline-flex rounded-full border border-emerald-200/90 bg-emerald-50/80 px-2.5 py-0.5 text-xs font-semibold text-emerald-900 transition-colors hover:border-emerald-300 hover:bg-emerald-100/90 dark:border-emerald-800/60 dark:bg-emerald-950/35 dark:text-emerald-200 dark:hover:border-emerald-500/50"
                >
                  {category}
                </Link>
              </div>
            ) : null}
            {tags && tags.length > 0 ? (
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-muted-foreground">
                  <Tag className="h-3.5 w-3.5" aria-hidden />
                  Schlagwörter
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`${ratgeberBasePath}?tag=${encodeURIComponent(String(tag).trim().toLowerCase())}`}
                      className="inline-flex rounded-full border border-slate-200/90 bg-slate-50/80 px-3 py-1 text-xs font-semibold text-slate-700 transition-colors hover:border-emerald-200 hover:bg-emerald-50/80 hover:text-emerald-900 dark:border-border dark:bg-muted/50 dark:text-foreground dark:hover:border-emerald-800/60"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default PostSidebar
