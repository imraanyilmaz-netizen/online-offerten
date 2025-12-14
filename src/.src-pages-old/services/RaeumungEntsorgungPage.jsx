import { useRouter } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trash2, Clock, Sparkles, Package, CheckCircle, Scale } from 'lucide-react';
import Article from '@/components/RaeumungEntsorgungPageParts/Article';
import Faq from '@/components/RaeumungEntsorgungPageParts/Faq';

const iconMap = {
  Trash2,
  Clock,
  Sparkles,
  Package,
};

const RaeumungEntsorgungPage = () => {
  const router = useRouter();

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=raeumung');
  };

  const benefits = [
    {
      icon: "Trash2",
      title: "Fachgerechte Entsorgung",
      text: "Unsere Partner kennen die lokalen Vorschriften und garantieren eine umwelt- und gesetzeskonforme Entsorgung aller Materialien, inkl. Sondermüll."
    },
    {
      icon: "Clock",
      title: "Enorme Zeit- & Kraftersparnis",
      text: "Sparen Sie wertvolle Zeit und vermeiden Sie die körperliche Anstrengung. Ein erfahrenes Team erledigt die Arbeit in einem Bruchteil der Zeit."
    },
    {
      icon: "Sparkles",
      title: "Besenreine Übergabe",
      text: "Die geräumten Flächen werden Ihnen sauber und leer übergeben. Auf Wunsch kann auch eine Endreinigung mit Abnahmegarantie organisiert werden."
    },
    {
      icon: "Package",
      title: "Alles aus einer Hand",
      text: "Vom Demontieren von Möbeln über das Verpacken wiederverwertbarer Dinge bis zum Transport und der Entsorgung – Sie erhalten einen kompletten Service."
    }
  ];

  const costFactors = [
    "<strong>Menge des Räumguts (m³):</strong> Das Volumen ist der grösste Kostenfaktor.",
    "<strong>Art des Abfalls:</strong> Sondermüll wie Farben, Chemikalien oder Elektronik kostet mehr.",
    "<strong>Zugänglichkeit:</strong> Stockwerk, Lift vorhanden, Parkmöglichkeiten.",
    "<strong>Demontageaufwand:</strong> Müssen Einbauten oder grosse Möbel zerlegt werden?",
    "<strong>Zusatzleistungen:</strong> Endreinigung, kleinere Reparaturen."
  ];

  const volumeRates = [
    { volume: "bis 5 m³ (z.B. kleines Kellerabteil)", price: "ca. CHF 400 – 700" },
    { volume: "bis 10 m³ (z.B. 1-2 Zimmer Wohnung)", price: "ca. CHF 700 – 1'200" },
    { volume: "bis 20 m³ (z.B. 3-4 Zimmer Wohnung)", price: "ca. CHF 1'200 – 2'500" },
    { volume: "ab 30 m³ (z.B. Hausräumung)", price: "Auf Anfrage" }
  ];

  const faqItemsForSchema = [
    {
      "@type": "Question",
      "name": "Was kostet eine Räumung und Entsorgung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Kosten für Räumung und Entsorgung hängen von verschiedenen Faktoren ab: Volumen der zu entsorgenden Gegenstände, Art der Materialien, Zugänglichkeit der Räumlichkeiten und Entsorgungsart. Über unsere Plattform können Sie Räumungsofferten online vergleichen und bis zu 40% sparen."
      }
    },
    {
      "@type": "Question",
      "name": "Was wird bei einer Wohnungsräumung entsorgt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bei einer Wohnungsräumung werden alle nicht mehr benötigten Gegenstände entsorgt: Möbel, Elektrogeräte, Textilien, Haushaltsgegenstände, Altpapier und andere Materialien. Professionelle Entsorgungsfirmen sorgen für eine umweltgerechte Entsorgung und Trennung der Materialien."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lange dauert eine Räumung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Dauer einer Räumung hängt vom Umfang ab. Eine durchschnittliche Wohnungsräumung dauert in der Regel 1-3 Tage. Grössere Räumungen wie Haushaltsauflösungen können 3-7 Tage in Anspruch nehmen. Professionelle Firmen erstellen vorab einen detaillierten Zeitplan."
      }
    },
    {
      "@type": "Question",
      "name": "Werden die Gegenstände recycelt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, seriöse Entsorgungsfirmen trennen die Materialien und führen eine umweltgerechte Entsorgung durch. Wertvolle Gegenstände werden wenn möglich weiterverkauft oder gespendet, recyclebare Materialien werden dem Recycling zugeführt."
      }
    },
    {
      "@type": "Question",
      "name": "Brauche ich eine Genehmigung für die Entsorgung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Für die meisten Entsorgungen ist keine spezielle Genehmigung erforderlich. Professionelle Entsorgungsfirmen kennen die örtlichen Vorschriften und sorgen für eine rechtskonforme Entsorgung. Bei grösseren Mengen oder speziellen Materialien informieren die Firmen Sie über eventuelle Genehmigungen."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist der Unterschied zwischen Räumung und Entrümpelung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Umgangssprachlich werden die Begriffe oft synonym verwendet. 'Räumung' oder 'Haushaltsauflösung' bezieht sich meist auf die komplette Leerung eines Objekts (z.B. nach Umzug oder Todesfall). 'Entrümpelung' beschreibt eher das Ausmisten von Teilbereichen wie Keller, Dachboden oder Garage, um wieder Platz zu schaffen."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist eine 'Räumung' genau?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eine 'Räumung' geht über das blosse Entrümpeln hinaus. Es bezeichnet die komplette und oft endgültige Leerung eines Objekts. Dies ist häufig der Fall bei Gewerbeauflösungen, Haushaltsauflösungen oder Messi-Wohnungen. Bei einer solchen Räumung wird auf Wunsch des Auftraggebers alles entfernt – nicht nur Möbel, sondern auch Einbauten wie Küchenzeilen, Bodenbeläge (Teppich, Parkett), Wandverkleidungen und sogar nicht-tragende Wände. Das Ziel ist es, das Objekt in einen 'Rohbauzustand' zurückzuversetzen, bereit für eine Sanierung oder eine komplett neue Nutzung."
      }
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Räumung und Entsorgung",
    "name": "Räumung & Entsorgung Schweiz finden & vergleichen » Kostenlose Offerten | Professionell & Günstig",
    "description": "Räumung & Entsorgung Schweiz: Vergleichen Sie kostenlos Offerten von geprüften Entsorgungsfirmen. Wohnungsräumung, Haushaltsauflösung, Kellerräumung & umweltgerechte Entsorgung – professionell und bis zu 40% günstiger. Jetzt Offerten anfordern!",
    "provider": {
      "@type": "Organization",
      "name": "Online-Offerten.ch",
      "url": "https://online-offerten.ch"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Switzerland",
      "identifier": "CH"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=raeumung",
      "priceCurrency": "CHF",
      "price": "0",
      "availability": "https://schema.org/InStock",
      "name": "Kostenlose Offerte für Räumung & Entsorgung"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": faqItemsForSchema
    }
  };

  return (
    <>
      
      <div className="bg-slate-50">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full bg-gray-100 py-12 md:py-16"
        >
          <div className="container mx-auto max-w-navbar px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-0 items-center">
              <div className="md:col-span-2 bg-gray-100 px-8 md:px-10 py-8 md:py-12">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900">
                    Professionelle Räumung & Entsorgung
                  </h1>
                </motion.div>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed"
                >
                  Schaffen Sie Platz für Neues. Wir organisieren Ihre komplette Räumung – von der Entrümpelung bis zur besenreinen Übergabe. Effizient, zuverlässig und umweltgerecht.
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mb-6"
                >
                  <Button
                    onClick={handleCtaClick}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold group px-6 py-4 text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Jetzt kostenlose Offerten anfordern →
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="bg-green-50 rounded-lg p-4 md:p-6 flex flex-wrap gap-4 md:gap-6"
                >
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-base text-gray-700 font-medium">Bis zu 40% sparen</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-base text-gray-700 font-medium">Nur geprüfte Firmen</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm md:text-base text-gray-700 font-medium">100% kostenlos & unverbindlich</span>
                  </div>
                </motion.div>
              </div>
              <div className="md:col-span-1 relative h-64 md:h-auto md:min-h-[400px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1615895233623-731367f50a8b"
                  alt="Professionelle Räumung und Entsorgung"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </motion.section>

        <div className="container mx-auto max-w-navbar px-4 md:px-6 py-12 md:py-20 space-y-16 md:space-y-24">
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Warum eine professionelle Räumungsfirma beauftragen?</h2>
              <p className="text-lg text-slate-600 leading-relaxed">Eine Räumung ist oft mehr als nur das Ausmisten alter Gegenstände. Sie erfordert Organisation, körperlichen Einsatz und Wissen über die fachgerechte Entsorgung. Eine professionelle Firma nimmt Ihnen diese Last ab, kümmert sich um die umweltfreundliche Trennung von Wertstoffen und Abfall und garantiert eine schnelle und diskrete Abwicklung.</p>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative h-80 rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                className="absolute inset-0 w-full h-full object-cover"
                alt="Professionelles Team bei einer Wohnungsräumung"
                src="https://images.unsplash.com/photo-1615895233623-731367f50a8b" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </motion.div>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">Ihre Vorteile auf einen Blick</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = iconMap[benefit.icon];
                return (
                  <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center"
                  >
                    <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                      {Icon && <Icon className="w-8 h-8 text-green-600" />}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">{benefit.title}</h3>
                    <p className="text-slate-600">{benefit.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
             <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Was kostet eine Räumung und Entsorgung?</h2>
             <p className="text-slate-600 mb-8 max-w-4xl">Die Kosten für eine Räumung und Entsorgung in der Schweiz basieren hauptsächlich auf dem Volumen (in Kubikmetern, m³) des zu entsorgenden Guts.</p>
             <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-700 mb-4">Kostenfaktoren im Überblick:</h3>
                   <ul className="space-y-3">
                    {costFactors.map((factor, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-slate-700" dangerouslySetInnerHTML={{ __html: factor }} />
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-6">
                        <h4 className="font-bold text-xl text-slate-800 mb-3 flex items-center"><Trash2 className="mr-3 text-green-600"/>Zusätzliche Entsorgungskosten</h4>
                        <p className="text-sm text-slate-600 mb-4">Bei Umzügen fallen oft auch Gegenstände zur Entsorgung an. Diese werden separat nach Volumen berechnet.</p>
                        <div className="flex justify-between items-center py-2 border-b last:border-0 border-green-200">
                            <span className="font-medium text-slate-700">Kosten pro Kubikmeter (m³)</span>
                            <span className="font-bold text-green-700">ca. CHF 45 – 60</span>
                        </div>
                    </div>
                     <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                        <h4 className="font-bold text-xl text-slate-800 mb-3 flex items-center"><Scale className="mr-3 text-green-600"/>Richtpreise für Kompletträumung (nach Volumen)</h4>
                        <p className="text-sm text-slate-600 mb-4">Bei kompletten Wohnungs- oder Hausräumungen ist die Abrechnung nach Kubikmetern üblich.</p>
                        {volumeRates.map((item, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b last:border-0 border-green-200">
                                <span className="font-medium text-slate-700">{item.volume}</span>
                                <span className="font-bold text-green-700">{item.price}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-4 italic">Alle Preise sind Schätzungen und verstehen sich exkl. MwSt. Für eine genaue offerten ist oft eine kostenlose Besichtigung notwendig.</p>
                </div>
             </div>
          </section>

          <Article />
          <Faq />

          <section id="cta" className="text-center bg-gradient-to-r from-green-600 to-green-800 text-white py-16 px-6 rounded-2xl shadow-2xl">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Bereit, Platz für Neues zu schaffen?
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto text-green-200 mb-8"
            >
              Erhalten Sie mit nur einer Anfrage kostenlose und unverbindliche Offerten von geprüften Räumungsfirmen aus Ihrer Region.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button onClick={handleCtaClick} size="lg" className="bg-white text-green-700 hover:bg-green-100 group w-full sm:w-auto px-8 py-4 text-base">
                Kostenlose Offerten anfordern
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </section>
        </div>
      </div>
    </>
  );
};

export default RaeumungEntsorgungPage;