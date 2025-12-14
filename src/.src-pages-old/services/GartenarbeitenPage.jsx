import { useRouter } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sprout, ShieldCheck, Clock, Users, Award } from 'lucide-react';

const GartenarbeitenPage = () => {
  const router = useRouter();

  const handleCtaClick = () => {
    router.push('/kostenlose-offerte-anfordern?service=garten');
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Gartenarbeiten",
    "name": "Gartenarbeiten & Landschaftsbau in der Schweiz",
    "description": "Gartenarbeiten Schweiz: Vergleichen Sie kostenlos Offerten von geprüften Gärtnereien und Landschaftsbauern. Gartenpflege, Terrassenverlegung, Pool-Service & mehr – professionell und bis zu 40% günstiger. Jetzt Offerten anfordern!",
    "provider": {
      "@type": "Organization",
      "name": "Online-Offerten.ch"
    },
    "areaServed": {
      "@type": "Country",
      "name": "CH"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://online-offerten.ch/kostenlose-offerte-anfordern?service=garten",
      "priceCurrency": "CHF",
      "name": "Kostenlose Offerte für Gartenarbeiten"
    }
  };

  return (
    <>
      
      <div className="bg-slate-50">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white py-20 md:py-32"
        >
          <div className="container mx-auto max-w-navbar px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-full mb-6"
              >
                <Sprout className="w-12 h-12 text-white" />
              </motion.div>
              
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-shadow-lg"
              >
                Gartenarbeiten & Landschaftsbau in der Schweiz
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto mb-10 leading-relaxed"
              >
                Professionelle Gartenpflege, Landschaftsbau, Terrassenverlegung & Pool-Service. Gartenarbeiten Offerten online vergleichen und bis zu 40% sparen.
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Button 
                  size="lg" 
                  onClick={handleCtaClick}
                  className="bg-white text-green-600 hover:bg-gray-100 font-bold group px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Jetzt kostenlose Offerten anfordern
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Main Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-navbar px-4 md:px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Article */}
              <div className="lg:col-span-2">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-xl shadow-lg p-8 md:p-10 mb-8"
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Gartenarbeiten in der Schweiz: Professionelle Dienstleistungen für Ihren Traumgarten</h2>
                  
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Ein gepflegter Garten ist nicht nur eine Augenweide, sondern auch ein Ort der Entspannung und Erholung. In der Schweiz schätzen viele Menschen ihre Gärten als erweiterte Wohnräume im Freien. Professionelle Gartenarbeiten umfassen eine Vielzahl von Dienstleistungen, die Ihren Garten in ein wahres Paradies verwandeln können.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Was sind Gartenarbeiten?</h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Gartenarbeiten beinhalten alle Tätigkeiten, die zur Gestaltung, Pflege und Erhaltung von Gärten, Grünflächen und Aussenanlagen erforderlich sind. Dazu gehören sowohl regelmässige Wartungsarbeiten als auch einmalige Projekte wie Landschaftsgestaltung oder Terrassenbau. Professionelle Gärtnereien bieten umfassende Dienstleistungen an, die von der einfachen Rasenpflege bis hin zu komplexen Landschaftsbauprojekten reichen.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Gartenpflege: Die Basis für einen gesunden Garten</h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Regelmässige Gartenpflege ist essentiell für die Gesundheit und das Aussehen Ihres Gartens. Dazu gehören Aufgaben wie Rasenmähen, Unkraut jäten, Hecken schneiden, Blumenbeete pflegen und Bäume beschneiden. Eine professionelle Gartenpflege sorgt nicht nur für ein gepflegtes Erscheinungsbild, sondern verhindert auch Schäden durch unkontrolliertes Wachstum und fördert die Gesundheit Ihrer Pflanzen.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Landschaftsbau: Gestalten Sie Ihren Traumgarten</h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Der Landschaftsbau umfasst die Planung und Umsetzung grösserer Gartenprojekte. Professionelle Landschaftsarchitekten und Gärtnereien können komplette Gärten neu gestalten, Wege anlegen, Beete planen und Bepflanzungen vornehmen. Dabei werden sowohl ästhetische Aspekte als auch praktische Überlegungen wie Entwässerung, Beleuchtung und Bewässerungssysteme berücksichtigt.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Terrassenverlegung: Mehr Wohnraum im Freien</h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Eine schöne Terrasse erweitert Ihren Wohnraum nach draussen und bietet einen idealen Ort für Entspannung und Geselligkeit. Professionelle Gärtnereien können Terrassen aus verschiedenen Materialien wie Naturstein, Betonplatten, Holz oder modernen Verbundwerkstoffen anlegen. Die richtige Planung und Ausführung sorgt für Langlebigkeit und ein ansprechendes Design.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Pool-Service: Rundum-Sorglos-Paket für Ihren Pool</h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Ein Swimmingpool im Garten ist ein Luxus, der regelmässige Pflege erfordert. Professionelle Pool-Services bieten umfassende Wartung, Reinigung, Wasserpflege und Reparaturen an. Dazu gehören das Absaugen des Pools, die Reinigung der Filter, die Kontrolle der Wasserqualität und die Wartung der technischen Anlagen. Ein regelmässiger Pool-Service sorgt für klares, hygienisches Wasser und verlängert die Lebensdauer Ihrer Poolanlage.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Gartenhausbau: Funktionalität und Ästhetik vereint</h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Ein Gartenhaus bietet zusätzlichen Stauraum für Gartengeräte, Möbel oder kann als Werkstatt oder Hobbyraum genutzt werden. Professionelle Gärtnereien können Gartenhäuser in verschiedenen Grössen und Ausführungen planen und errichten. Dabei werden lokale Bauvorschriften berücksichtigt und hochwertige Materialien verwendet, die den Witterungsbedingungen in der Schweiz standhalten.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Saunabau: Wellness im eigenen Garten</h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Eine eigene Sauna im Garten ist der Inbegriff von Luxus und Entspannung. Professionelle Anbieter können Saunen in verschiedenen Grössen und Ausführungen planen und bauen. Von der klassischen finnischen Sauna bis hin zu modernen Infrarotkabinen gibt es zahlreiche Möglichkeiten. Der Bau erfordert Fachkenntnisse in Elektroinstallation, Isolierung und Belüftung.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Sporteinrichtungsbau: Aktivität im Freien</h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Für sportbegeisterte Gartenbesitzer können professionelle Gärtnereien Sporteinrichtungen wie Basketballplätze, Volleyballfelder, Tennisplätze oder Fitnessbereiche im Freien anlegen. Diese Projekte erfordern spezielle Kenntnisse in Bezug auf Bodenbeläge, Markierungen und die Integration in die bestehende Gartenlandschaft.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Warum professionelle Gartenarbeiten wichtig sind</h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Professionelle Gartenarbeiten bieten zahlreiche Vorteile. Gärtnereien verfügen über das notwendige Fachwissen, die richtigen Werkzeuge und Erfahrung mit verschiedenen Pflanzen und Materialien. Sie kennen die lokalen klimatischen Bedingungen und können geeignete Pflanzen empfehlen. Zudem sparen Sie Zeit und Mühe, wenn Sie die Gartenpflege Profis überlassen.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Kosten für Gartenarbeiten in der Schweiz</h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Die Kosten für Gartenarbeiten variieren je nach Art und Umfang der Arbeiten. Einfache Gartenpflege kann ab etwa 50-100 CHF pro Stunde angeboten werden, während grössere Projekte wie Landschaftsbau oder Terrassenverlegung mehrere tausend Franken kosten können. Durch den Vergleich mehrerer Offerten können Sie bis zu 40% sparen und gleichzeitig sicherstellen, dass Sie den besten Service zum fairen Preis erhalten.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">So finden Sie die richtige Gärtnerei</h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    Bei der Auswahl einer Gärtnerei sollten Sie auf Erfahrung, Referenzen und Qualifikationen achten. Über unsere Plattform können Sie Gartenarbeiten Offerten online vergleichen. Egal ob Sie eine Gärtnerei in Zürich, Bern, Basel oder Luzern suchen – wir helfen Ihnen dabei, die passende Firma zu finden. Alle Partner werden sorgfältig geprüft und bieten qualitativ hochwertige Dienstleistungen zu fairen Preisen an. Durch den Vergleich mehrerer Offerten können Sie bis zu 40% sparen.
                  </p>

                  <div className="mt-10 p-6 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Jetzt kostenlose Offerten anfordern</h3>
                    <p className="text-gray-700 mb-4">
                      Gartenarbeiten Offerten online vergleichen und bis zu 40% sparen. Ohne Aufpreis, ohne Verpflichtung.
                    </p>
                    <Button 
                      onClick={handleCtaClick}
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Kostenlose Offerten anfordern
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </motion.article>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.aside
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Vorteile</h3>
                    <ul className="space-y-3">
                      {[
                        { icon: ShieldCheck, text: "Nur geprüfte Gärtnereien" },
                        { icon: Clock, text: "Schnelle Offerten in 24h" },
                        { icon: Award, text: "Bis zu 40% sparen" },
                        { icon: Users, text: "Über 500 zufriedene Kunden" }
                      ].map((item, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <item.icon className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Jetzt Offerten anfordern</h3>
                    <p className="text-gray-700 mb-4 text-sm">
                      Kostenlos und unverbindlich Gartenarbeiten Offerten online vergleichen.
                    </p>
                    <Button 
                      onClick={handleCtaClick}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Offerten anfordern
                    </Button>
                  </div>
                </motion.aside>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GartenarbeitenPage;