import type { Metadata } from 'next'
import PostPageClient from '@/components/pages/tools/PostPageClient'

export const metadata: Metadata = {
  title: 'PostPage - Online-Offerten.ch',
  description: '',
  
  alternates: {
    canonical: 'https://online-offerten.ch/post',
  },
}

export default function PostPage() {
  return <PostPageClient />
}
