'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Home, Briefcase, Globe, Archive, Box, Sparkles, Palette, Trash2, ArrowRight, ShieldCheck, Star, Users } from 'lucide-react'
import { PiPianoKeysFill } from 'react-icons/pi'

const ServiceItem = ({ icon, title, description, features, delay, linkTo }: {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  delay: number
  linkTo: string
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1 }}
      className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden"
    >
      <div className="p-8">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-full mx-auto mb-6 shadow-lg">
          {icon}
        </div>
        <h3 className="heading-3 text-center mb-4">{title}</h3>
        <p className="text-gray-600 text-center mb-6 h-24 overflow-y-auto">{description}</p>
        
        <ul className="space-y-2 mb-6 text-sm text-gray-600">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <ShieldCheck className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto p-6 bg-gray-50">
        <Button asChild className="w-full bg-green-600 hover:bg-green-700 group">
          <Link href={linkTo || "/kontakt"}>
            Jetzt kostenlose offerten anfordern <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}

const ServicesPageClient = () => {
  const pageTitle = "Alles rund um Umzug, Reinigung & Renovierung"
  const pageSubtitle = "Entdecken Sie unsere umfassenden Umzugs-, Reinigungs- und Lagerlösungen in der ganzen Schweiz. Wir stehen Ihnen mit professionellen Dienstleistungen für jeden Bedarf zur Seite."

  const services = [
    {
      icon: <Home size={32} />,
      title: "Privatumzüge",
      description: "Sicherer und sorgfältiger Transport Ihrer persönlichen Gegenstände und Möbel an Ihre neue Adresse. Ideal für Familien, Paare und Einzelpersonen.",
      features: [
        "Professionelles Ein- und Auspacken",
        "Möbel De- und Montage",
        "Versicherte Transportoptionen",
        "Möbellift verfügbar"
      ],
      linkTo: "/umzugsfirma/privatumzug"
    },
    {
      icon: <Briefcase size={32} />,
      title: "Büroumzüge",
      description: "Transfer Ihrer Geschäftsräume, Büromaterialien, Akten und IT-Ausrüstung an Ihren neuen Standort mit minimaler Unterbrechung.",
      features: [
        "Detaillierte Umzugsplanung",
        "Transport von IT-Ausrüstung und Servern",
        "Sorgfältiger Umgang mit Archiven und Akten",
        "Umzüge am Wochenende oder ausserhalb der Geschäftszeiten"
      ],
      linkTo: "/umzugsfirma/geschaeftsumzug" 
    },
    {
      icon: <Globe size={32} />,
      title: "Internationale Umzüge",
      description: "Umfassende Logistiklösungen für Ihre grenzüberschreitenden Umzüge, Zollverfahren und Dienstleistungen nach internationalem Standard.",
      features: [
        "Zollabfertigung und Dokumentationsunterstützung",
        "See-, Luft- und Landtransportoptionen",
        "Internationale Versicherung",
        "Tür-zu-Tür-Lieferung"
      ],
      linkTo: "/umzugsfirma/internationale-umzuege" 
    },
    {
      icon: <Palette size={32} />,
      title: "Reinigungsdienste",
      description: "Detaillierte Reinigung für Wohnungen oder Büros, vor oder nach dem Umzug. Optionen mit Abnahmegarantie verfügbar.",
      features: [
        "Endreinigung nach Umzug",
        "Gründliche Baureinigung",
        "Fenster- und Glasreinigung",
        "Reinigung mit Abnahmegarantie"
      ],
      linkTo: "/reinigung" 
    },
    {
      icon: <Trash2 size={32} />,
      title: "Räumung & Entsorgung",
      description: "Umweltfreundliche Sammlung, Transport und Entsorgung von alten, unerwünschten Gegenständen, Bauschutt und Abfällen.",
      features: [
        "Haus- und Kellerräumung",
        "Büro- und Geschäftsräumung",
        "Bauschutt- und Bauabfallbeseitigung",
        "Recyclingfähige Abfallwirtschaft"
      ],
      linkTo: "/raeumung-entsorgung" 
    },
    {
      icon: <Sparkles size={32} />,
      title: "Spezialtransporte",
      description: "Professionelle Transportlösungen für schwere, empfindliche oder wertvolle Spezialgüter wie Klaviere, Tresore und Kunstwerke.",
      features: [
        "Klavier- und Musikinstrumententransport",
        "Tresor- und Schwertransport",
        "Kunstwerk- und Antiquitätentransport",
        "Einsatz von Spezialausrüstung und -fahrzeugen"
      ],
      linkTo: "/umzugsfirma/spezialtransporte" 
    },
    {
      icon: <PiPianoKeysFill size={32} />,
      title: "Klaviertransport",
      description: "Spezialisierter und sorgfältiger Transport von Klavieren und Flügeln mit professioneller Ausrüstung und Erfahrung.",
      features: [
        "Professionelle Klavierverpackung",
        "Spezialisierte Transportfahrzeuge",
        "Erfahrene Klaviermover",
        "Versicherter Transport"
      ],
      linkTo: "/umzugsfirma/klaviertransport"
    },
    {
      icon: <Archive size={32} />,
      title: "Lagerlösungen",
      description: "Kurz- oder langfristige, sichere und klimatisierte Lagerräume. Flexible Lösungen für Ihre Gegenstände.",
      features: [
        "Lagerung von Privatgegenständen",
        "Lagerung von Handelswaren",
        "Gesicherte und versicherte Lagerhäuser",
        "Lagereinheiten unterschiedlicher Grösse"
      ],
      linkTo: "/lagerung" 
    },
    {
      icon: <Box size={32} />,
      title: "Verpackungsservice",
      description: "Professionelle Verpackungsmaterialien und Fachpersonal für das Verpacken Ihrer zerbrechlichen, wertvollen oder empfindlichen Gegenstände.",
      features: [
        "Verpacken von zerbrechlichen Gegenständen",
        "Möbelverpackung",
        "Kunstverpackung",
        "Bereitstellung von hochwertigen Verpackungsmaterialien"
      ],
      linkTo: "/verpackungsservice" 
    }
  ]

  return (
    <div className="py-12 bg-gradient-to-br from-slate-50 via-gray-100 to-slate-100">
      <div className="container mx-auto max-w-navbar px-4 md:px-6">
        <motion.section 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 pt-8"
        >
          <Briefcase className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 text-shadow">{pageTitle}</h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            {pageSubtitle}
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceItem 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              delay={index}
              linkTo={service.linkTo}
            />
          ))}
        </div>

        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="py-16 bg-green-600 text-white rounded-xl shadow-2xl text-center hero-pattern"
        >
          <h2 className="heading-2 mb-6">Warum uns wählen?</h2>
          <div className="flex flex-col md:flex-row justify-around items-center gap-8 px-4 md:px-6">
            <div className="flex flex-col items-center">
              <ShieldCheck size={40} className="mb-2" />
              <h3 className="text-xl font-semibold">Zuverlässige Partner</h3>
              <p className="text-green-200">Nur geprüfte Firmen.</p>
            </div>
            <div className="flex flex-col items-center">
              <Star size={40} className="mb-2" />
              <h3 className="text-xl font-semibold">Hohe Qualität</h3>
              <p className="text-green-200">Kundenzufriedenheit im Fokus.</p>
            </div>
            <div className="flex flex-col items-center">
              <Users size={40} className="mb-2" />
              <h3 className="text-xl font-semibold">Grosses Netzwerk</h3>
              <p className="text-green-200">Service in der ganzen Schweiz.</p>
            </div>
          </div>
          <Button asChild size="lg" className="mt-10 bg-white text-green-700 hover:bg-gray-100 group">
            <Link href="/kostenlose-offerte-anfordern">
              Jetzt kostenlose offerten anfordern <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.section>
      </div>
    </div>
  )
}

export default ServicesPageClient

