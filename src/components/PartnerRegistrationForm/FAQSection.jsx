import React from 'react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    question: 'Ist die Registrierung als Partner kostenlos?',
    answer:
      'Ja. Die Registrierung ist kostenlos und unverbindlich. Sie legen zuerst Ihr Partnerprofil an und entscheiden danach pro Anfrage selbst, ob Sie aktiv werden möchten.',
  },
  {
    question: 'Für welche Branchen ist die Partnerschaft geeignet?',
    answer:
      'Aktuell für Umzugsfirmen, Reinigungsfirmen und Malerbetriebe in der Schweiz. Sie können im Profil genau festlegen, welche Leistungen Sie anbieten.',
  },
  {
    question: 'Muss ich jede Anfrage bearbeiten?',
    answer:
      'Nein. Sie haben volle Kontrolle und entscheiden bei jeder Anfrage individuell, ob sie zu Ihrem Betrieb passt.',
  },
  {
    question: 'Wie schnell erhalte ich Anfragen?',
    answer:
      'Nach erfolgreicher Registrierung und Freischaltung erhalten Sie passende Anfragen aus Ihrer Region direkt im Partnerbereich und per E-Mail.',
  },
  {
    question: 'Kann ich meine Regionen und Leistungen später ändern?',
    answer:
      'Ja. Sie können Ihr Profil laufend anpassen, z. B. angebotene Leistungen, Einsatzgebiete und Firmendaten.',
  },
  {
    question: 'Was passiert nach der Registrierung?',
    answer:
      'Nach der Registrierung wird Ihr Profil geprüft und manuell aktiviert. Anschliessend fordern wir die notwendigen Versicherungsunterlagen an. Sobald diese geprüft und freigegeben sind, können Sie passende Anfragen einsehen.',
  },
];

const FAQSection = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm">
          <div className="mb-8">
            <p className="text-sm font-semibold text-green-700 mb-2">Häufige Fragen</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Fragen zur Partnerschaft bei Online-Offerten.ch
            </h2>
            <p className="text-gray-600 mt-3">
              Hier finden Sie die wichtigsten Antworten für einen schnellen Start als Partnerbetrieb.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-gray-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="#register">Jetzt als Partner registrieren</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/kontakt">Frage stellen</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;


