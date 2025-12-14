import { useRouter } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Paintbrush, Palette, Shield, Clock, Search, Star, Home, Building } from 'lucide-react';
import CategorizedPostsSection from '@/components/CategorizedPostsSection';

const MalerfirmaInDerNaehePage = () => {
  const router = useRouter();
  const canonicalPath = '/malerfirma-in-der-naehe';

  const handleStartRequest = () => {
    router.push(`/kostenlose-offerte-anfordern?service=maler`);
  };

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
      },
    },
  };

  const heroImageUrl = "https://online-offerten.ch/image/malerarbeiten.webp";

  const InfoCard = ({ icon, title, children }) => (
    <motion.div
      variants={fadeIn}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 border border-gray-100"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          {icon && React.isValidElement(icon) && (
            <div className="bg-green-100 p-3 rounded-full mr-4">
              {React.cloneElement(icon, { className: "w-6 h-6 text-green-600" })}
            </div>
          )}
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        <div className="text-gray-600 space-y-2 prose prose-sm max-w-none">{children}</div>
      </div>
    </motion.div>
  );

  const metaTitle = "Malerfirma in der Nähe finden & vergleichen » 6 Offerten kostenlos | Schweiz";
  const metaDescription = "Malerfirma in der Nähe finden: Vergleichen Sie kostenlos bis zu 6 Offerten von geprüften Malerfirmen für Innenanstrich, Aussenanstrich, Fassadenanstrich & Renovierung. Bis zu 40% sparen – schnell, sicher und unverbindlich.";
  const metaKeywords = "malerfirma in der nähe, malerfirma schweiz, malerfirma vergleichen, malerfirma kostenlos vergleichen, maler finden, malerfirma zürich, malerfirma bern, malerfirma basel, malerfirma luzern, malerarbeiten vergleichen, innenanstrich, aussenanstrich, fassadenanstrich, wohnung streichen, malerfirma preisvergleich, malerfirma empfehlung, beste malerfirma, malerfirma online finden, malerfirma schweiz vergleichen, malerarbeiten schweiz, maler offerten, malerarbeiten preise";

  return (
    <>
      
      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-cover bg-center" style={{ backgroundImage: `url(${heroImageUrl})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/40"></div>
          <div className="relative container mx-auto max-w-navbar px-4 md:px-6 py-24 md:py-32 z-10 text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                Professionelle Malerfirma in Ihrer Nähe finden
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                Vergleichen Sie mit nur einer Anfrage bis zu 3 Offerten von geprüften Malern aus Ihrer Region – kostenlos und unverbindlich.
              </p>
              <Button onClick={handleStartRequest} size="lg" className="bg-green-600 hover:bg-green-700 text-white group px-8 py-3 text-lg font-bold shadow-lg transform hover:scale-105 transition-transform">
                Jetzt kostenlos Offerten anfordern
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* How it works Section */}
        <div className="container mx-auto max-w-navbar px-4 md:px-6 py-16 md:py-24">
          <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">In 3 einfachen Schritten zum perfekten Anstrich</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div variants={fadeIn} className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                  <Paintbrush className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Anfrage starten</h3>
                <p className="text-gray-600">Beschreiben Sie Ihr Malerprojekt in wenigen Klicks. Es dauert nur 2 Minuten und ist absolut kostenlos.</p>
              </motion.div>
              <motion.div variants={fadeIn} className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                  <Search className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Offerten vergleichen</h3>
                <p className="text-gray-600">Wir leiten Ihre Anfrage an qualifizierte Malerfirmen in Ihrer Nähe weiter. Sie erhalten massgeschneiderte Offerten.</p>
              </motion.div>
              <motion.div variants={fadeIn} className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                  <Star className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Besten Maler wählen</h3>
                <p className="text-gray-600">Wählen Sie das beste Preis-Leistungs-Verhältnis und sparen Sie Zeit, Geld und Nerven.</p>
              </motion.div>
            </div>
          </motion.section>

          {/* Main Content Section */}
          <motion.section 
            className="mt-24 space-y-16"
            variants={staggerContainer} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
          >
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Ihr Wegweiser für professionelle Malerarbeiten</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Alles, was Sie wissen müssen, bevor Sie einen Maler beauftragen. Finden Sie den richtigen Partner für Ihr Projekt.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <InfoCard icon={<Search />} title="Malerfirma auswählen: Worauf achten?">
                    <p>Die Wahl der richtigen Malerfirma ist entscheidend für ein zufriedenstellendes Ergebnis. Ein günstiger Preis allein ist kein Garant für Qualität. Achten Sie auf folgende Punkte:</p>
                    <ul>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Referenzen und Bewertungen:</strong> Suchen Sie nach Kundenrezensionen und fragen Sie nach Referenzprojekten." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Qualifikationen:</strong> Ein eidgenössisch diplomierter Malermeister oder ein Betrieb mit Fachausweisen bürgt für Kompetenz." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Detaillierte Offerte:</strong> Eine professionelle Offerte listet alle Arbeitsschritte, Materialien und Kosten transparent auf." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Versicherung:</strong> Stellen Sie sicher, dass die Firma über eine Betriebshaftpflichtversicherung verfügt." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Regionale Nähe:</strong> Ein lokaler Betrieb spart Anfahrtskosten und ist bei Rückfragen schnell vor Ort. Egal ob Sie eine Malerfirma in Zürich, Bern, Basel oder Luzern suchen – vergleichen Sie kostenlos mehrere Offerten, um das beste Preis-Leistungs-Verhältnis zu finden." }}></li>
                    </ul>
                </InfoCard>

                <InfoCard icon={<Palette />} title="Arten von Malerarbeiten">
                    <p>Malerarbeiten sind vielfältig und erfordern je nach Anforderung spezifisches Fachwissen. Hier ein Überblick:</p>
                    <ul>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Innenanstrich:</strong> Wände, Decken, Türen und Fensterrahmen. Schafft Atmosphäre und schützt die Bausubstanz." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Fassadenanstrich:</strong> Schützt das Gebäude vor Witterungseinflüssen und wertet die Immobilie optisch auf." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Dekorative Techniken:</strong> Spachteltechniken (Stucco Veneziano), Lasuren oder Wickeltechniken für einzigartige Oberflächen." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Lackierarbeiten:</strong> Professionelles Lackieren von Holz, Metall oder Kunststoff für eine widerstandsfähige Oberfläche." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Tapezierarbeiten:</strong> Fachmännisches Anbringen von Tapeten, von der Raufaser bis zur hochwertigen Design-Tapete." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Schimmelbehandlung:</strong> Nachhaltige Entfernung von Schimmel und präventive Anstriche." }}></li>
                    </ul>
                </InfoCard>

                <InfoCard icon={<Star />} title="Vorteile eines professionellen Malers">
                    <p>Auch wenn \"selber machen\" verlockend klingt, überwiegen die Vorteile eines Profis bei Weitem:</p>
                    <ul>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Perfekte Vorbereitung:</strong> Fachgerechtes Abdecken, Spachteln und Grundieren ist die Basis für ein makelloses Ergebnis." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Hochwertige Materialien:</strong> Profis wissen, welche Farben und Werkzeuge für welchen Untergrund am besten geeignet sind." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Effizienz und Zeitersparnis:</strong> Ein eingespieltes Team erledigt die Arbeit schnell und sauber." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Langlebigkeit:</strong> Ein professioneller Anstrich hält länger und schützt die Bausubstanz effektiver." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Garantie:</strong> Seriöse Betriebe geben eine Gewährleistung auf ihre Arbeit." }}></li>
                    </ul>
                </InfoCard>

                <InfoCard icon={null} title="Kosten und Preisgestaltung">
                    <p>Die Kosten für Malerarbeiten variieren stark. Folgende Faktoren spielen eine Rolle:</p>
                    <ul>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Flächengrösse:</strong> Die Abrechnung erfolgt oft pro Quadratmeter (m²)." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Zustand des Untergrunds:</strong> Müssen Risse gespachtelt oder alte Tapeten entfernt werden?" }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Farbqualität und -typ:</strong> Spezialfarben (z.B. Silikat- oder Latexfarben) sind teurer." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Komplexität:</strong> Hohe Decken, Stuckaturen oder viele Ecken erhöhen den Aufwand." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Region:</strong> In städtischen Gebieten sind die Stundensätze tendenziell höher." }}></li>
                    </ul>
                    <p dangerouslySetInnerHTML={{ __html: "Ein grober Richtwert für Innenanstriche liegt zwischen <strong>8 und 20 CHF pro m²</strong>. Holen Sie immer mehrere Offerten ein, um Preise vergleichen zu können." }}></p>
                </InfoCard>

                <InfoCard icon={<CheckCircle />} title="Merkmale hochwertiger Malerarbeit">
                    <p>Ein exzellentes Ergebnis erkennen Sie an diesen Details:</p>
                    <ul>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Gleichmässiger Farbauftrag:</strong> Keine Streifen, Flecken oder Ansätze sichtbar." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Scharfe Kanten:</strong> Saubere und präzise Farbkanten an Decken, Ecken und Leisten." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Vollständige Deckung:</strong> Die alte Farbe scheint nirgends durch." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Sauberkeit:</strong> Keine Farbspritzer auf Böden, Fenstern oder Möbeln." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Glatte Oberflächen:</strong> Der Untergrund wurde sorgfältig vorbereitet, Unebenheiten sind ausgeglichen." }}></li>
                    </ul>
                </InfoCard>

                <InfoCard icon={<Clock />} title="Dauer, Planung und Garantien">
                    <p>Eine gute Planung ist die halbe Miete. Beachten Sie folgende Punkte:</p>
                    <ul>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Zeitplanung:</strong> Klären Sie den genauen Zeitrahmen mit der Firma ab. Eine durchschnittliche 3-Zimmer-Wohnung benötigt ca. 2-4 Arbeitstage." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Vorbereitung:</strong> Fragen Sie, welche Vorarbeiten Sie selbst leisten können (z.B. Möbel rücken), um Kosten zu sparen." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Trocknungszeiten:</strong> Planen Sie genügend Zeit für das Trocknen der Farbe ein, bevor Sie die Räume wieder nutzen." }}></li>
                        <li dangerouslySetInnerHTML={{ __html: "<strong>Garantie:</strong> Seriöse Malerbetriebe bieten eine Garantie auf ihre Arbeit (üblicherweise 2 Jahre gemäss SIA-Norm 118). Fragen Sie explizit danach." }}></li>
                    </ul>
                </InfoCard>
            </div>
          </motion.section>
        </div>

        {/* Image Banner */}
        <motion.div 
            className="container mx-auto max-w-navbar px-4 md:px-6"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="overflow-hidden rounded-lg shadow-md">
                    <img className="w-full h-64 object-cover" alt="Maler streicht eine Wand mit einer Farbrolle" src="https://images.unsplash.com/photo-1675191862482-f0008e67b41b" loading="lazy" decoding="async" width="400" height="256" />
                </div>
                <div className="overflow-hidden rounded-lg shadow-md">
                    <img className="w-full h-64 object-cover" alt="Nahaufnahme einer frisch gestrichenen, texturierten Wand" src="https://images.unsplash.com/photo-1612258707587-d568bdc32061" loading="lazy" decoding="async" width="400" height="256" />
                </div>
                <div className="overflow-hidden rounded-lg shadow-md">
                    <img className="w-full h-64 object-cover" alt="Ein Team von Malern arbeitet an einer Hausfassade" src="https://images.unsplash.com/photo-1547065427-3deda5c5004d" loading="lazy" decoding="async" width="400" height="256" />
                </div>
            </div>
        </motion.div>

        {/* CTA Section */}
        <motion.section 
          className="py-16 md:py-24"
          variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <div className="container mx-auto max-w-navbar px-4 md:px-6">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl shadow-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Bereit für einen neuen Anstrich?</h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">Lassen Sie Ihr Zuhause oder Ihre Geschäftsräume in neuem Glanz erstrahlen. Starten Sie jetzt Ihre kostenlose Anfrage und finden Sie den besten Maler für Ihr Projekt.</p>
              <Button onClick={handleStartRequest} size="lg" className="bg-white text-green-600 hover:bg-gray-100 font-bold group px-8 py-3 text-lg transform hover:scale-105 transition-transform">
                Jetzt Offerten vergleichen
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Ratgeber Section */}
        <CategorizedPostsSection 
            category="Maler"
            title="Ratgeber für Malerarbeiten"
            description="Wertvolle Tipps und Informationen rund um das Thema Malerarbeiten, Farben und Techniken."
        />
      </div>
    </>
  );
};

export default MalerfirmaInDerNaehePage;
