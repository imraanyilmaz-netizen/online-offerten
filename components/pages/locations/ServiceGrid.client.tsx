'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Home, Building, Globe, Package, Truck, MapPin } from 'lucide-react'

interface ServiceGridProps {
  city: string
}

const ServiceGrid = ({ city }: ServiceGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 md:gap-3 w-full">
      <Link 
        href={`/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug&city=${city}`}
        className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-colors group overflow-hidden w-full"
      >
        <Home className="w-6 h-6 text-green-600 mb-1.5 flex-shrink-0" />
        <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Privatumzug</span>
        <span className="text-xs text-gray-600 text-center break-words w-full px-1">Wohnung, Haus, WG-Zimmer</span>
        <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
      </Link>
      
      <Link 
        href={`/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=geschaeftsumzug&city=${city}`}
        className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-colors group overflow-hidden w-full"
      >
        <Building className="w-6 h-6 text-green-600 mb-1.5 flex-shrink-0" />
        <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Geschäftsumzug</span>
        <span className="text-xs text-gray-600 text-center break-words w-full px-1">Büro, Ladenlokal, Werkstatt</span>
        <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
      </Link>
      
      <Link 
        href={`/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=international&city=${city}`}
        className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-colors group overflow-hidden w-full"
      >
        <Globe className="w-6 h-6 text-green-600 mb-1.5 flex-shrink-0" />
        <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Internationaler Umzug</span>
        <span className="text-xs text-gray-600 text-center break-words w-full px-1">Umzüge ins oder aus dem Ausland</span>
        <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
      </Link>
      
      <Link 
        href={`/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=spezialtransport&city=${city}`}
        className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-colors group overflow-hidden w-full"
      >
        <Package className="w-6 h-6 text-green-600 mb-1.5 flex-shrink-0" />
        <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Spezialtransport</span>
        <span className="text-xs text-gray-600 text-center break-words w-full px-1">Klavier, Tresor, Kunst & mehr</span>
        <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
      </Link>
      
      <Link 
        href={`/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=kleintransport&city=${city}`}
        className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-colors group overflow-hidden w-full"
      >
        <Truck className="w-6 h-6 text-green-600 mb-1.5 flex-shrink-0" />
        <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Kleintransport</span>
        <span className="text-xs text-gray-600 text-center break-words w-full px-1">Einzelne Möbel, kleine Lasten</span>
        <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
      </Link>
      
      <Link 
        href={`/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=moebellift&city=${city}`}
        className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-lg p-3 flex flex-col items-center justify-center transition-colors group overflow-hidden w-full"
      >
        <MapPin className="w-6 h-6 text-green-600 mb-1.5 flex-shrink-0" />
        <span className="text-sm font-semibold text-gray-800 text-center mb-0.5 break-words w-full">Möbellift</span>
        <span className="text-xs text-gray-600 text-center break-words w-full px-1">Bis 400 kg, max. 27m Länge</span>
        <ArrowRight className="w-3 h-3 text-green-600 mt-1.5" />
      </Link>
    </div>
  )
}

export default ServiceGrid

