'use client'

// framer-motion removed - CSS for better INP
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
    <section
      className={`bg-white rounded-2xl p-6 md:p-12 shadow-lg border border-gray-200 ${className}`}
    >
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          In nur 3 einfachen Schritten finden Sie den perfekten Partner für Ihre Anforderungen
        </p>
      </div>

      {/* Mobile: horizontal scroll with peek, Desktop: grid */}
      <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 mb-8 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="relative w-[75vw] min-w-[240px] max-w-[300px] md:w-auto md:min-w-0 md:max-w-none snap-start flex-shrink-0 md:flex-shrink"
          >
            {/* Connection Line (only between steps, desktop only) */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-green-300 z-0" style={{ width: 'calc(100% - 4rem)' }}>
                <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
              </div>
            )}

            <div className="relative bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center z-10 h-full border border-gray-100">
              {/* Step Number Badge */}
              <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full font-bold text-xl md:text-2xl mb-4 shadow-md">
                {step.number}
              </div>

              {/* Icon */}
              {step.icon && (
                <div className="flex justify-center mb-3 text-green-600">
                  {step.icon}
                </div>
              )}

              {/* Content */}
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile scroll indicator */}
      <div className="flex md:hidden justify-center gap-1.5 mb-6">
        {steps.map((step) => (
          <div key={step.number} className="w-2 h-2 rounded-full bg-green-300"></div>
        ))}
      </div>

      {ctaLink && (
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 md:px-8 py-5 md:py-6 text-base md:text-lg rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <Link href={ctaLink}>
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5 inline" />
            </Link>
          </Button>
        </div>
      )}
    </section>
  )
}



