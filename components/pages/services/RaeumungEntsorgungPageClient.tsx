'use client'

import React from 'react'

// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ArrowRight, Trash2, Clock, Sparkles, Package, CheckCircle, Scale } from 'lucide-react'
import Article from '@/components/RaeumungEntsorgungPageParts/Article'
import Faq from '@/components/RaeumungEntsorgungPageParts/Faq'

const iconMap: Record<string, React.ComponentType<any>> = {
  Trash2,
  Clock,
  Sparkles,
  Package,
}

const RaeumungEntsorgungPageClient = () => {
  const router = useRouter()

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=raeumung&step=2')
  }

  const benefits = [
    {
      icon: "Trash2",
      title: "Fachgerechte Entsorgung",
      text: "Unsere Partner kennen die lokalen Vorschriften und garantieren eine umwelt- und gesetzeskonforme Entsorgung aller Materialien, inkl. Sondermüll."
    },
    {
      icon: "Clock",
      title: "Enorme Zeit- & Kraftersparnis",
      text: "Sparen Sie wertvolle Zeit und vermeiden Sie die körperliche Anstrengung. Ein erfahrenes Team erledigt die Arbeit in einem Bruchteil der Zeit."
    },
    {
      icon: "Sparkles",
      title: "Besenreine Übergabe",
      text: "Die geräumten Flächen werden Ihnen sauber und leer übergeben. Auf Wunsch kann auch eine Endreinigung mit Abnahmegarantie organisiert werden."
    },
    {
      icon: "Package",
      title: "Alles aus einer Hand",
      text: "Vom Demontieren von Möbeln über das Verpacken wiederverwertbarer Dinge bis zum Transport und der Entsorgung – Sie erhalten einen kompletten Service."
    }
  ]

  const costFactors = [
    "<strong>Menge des Räumguts (mÂ³):</strong> Das Volumen ist der grösste Kostenfaktor.",
    "<strong>Art des Abfalls:</strong> Sondermüll wie Farben, Chemikalien oder Elektronik kostet mehr.",
    "<strong>Zugänglichkeit:</strong> Stockwerk, Lift vorhanden, Parkmöglichkeiten.",
    "<strong>Demontageaufwand:</strong> Müssen Einbauten oder grosse Möbel zerlegt werden?",
    "<strong>Zusatzleistungen:</strong> Endreinigung, kleinere Reparaturen."
  ]

  const volumeRates = [
    { volume: "bis 5 mÂ³ (z.B. kleines Kellerabteil)", price: "ca. CHF 400 – 700" },
    { volume: "bis 10 mÂ³ (z.B. 1-2 Zimmer Wohnung)", price: "ca. CHF 700 – 1'200" },
    { volume: "bis 20 mÂ³ (z.B. 3-4 Zimmer Wohnung)", price: "ca. CHF 1'200 – 2'500" },
    { volume: "ab 30 mÂ³ (z.B. Hausräumung)", price: "Auf Anfrage" }
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Räumung & Entsorgung Schweiz finden & vergleichen » Kostenlose Offerten | Professionell & Günstig",
    "serviceType": "Räumung- & Entsorgungs-Vermittlung",
    "description": "Räumung & Entsorgung Schweiz: Vergleichen Sie kostenlos Offerten von geprüften Entsorgungsfirmen. Wohnungsräumung, Haushaltsauflösung, Kellerräumung & umweltgerechte Entsorgung – professionell und bis zu 40% günstiger. Jetzt Offerten anfordern!",
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
      "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=raeumung&step=2",
      "priceCurrency": "CHF",
      "price": "0",
      "name": "Kostenlose Offerte für Räumung & Entsorgung"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="bg-slate-50">
        <section
          className="relative w-full bg-gray-100 py-12 md:py-16"
        >
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-0 items-center">
              <div className="md:col-span-2 bg-gray-100 px-8 md:px-10 py-8 md:py-12">
                <div
                >
                  <h1 className="heading-1">
                    Professionelle Räumung & Entsorgung
                  </h1>
                </div>
                <p
                  className="text-base md:text-body mb-6 leading-relaxed"
                >
                  Schaffen Sie Platz für Neues. Wir organisieren Ihre komplette Räumung – von der Entrümpelung bis zur besenreinen Übergabe. Effizient, zuverlässig und umweltgerecht.
                </p>
                <div
                  className="mb-6"
                >
                  <Button
                    onClick={handleCtaClick}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold group px-6 py-4 text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Jetzt kostenlose Offerten anfordern â†’
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
                <div
                  className="bg-green-50 rounded-lg p-4 md:p-6 flex flex-wrap gap-4 md:gap-6"
                >
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-body font-medium">Bis zu 40% sparen</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-body font-medium">Nur geprüfte Firmen</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-body font-medium">100% kostenlos & unverbindlich</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-1 relative h-64 md:h-auto md:min-h-[400px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1615895233623-731367f50a8b"
                  alt="Professionelle Räumung und Entsorgung"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-20 space-y-16 md:space-y-24">
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <div
            >
              <h2 className="heading-2">Warum eine professionelle Räumungsfirma beauftragen?</h2>
              <p className="text-lg text-slate-600 leading-relaxed">Eine Räumung ist oft mehr als nur das Ausmisten alter Gegenstände. Sie erfordert Organisation, körperlichen Einsatz und Wissen über die fachgerechte Entsorgung. Eine professionelle Firma nimmt Ihnen diese Last ab, kümmert sich um die umweltfreundliche Trennung von Wertstoffen und Abfall und garantiert eine schnelle und diskrete Abwicklung.</p>
            </div>
            <div
              className="relative h-80 rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                className="absolute inset-0 w-full h-full object-cover"
                alt="Professionelles Team bei einer Wohnungsräumung"
                src="https://images.unsplash.com/photo-1615895233623-731367f50a8b" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </section>

          <section>
            <h2 className="heading-2 text-center">Ihre Vorteile auf einen Blick</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = iconMap[benefit.icon]
                return (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center"
                  >
                    <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                      {Icon && <Icon className="w-8 h-8 text-green-600" />}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">{benefit.title}</h3>
                    <p className="text-slate-600">{benefit.text}</p>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
             <h2 className="heading-2">Was kostet eine Räumung und Entsorgung?</h2>
             <p className="text-slate-600 mb-8 max-w-4xl">Die Kosten für eine Räumung und Entsorgung in der Schweiz basieren hauptsächlich auf dem Volumen (in Kubikmetern, mÂ³) des zu entsorgenden Guts.</p>
             <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-700 mb-4">Kostenfaktoren im Überblick:</h3>
                   <ul className="space-y-3">
                    {costFactors.map((factor, index) => (
                      <li
                        key={index}
                        className="flex items-start"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-slate-700" dangerouslySetInnerHTML={{ __html: factor }} />
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-6">
                        <h4 className="font-bold text-xl text-slate-800 mb-3 flex items-center"><Trash2 className="mr-3 text-green-600"/>Zusätzliche Entsorgungskosten</h4>
                        <p className="text-sm text-slate-600 mb-4">Bei Umzügen fallen oft auch Gegenstände zur Entsorgung an. Diese werden separat nach Volumen berechnet.</p>
                        <div className="flex justify-between items-center py-2 border-b last:border-0 border-green-200">
                            <span className="font-medium text-slate-700">Kosten pro Kubikmeter (mÂ³)</span>
                            <span className="font-bold text-green-700">ca. CHF 45 – 60</span>
                        </div>
                    </div>
                     <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                        <h4 className="font-bold text-xl text-slate-800 mb-3 flex items-center"><Scale className="mr-3 text-green-600"/>Richtpreise für Kompletträumung (nach Volumen)</h4>
                        <p className="text-sm text-slate-600 mb-4">Bei kompletten Wohnungs- oder Hausräumungen ist die Abrechnung nach Kubikmetern üblich.</p>
                        {volumeRates.map((item, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b last:border-0 border-green-200">
                                <span className="font-medium text-slate-700">{item.volume}</span>
                                <span className="font-bold text-green-700">{item.price}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-4 italic">Alle Preise sind Schätzungen und verstehen sich exkl. MwSt. Für eine genaue offerten ist oft eine kostenlose Besichtigung notwendig.</p>
                </div>
             </div>
          </section>

          <Article />
          <Faq />

          <section id="cta" className="text-center bg-gradient-to-r from-green-600 to-green-800 text-white py-16 px-6 rounded-2xl shadow-2xl">
            <h2
              className="heading-2"
            >
              Bereit, Platz für Neues zu schaffen?
            </h2>
            <p
              className="max-w-2xl mx-auto text-green-200 mb-8"
            >
              Erhalten Sie mit nur einer Anfrage kostenlose und unverbindliche Offerten von geprüften Räumungsfirmen aus Ihrer Region.
            </p>
            <div
            >
              <Button onClick={handleCtaClick} size="lg" className="bg-white text-green-700 hover:bg-green-100 group w-full sm:w-auto px-8 py-4 text-base">
                Kostenlose Offerten anfordern
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default RaeumungEntsorgungPageClient



