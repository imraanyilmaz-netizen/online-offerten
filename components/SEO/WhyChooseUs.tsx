'use client'

// framer-motion removed - CSS for better INP
import { ShieldCheck, TrendingUp, Users, Award, Clock, CheckCircle2 } from 'lucide-react'

interface WhyChooseUsProps {
  title?: string
  subtitle?: string
  advantages?: Array<{
    icon: React.ReactNode
    title: string
    description: string
  }>
  className?: string
}

export default function WhyChooseUs({
  title = "Warum Online-Offerten.ch?",
  subtitle = "Ihre Vorteile auf einen Blick",
  advantages = [
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Geprüfte Partner",
      description: "Alle unsere Partner werden sorgfältig geprüft. Sie erhalten nur Offerten von vertrauenswürdigen, zertifizierten Unternehmen."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Bis zu 40% sparen",
      description: "Durch den Vergleich mehrerer Offerten finden Sie das beste Preis-Leistungs-Verhältnis und sparen erheblich."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "100% kostenlos",
      description: "Die Anfrage ist vollständig kostenlos und unverbindlich. Keine versteckten Kosten, keine Verpflichtungen."
    }
  ],
  className = ""
}: WhyChooseUsProps) {
  return (
    <section
      className={`bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200 ${className}`}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
        {subtitle && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {advantages.map((advantage, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 text-green-600 mx-auto">
              {advantage.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{advantage.title}</h3>
            <p className="text-gray-600 text-center leading-relaxed">{advantage.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}












































