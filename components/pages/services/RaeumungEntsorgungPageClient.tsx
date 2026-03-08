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

  const wohnungsRaeumungPrices = [
    { size: "2.5 Zimmer", price: "ab 650.– bis 1’550.–" },
    { size: "3.5 Zimmer", price: "ab 830.– bis 2’250.–" },
    { size: "4.5 Zimmer", price: "ab 1’250.– bis 3’050.–" },
    { size: "Ab 5.5 Zimmer", price: "ab 1’550.– (Offerten einholen)" },
  ]

  const hausUndEinzelraumPrices = [
    { service: "Garage oder Einzelraum", price: "ab 400.– bis 750.–" },
    { service: "Keller- / Estrichräumung", price: "ab 400.– bis 650.–" },
    { service: "Einfamilienhaus (klein/mittel)", price: "ab 1’850.– bis 2’950.–" },
    { service: "Einfamilienhaus (gross)", price: "ab 2’550.– bis 6’050.–" },
    { service: "Räumung bei Messie-Haushalt", price: "Offerten einholen" },
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Räumung & Entsorgung in der Schweiz",
    "serviceType": "Räumung und Entsorgung",
    "description": "Vergleichen Sie bis zu 5 kostenlose Offerten für Räumung und Entsorgung in der Schweiz. Geprüfte Firmen, transparente Preise und schnelle Abwicklung.",
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
      <div className="bg-white">
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
                    Räumung & Entsorgung: Räumungsfirmen in Ihrer Region vergleichen
                  </h1>
                </div>
                <p
                  className="text-base md:text-body mb-6 leading-relaxed"
                >
                  Vergleichen Sie bis zu 5 kostenlose Offerten von geprüften Firmen für Räumung und Entsorgung. Von der Entrümpelung bis zur besenreinen Übergabe – effizient, zuverlässig und umweltgerecht.
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
            <div className="order-1 md:order-2">
              <h2 className="heading-2">Warum eine professionelle Räumungsfirma beauftragen?</h2>
              <p className="text-lg text-slate-600 leading-relaxed">Eine Räumung ist oft mehr als nur das Ausmisten alter Gegenstände. Sie erfordert Organisation, körperlichen Einsatz und Wissen über die fachgerechte Entsorgung. Eine professionelle Firma nimmt Ihnen diese Last ab, kümmert sich um die umweltfreundliche Trennung von Wertstoffen und Abfall und garantiert eine schnelle und diskrete Abwicklung.</p>
            </div>
            <div
              className="relative h-80 rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1"
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
            <h2 className="heading-2">Räumung & Entsorgung Kosten in der Schweiz: Richtpreise im Überblick</h2>
            <p className="text-slate-600 mt-4 max-w-4xl">
              Die folgenden Richtpreise helfen Ihnen bei der ersten Budgetplanung. Der effektive Preis hängt unter anderem von Menge,
              Zugänglichkeit, Entsorgungsart und Zusatzleistungen ab.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">Richtpreise für Hausräumung, Keller und Einzelräume</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-sm font-semibold text-slate-700 border-b border-green-200 pb-2">
                    <span>Dienstleistung</span>
                    <span>Geschätzte Kosten (CHF)</span>
                  </div>
                  {hausUndEinzelraumPrices.map((item, i) => (
                    <div key={i} className="grid grid-cols-2 gap-4 py-2 border-b last:border-0 border-green-200">
                      <span className="text-slate-700">{item.service}</span>
                      <span className="font-semibold text-green-700">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-2xl font-semibold text-slate-800 mb-4">Richtpreise für Wohnungsräumung nach Grösse</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-sm font-semibold text-slate-700 border-b border-green-200 pb-2">
                    <span>Wohnungsgrösse</span>
                    <span>Geschätzte Kosten (CHF)</span>
                  </div>
                  {wohnungsRaeumungPrices.map((item, i) => (
                    <div key={i} className="grid grid-cols-2 gap-4 py-2 border-b last:border-0 border-green-200">
                      <span className="text-slate-700">{item.size}</span>
                      <span className="font-semibold text-green-700">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 italic">Alle Preise sind durchschnittliche Richtwerte und verstehen sich exkl. MwSt. Je nach Anbieter, Region und Aufwand können die Preise abweichen. Für genaue Preise empfehlen wir, mehrere Offerten einzuholen und zu vergleichen.</p>
          </section>

          <Article />
          <Faq />

          <section id="cta" className="text-center bg-white text-gray-900 py-16 px-6 rounded-2xl shadow-xl border border-gray-200">
            <h2
              className="heading-2"
            >
              Bereit, Räumungsofferten zu vergleichen?
            </h2>
            <p
              className="max-w-2xl mx-auto text-gray-600 mb-8"
            >
              Bei Online-Offerten.ch erhalten Sie mit einer einzigen Anfrage kostenlos und unverbindlich mehrere Offerten von geprüften Räumungsfirmen aus Ihrer Region.
            </p>
            <div
            >
              <Button onClick={handleCtaClick} size="lg" className="bg-white text-green-700 hover:bg-green-100 group w-full sm:w-auto px-8 py-4 text-base">
                Jetzt kostenlose Offerten vergleichen
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



