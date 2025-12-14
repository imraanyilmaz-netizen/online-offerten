import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FactorsList = () => {
  const factors = [
    {
      title: "Umfang des Umzugsguts (Volumen)",
      description: "Je mehr Möbel und Kisten, desto mehr Zeit und Personal wird benötigt. Das Volumen, oft in Kubikmetern (m³) angegeben, ist ein zentraler Kostenfaktor."
    },
    {
      title: "Distanz zwischen den Wohnorten",
      description: "Die Transportstrecke beeinflusst die Kosten durch Fahrzeit und Treibstoff. Längere Distanzen führen zu höheren Preisen."
    },
    {
      title: "Stockwerke und Zugangssituation",
      description: "Müssen Möbel über viele Treppen getragen werden? Ist ein Möbellift notwendig? Die Gegebenheiten vor Ort beeinflussen den Aufwand erheblich."
    },
    {
      title: "Zusatzleistungen",
      description: "Services wie Ein- und Auspacken, Möbel de- und remontieren oder die Entsorgung von alten Möbeln erhöhen den Preis, sparen Ihnen aber viel Zeit und Mühe."
    }
  ];

  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      {factors.map((factor, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <AccordionItem value={`item-${index}`} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <AccordionTrigger className="px-6 py-4 text-left text-base font-semibold text-gray-700 hover:text-green-600">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                {factor.title}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-0 text-gray-600">
              <p>{factor.description}</p>
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  );
};

export default FactorsList;