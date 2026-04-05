import Link from 'next/link';
import React from 'react';
import { useStaticT } from '@/lib/staticTranslate';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const Faq = () => {
  const { t } = useStaticT('reinigungPage');
  const a2CostsRaw = t('faq.a2_costs', { returnObjects: true });
  const a2CostItems = Array.isArray(a2CostsRaw) ? a2CostsRaw : [];

  const faqItems = [
    { qKey: "faq.q1", aKey: "faq.a1", value: "item-1" },
    {
      qKey: "faq.q2",
      value: "item-2",
      content: (
        <div>
          <p>{t('faq.a2_intro')}</p>
          <ul className="list-disc list-inside my-2 space-y-1">
            {a2CostItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p>
            Detaillierte Preisinfos finden Sie im{' '}
            <Link href="/reinigung/reinigungskosten" className="text-blue-600 hover:underline font-semibold">
              Ratgeber Reinigungskosten
            </Link>
            . Für ein konkretes Angebot nutzen Sie unsere{' '}
            <a href="#cta" className="text-blue-600 hover:underline font-semibold">
              kostenlose Offertenanfrage
            </a>
            .
          </p>
        </div>
      )
    },
    { qKey: "faq.q3", aKey: "faq.a3", value: "item-3" },
    { qKey: "faq.q4", aKey: "faq.a4", value: "item-4" },
  ];

  return (
    <section
      className="bg-slate-100 p-8 md:p-12 rounded-2xl"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-10 flex items-center justify-center">
        <HelpCircle className="w-8 h-8 mr-4 text-blue-500" />
        {t('faq.mainTitle')}
      </h2>
      <Accordion type="single" collapsible className="w-full max-w-navbar mx-auto">
        {faqItems.map((item) => (
          <div
            key={item.value}
          >
            <AccordionItem value={item.value}>
              <AccordionTrigger>{t(item.qKey)}</AccordionTrigger>
              <AccordionContent>
                {item.content ? item.content : <p>{t(item.aKey)}</p>}
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </section>
  );
};

export default Faq;
