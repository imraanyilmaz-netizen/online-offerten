import type { Metadata } from 'next'
import { Suspense } from 'react'
import PostPageClient from '@/components/pages/tools/PostPageClient'

export const metadata: Metadata = {
  title: 'PostPage - Online-Offerten.ch',
  description: '',
  
  alternates: {
    canonical: 'https://online-offerten.ch/post',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function PostPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div></div>}>
      <PostPageClient />
    </Suspense>
  )
}
