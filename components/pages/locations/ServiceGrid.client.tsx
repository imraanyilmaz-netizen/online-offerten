'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Home, Building, Globe, Package, Truck, MapPin, CheckCircle2 } from 'lucide-react'
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
      umzugArt: 'privatumzug',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      iconColor: 'text-blue-600'
    },
    { 
      id: 'geschaeftsumzug',
      name: 'Geschäftsumzug',
      description: 'Büro, Ladenlokal, Werkstatt',
      icon: Building,
      umzugArt: 'geschaeftsumzug',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      iconColor: 'text-purple-600'
    },
    { 
      id: 'international',
      name: 'Internationaler Umzug',
      description: 'Umzüge ins oder aus dem Ausland',
      icon: Globe,
      umzugArt: 'international',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
      iconColor: 'text-emerald-600'
    },
    { 
      id: 'spezialtransport',
      name: 'Spezialtransport',
      description: 'Klavier, Tresor, Kunst & mehr',
      icon: Package,
      umzugArt: 'spezialtransport',
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50',
      iconColor: 'text-amber-600'
    },
    { 
      id: 'kleintransport',
      name: 'Kleintransport',
      description: 'Einzelne Möbel, kleine Lasten',
      icon: Truck,
      umzugArt: 'kleintransport',
      gradient: 'from-indigo-500 to-blue-500',
      bgGradient: 'from-indigo-50 to-blue-50',
      iconColor: 'text-indigo-600'
    },
    { 
      id: 'moebellift',
      name: 'Möbellift mieten',
      description: 'Bis 400 kg, max. 27m Länge',
      icon: MapPin,
      umzugArt: 'moebellift',
      gradient: 'from-rose-500 to-red-500',
      bgGradient: 'from-rose-50 to-red-50',
      iconColor: 'text-rose-600'
    }
  ]

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId)
  }

  const getFormUrl = () => {
    if (!selectedService) return '#'
    const service = services.find(s => s.id === selectedService)
    if (!service) return '#'
    
    // Privatumzug: step=2
    if (service.id === 'privatumzug') {
      return `/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug&city=${city}`
    }
    
    // Geschäftsumzug: step=3
    if (service.id === 'geschaeftsumzug') {
      return `/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=geschaeftsumzug&city=${city}`
    }
    
    // Internationaler Umzug: step=3
    if (service.id === 'international') {
      return `/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=international&city=${city}`
    }
    
    // Spezialtransport: step=3 mit special_transport_type
    if (service.id === 'spezialtransport') {
      return `/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=spezialtransport&special_transport_type=klaviertransport&city=${city}`
    }
    
    // Kleintransport: step=3
    if (service.id === 'kleintransport') {
      return `/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=kleintransport&city=${city}`
    }
    
    // Möbellift: step=3
    if (service.id === 'moebellift') {
      return `/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=moebellift&city=${city}`
    }
    
    return `/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=${service.umzugArt}&city=${city}`
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full mb-6">
        {services.map((service) => {
          const Icon = service.icon
          const isSelected = selectedService === service.id
          return (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className={`
                relative bg-white border-2 rounded-xl p-5 md:p-6 
                flex flex-col items-center justify-center 
                transition-all duration-300 ease-in-out
                group overflow-hidden
                w-full
                ${isSelected 
                  ? `border-green-600 bg-gradient-to-br ${service.bgGradient} shadow-xl scale-105 ring-2 ring-green-500 ring-offset-2` 
                  : 'border-gray-200 hover:border-green-400 hover:shadow-lg hover:scale-102'
                }
              `}
            >
              {/* Background Gradient Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${isSelected ? 'opacity-10' : ''}`} />
              
              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <div className="bg-green-600 rounded-full p-1 shadow-lg">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
              
              {/* Icon Container */}
              <div className={`
                relative z-10 w-14 h-14 md:w-16 md:h-16 
                rounded-2xl mb-4
                flex items-center justify-center
                transition-all duration-300
                ${isSelected 
                  ? `bg-gradient-to-br ${service.gradient} shadow-lg` 
                  : `bg-gradient-to-br ${service.bgGradient} group-hover:shadow-md`
                }
              `}>
                <Icon className={`w-7 h-7 md:w-8 md:h-8 ${isSelected ? 'text-white' : service.iconColor}`} />
              </div>
              
              {/* Content */}
              <div className="relative z-10 text-center w-full">
                <h3 className={`
                  text-base md:text-lg font-bold mb-2
                  transition-colors duration-300
                  ${isSelected ? 'text-gray-900' : 'text-gray-800'}
                `}>
                  {service.name}
                </h3>
                <p className={`
                  text-xs md:text-sm 
                  transition-colors duration-300
                  ${isSelected ? 'text-gray-700' : 'text-gray-600'}
                  leading-relaxed
                `}>
                  {service.description}
                </p>
              </div>
              
              {/* Arrow Indicator */}
              <div className={`
                relative z-10 mt-3
                transition-all duration-300
                ${isSelected 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-[-8px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                }
              `}>
                <ArrowRight className={`w-5 h-5 ${isSelected ? 'text-green-600' : 'text-gray-400'}`} />
              </div>
            </button>
          )
        })}
      </div>
      
      {selectedService && (
        <div className="mt-6 animate-fade-in">
          <Link href={getFormUrl()}>
            <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              Jetzt kostenlose Offerten anfordern
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default ServiceGrid

