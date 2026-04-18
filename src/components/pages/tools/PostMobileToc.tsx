'use client'

import React, { useState } from 'react'
import { List, ChevronDown, ChevronUp } from 'lucide-react'
import type { TocItem } from '@/lib/ratgeber/toc'

type Props = {
  tableOfContents: TocItem[]
}

export default function PostMobileToc({ tableOfContents }: Props) {
  const [open, setOpen] = useState(false)

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    setOpen(false)
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        const yOffset = -130
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    }, 100)
  }

  if (tableOfContents.length === 0) return null

  return (
    <div className="mobile-toc-container sticky top-[64px] z-40 lg:hidden">
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.15)] ring-1 ring-slate-900/[0.04] backdrop-blur-md dark:border-border dark:bg-slate-950/90 dark:ring-white/[0.06]">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors hover:bg-slate-50/90 dark:hover:bg-white/5"
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-foreground">
            <List className="h-4 w-4 text-emerald-700 dark:text-emerald-400" aria-hidden />
            Auf dieser Seite
          </span>
          {open ? (
            <ChevronUp className="h-5 w-5 text-slate-500 dark:text-muted-foreground" aria-hidden />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-500 dark:text-muted-foreground" aria-hidden />
          )}
        </button>

        {open ? (
          <div className="max-h-[60vh] overflow-y-auto border-t border-slate-100 px-2 py-3 dark:border-border">
            <nav className="space-y-0.5" aria-label="Inhaltsverzeichnis">
              {tableOfContents.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`block rounded-lg py-2 text-sm text-slate-700 transition-colors hover:bg-emerald-50/80 hover:text-emerald-900 dark:text-muted-foreground dark:hover:bg-emerald-950/30 dark:hover:text-emerald-200 ${
                    item.level === 3 ? 'pl-6 pr-3' : 'px-3'
                  }`}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>
        ) : null}
      </div>
    </div>
  )
}
