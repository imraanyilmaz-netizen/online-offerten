'use client'

import React, { useState, useMemo, useEffect } from 'react';
// framer-motion removed - CSS for better INP
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ListChecks, CalendarDays, Package, Truck, Home, MapPin, Sparkles, KeyRound, Download, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// PDF generator will be lazy loaded when needed
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

interface ChecklistItemProps {
  id: string;
  text: string;
  isChecked: boolean;
  onToggle: (id: string) => void;
}

const ChecklistItem = ({ id, text, isChecked, onToggle }: ChecklistItemProps) => {
  return (
    <div
      className="flex items-center space-x-3 py-3"
    >
      {/* @ts-ignore - Radix UI Checkbox types */}
      <Checkbox checked={isChecked} onCheckedChange={() => onToggle(id)} className="w-5 h-5" />
      <Label htmlFor={id} className={`flex-1 text-slate-700 transition-colors ${isChecked ? 'line-through text-slate-400' : ''}`}>
        {text}
      </Label>
    </div>
  );
};

interface ChecklistSectionProps {
  section: any;
  checkedItems: Record<string, boolean>;
  onToggleItem: (key: string) => void;
}

const ChecklistSection = ({ section, checkedItems, onToggleItem }: ChecklistSectionProps) => {
  const totalItems = Array.isArray(section.items) ? section.items.length : 0;
  const completedItems = Array.isArray(section.items) ? section.items.filter((item: any, index: number) => checkedItems[`${section.id}-${index}`]).length : 0;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <div
      className="relative pl-12 pb-12"
    >
      <div className="absolute left-[22px] top-5 h-full w-0.5 bg-slate-200"></div>
      <div className="absolute left-0 top-5 flex items-center justify-center w-11 h-11 rounded-full bg-green-500 text-white shadow-md">
        {React.cloneElement(section.icon, { size: 24 })}
      </div>
      <Card className="bg-white shadow-lg rounded-xl overflow-hidden border border-slate-200/80">
        <CardHeader className="bg-slate-50/70 border-b">
          <CardTitle className="text-2xl font-bold text-slate-800">{section.title}</CardTitle>
          <CardDescription className="text-slate-500 pt-1">{section.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-2 divide-y divide-slate-100">
            {Array.isArray(section.items) && section.items.map((item: any, index: number) => (
              <ChecklistItem
                key={index}
                id={`${section.id}-${index}`}
                text={item}
                isChecked={!!checkedItems[`${section.id}-${index}`]}
                onToggle={() => onToggleItem(`${section.id}-${index}`)}
              />
            ))}
          </div>
          {totalItems > 0 && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-1 text-sm font-medium text-slate-500">
                <span>Fortschritt</span>
                <span>{completedItems} / {totalItems}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const ChecklistsPageClient = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isClient, setIsClient] = useState(false);

  // Load from localStorage only on client side
  useEffect(() => {
    setIsClient(true);
    try {
      const savedItems = localStorage.getItem('checklistCheckedItems');
      if (savedItems) {
        setCheckedItems(JSON.parse(savedItems));
      }
    } catch (error) {
      console.error("Could not parse checklist items from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('checklistCheckedItems', JSON.stringify(checkedItems));
      } catch (error) {
        console.error("Could not save checklist items to localStorage", error);
      }
    }
  }, [checkedItems, isClient]);

  const checklistsData = useMemo(() => [
    { 
      id: "beforeMove", 
      title: "Vor dem Umzug: Die richtige Vorbereitung", 
      description: "Eine gute Planung ist die halbe Miete. Erledigen Sie diese Punkte frühzeitig.", 
      icon: <CalendarDays />, 
      items: [
        "Mietvertrag der alten Wohnung fristgerecht kündigen.",
        "Neuen Mietvertrag prüfen und unterschreiben.",
        "Umzugstermin festlegen (Wochentage sind oft günstiger).",
        "Urlaub für den Umzugstag beantragen.",
        "Offerten von Umzugsfirmen einholen und vergleichen (falls gewünscht).",
        "Gegebenenfalls Halteverbotszone für den Umzugswagen beantragen.",
        "Kinderbetreuung und Haustierbetreuung für den Umzugstag organisieren.",
        "Nachsendeauftrag bei der Post einrichten."
      ]
    },
    { 
      id: "packing", 
      title: "Richtig Packen: Systematisch und sicher", 
      description: "Gut gepackt ist halb umgezogen. Schützen Sie Ihr Hab und Gut.", 
      icon: <Package />, 
      items: [
        "Ausmisten: Nicht mehr Benötigtes verkaufen, spenden oder entsorgen.",
        "Ausreichend Verpackungsmaterial besorgen (Kartons, Klebeband, Polstermaterial).",
        "Kartons nach Zimmern packen und deutlich beschriften (Inhalt, Zielraum).",
        "Schwere Gegenstände in kleine Kartons, leichte in grosse Kartons packen.",
        "Eine \"Erste-Nacht-Box\" mit dem Nötigsten packen (Toilettenartikel, Kleidung, Werkzeug, Snacks)."
      ]
    },
    { 
      id: "movingDay", 
      title: "Am Umzugstag: Alles im Griff", 
      description: "Der grosse Tag ist da. Mit guter Organisation bleibt der Stress gering.", 
      icon: <Truck />, 
      items: [
        "Böden und empfindliche Stellen in der alten und neuen Wohnung schützen.",
        "Helfer instruieren und Aufgaben verteilen.",
        "Verpflegung und Getränke für Helfer bereitstellen.",
        "Zählerstände (Strom, Wasser, Gas) in der alten Wohnung ablesen und protokollieren.",
        "Letzter Kontrollgang durch die alte Wohnung – nichts vergessen?"
      ]
    },
    { 
      id: "afterMove", 
      title: "Nach dem Umzug: Einleben und Organisieren", 
      description: "Die erste Zeit im neuen Zuhause. Schritt für Schritt einrichten.", 
      icon: <Home />, 
      items: [
        "Neue Wohnung grob reinigen (falls nicht geschehen).",
        "Zählerstände in der neuen Wohnung ablesen und protokollieren.",
        "Möbel aufstellen und wichtigste Kartons auspacken.",
        "Übergabeprotokoll der alten Wohnung anfertigen und Schlüssel übergeben.",
        "Sich bei den Nachbarn vorstellen."
      ]
    },
    { 
      id: "addressChange", 
      title: "Adressänderungen: Wer muss informiert werden?", 
      description: "Damit Ihre Post ankommt und Verträge weiterlaufen.", 
      icon: <MapPin />, 
      items: [
        "Einwohnermeldeamt (innerhalb der Frist ummelden).",
        "Banken und Versicherungen.",
        "Arbeitgeber und ggf. Geschäftspartner.",
        "Ärzte, Schulen, Kindergärten.",
        "Abonnements (Zeitungen, Zeitschriften, Streaming-Dienste)."
      ]
    },
    { 
      id: "finalCleaning", 
      title: "Endreinigung: Besenrein oder mit Abnahmegarantie", 
      description: "Die alte Wohnung muss sauber übergeben werden.", 
      icon: <Sparkles />, 
      items: [
        "Umfang der Reinigungspflicht im Mietvertrag prüfen.",
        "Selbst reinigen oder Reinigungsfirma beauftragen.",
        "Bei Beauftragung: Festpreis und Abnahmegarantie vereinbaren.",
        "Alle Räume inklusive Fenster, Böden, Küche und Bad gründlich reinigen."
      ]
    },
    { 
      id: "handover", 
      title: "Wohnungsübergabe: Der letzte Schritt", 
      description: "Offizieller Abschluss des alten Mietverhältnisses.", 
      icon: <KeyRound />, 
      items: [
        "Termin für die Wohnungsübergabe mit dem Vermieter vereinbaren.",
        "Übergabeprotokoll sorgfältig prüfen und unterschreiben (Mängel festhalten).",
        "Alle Schlüssel (Wohnung, Keller, Briefkasten) übergeben."
      ]
    }
  ], []);

  const handleToggleItem = (id: string) => {
    setCheckedItems((prev: Record<string, boolean>) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownloadPdf = async () => {
    try {
      // Lazy load PDF generator only when user clicks download
      const { generateChecklistPdf } = await import('@/lib/generateChecklistPdf');
      // Pass null as t function since we're using direct titles now
      await generateChecklistPdf(checklistsData, null, checkedItems);
      // Success - PDF should download automatically
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: 'PDF-Generierung fehlgeschlagen',
        description: (error as Error)?.message || 'Bitte versuchen Sie es erneut.',
        variant: 'destructive',
      });
    }
  };

  const totalTasks = useMemo(() => checklistsData.reduce((acc, section) => acc + (Array.isArray(section.items) ? section.items.length : 0), 0), [checklistsData]);
  const completedTasks = Object.values(checkedItems).filter(Boolean).length;
  const totalProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const canonicalUrl = '/umzugsfirma/checklists';
  const metaTitle = "Umzugs-Checklisten | Umzug planen leicht gemacht";
  const metaDescription = "Umfassende Checklisten für jede Phase Ihres Umzugs. Vom Kistenpacken bis zur Adressänderung – mit unseren Tipps stressfrei umziehen.";
  const mainTitle = "Ihre Umzugs-Checklisten: Perfekt organisiert umziehen";
  const mainSubtitle = "Vom Kistenpacken bis zur Adressänderung: Unsere detaillierten Checklisten begleiten Sie zuverlässig durch jede Phase Ihres Umzugs und helfen Ihnen, nichts Wichtiges zu vergessen.";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://online-offerten.ch/"
        },{
          "@type": "ListItem",
          "position": 2,
          "name": metaTitle,
          "item": canonicalUrl
        }]
      },
      {
        "@type": "HowTo",
        "name": mainTitle,
        "description": mainSubtitle,
        "step": checklistsData.flatMap(section => 
          Array.isArray(section.items) ? section.items.map(item => ({
            "@type": "HowToStep",
            "name": item,
            "text": item
          })) : []
        )
      }
    ]
  };

  return (
    <>
      
      <div className="bg-slate-50 pb-48 lg:pb-0">
        <section className="relative bg-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-white"></div>
          <div className="relative container mx-auto max-w-navbar px-4 md:px-6 py-20 md:py-28 text-center z-10">
            <div className="inline-block p-4 bg-green-500/10 rounded-full shadow-lg mb-6">
              <ListChecks className="w-12 h-12 md:w-16 md:h-16 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-4 tracking-tight">
              {mainTitle}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              {mainSubtitle}
            </p>
          </div>
        </section>

        <div className="container mx-auto max-w-navbar px-4 md:px-6 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Mobile/Tablet progress card - normal flow */}
            <aside className="block lg:hidden mb-6">
              <Card className="shadow-lg rounded-xl border border-slate-200">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Ihr Fortschritt</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-4">
                    <div>
                       <div className="w-full bg-slate-200 rounded-full h-2.5 mb-1">
                         <div
                           className="bg-gradient-to-r from-green-400 to-emerald-500 h-2.5 rounded-full"
                           style={{ width: `${totalProgress}%` }}
                         />
                       </div>
                       <div className="text-xs text-center text-slate-500">
                         <span className="font-semibold text-green-700">{Math.round(totalProgress)}%</span> erledigt ({completedTasks}/{totalTasks})
                       </div>
                    </div>
                    <Button onClick={handleDownloadPdf} className="bg-green-600 hover:bg-green-700 w-full">
                      <Download className="mr-2 h-4 w-4" />
                      <span>Checklisten als PDF herunterladen</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>
            
            {/* Desktop sidebar - sticky */}
            <aside className="hidden lg:block lg:w-1/4 lg:sticky lg:top-24 lg:self-start">
              <Card className="shadow-lg rounded-xl border border-slate-200">
                <CardHeader className="p-6">
                  <CardTitle className="text-xl">Ihr Fortschritt</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-4">
                    <div>
                       <div className="w-full bg-slate-200 rounded-full h-2.5 mb-1">
                         <div
                           className="bg-gradient-to-r from-green-400 to-emerald-500 h-2.5 rounded-full"
                           style={{ width: `${totalProgress}%` }}
                         />
                       </div>
                       <div className="text-sm text-center text-slate-500">
                         <span className="font-semibold text-green-700">{Math.round(totalProgress)}%</span> erledigt ({completedTasks}/{totalTasks})
                       </div>
                    </div>
                    <Button onClick={handleDownloadPdf} className="bg-green-600 hover:bg-green-700 w-full">
                      <Download className="mr-2 h-4 w-4" />
                      <span>Checklisten als PDF herunterladen</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>

            <main className="lg:w-3/4">
              <div className="relative">
                {checklistsData.map((section) => (
                  <ChecklistSection
                    key={section.id}
                    section={section}
                    checkedItems={checkedItems}
                    onToggleItem={handleToggleItem}
                  />
                ))}
              </div>
            </main>
          </div>
        </div>

        <section className="py-16 bg-white">
          <div className="container mx-auto max-w-navbar px-4 md:px-6 text-center">
            <FileText className="mx-auto h-12 w-12 text-green-600 mb-4" />
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Bereit für Ihren stressfreien Umzug?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Nutzen Sie unsere Expertise und fordern Sie jetzt kostenlos und unverbindlich Offerten von geprüften Umzugsfirmen an.
            </p>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white group transform hover:scale-105 transition-transform">
              <Link href="/kostenlose-offerte-anfordern">
                Kostenlose Offerten anfordern
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default ChecklistsPageClient;


