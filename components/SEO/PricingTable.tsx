'use client'

import { motion } from 'framer-motion'
import { Calculator, TrendingDown, CheckCircle2 } from 'lucide-react'

interface PricingRow {
  size: string
  cost: string
  description?: string
}

interface PricingTableProps {
  title?: string
  subtitle?: string
  rows: PricingRow[]
  serviceType: 'umzug' | 'reinigung' | 'malerarbeiten' | 'raeumung'
  city?: string
  canton?: string
  className?: string
}

export default function PricingTable({
  title = 'Preise & Kosten',
  subtitle = 'Durchschnittliche Preise in der Schweiz',
  rows,
  serviceType,
  city,
  canton,
  className = ''
}: PricingTableProps) {
  const getServiceName = () => {
    switch (serviceType) {
      case 'umzug':
        return 'Umzug'
      case 'reinigung':
        return 'Reinigung'
      case 'malerarbeiten':
        return 'Malerarbeiten'
      case 'raeumung':
        return 'Räumung'
      default:
        return 'Service'
    }
  }

  const locationText = city ? ` in ${city}` : canton ? ` im Kanton ${canton}` : ''

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`bg-gradient-to-br from-white to-green-50 rounded-2xl p-6 md:p-8 shadow-xl border border-green-200 ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 rounded-full p-3">
          <Calculator className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}{locationText}</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <th className="px-4 py-4 text-left font-semibold text-sm md:text-base">
                  {serviceType === 'umzug' ? 'Wohnungsgrösse' : serviceType === 'reinigung' ? 'Reinigungsart' : 'Arbeitsumfang'}
                </th>
                <th className="px-4 py-4 text-left font-semibold text-sm md:text-base">
                  Durchschnittliche Kosten
                </th>
                {rows.some(row => row.description) && (
                  <th className="px-4 py-4 text-left font-semibold text-sm md:text-base hidden md:table-cell">
                    Details
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 hover:bg-green-50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-4 py-4 font-semibold text-gray-900 text-sm md:text-base">
                    {row.size}
                  </td>
                  <td className="px-4 py-4 text-green-700 font-bold text-sm md:text-base">
                    {row.cost}
                  </td>
                  {rows.some(r => r.description) && (
                    <td className="px-4 py-4 text-gray-600 text-sm hidden md:table-cell">
                      {row.description || '-'}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <TrendingDown className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">
              Bis zu 40% sparen durch Vergleich
            </p>
            <p className="text-xs text-gray-600">
              Diese Preise sind Durchschnittswerte. Durch den Vergleich mehrerer Anbieter können Sie erheblich sparen. 
              Die tatsächlichen Kosten hängen von verschiedenen Faktoren ab (Entfernung, Umfang, Zusatzleistungen).
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <span>Unverbindliche Offerten</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <span>Kostenlos vergleichen</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <span>Geprüfte Partner</span>
        </div>
      </div>
    </motion.section>
  )
}












































