'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  ArrowRight, CheckCircle, PackagePlus, ClipboardList, Users, ShieldCheck, 
  Wrench, HeartHandshake, MapPin, Home, Star, HelpCircle, Info, Calculator,
  Building, Globe, Pencil as Piano, Sparkles, Trash2, Brush as PaintBrush, Box,
  TrendingUp
} from 'lucide-react';
import UmzugTypesSidebar from '@/components/UmzugPageParts/UmzugTypesSidebar';
import PricingTable from '@/components/SEO/PricingTable';
import HowItWorks from '@/components/SEO/HowItWorks';
import WhyChooseUs from '@/components/SEO/WhyChooseUs';
import StructuredData from '@/components/SEO/StructuredData';

const PrivateUmzugPageClient = () => {
  const router = useRouter();
  const imageUrl = 'https://online-offerten.ch/image/umzugsservice-Schweiz/privatumzug-offerten-kostenlos-vergleichen.png';

  // SEO Data
  const metaTitle = "Privatumzug Offerten kostenlos vergleichen » Bis zu 40% sparen";
  const metaDescription = "Privatumzug Offerten kostenlos vergleichen ✓ Offerten von geprüften Umzugsfirmen vergleichen. Wohnungsumzug, Hausumzug – sicher, stressfrei und bis zu 40% günstiger. Jetzt kostenlos Offerten anfordern!";
  const canonicalUrl = "https://online-offerten.ch/privatumzug";
  const ogImageUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/31d61ce9d2ebb52fb5f267adfccd6051.png";

  // FAQ Data for Schema
  const faqItemsForSchema = [
    {"q": "Was kostet ein Privatumzug in der Schweiz?", "a": "Die Kosten variieren stark je nach Wohnungsgrösse und Distanz. Ein kleiner Umzug kann bei 600 CHF starten, ein grosser bei über 2.200 CHF. Ein Offertenvergleich ist essenziell."},
    {"q": "Wie lange im Voraus sollte ich eine Umzugsfirma buchen?", "a": "Wir empfehlen, mindestens 1-2 Monate im Voraus zu buchen, besonders in den Sommermonaten und zum Monatsende, da dies die geschäftigsten Zeiten sind."},
    {"q": "Ist mein Umzugsgut versichert?", "a": "Ja, bei professionellen Umzugsfirmen ist eine Transport- und Betriebshaftpflichtversicherung standardmässig enthalten. Klären Sie die Deckungssumme vorab."},
    {"q": "Bieten die Firmen auch eine Endreinigung an?", "a": "Viele Umzugsunternehmen bieten eine Umzugsreinigung mit Abnahmegarantie als Zusatzleistung an. Dies können Sie direkt in Ihrer Anfrage vermerken."}
  ];

  // Schema Data
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
            "name": "Privatumzug Offerten kostenlos vergleichen",
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "Service",
        "name": "Privatumzug Offerten kostenlos vergleichen",
        "serviceType": "Privatumzug",
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
            "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug",
          "priceCurrency": "CHF",
          "name": "Kostenlose Offerte für Privatumzug"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqItemsForSchema.map(item => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
      }
    ]
  };

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug');
  };

  // Services for Sidebar
  const services = [
    { name: 'Privatumzug', icon: Home, path: '/privatumzug', active: true },
    { name: 'Geschäftsumzug', icon: Building, path: '/geschaeftsumzug' },
    { name: 'Internationale Umzüge', icon: Globe, path: '/internationale-umzuege' },
    { name: 'Spezialtransporte', icon: Box, path: '/spezialtransporte' },
    { name: 'Klaviertransport', icon: Piano, path: '/klaviertransport' },
    { name: 'Reinigung', icon: Sparkles, path: '/reinigung' },
    { name: 'Räumung & Entsorgung', icon: Trash2, path: '/raeumung-entsorgung' },
    { name: 'Malerarbeiten', icon: PaintBrush, path: '/malerarbeiten' },
  ];

  // Cost Table Data
  const costTableData = [
    { size: "1.5 - 2.5 Zimmer", cost: "600 - 1.200 CHF" },
    { size: "3.5 Zimmer", cost: "1.100 - 1.800 CHF" },
    { size: "4.5 Zimmer", cost: "1.600 - 2.500 CHF" },
    { size: "5.5+ Zimmer", cost: "Ab 2.200 CHF" }
  ];

  return (
    <>
      <StructuredData
        breadcrumbs={[
          { name: 'Home', item: 'https://online-offerten.ch/' },
          { name: 'Privatumzug', item: 'https://online-offerten.ch/privatumzug' }
        ]}
        service={{
          name: 'Privatumzug Offerten vergleichen',
          serviceType: 'Privatumzug',
          description: metaDescription,
          url: 'https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug'
        }}
        faq={faqItemsForSchema.map(item => ({
          question: item.q,
          answer: item.a
        }))}
      />
      <div className="bg-gradient-to-br from-slate-50 via-gray-100 to-slate-100">
        
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full bg-gray-100 py-12 md:py-16"
          itemScope
          itemType="https://schema.org/Service"
        >
          <div className="container mx-auto max-w-navbar px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-6 md:gap-0 items-center">
              <article className="md:col-span-2 bg-gray-100 px-8 md:px-10 py-8 md:py-12 rounded-l-2xl md:rounded-l-2xl" itemProp="description">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
                    Privatumzug Offerten kostenlos vergleichen
                  </h1>
                  <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-bold mb-4">
                    Finden Sie die beste Umzugsfirma für Ihren Wohnungswechsel
                  </h2>
                </motion.div>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed font-medium"
                >
                  Erhalten Sie unverbindliche Angebote von zertifizierten Zügelfirmen in der ganzen Schweiz. Für Ihren Wohnungsumzug oder Hausumzug vermitteln wir Ihnen vertrauenswürdige Partner aus Ihrer Region – schnell, einfach und ohne versteckte Kosten.
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mb-6"
                >
                  <Button
                    size="lg"
                    onClick={handleCtaClick}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold group px-6 py-4 text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Unverbindliche Offerten anfordern
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="bg-green-50 rounded-lg p-4 md:p-6 flex flex-wrap gap-4 md:gap-6"
                >
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-base text-gray-700 font-medium">Bis zu 40% Ersparnis möglich</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-base text-gray-700 font-medium">Zertifizierte Partnerunternehmen</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-base text-gray-700 font-medium">Kostenfrei & ohne Verpflichtung</span>
                  </div>
                </motion.div>
              </article>
              <aside className="md:col-span-1 relative h-64 md:h-auto md:min-h-[400px] overflow-hidden md:pl-4" aria-label="Privatumzug Dienstleistung Illustration">
                <figure className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                  {/* Gradient Overlay for better text readability and modern look */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-green-900/20 via-transparent to-transparent z-10 pointer-events-none"></div>
                  
                  {/* Subtle border/shadow effect */}
                  <div className="absolute inset-0 rounded-2xl ring-4 ring-green-500/10 pointer-events-none z-20"></div>
                  
                <img
                  src={imageUrl}
                    alt="Zufriedene Familie nach erfolgreichem Privatumzug in der Schweiz - Professionelle Umzugsfirma bei der Arbeit"
                    className="w-full h-full object-cover rounded-2xl"
                  loading="eager"
                  fetchPriority="high"
                    width="600"
                    height="400"
                    itemProp="image"
                  />
                  
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-full pointer-events-none z-30"></div>
                  
                  <figcaption className="sr-only">Familie nach erfolgreichem Wohnungsumzug mit professioneller Umzugsfirma</figcaption>
                </figure>
              </aside>
            </div>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <div className="container mx-auto max-w-navbar px-4 md:px-6 py-12 md:py-16">
          <HowItWorks
            title="So einfach ist es"
            ctaText="Jetzt kostenlose Privatumzug-Offerten anfordern"
            ctaLink="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug"
          />
        </div>

        {/* Why Choose Us Section */}
        <div className="container mx-auto max-w-navbar px-4 md:px-6 pb-12 md:pb-16">
          <WhyChooseUs
            title="Warum Online-Offerten.ch?"
            subtitle="Ihre Vorteile beim Vergleich von Privatumzug-Offerten"
            advantages={[
              {
                icon: <ShieldCheck className="h-8 w-8" />,
                title: "Geprüfte Umzugsfirmen",
                description: "Alle unsere Partner werden sorgfältig geprüft. Sie erhalten nur Offerten von vertrauenswürdigen, zertifizierten Zügelfirmen."
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Bis zu 40% sparen",
                description: "Durch den Vergleich mehrerer Privatumzug-Offerten finden Sie das beste Preis-Leistungs-Verhältnis und sparen erheblich."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "100% kostenlos",
                description: "Die Anfrage ist vollständig kostenlos und unverbindlich. Keine versteckten Kosten, keine Verpflichtungen."
              }
            ]}
          />
        </div>

        <div className="container mx-auto max-w-navbar px-4 md:px-6 py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
            
            <motion.main 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-2 bg-white p-6 md:p-10 rounded-2xl shadow-2xl space-y-8"
            >
              {/* Article Section 1 */}
              <section>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ein Wohnungsumzug oder Hausumzug ist mehr als nur der Transport von Möbeln von A nach B. Es ist der Beginn eines neuen Kapitels. Ob Sie in eine grössere Wohnung ziehen, mit Ihrem Partner zusammenziehen oder einfach einen Tapetenwechsel brauchen – ein gut geplanter privater Umzug ist der Schlüssel zu einem reibungslosen Start. Eine professionelle Umzugsfirma kann Ihnen dabei helfen, den Prozess stressfrei und effizient zu gestalten.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Von der ersten Besichtigung über das sichere Verpacken Ihres Hab und Guts bis hin zum Transport und der Möbelmontage am neuen Ort – erfahrene Umzugsunternehmen bieten einen Rundum-Service, der genau auf Ihre Bedürfnisse zugeschnitten ist. Egal ob Wohnungsumzug in Zürich, Hausumzug in Bern oder Privatumzug in Basel – wir finden die passende Firma für Sie.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  In der Schweiz gibt es eine Vielzahl von Anbietern für Wohnungsumzüge. Doch wie finden Sie die richtige Zügelfirma, die zuverlässig arbeitet und ein faires Preis-Leistungs-Verhältnis bietet? Vergleichen Sie Offerten kostenlos und finden Sie die beste Offerte für Ihren Umzug.
                </p>
              </section>

              {/* Article Section 2 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <ClipboardList size={28} className="mr-3 text-blue-500" />
                  Die richtige Planung ist die halbe Miete
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Eine sorgfältige Planung ist das A und O für einen erfolgreichen Wohnungsumzug. Je früher Sie beginnen, desto entspannter wird der Umzugstag. Unsere Experten empfehlen, mindestens zwei bis drei Monate vor dem geplanten Datum mit der Organisation zu beginnen.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h3 className="font-bold text-lg text-gray-700 mb-2">Was gehört in einen Umzugsplan?</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Ein guter Plan umfasst die Kündigung des alten Mietvertrags, das Beantragen von Sonderurlaub, das Organisieren von Umzugskartons, das Ummelden bei Behörden und natürlich die Suche nach der passenden Umzugsfirma.
                  </p>
                  <h3 className="font-bold text-lg text-gray-700 mt-4 mb-2">Nutzen Sie unsere kostenlosen Umzugs-Checklisten!</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Damit Sie nichts Wichtiges vergessen, haben wir detaillierte Checklisten für jede Phase Ihres Umzugs erstellt. Laden Sie sie kostenlos herunter und behalten Sie den Überblick.
                  </p>
                  <Button asChild className="mt-4 bg-green-600 hover:bg-green-700 text-white group">
                    <Link href="/checklisten">
                      Zu den Checklisten
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </section>

              {/* Article Section 3 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Users size={28} className="mr-3 text-purple-500" />
                  Wann lohnt sich eine professionelle Umzugsfirma?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Viele Menschen überlegen, den Umzug mit Freunden und Familie selbst zu organisieren, um Kosten zu sparen. Doch eine professionelle Zügelfirma bietet entscheidende Vorteile, die sich oft auszahlen:
                </p>
                <ul className="space-y-2 list-inside list-disc mb-4 text-gray-700">
                  <li>Zeitersparnis: Profis arbeiten schnell und effizient.</li>
                  <li>Sicherheit: Ihr Eigentum ist während des Transports versichert.</li>
                  <li>Ausrüstung: Umzugsfirmen verfügen über professionelles Equipment wie Möbel-Lifte und spezielle Verpackungsmaterialien.</li>
                  <li>Kein Stress: Sie müssen sich nicht um die körperlich anstrengende Arbeit kümmern.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Ein professionelles Umzugsunternehmen ist besonders dann sinnvoll, wenn Sie viele Möbel, schwere Gegenstände oder eine grosse Wohnung haben. <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2" className="text-green-600 hover:underline font-semibold">Holen Sie sich unverbindliche Offerten</Link> und vergleichen Sie die Kosten mit dem Aufwand eines Umzugs in Eigenregie.
                </p>
              </section>

              {/* Article Section 4 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                  Was kostet ein Privatumzug in der Schweiz?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Die Kosten für einen Wohnungsumzug oder Hausumzug hängen von verschiedenen Faktoren ab: der Wohnungsgrösse, der Distanz zwischen den Wohnorten, dem Stockwerk und dem Umfang der gewünschten Dienstleistungen (z.B. Ein- und Auspackservice, Möbelmontage).
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Als grobe Richtlinie können Sie mit folgenden Preisen rechnen: Für eine 2.5-Zimmer-Wohnung beginnen die Kosten bei ca. 800 CHF, während ein Umzug einer 4.5-Zimmer-Wohnung zwischen 1'500 und 2'500 CHF kosten kann.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Für eine genauere Schätzung empfehlen wir die Nutzung unseres <Link href="/umzugskosten-rechner" className="text-green-600 hover:underline font-semibold">Umzugskosten-Rechners</Link>. Damit erhalten Sie eine detaillierte Kostenschätzung für Ihr individuelles Projekt.
                </p>
              </section>

              {/* Article Section 5 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <ShieldCheck size={28} className="mr-3 text-red-500" />
                  Versicherung: Auf Nummer sicher gehen
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ein entscheidender Vorteil einer professionellen Umzugsfirma ist der Versicherungsschutz. Sollte während des Transports etwas zu Bruch gehen, sind Sie abgesichert.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h3 className="font-bold text-lg text-gray-700 mb-2">Transportversicherung</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Diese ist bei seriösen Umzugsunternehmen standardmässig inbegriffen und deckt Schäden, die während des Transports durch die Firma verursacht werden.
                  </p>
                  <h3 className="font-bold text-lg text-gray-700 mt-4 mb-2">Betriebshaftpflichtversicherung</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Diese Versicherung deckt Schäden, die im Treppenhaus oder an der Immobilie selbst entstehen. Fragen Sie bei der Auswahl der Firma immer nach den inkludierten Versicherungsleistungen.
                  </p>
                </div>
              </section>

              {/* Article Section 6 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Wrench size={28} className="mr-3 text-indigo-500" />
                  Zusatzleistungen, die den Unterschied machen
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Moderne Zügelfirmen bieten weit mehr als nur den reinen Transport. Diese Zusatzleistungen können Ihnen viel Zeit und Mühe sparen:
                </p>
                <ul className="space-y-2 list-inside list-disc mb-4 text-gray-700">
                  <li>Ein- und Auspackservice: Ihr gesamtes Hab und Gut wird fachgerecht verpackt und am neuen Ort wieder ausgepackt.</li>
                  <li>Möbelmontage: Kleiderschränke, Betten und Regale werden von Profis ab- und wieder aufgebaut.</li>
                  <li>Endreinigung mit Abnahmegarantie: Die alte Wohnung wird besenrein oder sogar komplett für die Übergabe gereinigt.</li>
                </ul>
              </section>

              {/* Article Section 7 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <HeartHandshake size={28} className="mr-3 text-pink-500" />
                  Vertrauen und Qualität: Die richtige Firma finden
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Der Umzugsmarkt ist gross. Achten Sie bei der Wahl Ihrer Zügelfirma auf Qualitätssiegel, Kundenbewertungen und transparente Offerten. Ein persönlicher Besichtigungstermin vor Ort ist oft ein Zeichen von Seriosität.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Über unsere Plattform können Sie Offerten kostenlos vergleichen. Sie erhalten ausschliesslich Offerten von geprüften und bewerteten Umzugsunternehmen aus Ihrer Region. So können Sie sicher sein, einen vertrauenswürdigen Partner für Ihren Wohnungsumzug zu finden.
                </p>
              </section>

              {/* Article Section 8 */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <MapPin size={28} className="mr-3 text-cyan-500" />
                  Lokale Expertise für Ihren Umzug
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ob Sie einen Wohnungsumzug innerhalb einer Stadt planen oder in einen anderen Kanton umziehen – eine Firma mit lokaler Expertise kennt die Gegebenheiten vor Ort, wie z.B. Parkregelungen oder Zufahrtsbeschränkungen. Das spart Zeit und Nerven am Umzugstag. Egal ob Wohnungsumzug in Zürich, Hausumzug in Bern oder Privatumzug in Basel – lokale Umzugsfirmen kennen die Besonderheiten Ihrer Region.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Wir vermitteln Ihnen Umzugsfirmen in der ganzen Schweiz. Finden Sie den passenden Partner für Ihren Wohnungsumzug in <Link href="/umzugsfirma-zuerich" className="text-green-600 hover:underline font-semibold">Zürich</Link>, <Link href="/umzugsfirma-bern" className="text-green-600 hover:underline font-semibold">Bern</Link>, <Link href="/umzugsfirma-basel" className="text-green-600 hover:underline font-semibold">Basel</Link>, <Link href="/umzugsfirma-luzern" className="text-green-600 hover:underline font-semibold">Luzern</Link> und <Link href="/standorte" className="text-green-600 hover:underline font-semibold">vielen weiteren Standorten</Link>.
                </p>
              </section>

              {/* Conclusion */}
              <section className="pt-6 border-t border-gray-200">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Home size={28} className="mr-3 text-teal-500" />
                  Starten Sie jetzt Ihren stressfreien Privatumzug
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Ein Wohnungsumzug oder Hausumzug muss nicht kompliziert sein. Mit der richtigen Vorbereitung und einem zuverlässigen Partner an Ihrer Seite wird der Start in Ihr neues Zuhause zu einem positiven Erlebnis. <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2" className="text-green-600 hover:underline font-semibold">Fordern Sie jetzt Ihre kostenlosen und unverbindlichen Offerten an</Link> und machen Sie den ersten Schritt in Richtung eines entspannten Umzugs.
                </p>
              </section>

              {/* Advantages Section */}
              <section className="pt-6 border-t border-gray-200">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-5 flex items-center">
                  <Star size={28} className="mr-3 text-yellow-500" />
                  Ihre Vorteile auf einen Blick
                </h3>
                <ul className="space-y-3">
                  {[
                    "Kostenlos & Unverbindlich: Sie erhalten Offerten von geprüften Umzugsfirmen, ohne jegliche Verpflichtung.",
                    "Geprüfte Qualität: Wir arbeiten nur mit bewerteten und qualifizierten Umzugsfirmen zusammen.",
                    "Bis zu 40% sparen: Durch den direkten Preis- und Leistungsvergleich finden Sie die beste Offerte.",
                    "Zeitersparnis: Statt mühsam selbst zu suchen, erhalten Sie passende Offerten direkt in Ihr Postfach.",
                    "Regionale Partner: Wir finden für Sie die besten Umzugsprofis direkt aus Ihrer Nähe."
                  ].map((advantage, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="flex items-start py-2"
                    >
                      <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{advantage}</span>
                    </motion.li>
                  ))}
                </ul>
              </section>

              {/* Related Services Section */}
              <section className="pt-8 border-t border-gray-200">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-green-600" />
                    Weitere Services
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li>
                      <Link href="/reinigung" className="text-green-600 hover:underline font-medium flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Umzugsreinigung mit Abnahmegarantie
                      </Link>
                    </li>
                    <li>
                      <Link href="/geschaeftsumzug" className="text-green-600 hover:underline font-medium flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Geschäftsumzug Offerten vergleichen
                      </Link>
                    </li>
                    <li>
                      <Link href="/internationale-umzuege" className="text-green-600 hover:underline font-medium flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Internationale Umzüge
                      </Link>
                    </li>
                    <li>
                      <Link href="/malerarbeiten" className="text-green-600 hover:underline font-medium flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Malerarbeiten Offerten vergleichen
                      </Link>
                    </li>
                    <li>
                      <Link href="/raeumung-entsorgung" className="text-green-600 hover:underline font-medium flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Räumung & Entsorgung
                      </Link>
                    </li>
                    <li>
                      <Link href="/umzugsfirma-in-der-naehe" className="text-green-600 hover:underline font-medium flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Umzugsfirma in Ihrer Nähe finden
                      </Link>
                    </li>
                  </ul>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="pt-6 border-t border-gray-200">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                  <HelpCircle size={28} className="mr-3 text-purple-500" />
                  Häufige Fragen zum Privatumzug
                </h3>
                <Accordion type="single" collapsible className="w-full bg-slate-50 rounded-lg shadow">
                  {/* FAQ 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <AccordionItem value="item-1" className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left hover:no-underline py-5 px-2 text-base font-semibold text-gray-700 hover:text-green-600 transition-colors">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                          Was kostet ein Privatumzug in der Schweiz?
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-0 pb-5 px-2 text-gray-600 leading-relaxed">
                        <div className="flex items-start">
                          <Info className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                          <div>
                            <p>
                              Die Kosten hängen stark von der Wohnungsgrösse und dem Umzugsvolumen ab. Unser <Link href="/umzugskosten-rechner" className="text-green-600 hover:underline font-semibold">Umzugskosten-Rechner</Link> gibt Ihnen eine gute erste Schätzung. Hier ist eine grobe Übersicht:
                            </p>
                            <div className="my-4">
                              <PricingTable
                                title="Preise für Privatumzüge"
                                subtitle="Durchschnittliche Preise in der Schweiz"
                                rows={costTableData.map(item => ({
                                  size: item.size,
                                  cost: item.cost,
                                  description: item.size.includes('1.5') ? 'Kleine Wohnung, WG-Zimmer' : 
                                               item.size.includes('3.5') ? 'Standard Wohnung' :
                                               item.size.includes('4.5') ? 'Grössere Wohnung' :
                                               'Einfamilienhaus, Villa'
                                }))}
                                serviceType="umzug"
                              />
                            </div>
                            <p className="mt-3 text-sm text-gray-600">Tipp: Vergleichen Sie Offerten kostenlos, um das beste Preis-Leistungs-Verhältnis zu finden. Die Preise können stark variieren.</p>
                            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
                              <div className="flex items-start md:items-center">
                                <Calculator className="w-8 h-8 md:w-6 md:h-6 mr-3 text-green-600 flex-shrink-0 mt-1 md:mt-0" />
                                <p className="text-sm text-green-700 flex-grow">Nutzen Sie unseren Rechner für eine detaillierte Analyse Ihrer Umzugskosten.</p>
                              </div>
                              <Button asChild size="sm" className="mt-3 w-full md:w-auto bg-green-600 hover:bg-green-700 text-white group">
                                <Link href="/umzugskosten-rechner">
                                  Jetzt Kosten berechnen
                                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>

                  {/* FAQ 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <AccordionItem value="item-2" className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left hover:no-underline py-5 px-2 text-base font-semibold text-gray-700 hover:text-green-600 transition-colors">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                          Welche Leistungen sind bei einem Standard-Wohnungsumzug inklusive?
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-0 pb-5 px-2 text-gray-600 leading-relaxed">
                        <div className="flex items-start">
                          <Info className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                          <div>
                            <p>Ein Standardangebot einer Zügelfirma umfasst in der Regel folgende Leistungen:</p>
                            <div className="my-2">
                              <ul className="list-disc list-inside space-y-1">
                                {[
                                  "Transport der Möbel und Kartons von A nach B",
                                  "Professionelle Fahrer und Zügelmänner",
                                  "Transportversicherung für Ihr Umzugsgut",
                                  "Standard-Verbrauchsmaterial wie Decken und Gurte"
                                ].map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>

                  {/* FAQ 3 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <AccordionItem value="item-3" className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left hover:no-underline py-5 px-2 text-base font-semibold text-gray-700 hover:text-green-600 transition-colors">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                          Wie bereite ich mich am besten auf den Umzugstag vor?
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-0 pb-5 px-2 text-gray-600 leading-relaxed">
                        <div className="flex items-start">
                          <Info className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                          <div>
                            <p>
                              Eine gute Vorbereitung ist alles! Die wichtigsten Schritte sind:
                            </p>
                            <div className="my-2">
                              <ul className="list-disc list-inside space-y-1">
                                {[
                                  "Alles, was Sie nicht mehr brauchen, frühzeitig entsorgen oder verkaufen.",
                                  "Alle Kartons klar beschriften (Inhalt und Zimmer).",
                                  "Eine Kiste mit den wichtigsten Dingen für den ersten Tag separat packen (Toilettenartikel, Werkzeug, Ladekabel).",
                                  "Parkplätze für den Umzugswagen organisieren.",
                                  "Unsere detaillierte Umzugs-Checkliste hilft Ihnen, nichts zu vergessen."
                                ].map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                            <p className="mt-2">
                              Nutzen Sie unsere <Link href="/checklisten" className="text-green-600 hover:underline font-semibold">detaillierte Umzugs-Checkliste</Link> für eine vollständige Übersicht.
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>

                  {/* FAQ 4 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    <AccordionItem value="item-4" className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left hover:no-underline py-5 px-2 text-base font-semibold text-gray-700 hover:text-green-600 transition-colors">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                          Was sollte ich bei der Auswahl der Umzugsfirma beachten?
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-0 pb-5 px-2 text-gray-600 leading-relaxed">
                        <div className="flex items-start">
                          <Info className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                          <div>
                            <p>Achten Sie auf folgende Punkte, um eine seriöse Firma zu erkennen:</p>
                            <div className="my-2">
                              <ul className="list-disc list-inside space-y-1">
                                {[
                                  "Transparente offerten: Alle Kosten sollten klar aufgeschlüsselt sein.",
                                  "Versicherungsnachweis: Lassen Sie sich die Transport- und Betriebshaftpflichtversicherung bestätigen.",
                                  "Kundenbewertungen: Lesen Sie Erfahrungen anderer Kunden.",
                                  "Eintrag im Handelsregister: Prüfen Sie, ob die Firma offiziell registriert ist.",
                                  "Besichtigungstermin: Bei grösseren Umzügen ist ein kostenloser Besichtigungstermin üblich und empfehlenswert."
                                ].map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>

                  {/* FAQ 5 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                  >
                    <AccordionItem value="item-5" className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left hover:no-underline py-5 px-2 text-base font-semibold text-gray-700 hover:text-green-600 transition-colors">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                          Wann sollte ich mit der Planung meines Wohnungsumzugs beginnen?
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-0 pb-5 px-2 text-gray-600 leading-relaxed">
                        <div className="flex items-start">
                          <Info className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                          <div>
                            <p className="mb-2">
                              Je früher, desto besser! Wir empfehlen, unserer <Link href="/checklisten" className="text-green-600 hover:underline font-semibold">detaillierten Zeitachse</Link> zu folgen:
                            </p>
                            <div className="my-2">
                              <h4 className="font-semibold text-gray-700 mb-1">2-3 Monate vorher:</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {[
                                  "Mietvertrag kündigen, Nachmieter suchen.",
                                  "Umzugsofferten einholen und vergleichen.",
                                  "Umzugsunternehmen buchen."
                                ].map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="my-2">
                              <h4 className="font-semibold text-gray-700 mb-1">1 Monat vorher:</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {[
                                  "Mit dem Ausmisten und Packen von selten genutzten Dingen beginnen.",
                                  "Ummeldungen (Adressänderungen) vorbereiten.",
                                  "Sonderurlaub für den Umzugstag beantragen."
                                ].map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="my-2">
                              <h4 className="font-semibold text-gray-700 mb-1">1 Woche vorher:</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {[
                                  "Die meisten Sachen fertig packen.",
                                  "Möbel demontieren, die nicht von der Firma zerlegt werden.",
                                  "Verpflegung für den Umzugstag organisieren."
                                ].map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="my-2">
                              <h4 className="font-semibold text-gray-700 mb-1">Am Umzugstag:</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {[
                                  "Böden schützen.",
                                  "Zählerstände ablesen.",
                                  "Letzte Kontrolle der alten Wohnung."
                                ].map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="my-2">
                              <h4 className="font-semibold text-gray-700 mb-1">Nach dem Umzug:</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {[
                                  "Wohnungsübergabe und Protokoll.",
                                  "Offizielle Adressänderung bei allen Stellen durchführen.",
                                  "Das neue Zuhause geniessen!"
                                ].map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>

                  {/* FAQ 6 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                  >
                    <AccordionItem value="item-6" className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-left hover:no-underline py-5 px-2 text-base font-semibold text-gray-700 hover:text-green-600 transition-colors">
                        <div className="flex items-center">
                          <HelpCircle className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                          Lohnt sich ein Ein- und Auspackservice?
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-0 pb-5 px-2 text-gray-600 leading-relaxed">
                        <div className="flex items-start">
                          <Info className="w-5 h-5 mr-3 text-blue-500 mt-1 flex-shrink-0" />
                          <div>
                            <p>Ein Packservice lohnt sich besonders, wenn Sie:</p>
                            <div className="my-2">
                              <ul className="list-disc list-inside space-y-1">
                                {[
                                  "Wenig Zeit haben.",
                                  "Körperlich nicht in der Lage sind, schwere Kisten zu heben.",
                                  "Wertvolles oder zerbrechliches Inventar haben, das professionell verpackt werden muss.",
                                  "Den Umzug so stressfrei wie möglich gestalten möchten."
                                ].map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                </Accordion>
              </section>

              {/* CTA Button */}
              <div className="mt-10 text-center">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white group px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug">
                    Kostenlose Offerten für Privatumzug
                    <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1.5" />
                  </Link>
                </Button>
              </div>
            </motion.main>

            {/* Sidebar */}
            <motion.aside 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:col-span-1 space-y-8 self-start sticky top-28"
            >
              {/* Umzug Types Sidebar */}
              <UmzugTypesSidebar activeType="privatumzug" />

              {/* Professional Team */}
              <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Users size={24} className="mr-2 text-blue-500" />
                  Professionelles Team
                </h3>
                <img  
                  alt="Ein professionelles Umzugsteam, das Möbel transportiert" 
                  className="w-full h-56 object-cover rounded-lg shadow-md mb-3"
                  src="https://storage.googleapis.com/hostinger-horizons-assets-prod/debf3bb6-240b-49e1-ac20-d04a2d77b10a/021faa27c88d2aec378906ffc232e35c.png" />
                <p className="text-sm text-gray-600 mt-2">Unsere Teams sind erfahren und zuverlässig.</p>
              </div>

              {/* Testimonial */}
              <div className="bg-green-50 p-6 rounded-2xl shadow-lg border border-green-200 transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center">
                  <Users size={24} className="mr-2" />
                  Das sagen unsere Kunden
                </h3>
                <blockquote className="text-green-600 italic text-base">
                  "Der Vergleich hat mir über 800 CHF gespart! Super einfach und schnell. Ich habe die perfekte Firma für meinen Umzug von Zürich nach Bern gefunden."
                </blockquote>
                <p className="text-right text-sm text-green-700 font-medium mt-3">- Maria S., Bern</p>
              </div>
            </motion.aside>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateUmzugPageClient;

