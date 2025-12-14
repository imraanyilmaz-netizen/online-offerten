import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import MovingCostCalculator from '@/components/UmzugskostenRechnerSections/MovingCostCalculator';
import { locations } from '@/data/locations';
import { CheckCircle, Search, FileText, Star, ArrowRight } from 'lucide-react';
import CategorizedPostsSection from '@/components/CategorizedPostsSection';

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
        <li><a href="#warum-online-offerten" className="text-gray-600 hover:text-green-600 transition-colors font-medium">Warum Online-Offerten.ch?</a></li>
        <li><a href="#so-funktionierts" className="text-gray-600 hover:text-green-600 transition-colors font-medium">So funktioniert's</a></li>
        <li><a href="#kostenrechner" className="text-gray-600 hover:text-green-600 transition-colors font-medium">Kosten Rechner</a></li>
        <li><a href="#standorte" className="text-gray-600 hover:text-green-600 transition-colors font-medium">Umzugsfirmen nach Kanton</a></li>
        <li><a href="#spartipps" className="text-gray-600 hover:text-green-600 transition-colors font-medium">Tipps zum Sparen</a></li>
        <li><a href="#faq" className="text-gray-600 hover:text-green-600 transition-colors font-medium">Häufige Fragen</a></li>
        <li><a href="#ratgeber" className="text-gray-600 hover:text-green-600 transition-colors font-medium">Umzugs-Ratgeber</a></li>
      </ul>
    </nav>
  </div>
);

const UmzugsfirmaInDerNaehePage = () => {
  const canonicalPath = '/umzugsfirma-in-der-naehe';

  const metaTitle = "Umzugsfirma in der Nähe finden & vergleichen » 6 Offerten kostenlos | Schweiz";
  const metaDescription = "Umzugsfirma in der Nähe finden: Vergleichen Sie kostenlos bis zu 6 Offerten von geprüften Umzugsfirmen für Privatumzug, Geschäftsumzug, Umzugsreinigung & mehr. Bis zu 40% sparen – schnell, sicher und unverbindlich.";
  const metaKeywords = "umzugsfirma in der nähe, umzugsfirma schweiz, umzugsfirma vergleichen, umzugsfirma kostenlos vergleichen, umzugsfirma online finden, zügelfirma finden, zügelfirma schweiz, umzugsunternehmen schweiz, umzugsfirma vergleich, günstige umzugsfirma, umzugsfirma zürich, umzugsfirma bern, umzugsfirma basel, umzugsfirma luzern, umzugsfirma preisvergleich, umzugsfirma empfehlung, beste umzugsfirma, zügelfirma vergleichen, umzugsfirma schweiz vergleichen, privatumzug schweiz, geschäftsumzug schweiz, umzugsofferte, umzugsfirma in der nähe finden";

  const faqs = [
    { q: "Wie viele Offerten erhalte ich?", a: "Sie erhalten bis zu 6 kostenlose und unverbindliche Offerten von qualitätsgeprüften Umzugsfirmen aus Ihrer Nähe. So haben Sie die perfekte Vergleichsgrundlage." },
    { q: "Ist der Service wirklich kostenlos?", a: "Ja, unser Service ist für Sie als anfragende Person zu 100% kostenlos und unverbindlich. Sie entscheiden selbst, ob und welche Offerte Sie annehmen." },
    { q: "Wie wird die Qualität der Umzugsfirmen sichergestellt?", a: "Wir arbeiten nur mit geprüften und versicherten Partnerfirmen zusammen. Zudem können Sie die Bewertungen anderer Kunden einsehen, um sich ein umfassendes Bild zu machen." },
    { q: "Was passiert, nachdem ich eine Anfrage gesendet habe?", a: "Ihre Anfrage wird an passende Umzugsfirmen in Ihrer Region weitergeleitet. Diese werden sich dann mit einer individuellen Offerte direkt bei Ihnen melden." },
    { q: "Wie finde ich die günstigste Umzugsfirma?", a: "Der Schlüssel ist der Vergleich. Indem Sie mehrere Offerten einholen, sehen Sie die Preisspanne und können das beste Preis-Leistungs-Verhältnis für Ihre Bedürfnisse auswählen. Achten Sie nicht nur auf den Endpreis, sondern auch auf die enthaltenen Leistungen." },
  ];

  const savingsTips = [
    { title: "Flexibel sein", description: "Wenn Sie beim Umzugsdatum flexibel sind, können Sie oft günstigere Termine unter der Woche finden." },
    { title: "Eigenleistung erbringen", description: "Übernehmen Sie das Packen der Kartons selbst und demontieren Sie Möbel, um Arbeitsstunden zu sparen." },
    { title: "Richtig ausmisten", description: "Je weniger Umzugsgut, desto günstiger der Umzug. Verkaufen oder entsorgen Sie alles, was Sie nicht mehr brauchen." },
    { title: "Offerten genau vergleichen", description: "Achten Sie auf alle in der Offerte enthaltenen Leistungen wie Versicherung, Verpackungsmaterial oder Halteverbotszonen." },
    { title: "Frühzeitig buchen", description: "Planen und buchen Sie Ihre Umzugsfirma so früh wie möglich, um von besseren Preisen und mehr Auswahl zu profitieren." },
  ];

  return (
    <>
      
      <div className="bg-gray-50">
        <div className="container mx-auto max-w-navbar px-4 pt-16 pb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
            Umzugsfirma in der Nähe finden
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Vergleichen Sie mit nur einer Anfrage bis zu 6 Offerten von geprüften Umzugsfirmen in Ihrer Region und sparen Sie bis zu 40%.
          </p>
          <Button asChild size="lg" className="mt-8 bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6">
            <Link href="/kostenlose-offerte-anfordern">Jetzt Kostenlos Offerten anfordern</Link>
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
              <p className="lead" dangerouslySetInnerHTML={{ __html: "Ein Umzug steht bevor und Sie suchen eine zuverlässige und günstige <strong>Umzugsfirma in der Nähe</strong>? Die Suche nach dem richtigen Partner für Ihren Wohnungswechsel kann schnell überfordernd werden. Unzählige Anbieter, unklare Preise und die Sorge, an ein unprofessionelles Unternehmen zu geraten, machen die Entscheidung schwer. Genau hier setzt Online-Offerten.ch an: Wir machen es Ihnen einfach, die perfekte Zügelfirma für Ihre Bedürfnisse zu finden – schnell, kostenlos und absolut stressfrei. Egal ob Sie einen Privatumzug in der Schweiz oder einen Geschäftsumzug planen, wir helfen Ihnen dabei, die passende Umzugsfirma zu finden." }} />
              
              <img className="w-full rounded-lg shadow-lg my-8" alt="A team of movers carrying a couch into a new house" src="https://images.unsplash.com/photo-1588618370256-556289a24e96" loading="lazy" decoding="async" />

              <h3 id="warum-online-offerten">Warum Online-Offerten.ch die beste Wahl ist</h3>
              <p>Die Beauftragung einer Umzugsfirma ist eine Vertrauenssache. Sie übergeben Ihr gesamtes Hab und Gut in fremde Hände. Deshalb ist es entscheidend, nicht nur eine günstige, sondern vor allem eine seriöse und erfahrene Umzugsfirma zu finden. Unser Portal hilft Ihnen dabei, die Spreu vom Weizen zu trennen.</p>
              <ul className="list-none p-0">
                <li className="flex items-start mb-4"><CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span dangerouslySetInnerHTML={{ __html: "<strong>Bis zu 6 Offerten vergleichen:</strong> Mit nur einem Formular erreichen Sie mehrere qualitätsgeprüfte Umzugsfirmen in Ihrer Nähe." }} /></li>
                <li className="flex items-start mb-4"><CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span dangerouslySetInnerHTML={{ __html: "<strong>Bis zu 40% sparen:</strong> Durch den direkten Vergleich der Offerten finden Sie mühelos das beste Preis-Leistungs-Verhältnis und sparen bares Geld." }} /></li>
                <li className="flex items-start mb-4"><CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span dangerouslySetInnerHTML={{ __html: "<strong>Geprüfte Partnerfirmen:</strong> Wir arbeiten ausschliesslich mit etablierten und versicherten Umzugsunternehmen zusammen." }} /></li>
                <li className="flex items-start mb-4"><CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span dangerouslySetInnerHTML={{ __html: "<strong>Kostenlos & Unverbindlich:</strong> Unser Service ist für Sie komplett kostenfrei. Sie entscheiden ohne Druck, ob Sie eine Offerte annehmen." }} /></li>
                <li className="flex items-start mb-4"><CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span dangerouslySetInnerHTML={{ __html: "<strong>Echte Bewertungen:</strong> Profitieren Sie von den Erfahrungen anderer Kunden und treffen Sie eine fundierte Entscheidung." }} /></li>
              </ul>
              
              <h3 id="so-funktionierts">In 3 einfachen Schritten zur passenden Umzugsfirma</h3>
              <p>Der Weg zu Ihrem stressfreien Umzug ist denkbar einfach:</p>
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <Card className="text-center">
                  <CardHeader>
                    <FileText className="mx-auto h-12 w-12 text-green-600" />
                    <CardTitle className="mt-4">1. Anfrage ausfüllen</CardTitle>
                  </CardHeader>
                  <CardContent>Beschreiben Sie Ihren Umzug in unserem Formular. Je genauer Ihre Angaben, desto präziser die Offerten.</CardContent>
                </Card>
                <Card className="text-center">
                  <CardHeader>
                    <Search className="mx-auto h-12 w-12 text-green-600" />
                    <CardTitle className="mt-4">2. Offerten vergleichen</CardTitle>
                  </CardHeader>
                  <CardContent>Erhalten Sie bis zu 6 Offerten von Umzugsfirmen in Ihrer Nähe und vergleichen Sie Preise und Leistungen in Ruhe.</CardContent>
                </Card>
                <Card className="text-center">
                  <CardHeader>
                    <Star className="mx-auto h-12 w-12 text-green-600" />
                    <CardTitle className="mt-4">3. Firma auswählen</CardTitle>
                  </CardHeader>
                  <CardContent>Wählen Sie das für Sie passende Unternehmen aus und freuen Sie sich auf einen reibungslosen Umzug.</CardContent>
                </Card>
              </div>
            </article>
          </main>
        </div>
      </div>

      <Section id="kostenrechner" title="Was kostet eine Umzugsfirma in der Nähe?" className="bg-gray-100">
        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Die Kosten für einen Umzug hängen von vielen Faktoren ab. Nutzen Sie unseren Umzugskostenrechner, um eine erste, unverbindliche Schätzung für Ihren Umzug zu erhalten.
        </p>
        <MovingCostCalculator />
      </Section>

      <Section id="standorte" title="Umzugsfirmen in der ganzen Schweiz">
        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Egal, wo Sie in der Schweiz umziehen – wir haben die passenden Partner für Sie. Finden Sie hier eine Auswahl an Umzugsfirmen in den grössten Kantonen und Städten:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {locations.filter(l => l.showInNav).map(loc => (
            <Button key={loc.slug} asChild variant="outline" className="justify-start">
              <Link href={`/${loc.slug}`}>
                <ArrowRight className="w-4 h-4 mr-2" /> {loc.name}
              </Link>
            </Button>
          ))}
          <Button key="all-locations" asChild variant="default" className="justify-start bg-green-600 hover:bg-green-700 col-span-full sm:col-span-1 md:col-span-1 lg:col-span-1">
              <Link href="/standorte">
                <Search className="w-4 h-4 mr-2" /> Alle Standorte
              </Link>
            </Button>
        </div>
      </Section>

      <Section id="spartipps" title="Clevere Tipps, um beim Umzug zu sparen" className="bg-gray-100">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savingsTips.map((tip, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <CheckCircle className="text-green-500" />
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

      <div id="ratgeber" className="bg-gray-50">
        <CategorizedPostsSection 
          category="Umzug"
          title="Hilfreiche Tipps aus unserem Umzugs-Ratgeber"
          description="Planen Sie Ihren Umzug wie ein Profi mit unseren neuesten Artikeln und Checklisten."
        />
      </div>

      <div className="bg-green-700">
        <div className="container mx-auto max-w-navbar px-4 py-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bereit für einen stressfreien Umzug?</h2>
          <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto mb-8">
            Starten Sie jetzt Ihren kostenlosen Vergleich und finden Sie die perfekte Umzugsfirma in Ihrer Nähe.
          </p>
          <Button asChild size="lg" className="bg-white hover:bg-gray-100 text-green-700 font-bold text-lg px-8 py-6">
            <Link href="/kostenlose-offerte-anfordern">Jetzt Offerten anfordern & sparen!</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default UmzugsfirmaInDerNaehePage;
