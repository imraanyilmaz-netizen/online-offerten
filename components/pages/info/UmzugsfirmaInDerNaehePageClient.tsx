'use client'

import React, { useEffect, useState } from 'react'
// Framer Motion removed for better performance
import Link from 'next/link'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  ArrowRight, CheckCircle, ShieldCheck, Clock, TrendingUp, Users, Award, 
  Star, Calculator, MapPin, Home, Building, Globe, Package, Sparkles,
  HelpCircle, Info, FileText, Search, HeartHandshake, Zap, Target, 
  Truck, Navigation, Phone, Mail, Calendar, Navigation2, Route,
  ShieldQuestion, Weight, VenetianMask, ArrowUpDown,
  Droplets, Hammer, Layers, Grid2x2, SprayCan
} from 'lucide-react'
import { PiPianoKeysFill } from 'react-icons/pi'
import UmzugsfirmaInDerNaeheHeroForm from './UmzugsfirmaInDerNaeheHeroForm'

const UmzugsfirmaInDerNaehePageClient = () => {
  const router = useRouter()
  const canonicalUrl = 'https://online-offerten.ch/umzugsfirma-in-der-naehe'
  
  // Rating stats - can be fetched from API or use defaults
  const [ratingStats] = useState({
    reviewCount: 1,
    averageRating: 4.8
  })

  const faqItems = [
    {
      q: "Wie finde ich eine Umzugsfirma in der Nähe?",
      a: "Nutzen Sie unser kostenloses Vergleichsportal. Füllen Sie das Online-Formular aus und beschreiben Sie Ihren geplanten Umzug. Wir vermitteln Ihnen bis zu 5 geprüfte Anbieter aus Ihrer Region, die sich direkt bei Ihnen melden und individuelle Offerten erstellen."
    },
    {
      q: "Wie viel kostet eine Umzugsfirma?",
      a: "Die Kosten hängen von Umzugsstrecke, Umfang, Stockwerken und benötigten Leistungen ab. Ein durchschnittlicher Wohnungsumzug kostet zwischen 1.500 und 4.000 CHF. Der Vergleich mehrerer Offerten hilft Ihnen, faire Preise zu finden."
    },
    {
      q: "Warum sollte ich eine Umzugsfirma in der Nähe wählen?",
      a: "Kürzere Anfahrtswege reduzieren Kosten, lokale Expertise über Verkehr und Parkregelungen, und schnellere Reaktionszeiten bei Änderungen. Regionale Anbieter kennen die örtlichen Gegebenheiten besonders gut."
    },
    {
      q: "Wie viele Offerten erhalte ich?",
      a: "Sie erhalten bis zu 5 kostenlose und unverbindliche Offerten. In Ballungsgebieten meist alle 5, in ländlicheren Regionen können es auch 3-4 sein. Jede Offerte wird individuell auf Ihre Bedürfnisse zugeschnitten."
    },
    {
      q: "Ist der Service wirklich kostenlos?",
      a: "Ja, unser Service ist für Sie zu 100% kostenlos und unverbindlich. Sie erhalten bis zu 5 Offerten ohne Gebühren. Es gibt keine versteckten Kosten oder Verpflichtungen."
    },
    {
      q: "Wie wird die Qualität sichergestellt?",
      a: "Wir arbeiten nur mit geprüften und versicherten Partnerfirmen zusammen. Alle Anbieter durchlaufen einen strengen Prüfprozess. Zusätzlich können Sie Bewertungen anderer Kunden einsehen."
    },
    {
      q: "Wie lange im Voraus sollte ich buchen?",
      a: "Wir empfehlen mindestens 1-2 Monate im Voraus, besonders in den Sommermonaten und zum Monatsende. Frühzeitige Buchung gibt Ihnen mehr Auswahl und oft bessere Preise."
    },
    {
      q: "Was sollte eine gute Offerte enthalten?",
      a: "Gesamtpreis mit Aufschlüsselung, alle enthaltenen Leistungen, Versicherungsschutz, Umzugsdatum und Zeitfenster, Anzahl der Helfer und Fahrzeuge, sowie Zahlungs- und Stornierungsbedingungen."
    },
    {
      q: "Wie kann ich sparen?",
      a: "Der Vergleich mehrerer Offerten spart durchschnittlich 30-40%. Weitere Tipps: Flexibel beim Umzugsdatum sein, selbst packen, frühzeitig buchen und Offerten genau vergleichen."
    },
    {
      q: "Was passiert nach der Anfrage?",
      a: "Ihre Anfrage wird an passende Umzugsunternehmen weitergeleitet. Diese nehmen direkt Kontakt mit Ihnen auf und erstellen individuelle Offerten. Sie erhalten in der Regel innerhalb von 24-48 Stunden die ersten Rückmeldungen."
    }
  ]

  // Inject structured data
  useEffect(() => {
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
              "name": "Umzugsfirma in der Nähe",
              "item": canonicalUrl
            }
          ]
        },
        {
          "@type": "Service",
          "name": "Umzugsfirma in der Nähe finden",
          "serviceType": "Umzugsservice",
          "description": "Finden Sie die besten lokalen Umzugsunternehmen. Vergleichen Sie bis zu 5 kostenlose Offerten von geprüften Umzugsanbietern in Ihrer Region für Privatumzug, Geschäftsumzug und mehr.",
          "provider": {
            "@type": "Organization",
            "name": "Online-Offerten.ch",
            "url": "https://online-offerten.ch",
            "logo": "https://online-offerten.ch/image/logo.png"
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
            "name": "Kostenlose Umzugsfirma Offerten in der Nähe"
          }
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://online-offerten.ch/#organization",
          "name": "Online-Offerten.ch",
          "url": "https://online-offerten.ch",
          "logo": "https://online-offerten.ch/image/logo.png",
          "description": "Vergleichsportal für Umzugsfirmen in der Schweiz",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "CH"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Switzerland"
          }
        },
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schemaData)
    script.id = 'umzugsfirma-in-der-naehe-schema'
    
    const existing = document.getElementById('umzugsfirma-in-der-naehe-schema')
    if (existing && existing.parentNode) {
      try {
        existing.remove()
      } catch (e) {
        // Element zaten kaldırılmış olabilir
      }
    }
    
    document.head.appendChild(script)
    
    return () => {
      if (typeof document === 'undefined') return
      const scriptToRemove = document.getElementById('umzugsfirma-in-der-naehe-schema')
      if (scriptToRemove && scriptToRemove.parentNode) {
        try {
          scriptToRemove.remove()
        } catch (e) {
          // Element zaten kaldırılmış olabilir
        }
      }
    }
  }, [])

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=umzug&step=2')
  }

  const features = [
    {
      icon: MapPin,
      title: 'Qualifizierte Anbieter',
      description: 'Finden Sie qualifizierte Anbieter direkt in Ihrer Region'
    },
    {
      icon: ShieldCheck,
      title: '100% kostenlos & unverbindlich',
      description: 'Keine versteckten Kosten, keine Verpflichtungen'
    },
    {
      icon: TrendingUp,
      title: 'Transparente Preise & individuelle Offerten',
      description: 'Durch den Vergleich mehrerer lokaler Umzugsfirmen finden Sie die besten Preise'
    },
    {
      icon: Users,
      title: 'Versicherte Partner',
      description: 'Alle Partnerfirmen sind versichert und verfügen über positive Bewertungen'
    },
    {
      icon: Clock,
      title: 'Schnelle Antworten',
      description: 'Erhalten Sie die ersten Offerten bereits innerhalb von 24 Stunden'
    },
    {
      icon: Navigation,
      title: 'Regionale Expertise',
      description: 'Lokale Umzugsfirmen kennen die örtlichen Gegebenheiten besonders gut'
    }
  ]

  const benefits = [
    {
      icon: Navigation2,
      title: "Lokale Expertise",
      description: "Kennen die örtlichen Gegebenheiten, Verkehrssituationen und Parkregelungen besonders gut."
    },
    {
      icon: Route,
      title: "Kürzere Anfahrtswege",
      description: "Reduzieren die Kosten und minimieren die Umweltbelastung."
    },
    {
      icon: Clock,
      title: "Schnellere Reaktionszeiten",
      description: "Können bei Notfällen oder kurzfristigen Änderungen schneller reagieren."
    }
  ]

  const locations = [
    { name: "Umzugsfirma Zürich", link: "/umzugsfirma-in-der-naehe/zuerich" },
    { name: "Umzugsfirma Basel", link: "/umzugsfirma-in-der-naehe/basel" },
    { name: "Umzugsfirma Bern", link: "/umzugsfirma-in-der-naehe/bern" },
    { name: "Umzugsfirma Genf", link: "/umzugsfirma-in-der-naehe/genf" },
    { name: "Umzugsfirma Lausanne", link: "/umzugsfirma-in-der-naehe/lausanne" },
    { name: "Umzugsfirma Luzern", link: "/umzugsfirma-in-der-naehe/luzern" },
    { name: "Umzugsfirma St. Gallen", link: "/umzugsfirma-in-der-naehe/st-gallen" },
    { name: "Umzugsfirma Thun", link: "/umzugsfirma-in-der-naehe/thun" },
    { name: "Umzugsfirma Biel-Bienne", link: "/umzugsfirma-in-der-naehe/biel-bienne" },
    { name: "Umzugsfirma Lugano", link: "/umzugsfirma-in-der-naehe/lugano" },
    { name: "Umzugsfirma Aargau", link: "/umzugsfirma-in-der-naehe/aargau" }
  ]

  return (
    <>
      {/* Hero Section - Unique Design for Local Search */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-gray-100">
        {/* Background */}
        <div className="absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-gray-100"></div>
        </div>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold text-sm mb-3">
                <MapPin className="h-4 w-4 mr-2" />
                Ihren Umzug günstig planen
              </div>
              <h1 className="heading-1 !mt-0">
                Umzugsfirma in der Nähe finden » Geprüfte Partner vergleichen
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
                Finden Sie geprüfte Umzugsunternehmen in Ihrer Region. Vergleichen Sie kostenlos bis zu 5 Offerten und sparen Sie bis zu 40% bei Ihrem Umzug.
              </p>
              
              {/* Umzug Type Buttons */}
              <p className="text-sm font-semibold text-gray-700 mb-2">Wählen Sie Ihre gewünschte Dienstleistung aus:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 mb-6">
                {/* Privatumzug */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=privatumzug"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-100 group-hover:bg-blue-500 transition-colors">
                    <Home className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Privatumzug</p>
                    <p className="text-xs text-gray-600 mt-0.5">Wohnungsumzug</p>
                  </div>
                </Link>
                
                {/* Geschäftsumzug */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=geschaeftsumzug"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-purple-500 hover:bg-purple-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-purple-100 group-hover:bg-purple-500 transition-colors">
                    <Building className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Geschäftsumzug</p>
                    <p className="text-xs text-gray-600 mt-0.5">Firmenumzug</p>
                  </div>
                </Link>
                
                {/* International */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=international"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-emerald-100 group-hover:bg-emerald-500 transition-colors">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Auslandumzug</p>
                    <p className="text-xs text-gray-600 mt-0.5">International</p>
                  </div>
                </Link>
                
                {/* Klaviertransport */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=spezialtransport&special_transport_type=klaviertransport"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-amber-500 hover:bg-amber-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-100 group-hover:bg-amber-500 transition-colors">
                    <PiPianoKeysFill className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Klaviertransport</p>
                    <p className="text-xs text-gray-600 mt-0.5">Piano & Flügel</p>
                  </div>
                </Link>
                
                {/* Kleintransport */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=kleintransport"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-teal-500 hover:bg-teal-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-teal-100 group-hover:bg-teal-500 transition-colors">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Kleintransport</p>
                    <p className="text-xs text-gray-600 mt-0.5">Einzelne Gegenstände</p>
                  </div>
                </Link>
                
                {/* Möbellift */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=moebellift"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-indigo-100 group-hover:bg-indigo-500 transition-colors">
                    <ArrowUpDown className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Möbellift</p>
                    <p className="text-xs text-gray-600 mt-0.5">Bis 400 kg, 27m</p>
                  </div>
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-700">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>Versicherte Firmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>100% kostenlos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>Angebote von geprüften Partnern</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>Jetzt Preise vergleichen & sparen</span>
                </div>
              </div>
            </div>
            <div className="relative md:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-green-200">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-green-100 p-4 rounded-full">
                    <Navigation className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <h3 className="heading-3 text-center">
                  Finden Sie Ihre Umzugsfirma
                </h3>
                <div className="space-y-4">
                  {features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <feature.icon className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">{feature.title}</p>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Local Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div>
                <h2 className="heading-2">
                  Warum eine lokale Umzugsfirma wählen?
                </h2>
                <p className="text-body mb-6">
                  Eine Umzugsfirma aus Ihrer Nähe kennt die regionalen Besonderheiten: Verkehrssituationen, Parkregelungen, Gebäudezugänge und lokale Vorschriften. Das spart nicht nur Zeit, sondern auch Geld durch kürzere Anfahrtswege. Lokale Anbieter sind flexibler bei kurzfristigen Änderungen und können schneller auf Ihre individuellen Bedürfnisse eingehen. Zusätzlich unterstützen Sie mit Ihrer Wahl die regionale Wirtschaft und erhalten oft persönlicheren Service.
                </p>
                
                <div className="mb-8">
                  <h3 className="heading-3">
                    Ihre Vorteile mit einer lokalen Umzugsfirma:
                  </h3>
                  <ul className="space-y-3 text-body">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span><strong>Kürzere Anfahrtswege = niedrigere Kosten</strong></span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span><strong>Lokale Expertise = reibungsloser Ablauf</strong></span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span><strong>Schnellere Reaktionszeiten = mehr Flexibilität</strong></span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span><strong>Persönlicher Service = individuelle Betreuung</strong></span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="hidden lg:block">
                <NextImage 
                  src="/bilder/umzugshilfe-finden-vergleichen.webp" 
                  alt="Umzugsfirma in der Nähe finden und vergleichen" 
                  width={600} 
                  height={450} 
                  className="w-full h-auto object-cover rounded-xl" 
                />
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                So finden Sie die beste Umzugsfirma in Ihrer Nähe
              </h3>
              <p className="text-body">
                Der Vergleich mehrerer Anbieter ist der Schlüssel zum Erfolg. Studien zeigen, dass Umzugskosten für identische Leistungen um bis zu 40% variieren können. Mit unserem Service erhalten Sie mit nur einer Anfrage bis zu 5 detaillierte Offerten von geprüften Umzugsunternehmen aus Ihrer Region.
              </p>
            </div>

            {/* Reinigungsfirma Section */}
            <div className="mt-12">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-semibold text-sm mb-3">
                <Sparkles className="h-4 w-4 mr-2" />
                Reinigungsfirma finden
              </div>
              <h2 className="heading-2 !mt-0">
                Suchen Sie eine Reinigungsfirma in der Nähe?
              </h2>
              <p className="text-body mb-6">
                Professionelle Reinigungsfirmen sorgen für makellose Sauberkeit – ob Umzugsreinigung, Büroreinigung oder Unterhaltsreinigung. Vergleichen Sie kostenlos Offerten von geprüften Reinigungsunternehmen in Ihrer Region.
              </p>
              
              <p className="text-sm font-semibold text-gray-700 mb-2">Wählen Sie Ihre gewünschte Dienstleistung aus:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {/* Endreinigung */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=umzugsreinigung"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-100 group-hover:bg-blue-500 transition-colors">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Endreinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">mit Abnahmegarantie</p>
                  </div>
                </Link>

                {/* Wohnungsreinigung */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=wohnungsreinigung"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-purple-500 hover:bg-purple-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-purple-100 group-hover:bg-purple-500 transition-colors">
                    <Home className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Wohnungsreinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Private Räume</p>
                  </div>
                </Link>

                {/* Büroreinigung */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=buero"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-emerald-100 group-hover:bg-emerald-500 transition-colors">
                    <Building className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Büroreinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Geschäftsräume</p>
                  </div>
                </Link>

                {/* Grundreinigung */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=grundreinigung"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-amber-500 hover:bg-amber-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-100 group-hover:bg-amber-500 transition-colors">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Grundreinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Tiefenreinigung</p>
                  </div>
                </Link>

                {/* Fensterreinigung */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=fensterreinigung"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-teal-500 hover:bg-teal-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-teal-100 group-hover:bg-teal-500 transition-colors">
                    <Grid2x2 className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Fensterreinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Glas & Rahmen</p>
                  </div>
                </Link>

                {/* Unterhaltsreinigung */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=unterhaltsreinigung"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-indigo-100 group-hover:bg-indigo-500 transition-colors">
                    <SprayCan className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Unterhaltsreinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Regelmässig</p>
                  </div>
                </Link>

                {/* Baureinigung */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=baureinigung"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-orange-500 hover:bg-orange-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-orange-100 group-hover:bg-orange-500 transition-colors">
                    <Hammer className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Baureinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Nach Umbau</p>
                  </div>
                </Link>

                {/* Bodenreinigung */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=bodenreinigung"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-rose-500 hover:bg-rose-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-rose-100 group-hover:bg-rose-500 transition-colors">
                    <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Bodenreinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Alle Bodenarten</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12">
            <h2 className="heading-2">
              Stressfrei umziehen in<br />3 Schritten
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Anfrage ausfüllen",
                description: "Beschreiben Sie Ihren Umzug in unserem Formular. Geben Sie Umzugsdatum, Wohnungsgrösse, Start- und Zielort an.",
                icon: FileText
              },
              {
                number: "02",
                title: "Offerten erhalten",
                description: "Erhalten Sie bis zu 5 Offerten. Die Anbieter nehmen direkt Kontakt mit Ihnen auf und erstellen individuelle Offerten.",
                icon: Mail
              },
              {
                number: "03",
                title: "Vergleichen & auswählen",
                description: "Vergleichen Sie Preise, Leistungen und Bewertungen. Wählen Sie den besten Anbieter für Ihren Umzug aus.",
                icon: Star
              }
            ].map((step, index) => (
              <div
                key={index}
                className="relative"
              >
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-green-200 z-0" style={{ width: 'calc(100% - 3rem)' }} />
                )}
                <Card className="relative z-10 h-full border-2 border-green-200 hover:border-green-500 transition-colors">
                  <CardHeader className="text-center">
                    <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      {step.number}
                    </div>
                    <div className="flex justify-center mb-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <step.icon className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed text-center">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Links Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="heading-2">
              Umzugsfirmen in Ihrer Region
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Finden Sie Umzugsfirmen in den grössten Städten der Schweiz. Wir vermitteln Ihnen qualifizierte Anbieter aus Ihrer Region.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {locations.map((location, index) => (
              <div key={index}>
                <Link href={location.link}>
                  <Card className="h-full hover:border-green-500 hover:shadow-lg transition-all cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-green-600 mr-3" />
                        <span className="font-semibold text-gray-900">{location.name}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400 ml-auto" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Form */}
      <section className="py-12 md:py-16 relative" style={{ backgroundImage: 'url(/umzug/7946a949.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl text-left">
            <h2 className="heading-2-white">
              Passende Umzugsprofis Schweiz finden | Kostenlos vergleichen
            </h2>
          
            {/* Search Form - Sayfaya özgün form */}
            <UmzugsfirmaInDerNaeheHeroForm />
            
            {/* Rating Card */}
            {ratingStats.reviewCount > 0 && (
              <div 
                className="bg-white rounded-xl p-5 sm:p-6 flex flex-col md:flex-row md:items-start items-start gap-4 transition-all duration-300 mt-6"
                style={{
                  boxShadow: '-4px 0 8px -2px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="flex-1 pt-1 w-full md:w-auto">
                  {/* Trust Badges */}
                  <div className="flex flex-wrap justify-start items-center gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-600">Kostenlos & unverbindlich</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-600">Versicherte Partner</span>
            </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-600">Bis zu 40% sparen</span>
              </div>
              </div>
              </div>
              </div>
            )}
            </div>
        </div>
      </section>
    </>
  )
}

export default UmzugsfirmaInDerNaehePageClient


