import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PostPage - Online-Offerten.ch',
  description: '',

  robots: {
    index: false,
    follow: false,
  },
}

/** Legacy route; Ratgeber lives under /ratgeber. */
export default function PostPage() {
  return null
}
