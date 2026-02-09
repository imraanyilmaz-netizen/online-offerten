'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Award, Package, Sparkles, MapPin, Building, Globe, Users, Truck, Home, ShieldCheck, Clock, TrendingUp, Calculator, HelpCircle, Info, Star, Wrench, HeartHandshake, FileText, Mail, BarChart3 } from 'lucide-react';
import { PiPianoKeysFill } from 'react-icons/pi';
import { locations } from '@/data/locations';
import LocationPageNavigation from '@/components/locations/LocationPageNavigation';
import { cityServiceData } from '@/data/cityLocalBusinessData';
import { faqs } from '@/data/locationFaqs';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const UmzugsfirmaAargauPageClient = () => {
  const city = "Aargau";
  const locationData = locations.find(loc => loc.name === city);

  const metaTitle = "Zügelfirma Aargau » Top Umzugsunternehmen vergleichen & sparen";
  const metaDescription = "Zügelfirma Aargau finden ✓ Geprüfte Umzugsunternehmen in Aarau, Baden, Zofingen vergleichen & bis zu 40% sparen. Kostenlose Offerten für Privat- & Geschäftsumzug.";
  const canonicalUrl = '/umzugsfirma-in-der-naehe/aargau';
  const imageUrl = '/image/umzug-reinigung-malerarbeiten-aargau-offerten.webp';

  // Cost Table Data
  const costTableRows = [
    { size: "1.5 - 2 Zimmer", staff: "2 Zügelmänner, 1 LKW", cost: "600 – 1.200 CHF" },
    { size: "2.5 - 3 Zimmer", staff: "3 Zügelmänner, 1 LKW", cost: "1.000 – 1.800 CHF" },
    { size: "3.5 - 4.5 Zimmer", staff: "3-4 Zügelmänner, 1-2 LKW", cost: "1.500 – 2.800 CHF" },
    { size: "5.5+ Zimmer / Haus", staff: "4-5 Zügelmänner, 2 LKW", cost: "2.500 – 5.000+ CHF" }
  ];

  const savingsTips = [
    "Antizyklisch umziehen: Meiden Sie Monatsenden und Wochenenden. Ein Umzug an einem Dienstag oder Mittwoch kann die Kosten um 20-30% senken.",
    "Strategisch selbst anpacken: Packen Sie Kisten selbst und demontieren Sie einfache Möbel. Das reduziert die teuren Arbeitsstunden der Profis.",
                    "Frühbucher-Rabatte nutzen: Planen Sie mindestens 2-3 Monate im Voraus. Viele Umzugsfirmen im Aargau bieten bessere Konditionen für frühe Buchungen.",
    "Minimalismus-Prinzip anwenden: Ein Umzug ist die perfekte Gelegenheit zum Entrümpeln. Jedes Kilo weniger spart bares Geld.",
    "Gratis-Zügelmaterial verwenden: Fragen Sie in Supermärkten, Apotheken oder im Freundeskreis nach stabilen Bananen- oder Kopierpapierkisten.",
                    <>Lokale Umzugsfirmen bevorzugen: <strong>Umzugsfirmen im Aargau</strong> kennen die Region, sparen Fahrtkosten und bieten oft bessere Preise.</>
  ];

  const aargauCities = [
    { name: 'Aarau', link: '/umzugsfirma-in-der-naehe/aargau/aarau', description: 'Kantonshauptstadt mit historischem Charme', anchorTexts: ['Umzugsfirma in Aarau', 'Zügelfirmen in Aarau finden', 'Umzugsunternehmen Aarau'] },
    { name: 'Baden', link: '/umzugsfirma-in-der-naehe/aargau/baden', description: 'Thermenstadt im Limmattal', anchorTexts: ['Zügelfirmen in Baden finden', 'Umzugsfirma Baden', 'Umzugsunternehmen Baden'] },
    { name: 'Zofingen', link: '/umzugsfirma-in-der-naehe/aargau/zofingen', description: 'Schöne Altstadt im Oberaargau', anchorTexts: ['Umzugsunternehmen Zofingen', 'Umzugsfirma in Zofingen', 'Zügelfirma Zofingen'] },
    { name: 'Brugg', link: '/umzugsfirma-in-der-naehe/aargau/brugg', description: 'Verkehrsknotenpunkt am Aareufer', anchorTexts: ['Professionelle Umzugshilfe in Brugg', 'Umzugsfirma Brugg', 'Zügelfirmen Brugg'] },
    { name: 'Wettingen', link: '/umzugsfirma-in-der-naehe/aargau/wettingen', description: 'Klosterstadt im Limmattal', anchorTexts: ['Umzugsservice Wettingen', 'Umzugsfirma in Wettingen', 'Zügelfirmen Wettingen'] }
  ];

  const howItWorksSteps = [
    {
      icon: FileText,
      title: "1. Anfrage ausfüllen",
      text: "Beschreiben Sie Ihren Umzug im Aargau in unserem Formular. Geben Sie Umzugsvolumen, Datum und gewünschte Leistungen an."
    },
    {
      icon: Mail,
      title: "2. Offerten erhalten",
      text: "Wir leiten Ihre Anfrage an geprüfte Umzugsfirmen im Aargau und Zügelfirmen aus dem Aargau weiter. Sie erhalten innerhalb von 24-48 Stunden mehrere Offerten."
    },
    {
      icon: BarChart3,
      title: "3. Vergleichen & sparen",
      text: "Vergleichen Sie die erhaltenen Offerten in Bezug auf Preis, Leistung und Bewertungen. Wählen Sie die passende Umzugsfirma Aargau aus und sparen Sie bis zu 40%!"
    }
  ];

  const faqItemsForSchema = faqs.move.concat(faqs.clean);
  const cityData = cityServiceData[city] || {
    name: 'Aargau',
    displayName: 'Zügelfirma Aargau – Online-Offerten.ch',
    addressLocality: 'Aarau',
    addressRegion: 'AG',
    latitude: '47.3925',
    longitude: '8.0447',
    canonicalUrl: '/umzugsfirma-in-der-naehe/aargau'
  };
  
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
            "name": `Umzugsfirma ${city}`,
            "item": `https://online-offerten.ch${canonicalUrl}`
          }
        ]
      },
      {
        "@type": "Service",
        "serviceType": "Umzugsvermittlung",
        "name": `Umzugsfirma ${city} vergleichen`,
        "description": metaDescription,
        "provider": {
          "@type": "Organization",
          "name": "Online-Offerten.ch",
          "url": "https://online-offerten.ch"
        },
        "areaServed": {
          "@type": "City",
          "name": city,
          "containedInPlace": {
            "@type": "Country",
            "name": "Switzerland"
          }
        },
        "offers": {
          "@type": "Offer",
          "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=umzug&step=2&city=" + city,
          "priceCurrency": "CHF",
          "price": "0"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className={`bg-white overflow-x-hidden ${inter.className}`}>
        {/* Modern Hero Section */}
        <section className="relative w-full bg-white py-16 md:py-20 lg:py-24 overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, gray 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
                className="text-gray-900 lg:col-span-3"
          >
                <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                  <span className="text-sm font-medium text-gray-700">Kanton Aargau</span>
            </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
                  <span className="block">Umzugsfirma Aargau</span>
                  <span className="block text-green-600 mt-2">Geprüfte Anbieter vergleichen</span>
            </h1>
                
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl">
                  Finden Sie die besten <strong className="text-gray-900">Umzugsdienstleister</strong> und <strong>Zügelunternehmen im Kanton Aargau</strong> für Ihren Umzug. Vergleichen Sie kostenlos mehrere <strong>geprüfte Partner nach Schweizer Standards</strong> in <strong>Aarau</strong>, <strong>Baden</strong>, <strong>Zofingen</strong> und der ganzen Region. Professionelle <strong>Transportunternehmen für Umzüge</strong> und <strong>regionale Zügelprofis</strong> bieten umfassende Dienstleistungen für Privatumzug, Geschäftsumzug, Auslandumzug und Spezialtransporte. Alle Partner sind <strong>versichert gemäss OR</strong>.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    asChild
                    size="lg" 
                    className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 group"
                  >
                    <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Aargau">
                      Kostenlose Offerten anfordern
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    variant="outline"
                    size="lg" 
                    className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300 px-8 py-6 text-lg rounded-lg shadow-sm hover:shadow-md"
                  >
                    <Link href="/umzugsfirma/umzugskosten">
                      <Calculator className="w-5 h-5 mr-2" />
                      Kosten berechnen
                    </Link>
                  </Button>
                </div>
                
                {/* Trust Badges */}
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium">100% kostenlos</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Geprüfte Partner</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Bis zu 40% sparen</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl border border-gray-200 lg:col-span-2"
              >
                <Image
                  src={imageUrl}
                  alt="Professionelle Zügelfirma im Aargau - Umzugsunternehmen bei der Arbeit"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
              </motion.div>
            </div>
          </div>
              </section>

        {/* Service Selection Cards */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-green-50 to-emerald-50 border-b border-gray-200">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="heading-2 text-center mb-8">
              Wählen Sie Ihre gewünschte Dienstleistung
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link 
                href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=privatumzug&city=Aargau"
                className="group bg-white border-2 border-gray-200 hover:border-green-500 rounded-xl p-6 text-center transition-all hover:shadow-lg transform hover:-translate-y-1"
              >
                <Home className="w-10 h-10 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 mb-1">Privatumzug</h3>
                <p className="text-xs text-gray-600">Wohnung, Haus</p>
              </Link>
              
              <Link 
                href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=geschaeftsumzug&city=Aargau"
                className="group bg-white border-2 border-gray-200 hover:border-green-500 rounded-xl p-6 text-center transition-all hover:shadow-lg transform hover:-translate-y-1"
              >
                <Building className="w-10 h-10 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 mb-1">Geschäftsumzug</h3>
                <p className="text-xs text-gray-600">Büro, Firma</p>
              </Link>
              
              <Link 
                href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=international&city=Aargau"
                className="group bg-white border-2 border-gray-200 hover:border-green-500 rounded-xl p-6 text-center transition-all hover:shadow-lg transform hover:-translate-y-1"
              >
                <Globe className="w-10 h-10 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 mb-1">International</h3>
                <p className="text-xs text-gray-600">Auslandumzug</p>
              </Link>
              
              <Link 
                href="/kostenlose-offerte-anfordern?service=umzug&step=2&umzugArt=spezialtransport&city=Aargau"
                className="group bg-white border-2 border-gray-200 hover:border-green-500 rounded-xl p-6 text-center transition-all hover:shadow-lg transform hover:-translate-y-1"
              >
                <Package className="w-10 h-10 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 mb-1">Spezialtransport</h3>
                <p className="text-xs text-gray-600">Klavier, Tresor</p>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-gray-100">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="heading-2">
                So funktioniert's: Ihr Umzug im Aargau leicht gemacht
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                In nur drei einfachen Schritten erhalten Sie mehrere Offerten von geprüften <strong>Umzugsfirmen im Aargau</strong> und <strong>Zügelfirmen</strong> aus dem Aargau
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {howItWorksSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                      <Icon className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="heading-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.text}</p>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="text-center mt-12">
              <Button 
                asChild
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 text-lg rounded-lg shadow-xl"
              >
                  <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Aargau">
                  Jetzt Offerten einholen
                  <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <main className="space-y-12">
                {/* Introduction */}
                <article>
                  <h2 className="heading-2">
                    Umzug im Kanton Aargau – Professionelle Anbieter vergleichen
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Der <strong>Aargau</strong>, liebevoll auch "Rüebliland" genannt, ist einer der schönsten und wirtschaftsstärksten Kantone der Schweiz. Mit seiner zentralen Lage zwischen Zürich, Basel und Bern ist der Aargau ein beliebter Wohn- und Wirtschaftsstandort. Ein Umzug in dieser Region – ob nach <Link href="/umzugsfirma-in-der-naehe/aargau/aarau" className="text-green-600 hover:text-green-800 underline font-semibold">Aarau</Link>, <Link href="/umzugsfirma-in-der-naehe/aargau/baden" className="text-green-600 hover:text-green-800 underline font-semibold">Baden</Link>, <Link href="/umzugsfirma-in-der-naehe/aargau/zofingen" className="text-green-600 hover:text-green-800 underline font-semibold">Zofingen</Link>, <Link href="/umzugsfirma-in-der-naehe/aargau/brugg" className="text-green-600 hover:text-green-800 underline font-semibold">Brugg</Link> oder in eine der vielen charmanten Gemeinden – erfordert einen professionellen <strong>Umzugsdienstleister</strong> oder <strong>Zügelunternehmen</strong>, der die Besonderheiten der Region kennt.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Erfahrene <strong>Transportunternehmen für Umzüge</strong> im Aargau kennen die Verkehrswege, die Parkregelungen in den historischen Altstädten und die logistischen Herausforderungen der Region. Über unser Portal können Sie mehrere <strong>geprüfte Partner nach Schweizer Standards</strong> vergleichen und die beste Lösung für Ihr Projekt finden. Professionelle <strong>regionale Zügelprofis</strong> kümmern sich um die Organisation von Halteverbotszonen, planen die schnellste Route und stellen sicher, dass Ihr Hab und Gut sicher und unversehrt im neuen Zuhause ankommt. Alle Partner sind <strong>versichert gemäss OR</strong> und verfügen über langjährige Erfahrung.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Der Vergleich mehrerer Anbieter gibt Ihnen die Sicherheit, einen geprüften und versicherten <strong>Umzugspartner im Aargau</strong> zu finden, der Ihren Ansprüchen gerecht wird. Durch den direkten Vergleich finden Sie das beste Preis-Leistungs-Verhältnis und sparen dabei erheblich. Unser <strong>Schweizer Kundenservice</strong> steht Ihnen bei allen Fragen zur Verfügung.
                    </p>
                  </div>
                </article>
              </main>
          </div>
        </section>

        {/* Benefits Section - Full Width */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <article className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 md:p-10 border border-green-200">
              <h2 className="heading-2">
                Umzug im Aargau – Ihre Vorteile in 3 einfachen Schritten
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <ShieldCheck className="w-10 h-10 text-green-600 mb-4" />
                  <h3 className="heading-3">Stressfrei und professionell durchführen</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Ein geplanter Umzug im Aargau spart nicht nur Zeit, sondern auch Nerven. Unsere geprüften Partner-<strong>Zügelfirmen</strong> übernehmen den kompletten Ablauf – vom Einpacken bis zum sicheren Transport.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <MapPin className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="heading-3">Lokale Umzugsdienstleister für schnelle Abläufe</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Unsere <strong>Zügelunternehmen im Kanton Aargau</strong> kennen die Region, die Verkehrswege und regionale Besonderheiten. Lokale Expertise sorgt für einen reibungslosen Ablauf. Durch die Vermittlung von Umzügen im Aargau können wir professionelle Abwicklung sicherstellen.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <TrendingUp className="w-10 h-10 text-purple-600 mb-4" />
                  <h3 className="heading-3">Kostenlose Offerten vergleichen</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Erhalten Sie gratis bis zu fünf Offerten von qualifizierten <strong>Transportunternehmen für Umzüge</strong> aus dem Aargau. Vergleichen Sie Preise, Leistungen und Bewertungen – unverbindlich und kostenlos. Alle Anbieter sind <strong>geprüfte Partner nach Schweizer Standards</strong>.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Main Content Section - Continue */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <main className="space-y-12">

                {/* Pricing Table */}
                <article>
                  <h2 className="heading-2">Umzugskosten im Aargau</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Die Umzugskosten im Aargau sind im Vergleich zu den grossen Städten wie Zürich oder Basel oft günstiger, lassen sich aber mit der richtigen Planung weiter optimieren. Durch den Vergleich mehrerer <strong>geprüfter Partner nach Schweizer Standards</strong> finden Sie das beste Angebot und sparen bis zu 40%. Alle Anbieter sind <strong>versichert gemäss OR</strong> und verfügen über umfassende Erfahrung. Eine detaillierte Übersicht finden Sie auf unserer Seite <Link href="/umzugskosten-aargau" className="text-green-600 hover:text-green-800 underline font-semibold">Umzugskosten im Aargau berechnen</Link>, erfahren Sie mehr über die <Link href="/umzugskosten-aargau" className="text-green-600 hover:text-green-800 underline font-semibold">Preisübersicht für Umzüge im Aargau</Link> oder informieren Sie sich über <Link href="/umzugskosten-aargau" className="text-green-600 hover:text-green-800 underline font-semibold">Was kostet ein Umzug im Aargau?</Link>.
                  </p>
                  
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
                      <h3 className="heading-3 text-white">Detaillierte Kostenschätzung für Ihren Aargau-Umzug</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200">Wohnungsgrösse</th>
                            <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200">Personal & LKW</th>
                            <th className="px-6 py-4 text-right font-semibold text-gray-900 border-b border-gray-200">Geschätzte Kosten (CHF)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {costTableRows.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 border-b border-gray-100 text-gray-700">{row.size}</td>
                              <td className="px-6 py-4 border-b border-gray-100 text-gray-700">{row.staff}</td>
                              <td className="px-6 py-4 border-b border-gray-100 text-right font-semibold text-green-600">{row.cost}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-sm text-gray-600 italic">
                        Hinweis: Diese Preise sind Schätzungen für Umzüge innerhalb des Aargaus. Faktoren wie Stockwerk, Liftverfügbarkeit, Distanz und Zusatzleistungen beeinflussen den Endpreis. Für eine exakte Kalkulation nutzen Sie unseren <Link href="/umzugsfirma/umzugskosten" className="text-green-600 hover:text-green-800 underline font-semibold">Umzugskosten-Rechner</Link> oder informieren Sie sich über die <Link href="/umzugskosten-aargau" className="text-green-600 hover:text-green-800 underline font-semibold">detaillierte Kostenübersicht: Umzugskosten Aargau</Link>.
                      </p>
                    </div>
                  </div>
                </article>

                {/* Aargau Cities */}
                <article>
                  <h2 className="heading-2">Städte & Regionen im Aargau</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Der Aargau bietet eine vielfältige Landschaft mit historischen Städten, idyllischen Dörfern und modernen Wirtschaftszentren. Unsere Partner-<strong>Umzugsdienstleister</strong> und <strong>regionale Zügelprofis</strong> sind in der ganzen Region aktiv. Alle verfügen über umfassende Erfahrung und sind <strong>geprüfte Partner nach Schweizer Standards</strong>. Erfahren Sie mehr über <Link href="/umzugsfirma-in-der-naehe/aargau/aarau" className="text-green-600 hover:text-green-800 underline font-semibold">Umzugsfirma in Aarau</Link>, <Link href="/umzugsfirma-in-der-naehe/aargau/baden" className="text-green-600 hover:text-green-800 underline font-semibold">Zügelfirmen in Baden finden</Link>, <Link href="/umzugsfirma-in-der-naehe/aargau/zofingen" className="text-green-600 hover:text-green-800 underline font-semibold">Umzugsunternehmen Zofingen</Link>, <Link href="/umzugsfirma-in-der-naehe/aargau/brugg" className="text-green-600 hover:text-green-800 underline font-semibold">Professionelle Umzugshilfe in Brugg</Link> und <Link href="/umzugsfirma-in-der-naehe/aargau/wettingen" className="text-green-600 hover:text-green-800 underline font-semibold">Umzugsservice Wettingen</Link>:
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {aargauCities.map((cityItem, index) => (
                      <Link
                        key={index}
                        href={cityItem.link}
                        className="group bg-white border-2 border-gray-200 hover:border-green-500 rounded-xl p-5 transition-all hover:shadow-lg"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                          <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                            {cityItem.name}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600">{cityItem.description}</p>
                      </Link>
                    ))}
                  </div>
                </article>

                {/* Umzug in Aarau Section */}
                <article className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 md:p-10 border border-gray-200">
                  <h2 className="heading-2">
                    Umzug in Aarau – Günstige Umzugsfirmen vergleichen & sparen
                  </h2>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Planen Sie einen Umzug in Aarau oder Umgebung? Auf <strong>online-offerten.ch</strong> können Sie schnell und unkompliziert mehrere kostenlose Offerten von geprüften <strong>Umzugsfirmen in Aarau</strong> anfordern. Vergleichen Sie Preise und Leistungen und finden Sie das passende <strong>Zügelunternehmen</strong> – egal ob für einen Privatumzug, Firmenumzug oder Seniorenumzug.
                  </p>
                  
                  <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-200">
                    <h3 className="heading-3">
                      Stressfreier Umzug in Aarau – Einfach & digital organisiert
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Mit unserem modernen Vergleichsportal wird die Umzugsplanung in Aarau besonders einfach. Beschreiben Sie Ihr Umzugsprojekt in wenigen Minuten und erhalten Sie daraufhin passende Angebote von erfahrenen <strong>Umzugsunternehmen aus der Region Aarau</strong>. Transparent, zeitsparend und ohne Verpflichtung.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-200">
                    <h3 className="heading-3">
                      Warum sich ein Vergleich von Umzugsfirmen in Aarau lohnt
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Ein professioneller Umzug in Aarau sorgt für Sicherheit, Effizienz und einen reibungslosen Ablauf. Durch den direkten Vergleich mehrerer Offerten vermeiden Sie unnötige Mehrkosten und profitieren von fairen Preisen lokaler Anbieter. So lassen sich <strong>bis zu 40 % der Umzugskosten sparen</strong>.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-gray-200">
                    <h3 className="heading-3">
                      Umzugsservice in Aarau – Flexible Leistungen nach Bedarf
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      <strong>Umzugsfirmen in Aarau</strong> bieten individuelle Lösungen für jedes Umzugsprojekt:
                    </p>
                    <ul className="space-y-3 text-gray-700 list-disc list-inside ml-4">
                      <li><strong>Full-Service-Umzug:</strong> Verpacken, Transport, Möbelmontage</li>
                      <li><strong>Teilumzug:</strong> Nur Transport oder Unterstützung beim Packen</li>
                      <li><strong>Spezialumzüge:</strong> Klavier, Tresor, Antiquitäten oder Kunstobjekte</li>
                      <li><strong>Zusatzleistungen:</strong> Umzugsreinigung, Entsorgung, Möbellagerung</li>
                      <li><strong>Versicherungsschutz:</strong> Absicherung Ihres gesamten Umzugsguts</li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mt-4">
                      Sie entscheiden selbst, welche Leistungen Sie für Ihren <strong>Umzug in Aarau</strong> benötigen.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border border-green-200">
                    <h3 className="heading-3">
                      Ihre Vorteile mit online-offerten.ch
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700"><strong>100 % kostenlos & unverbindlich</strong></span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700"><strong>Geprüfte Umzugsfirmen aus Aarau</strong> und Umgebung</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700"><strong>Schnelle Rückmeldungen</strong> – oft innerhalb von 24 Stunden</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700"><strong>Klare & transparente Preise</strong></span>
                      </div>
                      <div className="flex items-start gap-3 md:col-span-2">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700"><strong>Lokale Profis mit Ortskenntnis</strong></span>
                      </div>
                      </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white text-center">
                    <h3 className="heading-3">
                      Jetzt Umzugsofferten für Aarau erhalten
                    </h3>
                    <p className="text-lg text-green-50 mb-6 max-w-2xl mx-auto">
                      Füllen Sie unser einfaches Online-Formular aus und erhalten Sie passende Offerten von zuverlässigen <strong>Umzugsfirmen in Aarau</strong>. Unser Service ist kostenlos – Kosten entstehen erst, wenn Sie sich für ein Angebot entscheiden. Ob innerhalb von Aarau, in einen anderen Kanton oder ins Ausland: Wir finden den richtigen Umzugspartner für Sie.
                    </p>
                    <div className="flex justify-center">
                      <Button 
                        asChild
                        size="lg" 
                        className="bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-6 text-lg rounded-lg shadow-xl"
                      >
                        <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Aarau" className="inline-flex items-center">
                          Kostenlose Aarau-Offerten anfordern
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>

                {/* Savings Tips */}
                <article className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-10 border border-blue-200">
                  <h2 className="heading-2">Günstig umziehen im Aargau: Spartipps</h2>
                  <p className="text-gray-700 mb-6 font-medium">
                    Der Aargau ist im Vergleich zu Zürich oder Basel oft günstiger, aber Ihr Umzug muss trotzdem nicht teuer sein. Mit diesen Insider-Tipps schonen Sie Ihr Budget:
                  </p>
                  <ul className="space-y-4">
                    {savingsTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-4 bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed flex-1">
                          {tip}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 bg-white rounded-lg p-6 border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Calculator className="w-6 h-6 text-blue-600" />
                      <h4 className="font-bold text-lg text-gray-900">Kostenloser Umzugskosten-Rechner</h4>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Nutzen Sie unseren <Link href="/umzugsfirma/umzugskosten" className="text-blue-600 hover:text-blue-800 underline font-semibold">Umzugskosten-Rechner</Link> für eine detaillierte Schätzung Ihrer Umzugskosten im Aargau. In nur 2 Minuten erhalten Sie eine realistische Preis-Einschätzung.
                    </p>
                    <Button asChild variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                      <Link href="/umzugsfirma/umzugskosten">
                        Jetzt Kosten berechnen
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </article>

                {/* Services Overview */}
                <article>
                  <h2 className="heading-2">Leistungen der Umzugsfirmen</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Moderne <strong>Umzugsdienstleister</strong> und <strong>Zügelunternehmen</strong> bieten viel mehr als nur den Transport. Stellen Sie sich Ihr individuelles Servicepaket zusammen. Alle Partner verfügen über umfassende Erfahrung und sind <strong>versichert gemäss OR</strong>:
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { icon: Home, title: 'Privatumzug', link: '/umzugsfirma/privatumzug', desc: 'Wohnungswechsel individuell' },
                      { icon: Building, title: 'Geschäftsumzug', link: '/umzugsfirma/geschaeftsumzug', desc: 'Büro- und Firmenumzug' },
                      { icon: Globe, title: 'Internationale Umzüge', link: '/umzugsfirma/internationale-umzuege', desc: 'Umzug ins Ausland' },
                      { icon: Package, title: 'Spezialtransporte', link: '/umzugsfirma/spezialtransporte', desc: 'Klavier, Tresor, Maschinen' },
                      { icon: PiPianoKeysFill, title: 'Klaviertransport', link: '/umzugsfirma/spezialtransporte/klaviertransport', desc: 'Professioneller Klaviertransport' },
                      { icon: Sparkles, title: 'Reinigung', link: '/reinigung', desc: 'Umzugsreinigung & mehr' },
                      { icon: Sparkles, title: 'Umzugsreinigung', link: '/reinigung/umzugsreinigung', desc: 'Mit Abnahmegarantie' },
                      { icon: MapPin, title: 'Möbellagerung', link: '/umzugsfirma-in-der-naehe/aargau', desc: 'Sichere Zwischenlagerung' }
                    ].map((service, index) => {
                      const Icon = service.icon;
                      return (
                        <Link
                          key={index}
                          href={service.link}
                          className="group bg-white border-2 border-gray-200 hover:border-green-500 rounded-xl p-5 transition-all hover:shadow-lg"
                        >
                          <Icon className="w-8 h-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
                          <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">{service.title}</h4>
                          <p className="text-sm text-gray-600">{service.desc}</p>
                        </Link>
                      );
                    })}
                  </div>
              </article>
              
                {/* Checklist */}
                <article className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 md:p-10 border border-gray-200">
                  <h2 className="heading-2">Checkliste für die perfekte Wahl</h2>
                  <p className="text-gray-700 mb-6">
                    Lassen Sie sich nicht von der erstbesten Offerte überzeugen. Vergleichen Sie mehrere <strong>Umzugsdienstleister</strong> und <strong>Transportunternehmen für Umzüge</strong>. Eine gründliche Prüfung ist entscheidend für die beste Wahl. Achten Sie auf <strong>geprüfte Partner nach Schweizer Standards</strong> und <strong>versichert gemäss OR</strong>.
                  </p>
                  <div className="space-y-6">
                    {[
                      { title: 'Detaillierte Offerten einholen', text: 'Eine seriöse Offerte von einer Zügelfirma ist mehr als nur eine Zahl. Sie sollte alle Posten detailliert auflisten: Stundensätze, Mitarbeiterzahl, Fahrzeuggrösse, Versicherung und alle gebuchten Zusatzleistungen.' },
                      { title: 'Versicherungsschutz prüfen', text: <>Eine ausreichende Transport- und Betriebshaftpflichtversicherung ist nicht verhandelbar. Professionelle Umzugsdienstleister sind <strong>versichert gemäss OR</strong> und bis 100'000 CHF versichert.</> },
                      { title: 'Bewertungen und Referenzen analysieren', text: <>Lesen Sie authentische Kundenbewertungen auf unserem Portal. Achten Sie auf Kommentare zu Pünktlichkeit, Sorgfalt und Teamfreundlichkeit. Unsere Partner verfügen über umfassende Erfahrung in der Vermittlung von Umzügen im Aargau.</> },
                      { title: 'Regionale Kenntnisse prüfen', text: <>Ein <strong>Zügelunternehmen im Kanton Aargau</strong> sollte die Region kennen. Fragen Sie nach Erfahrungen mit Umzügen in Ihrer spezifischen Gemeinde.</> }
                    ].map((item, index) => (
                      <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                            <p className="text-gray-600 leading-relaxed">{item.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                {/* Why Aargau Section */}
                <article>
                  <h2 className="heading-2">Warum regionale Zügelprofis wählen?</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { icon: MapPin, title: 'Zentrale Lage', text: <>Der Aargau liegt ideal zwischen Zürich, Basel und Bern. <strong>Umzugspartner im Aargau</strong> kennen die besten Routen und können auch Umzüge in diese Metropolen effizient abwickeln. Alle Partner sind <strong>geprüfte Partner nach Schweizer Standards</strong>.</> },
                      { icon: Building, title: 'Vielfältige Wohnlagen', text: <>Von historischen Altstädten über moderne Neubauten bis zu idyllischen Dörfern – erfahrene <strong>Umzugsdienstleister</strong> kennen die Besonderheiten jeder Wohnlage. Durch langjährige Erfahrung in der Vermittlung von Umzügen können wir professionelle Abwicklung sicherstellen.</> },
                      { icon: TrendingUp, title: 'Wirtschaftsstärke', text: <>Der Aargau ist ein wichtiger Wirtschaftsstandort. <strong>Transportunternehmen für Umzüge</strong> haben Erfahrung mit Geschäftsumzügen und können auch komplexe Firmenumzüge professionell abwickeln. Alle sind <strong>versichert gemäss OR</strong>.</> },
                      { icon: Star, title: 'Lebensqualität', text: <>Der Aargau bietet hohe Lebensqualität zu erschwinglichen Preisen. Lokale <strong>Zügelunternehmen im Kanton Aargau</strong> können Ihnen helfen, diese Vorteile optimal zu nutzen. Unser <strong>Schweizer Kundenservice</strong> steht Ihnen zur Verfügung.</> }
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 transition-colors">
                          <Icon className="w-10 h-10 text-green-600 mb-4" />
                          <h4 className="heading-4">{item.title}</h4>
                          <p className="text-gray-600 leading-relaxed">{item.text}</p>
                        </div>
                      );
                    })}
                  </div>
              </article>

                {/* CTA Section */}
                <article className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white text-center">
                  <h2 className="heading-2">
                    Bereit für Ihren Umzug im Aargau?
                  </h2>
                  <p className="text-lg text-green-50 mb-8 max-w-2xl mx-auto">
                    Starten Sie jetzt Ihre Anfrage und erhalten Sie in Kürze bis zu 5 Offerten von geprüften <strong>Umzugsfirmen im Aargau</strong> und Zügelfirmen aus dem Aargau.
                  </p>
                  <Button 
                    asChild
                    size="lg" 
                    className="bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-6 text-lg rounded-lg shadow-xl"
                  >
                    <Link href="/kostenlose-offerte-anfordern?service=umzug&step=2&city=Aargau">
                      Kostenlose Aargau-Offerten anfordern
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </article>
              </main>
          </div>
        </section>
          

        {/* Navigation */}
        <section className="py-12 bg-white border-t border-gray-200">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <LocationPageNavigation allLocations={locations} currentCity={city} />
        </div>
        </section>
      </div>
    </>
  );
};

export default UmzugsfirmaAargauPageClient;
