'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Sparkles, Building, Globe, Package } from 'lucide-react'

const UmzugsoffertenRelatedServices: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { name: "Umzugsreinigung", link: "/reinigung/umzugsreinigung", icon: Sparkles },
            { name: "Geschäftsumzug", link: "/umzugsfirma/geschaeftsumzug", icon: Building },
            { name: "Internationale Umzüge", link: "/umzugsfirma/internationale-umzuege", icon: Globe },
            { name: "Spezialtransporte", link: "/umzugsfirma/spezialtransporte", icon: Package }
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

        {/* Additional Internal Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Weitere Informationen
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Umzugsservices</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/umzugsfirma/privatumzug" className="text-green-600 hover:text-green-700 font-medium underline">
                    Privatumzug Offerten vergleichen
                  </Link>
                </li>
                <li>
                  <Link href="/umzugsfirma" className="text-green-600 hover:text-green-700 font-medium underline">
                    Umzugsfirmen finden
                  </Link>
                </li>
                <li>
                  <Link href="/umzugsfirma-in-der-naehe/zuerich" className="text-green-600 hover:text-green-700 font-medium underline">
                    Umzugsfirma Zürich
                  </Link>
                </li>
                <li>
                  <Link href="/umzugsfirma-in-der-naehe/basel" className="text-green-600 hover:text-green-700 font-medium underline">
                    Umzugsfirma Basel
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Tools & Ratgeber</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/umzugsfirma/umzugskosten" className="text-green-600 hover:text-green-700 font-medium underline">
                    Umzugskosten berechnen
                  </Link>
                </li>
                <li>
                  <Link href="/ratgeber" className="text-green-600 hover:text-green-700 font-medium underline">
                    Ratgeber & Tipps
                  </Link>
                </li>
                <li>
                  <Link href="/umzugsfirma/checklists" className="text-green-600 hover:text-green-700 font-medium underline">
                    Umzugs-Checklisten
                  </Link>
                </li>
                <li>
                  <Link href="/reinigung" className="text-green-600 hover:text-green-700 font-medium underline">
                    Reinigungsfirmen vergleichen
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default UmzugsoffertenRelatedServices

