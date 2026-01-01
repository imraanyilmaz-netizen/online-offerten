'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface FAQItem {
  q: string
  a: string
}

interface UmzugsoffertenFAQSectionProps {
  faqItems: FAQItem[]
}

const UmzugsoffertenFAQSection: React.FC<UmzugsoffertenFAQSectionProps> = ({ faqItems }) => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-navbar px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Häufige Fragen zu Umzugsofferten
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Alles, was Sie über <strong>Umzugsangebote</strong> wissen müssen – beantwortet von unseren Experten.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.slice(0, 7).map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-green-600">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  <div 
                    className="prose prose-sm max-w-none prose-strong:text-gray-900 prose-strong:font-semibold"
                    dangerouslySetInnerHTML={{ __html: item.a }} 
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default UmzugsoffertenFAQSection

