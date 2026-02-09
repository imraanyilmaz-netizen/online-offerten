import { useRouter } from 'next/navigation';
import React from 'react';
// framer-motion removed - CSS for better INP
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowLeftRight as ArrowsHorizontal, HelpCircle, Truck, Sparkles } from 'lucide-react';

const FaqItem = ({ faq, locationName }) => {
  const router = useRouter();

  const renderAnswer = (item, idx) => {
    let textContent = item['de'] || item;

    if (typeof textContent === 'string') {
      return <p key={idx} className="mb-4 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: textContent.replace('{city}', locationName) }} />;
    } else if (item.type === 'table') {
      const caption = (item.caption['de'] || item.caption).replace('{city}', locationName);
      return (
        <div key={idx} className="my-4 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {caption && <caption className="p-2 text-sm font-semibold text-left text-gray-700 bg-gray-100 rounded-t-lg">{caption}</caption>}
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 font-semibold text-sm text-gray-600 border-b-2 border-gray-200">Leistung</th>
                <th className="p-3 font-semibold text-sm text-gray-600 border-b-2 border-gray-200 text-right">Preisspanne</th>
              </tr>
            </thead>
            <tbody>
              {item.data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-200 text-sm text-gray-800">{row.size}</td>
                  <td className="p-3 border-b border-gray-200 text-sm text-gray-800 font-medium text-right">
                    {row.cost.includes('-') ? (
                      <div className="flex items-center justify-end">
                        <ArrowsHorizontal className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                        <span>{row.cost}</span>
                      </div>
                    ) : (
                      <span>{row.cost}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (item.type === 'calculator_link') {
        const text = item.text['de'] || item.text;
        const buttonText = item.buttonText['de'] || item.buttonText;
        // Remove /tools prefix if present, as routes don't use it
        const cleanLink = item.link.replace(/^\/tools/, '');
        return (
            <div key={idx} className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center">
                    <Calculator className="w-8 h-8 mr-4 text-green-600 flex-shrink-0" />
                    <p className="font-semibold text-gray-800 text-center sm:text-left">{text}</p>
                </div>
                <Button onClick={() => router.push(cleanLink)} size="sm" className="bg-green-600 hover:bg-green-700 text-white group w-full sm:w-auto flex-shrink-0">
                    {buttonText}
                </Button>
            </div>
        );
    }
    return null;
  };

  const questionText = (faq.question['de'] || faq.question).replace('{city}', locationName);

  return (
    <AccordionItem value={questionText}>
      <AccordionTrigger>{questionText}</AccordionTrigger>
      <AccordionContent>
        {faq.answer.map(renderAnswer)}
      </AccordionContent>
    </AccordionItem>
  );
};

const FaqCategory = ({ title, icon, faqs, locationName, delay }) => (
    <div
    >
        <div className="flex items-center mb-6">
            {icon}
            <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        </div>
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                <FaqItem key={index} faq={faq} locationName={locationName} />
            ))}
        </Accordion>
    </div>
);

const LocationFAQ = ({ faqs, city }) => {
  const locationName = city;

  if (!faqs || (!faqs.move && !faqs.clean)) {
    return null;
  }

  return (
    <div className="py-12 md:py-20">
      <div 
        className="text-center mb-12"
      >
        <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
          <HelpCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Häufig gestellte Fragen zu Umzug & Reinigung in {locationName}
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Finden Sie Antworten auf die wichtigsten Fragen rund um unsere Dienstleistungen in {locationName}.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
          {faqs.move && faqs.move.length > 0 && (
              <FaqCategory 
                title="Fragen zum Umzug"
                icon={<Truck className="w-8 h-8 mr-3 text-green-600" />}
                faqs={faqs.move}
                locationName={locationName}
                delay={0.2}
              />
          )}
          {faqs.clean && faqs.clean.length > 0 && (
              <FaqCategory
                title="Fragen zur Reinigung"
                icon={<Sparkles className="w-8 h-8 mr-3 text-green-500" />}
                faqs={faqs.clean}
                locationName={locationName}
                delay={0.4}
              />
          )}
      </div>
    </div>
  );
};

export default LocationFAQ;