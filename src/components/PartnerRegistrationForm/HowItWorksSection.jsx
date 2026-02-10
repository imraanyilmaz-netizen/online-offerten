import React from 'react';
// framer-motion removed - CSS for better INP
import { UserPlus, ListChecks, Send, Award } from 'lucide-react';

const HowItWorksSection = () => {
  const sectionTitle = "So einfach funktioniert's";

  const steps = [
    { 
      icon: UserPlus, 
      title: "Registrieren & Profil erstellen", 
      desc: "Als Umzugsfirma, Reinigungsfirma oder Malerbetrieb registrieren Sie sich kostenlos und erstellen Ihr professionelles Firmenprofil in nur wenigen Minuten – ohne versteckte Kosten oder Verpflichtungen." 
    },
    { 
      icon: ListChecks, 
      title: "Qualifizierte Anfragen erhalten", 
      desc: "Wir senden Ihnen geprüfte und qualifizierte Kundenanfragen aus Ihrer Region direkt per E-Mail und in Ihr persönliches Partner-Dashboard. Sie sehen sofort, welche Anfragen zu Ihrem Unternehmen passen." 
    },
    { 
      icon: Send, 
      title: "Offerten erstellen & Auftrag gewinnen", 
      desc: "Kaufen Sie nur die Anfragen, die Sie interessieren. Erstellen Sie eine professionelle Offerte und gewinnen Sie neue Aufträge. Sie zahlen nur für Anfragen, die Sie tatsächlich nutzen – volle Kontrolle, keine Risiken." 
    },
    { 
      icon: Award, 
      title: "Erfolg feiern & wachsen", 
      desc: "Gewinnen Sie regelmässig neue Aufträge und bauen Sie Ihr Umzugs-, Reinigungs- oder Maler-Unternehmen erfolgreich aus. Mit qualifizierten Kundenanfragen aus Ihrer Region wächst Ihr Geschäft kontinuierlich." 
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
