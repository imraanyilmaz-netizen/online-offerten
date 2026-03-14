'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, MapPin, Home, Building, Globe, Package, Truck, Box, ChevronRight } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const UmzugsfirmaPageClient = () => {
  const canonicalUrl = 'https://online-offerten.ch/umzugsfirma'
  const faqItems = [
    {
      q: 'Wie kann ich über Online-Offerten eine passende Umzugsfirma finden?',
      a: 'Sie geben Ihre Umzugsdaten in ein kurzes Formular ein. Anschliessend erhalten Sie mehrere Angebote von Umzugsfirmen aus Ihrer Umgebung, die Sie in Ruhe vergleichen können. So finden Sie schnell ein passendes Unternehmen für Ihren Umzug.',
    },
    {
      q: 'Kostet es etwas, Offerten von Umzugsfirmen anzufordern?',
      a: 'Nein, die Anfrage für Umzugsofferten ist kostenlos. Sie erhalten mehrere Preisvorschläge und können selbst entscheiden, ob Sie eines der Angebote annehmen möchten oder nicht.',
    },
    {
      q: 'Wie viele Umzugsangebote bekomme ich normalerweise?',
      a: 'Nach dem Absenden Ihrer Anfrage erhalten Sie meist mehrere Angebote von verschiedenen Umzugsfirmen. Dadurch können Sie Preise, Leistungen und Verfügbarkeit einfach vergleichen.',
    },
    {
      q: 'Wie schnell bekomme ich eine Rückmeldung von Umzugsunternehmen?',
      a: 'Viele Umzugsfirmen melden sich bereits am selben Tag bei Ihnen. Je nach Anfrage und Region kann es jedoch bis zu 24 Stunden dauern, bis Sie mehrere Angebote erhalten.',
    },
    {
      q: 'Welche Informationen werden für eine Umzugsofferte benötigt?',
      a: 'Damit ein Umzugsunternehmen eine möglichst genaue Kostenschätzung erstellen kann, sind einige Angaben wichtig. Dazu gehören beispielsweise die Grösse der Wohnung, das geplante Umzugsdatum, das Stockwerk der Wohnung, ob ein Aufzug vorhanden ist sowie die Distanz zwischen der alten und der neuen Adresse.',
    },
    {
      q: 'Warum ist es sinnvoll, mehrere Umzugsfirmen zu vergleichen?',
      a: 'Wenn Sie verschiedene Angebote einholen, können Sie sich Preise und Leistungen direkt gegenüberstellen. So erkennen Sie schnell, welche Umzugsfirma das beste Angebot für Ihre Bedürfnisse bietet und können häufig Kosten sparen.',
    },
    {
      q: 'Werden die Umzugsfirmen vor der Vermittlung überprüft?',
      a: 'Viele Vergleichsplattformen arbeiten nur mit seriösen und erfahrenen Umzugsfirmen zusammen. Dadurch wird sichergestellt, dass Kunden zuverlässige Dienstleister für ihren Umzug finden.',
    },
    {
      q: 'Welche zusätzlichen Dienstleistungen bieten Umzugsfirmen an?',
      a: 'Neben dem Transport übernehmen viele Umzugsfirmen auch Zusatzleistungen wie das Verpacken von Möbeln, die Montage und Demontage von Möbelstücken oder die Endreinigung der Wohnung.',
    },
    {
      q: 'Kann ich meinen Umzug günstiger machen?',
      a: 'Ja, wenn Sie beispielsweise Umzugskartons selbst packen oder kleinere Gegenstände eigenständig transportieren, kann sich der Gesamtpreis für den Umzug reduzieren.',
    },
    {
      q: 'Wann ist der beste Zeitpunkt, eine Umzugsfirma zu reservieren?',
      a: 'Es ist ratsam, eine Umzugsfirma möglichst früh zu buchen. Besonders zum Monatsende oder während der Hauptumzugszeiten sind viele Termine schnell vergeben.',
    },
  ]

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
              "name": "Startseite",
              "item": "https://online-offerten.ch/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Umzugsfirma",
              "item": canonicalUrl
            }
          ]
        },
        {
          "@type": "Service",
          "name": "Umzugsfirma finden und vergleichen",
          "serviceType": "Umzugsservice",
          "description": "Finden Sie die beste Umzugsfirma in der Schweiz. Vergleichen Sie bis zu 5 kostenlose Offerten von geprüften Umzugsfirmen für Privatumzug, Geschäftsumzug und mehr.",
          "provider": {
            "@type": "Organization",
            "name": "Online-Offerten.ch",
            "url": "https://online-offerten.ch",
            "logo": "https://online-offerten.ch/image/logo-icon.webp"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Switzerland"
          },
          "offers": {
            "@type": "Offer",
            "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2",
            "priceCurrency": "CHF",
            "price": "0",
            "name": "Kostenlose Umzugsfirma Offerten"
          }
        }
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schemaData)
    script.id = 'umzugsfirma-schema'
    
    const existing = document.getElementById('umzugsfirma-schema')
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
      const scriptToRemove = document.getElementById('umzugsfirma-schema')
      if (scriptToRemove && scriptToRemove.parentNode) {
        try {
          scriptToRemove.remove()
        } catch (e) {
          // Element zaten kaldırılmış olabilir
        }
      }
    }
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <nav className="mb-6 pt-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">Startseite</Link>
              </li>
              <li>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </li>
              <li className="text-gray-900 font-medium" aria-current="page">
                Umzugsfirma
              </li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-semibold text-sm mb-3">
                <MapPin className="h-4 w-4 mr-2" />
                Lokale Umzugsfirmen finden
              </div>
              <h1 className="heading-1 !mt-0">
                Umzugsfirma finden – Kostenlose Umzugsofferten vergleichen
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
                Vergleichen Sie bis zu 5 Offerten von geprüften Umzugsfirmen in Ihrer Region – kostenlos und unverbindlich.
              </p>

              <p className="text-sm font-semibold text-gray-700 mb-2">Wählen Sie Ihre gewünschte Dienstleistung aus:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 mb-6">
                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=privatumzug"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-100 group-hover:bg-blue-500 transition-colors">
                    <Home className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Privatumzug</p>
                    <p className="text-xs text-gray-600 mt-0.5">Wohnungsumzug</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=geschaeftsumzug"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-purple-500 hover:bg-purple-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-purple-100 group-hover:bg-purple-500 transition-colors">
                    <Building className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Geschäftsumzug</p>
                    <p className="text-xs text-gray-600 mt-0.5">Firmenumzug</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=international"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-emerald-100 group-hover:bg-emerald-500 transition-colors">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Auslandumzug</p>
                    <p className="text-xs text-gray-600 mt-0.5">International</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=spezialtransport"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-amber-500 hover:bg-amber-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-100 group-hover:bg-amber-500 transition-colors">
                    <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Spezialtransport</p>
                    <p className="text-xs text-gray-600 mt-0.5">Klavier, Safe & mehr</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=kleintransport"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-teal-500 hover:bg-teal-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-teal-100 group-hover:bg-teal-500 transition-colors">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Kleintransport</p>
                    <p className="text-xs text-gray-600 mt-0.5">Einzelne Gegenstände</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=lagerung"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-indigo-100 group-hover:bg-indigo-500 transition-colors">
                    <Box className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Lagerung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Wohnung ein-/auslagern</p>
                  </div>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-gray-700">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>100% kostenlos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>Geprüfte Firmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>Bis zu 5 Offerten</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>Bis zu 40% sparen</span>
                </div>
              </div>
            </div>

            <div className="relative md:col-span-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/bilder/umzugsfirma-privatumzug-600-400.webp"
                  alt="Umzugsfirma in der Schweiz – Offerten vergleichen"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hidden md:block">
                <p className="text-sm font-bold">Professioneller Umzugsservice</p>
                <p className="text-xs text-blue-100">In Ihrer Region</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-4xl space-y-10">
            <header className="space-y-4">
              <h2 className="heading-2">Umzugskosten vergleichen in der Schweiz – die besten Umzugsofferten 2026</h2>
              <p className="text-body">
                <strong>Vergleichen Sie Umzugskosten</strong> in der Schweiz und machen Sie Ihren Umzug deutlich einfacher. Ein Umzug in der
                Schweiz kann schnell komplex werden. Ob privater Wohnungswechsel, Firmenumzug oder internationaler Transport:
                Die Wahl des richtigen Umzugsunternehmens spielt eine entscheidende Rolle für Kosten, Zeit und Stress.
              </p>
              <p className="text-body">
                Mit der <strong>Vergleichsplattform</strong> der Schweiz, <strong>online-offerten.ch</strong>, können Sie Umzugsofferten einfach
                und kostenlos vergleichen und passende Anbieter finden. Durch einen schnellen Umzugspreisvergleich erhalten
                Sie mehrere <strong>Umzugsangebote</strong> von geprüften Unternehmen und können die beste Lösung für Ihren Umzug
                auswählen.
              </p>
              <p className="text-body">
                Viele Menschen suchen nach Möglichkeiten, Umzugskosten in der Schweiz zu reduzieren. Genau hier hilft ein
                professioneller Umzugspreisvergleich, der Preise, Leistungen und Bewertungen transparent macht.
              </p>
            </header>

            <article className="space-y-4">
              <h3 className="heading-3">Umzugspreisvergleich – so finden Sie das passende Umzugsunternehmen</h3>
              <p className="text-body">
                Ein professioneller Umzugsofferten-Vergleich spart Zeit und Geld. Statt mehrere Firmen einzeln anzufragen,
                können Sie über eine <strong>Vergleichsplattform</strong> mehrere Umzugsofferten gleichzeitig erhalten.
              </p>
              <h4 className="heading-4">Vorteile eines Umzugskosten-Vergleichs</h4>
              <ul className="list-disc pl-6 space-y-2 text-body">
                <li>Mehrere Umzugsofferten gleichzeitig erhalten</li>
                <li>Preise und Leistungen transparent vergleichen</li>
                <li>Geprüfte Umzugsfirmen finden</li>
                <li>Schnell ein günstiges Umzugsunternehmen buchen</li>
              </ul>
              <p className="text-body">
                Gerade in grossen Städten wie Zürich, Bern, Luzern oder St. Gallen lohnt sich ein Vergleich besonders. Die
                Preise können sich je nach Anbieter deutlich unterscheiden. Wenn Sie <strong>Umzugsofferten vergleichen</strong>, finden Sie
                nicht nur günstige Anbieter, sondern auch erfahrene Spezialisten für Ihren Umzug.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="heading-3">Umzugspreise Schweiz – was kostet ein Umzug?</h3>
              <p className="text-body">
                Viele Menschen fragen sich: Was kostet ein Umzug in der Schweiz? Die Umzugspreise hängen von mehreren
                Faktoren ab:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-body">
                <li>Wohnungsgrösse</li>
                <li>Distanz des Umzugs</li>
                <li>Stockwerk und Lift</li>
                <li>Menge der Möbel</li>
                <li>Zusatzleistungen wie Reinigung oder Montage</li>
              </ul>

              <h4 className="heading-4">Durchschnittliche Umzugskosten</h4>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">Wohnungsgrösse</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">Durchschnittliche Umzugskosten</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-gray-700">1-2 Zimmer</td>
                      <td className="px-4 py-3 text-gray-700">500 - 1&apos;200 CHF</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-700">3 Zimmer</td>
                      <td className="px-4 py-3 text-gray-700">1&apos;200 - 2&apos;000 CHF</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-700">4 Zimmer</td>
                      <td className="px-4 py-3 text-gray-700">2&apos;000 - 3&apos;500 CHF</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-body">
                Besonders häufig gesucht werden Umzugspreise in Zürich, da Zürich zu den teuersten Städten der Schweiz
                gehört. Mit einem Online-Vergleich können Sie mehrere Angebote gleichzeitig anfordern und die Kosten
                deutlich reduzieren.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="heading-3">Umzugspreise in Zürich, Bern, Luzern und St. Gallen vergleichen</h3>
              <p className="text-body">
                Ein Umzug in der Schweiz erfordert eine gute Planung und die richtige Unterstützung durch eine professionelle
                Umzugsfirma. Besonders in grösseren Städten unterscheiden sich Preise, Dienstleistungen und Verfügbarkeit
                der Anbieter oft deutlich. Deshalb lohnt es sich, regionale Umzugspreise zu vergleichen, um eine
                zuverlässige und passende Lösung für Ihren Umzug zu finden. Plattformen wie online-offerten.ch helfen
                dabei, schnell mehrere Angebote zu erhalten und die beste Umzugsfirma in Ihrer Region auszuwählen.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="heading-3">Umzugsfirma Zürich</h3>
              <p className="text-body">
                Viele Menschen suchen nach einer zuverlässigen <strong><Link href="/umzugsfirma/zuerich" className="text-green-700 hover:underline">Umzugsfirma in Zürich</Link></strong> oder einer
                professionellen Zügelfirma in Zürich, um ihren Umzug sicher und effizient durchzuführen.
                In einer grossen Stadt wie Zürich sind Erfahrung und gute Planung besonders wichtig, da enge Strassen,
                Parkplatzregelungen und hohe Verkehrsbelastung den Umzug komplizierter machen können.
              </p>
              <p className="text-body">
                Professionelle Umzugshelfer in Zürich kennen die lokalen Gegebenheiten und sorgen dafür, dass Möbel und
                Umzugsgut sicher transportiert werden. Durch den Vergleich verschiedener Anbieter können Sie schnell eine
                passende und preiswerte Umzugsfirma in Zürich finden.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="heading-3">Umzugsfirma Bern</h3>
              <p className="text-body">
                Auch in der Hauptstadt gibt es viele erfahrene <Link href="/umzugsfirma/bern" className="text-green-700 hover:underline">Umzugsfirmen in Bern</Link>, die private und geschäftliche Umzüge
                professionell durchführen. Eine zuverlässige <strong>Zügelfirma in Bern</strong> übernimmt nicht nur den
                Transport der Möbel, sondern bietet häufig zusätzliche Dienstleistungen wie Verpackung, Möbelmontage oder
                Umzugsreinigung an.
              </p>
              <p className="text-body">
                Besonders bei grösseren Wohnungswechseln oder Firmenumzügen ist eine strukturierte Planung entscheidend.
                Durch den Vergleich verschiedener Anbieter finden Sie schnell eine Umzugsfirma in Bern, die zu Ihrem Budget
                und Ihren Anforderungen passt.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="heading-3">Umzugsfirma Luzern</h3>
              <p className="text-body">
                In der Zentralschweiz gibt es zahlreiche professionelle <Link href="/umzugsfirma/luzern" className="text-green-700 hover:underline">Umzugsfirmen in Luzern</Link>, die Umzüge innerhalb der
                Region oder in andere Teile der Schweiz durchführen. Eine erfahrene Umzugsfirma in Luzern sorgt dafür, dass der
                Transport Ihrer Möbel sicher und effizient organisiert wird.
              </p>
              <p className="text-body">
                Viele Anbieter bieten neben dem klassischen Umzug auch Zusatzservices wie Verpackungsservice, Lagerung oder
                Umzugsreinigung an. Wenn Sie mehrere Angebote vergleichen, können Sie die passende Umzugsfirma in Luzern
                {' '}finden und gleichzeitig Kosten sparen.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="heading-3">Umzugsfirma St. Gallen</h3>
              <p className="text-body">
                Eine professionelle <Link href="/umzugsfirma/st-gallen" className="text-green-700 hover:underline">Umzugsfirma in St. Gallen</Link>{' '}unterstützt sowohl private Haushalte als auch Unternehmen bei
                regionalen und internationalen Umzügen. Durch ihre Erfahrung können Umzugsfirmen den gesamten Ablauf
                effizient planen und durchführen.
              </p>
              <p className="text-body">Dazu gehören:</p>
              <ul className="list-disc pl-6 space-y-2 text-body">
                <li>Transport</li>
                <li>Möbelmontage</li>
                <li>Verpackungsservice</li>
                <li>Umzugsreinigung</li>
              </ul>
              <p className="text-body">
                Wenn Sie verschiedene Anbieter vergleichen, finden Sie schnell zuverlässige Umzugsofferten in St. Gallen.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="heading-3">Umzugsfirma Aargau</h3>
              <p className="text-body">
                Wenn Sie in den Kanton Aargau ziehen oder innerhalb der Region umziehen, gibt es viele erfahrene
                Umzugsfirmen. Eine professionelle <strong><Link href="/umzugsfirma/aargau" className="text-green-700 hover:underline">Zügelfirma im Aargau</Link></strong> hilft Ihnen dabei, den Umzug
                stressfrei zu organisieren und Ihre Möbel sicher an den neuen Wohnort zu transportieren.
              </p>
              <p className="text-body">Viele Unternehmen bieten zusätzliche Leistungen wie:</p>
              <ul className="list-disc pl-6 space-y-2 text-body">
                <li>Verpackungsservice</li>
                <li>Lagerung</li>
                <li>Endreinigung</li>
              </ul>
              <p className="text-body">
                Über dieses <strong>Portal</strong> können Sie verschiedene Anbieter vergleichen und schnell die passende Umzugsofferte
                im Aargau erhalten.
              </p>
            </article>

            <article className="space-y-5 rounded-2xl border border-gray-200 bg-slate-50 p-6 md:p-8">
              <h3 className="heading-3">Umzug in verschiedenen Städten der Schweiz</h3>
              <p className="text-body">
                Ein Umzug kann je nach Stadt unterschiedliche Herausforderungen mit sich bringen. Mit online-offerten.ch
                können Sie Umzugskosten in verschiedenen Städten der Schweiz vergleichen und schnell passende
                {' '}<strong>Umzugsangebote</strong> für Ihre Region finden.
              </p>
              <p className="text-body font-semibold text-gray-900">Beliebte Suchanfragen sind zum Beispiel:</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/umzugsfirma/zuerich" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">
                  Umzug Zürich
                </Link>
                <Link href="/umzugsfirma/bern" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">
                  Umzug Bern
                </Link>
                <Link href="/umzugsfirma/basel" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">
                  Umzug Basel
                </Link>
                <Link href="/umzugsfirma/luzern" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">
                  Umzug Luzern
                </Link>
                <Link href="/umzugsfirma/st-gallen" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">
                  Umzug St. Gallen
                </Link>
                <Link href="/umzugsfirma/aargau" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">
                  Umzug Aargau
                </Link>
                <Link href="/umzugsfirma/genf" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">
                  Umzug Genf
                </Link>
              </div>
              <p className="text-body">
                Durch den Vergleich verschiedener Anbieter erhalten Sie schnell passende <strong>Umzugsangebote</strong> für Ihre Region.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="heading-3">Spezialtransporte – Klaviertransport und empfindliche Möbel</h3>
              <p className="text-body">
                Nicht jeder Umzug ist gleich. Manche Transporte erfordern Spezialwissen. Ein gutes Beispiel ist der
                Klaviertransport. Ein Vergleich von Klaviertransport-Spezialisten hilft dabei, erfahrene Unternehmen zu
                finden, die Instrumente sicher transportieren.
              </p>
              <p className="text-body">Professionelle Umzugsfirmen bieten ausserdem Transportlösungen für:</p>
              <ul className="list-disc pl-6 space-y-2 text-body">
                <li>Tresore</li>
                <li>Klavier</li>
                <li>Schwere Möbel</li>
              </ul>
              <p className="text-body">
                <Link
                  href="https://online-offerten.ch/ratgeber/klaviertransport-schweiz"
                  className="text-green-600 hover:text-green-700 font-semibold underline"
                >
                  Klaviertransport Schweiz – Kosten, Ablauf & Offerten vergleichen
                </Link>
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="heading-3">Umzugsreinigung und Endreinigung mit Abnahmegarantie</h3>
              <p className="text-body">
                Neben dem Transport spielt auch die Reinigung eine wichtige Rolle bei der Umzugsplanung. Eine professionelle
                Umzugsreinigung sorgt dafür, dass die Wohnung sauber übergeben werden kann, und spart Ihnen gleichzeitig
                Zeit und Aufwand.
              </p>

              <h4 className="heading-4">Endreinigung mit Abnahmegarantie</h4>
              <p className="text-body">
                Viele Reinigungsfirmen bieten eine Endreinigung mit Abnahmegarantie an, bei der die Wohnung für die
                Übergabe vollständig gereinigt wird. Falls bei der Abnahme noch etwas beanstandet wird, übernimmt die
                Reinigungsfirma in der Regel eine kostenlose Nachreinigung.
              </p>

              <h4 className="heading-4">Wohnung beim Umzug putzen – was gehört zur Umzugsreinigung?</h4>
              <p className="text-body">
                Wenn Sie beim Umzug die Wohnung putzen, sollten alle wichtigen Bereiche gründlich gereinigt werden, damit
                die Übergabe problemlos erfolgt.
              </p>
              <p className="text-body">Typische Bereiche der Umzugsreinigung sind:</p>
              <ul className="list-disc pl-6 space-y-2 text-body">
                <li>Küche inklusive Backofen und Kühlschrank</li>
                <li>Badezimmer und Sanitäranlagen</li>
                <li>Fenster und Fensterrahmen</li>
                <li>Böden, Türen und Wände</li>
                <li>Balkon, Keller oder Abstellräume</li>
              </ul>
              <p className="text-body">
                Die Umzugsreinigungskosten hängen meist von der Grösse der Wohnung und dem Reinigungsaufwand ab. Je nach
                Region und Anbieter können die Preise variieren. Über unser Portal können Sie schnell mehrere
                Reinigungsofferten vergleichen und die passende Reinigungsfirma finden.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="heading-3">Zusätzliche Services beim Umzug</h3>
              <p className="text-body">
                Neben dem Transport bieten viele Umzugsfirmen zusätzliche Dienstleistungen an, die den gesamten Umzug
                deutlich einfacher machen.
              </p>

              <h4 className="heading-4">Malerarbeiten</h4>
              <p className="text-body">
                Nach einem Umzug sind häufig kleinere Renovierungen oder Ausbesserungen notwendig. Über unser Portal
                können Sie schnell eine passende Maler-Offerte von erfahrenen Handwerkern anfordern.
              </p>

              <h4 className="heading-4">Möbelmontage</h4>
              <p className="text-body">
                Viele Umzugsfirmen übernehmen auch den Abbau und den Wiederaufbau von Möbeln. Dadurch sparen Sie Zeit und
                vermeiden Schäden an empfindlichen Möbelstücken.
              </p>

              <h4 className="heading-4">Verpackungsservice</h4>
              <p className="text-body">
                Ein professioneller Verpackungsservice sorgt dafür, dass Möbel, Elektrogeräte und empfindliche
                Gegenstände sicher transportiert werden. Hochwertige Verpackungsmaterialien schützen Ihr Umzugsgut während
                des gesamten Transports.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="heading-3">Warum Online-Offerten.ch das ideale Offertenportal ist</h3>
              <p className="text-body">
                Mit online-offerten.ch erhalten Sie schnell mehrere Angebote von geprüften Unternehmen.
              </p>
              <p className="text-body">Ihre Vorteile:</p>
              <ul className="list-disc pl-6 space-y-2 text-body">
                <li>Kostenlos und unverbindlich</li>
                <li>Mehrere Umzugsofferten gleichzeitig</li>
                <li>Geprüfte Anbieter</li>
                <li>Transparente Preise</li>
                <li>Einfache Vergleichsfunktion</li>
              </ul>
              <p className="text-body">Das Ziel ist es, Ihren Umzug so einfach wie möglich zu machen.</p>
            </article>

            <article className="py-10">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm">
                <div className="mb-8">
                  <p className="text-sm font-semibold text-green-700 mb-2">FAQ</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Häufig gestellte Fragen zu Umzugsfirmen</h3>
                  <p className="text-base md:text-lg text-gray-600 mt-3 max-w-2xl">
                    Hier finden Sie Antworten auf die wichtigsten Fragen rund um den Vergleich von Umzugsfirmen in der Schweiz.
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                        <h4 className="faq-question text-left">{item.q}</h4>
                      </AccordionTrigger>
                      <AccordionContent className="text-body leading-relaxed text-gray-600">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </article>

            <article className="space-y-4 bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="heading-3">Jetzt Umzugsofferten vergleichen und bis zu 40% sparen</h3>
              <p className="text-body">
                Planen Sie einen Umzug? Dann lohnt es sich, mehrere Offerten einzuholen und zu vergleichen.
              </p>
              <p className="text-body">Über online-offerten.ch können Sie:</p>
              <ul className="list-disc pl-6 space-y-2 text-body">
                <li>Passende <strong>Umzugsofferten vergleichen</strong></li>
                <li>Günstige Anbieter finden</li>
                <li>Reinigung und Zusatzservices buchen</li>
                <li>Schnell mehrere <strong>Umzugsangebote</strong> erhalten</li>
              </ul>
              <p className="text-body">
                Starten Sie jetzt Ihren Vergleich und finden Sie die passenden Umzugsofferten für Ihren Umzug in der
                Schweiz.
              </p>
              <div>
                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=2"
                  className="inline-flex items-center rounded-lg bg-green-600 px-5 py-3 text-white font-semibold hover:bg-green-700 transition-colors"
                >
                  Jetzt kostenlose Offerten anfordern
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}

export default UmzugsfirmaPageClient


