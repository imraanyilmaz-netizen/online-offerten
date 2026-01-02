'use client'

import React from 'react'
import LocationFAQ from '@/components/locations/LocationFAQ'
import LocationPageNavigation from '@/components/locations/LocationPageNavigation'
import { faqs } from '@/data/locationFaqs'
import { locations } from '@/data/locations'

interface LocationFAQAndNavigationClientProps {
  city: string
}

const LocationFAQAndNavigationClient = ({ city }: LocationFAQAndNavigationClientProps) => {
  return (
    <>
      <LocationFAQ city={city} faqs={faqs} />
      <LocationPageNavigation allLocations={locations} currentCity={city} />
    </>
  )
}

export default LocationFAQAndNavigationClient

