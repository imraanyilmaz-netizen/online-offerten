import { useRouter } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, ListChecks, ArrowRight, ShieldCheck, Home, Edit3 } from 'lucide-react';
import CleaningCostCalculator from '@/components/ReinigungskostenRechnerSections/CleaningCostCalculator';

const SectionTitle = ({ icon, title }) => {
  return (
    <div className="flex items-center mb-6">
      {icon && React.cloneElement(icon, { className: "w-8 h-8 text-blue-600 mr-3" })}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
    </div>
  );
};

const CleaningCostArticle = () => {
  const router = useRouter();

  const handleComboCta = () => {
    router.push('/kostenlose-offerte-anfordern?service=umzug&additional_cleaning=true');
  };

  const createMarkup = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white p-6 md:p-10 rounded-xl shadow-lg"
    >
      <div className="max-w-none prose prose-lg prose-h2:text-3xl prose-h3:text-2xl prose-h3:font-bold prose-h3:text-gray-800 prose-h2:font-bold prose-h2:text-gray-800 text-gray-700 leading-relaxed">
        <h2 dangerouslySetInnerHTML={createMarkup("Ihr Leitfaden für die Umzugsreinigung: Kosten verstehen, clever sparen")} />
        <p>Ein Umzug markiert einen neuen Lebensabschnitt, doch bevor Sie sich voll und ganz auf Ihr neues Zuhause freuen können, steht eine oft unterschätzte Aufgabe an: die Umzugsreinigung mit Abnahmegarantie. Viele Mieter fragen sich: Was kostet das? Worauf muss ich achten? Und wie kann ich den Prozess so stressfrei und kostengünstig wie möglich gestalten? Dieser umfassende Leitfaden gibt Ihnen alle Antworten. Wir erklären nicht nur, wie unser praktischer Reinigungskosten-Rechner funktioniert, sondern enthüllen auch, wie Sie mit unseren exklusiven Kombi-Offerten für Umzug und Reinigung bares Geld sparen können.</p>

        <h3 dangerouslySetInnerHTML={createMarkup("Wie unser Reinigungskosten-Rechner funktioniert")} />
        <p>Transparenz ist uns wichtig. Unser Rechner wurde entwickelt, um Ihnen eine schnelle, unkomplizierte und vor allem realistische Einschätzung der zu erwartenden Kosten zu geben. Er ist kein Zufallsgenerator, sondern ein intelligentes Werkzeug, das auf den Daten von Tausenden von Reinigungsangeboten aus der ganzen Schweiz basiert. Jeder Parameter, den Sie eingeben, hat einen direkten Einfluss auf die Berechnung:</p>
        
        <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Die wichtigsten Kostenfaktoren im Detail:</h4>
        <ul className="space-y-3">
          <li dangerouslySetInnerHTML={createMarkup("<strong>Immobilientyp & Zimmeranzahl:</strong> Ein Einfamilienhaus hat in der Regel mehr Fläche und oft auch mehr Fenster als eine Wohnung mit der gleichen Zimmeranzahl. Dies ist der grösste Hebel für den Grundpreis.")} />
          <li dangerouslySetInnerHTML={createMarkup("<strong>Anzahl Fenster & Storen:</strong> Die Reinigung von Fenstern und insbesondere von Lamellenstoren ist zeitaufwendig. Je mehr Fenster Sie haben, desto höher der Aufwand. Die Storenreinigung ist oft eine der teuersten Einzelpositionen.")} />
          <li dangerouslySetInnerHTML={createMarkup("<strong>Anzahl Badezimmer:</strong> Bäder erfordern eine intensive Reinigung – von der Entkalkung der Armaturen bis zur Fugenreinigung. Jedes zusätzliche Badezimmer erhöht den Aufwand signifikant.")} />
          <li dangerouslySetInnerHTML={createMarkup("<strong>Verschmutzungsgrad:</strong> Eine Wohnung, in der geraucht wurde oder Haustiere lebten, benötigt eine intensivere Grundreinigung als eine regelmässig gepflegte Immobilie. Seien Sie hier bei der Einschätzung ehrlich, um eine genaue Schätzung zu erhalten.")} />
          <li dangerouslySetInnerHTML={createMarkup("<strong>Zusatzleistungen:</strong> Benötigen Sie eine Reinigung des Balkons, des Kellers oder der Garage? Jede dieser Optionen wird als Zusatzleistung berechnet.")} />
        </ul>
        <p>Der Rechner kombiniert diese Informationen mit regionalen Preisdaten, um Ihnen einen verlässlichen Kostenrahmen zu präsentieren. Dies dient Ihrer Orientierung. Für eine verbindliche Offerte empfehlen wir immer, eine detaillierte Offerte anzufordern.</p>

        <h3 dangerouslySetInnerHTML={createMarkup("Detaillierte Preisübersicht für die Umzugsreinigung")} />
        <p>Um Ihnen ein noch besseres Gefühl für die Marktlage zu geben, finden Sie hier eine detaillierte Tabelle mit durchschnittlichen Preisspannen für eine Umzugsreinigung mit Abnahmegarantie. Bitte beachten Sie, dass es sich um Richtwerte handelt, die je nach Region und spezifischem Zustand der Wohnung variieren können.</p>
        <div className="my-6 overflow-x-auto not-prose">
          <table className="w-full text-left border-collapse">
            <caption className="p-4 text-lg font-semibold text-left text-gray-900 bg-gray-100 rounded-t-lg">
              Durchschnittliche Kosten für Umzugsreinigung (inkl. Abnahmegarantie)
            </caption>
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 font-bold uppercase text-gray-600 border border-gray-300">Wohnungsgrösse</th>
                <th className="p-4 font-bold uppercase text-gray-600 border border-gray-300">Preisspanne (CHF)</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td className="p-4 border border-gray-300">1.5 - 2.5 Zimmer</td>
                <td className="p-4 border border-gray-300 font-medium">CHF 500 - 900</td>
              </tr>
              <tr>
                <td className="p-4 border border-gray-300">3.5 Zimmer</td>
                <td className="p-4 border border-gray-300 font-medium">CHF 750 - 1'200</td>
              </tr>
              <tr>
                <td className="p-4 border border-gray-300">4.5 Zimmer</td>
                <td className="p-4 border border-gray-300 font-medium">CHF 900 - 1'500</td>
              </tr>
              <tr>
                <td className="p-4 border border-gray-300">5.5+ Zimmer</td>
                <td className="p-4 border border-gray-300 font-medium">CHF 1'100 - 1'800+</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600">Diese Preise beinhalten in der Regel alle Standardarbeiten, die für eine erfolgreiche Abnahme erforderlich sind. Extrawünsche wie eine sehr grosse Terrasse oder ein stark verschmutzter Backofen können den Preis erhöhen.</p>

        <div className="my-12 p-6 md:p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-4 border-green-500 not-prose">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Das Spar-Geheimnis: Umzug & Reinigung als Kombi-Offerte</h3>
          <p className="mb-4 text-gray-700">Hier kommt der ultimative Tipp für alle, die clever umziehen und dabei sparen möchten: Buchen Sie Umzug und Reinigung zusammen! Wenn Sie beide Dienstleistungen über unsere Plattform anfragen, schalten Sie das grösste Sparpotenzial frei. Anstatt zwei separate Firmen zu beauftragen, erhalten Sie eine koordinierte Paket-Offerte von einem unserer qualifizierten Partner.</p>
          <p className="mb-4 text-gray-700">Der Vorteil liegt auf der Hand: Die Umzugsfirma kann ihre Logistik und Personalplanung optimieren. Das Team, das Ihre Möbel transportiert, kann oft direkt im Anschluss mit den Vorbereitungen für die Reinigung beginnen oder arbeitet Hand in Hand mit einer spezialisierten Reinigungsabteilung. Dieser Effizienzgewinn wird direkt an Sie weitergegeben – in Form eines deutlich günstigeren Paketpreises.</p>
          
          <div className="mt-6 mb-6">
            <h4 className="font-bold text-lg mb-3 text-gray-800">Ihre Vorteile auf einen Blick:</h4>
            <ul className="space-y-3 list-none p-0 text-gray-700">
              <li className="flex items-start">
                <ShieldCheck className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <span dangerouslySetInnerHTML={createMarkup("<strong>Erhebliche Kostenersparnis:</strong> Sparen Sie bis zu 20% im Vergleich zur Einzelbuchung.")} />
              </li>
              <li className="flex items-start">
                <ShieldCheck className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <span dangerouslySetInnerHTML={createMarkup("<strong>Weniger Stress:</strong> Nur ein Ansprechpartner für beide grossen Aufgaben.")} />
              </li>
              <li className="flex items-start">
                <ShieldCheck className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <span dangerouslySetInnerHTML={createMarkup("<strong>Perfektes Timing:</strong> Nahtlose Koordination zwischen Auszug und Reinigungsbeginn.")} />
              </li>
              <li className="flex items-start">
                <ShieldCheck className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <span dangerouslySetInnerHTML={createMarkup("<strong>Volle Sicherheit:</strong> Beide Dienstleistungen werden von geprüften Profis mit Abnahmegarantie durchgeführt.")} />
              </li>
            </ul>
          </div>
          <p className="mb-6 text-gray-700">Stellen Sie sich vor: Sie schliessen die Tür Ihrer alten Wohnung und wissen, dass alles erledigt wird. Kein Koordinationsaufwand, keine doppelten Anfahrtskosten, keine Unsicherheit. Fordern Sie noch heute Ihre persönliche Kombi-Offerte an und erleben Sie den entspanntesten Umzug Ihres Lebens.</p>
          <Button onClick={handleComboCta} size="lg" className="bg-green-600 hover:bg-green-700 text-white group w-full md:w-auto">
            Jetzt Kombi-Offerte anfordern & sparen!
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

const ReinigungskostenRechnerPage = () => {
  const router = useRouter();

  const handleIntroCta = () => {
    const calculatorElement = document.getElementById('cleaning-cost-calculator-section');
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/kostenlose-offerte-anfordern?service=reinigung'); 
    }
  };
  
  const handleConclusionCta = () => {
    router.push('/kostenlose-offerte-anfordern?service=reinigung');
  };

  const factors = [
    { icon: <Home className="w-6 h-6 text-blue-500" />, text: "Grösse und Zimmeranzahl der Immobilie." },
    { icon: <Edit3 className="w-6 h-6 text-blue-500" />, text: "Anzahl der Fenster und deren Grösse/Typ." },
    { icon: <Home className="w-6 h-6 text-blue-500" />, text: "Anzahl der Badezimmer und deren Ausstattung." },
    { icon: <Sparkles className="w-6 h-6 text-blue-500" />, text: "Verschmutzungsgrad der Immobilie." },
    { icon: <ListChecks className="w-6 h-6 text-blue-500" />, text: "Zusätzliche Dienstleistungen wie Storenreinigung, Balkonreinigung etc." },
    { icon: <Home className="w-6 h-6 text-blue-500" />, text: "Regionale Preisunterschiede." },
    { icon: <ShieldCheck className="w-6 h-6 text-blue-500" />, text: "Abnahmegarantie (oft standardmässig enthalten)." },
  ];

  // SEO Data
  const metaTitle = "Was kostet eine Reinigung? - Reinigungskosten Reinigungsfirma Vergleichen";
  const metaDescription = "⏱️ In 1 Minute Reinigungskosten berechnen! Kostenloser Reinigungskosten-Rechner mit sofortiger Schätzung. Vergleichen Sie Reinigungsofferten & sparen Sie bis zu 40%.";
  const metaKeywords = "reinigungskosten rechner, kosten umzugsreinigung, preise reinigungsfirma, wohnungsreinigung kosten, reinigungsofferte, abnahmegarantie, reinigungskosten schweiz, reinigungskosten berechnen, umzugsreinigung kosten, endreinigung kosten, reinigungskosten pro m2, reinigungskosten rechner schweiz, reinigungskosten vergleichen, günstige reinigungskosten, reinigungsfirma preise, umzugsreinigung preise, wohnungsreinigung preise, reinigungskosten schätzen";
  const canonicalUrl = "https://online-offerten.ch/reinigungskosten-rechner";

  // FAQ Data
  const faqItems = [
    {
      question: "Wie berechnet man die Kosten für eine Umzugsreinigung?",
      answer: "Die Kosten für eine Umzugsreinigung hängen von mehreren Faktoren ab: der Grösse der Immobilie (Zimmeranzahl), der Anzahl der Fenster und Badezimmer, dem Verschmutzungsgrad sowie zusätzlichen Leistungen wie Storenreinigung oder Balkonreinigung. Unser kostenloser Reinigungskosten-Rechner berücksichtigt all diese Faktoren und liefert Ihnen in nur einer Minute eine verlässliche Schätzung."
    },
    {
      question: "Was kostet eine Umzugsreinigung in der Schweiz durchschnittlich?",
      answer: "Die durchschnittlichen Kosten für eine Umzugsreinigung in der Schweiz variieren je nach Wohnungsgrösse. Für eine 3.5-Zimmer-Wohnung liegen die Kosten zwischen CHF 750 und CHF 1'200. Mit Abnahmegarantie und zusätzlichen Leistungen können die Kosten auf CHF 900 bis CHF 1'500 steigen."
    },
    {
      question: "Was ist eine Abnahmegarantie bei der Umzugsreinigung?",
      answer: "Eine Abnahmegarantie bedeutet, dass die Reinigungsfirma die Reinigung so lange wiederholt, bis der Vermieter oder die Verwaltung die Wohnung abnimmt. Dies gibt Ihnen Sicherheit und spart Ihnen Zeit und Nerven bei der Wohnungsübergabe."
    },
    {
      question: "Kann ich bei der Umzugsreinigung Geld sparen?",
      answer: "Ja, Sie können sparen, indem Sie Umzug und Reinigung zusammen buchen. Unsere Kombi-Offerten können Ihnen bis zu 20% sparen. Ausserdem sollten Sie mehrere Offerten vergleichen und flexible Termine ausserhalb der Hauptsaison wählen."
    },
    {
      question: "Sind die berechneten Kosten verbindlich?",
      answer: "Die Kosten aus unserem Rechner sind Schätzungen und dienen als Richtwerte. Für eine verbindliche Offerte sollten Sie kostenlose und unverbindliche Offerten von geprüften Reinigungsfirmen in Ihrer Region anfordern."
    }
  ];

  // Schema markup for SEO
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": metaTitle,
    "description": metaDescription,
    "step": [
      {
        "@type": "HowToStep",
        "name": "Immobilientyp & Zimmeranzahl",
        "text": "Wählen Sie die Art Ihrer Immobilie und die Anzahl der Zimmer."
      },
      {
        "@type": "HowToStep",
        "name": "Details zur Ausstattung",
        "text": "Geben Sie die Anzahl der Fenster, Badezimmer und Zusatzoptionen wie Balkon- oder Storenreinigung an."
      },
      {
        "@type": "HowToStep",
        "name": "Zustand angeben",
        "text": "Beschreiben Sie den Verschmutzungsgrad Ihrer Immobilie."
      },
      {
        "@type": "HowToStep",
        "name": "Kosten schätzen",
        "text": "Erhalten Sie eine sofortige, unverbindliche Schätzung der Reinigungskosten."
      }
    ],
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "CHF",
      "value": "Die Kosten variieren je nach Eingabe."
    },
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Online-Rechner auf der Webseite"
      }
    ],
    "totalTime": "PT1M"
  };

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  // WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": metaTitle,
    "description": metaDescription,
    "url": canonicalUrl,
    "inLanguage": "de",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch"
    },
    "about": {
      "@type": "Service",
      "name": "Reinigungskosten-Rechner",
      "description": metaDescription,
      "provider": {
        "@type": "Organization",
        "name": "Online-Offerten.ch"
      }
    }
  };

  // Main schema for SEO component
  const schemaData = howToSchema;

  return (
    <>
      
      {/* Additional Schema Markup for FAQ and WebPage */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(webPageSchema)}
        </script>
      </Helmet>
      <div className="bg-gradient-to-br from-slate-50 via-gray-100 to-slate-100">
        
        <motion.section 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="py-16 md:py-24 bg-gray-800 text-white hero-pattern-blue"
        >
          <div className="container mx-auto max-w-navbar px-4 md:px-6 text-center">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-full shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-shadow-lg">
              Reinigungskosten-Rechner
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8">
              Planen Sie eine Umzugsreinigung? Unser Rechner hilft Ihnen, eine schnelle Kostenschätzung zu erhalten. Geben Sie einfach die Details Ihrer Immobilie ein.
            </p>
            <Button onClick={handleIntroCta} size="xl" className="bg-blue-500 hover:bg-blue-600 text-white group px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              Kosten schätzen
              <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1.5" />
            </Button>
          </div>
        </motion.section>

        <div className="container mx-auto max-w-navbar px-4 md:px-6 py-12 md:py-16 space-y-12 md:space-y-20">
          
          <section id="cleaning-cost-calculator-section">
             <h2 className="sr-only">Ihre Reinigungskosten schätzen</h2>
            <CleaningCostCalculator />
          </section>

          <section>
            <SectionTitle icon={<ListChecks />} title="Was beeinflusst die Reinigungskosten?" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {factors.map((factor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 p-3 bg-blue-100 rounded-full">
                    {factor.icon}
                  </div>
                  <p className="text-gray-700 text-base">{factor.text}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <CleaningCostArticle />

          {/* FAQ Section for SEO */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-purple-500"
            itemScope
            itemType="https://schema.org/FAQPage"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Häufige Fragen zu Reinigungskosten</h2>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <article
                  key={index}
                  className="border-l-4 border-blue-500 pl-4"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <h3
                    className="text-lg md:text-xl font-semibold text-gray-800 mb-2"
                    itemProp="name"
                  >
                    {item.question}
                  </h3>
                  <div
                    itemScope
                    itemType="https://schema.org/Answer"
                    itemProp="acceptedAnswer"
                  >
                    <p
                      className="text-gray-700 leading-relaxed"
                      itemProp="text"
                    >
                      {item.answer}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center py-10 bg-white p-8 rounded-xl shadow-2xl"
          >
            <ShieldCheck size={48} className="mx-auto text-blue-500 mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Bereit für eine blitzblanke Übergabe?</h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
              Eine professionelle Umzugsreinigung spart Ihnen Zeit und Nerven und sichert eine problemlose Wohnungsübergabe. Fordern Sie jetzt unverbindliche Offerten von geprüften Reinigungsfirmen an.
            </p>
            <Button onClick={handleConclusionCta} size="xl" className="bg-blue-600 hover:bg-blue-700 text-white group px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              Jetzt Reinigungsfirmen vergleichen
              <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1.5" />
            </Button>
          </motion.section>
        </div>
      </div>
    </>
  );
};

export default ReinigungskostenRechnerPage;
