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
  Star, Calculator, MapPin, Home, Building, Globe, Package, Sparkles,
  HelpCircle, Info, FileText, Search, HeartHandshake, Zap, Target, 
  Truck, Navigation, Phone, Mail, Calendar, Navigation2, Route
} from 'lucide-react'

const UmzugsfirmaInDerNaehePageClient = () => {
  const router = useRouter()
  const canonicalUrl = 'https://online-offerten.ch/umzugsfirma-in-der-naehe'

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
          "description": "Finden Sie die besten lokalen Umzugsunternehmen. Vergleichen Sie bis zu 6 kostenlose Offerten von geprüften Umzugsanbietern in Ihrer Region für Privatumzug, Geschäftsumzug und mehr.",
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
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Wie finde ich eine Umzugsfirma in der Nähe?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Um lokale Umzugsunternehmen zu finden, können Sie unser kostenloses Vergleichsportal nutzen. Füllen Sie einfach das Online-Formular aus und beschreiben Sie Ihren geplanten Umzug. Wir vermitteln Ihnen dann bis zu 6 geprüfte Umzugsanbieter aus Ihrer Region, die sich direkt bei Ihnen melden und Ihnen individuelle Offerten erstellen."
              }
            },
            {
              "@type": "Question",
              "name": "Wie viel kostet eine Umzugsfirma?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Die Kosten für einen Umzugsservice hängen von verschiedenen Faktoren ab: Umzugsstrecke, Umfang des Umzugsguts, Anzahl der Stockwerke, benötigte Leistungen und Umzugsdatum. Ein durchschnittlicher Wohnungsumzug in der Schweiz kostet zwischen 1.500 und 4.000 CHF. Geschäftsumzüge oder Umzüge mit Spezialtransporten können deutlich teurer sein. Der beste Weg, um faire Preise zu finden, ist der Vergleich mehrerer Offerten von verschiedenen lokalen Umzugsunternehmen."
              }
            },
            {
              "@type": "Question",
              "name": "Wie viel Geld muss man für einen Umzug einplanen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Für einen Umzug sollten Sie je nach Wohnungsgrösse folgende Budgets einplanen: 1.5-2.5 Zimmer: 600-1.200 CHF, 3.5 Zimmer: 1.100-1.800 CHF, 4.5 Zimmer: 1.600-2.500 CHF, 5.5+ Zimmer: ab 2.200 CHF. Zusätzlich sollten Sie 10-20% Reserve für unvorhergesehene Kosten einplanen. Durch den Vergleich mehrerer Offerten erhalten Sie die besten Preise."
              }
            },
            {
              "@type": "Question",
              "name": "Wie teuer ist eine Umzugsfirma in der Schweiz?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Die Preise für Umzugsunternehmen in der Schweiz variieren je nach Region und Umfang. In Ballungsgebieten wie Zürich, Basel oder Genf sind die Preise oft höher als in ländlicheren Regionen. Ein durchschnittlicher Umzug kostet zwischen 1.500 und 4.000 CHF. Durch den Vergleich mehrerer Offerten von lokalen Umzugsanbietern finden Sie die besten Preise und können erheblich sparen."
              }
            },
            {
              "@type": "Question",
              "name": "Wie viel zahlt man für einen Umzug?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Die Kosten für einen Umzug hängen von mehreren Faktoren ab. Ein kleiner Umzug (1.5-2.5 Zimmer) kostet durchschnittlich 600-1.200 CHF, ein mittlerer Umzug (3.5 Zimmer) 1.100-1.800 CHF, und ein grosser Umzug (4.5+ Zimmer) ab 1.600 CHF. Zusätzliche Kosten können für Verpackungsservice, Umzugsreinigung, Spezialtransporte oder Wochenendtermine anfallen. Der Vergleich mehrerer Offerten hilft Ihnen, die besten Preise zu finden."
              }
            },
            {
              "@type": "Question",
              "name": "Warum sollte ich eine Umzugsfirma in der Nähe wählen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ein Umzugsservice vor Ort bietet mehrere Vorteile: Kürzere Anfahrtswege reduzieren die Kosten, lokale Expertise über Verkehrssituationen und Parkregelungen, schnellere Reaktionszeiten bei Notfällen, persönlicherer Service und Unterstützung der lokalen Wirtschaft. Regionale Umzugsunternehmen kennen die örtlichen Gegebenheiten besonders gut."
              }
            },
            {
              "@type": "Question",
              "name": "Wie viele Offerten erhalte ich von Umzugsfirmen in meiner Nähe?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sie erhalten bis zu 6 kostenlose und unverbindliche Offerten von qualitätsgeprüften Umzugsfirmen aus Ihrer Region. Nachdem Sie das Formular ausgefüllt haben, nehmen die Umzugsfirmen direkt Kontakt mit Ihnen auf (per Telefon oder E-Mail) und erstellen Ihnen eine individuelle Offerte. In Ballungsgebieten erhalten Sie meist alle 6 Offerten, in ländlicheren Regionen können es auch 3-4 Offerten sein."
              }
            },
            {
              "@type": "Question",
              "name": "Ist der Service wirklich kostenlos?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, unser Service ist für Sie als anfragende Person zu 100% kostenlos und unverbindlich. Sie erhalten bis zu 6 Offerten von geprüften Umzugsfirmen in Ihrer Region, ohne dafür etwas zu bezahlen. Es gibt keine versteckten Gebühren oder Verpflichtungen. Sie entscheiden selbst, ob und welche Offerte Sie annehmen möchten."
              }
            },
            {
              "@type": "Question",
              "name": "Wie wird die Qualität der Umzugsfirmen sichergestellt?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wir arbeiten nur mit geprüften und versicherten Partnerfirmen zusammen. Alle Umzugsfirmen in unserem Netzwerk durchlaufen einen strengen Prüfprozess, der Versicherungen, Lizenzen und Referenzen umfasst. Zusätzlich können Sie die Bewertungen anderer Kunden einsehen, um sich ein umfassendes Bild von der Qualität der Dienstleistung zu machen."
              }
            },
            {
              "@type": "Question",
              "name": "Wie lange im Voraus sollte ich eine Umzugsfirma in der Nähe buchen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Wir empfehlen, mindestens 1-2 Monate im Voraus zu buchen, besonders in den Sommermonaten und zum Monatsende, da dies die geschäftigsten Zeiten für Umzugsunternehmen sind. Frühzeitige Buchung gibt Ihnen mehr Auswahl bei lokalen Umzugsanbietern und oft auch bessere Preise."
              }
            },
            {
              "@type": "Question",
              "name": "Was sollte eine gute Offerte einer Umzugsfirma enthalten?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Eine professionelle Offerte sollte folgende Informationen enthalten: Gesamtpreis mit detaillierter Aufschlüsselung, alle enthaltenen Leistungen (Verpackung, Transport, Montage/Demontage), Versicherungsschutz und Deckungssumme, Umzugsdatum und Zeitfenster, Anzahl der Umzugshelfer und Fahrzeuge, Zusatzleistungen und deren Kosten, Zahlungsbedingungen und Stornierungsbedingungen."
              }
            },
            {
              "@type": "Question",
              "name": "Kann ich auch für Auslandumzüge eine Umzugsfirma in der Nähe finden?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, viele Umzugsunternehmen in der Schweiz bieten auch Auslandumzüge an. Auch wenn die Zielregion im Ausland liegt, können lokale Umzugsanbieter mit internationaler Expertise die beste Wahl sein. Sie können in Ihrer Anfrage angeben, dass es sich um einen Auslandumzug handelt, und erhalten Offerten von spezialisierten Anbietern."
              }
            },
            {
              "@type": "Question",
              "name": "Wie kann ich bei einer Umzugsfirma in der Nähe sparen?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Der beste Weg, um zu sparen, ist der Vergleich mehrerer Offerten. Studien zeigen, dass Kunden durch den Vergleich durchschnittlich 30-40% der Umzugskosten einsparen können. Weitere Sparmöglichkeiten: Flexibel beim Umzugsdatum sein (Wochentage sind oft günstiger), Eigenleistung beim Packen erbringen, vor dem Umzug ausmisten, frühzeitig buchen und Offerten genau vergleichen."
              }
            },
            {
              "@type": "Question",
              "name": "Sind die Umzugsfirmen in meiner Nähe versichert?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ja, alle Umzugsfirmen in unserem Netzwerk sind geprüft und verfügen über eine gültige Transportversicherung sowie Betriebshaftpflichtversicherung. Wir prüfen alle Partnerfirmen vor der Aufnahme in unser Netzwerk auf Versicherungen, Lizenzen und Referenzen. Die Versicherungsdetails sind in der Regel in den Offerten enthalten."
              }
            },
            {
              "@type": "Question",
              "name": "Was passiert, nachdem ich eine Anfrage gesendet habe?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nachdem Sie das Formular ausgefüllt haben, wird Ihre Anfrage an passende Umzugsunternehmen in Ihrer Region weitergeleitet. Diese nehmen dann direkt Kontakt mit Ihnen auf (per Telefon oder E-Mail) und erstellen Ihnen eine individuelle Offerte. Sie erhalten in der Regel innerhalb von 24-48 Stunden die ersten Rückmeldungen von den lokalen Umzugsanbietern."
              }
            }
          ]
        }
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
      title: 'Lokale Umzugsfirmen',
      description: 'Finden Sie geprüfte Umzugsfirmen direkt in Ihrer Region'
    },
    {
      icon: ShieldCheck,
      title: '100% kostenlos & unverbindlich',
      description: 'Keine Gebühren, keine versteckten Kosten, keine Verpflichtungen'
    },
    {
      icon: TrendingUp,
      title: 'Transparente Preise & individuelle Offerten',
      description: 'Durch den Vergleich mehrerer lokaler Umzugsfirmen finden Sie die besten Preise'
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
      icon: Navigation,
      title: 'Regionale Expertise',
      description: 'Lokale Umzugsfirmen kennen die örtlichen Gegebenheiten besonders gut'
    }
  ]

  const faqItems = [
    {
      q: "Wie finde ich eine Umzugsfirma in der Nähe?",
      a: "Um lokale Umzugsunternehmen zu finden, können Sie unser kostenloses Vergleichsportal nutzen. Füllen Sie einfach das Online-Formular aus und beschreiben Sie Ihren geplanten Umzug. Wir vermitteln Ihnen dann bis zu 6 geprüfte Umzugsanbieter aus Ihrer Region, die sich direkt bei Ihnen melden und Ihnen individuelle Offerten erstellen. Die regionalen Umzugsunternehmen kennen die örtlichen Gegebenheiten, Verkehrssituationen und Parkregelungen besonders gut."
    },
    {
      q: "Wie viel kostet eine Umzugsfirma?",
      a: "Die Kosten für einen Umzugsservice hängen von verschiedenen Faktoren ab: Umzugsstrecke, Umfang des Umzugsguts, Anzahl der Stockwerke, benötigte Leistungen und Umzugsdatum. Ein durchschnittlicher Wohnungsumzug in der Schweiz kostet zwischen 1.500 und 4.000 CHF. Geschäftsumzüge oder Umzüge mit Spezialtransporten können deutlich teurer sein. Der beste Weg, um faire Preise zu finden, ist der Vergleich mehrerer Offerten von verschiedenen lokalen Umzugsunternehmen. Durch den Vergleich erhalten Sie die besten Konditionen."
    },
    {
      q: "Wie viel Geld muss man für einen Umzug einplanen?",
      a: "Für einen Umzug sollten Sie je nach Wohnungsgrösse folgende Budgets einplanen: 1.5-2.5 Zimmer: 600-1.200 CHF, 3.5 Zimmer: 1.100-1.800 CHF, 4.5 Zimmer: 1.600-2.500 CHF, 5.5+ Zimmer: ab 2.200 CHF. Zusätzlich sollten Sie 10-20% Reserve für unvorhergesehene Kosten einplanen. Durch den Vergleich mehrerer Offerten von regionalen Umzugsunternehmen erhalten Sie die besten Preise. Lokale Zügelfirmen haben oft kürzere Anfahrtswege, was sich positiv auf den Preis auswirkt."
    },
    {
      q: "Wie teuer ist eine Umzugsfirma in der Schweiz?",
      a: "Die Preise für Umzugsunternehmen in der Schweiz variieren je nach Region und Umfang. In Ballungsgebieten wie Zürich, Basel oder Genf sind die Preise oft höher als in ländlicheren Regionen. Ein durchschnittlicher Umzug kostet zwischen 1.500 und 4.000 CHF. Durch den Vergleich mehrerer Offerten von Umzugsanbietern in Ihrer Region finden Sie die besten Preise und können erheblich sparen. Lokale Umzugsunternehmen können oft günstigere Preise anbieten, da sie kürzere Anfahrtswege haben."
    },
    {
      q: "Wie viel zahlt man für einen Umzug?",
      a: "Die Kosten für einen Umzug hängen von mehreren Faktoren ab. Ein kleiner Umzug (1.5-2.5 Zimmer) kostet durchschnittlich 600-1.200 CHF, ein mittlerer Umzug (3.5 Zimmer) 1.100-1.800 CHF, und ein grosser Umzug (4.5+ Zimmer) ab 1.600 CHF. Zusätzliche Kosten können für Verpackungsservice, Umzugsreinigung, Spezialtransporte oder Wochenendtermine anfallen. Der Vergleich mehrerer Offerten von Umzugsanbietern vor Ort hilft Ihnen, die besten Preise zu finden. Regionale Umzugsunternehmen können durch kürzere Anfahrtswege günstiger sein."
    },
    {
      q: "Warum sollte ich eine Umzugsfirma in der Nähe wählen?",
      a: "Eine Umzugsfirma in der Nähe bietet mehrere Vorteile: Kürzere Anfahrtswege reduzieren die Kosten und Umweltbelastung, lokale Expertise über Verkehrssituationen, Parkregelungen und bauliche Besonderheiten Ihrer Region, schnellere Reaktionszeiten bei Notfällen oder kurzfristigen Änderungen, persönlicherer Service und bessere Erreichbarkeit, sowie Unterstützung der lokalen Wirtschaft. Regionale Umzugsfirmen kennen die örtlichen Gegebenheiten besonders gut und können den Transportweg optimal planen."
    },
    {
      q: "Wie viele Offerten erhalte ich von Umzugsfirmen in meiner Nähe?",
      a: "Sie erhalten bis zu 6 kostenlose und unverbindliche Offerten von qualitätsgeprüften Umzugsanbietern aus Ihrer Region. Nachdem Sie das Formular ausgefüllt haben, nehmen die lokalen Umzugsunternehmen direkt Kontakt mit Ihnen auf (per Telefon oder E-Mail) und erstellen Ihnen eine individuelle Offerte. In Ballungsgebieten wie Zürich, Basel oder Bern erhalten Sie meist alle 6 Offerten, in ländlicheren Regionen können es auch 3-4 Offerten sein. Jede Offerte wird individuell auf Ihre Bedürfnisse zugeschnitten."
    },
    {
      q: "Ist der Service wirklich kostenlos?",
      a: "Ja, unser Service ist für Sie als anfragende Person zu 100% kostenlos und unverbindlich. Sie erhalten bis zu 6 Offerten von geprüften Umzugsfirmen in Ihrer Region, ohne dafür etwas zu bezahlen. Es gibt keine versteckten Gebühren oder Verpflichtungen. Sie entscheiden selbst, ob und welche Offerte Sie annehmen möchten. Die Umzugsfirmen zahlen eine kleine Gebühr, wenn Sie deren Offerte annehmen – für Sie bleibt der Service komplett kostenlos."
    },
    {
      q: "Wie wird die Qualität der Umzugsfirmen sichergestellt?",
      a: "Wir arbeiten nur mit geprüften und versicherten Partnerfirmen zusammen. Alle Umzugsunternehmen in unserem Netzwerk durchlaufen einen strengen Prüfprozess, der Versicherungen, Lizenzen und Referenzen umfasst. Zusätzlich können Sie die Bewertungen anderer Kunden einsehen, um sich ein umfassendes Bild von der Qualität der Dienstleistung zu machen. Unsere Partner sind etablierte Umzugsanbieter mit langjähriger Erfahrung. Wir überprüfen regelmässig die Qualität unserer Partnerfirmen."
    },
    {
      q: "Wie lange im Voraus sollte ich eine Umzugsfirma in der Nähe buchen?",
      a: "Wir empfehlen, mindestens 1-2 Monate im Voraus zu buchen, besonders in den Sommermonaten und zum Monatsende, da dies die geschäftigsten Zeiten für Umzugsunternehmen sind. Frühzeitige Buchung gibt Ihnen mehr Auswahl bei lokalen Umzugsanbietern und oft auch bessere Preise. Last-Minute-Buchungen sind oft deutlich teurer und die Auswahl an verfügbaren Umzugsunternehmen ist begrenzt. Planen Sie Ihren Umzug frühzeitig und fordern Sie rechtzeitig Offerten an."
    },
    {
      q: "Was sollte eine gute Offerte einer Umzugsfirma enthalten?",
      a: "Eine professionelle Offerte sollte folgende Informationen enthalten: Gesamtpreis mit detaillierter Aufschlüsselung, alle enthaltenen Leistungen (Verpackung, Transport, Montage/Demontage), Versicherungsschutz und Deckungssumme, Umzugsdatum und Zeitfenster, Anzahl der Umzugshelfer und Fahrzeuge, Zusatzleistungen und deren Kosten, Zahlungsbedingungen und Stornierungsbedingungen. Achten Sie darauf, dass alle Leistungen schriftlich festgehalten sind. Eine seriöse Umzugsfirma bietet transparente Offerten ohne versteckte Kosten."
    },
    {
      q: "Kann ich auch für Auslandumzüge eine Umzugsfirma in der Nähe finden?",
      a: "Ja, viele Umzugsunternehmen in der Schweiz bieten auch Auslandumzüge an. Auch wenn die Zielregion im Ausland liegt, können lokale Umzugsanbieter mit internationaler Expertise die beste Wahl sein. Sie können in Ihrer Anfrage angeben, dass es sich um einen Auslandumzug handelt, und erhalten Offerten von spezialisierten Anbietern. Auslandumzüge erfordern zusätzliche Planung und Dokumentation, daher sollten Sie diese frühzeitig anfragen."
    },
    {
      q: "Wie kann ich bei einer Umzugsfirma in der Nähe sparen?",
      a: "Der beste Weg, um zu sparen, ist der Vergleich mehrerer Offerten. Studien zeigen, dass Kunden durch den Vergleich durchschnittlich 30-40% der Umzugskosten einsparen können. Weitere Sparmöglichkeiten: Flexibel beim Umzugsdatum sein (Wochentage sind oft günstiger als Wochenenden), Eigenleistung beim Packen erbringen, vor dem Umzug ausmisten und nicht benötigte Gegenstände verkaufen oder entsorgen, frühzeitig buchen (Last-Minute-Buchungen sind teurer), und Offerten genau vergleichen - nicht nur auf den Preis achten, sondern auch auf enthaltene Leistungen. Regionale Umzugsunternehmen können durch kürzere Anfahrtswege zusätzliche Einsparungen bieten."
    },
    {
      q: "Sind die Umzugsfirmen in meiner Nähe versichert?",
      a: "Ja, alle Umzugsfirmen in unserem Netzwerk sind geprüft und verfügen über eine gültige Transportversicherung sowie Betriebshaftpflichtversicherung. Wir prüfen alle Partnerfirmen vor der Aufnahme in unser Netzwerk auf Versicherungen, Lizenzen und Referenzen. Die Versicherungsdetails sind in der Regel in den Offerten enthalten, falls nicht, sollten Sie danach fragen. Eine seriöse Umzugsfirma in Ihrer Nähe wird Ihnen gerne die Versicherungsnachweise zeigen."
    },
    {
      q: "Was passiert, nachdem ich eine Anfrage gesendet habe?",
      a: "Nachdem Sie das Formular ausgefüllt haben, wird Ihre Anfrage an passende Umzugsunternehmen in Ihrer Region weitergeleitet. Diese nehmen dann direkt Kontakt mit Ihnen auf (per Telefon oder E-Mail) und erstellen Ihnen eine individuelle Offerte. Sie erhalten in der Regel innerhalb von 24-48 Stunden die ersten Rückmeldungen von den lokalen Umzugsanbietern. Alle Offerten werden Ihnen direkt von den Umzugsunternehmen zugesendet und enthalten alle wichtigen Details wie Preis, Leistungen, Versicherungen und Kontaktinformationen."
    },
    {
      q: "Wie erkenne ich eine seriöse Umzugsfirma in der Nähe?",
      a: "Eine seriöse lokale Umzugsfirma erkennt man an mehreren Merkmalen: Sie bietet schriftliche, detaillierte Offerten mit klarer Preisaufschlüsselung, verfügt über gültige Versicherungen und kann Referenzen vorweisen, ist erreichbar und antwortet schnell auf Anfragen, kommuniziert professionell und transparent, bietet eine kostenlose Besichtigung vor Ort bei grösseren Umzügen, und hat positive Bewertungen von anderen Kunden. Vermeiden Sie Umzugsanbieter, die nur mündliche Zusagen machen oder Druck ausüben."
    },
    {
      q: "Was sind die Vorteile einer regionalen Umzugsfirma?",
      a: "Regionale Umzugsunternehmen in Ihrer Nähe bieten zahlreiche Vorteile: Kürzere Anfahrtswege reduzieren Kosten und Umweltbelastung, lokale Expertise über Verkehrssituationen und Parkregelungen, schnellere Reaktionszeiten bei Notfällen, persönlicherer Service und bessere Erreichbarkeit, Kenntnis der örtlichen Gegebenheiten und baulichen Besonderheiten, sowie Unterstützung der lokalen Wirtschaft. Lokale Umzugsanbieter können den Transportweg optimal planen und vermeiden unnötige Komplikationen."
    }
  ]

  const benefits = [
    {
      icon: Route,
      title: "Kürzere Anfahrtswege",
      description: "Lokale Umzugsunternehmen haben kürzere Anfahrtswege, was die Kosten reduziert und die Umweltbelastung minimiert."
    },
    {
      icon: Navigation2,
      title: "Lokale Expertise",
      description: "Regionale Umzugsfirmen kennen die örtlichen Gegebenheiten, Verkehrssituationen und Parkregelungen besonders gut."
    },
    {
      icon: Clock,
      title: "Schnellere Reaktionszeiten",
      description: "Bei Notfällen oder kurzfristigen Änderungen können regionale Umzugsfirmen schneller reagieren."
    },
    {
      icon: HeartHandshake,
      title: "Persönlicher Service",
      description: "Lokale Umzugsfirmen legen oft mehr Wert auf persönliche Beziehungen und langfristige Kundenbindung."
    },
    {
      icon: Building,
      title: "Unterstützung der lokalen Wirtschaft",
      description: "Durch die Beauftragung einer regionalen Umzugsfirma unterstützen Sie lokale Unternehmen."
    },
    {
      icon: ShieldCheck,
      title: "Bessere Erreichbarkeit",
      description: "Regionale Umzugsfirmen sind erreichbarer und reagieren schneller auf Ihre Anliegen."
    }
  ]

  const locations = [
    { name: "Umzugsfirma Zürich", link: "/umzugsfirma-zuerich" },
    { name: "Umzugsfirma Basel", link: "/umzugsfirma-basel" },
    { name: "Umzugsfirma Bern", link: "/umzugsfirma-bern" },
    { name: "Umzugsfirma Genf", link: "/umzugsfirma-genf" },
    { name: "Umzugsfirma Lausanne", link: "/umzugsfirma-lausanne" },
    { name: "Umzugsfirma Luzern", link: "/umzugsfirma-luzern" },
    { name: "Umzugsfirma St. Gallen", link: "/umzugsfirma-st-gallen" }
  ]

  return (
    <>
      {/* Hero Section - Unique Design for Local Search */}
      <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:col-span-3"
            >
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold text-sm mb-6">
                <MapPin className="h-4 w-4 mr-2" />
                Lokale Umzugsfirmen finden
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Umzugsfirma in der Nähe finden » Geprüfte Partner vergleichen
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                Eine Umzugsfirma in der Nähe zu finden, ist der erste Schritt zu einem erfolgreichen Umzug. Bereits bei der Suche nach einem passenden Umzugsunternehmen lohnt es sich, frühzeitig verschiedene Anbieter zu recherchieren. Wenn Sie nach einem Umzugsservice vor Ort suchen, sollten Sie mehrere regionale Umzugsunternehmen vergleichen, da die Auswahl des richtigen Anbieters entscheidend für einen reibungslosen Ablauf und die Kosten ist. Bei Online-Offerten.ch können Sie kostenlose Offerten von geprüften Umzugsanbietern in Ihrer Region anfordern und diese in Ruhe vergleichen. Bei Fragen oder Unsicherheiten kann zudem professioneller Rat sehr hilfreich sein.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleCtaClick}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Jetzt Umzugsfirma in der Nähe finden
                </Button>
                <Button
                  onClick={() => router.push('/umzugskosten-rechner')}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Kosten berechnen
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>Lokale Umzugsfirmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>100% kostenlos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>Nur geprüfte Firmen</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span>Bis zu 40% sparen</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative md:col-span-2"
            >
              <div className="mb-6">
                <img 
                  src="/image/umzugsservice-schweiz/umzugsfirma-in-der-naehe-finden.png" 
                  alt="Umzugsfirma in der Nähe finden" 
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-green-200">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-green-100 p-4 rounded-full">
                    <Navigation className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Local Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Warum eine lokale Umzugsfirma wählen?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Ein Umzugsservice vor Ort bietet zahlreiche Vorteile, die oft übersehen werden. Regionale Umzugsunternehmen in Ihrer Region kennen die örtlichen Gegebenheiten, Verkehrssituationen und Parkregelungen besonders gut. Der Standort des Umzugsunternehmens spielt dabei eine wichtige Rolle, da er die logistische Planung und die Effizienz des Umzugs erheblich erleichtert. Lokale Zügelfirmen haben kürzere Anfahrtswege, was die Kosten reduziert und die Umweltbelastung minimiert. Umzugsanbieter vor Ort können schneller auf Notfälle oder kurzfristige Änderungen reagieren. Ein weiterer Vorteil ist die oft gelobte Pünktlichkeit lokaler Anbieter, die für einen reibungslosen Ablauf sorgt.
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
                <Card className="h-full border-2 hover:border-green-500 transition-colors">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              So finden Sie einen Umzugsservice vor Ort
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Um den richtigen Umzugsanbieter in Ihrer Nähe zu finden, sollten Sie systematisch vorgehen. Eine sorgfältige Vorbereitung ist dabei entscheidend, um einen reibungslosen Umzug zu gewährleisten – dazu gehört auch die frühzeitige Planung und Organisation aller notwendigen Schritte. Zunächst definieren Sie Ihre Anforderungen: Umzugsdatum, Umzugsstrecke, Wohnungsgrösse und gewünschte Leistungen. Dann fordern Sie mehrere Offerten von verschiedenen lokalen Umzugsunternehmen an – am besten über ein Vergleichsportal wie Online-Offerten.ch. Vergleichen Sie die Offerten nicht nur nach Preis, sondern auch nach enthaltenen Leistungen, Versicherungen und Bewertungen. Eine regionale Umzugsfirma kann Vorteile haben, aber auch weiter entfernte Anbieter können gute Angebote machen. Eine individuelle Beratung unterstützt Sie zusätzlich dabei, das passende Umzugsunternehmen auszuwählen.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Anfrage ausfüllen",
                description: "Beschreiben Sie Ihren Umzug in unserem Formular. Geben Sie Umzugsdatum, Wohnungsgrösse, Start- und Zielort an. Je genauer Ihre Angaben, desto präziser sind die Offerten.",
                icon: FileText
              },
              {
                number: "02",
                title: "Offerten erhalten",
                description: "Erhalten Sie bis zu 6 Offerten von lokalen Umzugsunternehmen. Die Anbieter nehmen direkt Kontakt mit Ihnen auf und erstellen individuelle Offerten.",
                icon: Mail
              },
              {
                number: "03",
                title: "Vergleichen & auswählen",
                description: "Vergleichen Sie Preise, Leistungen und Bewertungen. Wählen Sie den besten Umzugsanbieter in Ihrer Region für Ihren Umzug aus.",
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
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Umzugsfirmen in Ihrer Region
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Finden Sie Umzugsfirmen in den grössten Städten der Schweiz. Wir vermitteln Ihnen geprüfte Partner aus Ihrer Region.
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Content Section - SEO Rich Content */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-gray-700 leading-relaxed space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Vorteile regionaler Umzugsunternehmen
                </h3>
                <p>
                  Die Wahl eines Umzugsservice vor Ort bietet zahlreiche Vorteile. Lokale Umzugsunternehmen kennen die örtlichen Gegebenheiten, Verkehrssituationen und baulichen Besonderheiten besonders gut. Eine Umzugsfirma in Ihrer Nähe hat kürzere Anfahrtswege, was die Kosten reduziert. Regionale Zügelfirmen sind oft flexibler bei kurzfristigen Änderungen oder Notfällen. Lokale Anbieter legen oft mehr Wert auf persönliche Beziehungen und langfristige Kundenbindung und können besonders gut auf die individuellen Wünsche und Vorstellungen ihrer Kunden eingehen.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Wie viel kostet ein Umzugsservice vor Ort?
                </h3>
                <p>
                  Die Umzugskosten für einen Umzugsanbieter in Ihrer Region hängen von verschiedenen Faktoren ab: Umzugsstrecke, Umfang des Umzugsguts, Anzahl der Stockwerke, benötigte Leistungen und Umzugsdatum. Viele Anbieter bieten einen Festpreis oder eine Abrechnung nach Aufwand an, sodass Sie zwischen transparenter Kostenplanung und flexibler Abrechnung wählen können. Beim Kostenvoranschlag sollten alle relevanten Räume und spezielle Gegenstände (z.B. Keller, Dachboden, Klavier) berücksichtigt werden, um realistische Angebote zu erhalten. Lokale Umzugsunternehmen können durch kürzere Anfahrtswege günstigere Preise anbieten. Ein durchschnittlicher Wohnungsumzug in der Schweiz kostet zwischen 1.500 und 4.000 CHF. Der beste Weg, um faire Preise zu finden, ist der Vergleich mehrerer Offerten von verschiedenen Umzugsanbietern in Ihrer Nähe.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Umzugscheckliste: Schritt für Schritt zum erfolgreichen Umzug
                </h3>
                <p className="mb-4">
                  Ein gelungener Umzug beginnt mit einer durchdachten Planung und der richtigen Umzugsfirma an Ihrer Seite. Mit dieser Umzugscheckliste behalten Sie den Überblick und stellen sicher, dass Ihr Umzug in die neue Wohnung reibungslos und stressfrei abläuft:
                </p>
                <ul className="list-disc list-inside space-y-3 text-gray-700 mb-4 pl-4">
                  <li><strong>Frühzeitig planen:</strong> Starten Sie mindestens acht Wochen vor dem gewünschten Umzugsdatum mit der Organisation. So bleibt genügend Zeit, um eine zuverlässige Umzugsfirma in der Nähe zu finden, Angebote einzuholen und die besten Dienstleistungen für Ihren Umzug auszuwählen.</li>
                  <li><strong>Umzugsfirmen recherchieren:</strong> Suchen Sie gezielt nach erfahrenen Umzugsfirmen in Ihrer Umgebung, die sowohl Privat- als auch Firmenumzüge professionell durchführen. Lesen Sie aktuelle Bewertungen, holen Sie Empfehlungen ein und achten Sie auf die Erfahrung und Zuverlässigkeit der Anbieter.</li>
                  <li><strong>Kostenlose Besichtigung vereinbaren:</strong> Viele Umzugsunternehmen bieten eine unverbindliche Besichtigung vor Ort an. Nutzen Sie diese Möglichkeit, um den Umfang Ihres Umzugsguts, besondere Anforderungen an den Transport oder die Lagerung sowie individuelle Wünsche direkt mit dem Team zu besprechen. So erhalten Sie einen transparenten Kostenvoranschlag.</li>
                  <li><strong>Verpackung und Material abstimmen:</strong> Klären Sie mit Ihrer Umzugsfirma, welches Verpackungsmaterial benötigt wird und ob dieses gestellt wird. Professionelle Anbieter sorgen dafür, dass Ihre Möbel und persönlichen Gegenstände sicher und fachgerecht verpackt werden – das minimiert das Risiko von Schäden beim Transport.</li>
                  <li><strong>Umzugsdatum und Zeit festlegen:</strong> Stimmen Sie das genaue Umzugsdatum und die Uhrzeit mit allen Beteiligten ab. So können Sie sicherstellen, dass das Team der Umzugsfirma pünktlich vor Ort ist und der Umzugsprozess reibungslos abläuft.</li>
                  <li><strong>Räumung und Reinigung organisieren:</strong> Planen Sie rechtzeitig die Räumung und Reinigung Ihrer alten Wohnung. Viele Umzugsfirmen bieten diese Dienstleistungen an und sorgen dafür, dass Sie Ihre alte Bleibe besenrein übergeben können.</li>
                  <li><strong>Lagerung und Transport klären:</strong> Falls Sie nicht alle Möbel oder Umzugsgüter sofort in die neue Wohnung bringen können, informieren Sie sich über die Möglichkeiten zur sicheren Lagerung. Seriöse Umzugsunternehmen bieten flexible Lösungen für Lagerung und Transport an.</li>
                  <li><strong>Kommunikation und Koordination:</strong> Halten Sie während der gesamten Planung engen Kontakt zu Ihrer Umzugsfirma. So können Sie kurzfristige Änderungen, besondere Wünsche oder Fragen zum Ablauf jederzeit klären und Missverständnisse vermeiden.</li>
                  <li><strong>Am Umzugstag:</strong> Am Tag des Umzugs sollten alle Vorbereitungen abgeschlossen sein. Überprüfen Sie, ob alle Möbel und Kartons transportbereit sind, und halten Sie wichtige Dokumente sowie Schlüssel griffbereit. Das Team der Umzugsfirma kümmert sich um das sichere Verladen und den Transport Ihres Umzugsguts.</li>
                  <li><strong>Nach dem Umzug:</strong> Nach dem Entladen in der neuen Wohnung kontrollieren Sie, ob alle Gegenstände unversehrt angekommen sind. Prüfen Sie, ob alle vereinbarten Dienstleistungen – wie Aufbau der Möbel oder Endreinigung – zu Ihrer Zufriedenheit erledigt wurden.</li>
                </ul>
                <p>
                  Mit dieser Checkliste und einer erfahrenen Umzugsfirma in der Nähe an Ihrer Seite wird Ihr Umzug zum Erfolg. Eine gute Planung, transparente Kommunikation und professionelle Unterstützung sorgen dafür, dass Sie entspannt in Ihr neues Zuhause starten können.
                </p>

                <div className="bg-green-50 border-l-4 border-green-600 p-6 my-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    💡 Pro-Tipp: Lokale Umzugsunternehmen richtig auswählen
                  </h4>
                  <p className="text-gray-700">
                    Beim Vergleich von Umzugsanbietern in Ihrer Region ist die Auswahl des richtigen Unternehmens entscheidend. Sie sollten nicht nur auf den Preis achten. Vergleichen Sie auch die enthaltenen Leistungen, Versicherungssummen, Bewertungen und die Kommunikationsqualität. Ein Umzugsservice vor Ort mit lokaler Expertise kann trotz etwas höherem Preis das bessere Angebot sein, da er die örtlichen Gegebenheiten besser kennt und oft eine breite Palette an Serviceleistungen sowie einen umfassenden Service von der Beratung bis zur Endreinigung bietet.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
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
              Alles, was Sie über lokale Umzugsunternehmen wissen müssen – beantwortet von unseren Experten.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-green-600">
                    {item.q}
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
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto max-w-navbar px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bereit, lokale Umzugsunternehmen zu finden?
            </h2>
            <p className="text-xl mb-8 text-green-50">
              Fordern Sie jetzt kostenlos und unverbindlich bis zu 6 Offerten von geprüften Umzugsanbietern in Ihrer Region an. Vergleichen Sie Preise und sparen Sie bis zu 40% bei Ihrem Umzug.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleCtaClick}
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-xl"
              >
                <Zap className="mr-2 h-5 w-5" />
                Jetzt Umzugsfirma in der Nähe finden
              </Button>
              <Button
                onClick={() => router.push('/umzugskosten-rechner')}
                size="lg"
                className="bg-green-500 hover:bg-green-400 text-white border-2 border-white text-lg px-8 py-6 shadow-lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Kosten berechnen
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-green-50">
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
                <span>Nur geprüfte Umzugsfirmen</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Schnelle Antworten innerhalb von 24h</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default UmzugsfirmaInDerNaehePageClient
