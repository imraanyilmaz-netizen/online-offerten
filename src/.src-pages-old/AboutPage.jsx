import { useRouter } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, HeartHandshake as Handshake, Target, ClipboardList, Layers, Star, Truck, Sparkles, Trash2, Paintbrush, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlatformReviews from '@/components/PlatformReviews';

const AboutPage = () => {
    const router = useRouter();
    const canonicalUrl = "https://online-offerten.ch/ueber-uns";

    const metaTitle = "Über uns | Online-Offerten.ch - Ihre Experten für Umzug & Reinigung";
    const metaDescription = "Erfahren Sie mehr über Online-Offerten.ch, Ihre zuverlässige Plattform für Umzugs-, Reinigungs- und Räumungsdienste in der Schweiz. Unsere Mission, Vision und Werte.";
    const metaKeywords = "über uns, online-offerten.ch, mission, vision, team, umzug vergleich, reinigung vergleich, schweiz, maler, gärtner, umzugsfirma vergleichen, reinigungsfirma vergleichen, malerfirma vergleichen, gärtnerei vergleichen, offertenportal schweiz, umzugsofferten, reinigungsofferten, malerofferten, gartenarbeiten offerten, umzugsfirma schweiz, reinigungsfirma schweiz, malerfirma schweiz, gärtnerei schweiz";

    const valueItems = [
      { icon: <Award className="w-8 h-8 text-white"/>, title: "Qualität", description: "Wir arbeiten nur mit geprüften Partnerfirmen zusammen, um höchste Servicequalität zu garantieren." },
      { icon: <Handshake className="w-8 h-8 text-white"/>, title: "Vertrauen", description: "Transparenz und ehrliche Kommunikation sind die Grundpfeiler unserer Beziehungen zu Kunden und Partnern." },
      { icon: <Users className="w-8 h-8 text-white"/>, title: "Kundenfokus", description: "Ihre Bedürfnisse stehen im Mittelpunkt. Wir hören zu und entwickeln Lösungen, die wirklich passen." },
    ];
    
    const howItWorksSteps = [
      {
        title: "1. Anfrage ausfüllen",
        description: "Beschreiben Sie Ihr Projekt in unserem intelligenten Formular. Je mehr Details Sie angeben, desto genauer werden die Offerten."
      },
      {
        title: "2. Offerten vergleichen",
        description: "Sie erhalten bis zu fünf kostenlose und unverbindliche Offerten von qualifizierten Partnerfirmen. Vergleichen Sie Preise, Leistungen und Bewertungen in Ruhe."
      },
      {
        title: "3. Firma auswählen",
        description: "Wählen Sie die Offerte, die am besten zu Ihnen passt, und beauftragen Sie die Firma direkt. Einfach, schnell und ohne Risiko."
      }
    ];
    
    const servicesItems = [
      {
        title: "Umzüge",
        description: "Von Privatumzügen über Geschäftsumzüge bis hin zu internationalen Transporten – wir finden die passenden Experten für Sie."
      },
      {
        title: "Reinigung",
        description: "Benötigen Sie eine Umzugsreinigung mit Abnahmegarantie, eine Büroreinigung oder eine regelmässige Unterhaltsreinigung? Wir haben die Lösung."
      },
      {
        title: "Räumung & Entsorgung",
        description: "Wir vermitteln zuverlässige Firmen für die professionelle Räumung und umweltgerechte Entsorgung von Möbeln und Abfällen."
      },
      {
        title: "Malerarbeiten",
        description: "Professionelle Maler für Innen- und Aussenanstriche. Wir finden den passenden Experten für Ihr Zuhause oder Geschäft."
      },
      {
        title: "Gartenpflege",
        description: "Von der Rasenpflege bis zur kompletten Gartenumgestaltung – finden Sie qualifizierte Gärtner für Ihre individuellen Bedürfnisse."
      }
    ];
    
    const serviceIcons = [
        <Truck className="w-10 h-10 text-green-600" />,
        <Sparkles className="w-10 h-10 text-green-600" />,
        <Trash2 className="w-10 h-10 text-green-600" />,
        <Paintbrush className="w-10 h-10 text-green-600" />,
        <Leaf className="w-10 h-10 text-green-600" />
    ];

    const fadeIn = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };
    
    return (
        <>
            
            <div className="bg-white">
                <main>
                    <div className="bg-gradient-to-b from-gray-50 to-white pt-16 pb-20 text-center">
                        <div className="container mx-auto px-4 max-w-navbar">
                            <motion.h1
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight"
                            >
                                Über uns: Wir vereinfachen Ihren Weg
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="mt-4 text-lg md:text-xl text-gray-600"
                            >
                                Wir sind mehr als eine Vermittlungsplattform. Wir sind Ihr Partner, der den Vergleich von Umzugs-, Reinigungs- und Entsorgungsfirmen in der Schweiz einfach, transparent und zuverlässig macht.
                            </motion.p>
                        </div>
                    </div>

                    <div className="py-16 md:py-24">
                        <div className="container mx-auto px-4 max-w-navbar">
                            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                                <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Unsere Mission</h2>
                                    <p className="text-gray-600 leading-relaxed">Unsere Mission ist es, den Prozess der Suche nach Dienstleistern zu revolutionieren. Wir möchten Ihnen ermöglichen, schnell und unkompliziert die besten Offerten von qualifizierten und geprüften Firmen zu erhalten. Wir setzen auf Transparenz, Qualität und Kundenzufriedenheit, um Ihnen Zeit, Geld und Nerven zu sparen.</p>
                                </motion.div>
                                <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-green-50 p-8 rounded-lg">
                                    <Target className="w-12 h-12 text-green-600 mb-4"/>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Unsere Vision</h3>
                                    <p className="text-gray-600">Wir streben danach, die führende Anlaufstelle in der Schweiz für alle zu sein, die hochwertige Dienstleistungen für ihr Zuhause oder ihr Unternehmen suchen. Durch stetige Innovation und den Ausbau unseres Partnernetzwerks wollen wir den höchsten Standard in der Branche setzen.</p>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 py-16 md:py-24">
                        <div className="container mx-auto px-4 max-w-navbar">
                            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Wie es funktioniert</h2>
                                <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">In nur drei einfachen Schritten erhalten Sie massgeschneiderte Offerten von geprüften Firmen aus Ihrer Region.</p>
                            </motion.div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                {howItWorksSteps.map((step, index) => (
                                    <motion.div 
                                        key={index}
                                        variants={fadeIn}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-6"
                                    >
                                        <div className="flex justify-center items-center h-16 w-16 rounded-full bg-green-100 mx-auto mb-4 border-2 border-green-200">
                                            {index === 0 && <ClipboardList className="w-8 h-8 text-green-700"/>}
                                            {index === 1 && <Layers className="w-8 h-8 text-green-700"/>}
                                            {index === 2 && <Star className="w-8 h-8 text-green-700"/>}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
                                        <p className="text-gray-600">{step.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 text-white py-16 md:py-24">
                        <div className="container mx-auto px-4 max-w-navbar">
                            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold">Unsere Werte</h2>
                                <p className="mt-3 text-lg text-gray-300 max-w-2xl mx-auto">Unsere Arbeit basiert auf festen Prinzipien, die unser Handeln leiten und das Vertrauen unserer Kunden und Partner sichern.</p>
                            </motion.div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {valueItems.map((item, index) => (
                                    <motion.div 
                                        key={index}
                                        variants={fadeIn}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="text-center p-6 bg-gray-700 rounded-lg"
                                    >
                                        <div className="flex justify-center items-center h-16 w-16 rounded-full bg-green-600 mx-auto mb-4">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                        <p className="text-gray-400">{item.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="py-16 md:py-24 bg-white">
                        <div className="container mx-auto px-4 max-w-navbar">
                            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Unsere Dienstleistungen im Überblick</h2>
                                <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">Ob für Privatpersonen oder Unternehmen, wir decken ein breites Spektrum an Dienstleistungen ab, um Ihr Leben einfacher zu machen.</p>
                            </motion.div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {servicesItems.map((service, index) => (
                                    <motion.div
                                        key={index}
                                        variants={fadeIn}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                    >
                                        <div className="mb-4">
                                            {serviceIcons[index] || <Truck className="w-10 h-10 text-green-600" />}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                                        <p className="text-gray-600">{service.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <PlatformReviews />

                    <div className="bg-green-600">
                        <div className="container mx-auto max-w-navbar py-16 px-4 text-center">
                            <motion.h2 variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl font-bold text-white mb-4">
                                Sagen Sie uns einfach, was Sie brauchen
                            </motion.h2>
                            <motion.p variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-green-100 text-lg mb-8">
                                Starten Sie jetzt Ihre kostenlose Anfrage und finden Sie in Kürze die besten Dienstleister für Ihr Vorhaben. Unverbindlich und unkompliziert.
                            </motion.p>
                            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.4 }}>
                                <Button
                                    size="lg"
                                    className="bg-white text-green-700 hover:bg-gray-100 font-bold text-lg px-8 py-6"
                                    onClick={() => router.push('/kostenlose-offerte-anfordern')}
                                >
                                    Jetzt Anfrage starten
                                </Button>
                            </motion.div>
                        </div>
                    </div>

                </main>
            </div>
        </>
    );
};

export default AboutPage;
