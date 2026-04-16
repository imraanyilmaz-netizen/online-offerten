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
    <div className="lg:hidden sticky top-[64px] z-40 bg-white dark:bg-card border-b border-gray-200 dark:border-border shadow-sm mb-6 rounded-lg mobile-toc-container">
      <div className="px-4">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 dark:hover:bg-muted transition-colors rounded-lg"
        >
          <span className="flex items-center gap-2 font-semibold text-gray-900 dark:text-foreground">
            <List className="w-5 h-5 text-gray-700 dark:text-muted-foreground" />
            Inhaltsverzeichnis
          </span>
          {open ? (
            <ChevronUp className="w-5 h-5 text-gray-600 dark:text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600 dark:text-muted-foreground" />
          )}
        </button>

        {open && (
          <div className="py-3 border-t border-gray-200 dark:border-border max-h-[60vh] overflow-y-auto">
            <nav className="space-y-1">
              {tableOfContents.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`block py-2 rounded-md text-sm text-gray-700 dark:text-muted-foreground hover:bg-gray-100 dark:hover:bg-muted hover:text-gray-900 dark:hover:text-foreground transition-colors ${
                    item.level === 3 ? 'pl-6 pr-3' : 'px-3'
                  }`}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}
