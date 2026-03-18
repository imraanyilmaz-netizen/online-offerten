'use client'

import Link from 'next/link'
import { Home } from 'lucide-react'

export function BreadcrumbHomeLink() {
  return (
    <Link 
      href="/" 
      className="hover:text-green-600 transition-colors" 
      aria-label="Startseite"
    >
      <Home className="w-4 h-4" />
    </Link>
  )
}
