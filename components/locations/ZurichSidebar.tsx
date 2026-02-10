'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Home, Building, Globe, Package, Truck, ArrowUpDown, CheckCircle2 } from 'lucide-react'
import { PiPianoKeysFill } from 'react-icons/pi'
import { Button } from '@/components/ui/button'

const ZurichSidebar = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const services = [
    { 
      id: 'privatumzug',
      name: 'Privatumzug',
      description: 'Wohnung, Haus, WG',
      icon: Home,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      iconBgHover: 'bg-blue-500',
      url: '/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug&city=Zürich'
    },
    { 
      id: 'geschaeftsumzug',
      name: 'Geschäftsumzug',
      description: 'Büro, Ladenlokal',
      icon: Building,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      iconBgHover: 'bg-purple-500',
      url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=geschaeftsumzug&city=Zürich'
    },
    { 
      id: 'international',
      name: 'Internationaler Umzug',
      description: 'Umzüge ins Ausland',
      icon: Globe,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
      iconBgHover: 'bg-emerald-500',
      url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=international&city=Zürich'
    },
    { 
      id: 'spezialtransport',
      name: 'Spezialtransport',
      description: 'Klavier, Tresor, Kunst',
      icon: PiPianoKeysFill,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-100',
      iconBgHover: 'bg-amber-500',
      url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=spezialtransport&special_transport_type=klaviertransport&city=Zürich'
    },
    { 
      id: 'kleintransport',
      name: 'Kleintransport',
      description: 'Einzelne Möbel',
      icon: Truck,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-100',
      iconBgHover: 'bg-indigo-500',
      url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=kleintransport&city=Zürich'
    },
    { 
      id: 'moebellift',
      name: 'Möbellift mieten',
      description: 'Bis 400 kg, max. 27m',
      icon: ArrowUpDown,
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-100',
      iconBgHover: 'bg-rose-500',
      url: '/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=moebellift&city=Zürich'
    }
  ]

  const selectedServiceData = services.find(s => s.id === selectedService)

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
        <h3 className="text-xl font-bold text-white">
          Umzugsfirma Zürich
        </h3>
        <p className="text-sm text-green-50 mt-1">
          Wählen Sie Ihre Dienstleistung
        </p>
      </div>
      
      {/* Services List */}
      <div className="p-4 space-y-3">
        {services.map((service) => {
          const Icon = service.icon
          const isSelected = selectedService === service.id
          
          return (
            <button
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`
                w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all
                ${isSelected 
                  ? 'border-green-500 bg-green-50 shadow-md' 
                  : 'border-gray-100 hover:border-green-400 hover:bg-green-50'
                }
              `}
            >
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                ${isSelected 
                  ? `${service.iconBgHover}` 
                  : `${service.iconBg}`
                }
              `}>
                <Icon className={`
                  w-5 h-5 transition-colors
                  ${isSelected ? 'text-white' : service.iconColor}
                `} />
              </div>
              <div className="flex-1 text-left">
                <p className={`
                  font-semibold transition-colors
                  ${isSelected ? 'text-green-600' : 'text-gray-900'}
                `}>
                  {service.name}
                </p>
                <p className="text-xs text-gray-600">{service.description}</p>
              </div>
              {isSelected && (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              )}
              {!isSelected && (
                <ArrowRight className="w-4 h-4 text-gray-400" />
              )}
            </button>
          )
        })}
      </div>
      
      {/* CTA Button - Sadece seÃ§ili servis varsa göster */}
      {selectedService && selectedServiceData && (
        <div className="px-4 pb-4 transition-all duration-300">
          <Button 
            asChild
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Link href={selectedServiceData.url}>
              Jetzt kostenlose Offerten anfordern
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default ZurichSidebar



