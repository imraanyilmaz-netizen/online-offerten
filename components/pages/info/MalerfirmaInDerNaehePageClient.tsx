'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  ArrowRight, CheckCircle, ShieldCheck, Clock, TrendingUp, Users, Award, 
  Star, Calculator, MapPin, Home, Building, Paintbrush, Palette, Sparkles,
  HelpCircle, Info, FileText, Search, HeartHandshake, Zap, Target, 
  Brush, Droplets, Wrench, Shield, Phone, Mail, Calendar, Layers, Navigation2, Route
} from 'lucide-react'

const MalerfirmaInDerNaehePageClient = () => {
  const router = useRouter()
  const canonicalUrl = 'https://online-offerten.ch/malerfirma-in-der-naehe'

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
              "name": "Malerfirma in der Nähe",
              "item": canonicalUrl
            }
          ]
        },
        {
          "@type": "Service",
          "name": "Malerfirma in der Nähe finden",
          "serviceType": "Malerarbeiten",
          "description": "Finden Sie die besten lokalen Malerbetriebe. Vergleichen Sie bis zu 5 kostenlose Offerten von geprüften Maleranbietern in Ihrer Region für Innenanstrich, Aussenanstrich, Fassadenanstrich und mehr.",
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
            "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=maler&step=2",
            "priceCurrency": "CHF",
            "price": "0",
            "name": "Kostenlose Malerfirma Offerten in der Nähe"
          }
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://online-offerten.ch/#organization",
          "name": "Online-Offerten.ch",
          "url": "https://online-offerten.ch",
          "logo": "https://online-offerten.ch/image/logo.png",
          "description": "Vergleichsportal für Malerfirmen in der Schweiz",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "CH"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Switzerland"
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Wie finde ich eine Malerfirma in der Nähe?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Um lokale Malerbetriebe zu finden, können Sie unser kostenloses Vergleichsportal nutzen. Füllen Sie einfach das Online-Formular aus und beschreiben Sie Ihre Malerarbeiten-Anforderungen. Wir vermitteln Ihnen dann bis zu 5 geprüfte Maleranbieter aus Ihrer Region, die sich direkt bei Ihnen melden und Ihnen individuelle Offerten erstellen."
              }
            },
            {
              "@type": "Question",
              "name": "Wie viel kostet eine Malerfirma?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Die Kosten für einen Malerservice hängen von verschiedenen Faktoren ab: Art der Malerarbeiten (Innenanstrich, Aussenanstrich, Fassadenanstrich), Grösse der zu streichenden Fläche, Anzahl der Stockwerke, benötigte Vorarbeiten und verwendete Materialien. Ein durchschnittlicher Innenanstrich in der Schweiz kostet zwischen 15 und 35 CHF pro Quadratmeter. Der beste Weg, um faire Preise zu finden, ist der Vergleich mehrerer Offerten von verschiedenen lokalen Malerbetrieben."
              }
            },
            {
              "@type": "Question",
              "name": "Warum sollte ich eine Malerfirma in der Nähe wählen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ein Malerservice vor Ort bietet mehrere Vorteile: Kürzere Anfahrtswege reduzieren die Kosten, lokale Expertise über örtliche Gegebenheiten und bauliche Besonderheiten, schnellere Reaktionszeiten bei Notfällen, persönlicherer Service und bessere Erreichbarkeit. Regionale Malerbetriebe kennen die örtlichen Gegebenheiten besonders gut."
              }
            },
            {
              "@type": "Question",
              "name": "Wie viele Offerten erhalte ich von Malerfirmen in meiner Nähe?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sie erhalten bis zu 5 kostenlose und unverbindliche Offerten von qualitätsgeprüften Maleranbietern aus Ihrer Region. Nachdem Sie das Formular ausgefüllt haben, nehmen die lokalen Malerbetriebe direkt Kontakt mit Ihnen auf (per Telefon oder E-Mail) und erstellen Ihnen eine individuelle Offerte. In Ballungsgebieten wie Zürich, Basel oder Bern erhalten Sie meist alle 5 Offerten, in ländlicheren Regionen können es auch 3-4 Offerten sein."
              }
            },
            {
              "@type": "Question",
              "name": "Wie lange im Voraus sollte ich eine Malerfirma in der Nähe buchen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wir empfehlen, mindestens 2-4 Wochen im Voraus zu buchen, besonders für grössere Projekte wie Fassadenanstrich oder komplette Wohnungsrenovationen. Frühzeitige Buchung gibt Ihnen mehr Auswahl bei lokalen Maleranbietern und oft auch bessere Preise. Last-Minute-Buchungen sind oft deutlich teurer und die Auswahl an verfügbaren Malerbetrieben ist begrenzt."
              }
            },
            {
              "@type": "Question",
              "name": "Sind die Malerfirmen in meiner Nähe versichert?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, alle Malerbetriebe in unserem Netzwerk sind geprüft und verfügen über eine gültige Betriebshaftpflichtversicherung. Wir prüfen alle Partnerfirmen vor der Aufnahme in unser Netzwerk auf Versicherungen, Lizenzen und Referenzen. Die Versicherungsdetails sind in der Regel in den Offerten enthalten, falls nicht, sollten Sie danach fragen."
              }
            }
          ]
        }
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schemaData)
    script.id = 'malerfirma-in-der-naehe-schema'
    
    const existing = document.getElementById('malerfirma-in-der-naehe-schema')
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
      const scriptToRemove = document.getElementById('malerfirma-in-der-naehe-schema')
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
    router.push('/kostenlose-offerte-anfordern?service=maler&step=2')
  }

  const features = [
    {
      icon: MapPin,
      title: 'Lokale Malerfirmen',
      description: 'Finden Sie geprüfte Malerfirmen direkt in Ihrer Region'
    },
    {
      icon: ShieldCheck,
      title: '100% kostenlos & unverbindlich',
      description: 'Keine Gebühren, keine versteckten Kosten, keine Verpflichtungen'
    },
    {
      icon: TrendingUp,
      title: 'Bis zu 40% sparen',
      description: 'Durch den Vergleich mehrerer lokaler Malerfirmen finden Sie die besten Preise'
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
      icon: Navigation2,
      title: 'Regionale Expertise',
      description: 'Lokale Malerfirmen kennen die örtlichen Gegebenheiten besonders gut'
    }
  ]

  const faqItems = [
    {
      q: "Wie finde ich eine Malerfirma in der Nähe?",
      a: "Um lokale Malerbetriebe zu finden, können Sie unser kostenloses Vergleichsportal nutzen. Füllen Sie einfach das Online-Formular aus und beschreiben Sie Ihre Malerarbeiten-Anforderungen. Wir vermitteln Ihnen dann bis zu 5 geprüfte Maleranbieter aus Ihrer Region, die sich direkt bei Ihnen melden und Ihnen individuelle Offerten erstellen. Die regionalen Malerbetriebe kennen die örtlichen Gegebenheiten besonders gut."
    },
    {
      q: "Wie viel kostet eine Malerfirma?",
      a: "Die Kosten für einen Malerservice hängen von verschiedenen Faktoren ab: Art der Malerarbeiten (Innenanstrich, Aussenanstrich, Fassadenanstrich), Grösse der zu streichenden Fläche, Anzahl der Stockwerke, benötigte Vorarbeiten (Spachteln, Grundieren) und verwendete Materialien. Ein durchschnittlicher Innenanstrich in der Schweiz kostet zwischen 15 und 35 CHF pro Quadratmeter. Fassadenanstrich kann zwischen 30 und 80 CHF pro Quadratmeter kosten. Der beste Weg, um faire Preise zu finden, ist der Vergleich mehrerer Offerten von verschiedenen lokalen Malerbetrieben. Durch den Vergleich können Sie bis zu 40% sparen."
    },
    {
      q: "Wie viel Geld muss man für Malerarbeiten einplanen?",
      a: "Für Malerarbeiten sollten Sie je nach Art und Grösse folgende Budgets einplanen: Innenanstrich (3.5-Zimmer-Wohnung, 95 m²): 1.400-3.300 CHF, Innenanstrich (4.5-Zimmer-Wohnung, 120 m²): 1.800-4.200 CHF, Fassadenanstrich (Einfamilienhaus, 200 m²): 6.000-16.000 CHF, Aussenanstrich (Wohnung, 80 m²): 2.400-6.400 CHF. Zusätzlich sollten Sie 10-20% Reserve für unvorhergesehene Kosten einplanen. Durch den Vergleich mehrerer Offerten von regionalen Malerbetrieben können Sie bis zu 40% sparen."
    },
    {
      q: "Wie teuer ist eine Malerfirma in der Schweiz?",
      a: "Die Preise für Malerbetriebe in der Schweiz variieren je nach Region und Art der Malerarbeiten. In Ballungsgebieten wie Zürich, Basel oder Genf sind die Preise oft höher als in ländlicheren Regionen. Ein durchschnittlicher Innenanstrich kostet zwischen 15 und 35 CHF pro Quadratmeter. Durch den Vergleich mehrerer Offerten von Maleranbietern in Ihrer Region finden Sie die besten Preise und können erheblich sparen. Lokale Malerbetriebe können oft günstigere Preise anbieten, da sie kürzere Anfahrtswege haben."
    },
    {
      q: "Wie viel zahlt man für Malerarbeiten?",
      a: "Die Kosten für Malerarbeiten hängen von mehreren Faktoren ab. Ein Innenanstrich (3.5-Zimmer-Wohnung, 95 m²) kostet durchschnittlich 1.400-3.300 CHF, ein Fassadenanstrich (Einfamilienhaus, 200 m²) 6.000-16.000 CHF. Zusätzliche Kosten können für Vorarbeiten (Spachteln, Grundieren), spezielle Farben oder schwierige Zugänglichkeiten anfallen. Der Vergleich mehrerer Offerten von Maleranbietern vor Ort hilft Ihnen, die besten Preise zu finden."
    },
    {
      q: "Warum sollte ich eine Malerfirma in der Nähe wählen?",
      a: "Ein Malerservice vor Ort bietet mehrere Vorteile: Kürzere Anfahrtswege reduzieren die Kosten und Umweltbelastung, lokale Expertise über örtliche Gegebenheiten und bauliche Besonderheiten, schnellere Reaktionszeiten bei Notfällen oder kurzfristigen Änderungen, persönlicherer Service und bessere Erreichbarkeit, sowie Unterstützung der lokalen Wirtschaft. Regionale Malerbetriebe kennen die örtlichen Gegebenheiten besonders gut und können flexibler auf Ihre Bedürfnisse eingehen."
    },
    {
      q: "Wie viele Offerten erhalte ich von Malerfirmen in meiner Nähe?",
      a: "Sie erhalten bis zu 5 kostenlose und unverbindliche Offerten von qualitätsgeprüften Maleranbietern aus Ihrer Region. Nachdem Sie das Formular ausgefüllt haben, nehmen die lokalen Malerbetriebe direkt Kontakt mit Ihnen auf (per Telefon oder E-Mail) und erstellen Ihnen eine individuelle Offerte. In Ballungsgebieten wie Zürich, Basel oder Bern erhalten Sie meist alle 5 Offerten, in ländlicheren Regionen können es auch 3-4 Offerten sein. Jede Offerte wird individuell auf Ihre Bedürfnisse zugeschnitten."
    },
    {
      q: "Ist der Service wirklich kostenlos?",
      a: "Ja, unser Service ist für Sie als anfragende Person zu 100% kostenlos und unverbindlich. Sie erhalten bis zu 5 Offerten von geprüften Maleranbietern in Ihrer Region, ohne dafür etwas zu bezahlen. Es gibt keine versteckten Gebühren oder Verpflichtungen. Sie entscheiden selbst, ob und welche Offerte Sie annehmen möchten. Die Malerfirmen zahlen eine kleine Gebühr, wenn Sie deren Offerte annehmen – für Sie bleibt der Service komplett kostenlos."
    },
    {
      q: "Wie wird die Qualität der Malerfirmen sichergestellt?",
      a: "Wir arbeiten nur mit geprüften und versicherten Partnerfirmen zusammen. Alle Malerbetriebe in unserem Netzwerk durchlaufen einen strengen Prüfprozess, der Versicherungen, Lizenzen und Referenzen umfasst. Zusätzlich können Sie die Bewertungen anderer Kunden einsehen, um sich ein umfassendes Bild von der Qualität der Dienstleistung zu machen. Unsere Partner sind etablierte Maleranbieter mit langjähriger Erfahrung. Wir überprüfen regelmässig die Qualität unserer Partnerfirmen."
    },
    {
      q: "Wie lange im Voraus sollte ich eine Malerfirma in der Nähe buchen?",
      a: "Wir empfehlen, mindestens 2-4 Wochen im Voraus zu buchen, besonders für grössere Projekte wie Fassadenanstrich oder komplette Wohnungsrenovationen. Frühzeitige Buchung gibt Ihnen mehr Auswahl bei lokalen Maleranbietern und oft auch bessere Preise. Last-Minute-Buchungen sind oft deutlich teurer und die Auswahl an verfügbaren Malerbetrieben ist begrenzt. Planen Sie Ihre Malerarbeiten frühzeitig und fordern Sie rechtzeitig Offerten an."
    },
    {
      q: "Was sollte eine gute Offerte einer Malerfirma enthalten?",
      a: "Eine professionelle Offerte sollte folgende Informationen enthalten: Gesamtpreis mit detaillierter Aufschlüsselung, alle enthaltenen Leistungen (welche Räume, welche Malerarbeiten), verwendete Farben und Materialien, Dauer der Arbeiten, Versicherungsschutz, Arbeitsbeginn und Zeitfenster, Zahlungsbedingungen und Garantien. Achten Sie darauf, dass alle Leistungen schriftlich festgehalten sind. Eine seriöse Malerfirma bietet transparente Offerten ohne versteckte Kosten."
    },
    {
      q: "Bieten Malerfirmen auch Spezialarbeiten an?",
      a: "Ja, viele Malerbetriebe bieten auch Spezialarbeiten an. Dies umfasst Tapezierarbeiten, Spachtelarbeiten, Lackierarbeiten, Fassadenrenovationen, historische Restaurierungen und mehr. Wenn Sie sowohl Standard-Malerarbeiten als auch Spezialarbeiten benötigen, kann eine Malerfirma, die beide Dienstleistungen anbietet, kosteneffizienter sein. Fragen Sie in Ihrer Anfrage nach, ob die Malerfirma auch Ihre gewünschten Spezialarbeiten anbietet."
    },
    {
      q: "Sind die Malerfirmen in meiner Nähe versichert?",
      a: "Ja, alle Malerbetriebe in unserem Netzwerk sind geprüft und verfügen über eine gültige Betriebshaftpflichtversicherung. Wir prüfen alle Partnerfirmen vor der Aufnahme in unser Netzwerk auf Versicherungen, Lizenzen und Referenzen. Die Versicherungsdetails sind in der Regel in den Offerten enthalten, falls nicht, sollten Sie danach fragen. Seriöse Maleranbieter vor Ort werden Ihnen gerne die Versicherungsnachweise zeigen."
    },
    {
      q: "Was passiert, nachdem ich eine Anfrage gesendet habe?",
      a: "Nachdem Sie das Formular ausgefüllt haben, wird Ihre Anfrage an passende Malerbetriebe in Ihrer Region weitergeleitet. Diese nehmen dann direkt Kontakt mit Ihnen auf (per Telefon oder E-Mail) und erstellen Ihnen eine individuelle Offerte. Sie erhalten in der Regel innerhalb von 24-48 Stunden die ersten Rückmeldungen von den lokalen Maleranbietern. Alle Offerten werden Ihnen direkt von den Malerbetrieben zugesendet und enthalten alle wichtigen Details wie Preis, Leistungen, Versicherungen und Kontaktinformationen."
    },
    {
      q: "Wie erkenne ich eine seriöse Malerfirma in der Nähe?",
      a: "Eine seriöse lokale Malerfirma erkennt man an mehreren Merkmalen: Sie bietet schriftliche, detaillierte Offerten mit klarer Preisaufschlüsselung, verfügt über gültige Versicherungen und kann Referenzen vorweisen, ist erreichbar und antwortet schnell auf Anfragen, kommuniziert professionell und transparent, verwendet hochwertige Farben und Materialien, und hat positive Bewertungen von anderen Kunden. Vermeiden Sie Maleranbieter, die nur mündliche Zusagen machen oder Druck ausüben."
    },
    {
      q: "Was sind die Vorteile einer regionalen Malerfirma?",
      a: "Regionale Malerbetriebe in Ihrer Nähe bieten zahlreiche Vorteile: Kürzere Anfahrtswege reduzieren Kosten und Umweltbelastung, lokale Expertise über örtliche Gegebenheiten und bauliche Besonderheiten, schnellere Reaktionszeiten bei Notfällen, persönlicherer Service und bessere Erreichbarkeit, Kenntnis der örtlichen Gegebenheiten und baulichen Besonderheiten, sowie Unterstützung der lokalen Wirtschaft. Lokale Maleranbieter können flexibler auf Ihre Bedürfnisse eingehen und vermeiden unnötige Komplikationen."
    },
    {
      q: "Wie kann ich bei einer Malerfirma in der Nähe sparen?",
      a: "Der beste Weg, um zu sparen, ist der Vergleich mehrerer Offerten. Studien zeigen, dass Kunden durch den Vergleich durchschnittlich 30-40% der Malerarbeiten-Kosten einsparen können. Weitere Sparmöglichkeiten: Flexibel beim Arbeitsbeginn sein (Nebensaison ist oft günstiger), Eigenleistung bei Vorarbeiten erbringen, mehrere Räume gleichzeitig streichen lassen (oft günstiger), frühzeitig buchen (Last-Minute-Buchungen sind teurer), und Offerten genau vergleichen - nicht nur auf den Preis achten, sondern auch auf enthaltene Leistungen und Materialqualität. Regionale Malerbetriebe können durch kürzere Anfahrtswege zusätzliche Einsparungen bieten."
    }
  ]

  const benefits = [
    {
      icon: Route,
      title: "Kürzere Anfahrtswege",
      description: "Lokale Malerbetriebe haben kürzere Anfahrtswege, was die Kosten reduziert und die Umweltbelastung minimiert."
    },
    {
      icon: Navigation2,
      title: "Lokale Expertise",
      description: "Regionale Malerfirmen kennen die örtlichen Gegebenheiten, baulichen Besonderheiten und Wetterbedingungen besonders gut."
    },
    {
      icon: Clock,
      title: "Schnellere Reaktionszeiten",
      description: "Bei Notfällen oder kurzfristigen Änderungen können regionale Malerfirmen schneller reagieren."
    },
    {
      icon: HeartHandshake,
      title: "Persönlicher Service",
      description: "Lokale Malerfirmen legen oft mehr Wert auf persönliche Beziehungen und langfristige Kundenbindung."
    },
    {
      icon: Building,
      title: "Unterstützung der lokalen Wirtschaft",
      description: "Durch die Beauftragung einer regionalen Malerfirma unterstützen Sie lokale Unternehmen."
    },
    {
      icon: ShieldCheck,
      title: "Bessere Erreichbarkeit",
      description: "Regionale Malerfirmen sind erreichbarer und reagieren schneller auf Ihre Anliegen."
    }
  ]

  const services = [
    {
      title: "Innenanstrich",
      description: "Professioneller Innenanstrich für Ihre Wohnung oder Ihr Haus. Von der Vorbereitung bis zum Finish – wir sorgen für ein perfektes Ergebnis.",
      icon: Home,
      link: "/malerarbeitenkosten"
    },
    {
      title: "Aussenanstrich",
      description: "Wetterfester Aussenanstrich für Fassaden, Balkone und Aussenbereiche. Schutz und Ästhetik in einem.",
      icon: Building,
      link: "/malerarbeitenkosten"
    },
    {
      title: "Fassadenanstrich",
      description: "Professionelle Fassadenrenovation und -anstrich. Wir geben Ihrem Gebäude ein neues, gepflegtes Erscheinungsbild.",
      icon: Layers,
      link: "/malerarbeitenkosten"
    },
    {
      title: "Tapezierarbeiten",
      description: "Professionelle Tapezierarbeiten für Ihre Wände. Von der Auswahl bis zur Montage – wir sorgen für perfekte Ergebnisse.",
      icon: Palette,
      link: "/malerarbeitenkosten"
    },
    {
      title: "Spachtelarbeiten",
      description: "Professionelle Spachtel- und Vorbereitungsarbeiten für einen makellosen Anstrich. Wir bereiten Ihre Wände perfekt vor.",
      icon: Wrench,
      link: "/malerarbeitenkosten"
    },
    {
      title: "Renovationsarbeiten",
      description: "Komplette Renovationsarbeiten inklusive Malerarbeiten. Von der Planung bis zur Umsetzung – alles aus einer Hand.",
      icon: Sparkles,
      link: "/malerarbeitenkosten"
    }
  ]

  const locations = [
    { name: "Malerfirma Zürich", link: "/malerfirma-in-der-naehe/zuerich" },
    { name: "Malerfirma Basel", link: "/malerfirma-in-der-naehe/basel" },
    { name: "Malerfirma Bern", link: "/malerfirma-in-der-naehe/bern" },
    { name: "Malerfirma Winterthur", link: "/malerfirma-in-der-naehe/winterthur" },
    { name: "Malerfirma Luzern", link: "/malerfirma-in-der-naehe/luzern" },
    { name: "Malerfirma St. Gallen", link: "/malerfirma-in-der-naehe/st-gallen" },
    { name: "Malerfirma Genf", link: "/malerfirma-in-der-naehe/genf" },
    { name: "Malerfirma Lausanne", link: "/malerfirma-in-der-naehe/lausanne" }
  ]

  return (
    <>
      {/* Hero Section - Unique Design for Painting Services */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 font-semibold text-sm mb-6">
                <MapPin className="h-4 w-4 mr-2" />
                Lokale Malerfirmen finden
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                <span className="block">Malerfirma</span>
                <span className="block text-purple-600 mt-2">in der Nähe finden</span>
                <span className="block text-2xl md:text-3xl text-gray-700 font-bold mt-4">
                  Professionelle Malerarbeiten in Ihrer Region
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                Finden Sie die <strong>beste Malerfirma in Ihrer Nähe</strong>. Vergleichen Sie <strong>bis zu 5 kostenlose Offerten</strong> von geprüften <strong>Malerbetrieben in Ihrer Region</strong> – <strong>100% kostenlos und unverbindlich</strong>. Lokale Expertise, kürzere Wege, bessere Preise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleCtaClick}
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Anfrage starten
                </Button>
                <Button
                  onClick={() => router.push('/malerarbeitenkosten')}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Malerpreise berechnen
              </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                  <span>Lokale Malerfirmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                  <span>100% kostenlos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                  <span>Nur geprüfte Firmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                  <span>Bis zu 40% sparen</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-purple-200">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-purple-100 p-4 rounded-full">
                    <Paintbrush className="h-12 w-12 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  Finden Sie Ihre Malerfirma
                </h3>
                <div className="space-y-4">
                  {features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <feature.icon className="h-6 w-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">{feature.title}</p>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          </div>
        </section>

      {/* Why Local Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Warum eine lokale Malerfirma wählen?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Regionale Malerbetriebe bieten zahlreiche Vorteile, die oft übersehen werden. Erfahren Sie, warum ein <strong>Malerservice vor Ort</strong> die beste Wahl für Ihre Malerarbeiten sein kann.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 hover:border-purple-500 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-100 p-3 rounded-lg mr-4">
                        <benefit.icon className="h-6 w-6 text-purple-600" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Welche Malerarbeiten benötigen Sie?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Verschiedene Malerbetriebe spezialisieren sich auf unterschiedliche Arten von Malerarbeiten. Finden Sie den richtigen Fachbetrieb für Ihren spezifischen Bedarf.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={service.link}>
                  <Card className="h-full hover:border-purple-500 hover:shadow-lg transition-all cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center mb-4">
                        <div className="bg-purple-100 p-3 rounded-lg mr-4">
                          <service.icon className="h-6 w-6 text-purple-600" />
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{service.description}</p>
                      <div className="mt-4 flex items-center text-purple-600 font-semibold text-sm">
                        <span>Mehr erfahren</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              So finden Sie einen Malerservice vor Ort
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              In nur 3 einfachen Schritten finden Sie die perfekten Malerbetriebe in Ihrer Region.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Anfrage ausfüllen",
                description: "Beschreiben Sie Ihre Malerarbeiten-Anforderungen in unserem Formular. Geben Sie Art der Arbeiten, Flächengrösse, gewünschten Zeitpunkt und benötigte Leistungen an. Je genauer Ihre Angaben, desto präziser sind die Offerten.",
                icon: FileText
              },
              {
                number: "02",
                title: "Offerten erhalten",
                description: "Erhalten Sie bis zu 5 Offerten von lokalen Malerbetrieben. Die Anbieter nehmen direkt Kontakt mit Ihnen auf und erstellen individuelle Offerten.",
                icon: Mail
              },
              {
                number: "03",
                title: "Vergleichen & auswählen",
                description: "Vergleichen Sie Preise, Leistungen und Bewertungen. Wählen Sie den besten Maleranbieter in Ihrer Region für Ihre Malerarbeiten aus.",
                icon: Star
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-purple-200 z-0" style={{ width: 'calc(100% - 3rem)' }} />
                )}
                <Card className="relative z-10 h-full border-2 border-purple-200 hover:border-purple-500 transition-colors">
                  <CardHeader className="text-center">
                    <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      {step.number}
                    </div>
                    <div className="flex justify-center mb-4">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <step.icon className="h-6 w-6 text-purple-600" />
                      </div>
                </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 text-center">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
            </div>
      </section>

      {/* Location Links Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Malerfirmen in Ihrer Region
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Finden Sie Malerfirmen in den grössten Städten der Schweiz. Wir vermitteln Ihnen geprüfte Partner aus Ihrer Region.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Link href={location.link}>
                  <Card className="h-full hover:border-purple-500 hover:shadow-lg transition-all cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-purple-600 mr-3" />
                        <span className="font-semibold text-gray-900">{location.name}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400 ml-auto" />
            </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Häufig gestellte Fragen (FAQ)
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Alles, was Sie über lokale Malerbetriebe wissen müssen – beantwortet von unseren Experten.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-purple-600">
                    <h4 className="faq-question">{item.q}</h4>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
                </div>
            </div>
      </section>

        {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-purple-600 to-purple-700 text-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bereit, lokale Malerbetriebe zu finden?
            </h2>
            <p className="text-xl mb-8 text-purple-50">
              Fordern Sie jetzt kostenlos und unverbindlich bis zu 5 Offerten von geprüften Maleranbietern in Ihrer Region an. Vergleichen Sie Preise und sparen Sie bis zu 40% bei Ihren Malerarbeiten.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleCtaClick}
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-xl"
              >
                <Zap className="mr-2 h-5 w-5" />
                Jetzt vergleichen
              </Button>
              <Button
                onClick={() => router.push('/malerarbeitenkosten')}
                size="lg"
                className="bg-purple-500 hover:bg-purple-400 text-white border-2 border-white text-lg px-8 py-6 shadow-lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Malerpreise berechnen
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-purple-50">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>100% kostenlos</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Unverbindlich</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Nur geprüfte Malerfirmen</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Bis zu 40% sparen</span>
            </div>
          </div>
          </motion.div>
      </div>
      </section>
    </>
  )
}

export default MalerfirmaInDerNaehePageClient
