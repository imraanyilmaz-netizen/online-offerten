'use client'

import { HelpCircle } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { ServiceFaqItem } from '@/lib/serviceFaqs'

type Props = {
  serviceLabel: string
  locationName?: string
  items: ServiceFaqItem[]
  /** Breite an das Hero der Seite anpassen.
   *  Service-Seiten: "max-w-7xl" (Default). Standort-Seiten: "max-w-navbar". */
  maxWidthClass?: string
}

/**
 * Service-level FAQ Sektion – Style-Referenz: CategoryCityFaqSection.
 * Inklusive FAQPage JSON-LD für SEO.
 */
export default function CategoryServiceFaqSection({
  serviceLabel,
  locationName,
  items,
  maxWidthClass = 'max-w-7xl',
}: Props) {
  if (!items || items.length === 0) return null

  const heading = locationName
    ? `FAQ zu ${serviceLabel} in ${locationName}`
    : `FAQ zu ${serviceLabel}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section
      className="border-t border-slate-200 bg-white py-12 dark:border-border dark:bg-background md:py-16"
      aria-labelledby="service-faq-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={`container mx-auto px-4 md:px-6 ${maxWidthClass}`}>
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:bg-emerald-950/45 dark:text-emerald-300">
              <HelpCircle className="h-3.5 w-3.5" aria-hidden />
              Häufige Fragen
            </div>
            <h2
              id="service-faq-heading"
              className="heading-2 text-slate-900 dark:text-foreground"
            >
              {heading}
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600 dark:text-muted-foreground">
              Antworten rund um Preise, Ablauf und worauf Sie bei Angeboten achten sollten –
              speziell zu {serviceLabel}
              {locationName ? ` in ${locationName}` : ''}.
            </p>
          </div>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-50/50 px-1 dark:divide-border dark:border-border dark:bg-muted/25"
        >
          {items.map((item, index) => (
            <AccordionItem
              value={`service-faq-${index}`}
              key={index}
              className="border-0 px-3 md:px-4"
            >
              <AccordionTrigger className="py-4 text-left text-base font-semibold text-slate-900 hover:no-underline dark:text-foreground md:text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pb-5 pt-0 text-slate-700 dark:text-muted-foreground">
                <p className="leading-relaxed">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
