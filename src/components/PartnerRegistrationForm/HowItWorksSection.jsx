import React from 'react';
// framer-motion removed - CSS for better INP
import { UserPlus, ListChecks, Send, Award } from 'lucide-react';

const HowItWorksSection = () => {
  const sectionTitle = "So funktioniert die Zusammenarbeit";

  const steps = [
    { 
      icon: UserPlus, 
      title: "Kostenlos registrieren", 
      desc: "Sie erstellen Ihr Partnerprofil in wenigen Schritten und hinterlegen, welche Leistungen und Regionen Sie abdecken." 
    },
    { 
      icon: ListChecks, 
      title: "Passende Anfragen erhalten", 
      desc: "Sie sehen qualifizierte Kundenanfragen aus Ihrer Region direkt im Partner-Dashboard und per E-Mail." 
    },
    { 
      icon: Send, 
      title: "Anfragen auswählen und reagieren", 
      desc: "Sie entscheiden bei jeder Anfrage selbst, ob sie für Ihren Betrieb interessant ist und ob Sie eine Offerte senden möchten." 
    },
    { 
      icon: Award, 
      title: "Langfristig wachsen", 
      desc: "Mit regelmässigen Anfragen steigern Sie planbar Ihre Auslastung und gewinnen neue Aufträge in Ihrer Zielregion." 
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto max-w-navbar px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">{sectionTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center p-6"
            >
              <div className="flex justify-center items-center mb-4">
                <div className="bg-green-500 text-white rounded-full p-4">
                  <step.icon className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{step.title}</h3>
              <p className="text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
