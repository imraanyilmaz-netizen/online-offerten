'use client'

import { motion } from 'framer-motion'
import { FileText, GitCompareArrows, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface HowItWorksProps {
  title?: string
  steps?: Array<{
    number: number
    title: string
    description: string
    icon?: React.ReactNode
  }>
  ctaText?: string
  ctaLink?: string
  className?: string
}

export default function HowItWorks({
  title = "So einfach ist es",
  steps = [
    {
      number: 1,
      title: "Offerte anfordern",
      description: "Füllen Sie unser kurzes Formular aus und beschreiben Sie Ihre Anforderungen. Die Anfrage ist kostenlos und unverbindlich.",
      icon: <FileText className="h-8 w-8" />
    },
    {
      number: 2,
      title: "Offerten vergleichen",
      description: "Erhalten Sie mehrere Offerten von geprüften Partnern in Ihrer Region. Vergleichen Sie Preise, Leistungen und Bewertungen.",
      icon: <GitCompareArrows className="h-8 w-8" />
    },
    {
      number: 3,
      title: "Den besten Partner wählen",
      description: "Wählen Sie den Anbieter, der am besten zu Ihren Bedürfnissen passt. Sparen Sie bis zu 40% durch den Vergleich.",
      icon: <CheckCircle2 className="h-8 w-8" />
    }
  ],
  ctaText = "Jetzt kostenlose Offerten anfordern",
  ctaLink = "/kostenlose-offerte-anfordern",
  className = ""
}: HowItWorksProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`bg-gradient-to-br from-white via-green-50 to-emerald-50 rounded-2xl p-8 md:p-12 shadow-xl border border-green-200 ${className}`}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          In nur 3 einfachen Schritten finden Sie den perfekten Partner für Ihre Anforderungen
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative"
          >
            {/* Connection Line (only between steps) */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-green-300 z-0" style={{ width: 'calc(100% - 4rem)' }}>
                <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
              </div>
            )}

            <div className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center z-10">
              {/* Step Number Badge */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full font-bold text-2xl mb-4 shadow-lg">
                {step.number}
              </div>

              {/* Icon */}
              {step.icon && (
                <div className="flex justify-center mb-4 text-green-600">
                  {step.icon}
                </div>
              )}

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {ctaLink && (
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-6 text-lg rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <Link href={ctaLink}>
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5 inline" />
            </Link>
          </Button>
        </div>
      )}
    </motion.section>
  )
}












































