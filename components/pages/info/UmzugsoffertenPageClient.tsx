'use client'

import React, { useEffect, useState, useRef } from 'react'
// Framer Motion removed for better performance
import Link from 'next/link'
import dynamic from 'next/dynamic'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// Only import icons that are actually used
import { 
  ArrowRight, CheckCircle, ShieldCheck, Clock, TrendingUp, Users, Award
} from 'lucide-react'
import UmzugsoffertenHeroForm from './UmzugsoffertenHeroForm'

// Lazy load heavy sections for better Core Web Vitals
const UmzugsoffertenFAQSection = dynamic(
  () => import('./UmzugsoffertenFAQSection'),
  { 
    ssr: true,
    loading: () => (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="space-y-3 mt-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
)

const UmzugsoffertenSEORichContent = dynamic(
  () => import('./UmzugsoffertenSEORichContent'),
  { 
    ssr: true,
    loading: () => (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }
)

const UmzugsoffertenRelatedServices = dynamic(
  () => import('./UmzugsoffertenRelatedServices'),
  { 
    ssr: true,
    loading: () => (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-100 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
)

interface UmzugsoffertenPageClientProps {
  initialReviewStats?: {
    reviewCount: number;
    averageRating: number;
  };
}

const UmzugsoffertenPageClient: React.FC<UmzugsoffertenPageClientProps> = ({ initialReviewStats }) => {
  const router = useRouter()
  const canonicalUrl = 'https://online-offerten.ch/umzugsofferten'
  const [activeId, setActiveId] = useState<string>('')
  const tocRef = useRef<HTMLDivElement>(null)
  // Use server-side review stats directly - no state needed
  const ratingStats = {
    reviewCount: initialReviewStats?.reviewCount || 0,
    averageRating: initialReviewStats?.averageRating || 0
  }

  // Table of Contents items - Only H2 headings
  const tocItems = [
    { id: 'umzugsofferte-3-schritte', title: 'Umzugsofferte: In 3 Schritten passende Umzugsfirmen in der Schweiz finden', level: 2 },
    { id: 'umzugsofferte-vergleich', title: 'Umzugsofferte – warum sich der Vergleich für Sie lohnt', level: 2 },
    { id: 'was-ist-umzugsofferte', title: 'Was ist eine Umzugsofferte genau?', level: 2 },
    { id: 'transparente-offerte', title: 'Welche Punkte sollte eine transparente Umzugsofferte enthalten?', level: 2 },
    { id: 'vergleich-funktioniert', title: 'So funktioniert der Vergleich von Umzugsofferten auf Online-Offerten.ch', level: 2 },
    { id: 'wann-einholen', title: 'Wann sollten Sie Umzugsofferten einholen?', level: 2 },
    { id: 'tipps-auswahl', title: 'Tipps: So wählen Sie die beste Umzugsofferte aus', level: 2 },
    { id: 'fazit', title: 'Fazit: Mit der richtigen Umzugsofferte entspannt zügeln', level: 2 },
  ]

  // Scroll tracking for active heading
  useEffect(() => {
    const handleScroll = () => {
      const headings = tocItems.map(item => {
        const element = document.getElementById(item.id)
        if (!element) return { id: item.id, element: null, top: Infinity, bottom: Infinity }
        const rect = element.getBoundingClientRect()
        return { 
          id: item.id, 
          element, 
          top: rect.top,
          bottom: rect.bottom
        }
      }).filter(h => h.element !== null)

      if (headings.length === 0) return

      // Offset: 120px for desktop navbar, 160px for mobile (navbar + TOC)
      const offset = window.innerWidth >= 1024 ? 120 : 160
      let currentActive = ''

      // Find the heading that's currently in the viewport
      for (let i = headings.length - 1; i >= 0; i--) {
        // Heading is in view if its top is above the offset and bottom is below it
        if (headings[i].top <= offset && headings[i].bottom >= offset) {
          currentActive = headings[i].id
          break
        }
        // Or if heading has passed the offset
        if (headings[i].top <= offset) {
          currentActive = headings[i].id
          break
        }
      }

      // If we're at the top, select the first heading
      if (window.scrollY < 100 && headings.length > 0) {
        currentActive = headings[0].id
      }

      if (currentActive && currentActive !== activeId) {
        setActiveId(currentActive)
      }
    }

    // Throttle scroll events for better performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    // Throttle resize events too
    let lastResizeTime = 0
    const throttledResize = () => {
      const now = Date.now()
      if (now - lastResizeTime >= 100) {
        handleScroll()
        lastResizeTime = now
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    window.addEventListener('resize', throttledResize, { passive: true })
    
    // Initial check with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      handleScroll()
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', throttledScroll)
      window.removeEventListener('resize', throttledResize)
    }
  }, [activeId])

  // Scroll to heading on click
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Offset: 120px for desktop navbar, 160px for mobile (navbar + TOC)
      const offset = window.innerWidth >= 1024 ? 120 : 160
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const faqItems = [
    {
      q: "Was sind Umzugsofferten und wie funktioniert der Vergleich?",
      a: "Umzugsofferten sind kostenlose Preisangebote von Umzugsfirmen für Ihren geplanten Umzug. Bei Online-Offerten.ch können Sie bis zu 5 <strong>Preisvorschläge</strong> von geprüften Umzugsfirmen in Ihrer Region kostenlos und unverbindlich anfordern. Sie füllen einfach ein kurzes Formular aus, beschreiben Ihren Umzug, und erhalten innerhalb von 24-48 Stunden mehrere <strong>Preisvorschläge</strong> per E-Mail. Diese können Sie dann in Ruhe vergleichen und die beste für Ihre Bedürfnisse auswählen. Der <strong>direkte Vergleich</strong> ist der effektivste Weg, um faire Preise zu finden und bis zu 40% zu sparen."
    },
    {
      q: "Sind Umzugsofferten wirklich kostenlos?",
      a: "Ja, der Service von Online-Offerten.ch ist für Sie als Kunde zu 100% kostenlos und unverbindlich. Sie zahlen keine Gebühren für die Offertenanfrage, keine Vermittlungsgebühren und keine versteckten Kosten. Die Umzugsfirmen zahlen eine kleine Gebühr, wenn Sie deren Offerte annehmen. Sie können alle Offerten vergleichen und entscheiden selbst, ob und welche Offerte Sie annehmen möchten. Es gibt keine Mindestlaufzeit oder Verpflichtungen Ihrerseits."
    },
    {
      q: "Wie viele Umzugsofferten erhalte ich?",
      a: "Sie erhalten bis zu 5 <strong>Preisvorschläge</strong> von verschiedenen geprüften Umzugsfirmen aus Ihrer Region. Die Anzahl hängt von der Verfügbarkeit der Partnerfirmen in Ihrer Region und Ihrem Umzugsdatum ab. In Ballungsgebieten wie Zürich, Basel oder Bern erhalten Sie meist alle 5 <strong>Angebote</strong>, in ländlicheren Regionen können es auch 3-4 sein. Jede Offerte wird Ihnen per E-Mail zugesendet und enthält alle wichtigen Details wie Preis, Leistungen, Versicherungen und Kontaktinformationen."
    },
    {
      q: "Wie lange dauert es, bis ich Umzugsofferten erhalte?",
      a: "In der Regel erhalten Sie die ersten <strong>Preisvorschläge</strong> innerhalb von 24-48 Stunden nach Ihrer Anfrage. Einige Umzugsfirmen antworten bereits nach wenigen Stunden. Alle <strong>Angebote</strong> werden Ihnen per E-Mail zugesendet und enthalten detaillierte Informationen zu Preis, Leistungen, Versicherungen und Kontaktdaten der Umzugsfirma. Falls Sie nach 48 Stunden noch nicht alle <strong>Kostenvoranschläge</strong> erhalten haben, können Sie uns kontaktieren und wir helfen Ihnen gerne weiter."
    },
    {
      q: "Was sollte eine gute Umzugsofferte enthalten?",
      a: "Eine professionelle <strong>Umzugsofferte</strong> sollte folgende Informationen enthalten: Gesamtpreis mit detaillierter Aufschlüsselung, alle enthaltenen Leistungen (Verpackung, Transport, Montage/Demontage), Versicherungsschutz und Deckungssumme, Umzugsdatum und Zeitfenster, Anzahl der Umzugshelfer und Fahrzeuge, Zusatzleistungen und deren Kosten, Zahlungsbedingungen und Stornierungsbedingungen. Achten Sie darauf, dass alle Leistungen schriftlich festgehalten sind. Eine seriöse Umzugsfirma bietet transparente <strong>Preise</strong> ohne versteckte Kosten."
    },
    {
      q: "Kann ich Umzugsofferten auch für Auslandumzüge anfordern?",
      a: "Ja, Sie können auch für Auslandumzüge <strong>Preisvorschläge</strong> anfordern. Viele unserer Partnerfirmen sind auf Umzüge ins Ausland spezialisiert und können Ihnen <strong>Kostenvoranschläge</strong> für Umzüge nach Deutschland, Österreich, Frankreich, Italien und andere europäische Länder erstellen. Auslandumzüge erfordern zusätzliche Planung und Dokumentation, daher sollten Sie diese frühzeitig anfragen. Die <strong>Angebote</strong> enthalten dann auch Informationen zu Zollbestimmungen, Transportdauer und internationalen Versicherungen."
    },
    {
      q: "Wie kann ich bei Umzugsofferten sparen?",
      a: "Der beste Weg, um bei <strong>Umzugsangeboten</strong> zu sparen, ist der Vergleich mehrerer <strong>Preise</strong>. Studien zeigen, dass Kunden durch den Vergleich durchschnittlich 30-40% der Umzugskosten einsparen können. Weitere Sparmöglichkeiten: Flexibel beim Umzugsdatum sein (Wochentage sind oft günstiger als Wochenenden), Eigenleistung beim Packen erbringen, vor dem Umzug ausmisten und nicht benötigte Gegenstände verkaufen oder entsorgen, frühzeitig buchen (Last-Minute-Buchungen sind teurer), und <strong>Angebote</strong> genau vergleichen - nicht nur auf den Preis achten, sondern auch auf enthaltene Leistungen."
    },
    {
      q: "Sind die Umzugsfirmen, die Offerten senden, versichert?",
      a: "Ja, alle Umzugsfirmen in unserem Netzwerk sind geprüft und verfügen über eine gültige Transportversicherung sowie Betriebshaftpflichtversicherung. Wir prüfen alle Partnerfirmen vor der Aufnahme in unser Netzwerk auf Versicherungen, Lizenzen und Referenzen. Sie können sicher sein, dass alle Firmen, die Ihnen Offerten senden, seriös und versichert sind. Die Versicherungsdetails sind in der Regel in den Offerten enthalten, falls nicht, sollten Sie danach fragen."
    },
    {
      q: "Was ist der Unterschied zwischen Umzugsofferten und einem Festpreis?",
      a: "<strong>Umzugsofferten</strong> sind unverbindliche Preisangebote, die Sie vergleichen können. Ein Festpreis ist ein verbindliches Angebot, das nach der Annahme nicht mehr geändert werden kann. Die meisten <strong>Preisvorschläge</strong>, die Sie erhalten, sind Festpreise für die beschriebenen Leistungen. Das bedeutet, dass der angegebene Preis verbindlich ist, solange sich die Umzugsdetails nicht ändern. Achten Sie darauf, dass alle gewünschten Leistungen enthalten sind, damit es später keine Überraschungen gibt."
    },
    {
      q: "Kann ich Umzugsofferten auch telefonisch anfordern?",
      a: "Ja, Sie können <strong>Preisvorschläge</strong> auch telefonisch anfordern, indem Sie uns unter unserer Service-Hotline kontaktieren. Unser Team hilft Ihnen gerne bei der Erstellung Ihrer Anfrage und beantwortet alle Ihre Fragen. Die <strong>Angebote</strong> werden Ihnen dann per E-Mail zugesendet. Alternativ können Sie auch das Online-Formular nutzen, das rund um die Uhr verfügbar ist und in wenigen Minuten ausgefüllt werden kann."
    }
  ]


  // Use server-side review stats - no client-side fetch needed
  // Review stats are already provided via initialReviewStats prop from server

  // Inject canonical link
  useEffect(() => {
    if (typeof document === 'undefined' || !document.head) return
    
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      if (document.head) {
        document.head.appendChild(canonicalLink)
      }
    }
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl)
    }
    
    // Cleanup - Next.js zaten canonical link'i yönetiyor, bu yüzden kaldırmaya gerek yok
    return () => {
      // No cleanup needed - Next.js handles canonical links
    }
  }, [canonicalUrl])

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=umzug&step=2')
  }

  const features = [
    {
      icon: CheckCircle,
      title: 'Bis zu 5 Angebote',
      description: 'Erhalten Sie mehrere Offerten von geprüften Umzugsfirmen in Ihrer Region'
    },
    {
      icon: ShieldCheck,
      title: '100% kostenlos & unverbindlich',
      description: 'Keine Gebühren, keine versteckten Kosten, keine Verpflichtungen'
    },
    {
      icon: TrendingUp,
      title: 'Günstige Preise finden',
      description: 'Durch den Vergleich mehrerer Offerten finden Sie die besten Preise'
    },
    {
      icon: Users,
      title: 'Nur geprüfte Firmen',
      description: 'Alle Partnerfirmen sind versichert und verfügen über positive Bewertungen'
    },
    {
      icon: Clock,
      title: 'Schnelle Antworten',
      description: 'Erhalten Sie die ersten Offerten bereits innerhalb von 24 Stunden'
    },
    {
      icon: Award,
      title: 'Transparente Preise',
      description: 'Alle Offerten enthalten detaillierte Preisaufschlüsselungen'
    }
  ]

  const costFactors = [
    {
      factor: "Wohnungsgrösse",
      description: "Die Anzahl der Zimmer und das Volumen des Umzugsguts bestimmen massgeblich den Preis. Ein 1.5-Zimmer-Umzug kostet deutlich weniger als ein 5-Zimmer-Umzug."
    },
    {
      factor: "Umzugsstrecke",
      description: "Die Distanz zwischen alter und neuer Wohnung beeinflusst die Kosten. Innerstädtische Umzüge sind günstiger als Umzüge über grössere Distanzen."
    },
    {
      factor: "Umzugsdatum",
      description: "Wochenenden, Monatsenden und Sommermonate sind teurer, da die Nachfrage höher ist. Flexibilität beim Datum kann Geld sparen."
    },
    {
      factor: "Leistungsumfang",
      description: "Verpackungsservice, Möbelmontage, Umzugsreinigung und Spezialtransporte erhöhen die Kosten. Eigenleistung reduziert den Preis."
    },
    {
      factor: "Stockwerke",
      description: "Umzüge in höhere Stockwerke ohne Aufzug sind teurer, da mehr Zeit und Personal benötigt wird."
    },
    {
      factor: "Zugänglichkeit",
      description: "Schwierige Zugänge, enge Treppen oder Halteverbotszonen können zusätzliche Kosten verursachen."
    }
  ]

  const steps = [
    {
      number: "01",
      title: "Umzugsdetails eingeben",
      description: "Füllen Sie unser kostenloses Online-Formular aus und beschreiben Sie Ihren geplanten Umzug. Geben Sie Umzugsdatum, Umzugsstrecke, Wohnungsgrösse und gewünschte Leistungen an."
    },
    {
      number: "02",
      title: "Kontaktdaten angeben",
      description: "Geben Sie Ihre Kontaktdaten (Name, E-Mail-Adresse, Telefonnummer) ein, damit die Umzugsfirmen Ihnen die Offerten zusenden können. Ihre Daten werden vertraulich behandelt."
    },
    {
      number: "03",
      title: "Anfrage absenden",
      description: "Senden Sie Ihre Anfrage ab. Sie erhalten sofort eine Bestätigungs-E-Mail. Unsere Partnerfirmen werden automatisch über Ihre Anfrage informiert."
    },
    {
      number: "04",
      title: "Offerten vergleichen",
      description: "Innerhalb von 24-48 Stunden erhalten Sie bis zu 5 Umzugsofferten per E-Mail. Vergleichen Sie Preise, Leistungen, Versicherungen und Bewertungen der Umzugsfirmen."
    },
    {
      number: "05",
      title: "Beste Offerte auswählen",
      description: "Wählen Sie die Umzugsofferte aus, die am besten zu Ihren Bedürfnissen und Ihrem Budget passt. Kontaktieren Sie die Umzugsfirma direkt, um Details zu klären und zu buchen."
    }
  ]

  const locations = [
    { name: "Umzugsofferten Zürich", link: "/umzugsfirma/zuerich/umzugsofferten-zuerich", title: "Zürich Umzugsofferten vergleichen" },
    { name: "Umzugsofferten Basel", link: "/umzugsfirma/basel", title: "Basel Umzugsofferten vergleichen" },
    { name: "Umzugsofferten Bern", link: "/umzugsfirma/bern", title: "Bern Umzugsofferten vergleichen" },
    { name: "Umzugsofferten Genf", link: "/umzugsfirma/genf", title: "Genf Umzugsofferten vergleichen" },
    { name: "Umzugsofferten Lausanne", link: "/umzugsfirma/lausanne", title: "Lausanne Umzugsofferten vergleichen" },
    { name: "Umzugsofferten Luzern", link: "/umzugsfirma/luzern", title: "Luzern Umzugsofferten vergleichen" },
    { name: "Umzugsofferten St. Gallen", link: "/umzugsfirma/st-gallen", title: "St. Gallen Umzugsofferten vergleichen" }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 md:py-20 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image - Mobile: order-1 (first), Desktop: order-2 (right) */}
            <div className="relative order-1 md:order-2">
              <div className="relative w-full h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center">
                <NextImage
                  src="/umzug/48569125erth8.webp"
                  alt="Umzug Illustration"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-2xl shadow-lg object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Left Column - Text and Form - Mobile: order-2 (second), Desktop: order-1 (left) */}
            <div className="space-y-6 order-2 md:order-1">
              <h1 className="heading-1">
                Umzugsofferten kostenlos vergleichen » Bis zu 40% sparen
              </h1>
              <p className="text-body">
                Fordern Sie bis zu 5 Angebote in 5 Minuten an
              </p>
              
              <div className="mt-6">
                <Button
                  onClick={handleCtaClick}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  Kostenlose Angebote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Table of Contents - Mobile: Sticky at top, Desktop: Left Sidebar */}
            <aside 
              ref={tocRef}
              className="lg:col-span-4"
            >
              {/* Mobile TOC - Sticky below navbar */}
              <div className="lg:hidden sticky top-[80px] z-[2999] mb-6 bg-white border-b border-gray-200 pb-4 -mx-4 px-4">
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex space-x-2 min-w-max py-2">
                    {tocItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToHeading(item.id)}
                        className={`px-4 py-2 rounded-md transition-colors text-sm whitespace-nowrap flex-shrink-0 ${
                          activeId === item.id
                            ? 'bg-green-100 text-green-700 font-semibold'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {item.title.length > 35 
                          ? `${item.title.substring(0, 35)}...` 
                          : item.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop TOC - Left Sidebar */}
              <div className="hidden lg:block sticky top-24">
                <Card className="border border-gray-200 rounded-xl shadow-sm bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-gray-800">
                      Inhalt
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <nav className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
                      {tocItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToHeading(item.id)}
                          className={`block w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                            activeId === item.id
                              ? 'bg-green-100 text-green-700 font-semibold'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          {item.title.length > 60 
                            ? `${item.title.substring(0, 60)}...` 
                            : item.title}
                        </button>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-8 text-left">
            <h2 id="umzugsofferte-3-schritte" className="heading-2 mb-6 scroll-mt-24">
              Umzugsofferte: In 3 Schritten passende Umzugsfirmen in der Schweiz finden
            </h2>
            <p className="text-body mb-6">
              Ein Umzug bedeutet Veränderung – und oft auch eine Menge Aufwand. Ob Sie eine Wohnung wechseln, ein neues Haus beziehen oder Ihr Büro verlegen: Die Wahl der richtigen Umzugsfirma entscheidet darüber, ob Sie entspannt zügeln oder unnötig Geld und Nerven verlieren. In diesem Artikel erfahren Sie, wie Sie eine professionelle Umzugsofferte erhalten, worauf Sie beim Vergleich achten sollten und wie Sie in wenigen Schritten den passenden Umzugspartner in der Schweiz finden.
            </p>

            <h2 id="umzugsofferte-vergleich" className="heading-2 mb-4 mt-8 scroll-mt-24">
              Umzugsofferte – warum sich der Vergleich für Sie lohnt
            </h2>
            <p className="text-body mb-4">
              Eine Umzugsofferte bildet die Grundlage für eine solide Planung, eine realistische Kostenkontrolle und letztlich einen stressfreien Umzug. Ohne ein detailliertes Angebot tappen Sie bei den tatsächlichen Umzugskosten oft im Dunkeln – und das kann teuer werden.
            </p>
            <p className="text-body mb-4">
              Jede Umzugssituation ist individuell. Faktoren wie die Wohnungsgrösse, das Stockwerk, das Vorhandensein eines Lift, die Distanz zwischen alter und neuer Adresse sowie gewünschte Zusatzleistungen beeinflussen den Preis erheblich. Deshalb können sich die Offerten verschiedener Umzugsfirmen stark unterscheiden.
            </p>
            <p className="text-body mb-4">
              Auf Online-Offerten.ch erhalten Sie mit nur einer Anfrage bis zu 5 Offerten von geprüften Schweizer Umzugsfirmen. Das spart Zeit und ermöglicht einen direkten Vergleich – ohne mühsames Herumtelefonieren.
            </p>
            <p className="text-body mb-4">
              Die Vorteile des Vergleichs auf einen Blick:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left heading-4">Vorteil</th>
                    <th className="border border-gray-300 px-4 py-2 text-left heading-4">Beschreibung</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-body">Bessere Preise</td>
                    <td className="border border-gray-300 px-4 py-2 text-body">Wettbewerb zwischen Anbietern führt zu fairen Konditionen</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-body">Mehr Transparenz</td>
                    <td className="border border-gray-300 px-4 py-2 text-body">Detaillierte Aufschlüsselung aller Leistungen und Kosten</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-body">Passende Leistungen</td>
                    <td className="border border-gray-300 px-4 py-2 text-body">Angebote, die genau auf Ihre Bedürfnisse zugeschnitten sind</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-body">Höhere Planungssicherheit</td>
                    <td className="border border-gray-300 px-4 py-2 text-body">Klare Angaben zu Terminen, Umfang und Budget</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* CTA Box */}
            <div className="mb-8 bg-gradient-to-br from-teal-700 to-green-800 rounded-xl p-6 md:p-8 shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-green-100 mb-3">
                  Jetzt Umzugsofferten vergleichen und kostenlos Angebote erhalten.
                </h3>
                <p className="text-green-50 text-base md:text-lg">
                  Wir vermitteln Ihnen die passenden Umzugsfirmen aus Ihrer Nähe!
                </p>
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={handleCtaClick}
                  className="bg-[#eab308] hover:bg-[#ca8a04] text-[#000000] font-medium px-8 py-4 rounded-lg text-sm leading-[20px] shadow-lg transform transition-all duration-300 hover:scale-105"
                  style={{
                    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
                    fontWeight: 500,
                    textAlign: 'center',
                    letterSpacing: 'normal',
                    wordSpacing: '0px',
                    fontStyle: 'normal',
                    fontVariant: 'normal',
                    textTransform: 'none',
                    textDecoration: 'none',
                    textIndent: '0px'
                  }}
                >
                  Umzugsfirmen vergleichen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mb-8">
              <img 
                src="/bilder/f4203971-365f-48a9-8afc-53246f91f929.webp" 
                alt="Professionelle Umzugshelfer laden Umzugskartons und Möbel in einen Transporter, um einen reibungslosen Umzug in Zürich zu gewährleisten. Diese Umzugsfirma bietet umfassende Dienstleistungen und sorgt dafür, dass alles sicher und effizient transportiert wird."
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            <h2 id="was-ist-umzugsofferte" className="heading-2 mb-4 mt-8 scroll-mt-24">
              Was ist eine Umzugsofferte genau?
            </h2>
            <p className="text-body mb-4">
              Eine Umzugsofferte ist ein schriftliches Angebot einer Umzugsfirma, das eine detaillierte Übersicht zu Leistungen, Kosten, Terminen und Bedingungen enthält. Sie dient als verbindliche Grundlage für den späteren Umzugsvertrag und hilft, Missverständnisse zwischen Ihnen und dem Umzugsunternehmen von Anfang an zu vermeiden.
            </p>
            <p className="text-body mb-4">
              In einer professionellen Umzugsofferte sollten alle Positionen nachvollziehbar und inklusive Mehrwertsteuer aufgeführt sein. Dazu gehören Angaben wie der Name des Unternehmen, die Adresse, eine klare Leistungsbeschreibung sowie die genauen Preise für jeden Service.
            </p>
            <p className="text-body mb-4">
              Beachten Sie, dass Offerten in der Regel für einen bestimmten Zeitraum gültig sind – oft 30 Tage. Prüfen Sie daher immer das Gültigkeitsdatum, bevor Sie sich entscheiden. Über Online-Offerten.ch erhalten Sie ausschliesslich Offerten von seriösen, in der Schweiz aktiven Firmen.
            </p>

            <h3 id="verbindlichkeit" className="heading-3 mb-4 mt-6 scroll-mt-24">
              Wie verbindlich ist eine Umzugsofferte?
            </h3>
            <p className="text-body mb-4">
              Eine Offerte wird nach Ihrer Annahme – sei es schriftlich oder mündlich – rechtlich verbindlich. Ab diesem Zeitpunkt müssen die vereinbarten Leistungen zu den angegebenen Konditionen erbracht werden. Dies gibt Ihnen als Kunden Sicherheit.
            </p>
            <p className="text-body mb-4">
              Sollten sich nach der Offertstellung Änderungen ergeben (zum Beispiel mehr Umzugsgut, ein zusätzlicher Stopp oder weitere Möbel aus dem Keller oder Estrich), kann dies zu einer Anpassung der Kosten führen. Sprechen Sie solche Änderungen deshalb frühzeitig mit der Firma ab.
            </p>
            <p className="text-body mb-4">
              Prüfen Sie die Offerte sorgfältig, bevor Sie zusagen:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-body">
              <li>Sind alle Leistungen klar beschrieben?</li>
              <li>Welche Stundenansätze oder Pauschalen gelten?</li>
              <li>Gibt es Zuschläge oder versteckte Gebühren?</li>
              <li>Wie lauten die Zahlungsbedingungen?</li>
            </ul>
            <p className="text-body mb-6">
              Bei Unklarheiten fragen Sie immer nach und lassen Sie sich zusätzliche Punkte schriftlich bestätigen.
            </p>

            <h3 id="kosten-offerte" className="heading-3 mb-4 mt-6 scroll-mt-24">
              Kostet eine Umzugsofferte etwas?
            </h3>
            <p className="text-body mb-4">
              Offerten über Online-Offerten.ch sind für Nutzer immer kostenlos und unverbindlich. Sie gehen keine Verpflichtung ein, wenn Sie Angebote anfordern.
            </p>
            <p className="text-body mb-4">
              Professionelle Umzugsfirmen erstellen seriöse Angebote ohne versteckte Kosten. Die Offerte selbst wird nicht verrechnet. In manchen Fällen bieten Firmen eine kostenpflichtige Besichtigung vor Ort an, die jedoch bei Auftragsvergabe oft wieder gutgeschrieben wird. Prüfen Sie dies im Vorfeld.
            </p>
            <p className="text-body mb-6">
              Fordern Sie jetzt Ihre kostenlose Umzugsofferte an und vergleichen Sie mehrere Angebote ohne Risiko.
            </p>

            <h2 id="transparente-offerte" className="heading-2 mb-4 mt-8 scroll-mt-24">
              Welche Punkte sollte eine transparente Umzugsofferte enthalten?
            </h2>
            <p className="text-body mb-4">
              Für einen aussagekräftigen Vergleich und eine realistische Budgetplanung sind detaillierte Offerten unerlässlich. Nur wenn alle Angebote dieselben Informationen enthalten, können Sie diese fair gegenüberstellen.
            </p>
            <p className="text-body mb-4">
              Alle Offerten sollten idealerweise nach denselben Kriterien beurteilt werden: Leistungen, Preise, Zeiten, Versicherung und Bedingungen. In den folgenden Abschnitten erläutern wir die zentralen Bestandteile einer professionellen Umzugsofferte.
            </p>
            <p className="text-body mb-6">
              Fehlen wichtige Angaben (zum Beispiel zur Versicherung oder Entsorgung), fordern Sie diese nach, bevor Sie sich entscheiden.
            </p>

            <h3 id="leistungen-umfang" className="heading-3 mb-4 mt-6 scroll-mt-24">
              Leistungen und Umfang des Umzugs
            </h3>
            <p className="text-body mb-4">
              Eine transparente Offerte sollte folgende Punkte klar aufführen:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-body">
              <li>Ein- und Ausladen der Möbel und Umzugskartons</li>
              <li>Transport zwischen alter und neuer Adresse</li>
              <li>Verpackungsservice (inkl. Kartons und Schutzmaterial)</li>
              <li>Möbelmontage und Demontage</li>
              <li>Entsorgung von altem Mobiliar oder Verpackungsmaterial</li>
              <li>Endreinigung der alten Wohnung</li>
              <li>Bereitstellung von Umzugsmaterial</li>
            </ul>
            <p className="text-body mb-4">
              Zusätzlich sollten die Anzahl der Umzugshelfer und Fahrzeuge, die geplante Arbeitszeit und allfällige Zusatzfahrten genannt werden. Prüfen Sie, ob Spezialtransporte (beispielsweise Klavier, Safe oder grosse Schränke) explizit erwähnt sind.
            </p>
            <p className="text-body mb-6">
              Angebote auf Online-Offerten.ch enthalten üblicherweise eine klare Leistungsbeschreibung, um Vergleiche zu erleichtern.
            </p>

            <h3 id="preise-zuschlaege" className="heading-3 mb-4 mt-6 scroll-mt-24">
              Preise, Zuschläge und Mehrwertsteuer
            </h3>
            <p className="text-body mb-4">
              Offerten werden entweder als Pauschalpreis (Festpreis) oder mit Stundensätzen erstellt. Beide Modelle haben Vor- und Nachteile:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left heading-4">Preismodell</th>
                    <th className="border border-gray-300 px-4 py-2 text-left heading-4">Vorteile</th>
                    <th className="border border-gray-300 px-4 py-2 text-left heading-4">Nachteile</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-body">Festpreis</td>
                    <td className="border border-gray-300 px-4 py-2 text-body">Planungssicherheit, keine Überraschungen</td>
                    <td className="border border-gray-300 px-4 py-2 text-body">Weniger flexibel bei Änderungen</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-body">Stundensatz</td>
                    <td className="border border-gray-300 px-4 py-2 text-body">Zahlung nach Aufwand, flexibel</td>
                    <td className="border border-gray-300 px-4 py-2 text-body">Risiko bei Verzögerungen</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-body mb-4">
              Achten Sie darauf, dass alle Preise inklusive Mehrwertsteuer ausgewiesen sind. So ist der Endpreis klar ersichtlich. Mögliche Zuschläge (zum Beispiel für lange Tragewege, fehlenden Lift, Abend- oder Wochenendeinsätze) müssen transparent aufgeführt sein.
            </p>
            <p className="text-body mb-6">
              Legen Sie mehrere Offerten nebeneinander und achten Sie nicht nur auf den Gesamtpreis, sondern vor allem auf die enthaltenen Leistungen.
            </p>

            <h3 id="termin-dauer" className="heading-3 mb-4 mt-6 scroll-mt-24">
              Termin, Dauer und Team
            </h3>
            <p className="text-body mb-4">
              In der Offerte sollten folgende Details zum Termin stehen:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-body">
              <li>Das genaue Umzugsdatum und gegebenenfalls ein Zeitfenster</li>
              <li>Ein realistischer Zeitbedarf (Anzahl Stunden oder Tagespauschale)</li>
              <li>Die Anzahl der Mitarbeitenden und Fahrzeuge</li>
            </ul>
            <p className="text-body mb-6">
              Diese Angaben helfen Ihnen, den Umfang des Einsatzes zu verstehen und Ihren Tag entsprechend zu planen. Bei knappen Terminen oder engen Zeitfenstern erwähnen Sie dies bereits bei der Offertanfrage über Online-Offerten.ch.
            </p>

            <h3 id="versicherung-haftung" className="heading-3 mb-4 mt-6 scroll-mt-24">
              Versicherung und Haftung
            </h3>
            <p className="text-body mb-4">
              Jede seriöse Umzugsfirma verfügt über eine Haftpflicht- und Transportversicherung. In der Offerte sollte klar ersichtlich sein, welche Schäden gedeckt sind, welche Selbstbehalte gelten und wo Haftungsausschlüsse bestehen.
            </p>
            <p className="text-body mb-6">
              Melden Sie wertvolle Gegenstände (zum Beispiel Kunst, Elektronik oder Schmuck) im Voraus und prüfen Sie bei Bedarf eine Zusatzversicherung. Über Online-Offerten.ch können Sie auch Firmen anfragen, die besondere Erfahrung mit empfindlichem Umzugsgut haben.
            </p>

            <h3 id="bedingungen-zahlung" className="heading-3 mb-4 mt-6 scroll-mt-24">
              Allgemeine Bedingungen und Zahlungsmodalitäten
            </h3>
            <p className="text-body mb-4">
              Professionelle Offerten enthalten Informationen zu:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-body">
              <li>Zahlungsfristen und Akonto-Zahlungen</li>
              <li>Akzeptierten Zahlungsmitteln</li>
              <li>Stornobedingungen und Umbuchungsmöglichkeiten</li>
              <li>Allfälligen Gebühren bei Terminänderung</li>
            </ul>
            <p className="text-body mb-6">
              Lesen Sie die Allgemeinen Geschäftsbedingungen (AGB), insbesondere zu Haftung, Wartezeiten und Zusatzarbeiten vor Ort. Bei Unklarheiten fragen Sie vor der Zusage schriftlich nach, um spätere Diskussionen zu vermeiden.
            </p>
            <div className="mb-8">
              <img 
                src="/bilder/83ae5b64-b499-4641-969f-9cc07997a27.webp" 
                alt="Eine Person sitzt an einem Schreibtisch und vergleicht mehrere Dokumente, die Informationen zu Umzugskosten und Angeboten von verschiedenen Umzugsfirmen enthalten. Auf dem Tisch liegen auch Formulare und Notizen, die sich auf die Planung eines Privatumzugs beziehen."
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            <h2 id="vergleich-funktioniert" className="heading-2 mb-4 mt-8 scroll-mt-24">
              So funktioniert der Vergleich von Umzugsofferten auf Online-Offerten.ch
            </h2>
            <p className="text-body mb-4">
              Der gesamte Prozess läuft online, schnell und ohne Verpflichtung ab. Mit einer einzigen Anfrage erhalten Sie mehrere, auf Ihre Situation zugeschnittene Angebote – ohne mühsames Herumtelefonieren.
            </p>
            <p className="text-body mb-4">
              Nur ausgewählte, in der Schweiz aktive Umzugsfirmen erhalten Ihre Offertanfrage. Das garantiert Qualität und Seriosität.
            </p>
            <p className="text-body mb-6">
              Jetzt Umzugsofferten vergleichen und passende Anbieter finden.
            </p>

            <h3 id="schritt-1" className="heading-3 mb-4 mt-6 scroll-mt-24">
              Schritt 1: Online-Anfrage ausfüllen
            </h3>
            <p className="text-body mb-4">
              Füllen Sie ein kurzes Online Formular aus. Dabei geben Sie folgende Daten und Details an:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-body">
              <li>Wohnungsgrösse und Anzahl Zimmer</li>
              <li>Stockwerk und Vorhandensein eines Lift</li>
              <li>Distanz zwischen alter und neuer Adresse</li>
              <li>Gewünschtes Umzugsdatum</li>
              <li>Zusatzleistungen wie Reinigung, Entsorgung oder Montage</li>
              <li>Ihre Kontaktdaten (Vorname, Nachname, E Mail, Telefon)</li>
            </ul>
            <p className="text-body mb-4">
              Je genauer Ihre Angaben zu den Umzugsdetails sind, desto präziser fallen die Offerten aus. Erwähnen Sie beispielsweise enge Treppenhäuser, einen fehlenden Lift oder Spezialmöbel, die besondere Sorge erfordern.
            </p>
            <p className="text-body mb-6">
              Die Anfrage ist kostenlos und führt zu keiner Buchungsverpflichtung. Sie können das Formular rund um die Uhr ausfüllen – unabhängig von Geschäftszeiten.
            </p>

            <h3 id="schritt-2" className="heading-3 mb-4 mt-6 scroll-mt-24">
              Schritt 2: Bis zu 5 Offerten von geprüften Umzugsfirmen erhalten
            </h3>
            <p className="text-body mb-4">
              Ihre Anfrage wird an passende, geprüfte Umzugsunternehmen in Ihrer Region weitergeleitet. In der Regel erhalten Sie innerhalb von 24 bis 48 Stunden bis zu 5 individuelle Offerten.
            </p>
            <p className="text-body mb-4">
              Alle Anbieter werden über die Plattform seriös geprüft. Dies umfasst den Firmensitz in der Schweiz und die Erbringung professioneller Dienstleistungen.
            </p>
            <p className="text-body mb-6">
              Fordern Sie jetzt mehrere Umzugsofferten an und verschaffen Sie sich einen Überblick über Preise und Leistungen.
            </p>

            <h3 id="schritt-3" className="heading-3 mb-4 mt-6 scroll-mt-24">
              Schritt 3: Offerten vergleichen und passende Firma wählen
            </h3>
            <p className="text-body mb-4">
              Vergleichen Sie die Angebote strukturiert. Eine einfache Tabelle hilft beim Überblick:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left heading-4">Kriterium</th>
                    <th className="border border-gray-300 px-4 py-2 text-left heading-4">Firma A</th>
                    <th className="border border-gray-300 px-4 py-2 text-left heading-4">Firma B</th>
                    <th className="border border-gray-300 px-4 py-2 text-left heading-4">Firma C</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-body">Gesamtpreis</td>
                    <td className="border border-gray-300 px-4 py-2 text-body"></td>
                    <td className="border border-gray-300 px-4 py-2 text-body"></td>
                    <td className="border border-gray-300 px-4 py-2 text-body"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-body">Enthaltene Leistungen</td>
                    <td className="border border-gray-300 px-4 py-2 text-body"></td>
                    <td className="border border-gray-300 px-4 py-2 text-body"></td>
                    <td className="border border-gray-300 px-4 py-2 text-body"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-body">Versicherungsschutz</td>
                    <td className="border border-gray-300 px-4 py-2 text-body"></td>
                    <td className="border border-gray-300 px-4 py-2 text-body"></td>
                    <td className="border border-gray-300 px-4 py-2 text-body"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-body">Erfahrung / Bewertungen</td>
                    <td className="border border-gray-300 px-4 py-2 text-body"></td>
                    <td className="border border-gray-300 px-4 py-2 text-body"></td>
                    <td className="border border-gray-300 px-4 py-2 text-body"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-body">Erreichbarkeit</td>
                    <td className="border border-gray-300 px-4 py-2 text-body"></td>
                    <td className="border border-gray-300 px-4 py-2 text-body"></td>
                    <td className="border border-gray-300 px-4 py-2 text-body"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-body mb-4">
              Berücksichtigen Sie nicht nur den günstigsten Preis, sondern auch Serviceumfang, Erreichbarkeit und Erfahrung des Team. Sie können direkt mit den Umzugsfirmen Kontakt aufnehmen, um Fragen zu klären oder Besichtigungen zu vereinbaren.
            </p>
            <p className="text-body mb-6">
              Der Auftrag wird erst erteilt, wenn Sie sich bewusst für eine Firma entscheiden. Es gibt keinen automatischen Vertragsabschluss über Online-Offerten.ch.
            </p>

            <h2 id="wann-einholen" className="heading-2 mb-4 mt-8 scroll-mt-24">
              Wann sollten Sie Umzugsofferten einholen?
            </h2>
            <p className="text-body mb-4">
              Eine gute Planung beginnt rechtzeitig. Wer frühzeitig Offerten einholt, vermeidet Stress, Engpässe und höhere Preise.
            </p>
            <p className="text-body mb-4">
              Die Nachfrage nach Umzugsfirmen variiert je nach Jahreszeit, Monatsende und Wochenenden. In Spitzenzeiten sind beliebte Anbieter oft ausgebucht – und die Preise steigen entsprechend.
            </p>
            <p className="text-body mb-6">
              Planen Sie frühzeitig und vergleichen Sie jetzt unverbindliche Umzugsofferten.
            </p>

            <h3 id="fruehzeitige-planung" className="heading-3 mb-4 mt-6 scroll-mt-24">
              Frühzeitige Planung für mehr Auswahl
            </h3>
            <p className="text-body mb-4">
              Holen Sie Umzugsofferten idealerweise 4 bis 8 Wochen vor dem geplanten Umzugstermin ein. In stark nachgefragten Zeiten (zum Beispiel Monats- und Jahreswechsel) ist ein längerer Vorlauf sinnvoll.
            </p>
            <p className="text-body mb-4">
              Die Vorteile der frühzeitigen Planung:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-body">
              <li>Mehr Firmen sind verfügbar</li>
              <li>Bessere Konditionen und Flexibilität bei der Wahl des Termins</li>
              <li>Weniger Stress bei der Vorbereitung</li>
              <li>Zeit für Rückfragen und Beratung</li>
            </ul>
            <p className="text-body mb-6">
              Starten Sie am besten bereits nach der Vertragsunterzeichnung für die neue Wohnung oder das neue Haus mit der Offertanfrage.
            </p>

            <h3 id="kurzfristiger-umzug" className="heading-3 mb-4 mt-6 scroll-mt-24">
              Kurzfristiger Umzug – was ist möglich?
            </h3>
            <p className="text-body mb-4">
              Auch bei kurzfristigen Umzügen können über Online-Offerten.ch rasch geeignete Anbieter gefunden werden. Bei sehr knappen Fristen ist Flexibilität beim Umzugstag oder bei den Leistungen hilfreich.
            </p>
            <p className="text-body mb-6">
              Erwähnen Sie im Anfrageformular klar, dass der Umzug dringlich ist. So können Anbieter entsprechend reagieren und verfügbare Kapazitäten anbieten.
            </p>
            <p className="text-body mb-6">
              Jetzt kurzfristig Umzugsofferten einholen und verfügbare Kapazitäten prüfen lassen.
            </p>
            <div className="mb-8">
              <img 
                src="/bilder/a37ef9fd-e196-4b29-bae7-46de33406448.webp" 
                alt="Professionelle Umzugshelfer tragen sorgfältig verpackte Möbel aus einem Haus, während sie auf dem Weg zu einem Umzugsfahrzeug sind. Im Hintergrund sind Kartons und ein Möbel-Lift sichtbar, was auf einen organisierten Umzug hinweist."
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            <h2 id="tipps-auswahl" className="heading-2 mb-4 mt-8 scroll-mt-24">
              Tipps: So wählen Sie die beste Umzugsofferte aus
            </h2>
            <p className="text-body mb-4">
              Die günstigste Offerte ist nicht immer die beste Wahl. Qualität, Zuverlässigkeit, Transparenz und Kommunikation sind beim Umzug oft wichtiger als ein paar gesparte Franken.
            </p>
            <p className="text-body mb-4">
              Mit den folgenden Praxistipps treffen Sie die richtige Wahl.
            </p>
            <p className="text-body mb-6">
              Vergleichen Sie jetzt verschiedene Umzugsofferten und nutzen Sie diese Tipps bei Ihrer Auswahl.
            </p>

            <h3 id="leistungsumfang-preis" className="heading-3 mb-4 mt-6 scroll-mt-24">
              Auf Leistungsumfang statt nur auf den Preis achten
            </h3>
            <p className="text-body mb-4">
              Offerten mit ähnlichem Preis können sehr unterschiedliche Leistungen enthalten. Das eine Angebot beinhaltet vielleicht keinen Verpackungsservice, keine Montage oder keine Reinigungsfirmen. Das andere deckt alles ab.
            </p>
            <p className="text-body mb-4">
              Nutzen Sie eine einfache Checkliste:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-body">
              <li>[ ] Transport inklusive?</li>
              <li>[ ] Verpackung und Umzugskartons enthalten?</li>
              <li>[ ] Möbelmontage und Demontage dabei?</li>
              <li>[ ] Endreinigung der alten Wohnung inbegriffen?</li>
              <li>[ ] Entsorgung organisiert?</li>
              <li>[ ] Möbellift oder Spezialist für schwere Gegenstände verfügbar?</li>
            </ul>
            <p className="text-body mb-4">
              Ein etwas höherer Preis mit umfassendem Umzugsservice kann günstiger sein als ein vermeintlich billiges Angebot mit vielen Zusatzkosten. Bei Unklarheiten schreiben Sie die Firmen direkt an und lassen Sie sich fehlende Positionen ergänzen.
            </p>

            <h3 id="erfahrungen-bewertungen" className="heading-3 mb-4 mt-6 scroll-mt-24">
              Erfahrungen, Bewertungen und Auftreten prüfen
            </h3>
            <p className="text-body mb-4">
              Achten Sie auf Bewertungen früherer Kunden, Referenzen und die Art der Kommunikation. Professionelle Anbieter reagieren zeitnah, klar und vollständig auf Anfragen.
            </p>
            <p className="text-body mb-4">
              Hinweise auf Seriosität:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-body">
              <li>Respektvoller Umgang mit Menschen</li>
              <li>Saubere Fahrzeuge und gepflegtes Material</li>
              <li>Klare Informationen ohne Ausweichen</li>
              <li>Erfahrung in der Umgebung und Region</li>
            </ul>
            <p className="text-body mb-6">
              Bei grösseren Umzügen – zum Beispiel einem Umzug in Zürich oder einem Privatumzug mit viel Inventar – vereinbaren Sie ein unverbindliches Gespräch oder eine Besichtigung vor Ort.
            </p>

            <h3 id="details-klaeren" className="heading-3 mb-4 mt-6 scroll-mt-24">
              Alle Details klären und schriftlich bestätigen lassen
            </h3>
            <p className="text-body mb-4">
              Klären Sie offene Fragen vor der Zusage:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-body">
              <li>Wer kümmert sich um die Parkbewilligung?</li>
              <li>Wie lang sind die Tragewege?</li>
              <li>Gibt es Spezialtransporte (zum Beispiel für empfindliche Möbel)?</li>
              <li>Was kostet ein Umzug bei Änderungen im Bedarf?</li>
            </ul>
            <p className="text-body mb-4">
              Melden Sie Änderungen im Umfang (mehr Möbel, zusätzliche Zimmer, Gegenstände aus dem Zuhause oder dem Keller) möglichst früh. Alle Absprachen – Rabatte, Zusatzleistungen, Terminänderungen – sollten schriftlich festgehalten werden.
            </p>
            <p className="text-body mb-6">
              Nutzen Sie Online-Offerten.ch, um verschiedene Umzugsofferten einzuholen und alles in Ruhe zu vergleichen.
            </p>

            <h2 id="fazit" className="heading-2 mb-4 mt-8 scroll-mt-24">
              Fazit: Mit der richtigen Umzugsofferte entspannt zügeln
            </h2>
            <p className="text-body mb-4">
              Eine sorgfältig geprüfte Umzugsofferte bietet Ihnen Planungssicherheit, transparente Kosten und weniger Stress am Umzugstag. Sie wissen genau, welche Leistungen Sie für Ihr Geld erhalten und können böse Überraschungen vermeiden.
            </p>
            <p className="text-body mb-4">
              Der Vergleich mehrerer Angebote ist der Schlüssel, um den passenden Umzugspartner zu finden und unnötige Kosten zu sparen. Mit einem klaren Kostendach behalten Sie Ihr Budget im Griff.
            </p>
            <p className="text-body mb-4">
              Online-Offerten.ch vereinfacht diesen Prozess: Mit einer einzigen Anfrage erhalten Sie bis zu 5 Offerten von geprüften Schweizer Zügelunternehmen. So finden Sie schnell und unkompliziert die richtige Umzugsfirma – passend zu Ihrem Ort, Ihrer Art des Umzugs und Ihren individuellen Bedürfnissen.
            </p>
            <p className="text-body mb-6 font-bold">
              Jetzt kostenlose und unverbindliche Umzugsofferten vergleichen und den passenden Umzugspartner für Ihren Umzug in der Schweiz finden.
            </p>

            {/* FAQ Section - Moved here after Fazit */}
            <UmzugsoffertenFAQSection faqItems={faqItems} />
            </div>
          </div>
        </div>
      </section>

      {/* Hero Form Section */}
      <section 
        className="relative w-full py-8 sm:py-12 md:py-16 lg:py-24 overflow-hidden bg-[#E6F6EA] lg:bg-[#dbeadf] z-20" 
        aria-label="Hero Section - Kostenlose Offerten für Umzug, Reinigung und Renovierung"
      >
        {/* Background Image - Right Side - Desktop Only */}
        <div 
          className="hidden lg:block absolute -right-60 top-0 bottom-0 w-full md:w-1/2 lg:w-[55%] h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('/image/4e73e4b7-ab5b-4e20-9412-394b5b526cf0.webp')`,
            backgroundPosition: 'right center',
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 100%)'
          }}
        ></div>
        
        {/* Gradient Overlay - White from left to right with shadow effect - Desktop Only */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent" style={{ width: '60%' }}></div>
        
        {/* White shadow/glow effect towards the image - Desktop Only */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/8 pointer-events-none"></div>
        <div 
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-full md:w-1/2 lg:w-[55%] pointer-events-none"
          style={{
            boxShadow: 'inset -70px 0 70px -35px rgba(255, 255, 255, 0.5)'
          }}
        ></div>
        
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          {/* Mobile Image - Above H1 on mobile */}
          <div className="flex items-center justify-center mb-6 lg:hidden -mx-4 sm:-mx-6">
            <NextImage 
              src="/image/4e73e4b7-ab5b-4e20-9412-394b5b526cf0.webp" 
              alt="Umzugsofferten" 
              width={600}
              height={400}
              className="w-full h-auto rounded-xl"
              loading="lazy"
              quality={85}
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </div>
          
            <div className="max-w-3xl text-left">
              <h2 className="heading-2">
                Jetzt Umzugsofferten einholen
              </h2>
            
            {/* Search Form */}
            <UmzugsoffertenHeroForm />
            
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
                      <span className="text-sm text-gray-600">Nur geprüfte Firmen</span>
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

export default UmzugsoffertenPageClient



