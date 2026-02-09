'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import NextImage from 'next/image'
import { 
  ArrowRight, CheckCircle, ShieldCheck, Clock, TrendingUp, Users, Award, 
  Star, Calculator, MapPin, Search, Truck, Package, Sparkles,
  HelpCircle, FileText, Navigation, Phone, Mail, Calendar
} from 'lucide-react'

const UmzugsoffertenZuerichPageClient = () => {
  const router = useRouter()
  const canonicalUrl = 'https://online-offerten.ch/umzugsfirma-in-der-naehe/zuerich/umzugsofferten-zuerich'

  // Inject structured data
  useEffect(() => {
    const schemaData = {
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
              "name": "Umzugsofferten Zürich",
              "item": canonicalUrl
            }
          ]
        },
        {
          "@type": "Service",
          "name": "Umzugsofferten Zürich vergleichen",
          "serviceType": "Umzugsservice",
          "description": "Kostenlose Umzugsofferten in Zürich vergleichen. Erhalten Sie bis zu 5 geprüfte Offerten von Umzugsfirmen in Zürich und finden Sie die beste Zügelfirma für Ihren Umzug.",
          "provider": {
            "@type": "Organization",
            "name": "Online-Offerten.ch",
            "url": "https://online-offerten.ch",
            "logo": "https://online-offerten.ch/image/logo.png"
          },
          "areaServed": {
            "@type": "City",
            "name": "Zürich",
            "containedIn": {
              "@type": "Country",
              "name": "Switzerland"
            }
          },
          "offers": {
            "@type": "Offer",
            "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2",
            "priceCurrency": "CHF",
            "price": "0",
            "name": "Kostenlose Umzugsofferten Zürich"
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Wie viele Offerten sollte ich in Zürich einholen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Experten empfehlen, 3–5 Offerten zu vergleichen. Die Preise können bei identischen Aufträgen um bis zu 30 % variieren."
              }
            },
            {
              "@type": "Question",
              "name": "Wie lange im Voraus sollte ich buchen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Idealerweise 4–8 Wochen vor dem Umzugstermin. In der Hochsaison (Mai–September) ist eine noch frühere Beratung sinnvoll."
              }
            },
            {
              "@type": "Question",
              "name": "Wann zahlt man die Umzugsfirma?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Üblich ist eine Anzahlung von 10–30 % bei Auftragsbestätigung. Der Rest wird nach erfolgreichem Umzug bezahlt."
              }
            },
            {
              "@type": "Question",
              "name": "Kann ich auch nur Teil-Leistungen anfragen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, die meisten Firmen bieten modulare Umzugsservices an. Sie können beispielsweise nur den Transport buchen und das Zügeln der Kartons selbst übernehmen."
              }
            },
            {
              "@type": "Question",
              "name": "Sind die Offerten wirklich gratis?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, das Einholen von Umzugsofferten über Vergleichsplattformen oder spezialisierte Partner ist für Sie kostenlos und unverbindlich."
              }
            },
            {
              "@type": "Question",
              "name": "Wie sehen die Stornobedingungen aus?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Bei vielen Zürcher Anbietern ist eine kostenlose Stornierung bis 7–14 Tage vor dem Termin möglich. Prüfen Sie die genauen Bedingungen in Ihrer Offerte."
              }
            },
            {
              "@type": "Question",
              "name": "Was passiert, wenn am Umzugstag etwas beschädigt wird?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Seriöse Umzugsunternehmen haben eine Transportversicherung. Die Deckung liegt meist bei CHF 200–500 pro CHF 10'000 Versicherungssumme. Dokumentieren Sie den Zustand Ihrer Möbel vorab mit Fotos."
              }
            },
            {
              "@type": "Question",
              "name": "Ist eine Besichtigung vor dem Umzug nötig?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Für Umzüge ab 2.5 Zimmern ist eine Besichtigung vor Ort oder per Video-Rundgang empfehlenswert. So kann das Geschäft das Umzugsvolumen genau einschätzen und Sie erhalten eine präzisere Offerte."
              }
            }
          ]
        }
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schemaData)
    script.id = 'umzugsofferten-zuerich-schema'
    
    const existing = document.getElementById('umzugsofferten-zuerich-schema')
    if (existing && existing.parentNode) {
      try {
        existing.remove()
      } catch (e) {
        // Element zaten kaldırılmış olabilir
      }
    }
    
    document.head.appendChild(script)
    
    return () => {
      if (typeof document === 'undefined') return
      const scriptToRemove = document.getElementById('umzugsofferten-zuerich-schema')
      if (scriptToRemove && scriptToRemove.parentNode) {
        try {
          scriptToRemove.remove()
        } catch (e) {
          // Element zaten kaldırılmış olabilir
        }
      }
    }
  }, [])

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=umzug&step=2')
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:col-span-3"
            >
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold text-sm mb-6">
                <MapPin className="h-4 w-4 mr-2" />
                Umzugsofferten Zürich
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Umzugsofferten Zürich – kostenlos vergleichen & passende Zügelfirma finden
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                Ein Umzug in Zürich bedeutet oft enge Treppenhäuser, Parkplatzprobleme und hohe Erwartungen an Pünktlichkeit. Wer sich diesen Stress sparen möchte, holt sich professionelle Unterstützung – und das beginnt mit dem richtigen Vergleich von Umzugsofferten. Über ein Online-Formular können Sie in wenigen Minuten Ihre Angaben eingeben und erhalten innerhalb von 2–4 Stunden mehrere Angebote von geprüften Umzugsfirmen direkt in Ihr Postfach.
              </p>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                Der Service ist für Nutzer in der Stadt Zürich und im Grossraum – etwa Winterthur, Uster oder Dietikon – komplett kostenlos und unverbindlich. Ob Privatumzug oder Firmenumzug, ob Sie zusätzlich Reinigung oder Entsorgung benötigen: Die Offerten werden individuell auf Ihre Bedürfnisse zugeschnitten und direkt von Unternehmen aus der Region zugestellt.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleCtaClick}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Jetzt kostenlose Offerten anfordern
                </Button>
                <Button
                  onClick={() => router.push('/umzugsfirma/umzugskosten')}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Kosten berechnen
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>Preisvergleich von mehreren Zügelfirmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>100% kostenlos & unverbindlich</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>Nur geprüfte Umzugsfirmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>Transparente Offerten</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative md:col-span-2"
            >
              <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-green-200">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-green-100 p-4 rounded-full">
                    <Truck className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <h3 className="heading-3 text-center">
                  Die wichtigsten Vorteile
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Preisvergleich von mehreren Zügelfirmen ohne Aufwand</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Zeitersparnis durch gebündelte Anfrage statt Einzelkontakte</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Nur geprüfte Umzugsfirmen mit nachweisbarer Erfahrung</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Transparente Offerten mit klarer Aufschlüsselung der Kosten</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Angebote für alle Dienstleistungen: Transport, Reinigung, Montage, Entsorgung</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Section 1 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <NextImage 
              src="/image/umzugsservice-Schweiz/umzugsofferten-zuerich-1.png" 
              alt="Ein Umzugswagen steht vor einem Mehrfamilienhaus in einer städtischen Umgebung" 
              width={1200}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* So funktioniert's Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-2">
              So funktioniert das Einholen von Umzugsofferten in Zürich
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Der Prozess, um Umzugsangebote in Zürich einzuholen, ist denkbar einfach. Sie müssen nicht dutzende Telefonate führen oder stundenlang Websites durchforsten.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="heading-3">Umzugsdetails angeben</h3>
              <p className="text-gray-600">
                Tragen Sie Ihre wichtigsten Informationen ein: Umzugsdatum, alte und neue Adresse (PLZ 8000–8099 und Umgebung), Anzahl der Zimmer sowie besondere Anforderungen wie Klaviertransport oder Möbellift.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="heading-3">Angebote von 3–6 Zürcher Umzugsfirmen erhalten</h3>
              <p className="text-gray-600">
                Basierend auf Ihren Angaben erhalten Sie innerhalb weniger Stunden mehrere Offerten. Die meisten Antworten treffen zwischen 2 und 24 Stunden ein.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="heading-3">Offerten vergleichen und Firma wählen</h3>
              <p className="text-gray-600">
                Vergleichen Sie die Preise, Leistungen und Bewertungen der Anbieter. Wählen Sie die Zügelfirma, die am besten zu Ihrem Budget und Ihren Anforderungen passt.
              </p>
            </motion.div>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <p className="text-gray-700 leading-relaxed mb-4">
              Um besonders genaue Preise zu erhalten, können Sie Fotos oder eine Inventarliste hochladen. Geben Sie beispielsweise an, wie viele Kartons, Kleiderschränke, Sofas oder Betten transportiert werden müssen. So kann das Umzugsunternehmen das Umzugsvolumen präzise einschätzen.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Die Offerten werden üblicherweise als CHF-Tagessätze oder Pauschalpreise ausgewiesen. Nutzen Sie das Anfrageformular, um den Prozess jetzt zu starten.
            </p>
          </div>
        </div>
      </section>

      {/* Umzugskosten Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="heading-2 text-center">
              Umzugskosten in Zürich realistisch einschätzen
            </h2>
            <p className="text-body mb-8 leading-relaxed">
              Zürich gehört schweizweit zu den teuersten Regionen für einen Umzug. Das liegt an den hohen Löhnen, den Mietpreisen und der anspruchsvollen Verkehrssituation in der Innenstadt. Wer sein Budget realistisch planen möchte, sollte mit folgenden Richtwerten rechnen:
            </p>

            {/* Price Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-green-50">
                    <th className="border border-gray-300 px-6 py-4 text-left font-bold text-gray-900">Wohnungsgrösse</th>
                    <th className="border border-gray-300 px-6 py-4 text-left font-bold text-gray-900">Preisrahmen (innerhalb Stadt Zürich)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-6 py-4 text-gray-700">1-Zimmer-Wohnung</td>
                    <td className="border border-gray-300 px-6 py-4 text-gray-700 font-semibold">CHF 550–900</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-6 py-4 text-gray-700">2.5-Zimmer-Wohnung</td>
                    <td className="border border-gray-300 px-6 py-4 text-gray-700 font-semibold">CHF 1'000–1'600</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-6 py-4 text-gray-700">3-Zimmer-Wohnung</td>
                    <td className="border border-gray-300 px-6 py-4 text-gray-700 font-semibold">CHF 1'400–2'100</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-6 py-4 text-gray-700">4.5-Zimmer-Wohnung</td>
                    <td className="border border-gray-300 px-6 py-4 text-gray-700 font-semibold">CHF 2'200–3'200</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              Die üblichen Stundensätze in Zürich liegen bei CHF 140–220 pro Stunde für ein Team von 2–3 Umzugshelfern inklusive Fahrzeug (3.5–7.5 Tonnen). Bei starker Treppenbelastung – etwa in Altbauten ohne Lift – können die Arbeitskosten um 20–50 % steigen.
            </p>

            <div className="bg-green-50 rounded-xl p-6 mb-6">
              <h3 className="heading-3">Diese Kostenbestandteile sollten in jeder Umzugsofferte aufgeführt sein:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Arbeitszeit des Teams vor Ort</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Fahrzeit und Transportkilometer</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Verpackungsmaterial (Umzugskartons, Luftpolsterfolie)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Parkbewilligung bei der Stadt Zürich</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Versicherungsschutz für Ihr Umzugsgut</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Endreinigung der alten Wohnung</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Entsorgung von Möbeln oder Sperrgut</span>
                </li>
              </ul>
            </div>

            {/* Beispielpakete */}
            <div className="mt-12">
              <h3 className="heading-3">Typische Beispielpakete für Umzugsofferten in Zürich</h3>
              <p className="text-gray-700 mb-6">
                Um Ihnen eine bessere Orientierung zu geben, hier drei realistische Beispielpakete, wie sie 2025 in Zürich üblich sind:
              </p>

              <div className="space-y-6">
                <div className="bg-white border-2 border-green-200 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Standard-Paket (1–1.5-Zimmer-Wohnung)</h4>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">Leistungen: Zügelteam (2 Personen), Transport, einfache Reinigung</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">Preisrahmen: CHF 800–1'100</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">Geeignet für: Studierende, Singles, kleine Wohnungen</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white border-2 border-green-200 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Komfort-Paket (3-Zimmer-Wohnung)</h4>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">Leistungen: Transport, Möbelmontage, Endreinigung mit Abnahmegarantie</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">Preisrahmen: CHF 1'600–2'100</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">Geeignet für: Familien, Paare mit grösserem Haushalt</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white border-2 border-green-200 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Premium-Paket (4.5–5.5-Zimmer-Einfamilienhaus)</h4>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">Leistungen: Full Service Umzug inkl. Ein- und Auspacken, Intensivreinigung, Entsorgung</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">Preisrahmen: CHF 2'800–4'000</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">Geeignet für: Häuser, grosse Haushalte, Umzüge mit viel Umzugsgut</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-700 mt-6 leading-relaxed">
                Beachten Sie: Konkrete Offerten werden immer individuell kalkuliert. Faktoren wie das Datum (Monatsende ist teurer), Etage, Lift-Verfügbarkeit und Distanz zwischen alter und neuer Adresse beeinflussen den finalen Preis erheblich.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Section 2 */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <NextImage 
              src="/image/umzugsservice-Schweiz/umzugsofferten-zuerich-2.png" 
              alt="Umzugshelfer tragen schwere Möbel im Treppenhaus" 
              width={1200}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Geprüfte Umzugsfirmen Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="heading-2 mb-6">
              Geprüfte Umzugsfirmen in Zürich vergleichen
            </h2>
            <p className="text-body mb-8 leading-relaxed">
              Der Zürcher Markt bietet eine breite Auswahl an Umzugsunternehmen – von lokalen Spezialisten bis hin zu schweizweit tätigen Anbietern. Im Folgenden geben wir Ihnen eine Orientierung zu den verschiedenen Firmentypen, ohne Anspruch auf Vollständigkeit.
            </p>

            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Typische Anbieter-Kategorien in Zürich:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="font-semibold text-gray-900 mr-2">Lokale Spezialisten</span>
                  <span className="text-gray-700">(Sitz in 8004, 8005, 8048 etc.): Kennen die Quartiere, kurze Anfahrtswege, oft persönlicher Service</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-gray-900 mr-2">Schweizweit tätige Anbieter:</span>
                  <span className="text-gray-700">Grosse Flotten, standardisierte Prozesse, gut für Umzüge über Kantonsgrenzen</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-gray-900 mr-2">Budget-Anbieter:</span>
                  <span className="text-gray-700">Günstigere Preise, oft weniger Zusatzleistungen, gut für einfache Umzüge</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-gray-900 mr-2">Premium-Zügler:</span>
                  <span className="text-gray-700">Höhere Kosten, dafür umfassender Service inkl. Kunsttransport und Einlagerung</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-gray-900 mr-2">Kombinierte Anbieter:</span>
                  <span className="text-gray-700">Bieten Umzug plus Reinigung aus einer Hand, praktisch für Komplett-Lösungen</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Qualitätsmerkmale seriöser Umzugsfirmen:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Öffentliche Kundenbewertungen seit mindestens 2020 (z.B. auf Google)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Gültige Versicherung mit ausreichender Deckung</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Eigene Fahrzeugflotte statt nur Subunternehmer</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Klare AGB und transparente Vertragsgestaltung</span>
                </li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed mb-8">
              Beim Ausfüllen des Offertenformulars können Sie explizit angeben, dass Sie nur Firmen aus der Stadt Zürich und angrenzenden Gemeinden wünschen. Das minimiert Anfahrtswege und damit auch Kosten.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Woran man eine seriöse Umzugsfirma in Zürich erkennt</h3>
              <p className="text-gray-700 mb-4">Bevor Sie eine Firma beauftragen, prüfen Sie diese Punkte:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 font-bold">✓</span>
                  <span className="text-gray-700">Handelsregistereintrag im Kanton Zürich vorhanden</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 font-bold">✓</span>
                  <span className="text-gray-700">Firmensitz mit vollständiger Adresse angegeben</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 font-bold">✓</span>
                  <span className="text-gray-700">Keine ausschliesslich anonyme Handynummer als Kontakt</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 font-bold">✓</span>
                  <span className="text-gray-700">Schriftliche Offerte mit Datum und detaillierter Leistungsbeschreibung</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 font-bold">✓</span>
                  <span className="text-gray-700">MwSt.-Angabe korrekt ausgewiesen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 font-bold">✓</span>
                  <span className="text-gray-700">Versicherungsinformationen in der Offerte enthalten</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 font-bold">✓</span>
                  <span className="text-gray-700">Für Umzüge ab 2.5 Zimmer: Besichtigung vor Ort oder per Video-Rundgang üblich</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 font-bold">✓</span>
                  <span className="text-gray-700">Transparente Stornobedingungen schriftlich erklärt</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 font-bold">✓</span>
                  <span className="text-gray-700">Notfallpläne für Lift-Ausfall oder Strassensperrung dokumentiert</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                Diese Checkliste hilft Ihnen, unseriöse Anbieter schnell zu erkennen und böse Überraschungen zu vermeiden.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leistungen Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="heading-2 mb-6">
              Leistungen der Zürcher Umzugsfirmen im Überblick
            </h2>
            <p className="text-body mb-8 leading-relaxed">
              Moderne Zügelfirmen bieten weit mehr als nur den reinen Möbeltransport. Die meisten Umzugsofferten enthalten modulare Bausteine, die Sie nach Bedarf kombinieren können.
            </p>

            <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Typische Umzugsleistungen:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Package className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Ein- und Auspackservice:</span>
                    <span className="text-gray-700"> Profis packen Ihr Inventar sicher ein und am Zielort wieder aus</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Package className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Möbelmontage und -demontage:</span>
                    <span className="text-gray-700"> Schränke, Betten und Regale werden fachgerecht ab- und aufgebaut</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Package className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Klavier- und Kunsttransporte:</span>
                    <span className="text-gray-700"> Speziell geschultes Personal mit entsprechender Ausrüstung</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Package className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Zwischenlagerung:</span>
                    <span className="text-gray-700"> Sichere Einlagerung im Kanton Zürich, wenn Ein- und Auszugstermin nicht zusammenpassen</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Package className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Entsorgung:</span>
                    <span className="text-gray-700"> Abtransport von Altmöbeln, Sperrgut und Elektrogeräten</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Package className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900">Endreinigung mit Abnahmegarantie:</span>
                    <span className="text-gray-700"> In Zusammenarbeit mit Verwaltungen wie Wincasa, Livit oder Stadt Zürich Liegenschaften</span>
                  </div>
                </li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed mb-8">
              Viele Umzugsunternehmen in Zürich bieten auch kurzfristige Umzüge unter der Woche an. Für Samstage oder Abendtermine fallen meist Zuschläge an – diese sollten in der Offerte klar ausgewiesen sein.
            </p>

            <div className="bg-purple-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Spezialumzüge in Zürich</h3>
              <p className="text-gray-700 mb-4">Manche Umzugssituationen erfordern besondere Kompetenz und Ausrüstung:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="font-semibold text-gray-900 mr-2">Klaviertransport in Altbauten:</span>
                  <span className="text-gray-700">Besonders in den Kreisen 3, 4 und 5 sind enge Treppenhäuser häufig – hier braucht es Erfahrung und spezielle Tragegurte (Zusatzkosten: CHF 200–400)</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-gray-900 mr-2">Tresortransport:</span>
                  <span className="text-gray-700">Schwere Safes erfordern spezielle Hilfsmittel und oft zusätzliches Personal</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-gray-900 mr-2">Kunstobjekte:</span>
                  <span className="text-gray-700">Galerien in Zürich-West oder private Sammlungen benötigen klimatisierte Transporte</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-gray-900 mr-2">Möbellift-Einsatz:</span>
                  <span className="text-gray-700">Ab 4. OG ohne Lift oft unverzichtbar, Mietkosten ca. CHF 300–600</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-gray-900 mr-2">Treppensteiger und Kraneinsätze:</span>
                  <span className="text-gray-700">Für besonders sperrige Möbel durch Fenster oder Balkone</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                Laden Sie bei der Offertanfrage Fotos von besonders grossen Möbeln hoch – etwa einem 2,40 m hohen Schrank oder einem Boxspringbett. So kann die Firma von Anfang an richtig kalkulieren.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Section 3 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <NextImage 
              src="/image/umzugsservice-Schweiz/umzugsofferten-zuerich-3.png" 
              alt="Professionelle Umzugshelfer tragen vorsichtig einen großen Karton" 
              width={1200}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Tipps Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="heading-2 mb-6">
              Tipps für einen günstigen und stressfreien Umzug in Zürich
            </h2>
            <p className="text-body mb-8 leading-relaxed">
              Mit der richtigen Planung und einem systematischen Offertenvergleich können Sie mehrere hundert Franken sparen – und gleichzeitig den Stress am Zügeltag erheblich reduzieren.
            </p>

            <div className="bg-green-50 rounded-xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Praktische Spartipps für Ihren Umzug:</h3>
              <ol className="space-y-4 list-decimal list-inside">
                <li className="text-gray-700">
                  <span className="font-semibold">Frühzeitig planen:</span> Beginnen Sie mindestens 4–6 Wochen vor dem Umzugstermin mit der Organisation
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Termin clever wählen:</span> Vermeiden Sie den 30. und 31. des Monats – hier sind die Preise am höchsten und die Firmen am ausgebuchtest
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Ausmisten vor dem Zügeln:</span> Jedes Kilo weniger spart Geld. Entsorgen oder verkaufen Sie, was Sie nicht mehr brauchen
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Mindestens 3 Offerten einholen:</span> Nur so können Sie Preise und Leistungen fair vergleichen
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Auf identischen Leistungsumfang achten:</span> Vergleichen Sie Äpfel mit Äpfeln, nicht mit Birnen
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Parkbewilligung rechtzeitig beantragen:</span> Bei der Dienstabteilung Verkehr der Stadt Zürich oder direkt über die Umzugsfirma organisieren
                </li>
                <li className="text-gray-700">
                  <span className="font-semibold">Selbst vorpacken:</span> Wer privat die Umzugskartons selbst packt, spart beim Umzugsservice
                </li>
              </ol>
            </div>

            <div className="bg-red-50 border-l-4 border-red-400 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Versteckte Kosten in Umzugsofferten vermeiden</h3>
              <p className="text-gray-700 mb-4">Nicht alle Kosten sind auf den ersten Blick erkennbar. Achten Sie besonders auf diese Positionen:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">⚠</span>
                  <span className="text-gray-700"><strong>Zuschläge für schwere Gegenstände:</strong> Klaviere, Tresore oder Waschmaschinen können extra kosten</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">⚠</span>
                  <span className="text-gray-700"><strong>Lange Tragewege:</strong> Ist die Distanz vom Parkplatz zur Wohnungstür ungewöhnlich lang?</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">⚠</span>
                  <span className="text-gray-700"><strong>Fehlender Lift:</strong> Etagen-Zuschläge bei Altbauten ohne Aufzug</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">⚠</span>
                  <span className="text-gray-700"><strong>Abend- oder Wochenendzuschlag:</strong> Meist 20–30 % Aufpreis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">⚠</span>
                  <span className="text-gray-700"><strong>Endreinigung:</strong> Ist die Abnahme durch die Verwaltung wirklich inklusive?</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">⚠</span>
                  <span className="text-gray-700"><strong>Entsorgungsfahrten:</strong> Werden diese separat berechnet?</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                <strong>Wichtiger Tipp:</strong> Lassen Sie alle Zusatzkosten schriftlich bestätigen, bevor Sie den Vertrag unterschreiben. Das gilt besonders bei Umzügen in den Innenstadtkreisen 1–5, wo Parkplatzprobleme und enge Verhältnisse häufig zu Mehraufwand führen.
              </p>
              <p className="text-gray-700 mt-4">
                Pauschalpreise mit klar definiertem Leistungsumfang sind oft besser kalkulierbar als reine Stundenofferten. Bei einem Kostendach wissen Sie vorab genau, was der Umzug maximal kostet – das schafft Vertrauen und Planungssicherheit.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nach dem Umzug Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="heading-2 mb-6">
              Nach dem Umzug in Zürich: Formalitäten & Organisation
            </h2>
            <p className="text-body mb-8 leading-relaxed">
              Der Umzugstag ist geschafft – aber ein paar organisatorische Aufgaben stehen noch an. Hier eine kompakte Liste der wichtigsten To-dos:
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Behördliche Anmeldung:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Neue Adresse innerhalb von 14 Tagen beim Personenmeldeamt der Stadt Zürich anmelden</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Alternative: Online über online-offerten.ch erledigen</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Wichtige Adressänderungen:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Krankenkasse informieren</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Banken aktualisieren (z.B. ZKB, UBS, Postfinance)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Arbeitgeber und Leasinggesellschaften benachrichtigen</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Steueramt des neuen Wohnorts kontaktieren</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Oft vergessen:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 font-bold">•</span>
                  <span className="text-gray-700">Bonusprogramme: Coop Supercard, Migros Cumulus</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 font-bold">•</span>
                  <span className="text-gray-700">Online-Dienste: Amazon, Zalando, Digitec</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 font-bold">•</span>
                  <span className="text-gray-700">Zeitschriften-Abos und Vereinsmitgliedschaften</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2 font-bold">•</span>
                  <span className="text-gray-700">Hausratversicherung mit neuer Adresse und allenfalls angepasster Deckung</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mobilität und ÖV nach dem Umzug</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="font-semibold text-gray-900 mr-2">ZVV-Zonen prüfen:</span>
                  <span className="text-gray-700">Durch den Umzug können sich Ihre Tarifzonen ändern. Ein neues NetzPass-Abo (z.B. Zone 110 plus Nachbarzonen) kann nötig werden</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-gray-900 mr-2">GA oder Halbtax aktualisieren:</span>
                  <span className="text-gray-700">Online mit der neuen Adresse anpassen</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-gray-900 mr-2">Arbeitsweg neu bewerten:</span>
                  <span className="text-gray-700">In zentralen Stadtkreisen lohnt sich oft ein Vergleich zwischen ÖV-Abo und Velokombination</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-gray-900 mr-2">Parkplatz organisieren:</span>
                  <span className="text-gray-700">Falls Sie ein Auto haben, rechtzeitig einen Anwohnerparkausweis oder Mietparkplatz sichern</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Section 4 */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <NextImage 
              src="/image/umzugsservice-Schweiz/umzugsofferten-zuerich-4.png" 
              alt="Moderne Wohngebäude in einer Schweizer Stadt mit Tramgleisen" 
              width={1200}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              FAQ zu Umzugsofferten in Zürich
            </h2>

            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg border border-gray-200 px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                  <h4 className="faq-question">Wie viele Offerten sollte ich in Zürich einholen?</h4>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2">
                  Experten empfehlen, 3–5 Offerten zu vergleichen. Die Preise können bei identischen Aufträgen um bis zu 30 % variieren.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg border border-gray-200 px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                  <h4 className="faq-question">Wie lange im Voraus sollte ich buchen?</h4>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2">
                  Idealerweise 4–8 Wochen vor dem Umzugstermin. In der Hochsaison (Mai–September) ist eine noch frühere Beratung sinnvoll.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg border border-gray-200 px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                  <h4 className="faq-question">Wann zahlt man die Umzugsfirma?</h4>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2">
                  Üblich ist eine Anzahlung von 10–30 % bei Auftragsbestätigung. Der Rest wird nach erfolgreichem Umzug bezahlt.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg border border-gray-200 px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                  <h4 className="faq-question">Kann ich auch nur Teil-Leistungen anfragen?</h4>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2">
                  Ja, die meisten Firmen bieten modulare Umzugsservices an. Sie können beispielsweise nur den Transport buchen und das Zügeln der Kartons selbst übernehmen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-lg border border-gray-200 px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                  <h4 className="faq-question">Sind die Offerten wirklich gratis?</h4>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2">
                  Ja, das Einholen von Umzugsofferten über Vergleichsplattformen oder spezialisierte Partner ist für Sie kostenlos und unverbindlich.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-white rounded-lg border border-gray-200 px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                  <h4 className="faq-question">Wie sehen die Stornobedingungen aus?</h4>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2">
                  Bei vielen Zürcher Anbietern ist eine kostenlose Stornierung bis 7–14 Tage vor dem Termin möglich. Prüfen Sie die genauen Bedingungen in Ihrer Offerte.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="bg-white rounded-lg border border-gray-200 px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                  <h4 className="faq-question">Was passiert, wenn am Umzugstag etwas beschädigt wird?</h4>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2">
                  Seriöse Umzugsunternehmen haben eine Transportversicherung. Die Deckung liegt meist bei CHF 200–500 pro CHF 10'000 Versicherungssumme. Dokumentieren Sie den Zustand Ihrer Möbel vorab mit Fotos.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="bg-white rounded-lg border border-gray-200 px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                  <h4 className="faq-question">Ist eine Besichtigung vor dem Umzug nötig?</h4>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2">
                  Für Umzüge ab 2.5 Zimmern ist eine Besichtigung vor Ort oder per Video-Rundgang empfehlenswert. So kann das Geschäft das Umzugsvolumen genau einschätzen und Sie erhalten eine präzisere Offerte.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Starten Sie jetzt Ihre Anfrage
            </h2>
            <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-90">
              Mit einem systematischen Vergleich von Umzugsofferten in Zürich sparen Sie nicht nur Geld, sondern auch Nerven. Die Qualität der Anbieter variiert stark – von Billig-Anbietern mit Risiko bis zu Full-Service-Partnern mit Leidenschaft für Details. Nehmen Sie sich die Zeit, Angebote sorgfältig zu prüfen, und setzen Sie auf Firmen mit nachweisbarer Zuverlässigkeit.
            </p>
            <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-90">
              Starten Sie jetzt Ihre Anfrage und erhalten Sie innerhalb weniger Stunden passende Umzugsangebote von geprüften Zügelfirmen aus Ihrer Region. So wird Ihr Umzug in Zürich entspannt statt stressig – und Ihr neues Zuhause wartet schon auf Sie.
            </p>
            <Button
              onClick={handleCtaClick}
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 text-lg px-12 py-6 rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105 font-bold"
            >
              <Search className="mr-2 h-5 w-5" />
              Jetzt kostenlose Offerten anfordern
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default UmzugsoffertenZuerichPageClient

