'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Search, ChevronDown, X, Loader2, Clock, FileText } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

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
  { id: 'moebellift', label: 'Möbellift mieten', url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=moebellift', category: 'Umzug' },
  
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
  
  // GARTEN Services
  { id: 'gartenpflege', label: 'Gartenpflege', url: '/kostenlose-offerte-anfordern?service=garten&step=2', category: 'Gartenarbeiten' },
  { id: 'terrassenverlegung', label: 'Terrassenverlegung', url: '/kostenlose-offerte-anfordern?service=garten&step=2', category: 'Gartenarbeiten' },
  { id: 'pool', label: 'Pool', url: '/kostenlose-offerte-anfordern?service=garten&step=2', category: 'Gartenarbeiten' },
  { id: 'sporteinrichtungsbau', label: 'Sporteinrichtungsbau', url: '/kostenlose-offerte-anfordern?service=garten&step=2', category: 'Gartenarbeiten' },
  { id: 'gartenhausbau', label: 'Gartenhausbau', url: '/kostenlose-offerte-anfordern?service=garten&step=2', category: 'Gartenarbeiten' },
  { id: 'saunabau', label: 'Saunabau', url: '/kostenlose-offerte-anfordern?service=garten&step=2', category: 'Gartenarbeiten' },
]

const categoryKeywords: Record<string, string[]> = {
  'Umzug': ['umzug', 'umziehen', 'umzugs', 'privatumzug', 'geschäftsumzug', 'auslandumzug', 'spezialtransport', 'kleintransport', 'möbellift', 'klavier', 'flügel', 'tresor', 'safe', 'maschinen', 'geräte', 'privatumzug und reinigung', 'geschäftsumzug und reinigung'],
  'Reinigung': ['reinigung', 'reinigen', 'reinigungs', 'wohnungsreinigung', 'hausreinigung', 'büroreinigung', 'umzugsreinigung', 'unterhaltsreinigung', 'grundreinigung', 'baureinigung', 'fensterreinigung', 'bodenreinigung', 'fassadenreinigung', 'hofreinigung'],
  'Malerarbeiten': ['maler', 'malerarbeiten', 'streichen', 'anstrich', 'fassade'],
  'Gartenarbeiten': ['garten', 'gartenarbeiten', 'gartenpflege', 'terrassenverlegung', 'pool', 'sporteinrichtungsbau', 'gartenhausbau', 'saunabau'],
  'Räumung': ['räumung', 'entsorgung', 'entrümpelung']
}

const HomeHeroForm = () => {
  const router = useRouter()
  const [serviceInput, setServiceInput] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const [isFetchingCity, setIsFetchingCity] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState<ServiceOption[]>([])
  const [selectedOption, setSelectedOption] = useState<ServiceOption | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const postalCodeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Stats state
  const [minutesAgo, setMinutesAgo] = useState(6)
  const [todayCount, setTodayCount] = useState(50)

  useEffect(() => {
    if (serviceInput.trim()) {
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
      const filtered = serviceOptions.filter(option => {
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
      
      setFilteredOptions(filtered)
      setShowDropdown(filtered.length > 0)
    } else {
      setFilteredOptions([])
      setShowDropdown(false)
    }
  }, [serviceInput])

  // PLZ to City mapping for known incorrect cases (fallback)
  const plzCityMapping: Record<string, string> = {
    '8953': 'Dietikon',
    '8952': 'Schlieren',
    '8954': 'Geroldswil',
    '8955': 'Oetwil am See',
    '8956': 'Killwangen',
    '8957': 'Spreitenbach',
  }

  // Fetch city from PLZ
  useEffect(() => {
    if (postalCodeTimeoutRef.current) {
      clearTimeout(postalCodeTimeoutRef.current)
    }

    if (postalCode.trim().length >= 4) {
      postalCodeTimeoutRef.current = setTimeout(async () => {
        setIsFetchingCity(true)
        setCity('') // Clear previous city while fetching
        
        const plzTrimmed = postalCode.trim()
        
        // Check fallback mapping first
        if (plzCityMapping[plzTrimmed]) {
          setCity(plzCityMapping[plzTrimmed])
          setIsFetchingCity(false)
          return
        }
        
        try {
          const { data, error } = await supabase.functions.invoke('fetch-city-by-zip', {
            body: { zipCode: plzTrimmed },
          })

          if (error) {
            console.error('Error fetching city from PLZ:', error)
            // Try fallback mapping even on error
            if (plzCityMapping[plzTrimmed]) {
              setCity(plzCityMapping[plzTrimmed])
            } else {
              setCity('')
            }
            return
          }

          // Debug: Log the response
          console.log('PLZ Response for', plzTrimmed, ':', data)

          // Handle response - function should return the correct city/village name
          if (data) {
            let cityName = ''
            
            if (data.city) {
              cityName = data.city
            } else if (data.name) {
              cityName = data.name
            } else if (data.ort) {
              cityName = data.ort
            } else if (data.place_name) {
              cityName = data.place_name
            }
            
            // Check if the returned city is incorrect and use fallback
            if (cityName && plzCityMapping[plzTrimmed] && cityName !== plzCityMapping[plzTrimmed]) {
              console.warn(`Incorrect city returned for PLZ ${plzTrimmed}: ${cityName}, using fallback: ${plzCityMapping[plzTrimmed]}`)
              setCity(plzCityMapping[plzTrimmed])
            } else if (cityName) {
              setCity(cityName)
            } else if (data.error) {
              console.warn('City not found for PLZ:', plzTrimmed, data.error)
              // Try fallback mapping
              if (plzCityMapping[plzTrimmed]) {
                setCity(plzCityMapping[plzTrimmed])
              } else {
                setCity('')
              }
            } else {
              setCity('')
            }
          } else {
            // Try fallback mapping
            if (plzCityMapping[plzTrimmed]) {
              setCity(plzCityMapping[plzTrimmed])
            } else {
              setCity('')
            }
          }
        } catch (err) {
          console.error('Error fetching city:', err)
          // Try fallback mapping on error
          if (plzCityMapping[plzTrimmed]) {
            setCity(plzCityMapping[plzTrimmed])
          } else {
            setCity('')
          }
        } finally {
          setIsFetchingCity(false)
        }
      }, 500)
    } else {
      setCity('')
    }

    return () => {
      if (postalCodeTimeoutRef.current) {
        clearTimeout(postalCodeTimeoutRef.current)
      }
    }
  }, [postalCode])

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

  // Stats useEffect
  useEffect(() => {
    // Rastgele dakika değeri (2-15 arası)
    const randomMinutes = Math.floor(Math.random() * 14) + 2
    setMinutesAgo(randomMinutes)

    // Saat başına 10 ekleme mantığı
    const calculateTodayCount = () => {
      const now = new Date()
      const currentHour = now.getHours()
      
      // Sabah 12'den (12:00) başla, akşam 12'ye (23:59) kadar
      // Saat 12'de başlangıç: 50
      // Her saat başına +10
      let startHour = 12
      let baseCount = 50
      
      if (currentHour >= 12) {
        // Öğleden sonra: 12'den itibaren geçen saatler
        const hoursPassed = currentHour - startHour
        const count = baseCount + (hoursPassed * 10)
        setTodayCount(count)
      } else {
        // Gece yarısından sabah 12'ye kadar: önceki günün devamı
        // Gece 0-11 arası için: 12 saat * 10 = 120 ekle
        const hoursPassed = currentHour + (24 - startHour)
        const count = baseCount + (hoursPassed * 10)
        setTodayCount(count)
      }
    }

    calculateTodayCount()

    // Her dakika dakika sayısını güncelle (2-15 arası rastgele)
    const minutesInterval = setInterval(() => {
      const randomMinutes = Math.floor(Math.random() * 14) + 2
      setMinutesAgo(randomMinutes)
    }, 60000) // Her 1 dakikada bir

    // Her saat başı sayıyı güncelle
    const hourInterval = setInterval(() => {
      calculateTodayCount()
    }, 3600000) // Her 1 saatte bir

    return () => {
      clearInterval(minutesInterval)
      clearInterval(hourInterval)
    }
  }, [])

  const handleServiceSelect = (option: ServiceOption, e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    setSelectedOption(option)
    setServiceInput(option.label)
    setShowDropdown(false)
    // Input focus'unu kaldır
    inputRef.current?.blur()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedOption) {
      let url = selectedOption.url
      
      // Add PLZ and city to URL if provided (for form auto-fill)
      if (postalCode.trim()) {
        const separator = url.includes('?') ? '&' : '?'
        url += `${separator}from_plz=${encodeURIComponent(postalCode.trim())}`
        if (city.trim()) {
          url += `&from_city=${encodeURIComponent(city.trim())}`
        }
      }
      
      router.push(url)
    } else if (serviceInput.trim() && postalCode.trim()) {
      // Fallback: go to general form with service, PLZ and city
      let url = `/kostenlose-offerte-anfordern?service=${encodeURIComponent(serviceInput)}&from_plz=${encodeURIComponent(postalCode.trim())}`
      if (city.trim()) {
        url += `&from_city=${encodeURIComponent(city.trim())}`
      }
      router.push(url)
    } else {
      router.push('/kostenlose-offerte-anfordern')
    }
  }

  const clearService = () => {
    setServiceInput('')
    setSelectedOption(null)
    setFilteredOptions([])
    setShowDropdown(false)
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 relative z-30">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Was steht an?</label>
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={serviceInput}
              onChange={(e) => setServiceInput(e.target.value)}
              onFocus={() => {
                if (filteredOptions.length > 0 || serviceInput.trim()) {
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
              placeholder="z.B. Umzug, Reinigung, Malerarbeiten"
              className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none text-gray-900"
            />
            {serviceInput && (
              <button
                type="button"
                onClick={clearService}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            
            {/* Dropdown */}
            {showDropdown && filteredOptions.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute z-[500] w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto"
              >
                {Object.entries(
                  filteredOptions.reduce((acc, option) => {
                    if (!acc[option.category]) {
                      acc[option.category] = []
                    }
                    acc[option.category].push(option)
                    return acc
                  }, {} as Record<string, ServiceOption[]>)
                ).map(([category, options]) => (
                  <div key={category} className="p-2">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {category}
                    </div>
                    {options.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={(e) => handleServiceSelect(option, e)}
                        onMouseDown={(e) => e.preventDefault()} // Prevent input blur before click
                        className="w-full text-left px-3 py-2 hover:bg-green-50 rounded-md transition-colors flex items-center justify-between group"
                      >
                        <span className="text-gray-900">{option.label}</span>
                        <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-green-600 transform rotate-[-90deg] transition-colors" />
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Wo?</label>
          <div className="relative">
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Postleitzahl oder Ort"
              className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none text-gray-900"
            />
            {isFetchingCity && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="h-5 w-5 text-green-600 animate-spin" />
              </div>
            )}
            {!isFetchingCity && city && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-600 font-medium pointer-events-none">
                {city}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-end">
          <Button
            type="submit"
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 h-auto rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 w-full md:w-auto"
          >
            <Search className="mr-2 h-5 w-5" />
            Finden
          </Button>
        </div>
      </div>
      
      {/* Stats inside form */}
      <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
        <p 
          className="flex items-center gap-2"
          style={{
            fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 400,
            color: '#1c1d16',
            textAlign: 'start',
            letterSpacing: 'normal',
            wordSpacing: '0px',
            fontStyle: 'normal',
            textTransform: 'none',
            textDecoration: 'none',
            textIndent: '0px'
          }}
        >
          <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
          Die letzte Anfrage wurde vor <span className="font-semibold">{minutesAgo}</span> Minuten gestellt
        </p>
        <p 
          className="flex items-center gap-2"
          style={{
            fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 400,
            color: '#1c1d16',
            textAlign: 'start',
            letterSpacing: 'normal',
            wordSpacing: '0px',
            fontStyle: 'normal',
            textTransform: 'none',
            textDecoration: 'none',
            textIndent: '0px'
          }}
        >
          <FileText className="h-4 w-4 text-gray-500 flex-shrink-0" />
          Es wurden heute <span className="font-bold text-green-600">{todayCount}</span>{' '}
          <span className="font-bold text-green-600">Anfragen</span> gestellt
        </p>
      </div>
    </form>
  )
}

export default HomeHeroForm

