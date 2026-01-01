'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, Calculator, TrendingUp, Info, AlertCircle, MapPin, Building, Clock, ShieldCheck } from 'lucide-react'

const UmzugskostenAargauPageClient: React.FC = () => {
  const canonicalUrl = '/umzugskosten-aargau'

  // Price Table Data
  const priceTableData = [
    { size: '1.5 - 2 Zimmer', staff: '2 Zügelmänner, 1 LKW', cost: '850 – 1.600 CHF', costRange: '850-1600' },
    { size: '2.5 - 3 Zimmer', staff: '3 Zügelmänner, 1 LKW', cost: '1.400 – 2.300 CHF', costRange: '1400-2300' },
    { size: '3.5 - 4.5 Zimmer', staff: '3-4 Zügelmänner, 1-2 LKW', cost: '1.900 – 3.200 CHF', costRange: '1900-3200' },
    { size: '5.5+ Zimmer / Haus', staff: '4-5 Zügelmänner, 2 LKW', cost: '3.000 – 5.500+ CHF', costRange: '3000-5500' }
  ]

  // Cost Factors
  const costFactors = [
    { factor: 'Wohnungsgrösse', impact: 'Hoch', description: 'Die Anzahl der Zimmer und die Wohnfläche bestimmen die benötigte Anzahl an Zügelmännern und Fahrzeugen.' },
    { factor: 'Distanz', impact: 'Hoch', description: 'Die Entfernung zwischen Alt- und Neulage beeinflusst die Fahrzeit und damit die Kosten erheblich.' },
    { factor: 'Stockwerk', impact: 'Mittel', description: 'Höhere Stockwerke ohne Lift erhöhen den Zeitaufwand und damit die Kosten.' },
    { factor: 'Liftverfügbarkeit', impact: 'Mittel', description: 'Ein Lift reduziert den Zeitaufwand erheblich, besonders bei schweren Möbeln.' },
    { factor: 'Zusatzleistungen', impact: 'Variabel', description: 'Umzugsreinigung, Entsorgung, Möbellagerung und Verpackungsservice erhöhen die Kosten.' },
    { factor: 'Umzugstag', impact: 'Mittel', description: 'Wochenenden und Monatsenden sind teurer als Wochentage in der Monatsmitte.' },
    { factor: 'Saison', impact: 'Niedrig', description: 'Frühling und Sommer sind teurer als Herbst und Winter.' }
  ]

  // Regional Comparison
  const regionalComparison = [
    { region: 'Aarau', avgCost: '1.200 - 2.000 CHF', note: 'Kantonshauptstadt, moderate Preise' },
    { region: 'Baden', avgCost: '1.300 - 2.200 CHF', note: 'Nähe zu Zürich, leicht höhere Preise' },
    { region: 'Zofingen', avgCost: '1.100 - 1.900 CHF', note: 'Überschaubare Grösse, günstigere Preise' },
    { region: 'Brugg', avgCost: '1.200 - 2.000 CHF', note: 'Zentrale Lage, moderate Preise' },
    { region: 'Wettingen', avgCost: '1.300 - 2.100 CHF', note: 'Nähe zu Zürich, ähnlich wie Baden' },
    { region: 'Zürich (Vergleich)', avgCost: '1.800 - 3.500 CHF', note: 'Zum Vergleich: deutlich teurer' },
    { region: 'Basel (Vergleich)', avgCost: '1.700 - 3.200 CHF', note: 'Zum Vergleich: deutlich teurer' }
  ]

  // Hidden Costs
  const hiddenCosts = [
    { cost: 'Halteverbotszonen', amount: '50 - 150 CHF', description: 'Beantragung von Halteverbotszonen für LKW-Parkplätze, besonders in Altstädten erforderlich.' },
    { cost: 'Parkgebühren', amount: '20 - 80 CHF', description: 'Parkgebühren für Umzugsfahrzeuge, besonders in städtischen Gebieten.' },
    { cost: 'Treppenhausreinigung', amount: '100 - 300 CHF', description: 'Reinigung des Treppenhauses nach dem Umzug, oft im Mietvertrag vorgeschrieben.' },
    { cost: 'Versicherung', amount: '50 - 200 CHF', description: 'Zusätzliche Versicherung für wertvolle Güter, nicht immer im Grundpreis enthalten.' },
    { cost: 'Stornogebühren', amount: '100 - 500 CHF', description: 'Gebühren bei kurzfristiger Stornierung, abhängig vom Anbieter.' },
    { cost: 'Wartezeiten', amount: '50 - 150 CHF/Stunde', description: 'Zusätzliche Kosten bei Verzögerungen, z.B. durch nicht rechtzeitige Räumung.' }
  ]

  // Savings Tips
  const savingsTips = [
    { tip: 'Antizyklisch umziehen', savings: '20-30%', description: 'Meiden Sie Monatsenden und Wochenenden. Ein Umzug an einem Dienstag oder Mittwoch kann die Kosten erheblich senken.' },
    { tip: 'Selbst verpacken', savings: '200-500 CHF', description: 'Packen Sie Kisten selbst und demontieren Sie einfache Möbel. Das reduziert die teuren Arbeitsstunden der Profis.' },
    { tip: 'Früh buchen', savings: '10-15%', description: 'Planen Sie mindestens 2-3 Monate im Voraus. Viele Firmen bieten bessere Konditionen für frühe Buchungen.' },
    { tip: 'Entrümpeln', savings: '100-300 CHF', description: 'Ein Umzug ist die perfekte Gelegenheit zum Entrümpeln. Jedes Kilo weniger spart bares Geld.' },
    { tip: 'Mehrere Offerten vergleichen', savings: 'Bis zu 40%', description: 'Durch den Vergleich mehrerer Offerten finden Sie das beste Preis-Leistungs-Verhältnis.' },
    { tip: 'Gratis-Zügelmaterial', savings: '50-150 CHF', description: 'Fragen Sie in Supermärkten, Apotheken oder im Freundeskreis nach stabilen Bananen- oder Kopierpapierkisten.' }
  ]

  // Seasonal Variations
  const seasonalVariations = [
    { season: 'Frühling (März - Mai)', factor: '+15-25%', description: 'Hauptumzugssaison, hohe Nachfrage, höhere Preise' },
    { season: 'Sommer (Juni - August)', factor: '+20-30%', description: 'Höchste Nachfrage, besonders teuer, lange Wartezeiten' },
    { season: 'Herbst (September - November)', factor: '+5-10%', description: 'Moderate Nachfrage, gute Verfügbarkeit' },
    { season: 'Winter (Dezember - Februar)', factor: 'Basispreis', description: 'Niedrigste Nachfrage, beste Preise, schnellste Verfügbarkeit' }
  ]

  // FAQ
  const faqs = [
    {
      question: 'Was kostet ein Umzug im Aargau durchschnittlich?',
      answer: 'Die durchschnittlichen Umzugskosten im Aargau variieren je nach Wohnungsgrösse. Ein Umzug für eine 2.5-Zimmer-Wohnung kostet typischerweise zwischen 1.400 und 2.300 CHF, während ein Umzug für ein Haus zwischen 3.000 und 5.500 CHF kosten kann. Die Preise sind im Vergleich zu Zürich oder Basel oft 20-30% günstiger.'
    },
    {
      question: 'Warum sind Umzugskosten im Aargau günstiger als in Zürich?',
      answer: 'Die Umzugskosten im Aargau sind günstiger aufgrund mehrerer Faktoren: Geringere Lebenshaltungskosten, weniger Verkehrsdichte, kürzere Anfahrtswege und eine weniger hohe Nachfrage. Zudem sind die Parkmöglichkeiten oft besser, was die Umzugsplanung erleichtert.'
    },
    {
      question: 'Welche versteckten Kosten sollte ich bei einem Umzug im Aargau beachten?',
      answer: 'Zu den versteckten Kosten gehören Halteverbotszonen (50-150 CHF), Parkgebühren (20-80 CHF), Treppenhausreinigung (100-300 CHF), zusätzliche Versicherung (50-200 CHF) und mögliche Wartezeiten (50-150 CHF/Stunde). Diese Kosten sind nicht immer im Grundpreis enthalten.'
    },
    {
      question: 'Wie kann ich bei einem Umzug im Aargau sparen?',
      answer: 'Sie können sparen, indem Sie antizyklisch umziehen (20-30% Ersparnis), selbst verpacken (200-500 CHF Ersparnis), früh buchen (10-15% Ersparnis), entrümpeln (100-300 CHF Ersparnis) und mehrere Offerten vergleichen (bis zu 40% Ersparnis).'
    },
    {
      question: 'Gibt es Preisunterschiede zwischen den Städten im Aargau?',
      answer: 'Ja, es gibt leichte Preisunterschiede. Aarau und Brugg haben moderate Preise (1.200-2.000 CHF für 2.5-3 Zimmer), während Baden und Wettingen aufgrund der Nähe zu Zürich leicht höhere Preise haben (1.300-2.200 CHF). Zofingen ist oft günstiger (1.100-1.900 CHF) aufgrund der überschaubaren Grösse.'
    },
    {
      question: 'Wie beeinflusst die Saison die Umzugskosten im Aargau?',
      answer: 'Die Saison hat einen erheblichen Einfluss. Frühling und Sommer sind 15-30% teurer als Herbst und Winter. Im Winter erhalten Sie die besten Preise und die schnellste Verfügbarkeit. Planen Sie Ihren Umzug wenn möglich in der Nebensaison.'
    },
    {
      question: 'Was ist im Grundpreis einer Umzugsfirma im Aargau enthalten?',
      answer: 'Der Grundpreis umfasst typischerweise den Transport, die Zügelmänner, das Umzugsfahrzeug und die Grundversicherung. Nicht enthalten sind meist Halteverbotszonen, Parkgebühren, Treppenhausreinigung, zusätzliche Versicherung, Verpackungsmaterial und Zusatzleistungen wie Umzugsreinigung.'
    },
    {
      question: 'Kann ich die Umzugskosten im Aargau im Voraus berechnen?',
      answer: 'Ja, Sie können unsere kostenlosen Tools nutzen: Den <Link href="/umzugskosten-rechner" className="text-green-600 hover:text-green-800 underline font-semibold">Umzugskosten-Rechner</Link> für eine erste Schätzung oder mehrere kostenlose Offerten von geprüften Umzugsfirmen anfordern, um genaue Preise zu erhalten.'
    },
    {
      question: 'Gibt es regionale Besonderheiten, die die Umzugskosten im Aargau beeinflussen?',
      answer: 'Ja, die historischen Altstädte in Aarau, Baden und Zofingen erfordern oft Halteverbotszonen und spezielle Planung, was die Kosten leicht erhöht. Die zentrale Lage von Brugg kann zu günstigeren Preisen führen, da Anfahrtswege kürzer sind.'
    },
    {
      question: 'Wie finde ich die günstigste Umzugsfirma im Aargau?',
      answer: 'Vergleichen Sie mehrere kostenlose Offerten von geprüften Umzugsfirmen. Achten Sie nicht nur auf den Preis, sondern auch auf die Leistungen, Versicherung und Bewertungen. Durch den Vergleich können Sie bis zu 40% sparen.'
    }
  ]

  // PriceSpecification Schema
  const priceSpecificationSchema = {
    "@context": "https://schema.org",
    "@type": "PriceSpecification",
    "priceCurrency": "CHF",
    "price": "850",
    "minPrice": "850",
    "maxPrice": "5500",
    "valueAddedTaxIncluded": true,
    "description": "Umzugskosten im Aargau variieren je nach Wohnungsgrösse, Distanz und Zusatzleistungen"
  }

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof faq.answer === 'string' ? faq.answer : faq.answer
      }
    }))
  }

  // Combined Schema
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      priceSpecificationSchema,
      faqSchema,
      {
        "@type": "Service",
        "name": "Umzugskosten Aargau",
        "description": "Detaillierte Preisübersicht und Kostenfaktoren für Umzüge im Aargau",
        "provider": {
          "@type": "Organization",
          "name": "Online-Offerten.ch",
          "url": "https://online-offerten.ch"
        },
        "areaServed": {
          "@type": "State",
          "name": "Aargau"
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <div className="bg-white overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative w-full py-12 md:py-16 lg:py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
          <div className="container mx-auto max-w-navbar px-4 md:px-6">
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                Umzugskosten Aargau – Preise & Kostenfaktoren 2025
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                Detaillierte Übersicht über Umzugskosten im Aargau. Erfahren Sie, welche Faktoren die Preise beeinflussen, wie Sie sparen können und welche versteckten Kosten zu beachten sind.
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="bg-gray-50 py-4 border-b border-gray-200">
          <div className="container mx-auto max-w-navbar px-4 md:px-6">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-600 hover:text-green-600">Start</Link>
              <span className="text-gray-400">/</span>
              <Link href="/umzugsfirma-aargau" className="text-gray-600 hover:text-green-600">Umzugsfirma Aargau</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Umzugskosten</span>
            </nav>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-navbar px-4 md:px-6">
            {/* Introduction */}
            <article className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Umzugskosten im Aargau – Eine Übersicht</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Die Umzugskosten im Aargau sind im Vergleich zu den grossen Metropolen wie Zürich oder Basel oft deutlich günstiger. Dies liegt an mehreren Faktoren: Geringere Lebenshaltungskosten, weniger Verkehrsdichte, kürzere Anfahrtswege und eine weniger hohe Nachfrage nach Umzugsdienstleistungen. Dennoch variieren die Preise erheblich je nach Wohnungsgrösse, Distanz, Umzugstag und gewählten Zusatzleistungen.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                In diesem umfassenden Guide erfahren Sie alles über die Umzugskosten im Aargau: Durchschnittspreise nach Wohnungsgrösse, Kostenfaktoren, regionale Preisunterschiede, versteckte Kosten, Spartipps und saisonale Variationen. Unser Ziel ist es, Ihnen eine transparente Übersicht zu geben, damit Sie fundierte Entscheidungen treffen können.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Durch den Vergleich mehrerer kostenloser Offerten von geprüften Umzugsfirmen können Sie bis zu 40% sparen. Alle Partner sind geprüfte Partner nach Schweizer Standards und versichert gemäss OR.
              </p>
            </article>

            {/* Price Table */}
            <article className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Durchschnittliche Umzugskosten nach Wohnungsgrösse</h2>
              <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-green-600 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Wohnungsgrösse</th>
                        <th className="px-6 py-4 text-left font-semibold">Personal & Fahrzeug</th>
                        <th className="px-6 py-4 text-right font-semibold">Kosten</th>
                      </tr>
                    </thead>
                    <tbody>
                      {priceTableData.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                          <td className="px-6 py-4 text-gray-700">{row.size}</td>
                          <td className="px-6 py-4 text-gray-700">{row.staff}</td>
                          <td className="px-6 py-4 text-right font-semibold text-green-600">{row.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-sm text-gray-600 italic">
                    Hinweis: Diese Preise sind Durchschnittswerte für Umzüge innerhalb des Aargaus. Faktoren wie Stockwerk, Liftverfügbarkeit, Distanz und Zusatzleistungen beeinflussen den Endpreis erheblich. Für eine exakte Kalkulation nutzen Sie unseren <Link href="/umzugskosten-rechner" className="text-green-600 hover:text-green-800 underline font-semibold">Umzugskosten-Rechner</Link> oder fordern Sie mehrere kostenlose Offerten an.
                  </p>
                </div>
              </div>
            </article>

            {/* Cost Factors */}
            <article className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Kostenfaktoren für Umzüge im Aargau</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Verschiedene Faktoren beeinflussen die Umzugskosten erheblich. Verstehen Sie diese Faktoren, um realistische Erwartungen zu haben und die besten Entscheidungen zu treffen.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {costFactors.map((factor, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{factor.factor}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        factor.impact === 'Hoch' ? 'bg-red-100 text-red-700' :
                        factor.impact === 'Mittel' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {factor.impact}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{factor.description}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* Regional Comparison */}
            <article className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Regionale Preisunterschiede im Aargau</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Die Umzugskosten variieren leicht zwischen den verschiedenen Städten im Aargau. Hier finden Sie eine Übersicht der durchschnittlichen Preise für eine 2.5-3-Zimmer-Wohnung:
              </p>
              <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Region</th>
                        <th className="px-6 py-4 text-left font-semibold">Durchschnittliche Kosten</th>
                        <th className="px-6 py-4 text-left font-semibold">Hinweis</th>
                      </tr>
                    </thead>
                    <tbody>
                      {regionalComparison.map((region, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                          <td className="px-6 py-4 font-semibold text-gray-900">{region.region}</td>
                          <td className="px-6 py-4 text-gray-700">{region.avgCost}</td>
                          <td className="px-6 py-4 text-gray-600 italic">{region.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mt-6">
                Wie Sie sehen, sind die Umzugskosten im Aargau deutlich günstiger als in Zürich oder Basel. Dies macht den Aargau zu einer attraktiven Region für Umzüge, besonders für Familien und Berufstätige, die die Nähe zu den Metropolen schätzen, aber günstigere Lebenshaltungskosten bevorzugen.
              </p>
            </article>

            {/* Hidden Costs */}
            <article className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Versteckte Kosten bei Umzügen im Aargau</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Neben den Grundkosten für den Umzug fallen oft zusätzliche Kosten an, die nicht immer im ersten Angebot enthalten sind. Diese versteckten Kosten können die Gesamtkosten erheblich erhöhen:
              </p>
              <div className="space-y-4">
                {hiddenCosts.map((cost, index) => (
                  <div key={index} className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{cost.cost}</h3>
                          <span className="text-lg font-bold text-yellow-700">{cost.amount}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{cost.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <Info className="w-6 h-6 text-blue-600 mb-3" />
                <p className="text-gray-700 leading-relaxed font-semibold">
                  Tipp: Fragen Sie bei der Offerte explizit nach allen zusätzlichen Kosten, um Überraschungen zu vermeiden. Seriöse Umzugsfirmen listen alle Kosten transparent auf.
                </p>
              </div>
            </article>

            {/* Savings Tips */}
            <article className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Spartipps für Umzüge im Aargau</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Mit den richtigen Strategien können Sie erheblich bei Ihrem Umzug sparen. Hier sind die effektivsten Spartipps:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {savingsTips.map((tip, index) => (
                  <div key={index} className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{tip.tip}</h3>
                          <span className="text-lg font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                            {tip.savings}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{tip.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* Seasonal Variations */}
            <article className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Saisonale Preisvariationen</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Die Saison hat einen erheblichen Einfluss auf die Umzugskosten. Planen Sie Ihren Umzug wenn möglich in der Nebensaison, um zu sparen:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {seasonalVariations.map((season, index) => (
                  <div key={index} className={`rounded-xl p-6 border-2 ${
                    season.factor === 'Basispreis' ? 'bg-green-50 border-green-200' :
                    season.factor.includes('+20') ? 'bg-red-50 border-red-200' :
                    season.factor.includes('+15') ? 'bg-orange-50 border-orange-200' :
                    'bg-yellow-50 border-yellow-200'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{season.season}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        season.factor === 'Basispreis' ? 'bg-green-100 text-green-700' :
                        season.factor.includes('+20') ? 'bg-red-100 text-red-700' :
                        season.factor.includes('+15') ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {season.factor}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{season.description}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* FAQ */}
            <article className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Häufige Fragen zu Umzugskosten im Aargau</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* Internal Links */}
            <article className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Weitere Informationen</h2>
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Erfahren Sie mehr über <Link href="/umzugsfirma-aargau" className="text-green-600 hover:text-green-800 underline font-semibold">Umzugsfirmen im Aargau vergleichen</Link> oder informieren Sie sich über <Link href="/umzugsfirma-aargau/aarau" className="text-green-600 hover:text-green-800 underline font-semibold">Umzugsfirma in Aarau</Link>, <Link href="/umzugsfirma-aargau/baden" className="text-green-600 hover:text-green-800 underline font-semibold">Zügelfirmen Aargau finden</Link> und <Link href="/umzugsfirma-aargau/zofingen" className="text-green-600 hover:text-green-800 underline font-semibold">Anbieter im Kanton Aargau</Link>.
                </p>
              </div>
            </article>

            {/* CTA */}
            <article className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Jetzt kostenlose Offerten für Ihren Umzug im Aargau anfordern</h2>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                Vergleichen Sie mehrere geprüfte Umzugsfirmen und sparen Sie bis zu 40%
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/kostenlose-offerte-anfordern?service=umzug">
                  <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
                    Kostenlose Offerte anfordern
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/umzugskosten-rechner">
                  <Button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold">
                    Kosten-Rechner nutzen
                    <Calculator className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </article>
          </div>
        </section>
      </div>
    </>
  )
}

export default UmzugskostenAargauPageClient

