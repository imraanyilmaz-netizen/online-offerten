'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Framer Motion removed for better performance
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Calculator, CheckCircle, Star, AlertTriangle, Check, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CleaningCostCalculator from '@/components/ReinigungskostenRechnerSections/CleaningCostCalculator';



const ReinigungskostenRechnerPageClient = () => {
  const router = useRouter();

  const handleIntroCta = () => {
    // Rechner ist jetzt in der Hero-Sektion, kein Scroll nötig
    // Die Funktion kann für zukünftige Verwendung beibehalten werden
  };
  
  const handleConclusionCta = () => {
    router.push('/kostenlose-offerte-anfordern?service=reinigung');
  };

  // SEO Data - Updated for Endreinigung Wohnung Kosten
  const metaTitle = "Endreinigung Wohnung Kosten 2024: Ultimative Preis-Übersicht + 10 Spartipps";
  const metaDescription = "Endreinigung Wohnung Kosten 2024: Der komplette Schweizer Kostenguide für stressfreie Wohnungsübergabe. Detaillierte Preistabellen, regionale Unterschiede und 10 bewährte Spartipps die wirklich funktionieren. Bis zu 30% sparen durch Preisvergleich.";
  const canonicalUrl = '/reinigung/reinigungskosten';

  // FAQ Data - Updated with new questions from HTML content
  const faqItems = [
    {
      question: "Werden Wohnungsbesichtigungen durchgeführt und sind diese kostenfrei?",
      answer: "Ja, seriöse Reinigungsfirmen bieten bei unklarem Zustand oder starken Verschmutzungen eine kostenlose Vor-Ort-Besichtigung an. Dies ermöglicht eine präzise Kostenschätzung und verhindert Überraschungen bei der Endrechnung. Bei normal verschmutzten Wohnungen ist eine Besichtigung meist nicht nötig – die Kosten können anhand der Wohnungsgrösse und Angaben zum Zustand zuverlässig kalkuliert werden. Die Besichtigung dient vor allem dazu, Sonderfälle wie Nikotinverschmutzung, starke Verkalkung oder Schäden zu identifizieren, die 50-80% höhere Kosten verursachen können."
    },
    {
      question: "Ist die Wohnungsübergabe am Umzugstag möglich?",
      answer: "Ja, viele Reinigungsfirmen bieten flexible Terminplanung an, sodass die Endreinigung am Umzugstag durchgeführt werden kann. Dies ist besonders praktisch, da Sie so direkt nach dem Auszug die Wohnung übergeben können. Wichtig ist jedoch eine frühzeitige Planung – mindestens 2-3 Wochen im Voraus buchen, um Express-Zuschläge von 15-30% zu vermeiden. Bei kurzfristigen Buchungen (unter 3 Tage) fallen oft höhere Kosten an. Die Reinigung erfolgt typischerweise nach dem Auszug der Möbel, sodass alle Bereiche gründlich gereinigt werden können."
    },
    {
      question: "Muss ich Reinigungsmittel bereitstellen?",
      answer: "Nein, professionelle Reinigungsfirmen bringen alle notwendigen Reinigungsmittel und Materialien mit. Dies ist im Fixpreis enthalten. Sie können jedoch eigene Reinigungsmittel stellen, wenn Sie spezielle Wünsche haben (z.B. umweltfreundliche Produkte) oder Allergien berücksichtigen müssen. Dies kann 30-50 CHF Ersparnis bringen – sprechen Sie dies vorher mit der Firma ab. Ökologische Reinigungsmittel kosten üblicherweise 10-15% mehr, sind aber bei Allergikern oder Familien mit Kindern empfehlenswert, da sie keine chemischen Rückstände hinterlassen."
    },
    {
      question: "Sind Sie beim Wohnungsabgabetermin nach der Reinigung anwesend?",
      answer: "Ja, seriöse Reinigungsfirmen sind idealerweise beim Wohnungsabgabetermin anwesend, um bei eventuellen Beanstandungen durch den Vermieter sofort reagieren zu können. Dies ist ein wichtiger Vorteil der Abnahmegarantie – bei Problemen wird kostenlos nachgebessert. Die Anwesenheit der Reinigungsfirma beim Abgabetermin erhöht die Erfolgsquote erheblich: Professionelle Firmen erreichen 95%+ Abnahme-Erfolg beim ersten Versuch, während bei Selbstreinigung die Quote bei etwa 70-75% liegt. Informieren Sie die Verwaltung über den Termin, damit die Übergabe koordiniert werden kann."
    },
    {
      question: "Welche typischen Fehler werden bei der Umzugsplanung gemacht und wie lassen sie sich vermeiden?",
      answer: "Häufige Fehler bei der Umzugsplanung sind: zu späte Buchung (führt zu Express-Zuschlägen von 15-30%), unklare Kommunikation über den Zustand der Wohnung (führt zu Preisnachverhandlungen), fehlende Abnahmegarantie (Risiko für Kautionsabzug), und mangelnde Vergleichsangebote (bis zu 30% Preisunterschied). Vermeiden Sie diese Fehler durch: frühzeitige Planung (3+ Wochen Vorlauf spart 15%), detaillierte Angaben zum Verschmutzungsgrad, Vergleich mehrerer Offerten, und Wahl einer Firma mit Abnahmegarantie. Planen Sie die Reinigung mindestens 2-3 Wochen im Voraus und vergleichen Sie mindestens 3 Angebote, um bis zu 30% zu sparen."
    },
    {
      question: "Welche Vorzüge bietet ein Vollservice-Umzug im Vergleich zu Teilservice oder Eigenleistung?",
      answer: "Ein Vollservice-Umzug umfasst Verpackung, Transport, Möbelmontage und Endreinigung in einem Paket. Vorteile: Zeitersparnis (Sie müssen nichts selbst machen), professionelle Durchführung (95%+ Abnahme-Erfolg), Abnahmegarantie für die Reinigung, und oft günstigere Paketpreise (bis zu 20% Ersparnis). Teilservice bedeutet, dass Sie z.B. selbst packen, aber Transport und Reinigung überlassen. Eigenleistung ist am günstigsten, aber zeitaufwändig (15-20 Stunden) und risikoreicher (70-75% Abnahme-Quote). Für grössere Wohnungen (ab 3.5 Zimmer) oder bei Zeitdruck lohnt sich Vollservice meist mehr, da die echten Gesamtkosten (inkl. Opportunitätskosten) bei Eigenleistung oft höher sind als der Fixpreis einer professionellen Reinigung."
    },
    {
      question: "Welche Zahlungsoptionen stehen bei Umzügen zur Verfügung?",
      answer: "Bei Reinigungsservices ist der Standard: 50% Anzahlung bei Buchung, Rest nach erfolgreicher Abnahme durch Vermieter oder Verwaltung. Dies bietet Sicherheit für beide Seiten – die Firma hat Planungssicherheit, Sie zahlen den Restbetrag erst nach erfolgreicher Übergabe. Einige Firmen bieten auch Ratenzahlung oder Rechnungsstellung nach Abnahme an. Wichtig: Klären Sie die Zahlungsbedingungen bereits in der Offerte, um Überraschungen zu vermeiden. Seriöse Firmen bieten transparente Zahlungsbedingungen ohne versteckte Kosten. Bei Paketangeboten (Umzug + Reinigung) können andere Zahlungsmodalitäten vereinbart werden."
    },
    {
      question: "Wie läuft die Angebotserstellung ab und sind nachträgliche Änderungen möglich?",
      answer: "Die Angebotserstellung erfolgt in 3 einfachen Schritten: 1) Wohnungsdetails eingeben (Grösse, Zustand, gewünschte Extras wie Fenster oder Backofen), 2) Ihre Anfrage wird an bis zu 5 passende Reinigungsfirmen in Ihrer Region weitergeleitet, 3) Sie erhalten innerhalb von 24-48 Stunden transparente Fixpreis-Angebote per E-Mail. Der gesamte Prozess ist kostenlos und unverbindlich. Nachträgliche Änderungen sind meist möglich, sollten aber frühzeitig kommuniziert werden. Zusatzleistungen (z.B. Teppichreinigung, Fensterreinigung) können oft noch hinzugefügt werden, während Reduzierungen je nach Firma unterschiedlich gehandhabt werden. Sprechen Sie Änderungswünsche direkt mit der gewählten Firma ab."
    },
    {
      question: "Nach welchen Kriterien wird der Preis für den Reinigungsservice kalkuliert?",
      answer: "Der Preis wird nach 7 Hauptkriterien kalkuliert: 1) Verschmutzungsgrad (wichtigster Faktor – starke Verschmutzungen kosten bis zu 80% mehr), 2) Wohnungsgrösse und Zimmeranzahl (2.5 Zimmer: 390-580 CHF, 3.5 Zimmer: 530-920 CHF), 3) Zeitdruck und Express-Zuschläge (Wochenende: +25%, kurzfristig: +15-30%), 4) Sonderwünsche (Backofen: 80-120 CHF, Fenster: 15-35 CHF pro Stück), 5) Material-Qualität (ökologisch: +10-15%), 6) Stockwerk und Erreichbarkeit (ab 4. Stock ohne Lift: +50-80 CHF), 7) Saisonale Schwankungen (März-Juni teurer, November-Februar 10-15% günstiger). Die Küche macht 30-40% der Gesamtkosten aus. Regionale Unterschiede: Zürich und Genf +15-20%, ländliche Gebiete -10-20%."
    }
  ];

  // Schema markup for SEO
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Reinigungskosten berechnen: Kostenlos in 1 Minute",
    "description": "Reinigungskosten kostenlos berechnen: In 1 Minute wissen, was Ihre Reinigung kostet! Unser Reinigungskosten-Rechner liefert sofortige Preis-Schätzung für Umzugsreinigung, Wohnungsreinigung & mehr.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Immobilientyp & Zimmeranzahl",
        "text": "Wählen Sie die Art Ihrer Immobilie und die Anzahl der Zimmer."
      },
      {
        "@type": "HowToStep",
        "name": "Details zur Ausstattung",
        "text": "Geben Sie die Anzahl der Fenster, Badezimmer und Zusatzoptionen wie Balkon- oder Storenreinigung an."
      },
      {
        "@type": "HowToStep",
        "name": "Zustand angeben",
        "text": "Beschreiben Sie den Verschmutzungsgrad Ihrer Immobilie."
      },
      {
        "@type": "HowToStep",
        "name": "Kosten schätzen",
        "text": "Erhalten Sie eine sofortige, unverbindliche Schätzung der Reinigungskosten."
      }
    ],
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "CHF",
      "value": "Die Kosten variieren je nach Eingabe."
    },
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Online-Rechner auf der Webseite"
      }
    ],
    "totalTime": "PT1M"
  };

  // WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": metaTitle,
    "description": metaDescription,
    "url": "https://online-offerten.ch/reinigungskosten",
    "inLanguage": "de-CH",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch"
    },
    "about": {
      "@type": "Service",
      "name": "Reinigungskosten-Rechner",
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
            "name": "Reinigungskosten-Rechner",
            "item": "https://online-offerten.ch/reinigungskosten"
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Reinigungskosten-Rechner: Kostenlos berechnen",
        "serviceType": "Reinigungskosten-Berechnung",
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
          "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=reinigung",
          "priceCurrency": "CHF",
          "price": "0",
          "name": "Kostenlose Reinigungskosten-Berechnung"
        }
      },
      howToSchema,
      {
        "@type": "FAQPage",
        "mainEntity": faqItems && faqItems.length > 0 ? faqItems.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        })) : []
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
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative bg-white py-12 md:py-20 overflow-hidden">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-semibold text-sm mb-6">
                  <Calculator className="h-4 w-4 mr-2" />
                  Kostenloser Reinigungskosten-Rechner
                </div>
                <h1 className="heading-1">
                  <span className="block">Reinigungskosten berechnen:</span>
                  <span className="block text-blue-600 mt-2">Was kostet eine Reinigung in der Schweiz?</span>
                  <span className="block heading-4 text-gray-700 mt-4">
                    In nur 1 Minute eine verlässliche Schätzung
                  </span>
                </h1>
                <p className="text-body mb-6">
                  Erhalten Sie eine <strong>kostenlose Preis-Schätzung</strong> für Ihre Reinigung in der gesamten Schweiz. Unser <strong>Reinigungskosten-Rechner</strong> hilft Ihnen, die <strong>Kosten Reinigungsfirmen</strong> zu berechnen und zeigt Ihnen eine <strong>Reinigungskosten Tabelle</strong>. <strong>100% kostenlos und unverbindlich</strong>.
                </p>
                <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Verlässliche Schätzung</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <span>100% kostenlos</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Alle Faktoren berücksichtigt</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Bis zu 40% sparen</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl border-4 border-blue-200 overflow-hidden">
                  <CleaningCostCalculator />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16 space-y-12 md:space-y-20">

          {/* Intro Section */}
          <section
            className="bg-white p-6 md:p-10 rounded-xl shadow-lg"
          >
            <h2 className="heading-2">
              Der komplette Schweizer Kostenguide für stressfreie Wohnungsübergabe
            </h2>
            <p className="text-body mb-4 leading-relaxed">
              Die Mietkaution zurückzubekommen gehört für viele Schweizer Mieter zu den stressigsten Momenten beim Umzug. Studien zeigen, dass rund <strong>40% aller Kautionsabzüge</strong> direkt mit mangelhafter Endreinigung zusammenhängen. Das bedeutet: Tausende Franken bleiben jährlich bei Verwaltungen hängen, weil die Wohnungsübergabe nicht besenrein erfolgte.
            </p>
            <p className="text-body mb-4 leading-relaxed">
              Noch problematischer: <strong>73% der Mieter zahlen zu viel</strong> für ihre professionelle Endreinigung, weil sie weder die marktüblichen Preise kennen noch wissen, worauf bei der Offerte zu achten ist. Zwischen dem günstigsten und teuersten Anbieter liegen bei einer 3.5 Zimmer Wohnung schnell <strong>300-500 CHF Unterschied</strong> – bei identischer Leistung.
            </p>
            <p className="text-body leading-relaxed">
              Dieser ultimative Guide liefert Ihnen alles, was Sie über <Link href="/ratgeber/umzugsreinigung-beim-umzug" className="text-green-600 hover:text-green-700 font-semibold underline">Endreinigung Wohnung Kosten in der Schweiz</Link> wissen müssen: von detaillierten Preistabellen für jede Wohnungsgrösse über regionale Unterschiede zwischen <Link href="/reinigungsfirma/zuerich" className="text-green-600 hover:text-green-700 font-semibold underline">Zürich</Link>, <Link href="/reinigungsfirma/genf" className="text-green-600 hover:text-green-700 font-semibold underline">Genf</Link> und ländlichen Gebieten bis hin zu 10 bewährten Spartipps, die wirklich funktionieren. Nach diesem Artikel brauchen Sie keine weiteren Quellen mehr.
            </p>
          </section>

          {/* Warum Online-Offerten.ch wählen? */}
          <section
            className="bg-gradient-to-br from-blue-50 to-green-50 p-6 md:p-10 rounded-xl shadow-lg"
          >
            <h2 className="heading-2 text-center">
              Warum Online-Offerten.ch für Ihre Endreinigung wählen?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-white shadow-md hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Check className="w-6 h-6 text-green-600" />
                    <CardTitle className="text-xl font-bold">Geprüfte Schweizer Reinigungsfirmen mit Abnahmegarantie</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Ihre Kaution ist geschützt</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Check className="w-6 h-6 text-green-600" />
                    <CardTitle className="text-xl font-bold">Kostenlose, unverbindliche Offerten in 24h</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Schnelle Entscheidungsgrundlage</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Check className="w-6 h-6 text-green-600" />
                    <CardTitle className="text-xl font-bold">Bis zu 30% sparen durch Preisvergleich</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Mehrere Angebote, beste Wahl</p>
                </CardContent>
              </Card>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Unsere Partner-Reinigungsfirmen erfüllen strenge Qualitätsstandards: Betriebshaftpflichtversicherung, geschulte Reinigungskräfte und dokumentierte Reinigungsarbeiten. Der wichtigste Vorteil: Die Abnahmegarantie bedeutet, dass die Firma bei Beanstandungen durch den Vermieter kostenlos nachbessert.
            </p>
          </section>

          {/* Preisübersicht 2024 */}
          <section
            className="bg-white p-6 md:p-10 rounded-xl shadow-lg"
          >
            <h2 className="heading-2">
              Die komplette Preisübersicht 2024 für die Schweiz
            </h2>
            <h3 className="heading-3">
              Detaillierte Kostentabelle nach Wohnungsgrösse
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1.5 Zimmer */}
              <div className="border-l-4 border-blue-500 pl-6 bg-gray-50 p-4 rounded-r-lg">
                <h4 className="text-xl font-bold text-gray-800 mb-4">1.5 Zimmer Wohnung (30-45 m²)</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Grundreinigung: 180-280 CHF</li>
                  <li>Küchensonderreinigung: +70-90 CHF</li>
                  <li>Fenster (inkl. Rahmen): +40-60 CHF</li>
                  <li className="font-bold text-lg mt-3">Gesamtkosten: 290-430 CHF</li>
                </ul>
              </div>

              {/* 2.5 Zimmer */}
              <div className="border-l-4 border-green-500 pl-6 bg-gray-50 p-4 rounded-r-lg">
                <h4 className="text-xl font-bold text-gray-800 mb-4">2.5 Zimmer Wohnung (45-65 m²)</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Grundreinigung: 250-380 CHF</li>
                  <li>Küchensonderreinigung: +80-110 CHF</li>
                  <li>Fenster: +60-90 CHF</li>
                  <li className="font-bold text-lg mt-3">Gesamtkosten: 390-580 CHF</li>
                </ul>
              </div>

              {/* 3.5 Zimmer */}
              <div className="border-l-4 border-yellow-500 pl-6 bg-gray-50 p-4 rounded-r-lg">
                <h4 className="text-xl font-bold text-gray-800 mb-4">3.5 Zimmer Wohnung (65-85 m²)</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Grundreinigung: 350-480 CHF</li>
                  <li>Küchensonderreinigung: +100-140 CHF</li>
                  <li>Fenster: +80-120 CHF</li>
                  <li>Teppichreinigung (optional): +120-180 CHF</li>
                  <li className="font-bold text-lg mt-3">Gesamtkosten: 530-920 CHF</li>
                </ul>
              </div>

              {/* 4.5 Zimmer */}
              <div className="border-l-4 border-purple-500 pl-6 bg-gray-50 p-4 rounded-r-lg">
                <h4 className="text-xl font-bold text-gray-800 mb-4">4.5 Zimmer Wohnung (85-110 m²)</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Grundreinigung: 450-620 CHF</li>
                  <li>Küchensonderreinigung: +120-160 CHF</li>
                  <li>Fenster: +100-150 CHF</li>
                  <li className="font-bold text-lg mt-3">Gesamtkosten: 670-930 CHF</li>
                </ul>
              </div>

              {/* 5.5 Zimmer */}
              <div className="border-l-4 border-orange-500 pl-6 bg-gray-50 p-4 rounded-r-lg">
                <h4 className="text-xl font-bold text-gray-800 mb-4">5.5 Zimmer Wohnung (110-140 m²)</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Grundreinigung: 580-780 CHF</li>
                  <li>Küchensonderreinigung: +140-180 CHF</li>
                  <li>Fenster: +130-180 CHF</li>
                  <li className="font-bold text-lg mt-3">Gesamtkosten: 850-1'140 CHF</li>
                </ul>
              </div>

              {/* 6.5 Zimmer */}
              <div className="border-l-4 border-red-500 pl-6 bg-gray-50 p-4 rounded-r-lg">
                <h4 className="text-xl font-bold text-gray-800 mb-4">6.5 Zimmer Wohnung (140+ m²)</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Grundreinigung: 720-950 CHF</li>
                  <li>Küchensonderreinigung: +160-220 CHF</li>
                  <li>Fenster: +160-220 CHF</li>
                  <li className="font-bold text-lg mt-3">Gesamtkosten: 1'040-1'390 CHF</li>
                </ul>
              </div>
            </div>

            {/* Regionen-Vergleich */}
            <h3 className="heading-3 mb-6 mt-12">
              Regionen-Vergleich: Städte vs. Land
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-md">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-4 text-left font-bold text-gray-800 border border-gray-300">Region</th>
                    <th className="p-4 text-left font-bold text-gray-800 border border-gray-300">Preisaufschlag</th>
                    <th className="p-4 text-left font-bold text-gray-800 border border-gray-300">Beispiel 3.5 Zimmer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 border border-gray-300 font-semibold">Zürich</td>
                    <td className="p-4 border border-gray-300">+15-20%</td>
                    <td className="p-4 border border-gray-300">610-1'100 CHF</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 border border-gray-300 font-semibold">Genf/Lausanne</td>
                    <td className="p-4 border border-gray-300">+10-15%</td>
                    <td className="p-4 border border-gray-300">580-1'060 CHF</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 border border-gray-300 font-semibold">Basel</td>
                    <td className="p-4 border border-gray-300">+5-10%</td>
                    <td className="p-4 border border-gray-300">560-1'010 CHF</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 border border-gray-300 font-semibold">Bern</td>
                    <td className="p-4 border border-gray-300">Durchschnitt</td>
                    <td className="p-4 border border-gray-300">530-920 CHF</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-4 border border-gray-300 font-semibold">Ländliche Gebiete</td>
                    <td className="p-4 border border-gray-300">-10-20%</td>
                    <td className="p-4 border border-gray-300">425-735 CHF</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 mt-4 leading-relaxed">
              Die höheren Preise in Zürich und Genf erklären sich durch erhöhte Lohnkosten, teurere Parkgebühren und höhere Betriebskosten der Reinigungsfirmen. Bei der Anfahrt in ländliche Gebiete können hingegen Fahrtkostenpauschalen von 30-50 CHF anfallen.
            </p>
          </section>

          {/* So funktioniert die Offertanfrage */}
          <section
            className="bg-gradient-to-br from-green-50 to-blue-50 p-6 md:p-10 rounded-xl shadow-lg"
          >
            <h2 className="heading-2 text-center">
              So funktioniert die Offertanfrage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Wohnungsdetails eingeben</h3>
                <p className="text-gray-700">Grösse, Zustand, gewünschte Extras wie Fenster oder Backofen</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Bis zu 5 geprüfte Angebote erhalten</h3>
                <p className="text-gray-700">Innerhalb von 24 Stunden vergleichbare Offerten</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Beste Offerte auswählen und buchen</h3>
                <p className="text-gray-700">Direkt mit der Reinigungsfirma in Kontakt</p>
              </div>
            </div>
            <p className="text-gray-700 mt-6 text-center leading-relaxed">
              Der gesamte Prozess ist kostenlos und unverbindlich. Sie erhalten transparente Fixpreis-Angebote ohne versteckte Kosten.
            </p>
          </section>

          {/* 7 Faktoren */}
          <section
            className="bg-white p-6 md:p-10 rounded-xl shadow-lg"
          >
            <h2 className="heading-2">
              7 Faktoren die Ihre Kosten wirklich bestimmen
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="heading-3">1. Verschmutzungsgrad</h3>
                <p className="text-gray-700 leading-relaxed">
                  Der wichtigste Kostenfaktor überhaupt. Eine leicht verschmutzte Wohnung kostet eine professionelle Endreinigung bei 3.5 Zimmer etwa <strong>530 CHF</strong>, bei starken Verschmutzungen (Nikotin, Fett, Kalk) schnell <strong>850-950 CHF</strong>. Preisunterschied: bis zu 80%.
                </p>
              </div>
              <div>
                <h3 className="heading-3">2. Zeitdruck und Express-Zuschläge</h3>
                <p className="text-gray-700 leading-relaxed">
                  Wochenend-Reinigungen: <strong>+25% Aufschlag</strong>. Kurzfristige Buchungen (unter 3 Tage): <strong>+15-30%</strong>. Planen Sie Ihre <Link href="/reinigung/umzugsreinigung" className="text-green-600 hover:text-green-700 font-semibold underline">Umzugsreinigung</Link> mindestens 2-3 Wochen im Voraus.
                </p>
              </div>
              <div>
                <h3 className="heading-3">3. Sonderwünsche: Desinfektion, Entkalkung, Teppichreinigung</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Backofen-Intensivreinigung: 80-120 CHF</li>
                  <li>Kühlschrank-Desinfektion: 40-60 CHF</li>
                  <li>Kalkentfernung Badezimmer: 60-100 CHF</li>
                  <li>Teppichreinigung pro m²: 8-15 CHF</li>
                </ul>
              </div>
              <div>
                <h3 className="heading-3">4. Material-Qualität und Umweltfreundlichkeit</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ökologische Reinigungsmittel kosten <strong>10-15% mehr</strong>, hinterlassen aber keine chemischen Rückstände und sind bei Allergikern oder Familien mit Kindern empfehlenswert.
                </p>
              </div>
              <div>
                <h3 className="heading-3">5. Stockwerk und Erreichbarkeit</h3>
                <p className="text-gray-700 leading-relaxed">
                  Wohnungen ab dem 4. Stock ohne Lift: <strong>+50-80 CHF</strong> für erhöhten Aufwand beim Material-Transport. Fehlende Parkmöglichkeiten in der Nähe können ebenfalls Zusatzkosten verursachen.
                </p>
              </div>
              <div>
                <h3 className="heading-3">6. Saisonale Schwankungen</h3>
                <p className="text-gray-700 leading-relaxed">
                  <strong>März bis Juni</strong> (Hauptumzugssaison): Höchste Preise, längste Wartezeiten. <strong>November bis Februar</strong>: Bis zu 15% günstiger, bessere Verfügbarkeit.
                </p>
              </div>
              <div>
                <h3 className="heading-3">7. Firmenzertifizierungen und Versicherungen</h3>
                <p className="text-gray-700 leading-relaxed">
                  Zertifizierte Reinigungsfirmen mit Betriebshaftpflicht und Abnahmegarantie kosten typischerweise <strong>10-20% mehr</strong> als Gelegenheitsreiniger – bieten aber Rechtssicherheit und Nachbesserungsgarantie.
                </p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
                <h3 className="heading-3">Kostenfaktor Küche: Der teuerste Bereich</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Die Küche macht bei den meisten Endreinigungen <strong>30-40% der Gesamtkosten</strong> aus. Gründe:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                  <li><strong>Backofen-Reinigung</strong>: Hartnäckige Fettverkrustungen erfordern spezielle Reinigungsmittel und 1-2 Stunden Arbeitszeit. Aufpreis: 80-120 CHF.</li>
                  <li><strong>Dunstabzugshaube</strong>: Fettfilter und Motorbereich werden oft vergessen – bei der Wohnungsabgabe aber geprüft.</li>
                  <li><strong>Küchenschränke innen</strong>: Krümel, Fettspritzer, Gerüche – alles muss raus.</li>
                </ul>
                <p className="text-gray-700 italic">
                  Tipp: Fragen Sie explizit nach, ob Backofen und Kühlschrank im Grundpreis enthalten sind oder extra berechnet werden.
                </p>
              </div>
              <div>
                <h3 className="heading-3">Kostenfaktor Fenster und Storen</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Einfache Fenster (innen/aussen)</strong>: 15-25 CHF pro Fenster</li>
                  <li><strong>Fenster mit Rollläden</strong>: 25-35 CHF pro Fenster</li>
                  <li><strong>Lamellenstoren</strong>: 35-50 CHF pro Storen (aufwändige Einzellamellen-Reinigung)</li>
                </ul>
                <p className="text-gray-700 mt-4 leading-relaxed">
                  Bei einer 3.5 Zimmer Wohnung mit 8-10 Fenstern bedeutet das Zusatzkosten von <strong>120-350 CHF</strong> – je nach Storen-Typ.
                </p>
              </div>
            </div>
          </section>

          {/* Vergleich: Selbst machen vs. Profis */}
          <section
            className="bg-white p-6 md:p-10 rounded-xl shadow-lg"
          >
            <h2 className="heading-2">
              Der grosse Vergleich: Selbst machen vs. Profis beauftragen
            </h2>
              <h3 className="heading-3 mb-6">Echte Kostenrechnung für 3.5 Zimmer Wohnung</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-red-50 border-2 border-red-200">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">Selbst reinigen:</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>Reinigungsmittel/Material: 50-80 CHF</li>
                    <li>Mietwerkzeuge (Dampfreiniger, etc.): 40-60 CHF</li>
                    <li>Zeitaufwand: 15-20 Stunden</li>
                    <li>Opportunitätskosten (25 CHF/h): 375-500 CHF</li>
                    <li className="font-bold text-lg mt-3">Echte Gesamtkosten: 465-640 CHF</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">Professionelle Endreinigung:</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>Fixpreis inkl. Material: 530-700 CHF</li>
                    <li>Abnahmegarantie: inklusive</li>
                    <li>Zeitaufwand: 3-5 Stunden (durch Reinigungsteam)</li>
                    <li className="font-bold text-lg mt-3">Gesamtkosten: 530-700 CHF</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="heading-3 mb-4">Qualitätsvergleich und Abnahme-Erfolgsquoten</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Professionelle Reinigungsfirmen erreichen <strong>95%+ Abnahme-Erfolg</strong> beim ersten Versuch. Bei Selbstreinigung liegt die Quote bei etwa <strong>70-75%</strong> – jede dritte bis vierte Wohnung erfordert Nacharbeiten.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Selbst machen lohnt sich wenn:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Wohnung klein (1.5-2.5 Zimmer) und wenig verschmutzt</li>
                  <li>Sie Erfahrung mit professioneller Reinigung haben</li>
                  <li>Genug Zeit ohne Termindruck vorhanden ist</li>
                  <li>Unterstützung von Freunden oder Familie gesichert ist</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Profis beauftragen lohnt sich wenn:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Wohnung grösser als 3 Zimmer</li>
                  <li>Küche oder Bad stark verkalkt/verschmutzt</li>
                  <li>Zeitdruck vor der Wohnungsübergabe</li>
                  <li>Abnahmegarantie wichtig (Kaution sichern)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 10 Spartipps */}
          <section
            className="bg-gradient-to-br from-green-50 to-yellow-50 p-6 md:p-10 rounded-xl shadow-lg"
          >
            <h2 className="heading-2">
              10 bewährte Spartipps mit konkretem Sparpotential
            </h2>
            <ol className="space-y-4 list-decimal list-inside text-gray-700">
              <li className="leading-relaxed"><strong>Früh buchen: 15% Rabatt bei 3+ Wochen Vorlauf</strong> – Reinigungsfirmen geben Planungssicherheits-Rabatte</li>
              <li className="leading-relaxed"><strong>Kombi mit Umzugsservice: Bis zu 20% sparen</strong> – Einige Umzugsfirmen offerieren Paketpreise</li>
              <li className="leading-relaxed"><strong>Wochenmitte statt Wochenende: 10% günstiger</strong> – Dienstag bis Donnerstag sind günstigste Tage</li>
              <li className="leading-relaxed"><strong>Eigene Reinigungsmittel stellen: 30-50 CHF Ersparnis</strong> – Vorher mit Firma absprechen</li>
              <li className="leading-relaxed"><strong>Vorher selbst grob reinigen: 5-15% Nachlass</strong> – Groben Schmutz und Müll vorher entfernen</li>
              <li className="leading-relaxed"><strong>Flexible Termine: Express-Zuschläge vermeiden</strong> – Kurzfristige Buchungen kosten +25%</li>
              <li className="leading-relaxed"><strong>Mehrere Offerten: Bis zu 30% Preisunterschied</strong> – Mindestens 3 Angebote vergleichen</li>
              <li className="leading-relaxed"><strong>Lokale Anbieter bevorzugen: Anfahrtskosten sparen</strong> – <Link href="/umzugsfirma" className="text-green-600 hover:text-green-700 font-semibold underline">Reinigungsfirma aus der Nähe wählen</Link></li>
              <li className="leading-relaxed"><strong>Standard-Paket wählen: Extras einzeln prüfen</strong> – Brauchen Sie wirklich Teppich-Shampoonierung?</li>
              <li className="leading-relaxed"><strong>Langfristige Planung: Saison-Rabatte nutzen</strong> – Winter-Umzüge sind 10-15% günstiger</li>
            </ol>
          </section>

          {/* Testimonials */}
          <section
            className="bg-white p-6 md:p-10 rounded-xl shadow-lg"
          >
            <h2 className="heading-2 text-center">
              Was Kunden über unsere Partner sagen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4 leading-relaxed">
                    "Preistransparenz war perfekt. Offerte entsprach exakt der Endrechnung – keine Überraschungen. Die Abnahme mit dem Vermieter lief problemlos."
                  </p>
                  <p className="font-semibold text-gray-800">— Markus T., Zürich</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4 leading-relaxed">
                    "Die Abnahmegarantie hat mir den Stress genommen. Als die Verwaltung zwei Stellen beanstandete, kam das Reinigungsteam am nächsten Tag kostenlos zurück."
                  </p>
                  <p className="font-semibold text-gray-800">— Sandra L., Basel</p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4 leading-relaxed">
                    "Durch den Vergleich habe ich 180 Franken gespart. Die günstigste Offerte war nicht die schlechteste – im Gegenteil."
                  </p>
                  <p className="font-semibold text-gray-800">— Philippe M., Genf</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Checkliste */}
          <section
            className="bg-white p-6 md:p-10 rounded-xl shadow-lg"
          >
            <h2 className="heading-2">
              Checkliste: Was inklusive sein muss
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="heading-3 mb-4">Pflichtleistungen laut Schweizer Mietrecht</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Sämtliche Bodenbeläge gesaugt und feucht gewischt</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Alle Fenster innen gereinigt (aussen nach Vereinbarung)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Küche komplett inkl. Geräteoberflächen</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Badezimmer inkl. Armaturen und Sanitäranlagen</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Alle Türen, Rahmen und Lichtschalter</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Einbauschränke innen ausgewischt</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="heading-3 mb-4">Optionale Zusätze die sich wirklich lohnen</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Package className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Backofen-Intensivreinigung (fast immer empfehlenswert)</span>
                  </li>
                  <li className="flex items-start">
                    <Package className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Kühlschrank mit Desinfektion</span>
                  </li>
                  <li className="flex items-start">
                    <Package className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <span>Storen/Rollläden bei starker Verschmutzung</span>
                  </li>
                </ul>
                <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Rote Flaggen: Diese Ausschlüsse sind unzulässig</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-3 mt-1 flex-shrink-0" />
                      <span><em>"Kalk und hartnäckige Verschmutzungen ausgenommen"</em> – gehört zur Grundreinigung</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-3 mt-1 flex-shrink-0" />
                      <span><em>"Keine Nachbesserung bei Beanstandung"</em> – Abnahmegarantie muss enthalten sein</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-3 mt-1 flex-shrink-0" />
                      <span><em>"Material wird separat berechnet"</em> – sollte im Fixpreis inklusive sein</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section
            className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-blue-500"
          >
            <h2 className="heading-2">
              FAQ – Häufig gestellte Fragen an unser Reinigungsfirmen
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-semibold text-gray-800">
                  <h4 className="faq-question">Werden Wohnungsbesichtigungen durchgeführt und sind diese kostenfrei?</h4>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Ja, seriöse Reinigungsfirmen bieten bei unklarem Zustand oder starken Verschmutzungen eine kostenlose Vor-Ort-Besichtigung an. Dies ermöglicht eine präzise Kostenschätzung und verhindert Überraschungen bei der Endrechnung. Bei normal verschmutzten Wohnungen ist eine Besichtigung meist nicht nötig – die Kosten können anhand der Wohnungsgrösse und Angaben zum Zustand zuverlässig kalkuliert werden. Die Besichtigung dient vor allem dazu, Sonderfälle wie Nikotinverschmutzung, starke Verkalkung oder Schäden zu identifizieren, die 50-80% höhere Kosten verursachen können.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-semibold text-gray-800">
                  <h4 className="faq-question">Ist die Wohnungsübergabe am Umzugstag möglich?</h4>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Ja, viele Reinigungsfirmen bieten flexible Terminplanung an, sodass die Endreinigung am Umzugstag durchgeführt werden kann. Dies ist besonders praktisch, da Sie so direkt nach dem Auszug die Wohnung übergeben können. Wichtig ist jedoch eine frühzeitige Planung – mindestens 2-3 Wochen im Voraus buchen, um Express-Zuschläge von 15-30% zu vermeiden. Bei kurzfristigen Buchungen (unter 3 Tage) fallen oft höhere Kosten an. Die Reinigung erfolgt typischerweise nach dem Auszug der Möbel, sodass alle Bereiche gründlich gereinigt werden können.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-semibold text-gray-800">
                  <h4 className="faq-question">Muss ich Reinigungsmittel bereitstellen?</h4>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Nein, professionelle Reinigungsfirmen bringen alle notwendigen Reinigungsmittel und Materialien mit. Dies ist im Fixpreis enthalten. Sie können jedoch eigene Reinigungsmittel stellen, wenn Sie spezielle Wünsche haben (z.B. umweltfreundliche Produkte) oder Allergien berücksichtigen müssen. Dies kann 30-50 CHF Ersparnis bringen – sprechen Sie dies vorher mit der Firma ab. Ökologische Reinigungsmittel kosten üblicherweise 10-15% mehr, sind aber bei Allergikern oder Familien mit Kindern empfehlenswert, da sie keine chemischen Rückstände hinterlassen.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left font-semibold text-gray-800">
                  <h4 className="faq-question">Sind Sie beim Wohnungsabgabetermin nach der Reinigung anwesend?</h4>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Ja, seriöse Reinigungsfirmen sind idealerweise beim Wohnungsabgabetermin anwesend, um bei eventuellen Beanstandungen durch den Vermieter sofort reagieren zu können. Dies ist ein wichtiger Vorteil der Abnahmegarantie – bei Problemen wird kostenlos nachgebessert. Die Anwesenheit der Reinigungsfirma beim Abgabetermin erhöht die Erfolgsquote erheblich: Professionelle Firmen erreichen 95%+ Abnahme-Erfolg beim ersten Versuch, während bei Selbstreinigung die Quote bei etwa 70-75% liegt. Informieren Sie die Verwaltung über den Termin, damit die Übergabe koordiniert werden kann.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left font-semibold text-gray-800">
                  <h4 className="faq-question">Welche typischen Fehler werden bei der Umzugsplanung gemacht und wie lassen sie sich vermeiden?</h4>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Häufige Fehler bei der Umzugsplanung sind: zu späte Buchung (führt zu Express-Zuschlägen von 15-30%), unklare Kommunikation über den Zustand der Wohnung (führt zu Preisnachverhandlungen), fehlende Abnahmegarantie (Risiko für Kautionsabzug), und mangelnde Vergleichsangebote (bis zu 30% Preisunterschied). Vermeiden Sie diese Fehler durch: frühzeitige Planung (3+ Wochen Vorlauf spart 15%), detaillierte Angaben zum Verschmutzungsgrad, Vergleich mehrerer Offerten, und Wahl einer Firma mit Abnahmegarantie. Planen Sie die Reinigung mindestens 2-3 Wochen im Voraus und vergleichen Sie mindestens 3 Angebote, um bis zu 30% zu sparen.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left font-semibold text-gray-800">
                  <h4 className="faq-question">Welche Vorzüge bietet ein Vollservice-Umzug im Vergleich zu Teilservice oder Eigenleistung?</h4>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Ein Vollservice-Umzug umfasst Verpackung, Transport, Möbelmontage und Endreinigung in einem Paket. Vorteile: Zeitersparnis (Sie müssen nichts selbst machen), professionelle Durchführung (95%+ Abnahme-Erfolg), Abnahmegarantie für die Reinigung, und oft günstigere Paketpreise (bis zu 20% Ersparnis). Teilservice bedeutet, dass Sie z.B. selbst packen, aber Transport und Reinigung überlassen. Eigenleistung ist am günstigsten, aber zeitaufwändig (15-20 Stunden) und risikoreicher (70-75% Abnahme-Quote). Für grössere Wohnungen (ab 3.5 Zimmer) oder bei Zeitdruck lohnt sich Vollservice meist mehr, da die echten Gesamtkosten (inkl. Opportunitätskosten) bei Eigenleistung oft höher sind als der Fixpreis einer professionellen Reinigung.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left font-semibold text-gray-800">
                  <h4 className="faq-question">Welche Zahlungsoptionen stehen bei Umzügen zur Verfügung?</h4>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Bei Reinigungsservices ist der Standard: 50% Anzahlung bei Buchung, Rest nach erfolgreicher Abnahme durch Vermieter oder Verwaltung. Dies bietet Sicherheit für beide Seiten – die Firma hat Planungssicherheit, Sie zahlen den Restbetrag erst nach erfolgreicher Übergabe. Einige Firmen bieten auch Ratenzahlung oder Rechnungsstellung nach Abnahme an. Wichtig: Klären Sie die Zahlungsbedingungen bereits in der Offerte, um Überraschungen zu vermeiden. Seriöse Firmen bieten transparente Zahlungsbedingungen ohne versteckte Kosten. Bei Paketangeboten (Umzug + Reinigung) können andere Zahlungsmodalitäten vereinbart werden.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left font-semibold text-gray-800">
                  <h4 className="faq-question">Wie läuft die Angebotserstellung ab und sind nachträgliche Änderungen möglich?</h4>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Die Angebotserstellung erfolgt in 3 einfachen Schritten: 1) Wohnungsdetails eingeben (Grösse, Zustand, gewünschte Extras wie Fenster oder Backofen), 2) Ihre Anfrage wird an bis zu 5 passende Reinigungsfirmen in Ihrer Region weitergeleitet, 3) Sie erhalten innerhalb von 24-48 Stunden transparente Fixpreis-Angebote per E-Mail. Der gesamte Prozess ist kostenlos und unverbindlich. Nachträgliche Änderungen sind meist möglich, sollten aber frühzeitig kommuniziert werden. Zusatzleistungen (z.B. Teppichreinigung, Fensterreinigung) können oft noch hinzugefügt werden, während Reduzierungen je nach Firma unterschiedlich gehandhabt werden. Sprechen Sie Änderungswünsche direkt mit der gewählten Firma ab.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-9">
                <AccordionTrigger className="text-left font-semibold text-gray-800">
                  <h4 className="faq-question">Nach welchen Kriterien wird der Preis für den Reinigungsservice kalkuliert?</h4>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Der Preis wird nach 7 Hauptkriterien kalkuliert: 1) Verschmutzungsgrad (wichtigster Faktor – starke Verschmutzungen kosten bis zu 80% mehr), 2) Wohnungsgrösse und Zimmeranzahl (2.5 Zimmer: 390-580 CHF, 3.5 Zimmer: 530-920 CHF), 3) Zeitdruck und Express-Zuschläge (Wochenende: +25%, kurzfristig: +15-30%), 4) Sonderwünsche (Backofen: 80-120 CHF, Fenster: 15-35 CHF pro Stück), 5) Material-Qualität (ökologisch: +10-15%), 6) Stockwerk und Erreichbarkeit (ab 4. Stock ohne Lift: +50-80 CHF), 7) Saisonale Schwankungen (März-Juni teurer, November-Februar 10-15% günstiger). Die Küche macht 30-40% der Gesamtkosten aus. Regionale Unterschiede: Zürich und Genf +15-20%, ländliche Gebiete -10-20%.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Final CTA */}
          <section
            className="text-center py-12 md:py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl shadow-2xl"
          >
            <h2 className="heading-2">
              Jetzt Geld sparen: Kostenlose Offerten anfordern
            </h2>
            <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto opacity-95">
              Sie haben jetzt alle Informationen, um die richtige Entscheidung zu treffen. Der nächste Schritt ist einfach: <strong>Vergleichen Sie Preise</strong> und sichern Sie sich bis zu 40% Ersparnis.
            </p>
            <p className="text-base md:text-lg mb-8 max-w-3xl mx-auto opacity-90">
              Unsere Partner-Reinigungsfirmen in der ganzen Schweiz stehen bereit – von Zürich über Bern bis Genf. Alle geprüft, alle mit Abnahmegarantie, alle mit transparentem Fixpreis.
            </p>
            <Button onClick={handleConclusionCta} size="lg" className="bg-white text-green-700 hover:bg-gray-100 font-bold group px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              Jetzt kostenlose Offerten anfordern
              <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1.5" />
            </Button>
            <p className="text-sm mt-6 opacity-80 max-w-2xl mx-auto">
              <strong>Kein Risiko. Keine versteckten Kosten. Nur faire Preise und professionelle Endreinigung mit Abnahmegarantie.</strong>
            </p>
            <p className="text-sm mt-4 opacity-80 max-w-2xl mx-auto">
              Innerhalb von 24 Stunden erhalten Sie bis zu 5 Angebote von geprüften Schweizer Reinigungsfirmen. Unverbindlich vergleichen, beste Offerte wählen, Kaution sichern.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default ReinigungskostenRechnerPageClient;


