'use client'

import React from 'react'

// Framer Motion removed for better performance - using CSS transitions instead
import Link from 'next/link'
import { CheckCircle, Sparkles, ThumbsUp, Home, Building, Brush, ChevronRight, Star } from 'lucide-react'
import NextImage from 'next/image'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const ReinigungPageClient = () => {
  // SEO Data (moved to server component, but kept for schema generation if needed client-side)
  const metaTitle = "Reinigungsfirma – Kostenlose Offerten vergleichen | Schweiz"
  const metaDescription = "Professionelle Reinigungsdienstleistungen für Wohnung, Haus und Büro. Erhalten Sie kostenlose Offerten von geprüften Reinigungsfirmen in Ihrer Region und sparen Sie bis zu 40%."
  const metaKeywords = "umzugsreinigung mit abnahmegarantie, endreinigung wohnung, reinigungsfirma für umzug, wohnungsreinigung mit abnahmegarantie, umzugsreinigung preise, reinigungsofferte, endreinigung kosten, umzugsreinigung zürich, reinigung nach umzug, privatumzug reinigung"
  const canonicalUrl = "/reinigung"

  // Schema Data - Single JSON-LD Service schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": metaTitle,
    "serviceType": "Reinigungsvermittlung",
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
      "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=reinigung",
      "priceCurrency": "CHF",
      "price": "0",
      "name": "Kostenlose Offerte für Reinigung"
    }
  }

  const includedServices = [
    "Gründliche Reinigung von Küche (inkl. Backofen, Dampfabzug, Kühlschrank)",
    "Komplette Bad- und WC-Reinigung (inkl. Entkalkung von Armaturen)",
    "Fensterreinigung (innen und aussen), inkl. Rahmen und Fensterbänke",
    "Reinigung von Storen, Rollläden und Lamellen",
    "Bodenreinigung (alle Beläge: Parkett, Laminat, Fliesen etc.)",
    "Reinigung von Türen, Türrahmen, Griffen und Lichtschaltern",
    "Reinigung von Einbauschränken (innen und aussen)",
    "Reinigung von Sockelleisten, Heizkörpern und Fenstersimsen",
    "Reinigung von Balkon, Terrasse und Kellerabteil (besenrein)"
  ]

  const costData = [
    "1.5-2.5 Zimmer: CHF 500-800",
    "3.5 Zimmer: CHF 800-1'100",
    "4.5 Zimmer: CHF 950-1'300",
    "5.5+ Zimmer: ab CHF 1'200"
  ]

  const pricingTableData = [
    { size: "1.5 - 2.5 Zimmer", cost: "500 - 800 CHF", description: "Kleine Wohnung, WG-Zimmer" },
    { size: "3.5 Zimmer", cost: "800 - 1'100 CHF", description: "Standard Wohnung" },
    { size: "4.5 Zimmer", cost: "950 - 1'300 CHF", description: "Grössere Wohnung" },
    { size: "5.5+ Zimmer", cost: "Ab 1'200 CHF", description: "Einfamilienhaus" }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
          {/* Subtle pattern background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-blue-600 transition-colors">Startseite</Link>
                </li>
                <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
                <li className="text-gray-900 font-medium" aria-current="page">Reinigung</li>
              </ol>
            </nav>

            <div className="grid md:grid-cols-5 gap-10 md:gap-12 items-center">
              <div className="md:col-span-3">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-semibold text-sm mb-4">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Professionelle Reinigung in der Schweiz
                </div>
                <h1 className="heading-1 !mt-0">
                  Reinigungsfirma finden & Offerten vergleichen » Bis zu 40% sparen
                </h1>
                <p className="text-body mb-8">
                  Sorgenfrei zur Wohnungsübergabe. Unsere geprüften Partner sorgen für eine blitzblanke Sauberkeit, damit Sie sich auf Ihr neues Zuhause konzentrieren können. Ideal nach einem Privatumzug.
                </p>

                <p id="reinigungsart" className="text-sm font-semibold text-gray-700 mb-2">Wählen Sie Ihre gewünschte Reinigungsart:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 mb-6">
                  {/* Umzugsreinigung */}
                  <Link
                    href="/kostenlose-offerte-anfordern?service=reinigung&step=2&reinigungArt=umzugsreinigung"
                    className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md group"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-100 group-hover:bg-blue-500 transition-colors">
                      <Home className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 text-left sm:text-center">
                      <p className="font-semibold text-sm sm:text-base text-gray-900">Umzugsreinigung</p>
                      <p className="text-xs text-gray-600 mt-0.5">Mit Abnahmegarantie</p>
                    </div>
                  </Link>

                  {/* Wohnungsreinigung */}
                  <Link
                    href="/kostenlose-offerte-anfordern?service=reinigung&step=2&reinigungArt=wohnungsreinigung"
                    className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-purple-500 hover:bg-purple-50 hover:shadow-md group"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-purple-100 group-hover:bg-purple-500 transition-colors">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 text-left sm:text-center">
                      <p className="font-semibold text-sm sm:text-base text-gray-900">Wohnungsreinigung</p>
                    </div>
                  </Link>

                  {/* Büroreinigung */}
                  <Link
                    href="/kostenlose-offerte-anfordern?service=reinigung&step=2&reinigungArt=bueroreinigung"
                    className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-md group"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-emerald-100 group-hover:bg-emerald-500 transition-colors">
                      <Building className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 text-left sm:text-center">
                      <p className="font-semibold text-sm sm:text-base text-gray-900">Büroreinigung</p>
                    </div>
                  </Link>

                  {/* Hausreinigung */}
                  <Link
                    href="/kostenlose-offerte-anfordern?service=reinigung&step=2&reinigungArt=hausreinigung"
                    className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-amber-500 hover:bg-amber-50 hover:shadow-md group"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-100 group-hover:bg-amber-500 transition-colors">
                      <Home className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 text-left sm:text-center">
                      <p className="font-semibold text-sm sm:text-base text-gray-900">Hausreinigung</p>
                    </div>
                  </Link>

                  {/* Fensterreinigung */}
                  <Link
                    href="/kostenlose-offerte-anfordern?service=reinigung&step=2&reinigungArt=fensterreinigung"
                    className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-teal-500 hover:bg-teal-50 hover:shadow-md group"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-teal-100 group-hover:bg-teal-500 transition-colors">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 text-left sm:text-center">
                      <p className="font-semibold text-sm sm:text-base text-gray-900">Fensterreinigung</p>
                    </div>
                  </Link>

                  {/* Unterhaltsreinigung */}
                  <Link
                    href="/kostenlose-offerte-anfordern?service=reinigung&step=2&reinigungArt=unterhaltsreinigung"
                    className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md group"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-indigo-100 group-hover:bg-indigo-500 transition-colors">
                      <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 text-left sm:text-center">
                      <p className="font-semibold text-sm sm:text-base text-gray-900">Unterhaltsreinigung</p>
                    </div>
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-700">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Geprüfte Reinigungsfirmen</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>100% kostenlos</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Bis zu 40% sparen</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <span>Mit Abnahmegarantie</span>
                  </div>
                </div>
              </div>

              {/* Right: Image */}
              <div className="relative md:col-span-2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <NextImage
                    src="/bilder/reinigungsfirma-600-400.webp"
                    alt="Professionelle Reinigung Schweiz"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hidden md:block">
                  <p className="text-sm font-bold">Endreinigung</p>
                  <p className="text-xs text-blue-100">Mit Abnahmegarantie</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <article className="max-w-4xl space-y-10">
              <header className="space-y-4">
                <h2 className="heading-2">Reinigungsfirma Schweiz: Offerten vergleichen und passend buchen</h2>
                <p className="text-body">
                  Wer heute eine Reinigung sucht, möchte vor allem drei Dinge: einen fairen Preis, verlässliche Qualität
                  und einen klaren Ablauf ohne Überraschungen. Genau dafür ist Online-Offerten.ch da. Sie stellen eine
                  einzige Anfrage und erhalten passende Offerten von geprüften Anbietern aus Ihrer Region. So vergleichen
                  Sie Leistungen transparent, sparen Aufwand bei der Suche und entscheiden sich gezielt für den Partner,
                  der zu Ihrem Objekt und Ihrem Zeitplan passt.
                </p>
                <p className="text-body">
                  Ob Wohnungsreinigung, Hausreinigung, Büroreinigung oder Fensterreinigung: Jede Dienstleistung stellt
                  andere Anforderungen an Team, Material und Zeitfenster. Bei einem Privathaushalt stehen meist Hygiene,
                  Sorgfalt und flexible Termine im Mittelpunkt. Bei Unternehmen sind oft klare Einsatzpläne,
                  gleichbleibende Qualität und diskrete Abläufe entscheidend. Mit einem strukturierten Offertenvergleich
                  lassen sich diese Unterschiede sauber abbilden.
                </p>
                <p className="text-body">
                  Gleichzeitig finden viele Nutzer über Suchanfragen wie <strong>Reinigungsfirma in der Nähe</strong>,
                  <strong> Reinigungsservice in der Nähe</strong> oder <strong>Reinigungsdienst in der Nähe</strong>
                  zur passenden Lösung. Auf dieser Seite erhalten Sie einen vollständigen Überblick zu Services, Preisen,
                  Qualitätskriterien und regionalen Möglichkeiten in der Schweiz.
                </p>
              </header>

              <div className="space-y-4 rounded-2xl border border-gray-200 bg-slate-50 p-6 md:p-8">
                <h3 className="heading-3">Welche Reinigungsdienstleistung passt zu Ihrem Bedarf?</h3>
                <p id="reinigungsart" className="text-body">
                  Wählen Sie direkt den passenden Service und starten Sie den Vergleich mit wenigen Angaben:
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/reinigung/wohnungsreinigung" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">Wohnungsreinigung</Link>
                  <Link href="/reinigung/hausreinigung" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">Hausreinigung</Link>
                  <Link href="/reinigung/bueroreinigung" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">Büroreinigung</Link>
                  <Link href="/reinigung/umzugsreinigung" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">Umzugsreinigung</Link>
                  <Link href="/reinigung/unterhaltsreinigung" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">Unterhaltsreinigung</Link>
                  <Link href="/reinigung/fensterreinigung" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">Fensterreinigung</Link>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="heading-3">Wohnungsreinigung: gründlich, planbar und alltagstauglich</h3>
                <p className="text-body">
                  Die Wohnungsreinigung ist ideal für alle, die ihren Alltag entlasten möchten oder vor einer Übergabe
                  zusätzlichen Aufwand vermeiden wollen. Typische Leistungen sind die gründliche Reinigung von Küche,
                  Bad, Böden, Oberflächen und bei Bedarf auch Fenster, Balkon oder Keller. Gute Anbieter arbeiten mit
                  einem klaren Leistungsumfang, damit Sie im Voraus sehen, was enthalten ist und was optional ergänzt
                  werden kann. Genau diese Transparenz macht den Unterschied, wenn Sie Offerten vergleichen.
                </p>
                <p className="text-body">
                  Besonders hilfreich ist die Wohnungsreinigung bei engen Zeitfenstern, etwa nach einer Renovation, vor
                  Besuch oder vor der Wohnungsabgabe. Ein professionelles Team arbeitet strukturiert und bringt die
                  passenden Reinigungsmittel direkt mit. So erhalten Sie ein sauberes Resultat ohne zusätzlichen
                  Koordinationsaufwand.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="heading-3">Hausreinigung: mehr Fläche, mehr Details, klarer Standard</h3>
                <p className="text-body">
                  Bei der Hausreinigung geht es häufig um grössere Flächen und zusätzliche Bereiche wie Treppenhaus,
                  Keller, Nebenräume oder Aussenzonen. Deshalb ist eine saubere Planung besonders wichtig: Welche Räume
                  sind priorisiert, welche Intervalle sind sinnvoll, und welche Aufgaben sollen regelmässig durchgeführt
                  werden? Ein seriöser Fachbetrieb dokumentiert diese Punkte klar und bietet nachvollziehbare Pakete.
                </p>
                <p className="text-body">
                  Wenn Sie mehrere Offerten nebeneinander sehen, erkennen Sie schnell Unterschiede bei Umfang,
                  Materialeinsatz und Taktung. Genau dadurch vermeiden Sie unklare Pauschalen und wählen ein Angebot,
                  das wirklich zu Ihrer Immobilie passt.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="heading-3">Büroreinigung und Büro putzen: sauber arbeiten ohne Unterbruch</h3>
                <p className="text-body">
                  Für Unternehmen sind Suchbegriffe wie <strong>Büroreinigung</strong>, <strong>Büro putzen</strong>
                  oder <strong>Büro Reinigung</strong> besonders relevant. Der Hintergrund ist klar: Arbeitsplätze sollen
                  dauerhaft hygienisch und repräsentativ bleiben, ohne den Betrieb zu stören. Deshalb setzen viele Firmen
                  auf flexible Einsatzzeiten am frühen Morgen, am Abend oder am Wochenende.
                </p>
                <p className="text-body">
                  Gute Anbieter definieren vorab, welche Zonen täglich, wöchentlich oder monatlich gereinigt werden.
                  Dazu gehören Arbeitsflächen, Sanitärbereiche, Empfang, Besprechungsräume und Gemeinschaftsflächen.
                  Für Praxen, Studios oder Kanzleien werden zusätzlich branchenspezifische Anforderungen berücksichtigt.
                  Ein durchdachtes Konzept sorgt dafür, dass Qualität, Hygiene und Diskretion langfristig stimmen.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="heading-3">Unterhaltsreinigung: konstante Qualität im festen Rhythmus</h3>
                <p className="text-body">
                  Die Unterhaltsreinigung ist die passende Lösung, wenn Sie regelmässig saubere Räume benötigen. Anders
                  als bei einer einmaligen Grundaktion werden hier feste Abläufe vereinbart, die sich an Ihrem Alltag
                  orientieren. Das schafft Planbarkeit, reduziert spontane Einsätze und sorgt für ein dauerhaft gepflegtes
                  Umfeld.
                </p>
                <p className="text-body">
                  Im privaten Bereich bedeutet das vor allem Entlastung. Im geschäftlichen Umfeld ist es ein wichtiger
                  Qualitätsfaktor für Mitarbeitende, Kundschaft und Besuch. Über den Offertenvergleich sehen Sie schnell,
                  welche Firma ein realistisches Intervall, nachvollziehbare Konditionen und verlässliche Kommunikation
                  anbietet.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="heading-3">Fensterreinigung: streifenfrei bei Wohnungen, Häusern und Büros</h3>
                <p className="text-body">
                  Fensterreinigung wird oft unterschätzt, obwohl sie den Gesamteindruck eines Objekts stark beeinflusst.
                  Professionelle Teams reinigen Glasflächen, Rahmen und bei Bedarf auch Storen oder Lamellen. Je nach
                  Objektgrösse, Zugänglichkeit und Verschmutzung werden sichere Methoden und passendes Material eingesetzt.
                </p>
                <p className="text-body">
                  Für Privatobjekte steht meist ein klares, streifenfreies Resultat im Vordergrund. Bei Büros kommen
                  zusätzlich Faktoren wie Terminfenster, Sicherheit und laufender Betrieb hinzu. Ein direkter
                  Offertenvergleich hilft, Qualität und Preis besser einzuordnen statt nur den günstigsten Anbieter zu
                  wählen.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="heading-3">Umzugsreinigung mit Abnahmegarantie: Sicherheit bei der Übergabe</h3>
                <p className="text-body">
                  Die Umzugsreinigung mit Abnahmegarantie gehört zu den wichtigsten Services bei einem Wohnungswechsel.
                  Sie reduziert das Risiko von Beanstandungen bei der Abgabe und schützt vor teuren Nachreinigungen.
                  Entscheidend ist, dass der Leistungsumfang vollständig dokumentiert ist und die Firma im Fall einer
                  Rückmeldung zeitnah nachbessert.
                </p>
                <p className="text-body">
                  Gerade in Städten mit engem Wohnungsmarkt sind Termine knapp. Deshalb lohnt es sich, früh Offerten
                  einzuholen und nicht erst kurz vor dem Umzug zu starten. Über Online-Offerten.ch können Sie Umzug und
                  Reinigung abgestimmt planen und Leistungen gezielt kombinieren.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="heading-3">Was ist bei einer Umzugsreinigung typischerweise enthalten?</h3>
                <p className="text-body">
                  Eine strukturierte Endreinigung umfasst in der Regel folgende Leistungen:
                </p>
                <ul className="space-y-3">
                  {includedServices.map((service, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-sm md:text-base">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="heading-3">Reinigung Preise pro Stunde und typische Pauschalen</h3>
                <p className="text-body">
                  Viele Nutzer suchen nach Begriffen wie <strong>Reinigung Preise pro Stunde</strong>,
                  <strong> Preise für Reinigungsdienste</strong> oder <strong>Wohnungsreinigung Kosten Schweiz</strong>.
                  In der Praxis arbeiten Firmen je nach Auftrag mit Stundenansätzen, Pauschalen oder Mischmodellen.
                  Entscheidend sind Objektgrösse, Verschmutzung, Erreichbarkeit und gewünschter Leistungsumfang.
                </p>
                <p className="text-body">
                  Die folgende Tabelle zeigt übliche Richtwerte für Umzugsreinigung in der Schweiz. Für eine exakte
                  Offerte sollten Sie immer objektspezifische Angaben übermitteln.
                </p>
                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-800">Reinigungsart</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-800">Durchschnittliche Kosten</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-800">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {pricingTableData.map((row, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-gray-700">{row.size}</td>
                          <td className="px-4 py-3 text-gray-700">{row.cost}</td>
                          <td className="px-4 py-3 text-gray-700">{row.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-gray-200 bg-slate-50 p-6 md:p-8">
                <h3 className="heading-3">Reinigungsfirma nach Standort finden</h3>
                <p className="text-body">
                  Regionale Verfügbarkeit ist ein zentraler Faktor für Preis und Termin. Besonders häufig werden
                  Reinigungsfirmen in Zürich, Bern, Basel, Luzern und St. Gallen gesucht. Über unsere Standortseiten
                  gelangen Sie direkt zu passenden regionalen Angeboten:
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/reinigungsfirma/zuerich" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">Reinigungsfirma Zürich</Link>
                  <Link href="/reinigungsfirma/bern" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">Reinigungsfirma Bern</Link>
                  <Link href="/reinigungsfirma/basel" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">Reinigungsfirma Basel</Link>
                  <Link href="/reinigungsfirma/luzern" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">Reinigungsfirma Luzern</Link>
                  <Link href="/reinigungsfirma/st-gallen" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">Reinigungsfirma St. Gallen</Link>
                  <Link href="/reinigungsfirma/winterthur" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">Reinigungsfirma Winterthur</Link>
                  <Link href="/reinigungsfirma/genf" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">Reinigungsfirma Genf</Link>
                  <Link href="/reinigungsfirma/lausanne" className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition-colors">Reinigungsfirma Lausanne</Link>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="heading-3">So funktioniert der Offertenvergleich auf Online-Offerten.ch</h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Sie wählen die gewünschte Reinigungsart und erfassen die wichtigsten Angaben zum Objekt.</li>
                  <li>Geprüfte Anbieter aus Ihrer Region senden Ihnen passende Offerten.</li>
                  <li>Sie vergleichen Preise, Leistungsumfang, Verfügbarkeit und Bewertungen in Ruhe.</li>
                  <li>Sie wählen das Angebot, das fachlich und preislich am besten zu Ihrem Bedarf passt.</li>
                </ol>
                <p className="text-body">
                  Dieser Ablauf spart Zeit, reduziert Rückfragen und erhöht die Chance, direkt eine passende Firma zu
                  finden. Statt dutzende Kontakte einzeln anzuschreiben, erhalten Sie strukturierte Vergleichbarkeit mit
                  nur einer Anfrage.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="heading-3">Qualität, Sicherheit und Vertrauen</h3>
                <p className="text-body">
                  Eine gute Offerte ist mehr als ein Preisblatt. Achten Sie auf klare Leistungsbeschriebe,
                  transparente Konditionen und einen nachvollziehbaren Ablauf bei Rückfragen oder Nachbesserung.
                  Besonders bei Umzugsreinigung ist die Abnahmegarantie ein zentrales Qualitätsmerkmal.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /><span>Transparente Leistungen statt unklarer Pauschaltexte</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /><span>Regionale Anbieter mit planbaren Terminen</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /><span>Vergleich von Preis, Qualität und Verfügbarkeit auf einen Blick</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /><span>Effizienter Ablauf für Privatpersonen und Unternehmen</span></li>
                </ul>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm">
                <div className="mb-8">
                  <p className="text-sm font-semibold text-green-700 mb-2">FAQ</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Häufige Fragen zu Reinigung, Preisen und Ablauf
                  </h2>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left font-semibold text-gray-900">
                      Was kostet eine Reinigungsfirma in der Schweiz?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      Die Kosten hängen von Objektgrösse, Reinigungsart, Verschmutzung und Region ab. Bei
                      Unterhaltsreinigung sind oft Stundenansätze üblich, bei Umzugsreinigung eher Pauschalen. Statt sich
                      auf einzelne Richtwerte zu verlassen, empfiehlt sich ein direkter Vergleich mehrerer Offerten mit
                      identischem Leistungsumfang.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left font-semibold text-gray-900">
                      Worin unterscheidet sich Wohnungsreinigung von Umzugsreinigung?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      Wohnungsreinigung fokussiert den laufenden oder einmaligen Unterhalt eines bewohnten Objekts.
                      Umzugsreinigung ist auf die Übergabe ausgerichtet und beinhaltet in der Regel deutlich detailliertere
                      Arbeiten. Häufig kommt zusätzlich eine Abnahmegarantie hinzu, damit Beanstandungen ohne Mehrkosten
                      behoben werden.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left font-semibold text-gray-900">
                      Was bedeutet Abnahmegarantie genau?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      Bei einer Abnahmegarantie begleitet oder unterstützt die Reinigungsfirma die Übergabe. Falls bei
                      der Kontrolle ein relevanter Punkt beanstandet wird, erfolgt eine Nachreinigung im vereinbarten
                      Rahmen. So reduzieren Sie das Risiko von zusätzlichen Kosten.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left font-semibold text-gray-900">
                      Wie schnell erhalte ich Offerten?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      Das hängt von Region, Auslastung und gewünschter Reinigungsart ab. In der Regel treffen erste
                      Angebote kurzfristig ein. Je klarer Ihre Angaben zu Objekt, Umfang und Terminfenster sind, desto
                      präziser fallen die Offerten aus.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-left font-semibold text-gray-900">
                      Welche Angaben sollte ich für eine genaue Offerte machen?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      Wichtig sind Objektart, Zimmeranzahl oder Fläche, gewünschte Leistungen, Zustand des Objekts,
                      Terminwunsch und Standort. Bei Fenster- oder Umzugsreinigung helfen zusätzliche Hinweise zu
                      Zugänglichkeit und besonderen Anforderungen.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-left font-semibold text-gray-900">
                      Gibt es auch Lösungen für Unternehmen mit festen Intervallen?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      Ja. Für Büros, Praxen und Gewerbeobjekte sind feste Einsatzpläne besonders sinnvoll.
                      Reinigungsintervalle und Leistungsbereiche werden vorab definiert, damit Qualität und Abläufe
                      langfristig stabil bleiben.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="rounded-2xl border border-green-200 bg-green-50 p-6 md:p-8 space-y-4">
                <h3 className="heading-3 !mt-0">Jetzt passende Reinigungsofferten einholen</h3>
                <p className="text-body">
                  Vergleichen Sie kostenlos mehrere Angebote für Wohnungsreinigung, Hausreinigung, Büroreinigung,
                  Unterhaltsreinigung, Fensterreinigung oder Umzugsreinigung mit Abnahmegarantie. So finden Sie schnell
                  eine zuverlässige Lösung mit gutem Preis-Leistungs-Verhältnis.
                </p>
                <p className="text-body">
                  Besonders bei kurzfristigen Terminen oder mehreren offenen Aufgaben lohnt sich ein zentraler Vergleich:
                  Sie reduzieren Abstimmungsaufwand, behalten den Überblick über Konditionen und wählen genau den
                  Anbieter, der fachlich, zeitlich und preislich am besten zu Ihrem Objekt passt.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/kostenlose-offerte-anfordern?service=reinigung"
                    className="inline-flex items-center rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
                  >
                    Kostenlose Offerten anfordern
                  </Link>
                  <Link
                    href="/reinigung/reinigungskosten"
                    className="inline-flex items-center rounded-lg border border-green-300 bg-white px-5 py-3 text-sm font-semibold text-green-700 hover:bg-green-100 transition-colors"
                  >
                    Reinigungskosten ansehen
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>

      </div>
    </>
  )
}

export default ReinigungPageClient
