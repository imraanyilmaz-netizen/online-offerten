import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, ArrowRight, MapPin, Clock, CheckCircle, Lightbulb, ShieldCheck } from 'lucide-react';
import MovingCostCalculator from '@/components/UmzugskostenRechnerSections/MovingCostCalculator';
import SectionTitle from '@/components/UmzugskostenRechnerSections/SectionTitle';
import FactorsList from '@/components/UmzugskostenRechnerSections/FactorsList';
import CostTable from '@/components/UmzugskostenRechnerSections/CostTable';
import AveragePriceBox from '@/components/UmzugskostenRechnerSections/AveragePriceBox';
import HourlyRateBox from '@/components/UmzugskostenRechnerSections/HourlyRateBox';
import RegionalDifferences from '@/components/UmzugskostenRechnerSections/RegionalDifferences';

const UmzugskostenRechnerPage = () => {
  // SEO Data
  const metaTitle = "Was kostet ein Umzug? - Umzugskosten Umzugsfirma Vergleichen";
  const metaDescription = "⏱️ In 2 Minuten wissen, was Ihr Umzug kostet! Kostenloser Umzugskosten-Rechner mit sofortiger Preis-Schätzung. Vergleichen Sie Offerten & sparen Sie bis zu 40%.";
  const metaKeywords = "umzugskosten berechnen, kosten für den umzug, umzugsbudget, preiskalkulator, kostenlose umzugsschätzung, was kostet mein umzug, umzugspreis sofort wissen, kostenlose umzugsangebote, umzugskosten rechner, umzugskosten schweiz, umzugskosten online berechnen, umzugskosten kalkulator, umzugspreis berechnen, umzugskosten schätzen, umzugskosten rechner schweiz, umzugskosten vergleichen, günstige umzugskosten, umzugskosten pro zimmer, umzugskosten pro km";
  const canonicalUrl = "https://online-offerten.ch/umzugskosten-rechner";

  // FAQ Data
  const faqItems = [
    {
      question: "Wie berechnet man die Umzugskosten?",
      answer: "Die Umzugskosten werden basierend auf mehreren Faktoren berechnet: Wohnungsgrösse (Anzahl Zimmer), Distanz zwischen Alt- und Neuwohnung, Zusatzleistungen wie Reinigung oder Möbelmontage. Unser kostenloser Umzugskosten-Rechner berücksichtigt all diese Faktoren und liefert Ihnen in nur 2 Minuten eine verlässliche Schätzung."
    },
    {
      question: "Was kostet ein Umzug in der Schweiz durchschnittlich?",
      answer: "Die durchschnittlichen Umzugskosten in der Schweiz variieren je nach Wohnungsgrösse. Für eine 3.5-Zimmer-Wohnung liegen die Kosten zwischen CHF 1'200 und CHF 1'800 für den reinen Transport. Mit Zusatzleistungen wie Möbelmontage und Reinigung können die Kosten auf CHF 2'200 bis CHF 3'200 steigen."
    },
    {
      question: "Kann ich bei einem Umzug Geld sparen?",
      answer: "Ja, Sie können bei Ihrem Umzug sparen, indem Sie flexible Umzugstermine ausserhalb der Hauptsaison (Juni-August) wählen, mehrere Offerten vergleichen und unnötige Zusatzleistungen vermeiden. Ein Vergleich von mindestens 3 Offerten kann Ihnen bis zu 30% sparen."
    },
    {
      question: "Was beeinflusst die Umzugskosten am meisten?",
      answer: "Die wichtigsten Faktoren sind: Das Volumen der Umzugsgüter, die Distanz zwischen den Wohnorten, Stockwerke und Zugangssituation sowie gewählte Zusatzleistungen wie Ein- und Auspacken oder Möbelmontage."
    },
    {
      question: "Sind die berechneten Kosten verbindlich?",
      answer: "Die Kosten aus unserem Rechner sind Schätzungen und dienen als Richtwerte. Für eine verbindliche Offerte sollten Sie kostenlose und unverbindliche Offerten von geprüften Umzugsfirmen in Ihrer Region anfordern."
    }
  ];

  // Schema markup for SEO
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Umzugskosten 2024 berechnen » Kostenlose Schätzung & Offerten",
    "description": "⏱️ In 2 Minuten wissen, was Ihr Umzug kostet! Kostenloser Umzugskosten-Rechner mit sofortiger Preis-Schätzung. Vergleichen Sie Offerten & sparen Sie bis zu 40%.",
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
      "text": "Erhalten Sie eine sofortige Schätzung Ihrer Umzugskosten und wissen Sie sofort, was Ihr Umzug kostet."
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
    "url": canonicalUrl,
    "inLanguage": "de",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch"
    },
    "about": {
      "@type": "Service",
      "name": "Umzugskosten-Rechner",
      "description": metaDescription,
      "provider": {
        "@type": "Organization",
        "name": "Online-Offerten.ch"
      }
    }
  };

  // Main schema for SEO component (HowTo is most important for this page)
  const schemaData = howToSchema;

  return (
    <>
      
      {/* Additional Schema Markup for FAQ and WebPage */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(webPageSchema)}
        </script>
      </Helmet>
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
              Was kostet ein Umzug?
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8">
              Unser Umzugskosten-Rechner gibt Ihnen eine schnelle und verlässliche Schätzung. Geben Sie einfach Ihre Daten ein und erhalten Sie in Sekunden einen Richtpreis für Ihren Umzug in der Schweiz.
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
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Umzugskosten sofort berechnen</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: "Sie planen einen Umzug und möchten <strong>kostenlos eine erste Preis-Indikation</strong> erhalten? Unser Preiskalkulator liefert Ihnen in <strong>nur 2 Minuten eine verlässliche Schätzung</strong> für Ihren Umzug in der gesamten Schweiz. So können Sie Ihr Umzugsbudget besser planen und wissen sofort, was Ihr Umzug kostet." }} />
          </motion.section>

          <section id="moving-cost-calculator-section">
            <h2 className="sr-only">Umzugskosten online berechnen</h2>
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
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">So sparen Sie bei Ihrem Umzug</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: "<strong>Flexible Umzugstermine</strong> außerhalb der Hauptsaison (Juni-August) können Ihre <strong>Kosten für den Umzug um bis zu 30% reduzieren</strong>. Vergleichen Sie immer <strong>mindestens 3 Offerten</strong> von unterschiedlichen Umzugsfirmen in Ihrer Region. Eine gute Planung ist der Schlüssel zu einem günstigen Umzug. Nutzen Sie unsere Plattform, um mühelos kostenlose Umzugsangebote zu erhalten." }} />
          </motion.section>

          <section>
            <SectionTitle icon={<TrendingUp />} title="Welche Faktoren beeinflussen die Umzugskosten?" />
            <FactorsList />
          </section>
          
          <p className="text-gray-600 text-center text-lg">Jeder Umzug ist einzigartig. Um Ihnen eine genaue Vorstellung zu geben, wie sich die Kosten für den Umzug zusammensetzen können, haben wir eine beispielhafte Tabelle erstellt. Diese Preise sind Schätzungen und können je nach Ihren spezifischen Anforderungen variieren. Für eine genaue, auf Sie zugeschnittene Offerte, nutzen Sie unseren Kostenrechner.</p>

          <section>
            <SectionTitle icon={null} title="Preisbeispiele für Umzüge in der Schweiz" />
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
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Sicherheit durch geprüfte Umzugspartner</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: "Nach Ihrer <strong>kostenlosen Preiskalkulation</strong> erhalten Sie <strong>persönliche Offerten von unseren Partnern</strong>. Alle Firmen sind <strong>geprüft, versichert und spezialisiert auf Umzüge in Ihrer Region</strong>. Verlassen Sie sich auf Qualität und erhalten Sie eine kostenlose Umzugsschätzung von Profis." }} />
          </motion.section>

          <section>
            <SectionTitle icon={<MapPin />} title="Regionale Preisunterschiede" />
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: 0.2 }} 
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg"
            >
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Der Umzugspreis kann je nach Kanton und Stadt variieren. Die Lebenshaltungskosten, die Verkehrsanbindung und die lokale Nachfrage sind entscheidende Faktoren, die die Preisgestaltung der Umzugsfirmen beeinflussen. In städtischen Gebieten wie Zürich oder Genf sind die Preise tendenziell höher als in ländlichen Regionen. Unser Preiskalkulator berücksichtigt diese Unterschiede, um Ihnen eine möglichst genaue Schätzung zu liefern. Unten finden Sie eine Auswahl an Städten, für die Sie spezifische Informationen und Partner finden können.
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
              Sie sind nur wenige Klicks davon entfernt, Ihr Umzugsbudget genau zu kennen. Starten Sie jetzt Ihre kostenlose Anfrage und erhalten Sie unverbindliche Offerten. Vergleichen Sie die besten Umzugsunternehmen der Schweiz und sparen Sie Zeit und Geld.
            </p>
            <Button asChild size="xl" className="bg-green-600 hover:bg-green-700 text-white group px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <Link href="/kostenlose-offerte-anfordern?service=umzug">
                Jetzt kostenlos Offerten vergleichen
                <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </Button>
          </motion.section>

          {/* FAQ Section for SEO */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-purple-500"
            itemScope
            itemType="https://schema.org/FAQPage"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Häufige Fragen zu Umzugskosten</h2>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <article 
                  key={index} 
                  className="border-l-4 border-green-500 pl-4"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <h3 
                    className="text-lg md:text-xl font-semibold text-gray-800 mb-2"
                    itemProp="name"
                  >
                    {item.question}
                  </h3>
                  <div 
                    itemScope
                    itemType="https://schema.org/Answer"
                    itemProp="acceptedAnswer"
                  >
                    <p 
                      className="text-gray-700 leading-relaxed"
                      itemProp="text"
                    >
                      {item.answer}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
};

export default UmzugskostenRechnerPage;
