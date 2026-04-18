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
    <div className="mt-16 border-t border-slate-100 pt-12 dark:border-border">
      <div className="mb-10 text-left">
        <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
          FAQ
        </p>
        <h2
          id={headingId}
          className="mb-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-foreground md:text-3xl"
          style={{ scrollMarginTop: '120px' }}
        >
          {title}
        </h2>
        <p className="text-base leading-relaxed text-slate-600 dark:text-muted-foreground">
          {faq_description && faq_description.trim()
            ? faq_description.trim()
            : 'Antworten auf die wichtigsten Fragen'}
        </p>
      </div>
      <div className="w-full">
        <Accordion type="single" collapsible className="w-full space-y-3">
          {valid.map((item, index) => (
            <div key={index}>
              <AccordionItem
                value={`item-${index}`}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm ring-1 ring-slate-900/[0.03] transition-shadow hover:shadow-md dark:border-border dark:bg-card/90 dark:ring-white/[0.05]"
              >
                <AccordionTrigger className="px-5 py-4 text-left hover:no-underline hover:bg-slate-50/90 dark:hover:bg-muted/40 md:px-6 md:py-5">
                  <h4 className="faq-question pr-8 font-medium text-slate-900 dark:text-foreground">{item.question!.trim()}</h4>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 pt-0 md:px-6 md:pb-6">
                  <div className="border-t border-slate-100 pt-4 dark:border-border">
                    <p className="text-base leading-relaxed text-slate-600 whitespace-pre-wrap dark:text-muted-foreground">
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
