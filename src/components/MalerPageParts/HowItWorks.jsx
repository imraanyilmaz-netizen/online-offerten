import React from 'react';
// framer-motion removed - CSS for better INP
import { FileText, Mail, BarChart3 } from 'lucide-react';

const steps = [
  {
    icon: <FileText className="w-10 h-10" />,
    title: "1. Anfrage ausfüllen",
    text: "Beschreiben Sie Ihr Projekt in unserem Formular. Geben Sie an, was gestrichen werden soll (Innenwände, Fassade, etc.) und fügen Sie optional Fotos hinzu.",
  },
  {
    icon: <Mail className="w-10 h-10" />,
    title: "2. Offerten erhalten",
    text: "Wir leiten Ihre Anfrage an geprüfte Malerfirmen aus Ihrer Region weiter. Sie erhalten innerhalb kurzer Zeit massgeschneiderte Offerten.",
  },
  {
    icon: <BarChart3 className="w-10 h-10" />,
    title: "3. Vergleichen & sparen",
    text: "Vergleichen Sie die erhaltenen Offerten in Bezug auf Preis, Leistung und Bewertungen. Wählen Sie die passende Firma aus und sparen Sie bis zu 40%!"
  },
];

const StepCard = ({ icon, title, text, index }) => {
  return (
    <div
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center flex flex-col items-center"
    >
      <div className="bg-green-100 text-green-600 rounded-full p-4 mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section
      className="mt-16 py-16 bg-slate-100 rounded-2xl"
    >
      <div className="container mx-auto max-w-navbar px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
          Maler Offerten vergleichen: So einfach funktioniert's
        </h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              text={step.text}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;