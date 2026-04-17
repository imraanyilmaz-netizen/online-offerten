import React from 'react';
// framer-motion removed - CSS for better INP
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, ToggleRight, ShieldCheck, Eye, ClipboardList, Scale } from 'lucide-react';

const BenefitsSection = () => {
  const sectionTitle = 'Warum sich die Partnerschaft lohnt';
  const sectionLead =
    'Hier geht es nicht um den Ablauf, sondern um die Gründe – was Online-Offerten.ch für Ihren Betrieb ökonomisch und organisatorisch anders macht.';

  const benefits = [
    {
      icon: Users,
      title: 'Nachfrage statt Kaltakquise',
      desc: 'Statt ungezielt zu werben, treffen Sie auf Menschen und Firmen, die bereits eine Offerte wollen. Das senkt Streuverlust und verkürzt den Weg vom Kontakt zum Gespräch.',
    },
    {
      icon: ShieldCheck,
      title: 'Geprüfte Partner, seriöse Anfragen',
      desc: 'Wir arbeiten mit einem klaren Onboarding inkl. Nachweisen (z. B. Versicherungsunterlagen). Für Sie bedeutet das: ein Umfeld, das zur Professionalität Ihres Gewerbes passt.',
    },
    {
      icon: Eye,
      title: 'Sichtbarkeit ohne eigenes Portal-Budget',
      desc: 'Ihr Profil und Ihre Bewertungen laufen auf einer etablierten Schweizer Plattform – ohne dass Sie zuerst eine eigene Kampagnenstruktur aufbauen müssen.',
    },
    {
      icon: ToggleRight,
      title: 'Kosten nur, wenn Sie zugreifen',
      desc: 'Leads haben einen ausgewiesenen Preis; Sie zahlen, wenn Sie die Anfrage übernehmen wollen. Keine versteckten Folgegebühren auf den späteren Auftrag.',
    },
    {
      icon: Scale,
      title: 'Überschaubare Konkurrenz pro Anfrage',
      desc: 'Eine Anfrage wird nicht an Dutzende Firmen gleichzeitig verscherbelt. So bleibt Ihre Offerte ein echtes Angebot – nicht nur eine von vielen.',
    },
    {
      icon: ClipboardList,
      title: 'Formulardaten statt Telefon-Hin und Her',
      desc: 'Kerninfos zu Umfang, Termin und Ort liegen oft schon vor. Das erleichtert die erste Kalkulation und spart Zeit vor dem ersten Kundengespräch.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">{sectionTitle}</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 text-base md:text-lg leading-relaxed">
          {sectionLead}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
            >
              <Card className="h-full shadow-md hover:shadow-xl transition-shadow duration-300 border-border">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="bg-muted p-3 rounded-lg">
                    <benefit.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
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
