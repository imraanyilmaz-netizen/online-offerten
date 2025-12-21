'use client'

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Check, Shield, Star, TrendingUp, FileText, ShieldCheck, MessageSquare, Award, Search, Truck, PiggyBank, Calendar, AlertTriangle, ArrowRight, Rocket, ClipboardCheck, Users, ThumbsUp } from 'lucide-react';

const UmzugsfirmaVergleichenPageClient = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const howItWorksIcons = [ClipboardCheck, Rocket, Users, ThumbsUp];
  const checklistIcons = [FileText, ShieldCheck, MessageSquare, Award, Search, Truck, FileText];
  const costFactorIcons = [Truck, ArrowRight, PiggyBank, FileText, Calendar, Award];

  // SEO Data
  const metaTitle = "Umzugsfirma vergleichen: Kostenlose Offerten & bis zu 40% sparen";
  const metaDescription = "Vergleichen Sie schnell und kostenlos die besten Umzugsfirmen in der Schweiz für Ihren Privatumzug oder die Reinigung. Sparen Sie Zeit und Geld mit nur einer Anfrage! Bis zu 6 Offerten im Vergleich.";
  // Meta keywords removed - Google no longer uses this tag (since 2009)
  const canonicalUrl = '/umzugsfirma-vergleichen';

  // Data
  const heroStats = [
    { label: "Kostenlos & Unverbindlich" },
    { label: "Geprüfte Partnerfirmen" },
    { label: "Bis zu 6 Offerten" }
  ];

  const howItWorksSteps = [
    {
      title: "Anfrage ausfüllen",
      description: "Beschreiben Sie Ihren Umzug in unserem intelligenten Formular. Je mehr Details, desto genauer die Offerten."
    },
    {
      title: "Offerten erhalten",
      description: "Wir leiten Ihre Anfrage an bis zu 6 passende, geprüfte Umzugsfirmen aus Ihrer Region weiter."
    },
    {
      title: "Vergleichen & Wählen",
      description: "Sie erhalten die Offerten direkt per E-Mail. Vergleichen Sie Preise, Leistungen und Bewertungen in aller Ruhe."
    },
    {
      title: "Sparen & Umziehen",
      description: "Wählen Sie die beste Firma für sich aus und freuen Sie sich auf einen reibungslosen und günstigen Umzug."
    }
  ];

  const checklistItems = [
    {
      title: "Transparente Preisgestaltung",
      content: "Eine seriöse Offerte ist ein detailliertes Dokument, kein schneller Kostenvoranschlag. Alle Posten müssen klar aufgeschlüsselt sein: Arbeitsstunden, Anzahl der Mitarbeiter, Fahrzeugkosten, Kilometerpauschale und Material. Achten Sie auf einen verbindlichen Festpreis oder klar definierte Stundensätze. Fragen Sie proaktiv nach potenziellen Zusatzkosten für Parkverbotszonen, Möbellifte oder den Transport von schweren Gegenständen wie Klavieren."
    },
    {
      title: "Umfassender Versicherungsschutz",
      content: "Ein Missgeschick kann immer passieren. Entscheidend ist, wie damit umgegangen wird. Eine professionelle Firma muss eine Transportversicherung (deckt Schäden während des Transports) und eine Betriebshaftpflichtversicherung (deckt Schäden in der Wohnung) vorweisen können. Lassen Sie sich die Versicherungspolicen zeigen und prüfen Sie die Deckungssummen. Sind diese zu niedrig, bleiben Sie im schlimmsten Fall auf dem Schaden sitzen."
    },
    {
      title: "Echte Kundenbewertungen",
      content: "Authentische Bewertungen auf unabhängigen Portalen (wie Google, oder spezialisierte Plattformen) sind ein unschätzbarer Indikator für die Zuverlässigkeit einer Firma. Lesen Sie nicht nur die Sternebewertungen, sondern auch die Kommentare. Wie geht die Firma mit Kritik um? Wiederholen sich bestimmte Lobeshymnen oder Beschwerden? Das gibt Ihnen ein realistisches Bild vom Service."
    },
    {
      title: "Klar definierter Leistungsumfang",
      content: "Die günstigste Offerte ist nicht immer die beste. Prüfen Sie, ob Äpfel mit Äpfeln verglichen werden. Ist der Ein- und Auspackservice enthalten? Werden Möbel fachgerecht demontiert und wieder montiert? Ist die Endreinigung mit Abnahmegarantie Teil des Pakets? Eine detaillierte Leistungsbeschreibung im Vertrag verhindert Missverständnisse am Umzugstag."
    },
    {
      title: "Erfahrung und lokales Know-how",
      content: "Ein etabliertes Unternehmen mit langjähriger Erfahrung kennt die Tücken des Geschäfts und die lokalen Gegebenheiten (z.B. Verkehrssituation, Parkregelungen). Ein professioneller Webauftritt, ein Eintrag im Handelsregister (prüfbar auf zefix.ch) und ein fester Ansprechpartner sind Zeichen von Seriosität und Stabilität."
    },
    {
      title: "Kostenlose Besichtigung",
      content: "Bei Umzügen, die über eine 1-Zimmer-Wohnung hinausgehen, ist eine kostenlose und unverbindliche Besichtigung vor Ort ein Muss. Nur so kann das Umzugsvolumen exakt bestimmt und eine verbindliche offerten erstellt werden. Firmen, die nur am Telefon einen Pauschalpreis nennen, sind oft unprofessionell und es drohen Nachforderungen."
    },
    {
      title: "Schriftlicher Vertrag",
      content: "Verlassen Sie sich niemals auf mündliche Absprachen. Ein detaillierter, schriftlicher Umzugsvertrag ist unerlässlich. Er sollte alle vereinbarten Leistungen, den Festpreis oder die Stundensätze, den Umzugstermin und die Versicherungsdetails enthalten. Beide Parteien sollten den Vertrag vor dem Umzugstag unterzeichnen."
    }
  ];

  const redFlagsItems = [
    "Kein Impressum, keine Handelsregisternummer oder nur eine Handynummer als Kontakt.",
    "Aggressive Werbung mit unrealistischen 'ab CHF 199'-Preisen.",
    "Forderung nach hohen Vorauszahlungen, insbesondere in bar.",
    "Druck am Telefon, sich sofort zu entscheiden ('Diese Offerte gilt nur heute!').",
    "Keine Bereitschaft zu einer kostenlosen Besichtigung vor Ort.",
    "Unklare oder ausweichende Antworten auf Fragen zur Versicherung.",
    "Schlechte oder gefälscht wirkende Bewertungen im Internet.",
    "Das Unternehmen besteht auf einem mündlichen Vertrag."
  ];

  const costFactors = [
    {
      title: "Umzugsvolumen (in m³)",
      content: "Dies ist der grösste Hebel. Die Menge Ihres Hausrats bestimmt die Grösse des benötigten LKW und die Anzahl der Zügelmänner. Als Faustregel gilt: Pro Zimmer rechnet man mit ca. 10-15 m³. Ein Umzugsrechner kann hier eine genauere Schätzung liefern."
    },
    {
      title: "Distanz & Transportweg",
      content: "Die Entfernung zwischen dem alten und neuen Zuhause beeinflusst direkt die Transportkosten und die Arbeitszeit. Aber auch die Route spielt eine Rolle: Stadtverkehr ist zeitaufwändiger als eine freie Autobahnfahrt."
    },
    {
      title: "Zugänglichkeit & Stockwerke",
      content: "Ein Umzug aus dem 5. Stock ohne Lift ist deutlich aufwändiger als aus dem Erdgeschoss. Lange Laufwege vom LKW zur Haustür, enge Treppenhäuser oder die Notwendigkeit eines Möbellifts treiben den Preis in die Höhe."
    },
    {
      title: "Gewünschte Zusatzleistungen",
      content: "Der reine Transport ist nur die Basis. Benötigen Sie Hilfe beim Ein- und Auspacken? Sollen schwere Designermöbel fachgerecht demontiert und montiert werden? Brauchen Sie eine Endreinigung mit Abnahmegarantie oder die Entsorgung von Sperrmüll? Jede Zusatzleistung hat ihren Preis."
    },
    {
      title: "Umzugsdatum & Flexibilität",
      content: "Die Nachfrage bestimmt den Preis. Umzüge an offiziellen Zügelterminen (oft Monatsende/-anfang), an Wochenenden oder in den Sommermonaten sind am teuersten. Wer flexibel ist und unter der Woche umziehen kann, kann erheblich sparen."
    },
    {
      title: "Wert des Umzugsguts",
      content: "Wenn Sie wertvolle Antiquitäten, Kunstwerke oder ein teures Klavier transportieren lassen, ist eine höhere Versicherungsdeckung (Zusatzversicherung) notwendig. Dies schlägt sich im Gesamtpreis nieder, ist aber eine unverzichtbare Absicherung."
    }
  ];

  const faqItems = [
    {
      question: "Wie viele Offerten sind ideal für einen Preisvergleich?",
      answer: "Drei bis sechs Offerten sind der 'Sweet Spot'. Weniger als drei gibt Ihnen keine solide Vergleichsbasis. Mehr als sechs kann schnell unübersichtlich und überwältigend werden. Unser System zielt darauf ab, Ihnen genau diese optimale Anzahl an passenden Angeboten zu liefern."
    },
    {
      question: "Was bedeutet 'Abnahmegarantie' bei der Umzugsreinigung wirklich?",
      answer: "Die Abnahmegarantie ist Ihr Rundum-sorglos-Paket. Die Reinigungsfirma verpflichtet sich, bei der Wohnungsübergabe an den Vermieter anwesend zu sein. Sollte der Vermieter einen Bereich beanstanden, führt die Firma die Nachreinigung sofort und ohne zusätzliche Kosten durch. So ist die Rückgabe Ihres Mietzinsdepots gesichert."
    },
    {
      question: "Pauschalpreis oder Stundensatz – was ist besser für mich?",
      answer: "Für die meisten Umzüge bietet ein Pauschalpreis (Festpreis) die grösste Sicherheit. Sie wissen von Anfang an genau, welche Kosten auf Sie zukommen. Ein Stundensatz kann bei sehr kleinen, perfekt vorbereiteten Umzügen mit kurzen Wegen günstiger sein, birgt aber das Risiko, dass unvorhergesehene Verzögerungen (z.B. Stau, defekter Lift) die Kosten in die Höhe treiben."
    },
    {
      question: "Wie lange im Voraus sollte ich eine Zügelfirma buchen?",
      answer: "Beginnen Sie idealerweise 6-8 Wochen vor dem geplanten Umzugstermin mit der Suche. Gute und faire Unternehmen sind besonders zu den beliebten Zügelterminen (Ende/Anfang des Monats) schnell ausgebucht. Eine frühzeitige Planung gibt Ihnen mehr Auswahl und bessere Preise."
    },
    {
      question: "Muss ich für die Offerten bezahlen?",
      answer: "Nein, absolut nicht. Alle Offerten, die Sie über unsere Plattform erhalten, sind zu 100% kostenlos und unverbindlich. Sie gehen keinerlei Verpflichtung ein. Sie entscheiden in aller Ruhe, ob und welche Offerte Sie annehmen möchten."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "headline": metaTitle,
    "description": metaDescription,
    "image": "https://online-offerten.ch/og-image-umzugsfirma-vergleichen.jpg",
    "author": {
      "@type": "Organization",
      "name": "Online-Offerten.ch"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Online-Offerten.ch",
      "logo": {
        "@type": "ImageObject",
        "url": "https://online-offerten.ch/android-chrome-512x512.png"
      }
    },
    "datePublished": "2025-07-08",
    "dateModified": "2025-07-08"
  };

  return (
    <>
      
      <div className="bg-slate-50">
        
        <section className="relative bg-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-white"></div>
          <div className="relative container mx-auto max-w-navbar px-4 md:px-6 py-20 md:py-28 text-center z-10">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 tracking-tight">Umzugsfirmen clever vergleichen und bis zu 40% sparen</h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">Der definitive Leitfaden für Ihren stressfreien Umzug in der Schweiz. Holen Sie mehrere Offerten von Umzugsfirmen ein und finden Sie geprüfte Profis für Privatumzug und Reinigung. Erhalten Sie transparente Angebote und treffen Sie die beste Wahl für Ihr Budget und Ihre Nerven.</p>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold group px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <Link href="/kostenlose-offerte-anfordern">
                  Jetzt kostenlos Offerten anfordern
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <motion.div 
                className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {heroStats.map((stat, index) => (
                  <motion.div key={index} variants={fadeIn} className="bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-md border border-gray-200/50 flex items-center justify-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-700">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto max-w-navbar px-4 md:px-6 py-16 md:py-24 space-y-20 md:space-y-28">
          
          <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-12 text-center">So einfach funktioniert der Vergleich</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {howItWorksSteps.map((step, index) => {
                const Icon = howItWorksIcons[index];
                return (
                  <motion.div key={index} variants={fadeIn} className="relative flex flex-col items-center">
                    <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 border-4 border-white shadow-lg">
                      <Icon className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">{step.title}</h3>
                    <p className="text-slate-600">{step.description}</p>
                    {index < 3 && <div className="hidden md:block absolute top-10 left-1/2 w-full border-t-2 border-dashed border-gray-300 mt-0 ml-10"></div>}
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="bg-white shadow-xl p-6 md:p-10 border-t-4 border-green-500">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">So finden Sie die beste Umzugsfirma: Ihr Leitfaden zum Preisvergleich</h2>
              <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4">
                <p>Ein Umzug ist mehr als nur der Transport von Kisten von A nach B; er ist ein bedeutender Schritt in einen neuen Lebensabschnitt. Die Wahl der richtigen Umzugsfirma ist dabei der entscheidende Faktor, der über einen stressfreien Start oder ein kostspieliges Chaos entscheidet. Viele machen den Fehler, sich von der erstbesten oder vermeintlich günstigsten Offerte locken zu lassen, ohne die Details zu prüfen. Doch ein gründlicher Preisvergleich mehrerer Anbieter ist unerlässlich, um versteckte Kosten, unzureichenden Versicherungsschutz oder unprofessionelle Dienstleistungen zu vermeiden. Eine seriöse Zügelfirma bietet Transparenz, Verlässlichkeit und die Sicherheit, dass Ihr Hab und Gut in besten Händen ist. Es geht darum, einen Partner zu finden, dem Sie vertrauen können – einen Partner, der die Komplexität Ihres Umzugs versteht und Ihnen mit Rat und Tat zur Seite steht. Ein systematischer Vergleich mehrerer Offerten schützt Sie nicht nur vor finanziellen Überraschungen, sondern sichert auch die Qualität und Sorgfalt, die Ihr Eigentum verdient. Nehmen Sie sich die Zeit, Angebote detailliert zu prüfen, denn diese Investition zahlt sich in Form von gespartem Geld, Zeit und Nerven um ein Vielfaches aus.</p>
                <p>Der Prozess, verschiedene Umzugsfirmen miteinander zu vergleichen, kann auf den ersten Blick überwältigend wirken. Unzählige Anbieter werben mit verlockenden Preisen, doch wie trennt man die Spreu vom Weizen? Genau hier setzt unsere Plattform an. Anstatt stundenlang im Internet zu recherchieren, unzählige Telefonate zu führen und auf Rückmeldungen zu warten, bündeln wir den Prozess für Sie. Mit nur einer einzigen, kostenlosen Anfrage erreichen Sie ein Netzwerk von sorgfältig geprüften und qualifizierten Umzugsunternehmen in Ihrer Region. Diese Firmen wissen, dass sie im direkten Wettbewerb zueinander stehen, was sie dazu motiviert, Ihnen nicht nur wettbewerbsfähige, sondern auch faire und transparente Offerten zu unterbreiten. Sie erhalten bis zu sechs Angebote direkt in Ihr Postfach. So können Sie in aller Ruhe Preise, den detaillierten Leistungsumfang, Kundenbewertungen und die angebotenen Versicherungsleistungen nebeneinanderlegen. Dieser strukturierte Ansatz ermöglicht es Ihnen, eine fundierte Entscheidung zu treffen, die nicht allein auf dem Preis basiert, sondern das beste Gesamtpaket aus Kosten, Service und Vertrauenswürdigkeit berücksichtigt. Starten Sie jetzt Ihre Offertensuche und machen Sie den ersten Schritt zu einem reibungslosen und erfolgreichen Umzug.</p>
              </div>
            </Card>
          </motion.section>

          <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-12 text-center">Die ultimative Checkliste: 7 Kriterien für die beste Umzugsfirma</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {checklistItems.map((item, index) => {
                const Icon = checklistIcons[index % checklistIcons.length];
                return (
                  <motion.div key={index} variants={fadeIn}>
                    <Card className="bg-white shadow-lg hover:shadow-2xl h-full transition-shadow duration-300">
                      <CardHeader className="flex flex-row items-start gap-4">
                        <div className="p-3 bg-green-100 rounded-full mt-1">
                          <Icon className="w-6 h-6 text-green-600" />
                        </div>
                        <CardTitle className="text-xl font-bold text-slate-800">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">{item.content}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="bg-red-50 border-l-8 border-red-500 p-6 md:p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <AlertTriangle className="w-10 h-10 text-red-600 flex-shrink-0" />
                <h2 className="text-2xl md:text-3xl font-bold text-red-800">Rote Flaggen: Bei diesen Anzeichen ist Vorsicht geboten</h2>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {redFlagsItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-red-700">
                    <AlertTriangle className="w-5 h-5 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.section>

          <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3 text-center">Was kostet ein Umzug? Die 6 wichtigsten Kostenfaktoren im Detail</h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">Die Kosten für einen Umzug sind so individuell wie der Umzug selbst. Um mehrere Anbieter miteinander zu vergleichen und Offerten fair bewerten zu können, müssen Sie die entscheidenden Preistreiber kennen:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {costFactors.map((factor, index) => {
                const Icon = costFactorIcons[index % costFactorIcons.length];
                return (
                  <motion.div key={index} variants={fadeIn} className="bg-white p-6 rounded-lg shadow-lg border-t-2 border-green-400">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 bg-green-100 rounded-full">
                        <Icon className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">{factor.title}</h3>
                    </div>
                    <p className="text-slate-600">{factor.content}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 text-center">Häufig gestellte Fragen zum Preisvergleich von Umzugsfirmen</h2>
            <Accordion type="single" collapsible className="w-full max-w-navbar mx-auto bg-white p-4 rounded-lg shadow-xl">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline text-slate-800">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-slate-600 leading-relaxed pt-2 pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.section>

          <motion.section 
            className="text-center py-16 md:py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl shadow-2xl"
            variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Starten Sie jetzt Ihre Offertensuche</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto px-4">Verschwenden Sie keine Zeit mehr mit mühsamer Recherche. Füllen Sie unser Formular in wenigen Minuten aus und lassen Sie die besten Umzugsfirmen um Sie werben. Einfach, schnell und effizient.</p>
            <Button asChild size="lg" className="bg-white text-green-700 hover:bg-gray-100 font-bold group px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <Link href="/kostenlose-offerte-anfordern">
                Jetzt kostenlos Offerten anfordern
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.section>

        </div>
      </div>
    </>
  );
};

export default UmzugsfirmaVergleichenPageClient;
