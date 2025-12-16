'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { 
  ArrowRight, CheckCircle, Building2, Shield, TrendingDown, Clock, Users, Award,
  MessageSquare
} from 'lucide-react'

const GeschaeftsumzugPageClient = () => {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by only showing animations after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // SEO Data (moved to server component, but kept for schema generation if needed client-side)
  const metaTitle = "Büroumzug & Firmenumzug – Geschäftsumzug Offerten kostenlos | Umzugsfirmen vergleichen"
  const metaDescription = "Kosten für Büroumzug & Firmenumzug vergleichen. Geschäftsumzug in der Nähe: Gratis Offerten von geprüften Umzugsfirmen. Schnell, transparent und regional."
  const metaKeywords = "büroumzug, firmenumzug, geschäftsumzug, umzugsfirmen, büroumzug kosten, firmenumzug kosten, angebote vergleichen, offerten kostenlos, büro zügeln, unternehmen umziehen, relocation service business, geschäftsumzug schweiz, büroumzug schweiz, firmenumzug schweiz, umzugsfirmen vergleichen, geschäftsumzug zürich, geschäftsumzug bern, geschäftsumzug basel"
  const canonicalUrl = "/geschaeftsumzug"

  // FAQ Data for Schema
  const faqItemsForSchema = [
    {
      "@type": "Question",
      "name": "Was kostet ein Büroumzug?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Kosten für einen Büroumzug hängen von Umfang, Distanz und Aufwand ab. Ein kleiner Büroumzug kann ab 2.000 CHF beginnen, größere Firmenumzüge kosten oft 10.000 CHF oder mehr. Holen Sie kostenlose Offerten ein, um die besten Preise zu vergleichen."
      }
    },
    {
      "@type": "Question",
      "name": "Wie finde ich die richtige Firma für meinen Firmenumzug?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vergleichen Sie Angebote regionaler Umzugsfirmen in Ihrer Nähe für einen professionellen Firmenumzug. Über unsere Plattform erhalten Sie schnell passende Offerten von geprüften Partnern. Achten Sie auf Versicherungen, positive Bewertungen und Spezialisierung auf Geschäftsumzüge."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lange dauert ein Geschäftsumzug?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Dauer hängt von der Unternehmensgröße und dem Umfang ab. Kleinere Büros können an einem Wochenende umziehen, größere Unternehmen benötigen mehrere Tage. Eine genaue Zeitplanung erfolgt nach einer Vor-Ort-Besichtigung."
      }
    },
    {
      "@type": "Question",
      "name": "Was übernehmen professionelle Umzugsfirmen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Professionelle Umzugsfirmen übernehmen die komplette Planung, Demontage und Montage von Büromöbeln, den sicheren Transport von IT-Equipment, Verpackungsservice, Zwischenlagerung, Entsorgung von Altmobiliar und die Koordination mit Handwerkern am neuen Standort."
      }
    }
  ]

  // Schema Data
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://online-offerten.ch/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Büroumzug & Firmenumzug – Angebote vergleichen",
            "item": `https://online-offerten.ch${canonicalUrl}`
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Büroumzug & Firmenumzug – Angebote vergleichen",
        "serviceType": "Geschäftsumzug",
        "description": metaDescription,
        "provider": {
          "@type": "Organization",
          "name": "Online-Offerten.ch",
          "url": "https://online-offerten.ch"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Zürich"
          },
          {
            "@type": "City",
            "name": "Bern"
          },
          {
            "@type": "City",
            "name": "Basel"
          },
          {
            "@type": "City",
            "name": "Luzern"
          },
          {
            "@type": "Country",
            "name": "Switzerland"
          }
        ],
        "offers": {
          "@type": "Offer",
          "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=geschaeftsumzug",
          "priceCurrency": "CHF",
          "price": "0",
          "name": "Kostenlose Offerte anfordern"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqItemsForSchema
      },
      {
        "@type": "LocalBusiness",
        "name": "Online-Offerten.ch",
        "description": "Vergleichen Sie kostenlos Offerten von geprüften Umzugsfirmen für Geschäftsumzüge in der Schweiz",
        "url": "https://online-offerten.ch",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "CH"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Zürich"
          },
          {
            "@type": "City",
            "name": "Bern"
          },
          {
            "@type": "City",
            "name": "Basel"
          },
          {
            "@type": "City",
            "name": "Luzern"
          }
        ],
        "serviceType": "Geschäftsumzug, Büroumzug, Firmenumzug"
      }
    ]
  }

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=geschaeftsumzug')
  }

  const stats = [
    { icon: Building2, value: '500+', label: 'Erfolgreiche Umzüge' },
    { icon: Users, value: '98%', label: 'Zufriedene Kunden' },
    { icon: Clock, value: '< 24h', label: 'Schnelle Antwort' },
    { icon: Award, value: '4.8/5', label: 'Durchschnittliche Bewertung' },
  ]

  const benefits = [
    { icon: CheckCircle, text: "Bis zu 40% sparen" },
    { icon: Shield, text: "Nur geprüfte Firmen" },
    { icon: TrendingDown, text: "100% kostenlos & unverbindlich" },
  ]

  // Show content immediately, but disable animations until mounted to prevent SSR mismatch
  const animationProps = mounted ? {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 }
  } : {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    transition: { duration: 0 }
  }

  return (
    <>
      <motion.div
        {...animationProps}
        className="bg-gradient-to-br from-slate-50 via-gray-100 to-slate-100"
      >
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMS4xLS45LTItMi0ySDI2Yy0xLjEgMC0yIC45LTIgMnYyNGMwIDEuMS45IDIgMiAyaDhjMS4xIDAgMi0uOSAyLTJWMzR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
          </div>

          <div className="relative container mx-auto max-w-navbar px-4 md:px-6 py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white space-y-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="inline-flex items-center gap-2 bg-green-600/20 backdrop-blur-sm border border-green-500/30 rounded-full px-4 py-2 text-sm font-medium text-green-300"
                >
                  <Shield className="w-4 h-4" />
                  <span>Geprüfte Umzugsfirmen</span>
                </motion.div>

                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
                >
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Büroumzug & Firmenumzug – Angebote vergleichen
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl"
                >
                  Vergleichen Sie kostenlos Offerten von geprüften regionalen Umzugsfirmen in Ihrer Nähe für Ihren Büroumzug oder Firmenumzug. Schnell, transparent und zuverlässig.
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    size="lg"
                    onClick={handleCtaClick}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold group px-8 py-6 text-lg rounded-xl shadow-2xl hover:shadow-green-500/50 transition-all transform hover:scale-105"
                  >
                    Jetzt kostenlose Offerten anfordern →
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>100% kostenlos & unverbindlich</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4"
                >
                  {benefits.map((benefit, index) => {
                    const IconComponent = benefit.icon
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                      >
                        <IconComponent className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-200">{benefit.text}</span>
                      </div>
                    )
                  })}
                </motion.div>
              </div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="grid grid-cols-2 gap-4"
              >
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all hover:scale-105 hover:shadow-2xl"
                    >
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="p-3 bg-green-500/20 rounded-xl">
                          <IconComponent className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="text-3xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-16 pt-8 border-t border-white/10"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">500+</div>
                  <div className="text-sm text-gray-400">Erfolgreiche Umzüge</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">98%</div>
                  <div className="text-sm text-gray-400">Zufriedenheit</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">&lt; 24h</div>
                  <div className="text-sm text-gray-400">Schnelle Antwort</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">4.8/5</div>
                  <div className="text-sm text-gray-400">Bewertung</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
        </motion.section>
        
        <div className="container mx-auto max-w-navbar px-4 md:px-6 py-12 md:py-16">
          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
            <motion.main
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-3 bg-white p-6 md:p-10 rounded-2xl shadow-2xl space-y-10"
            >
              {/* Intro */}
              <section>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  Ein Geschäftsumzug ist mehr als nur der Transport von Möbeln – es ist ein strategisches Projekt, das die Zukunft Ihres Unternehmens maßgeblich beeinflussen kann. Ob Büroumzug, Firmenumzug oder Unternehmensumzug: Professionelle Planung und Durchführung sind entscheidend, um Betriebsunterbrechungen zu minimieren und einen reibungslosen Übergang zu gewährleisten. Wir unterstützen Sie beim Firmenumzug in Zürich, Bern, Basel, Luzern und der ganzen Schweiz mit geprüften regionalen Umzugsfirmen in Ihrer Nähe.
                </p>
              </section>

              {/* H2 Section 0 */}
              <section className="pt-8 border-t border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  Geschäftsumzug – Professionelle Lösungen für Unternehmen
                </h2>
                <div className="text-gray-700 leading-relaxed text-lg space-y-4">
                  <p>
                    Ein Geschäftsumzug erfordert präzise Planung und professionelle Durchführung, um Ausfallzeiten zu minimieren und einen nahtlosen Übergang zu gewährleisten. Unsere spezialisierten Partnerfirmen verstehen die Komplexität von Firmenumzügen und bieten maßgeschneiderte Lösungen für Unternehmen jeder Größe. Von der detaillierten Inventarisierung über den sicheren Transport von Büromöbeln und IT-Equipment bis hin zur termingerechten Einrichtung am neuen Standort – wir koordinieren jeden Schritt Ihres Geschäftsumzugs sorgfältig.
                  </p>
                </div>
              </section>

              {/* H2 Section 1 */}
              <section className="pt-8 border-t border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  Geschäftsumzug – Was kostet ein Firmenumzug?
                </h2>
                <div className="text-gray-700 leading-relaxed text-lg space-y-4">
                  <p>
                    Die Kosten für einen Geschäftsumzug variieren stark je nach Umfang, Distanz und Aufwand. Ein kleiner Büroumzug kann bereits ab 2.000 CHF beginnen, während größere Firmenumzüge schnell 10.000 CHF oder mehr kosten können. Die wichtigsten Faktoren sind das Volumen des Umzugsguts, die Entfernung zwischen den Standorten, der Bedarf an Spezialtransporten für IT-Equipment oder schwere Maschinen sowie zusätzliche Dienstleistungen wie Verpackung, Möbelmontage oder Zwischenlagerung. Um die besten Preise zu finden, sollten Sie mehrere Offerten von geprüften Umzugsfirmen vergleichen. Durch einen detaillierten Vergleich können Sie bis zu 40% der Kosten sparen und gleichzeitig sicherstellen, dass Sie qualitativ hochwertige Dienstleistungen erhalten.
                  </p>
                </div>
              </section>

              {/* H2 Section 2 */}
              <section className="pt-8 border-t border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  Büroumzug in der Nähe – So finden Sie die richtige Umzugsfirma
                </h2>
                <div className="text-gray-700 leading-relaxed text-lg space-y-4">
                  <p>
                    Bei der Suche nach einer Umzugsfirma für Ihren Büroumzug ist es wichtig, regionale Umzugsfirmen in Ihrer Nähe zu bevorzugen, die die örtlichen Gegebenheiten kennen. Eine lokale Umzugsfirma kennt sich mit Parkregelungen, Zufahrtsbeschränkungen und den Besonderheiten Ihrer Region aus. Über unsere Plattform können Sie schnell und einfach geprüfte Umzugsfirmen in Ihrer Nähe finden. Beschreiben Sie Ihren Bedarf einmal und erhalten Sie passende Offerten von qualifizierten Partnern. Achten Sie bei der Auswahl auf Versicherungen, positive Kundenbewertungen und eine Spezialisierung auf Geschäftsumzüge. Ein professionelles Unternehmen bietet immer eine kostenlose Vor-Ort-Besichtigung an, um eine genaue Offerte zu erstellen.
                  </p>
                </div>
              </section>

              {/* H2 Section 3 */}
              <section className="pt-8 border-t border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  Firmenumzug planen – Checkliste für Unternehmen
                </h2>
                <div className="text-gray-700 leading-relaxed text-lg space-y-4">
                  <p>
                    Ein erfolgreicher Firmenumzug erfordert sorgfältige Planung. Beginnen Sie mindestens 3-6 Monate vor dem Umzugstermin mit der strategischen Planung. Wichtige Schritte umfassen die Bildung eines Projektteams, die Erstellung eines detaillierten Budgets und die Definition der Anforderungen an den neuen Standort. 2-3 Monate vor dem Umzug sollten Sie eine professionelle Umzugsfirma beauftragen, die Mitarbeiterkommunikation starten und den IT-Umzug im Detail planen. In den letzten Wochen vor dem Umzug geht es um praktische Vorbereitungen wie Ausmisten, Beschriftungssysteme und Adressänderungen. Am Umzugstag selbst ist eine gute Koordination entscheidend, und nach dem Umzug sollten Sie die technische Funktionalität sicherstellen.
                  </p>
                </div>
              </section>

              {/* H2 Section 4 */}
              <section className="pt-8 border-t border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  Umzugsfirmen vergleichen – Warum Offerten wichtig sind
                </h2>
                <div className="text-gray-700 leading-relaxed text-lg space-y-4">
                  <p>
                    Ein detaillierter Vergleich von Offerten verschiedener Umzugsfirmen ist unerlässlich, um das beste Preis-Leistungs-Verhältnis zu finden. Durch den Vergleich können Sie nicht nur bis zu 40% der Kosten sparen, sondern auch sicherstellen, dass alle wichtigen Leistungen abgedeckt sind. Achten Sie dabei auf transparente Kostenvoranschläge, die alle Leistungen klar auflisten. Fragen Sie gezielt nach möglichen Zusatzkosten für Parkgenehmigungen, Außenaufzüge oder Wochenendzuschläge. Ein seriöses Unternehmen wird alle Kosten transparent kommunizieren. Vergleichen Sie nicht nur die Preise, sondern auch Versicherungen, Referenzen und die Erfahrung mit Geschäftsumzügen. 👉 Jetzt Firmenumzug-Offerten vergleichen (100% kostenlos)
                  </p>
                </div>
              </section>

              {/* CTA in Middle */}
              <section className="pt-8 border-t border-gray-200">
                <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-500 rounded-xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">👉 Jetzt Firmenumzug-Offerten vergleichen (100% kostenlos)</h3>
                  <p className="text-gray-700 mb-6 text-lg">Vergleichen Sie kostenlos Offerten von geprüften Umzugsfirmen für Ihren Büroumzug oder Firmenumzug. Bis zu 40% sparen, schnell und unverbindlich.</p>
                  <Button
                    onClick={handleCtaClick}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold group px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Kostenlose Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </section>

              {/* Cities Section */}
              <section className="pt-8 border-t border-gray-200">
                <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-r-lg">
                  <p className="text-base font-medium">Wir unterstützen Sie beim Firmenumzug in Zürich, Bern, Basel, Luzern und der ganzen Schweiz.</p>
                </div>
              </section>

              {/* H2 Section 5 */}
              <section className="pt-8 border-t border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  Wie lange dauert ein Geschäftsumzug?
                </h2>
                <div className="text-gray-700 leading-relaxed text-lg space-y-4">
                  <p>
                    Die Dauer eines Geschäftsumzugs hängt von verschiedenen Faktoren ab: der Größe des Unternehmens, der Menge des zu transportierenden Inventars und der Entfernung zwischen den Standorten. Kleinere Büros können oft an einem Wochenende umziehen, während größere Unternehmen mehrere Tage oder sogar Wochen benötigen können. Ein typischer Büroumzug für ein mittelgroßes Unternehmen dauert in der Regel 1-3 Tage. Die genaue Zeitplanung wird nach einer Vor-Ort-Besichtigung durch die Umzugsfirma erstellt. Wichtig ist, dass Sie ausreichend Zeit für die Planung einplanen, um Betriebsunterbrechungen zu minimieren und einen reibungslosen Ablauf zu gewährleisten.
                  </p>
                </div>
              </section>

              {/* H2 Section 6 */}
              <section className="pt-8 border-t border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  Tipps für einen erfolgreichen Büro- und Firmenumzug
                </h2>
                <div className="text-gray-700 leading-relaxed text-lg space-y-4">
                  <p>
                    Für einen erfolgreichen Büroumzug oder Firmenumzug gibt es einige wichtige Tipps zu beachten. Planen Sie frühzeitig und beginnen Sie mindestens 3-6 Monate vor dem Umzugstermin. Bilden Sie ein internes Projektteam und klären Sie Verantwortlichkeiten. Nutzen Sie die Gelegenheit zum Ausmisten und Entrümpeln, um Umzugskosten zu sparen. Entwickeln Sie ein klares Beschriftungssystem für Kartons und Möbel. Planen Sie den IT-Umzug besonders sorgfältig, da dies das Herzstück der meisten Unternehmen ist. Kommunizieren Sie transparent mit Ihren Mitarbeitern über den bevorstehenden Umzug. Und schließlich: Vergleichen Sie mehrere Offerten von geprüften Umzugsfirmen, um das beste Preis-Leistungs-Verhältnis zu finden.
                  </p>
                </div>
              </section>

              {/* Internal Links */}
              <section className="pt-8 border-t border-gray-200">
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Weitere Services</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li>
                      <Link href="/privatumzug" className="text-green-600 hover:underline font-medium">
                        Privatumzug Angebote vergleichen
                      </Link>
                    </li>
                    <li>
                      <Link href="/reinigung" className="text-green-600 hover:underline font-medium">
                        Reinigungsfirmen finden
                      </Link>
                    </li>
                    <li>
                      <Link href="/fensterreinigung" className="text-green-600 hover:underline font-medium">
                        Fensterreinigung beauftragen
                      </Link>
                    </li>
                    <li>
                      <Link href="/umzugsfirma-in-der-naehe" className="text-green-600 hover:underline font-medium">
                        Umzugsfirmen vergleichen
                      </Link>
                    </li>
                    <li>
                      <Link href="/grundreinigung" className="text-green-600 hover:underline font-medium">
                        Grundreinigung buchen
                      </Link>
                    </li>
                    <li>
                      <Link href="/bueroreinigung" className="text-green-600 hover:underline font-medium">
                        Büroreinigung anfragen
                      </Link>
                    </li>
                  </ul>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="pt-8 border-t-2 border-gray-300">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Häufig gestellte Fragen zum Geschäftsumzug</h3>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-white border-l-4 border-blue-500 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Was kostet ein Büroumzug?</h4>
                    <p className="text-gray-700 leading-relaxed text-base">
                      Die Kosten für einen Büroumzug hängen von Umfang, Distanz und Aufwand ab. Ein kleiner Büroumzug kann ab 2.000 CHF beginnen, größere Firmenumzüge kosten oft 10.000 CHF oder mehr. Holen Sie kostenlose Offerten ein, um die besten Preise zu vergleichen.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-white border-l-4 border-blue-500 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Wie finde ich die richtige Firma für meinen Firmenumzug?</h4>
                    <p className="text-gray-700 leading-relaxed text-base">
                      Vergleichen Sie Angebote regionaler Umzugsfirmen in Ihrer Nähe für einen professionellen Firmenumzug. Über unsere Plattform erhalten Sie schnell passende Offerten von geprüften Partnern. Achten Sie auf Versicherungen, positive Bewertungen und Spezialisierung auf Geschäftsumzüge.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-white border-l-4 border-blue-500 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Wie lange dauert ein Geschäftsumzug?</h4>
                    <p className="text-gray-700 leading-relaxed text-base">
                      Die Dauer hängt von der Unternehmensgröße und dem Umfang ab. Kleinere Büros können an einem Wochenende umziehen, größere Unternehmen benötigen mehrere Tage. Eine genaue Zeitplanung erfolgt nach einer Vor-Ort-Besichtigung.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-white border-l-4 border-blue-500 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Was übernehmen professionelle Umzugsfirmen?</h4>
                    <p className="text-gray-700 leading-relaxed text-base">
                      Professionelle Umzugsfirmen übernehmen die komplette Planung, Demontage und Montage von Büromöbeln, den sicheren Transport von IT-Equipment, Verpackungsservice, Zwischenlagerung, Entsorgung von Altmobiliar und die Koordination mit Handwerkern am neuen Standort.
                    </p>
                  </div>
                </div>
              </section>
            </motion.main>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2 text-green-600" />
                  Jetzt kostenlose Offerten für Ihren Geschäftsumzug anfordern
                </h3>
                <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                  Vergleichen Sie kostenlos Offerten von geprüften Umzugsfirmen für Ihren Büroumzug oder Firmenumzug.
                </p>
                <Button
                  onClick={handleCtaClick}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold group"
                  size="lg"
                >
                  Kostenlose Offerten anfordern
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.aside>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default GeschaeftsumzugPageClient

