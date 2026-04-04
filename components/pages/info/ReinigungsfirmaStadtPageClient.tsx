'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  ArrowRight, CheckCircle, ShieldCheck, Clock, Star,
  MapPin, Home, Building, Sparkles, Droplets, Sparkle, Wrench,
  FileText, Mail, Zap, ChevronRight as ChevronRightIcon,
} from 'lucide-react'
import { REINIGUNGSFIRMA_STAEDTE } from '@/components/pages/info/reinigungsfirmaStaedte'

/** Einzigartige Texte pro Stadt (kein Copy-Paste der Hub-Seite) */
export interface ReinigungsfirmaStadtRichContent {
  problemTitle: string
  problemP1: string
  problemP2: string
  /** Ersetzt den generischen Keyword-Block durch echte Artikel-Abschnitte */
  articles: { title: string; body: string }[]
}

export interface StadtInfo {
  name: string
  slug: string
  canonicalUrl: string
  description: string
  richContent?: ReinigungsfirmaStadtRichContent
}

interface ReinigungsfirmaStadtPageClientProps {
  stadtInfo: StadtInfo
}

const ReinigungsfirmaStadtPageClient = ({ stadtInfo }: ReinigungsfirmaStadtPageClientProps) => {
  const router = useRouter()
  const { name, slug, canonicalUrl, description, richContent } = stadtInfo
  const cityQ = `&city=${encodeURIComponent(name)}`

  useEffect(() => {
    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://online-offerten.ch/' },
            { '@type': 'ListItem', position: 2, name: 'Reinigungsfirma', item: 'https://online-offerten.ch/reinigungsfirma' },
            { '@type': 'ListItem', position: 3, name: `Reinigungsfirma ${name}`, item: canonicalUrl },
          ],
        },
        {
          '@type': 'Service',
          name: `Reinigungsfirma ${name} finden`,
          serviceType: 'Reinigungsservice',
          description,
          provider: {
            '@type': 'Organization',
            name: 'Online-Offerten.ch',
            url: 'https://online-offerten.ch',
            logo: 'https://online-offerten.ch/image/logo-icon.webp',
          },
          areaServed: { '@type': 'City', name },
          offers: {
            '@type': 'Offer',
            url: `https://online-offerten.ch/kostenlose-offerte-anfordern?service=reinigung&step=2&city=${encodeURIComponent(name)}`,
            priceCurrency: 'CHF',
            price: '0',
            name: `Kostenlose Reinigungsfirma Offerten in ${name}`,
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: `Wie finde ich eine Reinigungsfirma in ${name}?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `Über Online-Offerten.ch beschreiben Sie Ihr Reinigungsprojekt einmalig. Wir vermitteln Ihnen bis zu fünf geprüfte Anbieter aus ${name} und Umgebung.`,
              },
            },
            {
              '@type': 'Question',
              name: `Wie viel kostet eine Reinigung in ${name}?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `Die Preise hängen von Fläche, Aufwand und Termin ab. Mehrere Offerten zu vergleichen, ist in ${name} besonders sinnvoll, weil die Spanne zwischen Anbietern oft gross ist.`,
              },
            },
          ],
        },
      ],
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schemaData)
    script.id = `reinigungsfirma-${slug}-schema`
    const existing = document.getElementById(`reinigungsfirma-${slug}-schema`)
    if (existing?.parentNode) try { existing.remove() } catch { /* */ }
    document.head.appendChild(script)
    return () => {
      const el = document.getElementById(`reinigungsfirma-${slug}-schema`)
      if (el?.parentNode) try { el.remove() } catch { /* */ }
    }
  }, [name, slug, canonicalUrl, description])

  const handleCtaClick = () => {
    router.push(`/kostenlose-offerte-anfordern?service=reinigung&step=2${cityQ}`)
  }

  const faqItems = [
    {
      q: `Welche Reinigungsarten kann ich in ${name} vergleichen?`,
      a: `Endreinigung, Wohnungs- und Büroreinigung, Grundreinigung, Fenster- und Baureinigung – Sie wählen im Formular die passende Art. Anbieter aus ${name} melden sich mit massgeschneiderten Offerten.`,
    },
    {
      q: `Wie schnell erhalte ich Offerten für ${name}?`,
      a: `Häufig innerhalb von 24 bis 48 Stunden erste Rückmeldungen. Bei kurzfristigen Übergabeterminen sollten Sie im Formular den Wunschtermin klar nennen.`,
    },
    {
      q: `Ist die Anfrage für ${name} wirklich kostenlos?`,
      a: `Ja. Für Sie ist die Anfrage und der Vergleich unverbindlich und gratis. Sie beauftragen erst, wenn Ihnen ein Angebot zusagt.`,
    },
    {
      q: `Warum mehrere Reinigungsfirmen in ${name} vergleichen?`,
      a: `Preis und Leistung variieren stark. Mit mehreren Offerten sehen Sie marktübliche Spannen und können Qualität und Umfang fair gegenüberstellen – ohne selbst Dutzende Anbieter einzeln anzufragen.`,
    },
  ]

  const andereStaedte = REINIGUNGSFIRMA_STAEDTE.filter((s) => s.slug !== slug)

  const problemBlock = richContent
    ? {
        title: richContent.problemTitle,
        p1: richContent.problemP1,
        p2: richContent.problemP2,
      }
    : {
        title: `Zuverlässige Reinigungsfirma in ${name} finden`,
        p1: `Die Suche nach einer passenden Reinigungsfirma in ${name} kostet Zeit: viele Anbieter, unterschiedliche Preise. Bewertungen allein ersetzen oft keinen strukturierten Offertenvergleich.`,
        p2: 'Online-Offerten.ch fasst Ihre Anfrage zusammen und vermittelt bis zu fünf geprüfte Betriebe – kostenlos und unverbindlich für Sie.',
      }

  return (
    <>
      <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Startseite
                </Link>
              </li>
              <li>
                <ChevronRightIcon className="w-4 h-4 text-gray-400" />
              </li>
              <li>
                <Link href="/reinigungsfirma" className="hover:text-blue-600 transition-colors">
                  Reinigungsfirma
                </Link>
              </li>
              <li>
                <ChevronRightIcon className="w-4 h-4 text-gray-400" />
              </li>
              <li className="text-gray-900 font-medium" aria-current="page">
                {name}
              </li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-semibold text-sm mb-3">
                <MapPin className="h-4 w-4 mr-2" />
                Reinigungsfirma {name}
              </div>
              <h1 className="heading-1 !mt-0">
                Reinigungsfirma in {name} finden – Kostenlose Offerten vergleichen
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">{description}</p>

              <p className="text-sm font-semibold text-gray-700 mb-2">Wählen Sie Ihre gewünschte Dienstleistung aus:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 mb-6">
                <Link
                  href={`/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=umzugsreinigung${cityQ}`}
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
                <Link
                  href={`/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=wohnungsreinigung${cityQ}`}
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-purple-500 hover:bg-purple-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-purple-100 group-hover:bg-purple-500 transition-colors">
                    <Home className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Wohnungsreinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Privathaushalte</p>
                  </div>
                </Link>
                <Link
                  href={`/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=buero${cityQ}`}
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-emerald-100 group-hover:bg-emerald-500 transition-colors">
                    <Building className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Büroreinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Gewerberäume</p>
                  </div>
                </Link>
                <Link
                  href={`/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=grundreinigung${cityQ}`}
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-amber-500 hover:bg-amber-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-100 group-hover:bg-amber-500 transition-colors">
                    <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Grundreinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Tiefenreinigung</p>
                  </div>
                </Link>
                <Link
                  href={`/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=fensterreinigung${cityQ}`}
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-teal-500 hover:bg-teal-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-teal-100 group-hover:bg-teal-500 transition-colors">
                    <Sparkle className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Fensterreinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Innen & Aussen</p>
                  </div>
                </Link>
                <Link
                  href={`/kostenlose-offerte-anfordern?service=reinigung&step=3&reinigungArt=baureinigung${cityQ}`}
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-indigo-100 group-hover:bg-indigo-500 transition-colors">
                    <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Baureinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Nach Umbau/Neubau</p>
                  </div>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-gray-700">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>100% kostenlos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>Geprüfte Firmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>Bis zu 5 Offerten</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>Regional in {name}</span>
                </div>
              </div>
            </div>

            <div className="relative md:col-span-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/reinigungsfirma/bbbd13c1-cc55-4a7c-88fb-781a368f7553.webp"
                  alt={`Professionelle Reinigung – Reinigungsfirma ${name}`}
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg hidden md:block">
                <p className="text-sm font-bold">Kostenlos vergleichen</p>
                <p className="text-xs text-blue-100">{name} & Umgebung</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="heading-2">{problemBlock.title}</h2>
              <p className="text-body mb-6">{problemBlock.p1}</p>
              <p className="text-body">{problemBlock.p2}</p>
            </div>
            <div>
              <Image
                src="/reinigungsfirma/professionelle_wohnungsreinigung_team.webp"
                alt={`Reinigungsteam – ${name}`}
                width={600}
                height={450}
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10">
            <h2 className="heading-2">Warum Online-Offerten.ch in {name}?</h2>
            <p className="text-body mb-8">Dieselben Vorteile wie auf der Schweiz-Übersichtsseite – zugeschnitten auf Ihre Anfrage in {name}.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <Card className="h-full border-2 hover:border-blue-500 transition-colors">
              <CardHeader>
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="heading-4 !mt-0">Bis zu 5 Angebote</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-body">Passende Reinigungsfirmen für {name} – Sie vergleichen Preis und Leistung ohne Mehrfach-Anfragen.</p>
              </CardContent>
            </Card>
            <Card className="h-full border-2 hover:border-blue-500 transition-colors">
              <CardHeader>
                <div className="flex items-center mb-3">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <ShieldCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="heading-4 !mt-0">100% kostenlos</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-body">Unverbindliche Offerten – Sie zahlen nichts für die Vermittlung.</p>
              </CardContent>
            </Card>
            <Card className="h-full border-2 hover:border-blue-500 transition-colors">
              <CardHeader>
                <div className="flex items-center mb-3">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="heading-4 !mt-0">Verifizierte Betriebe</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-body">Wir arbeiten mit geprüften Partnern zusammen.</p>
              </CardContent>
            </Card>
            <Card className="h-full border-2 hover:border-blue-500 transition-colors">
              <CardHeader>
                <div className="flex items-center mb-3">
                  <div className="bg-amber-100 p-3 rounded-lg mr-4">
                    <Star className="h-6 w-6 text-amber-600" />
                  </div>
                  <CardTitle className="heading-4 !mt-0">Transparenz</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-body">Leistungen und Konditionen gegenüberstellen – ohne Druck.</p>
              </CardContent>
            </Card>
            <Card className="h-full border-2 hover:border-blue-500 transition-colors">
              <CardHeader>
                <div className="flex items-center mb-3">
                  <div className="bg-teal-100 p-3 rounded-lg mr-4">
                    <Clock className="h-6 w-6 text-teal-600" />
                  </div>
                  <CardTitle className="heading-4 !mt-0">Weniger Aufwand</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-body">Ein Formular statt viele Einzelkontakte.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10">
            <h2 className="heading-2">So funktioniert die Offerten-Anfrage</h2>
            <p className="text-body">In drei Schritten – auch in {name}.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Reinigungsprojekt beschreiben',
                description: `Art der Reinigung, Fläche und Wunschtermin für ${name} angeben – je genauer, desto bessere Offerten.`,
                icon: FileText,
              },
              {
                number: '02',
                title: 'Anfrage wird weitergeleitet',
                description: `Wir leiten Ihre Angaben an passende Reinigungsunternehmen in ${name} und der Region weiter.`,
                icon: Mail,
              },
              {
                number: '03',
                title: 'Vergleichen & auswählen',
                description: 'Sie erhalten Rückmeldungen und können in Ruhe vergleichen.',
                icon: Star,
              },
            ].map((step, index) => (
              <div key={step.number} className="relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-blue-200 z-0" style={{ width: 'calc(100% - 3rem)' }} />
                )}
                <Card className="relative z-10 h-full border-2 border-blue-200 hover:border-blue-500 transition-colors">
                  <CardHeader className="text-center">
                    <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      {step.number}
                    </div>
                    <div className="flex justify-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <step.icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body text-center">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Andere Städte – Mitte der Seite (wie Hub, nach Ablauf-Erklärung) */}
      <section className="py-10 md:py-12 bg-gradient-to-b from-white to-gray-50 border-y border-gray-100">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="heading-2 !mt-0 mb-3">Reinigungsfirma in anderen Städten</h2>
          <p className="text-body mb-6 max-w-3xl">
            Weitere Regionen in der Schweiz – gleicher Service, lokale Ausrichtung.
          </p>
          <div className="flex flex-wrap gap-2">
            {andereStaedte.map(({ label, slug: s }) => (
              <Link
                key={s}
                href={`/reinigungsfirma/${s}`}
                className="inline-flex items-center px-4 py-2 rounded-full border-2 border-gray-200 bg-white text-gray-800 font-medium text-sm hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                {label}
              </Link>
            ))}
            <Button asChild size="lg" className="rounded-full shadow-md">
              <Link
                href={`/kostenlose-offerte-anfordern?service=reinigung&step=2${cityQ}`}
                className="gap-2"
              >
                Kostenlose Offerten anfordern
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stadt-spezifische Artikel (nur richContent – kein generischer Keyword-Spam) */}
      {richContent && richContent.articles.length > 0 && (
        <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="heading-2 mb-8">Mehr zum Thema Reinigung in {name}</h2>
            <div className="space-y-10 max-w-4xl">
              {richContent.articles.map((art) => (
                <div key={art.title}>
                  <h3 className="heading-3 !mt-0 mb-3">{art.title}</h3>
                  <p className="text-body whitespace-pre-line">{art.body}</p>
                </div>
              ))}
            </div>
            <p className="text-body mt-10">
              Ausführliche Informationen zu einzelnen Reinigungsarten finden Sie in unserem{' '}
              <Link href="/reinigung" className="text-blue-600 font-semibold hover:underline">
                Reinigungs-Ratgeber
              </Link>
              .
            </p>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
            <div className="md:col-span-3">
              <h2 className="heading-2 mb-8">Häufig gestellte Fragen (FAQ)</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b">
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                      <h4 className="faq-question">{item.q}</h4>
                    </AccordionTrigger>
                    <AccordionContent className="text-body leading-relaxed">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className="relative md:col-span-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/reinigungsfirma/f1fd77b6.webp"
                  alt={`FAQ Reinigungsfirma ${name}`}
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="heading-2 mb-6">Jetzt kostenlose Offerten für {name} anfordern</h2>
            <p className="text-body mb-8">
              Vergleichen Sie Angebote von Reinigungsfirmen – unverbindlich und für Sie gratis.
            </p>
            <Button onClick={handleCtaClick} size="lg" className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-6 shadow-xl">
              <Zap className="mr-2 h-5 w-5" />
              Jetzt kostenlose Offerten anfordern
            </Button>
            <p className="mt-6 text-gray-500 text-sm italic">Kein Risiko. Keine Kosten. Nur passende Angebote.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default ReinigungsfirmaStadtPageClient
