import React from 'react';
// framer-motion removed - CSS for better INP
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, ToggleRight, ShieldCheck, Eye, Settings2 } from 'lucide-react';

const BenefitsSection = () => {
  const sectionTitle = "Warum Partnerbetriebe mit uns arbeiten";

  const benefits = [
    { 
      icon: Users, 
      title: "Neue Kunden ohne Streuverlust", 
      desc: "Sie erreichen gezielt Kundinnen und Kunden, die aktiv eine Offerte suchen – statt breit und teuer zu werben." 
    },
    { 
      icon: TrendingUp, 
      title: "Mehr Aufträge aus Ihrer Region", 
      desc: "Sie erhalten regelmässig passende Anfragen und können Ihre Auslastung nachhaltig verbessern." 
    },
    { 
      icon: ToggleRight, 
      title: "Volle Kontrolle", 
      desc: "Sie entscheiden selbst, welche Anfragen Sie bearbeiten möchten. Keine Pflicht zur Angebotsabgabe." 
    },
    { 
      icon: ShieldCheck, 
      title: "Qualifizierte Kundenkontakte", 
      desc: "Anfragen werden vorqualifiziert, damit Sie sich auf seriöse und relevante Projekte konzentrieren können." 
    },
    { 
      icon: Eye, 
      title: "Mehr Sichtbarkeit als Fachbetrieb", 
      desc: "Ihr Unternehmen ist auf einer etablierten Schweizer Vergleichsplattform präsent und wird von passenden Kunden gefunden." 
    },
    { 
      icon: Settings2, 
      title: "Einfaches Partner-Dashboard", 
      desc: "Verwalten Sie Anfragen und Profildaten an einem Ort – übersichtlich, schnell und effizient." 
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-navbar px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">{sectionTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
