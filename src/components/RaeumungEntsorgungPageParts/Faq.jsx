import React from 'react';
// framer-motion removed - CSS for better INP
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

const Faq = () => {
  const faqItems = [
    { 
      q: "Was ist der Unterschied zwischen Räumung und Entrümpelung?", 
      a: "Umgangssprachlich werden die Begriffe oft synonym verwendet. 'Räumung' oder 'Haushaltsauflösung' bezieht sich meist auf die komplette Leerung eines Objekts (z.B. nach Umzug oder Todesfall). 'Entrümpelung' beschreibt eher das Ausmisten von Teilbereichen wie Keller, Dachboden oder Garage, um wieder Platz zu schaffen.",
      value: "item-1" 
    },
    { 
      q: "Was ist eine 'Räumung' genau?", 
      a: "Eine 'Räumung' geht über das blosse Entrümpeln hinaus. Es bezeichnet die komplette und oft endgültige Leerung eines Objekts. Dies ist häufig der Fall bei:<ul><li><strong>Gewerbeauflösungen:</strong> z.B. ein insolventes Geschäft, ein altes Hotel oder ein Büro, das vollständig zurückgebaut wird.</li><li><strong>Haushaltsauflösungen:</strong> Oft nach einem Todesfall oder bei einem Umzug ins Pflegeheim.</li><li><strong>Messi-Wohnungen:</strong> Hier ist eine professionelle und diskrete Komplett-Räumung nötig.</li></ul><p>Bei einer solchen Räumung wird auf Wunsch des Auftraggebers alles entfernt – nicht nur Möbel, sondern auch Einbauten wie Küchenzeilen, Bodenbeläge (Teppich, Parkett), Wandverkleidungen und sogar nicht-tragende Wände. Das Ziel ist es, das Objekt in einen 'Rohbauzustand' zurückzuversetzen, bereit für eine Sanierung oder eine komplett neue Nutzung.</p>",
      value: "item-6" 
    },
    { 
      q: "Was passiert mit meinen Sachen?", 
      a: "Eine gute Räumungsfirma versucht, so viel wie möglich wiederzuverwerten. Gut erhaltene Möbel, Kleider oder Haushaltswaren werden oft an Brockenhäuser oder soziale Einrichtungen gespendet. Wertstoffe werden recycelt. Nur was unbrauchbar ist, wird fachgerecht als Abfall entsorgt. Wertgegenstände oder persönliche Dokumente, die versehentlich zurückgelassen wurden, werden Ihnen selbstverständlich übergeben.",
      value: "item-2" 
    },
    { 
      q: "Muss ich bei der Räumung anwesend sein?", 
      a: "Nicht die ganze Zeit. Es ist wichtig, dass Sie zu Beginn anwesend sind, um dem Team genau zu zeigen, was entsorgt werden soll und was eventuell bleiben muss. Markieren Sie Gegenstände, die nicht geräumt werden sollen, am besten deutlich. Nach dieser initialen Absprache kann das Team die Arbeit selbstständig erledigen. Eine Endabnahme ist jedoch empfehlenswert.",
      value: "item-3" 
    },
    { 
      q: "Wie lange dauert eine Wohnungsräumung?", 
      a: "Das hängt stark von der Grösse der Wohnung und der Menge des Inhalts ab. Eine durchschnittliche 3.5-Zimmer-Wohnung kann von einem eingespielten Team oft an einem einzigen Tag geräumt werden. Für ein ganzes Haus sollten Sie 1-3 Tage einplanen.",
      value: "item-4" 
    },
    { 
      q: "Wie wird die Entsorgung bei einem Umzug berechnet?", 
      a: "Die Abrechnungsmethoden variieren je nach Umzugsfirma. Die gängigsten Modelle sind:<ul><li><strong>Pauschalpreis:</strong> Viele Firmen bieten einen festen Preis an, der nach einer Besichtigung festgelegt wird.</li><li><strong>Nach Volumen (m³):</strong> Die Kosten werden pro Kubikmeter berechnet, oft zwischen CHF 45-60.</li><li><strong>Nach Gewicht (Tonne):</strong> Seltener bei Privatumzügen, eher bei sehr grossen Mengen.</li></ul><p>Prüfen Sie Ihre offerten genau, um zu verstehen, welches Modell angewendet wird und was es beinhaltet.</p>",
      value: "item-5" 
    },
  ];

  return (
    <section
      className="bg-slate-100 p-8 md:p-12 rounded-2xl"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-10 flex items-center justify-center">
        <HelpCircle className="w-8 h-8 mr-4 text-green-600" />
        Häufig gestellte Fragen zu Räumung & Entsorgung
      </h2>
      <Accordion type="single" collapsible className="w-full max-w-navbar mx-auto">
        {faqItems.map((item, index) => (
          <div
            key={item.value}
          >
            <AccordionItem value={item.value}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>
                <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: item.a }} />
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </section>
  );
};

export default Faq;