'use client'

import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';
// framer-motion removed - CSS for better INP
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LocationCard = ({ location }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!location || !mounted) return null;

  return (
    <div className="h-full">
      <Link href={`/${location.slug}`} className="group block card-hover bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl h-full flex flex-col">
        <div className="relative">
          <img src={location.image} className="w-full h-40 object-cover" alt={`Umzugsfirma ${location.name}`} />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{location.name}</h3>
          <p className="text-gray-600 text-sm mb-4 flex-grow">{location.description}</p>
          <div className="flex items-center text-green-600 font-semibold mt-auto">
            <span>Mehr erfahren</span>
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </div>
  );
};


const LocationPageNavigation = ({ allLocations, currentCity }) => {
  const scrollContainerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const otherLocations = allLocations.filter(loc => loc.name !== currentCity);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth * 0.9;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="border-t border-slate-200 pt-10 mt-12 md:mt-16">
      <div className="flex justify-between items-center mb-8">
        <h2
          className="text-2xl md:text-3xl font-bold text-gray-800"
        >
          Weitere Standorte entdecken
        </h2>
        <div className="hidden md:flex items-center gap-2">
           <Button variant="outline" size="icon" onClick={() => scroll('left')} aria-label="Vorherige Standorte">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => scroll('right')} aria-label="Nächste Standorte">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="relative">
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        >
          {otherLocations.map((location) => (
             <div
              key={location.slug}
              className="snap-start flex-shrink-0 w-[85%] sm:w-72"
            >
              <LocationCard location={location} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationPageNavigation;