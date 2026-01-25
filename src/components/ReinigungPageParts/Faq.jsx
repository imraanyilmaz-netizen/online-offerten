import Link from 'next/link';
import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const Faq = () => {
  const { t } = useTranslation('reinigungPage');

  const faqItems = [
    { qKey: "faq.q1", aKey: "faq.a1", value: "item-1" },
    { 
      qKey: "faq.q2", 
      value: "item-2",
      content: (
        <div>
          <p>{t('faq.a2_intro')}</p>
          <ul className="list-disc list-inside my-2 space-y-1">
            {t('faq.a2_costs', { returnObjects: true }).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p>
            <Trans 
              i18nKey="faq.a2_tip_full"
              ns="reinigungPage"
              components={{
                1: <Link href="/reinigung/reinigungskosten" className="text-blue-600 hover:underline font-semibold" />,
                2: <a href="#cta" className="text-blue-600 hover:underline font-semibold" />
              }}
            />
          </p>
        </div>
      )
    },
    { qKey: "faq.q3", aKey: "faq.a3", value: "item-3" },
    { qKey: "faq.q4", aKey: "faq.a4", value: "item-4" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="bg-slate-100 p-8 md:p-12 rounded-2xl"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-10 flex items-center justify-center">
        <HelpCircle className="w-8 h-8 mr-4 text-blue-500" />
        {t('faq.mainTitle')}
      </h2>
      <Accordion type="single" collapsible className="w-full max-w-navbar mx-auto">
        {faqItems.map((item, index) => (
          <motion.div
            key={item.value}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <AccordionItem value={item.value}>
              <AccordionTrigger>{t(item.qKey)}</AccordionTrigger>
              <AccordionContent>
                {item.content ? item.content : <p>{t(item.aKey)}</p>}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.section>
  );
};

export default Faq;