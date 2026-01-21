'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function HreflangTags() {
  const pathname = usePathname()
  
  useEffect(() => {
    // Aktuelle URL erstellen
    const baseUrl = 'https://online-offerten.ch'
    const currentPath = pathname || '/'
    const fullUrl = `${baseUrl}${currentPath === '/' ? '' : currentPath}`
    
    // Bestehende dynamische hreflang Tags entfernen
    const existingTags = document.querySelectorAll('link[rel="alternate"][hreflang][data-hreflang-dynamic]')
    existingTags.forEach(tag => tag.remove())
    
    // Neue hreflang Tags hinzufügen
    const head = document.head
    
    // de-CH tag
    const deCHTag = document.createElement('link')
    deCHTag.rel = 'alternate'
    deCHTag.hreflang = 'de-CH'
    deCHTag.href = fullUrl
    deCHTag.setAttribute('data-hreflang-dynamic', 'true')
    head.appendChild(deCHTag)
    
    // x-default tag
    const xDefaultTag = document.createElement('link')
    xDefaultTag.rel = 'alternate'
    xDefaultTag.hreflang = 'x-default'
    xDefaultTag.href = fullUrl
    xDefaultTag.setAttribute('data-hreflang-dynamic', 'true')
    head.appendChild(xDefaultTag)
    
    // Cleanup function
    return () => {
      deCHTag.remove()
      xDefaultTag.remove()
    }
  }, [pathname])
  
  // Kein return, da wir useEffect verwenden
  return null
}
