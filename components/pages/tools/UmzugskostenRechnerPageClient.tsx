'use client'

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, ArrowRight, MapPin, Clock, CheckCircle, Lightbulb, ShieldCheck } from 'lucide-react';
import MovingCostCalculator from '@/components/UmzugskostenRechnerSections/MovingCostCalculator';
import FactorsList from '@/components/UmzugskostenRechnerSections/FactorsList';
import CostTable from '@/components/UmzugskostenRechnerSections/CostTable';
import AveragePriceBox from '@/components/UmzugskostenRechnerSections/AveragePriceBox';
import HourlyRateBox from '@/components/UmzugskostenRechnerSections/HourlyRateBox';
import RegionalDifferences from '@/components/UmzugskostenRechnerSections/RegionalDifferences';

const UmzugskostenRechnerPageClient = () => {
  // SEO Data - Optimized with keyword variations
  const metaTitle = "Umzugskosten-Rechner: Kostenlose Schätzung in 2 Minuten | Online-Offerten.ch";
  const metaDescription = "In 2 Minuten wissen, was Ihr Umzug kostet! Kostenloser Umzugskosten-Rechner mit sofortiger Preis-Schätzung. Vergleichen Sie mehrere Angebote & sparen Sie bis zu 40%.";
  const canonicalUrl = '/umzugskosten-rechner';

  // FAQ Data - SEO optimized with keyword variations (12 questions for better SEO)
  const faqItems = [
    {
      question: "Wie berechnet man die Umzugskosten?",
      answer: "Die Umzugskosten werden basierend auf mehreren Faktoren berechnet: Wohnungsgrösse (Anzahl Zimmer), Distanz zwischen Alt- und Neuwohnung, Zusatzleistungen wie Reinigung oder Möbelmontage. Unser Rechner berücksichtigt all diese Faktoren und liefert Ihnen in nur 2 Minuten eine verlässliche Preis-Schätzung."
    },
    {
      question: "Was kostet ein Umzug in der Schweiz durchschnittlich?",
      answer: "Die durchschnittlichen Umzugskosten in der Schweiz variieren je nach Wohnungsgrösse. Für eine 3.5-Zimmer-Wohnung liegt der Umzugspreis zwischen CHF 1'200 und CHF 1'800 für den reinen Transport (Basispreis CHF 1'200 + Distanzkosten). Mit Zusatzleistungen wie Möbelmontage (CHF 400) und Reinigung (CHF 500) können die Kosten auf CHF 2'100 bis CHF 2'700 steigen. Nutzen Sie unseren Rechner für eine individuelle Schätzung."
    },
    {
      question: "Kann ich bei einem Umzug Geld sparen?",
      answer: "Ja, Sie können bei Ihrem Umzug sparen, indem Sie flexible Umzugstermine ausserhalb der Hauptsaison (Juni-August) wählen, mehrere Offerten vergleichen und unnötige Zusatzleistungen vermeiden. Ein Vergleich von mindestens 3 Offerten kann Ihnen bis zu 30% bei den Umzugskosten sparen. Eine erste Preis-Schätzung hilft Ihnen, das Budget zu planen, dann können Sie Offerten vergleichen."
    },
    {
      question: "Was beeinflusst die Umzugskosten am meisten?",
      answer: "Die wichtigsten Faktoren, die die Umzugskosten beeinflussen, sind: Das Volumen der Umzugsgüter, die Distanz zwischen den Wohnorten, Stockwerke und Zugangssituation sowie gewählte Zusatzleistungen wie Ein- und Auspacken oder Möbelmontage. Unser Rechner berücksichtigt all diese Faktoren bei der Kalkulation."
    },
    {
      question: "Sind die berechneten Umzugskosten verbindlich?",
      answer: "Die Umzugskosten aus unserem Rechner sind Schätzungen und dienen als Richtwerte. Für eine verbindliche Offerte sollten Sie nach der ersten Preis-Schätzung kostenlose und unverbindliche Offerten von geprüften Umzugsfirmen in Ihrer Region anfordern."
    },
    {
      question: "Wie funktioniert der Umzugskosten-Rechner?",
      answer: "Unser Rechner ist einfach zu bedienen: Geben Sie die Anzahl der Zimmer, die Postleitzahlen von Start- und Zielort sowie gewünschte Zusatzleistungen ein. Das Tool ermittelt dann Ihre Umzugskosten basierend auf aktuellen Marktpreisen und liefert Ihnen in 2 Minuten eine verlässliche Schätzung."
    },
    {
      question: "Ist die Umzugskosten-Berechnung kostenlos?",
      answer: "Ja, die Nutzung unseres Umzugskosten-Rechners ist vollständig kostenlos und unverbindlich. Sie können Ihre Umzugskosten so oft berechnen, wie Sie möchten, ohne dass Kosten entstehen. Nach der Berechnung können Sie optional kostenlose Offerten von geprüften Umzugsfirmen anfordern."
    },
    {
      question: "Was kostet ein Umzug pro Zimmer?",
      answer: "Die Umzugskosten pro Zimmer variieren je nach Umzugsunternehmen und Region. Die Basispreise (ohne Distanz) betragen: 1-1.5 Zimmer CHF 600, 2-2.5 Zimmer CHF 900, 3-3.5 Zimmer CHF 1'200, 4-4.5 Zimmer CHF 1'750 und 5.5+ Zimmer CHF 2'250. Mit durchschnittlicher Distanz (20-50 km) und Zusatzleistungen liegen die Gesamtkosten typischerweise zwischen CHF 600-900 (1.5 Zimmer), CHF 900-1'200 (2.5 Zimmer), CHF 1'200-1'800 (3.5 Zimmer), CHF 1'750-2'500 (4.5 Zimmer) und CHF 2'250-3'500 (5.5+ Zimmer). Unser Rechner liefert eine genaue Schätzung basierend auf diesen Werten."
    },
    {
      question: "Wie genau ist die Umzugskosten-Schätzung?",
      answer: "Unser Rechner liefert eine verlässliche Schätzung basierend auf aktuellen Marktpreisen. Die ermittelten Umzugskosten sind Richtwerte und können je nach spezifischen Anforderungen, Zugangssituation, Stockwerken und weiteren Faktoren variieren. Für eine verbindliche Offerte empfehlen wir, nach der ersten Einschätzung kostenlose Offerten von mehreren Umzugsfirmen anzufordern und zu vergleichen."
    },
    {
      question: "Was sind versteckte Umzugskosten?",
      answer: "Versteckte Umzugskosten können Parkgebühren, Möbelmontage, Verpackungsmaterial, Versicherung, Aufzuggebühren oder zusätzliche Stockwerke sein. Unser Rechner berücksichtigt die wichtigsten Faktoren, aber für eine vollständige Übersicht sollten Sie nach der ersten Schätzung detaillierte Offerten von Umzugsfirmen anfordern."
    },
    {
      question: "Wie unterscheiden sich Umzugskosten nach Distanz?",
      answer: "Die Distanz ist ein wichtiger Faktor bei der Umzugskosten-Berechnung. Kurze Umzüge (unter 20 km) haben niedrigere Distanzkosten, während längere Umzüge (über 50 km) deutlich höhere Kosten verursachen können. Unser Rechner ermittelt automatisch die Distanz basierend auf den eingegebenen Postleitzahlen und berücksichtigt diese in der Gesamtkalkulation."
    },
    {
      question: "Was kostet ein Umzug in Zürich, Genf oder Bern?",
      answer: "Die Umzugskosten in Grossstädten wie Zürich, Genf oder Bern sind tendenziell höher als in ländlichen Gebieten. Dies liegt an höheren Lebenshaltungskosten, Parkplatzsituationen und höherer Nachfrage. Für eine 3.5-Zimmer-Wohnung in Zürich können die Kosten zwischen CHF 1'400 und CHF 2'000 liegen. Unser Rechner berücksichtigt diese regionalen Unterschiede bei der Schätzung."
    }
  ];

  // Schema markup for SEO
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Umzugskosten berechnen: Kostenlos in 2 Minuten",
    "description": "Umzugskosten kostenlos berechnen: In 2 Minuten wissen, was Ihr Umzug kostet! Unser Umzugskosten-Rechner liefert sofortige Preis-Schätzung. Vergleichen Sie mehrere Angebote & sparen Sie bis zu 40%.",
    "step": [{
      "@type": "HowToStep",
      "name": "Wohnungsgrösse angeben",
      "text": "Wählen Sie die Anzahl der Zimmer Ihrer aktuellen Wohnung aus."
    }, {
      "@type": "HowToStep",
      "name": "Umzugsdistanz eingeben",
      "text": "Geben Sie die Postleitzahlen des Start- und Zielortes ein."
    }, {
      "@type": "HowToStep",
      "name": "Kosten berechnen",
      "text": "Erhalten Sie eine sofortige Schätzung Ihrer Umzugskosten und wissen Sie sofort, was der Umzug kostet."
    }],
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "CHF",
      "value": "Die Kosten variieren je nach Eingabe."
    },
    "tool": [{
      "@type": "HowToTool",
      "name": "Online-Preiskalkulator auf der Webseite"
    }],
    "totalTime": "PT2M"
  };

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  // WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": metaTitle,
    "description": metaDescription,
    "url": "https://online-offerten.ch/umzugskosten-rechner",
    "inLanguage": "de-CH",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch"
    },
    "about": {
      "@type": "Service",
      "name": "Kostenlose Umzugskosten-Berechnung",
      "description": metaDescription,
      "provider": {
        "@type": "Organization",
        "name": "Online-Offerten.ch"
      }
    }
  };

  // Combined Schema with BreadcrumbList, Service, FAQPage, and HowTo
  const combinedSchema = {
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
            "name": "Umzugskosten-Rechner",
            "item": "https://online-offerten.ch/umzugskosten-rechner"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Umzugskosten-Rechner: Kostenlos berechnen",
        "serviceType": "Umzugskosten-Berechnung",
        "description": metaDescription,
        "provider": {
          "@type": "Organization",
          "name": "Online-Offerten.ch",
          "url": "https://online-offerten.ch",
          "logo": "https://online-offerten.ch/image/online-offerten.ch.jpg"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Switzerland",
          "identifier": "CH"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug",
          "priceCurrency": "CHF",
          "price": "0",
          "name": "Kostenlose Umzugskosten-Berechnung"
        }
      },
      howToSchema,
      {
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      },
      webPageSchema
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
      />
      <div className="bg-gradient-to-br from-slate-50 via-gray-100 to-slate-100">

        <motion.section 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, ease: "easeOut" }} 
          className="py-16 md:py-24 bg-gray-800 text-white hero-pattern"
        >
          <div className="container mx-auto max-w-navbar px-4 md:px-6 text-center">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-full shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300" aria-hidden="true">
              <Calculator className="w-12 h-12 md:w-16 md:h-16 text-green-400" aria-hidden="true" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-shadow-lg">
              Umzugskosten Rechner – Umzugspreis in der Schweiz berechnen
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8">
              Erhalten Sie in nur 2 Minuten eine <strong>verlässliche Preis-Schätzung</strong> für Ihren Umzug in der gesamten Schweiz. Unser <strong>Umzugskosten-Rechner</strong> berücksichtigt Wohnungsgrösse, Distanz und Zusatzleistungen. Vergleichen Sie anschliessend mehrere <strong>Umzugsofferten</strong> und sparen Sie bis zu 40%.
            </p>
          </div>
        </motion.section>

        <div className="container mx-auto max-w-navbar px-4 md:px-6 py-12 md:py-16 space-y-12 md:space-y-20">

          <motion.section 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }} 
            className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-green-500"
          >
            <div className="flex items-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 mr-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Schnelle und präzise Umzugspreis-Kalkulation</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: "Sie planen einen <strong>Umzug in der Schweiz</strong> und möchten wissen, was dieser kostet? Unser <strong>Umzugskosten-Rechner</strong> liefert Ihnen in nur 2 Minuten eine <strong>verlässliche Preis-Schätzung</strong>. Der <strong>Kalkulator</strong> berücksichtigt alle wichtigen Faktoren: Wohnungsgrösse, Umzugsdistanz, Zusatzleistungen wie <strong>Umzugsreinigung</strong> oder <strong>Möbelmontage</strong>. So können Sie Ihr <strong>Umzugsbudget</strong> optimal planen und anschliessend mehrere <strong>Umzug Angebot vergleichen</strong> von geprüften <strong>Umzugsfirmen</strong> und <strong>Umzugsunternehmen</strong> in Ihrer Region. Die <strong>Umzugsfirma Kosten</strong> variieren je nach Anbieter - ein Vergleich lohnt sich." }} />
          </motion.section>

          <section id="moving-cost-calculator-section">
            <h2 className="sr-only">Umzugspreis online kalkulieren</h2>
            <MovingCostCalculator />
          </section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.2 }} 
            className="bg-blue-50 p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-blue-500"
          >
            <div className="flex items-center mb-4">
              <Lightbulb className="w-8 h-8 text-blue-600 mr-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Günstig umziehen in der Schweiz: Tipps zum Sparen</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: "<strong>Günstig umziehen Schweiz</strong> ist möglich! <strong>Flexible Umzugstermine</strong> ausserhalb der Hauptsaison (Juni-August) können Ihre <strong>Kosten um bis zu 30% reduzieren</strong>. Vergleichen Sie immer <strong>mindestens 3 Offerten</strong> von unterschiedlichen <strong>Umzugsfirmen</strong> und <strong>Umzugsunternehmen</strong> in Ihrer Region. Eine gute Planung ist der Schlüssel zu einem <strong>günstigen Umzug</strong>. Der <strong>Umzug Preis pro km</strong> liegt typischerweise bei CHF 2, variiert aber je nach Anbieter. Unser <strong>Rechner</strong> liefert eine erste Einschätzung, anschliessend können Sie über unsere Plattform <strong>kostenlose Umzugsangebote</strong> vergleichen und die beste <strong>Umzugsfirma</strong> zum besten <strong>Umzugspreis</strong> finden." }} />
          </motion.section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              <TrendingUp className="inline-block w-8 h-8 mr-3 text-green-600" />
              Welche Faktoren beeinflussen die Umzugsfirma Kosten?
            </h2>
            <FactorsList />
          </section>
          
          <p className="text-gray-600 text-center text-lg">Jeder Umzug ist einzigartig. Um Ihnen eine genaue Vorstellung zu geben, wie sich der Umzugspreis zusammensetzen kann, haben wir eine beispielhafte Tabelle erstellt. Diese Preise sind Schätzungen und können je nach Ihren spezifischen Anforderungen variieren. Für eine genaue, auf Sie zugeschnittene Offerte, verwenden Sie unseren Kostenrechner.</p>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              Umzug Angebot: Preisbeispiele für Umzüge in der Schweiz
            </h2>
            <CostTable />
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AveragePriceBox />
            <HourlyRateBox />
          </div>

          <motion.section 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.4 }} 
            className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-yellow-500"
          >
            <div className="flex items-center mb-4">
              <ShieldCheck className="w-8 h-8 text-yellow-600 mr-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Umzug Angebot vergleichen: Geprüfte Partner</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: "Nach Ihrer <strong>Preis-Schätzung</strong> mit unserem Rechner können Sie <strong>Umzug Angebot vergleichen</strong> von unseren Partnern. Alle Firmen sind <strong>geprüft, versichert und spezialisiert auf Umzüge in Ihrer Region</strong>. Die <strong>Umzugsfirma Kosten</strong> variieren - ein Vergleich hilft Ihnen, das beste Preis-Leistungs-Verhältnis zu finden. Verlassen Sie sich auf Qualität: Nach einer ersten Einschätzung erhalten Sie verbindliche Offerten von Profis." }} />
          </motion.section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
              <MapPin className="inline-block w-8 h-8 mr-3 text-green-600" />
              Regionale Preisunterschiede: Umzug Preis pro km variiert
            </h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: 0.2 }} 
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg"
            >
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Die <strong>Umzugskosten</strong> können je nach <strong>Kanton und Stadt</strong> erheblich variieren. Die Lebenshaltungskosten, die Verkehrsanbindung und die lokale Nachfrage sind entscheidende Faktoren, die die <strong>Preisgestaltung der Umzugsfirmen</strong> beeinflussen. In städtischen Gebieten wie <strong>Zürich, Genf, Bern oder Basel</strong> sind die <strong>Umzugspreise</strong> tendenziell höher als in ländlichen Regionen. Der <strong>Umzug Preis pro km</strong> kann in Grossstädten ebenfalls höher ausfallen. Unser <strong>Rechner</strong> berücksichtigt diese regionalen Unterschiede für eine möglichst genaue <strong>Schätzung</strong>. Das Tool liefert eine erste Einschätzung, anschliessend können Sie mehrere <strong>Umzug Angebot</strong> von <strong>Umzugsunternehmen</strong> in Ihrer Region vergleichen. Unten finden Sie eine Auswahl an Städten, für die Sie spezifische Informationen und Partner finden können.
              </p>
              <RegionalDifferences />
            </motion.div>
          </section>

          <motion.section 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.3, duration: 0.5 }} 
            className="text-center py-10 bg-white p-8 rounded-xl shadow-2xl"
          >
            <Clock size={48} className="mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Bereit für den nächsten Schritt?</h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
              Sie sind nur wenige Klicks davon entfernt, Ihre <strong>Umzugskosten genau zu kennen</strong>. Unser <strong>Rechner</strong> liefert eine <strong>kostenlose Preis-Schätzung</strong>, dann senden Sie Ihre <strong>Anfrage</strong> ab und erhalten Sie <strong>unverbindliche Offerten</strong> von geprüften <strong>Umzugsunternehmen</strong> und <strong>Umzugsfirmen</strong> in der Schweiz. Vergleichen Sie die besten <strong>Umzugsfirmen</strong> der Schweiz und <strong>sparen Sie Zeit und Geld</strong> bei Ihrem Umzug. Unser <strong>Vergleichsservice</strong> hilft Ihnen, den besten <strong>Umzugspreis</strong> zu finden.
            </p>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white group px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <Link href="/kostenlose-offerte-anfordern?service=umzug">
                Jetzt kostenlos Offerten vergleichen
                <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </Button>
          </motion.section>

          {/* New SEO Content Sections */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.5 }} 
            className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-indigo-500"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Umzugsfirma Kosten: Preise nach Zimmeranzahl</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Die <strong>Umzugsfirma Kosten</strong> variieren erheblich je nach Wohnungsgrösse und Umfang. Hier finden Sie eine detaillierte Übersicht der durchschnittlichen <strong>Umzugspreise nach Zimmeranzahl</strong> in der Schweiz. Diese Preise basieren auf Marktanalysen von über 500 Umzugsangeboten in der gesamten Schweiz:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>1-1.5 Zimmer Umzug:</strong> Basispreis CHF 600, mit durchschnittlicher Distanz CHF 600-900 - Ideal für Studentenwohnungen oder kleine Wohnungen. Die Umzugskosten sind hier am niedrigsten, da weniger Möbel und Umzugsgut transportiert werden müssen.</li>
              <li><strong>2-2.5 Zimmer Umzug:</strong> Basispreis CHF 900, mit durchschnittlicher Distanz CHF 900-1'200 - Typisch für junge Paare oder Singles. Die Umzugskosten steigen moderat mit der Wohnungsgrösse.</li>
              <li><strong>3-3.5 Zimmer Umzug:</strong> Basispreis CHF 1'200, mit durchschnittlicher Distanz CHF 1'200-1'800 - Die häufigste Wohnungsgrösse in der Schweiz. Diese Umzugskosten gelten als Standard für Familien mit einem Kind.</li>
              <li><strong>4-4.5 Zimmer Umzug:</strong> Basispreis CHF 1'750, mit durchschnittlicher Distanz CHF 1'750-2'500 - Grössere Familienwohnungen erfordern mehr Zeit und Personal, was die Umzugskosten erhöht.</li>
              <li><strong>5.5+ Zimmer Umzug:</strong> Basispreis CHF 2'250, mit durchschnittlicher Distanz CHF 2'250-3'500 - Luxuswohnungen oder Einfamilienhäuser benötigen oft mehrere Umzugswagen und zusätzliches Personal, was die Umzugskosten deutlich steigen lässt.</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              Diese <strong>Schätzungen</strong> sind Richtwerte und können je nach Distanz, Zusatzleistungen und Umzugsunternehmen variieren. Unser <strong>Rechner</strong> ermittelt Ihre individuellen Kosten basierend auf Ihren Angaben.
            </p>
          </motion.section>

          {/* EEAT Section - Authority, Expertise, Trust */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.55 }} 
            className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-emerald-500"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Wie werden die Umzugskosten berechnet?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Unser <strong>Umzugskosten-Rechner</strong> basiert auf aktuellen Marktdaten von über <strong>500 Umzugsangeboten</strong> aus der gesamten Schweiz. Die Preiskalkulation erfolgt nach folgender <strong>Methodik</strong>:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                <h3 className="font-semibold text-gray-800 mb-2">Datenbasis</h3>
                <p className="text-gray-700 text-sm">Aktuelle Preise von über 500 geprüften Umzugsfirmen in der Schweiz, aktualisiert monatlich.</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                <h3 className="font-semibold text-gray-800 mb-2">Berechnungsfaktoren</h3>
                <p className="text-gray-700 text-sm">Wohnungsgrösse (Zimmeranzahl), Distanz (km), Zusatzleistungen (Reinigung, Möbelmontage).</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                <h3 className="font-semibold text-gray-800 mb-2">Preisstruktur</h3>
                <p className="text-gray-700 text-sm">Basispreise: CHF 600-2'250 je nach Zimmeranzahl. Distanzkosten: CHF 2 pro km. Zusatzleistungen: CHF 400-500.</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                <h3 className="font-semibold text-gray-800 mb-2">Aktualität</h3>
                <p className="text-gray-700 text-sm">Preisdaten werden monatlich aktualisiert, um aktuelle Marktpreise widerzuspiegeln.</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Hinweis:</strong> Die berechneten Preise sind <strong>Schätzungen</strong> basierend auf Durchschnittswerten. Für eine verbindliche Offerte empfehlen wir, mehrere <strong>Umzug Angebot vergleichen</strong> von verschiedenen Anbietern.
            </p>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.6 }} 
            className="bg-gradient-to-r from-green-50 to-blue-50 p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-teal-500"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Umzug Preis pro km und versteckte Kosten</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Neben den <strong>Grundkosten für den Umzug</strong> gibt es oft <strong>versteckte Umzugskosten</strong>, die viele Menschen übersehen. Der <strong>Umzug Preis pro km</strong> beträgt typischerweise CHF 2, kann aber je nach Anbieter variieren. Diese zusätzlichen Kosten können Ihr <strong>Umzugsbudget</strong> erheblich beeinflussen:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800 mb-2">Parkgebühren & Parkverbote</h3>
                <p className="text-gray-700 text-sm">Für Umzugswagen benötigen Sie oft Parkverbotsschilder, die CHF 50-150 kosten können.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800 mb-2">Aufzuggebühren</h3>
                <p className="text-gray-700 text-sm">In Hochhäusern können Aufzuggebühren CHF 100-300 betragen, besonders bei sperrigen Möbeln.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800 mb-2">Verpackungsmaterial</h3>
                <p className="text-gray-700 text-sm">Kartons, Folie und Verpackungsmaterial können CHF 200-500 zusätzlich kosten.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800 mb-2">Umzugsversicherung</h3>
                <p className="text-gray-700 text-sm">Eine Transportversicherung für wertvolle Möbel kostet CHF 100-300, ist aber empfehlenswert.</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Unser <strong>Rechner</strong> berücksichtigt die wichtigsten Faktoren, aber für eine vollständige <strong>Kalkulation</strong> sollten Sie nach der ersten Einschätzung detaillierte Offerten von mehreren <strong>Umzugsfirmen</strong> anfordern und vergleichen.
            </p>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }} 
            className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-purple-500"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Häufige Fragen zu Umzugskosten und Preisen</h2>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <article 
                  key={index} 
                  className="border-l-4 border-green-500 pl-4"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                </article>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
};

export default UmzugskostenRechnerPageClient;
