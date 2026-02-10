'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  ArrowRight, CheckCircle, Users, ShieldCheck, Clock, TrendingUp, 
  Wrench, HeartHandshake, MapPin, Home, Star, HelpCircle, Info, Calculator,
  Building, Globe, PackagePlus, Sparkles, Trash2, Brush as PaintBrush, Box, ChevronRight
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Lazy load components for better performance
const UmzugTypesSidebar = dynamic(() => import('@/components/UmzugPageParts/UmzugTypesSidebar'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-2xl" />
});
const PricingTable = dynamic(() => import('@/components/SEO/PricingTable'));
const HowItWorks = dynamic(() => import('@/components/SEO/HowItWorks'));
const WhyChooseUs = dynamic(() => import('@/components/SEO/WhyChooseUs'));

const UmzugshilfePageClient = () => {
  const router = useRouter();
  const imageUrl = '/image/umzugsservice-Schweiz/umzugshilfe-finden-vergleichen.png';

  // SEO Data
  const metaTitle = "Umzugshilfe finden & vergleichen » Kostenlose Offerten";
  const metaDescription = "Umzugshilfe finden ✓ Bis zu 5 kostenlose Offerten von geprüften Umzugshelfern und Umzugsfirmen. Professionelle Umzugshilfe für Privatumzug, Geschäftsumzug – schnell, sicher und bis zu 40% günstiger. Jetzt kostenlos Offerten anfordern!";
  const canonicalUrl = "https://online-offerten.ch/umzugsfirma/umzugshilfe";
  const ogImageUrl = "https://online-offerten.ch/image/umzugsservice-Schweiz/umzugshilfe-finden-vergleichen.webp";

  // FAQ Data for Schema
  const faqItemsForSchema = [
    {"q": "Was ist Umzugshilfe und wann brauche ich sie?", "a": "Umzugshilfe umfasst professionelle Unterstützung beim Umzug, von Umzugshelfern bis hin zu vollständigen Umzugsservices. Sie ist ideal, wenn Sie Unterstützung beim Tragen, Verpacken oder Transportieren benötigen."},
    {"q": "Was kostet Umzugshilfe in der Schweiz?", "a": "Die Kosten variieren je nach Grösse der Wohnung oder des Hauses. Ein kleiner Umzug (1 Zimmer) startet ab 600 CHF, während ein mittlerer Umzug (3 Zimmer) zwischen 1.200-2.000 CHF kostet. Für grössere Umzüge (Haus) beginnen die Preise ab 2.500 CHF. Ein Vergleich mehrerer Offerten hilft Ihnen, das beste Angebot zu finden."},
    {"q": "Was ist der Unterschied zwischen Umzugshilfe und einer Umzugsfirma?", "a": "Umzugshilfe bietet flexible Unterstützung (z.B. nur Tragen oder Verpacken), während eine Umzugsfirma einen vollständigen Service inklusive Transport anbietet. Beide Optionen können kombiniert werden."},
    {"q": "Wie finde ich zuverlässige Umzugshelfer?", "a": "Über unsere Plattform erhalten Sie Offerten von geprüften Umzugshelfern und Umzugsfirmen. Alle Partner werden sorgfältig überprüft und haben positive Bewertungen von anderen Kunden."}
  ];

  // Single JSON-LD Service schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": metaTitle,
    "serviceType": "Umzugsvermittlung",
    "description": metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch"
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
      "name": "Kostenlose Offerte für Umzugshilfe"
    }
  };

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=umzug&step=2');
  };

  // Services for Sidebar
  const services = [
    { name: 'Umzugshilfe', icon: Users, path: '/umzugsfirma/umzugshilfe', active: true },
    { name: 'Privatumzug', icon: Home, path: '/umzugsfirma/privatumzug' },
    { name: 'Geschäftsumzug', icon: Building, path: '/umzugsfirma/geschaeftsumzug' },
    { name: 'Internationale Umzüge', icon: Globe, path: '/umzugsfirma/internationale-umzuege' },
    { name: 'Spezialtransporte', icon: Box, path: '/umzugsfirma/spezialtransporte' },
    { name: 'Klaviertransport', icon: PackagePlus, path: '/umzugsfirma/spezialtransporte/klaviertransport' },
    { name: 'Reinigung', icon: Sparkles, path: '/reinigung' },
    { name: 'Räumung & Entsorgung', icon: Trash2, path: '/raeumung-entsorgung' },
    { name: 'Malerarbeiten', icon: PaintBrush, path: '/malerarbeitenkosten' },
  ];

  // Cost Table Data
  const costTableData = [
    { size: "Kleiner Umzug (1 Zimmer)", cost: "Ab 600 CHF" },
    { size: "Mittlerer Umzug (3 Zimmer)", cost: "1.200-2.000 CHF" },
    { size: "Grosser Umzug (Haus)", cost: "Ab 2.500 CHF" }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="bg-gradient-to-br from-slate-50 via-gray-100 to-slate-100">
        
        {/* Hero Section */}
        <section
          className="relative w-full bg-gray-100 py-12 md:py-16"
        >
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            {/* Breadcrumb Navigation */}
            <nav className="mb-4 pt-4" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-green-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </li>
                <li>
                  <Link href="/umzugsfirma" className="hover:text-green-600 transition-colors">
                    Umzugsfirma
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </li>
                <li className="text-gray-900 font-medium" aria-current="page">
                  Umzugshilfe
                </li>
              </ol>
            </nav>
            
            <div className="grid md:grid-cols-3 gap-6 md:gap-0 items-center">
              <article className="md:col-span-2 bg-gray-100 px-8 md:px-10 py-8 md:py-12 rounded-l-2xl md:rounded-l-2xl">
                <div>
                  <h1 className="heading-1">
                    Umzugshilfe finden & vergleichen
                  </h1>
                  <h2 className="heading-2">
                    Professionelle Unterstützung für Ihren Umzug
                  </h2>
                </div>
                <p className="text-base md:text-body mb-6 leading-relaxed font-medium">
                  Benötigen Sie Unterstützung beim Umzug? Finden Sie geprüfte Umzugshelfer und Umzugsfirmen in Ihrer Region. Von flexibler Umzugshilfe bis hin zum vollständigen Umzugsservice – vergleichen Sie kostenlos mehrere Offerten und sparen Sie bis zu 40%.
                </p>
                <div className="mb-6">
                  <Button
                    size="lg"
                    onClick={handleCtaClick}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold group px-6 py-4 text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Unverbindliche Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
                <div className="bg-green-50 rounded-lg p-4 md:p-6 flex flex-wrap gap-4 md:gap-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-body font-medium">Flexible Umzugshilfe</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-body font-medium">Geprüfte Helfer & Firmen</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-body font-medium">Kostenfrei & ohne Verpflichtung</span>
                  </div>
                </div>
              </article>
              <aside className="md:col-span-1 relative h-64 md:h-auto md:min-h-[400px] overflow-hidden md:pl-4" aria-label="Umzugshilfe Dienstleistung Illustration">
                <figure className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-tr from-green-900/20 via-transparent to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute inset-0 rounded-2xl ring-4 ring-green-500/10 pointer-events-none z-20"></div>
                  
                <Image
                  src={imageUrl}
                  alt="Professionelle Umzugshilfe - Geprüfte Umzugshelfer bei der Arbeit"
                  className="w-full h-full object-cover rounded-2xl"
                  loading="eager"
                  priority
                  width={600}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-full pointer-events-none z-30"></div>
                  
                  <figcaption className="sr-only">Professionelle Umzugshelfer bei der Arbeit</figcaption>
                </figure>
              </aside>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <HowItWorks
            title="So einfach ist es"
            ctaText="Jetzt kostenlose Umzugshilfe-Offerten anfordern"
            ctaLink="/kostenlose-offerte-anfordern?service=umzug&step=2"
          />
        </div>

        {/* Why Choose Us Section */}
        <div className="container mx-auto max-w-7xl px-4 md:px-6 pb-12 md:pb-16">
          <WhyChooseUs
            title="Warum Online-Offerten.ch?"
            subtitle="Ihre Vorteile beim Vergleich von Umzugshilfe-Offerten"
            advantages={[
              {
                icon: <ShieldCheck className="h-8 w-8" />,
                title: "Geprüfte Umzugshelfer & Firmen",
                description: "Alle unsere Partner werden sorgfältig geprüft. Sie erhalten nur Offerten von vertrauenswürdigen, zertifizierten Umzugshelfern und Umzugsfirmen."
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Bis zu 40% sparen",
                description: "Durch den Vergleich mehrerer Umzugshilfe-Offerten finden Sie das beste Preis-Leistungs-Verhältnis und sparen erheblich."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Flexible Lösungen",
                description: "Von einzelnen Umzugshelfern bis hin zum vollständigen Service – finden Sie genau die Unterstützung, die Sie benötigen."
              }
            ]}
          />
        </div>

        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
            
            <main 
              className="lg:col-span-2 bg-white p-6 md:p-10 rounded-2xl shadow-2xl space-y-8"
            >
              {/* Article Section 1 */}
              <section>
                <p className="text-body leading-relaxed mb-4">
                  Ein Umzug kann körperlich anstrengend und zeitaufwändig sein. Ob Sie nur Unterstützung beim Tragen schwerer Möbel benötigen, Hilfe beim Verpacken Ihrer Habseligkeiten suchen oder einen vollständigen Umzugsservice wünschen – professionelle Umzugshilfe macht den Unterschied.
                </p>
                <p className="text-body leading-relaxed">
                  Umzugshilfe umfasst verschiedene Formen der Unterstützung: Von flexiblen Umzugshelfern, die stundenweise arbeiten, bis hin zu vollständigen Umzugsfirmen, die den gesamten Umzug übernehmen. Egal ob Sie nur ein paar starke Hände für den Umzugstag brauchen oder eine komplette Lösung suchen – wir finden die passende Unterstützung für Sie.
                </p>
                <p className="text-body leading-relaxed mt-4">
                  In der Schweiz gibt es viele Anbieter für Umzugshilfe. Doch wie finden Sie zuverlässige Umzugshelfer oder Umzugsfirmen, die ein faires Preis-Leistungs-Verhältnis bieten? Vergleichen Sie Offerten kostenlos und finden Sie die beste Lösung für Ihren Umzug.
                </p>
              </section>

              {/* Article Section 2 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="heading-2 flex items-center">
                  <Users size={28} className="mr-3 text-blue-500" />
                  Was ist Umzugshilfe?
                </h2>
                <p className="text-body leading-relaxed mb-4">
                  Umzugshilfe bezeichnet professionelle Unterstützung beim Umzug. Dies kann verschiedene Formen annehmen:
                </p>
                <ul className="space-y-2 list-inside list-disc mb-4 text-gray-700">
                  <li><strong>Umzugshelfer:</strong> Flexible Unterstützung stundenweise, ideal für kleinere Umzüge oder wenn Sie nur zusätzliche Hände benötigen.</li>
                  <li><strong>Teilservice:</strong> Unterstützung bei bestimmten Aufgaben wie Verpacken, Tragen oder Möbelmontage.</li>
                  <li><strong>Vollservice:</strong> Komplette Übernahme des Umzugs durch eine professionelle Umzugsfirma.</li>
                </ul>
                <p className="text-body leading-relaxed">
                  Je nach Ihren Bedürfnissen können Sie die passende Form der Umzugshilfe wählen. Ein Vergleich mehrerer Offerten hilft Ihnen, die beste Lösung zu finden.
                </p>
              </section>

              {/* Article Section 3 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="heading-2 flex items-center">
                  <Clock size={28} className="mr-3 text-purple-500" />
                  Wann brauche ich Umzugshilfe?
                </h2>
                <p className="text-body leading-relaxed mb-4">
                  Umzugshilfe ist in verschiedenen Situationen sinnvoll:
                </p>
                <ul className="space-y-2 list-inside list-disc mb-4 text-gray-700">
                  <li>Sie haben schwere Möbel oder Geräte, die Sie nicht alleine tragen können</li>
                  <li>Sie haben wenig Zeit und benötigen schnelle Unterstützung</li>
                  <li>Sie möchten Verletzungen vermeiden und professionelle Hilfe in Anspruch nehmen</li>
                  <li>Sie benötigen Hilfe beim Verpacken oder Organisieren</li>
                  <li>Sie wünschen einen stressfreien Umzug ohne körperliche Belastung</li>
                </ul>
                <p className="text-body leading-relaxed">
                  Professionelle Umzugshilfe spart nicht nur Zeit, sondern reduziert auch das Verletzungsrisiko und sorgt für einen reibungslosen Ablauf.
                </p>
              </section>

              {/* Article Section 4 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="heading-2">
                  Was kostet Umzugshilfe in der Schweiz?
                </h2>
                <p className="text-body leading-relaxed mb-4">
                  Die Kosten für Umzugshilfe variieren je nach Grösse der Wohnung oder des Hauses. Ein kleiner Umzug (1 Zimmer) startet ab 600 CHF, während ein mittlerer Umzug (3 Zimmer) zwischen 1.200-2.000 CHF kostet. Für grössere Umzüge (Haus) beginnen die Preise ab 2.500 CHF.
                </p>
                <div className="my-4">
                  <PricingTable
                    title="Preise für Umzugshilfe"
                    subtitle="Durchschnittliche Preise in der Schweiz"
                    rows={costTableData.map(item => ({
                      size: item.size,
                      cost: item.cost,
                      description: item.size.includes('Kleiner') ? '1-Zimmer-Wohnung' : 
                                   item.size.includes('Mittlerer') ? '3-Zimmer-Wohnung' :
                                   'Haus oder grössere Wohnung'
                    }))}
                    serviceType="umzug"
                  />
                </div>
                <p className="text-body leading-relaxed mt-4">
                  Für eine genauere Schätzung empfehlen wir die Nutzung unseres <Link href="/umzugsfirma/umzugskosten" className="text-green-600 hover:underline font-semibold">Umzugskosten-Rechners</Link>. Damit erhalten Sie eine detaillierte Kostenschätzung für Ihr individuelles Projekt.
                </p>
              </section>

              {/* Article Section 5 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="heading-2 flex items-center">
                  <ShieldCheck size={28} className="mr-3 text-red-500" />
                  Sicherheit und Versicherung
                </h2>
                <p className="text-body leading-relaxed mb-4">
                  Bei professioneller Umzugshilfe sind Sie abgesichert. Seriöse Umzugshelfer und Umzugsfirmen verfügen über die notwendigen Versicherungen.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h3 className="font-bold text-body mb-2">Transportversicherung</h3>
                  <p className="text-body leading-relaxed">
                    Diese ist bei seriösen Anbietern standardmässig inbegriffen und deckt Schäden, die während des Umzugs entstehen.
                  </p>
                  <h3 className="font-bold text-body mt-4 mb-2">Haftpflichtversicherung</h3>
                  <p className="text-body leading-relaxed">
                    Diese Versicherung deckt Schäden, die im Treppenhaus oder an der Immobilie selbst entstehen. Fragen Sie bei der Auswahl immer nach den inkludierten Versicherungsleistungen.
                  </p>
                </div>
              </section>

              {/* Article Section 6 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="heading-2 flex items-center">
                  <Wrench size={28} className="mr-3 text-indigo-500" />
                  Arten von Umzugshilfe
                </h2>
                <p className="text-body leading-relaxed mb-4">
                  Es gibt verschiedene Arten von Umzugshilfe, die Sie je nach Bedarf kombinieren können:
                </p>
                <ul className="space-y-2 list-inside list-disc mb-4 text-gray-700">
                  <li><strong>Tragehilfe:</strong> Unterstützung beim Tragen schwerer Möbel und Kartons</li>
                  <li><strong>Verpackungshilfe:</strong> Professionelle Verpackung Ihrer Habseligkeiten</li>
                  <li><strong>Möbelmontage:</strong> Abbau und Aufbau von Möbeln</li>
                  <li><strong>Transport:</strong> Transport Ihrer Möbel mit professionellem Fahrzeug</li>
                  <li><strong>Vollservice:</strong> Komplette Übernahme aller Umzugsaufgaben</li>
                </ul>
              </section>

              {/* Article Section 7 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="heading-2 flex items-center">
                  <HeartHandshake size={28} className="mr-3 text-pink-500" />
                  So finden Sie zuverlässige Umzugshilfe
                </h2>
                <p className="text-body leading-relaxed mb-4">
                  Bei der Auswahl von Umzugshilfe sollten Sie auf folgende Punkte achten:
                </p>
                <ul className="space-y-2 list-inside list-disc mb-4 text-gray-700">
                  <li>Transparente Offerten mit klarer Kostenaufstellung</li>
                  <li>Versicherungsnachweis (Transport- und Haftpflichtversicherung)</li>
                  <li>Positive Kundenbewertungen und Referenzen</li>
                  <li>Offizielle Registrierung im Handelsregister</li>
                  <li>Professionelles Auftreten und Kommunikation</li>
                </ul>
                <p className="text-body leading-relaxed">
                  Über unsere Plattform können Sie Offerten kostenlos vergleichen. Sie erhalten ausschliesslich Offerten von geprüften und bewerteten Umzugshelfern und Umzugsfirmen aus Ihrer Region.
                </p>
              </section>

              {/* Article Section 8 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="heading-2 flex items-center">
                  <MapPin size={28} className="mr-3 text-cyan-500" />
                  Lokale Umzugshilfe in Ihrer Region
                </h2>
                <p className="text-body leading-relaxed mb-4">
                  Lokale Umzugshelfer und Umzugsfirmen kennen die Gegebenheiten vor Ort, wie z.B. Parkregelungen oder Zufahrtsbeschränkungen. Das spart Zeit und Nerven am Umzugstag.
                </p>
                <p className="text-body leading-relaxed">
                  Wir vermitteln Ihnen Umzugshilfe in der ganzen Schweiz. Finden Sie den passenden Partner in <Link href="/umzugsfirma-in-der-naehe/zuerich" className="text-green-600 hover:underline font-semibold">Zürich</Link>, <Link href="/umzugsfirma-in-der-naehe/bern" className="text-green-600 hover:underline font-semibold">Bern</Link>, <Link href="/umzugsfirma-in-der-naehe/basel" className="text-green-600 hover:underline font-semibold">Basel</Link>, <Link href="/umzugsfirma-in-der-naehe/luzern" className="text-green-600 hover:underline font-semibold">Luzern</Link> und <Link href="/standorte" className="text-green-600 hover:underline font-semibold">vielen weiteren Standorten</Link>.
                </p>
              </section>

              {/* Conclusion */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="heading-2 flex items-center">
                  <Home size={28} className="mr-3 text-teal-500" />
                  Starten Sie jetzt mit professioneller Umzugshilfe
                </h2>
                <p className="text-body leading-relaxed">
                  Ein Umzug muss nicht kompliziert sein. Mit der richtigen Umzugshilfe wird der Umzug zu einem stressfreien Erlebnis. <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2" className="text-green-600 hover:underline font-semibold">Fordern Sie jetzt Ihre kostenlosen und unverbindlichen Offerten an</Link> und finden Sie die passende Unterstützung für Ihren Umzug.
                </p>
              </section>

              {/* Advantages Section */}
              <section className="pt-6 border-t border-gray-200">
                <h3 className="heading-3 flex items-center">
                  <Star size={28} className="mr-3 text-yellow-500" />
                  Ihre Vorteile auf einen Blick
                </h3>
                <ul className="space-y-3">
                  {[
                    "Kostenlos & Unverbindlich: Sie erhalten Offerten von geprüften Umzugshelfern und Umzugsfirmen, ohne jegliche Verpflichtung.",
                    "Geprüfte Qualität: Wir arbeiten nur mit bewerteten und qualifizierten Partnern zusammen.",
                    "Bis zu 40% sparen: Durch den direkten Preis- und Leistungsvergleich finden Sie die beste Offerte.",
                    "Flexible Lösungen: Von einzelnen Helfern bis hin zum Vollservice – finden Sie genau die Unterstützung, die Sie benötigen.",
                    "Regionale Partner: Wir finden für Sie die besten Umzugsprofis direkt aus Ihrer Nähe."
                  ].map((advantage, index) => (
                    <li
                      key={index}
                      className="flex items-start py-2"
                    >
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Related Services Section */}
              <section className="pt-8 border-t border-gray-200">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <h3 className="heading-3 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-green-600" />
                    Weitere Services
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li>
                      <Link href="/umzugsfirma/privatumzug" className="text-green-600 hover:underline font-medium flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Privatumzug Offerten vergleichen
                      </Link>
                    </li>
                    <li>
                      <Link href="/reinigung" className="text-green-600 hover:underline font-medium flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Umzugsreinigung mit Abnahmegarantie
                      </Link>
                    </li>
                    <li>
                      <Link href="/umzugsfirma/geschaeftsumzug" className="text-green-600 hover:underline font-medium flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Geschäftsumzug Offerten vergleichen
                      </Link>
                    </li>
                    <li>
                      <Link href="/umzugsfirma-in-der-naehe" className="text-green-600 hover:underline font-medium flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Umzugsfirma in Ihrer Nähe finden
                      </Link>
                    </li>
                    <li>
                      <Link href="/raeumung-entsorgung" className="text-green-600 hover:underline font-medium flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Räumung & Entsorgung
                      </Link>
                    </li>
                  </ul>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="pt-6 border-t border-gray-200">
                <h3 className="heading-3 flex items-center">
                  <HelpCircle size={28} className="mr-3 text-purple-500" />
                  Häufige Fragen zur Umzugshilfe
                </h3>
                <Accordion type="single" collapsible className="w-full bg-slate-50 rounded-lg shadow">
                  {/* FAQ 1 */}
                  <AccordionItem value="item-1" className="border-b border-gray-200 last:border-b-0">
                    <AccordionTrigger className="text-left hover:no-underline py-5 px-2 text-base font-semibold text-gray-700 hover:text-green-600 transition-colors">
                      <div className="flex items-center">
                        <HelpCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                        Was ist Umzugshilfe und wann brauche ich sie?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pb-5 px-2 text-gray-600 leading-relaxed">
                      <div className="flex items-start">
                        <Info className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                        <div>
                          <p>
                            Umzugshilfe umfasst professionelle Unterstützung beim Umzug, von Umzugshelfern bis hin zu vollständigen Umzugsservices. Sie ist ideal, wenn Sie Unterstützung beim Tragen, Verpacken oder Transportieren benötigen. Besonders bei schweren Möbeln, wenig Zeit oder wenn Sie Verletzungen vermeiden möchten, ist professionelle Umzugshilfe empfehlenswert.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* FAQ 2 */}
                  <AccordionItem value="item-2" className="border-b border-gray-200 last:border-b-0">
                    <AccordionTrigger className="text-left hover:no-underline py-5 px-2 text-base font-semibold text-gray-700 hover:text-green-600 transition-colors">
                      <div className="flex items-center">
                        <HelpCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                        Was kostet Umzugshilfe in der Schweiz?
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pb-5 px-2 text-gray-600 leading-relaxed">
                      <div className="flex items-start">
                        <Info className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="mb-2">
                            Die Kosten variieren je nach Grösse der Wohnung oder des Hauses. Ein kleiner Umzug (1 Zimmer) startet ab 600 CHF, während ein mittlerer Umzug (3 Zimmer) zwischen 1.200-2.000 CHF kostet. Für grössere Umzüge (Haus) beginnen die Preise ab 2.500 CHF. Hier ist eine grobe Übersicht:
                          </p>
                          <div className="my-4">
                            <PricingTable
                              title="Preise für Umzugshilfe"
                              subtitle="Durchschnittliche Preise in der Schweiz"
                              rows={costTableData.map(item => ({
                                size: item.size,
                                cost: item.cost,
                                description: item.size.includes('Helfer') ? 'Stundenweise Unterstützung' : 
                                             item.size.includes('Kleine') ? '2-3 Stunden Unterstützung' :
                                             item.size.includes('Mittlere') ? '4-6 Stunden Unterstützung' :
                                             'Vollständiger Umzugsservice'
                              }))}
                              serviceType="umzug"
                            />
                          </div>
                          <p className="mt-3 text-sm text-gray-600">Tipp: Vergleichen Sie Offerten kostenlos, um das beste Preis-Leistungs-Verhältnis zu finden.</p>
                          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                            <div className="flex items-start md:items-center">
                              <Calculator className="w-8 h-8 md:w-6 md:h-6 mr-3 text-green-600 flex-shrink-0 mt-1 md:mt-0" />
                              <p className="text-sm text-green-700 flex-grow">Nutzen Sie unseren Rechner für eine detaillierte Analyse Ihrer Umzugskosten.</p>
                            </div>
                            <Button asChild size="sm" className="mt-3 w-full md:w-auto bg-green-600 hover:bg-green-700 text-white group">
                              <Link href="/umzugsfirma/umzugskosten">
                                Jetzt Kosten berechnen
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* FAQ 3 */}
                  <AccordionItem value="item-3" className="border-b border-gray-200 last:border-b-0">
                    <AccordionTrigger className="text-left hover:no-underline py-5 px-2 text-base font-semibold text-gray-700 hover:text-green-600 transition-colors">
                      <div className="flex items-center">
                        <HelpCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                        <h4 className="faq-question">Was ist der Unterschied zwischen Umzugshilfe und einer Umzugsfirma?</h4>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pb-5 px-2 text-gray-600 leading-relaxed">
                      <div className="flex items-start">
                        <Info className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="mb-2">
                            Umzugshilfe bietet flexible Unterstützung (z.B. nur Tragen oder Verpacken), während eine Umzugsfirma einen vollständigen Service inklusive Transport anbietet. Beide Optionen können kombiniert werden:
                          </p>
                          <ul className="list-disc list-inside space-y-1">
                            <li><strong>Umzugshilfe:</strong> Flexible, stundenweise Unterstützung für spezifische Aufgaben</li>
                            <li><strong>Umzugsfirma:</strong> Vollständiger Service mit eigenem Fahrzeug und kompletter Übernahme</li>
                            <li><strong>Kombination:</strong> Sie können Umzugshilfe für bestimmte Aufgaben nutzen und den Rest selbst übernehmen</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* FAQ 4 */}
                  <AccordionItem value="item-4" className="border-b border-gray-200 last:border-b-0">
                    <AccordionTrigger className="text-left hover:no-underline py-5 px-2 text-base font-semibold text-gray-700 hover:text-green-600 transition-colors">
                      <div className="flex items-center">
                        <HelpCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                        <h4 className="faq-question">Wie finde ich zuverlässige Umzugshelfer?</h4>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pb-5 px-2 text-gray-600 leading-relaxed">
                      <div className="flex items-start">
                        <Info className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="mb-2">
                            Über unsere Plattform erhalten Sie Offerten von geprüften Umzugshelfern und Umzugsfirmen. Alle Partner werden sorgfältig überprüft und haben positive Bewertungen von anderen Kunden. Achten Sie auf:
                          </p>
                          <ul className="list-disc list-inside space-y-1">
                            <li>Transparente Offerten mit klarer Kostenaufstellung</li>
                            <li>Versicherungsnachweis</li>
                            <li>Positive Kundenbewertungen</li>
                            <li>Offizielle Registrierung</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* FAQ 5 */}
                  <AccordionItem value="item-5" className="border-b border-gray-200 last:border-b-0">
                    <AccordionTrigger className="text-left hover:no-underline py-5 px-2 text-base font-semibold text-gray-700 hover:text-green-600 transition-colors">
                      <div className="flex items-center">
                        <HelpCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                        <h4 className="faq-question">Kann ich Umzugshilfe nur für bestimmte Aufgaben buchen?</h4>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pb-5 px-2 text-gray-600 leading-relaxed">
                      <div className="flex items-start">
                        <Info className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                        <div>
                          <p>
                            Ja, absolut! Umzugshilfe ist flexibel. Sie können beispielsweise nur Hilfe beim Tragen schwerer Möbel, beim Verpacken oder bei der Möbelmontage buchen. Beschreiben Sie in Ihrer Anfrage genau, welche Unterstützung Sie benötigen, und Sie erhalten passende Offerten.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
            </main>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <UmzugTypesSidebar activeType={null} />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default UmzugshilfePageClient;

