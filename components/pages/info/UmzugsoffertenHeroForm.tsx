'use client'

import React, { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronDown, X, Clock } from 'lucide-react'

interface ServiceOption {
  id: string
  label: string
  url: string
}

// Sadece Umzug servisleri
const umzugServiceOptions: ServiceOption[] = [
  { id: 'privatumzug', label: 'Privatumzug', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=privatumzug' },
  { id: 'privatumzug_reinigung', label: 'Privatumzug und Reinigung', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=privatumzug&additional_cleaning=true' },
  { id: 'geschaeftsumzug', label: 'Geschäftsumzug', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=geschaeftsumzug' },
  { id: 'geschaeftsumzug_reinigung', label: 'Geschäftsumzug und Reinigung', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=geschaeftsumzug&additional_cleaning=true' },
  { id: 'international', label: 'Auslandumzug', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=international' },
  { id: 'spezialtransport_klavier', label: 'Klavier / Flügel', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=spezialtransport&special_transport_type=klaviertransport' },
  { id: 'spezialtransport_tresor', label: 'Tresor / Safe', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=spezialtransport&special_transport_type=tresortransport' },
  { id: 'spezialtransport_maschinen', label: 'Maschinen / Schwere Geräte', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=spezialtransport&special_transport_type=maschinen_geraete' },
  { id: 'kleintransport', label: 'Kleintransport', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=kleintransport' },
  { id: 'lagerung', label: 'Lagerung', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=lagerung' },
]

const umzugKeywords = ['umzug', 'umziehen', 'umzugs', 'privatumzug', 'geschäftsumzug', 'auslandumzug', 'spezialtransport', 'kleintransport', 'möbellift', 'klavier', 'flügel', 'tresor', 'safe', 'maschinen', 'geräte', 'privatumzug und reinigung', 'geschäftsumzug und reinigung']

const UmzugsoffertenHeroForm = memo(() => {
  const router = useRouter()
  const [serviceInput, setServiceInput] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedOption, setSelectedOption] = useState<ServiceOption | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Stats - statik değer
  const minutesAgo = 6

  // Memoize filtered options - sadece Umzug servisleri
  const filteredOptionsMemo = useMemo(() => {
    if (!serviceInput.trim()) {
      return []
    }
    
    const searchTerm = serviceInput.toLowerCase()
    
    // Check for combination searches
    const isCombinationSearch = searchTerm.includes('und') || searchTerm.includes('&')
    
    // Filter only Umzug services
    return umzugServiceOptions.filter(option => {
      // Direct label match (highest priority)
      if (option.label.toLowerCase().includes(searchTerm)) {
        return true
      }
      
      // Combination search (e.g., "privatumzug und reinigung")
      if (isCombinationSearch) {
        if (option.id.includes('_reinigung') || option.id.includes('_und_')) {
          return true
        }
      }
      
      // Keyword match
      return umzugKeywords.some(keyword => searchTerm.includes(keyword))
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
    inputRef.current?.blur()
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedOption) {
      router.push(selectedOption.url)
    } else if (serviceInput.trim()) {
      // Fallback: go to general form with umzug service
      router.push(`/kostenlose-offerte-anfordern?service=umzug&step=2`)
    } else {
      router.push('/kostenlose-offerte-anfordern?service=umzug&step=2')
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
      className="bg-white rounded-2xl p-6 md:p-8 mb-8"
    >
      <div className="flex flex-col md:flex-row gap-4 rounded-xl md:p-4 lg:p-0">
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Was steht an?</label>
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
                setTimeout(() => {
                  if (dropdownRef.current && !dropdownRef.current.contains(document.activeElement)) {
                    setShowDropdown(false)
                  }
                }, 200)
              }}
              placeholder="z.B. Privatumzug, Geschäftsumzug, Auslandumzug"
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
            
            {/* Dropdown - sadece Umzug servisleri */}
            {showDropdown && filteredOptionsMemo.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg max-h-64 overflow-y-auto"
              >
                <div className="py-1">
                  <div className="px-4 py-2.5 text-xs font-bold text-green-700 uppercase tracking-wider bg-green-50 border-b border-green-100">
                    Umzug
                  </div>
                  {filteredOptionsMemo.map((option) => (
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
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="flex flex-wrap items-center gap-1.5 text-sm md:text-base text-gray-600 leading-relaxed">
          <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
          <span>Die letzte Anfrage wurde vor</span>
          <span className="font-semibold text-gray-800">{minutesAgo} Minuten</span>
          <span>gestellt</span>
        </p>
      </div>
    </form>
  )
})

UmzugsoffertenHeroForm.displayName = 'UmzugsoffertenHeroForm'

export default UmzugsoffertenHeroForm



