'use client'

import { useEffect } from 'react'

interface BreadcrumbItem {
  name: string
  item: string
}

interface StructuredDataProps {
  breadcrumbs?: BreadcrumbItem[]
  service?: {
    name: string
    serviceType: string
    description: string
    url?: string
  }
  localBusiness?: {
    name: string
    description: string
    city?: string
    address?: {
      addressLocality: string
      addressRegion: string
      addressCountry: string
    }
    geo?: {
      latitude: string
      longitude: string
    }
  }
  organization?: {
    name: string
    url: string
    logo?: string
    contactPoint?: {
      email: string
      areaServed: string
    }
  }
}

export default function StructuredData({
  breadcrumbs,
  service,
  localBusiness,
  organization,
}: StructuredDataProps) {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    const schemaData: any = {
      '@context': 'https://schema.org',
      '@graph': [],
    }

    // BreadcrumbList
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemaData['@graph'].push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.item,
        })),
      })
    }

    // Service
    if (service) {
      const serviceSchema: any = {
        '@type': 'Service',
        name: service.name,
        serviceType: service.serviceType,
        description: service.description,
        provider: {
          '@type': 'Organization',
          name: 'Online-Offerten.ch',
          url: 'https://online-offerten.ch',
          logo: 'https://online-offerten.ch/image/logo.png',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Switzerland',
          identifier: 'CH',
        },
        offers: {
          '@type': 'Offer',
          url: service.url || 'https://online-offerten.ch/kostenlose-offerte-anfordern',
          priceCurrency: 'CHF',
          price: '0',
          availability: 'https://schema.org/InStock',
        },
      }

      schemaData['@graph'].push(serviceSchema)
    }

    // LocalBusiness
    if (localBusiness) {
      const localBusinessSchema: any = {
        '@type': 'LocalBusiness',
        name: localBusiness.name,
        description: localBusiness.description,
        url: 'https://online-offerten.ch',
        address: localBusiness.address
          ? {
              '@type': 'PostalAddress',
              addressLocality: localBusiness.address.addressLocality,
              addressRegion: localBusiness.address.addressRegion,
              addressCountry: localBusiness.address.addressCountry,
            }
          : {
              '@type': 'PostalAddress',
              addressCountry: 'CH',
            },
        areaServed: localBusiness.city
          ? {
              '@type': 'City',
              name: localBusiness.city,
            }
          : {
              '@type': 'Country',
              name: 'Switzerland',
            },
      }

      if (localBusiness.geo) {
        localBusinessSchema.geo = {
          '@type': 'GeoCoordinates',
          latitude: localBusiness.geo.latitude,
          longitude: localBusiness.geo.longitude,
        }
      }

      schemaData['@graph'].push(localBusinessSchema)
    }

    // Organization
    if (organization) {
      const orgSchema: any = {
        '@type': 'Organization',
        name: organization.name,
        url: organization.url,
        logo: organization.logo || 'https://online-offerten.ch/image/logo.png',
      }

      if (organization.contactPoint) {
        orgSchema.contactPoint = {
          '@type': 'ContactPoint',
          email: organization.contactPoint.email,
          areaServed: organization.contactPoint.areaServed,
          availableLanguage: ['de'],
        }
      }

      schemaData['@graph'].push(orgSchema)
    }

    // If only one item in graph, simplify structure
    const finalSchema =
      schemaData['@graph'].length === 1 ? schemaData['@graph'][0] : schemaData

    // Remove @graph if empty or single item
    if (schemaData['@graph'].length === 0) {
      return
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(finalSchema)
    script.id = 'structured-data-schema'

    // Remove existing schema if any
    const existing = document.getElementById('structured-data-schema')
    if (existing) existing.remove()

    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById('structured-data-schema')
      if (scriptToRemove) scriptToRemove.remove()
    }
  }, [breadcrumbs, service, localBusiness, organization])

  return null
}



