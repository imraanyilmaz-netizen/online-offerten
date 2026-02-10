'use client'

import React, { useEffect } from 'react'
// framer-motion removed - CSS for better INP
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  ArrowRight, CheckCircle, ShieldCheck, Clock, TrendingUp, Users, Award, 
  Star, Calculator, MapPin, Home, Building, Globe, Sparkles, Droplets,
  HelpCircle, Info, FileText, Search, HeartHandshake, Zap, Target, 
  Phone, Mail, Calendar, Navigation2, Route, Sparkle, Wrench, Shield
} from 'lucide-react'

const ReinigungsfirmaInDerNaehePageClient = () => {
  const router = useRouter()
  const canonicalUrl = 'https://online-offerten.ch/reinigungsfirma-in-der-naehe'

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
              "name": "Reinigungsfirma in der Nähe",
              "item": canonicalUrl
            }
          ]
        },
        {
          "@type": "Service",
          "name": "Reinigungsfirma in der Nähe finden",
          "serviceType": "Reinigungsservice",
          "description": "Finden Sie die besten lokalen Reinigungsunternehmen. Vergleichen Sie bis zu 5 kostenlose Offerten von geprüften Reinigungsanbietern in Ihrer Region für Büroreinigung, Haushaltsreinigung und mehr.",
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
            "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=reinigung&step=2",
            "priceCurrency": "CHF",
            "price": "0",
            "name": "Kostenlose Reinigungsfirma Offerten in der Nähe"
          }
        },
        {
          "@type": "LocalBusiness",
          "@id": "https://online-offerten.ch/#organization",
          "name": "Online-Offerten.ch",
          "url": "https://online-offerten.ch",
          "logo": "https://online-offerten.ch/image/logo.png",
          "description": "Vergleichsportal für Reinigungsfirmen in der Schweiz",
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
              "name": "Wie finde ich eine Reinigungsfirma in der Nähe?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Um lokale Reinigungsunternehmen zu finden, können Sie unser kostenloses Vergleichsportal nutzen. Füllen Sie einfach das Online-Formular aus und beschreiben Sie Ihre Reinigungsanforderungen. Wir vermitteln Ihnen dann bis zu 5 geprüfte Reinigungsanbieter aus Ihrer Region, die sich direkt bei Ihnen melden und Ihnen individuelle Offerten erstellen."
              }
            },
            {
              "@type": "Question",
              "name": "Wie viel kostet eine Reinigungsfirma?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Die Kosten für einen Reinigungsservice hängen von verschiedenen Faktoren ab: Art der Reinigung (Büroreinigung, Haushaltsreinigung, Endreinigung), Grösse der zu reinigenden Fläche, Häufigkeit der Reinigung und benötigte Leistungen. Eine durchschnittliche Wohnungsreinigung in der Schweiz kostet zwischen 500 und 1.200 CHF. Der beste Weg, um faire Preise zu finden, ist der Vergleich mehrerer Offerten von verschiedenen lokalen Reinigungsunternehmen."
              }
            },
            {
              "@type": "Question",
              "name": "Warum sollte ich eine Reinigungsfirma in der Nähe wählen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ein Reinigungsservice vor Ort bietet mehrere Vorteile: Kürzere Anfahrtswege reduzieren die Kosten, lokale Expertise über örtliche Gegebenheiten, schnellere Reaktionszeiten bei Notfällen, persönlicherer Service und bessere Erreichbarkeit. Regionale Reinigungsunternehmen kennen die örtlichen Gegebenheiten besonders gut."
              }
            },
            {
              "@type": "Question",
              "name": "Wie viele Offerten erhalte ich von Reinigungsfirmen in meiner Nähe?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sie erhalten bis zu 5 kostenlose und unverbindliche Offerten von qualitätsgeprüften Reinigungsanbietern aus Ihrer Region. Nachdem Sie das Formular ausgefüllt haben, nehmen die lokalen Reinigungsunternehmen direkt Kontakt mit Ihnen auf (per Telefon oder E-Mail) und erstellen Ihnen eine individuelle Offerte. In Ballungsgebieten wie Zürich, Basel oder Bern erhalten Sie meist alle 5 Offerten, in ländlicheren Regionen können es auch 3-4 Offerten sein."
              }
            },
            {
              "@type": "Question",
              "name": "Wie lange im Voraus sollte ich eine Reinigungsfirma in der Nähe buchen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wir empfehlen, mindestens 1-2 Wochen im Voraus zu buchen, besonders für Endreinigungen oder regelmässige Reinigungen. Frühzeitige Buchung gibt Ihnen mehr Auswahl bei lokalen Reinigungsanbietern und oft auch bessere Preise. Last-Minute-Buchungen sind oft deutlich teurer und die Auswahl an verfügbaren Reinigungsunternehmen ist begrenzt."
              }
            },
            {
              "@type": "Question",
              "name": "Sind die Reinigungsfirmen in meiner Nähe versichert?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, alle Reinigungsunternehmen in unserem Netzwerk sind geprüft und verfügen über eine gültige Betriebshaftpflichtversicherung. Wir prüfen alle Partnerfirmen vor der Aufnahme in unser Netzwerk auf Versicherungen, Lizenzen und Referenzen. Die Versicherungsdetails sind in der Regel in den Offerten enthalten, falls nicht, sollten Sie danach fragen."
              }
            }
          ]
        }
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schemaData)
    script.id = 'reinigungsfirma-in-der-naehe-schema'
    
    const existing = document.getElementById('reinigungsfirma-in-der-naehe-schema')
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
      const scriptToRemove = document.getElementById('reinigungsfirma-in-der-naehe-schema')
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
    router.push('/kostenlose-offerte-anfordern?service=reinigung&step=2')
  }

  const features = [
    {
      icon: MapPin,
      title: 'Lokale Reinigungsfirmen',
      description: 'Finden Sie geprüfte Reinigungsfirmen direkt in Ihrer Region'
    },
    {
      icon: ShieldCheck,
      title: '100% kostenlos & unverbindlich',
      description: 'Keine Gebühren, keine versteckten Kosten, keine Verpflichtungen'
    },
    {
      icon: TrendingUp,
      title: 'Bis zu 40% sparen',
      description: 'Durch den Vergleich mehrerer lokaler Reinigungsfirmen finden Sie die besten Preise'
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
      description: 'Lokale Reinigungsfirmen kennen die örtlichen Gegebenheiten besonders gut'
    }
  ]

  const faqItems = [
    {
      q: "Wie finde ich eine Reinigungsfirma in der Nähe?",
      a: "Um lokale Reinigungsunternehmen zu finden, können Sie unser kostenloses Vergleichsportal nutzen. Füllen Sie einfach das Online-Formular aus und beschreiben Sie Ihre Reinigungsanforderungen. Wir vermitteln Ihnen dann bis zu 5 geprüfte Reinigungsanbieter aus Ihrer Region, die sich direkt bei Ihnen melden und Ihnen individuelle Offerten erstellen. Die regionalen Reinigungsunternehmen kennen die örtlichen Gegebenheiten besonders gut."
    },
    {
      q: "Wie viel kostet eine Reinigungsfirma?",
      a: "Die Kosten für einen Reinigungsservice hängen von verschiedenen Faktoren ab: Art der Reinigung (Büroreinigung, Haushaltsreinigung, Endreinigung), Grösse der zu reinigenden Fläche, Häufigkeit der Reinigung und benötigte Leistungen. Eine durchschnittliche Wohnungsreinigung in der Schweiz kostet zwischen 500 und 1.200 CHF. Büroreinigung kann zwischen 200 und 800 CHF pro Reinigung kosten. Der beste Weg, um faire Preise zu finden, ist der Vergleich mehrerer Offerten von verschiedenen lokalen Reinigungsunternehmen. Durch den Vergleich können Sie bis zu 40% sparen."
    },
    {
      q: "Wie viel Geld muss man für eine Reinigung einplanen?",
      a: "Für eine Reinigung sollten Sie je nach Art und Grösse folgende Budgets einplanen: Wohnungsreinigung (1.5-2.5 Zimmer): 500-800 CHF, Wohnungsreinigung (3.5 Zimmer): 800-1.100 CHF, Wohnungsreinigung (4.5 Zimmer): 950-1.300 CHF, Büroreinigung (klein): 200-400 CHF, Büroreinigung (mittel): 400-600 CHF, Büroreinigung (gross): 600-800 CHF. Zusätzlich sollten Sie 10-20% Reserve für unvorhergesehene Kosten einplanen. Durch den Vergleich mehrerer Offerten von regionalen Reinigungsunternehmen können Sie bis zu 40% sparen."
    },
    {
      q: "Wie teuer ist eine Reinigungsfirma in der Schweiz?",
      a: "Die Preise für Reinigungsunternehmen in der Schweiz variieren je nach Region und Art der Reinigung. In Ballungsgebieten wie Zürich, Basel oder Genf sind die Preise oft höher als in ländlicheren Regionen. Eine durchschnittliche Wohnungsreinigung kostet zwischen 500 und 1.200 CHF. Durch den Vergleich mehrerer Offerten von Reinigungsanbietern in Ihrer Region finden Sie die besten Preise und können erheblich sparen. Lokale Reinigungsunternehmen können oft günstigere Preise anbieten, da sie kürzere Anfahrtswege haben."
    },
    {
      q: "Wie viel zahlt man für eine Reinigung?",
      a: "Die Kosten für eine Reinigung hängen von mehreren Faktoren ab. Eine Wohnungsreinigung (1.5-2.5 Zimmer) kostet durchschnittlich 500-800 CHF, eine Wohnungsreinigung (3.5 Zimmer) 800-1.100 CHF, und eine Wohnungsreinigung (4.5+ Zimmer) ab 950 CHF. Büroreinigung kostet je nach Grösse zwischen 200 und 800 CHF pro Reinigung. Zusätzliche Kosten können für Spezialreinigungen, Fensterreinigung oder regelmässige Reinigungen anfallen. Der Vergleich mehrerer Offerten von Reinigungsanbietern vor Ort hilft Ihnen, die besten Preise zu finden."
    },
    {
      q: "Warum sollte ich eine Reinigungsfirma in der Nähe wählen?",
      a: "Ein Reinigungsservice vor Ort bietet mehrere Vorteile: Kürzere Anfahrtswege reduzieren die Kosten und Umweltbelastung, lokale Expertise über örtliche Gegebenheiten und Zugänglichkeit, schnellere Reaktionszeiten bei Notfällen oder kurzfristigen Änderungen, persönlicherer Service und bessere Erreichbarkeit, sowie Unterstützung der lokalen Wirtschaft. Regionale Reinigungsunternehmen kennen die örtlichen Gegebenheiten besonders gut und können flexibler auf Ihre Bedürfnisse eingehen."
    },
    {
      q: "Wie viele Offerten erhalte ich von Reinigungsfirmen in meiner Nähe?",
      a: "Sie erhalten bis zu 5 kostenlose und unverbindliche Offerten von qualitätsgeprüften Reinigungsanbietern aus Ihrer Region. Nachdem Sie das Formular ausgefüllt haben, nehmen die lokalen Reinigungsunternehmen direkt Kontakt mit Ihnen auf (per Telefon oder E-Mail) und erstellen Ihnen eine individuelle Offerte. In Ballungsgebieten wie Zürich, Basel oder Bern erhalten Sie meist alle 5 Offerten, in ländlicheren Regionen können es auch 3-4 Offerten sein. Jede Offerte wird individuell auf Ihre Bedürfnisse zugeschnitten."
    },
    {
      q: "Ist der Service wirklich kostenlos?",
      a: "Ja, unser Service ist für Sie als anfragende Person zu 100% kostenlos und unverbindlich. Sie erhalten bis zu 5 Offerten von geprüften Reinigungsanbietern in Ihrer Region, ohne dafür etwas zu bezahlen. Es gibt keine versteckten Gebühren oder Verpflichtungen. Sie entscheiden selbst, ob und welche Offerte Sie annehmen möchten. Die Reinigungsfirmen zahlen eine kleine Gebühr, wenn Sie deren Offerte annehmen – für Sie bleibt der Service komplett kostenlos."
    },
    {
      q: "Wie wird die Qualität der Reinigungsfirmen sichergestellt?",
      a: "Wir arbeiten nur mit geprüften und versicherten Partnerfirmen zusammen. Alle Reinigungsunternehmen in unserem Netzwerk durchlaufen einen strengen Prüfprozess, der Versicherungen, Lizenzen und Referenzen umfasst. Zusätzlich können Sie die Bewertungen anderer Kunden einsehen, um sich ein umfassendes Bild von der Qualität der Dienstleistung zu machen. Unsere Partner sind etablierte Reinigungsanbieter mit langjähriger Erfahrung. Wir überprüfen regelmässig die Qualität unserer Partnerfirmen."
    },
    {
      q: "Wie lange im Voraus sollte ich eine Reinigungsfirma in der Nähe buchen?",
      a: "Wir empfehlen, mindestens 1-2 Wochen im Voraus zu buchen, besonders für Endreinigungen oder regelmässige Reinigungen. Frühzeitige Buchung gibt Ihnen mehr Auswahl bei lokalen Reinigungsanbietern und oft auch bessere Preise. Last-Minute-Buchungen sind oft deutlich teurer und die Auswahl an verfügbaren Reinigungsunternehmen ist begrenzt. Planen Sie Ihre Reinigung frühzeitig und fordern Sie rechtzeitig Offerten an."
    },
    {
      q: "Was sollte eine gute Offerte einer Reinigungsfirma enthalten?",
      a: "Eine professionelle Offerte sollte folgende Informationen enthalten: Gesamtpreis mit detaillierter Aufschlüsselung, alle enthaltenen Leistungen (welche Räume, welche Reinigungsarbeiten), verwendete Reinigungsmittel und Materialien, Dauer der Reinigung, Versicherungsschutz, Reinigungstermin und Zeitfenster, Zahlungsbedingungen und Garantien. Achten Sie darauf, dass alle Leistungen schriftlich festgehalten sind. Eine seriöse Reinigungsfirma bietet transparente Offerten ohne versteckte Kosten."
    },
    {
      q: "Bieten Reinigungsfirmen auch Spezialreinigungen an?",
      a: "Ja, viele Reinigungsunternehmen bieten auch Spezialreinigungen an. Dies umfasst Teppichreinigung, Fensterreinigung, Fassadenreinigung, Baureinigung, Unterhaltsreinigung und mehr. Wenn Sie sowohl Standardreinigung als auch Spezialreinigungen benötigen, kann eine Reinigungsfirma, die beide Dienstleistungen anbietet, kosteneffizienter sein. Fragen Sie in Ihrer Anfrage nach, ob die Reinigungsfirma auch Ihre gewünschten Spezialreinigungen anbietet."
    },
    {
      q: "Sind die Reinigungsfirmen in meiner Nähe versichert?",
      a: "Ja, alle Reinigungsunternehmen in unserem Netzwerk sind geprüft und verfügen über eine gültige Betriebshaftpflichtversicherung. Wir prüfen alle Partnerfirmen vor der Aufnahme in unser Netzwerk auf Versicherungen, Lizenzen und Referenzen. Die Versicherungsdetails sind in der Regel in den Offerten enthalten, falls nicht, sollten Sie danach fragen. Seriöse Reinigungsanbieter vor Ort werden Ihnen gerne die Versicherungsnachweise zeigen."
    },
    {
      q: "Was passiert, nachdem ich eine Anfrage gesendet habe?",
      a: "Nachdem Sie das Formular ausgefüllt haben, wird Ihre Anfrage an passende Reinigungsunternehmen in Ihrer Region weitergeleitet. Diese nehmen dann direkt Kontakt mit Ihnen auf (per Telefon oder E-Mail) und erstellen Ihnen eine individuelle Offerte. Sie erhalten in der Regel innerhalb von 24-48 Stunden die ersten Rückmeldungen von den lokalen Reinigungsanbietern. Alle Offerten werden Ihnen direkt von den Reinigungsunternehmen zugesendet und enthalten alle wichtigen Details wie Preis, Leistungen, Versicherungen und Kontaktinformationen."
    },
    {
      q: "Wie erkenne ich eine seriöse Reinigungsfirma in der Nähe?",
      a: "Eine seriöse lokale Reinigungsfirma erkennt man an mehreren Merkmalen: Sie bietet schriftliche, detaillierte Offerten mit klarer Preisaufschlüsselung, verfügt über gültige Versicherungen und kann Referenzen vorweisen, ist erreichbar und antwortet schnell auf Anfragen, kommuniziert professionell und transparent, verwendet umweltfreundliche Reinigungsmittel (falls gewünscht), und hat positive Bewertungen von anderen Kunden. Vermeiden Sie Reinigungsanbieter, die nur mündliche Zusagen machen oder Druck ausüben."
    },
    {
      q: "Was sind die Vorteile einer regionalen Reinigungsfirma?",
      a: "Regionale Reinigungsunternehmen in Ihrer Nähe bieten zahlreiche Vorteile: Kürzere Anfahrtswege reduzieren Kosten und Umweltbelastung, lokale Expertise über örtliche Gegebenheiten und Zugänglichkeit, schnellere Reaktionszeiten bei Notfällen, persönlicherer Service und bessere Erreichbarkeit, Kenntnis der örtlichen Gegebenheiten und baulichen Besonderheiten, sowie Unterstützung der lokalen Wirtschaft. Lokale Reinigungsanbieter können flexibler auf Ihre Bedürfnisse eingehen und vermeiden unnötige Komplikationen."
    },
    {
      q: "Wie kann ich bei einer Reinigungsfirma in der Nähe sparen?",
      a: "Der beste Weg, um zu sparen, ist der Vergleich mehrerer Offerten. Studien zeigen, dass Kunden durch den Vergleich durchschnittlich 30-40% der Reinigungskosten einsparen können. Weitere Sparmöglichkeiten: Flexibel beim Reinigungstermin sein (Wochentage sind oft günstiger), Eigenleistung bei Vorarbeiten erbringen, regelmässige Reinigungen buchen (oft günstiger als einmalige), frühzeitig buchen (Last-Minute-Buchungen sind teurer), und Offerten genau vergleichen - nicht nur auf den Preis achten, sondern auch auf enthaltene Leistungen. Regionale Reinigungsunternehmen können durch kürzere Anfahrtswege zusätzliche Einsparungen bieten."
    }
  ]

  const benefits = [
    {
      icon: Route,
      title: "Kürzere Anfahrtswege",
      description: "Lokale Reinigungsunternehmen haben kürzere Anfahrtswege, was die Kosten reduziert und die Umweltbelastung minimiert."
    },
    {
      icon: Navigation2,
      title: "Lokale Expertise",
      description: "Regionale Reinigungsfirmen kennen die örtlichen Gegebenheiten, Zugänglichkeiten und baulichen Besonderheiten besonders gut."
    },
    {
      icon: Clock,
      title: "Schnellere Reaktionszeiten",
      description: "Bei Notfällen oder kurzfristigen Änderungen können regionale Reinigungsfirmen schneller reagieren."
    },
    {
      icon: HeartHandshake,
      title: "Persönlicher Service",
      description: "Lokale Reinigungsfirmen legen oft mehr Wert auf persönliche Beziehungen und langfristige Kundenbindung."
    },
    {
      icon: Building,
      title: "Unterstützung der lokalen Wirtschaft",
      description: "Durch die Beauftragung einer regionalen Reinigungsfirma unterstützen Sie lokale Unternehmen."
    },
    {
      icon: ShieldCheck,
      title: "Bessere Erreichbarkeit",
      description: "Regionale Reinigungsfirmen sind erreichbarer und reagieren schneller auf Ihre Anliegen."
    }
  ]

  const services = [
    {
      title: "Wohnungsreinigung",
      description: "Professionelle Reinigung für Ihre Wohnung. Gründlich, zuverlässig und individuell auf Ihre Bedürfnisse abgestimmt.",
      icon: Home,
      link: "/reinigung/wohnungsreinigung"
    },
    {
      title: "Hausreinigung",
      description: "Umfassende Reinigung für Ihr gesamtes Haus. Von Küche bis Bad – wir sorgen für makellose Sauberkeit.",
      icon: Home,
      link: "/reinigung/hausreinigung"
    },
    {
      title: "Büroreinigung",
      description: "Professionelle Büro- und Gewerbereinigung für ein sauberes Arbeitsumfeld. Regelmässig oder einmalig.",
      icon: Building,
      link: "/reinigung/bueroreinigung"
    },
    {
      title: "Umzugsreinigung",
      description: "Professionelle Endreinigung für Wohnungsübergabe. Mit Abnahmegarantie für sorgenfreien Auszug.",
      icon: Sparkles,
      link: "/reinigung/umzugsreinigung"
    },
    {
      title: "Unterhaltsreinigung",
      description: "Regelmässige Reinigung für Privathaushalte und Firmen. Individuell auf Ihre Bedürfnisse zugeschnitten.",
      icon: Clock,
      link: "/reinigung/unterhaltsreinigung"
    },
    {
      title: "Grundreinigung",
      description: "Intensive Tiefenreinigung für einen sauberen Start. Ideal für den Einzug oder nach Renovationen.",
      icon: Droplets,
      link: "/reinigung/grundreinigung"
    },
    {
      title: "Baureinigung",
      description: "Von der Grob- bis zur Feinreinigung nach Neu- oder Umbauten. Wir machen Ihr Objekt bezugsfertig.",
      icon: Wrench,
      link: "/reinigung/baureinigung"
    },
    {
      title: "Fensterreinigung",
      description: "Streifenfreier Glanz für Ihre Fenster, Glasfronten und Storen. Innen und aussen.",
      icon: Sparkle,
      link: "/reinigung/fensterreinigung"
    },
    {
      title: "Bodenreinigung",
      description: "Professionelle Reinigung und Pflege Ihrer Böden. Von Parkett über Laminat bis zu Fliesen – wir kennen jeden Belag.",
      icon: Shield,
      link: "/reinigung/bodenreinigung"
    },
    {
      title: "Fassadenreinigung",
      description: "Professionelle Reinigung Ihrer Gebäudefassade. Wir sorgen für ein gepflegtes und einladendes Erscheinungsbild.",
      icon: Building,
      link: "/reinigung/fassadenreinigung"
    },
    {
      title: "Hofreinigung",
      description: "Professionelle Reinigung von Höfen, Terrassen und Aussenbereichen. Für ein gepflegtes Äusseres.",
      icon: Globe,
      link: "/reinigung/hofreinigung"
    }
  ]

  const locations = [
    { name: "Reinigungsfirma Zürich", link: "/reinigungsfirma-in-der-naehe/zuerich" },
    { name: "Reinigungsfirma Basel", link: "/reinigungsfirma-in-der-naehe/basel" },
    { name: "Reinigungsfirma Bern", link: "/reinigungsfirma-in-der-naehe/bern" },
    { name: "Reinigungsfirma Genf", link: "/reinigungsfirma-in-der-naehe/genf" },
    { name: "Reinigungsfirma Lausanne", link: "/reinigungsfirma-in-der-naehe/lausanne" },
    { name: "Reinigungsfirma Luzern", link: "/reinigungsfirma-in-der-naehe/luzern" },
    { name: "Reinigungsfirma St. Gallen", link: "/reinigungsfirma-in-der-naehe/st-gallen" },
    { name: "Reinigungsfirma Winterthur", link: "/reinigungsfirma-in-der-naehe/winterthur" }
  ]

  return (
    <>
      {/* Hero Section - Unique Design for Cleaning Services */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-semibold text-sm mb-6">
                <MapPin className="h-4 w-4 mr-2" />
                Lokale Reinigungsfirmen finden
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                <span className="block">Reinigungsfirma</span>
                <span className="block text-blue-600 mt-2">in der Nähe finden</span>
                <span className="block text-2xl md:text-3xl text-gray-700 font-bold mt-4">
                  Professionelle Reinigung in Ihrer Region
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                Finden Sie die <strong>beste Reinigungsfirma in Ihrer Nähe</strong>. Vergleichen Sie <strong>bis zu 5 kostenlose Offerten</strong> von geprüften <strong>Reinigungsunternehmen in Ihrer Region</strong> – <strong>100% kostenlos und unverbindlich</strong>. Lokale Expertise, kürzere Wege, bessere Preise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleCtaClick}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Jetzt vergleichen
                </Button>
                <Button
                  onClick={() => router.push('/reinigung/reinigungskosten')}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Reinigungskosten berechnen
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>Lokale Reinigungsfirmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>100% kostenlos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>Nur geprüfte Firmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span>Bis zu 40% sparen</span>
                </div>
              </div>
            </div>
            <div
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-blue-200">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <Sparkles className="h-12 w-12 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  Finden Sie Ihre Reinigungsfirma
                </h3>
                <div className="space-y-4">
                  {features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <feature.icon className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
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
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Warum eine lokale Reinigungsfirma wählen?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Regionale Reinigungsunternehmen bieten zahlreiche Vorteile, die oft übersehen werden. Erfahren Sie, warum ein <strong>Reinigungsservice vor Ort</strong> die beste Wahl für Ihre Reinigung sein kann.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
              >
                <Card className="h-full border-2 hover:border-blue-500 transition-colors">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <benefit.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Welche Reinigungsleistungen benötigen Sie?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Verschiedene Reinigungsbetriebe spezialisieren sich auf unterschiedliche Arten von Reinigungsarbeiten. Finden Sie den richtigen Fachbetrieb für Ihren spezifischen Bedarf.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
              >
                <Link href={service.link}>
                  <Card className="h-full hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                          <service.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{service.description}</p>
                      <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm">
                        <span>Mehr erfahren</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              So finden Sie einen Reinigungsservice vor Ort
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              In nur 3 einfachen Schritten finden Sie die perfekten Reinigungsunternehmen in Ihrer Region.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Anfrage ausfüllen",
                description: "Beschreiben Sie Ihre Reinigungsanforderungen in unserem Formular. Geben Sie Art der Reinigung, Flächengrösse, Reinigungstermin und gewünschte Leistungen an. Je genauer Ihre Angaben, desto präziser sind die Offerten.",
                icon: FileText
              },
              {
                number: "02",
                title: "Offerten erhalten",
                description: "Erhalten Sie bis zu 5 Offerten von lokalen Reinigungsunternehmen. Die Anbieter nehmen direkt Kontakt mit Ihnen auf und erstellen individuelle Offerten.",
                icon: Mail
              },
              {
                number: "03",
                title: "Vergleichen & auswählen",
                description: "Vergleichen Sie Preise, Leistungen und Bewertungen. Wählen Sie den besten Reinigungsanbieter in Ihrer Region für Ihre Reinigung aus.",
                icon: Star
              }
            ].map((step, index) => (
              <div
                key={index}
                className="relative"
              >
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
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 text-center">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Links Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Reinigungsfirmen in Ihrer Region
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Finden Sie Reinigungsfirmen in den grössten Städten der Schweiz. Wir vermitteln Ihnen geprüfte Partner aus Ihrer Region.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {locations.map((location, index) => (
              <div
                key={index}
              >
                <Link href={location.link}>
                  <Card className="h-full hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-blue-600 mr-3" />
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

      {/* Detailed Content Section - SEO Rich Content */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Lokale Reinigungsunternehmen finden: Ihr kompletter Ratgeber
              </h2>
              
              <div className="text-gray-700 leading-relaxed space-y-6">
                <p className="text-lg">
                  Eine <strong>Reinigungsfirma in der Nähe</strong> zu finden, ist der erste Schritt zu einer professionellen und kostengünstigen Reinigung in der Schweiz. Wenn Sie nach einem <strong>Reinigungsservice vor Ort</strong> suchen, sollten Sie mehrere <strong>regionale Reinigungsunternehmen vergleichen</strong>, um die beste Offerte zu erhalten. Bei Online-Offerten.ch können Sie <strong>kostenlose Offerten von geprüften Reinigungsanbietern in Ihrer Region</strong> anfordern und diese in Ruhe vergleichen.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Warum eine lokale Reinigungsfirma wählen?
                </h3>
                <p>
                  Ein <strong>Reinigungsservice vor Ort</strong> bietet zahlreiche Vorteile, die oft übersehen werden. Regionale <strong>Reinigungsunternehmen in Ihrer Region</strong> kennen die örtlichen Gegebenheiten, Zugänglichkeiten und baulichen Besonderheiten besonders gut. Lokale <strong>Reinigungsbetriebe</strong> haben kürzere Anfahrtswege, was die Kosten reduziert und die Umweltbelastung minimiert. <strong>Reinigungsanbieter vor Ort</strong> können schneller auf Notfälle oder kurzfristige Änderungen reagieren.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  So finden Sie einen Reinigungsservice vor Ort
                </h3>
                <p>
                  Um den richtigen <strong>Reinigungsanbieter in Ihrer Nähe</strong> zu finden, sollten Sie systematisch vorgehen. Zunächst definieren Sie Ihre Anforderungen: Art der Reinigung (Büroreinigung, Haushaltsreinigung, Endreinigung), zu reinigende Flächen, Reinigungstermin und gewünschte Leistungen. Dann fordern Sie mehrere Offerten von verschiedenen <strong>lokalen Reinigungsunternehmen</strong> an – am besten über ein Vergleichsportal wie Online-Offerten.ch. Vergleichen Sie die Offerten nicht nur nach Preis, sondern auch nach enthaltenen Leistungen, verwendeten Reinigungsmitteln und Bewertungen. Ein <strong>Reinigungsservice in der Nähe</strong> kann Vorteile haben, aber auch weiter entfernte Anbieter können gute Angebote machen.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Vorteile regionaler Reinigungsunternehmen
                </h3>
                <p>
                  Die Wahl eines <strong>Reinigungsservice vor Ort</strong> bietet zahlreiche Vorteile. <strong>Lokale Reinigungsunternehmen</strong> kennen die örtlichen Gegebenheiten, Zugänglichkeiten und baulichen Besonderheiten besonders gut. Eine <strong>Reinigungsfirma in Ihrer Nähe</strong> hat kürzere Anfahrtswege, was die Kosten reduziert. Regionale <strong>Reinigungsbetriebe</strong> sind oft flexibler bei kurzfristigen Änderungen oder Notfällen. Lokale Anbieter legen oft mehr Wert auf persönliche Beziehungen und langfristige Kundenbindung.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Wie viel kostet ein Reinigungsservice vor Ort?
                </h3>
                <p>
                  Die Kosten für einen <strong>Reinigungsanbieter in Ihrer Region</strong> hängen von verschiedenen Faktoren ab: Art der Reinigung, Grösse der zu reinigenden Fläche, Häufigkeit der Reinigung, benötigte Leistungen und Reinigungstermin. <strong>Lokale Reinigungsunternehmen</strong> können durch kürzere Anfahrtswege günstigere Preise anbieten. Eine durchschnittliche Wohnungsreinigung in der Schweiz kostet zwischen 500 und 1.200 CHF. Der beste Weg, um faire Preise zu finden, ist der Vergleich mehrerer Offerten von verschiedenen <strong>Reinigungsanbietern in Ihrer Nähe</strong>.
                </p>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                    ğŸ’° Preisbeispiele: Was kostet eine Reinigung konkret?
                  </h4>
                  <div className="space-y-4 text-gray-700">
                    <div className="border-l-4 border-blue-600 pl-4">
                      <p className="font-semibold text-gray-900 mb-1">Umzugsreinigung</p>
                      <p><strong>Beispiel:</strong> Eine 3-Zimmer-Wohnung (80 mÂ²) kostet für eine Umzugsreinigung in Zürich durchschnittlich <strong>CHF 650–950</strong>. In Basel oder Bern liegen die Preise bei <strong>CHF 600–900</strong>.</p>
                    </div>
                    <div className="border-l-4 border-blue-600 pl-4">
                      <p className="font-semibold text-gray-900 mb-1">Wohnungsreinigung</p>
                      <p><strong>Beispiel:</strong> Eine 3.5-Zimmer-Wohnung (95 mÂ²) kostet für eine Grundreinigung in Zürich durchschnittlich <strong>CHF 800–1.100</strong>. Eine 2.5-Zimmer-Wohnung (65 mÂ²) kostet <strong>CHF 500–750</strong>.</p>
                    </div>
                    <div className="border-l-4 border-blue-600 pl-4">
                      <p className="font-semibold text-gray-900 mb-1">Büroreinigung</p>
                      <p><strong>Beispiel:</strong> Ein Büro mit 150 mÂ² kostet für eine regelmässige Reinigung in Zürich durchschnittlich <strong>CHF 400–600</strong> pro Reinigung. Ein kleineres Büro (50 mÂ²) kostet <strong>CHF 200–350</strong>.</p>
                    </div>
                    <div className="border-l-4 border-blue-600 pl-4">
                      <p className="font-semibold text-gray-900 mb-1">Unterhaltsreinigung</p>
                      <p><strong>Beispiel:</strong> Eine 4-Zimmer-Wohnung (110 mÂ²) kostet für eine wöchentliche Unterhaltsreinigung in Zürich durchschnittlich <strong>CHF 120–180</strong> pro Reinigung. Monatlich sind das <strong>CHF 480–720</strong>.</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-300">
                      <p className="text-sm text-gray-600 italic">
                        <strong>Hinweis:</strong> Diese Preise sind Richtwerte und können je nach Anbieter, Reinigungsaufwand, Termin und Region variieren. Durch den Vergleich mehrerer Offerten von lokalen Reinigungsunternehmen können Sie bis zu 40% sparen.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Büroreinigung vs. Haushaltsreinigung: Was brauchen Sie?
                </h3>
                <p>
                  <strong>Büroreinigung</strong> bezieht sich auf Reinigungsarbeiten in Geschäftsräumen, Büros und Gewerbeimmobilien. <strong>Haushaltsreinigung</strong> umfasst Reinigungsarbeiten in Privatwohnungen und -häusern. <strong>Büroreinigung</strong> erfordert oft spezielle Reinigungsmittel und Equipment für gewerbliche Umgebungen. Ein <strong>Reinigungsbetrieb</strong>, der <strong>Büroreinigung</strong> anbietet, benötigt oft spezielle Ausrüstung und Erfahrung mit gewerblichen Standards. Viele <strong>Reinigungsunternehmen</strong> bieten beide Dienstleistungen an, aber einige spezialisieren sich auf eine bestimmte Art von Reinigung. Wählen Sie einen <strong>Fachbetrieb</strong>, der Erfahrung mit Ihrer spezifischen Art von Reinigung hat.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Endreinigung und Umzugsreinigung: Professionelle Übergabe
                </h3>
                <p>
                  Eine <strong>Endreinigung</strong> ist besonders wichtig bei Wohnungsübergaben. Lokale <strong>Reinigungsunternehmen</strong> kennen die Anforderungen der örtlichen Vermieter und können eine erfolgreiche Übergabe garantieren. Eine <strong>Umzugsreinigung</strong> umfasst sowohl die Reinigung der alten als auch der neuen Wohnung. Regionale <strong>Reinigungsbetriebe</strong> können oft beide Reinigungen kosteneffizienter anbieten, da sie kürzere Anfahrtswege haben.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Regelmässige Reinigung: Unterhaltsreinigung vor Ort
                </h3>
                <p>
                  Für <strong>regelmässige Reinigungen</strong> ist eine <strong>Reinigungsfirma in Ihrer Nähe</strong> besonders vorteilhaft. Lokale <strong>Reinigungsanbieter</strong> können flexibler auf Ihre Terminwünsche eingehen und haben kürzere Anfahrtszeiten. Eine <strong>Unterhaltsreinigung</strong> kann wöchentlich, zweiwöchentlich oder monatlich durchgeführt werden. Regionale <strong>Reinigungsunternehmen</strong> bieten oft bessere Konditionen für langfristige Verträge.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    ğŸ’¡ Pro-Tipp: Lokale Reinigungsunternehmen richtig auswählen
                  </h4>
                  <p className="text-gray-700">
                    Beim Vergleich von <strong>Reinigungsanbietern in Ihrer Region</strong> sollten Sie nicht nur auf den Preis achten. Vergleichen Sie auch die enthaltenen Leistungen, verwendeten Reinigungsmittel, Versicherungssummen, Bewertungen und die Kommunikationsqualität. Ein <strong>Reinigungsservice vor Ort</strong> mit lokaler Expertise kann trotz etwas höherem Preis das bessere Angebot sein, da er die örtlichen Gegebenheiten besser kennt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Häufig gestellte Fragen (FAQ)
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Alles, was Sie über lokale Reinigungsunternehmen wissen müssen – beantwortet von unseren Experten.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
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
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bereit, lokale Reinigungsunternehmen zu finden?
            </h2>
            <p className="text-xl mb-8 text-blue-50">
              Fordern Sie jetzt kostenlos und unverbindlich bis zu 5 Offerten von geprüften Reinigungsanbietern in Ihrer Region an. Vergleichen Sie Preise und sparen Sie bis zu 40% bei Ihrer Reinigung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleCtaClick}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-xl"
              >
                <Zap className="mr-2 h-5 w-5" />
                Jetzt Anfrage senden
              </Button>
              <Button
                onClick={() => router.push('/reinigung/reinigungskosten')}
                size="lg"
                className="bg-blue-500 hover:bg-blue-400 text-white border-2 border-white text-lg px-8 py-6 shadow-lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Reinigungskosten berechnen
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-50">
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
                <span>Nur geprüfte Reinigungsfirmen</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Bis zu 40% sparen</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ReinigungsfirmaInDerNaehePageClient


