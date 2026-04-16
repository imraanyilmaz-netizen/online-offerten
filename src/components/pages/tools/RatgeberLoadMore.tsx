'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import ImageWithFallback from '@/components/ui/ImageWithFallback'

type Post = {
  id: string | number
  slug?: string | null
  title?: string | null
  category?: string | null
  meta_description?: string | null
  featured_image_url?: string | null
  created_at?: string | null
  read_more_text?: string | null
}

const INITIAL = 10
const STEP = 5
const ratgeberBasePath = '/ratgeber'

function formatPostDate(value?: string | null) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('de-DE')
}

function getReadMoreText(post: Post) {
  if (post.read_more_text && post.read_more_text.trim() !== '') {
    return post.read_more_text
  }
  return 'Weiterlesen'
}

export default function RatgeberLoadMore({ posts }: { posts: Post[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL)

  return (
    <>
      <div className="grid grid-cols-1 gap-8">
        {posts.slice(0, visibleCount).map((post) => {
          if (!post?.slug) return null
          const postHref = `${ratgeberBasePath}/${post.slug}`
          return (
            <Link
              key={post.id}
              href={postHref}
              className="group bg-white dark:bg-card border border-transparent dark:border-border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row items-center"
            >
              <div className="w-full md:w-1/3 h-48 md:h-full overflow-hidden bg-gray-100 dark:bg-muted">
                <ImageWithFallback
                  src={post.featured_image_url}
                  alt={post.title ?? ''}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow w-full md:w-2/3">
                {post.category && (
                  <Badge variant="secondary" className="mb-2 self-start">
                    {post.category}
                  </Badge>
                )}
                <h2 className="text-xl font-bold text-gray-900 dark:text-foreground mb-3 group-hover:text-green-700 dark:group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-gray-700 dark:text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
                  {post.meta_description || 'Keine Beschreibung verfügbar.'}
                </p>
                <div className="mt-auto flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-600 dark:text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatPostDate(post.created_at)}</span>
                  </div>
                  <div className="text-green-700 dark:text-primary font-semibold text-sm flex items-center">
                    {getReadMoreText(post)} <ArrowRight className="ml-1.5 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {posts.length > visibleCount && (
        <div className="mt-10 text-center">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="group border-green-600 dark:border-primary text-green-600 dark:text-primary hover:bg-green-600 dark:hover:bg-primary hover:text-white dark:hover:text-primary-foreground transition-all"
            onClick={() => setVisibleCount((prev) => prev + STEP)}
          >
            Weitere Artikel anzeigen
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      )}
    </>
  )
}
