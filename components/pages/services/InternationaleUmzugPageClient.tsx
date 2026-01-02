'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Globe2, Clock, ListChecks, Star } from 'lucide-react'
import InternationalPageNavigation from '@/components/international/InternationalPageNavigation'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import InternationalCostCalculator from '@/components/international/InternationalCostCalculator'

const ArticleSection = () => {
  const faqItems = [
    {
      q: "Was kostet ein internationaler Umzug von der Schweiz aus?",
      a: "Die Kosten variieren stark. Ein Umzug mit einer 2-Zimmer-Wohnung nach Süddeutschland kann bei ca. 2.500 CHF beginnen, während derselbe Umzug nach Spanien oder Portugal eher 5.000 - 8.000 CHF kostet. Entscheidend sind Volumen, Distanz und Service-Level. Nutzen Sie unseren Kostenrechner für eine erste Schätzung."
    },
    {
      q: "Wie lange dauert ein internationaler Umzug?",
      a: "Die reine Transportzeit innerhalb Europas beträgt je nach Destination 1-5 Tage. Inklusive Packen, Zollabwicklung und Ausladen sollten Sie mit einer Gesamtdauer von 3-10 Tagen rechnen. Übersee-Umzüge per Schiff dauern mehrere Wochen."
    },
    {
      q: "Muss ich mein Umzugsgut verzollen (Stichwort: Übersiedlungsgut)?",
      a: "Ja, bei einem Umzug von der Schweiz in ein EU-Land muss das Umzugsgut als 'Übersiedlungsgut' deklariert werden. Wenn Sie Ihren Wohnsitz nachweislich verlegen und die Güter seit mindestens 6 Monaten in Ihrem Besitz sind, ist die Einfuhr zoll- und mehrwertsteuerfrei. Eine professionelle Umzugsfirma kümmert sich um die korrekte Deklaration."
    },
    {
      q: "Welche Dokumente sind für die Zollabwicklung nötig?",
      a: "Typischerweise benötigen Sie: Eine Kopie Ihres Passes, eine Abmeldebestätigung aus der Schweiz, eine Anmeldebestätigung im neuen Land (oder Arbeitsvertrag/Mietvertrag), sowie eine detaillierte Inventarliste Ihres Umzugsguts. Die Spedition stellt Ihnen die nötigen Formulare zur Verfügung."
    },
    {
      q: "Kann ich die Endreinigung meiner alten Wohnung in der Schweiz dazubuchen?",
      a: "Absolut. Viele internationale Speditionen arbeiten mit lokalen Reinigungsinstituten zusammen oder bieten diesen Service selbst an. Ein Kombi-Paket für Umzug und Reinigung mit Abnahmegarantie ist die bequemste Lösung für eine reibungslose Wohnungsübergabe."
    }
  ]

  return (
    <div className="prose prose-lg lg:prose-xl max-w-none text-slate-700 leading-relaxed">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Ihr ultimativer Ratgeber für den internationalen Umzug</h2>
      <p className="mb-8 text-lg">Ein Umzug ins Ausland ist mehr als nur ein Transport von A nach B. Es ist der Beginn eines neuen Lebensabschnitts. Damit dieser Start gelingt, haben wir die wichtigsten Informationen und Tipps für Sie zusammengestellt, die weit über eine normale Umzugsplanung hinausgehen und Ihnen helfen, in Suchmaschinen besser gefunden zu werden.</p>

      <div className="p-6 bg-green-50 border border-green-200 rounded-xl mb-12">
        <h3 className="text-2xl md:text-3xl font-semibold text-green-800 mb-4">Warum professionelle Hilfe beim Auslandsumzug unverzichtbar ist</h3>
        <p className="mb-4">Während ein lokaler Umzug oft in Eigenregie bewältigt werden kann, sind die Hürden bei einem internationalen Vorhaben ungleich höher. Zollbestimmungen, länderspezifische Einfuhrregeln für Hausrat (das sogenannte Übersiedlungsgut), sprachliche Barrieren und die komplexe Logistik erfordern Expertenwissen. Ein kleiner Fehler in der Zolldeklaration kann zu empfindlichen Verzögerungen und unerwarteten Kosten führen.</p>
        <p>Eine erfahrene internationale Spedition nimmt Ihnen diese Last ab. Sie kennt die Gesetze, verfügt über das richtige Netzwerk an Partnern vor Ort und stellt sicher, dass Ihre Güter sicher und termingerecht am Ziel ankommen. Die Investition in einen Profi zahlt sich durch Zeitersparnis, vermiedenen Stress und oft sogar durch geringere Gesamtkosten aus, da teure Fehler vermieden werden.</p>
      </div>

      <h3 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-8">Die Vorteile unserer geprüften Partnerfirmen</h3>
      <ul className="space-y-6 mb-12">
        <li className="flex items-start">
          <Star className="w-6 h-6 mr-4 mt-1 text-yellow-500 flex-shrink-0" />
          <div>
            <strong className="font-semibold text-slate-800">Erfahrung & Expertise</strong>
            <p className="text-slate-600 m-0">Unsere Partner verfügen über jahrelange Erfahrung mit Umzügen innerhalb Europas und weltweit. Sie kennen die Tücken und wissen, wie man sie umschifft.</p>
          </div>
        </li>
        <li className="flex items-start">
          <Star className="w-6 h-6 mr-4 mt-1 text-yellow-500 flex-shrink-0" />
          <div>
            <strong className="font-semibold text-slate-800">Full-Service-Offerte</strong>
            <p className="text-slate-600 m-0">Vom Verpacken über die Zollabwicklung bis zur Endmontage – Sie erhalten alles aus einer Hand. Das spart Koordinationsaufwand und Nerven.</p>
          </div>
        </li>
        <li className="flex items-start">
          <Star className="w-6 h-6 mr-4 mt-1 text-yellow-500 flex-shrink-0" />
          <div>
            <strong className="font-semibold text-slate-800">Transparente Kosten</strong>
            <p className="text-slate-600 m-0">Sie erhalten detaillierte Offerten ohne versteckte Gebühren. So behalten Sie die volle Kostenkontrolle über Ihren internationalen Umzug.</p>
          </div>
        </li>
        <li className="flex items-start">
          <Star className="w-6 h-6 mr-4 mt-1 text-yellow-500 flex-shrink-0" />
          <div>
            <strong className="font-semibold text-slate-800">Versicherungsschutz</strong>
            <p className="text-slate-600 m-0">Ihr gesamtes Umzugsgut ist während des Transports umfassend versichert. Für den Fall der Fälle sind Sie auf der sicheren Seite.</p>
          </div>
        </li>
        <li className="flex items-start">
          <Star className="w-6 h-6 mr-4 mt-1 text-yellow-500 flex-shrink-0" />
          <div>
            <strong className="font-semibold text-slate-800">Lokale Netzwerke</strong>
            <p className="text-slate-600 m-0">Die Speditionen arbeiten mit Agenten im Zielland zusammen, was die Zustellung und eventuelle administrative Hürden vor Ort erheblich erleichtert.</p>
          </div>
        </li>
      </ul>

      <h3 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-6">Der Zeitplan für Ihren Umzug ins Ausland</h3>
      <p className="mb-8">Ein gutes Zeitmanagement ist entscheidend. An diesem Zeitplan können Sie sich orientieren:</p>
      <div className="space-y-8 mb-12">
        <div className="flex items-start">
          <div className="flex flex-col items-center mr-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div className="w-px h-16 bg-slate-300 mt-2"></div>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-blue-700 mb-2">3-6 Monate vorher</h4>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Offerten von mehreren Umzugsfirmen online einholen und vergleichen.</li>
              <li>Gültigkeit von Reisepässen und Visa prüfen, ggf. beantragen.</li>
              <li>Arbeits- und Mietverträge am alten Wohnort kündigen.</li>
            </ul>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex flex-col items-center mr-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div className="w-px h-16 bg-slate-300 mt-2"></div>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-blue-700 mb-2">1-2 Monate vorher</h4>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Spedition verbindlich buchen und Umzugstermin fixieren.</li>
              <li>Wichtige Dokumente (Geburtsurkunden, Zeugnisse) ordnen, ggf. übersetzen und beglaubigen lassen.</li>
              <li>Aussortieren: Was wird nicht mehr gebraucht? Verkaufen, verschenken oder entsorgen.</li>
            </ul>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex flex-col items-center mr-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div className="w-px h-16 bg-slate-300 mt-2"></div>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-blue-700 mb-2">2-4 Wochen vorher</h4>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Nachsendeauftrag bei der Post einrichten.</li>
              <li>Adressänderungen bei Banken, Versicherungen und Abonnements mitteilen.</li>
              <li>Mit dem Packen beginnen (oder Packservice terminieren).</li>
            </ul>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex flex-col items-center mr-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-blue-700 mb-2">Die Umzugswoche</h4>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Letzte Kisten packen und detailliert beschriften (wichtig für den Zoll!).</li>
              <li>Übergabe der alten Wohnung organisieren.</li>
              <li>Handgepäck mit wichtigen Dokumenten, Medikamenten und Wertgegenständen packen.</li>
            </ul>
          </div>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-6">Die Kostenfaktoren beim internationalen Umzug</h3>
      <p className="mb-4">Die Kosten für einen internationalen Umzug können stark variieren. Die wichtigsten Faktoren sind:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-100 p-4 rounded-lg flex items-center">
          <ListChecks className="w-5 h-5 mr-3 text-green-600" />
          <span><b>Volumen des Umzugsguts (in m³):</b> Der grösste Kostenfaktor.</span>
        </div>
        <div className="bg-slate-100 p-4 rounded-lg flex items-center">
          <ListChecks className="w-5 h-5 mr-3 text-green-600" />
          <span><b>Distanz:</b> Entfernung zwischen altem und neuem Wohnort.</span>
        </div>
        <div className="bg-slate-100 p-4 rounded-lg flex items-center">
          <ListChecks className="w-5 h-5 mr-3 text-green-600" />
          <span><b>Transportart:</b> LKW (Europa), Seefracht (Container) oder Luftfracht (schnell, aber teuer).</span>
        </div>
        <div className="bg-slate-100 p-4 rounded-lg flex items-center">
          <ListChecks className="w-5 h-5 mr-3 text-green-600" />
          <span><b>Zusatzleistungen:</b> Packservice, De-/Montage, Endreinigung, Einlagerung.</span>
        </div>
        <div className="bg-slate-100 p-4 rounded-lg flex items-center">
          <ListChecks className="w-5 h-5 mr-3 text-green-600" />
          <span><b>Zugänglichkeit:</b> Stockwerk, Lift, Parkmöglichkeiten für den LKW.</span>
        </div>
        <div className="bg-slate-100 p-4 rounded-lg flex items-center">
          <ListChecks className="w-5 h-5 mr-3 text-green-600" />
          <span><b>Saison:</b> In den Sommermonaten sind die Preise oft höher.</span>
        </div>
      </div>
      <p className="mb-12">Durch den Online-Vergleich mehrerer Umzugsfirmen und deren Offerten über Online-Offerten.ch stellen Sie sicher, dass Sie ein faires Preis-Leistungs-Verhältnis erhalten und keine überhöhten Preise für Ihren Auslandsumzug zahlen. Vergleichen Sie mehrere Firmen gleichzeitig und finden Sie so die beste Umzugsfirma für Ihren internationalen Umzug.</p>

      <div className="p-8 bg-blue-50 border border-blue-200 rounded-xl mb-12 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold text-blue-800 mb-4">Starten Sie sorgenfrei in Ihr neues Abenteuer</h3>
        <p className="mb-6">Ein internationaler Umzug muss nicht stressig sein. Mit dem richtigen Partner an Ihrer Seite können Sie sich auf das konzentrieren, was wirklich zählt: Ihr neues Leben im Ausland.</p>
        <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
          <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=international">Jetzt kostenlose Offerten für den Auslandsumzug anfordern</Link>
        </Button>
      </div>

      <h3 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-6">Häufig gestellte Fragen (FAQ)</h3>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">{item.q}</AccordionTrigger>
            <AccordionContent className="text-base text-slate-600">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

const InternationaleUmzugPageClient = () => {
  const imageUrl = 'https://online-offerten.ch/image/umzugsservice-Schweiz/lnternatIonale-umzuege.png'


  const services = [
    {
      title: "Kompletter Umzugsservice",
      text: "Von der Demontage Ihrer Möbel über die sichere Verpackung bis zum Wiederaufbau in Ihrem neuen Zuhause."
    },
    {
      title: "Zollabwicklung",
      text: "Unsere Partner übernehmen die komplette Zollabfertigung und stellen sicher, dass alle Dokumente korrekt sind."
    },
    {
      title: "Transportversicherung",
      text: "Ihr Umzugsgut ist während des gesamten Transports umfassend versichert, für maximale Sicherheit."
    },
    {
      title: "Zwischenlagerung",
      text: "Benötigen Sie eine temporäre Lagerlösung? Wir organisieren sichere Lagermöglichkeiten für Ihre Möbel."
    },
    {
      title: "Endreinigung",
      text: "Buchen Sie die Endreinigung Ihrer alten Wohnung mit Abnahmegarantie gleich mit – für eine sorgenfreie Übergabe."
    },
    {
      title: "Fahrzeugtransport",
      text: "Wir organisieren auch den sicheren Transport Ihres Autos, Motorrads oder anderer Fahrzeuge an Ihren neuen Wohnort."
    }
  ]

  const faqItemsForSchema = [
    {
      "@type": "Question",
      "name": "Was kostet ein internationaler Umzug von der Schweiz aus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Kosten variieren stark. Ein Umzug mit einer 2-Zimmer-Wohnung nach Süddeutschland kann bei ca. 2.500 CHF beginnen, während derselbe Umzug nach Spanien oder Portugal eher 5.000 - 8.000 CHF kostet. Entscheidend sind Volumen, Distanz und Service-Level. Nutzen Sie unseren Kostenrechner für eine erste Schätzung."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lange dauert ein internationaler Umzug?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die reine Transportzeit innerhalb Europas beträgt je nach Destination 1-5 Tage. Inklusive Packen, Zollabwicklung und Ausladen sollten Sie mit einer Gesamtdauer von 3-10 Tagen rechnen. Übersee-Umzüge per Schiff dauern mehrere Wochen."
      }
    },
    {
      "@type": "Question",
      "name": "Muss ich mein Umzugsgut verzollen (Stichwort: Übersiedlungsgut)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, bei einem Umzug von der Schweiz in ein EU-Land muss das Umzugsgut als 'Übersiedlungsgut' deklariert werden. Wenn Sie Ihren Wohnsitz nachweislich verlegen und die Güter seit mindestens 6 Monaten in Ihrem Besitz sind, ist die Einfuhr zoll- und mehrwertsteuerfrei. Eine professionelle Umzugsfirma kümmert sich um die korrekte Deklaration."
      }
    },
    {
      "@type": "Question",
      "name": "Welche Dokumente sind für die Zollabwicklung nötig?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typischerweise benötigen Sie: Eine Kopie Ihres Passes, eine Abmeldebestätigung aus der Schweiz, eine Anmeldebestätigung im neuen Land (oder Arbeitsvertrag/Mietvertrag), sowie eine detaillierte Inventarliste Ihres Umzugsguts. Die Spedition stellt Ihnen die nötigen Formulare zur Verfügung."
      }
    },
    {
      "@type": "Question",
      "name": "Kann ich die Endreinigung meiner alten Wohnung in der Schweiz dazubuchen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolut. Viele internationale Speditionen arbeiten mit lokalen Reinigungsinstituten zusammen oder bieten diesen Service selbst an. Ein Kombi-Paket für Umzug und Reinigung mit Abnahmegarantie ist die bequemste Lösung für eine reibungslose Wohnungsübergabe."
      }
    }
  ]

  const metaTitle = "Internationale Umzüge: Kostenlose Offerten vergleichen"
  const metaDescription = "Internationale Umzüge: Vergleichen Sie kostenlos mehrere geprüfte Umzugsfirmen und sparen Sie bis zu 40%. Offerten für Umzüge nach Deutschland, Österreich, Frankreich & ganz Europa."
  const canonicalUrl = "/internationale-umzuege"

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": metaTitle,
    "name": metaTitle,
    "description": metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch"
    },
    "areaServed": {
      "@type": "Country",
      "name": "CH"
    },
    "brand": {
      "@type": "Brand",
      "name": "Online-Offerten.ch"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=international",
      "priceCurrency": "CHF",
      "name": "Kostenlose Offerten anfordern"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": faqItemsForSchema
    }
  }

  return (
    <>
      <div className="bg-gradient-to-b from-slate-50 to-white">
        <section
          className="relative w-full bg-gray-100 py-12 md:py-16"
          itemScope
          itemType="https://schema.org/Service"
        >
          <div className="container mx-auto max-w-navbar px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-6 md:gap-0 items-center">
              <article className="md:col-span-2 bg-gray-100 px-8 md:px-10 py-8 md:py-12 rounded-l-2xl md:rounded-l-2xl" itemProp="description">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
                    Umzugsfirmen vergleichen für Auslandsumzug
                  </h1>
                  <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-bold mb-4">
                    Mehrere Firmen online vergleichen & bis zu 40% sparen
                  </p>
                </div>
                <p
                  className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed font-medium"
                >
                  Vergleichen Sie online mehrere geprüfte Umzugsfirmen für Ihren internationalen Umzug in einem Schritt. Erhalten Sie kostenlose Offerten von zertifizierten Speditionen, die auf internationale Umzüge spezialisiert sind. Von der Zollabwicklung bis zur Endmontage – finden Sie den besten Partner für Ihren Umzug nach Deutschland, Österreich, Frankreich, Spanien oder ganz Europa.
                </p>
                <div className="mb-6">
                  <Button
                    asChild
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold group px-6 py-4 text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    <Link href="/kostenlose-offerte-anfordern?service=international">
                      Mehrere Firmen vergleichen & Offerten anfordern
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
                <div className="bg-green-50 rounded-lg p-4 md:p-6 flex flex-wrap gap-4 md:gap-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-base text-gray-700 font-medium">Bis zu 40% Ersparnis möglich</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-base text-gray-700 font-medium">Mehrere Firmen online vergleichen</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-base text-gray-700 font-medium">Kostenlos & unverbindlich</span>
                  </div>
                </div>
              </article>
              <aside className="md:col-span-1 relative h-64 md:h-auto md:min-h-[400px] overflow-hidden md:pl-4" aria-label="Auslandsumzug Dienstleistung Illustration">
                <figure className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-tr from-green-900/20 via-transparent to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute inset-0 rounded-2xl ring-4 ring-green-500/10 pointer-events-none z-20"></div>
                  <img
                    src={imageUrl}
                    alt="Professionelle Umzugsfirma bei internationalem Umzug - Mehrere Umzugsfirmen vergleichen für Auslandsumzug"
                    className="w-full h-full object-cover rounded-2xl"
                    loading="eager"
                    fetchPriority="high"
                    width="600"
                    height="400"
                    itemProp="image"
                  />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-full pointer-events-none z-30"></div>
                  <figcaption className="sr-only">Internationaler Umzug mit professioneller Umzugsfirma - Vergleichen Sie mehrere Firmen online</figcaption>
                </figure>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto max-w-navbar px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Umzugsfirmen vergleichen für Auslandumzug: Mehrere Angebote online prüfen</h2>
                <p className="text-slate-600 leading-relaxed mb-4 font-medium">
                  Planen Sie einen Umzug ins Ausland und suchen nach der besten Umzugsfirma für Ihren Auslandumzug? Vergleichen Sie mehrere geprüfte Umzugsunternehmen online und finden Sie das beste Angebot. Ob Umzug nach Deutschland, Umzug nach Österreich, Umzug nach Frankreich, Umzug nach Spanien, Umzug nach Italien oder ein anderes europäisches Land – jeder Auslandumzug hat seine eigenen logistischen und administrativen Herausforderungen, insbesondere bei der Zollabwicklung. Die Wahl der richtigen Umzugsfirma ist daher entscheidend für einen stressfreien Ablauf.
                </p>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Auf unserer Plattform können Sie online mehrere Umzugsfirmen vergleichen und mit nur einer Anfrage kostenlose Offerten von geprüften Speditionen erhalten, die auf internationale Transporte spezialisiert sind. Diese Experten kennen die spezifischen Bestimmungen des Ziellandes, kümmern sich um die notwendigen Papiere und sorgen dafür, dass Ihr Hab und Gut sicher und pünktlich ankommt. Durch den direkten Vergleich mehrerer Firmen sparen Sie nicht nur Zeit und Nerven, sondern auch bis zu 40% der Umzugskosten.
                </p>
              </div>

              <div
                className="bg-white p-6 md:p-8 rounded-xl shadow-2xl border border-slate-100"
              >
                <h3 className="text-2xl font-semibold text-slate-700 mb-6">Unser Service für Ihren internationalen Umzug</h3>
                <ul className="space-y-4">
                  {services.map((service, index) => (
                    <li 
                      key={index} 
                      className="flex items-start"
                    >
                      <CheckCircle className="text-green-500 w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <strong className="font-semibold text-slate-800">{service.title}</strong>
                        <p className="text-slate-600 m-0">{service.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 md:py-20 bg-slate-50">
            <div className="container mx-auto max-w-navbar px-4 md:px-6">
                <InternationalCostCalculator />
            </div>
        </section>

        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <ArticleSection />
          </div>
        </section>

        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          <InternationalPageNavigation currentCountrySlug="internationale-umzuege" />
        </div>

        <section className="py-12 md:py-20 bg-slate-100 mt-12 md:mt-16">
          <div className="container mx-auto max-w-navbar px-4 md:px-6 text-center">
            <div>
              <Globe2 className="mx-auto text-green-500 h-16 w-16 mb-4" />
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Bereit für Ihr neues Zuhause im Ausland?</h2>
              <p className="text-slate-600 max-w-xl mx-auto mb-8">
                Starten Sie jetzt Ihre Anfrage und erhalten Sie unverbindliche Offerten von den besten internationalen Umzugsprofis.
              </p>
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white shadow-lg transform hover:scale-105 transition-transform duration-300 px-10 py-3">
                <Link href="/kostenlose-offerte-anfordern?service=international">Kostenlose Offerten anfordern</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default InternationaleUmzugPageClient

