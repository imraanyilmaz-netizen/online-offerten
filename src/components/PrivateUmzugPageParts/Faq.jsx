import Link from 'next/link';
import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { HelpCircle, Info, Calculator, ArrowRight } from 'lucide-react';

const FaqItem = ({ qKey, value, children }) => {
  const { t } = useTranslation('privateUmzugPage');
  return (
    <AccordionItem value={value} className="border-b border-gray-200 last:border-b-0">
      <AccordionTrigger className="text-left hover:no-underline py-5 px-2 text-base font-semibold text-gray-700 hover:text-green-600 transition-colors">
        <div className="flex items-center">
          <HelpCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
          {t(qKey)}
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-0 pb-5 px-2 text-gray-600 leading-relaxed">
        <div className="flex items-start">
          <Info className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
          <div>
            {children}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

const CostTable = ({ dataKey, captionKey }) => {
  const { t } = useTranslation('privateUmzugPage');
  const costs = t(dataKey, { returnObjects: true });

  return (
    <div className="my-4">
      <table className="w-full text-sm text-left text-gray-500">
        <caption className="p-2 text-md font-semibold text-left text-gray-900 bg-gray-100 rounded-t-lg">
          {t(captionKey)}
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-2">{t('faq.tableHeaderSize')}</th>
            <th scope="col" className="px-4 py-2">{t('faq.tableHeaderCost')}</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(costs) && costs.map((item, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-50">
              <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{item.size}</td>
              <td className="px-4 py-2">{item.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-xs text-gray-500 italic">{t('faq.costHint')}</p>
    </div>
  );
};

const BulletList = ({ itemsKey, titleKey }) => {
  const { t } = useTranslation('privateUmzugPage');
  const items = t(itemsKey, { returnObjects: true });
  return (
    <div className="my-2">
      {titleKey && <h4 className="font-semibold text-gray-700 mb-1">{t(titleKey)}</h4>}
      <ul className="list-disc list-inside space-y-1">
        {Array.isArray(items) && items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const Faq = () => {
  const { t } = useTranslation('privateUmzugPage');

  const faqItems = [
    { 
      qKey: "faq.q1", 
      value: "item-1",
      content: (
        <>
          <p>
            <Trans 
              i18nKey="faq.a1_intro_linked" 
              ns="privateUmzugPage"
              components={{
                0: <Link href="/umzugsfirma/umzugskosten" className="text-green-600 hover:underline font-semibold" />
              }}
            />
          </p>
          <CostTable dataKey="faq.a1_costs" captionKey="faq.a1_costTableCaption" />
           <p className="mt-3 text-sm text-gray-600">{t('faq.a1_tip')}</p>
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
            <div className="flex items-start md:items-center">
              <Calculator className="w-8 h-8 md:w-6 md:h-6 mr-3 text-green-600 flex-shrink-0 mt-1 md:mt-0" />
              <p className="text-sm text-green-700 flex-grow">{t('faq.a1_calculator_cta_text')}</p>
            </div>
            <Button asChild size="sm" className="mt-3 w-full md:w-auto bg-green-600 hover:bg-green-700 text-white group">
              <Link href="/umzugsfirma/umzugskosten">
                {t('faq.a1_calculator_cta_button')}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </>
      )
    },
    { 
      qKey: "faq.q2", 
      value: "item-2",
      content: (
        <>
          <p>{t('faq.a2_intro')}</p>
          <BulletList itemsKey="faq.a2_points" />
        </>
      )
    },
    { 
      qKey: "faq.q3", 
      value: "item-3",
      content: (
        <>
          <p>
            <Trans 
              i18nKey="faq.a3_intro_linked" 
              ns="privateUmzugPage"
              components={{
                0: <Link href="/umzugsfirma/checklists" className="text-green-600 hover:underline font-semibold" />
              }}
            />
          </p>
          <BulletList itemsKey="faq.a3_points" />
        </>
      )
    },
    { 
      qKey: "faq.q4", 
      value: "item-4",
      content: (
        <>
          <p>{t('faq.a4_intro')}</p>
          <BulletList itemsKey="faq.a4_checklist" />
        </>
      )
    },
    { 
      qKey: "faq.q5", 
      value: "item-5",
      content: (
        <>
          <p className="mb-2">
             <Trans 
              i18nKey="faq.a5_recommendation_linked" 
              ns="privateUmzugPage"
              components={{
                0: <Link href="/umzugsfirma/checklists" className="text-green-600 hover:underline font-semibold" />
              }}
            />
          </p>
          <BulletList itemsKey="faq.a5_timeline_2months" titleKey="faq.a5_timeline_2months_title" />
          <BulletList itemsKey="faq.a5_timeline_1month" titleKey="faq.a5_timeline_1month_title" />
          <BulletList itemsKey="faq.a5_timeline_1week" titleKey="faq.a5_timeline_1week_title" />
          <BulletList itemsKey="faq.a5_timeline_movingday" titleKey="faq.a5_timeline_movingday_title" />
          <BulletList itemsKey="faq.a5_timeline_aftermove" titleKey="faq.a5_timeline_aftermove_title" />
        </>
      )
    },
     { 
      qKey: "faq.q6", 
      value: "item-6",
      content: (
        <>
          <p>{t('faq.a6_intro')}</p>
          <BulletList itemsKey="faq.a6_points" />
        </>
      )
    },
  ];

  return (
    <section className="pt-6 border-t border-gray-200">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <HelpCircle size={28} className="mr-3 text-purple-500" />
        {t('faq.mainTitle')}
      </h3>
      <Accordion type="single" collapsible className="w-full bg-slate-50 rounded-lg shadow">
        {faqItems.map((item, index) => (
           <motion.div
              key={item.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
            <FaqItem qKey={item.qKey} value={item.value}>
              {item.content}
            </FaqItem>
          </motion.div>
        ))}
      </Accordion>
    </section>
  );
};

export default Faq;