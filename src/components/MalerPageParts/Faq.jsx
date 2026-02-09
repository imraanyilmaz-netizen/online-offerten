import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, ChevronRight } from 'lucide-react';

const faqItems = [
  {
    question: "Wie erhalte ich Maler Offerten?",
    answer: "Füllen Sie einfach unser Online-Formular aus. Ihre Anfrage wird anonym an geprüfte Malerfirmen in Ihrer Nähe weitergeleitet. Sie erhalten unverbindliche Offerten direkt von den Anbietern.",
    value: "item-1"
  },
  {
    question: "Was kostet eine Maler offerten?",
    answer: "Unser Service ist für Sie zu 100% kostenlos und unverbindlich. Sie zahlen nichts für die Vermittlung oder den Erhalt der Offerten.",
    value: "item-2"
  },
  {
    question: "Wie viele Offerten erhalte ich?",
    answer: "Sie erhalten je nach Verfügbarkeit und Region verschiedene Offerten von qualifizierten Malerbetrieben.",
    value: "item-3"
  },
  {
    question: "Was ist der Vorteil, Offerten zu vergleichen?",
    answer: "Durch den direkten Vergleich von Preisen und Leistungen können Sie erhebliche Kosten sparen – oft bis zu 40%. Zudem finden Sie schnell und einfach einen qualifizierten und verfügbaren Maler für Ihr Projekt.",
    value: "item-4"
  },
  {
    question: "Sind die Malerfirmen geprüft?",
    answer: "Ja, wir arbeiten nur mit qualifizierten und erfahrenen Malerfirmen zusammen, die über die notwendigen Versicherungen und Qualifikationen verfügen. Viele unserer Partner sind seit Jahren im Geschäft und haben positive Kundenbewertungen.",
    value: "item-5"
  },
];

const Faq = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="mt-16"
    >
      <div className="container mx-auto max-w-navbar px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">Häufige Fragen (FAQ)</h2>
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.value}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <AccordionItem value={item.value} className="border-b bg-white rounded-lg mb-3 shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="text-left hover:no-underline py-5 px-6 text-base md:text-lg font-semibold text-gray-700 hover:text-green-600 transition-colors">
                  <div className="flex items-center">
                    <HelpCircle className="w-6 h-6 mr-4 text-green-500 flex-shrink-0" />
                    {item.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-0 pb-5 px-6 text-gray-600 leading-relaxed text-base">
                  <div className="flex items-start pl-10">
                    <ChevronRight className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                    <div>{item.answer}</div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
};

export default Faq;