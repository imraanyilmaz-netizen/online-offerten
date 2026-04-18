import React from 'react';
import { UserPlus, ListChecks, Send, Award } from 'lucide-react';

const HowItWorksSection = () => {
  const sectionTitle = 'So funktioniert die Partnerschaft';
  const sectionLead =
    'Der typische Ablauf von der Anmeldung bis zur ersten Offerte – ohne Doppelungen, nur der rote Faden.';

  const steps = [
    {
      icon: UserPlus,
      title: '1. Konto anlegen',
      desc: 'Registrierung ausfüllen, Unternehmensdaten ergänzen. Danach prüfen wir Ihr Profil und melden uns bei Rückfragen.',
    },
    {
      icon: ListChecks,
      title: '2. Leistungen & Gebiet definieren',
      desc: 'Welche Dienstleistungen bieten Sie an, wo sind Sie im Einsatz? Je genauer das Profil, desto passender die Anfragen.',
    },
    {
      icon: Send,
      title: '3. Anfrage annehmen oder überspringen',
      desc: 'Neue Leads erscheinen im Dashboard; Sie lesen die Eckdaten und entscheiden, ob Sie den Lead erwerben und offerten möchten.',
    },
    {
      icon: Award,
      title: '4. Offerte senden & Auftrag gewinnen',
      desc: 'Nach dem Kauf des Leads kontaktieren Sie die Kundin bzw. den Kunden und reichen Ihr Angebot ein – wie Sie es gewohnt sind.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/40">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          {sectionTitle}
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 text-base md:text-lg leading-relaxed">
          {sectionLead}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-card border border-border shadow-sm">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-green-500 text-white rounded-full p-4">
                  <step.icon className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
