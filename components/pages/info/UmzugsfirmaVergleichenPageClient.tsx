'use client'

import React from 'react';
import Link from 'next/link';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Star, ShieldCheck, TrendingUp, FileText, Mail, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UmzugsfirmaVergleichenPageClient = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Data
  const heroStats = [
    { label: "Kostenlos & Unverbindlich" },
    { label: "Geprüfte Partnerfirmen" },
    { label: "Bis zu 5 Offerten" }
  ];

  const whyChooseUs = [
    {
      title: "Kostenlos & unverbindlich",
      description: "Bis zu 5 Angebote ohne versteckte Kosten. Kein Risiko, keine Verpflichtung.",
      icon: ShieldCheck
    },
    {
      title: "Geprüfte Umzugsfirmen",
      description: "Nur seriöse Anbieter mit positiven Kundenbewertungen aus Ihrer Nähe. Jedes Zügelunternehmen wird auf Qualität und Zuverlässigkeit geprüft.",
      icon: Check
    },
    {
      title: "Bis zu 40% sparen",
      description: "Der transparente Umzugspreisvergleich zeigt Ihnen sofort, welche Zügelfirma das beste Preis-Leistungs-Verhältnis bietet.",
      icon: TrendingUp
    }
  ];

  const howItWorksSteps = [
    {
      number: "1",
      title: "Umzugsdetails eingeben",
      description: "Grösse der Wohnung, Umzugstermin und gewünschte Dienstleistungen (z.B. Endreinigung, Entsorgung) in nur 2 Minuten angeben.",
      icon: FileText
    },
    {
      number: "2",
      title: "Offerten erhalten",
      description: "Bis zu 5 kostenlose Angebote von qualitätsgeprüften Umzugsfirmen aus Ihrer Region landen direkt in Ihrem Postfach.",
      icon: Mail
    },
    {
      number: "3",
      title: "Vergleichen & sparen",
      description: "Preise und Bewertungen prüfen, die beste Wahl treffen und entspannt in die neue Wohnung zügeln.",
      icon: Star
    }
  ];

  const testimonials = [
    {
      quote: "Ich habe innerhalb von Stunden 5 Offerten erhalten und konnte 1'200 CHF sparen. Der Umzugsvergleich war kinderleicht – und die empfohlene Firma hat alles perfekt erledigt!",
      author: "Michael R.",
      location: "Zürich",
      rating: 5
    },
    {
      quote: "Endlich eine Plattform, die hält was sie verspricht. Die vermittelten Profis waren pünktlich, freundlich und haben sogar beim Kisten packen geholfen. Stressfrei von Anfang bis Ende!",
      author: "Sandra K.",
      location: "Basel",
      rating: 5
    }
  ];

  return (
    <>
      
      <div className="bg-slate-50">
        
        <section className="relative bg-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-white"></div>
          <div className="relative container mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-28 text-center z-10">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 tracking-tight">Umzugsfirmen clever vergleichen und bis zu 40% sparen</h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">Der definitive Leitfaden für Ihren stressfreien Umzug in der Schweiz. Holen Sie mehrere Offerten von Umzugsfirmen ein und finden Sie geprüfte Profis für Privatumzug und Reinigung. Erhalten Sie transparente Angebote und treffen Sie die beste Wahl für Ihr Budget und Ihre Nerven.</p>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold group px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <Link href="/kostenlose-offerte-anfordern">
                  Jetzt kostenlos Offerten anfordern
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <div 
                className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
              >
                {heroStats.map((stat, index) => (
                  <div key={index} className="bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-md border border-gray-200/50 flex items-center justify-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-700">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24 space-y-20 md:space-y-28">
          
          {/* Intro Text */}
          <section
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Sparen Sie bis zu 40% bei Ihrem Umzug in der Schweiz
            </h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              Ein Wohnungswechsel kostet Geld, Zeit und Nerven. Die Suche nach der passenden Umzugsfirma macht den Stress oft noch grösser. Preise variieren stark – bei identischen Leistungen können die Kosten um mehrere hundert Franken abweichen.
            </p>
            <p className="text-lg text-gray-700 font-semibold mb-4">
              <strong>Online-Offerten.ch macht Umzugsfirmen vergleichen einfach und kostenlos.</strong>
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Mit wenigen Klicks erhalten Sie bis zu 5 unverbindliche Offerten von geprüften Umzugsunternehmen aus Ihrer Region. So finden Sie den besten Umzugsservice zum fairsten Preis – ohne Aufwand und ohne Verpflichtung.
            </p>
          </section>

          {/* Warum Online-Offerten.ch wählen? - 3 Column Cards */}
          <section
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              Warum Online-Offerten.ch wählen?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {whyChooseUs.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index}>
                    <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-100 hover:border-green-200">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Icon className="w-6 h-6 text-green-600" />
                          </div>
                          <CardTitle className="text-xl font-bold text-gray-800">
                            {item.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </section>

          {/* So einfach funktioniert's - Horizontal Steps */}
          <section
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
              So einfach funktioniert's
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connection Line for Desktop */}
              <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-green-300 z-0" style={{ top: '48px' }}></div>
              
              {howItWorksSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className="relative z-10 flex flex-col items-center text-center"
                  >
                    <div className="relative mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-white">
                        {step.number}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-md">
                        <Icon className="w-6 h-6 text-yellow-900" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Das sagen unsere Kunden - 2 Testimonials */}
          <section
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
              Das sagen unsere Kunden
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index}>
                  <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500">
                    <CardContent className="p-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 italic mb-4 leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-semibold text-gray-800">{testimonial.author}</p>
                          <p className="text-sm text-gray-600">{testimonial.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          {/* Jetzt kostenlos Umzugsfirmen vergleichen - Large CTA */}
          <section
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-8 md:p-12 shadow-2xl"
          >
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Jetzt kostenlos Umzugsfirmen vergleichen
              </h2>
              <p className="text-lg md:text-xl mb-6 opacity-95">
                <strong>In 2 Minuten zum besten Preis für Ihren Umzug in der Schweiz.</strong>
              </p>
              <p className="text-base md:text-lg mb-8 opacity-90">
                Tausende Kundinnen und Kunden haben bereits mit unserem Offerten Portal Geld gespart. Starten Sie jetzt Ihre Anfrage – völlig kostenlos und unverbindlich.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-green-700 hover:bg-gray-100 font-bold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <Link href="/kostenlose-offerte-anfordern">
                    Jetzt kostenlose Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              <p className="text-sm opacity-80 mb-6">
                Kein Aufwand. Keine Verpflichtung. Nur Ersparnis.
              </p>
              <div className="border-t border-white/30 pt-6 mt-6">
                <p className="text-base font-semibold mb-4">
                  <strong>Noch unsicher?</strong>
                </p>
                <p className="text-sm opacity-90 mb-4">
                  Unser Service ist 100% gratis. Sie erhalten Angebote von geprüften Dienstleistern mit Versicherung und Haftpflichtversicherung. Vergleichen Sie in Ruhe – die Wahl liegt bei Ihnen.
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold px-6 py-3 rounded-lg"
                >
                  <Link href="/kostenlose-offerte-anfordern">
                    Kostenlos vergleichen & sofort sparen
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
};

export default UmzugsfirmaVergleichenPageClient;


