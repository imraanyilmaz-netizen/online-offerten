'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  ArrowRight, CheckCircle, ShieldCheck, TrendingUp, Users, Award,
  Star, MapPin, FileText, Mail, ChevronRight, Paintbrush, Recycle,
  Truck, Sparkles, HeartHandshake, Target, Zap, Search,
} from 'lucide-react'

const canonicalUrl = 'https://online-offerten.ch/top-offerten-schweiz'

const faqItems = [
  {
    q: 'Kann ich Top Offerten für Zürich, Bern oder andere Städte anfragen?',
    a: 'Ja. Beschreiben Sie im Formular Ihren Standort und Ihr Projekt – wir vermitteln passende Anbieter aus Ihrer Region. Zusätzlich finden Sie auf Online-Offerten.ch Stadtseiten (z. B. Umzug oder Reinigung in Zürich, Bern, Basel), die Sie mit der zentralen Offertenanfrage kombinieren können.',
  },
  {
    q: 'Wie hole ich online mehrere Offerten ein und vergleiche sie?',
    a: 'Sie füllen einmal unser Formular aus. Anschliessend erhalten Sie – je nach Auftrag – bis zu mehrere Offerten von geprüften Firmen. Diese legen Sie in Ruhe nebeneinander: Leistung, Preis und Termine. So vergleichen Sie ohne mehrfaches Anfragen bei einzelnen Anbietern.',
  },
  {
    q: 'Was bedeutet Top Offerten bei Online-Offerten.ch?',
    a: 'Damit sind konkrete, auf Ihr Projekt zugeschnittene Angebote gemeint: transparente Preise, klare Leistungsbeschreibungen und Anbieter, die wir vorab auf Seriosität und Versicherungsschutz prüfen. So vergleichen Sie nicht nur Zahlen, sondern auch Qualität.',
  },
  {
    q: 'Wie erhalte ich Top Offerten?',
    a: 'Sie beschreiben Ihr Anliegen in unserem Formular. Passende Firmen aus Ihrer Region melden sich mit Offerten – in der Regel bis zu fünf. Für Sie entstehen keine Kosten und keine Verpflichtung, einen Auftrag zu vergeben.',
  },
  {
    q: 'Ist die Anfrage wirklich kostenlos?',
    a: 'Ja. Die Vermittlung und der Empfang der Offerten sind für Sie unverbindlich und ohne Gebühren durch uns. Sie zahlen nur, wenn Sie einen Anbieter beauftragen – und zwar direkt an diese Firma.',
  },
  {
    q: 'Wie schnell kommen die ersten Offerten?',
    a: 'Häufig innerhalb von 24 bis 48 Stunden, je nach Auftragsart und Auslastung der Partner. Bei dringenden Terminen lohnt sich eine genaue Angabe im Formular.',
  },
  {
    q: 'Für welche Bereiche kann ich Top Offerten anfragen?',
    a: 'Schwerpunkt auf Online-Offerten.ch: Umzug, Reinigung, Malerarbeiten und Räumung. Über das Formular beschreiben Sie Ihr Projekt; wir verbinden Sie mit passenden Fachbetrieben in der Schweiz.',
  },
  {
    q: 'Warum mehrere Offerten vergleichen?',
    a: 'Preise für vergleichbare Leistungen können stark variieren. Ein Vergleich schützt vor Überzahlung und hilft, Leistung und Preis fair gegeneinander abzuwägen – ohne selbst unzählige Anbieter einzeln anzufragen.',
  },
]

const TopOffertenPageClient = () => {
  const router = useRouter()

  useEffect(() => {
    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://online-offerten.ch/' },
            { '@type': 'ListItem', position: 2, name: 'Top Offerten Schweiz', item: canonicalUrl },
          ],
        },
        {
          '@type': 'WebPage',
          name: 'Top Offerten in der Schweiz – Umzugs- und Reinigungsofferten kostenlos vergleichen | Online-Offerten.ch',
          url: canonicalUrl,
          description:
            'Top Offerten in der Schweiz: online einholen, vergleichen, sparen. Umzug, Reinigung, Maler – mehrere Offerten von geprüften Anbietern. Kostenlos auf Online-Offerten.ch.',
          isPartOf: { '@type': 'WebSite', name: 'Online-Offerten.ch', url: 'https://online-offerten.ch' },
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        },
      ],
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schemaData)
    script.id = 'top-offerten-schema'

    const existing = document.getElementById('top-offerten-schema')
    if (existing?.parentNode) {
      try {
        existing.remove()
      } catch {
        /* ignore */
      }
    }
    document.head.appendChild(script)

    return () => {
      const el = document.getElementById('top-offerten-schema')
      if (el?.parentNode) {
        try {
          el.remove()
        } catch {
          /* ignore */
        }
      }
    }
  }, [])

  /** Städte mit SEO-relevanten Links (Umzug + optional Reinigung) */
  const cityTopOfferten: {
    name: string
    umzug: string
    reinigung: string | null
  }[] = [
    { name: 'Zürich', umzug: '/umzugsfirma/zuerich', reinigung: '/reinigungsfirma/zuerich' },
    { name: 'Bern', umzug: '/umzugsfirma/bern', reinigung: '/reinigungsfirma/bern' },
    { name: 'Basel', umzug: '/umzugsfirma/basel', reinigung: '/reinigungsfirma/basel' },
    { name: 'Luzern', umzug: '/umzugsfirma/luzern', reinigung: '/reinigungsfirma/luzern' },
    { name: 'Genf', umzug: '/umzugsfirma/genf', reinigung: '/reinigungsfirma/genf' },
    { name: 'St. Gallen', umzug: '/umzugsfirma/st-gallen', reinigung: '/reinigungsfirma/st-gallen' },
    { name: 'Lausanne', umzug: '/umzugsfirma/lausanne', reinigung: '/reinigungsfirma/lausanne' },
    { name: 'Winterthur', umzug: '/umzugsfirma/zuerich/winterthur', reinigung: '/reinigungsfirma/winterthur' },
    { name: 'Lugano', umzug: '/umzugsfirma/lugano', reinigung: null },
    { name: 'Biel/Bienne', umzug: '/umzugsfirma/biel-bienne', reinigung: null },
    { name: 'Thun', umzug: '/umzugsfirma/thun', reinigung: null },
    { name: 'Aargau', umzug: '/umzugsfirma/aargau', reinigung: null },
  ]

  return (
    <>
      <section className="relative py-12 md:py-16 overflow-hidden bg-gray-100">
        <div className="absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-gray-100" />
        </div>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold text-sm mb-3">
                <Star className="h-4 w-4 mr-2" />
                Top Offerten – geprüfte Anbieter in der Schweiz
              </div>
              <h1 className="heading-1 !mt-0">
                Top Offerten in der Schweiz – Umzugs- und Reinigungsofferten kostenlos vergleichen
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                Auf <strong>Online-Offerten.ch</strong> erhalten Sie mit einer einzigen Anfrage mehrere Angebote von geprüften Dienstleistern in Ihrer Nähe. So vergleichen Sie Preise und Leistungen sachlich – ohne Verpflichtung und ohne
                versteckte Kosten bei der Anfrage.
              </p>
              <p className="text-base text-gray-600 mb-8 leading-relaxed">
                Ob <Link href="/umzugsfirma" className="text-green-700 hover:text-green-800 underline font-medium">Umzug</Link>,{' '}
                <Link href="/reinigung" className="text-green-700 hover:text-green-800 underline font-medium">Reinigung</Link> oder{' '}
                <Link href="/malerarbeitenkosten" className="text-green-700 hover:text-green-800 underline font-medium">Malerarbeiten</Link>: Sie holen mehrere Offerten online ein und vergleichen sie in Ruhe – ohne Druck, einen Anbieter zu wählen. So finden Sie den passenden Partner für Ihr Budget.
              </p>

              <p className="text-sm font-semibold text-gray-700 mb-2">Dienstleistung wählen und Top Offerten auf Online-Offerten.ch anfordern:</p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6">
                <Link
                  href="/kostenlose-offerte-anfordern?service=umzug&step=2"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-100 group-hover:bg-blue-500 transition-colors">
                    <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Umzug</p>
                    <p className="text-xs text-gray-600 mt-0.5">Privat, Firma, Ausland</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=reinigung&step=2"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-yellow-100 group-hover:bg-yellow-500 transition-colors">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Reinigung</p>
                    <p className="text-xs text-gray-600 mt-0.5">End-, Büro-, Fenster</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=maler&step=2"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-purple-500 hover:bg-purple-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-purple-100 group-hover:bg-purple-500 transition-colors">
                    <Paintbrush className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Malerarbeiten</p>
                    <p className="text-xs text-gray-600 mt-0.5">Innen & Fassade</p>
                  </div>
                </Link>

                <Link
                  href="/kostenlose-offerte-anfordern?service=raeumung&step=2"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-white border-gray-200 hover:border-pink-500 hover:bg-pink-50 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-pink-100 group-hover:bg-pink-500 transition-colors">
                    <Recycle className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-gray-900">Räumung</p>
                    <p className="text-xs text-gray-600 mt-0.5">Entrümpelung</p>
                  </div>
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-700">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>100% kostenlose Anfrage</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>Mehrere Offerten vergleichen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>Geprüfte Partnerfirmen</span>
                </div>
              </div>
            </div>

            <div className="relative md:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-green-200">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-green-100 p-4 rounded-full">
                    <Zap className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <h2 className="heading-3 text-center">Jetzt Top Offerten sichern</h2>
                <p className="text-center text-sm font-semibold text-green-700 mb-1">Online-Offerten.ch</p>
                <p className="text-center text-gray-600 text-sm mb-6">
                  Zeit und Geld sparen: eine Anfrage genügt, um mehrere Angebote zu erhalten und in Ruhe zu vergleichen.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Search, title: 'Schnell & übersichtlich', description: 'Formular ausfüllen – passende Firmen werden informiert.' },
                    { icon: ShieldCheck, title: 'Seriöse Anbieter', description: 'Wir achten auf nachvollziehbare Firmendaten und Versicherung.' },
                    { icon: TrendingUp, title: 'Transparent vergleichen', description: 'Preis, Leistung und Konditionen nebeneinander legen.' },
                    { icon: HeartHandshake, title: 'Ohne Zwang', description: 'Sie entscheiden, ob und wen Sie beauftragen.' },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <feature.icon className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">{feature.title}</p>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button
                    onClick={() => router.push('/kostenlose-offerte-anfordern')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
                  >
                    Zur kostenlosen Anfrage
                    <ArrowRight className="w-4 h-4 ml-2 inline" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12">
            <h2 className="heading-2">
              In drei Schritten zu Ihren Top Offerten
            </h2>
            <p className="text-gray-600 max-w-3xl mt-2">
              Der Ablauf auf <strong>Online-Offerten.ch</strong> ist bewusst einfach gehalten – damit Sie nicht mehr Zeit mit Organisation verlieren als nötig.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Projekt beschreiben',
                description:
                  'Erfassen Sie die wichtigsten Eckdaten in unserem Online-Formular. Je präziser die Angaben, desto besser passen die Offerten zu Ihrem Auftrag.',
                icon: FileText,
              },
              {
                number: '02',
                title: 'Angebote erhalten',
                description:
                  'Qualifizierte Betriebe aus Ihrer Region reagieren mit Offerten. Sie hören – je nach Anfrage – oft mehrere Anbieter, ohne jeden einzeln anrufen zu müssen.',
                icon: Mail,
              },
              {
                number: '03',
                title: 'Vergleichen & entscheiden',
                description:
                  'Legen Sie Leistung, Preis und Termine nebeneinander und wählen Sie den Anbieter, der zu Ihnen passt. Unverbindlich bis zur Vertragsunterschrift.',
                icon: Star,
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                {index < 2 && (
                  <div
                    className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-green-200 z-0"
                    style={{ width: 'calc(100% - 3rem)' }}
                  />
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

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold text-sm mb-3">
                <Target className="h-4 w-4 mr-2" />
                Vorteile auf einen Blick
              </div>
              <h2 className="heading-2 !mt-0">
                Ihre Vorteile mit Top Offerten bei uns auf Online-Offerten.ch
              </h2>
              <p className="text-body mb-6">
                Hinter <strong>Online-Offerten.ch</strong> steht ein Netzwerk geprüfter Fachfirmen aus der Schweiz. Statt selbst Anbieter zu recherchieren und einzeln anzufragen, bündeln Sie den Aufwand: Sie erhalten strukturierte Offerten, die Sie
                direkt vergleichen können.
              </p>
              <p className="text-body mb-6">
                Die Angebote sind auf Ihre Angaben bezogen – keine generischen Pauschalpreise, sondern Angebote, mit denen Sie realistisch planen können. Für Privatpersonen und Unternehmen gleichermassen geeignet.
              </p>
              <ul className="space-y-3 text-body">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Transparenz</strong> – Leistungen und Preise gegenüberstellbar
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Zeitersparnis</strong> – weniger Koordinationsaufwand für Sie
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Flexibilität</strong> – kein Zwang, eine Offerte anzunehmen
                  </span>
                </li>
              </ul>
            </div>
            <div className="hidden lg:block">
              <NextImage
                src="/bilder/umzugshilfe-finden-vergleichen.webp"
                alt="Top Offerten in der Schweiz vergleichen – Online-Offerten.ch"
                width={600}
                height={450}
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-6 border border-green-200 mt-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Warum sich der Vergleich lohnt</h3>
            <p className="text-body">
              Für gleiche oder ähnliche Dienstleistungen können Angebotspreise deutlich auseinanderliegen. Wer nur ein Angebot hat, nimmt in Kauf, den Markt nicht zu kennen. Mit mehreren Top Offerten sehen Sie das Preis-Leistungs-Verhältnis klarer und
              treffen eine fundiertere Entscheidung – ohne zusätzlichen Stress bei der Anbietersuche.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="heading-2 !mt-0">Für welche Aufträge können Sie Top Offerten auf Online-Offerten.ch erhalten?</h2>
          <p className="text-body mb-8 max-w-3xl">
            Unser Fokus auf <strong>Online-Offerten.ch</strong> liegt auf Dienstleistungen rund um Umzug, Reinigung, Malerarbeiten und Entsorgung. Über das zentrale Anfrageformular beschreiben Sie Ihr Vorhaben; wir leiten es an passende Betriebe weiter.
            Mehr Hintergrund zum Portal finden Sie auf der Seite{' '}
            <Link href="/offerten-portal" className="text-green-700 hover:text-green-800 underline font-medium">
              Offertenportal
            </Link>
            .
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Umzug & Transport', href: '/umzugsfirma', text: 'Privat- und Firmenumzüge, Spezialtransporte' },
              { title: 'Reinigung', href: '/reinigung', text: 'Endreinigung, Büro, Fenster und mehr' },
              { title: 'Malerarbeiten', href: '/malerarbeitenkosten', text: 'Innenräume, Fassaden, Tapezierarbeiten' },
              { title: 'Räumung', href: '/raeumung-entsorgung', text: 'Entrümpelung und fachgerechte Entsorgung' },
            ].map((item) => (
              <Link key={item.title} href={item.href}>
                <Card className="h-full hover:border-green-500 hover:shadow-lg transition-all border-2 border-gray-100">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{item.text}</p>
                    <span className="inline-flex items-center text-green-700 font-medium text-sm mt-3">
                      Mehr erfahren <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="heading-2">Das spricht für Online-Offerten.ch</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Kurz zusammengefasst – warum Nutzer unser Vergleichsangebot schätzen</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Bis zu 40% sparen möglich',
                description: 'Viele Kunden sparen durch den Vergleich – je nach Auftrag und Angebot.',
                color: 'green',
              },
              {
                icon: ShieldCheck,
                title: 'Geprüfte Partner',
                description: 'Wir prüfen Firmendaten und Versicherung, bevor Partner im Netzwerk aktiv sind.',
                color: 'blue',
              },
              {
                icon: Users,
                title: 'Breites Netzwerk',
                description: 'Zahlreiche Fachbetriebe in der Schweiz – regional und überregional.',
                color: 'teal',
              },
              {
                icon: Star,
                title: 'Mehrere Offerten',
                description: 'Bis zu fünf Angebote pro Anfrage – ideal zum Abwägen.',
                color: 'orange',
              },
              {
                icon: ShieldCheck,
                title: 'Unverbindlich',
                description: 'Keine Verpflichtung zur Annahme einer Offerte.',
                color: 'purple',
              },
              {
                icon: HeartHandshake,
                title: 'Persönliche Entscheidung',
                description: 'Sie wählen den Anbieter – wir sind die Vermittlungsplattform.',
                color: 'rose',
              },
            ].map((item, index) => (
              <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow border-2 border-gray-100 hover:border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                    <div className="p-2 rounded-lg bg-green-100">
                      <item.icon className="w-6 h-6 text-green-600" />
                    </div>
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 max-w-4xl">
            <h2 className="heading-2 !text-left md:!text-center mb-4">
              Top Offerten nach Stadt – online einholen & vergleichen
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Für <strong>Umzug Zürich</strong>, <strong>Reinigung Bern</strong> oder <strong>Malerarbeiten Basel</strong> – in jeder Grossstadt und in vielen Regionen: Auf{' '}
              <strong>Online-Offerten.ch</strong> können Sie mehrere Offerten online einholen und Preise sowie Leistungen transparent vergleichen. Nutzen Sie unsere{' '}
              <Link href="/umzugsfirma-vergleichen" className="text-green-700 hover:text-green-800 underline font-medium">
                Umzugsvergleich
              </Link>
              -Infos oder starten Sie direkt die{' '}
              <Link href="/kostenlose-offerte-anfordern" className="text-green-700 hover:text-green-800 underline font-medium">
                kostenlose Offertenanfrage
              </Link>
              .
            </p>
            <p className="text-gray-600 leading-relaxed">
              Unten finden Sie ausgewählte Städte mit direkten Links zu{' '}
              <span className="font-medium text-gray-800">Umzug</span> und – wo verfügbar – <span className="font-medium text-gray-800">Reinigung</span> – jeweils mit passenden
              Informationen vor Ort, kombinierbar mit Ihrer zentralen Anfrage nach Top Offerten.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {cityTopOfferten.map((city) => (
              <Card key={city.name} className="border-2 border-gray-100 hover:border-green-300 transition-colors h-full flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 leading-snug">Top Offerten {city.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Umzug & Reinigung: Offerten online einholen und vergleichen – über die gleiche Plattform wie in der ganzen Schweiz.
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col gap-2 flex-1">
                  <Link
                    href={city.umzug}
                    className="block text-sm font-semibold text-green-700 hover:text-green-800 hover:underline py-1.5 px-2 rounded-md hover:bg-green-50"
                  >
                    Umzug {city.name}: Offerten einholen & vergleichen
                    <ChevronRight className="w-3 h-3 inline ml-1" />
                  </Link>
                  {city.reinigung ? (
                    <Link
                      href={city.reinigung}
                      className="block text-sm font-semibold text-green-700 hover:text-green-800 hover:underline py-1.5 px-2 rounded-md hover:bg-green-50"
                    >
                      Reinigung {city.name}: Top Offerten anfragen
                      <ChevronRight className="w-3 h-3 inline ml-1" />
                    </Link>
                  ) : (
                    <p className="text-xs text-gray-500 px-2 py-1">Reinigung: siehe allgemeine Reinigungsseite & Formular.</p>
                  )}
                  <Link
                    href="/kostenlose-offerte-anfordern"
                    className="mt-auto text-xs text-gray-600 pt-2 border-t border-gray-100 flex items-center gap-1 hover:text-green-700"
                  >
                    <ArrowRight className="w-3 h-3" />
                    Direkt zum Formular für {city.name}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 max-w-2xl mx-auto">
            Weitere Regionen und Kantone finden Sie unter{' '}
            <Link href="/umzugsfirma" className="text-green-700 hover:underline font-medium">
              Umzugsfirma
            </Link>{' '}
            und{' '}
            <Link href="/reinigungsfirma" className="text-green-700 hover:underline font-medium">
              Reinigungsfirma
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="heading-2">Häufige Fragen zu Top Offerten & Online-Offerten.ch</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Antworten auf das, was Nutzer häufig zu unserem Angebot und zu Online-Offerten.ch fragen
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full bg-white p-4 rounded-lg shadow-xl border border-gray-200">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline text-slate-800">
                  <span className="faq-question">{item.q}</span>
                </AccordionTrigger>
                <AccordionContent className="text-base text-slate-600 leading-relaxed pt-2 pb-4">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section
        className="py-12 md:py-16 relative"
        style={{
          backgroundImage: 'url(/umzug/7946a949.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Jetzt Top Offerten anfordern</h2>
            <p className="text-sm font-semibold text-white/95 mb-4">Online-Offerten.ch</p>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Starten Sie Ihre kostenlose Anfrage hier – mehrere Angebote, ein klarer Vergleich, keine Verpflichtung.
            </p>
            <Button
              onClick={() => router.push('/kostenlose-offerte-anfordern')}
              size="lg"
              className="bg-white text-green-700 hover:bg-gray-100 font-bold group px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Kostenlos Offerten anfordern
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Unverbindlich</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-400" />
                <span>Geprüfte Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-400" />
                <span>Schweizweit</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TopOffertenPageClient
