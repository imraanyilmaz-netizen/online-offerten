'use client'

import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { generateHeadingSlug } from '@/lib/ratgeber/toc'

type FaqItem = { question?: string; answer?: string }

type Props = {
  faq: FaqItem[]
  faq_title?: string | null
  faq_description?: string | null
}

export default function PostFaqSection({ faq, faq_title, faq_description }: Props) {
  const valid = faq.filter((item) => item.question?.trim() && item.answer?.trim())
  if (valid.length === 0) return null

  const title =
    faq_title && faq_title.trim() ? faq_title.trim() : 'Häufige Fragen (FAQ)'
  const headingId = generateHeadingSlug(title)

  return (
    <div className="mt-16 pt-12 border-t border-gray-200 dark:border-border">
      <div className="text-left mb-12">
        <h2
          id={headingId}
          className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-foreground mb-2"
          style={{ scrollMarginTop: '120px' }}
        >
          {title}
        </h2>
        <p className="text-base text-gray-600 dark:text-muted-foreground">
          {faq_description && faq_description.trim()
            ? faq_description.trim()
            : 'Antworten auf die wichtigsten Fragen'}
        </p>
      </div>
      <div className="w-full">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {valid.map((item, index) => (
            <div key={index}>
              <AccordionItem
                value={`item-${index}`}
                className="border border-gray-200 dark:border-border rounded-lg bg-white dark:bg-card shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 px-6 hover:bg-gray-50 dark:hover:bg-muted transition-colors">
                  <h4 className="faq-question pr-8">{item.question!.trim()}</h4>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0">
                  <div className="pt-2 border-t border-gray-100 dark:border-border">
                    <p className="text-gray-700 dark:text-muted-foreground leading-relaxed text-base whitespace-pre-wrap">
                      {item.answer!.trim()}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
