'use client'

import React from 'react'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, CheckCircle, AlertTriangle, Shield, Users, HelpCircle, Star } from 'lucide-react'
import { PiPianoKeysFill } from 'react-icons/pi'

const Hero = ({ quoteUrl }: { quoteUrl: string }) => {
  const heroImageUrl = "https://online-offerten.ch/bilder/klaviertransport.avif"
  return (
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
                Professioneller Klaviertransport: Kostenlose Offerten vergleichen
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-bold mb-2">
                Mehrere Firmen vergleichen & bis zu 40% sparen
              </p>
            </motion.div>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed font-medium"
            >
              Kostenlose Offerten von geprüften Spezialisten für Klaviertransport vergleichen und die beste Firma für Ihren Transport finden. Unsere Partner sind auf den sicheren Transport von Klavieren, Flügeln und Pianos spezialisiert. Professionell, versichert und bis zu 40% günstiger.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-6"
            >
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-bold group px-6 py-4 text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <Link href={`${quoteUrl}?service=umzug&step=2&umzugArt=spezialtransport&special_transport_type=klaviertransport`}>
                  Jetzt kostenlose Offerten anfordern
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
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
                <span className="text-sm md:text-base text-gray-700 font-medium">Mehrere Zügelfirmen vergleichen</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-sm md:text-base text-gray-700 font-medium">Kostenlos & unverbindlich</span>
              </div>
            </motion.div>
          </article>
          <aside className="md:col-span-1 relative h-64 md:h-auto md:min-h-[400px] overflow-hidden md:pl-4" aria-label="Klaviertransport Dienstleistung Illustration">
            <figure className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-900/20 via-transparent to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-0 rounded-2xl ring-4 ring-green-500/10 pointer-events-none z-20"></div>
              <img
                src={heroImageUrl}
                alt="Professioneller Klaviertransport in der Schweiz - Kostenlose Offerten vergleichen"
                className="w-full h-full object-cover rounded-2xl"
                loading="eager"
                fetchPriority="high"
                width="600"
                height="400"
                itemProp="image"
              />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-full pointer-events-none z-30"></div>
              <figcaption className="sr-only">Professioneller Klaviertransport - Kostenlose Offerten vergleichen</figcaption>
            </figure>
          </aside>
        </div>
      </div>
    </motion.section>
  )
}

const ContentSection = ({ sectionData }: { sectionData: any }) => {
  const icons: Record<string, React.ReactNode> = {
    why: <AlertTriangle className="w-10 h-10 text-green-500" />,
    process: <Users className="w-10 h-10 text-green-500" />,
    costs: null,
    types: <PiPianoKeysFill className="w-10 h-10 text-green-500" />,
    checklist: <CheckCircle className="w-10 h-10 text-green-500" />,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="py-12 md:py-16"
    >
      <div className="container mx-auto max-w-navbar px-4 md:px-6">
        <div className="flex items-start gap-6 mb-8">
          <div className="flex-shrink-0 hidden sm:block">{icons[sectionData.key]}</div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{sectionData.title}</h2>
            {sectionData.subtitle && <p className="mt-2 text-lg text-gray-600">{sectionData.subtitle}</p>}
          </div>
        </div>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {sectionData.paragraphs.map((p: string, i: number) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
          {sectionData.points && (
            <ul className="space-y-4 mt-6">
              {sectionData.points.map((point: any, i: number) => (
                <li key={i} className="flex items-start">
                  <Shield className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="font-semibold text-gray-800">{point.title}</strong>
                    <p className="text-gray-600">{point.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const FaqSection = ({ faqData }: { faqData: any }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="py-12 md:py-20 bg-white"
    >
      <div className="container mx-auto max-w-navbar px-4 md:px-6">
        <div className="text-center mb-12">
          <HelpCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{faqData.title}</h2>
          <p className="mt-2 text-lg text-gray-600">{faqData.subtitle}</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqData.questions.map((item: any, index: number) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b">
              <AccordionTrigger className="font-semibold text-left text-base md:text-lg hover:no-underline py-4">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6">
                <div className="prose max-w-none text-gray-700">
                  <p>{item.a}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  )
}

const Cta = ({ quoteUrl }: { quoteUrl: string }) => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.7 }}
    className="bg-gradient-to-r from-green-600 to-green-800"
  >
    <div className="container mx-auto max-w-navbar px-4 md:px-6 py-16 md:py-20 text-center text-white">
      <Star className="w-16 h-16 text-white/50 mx-auto mb-6" />
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Kostenlose Offerten für Klaviertransport anfordern</h2>
      <p className="text-lg md:text-xl text-green-200 max-w-3xl mx-auto mb-8">
        Erhalten Sie kostenlos und unverbindlich Offerten von geprüften Spezialisten aus Ihrer Region. Vergleichen Sie Preise und Leistungen und finden Sie den perfekten Partner für den Transport Ihres wertvollen Instruments. Bis zu 40% sparen!
      </p>
      <Button
        asChild
        size="lg"
        className="bg-white text-green-700 hover:bg-green-50 group px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        <Link href={`${quoteUrl}?service=umzug&special=klaviertransport`}>
          Jetzt kostenlose Offerten anfordern
          <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1.5" />
        </Link>
      </Button>
    </div>
  </motion.section>
)

const KlaviertransportPageClient = () => {
  const canonicalUrl = "/klaviertransport"
  const quoteUrl = "/kostenlose-offerte-anfordern"

  const whyData = {
    key: "why",
    title: "Warum ein professioneller Klaviertransport unerlässlich ist",
    subtitle: "Ein Klavier auf eigene Faust zu transportieren ist nicht nur riskant, sondern kann auch zu irreparablen Schäden am Instrument und zu Verletzungen führen. Ein Spezialtransport ist keine Luxus, sondern eine Notwendigkeit.",
    paragraphs: [
      "Ein Klavier oder Flügel ist ein komplexes Meisterwerk aus Holz, Metall und filigraner Mechanik. Sein hohes Gewicht (oft zwischen 200 und 500 kg, bei Konzertflügeln sogar bis zu 1000 kg) und seine sperrige Form machen den Transport zu einer extremen Herausforderung. Laienhafte Versuche, ein solches Instrument zu bewegen, enden oft mit kostspieligen Schäden am Klavier selbst, an Treppenhäusern, Böden oder Türrahmen. Noch schlimmer sind die gesundheitlichen Risiken: Falsches Heben kann zu schweren Rückenverletzungen führen.",
      "Professionelle Klaviertransportfirmen verfügen nicht nur über die nötige Muskelkraft, sondern vor allem über das Fachwissen, die Erfahrung und die spezielle Ausrüstung. Sie kennen die kritischen Punkte eines jeden Instruments und wissen, wie man es sicher verpackt, anhebt und transportiert. Der Einsatz von Tragegurten, Klavierrollern, Schutzdecken und bei Bedarf sogar Kränen gehört zum Standard. Zudem ist Ihr wertvolles Instrument während des gesamten Transports versichert. Vergleichen Sie mehrere Spezialisten, um die beste Firma zu finden. Egal ob Transport in Zürich, Flügeltransport in Bern oder Piano-Transport in Basel – ein professioneller <strong>Zügelservice mit Klavier</strong>-Erfahrung ist daher die klügste und sicherste Wahl."
    ],
    points: [
      {
        title: "Spezialausrüstung",
        description: "Einsatz von Tragegurten, Klavier-Rollwagen, Rampen und Schutzmaterialien, um Schäden zu vermeiden."
      },
      {
        title: "Erfahrenes Personal",
        description: "Geschulte Teams, die die Statik und die empfindlichen Teile eines Klaviers kennen und sicher handhaben können."
      },
      {
        title: "Umfassender Versicherungsschutz",
        description: "Ihr Instrument ist gegen alle Eventualitäten während des Transports versichert – für Ihre vollkommene Sorgenfreiheit."
      },
      {
        title: "Effizienz und Zeitersparnis",
        description: "Profis erledigen den Transport schnell und sicher, während Sie sich auf andere Aspekte Ihres Umzugs konzentrieren können."
      }
    ]
  }

  const processData = {
    key: "process",
    title: "Professioneller Ablauf beim Klaviertransport",
    subtitle: "Ein reibungsloser Transport folgt einem bewährten und sorgfältig geplanten Prozess. Vom ersten Kontakt bis zum Aufstellen am neuen Standort – so arbeiten unsere Profis.",
    paragraphs: [
      "Ein erfolgreicher <strong>Klaviertransport</strong> (auch Flügeltransport oder Piano transportieren genannt) beginnt lange vor dem eigentlichen Tragen. Alles startet mit einer detaillierten Planung. Unsere Partnerfirmen werden Sie nach den Details fragen: Art des Instruments (Klavier, Flügel), Grösse, Gewicht, sowie die Gegebenheiten am Abhol- und Zielort. Gibt es enge Treppenhäuser, viele Stufen oder andere Hindernisse? Diese Informationen sind entscheidend für die Wahl der richtigen Ausrüstung und der Teamgrösse.",
      "Am Transporttag selbst wird das Instrument zuerst professionell für den Transport vorbereitet. Bewegliche Teile wie der Deckel und die Tastenklappe werden gesichert. Anschliessend wird das Klavier sorgfältig in spezielle Schutzdecken und Folien eingepackt, um es vor Kratzern und Stössen zu schützen. Beim Transport selbst kommen spezielle Tragegurte zum Einsatz, die das Gewicht gleichmässig verteilen und eine kontrollierte Bewegung ermöglichen. Auf ebenen Flächen wird ein Klavierroller verwendet. Nach dem sicheren Verladen im gepolsterten Transportfahrzeug wird das Instrument am Zielort wieder entladen und an der von Ihnen gewünschten Stelle platziert. Dieser gesamte Vorgang ist ein Paradebeispiel für den professionellen <strong>Transport empfindlicher Güter</strong>."
    ]
  }

  const costsData = {
    key: "costs",
    title: "Was kostet ein Klaviertransport?",
    subtitle: "Die Kosten für einen Klaviertransport sind so individuell wie das Instrument selbst. Hier erfahren Sie, welche Faktoren den Preis beeinflussen und mit welchen Richtwerten Sie rechnen können.",
    paragraphs: [
      "Die Frage nach den Kosten für einen <strong>Klaviertransport</strong> lässt sich nicht pauschal beantworten. Der Preis hängt von einer Vielzahl von Faktoren ab. Der wichtigste Faktor ist die Art und das Gewicht des Instruments. Ein kleineres Klavier (Pianino) ist günstiger zu transportieren als ein schwerer Konzertflügel. Die Distanz zwischen Abhol- und Zielort spielt ebenfalls eine grosse Rolle.",
      "Besonders ins Gewicht fallen die örtlichen Gegebenheiten. Muss das Klavier über mehrere Stockwerke getragen werden? Gibt es einen Aufzug, der gross genug ist? Enge oder gewundene Treppenhäuser erhöhen den Aufwand und damit die Kosten erheblich. In manchen Fällen kann sogar der Einsatz eines Möbellifts oder Krans notwendig werden, was den Preis weiter beeinflusst. Ein <strong>Möbeltransport mit Klavier</strong> ist daher immer ein Fall für eine individuelle Offerte. Um genaue Preise zu erhalten, ist es unerlässlich, mehrere Spezialisten zu vergleichen, die auf <strong>den Transport von Klavieren</strong> spezialisiert sind. Vergleichen Sie mehrere Offerten von verschiedenen Firmen, um das beste Preis-Leistungs-Verhältnis für Ihren <strong>Spezialtransport</strong> zu finden und bis zu 40% zu sparen."
    ],
    points: [
      {
        title: "Art und Gewicht des Instruments",
        description: "Ein Flügeltransport ist aufwändiger und teurer als der Transport eines Pianos."
      },
      {
        title: "Transportdistanz",
        description: "Die Entfernung zwischen dem alten und neuen Standort."
      },
      {
        title: "Etagen und Treppen",
        description: "Die Anzahl der Stockwerke, die überwunden werden müssen, ist ein wesentlicher Kostenfaktor."
      },
      {
        title: "Zugänglichkeit",
        description: "Enge Gänge, Türen oder die Notwendigkeit eines Aussenlifts können den Preis beeinflussen."
      },
      {
        title: "Zusatzleistungen",
        description: "Einlagerung oder die Entsorgung eines alten Instruments."
      }
    ]
  }

  const typesData = {
    key: "types",
    title: "Transport für jeden Klaviertyp",
    subtitle: "Ob Pianino, Flügel oder Cembalo – jedes Tasteninstrument hat seine eigenen Anforderungen an den Transport. Unsere Spezialisten kennen sie alle.",
    paragraphs: [
      "Nicht jedes Klavier ist gleich. Die Transportmethoden müssen an den spezifischen Typ des Instruments angepasst werden. Ein aufrechter stehendes Klavier (Pianino) ist die häufigste Art. Obwohl es kompakter ist, erfordert sein hohes Gewicht und sein hoher Schwerpunkt grosse Sorgfalt, insbesondere in Treppenhäusern.",
      "Ein Flügel ist die Königsklasse im <strong>Musikinstrumente transportieren</strong>. Für den Transport müssen zunächst die Füsse und die Pedale (die Lyra) demontiert werden. Der Korpus wird dann hochkant auf ein spezielles Klavierbrett (auch Transportschlitten genannt) gestellt, sicher verzurrt und dick eingepackt. Dieser Vorgang erfordert grosses Fachwissen, um die empfindliche Mechanik und die polierte Oberfläche nicht zu beschädigen. Auch andere Tasteninstrumente wie Cembali, Orgeln oder E-Pianos benötigen eine fachgerechte Behandlung. Unabhängig vom Typ Ihres Instruments stellen unsere Partner sicher, dass es sicher und unversehrt an seinem neuen Platz ankommt."
    ]
  }

  const checklistData = {
    key: "checklist",
    title: "Checkliste für einen reibungslosen Klaviertransport",
    subtitle: "Eine gute Vorbereitung ist der Schlüssel zum Erfolg. Mit dieser Checkliste stellen Sie sicher, dass am Transporttag alles glattläuft.",
    paragraphs: [
      "Damit Ihr <strong>Zügelservice mit Klavier</strong> reibungslos verläuft, können Sie einige wichtige Vorbereitungen treffen. Eine gute Planung und Kommunikation mit der Transportfirma kann viele potenzielle Probleme von vornherein vermeiden."
    ],
    points: [
      {
        title: "Genaue Angaben machen",
        description: "Informieren Sie die Umzugsfirma exakt über Klaviertyp, Masse, Gewicht und die Gegebenheiten vor Ort (Etagen, enge Stellen)."
      },
      {
        title: "Transportwege freimachen",
        description: "Sorgen Sie dafür, dass der Weg vom alten Standort zum Fahrzeug und vom Fahrzeug zum neuen Standort frei von Hindernissen ist."
      },
      {
        title: "Böden schützen",
        description: "Auch wenn die Profis Schutzmaterial mitbringen, kann es sinnvoll sein, empfindliche Böden zusätzlich mit Abdeckvlies zu schützen."
      },
      {
        title: "Fotos machen",
        description: "Dokumentieren Sie den Zustand Ihres Klaviers vor dem Transport. Dies ist nützlich für den unwahrscheinlichen Fall eines Schadens."
      },
      {
        title: "Nach dem Transport",
        description: "Lassen Sie das Klavier nach dem Transport 2-3 Wochen am neuen Standort akklimatisieren, bevor Sie es stimmen lassen."
      }
    ]
  }

  const faqData = {
    title: "Häufig gestellte Fragen",
        subtitle: "Hier finden Sie Antworten auf die wichtigsten Fragen rund um den Transport von Klavieren und Flügeln.",
    questions: [
      {
        q: "Muss mein Klavier nach dem Transport gestimmt werden?",
        a: "Ja, unbedingt. Durch die Bewegung und die Veränderung von Temperatur und Luftfeuchtigkeit wird sich das Klavier verstimmen. Es wird empfohlen, das Instrument am neuen Standort etwa 2-3 Wochen akklimatisieren zu lassen, bevor ein professioneller Klavierstimmer beauftragt wird."
      },
      {
        q: "Ist mein Klavier während des Transports versichert?",
        a: "Ja, alle von uns vermittelten professionellen Transportunternehmen verfügen über eine Transportversicherung, die eventuelle Schäden am Instrument oder an der Immobilie abdeckt. Klären Sie die genaue Deckungssumme vorab mit dem Unternehmen ab."
      },
      {
        q: "Wie lange dauert der Transport eines Klaviers?",
        a: "Die Dauer hängt stark von den Gegebenheiten ab. Ein einfacher Transport im Erdgeschoss kann in unter einer Stunde erledigt sein. Ein komplexer Transport über mehrere Etagen kann mehrere Stunden in Anspruch nehmen. Die reine Fahrzeit kommt noch hinzu."
      },
      {
        q: "Kann das Klavier zusammen mit meinen anderen Möbeln transportiert werden?",
        a: "Ja, viele Umzugsfirmen bieten einen kompletten Zügelservice an, der den Transport von Klavieren einschliesst. Dies ist oft die praktischste und kostengünstigste Lösung. Stellen Sie sicher, dass die Firma explizit Erfahrung mit Klaviertransporten hat."
      },
      {
        q: "Was ist der Unterschied zwischen Klaviertransport und Schwertransport?",
        a: "Der Transport von Klavieren ist eine Form des Spezialtransports, der sich auf Musikinstrumente konzentriert. Der Begriff Schwertransport wird in der Logistikbranche eher für übergrosse und extrem schwere Güter wie Maschinenteile oder Bauelemente verwendet, die oft spezielle Genehmigungen und Begleitfahrzeuge erfordern. Obwohl ein Klavier schwer ist, fällt es in der Regel nicht unter die gesetzliche Definition eines Schwertransports."
      },
      {
        q: "Kann ich mein Klavier auch einlagern lassen?",
        a: "Ja, viele Spezialfirmen bieten auch die fachgerechte Einlagerung von Klavieren in klimatisierten Lagerräumen an. Dies ist ideal, wenn Sie Ihr Instrument für eine gewisse Zeit sicher unterbringen müssen."
      }
    ]
  }

  const metaTitle = "Klaviertransport: Kostenlose Offerten vergleichen | Online-Offerten.ch"
  const metaDescription = "Kostenlose Offerten von geprüften Spezialisten für Klaviertransport vergleichen. Flügeltransport, Piano-Transport & mehr. Professionell versichert, bis zu 40% sparen!"

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Klaviertransport",
    "provider": {
      "@type": "Organization",
      "name": "Online-Offerten.ch"
    },
    "areaServed": {
      "@type": "Country",
      "name": "CH"
    },
    "name": "Professioneller Klaviertransport in der Schweiz",
    "description": metaDescription,
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": faqData.questions.map((item: any) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    }
  }

  return (
    <>
      <div className="bg-gradient-to-b from-gray-50 via-slate-100 to-gray-50">
        <Hero quoteUrl={quoteUrl} />
        <ContentSection sectionData={whyData} />
        <div className="w-full bg-gray-200 h-px" />
        <ContentSection sectionData={processData} />
        <div className="w-full bg-gray-200 h-px" />
        <ContentSection sectionData={costsData} />
        <div className="w-full bg-gray-200 h-px" />
        <ContentSection sectionData={typesData} />
        <div className="w-full bg-gray-200 h-px" />
        <ContentSection sectionData={checklistData} />
        <FaqSection faqData={faqData} />
        <Cta quoteUrl={quoteUrl} />
      </div>
    </>
  )
}

export default KlaviertransportPageClient

