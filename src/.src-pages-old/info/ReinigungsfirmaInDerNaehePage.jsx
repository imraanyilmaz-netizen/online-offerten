import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CleaningCostCalculator from '@/components/ReinigungskostenRechnerSections/CleaningCostCalculator';
import { CheckCircle, Search, FileText, Star, ArrowRight, Sparkles } from 'lucide-react';

const Section = ({ id, title, children, className = '' }) => (
  <section id={id} className={`py-12 md:py-16 ${className}`}>
    <div className="container mx-auto max-w-navbar px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">{title}</h2>
      {children}
    </div>
  </section>
);

const PageNavigation = () => (
  <div className="sticky top-20 bg-white/80 backdrop-blur-sm z-30 p-4 rounded-lg shadow-md border mb-12 hidden lg:block">
    <p className="font-bold text-lg mb-3 text-center text-gray-700">Auf dieser Seite</p>
    <nav>
      <ul className="space-y-2 text-center">
        <li><a href="#warum-vergleichen" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Warum Offerten vergleichen?</a></li>
        <li><a href="#so-funktionierts" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">So funktioniert's</a></li>
        <li><a href="#kostenrechner" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Kosten Rechner</a></li>
        <li><a href="#leistungen" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Unsere Reinigungsleistungen</a></li>
        <li><a href="#spartipps" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Tipps zum Sparen</a></li>
        <li><a href="#faq" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Häufige Fragen</a></li>
      </ul>
    </nav>
  </div>
);

const ReinigungsfirmaInDerNaehePage = () => {
  const canonicalPath = '/reinigungsfirma-in-der-naehe';

  const metaTitle = "Reinigungsfirma in der Nähe finden & vergleichen » 6 Offerten kostenlos | Schweiz";
  const metaDescription = "Finden Sie die beste Reinigungsfirma in Ihrer Nähe. Vergleichen Sie kostenlos bis zu 6 Offerten von geprüften Reinigungsfirmen für Umzugsreinigung mit Abnahmegarantie, Büroreinigung, Fensterreinigung & mehr. Bis zu 40% sparen – schnell, sicher und unverbindlich.";
  const metaKeywords = "reinigungsfirma in der nähe, reinigungsfirma schweiz, reinigungsfirma vergleichen, reinigungsfirma preisvergleich, reinigungsfirma kostenlos vergleichen, reinigungsfirma online finden, umzugsreinigung mit abnahmegarantie, reinigungsofferte, putzinstitut schweiz, endreinigung wohnung, günstige reinigungsfirma, reinigungsfirma zürich, reinigungsfirma bern, reinigungsfirma basel, büroreinigung, fensterreinigung, unterhaltsreinigung, baureinigung, reinigungsfirma empfehlung, beste reinigungsfirma";

  const faqs = [
    { q: "Was bedeutet Abnahmegarantie bei der Umzugsreinigung?", a: "Die Abnahmegarantie bedeutet, dass die Reinigungsfirma dafür haftet, dass die Wohnung vom Vermieter abgenommen wird. Sollte der Vermieter bei der Übergabe Nachreinigungen verlangen, führt die Firma diese kostenlos durch, bis die Abnahme erfolgreich ist." },
    { q: "Wie viele Offerten erhalte ich über Online-Offerten.ch?", a: "Sie erhalten mit nur einer Anfrage bis zu 6 kostenlose und unverbindliche Offerten von qualitätsgeprüften Reinigungsfirmen aus Ihrer Region. Das gibt Ihnen eine solide Grundlage für den Vergleich." },
    { q: "Ist der Service wirklich kostenlos für mich?", a: "Ja, unser Offertenvergleich ist für Sie als anfragende Person zu 100% kostenlos und ohne jegliche Verpflichtung. Sie entscheiden frei, ob und welche Offerte Sie annehmen möchten." },
    { q: "Wie lange im Voraus sollte ich eine Reinigungsfirma buchen?", a: "Besonders in den Hauptumzugsmonaten empfehlen wir, die Reinigungsfirma mindestens 3-4 Wochen im Voraus zu buchen. So sichern Sie sich Ihren Wunschtermin und haben eine grössere Auswahl an Anbietern." },
    { q: "Worauf sollte ich bei der Auswahl einer Reinigungsfirma achten?", a: "Achten Sie nicht nur auf den Preis. Prüfen Sie, ob eine Abnahmegarantie angeboten wird, ob die Firma versichert ist und lesen Sie Bewertungen anderer Kunden. Eine transparente Offerte, die alle Leistungen detailliert auflistet, ist ebenfalls ein Zeichen für Seriosität." },
  ];

  const savingsTips = [
    { title: "Flexibles Datum", description: "Reinigungen unter der Woche sind oft günstiger als am Wochenende. Fragen Sie nach flexiblen Terminen." },
    { title: "Grobe Vorreinigung", description: "Entfernen Sie groben Schmutz und Müll selbst. Das spart der Reinigungsfirma Zeit und Ihnen Kosten." },
    { title: "Kombinierte Offerten", description: "Wenn Sie auch einen Umzug planen, fragen Sie nach Kombi-Offerten für Umzug und Reinigung. Viele Firmen bieten hier Rabatte." },
    { title: "Genaue Angaben machen", description: "Je präziser Ihre Angaben zur Grösse und zum Zustand der Wohnung sind, desto genauer und verbindlicher sind die Offerten." },
    { title: "Frühzeitig anfragen", description: "Starten Sie Ihre Anfrage frühzeitig, um von einer grösseren Auswahl und potenziell besseren Preisen zu profitieren." },
  ];
  
  const services = [
    { title: "Umzugsreinigung mit Abnahmegarantie", description: "Der Klassiker für einen sorgenfreien Auszug. Wir garantieren die erfolgreiche Wohnungsübergabe an Ihren Vermieter.", link: "/umzugsreinigung" },
    { title: "Büro- und Gewerbereinigung", description: "Sorgen Sie für ein sauberes und repräsentatives Arbeitsumfeld für Mitarbeiter und Kunden. Regelmässig oder einmalig.", link: "/bueroreinigung" },
    { title: "Fenster- und Storenreinigung", description: "Streifenfreier Glanz für Ihre Fenster, Glasfronten und Storen. Wir bringen wieder Licht in Ihre Räume.", link: "/fensterreinigung" },
    { title: "Unterhaltsreinigung", description: "Regelmässige Reinigung für Privathaushalte und Firmen. Individuell auf Ihre Bedürfnisse und Frequenzen zugeschnitten.", link: "/unterhaltsreinigung" },
    { title: "Baureinigung", description: "Von der Grob- bis zur Feinreinigung nach Neu- oder Umbauten. Wir machen Ihr Objekt bezugsfertig.", link: "/baureinigung" },
    { title: "Spezialreinigungen", description: "Teppichreinigung, Fassadenreinigung oder andere spezielle Anforderungen? Unsere Partner sind darauf vorbereitet.", link: "/grundreinigung" },
    { title: "Wohnungsreinigung", description: "Professionelle Reinigung für Ihre Wohnung. Gründlich, zuverlässig und individuell auf Ihre Bedürfnisse abgestimmt.", link: "/wohnungsreinigung" },
    { title: "Hausreinigung", description: "Umfassende Reinigung für Ihr gesamtes Haus. Von Küche bis Bad – wir sorgen für makellose Sauberkeit.", link: "/hausreinigung" },
    { title: "Grundreinigung", description: "Intensive Tiefenreinigung für einen sauberen Start. Ideal für den Einzug oder nach Renovationen.", link: "/grundreinigung" },
    { title: "Bodenreinigung", description: "Professionelle Reinigung und Pflege Ihrer Böden. Von Parkett über Laminat bis zu Fliesen – wir kennen jeden Belag.", link: "/bodenreinigung" },
    { title: "Fassadenreinigung", description: "Professionelle Reinigung Ihrer Gebäudefassade. Wir sorgen für ein gepflegtes und einladendes Erscheinungsbild.", link: "/fassadenreinigung" },
    { title: "Hofreinigung", description: "Saubere Aussenbereiche für Ihr Zuhause oder Unternehmen. Von Einfahrten bis zu Terrassen – wir machen alles blitzblank.", link: "/hofreinigung" },
  ];

  return (
    <>
      
      <div className="bg-blue-50">
        <div className="container mx-auto max-w-navbar px-4 pt-16 pb-12 text-center">
          <Sparkles className="mx-auto h-12 w-12 text-blue-500 mb-4" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
            Reinigungsfirma in der Nähe finden
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Kostenlos bis zu 6 Offerten für Ihre Reinigung vergleichen. Ob Umzugsreinigung mit Abnahmegarantie oder Büroreinigung – finden Sie den besten Anbieter.
          </p>
          <Button asChild size="lg" className="mt-8 bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6">
            <Link href="/kostenlose-offerte-anfordern?service=reinigung">Jetzt kostenlos Offerten anfordern</Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto max-w-navbar px-4 my-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4">
            <PageNavigation />
          </aside>
          <main className="w-full lg:w-3/4">
            <article className="prose prose-lg max-w-none text-gray-700">
              <p className="lead" dangerouslySetInnerHTML={{ __html: "Eine saubere Wohnung oder ein gepflegtes Büro ist Ihre Visitenkarte. Besonders bei einem Umzug ist eine professionelle <strong>Endreinigung mit Abnahmegarantie</strong> unerlässlich für eine stressfreie Wohnungsübergabe. Doch wie findet man eine zuverlässige und preiswerte <strong>Reinigungsfirma in der Nähe</strong>? Der Markt ist gross und unübersichtlich. Online-Offerten.ch bringt Licht ins Dunkel und hilft Ihnen, mit minimalem Aufwand den perfekten Reinigungspartner zu finden." }}></p>
              
              <img className="w-full rounded-lg shadow-lg my-8" alt="Ein professioneller Reinigungsmitarbeiter putzt ein grosses Fenster in einer modernen Wohnung" src="https://images.unsplash.com/photo-1581578731548-c64695cc6952" loading="lazy" decoding="async" />

              <h3 id="warum-vergleichen">Warum sich der Vergleich von Reinigungs-Offerten lohnt</h3>
              <p>Die Preise und Leistungen von Reinigungsfirmen können stark variieren. Wer blind die erstbeste Firma beauftragt, zahlt oft zu viel oder erhält nicht die gewünschte Qualität. Ein systematischer Vergleich schützt Sie vor bösen Überraschungen.</p>
              <ul className="list-none p-0">
                <li className="flex items-start mb-4"><CheckCircle className="text-blue-500 mr-3 mt-1 flex-shrink-0" /><span dangerouslySetInnerHTML={{ __html: "<strong>Bis zu 40% Kosten sparen:</strong> Durch den direkten Vergleich mehrerer Offerten erkennen Sie das beste Preis-Leistungs-Verhältnis und schonen Ihr Budget." }}></span></li>
                <li className="flex items-start mb-4"><CheckCircle className="text-blue-500 mr-3 mt-1 flex-shrink-0" /><span dangerouslySetInnerHTML={{ __html: "<strong>Garantierte Qualität:</strong> Wir arbeiten nur mit geprüften und versicherten Reinigungsunternehmen zusammen, die Erfahrung in ihrem Fachgebiet haben." }}></span></li>
                <li className="flex items-start mb-4"><CheckCircle className="text-blue-500 mr-3 mt-1 flex-shrink-0" /><span dangerouslySetInnerHTML={{ __html: "<strong>Sicherheit mit Abnahmegarantie:</strong> Insbesondere bei der Umzugsreinigung ist die Abnahmegarantie Gold wert. Sie gibt Ihnen die Sicherheit, dass die Wohnung vom Vermieter akzeptiert wird." }}></span></li>
                <li className="flex items-start mb-4"><CheckCircle className="text-blue-500 mr-3 mt-1 flex-shrink-0" /><span dangerouslySetInnerHTML={{ __html: "<strong>Zeitersparnis:</strong> Statt stundenlang selbst zu recherchieren und Firmen zu kontaktieren, erhalten Sie mit nur einem Formular passende Offerten direkt in Ihr Postfach." }}></span></li>
              </ul>
              
              <h3 id="so-funktionierts">In 3 einfachen Schritten zur perfekten Reinigung</h3>
              <p>Finden Sie Ihre Reinigungsfirma so einfach wie nie zuvor:</p>
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <Card className="text-center border-blue-200">
                  <CardHeader>
                    <FileText className="mx-auto h-12 w-12 text-blue-600" />
                    <CardTitle className="mt-4">1. Anfrage starten</CardTitle>
                  </CardHeader>
                  <CardContent>Füllen Sie unser kurzes Formular mit den Details zu Ihrer Reinigung aus. Das dauert nur wenige Minuten.</CardContent>
                </Card>
                <Card className="text-center border-blue-200">
                  <CardHeader>
                    <Search className="mx-auto h-12 w-12 text-blue-600" />
                    <CardTitle className="mt-4">2. Offerten vergleichen</CardTitle>
                  </CardHeader>
                  <CardContent>Erhalten Sie bis zu 6 Offerten von lokalen Profis und vergleichen Sie Preise, Leistungen und Bewertungen.</CardContent>
                </Card>
                <Card className="text-center border-blue-200">
                  <CardHeader>
                    <Star className="mx-auto h-12 w-12 text-blue-600" />
                    <CardTitle className="mt-4">3. Partner auswählen</CardTitle>
                  </CardHeader>
                  <CardContent>Wählen Sie die für Sie beste Reinigungsfirma aus und freuen Sie sich auf strahlende Sauberkeit.</CardContent>
                </Card>
              </div>
            </article>
          </main>
        </div>
      </div>

      <Section id="kostenrechner" title="Was kostet eine professionelle Reinigung?" className="bg-blue-100">
        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Die Kosten einer Reinigung hängen von Grösse, Verschmutzungsgrad und gewünschten Leistungen ab. Nutzen Sie unseren Rechner für eine erste Kostenschätzung.
        </p>
        <div className="max-w-navbar mx-auto">
          <CleaningCostCalculator />
        </div>
      </Section>
      
      <Section id="leistungen" title="Für jeden Bedarf die passende Reinigung">
        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Unsere Partnerfirmen bieten ein breites Spektrum an Reinigungsdienstleistungen für Privat- und Geschäftskunden.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
                <Link key={index} to={service.link} className="block">
                    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-blue-800">
                                <CheckCircle className="text-blue-500 flex-shrink-0" />
                                {service.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-gray-600 mb-4">{service.description}</p>
                            <div className="flex items-center text-blue-600 font-semibold mt-auto">
                                Mehr erfahren
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
      </Section>


      <Section id="spartipps" title="Clevere Tipps für eine günstige Reinigung" className="bg-blue-100">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savingsTips.map((tip, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Sparkles className="text-blue-500" />
                  {tip.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="faq" title="Häufig gestellte Fragen (FAQ)">
        <div className="max-w-navbar mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-base text-gray-700">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <div className="bg-blue-700">
        <div className="container mx-auto max-w-navbar px-4 py-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bereit für makellose Sauberkeit?</h2>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Starten Sie jetzt Ihren kostenlosen Offertenvergleich und überlassen Sie die Reinigung den Profis.
          </p>
          <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-blue-700 font-bold text-lg px-8 py-6">
            <Link href="/kostenlose-offerte-anfordern?service=reinigung">Jetzt Offerten für Reinigung anfordern!</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ReinigungsfirmaInDerNaehePage;
