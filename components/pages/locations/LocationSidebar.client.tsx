'use client'

import React from 'react'
import LocationSidebar from '@/components/locations/LocationSidebar'

interface LocationSidebarClientProps {
  city: string
  districts?: {
    title: string
    text: string
    list: string[]
  }
  searches?: {
    title: string
    list: string[]
  }
}

const LocationSidebarClient = ({ city, districts, searches }: LocationSidebarClientProps) => {
  // Zürich-specific districts data
  const zurichDistricts = city === 'Zürich' ? {
    title: "Stadtkreise von Zürich",
    text: "Unsere Partner sind in allen Zürcher Stadtkreisen für Sie im Einsatz:",
    list: ["Kreis 1 (Altstadt)", "Kreis 2 (Enge, Wollishofen)", "Kreis 3 (Wiedikon)", "Kreis 4 (Aussersihl)", "Kreis 5 (Industriequartier)", "Kreis 6 (Unterstrass, Oberstrass)", "Kreis 7 (Fluntern, Hottingen)", "Kreis 8 (Seefeld)", "Kreis 9 (Altstetten, Albisrieden)", "Kreis 10 (Wipkingen, Höngg)", "Kreis 11 (Oerlikon, Seebach)", "Kreis 12 (Schwamendingen)"]
  } : districts

  return (
    <LocationSidebar 
      city={city} 
      districts={zurichDistricts}
      searches={searches}
    />
  )
}

export default LocationSidebarClient

