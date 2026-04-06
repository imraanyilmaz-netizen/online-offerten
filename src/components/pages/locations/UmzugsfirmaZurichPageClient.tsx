'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Home, Building, Globe, Package, Truck, MapPin } from 'lucide-react'
import LocationPageNavigation from '@/components/locations/LocationPageNavigation'
import LocationSidebar from '@/components/locations/LocationSidebar'
import { locations } from '@/data/locations'

interface UmzugsfirmaZurichPageClientProps {
  showSidebar?: boolean
  showFAQ?: boolean
  showNavigation?: boolean
}

const UmzugsfirmaZurichPageClient = ({ 
  showSidebar = false, 
  showFAQ = false, 
  showNavigation = false 
}: UmzugsfirmaZurichPageClientProps) => {
  const city = "Zürich"
  const locationData = locations.find(loc => loc.name === city)

  // Service Grid Component - Client-side only for interactivity
  if (!showSidebar && !showFAQ && !showNavigation) {
  return (
      <div className="grid grid-cols-2 gap-2 md:gap-3 w-full">
        <Link 
          href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug&city=Zürich"
          className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-colors group overflow-hidden w-full"
        >
          <Home className="w-6 h-6 text-green-600 mb-1.5 flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Privatumzug</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Wohnung, Haus, WG-Zimmer</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                  
        <Link 
          href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=geschaeftsumzug&city=Zürich"
          className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-colors group overflow-hidden w-full"
                  >
          <Building className="w-6 h-6 text-green-600 mb-1.5 flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Geschäftsumzug</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Büro, Ladenlokal, Werkstatt</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                  
        <Link 
          href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=international&city=Zürich"
          className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-colors group overflow-hidden w-full"
                  >
          <Globe className="w-6 h-6 text-green-600 mb-1.5 flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Internationaler Umzug</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Umzüge ins oder aus dem Ausland</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                  
        <Link 
          href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=spezialtransport&city=Zürich"
          className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-colors group overflow-hidden w-full"
                  >
          <Package className="w-6 h-6 text-green-600 mb-1.5 flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Spezialtransport</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Klavier, Tresor, Kunst & mehr</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                  
        <Link 
          href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=kleintransport&city=Zürich"
          className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-colors group overflow-hidden w-full"
                  >
          <Truck className="w-6 h-6 text-green-600 mb-1.5 flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Kleintransport</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Einzelne Möbel, kleine Lasten</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                  
        <Link 
          href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=lagerung&city=Zürich"
          className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-colors group overflow-hidden w-full"
                  >
          <MapPin className="w-6 h-6 text-green-600 mb-1.5 flex-shrink-0" />
                    <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Lagerung</span>
                    <span className="text-xs text-gray-600 text-center break-words w-full px-1">Möbel sicher einlagern</span>
                    <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
                  </Link>
                </div>
    )
  }

  // Sidebar Component
  if (showSidebar) {
    return (
            <LocationSidebar 
              city={city} 
              districts={{
                title: "Stadtkreise von Zürich",
                text: "Unsere Partner sind in allen Zürcher Stadtkreisen für Sie im Einsatz:",
                list: ["Kreis 1 (Altstadt)", "Kreis 2 (Enge, Wollishofen)", "Kreis 3 (Wiedikon)", "Kreis 4 (Aussersihl)", "Kreis 5 (Industriequartier)", "Kreis 6 (Unterstrass, Oberstrass)", "Kreis 7 (Fluntern, Hottingen)", "Kreis 8 (Seefeld)", "Kreis 9 (Altstetten, Albisrieden)", "Kreis 10 (Wipkingen, Höngg)", "Kreis 11 (Oerlikon, Seebach)", "Kreis 12 (Schwamendingen)"]
              }}
              searches={undefined as any}
            />
    )
  }

  // FAQ and Navigation Component
  if (showFAQ || showNavigation) {
    return (
      <>
        {showNavigation && <LocationPageNavigation allLocations={locations} currentCity={city} />}
      </>
    )
  }

  return null
}

export default UmzugsfirmaZurichPageClient


