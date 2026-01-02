'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Home, Building, Globe, Package, Truck, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ServiceGridProps {
  city: string
}

const ServiceGrid = ({ city }: ServiceGridProps) => {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const services = [
    { 
      id: 'privatumzug',
      name: 'Privatumzug',
      description: 'Wohnung, Haus, WG-Zimmer',
      icon: Home,
      umzugArt: 'privatumzug'
    },
    { 
      id: 'geschaeftsumzug',
      name: 'Geschäftsumzug',
      description: 'Büro, Ladenlokal, Werkstatt',
      icon: Building,
      umzugArt: 'geschaeftsumzug'
    },
    { 
      id: 'international',
      name: 'Internationaler Umzug',
      description: 'Umzüge ins oder aus dem Ausland',
      icon: Globe,
      umzugArt: 'international'
    },
    { 
      id: 'spezialtransport',
      name: 'Spezialtransport',
      description: 'Klavier, Tresor, Kunst & mehr',
      icon: Package,
      umzugArt: 'spezialtransport'
    },
    { 
      id: 'kleintransport',
      name: 'Kleintransport',
      description: 'Einzelne Möbel, kleine Lasten',
      icon: Truck,
      umzugArt: 'kleintransport'
    },
    { 
      id: 'moebellift',
      name: 'Möbellift',
      description: 'Bis 400 kg, max. 27m Länge',
      icon: MapPin,
      umzugArt: 'moebellift'
    }
  ]

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId)
  }

  const getFormUrl = () => {
    if (!selectedService) return '#'
    const service = services.find(s => s.id === selectedService)
    if (!service) return '#'
    return `/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=${service.umzugArt}&city=${city}`
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-2 md:gap-3 w-full mb-4">
        {services.map((service) => {
          const Icon = service.icon
          const isSelected = selectedService === service.id
          return (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className={`bg-green-50 hover:bg-green-100 border-2 rounded-lg p-3 flex flex-col items-center justify-center transition-all group overflow-hidden w-full ${
                isSelected 
                  ? 'border-green-600 bg-green-100 shadow-md' 
                  : 'border-green-200 hover:border-green-400'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1.5 flex-shrink-0 ${isSelected ? 'text-green-700' : 'text-green-600'}`} />
              <span className={`text-sm font-semibold text-center mb-0.5 break-words w-full ${isSelected ? 'text-gray-900' : 'text-gray-800'}`}>
                {service.name}
              </span>
              <span className="text-xs text-gray-600 text-center break-words w-full px-1">
                {service.description}
              </span>
              <ArrowRight className={`w-3 h-3 mt-1.5 ${isSelected ? 'text-green-700' : 'text-green-600'}`} />
            </button>
          )
        })}
      </div>
      
      {selectedService && (
        <div className="mt-4 fade-in">
          <Link href={getFormUrl()}>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all">
              Jetzt Anfrage starten
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default ServiceGrid

