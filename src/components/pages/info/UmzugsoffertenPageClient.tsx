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
  ArrowRight, CheckCircle, ShieldCheck, Clock, TrendingUp, Users, Award,
  MapPin, Home, Building, Globe, Package, ArrowUpDown
} from 'lucide-react'
import { PiPianoKeysFill } from 'react-icons/pi'
import UmzugsoffertenHeroForm from './UmzugsoffertenHeroForm'

// Lazy load heavy sections for better Core Web Vitals
const UmzugsoffertenFAQSection = dynamic(
  () => import('./UmzugsoffertenFAQSection'),
  { 
    ssr: true,
    loading: () => (
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-muted rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 dark:bg-muted rounded w-1/2 mx-auto"></div>
              <div className="space-y-3 mt-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-100 dark:bg-muted/50 rounded"></div>
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
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-200 dark:bg-muted rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 dark:bg-muted rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-muted rounded w-5/6"></div>
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
      <section className="relative py-12 md:py-16 overflow-hidden bg-gray-100 dark:bg-background">
        <div className="absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-gray-100 dark:bg-background"></div>
        </div>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-emerald-950/45 rounded-full text-green-700 dark:text-emerald-300 font-semibold text-sm mb-3 border border-green-200/60 dark:border-emerald-800">
                <MapPin className="h-4 w-4 mr-2" />
                Umzugsofferten kostenlos vergleichen
              </div>
              <h1 className="heading-1 !mt-0">
                Umzugsofferten kostenlos vergleichen » Bis zu 40% sparen
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed">
                Fordern Sie in nur 5 Minuten bis zu 5 kostenlose Offerten von geprüften Umzugsfirmen an und sparen Sie bares Geld bei Ihrem Umzug.
              </p>
              
              {/* Umzug Type Buttons */}
              <p className="text-sm font-semibold text-foreground mb-2">Wählen Sie Ihre gewünschte Dienstleistung aus:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 mb-6">
                {/* Privatumzug */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=privatumzug"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-card border-border hover:border-blue-500 dark:hover:border-sky-500 hover:bg-blue-50 dark:hover:bg-sky-950/35 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue-100 dark:bg-sky-950/50 group-hover:bg-blue-500 dark:group-hover:bg-sky-600 transition-colors">
                    <Home className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-sky-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-foreground">Privatumzug</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Wohnungsumzug</p>
                  </div>
                </Link>
                
                {/* Geschäftsumzug */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=geschaeftsumzug"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-card border-border hover:border-purple-500 dark:hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-purple-100 dark:bg-purple-950/45 group-hover:bg-purple-500 dark:group-hover:bg-purple-600 transition-colors">
                    <Building className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-300 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-foreground">Geschäftsumzug</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Firmenumzug</p>
                  </div>
                </Link>
                
                {/* International */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=international"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-card border-border hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-emerald-100 dark:bg-emerald-950/45 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-600 transition-colors">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-foreground">Auslandumzug</p>
                    <p className="text-xs text-muted-foreground mt-0.5">International</p>
                  </div>
                </Link>
                
                {/* Klaviertransport */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=klaviertransport&special_transport_type=klaviertransport"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-card border-border hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-amber-100 dark:bg-amber-950/40 group-hover:bg-amber-500 dark:group-hover:bg-amber-600 transition-colors">
                    <PiPianoKeysFill className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-foreground">Klaviertransport</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Piano & Flügel</p>
                  </div>
                </Link>
                
                {/* Kleintransport */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=kleintransport"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-card border-border hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950/30 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-teal-100 dark:bg-teal-950/45 group-hover:bg-teal-500 dark:group-hover:bg-teal-600 transition-colors">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 dark:text-teal-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-foreground">Kleintransport</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Einzelne Gegenstände</p>
                  </div>
                </Link>
                
                {/* Lagerung */}
                <Link 
                  href="/kostenlose-offerte-anfordern?service=umzug&step=3&umzugArt=lagerung"
                  className="w-full flex items-center gap-2 sm:flex-col sm:items-center sm:text-center p-2.5 sm:p-3 border-2 rounded-lg transition-all duration-300 bg-card border-border hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:shadow-md group"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-indigo-100 dark:bg-indigo-950/45 group-hover:bg-indigo-500 dark:group-hover:bg-indigo-600 transition-colors">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-left sm:text-center">
                    <p className="font-semibold text-sm sm:text-base text-foreground">Lagerung</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Möbel einlagern</p>
                  </div>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-foreground/90">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-emerald-400 mr-2" />
                  <span>Versicherte Firmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-emerald-400 mr-2" />
                  <span>100% kostenlos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-emerald-400 mr-2" />
                  <span>Angebote von geprüften Partnern</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-emerald-400 mr-2" />
                  <span>Jetzt kostenlose Offerten anfordern</span>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative md:col-span-2">
              <div className="relative w-full h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center">
                <NextImage
                  src="/fotos/offerten.webp"
                  alt="Umzugsofferten vergleichen Schweiz"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-2xl shadow-lg object-cover"
                  loading="eager"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Table of Contents - Mobile: Sticky at top, Desktop: Left Sidebar */}
            <aside 
              ref={tocRef}
              className="lg:col-span-4"
            >
              {/* Mobile TOC - Sticky below navbar */}
              <div className="lg:hidden sticky top-[80px] z-[2999] mb-6 bg-background border-b border-border pb-4 -mx-4 px-4">
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex space-x-2 min-w-max py-2">
                    {tocItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToHeading(item.id)}
                        className={`px-4 py-2 rounded-md transition-colors text-sm whitespace-nowrap flex-shrink-0 ${
                          activeId === item.id
                            ? 'bg-green-100 dark:bg-emerald-950/45 text-green-700 dark:text-emerald-300 font-semibold'
                            : 'bg-muted text-foreground/80 hover:bg-muted/80 dark:hover:bg-muted'
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
                <Card className="border border-border rounded-xl shadow-sm bg-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-foreground">
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
                              ? 'bg-green-100 dark:bg-emerald-950/45 text-green-700 dark:text-emerald-300 font-semibold'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
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
            <p className="text-body mb-4">
              Sie geben Ihre Umzugsdetails einmal ein und erhalten bis zu 5 kostenlose Offerten von geprueften Firmen. Danach vergleichen Sie Preise, Leistungen und Verfuegbarkeit in Ruhe.
            </p>
            <ol className="list-decimal list-inside space-y-2 mb-8 text-body">
              <li>Umzugsdaten und Wuensche im Formular erfassen.</li>
              <li>Innerhalb von 24-48 Stunden Angebote erhalten.</li>
              <li>Beste Offerte waehlen und direkt mit der Firma abstimmen.</li>
            </ol>

            <h2 id="umzugsofferte-vergleich" className="heading-2 mb-4 mt-8 scroll-mt-24">
              Umzugsofferte - warum sich der Vergleich fuer Sie lohnt
            </h2>
            <p className="text-body mb-4">
              Preis und Leistungsumfang unterscheiden sich je nach Anbieter deutlich. Durch den Vergleich sehen Sie, welche Offerte wirklich zu Ihrem Budget und Ihrem Umzug passt.
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted/50 dark:bg-muted/30">
                    <th className="border border-border px-4 py-2 text-left heading-4">Vorteil</th>
                    <th className="border border-border px-4 py-2 text-left heading-4">Nutzen</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-2 text-body">Bessere Preise</td>
                    <td className="border border-border px-4 py-2 text-body">Mehr Wettbewerb fuehrt oft zu besseren Konditionen.</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 text-body">Mehr Transparenz</td>
                    <td className="border border-border px-4 py-2 text-body">Sie erkennen klar, welche Leistungen enthalten sind.</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 text-body">Mehr Sicherheit</td>
                    <td className="border border-border px-4 py-2 text-body">Sie entscheiden auf Basis von Preis, Service und Bewertungen.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mb-8 bg-gradient-to-br from-teal-700 to-green-800 dark:from-teal-900 dark:to-emerald-950 rounded-xl p-6 md:p-8 shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-green-100 dark:text-emerald-100 mb-3">
                  Jetzt Umzugsofferten vergleichen und kostenlos Angebote erhalten
                </h3>
                <p className="text-green-50 dark:text-emerald-50/95 text-base md:text-lg">
                  Eine Anfrage, mehrere passende Anbieter aus Ihrer Region.
                </p>
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={handleCtaClick}
                  className="bg-[#eab308] hover:bg-[#ca8a04] text-[#000000] font-medium px-8 py-4 rounded-lg text-sm leading-[20px] shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  Umzugsfirmen vergleichen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mb-8">
              <img 
                src="/bilder/f4203971-365f-48a9-8afc-53246f91f929.webp" 
                alt="Umzugshelfer laden Kartons und Moebel in einen Transporter."
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            <h2 id="was-ist-umzugsofferte" className="heading-2 mb-4 mt-8 scroll-mt-24">
              Was ist eine Umzugsofferte genau?
            </h2>
            <p className="text-body mb-4">
              Eine Umzugsofferte ist ein schriftliches Angebot mit Preis, Leistungsumfang, Termin und Bedingungen. Sie schafft eine klare Grundlage fuer Ihre Entscheidung.
            </p>
            <p className="text-body mb-8">
              Achten Sie auf eine saubere Aufschluesselung, Gueltigkeitsdauer und transparente Angaben zu Versicherung und Zusatzkosten.
            </p>

            <h2 id="transparente-offerte" className="heading-2 mb-4 mt-8 scroll-mt-24">
              Welche Punkte sollte eine transparente Umzugsofferte enthalten?
            </h2>
            <ul className="list-disc list-inside space-y-2 mb-8 text-body">
              <li>Gesamtpreis mit klarer Aufschluesselung</li>
              <li>Leistungen wie Transport, Montage, Packservice und Reinigung</li>
              <li>Versicherung und Haftungsdetails</li>
              <li>Teamgroesse, Zeitfenster, Fahrzeugangaben</li>
              <li>Zahlungs- und Stornobedingungen</li>
            </ul>

            <h2 id="vergleich-funktioniert" className="heading-2 mb-4 mt-8 scroll-mt-24">
              So funktioniert der Vergleich von Umzugsofferten auf Online-Offerten.ch
            </h2>
            <p className="text-body mb-4">
              Sie erfassen Ihre Daten nur einmal. Danach erhalten Sie passende Offerten von geprueften Partnern und vergleichen diese nach den fuer Sie wichtigsten Kriterien.
            </p>
            <p className="text-body mb-8">
              Der Service ist kostenlos, unverbindlich und ohne automatische Buchung.
            </p>
            <div className="mb-8">
              <img 
                src="/fotos/moving.png"
                alt="Umzug in der Schweiz mit professioneller Planung und Umzugsservice."
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            <h2 id="wann-einholen" className="heading-2 mb-4 mt-8 scroll-mt-24">
              Wann sollten Sie Umzugsofferten einholen?
            </h2>
            <ul className="list-disc list-inside space-y-2 mb-8 text-body">
              <li>Ideal: 4-6 Wochen vor dem Umzug</li>
              <li>Bei Auslandsumzuegen: frueher planen</li>
              <li>In Spitzenzeiten (Sommer/Monatsende) moeglichst frueh anfragen</li>
              <li>Kurzfristig ist moeglich, Auswahl kann aber kleiner sein</li>
            </ul>

            <h2 id="tipps-auswahl" className="heading-2 mb-4 mt-8 scroll-mt-24">
              Tipps: So waehlen Sie die beste Umzugsofferte aus
            </h2>
            <ul className="list-disc list-inside space-y-2 mb-8 text-body">
              <li>Nicht nur den Endpreis vergleichen, sondern das Gesamtpaket.</li>
              <li>Unklare Positionen immer vorab schriftlich klaeren.</li>
              <li>Bewertungen, Kommunikation und Zuverlaessigkeit mitbewerten.</li>
              <li>Bei groesseren Umzuegen eine Besichtigung vor Ort einplanen.</li>
            </ul>
            <div className="mb-8">
              <img 
                src="/fotos/umzugstag.webp"
                alt="Vorbereiteter Umzugstag mit Kartons und klarer Terminplanung."
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            <h2 id="fazit" className="heading-2 mb-4 mt-8 scroll-mt-24">
              Fazit: Mit der richtigen Umzugsofferte entspannt zuegeln
            </h2>
            <p className="text-body mb-4">
              Wer mehrere Offerten strukturiert vergleicht, spart haeufig Kosten und reduziert Stress. Sie treffen Ihre Entscheidung auf Basis klarer Daten statt auf Vermutungen.
            </p>
            <p className="text-body mb-6 font-bold">
              Jetzt kostenlos anfragen und bis zu 5 passende Umzugsofferten aus Ihrer Region vergleichen.
            </p>

            {/* FAQ Section - Moved here after Fazit */}
            <UmzugsoffertenFAQSection faqItems={faqItems} />
            </div>
          </div>
        </div>
      </section>

      {/* Hero Form Section */}
      <section 
        className="relative w-full py-8 sm:py-12 md:py-16 lg:py-24 overflow-hidden bg-[#E6F6EA] lg:bg-[#dbeadf] dark:bg-emerald-950/40 dark:lg:bg-emerald-950/35 z-20" 
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
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent dark:from-background dark:via-background/80 dark:to-transparent" style={{ width: '60%' }}></div>
        
        {/* White shadow/glow effect towards the image - Desktop Only */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/8 dark:to-background/20 pointer-events-none"></div>
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
                className="bg-card rounded-xl border border-border p-5 sm:p-6 flex flex-col md:flex-row md:items-start items-start gap-4 transition-all duration-300 mt-6"
                style={{
                  boxShadow: '-4px 0 8px -2px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="flex-1 pt-1 w-full md:w-auto">
                  {/* Trust Badges */}
                  <div className="flex flex-wrap justify-start items-center gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-emerald-400" />
                      <span className="text-sm text-muted-foreground">Kostenlos & unverbindlich</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-green-600 dark:text-emerald-400" />
                      <span className="text-sm text-muted-foreground">Nur geprüfte Firmen</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600 dark:text-emerald-400" />
                      <span className="text-sm text-muted-foreground">Bis zu 40% sparen</span>
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



