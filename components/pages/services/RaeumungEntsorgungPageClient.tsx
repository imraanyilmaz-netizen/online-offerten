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
    "<strong>Menge des Räumguts (m³):</strong> Das Volumen ist der grösste Kostenfaktor.",
    "<strong>Art des Abfalls:</strong> Sondermüll wie Farben, Chemikalien oder Elektronik kostet mehr.",
    "<strong>Zugänglichkeit:</strong> Stockwerk, Lift vorhanden, Parkmöglichkeiten.",
    "<strong>Demontageaufwand:</strong> Müssen Einbauten oder grosse Möbel zerlegt werden?",
    "<strong>Zusatzleistungen:</strong> Endreinigung, kleinere Reparaturen."
  ]

  const volumeRates = [
    { volume: "bis 5 m³ (z.B. kleines Kellerabteil)", price: "ca. CHF 400 – 700" },
    { volume: "bis 10 m³ (z.B. 1-2 Zimmer Wohnung)", price: "ca. CHF 700 – 1'200" },
    { volume: "bis 20 m³ (z.B. 3-4 Zimmer Wohnung)", price: "ca. CHF 1'200 – 2'500" },
    { volume: "ab 30 m³ (z.B. Hausräumung)", price: "Auf Anfrage" }
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
          className="relative w-full py-12 md:py-16 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-green-50"
        >
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                backgroundSize: '60px 60px',
              }}
            />
          </div>
          <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="px-2 md:px-0">
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
                    Jetzt kostenlose Offerten anfordern
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
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="/umzug/a8b7dd19-1.webp"
                    alt="Professionelle Räumung und Entsorgung"
                    className="w-full h-[320px] md:h-[460px] object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg hidden md:block">
                  <p className="text-sm font-bold">Geprüfte Partnerfirmen</p>
                  <p className="text-xs text-green-100">Schweizweit im Einsatz</p>
                </div>
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
                src="/umzug/5b4ec6a0-3.webp" />
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
             <p className="text-slate-600 mb-8 max-w-4xl">Die Kosten für eine Räumung und Entsorgung in der Schweiz basieren hauptsächlich auf dem Volumen (in Kubikmetern, m³) des zu entsorgenden Guts.</p>
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
                            <span className="font-medium text-slate-700">Kosten pro Kubikmeter (m³)</span>
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
              className="heading-2 bg-gradient-to-r from-white to-black bg-clip-text text-transparent"
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



