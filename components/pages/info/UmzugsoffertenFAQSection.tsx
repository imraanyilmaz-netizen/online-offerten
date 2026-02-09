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
    <div style={{ paddingTop: '50px', paddingBottom: '50px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left mb-12"
        >
          <h2 
          className="heading-2 mb-4"
            style={{
              fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
              fontWeight: 700,
              color: '#1c1d16',
              textAlign: 'left',
              letterSpacing: 'normal',
              wordSpacing: '0px',
              fontStyle: 'normal',
              textTransform: 'none',
              textDecoration: 'none',
              textIndent: '0px'
            }}
          >
            Häufige Fragen zu Umzugsofferten
          </h2>
          <p 
            className="text-base leading-6 max-w-3xl mx-auto hidden"
            style={{
              fontFamily: 'Roboto, "Roboto Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: 400,
              color: '#1c1d16',
              textAlign: 'left',
              letterSpacing: 'normal',
              wordSpacing: '0px',
              fontStyle: 'normal',
              textTransform: 'none',
              textDecoration: 'none',
              textIndent: '0px',
              visibility: 'hidden'
            }}
          >
            Alles, was Sie über <strong>Umzugsangebote</strong> wissen müssen – beantwortet von unseren Experten.
          </p>
        </motion.div>

        <div className="w-full">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.slice(0, 7).map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b">
                <AccordionTrigger 
                  className="text-[18px] md:text-[20px] leading-[23.94px] md:leading-[26.6px] text-left py-4 transition-all hover:no-underline"
                  style={{
                    fontFamily: '"Booster Next FY", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                    fontWeight: 700,
                    color: '#1c1d16',
                    textAlign: 'start',
                    letterSpacing: 'normal',
                    wordSpacing: '0px',
                    fontStyle: 'normal',
                    textTransform: 'none',
                    textDecoration: 'none',
                    textIndent: '0px',
                    fontVariant: 'no-common-ligatures'
                  }}
                >
                  <h4 className="faq-question">{item.q}</h4>
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
  )
}

export default UmzugsoffertenFAQSection

