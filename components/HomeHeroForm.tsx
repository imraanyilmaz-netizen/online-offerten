'use client'

import React, { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronDown, X, Clock } from 'lucide-react'

interface ServiceOption {
  id: string
  label: string
  url: string
  category: string
}

const serviceOptions: ServiceOption[] = [
  // UMZUG Services
  { id: 'privatumzug', label: 'Privatumzug', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=privatumzug', category: 'Umzug' },
  { id: 'privatumzug_reinigung', label: 'Privatumzug und Reinigung', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=privatumzug&additional_cleaning=true', category: 'Umzug' },
  { id: 'geschaeftsumzug', label: 'Geschäftsumzug', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=geschaeftsumzug', category: 'Umzug' },
  { id: 'geschaeftsumzug_reinigung', label: 'Geschäftsumzug und Reinigung', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=geschaeftsumzug&additional_cleaning=true', category: 'Umzug' },
  { id: 'international', label: 'Auslandumzug', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=international', category: 'Umzug' },
  { id: 'spezialtransport_klavier', label: 'Klavier / Flügel', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=spezialtransport&special_transport_type=klaviertransport', category: 'Umzug' },
  { id: 'spezialtransport_tresor', label: 'Tresor / Safe', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=spezialtransport&special_transport_type=tresortransport', category: 'Umzug' },
  { id: 'spezialtransport_maschinen', label: 'Maschinen / Schwere Geräte', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=spezialtransport&special_transport_type=maschinen_geraete', category: 'Umzug' },
  { id: 'kleintransport', label: 'Kleintransport', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=kleintransport', category: 'Umzug' },
  { id: 'lagerung', label: 'Lagerung', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=lagerung', category: 'Umzug' },
  
  // REINIGUNG Services
  { id: 'umzugsreinigung', label: 'Umzugsreinigung', url: '/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=umzugsreinigung', category: 'Reinigung' },
  { id: 'wohnungsreinigung', label: 'Wohnungsreinigung', url: '/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=wohnungsreinigung', category: 'Reinigung' },
  { id: 'hausreinigung', label: 'Hausreinigung', url: '/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=hausreinigung', category: 'Reinigung' },
  { id: 'buero', label: 'Büroreinigung', url: '/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=buero', category: 'Reinigung' },
  { id: 'unterhaltsreinigung', label: 'Unterhaltsreinigung', url: '/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=unterhaltsreinigung', category: 'Reinigung' },
  { id: 'grundreinigung', label: 'Grundreinigung', url: '/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=grundreinigung', category: 'Reinigung' },
  { id: 'baureinigung', label: 'Baureinigung', url: '/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=baureinigung', category: 'Reinigung' },
  { id: 'fensterreinigung', label: 'Fensterreinigung', url: '/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=fensterreinigung', category: 'Reinigung' },
  { id: 'bodenreinigung', label: 'Bodenreinigung', url: '/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=bodenreinigung', category: 'Reinigung' },
  { id: 'fassadenreinigung', label: 'Fassadenreinigung', url: '/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=fassadenreinigung', category: 'Reinigung' },
  { id: 'hofreinigung', label: 'Hofreinigung', url: '/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=hofreinigung', category: 'Reinigung' },
  
  // RAEUMUNG Services
  { id: 'raeumung', label: 'Räumung', url: '/kostenlose-offerte-anfordern?service=raeumung&step=2&raeumungArt=raeumung', category: 'Räumung' },
  { id: 'entsorgung', label: 'Entsorgung', url: '/kostenlose-offerte-anfordern?service=raeumung&step=3&raeumungArt=entsorgung', category: 'Räumung' },
  
  // MALER Services
  { id: 'maler_privat', label: 'Malerarbeiten (Privat)', url: '/kostenlose-offerte-anfordern?service=maler&step=2&malerArt=maler_privat', category: 'Malerarbeiten' },
  { id: 'maler_gewerbe', label: 'Malerarbeiten (Gewerbe)', url: '/kostenlose-offerte-anfordern?service=maler&step=2&malerArt=maler_gewerbe', category: 'Malerarbeiten' },
]

const categoryKeywords: Record<string, string[]> = {
  'Umzug': ['umzug', 'umziehen', 'umzugs', 'privatumzug', 'geschäftsumzug', 'auslandumzug', 'spezialtransport', 'kleintransport', 'möbellift', 'klavier', 'flügel', 'tresor', 'safe', 'maschinen', 'geräte', 'privatumzug und reinigung', 'geschäftsumzug und reinigung'],
  'Reinigung': ['reinigung', 'reinigen', 'reinigungs', 'wohnungsreinigung', 'hausreinigung', 'büroreinigung', 'umzugsreinigung', 'unterhaltsreinigung', 'grundreinigung', 'baureinigung', 'fensterreinigung', 'bodenreinigung', 'fassadenreinigung', 'hofreinigung'],
  'Malerarbeiten': ['maler', 'malerarbeiten', 'streichen', 'anstrich', 'fassade'],
  'Räumung': ['räumung', 'entsorgung', 'entrümpelung']
}

const HomeHeroForm = memo(() => {
  const router = useRouter()
  const [serviceInput, setServiceInput] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedOption, setSelectedOption] = useState<ServiceOption | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Stats - statik değer (gereksiz re-render'ları önlemek için)
  const minutesAgo = 6

  // Memoize filtered options to prevent unnecessary recalculations
  const filteredOptionsMemo = useMemo(() => {
    if (!serviceInput.trim()) {
      return []
    }
    
      const searchTerm = serviceInput.toLowerCase()
      
      // Check for combination searches first (e.g., "privatumzug und reinigung")
      const isCombinationSearch = searchTerm.includes('und') || searchTerm.includes('&')
      
      // Find matching category first
      let matchedCategory: string | null = null
      let matchedCategories: string[] = []
      
      for (const [category, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(keyword => searchTerm.includes(keyword))) {
          if (isCombinationSearch) {
            matchedCategories.push(category)
          } else {
            matchedCategory = category
            break
          }
        }
      }
      
      // Filter options based on category or direct match
    return serviceOptions.filter(option => {
        // Direct label match (highest priority)
        if (option.label.toLowerCase().includes(searchTerm)) {
          return true
        }
        
        // Combination search (e.g., "privatumzug und reinigung")
        if (isCombinationSearch && matchedCategories.length > 0) {
          // Show combination options or options from matched categories
          if (option.id.includes('_reinigung') || option.id.includes('_und_')) {
            return true
          }
          return matchedCategories.some(cat => option.category === cat)
        }
        
        // Single category match
        if (matchedCategory) {
          return option.category === matchedCategory
        }
        
        // Fallback: category name match
        return option.category.toLowerCase().includes(searchTerm)
      })
  }, [serviceInput])

  // Dropdown'u filteredOptionsMemo'ya göre kontrol et
  useEffect(() => {
    if (filteredOptionsMemo.length > 0) {
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }, [filteredOptionsMemo])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(target) &&
        inputRef.current && 
        !inputRef.current.contains(target)
      ) {
        setShowDropdown(false)
      }
    }

    // Use mousedown instead of click for better UX
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleServiceSelect = useCallback((option: ServiceOption, e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    setSelectedOption(option)
    setServiceInput(option.label)
    setShowDropdown(false)
    // Input focus'unu kaldır
    inputRef.current?.blur()
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedOption) {
      let url = selectedOption.url
      
      router.push(url)
    } else if (serviceInput.trim()) {
      // Fallback: go to general form with service
      router.push(`/kostenlose-offerte-anfordern?service=${encodeURIComponent(serviceInput)}`)
    } else {
      router.push('/kostenlose-offerte-anfordern')
    }
  }, [selectedOption, serviceInput, router])

  const clearService = useCallback(() => {
    setServiceInput('')
    setSelectedOption(null)
    setShowDropdown(false)
    inputRef.current?.focus()
  }, [])

  return (
    <form 
      onSubmit={handleSubmit} 
      className="mb-6"
    >
      <div>
        <h1 className="heading-1 break-words">
          Offerten vergleichen & passende Anbieter in der Schweiz finden
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mt-2">
          Bei Online-Offerten finden Sie geprüfte, passende Anbieter in Ihrer Nähe.
        </p>
          
       <div className="flex flex-col md:flex-row gap-4 rounded-xl mt-4 md:p-4 lg:p-0">
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Welche Dienstleistung benötigen Sie?</label>
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={serviceInput}
              onChange={(e) => setServiceInput(e.target.value)}
              onFocus={() => {
                if (filteredOptionsMemo.length > 0 || serviceInput.trim()) {
                  setShowDropdown(true)
                }
              }}
              onBlur={(e) => {
                // Delay to allow click event to fire first
                setTimeout(() => {
                  // Check if focus moved to dropdown
                  if (dropdownRef.current && !dropdownRef.current.contains(document.activeElement)) {
                    setShowDropdown(false)
                  }
                }, 200)
              }}
              placeholder="z.B. Privatumzug, Klaviertransport, Entsorgung"
              className="w-full px-5 py-4 pr-12 md:pr-40 border-2 border-gray-200 rounded-3xl focus:border-green-500 focus:outline-none text-gray-900 bg-white"
              style={{ borderRadius: '0.65rem' }}
            />
            {serviceInput && (
              <button
                type="button"
                onClick={clearService}
                className="absolute right-32 md:right-32 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 hidden md:block"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            {serviceInput && (
              <button
                type="button"
                onClick={clearService}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 md:hidden"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            <Button
              type="submit"
              size={undefined}
              className="hidden md:block absolute right-1 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white px-6 !py-4 font-semibold text-sm !h-auto"
              style={{ borderRadius: '0.65rem' }}
            >
              Kostenlos anfragen
            </Button>
            
            {/* Dropdown */}
            {showDropdown && filteredOptionsMemo.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg max-h-64 overflow-y-auto"
              >
                {Object.entries(
                  filteredOptionsMemo.reduce((acc, option) => {
                    if (!acc[option.category]) {
                      acc[option.category] = []
                    }
                    acc[option.category].push(option)
                    return acc
                  }, {} as Record<string, ServiceOption[]>)
                ).map(([category, options]) => (
                  <div key={category} className="py-1">
                    <div className="px-4 py-2.5 text-xs font-bold text-green-700 uppercase tracking-wider bg-green-50 border-b border-green-100">
                      {category}
                    </div>
                    {options.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={(e) => handleServiceSelect(option, e)}
                        onMouseDown={(e) => e.preventDefault()}
                        className="w-full text-left px-4 py-3 hover:bg-green-50 transition-colors flex items-center justify-between group border-b border-gray-50 last:border-b-0"
                      >
                        <span className="text-gray-800 font-medium group-hover:text-green-700">{option.label}</span>
                        <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-green-600 rotate-[-90deg] transition-colors" />
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Mobilde buton input'un altında */}
          <Button
            type="submit"
            size={undefined}
            className="md:hidden w-full mt-3 bg-green-600 hover:bg-green-700 text-white px-6 !py-4 font-semibold text-sm !h-auto"
            style={{ borderRadius: '0.65rem' }}
          >
            Kostenlos anfragen
          </Button>
        </div>
      </div>
      </div>
    </form>
  )
})

HomeHeroForm.displayName = 'HomeHeroForm'

export default HomeHeroForm



