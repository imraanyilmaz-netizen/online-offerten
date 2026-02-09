'use client'

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Framer Motion removed for better performance
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, ArrowRight, MapPin, CheckCircle, Lightbulb, ShieldCheck, FileText } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MovingCostCalculator from '@/components/UmzugskostenRechnerSections/MovingCostCalculator';
import FactorsList from '@/components/UmzugskostenRechnerSections/FactorsList';
import CostTable from '@/components/UmzugskostenRechnerSections/CostTable';
import AveragePriceBox from '@/components/UmzugskostenRechnerSections/AveragePriceBox';
import HourlyRateBox from '@/components/UmzugskostenRechnerSections/HourlyRateBox';
import RegionalDifferences from '@/components/UmzugskostenRechnerSections/RegionalDifferences';

interface UmzugskostenRechnerPageClientProps {
  initialReviewStats?: {
    reviewCount: number;
    averageRating: number;
  };
}

const UmzugskostenRechnerPageClient: React.FC<UmzugskostenRechnerPageClientProps> = ({ initialReviewStats }) => {
  const router = useRouter();
  const [shouldOpenForm, setShouldOpenForm] = React.useState(false);
  const [activeId, setActiveId] = React.useState('');
  const tocRef = React.useRef<HTMLElement>(null);

  // Table of Contents items - Only H2 headings
  const tocItems = [
    { id: 'einfuehrung-umzugskosten', title: 'Einführung in die Umzugskosten', level: 2 },
    { id: 'durchschnittliche-umzugskosten', title: 'Durchschnittliche Umzugskosten in der Schweiz', level: 2 },
    { id: 'umzugspreis-kalkulation', title: 'Schnelle und präzise Umzugspreis-Kalkulation', level: 2 },
    { id: 'guenstig-umziehen-tipps', title: 'Günstig umziehen in der Schweiz: Tipps zum Sparen', level: 2 },
    { id: 'faktoren-beeinflussen', title: 'Welche Faktoren beeinflussen die Umzugsfirma Kosten?', level: 2 },
    { id: 'preisbeispiele', title: 'Umzug Angebot: Preisbeispiele für Umzüge in der Schweiz', level: 2 },
    { id: 'umzug-angebot-vergleichen', title: 'Umzug Angebot vergleichen: Geprüfte Partner', level: 2 },
    { id: 'regionale-preisunterschiede', title: 'Regionale Preisunterschiede: Umzug Preis pro km variiert', level: 2 },
    { id: 'diy-oder-professionell', title: 'DIY-Umzug oder professionelle Umzugsfirma: Was passt zu Ihnen?', level: 2 },
    { id: 'kosten-nach-zimmeranzahl', title: 'Umzugsfirma Kosten: Preise nach Zimmeranzahl', level: 2 },
    { id: 'wie-berechnet', title: 'Wie werden die Umzugskosten berechnet?', level: 2 },
    { id: 'preis-pro-km', title: 'Umzug Preis pro km und versteckte Kosten', level: 2 },
    { id: 'ablauf-tipps', title: 'Beim Umzug: Ablauf und praktische Tipps', level: 2 },
    { id: 'haeufige-fragen', title: 'Häufige Fragen zu Umzugskosten und Preisen', level: 2 },
    { id: 'fazit', title: 'Fazit', level: 2 },
  ];

  // Scroll tracking for active heading
  React.useEffect(() => {
    const handleScroll = () => {
      const headings = tocItems.map(item => {
        const element = document.getElementById(item.id);
        if (!element) return { id: item.id, element: null, top: Infinity, bottom: Infinity };
        const rect = element.getBoundingClientRect();
        return { 
          id: item.id, 
          element, 
          top: rect.top,
          bottom: rect.bottom
        };
      }).filter(h => h.element !== null);

      if (headings.length === 0) return;

      // Offset: 120px for desktop navbar, 160px for mobile (navbar + TOC)
      const offset = window.innerWidth >= 1024 ? 120 : 160;
      let currentActive = '';

      // Find the heading that's currently in the viewport
      for (let i = headings.length - 1; i >= 0; i--) {
        // Heading is in view if its top is above the offset and bottom is below it
        if (headings[i].top <= offset && headings[i].bottom >= offset) {
          currentActive = headings[i].id;
          break;
        }
        // Or if heading has passed the offset
        if (headings[i].top <= offset) {
          currentActive = headings[i].id;
          break;
        }
      }

      // If we're at the top, select the first heading
      if (window.scrollY < 100 && headings.length > 0) {
        currentActive = headings[0].id;
      }

      if (currentActive && currentActive !== activeId) {
        setActiveId(currentActive);
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems, activeId]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = window.innerWidth >= 1024 ? -100 : -140;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };
  
  // FAQ Data - SEO optimized with keyword variations (12 questions for better SEO)
  const faqItems = [
    {
      question: "Wie berechnet man die Umzugskosten?",
      answer: "Die Umzugskosten werden basierend auf mehreren Faktoren (Kostenfaktoren) berechnet: Wohnungsgrösse (Anzahl Zimmer), Distanz zwischen Alt- und Neuwohnung, Zusatzleistungen wie Reinigung oder Möbelmontage. Unser Rechner berücksichtigt all diese Faktoren und liefert Ihnen in nur 2 Minuten eine verlässliche Preis-Schätzung."
    },
    {
      question: "Wie hoch sind die durchschnittlichen Umzugskosten in der Schweiz?",
      answer: "Die durchschnittlichen Umzugskosten in der Schweiz variieren je nach Wohnungsgrösse. Für eine 3.5-Zimmer-Wohnung liegt der Umzugspreis zwischen CHF 1'200 und CHF 1'800 für den reinen Transport (Basispreis CHF 1'200 + Distanzkosten). Mit Zusatzleistungen wie Möbelmontage (CHF 400) und Reinigung (CHF 500) können die Kosten auf CHF 2'100 bis CHF 2'700 steigen. Nutzen Sie unseren Rechner für eine individuelle Schätzung."
    },
    {
      question: "Kann ich bei einem Umzug Geld sparen?",
      answer: "Ja, Sie können bei Ihrem Umzug sparen, indem Sie flexible Umzugstermine ausserhalb der Hauptsaison (Juni-August) wählen, mehrere Offerten vergleichen und unnötige Zusatzleistungen vermeiden. Ein Vergleich von mindestens 3 Offerten kann Ihnen bis zu 30% bei den Umzugskosten sparen. Eine erste Preis-Schätzung hilft Ihnen, das Budget zu planen, dann können Sie Offerten vergleichen."
    },
    {
      question: "Was beeinflusst die Umzugskosten am meisten?",
      answer: "Die wichtigsten Faktoren, die die Umzugskosten beeinflussen, sind (Kostenfaktoren): Das Volumen der Umzugsgüter, die Distanz zwischen den Wohnorten, Stockwerke und Zugangssituation sowie gewählte Zusatzleistungen wie Ein- und Auspacken oder Möbelmontage. Unser Rechner berücksichtigt all diese Faktoren bei der Kalkulation."
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

  return (
    <>
      <div className="bg-white">

        {/* Hero Section */}
        <section className="relative bg-white py-12 md:py-20 overflow-hidden">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div
              >
                <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold text-sm mb-6">
                  <Calculator className="h-4 w-4 mr-2" />
                  Kostenloser Umzugskosten-Rechner
                </div>
                <h1 className="heading-1">
                  <span className="block">Umzugskosten</span>
                  <span className="block text-green-600 mt-2">kostenlos berechnen</span>
                  <span className="block heading-4 text-gray-700 mt-4">
                    In nur 2 Minuten eine verlässliche Schätzung
                  </span>
                </h1>
                <p className="text-body mb-6">
                  Erhalten Sie eine <strong>kostenlose Preis-Schätzung</strong> für Ihren Umzug in der gesamten Schweiz. Unser <strong>Umzugskosten-Rechner</strong> hilft Ihnen, die <strong>Kosten Umzugsunternehmen</strong> zu berechnen und zeigt Ihnen eine <strong>Umzugsfirma Kosten Tabelle</strong>. <strong>100% kostenlos und unverbindlich</strong>.
                </p>
                <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Verlässliche Schätzung</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>100% kostenlos</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Alle Faktoren berücksichtigt</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Bis zu 40% sparen</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl border-4 border-green-200 overflow-hidden">
                  <MovingCostCalculator 
                    onRequestQuote={() => {
                      console.log('[Hero] onRequestQuote called, setting shouldOpenForm to true');
                      // Set flag to open form in page section
                      setShouldOpenForm(true);
                      // Scroll to the form section in the page
                      setTimeout(() => {
                        const formElement = document.getElementById('moving-cost-calculator-section');
                        if (formElement) {
                          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        } else {
                          console.log('[Hero] Form element not found yet');
                        }
                      }, 300);
                    }}
                    hideInlineForm={true}
                    onFormOpened={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section - Opens when "Detaillierte Offerten anfordern" is clicked from hero */}
        {shouldOpenForm && (
          <section 
            id="moving-cost-calculator-section" 
            className="py-8 bg-white"
          >
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
              <MovingCostCalculator 
                key={`form-${shouldOpenForm}`}
                shouldOpenForm={true}
                onFormOpened={() => {
                  console.log('[Page] Form opened callback called - keeping form section open');
                  // Don't close the form section - let it stay open
                }}
                hideCalculator={true}
                hideInlineForm={false}
                onRequestQuote={() => {}}
              />
            </div>
          </section>
        )}

        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Table of Contents - Mobile: Sticky at top, Desktop: Left Sidebar */}
            <aside 
              ref={tocRef}
              className="lg:col-span-4"
            >
              {/* Mobile TOC - Sticky below navbar */}
              <div className="lg:hidden sticky top-[80px] z-[2999] mb-6 bg-white border-b border-gray-200 pb-4 -mx-4 px-4">
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex space-x-2 min-w-max py-2">
                    {tocItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToHeading(item.id)}
                        className={`px-4 py-2 rounded-md transition-colors text-sm whitespace-nowrap flex-shrink-0 ${
                          activeId === item.id
                            ? 'bg-green-100 text-green-700 font-semibold'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {item.title.length > 35 
                          ? `${item.title.substring(0, 35)}...` 
                          : item.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop TOC - Left Sidebar */}
              <div className="hidden lg:block sticky top-24">
                <Card className="border border-gray-200 rounded-xl shadow-sm bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-gray-800">
                      Inhalt
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <nav className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
                      {tocItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToHeading(item.id)}
                          className={`block w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                            activeId === item.id
                              ? 'bg-green-100 text-green-700 font-semibold'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          {item.title.length > 60 
                            ? `${item.title.substring(0, 60)}...` 
                            : item.title}
                        </button>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-8 space-y-12 md:space-y-20">

          <div
            className="bg-white"
          >
            <div className="mb-8">
              <h2 id="einfuehrung-umzugskosten" className="heading-2 mb-6 scroll-mt-24">Einführung in die Umzugskosten</h2>
              <div className="space-y-4">
                <p className="text-body">
                  Ein Umzug markiert oft einen neuen Lebensabschnitt – sei es in eine grössere Wohnung, ein neues Haus oder einfach in einen anderen Wohnort. Doch bevor die Vorfreude auf das neue Zuhause überwiegt, stellt sich schnell die Frage: Wie hoch sind eigentlich die Umzugskosten? Die Antwort darauf ist nicht pauschal, denn die Kosten für den Umzug hängen von zahlreichen Faktoren ab.
                </p>
                <p className="text-body">
                  Zu den wichtigsten Kostenfaktoren zählen die Entfernung zwischen den Wohnorten, die Wohnungsgrösse sowie mögliche Zusatzleistungen wie Verpackungsservice oder Möbelmontage. Entscheidend sind vor allem die Grösse der Wohnung, die Entfernung zwischen altem und neuem Wohnort sowie die Menge und Art der Möbel und Umzugsgüter, die transportiert werden müssen. Auch die Wahl, ob Sie ein professionelles Umzugsunternehmen beauftragen oder einen DIY Umzug mit Freunden und Familie organisieren, beeinflusst, was der Umzug letztlich kostet.
                </p>
                <p className="text-body">
                  Wer sich frühzeitig mit diesen Fragen beschäftigt und die wichtigsten Faktoren kennt, kann die Umzugskosten besser einschätzen und gezielt planen – im Durchschnitt liegen die Umzugskosten in der Schweiz zwischen 1.000 und 3.000 CHF, abhängig von den genannten Kostenfaktoren.
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 id="durchschnittliche-umzugskosten" className="heading-2 mb-6 scroll-mt-24">Durchschnittliche Umzugskosten in der Schweiz</h2>
              <div className="space-y-4">
                <p className="text-body">
                  Die durchschnittlichen Umzugskosten in der Schweiz hängen von mehreren Faktoren ab, insbesondere von der Wohnungsgrösse, der Entfernung zwischen altem und neuem Wohnort sowie der Wahl der Umzugsfirma. Für einen Umzug mit einer professionellen Umzugsfirma sollten Sie je nach Umfang und Anforderungen mit Kosten zwischen CHF 800 und CHF 2'500 rechnen. Kleinere Umzüge, etwa von einer 1.5-Zimmer-Wohnung innerhalb derselben Stadt, bewegen sich meist am unteren Ende dieser Preisspanne. Grössere Umzüge, beispielsweise bei einer 4.5-Zimmer-Wohnung oder bei längeren Distanzen, können entsprechend teurer werden.
                </p>
                <p className="text-body">
                  Die Entfernung spielt eine entscheidende Rolle: Je weiter der neue Wohnort entfernt ist, desto höher fallen die Transportkosten aus. Auch die Anzahl der zu transportierenden Möbelstücke und der gewünschte Serviceumfang – etwa ob Sie zusätzliche Leistungen wie Möbelmontage oder Umzugsreinigung in Anspruch nehmen – beeinflussen die Gesamtkosten. In der Schweiz ist es üblich, dass Umzugsfirmen transparente Offerten erstellen, die alle relevanten Kostenpunkte enthalten. So behalten Sie stets den Überblick über die Umzugskosten und können Ihr Budget gezielt planen. Ein Vergleich mehrerer Anbieter lohnt sich, um das beste Preis-Leistungs-Verhältnis für Ihren Umzug zu finden.
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 id="umzugspreis-kalkulation" className="heading-2 mb-6 scroll-mt-24">Schnelle und präzise Umzugspreis-Kalkulation</h2>
              <p className="text-body">
                Sie planen einen <strong>Umzug in der Schweiz</strong> und möchten wissen, was dieser kostet? Unser <strong>Umzugskostenrechner</strong> hilft Ihnen, die <strong>Kosten Umzugsunternehmen</strong> zu berechnen und zeigt Ihnen eine <strong>Umzugsfirma Kosten Tabelle</strong>. Der Rechner liefert Ihnen in nur 2 Minuten eine <strong>verlässliche Preis-Schätzung</strong>. Der Umzugskostenrechner basiert auf Durchschnittswerten, um Ihnen eine realistische Kostenschätzung für Ihren Umzug zu ermöglichen. Der Kalkulator berücksichtigt alle wichtigen verschiedenen Faktoren: Wohnungsgrösse, Umzugsdistanz, Zusatzleistungen wie <strong>Umzugsreinigung</strong> oder <strong>Möbelmontage</strong>. So können Sie Ihr <strong>Umzugsbudget</strong> optimal planen und anschliessend mehrere <strong>Umzug Angebot vergleichen</strong> von geprüften <strong>Umzugsfirmen</strong> und <strong>Umzugsunternehmen</strong> in Ihrer Region. Die <strong>Umzugsfirma Kosten</strong> variieren je nach Anbieter - ein Vergleich lohnt sich. Wenn Sie ein <strong>professionelles Umzugsunternehmen</strong> beauftragen, erhalten Sie ein detailliertes <strong>Angebot</strong> und können so die <strong>Kosten für einen Umzug</strong> genau kalkulieren.
              </p>
            </div>

            <div>
              <h2 id="guenstig-umziehen-tipps" className="heading-2 mb-6 scroll-mt-24">Günstig umziehen in der Schweiz: Tipps zum Sparen</h2>
              <p className="text-body mb-6">
                <strong>Günstig umziehen Schweiz</strong> ist möglich! <strong>Flexible Umzugstermine</strong> ausserhalb der Hauptsaison (Juni-August) können Ihre <strong>Kosten um bis zu 30% reduzieren</strong>. Vergleichen Sie immer <strong>mindestens 3 Offerten</strong> von unterschiedlichen <strong>Umzugsfirmen</strong> und <strong>Umzugsunternehmen</strong> in Ihrer Region. Eine gute Planung ist der Schlüssel zu einem <strong>günstigen Umzug</strong>. Der <strong>Umzug Preis pro km</strong> liegt typischerweise bei CHF 2, variiert aber je nach Anbieter. Wenn Sie einen <strong>Umzug mit einer Umzugsfirma</strong> planen, sollten Sie die <strong>Kosten für einen Umzug</strong> genau kalkulieren. Unser <strong>Umzugskosten Rechner</strong> hilft Ihnen dabei. Nach der Berechnung können Sie ein <strong>Angebot einholen</strong> und erhalten sofort ein <strong>Angebot</strong> von mehreren Anbietern. So wissen Sie genau, <strong>was kostet ein Umzug</strong> und können die beste <strong>Umzugsfirma</strong> zum besten <strong>Umzugspreis</strong> finden.
              </p>
              <div className="mb-6">
                <img 
                  src="/image/umzugsservice-Schweiz/umzugskosten.png" 
                  alt="Umzugskosten" 
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>

          <section 
            className="bg-white"
          >
            <h2 id="faktoren-beeinflussen" className="heading-2 mb-6 text-center scroll-mt-24">
              <TrendingUp className="inline-block w-8 h-8 mr-3 text-green-600" />
              Welche Faktoren beeinflussen die Umzugsfirma Kosten?
            </h2>
            <p className="text-body text-center mb-6">
              Jeder Umzug ist einzigartig. Um Ihnen eine genaue Vorstellung zu geben, wie sich der Umzugspreis zusammensetzen kann, haben wir eine beispielhafte Tabelle erstellt. Zu den wichtigsten Kostenfaktoren bei einem Umzug in der Schweiz zählen insbesondere die Entfernung, die Wohnungsgrosse, gewünschte Zusatzleistungen sowie der Buchungszeitpunkt. Doch was kostet der Umzug tatsächlich? Diese Preise sind Schätzungen und können je nach Ihren spezifischen Anforderungen variieren. Für eine genaue, auf Sie zugeschnittene Offerte, verwenden Sie unseren Kostenrechner.
            </p>
            <p className="text-body text-center">
              Die Vorteile einer detaillierten Kostenanalyse liegen darin, dass Sie Ihren Umzug besser planen, unerwartete Ausgaben vermeiden und gezielt Einsparpotenziale nutzen können.
            </p>
            <div className="mt-6">
            <FactorsList />
            </div>
          </section>
          
          <section 
            className="bg-white"
          >
            <h2 id="preisbeispiele" className="heading-2 mb-6 text-center scroll-mt-24">
              Umzug Angebot: Preisbeispiele für Umzüge in der Schweiz
            </h2>
            <CostTable />
            <p className="text-body text-center text-sm mt-4 italic">
              *Alle Preise sind Schätzungen und können je nach Distanz und Aufwand variieren. Alle Preise verstehen sich inklusive MwSt.
            </p>
            <p className="text-body mt-6">
              Die Umzugskosten in der Schweiz variieren je nach Grösse der Zimmerwohnung. Für eine 1.5-Zimmer-Wohnung liegen die Kosten meist im unteren Bereich der Tabelle. Eine 2 Zimmer Wohnung oder 2 Zimmer kann je nach Inventar und Entfernung etwas teurer sein. Bei einer 3 Zimmer Wohnung steigen die Umzugskosten weiter an, da mehr Packmaterial und Arbeitsaufwand benötigt werden – dabei ist die Arbeit der Umzugsfirmen in der Regel besonders sorgfältig und effizient, was für eine hohe Zufriedenheit sorgt. Für eine 4.5 Zimmer Wohnung muss mit den höchsten Kosten innerhalb der aufgeführten Preisspannen gerechnet werden.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AveragePriceBox />
            <div className="bg-white">
              <h3 className="heading-3 mb-4">Stundensätze von Umzugsfirmen</h3>
              <p className="text-body mb-4">
                Die durchschnittlichen Stundensätze für einen Umzugshelfer liegen zwischen CHF 50 und CHF 80. Für einen LKW mit Fahrer können Sie mit CHF 120 bis CHF 180 pro Stunde rechnen. Diese Sätze sind oft in den Pauschalangeboten bereits enthalten.
              </p>
              <p className="text-body">
                Die Arbeit der Umzugshelfer wird dabei professionell und zuverlässig ausgeführt, sodass Sie sich auf eine hohe Servicequalität verlassen können.
              </p>
            </div>
          </div>

          <section className="bg-white">
            <div className="flex items-center mb-4">
              <ShieldCheck className="w-8 h-8 text-yellow-600 mr-4" />
              <h2 id="umzug-angebot-vergleichen" className="heading-2 scroll-mt-24">Umzug Angebot vergleichen: Geprüfte Partner</h2>
            </div>
            <p className="text-body">
              Nach Ihrer <strong>Preis-Schätzung</strong> mit unserem Rechner können Sie <strong>Umzug Angebot vergleichen</strong> von unseren Partnern. Alle Firmen sind <strong>geprüft, versichert und spezialisiert auf Umzüge in Ihrer Region</strong>. Zusätzlich verfügen die Anbieter über eine Betriebshaftpflichtversicherung und Haftpflichtversicherung, um Sie als Kunden vor Haftungsrisiken während des Umzugs zu schützen. Die <strong>Umzugsfirma Kosten</strong> variieren - ein Vergleich hilft Ihnen, das beste Preis-Leistungs-Verhältnis zu finden. Verlassen Sie sich auf Qualität: Nach einer ersten Einschätzung erhalten Sie verbindliche Offerten von Profis. Die geprüften Umzugsfirmen zeichnen sich durch sorgfältige, effiziente und professionelle Arbeit aus, sodass Sie sich auf einen reibungslosen Ablauf verlassen können.
            </p>
          </section>

          <section className="bg-white">
            <h2 id="regionale-preisunterschiede" className="heading-2 mb-6 text-center scroll-mt-24">
              <MapPin className="inline-block w-8 h-8 mr-3 text-green-600" />
              Regionale Preisunterschiede: Umzug Preis pro km variiert
            </h2>
            <p className="text-body mb-6">
              Die Umzugskosten können je nach Kanton und Stadt erheblich variieren. Die Lebenshaltungskosten, die Verkehrsanbindung und die lokale Nachfrage sind entscheidende Faktoren, die die Preisgestaltung der Umzugsfirmen beeinflussen. In städtischen Gebieten wie Zürich, Genf, Bern oder Basel sind die Umzugspreise tendenziell höher als in ländlichen Regionen. Der Umzug Preis pro km kann in Grossstädten ebenfalls höher ausfallen. Unser Rechner berücksichtigt diese regionalen Unterschiede für eine möglichst genaue Schätzung. Das Tool liefert eine erste Einschätzung, anschliessend können Sie mehrere Umzug Angebot von Umzugsunternehmen in Ihrer Region vergleichen. Unten finden Sie eine Auswahl an Städten, für die Sie spezifische Informationen und Partner finden können.
            </p>
            <RegionalDifferences />
          </section>

          <section className="bg-white">
            <h2 id="diy-oder-professionell" className="heading-2 mb-6 scroll-mt-24">DIY-Umzug oder professionelle Umzugsfirma: Was passt zu Ihnen?</h2>
            <div className="space-y-4">
              <p className="text-body">
                Die Wahl zwischen einem DIY-Umzug und einer professionellen Umzugsfirma ist eine der wichtigsten Entscheidungen bei der Umzugsplanung. Beide Varianten haben ihre eigenen Vor- und Nachteile – und welche Option am besten zu Ihnen passt, hängt von verschiedenen Faktoren ab.
              </p>
              <p className="text-body">
                Ein DIY Umzug ist besonders dann attraktiv, wenn Sie Kosten sparen möchten und bereit sind, selbst anzupacken. Mit Unterstützung von Freunden oder Familie, einem gemieteten Umzugswagen und etwas Organisationstalent können Sie viele Aufgaben beim Umzug selber übernehmen. Das spart nicht nur Geld, sondern gibt Ihnen auch die volle Kontrolle über den Ablauf. Allerdings sollten Sie den zeitlichen und körperlichen Aufwand nicht unterschätzen: Das Tragen schwerer Möbel, das sichere Verpacken und der Transport erfordern Kraft, Erfahrung und eine gute Planung. Gerade bei grösseren Wohnungen oder sperrigen Möbeln kann ein DIY Umzug schnell an seine Grenzen stossen.
              </p>
              <p className="text-body">
                Eine professionelle Umzugsfirma bietet Ihnen hingegen maximalen Komfort und Entlastung. Das erfahrene Umzugsteam übernimmt das Zügeln Ihrer Möbel, sorgt für einen reibungslosen Ablauf und minimiert das Risiko von Schäden. Besonders bei umfangreichen Umzügen, langen Distanzen oder wenn Sie wenig Zeit haben, ist die Beauftragung einer Umzugsfirma oft die stressfreiere Wahl. Die Kosten für den Umzug sind zwar höher als beim DIY Umzug, dafür profitieren Sie von Erfahrung, Versicherungsschutz und professionellem Equipment.
              </p>
              <p className="text-body">
                Welche Wahl für Sie die richtige ist, hängt von Ihren individuellen Faktoren ab: Wie gross ist Ihre Wohnung? Wie viele Möbel und Umzugsgüter müssen transportiert werden? Haben Sie ausreichend helfende Hände und Zeit? Oder möchten Sie sich lieber auf Profis verlassen und den Umzug entspannt angehen? Überlegen Sie, welche Aspekte für Sie am wichtigsten sind – Budget, Zeit, Komfort oder Sicherheit – und treffen Sie Ihre Wahl entsprechend. So gelingt Ihr Umzug ganz nach Ihren Vorstellungen.
              </p>
            </div>
          </section>

          <section className="text-center py-10 bg-white">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white group px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <Link href="/kostenlose-offerte-anfordern?service=umzug">
                Jetzt kostenlos Offerten vergleichen
                <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </Button>
          </section>

          {/* New SEO Content Sections */}
          <section className="bg-white">
            <h2 id="kosten-nach-zimmeranzahl" className="heading-2 mb-4 scroll-mt-24">Umzugsfirma Kosten: Preise nach Zimmeranzahl</h2>
            <p className="text-body mb-4">
              Die Umzugsfirma Kosten variieren erheblich je nach Wohnungsgrösse und Umfang. Die Wohnungsgrosse ist einer der wichtigsten Faktoren bei der Berechnung der Umzugskosten, da mit zunehmender wohnungsgrosse in der Regel mehr Umzugsgut und ein höherer Zeitaufwand verbunden sind. Hier finden Sie eine detaillierte Umzugsfirma Kosten Tabelle mit den durchschnittlichen Umzugspreisen nach Zimmeranzahl in der Schweiz. Diese Preise basieren auf Marktanalysen von über 500 Umzugsangeboten in der gesamten Schweiz. Die Kosten Umzugsunternehmen können je nach verschiedenen Faktoren variieren. Wenn Sie die Kosten für einen Umzug berechnen möchten, hilft Ihnen unser Umzugskosten Rechner dabei:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>1-1.5 Zimmer Umzug:</strong> Basispreis CHF 600, mit durchschnittlicher Distanz CHF 600-900 - Ideal für Studentenwohnungen oder kleine Wohnungen. Die Umzugskosten sind hier am niedrigsten, da weniger Möbel und Umzugsgut transportiert werden müssen.</li>
              <li><strong>2-2.5 Zimmer Umzug:</strong> Basispreis CHF 900, mit durchschnittlicher Distanz CHF 900-1'200 - Typisch für junge Paare oder Singles. Die Umzugskosten steigen moderat mit der Wohnungsgrösse.</li>
              <li><strong>3-3.5 Zimmer Umzug:</strong> Basispreis CHF 1'200, mit durchschnittlicher Distanz CHF 1'200-1'800 - Die häufigste Wohnungsgrösse in der Schweiz. Diese Umzugskosten gelten als Standard für Familien mit einem Kind.</li>
              <li><strong>4-4.5 Zimmer Umzug:</strong> Basispreis CHF 1'750, mit durchschnittlicher Distanz CHF 1'750-2'500 - Grössere Familienwohnungen erfordern mehr Zeit und Personal, was die Umzugskosten erhöht.</li>
              <li><strong>5.5+ Zimmer Umzug:</strong> Basispreis CHF 2'250, mit durchschnittlicher Distanz CHF 2'250-3'500 - Luxuswohnungen oder Einfamilienhäuser benötigen oft mehrere Umzugswagen und zusätzliches Personal, was die Umzugskosten deutlich steigen lässt.</li>
            </ul>
            <p className="text-body">
              Diese <strong>Schätzungen</strong> sind Richtwerte und können je nach Distanz, Zusatzleistungen und Umzugsunternehmen variieren. Unser <strong>Rechner</strong> ermittelt Ihre individuellen Kosten basierend auf Ihren Angaben.
            </p>
          </section>

          {/* EEAT Section - Authority, Expertise, Trust */}
          <section className="bg-white">
            <h2 id="wie-berechnet" className="heading-2 mb-4 scroll-mt-24">Wie werden die Umzugskosten berechnet?</h2>
            <p className="text-body mb-4">
              Unser Umzugskosten-Rechner basiert auf aktuellen Marktdaten von über 500 Umzugsangeboten aus der gesamten Schweiz. Die Preiskalkulation erfolgt nach folgender Methodik. Die Kosten für einen Umzug hängen von verschiedenen Faktoren ab. Zu den wichtigsten Kostenfaktoren zählen die Entfernung zwischen den Wohnorten, die Wohnungsgrosse, gewünschte Zusatzleistungen sowie der Buchungszeitpunkt – eine sorgfältige Planung dieser Kostenfaktoren kann helfen, die Umzugskosten zu senken. Auch das benötigte Material wie Verpackungs- und Montagematerialien fliesst in die Preiskalkulation mit ein. Ein professionelles Umzugsunternehmen berechnet die Kosten oft pro Stunde oder basierend auf dem Umfang des Umzugs. Wenn Sie von Ihrer alten Wohnung umziehen, sollten Sie alle verschiedenen Faktoren berücksichtigen:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                <h3 className="heading-3 mb-2">Datenbasis</h3>
                <p className="text-body text-sm">Aktuelle Preise von über 500 geprüften Umzugsfirmen in der Schweiz, aktualisiert monatlich.</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                <h3 className="heading-3 mb-2">Berechnungsfaktoren</h3>
                <p className="text-body text-sm">Wohnungsgrösse (Zimmeranzahl), Distanz (km), Zusatzleistungen (Reinigung, Möbelmontage). Die <strong>Kosten für einen Umzug</strong> werden durch <strong>verschiedene Faktoren</strong> beeinflusst. Ein <strong>Umzug mit einer Umzugsfirma</strong> kann <strong>pro Stunde</strong> berechnet werden oder basierend auf dem Umfang.</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                <h3 className="heading-3 mb-2">Preisstruktur</h3>
                <p className="text-body text-sm">Basispreise: CHF 600-2'250 je nach Zimmeranzahl. Distanzkosten: CHF 2 pro km. Zusatzleistungen: CHF 400-500.</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                <h3 className="heading-3 mb-2">Aktualität</h3>
                <p className="text-body text-sm">Preisdaten werden monatlich aktualisiert, um aktuelle Marktpreise widerzuspiegeln.</p>
              </div>
            </div>
            <p className="text-body">
              Hinweis: Die berechneten Preise sind Schätzungen basierend auf Durchschnittswerten. Wenn Sie ein Angebot einholen, erhalten Sie ein detailliertes Angebot von einem professionellen Umzugsunternehmen. Für eine verbindliche Offerte empfehlen wir, mehrere Umzug Angebot vergleichen von verschiedenen Anbietern. So können Sie genau wissen, was kostet ein Umzug und die besten Kosten Umzugsunternehmen vergleichen.
            </p>
          </section>

          <section className="bg-white">
            <h2 id="preis-pro-km" className="heading-2 mb-4 scroll-mt-24">Umzug Preis pro km und versteckte Kosten</h2>
            <p className="text-body mb-4">
              Neben den Grundkosten für einen Umzug gibt es oft versteckte Kosten, die viele Menschen übersehen. Der Umzug Preis pro km beträgt typischerweise CHF 2, kann aber je nach Anbieter variieren. Ein professionelles Umzugsunternehmen berechnet die Kosten oft pro Stunde oder basierend auf verschiedenen Faktoren. Wenn Sie von Ihrer alten Wohnung umziehen, sollten Sie auch diese versteckten Kosten einplanen. Diese zusätzlichen Kosten können Ihr Umzugsbudget erheblich beeinflussen:
            </p>
            <p className="text-body mb-4">
              Ein häufiger Kostenfaktor sind Aufzuggebühren, wenn kein Lift vorhanden ist oder der Zugang erschwert ist. In solchen Fällen kann der Einsatz eines Möbellifts notwendig werden. Ein Möbellift erleichtert den Transport von Möbeln aus höheren Stockwerken erheblich, verursacht jedoch zusätzliche Mietkosten. Oft wird der Möbellift inklusive Bedienpersonal angeboten, was den Umzug effizienter und sicherer macht.
            </p>
            <p className="text-body mb-4">
              Zusätzlich können weitere Dienstleistungen wie Verpackungsmaterial, Ein- und Auspackservice oder die Entsorgung von Altmöbeln anfallen. Die Inanspruchnahme bestimmter Zusatzleistungen, wie zum Beispiel ein Möbellift, kann den Stress beim Umzug deutlich reduzieren und die Organisation erleichtern.
            </p>
            <p className="text-body mb-4">
              Ein weiterer wichtiger finanzieller Aspekt beim Umzug in der Schweiz ist die Mietkaution. Häufig ist die Kaution für die alte Wohnung noch nicht zurückgezahlt, während für die neue Wohnung bereits eine neue Mietkaution hinterlegt werden muss. Da die maximale Höhe der Mietkaution in der Schweiz bis zu drei Monatsmieten betragen kann, sollten Sie ausreichend finanzielle Reserven einplanen, um diese Doppelbelastung abzufedern.
            </p>
            <div className="mb-6">
              <img 
                src="/image/umzugsservice-Schweiz/umzugskosten.png"
                alt="Umzugskosten Rechner" 
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="heading-3 mb-2">Parkgebühren & Parkverbote</h3>
                <p className="text-body text-sm">Für Umzugswagen benötigen Sie oft Parkverbotsschilder, die CHF 50-150 kosten können.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="heading-3 mb-2">Aufzuggebühren</h3>
                <p className="text-body text-sm">In Hochhäusern können Aufzuggebühren CHF 100-300 betragen, besonders bei sperrigen Möbeln.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="heading-3 mb-2">Verpackungsmaterial</h3>
                <p className="text-body text-sm">Kartons, Folie und Verpackungsmaterial können CHF 200-500 zusätzlich kosten.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="heading-3 mb-2">Umzugsversicherung</h3>
                <p className="text-body text-sm">Eine Transportversicherung für wertvolle Möbel kostet CHF 100-300, ist aber empfehlenswert.</p>
              </div>
            </div>
            <p className="text-body">
              Unser Umzugskosten Rechner berücksichtigt die wichtigsten verschiedenen Faktoren, aber für eine vollständige Kalkulation sollten Sie nach der ersten Einschätzung detaillierte Offerten von mehreren Umzugsfirmen anfordern und vergleichen. Wenn Sie ein Angebot einholen, erhalten Sie ein detailliertes Angebot von einem professionellen Umzugsunternehmen, das alle Kosten für einen Umzug transparent auflistet.
            </p>
          </section>

          <section className="bg-white">
            <h2 id="ablauf-tipps" className="heading-2 mb-6 scroll-mt-24">Beim Umzug: Ablauf und praktische Tipps</h2>
            <p className="text-body">
              Ein gelungener Umzug beginnt mit einer durchdachten Planung. Erstellen Sie am besten frühzeitig eine Checkliste, die alle wichtigen Aufgaben rund um den Umzug abdeckt – vom Packen der Kartons über die Organisation von Umzugshelfern bis hin zur rechtzeitigen Buchung eines Umzugsunternehmens. Beim Umzug selbst ist es ratsam, verschiedene Offerten von Umzugsfirmen einzuholen und die Angebote sorgfältig zu vergleichen. So finden Sie das beste Preis-Leistungs-Verhältnis für Ihre Bedürfnisse. Überlegen Sie zudem, ob Sie den Umzug komplett in Eigenregie (DIY Umzug) durchführen oder lieber auf die Erfahrung eines professionellen Umzugsunternehmens setzen möchten. Während ein DIY Umzug oft günstiger ist, profitieren Sie beim Profi von einem eingespielten Umzugsteam, das Ihre Möbel sicher und effizient transportiert. Letztlich hängt die Wahl von Ihren persönlichen Prioritäten, dem verfügbaren Budget und dem Umfang des Umzugs ab. Mit einer guten Planung und den richtigen Partnern wird der Umzug deutlich entspannter und stressfreier.
            </p>
          </section>

          <section className="bg-white max-w-4xl mx-auto">
            <h2 id="haeufige-fragen" className="heading-2 mb-6 text-center scroll-mt-24">Häufige Fragen zu Umzugskosten und Preisen</h2>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index} 
                  value={`item-${index}`}
                  className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4 px-5 transition-colors">
                    <h4 className="faq-question flex-1 pr-4">{item.question}</h4>
                  </AccordionTrigger>
                  <AccordionContent className="pt-0 pb-5 px-5 border-t border-gray-100">
                    <p className="text-body whitespace-pre-wrap">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section className="bg-white">
            <h2 id="fazit" className="heading-2 mb-6 scroll-mt-24">Fazit</h2>
            <p className="text-body">
              Die Umzugskosten sind von vielen verschiedenen Faktoren abhängig und können je nach Situation stark variieren. Eine sorgfältige Planung und die Berücksichtigung aller relevanten Aspekte sind entscheidend, um den Umzug effizient und kostengünstig zu gestalten. Nutzen Sie die Tipps zur Wahl des passenden Umzugsunternehmens, vergleichen Sie Angebote und behalten Sie Ihr Budget stets im Blick. Mit einer strukturierten Vorbereitung, dem richtigen Partner an Ihrer Seite und einer klaren Übersicht über die anfallenden Kosten wird der Umzug zu einem erfolgreichen Schritt in Ihr neues Zuhause. So starten Sie entspannt und gut organisiert in Ihren neuen Lebensabschnitt.
            </p>
          </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UmzugskostenRechnerPageClient;
