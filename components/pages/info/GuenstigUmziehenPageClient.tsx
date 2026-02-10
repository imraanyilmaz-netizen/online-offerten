'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight, TrendingDown, ShieldCheck, FileText, Mail, Star, User, Award, Calendar, Package, Users } from 'lucide-react';

const GuenstigUmziehenPageClient = () => {
  const router = useRouter();

  return (
    <>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-white overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative container mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div
              >
                <h1 className="heading-1 mb-6">
                  Günstig umziehen in der Schweiz: So sparen Sie mit cleverer Planung und Offertenvergleich
                </h1>
                <p className="text-body mb-8">
                  Entdecken Sie bewährte Strategien, clevere Tricks und wie Sie durch den Vergleich von Umzugsfirmen Ihr Budget schonen und stressfrei ins neue Zuhause starten.
                </p>
                <Button 
                  onClick={() => router.push('/kostenlose-offerte-anfordern')} 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white font-bold group px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                Jetzt kostenlos & unverbindlich Offerten vergleichen
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
                <div className="mt-8 flex flex-wrap gap-4">
                  {[
                    { label: "Kostenlos & Unverbindlich", icon: CheckCircle },
                    { label: "Geprüfte Firmen", icon: ShieldCheck },
                    { label: "Bis zu 40% sparen", icon: TrendingDown }
                  ].map((stat, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <stat.icon className="w-5 h-5 text-green-600" />
                      <span className="text-body font-medium">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: 'url(/bilder/6bb8eb00-0fb6-4ebd-ba5c-f5c1726ee18a.webp)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

            {/* Main Content */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="max-w-4xl">
              {/* Main Content - Full Width */}
              <div className="lg:col-span-12">
                <h2 className="heading-2 mb-4">
                  Mehrere Umzugsofferten vergleichen und den besten Preis-Leistungs-Verhältnis finden
                </h2>
                <p className="text-body mb-4">
                  Ein Umzug in der Schweiz kostet durchschnittlich zwischen 2'500 und 5'000 CHF – doch rund 40% der Schweizer zahlen mehr als nötig, weil sie das erste Umzugsunternehmen wählen, ohne Preise zu vergleichen. Das Problem: Ohne feste Tarife variieren die Kosten für identische Umzüge um bis zu 40% zwischen verschiedenen Umzugsfirmen.
                </p>
                <p className="text-body mb-6">
                  Die Lösung ist einfach: Mehrere kostenlose Offerten einholen und transparent vergleichen. So finden Sie den optimalen Service für Ihr Budget – ohne Kompromisse bei Qualität und Zuverlässigkeit.
                </p>

                <h3 className="heading-3 mb-6">Warum Umzugsofferten vergleichen?</h3>
                <div className="space-y-4 mb-8">
                  {[
                    {
                      icon: TrendingDown,
                      title: "Bis zu 40% Kostenersparnis",
                      description: "Durch den Vergleich von 3-5 Umzugsofferten sparen Schweizer Haushalte durchschnittlich 500 bis 2'000 CHF"
                    },
                    {
                      icon: ShieldCheck,
                      title: "Geprüfte Schweizer Umzugsunternehmen",
                      description: "Nur zertifizierte Firmen mit SVU-Mitgliedschaft und über 95% Pünktlichkeitsquote"
                    },
                    {
                      icon: Award,
                      title: "Transparente Preise ohne versteckte Kosten",
                      description: "Festpreis-Angebote schützen vor Überraschungen wie Stau-Zuschlägen oder Nachforderungen"
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="bg-green-600 p-2 rounded-lg flex-shrink-0">
                        <feature.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="heading-4 mb-2" style={{ textAlign: 'left' }}>{feature.title}</h4>
                        <p className="text-body">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="my-8 border-gray-300" />

                {/* So funktioniert der Offertenvergleich - Card Design */}
                <section className="mb-12">
                  <div
                    className="text-center mb-12"
                  >
                    <h2 className="heading-2 mb-4">
                      So funktioniert der Offertenvergleich
                    </h2>
                  </div>

                  <div className="relative">
                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {[
                      {
                        number: "01",
                        title: "Umzugsdetails eingeben",
                        description: "Zimmerzahl, Entfernung, Stockwerk und gewünschte Zusatzleistungen wie Montage oder Endreinigung angeben",
                        icon: FileText
                      },
                      {
                        number: "02",
                        title: "Kostenlose Offerten erhalten",
                        description: "Innerhalb kurzer Zeit 3-5 unverbindliche Angebote von geprüften Umzugsfirmen aus Ihrer Region",
                        icon: Mail
                      },
                      {
                        number: "03",
                        title: "Vergleichen und wählen",
                        description: "Preise, Leistungen und Versicherungsschutz transparent gegenüberstellen und das beste Angebot auswählen",
                        icon: Star
                      }
                    ].map((step, index) => (
                      <div
                        key={index}
                          className="relative group"
                      >
                          {/* Verbindungslinie zwischen den Karten */}
                        {index < 2 && (
                            <div className="hidden md:block absolute top-[60px] left-full w-full h-[2px] bg-gradient-to-r from-green-300 via-green-400 to-green-300 z-0 transform -translate-x-1/2" 
                                 style={{ width: 'calc(100% + 1.5rem)', left: 'calc(100% + 0.75rem)' }} />
                          )}
                          
                          <Card className="relative z-10 h-full border-2 border-green-200 hover:border-green-500 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-2 bg-white">
                            <CardHeader className="text-center pb-4">
                              {/* Nummer in grünem Kreis */}
                              <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                              {step.number}
                            </div>
                              
                              {/* Icon */}
                            <div className="flex justify-center mb-4">
                                <div className="bg-green-50 p-4 rounded-xl border-2 border-green-100 group-hover:bg-green-100 group-hover:border-green-300 transition-all duration-300">
                                  <step.icon className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                                </div>
                              </div>
                              
                              <CardTitle className="heading-4 mb-2 text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                                {step.title}
                              </CardTitle>
                          </CardHeader>
                            <CardContent className="pt-0">
                              <p className="text-body text-center text-gray-600 leading-relaxed" style={{ textAlign: 'center' }}>
                                {step.description}
                              </p>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                    </div>
                  </div>
                </section>

                <hr className="my-8 border-gray-300" />

                {/* Das sagen unsere Kunden - Professional Card Design */}
                <section className="mb-12">
                  <div
                    className="text-center mb-12"
                  >
                    <h2 className="heading-2 mb-4">
                      Das sagen unsere Kunden
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        name: "Familie M.",
                        city: "Zürich",
                        rating: 5,
                        text: "Wir haben durch den Offertenvergleich 800 CHF gespart – bei gleichem Service. Der Prozess war unkompliziert und die Beratung hilfreich."
                      },
                      {
                        name: "Thomas K.",
                        city: "Basel",
                        rating: 5,
                        text: "Endlich Transparenz bei den Umzugskosten! Innerhalb eines Tages hatte ich fünf Offerten und konnte in Ruhe vergleichen."
                      },
                      {
                        name: "Sandra L.",
                        city: "Bern",
                        rating: 5,
                        text: "Der Vergleich hat mir nicht nur Geld gespart, sondern auch viel Stress erspart. Klare Empfehlung für alle, die günstig umziehen wollen."
                      }
                    ].map((review, index) => (
                      <div
                        key={index}
                      >
                        <Card className="h-full bg-white shadow-lg rounded-xl overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 border border-gray-100">
                          <CardContent className="p-6 flex flex-col h-full">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                  <User className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                  <p className="font-bold text-gray-800 text-body">{review.name}</p>
                                  <p className="text-sm text-gray-500 text-body">{review.city}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star size={18} className="text-yellow-400 fill-yellow-400" />
                                <span className="font-bold text-base text-gray-800 text-body">{review.rating}.0</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1 mb-4">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>

                            <p className="text-gray-700 italic flex-grow text-body">
                              „{review.text}"
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </section>

                <hr className="my-8 border-gray-300" />

                <div className="mb-6 rounded-lg overflow-hidden">
                  <img 
                    src="/bilder/76acd349-a7e3-4021-a33f-03c94ed34c78.webp" 
                    alt="Günstig umziehen Tipps" 
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* 10 bewährte Tipps für günstiges Umziehen */}
                <section className="mb-12">
                  <div
                    className="mb-8"
                  >
                    <div className="text-center mb-8">
                      <h2 className="heading-2 mb-4">
                        10 bewährte Tipps für günstiges Umziehen in der Schweiz
                      </h2>
                      <p className="text-body text-gray-600 max-w-3xl mx-auto">
                        Sparen Sie bis zu 40% bei Ihren Umzugskosten mit diesen bewährten Strategien und Insider-Tipps
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {/* Kategorie 1: Richtige Umzugsplanung */}
                    <div
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 border-2 border-blue-200"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-blue-600 p-3 rounded-xl">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="heading-3 text-gray-900 mb-0">Richtige Umzugsplanung</h3>
                      </div>
                      <div className="space-y-4">
                        {[
                          {
                            title: "Umzugstermin clever wählen",
                            text: "Wochentage und Nebensaison (September-Mai, ausser Schulferien) sind 10-20% günstiger als Wochenenden oder Sommermonate"
                          },
                          {
                            title: "Vorlaufzeit einplanen",
                            text: "Mindestens 4-6 Wochen im Voraus planen – frühzeitige Anfragen sichern bessere Preise und Verfügbarkeit"
                          },
                          {
                            title: "Halteverbot rechtzeitig beantragen",
                            text: "Kantonale Parkbewilligungen kosten 50-200 CHF pro Tag – rechtzeitige Organisation vermeidet Zusatzkosten"
                          }
                        ].map((tip, index) => (
                          <div key={index} className="bg-white rounded-lg p-4 border border-blue-100 hover:border-blue-300 transition-colors">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                                <p className="text-body text-gray-600 text-sm leading-relaxed">{tip.text}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Kategorie 2: Umzugsvolumen reduzieren */}
                    <div
                      className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 md:p-8 border-2 border-purple-200"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-purple-600 p-3 rounded-xl">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="heading-3 text-gray-900 mb-0">Umzugsvolumen reduzieren</h3>
                      </div>
                      <div className="space-y-4">
                        {[
                          {
                            title: "Ausmisten vor dem Umzug",
                            text: "Entrümpelung reduziert das Haushaltsvolumen um 20-30% und damit die Transportkosten erheblich"
                          },
                          {
                            title: "Gegenstände verkaufen oder spenden",
                            text: "Über Ricardo.ch oder Caritas lassen sich 200-1'000 CHF durch den Verkauf alter Möbel und Sachen erzielen"
                          },
                          {
                            title: "Nur das Nötige mitnehmen",
                            text: "Jeder Kubikmeter weniger spart Geld beim Umzugswagen und Umzugsteam"
                          }
                        ].map((tip, index) => (
                          <div key={index} className="bg-white rounded-lg p-4 border border-purple-100 hover:border-purple-300 transition-colors">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                {index + 4}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                                <p className="text-body text-gray-600 text-sm leading-relaxed">{tip.text}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Kategorie 3: Eigenleistung vs. Vollservice */}
                    <div
                      className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 border-2 border-green-200"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-green-600 p-3 rounded-xl">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="heading-3 text-gray-900 mb-0">Eigenleistung vs. Vollservice</h3>
                      </div>
                      <div className="space-y-4">
                        {[
                          {
                            title: "Selbst packen",
                            text: "Ein Teilumzug mit eigener Verpackung spart 10-20% gegenüber dem Komplettpaket"
                          },
                          {
                            title: "Transport durch Profis",
                            text: "Für Möbel und schwere Gegenstände lohnt sich der professionelle Umzugsservice mit Versicherungsschutz"
                          },
                          {
                            title: "Montage abwägen",
                            text: "Einfache De- und Montage selbst übernehmen, komplexe Arbeiten dem Umzugsunternehmen überlassen"
                          }
                        ].map((tip, index) => (
                          <div key={index} className="bg-white rounded-lg p-4 border border-green-100 hover:border-green-300 transition-colors">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                {index + 7}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                                <p className="text-body text-gray-600 text-sm leading-relaxed">{tip.text}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Kategorie 4: Schweiz-spezifische Spartipps */}
                    <div
                      className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 md:p-8 border-2 border-orange-200"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-orange-600 p-3 rounded-xl">
                          <TrendingDown className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="heading-3 text-gray-900 mb-0">Schweiz-spezifische Spartipps</h3>
                      </div>
                      <div className="space-y-4">
                        {[
                          {
                            title: "Regionale Umzugsfirmen bevorzugen",
                            text: "Lokale Anbieter in Zürich, Basel oder Bern sind oft 15-25% günstiger als Grossunternehmen"
                          },
                          {
                            title: "Versicherungsschutz prüfen",
                            text: "Standard-Haftpflicht deckt bis 100'000 CHF pro Gegenstand – bei Wertgegenständen Zusatzversicherung anfragen"
                          },
                          {
                            title: "Umzugshelfer als Alternative",
                            text: "Studenten und Teilzeitkräfte über JOBRUF kosten 25-35 CHF/Stunde gegenüber 45-65 CHF bei Profis"
                          }
                        ].map((tip, index) => (
                          <div key={index} className="bg-white rounded-lg p-4 border border-orange-100 hover:border-orange-300 transition-colors">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                {index + 10}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                                <p className="text-body text-gray-600 text-sm leading-relaxed">{tip.text}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <hr className="my-8 border-gray-300" />

                <h2 className="heading-2 mb-4">Umzugskosten in der Schweiz: Übersicht und Einsparpotenzial</h2>
                <div className="overflow-x-auto mb-4">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left heading-4">Wohnungsgrösse</th>
                        <th className="border border-gray-300 px-4 py-3 text-left heading-4">Innerstädtisch</th>
                        <th className="border border-gray-300 px-4 py-3 text-left heading-4">Zwischen Kantonen</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 text-body">2-3 Zimmer</td>
                        <td className="border border-gray-300 px-4 py-3 text-body">1'200-2'500 CHF</td>
                        <td className="border border-gray-300 px-4 py-3 text-body">2'500-3'500 CHF</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-body">3-4 Zimmer</td>
                        <td className="border border-gray-300 px-4 py-3 text-body">2'000-3'500 CHF</td>
                        <td className="border border-gray-300 px-4 py-3 text-body">3'500-5'000 CHF</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 text-body">Haus</td>
                        <td className="border border-gray-300 px-4 py-3 text-body">3'500-6'000 CHF</td>
                        <td className="border border-gray-300 px-4 py-3 text-body">5'000-8'000 CHF</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
                <p className="text-body mb-4">
                  <strong>Preisunterschiede nach Region</strong>: Genf und Zürich liegen 20-30% über dem Schweizer Durchschnitt, ländliche Kantone bieten günstigere Konditionen.
                </p>
                <p className="text-body mb-6">
                  <strong>Versteckte Kosten erkennen</strong>: Achten Sie bei Offerten auf Faktoren wie Möbellift-Einsatz (200-500 CHF), Aufzugnutzung, Entsorgung von Umzugskartons und Umzugsmaterial sowie die Endreinigung der alten Wohnung.
                </p>

                <hr className="my-8 border-gray-300" />

                <h2 className="heading-2 mb-4">Checkliste für den günstigen Umzug</h2>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left heading-4">Zeitpunkt</th>
                        <th className="border border-gray-300 px-4 py-3 text-left heading-4">Aufgabe</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 text-body"><strong>6-8 Wochen vorher</strong></td>
                        <td className="border border-gray-300 px-4 py-3 text-body">Offerten anfordern, vergleichen und Budget festlegen</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-body"><strong>4 Wochen vorher</strong></td>
                        <td className="border border-gray-300 px-4 py-3 text-body">Umzugsunternehmen beauftragen, Halteverbot beantragen, Kündigungsfristen prüfen</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-3 text-body"><strong>2 Wochen vorher</strong></td>
                        <td className="border border-gray-300 px-4 py-3 text-body">Kartons und Kisten besorgen, Adressänderungen vorbereiten, Lagerung organisieren</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-body"><strong>1 Woche vorher</strong></td>
                        <td className="border border-gray-300 px-4 py-3 text-body">Packen beginnen, Organisation finalisieren, letzte Details mit der Firma klären</td>
                      </tr>
                    </tbody>
                  </table>
                    </div>

                <hr className="my-8 border-gray-300" />

                <h2 className="heading-2 mb-4">Häufige Fragen zum günstigen Umziehen</h2>
                <div className="space-y-4 mb-6">
                  <p className="text-body">
                    <strong>Wie viele Offerten sollte man einholen?</strong> Idealerweise 3-5 Umzugsofferten, um einen realistischen Überblick über Preise und Dienstleistungen zu erhalten.
                  </p>
                  <p className="text-body">
                    <strong>Was ist bei Umzugsofferten zu beachten?</strong> Prüfen Sie Festpreis vs. Stundensatz, inkludierte Versicherung, Zusatzkosten für Montage und ob alle gewünschten Leistungen enthalten sind.
                  </p>
                  <p className="text-body">
                    <strong>Welche Versicherung braucht man beim Umzug?</strong> Seriöse Schweizer Umzugsfirmen bieten Haftpflichtversicherung bis 500 CHF/mÂ³ – bei Wertgegenständen Zusatzschutz vereinbaren.
                  </p>
                  <p className="text-body">
                    <strong>Wie kann man kurzfristig noch Geld sparen?</strong> Selbst packen, Umzugskartons kostenlos bei Migros oder Coop besorgen und flexible Umzugstermine unter der Woche wählen.
                  </p>
                  <p className="text-body">
                    <strong>Mit welchen Umzugskosten muss man in der Schweiz rechnen?</strong> Je nach Zimmeranzahl und Entfernung zwischen 2'500 und 5'000 CHF – durch Vergleich lassen sich 500-2'000 CHF sparen.
                  </p>
                  </div>

                <hr className="my-8 border-gray-300" />

                <h2 className="heading-2 mb-4">Jetzt kostenlos Umzugsofferten vergleichen</h2>
                <p className="text-body mb-4">
                  Der Schlüssel zum günstigen Umziehen liegt im transparenten Vergleich: Sparen Sie bis zu 40% bei Ihren Umzugskosten, ohne Kompromisse bei Qualität und Zuverlässigkeit. Unser neutrales Vergleichsportal verbindet Sie mit geprüften Schweizer Umzugsunternehmen – kostenlos und unverbindlich.
                </p>
                <div className="mb-6 bg-gradient-to-br from-teal-700 to-green-800 rounded-xl p-6 md:p-8 shadow-lg">
                  <div className="text-center mb-6">
                    <p className="text-green-100 mb-4 text-body text-lg" style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 1)', fontSize: '22px' }}>
                      ğŸ”¹ <strong style={{ color: 'rgba(255, 255, 255, 1)' }}>Kostenlose Offerten anfordern und bis zu 40% sparen</strong> ğŸ”¹
                    </p>
                    <p className="text-green-50 mb-6 text-body" style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 1)' }}>
                      ✓ 100% kostenlos und unverbindlich ✓ Geprüfte Partner mit Erfahrung ✓ Transparente Preise ohne Verpflichtung
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      onClick={() => router.push('/kostenlose-offerte-anfordern?service=umzug&step=2')}
                      className="bg-[#eab308] hover:bg-[#ca8a04] text-[#000000] font-medium px-8 py-4 rounded-lg text-sm leading-[20px] shadow-lg transform transition-all duration-300 hover:scale-105"
                      style={{
                        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
                        fontWeight: 500,
                        textAlign: 'center',
                        letterSpacing: 'normal',
                        wordSpacing: '0px',
                        fontStyle: 'normal',
                        fontVariant: 'normal',
                        textTransform: 'none',
                        textDecoration: 'none',
                        textIndent: '0px'
                      }}
                    >
                      Kostenlose Offerten anfordern
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
              </div>
            </div>
                <p className="text-body">
                  Über 92% unserer Kunden empfehlen den Offertenvergleich weiter – starten Sie jetzt Ihre Suche nach dem besten Preis-Leistungsverhältnis für Ihren Umzug in der Schweiz.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GuenstigUmziehenPageClient;


