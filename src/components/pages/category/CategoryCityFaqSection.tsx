'use client'

import Link from 'next/link'
import { HelpCircle } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import type { CityFaqItem } from '@/lib/cityPageFaqs'

export default function CategoryCityFaqSection({
  locationName,
  items,
}: {
  locationName: string
  items: CityFaqItem[]
}) {
  if (items.length === 0) return null

  return (
    <section
      className="border-t border-slate-200 bg-white py-12 dark:border-border dark:bg-background md:py-16"
      aria-labelledby="city-faq-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800 dark:bg-emerald-950/45 dark:text-emerald-300">
              <HelpCircle className="h-3.5 w-3.5" aria-hidden />
              Häufige Fragen
            </div>
            <h2 id="city-faq-heading" className="heading-2 text-slate-900 dark:text-foreground">
              FAQ zu {locationName}
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600 dark:text-muted-foreground">
              Antworten rund um Preise, Ablauf und worauf Sie bei Angeboten achten sollten – speziell
              für Ihren Standort.
            </p>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-50/50 px-1 dark:divide-border dark:border-border dark:bg-muted/25">
          {items.map((item, index) => (
            <AccordionItem value={`faq-${index}`} key={index} className="border-0 px-3 md:px-4">
              <AccordionTrigger className="py-4 text-left text-base font-semibold text-slate-900 hover:no-underline dark:text-foreground md:text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pb-5 pt-0 text-slate-700 dark:text-muted-foreground">
                {item.blocks.map((block, i) => {
                  if (block.type === 'paragraph') {
                    return (
                      <p key={i} className="leading-relaxed">
                        {block.text}
                      </p>
                    )
                  }
                  if (block.type === 'table') {
                    return (
                      <div key={i} className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-border dark:bg-card">
                        <p className="border-b border-slate-100 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 dark:border-border dark:bg-muted/50 dark:text-foreground">
                          {block.caption}
                        </p>
                        <table className="w-full text-sm">
                          <tbody>
                            {block.rows.map((row, ri) => (
                              <tr key={ri} className="border-t border-slate-100 dark:border-border">
                                <td className="px-4 py-2.5 text-slate-800 dark:text-foreground">{row.size}</td>
                                <td className="px-4 py-2.5 text-right font-medium text-slate-900 dark:text-foreground">
                                  {row.cost}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )
                  }
                  if (block.type === 'cta') {
                    return (
                      <div
                        key={i}
                        className="flex flex-col gap-3 rounded-lg border border-emerald-100 bg-emerald-50/50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <p className="text-sm leading-relaxed text-slate-700 dark:text-muted-foreground">{block.text}</p>
                        <Button asChild className="shrink-0 bg-green-600 hover:bg-green-700">
                          <Link href={block.href}>{block.buttonText}</Link>
                        </Button>
                      </div>
                    )
                  }
                  return null
                })}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
