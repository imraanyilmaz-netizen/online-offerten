'use client'

import React, { useState, useLayoutEffect, useMemo, lazy, Suspense } from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { ArrowRight, Calculator, Check, Loader2, ChevronsDown, ChevronsUp } from 'lucide-react';
import { pricingData, countryDistances } from '@/data/internationalPricing';
import CountryFlag from './CountryFlag';

const NewCustomerForm = lazy(() => import('@/components/NewCustomerForm'));

const FullPageLoader = () => (
  <div className="flex h-64 w-full items-center justify-center bg-white/80 backdrop-blur-sm">
    <Loader2 className="h-12 w-12 animate-spin text-green-600" />
  </div>
);


const InternationalCostCalculator = () => {
  const [mounted, setMounted] = useState(false);

  // All hooks must be called before any conditional returns
  const [fromCountry, setFromCountry] = useState('CH');
  const [toCountry, setToCountry] = useState('DE');
  const [moveType, setMoveType] = useState('private');
  const [rooms, setRooms] = useState(3.5);
  const [area, setArea] = useState(100);
  const [includePiano, setIncludePiano] = useState(false);
  const [includeCleaning, setIncludeCleaning] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // All hooks (including useMemo) must be called before any conditional returns
  const countries = useMemo(() => {
    const countryNames = {
      "CH": "Schweiz",
      "DE": "Deutschland",
      "AT": "Österreich",
      "FR": "Frankreich",
      "IT": "Italien",
      "ES": "Spanien",
      "PT": "Portugal",
      "BE": "Belgien",
      "DK": "Dänemark",
      "NL": "Niederlande",
      "GB": "Vereinigtes Königreich",
      "PL": "Polen",
      "CZ": "Tschechien",
      "HU": "Ungarn",
      "SE": "Schweden",
      "NO": "Norwegen",
      "FI": "Finnland",
      "GR": "Griechenland"
    };
    return Object.entries(countryNames).map(([code, name]) => ({ code, name }));
  }, []);

  const initialFormDataForQuote = useMemo(() => {
    const formData = {
        service: 'umzug',
        umzugArt: 'international',
        from_country: fromCountry,
        to_country: toCountry,
        needsdisassembly: true,
        needspacking: true,
        additional_cleaning: includeCleaning
    };

    if (moveType === 'private') {
        formData.from_rooms = rooms;
        formData.from_object_type = 'wohnung';
    } else {
        formData.from_rooms = area; // Using rooms field for area in business context
        formData.from_object_type = 'buero';
    }

    if (includePiano) {
        formData.special_transport_items = ['klaviertransport'];
        formData.hasspecialitems = true;
    }

    return formData;
  }, [fromCountry, toCountry, moveType, rooms, area, includePiano, includeCleaning]);

  // Prevent hydration mismatch by only rendering after mount
  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  // Wait for component to be mounted
  if (!mounted) {
    return (
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="flex items-center mb-6">
          <Calculator className="w-8 h-8 mr-4 text-green-500" />
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            Internationaler Umzug Kostenrechner
          </h2>
        </div>
        <div className="flex h-64 w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      </div>
    );
  }

  const handleCountryChange = (type, value) => {
    if (type === 'from') {
      setFromCountry(value);
      if (value === 'CH') {
        // If from is CH, 'to' can be anything but CH
        if (toCountry === 'CH') setToCountry('DE'); // Set a default if 'to' was also CH
      } else {
        // If from is not CH, 'to' must be CH
        setToCountry('CH');
      }
    } else { // type === 'to'
      setToCountry(value);
      if (value === 'CH') {
        // If 'to' is CH, 'from' can be anything but CH
        if (fromCountry === 'CH') setFromCountry('DE'); // Set a default if 'from' was also CH
      } else {
        // If 'to' is not CH, 'from' must be CH
        setFromCountry('CH');
      }
    }
  };

  const handleMoveTypeChange = (newMoveType) => {
    setMoveType(newMoveType);
    if (newMoveType === 'business') {
      setIncludePiano(false);
      setIncludeCleaning(false);
    }
  };

  const calculateCost = () => {
    if (fromCountry === toCountry) {
      toast({
        title: 'Fehler',
        description: 'Start- und Zielland dürfen nicht identisch sein.',
        variant: 'destructive',
      });
      return;
    }

    const distanceKey = [fromCountry, toCountry].sort().join('_');
    const distance = countryDistances[distanceKey] || 1000; // Default distance
    const moveData = pricingData[moveType];
    
    let baseCost;
    if (moveType === 'private') {
      baseCost = moveData.base + (rooms * moveData.perRoom);
    } else { // business
      baseCost = moveData.base + (area * moveData.perSqm);
    }

    const distanceCost = distance * moveData.perKm;
    const pianoCost = includePiano ? pricingData.piano.cost : 0;
    const cleaningCost = includeCleaning ? pricingData.cleaning.base + (pricingData.cleaning.perRoom * rooms) : 0;
    
    const totalCost = baseCost + distanceCost + pianoCost + cleaningCost;
    
    const minCost = totalCost * 0.85;
    const maxCost = totalCost * 1.15;

    setEstimatedCost({ min: Math.round(minCost / 100) * 100, max: Math.round(maxCost / 100) * 100 });
  };
  
  const handleShowForm = () => {
    setShowForm(true);
    setTimeout(() => {
        const formElement = document.getElementById('international-quote-form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
  };


  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };
  
  const renderCountryOption = (country) => (
    <SelectItem key={country.code} value={country.code} className="py-2">
      <div className="flex items-center">
        <CountryFlag countryCode={country.code} className="w-5 h-5 mr-3 rounded-sm" />
        <span>{country.name}</span>
      </div>
    </SelectItem>
  );

  return (
    <>
      <div
        className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100"
      >
        <div className="flex items-center mb-6">
          <Calculator className="w-8 h-8 mr-4 text-green-500" />
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Internationaler Umzug Kostenrechner</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="from-country" className="font-semibold text-slate-700">Von</Label>
            <Select value={fromCountry} onValueChange={(val) => handleCountryChange('from', val)}>
              <SelectTrigger id="from-country" className="mt-1 bg-slate-50">
                <SelectValue placeholder="Land auswählen" />
              </SelectTrigger>
              <SelectContent>{countries.filter(c => c.code !== toCountry).map(renderCountryOption)}</SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="to-country" className="font-semibold text-slate-700">Nach</Label>
            <Select value={toCountry} onValueChange={(val) => handleCountryChange('to', val)}>
              <SelectTrigger id="to-country" className="mt-1 bg-slate-50">
                <SelectValue placeholder="Land auswählen" />
              </SelectTrigger>
              <SelectContent>{countries.filter(c => c.code !== fromCountry).map(renderCountryOption)}</SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-6">
          <Label className="font-semibold text-slate-700">Umzugsart</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button variant={moveType === 'private' ? 'default' : 'outline'} onClick={() => handleMoveTypeChange('private')} className={`transition-all ${moveType === 'private' ? 'bg-green-600 text-white' : ''}`}>Privat</Button>
            <Button variant={moveType === 'business' ? 'default' : 'outline'} onClick={() => handleMoveTypeChange('business')} className={`transition-all ${moveType === 'business' ? 'bg-green-600 text-white' : ''}`}>Geschäftlich</Button>
          </div>
        </div>

        
          {moveType === 'private' ? (
            <div key="private-rooms" className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="rooms-slider" className="font-semibold text-slate-700">Anzahl Zimmer</Label>
                <span className="px-3 py-1 text-sm font-bold text-white bg-green-500 rounded-full">{rooms} Zimmer</span>
              </div>
              <Slider id="rooms-slider" value={[rooms]} onValueChange={(val) => setRooms(val[0])} min={1} max={10} step={0.5} />
            </div>
          ) : (
            <div key="business-area" className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="area-slider" className="font-semibold text-slate-700">Fläche (m²)</Label>
                <span className="px-3 py-1 text-sm font-bold text-white bg-green-500 rounded-full">{area} m²</span>
              </div>
              <Slider id="area-slider" value={[area]} onValueChange={(val) => setArea(val[0])} min={20} max={500} step={10} />
            </div>
          )}
        

        
          {moveType === 'private' && (
            <div 
              key="private-options" 
              className="space-y-4 mb-8"
            >
              <div className="flex items-center space-x-2">
                <Checkbox id="piano" checked={includePiano} onCheckedChange={setIncludePiano} />
                <Label htmlFor="piano" className="text-slate-600 cursor-pointer">Klaviertransport inklusive</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="cleaning" checked={includeCleaning} onCheckedChange={setIncludeCleaning} />
                <Label htmlFor="cleaning" className="text-slate-600 cursor-pointer">Umzugsreinigung inklusive</Label>
              </div>
            </div>
          )}
        


        <div>
          <Button onClick={calculateCost} size="lg" className="w-full bg-green-500 hover:bg-green-600 text-white group">
            Kosten berechnen
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        
          {estimatedCost && (
            <div
              className="mt-8 p-6 bg-slate-50 rounded-lg text-center border-t-4 border-green-400"
            >
              <h3 className="text-lg font-semibold text-slate-600 mb-2">Geschätzte Kosten</h3>
              <p className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
                CHF {estimatedCost.min.toLocaleString('de-CH')} - {estimatedCost.max.toLocaleString('de-CH')}
              </p>
              <p className="text-xs text-slate-500 mb-6">*Die Kosten sind eine Schätzung und können je nach individuellen Umständen variieren.</p>
              
              <Button onClick={handleShowForm} className="bg-blue-500 hover:bg-blue-600 text-white group">
                Offerten anfordern
                <ChevronsDown className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1" />
              </Button>
            </div>
          )}
        
      </div>

      
        {showForm && (
          <div
            id="international-quote-form"
            className="mt-16"
          >
            <Suspense fallback={<FullPageLoader />}>
              <NewCustomerForm initialDataFromProps={initialFormDataForQuote} formId="international-form" />
            </Suspense>
          </div>
        )}
      
    </>
  );
};

export default InternationalCostCalculator;