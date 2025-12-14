'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cantonRegisterLinks } from '@/data/cantonRegisterLinks';
import { CheckCircle, ArrowRight, PiggyBank, Target, BarChart, BookOpen, AlertTriangle, ShieldCheck, ThumbsUp, Wallet, Star, ChevronsUpDown, Check } from 'lucide-react';

const GuenstigUmziehenPageClient = () => {
  const router = useRouter();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const scrollToTips = () => {
    const element = document.getElementById('smart-saving-tips');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const CantonRegisterDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-2 bg-green-100 border-green-300 text-green-800 hover:bg-green-200">
          Handelsregister
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-60 overflow-y-auto">
        {cantonRegisterLinks.map((canton) => (
          <DropdownMenuItem key={canton.canton} asChild>
            <a href={canton.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
              {canton.name} ({canton.canton})
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // SEO Data
  const metaTitle = "Günstig umziehen: Der komplette Guide 2025 zum Sparen";
  const metaDescription = "Günstig umziehen in der Schweiz? Entdecken Sie über 1500 Wörter voller Expertentipps, Kosten-Checklisten und erfahren Sie, wie Sie mit dem richtigen Firmenvergleich bis zu 40% sparen.";
  const metaKeywords = "günstig umziehen, umzugskosten sparen, preiswert umziehen, zügelfirma preise, umzugsfirma vergleich, kosten umzug schweiz, umzugstipps, umzugsbudget, umzugsfirma günstig, billig umziehen, umzug planen kosten";
  const canonicalUrl = '/guenstig-umziehen';

  // FAQ Data
  const faqItems = [
    {
      question: "Wie viel günstiger ist ein Umzug unter der Woche?",
      answer: "Die Ersparnis kann erheblich sein. Umzugsfirmen haben an Wochenenden und Monatsenden ihre höchste Auslastung. An einem Dienstag oder Mittwoch in der zweiten oder dritten Monatswoche können die Preise um 15-30% niedriger sein, da die Firmen ihre Mitarbeiter und Fahrzeuge gleichmässig auslasten wollen."
    },
    {
      question: "Ist ein Festpreis immer besser als ein Stundensatz?",
      answer: "Für 90% der Umzüge ja! Ein Festpreis (Pauschalangebot) gibt Ihnen absolute Kostensicherheit. Ein Stundensatz lohnt sich nur bei sehr kleinen, überschaubaren Umzügen, bei denen Sie sicher sind, dass alles reibungslos und schnell abläuft. Das Risiko von unvorhergesehenen Verzögerungen (Stau, Lift defekt) tragen bei einem Stundenlohn Sie."
    },
    {
      question: "Deckt meine Hausratversicherung Schäden beim Umzug ab?",
      answer: "In der Regel nur sehr eingeschränkt oder gar nicht, besonders wenn Freunde helfen. Professionelle Umzugsfirmen müssen eine Transport- und Betriebshaftpflichtversicherung haben. Klären Sie den Deckungsumfang VOR Vertragsabschluss ab. Das ist ein Punkt, bei dem Sparen gefährlich werden kann."
    },
    {
      question: "Wie erkenne ich eine unseriöse 'Billig-Firma'?",
      answer: (
        <>
          Achten Sie auf rote Flaggen: Kein vollständiges Impressum auf der Website, nur eine Handynummer, unrealistisch tiefe Lockvogelpreise (z.B. 'Umzug ab 99 CHF'), Forderung nach Barzahlung im Voraus und Druck am Telefon. Eine seriöse Firma können Sie im <CantonRegisterDropdown /> finden. Eine seriöse Firma wird immer auf eine detaillierte Offerte bestehen.
        </>
      )
    }
  ];

  // Smart Saving Tips
  const smartSavingTips = [
    {
      title: "1. Den richtigen Zeitpunkt wählen",
      text: "Umzüge am Monatsende und an Wochenenden sind am teuersten. Wenn Sie können, zügeln Sie an einem Dienstag oder Mittwoch in der Monatsmitte. Die Ersparnis kann bis zu 30% betragen."
    },
    {
      title: "2. Verpackungsmaterial kostenlos beschaffen",
      text: "Fragen Sie in Supermärkten, Buchhandlungen oder im Freundeskreis nach Bananenkisten oder gebrauchten Kartons. Nutzen Sie Handtücher, Bettwäsche und Kleidung als Polstermaterial für zerbrechliche Gegenstände."
    },
    {
      title: "3. Eigenleistung ist König",
      text: "Jede Stunde, die Sie den Profis abnehmen, ist bares Geld. Das Verpacken der Kisten und die Demontage einfacher Möbel (z.B. Regale, Betten) sind die grössten Sparhebel. Machen Sie Fotos vor der Demontage, das hilft beim Wiederaufbau."
    },
    {
      title: "4. Private Helfer clever einsetzen",
      text: "Mobilisieren Sie Freunde und Familie. Aber Vorsicht: Private Helfer sind nicht versichert! Setzen Sie sie für das Tragen von Kisten und leichten Teilen ein. Den Transport der schweren, teuren Möbel überlassen Sie den versicherten Profis."
    },
    {
      title: "5. Umzugskosten von der Steuer absetzen",
      text: "Wenn Sie aus beruflichen Gründen umziehen, können Sie die Umzugskosten oft als Werbungskosten geltend machen. Aber auch bei privaten Umzügen sind haushaltsnahe Dienstleistungen (z.B. die Arbeitsstunden der Möbelpacker) teilweise absetzbar. Bewahren Sie alle Rechnungen auf!"
    },
    {
      title: "6. Offerten AKTIV vergleichen",
      text: (
        <>
          Der grösste Fehler ist, nur eine offerten einzuholen. Nutzen Sie unsere Plattform, um mit einer einzigen Anfrage bis zu 6 Offerten von <Link href="/umzugsfirma-zuerich" className="text-green-600 hover:text-green-800 font-semibold underline">geprüften Firmen in Zürich</Link>, <Link href="/umzugsfirma-bern" className="text-green-600 hover:text-green-800 font-semibold underline">Bern</Link> oder Ihrer <Link href="/standorte" className="text-green-600 hover:text-green-800 font-semibold underline">Wunschregion</Link> zu erhalten. Der Wettbewerb zwischen den Anbietern drückt den Preis zu Ihren Gunsten.
        </>
      )
    },
    {
      title: "7. Verpflegung selbst organisieren",
      text: "Stellen Sie Ihren Helfern (privat und professionell) Getränke, belegte Brötchen und Snacks zur Verfügung. Das ist nicht nur eine nette Geste, sondern deutlich günstiger als eine grosse Pizza-Bestellung."
    },
    {
      title: "8. Nachsendeauftrag vermeiden",
      text: "Ändern Sie Ihre Adresse bei allen wichtigen Stellen (Banken, Versicherungen, Abonnements) mindestens vier Wochen vor dem Umzug. Ein Nachsendeauftrag bei der Post ist eine teure Notlösung."
    },
    {
      title: "9. Den Umzugswagen richtig beladen",
      text: "Wenn Sie selbst fahren: Schwere Gegenstände nach unten und an die Vorderachse. Lücken mit weichen Gegenständen füllen. Eine gute Beladung verhindert Schäden und spart im Idealfall eine zweite Fahrt."
    },
    {
      title: "10. Kaution clever finanzieren",
      text: "Die Mietkaution bindet viel Kapital. Eine Mietkautionsbürgschaft kann eine Alternative sein. Sie zahlen eine jährliche Prämie an eine Versicherung, die für die Kaution bürgt, und behalten so Ihre Liquidität für andere Ausgaben."
    }
  ];

  return (
    <>
      
      <div className="bg-slate-50">
        
        <section className="relative bg-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-white"></div>
          <div className="relative container mx-auto max-w-navbar px-4 md:px-6 py-20 md:py-28 text-center z-10">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 tracking-tight">Günstig Umziehen: Der ultimative Guide zum Sparen</h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">Ein Umzug muss kein Vermögen kosten. Entdecken Sie bewährte Strategien, clevere Tricks und wie Sie durch den Vergleich von Umzugsfirmen Ihr Budget schonen und stressfrei ins neue Zuhause starten.</p>
              <Button onClick={() => router.push('/kostenlose-offerte-anfordern')} size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold group px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                Jetzt kostenlos & unverbindlich Offerten vergleichen
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <motion.div 
                className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {[
                  { label: "Kostenlos & Unverbindlich" },
                  { label: "Geprüfte Firmen" },
                  { label: "Bis zu 40% sparen" }
                ].map((stat, index) => (
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
          
          <motion.section variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Card className="bg-white shadow-xl p-6 md:p-10 border-t-4 border-green-500">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Kann man in der Schweiz wirklich günstig umziehen?</h2>
              <div className="prose max-w-none text-slate-600 leading-relaxed space-y-4">
                <p>Die Antwort ist ein klares Ja – aber es ist kein Zufallsprodukt, sondern das Ergebnis kluger Planung. Ein Umzug ist oft mit hohen Kosten verbunden, doch viele dieser Ausgaben sind vermeidbar oder zumindest deutlich reduzierbar. Der Schlüssel liegt darin, den Prozess zu verstehen, die richtigen Prioritäten zu setzen und die verfügbaren Werkzeuge clever zu nutzen. Dieser umfassende Guide ist Ihr persönlicher Finanzberater für den Umzug. Wir zeigen Ihnen nicht nur, wo die grössten Kostenfallen lauern, sondern geben Ihnen eine detaillierte Schritt-für-Schritt-Anleitung an die Hand, mit der Sie Hunderte, wenn nicht sogar Tausende von Franken sparen können. Vergessen Sie den Mythos, dass 'billig' auch 'schlecht' bedeuten muss. Es geht darum, 'preiswert' umzuziehen – also für jeden Franken, den Sie ausgeben, den maximalen Wert zu erhalten. Sind Sie bereit, die Kontrolle über Ihr Umzugsbudget zu übernehmen? Dann lassen Sie uns beginnen.</p>
              </div>
              <Button onClick={scrollToTips} variant="outline" className="mt-6 border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700">
                Direkt zu den Spartipps
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3 text-center">Das Fundament: Warum gute Planung der grösste Sparhebel ist</h2>
            <div className="prose max-w-none text-slate-600 leading-relaxed">
              <p className="text-slate-600 leading-relaxed mb-4">Der häufigste Fehler, der einen Umzug teuer macht, ist mangelnde Vorbereitung. Wer kurzfristig und chaotisch plant, zahlt am Ende immer drauf – sei es durch teure Express-Zuschläge bei Umzugsfirmen, unnötig gekaufte Materialien oder den Verlust wertvoller Zeit. Eine durchdachte Planung, die 6-8 Wochen vor dem Umzugstermin beginnt, ist Ihr mächtigstes Werkzeug.</p>
              <p className="text-slate-600 leading-relaxed mb-4">Erstellen Sie eine detaillierte Checkliste. Unser Ratgeber bietet hierfür perfekte <Link href="/checklisten" className="text-green-600 hover:text-green-800 font-semibold underline">Umzugs-Checklisten zum Herunterladen</Link>. Ein detaillierter Plan hilft Ihnen, den Überblick zu behalten, Aufgaben zu delegieren und frühzeitig Sparpotenziale zu erkennen. Ein zentraler Punkt ist die <Link href="/umzugskosten-rechner" className="text-green-600 hover:text-green-800 font-semibold underline">Berechnung Ihrer Umzugskosten</Link>. Nutzen Sie unseren Online-Rechner, um ein realistisches Gefühl für die Grössenordnung der Kosten zu bekommen. Dies ist die Basis für Ihr Budget und hilft Ihnen, Offerten von Firmen besser einzuschätzen.</p>
              <p>Der wichtigste Teil der Planung ist das radikale Ausmisten. Jedes einzelne Teil, das Sie nicht zügeln müssen, spart bares Geld: weniger Volumen für den LKW, weniger Verpackungsmaterial, weniger Arbeitszeit für die Helfer. Seien Sie ehrlich zu sich selbst: Was haben Sie im letzten Jahr nicht benutzt? Verkaufen Sie es online, spenden Sie es oder bringen Sie es zur Entsorgung. Das schafft nicht nur finanziellen, sondern auch mentalen Freiraum für den Neuanfang.</p>
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 text-center">Der Preisvergleich: Günstige vs. teure Umzugsfirmen – was lohnt sich?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Die Wahl der Umzugsfirma ist die wichtigste finanzielle Entscheidung Ihres Umzugs. Doch wie navigiert man durch den Dschungel der Offerten? Ein direkter <Link href="/umzugsfirma-vergleichen" className="text-green-600 hover:text-green-800 font-semibold underline">Vergleich von Umzugsfirmen</Link> ist unerlässlich.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <Card className="bg-white shadow-md border-t-4 border-orange-400">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-orange-800">Die Verlockung des günstigen Anbieters</CardTitle>
                  <p className="text-slate-600">Wann eine 'Billig-Firma' eine gute Wahl sein kann:</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "<strong>Klare, einfache Umzüge:</strong> Sie ziehen aus einer 1- bis 2-Zimmer-Wohnung um, besitzen keine wertvollen Antiquitäten und die Zugänglichkeit beider Wohnungen ist unkompliziert (z.B. Erdgeschoss oder grosser Lift).",
                    "<strong>Hohe Eigenleistung:</strong> Sie packen alles selbst, demontieren Möbel und benötigen quasi nur Manpower und einen LKW für den reinen Transport.",
                    "<strong>Flexibilität:</strong> Sie sind beim Umzugsdatum flexibel und können einen Termin unter der Woche wählen, an dem die Firma Kapazitäten frei hat."
                  ].map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <ThumbsUp className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                      <p className="text-slate-600" dangerouslySetInnerHTML={{ __html: point }} />
                    </div>
                  ))}
                  <div className="mt-4 p-4 bg-orange-50 border-l-4 border-orange-400 rounded-r-lg">
                    <h4 className="font-bold text-orange-700 flex items-center gap-2"><AlertTriangle size={20} />Vorsicht vor versteckten Kosten:</h4>
                    <p className="text-orange-800 text-sm mt-1">Der grösste Nachteil günstiger Offerten ist das Risiko von Nachforderungen. Oft basieren die Preise auf unrealistisch niedrig angesetzten Stunden. Verzögerungen durch Verkehr oder ein enges Treppenhaus treiben die Kosten schnell in die Höhe. Achten Sie auf eine detaillierte Offerte und fragen Sie gezielt nach, was bei unvorhergesehenen Ereignissen passiert. Fehlender oder unzureichender Versicherungsschutz ist eine weitere grosse Gefahr.</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md border-t-4 border-green-500">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-green-800">Die Sicherheit des etablierten Profis</CardTitle>
                  <p className="text-slate-600">Wann sich die Investition in eine teurere Firma auszahlt:</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    "<strong>Komplexe Umzüge:</strong> Grössere Wohnungen, Häuser, wertvolle Möbel, Kunst oder ein <Link href='/klaviertransport' className='text-green-600 hover:text-green-800 font-semibold underline'>Klaviertransport</Link> erfordern Erfahrung und professionelle Ausrüstung.",
                    "<strong>Full-Service-Wunsch:</strong> Sie möchten sich um nichts kümmern? Teurere Firmen bieten oft Rundum-sorglos-Pakete inklusive Ein- und Auspackservice, Möbelmontage und Endreinigung mit Abnahmegarantie.",
                    "<strong>Garantierte Sicherheit:</strong> Etablierte Unternehmen bieten umfassenden Versicherungsschutz und detaillierte, oft pauschale Festpreisangebote. Das gibt Ihnen absolute Kostensicherheit und schützt vor bösen Überraschungen."
                  ].map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <p className="text-slate-600" dangerouslySetInnerHTML={{ __html: point }} />
                    </div>
                  ))}
                   <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                      <h4 className="font-bold text-green-700 flex items-center gap-2"><Star size={20} />Fazit</h4>
                      <p className="text-green-800 text-sm mt-1">Fazit: Es geht nicht um 'billig' versus 'teuer', sondern um 'preiswert'. Die beste Offerte ist diejenige, welche Ihre individuellen Anforderungen zum fairsten Preis erfüllt. Eine teure Firma kann für einen komplexen Umzug die günstigere Wahl sein, wenn sie Schäden und Zusatzkosten vermeidet.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          <motion.section id="smart-saving-tips" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-12 text-center">Die 10 Gebote des smarten Sparfuchses beim Umzug</h2>
            <div className="space-y-6">
              {smartSavingTips.map((tip, index) => (
                 <motion.div key={index} variants={fadeIn}>
                    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                      <CardHeader className="bg-slate-50 p-4 border-b">
                         <CardTitle className="text-xl font-bold text-green-700 flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-200 text-green-800 font-extrabold">{index + 1}</div>
                            {tip.title}
                         </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 md:p-6">
                        {typeof tip.text === 'string' ? (
                          <p className="text-slate-600">{tip.text}</p>
                        ) : (
                          <p className="text-slate-600">{tip.text}</p>
                        )}
                      </CardContent>
                    </Card>
                 </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 text-center">Häufige Fragen zum günstigen Umzug</h2>
            <Accordion type="single" collapsible className="w-full bg-white p-4 rounded-lg shadow-xl">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline text-slate-800">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-slate-600 leading-relaxed pt-2 pb-4">
                    {typeof item.answer === 'string' ? (
                      <p>{item.answer}</p>
                    ) : (
                      item.answer
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.section>

          <motion.section 
            className="text-center py-16 md:py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl shadow-2xl"
            variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ihr Weg zum preiswerten Umzug beginnt jetzt</h2>
            <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto px-4">Günstig umziehen bedeutet, clever zu handeln. Sie haben nun das Wissen und die Werkzeuge, um Ihren Umzug budgetfreundlich und ohne Stress zu meistern. Der entscheidende erste Schritt ist immer der gleiche: Verschaffen Sie sich Markttransparenz. Vergleichen Sie nicht nur Preise, sondern auch die dahinterstehenden Leistungen und Sicherheiten.</p>
            <Button asChild size="lg" className="bg-white text-green-700 hover:bg-gray-100 font-bold group px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <Link href="/kostenlose-offerte-anfordern">
                Jetzt kostenlos & unverbindlich Offerten vergleichen
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.section>

        </div>
      </div>
    </>
  );
};

export default GuenstigUmziehenPageClient;
