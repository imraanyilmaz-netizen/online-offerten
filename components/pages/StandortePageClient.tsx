'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { locations } from '@/data/locations'
import { ArrowRight, Map } from 'lucide-react'

const LocationCard = ({ location, delay }: { location: any; delay: number }) => {
  if (!location?.slug) return null

  const locationHref = `/${location.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.05 }}
      className="h-full"
    >
      <Link href={locationHref} className="group block bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col">
        <div className="relative">
          <img src={location.image} className="w-full h-48 object-cover" alt={`Bild von ${location.name}`} />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{location.name}</h3>
          <p className="text-gray-600 text-sm mb-4 flex-grow">Professionelle Umzugs-, Reinigungs- und Malerfirmen in Ihrer Nähe.</p>
          <div className="flex items-center text-green-600 font-semibold mt-auto">
            <span>Mehr erfahren</span>
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

const StandortePageClient = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto max-w-navbar px-4 md:px-6 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Map className="w-12 h-12 text-green-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              Standorte
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Finden Sie Umzugsfirmen und Reinigungsfirmen in allen Schweizer Städten. Von Zürich bis Genf, von Basel bis Bern - wir haben Partner in Ihrer Nähe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {locations.map((location, index) => (
            <LocationCard key={location.slug} location={location} delay={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default StandortePageClient

