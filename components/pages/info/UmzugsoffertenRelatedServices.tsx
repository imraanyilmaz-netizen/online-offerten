'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Sparkles, Building, Globe, Package } from 'lucide-react'

const UmzugsoffertenRelatedServices: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto max-w-navbar px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Weitere Services für Ihren Umzug
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Neben Umzugsofferten bieten wir auch Offerten für weitere Services rund um Ihren Umzug an.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Umzugsreinigung", link: "/umzugsreinigung", icon: Sparkles },
            { name: "Geschäftsumzug", link: "/geschaeftsumzug", icon: Building },
            { name: "Internationale Umzüge", link: "/internationale-umzuege", icon: Globe },
            { name: "Spezialtransporte", link: "/spezialtransporte", icon: Package }
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={service.link}>
                <Card className="h-full hover:border-green-500 hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <service.icon className="h-10 w-10 text-green-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900">{service.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UmzugsoffertenRelatedServices

