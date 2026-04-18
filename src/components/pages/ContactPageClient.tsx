'use client'

import React, { useState } from 'react'
// framer-motion removed - CSS for better INP
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/src/components/ui/use-toast'
import { createClient } from '@/src/lib/supabase/client'

const ContactPageClient = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSentSuccessfully, setIsSentSuccessfully] = useState(false)
  const supabase = createClient()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsSentSuccessfully(false)

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      })

      if (error) {
        throw new Error(error.message)
      }

      setIsSentSuccessfully(true)
      setFormData({ name: '', email: '', subject: '', message: '' })

    } catch (error: any) {
      toast({
        title: "Fehler beim Senden",
        description: `Ihre Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt per E-Mail. ${error.message}`,
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendNewMessage = () => {
    setIsSentSuccessfully(false)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const contactDetails = [
    { icon: <Mail className="h-6 w-6 text-green-600 dark:text-emerald-400" />, title: "E-Mail", value: "info@online-offerten.ch", href: "mailto:info@online-offerten.ch" }
  ]
  
  return (
    <div className="bg-gray-50">
      <main>
        <div className="pt-16 pb-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">Kontaktieren Sie uns</h1>
              <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">Haben Sie Fragen, Anregungen oder benötigen Sie Hilfe? Unser Team ist nur eine Nachricht entfernt. Wir freuen uns, von Ihnen zu hören!</p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
              <div
                className="space-y-8"
              >
                {contactDetails.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-green-100 dark:bg-emerald-950/45 rounded-full">
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                      <a href={item.href} className="text-muted-foreground hover:text-green-600 dark:hover:text-emerald-400 transition-colors">{item.value}</a>
                    </div>
                  </div>
                ))}
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-green-100 dark:bg-emerald-950/45 rounded-full">
                    <Mail className="h-6 w-6 text-green-600 dark:text-emerald-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-foreground">Erreichbarkeit</h3>
                    <p className="text-muted-foreground">Montag - Freitag: 08:00 - 17:00 Uhr</p>
                    <p className="text-muted-foreground">An Wochenenden und Feiertagen geschlossen</p>
                  </div>
                </div>
              </div>

              <div
              >
                {isSentSuccessfully ? (
                  <div
                    className="bg-green-50 dark:bg-emerald-950/30 border border-border p-8 rounded-lg shadow-lg text-center space-y-6"
                  >
                    <CheckCircle className="mx-auto h-16 w-16 text-green-600 dark:text-emerald-400" />
                    <h2 className="heading-2">Nachricht erfolgreich gesendet!</h2>
                    <p className="text-muted-foreground">Vielen Dank für Ihre Nachricht.</p>
                    <Button onClick={handleSendNewMessage} className="bg-green-600 hover:bg-green-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                      Neue Nachricht senden
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-card border border-border p-8 rounded-lg shadow-lg space-y-6">
                    <h2 className="heading-2 mb-6">Senden Sie uns eine Nachricht</h2>
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">Ihr Name</label>
                      <Input id="name" placeholder="Max Mustermann" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">Ihre E-Mail-Adresse</label>
                      <Input id="email" type="email" placeholder="max.mustermann@example.com" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-foreground">Betreff</label>
                      <Input id="subject" placeholder="Worum geht es?" value={formData.subject} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">Ihre Nachricht</label>
                      <Textarea id="message" placeholder="Schreiben Sie hier Ihre Nachricht..." value={formData.message} onChange={handleInputChange} required rows={5} />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                      {isSubmitting ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Wird gesendet...</>
                      ) : (
                        <>Nachricht senden <Send className="ml-2 h-4 w-4" /></>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ContactPageClient



