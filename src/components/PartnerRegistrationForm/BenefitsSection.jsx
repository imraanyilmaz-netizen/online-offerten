import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, ToggleRight, ShieldCheck, Eye, Settings2 } from 'lucide-react';

const BenefitsSection = () => {
  const sectionTitle = "Ihre Vorteile als Partner";

  const benefits = [
    { 
      icon: Users, 
      title: "Zugang zu neuen Kunden ohne Marketingkosten", 
      desc: "Als Umzugsfirma, Reinigungsfirma oder Malerbetrieb erweitern Sie Ihren Kundenstamm ohne teure Marketingausgaben. Wir bringen qualifizierte Kunden aus Ihrer Region direkt zu Ihnen – Sie sparen Zeit und Geld." 
    },
    { 
      icon: TrendingUp, 
      title: "Steigerung Ihres Umsatzes durch mehr Aufträge", 
      desc: "Mehr qualifizierte Anfragen bedeuten mehr Aufträge für Ihr Unternehmen. Konzentrieren Sie sich auf Ihr Kerngeschäft – wir kümmern uns um die Kundenakquise und bringen Ihnen passende Anfragen." 
    },
    { 
      icon: ToggleRight, 
      title: "Volle Flexibilität & Kontrolle über Ihre Anfragen", 
      desc: "Sie entscheiden selbst, welche Anfragen Sie annehmen möchten. Keine Verpflichtungen, keine versteckten Kosten, keine langfristigen Verträge. Sie zahlen nur für Anfragen, die Sie tatsächlich nutzen." 
    },
    { 
      icon: ShieldCheck, 
      title: "Geprüfte & qualifizierte Anfragen für höhere Erfolgsquote", 
      desc: "Wir überprüfen jede Kundenanfrage sorgfältig, um Ihnen nur qualitativ hochwertige und ernsthafte Kundenkontakte zu vermitteln. Das erhöht Ihre Erfolgsquote bei der Auftragsgewinnung erheblich." 
    },
    { 
      icon: Eye, 
      title: "Erhöhte Sichtbarkeit für Ihr Unternehmen", 
      desc: "Profitieren Sie von unserer starken Reichweite und präsentieren Sie Ihr Umzugs-, Reinigungs- oder Maler-Unternehmen einer breiten Zielgruppe. Mehr Sichtbarkeit bedeutet mehr potenzielle Kunden." 
    },
    { 
      icon: Settings2, 
      title: "Einfache Verwaltung über Ihr Partner-Dashboard", 
      desc: "Verwalten Sie alle Ihre Anfragen, Ihr Firmenprofil und Ihre Zahlungen bequem und übersichtlich über Ihr persönliches Partner-Dashboard. Alles an einem Ort – einfach und effizient." 
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-navbar px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">{sectionTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="bg-slate-100 p-3 rounded-lg">
                    <benefit.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">{benefit.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
