import React, { useState } from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Loader2, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from '@/components/ui/use-toast';

const CleaningCostCalculator = () => {
  const [propertyType, setPropertyType] = useState("apartment");
  const [rooms, setRooms] = useState("3.5");
  const [windows, setWindows] = useState("");
  const [bathrooms, setBathrooms] = useState("1");
  const [kitchenCleaning, setKitchenCleaning] = useState("yes");
  const [balconyTerrace, setBalconyTerrace] = useState("no");
  const [blinds, setBlinds] = useState("no");
  const [condition, setCondition] = useState("medium");

  const [calculatedCost, setCalculatedCost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const roomOptions = [
    { value: "1.5", label: "1.5 Zimmer" },
    { value: "2.5", label: "2.5 Zimmer" },
    { value: "3.5", label: "3.5 Zimmer" },
    { value: "4.5", label: "4.5 Zimmer" },
    { value: "5.5", label: "5.5 Zimmer" },
    { value: "6.5", label: "6.5+ Zimmer" },
  ];

  const bathroomOptions = [
    { value: "1", label: "1 Badezimmer" },
    { value: "2", label: "2 Badezimmer" },
    { value: "3", label: "3+ Badezimmer" },
  ];

  const conditionOptions = [
    { value: "light", label: "Leicht verschmutzt" },
    { value: "medium", label: "Normal verschmutzt" },
    { value: "heavy", label: "Stark verschmutzt" },
  ];

  const basePrices = { // CHF
    "apartment": {
      "1.5": 540, "2.5": 660, "3.5": 880, "4.5": 980, "5.5": 1370, "6.5": 1470
    },
    "house": {
      "1.5": 625, "2.5": 875, "3.5": 1125, "4.5": 1375, "5.5": 1625, "6.5": 1875
    }
  };

  const multipliers = {
    windows_per_unit: 15, 
    bathrooms_additional: 100,
    kitchen_separate_discount_factor: 0.9,
    balcony_terrace: 75,
    blinds_per_window: 20,
    condition_light_factor: 0.9,
    condition_medium_factor: 1.0,
    condition_heavy_factor: 1.25,
  };


  const handleCalculateCost = async () => {
    const numWindows = parseInt(windows);
    if (windows && (isNaN(numWindows) || numWindows < 0)) {
      const errorMsg = "Bitte geben Sie eine gültige Fensteranzahl ein.";
      setError(errorMsg);
      toast({ title: errorMsg, variant: "destructive" });
      setCalculatedCost(null);
      return;
    }

    setError(null);
    setIsLoading(true);
    setCalculatedCost(null);

    await new Promise(resolve => setTimeout(resolve, 700));

    try {
      let baseCost = (basePrices[propertyType] && basePrices[propertyType][rooms]) || basePrices["apartment"]["3.5"];
      
      if (numWindows > 0) {
        const baseWindows = parseFloat(rooms) * 2;
        if (numWindows > baseWindows) {
          baseCost += (numWindows - baseWindows) * multipliers.windows_per_unit;
        }
      }

      if (parseInt(bathrooms) > 1) {
        baseCost += (parseInt(bathrooms) - 1) * multipliers.bathrooms_additional;
      }

      if (kitchenCleaning === "no") {
        baseCost *= multipliers.kitchen_separate_discount_factor;
      }

      if (balconyTerrace === "yes") {
        baseCost += multipliers.balcony_terrace;
      }

      if (blinds === "yes" && numWindows > 0) {
        baseCost += numWindows * multipliers.blinds_per_window;
      }
      
      if (condition === "light") baseCost *= multipliers.condition_light_factor;
      if (condition === "heavy") baseCost *= multipliers.condition_heavy_factor;

      setCalculatedCost(Math.round(baseCost));

    } catch (err) {
      console.error("Error calculating cost (Client-side):", err);
      const errorMessage = err.message || "Die Kosten konnten nicht berechnet werden. Bitte versuchen Sie es später erneut.";
      setError(errorMessage);
      toast({ title: "Fehler bei der Berechnung", description: errorMessage, variant: "destructive" });
      setCalculatedCost(null); 
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOpenQuoteForm = () => {
    let fromRoomsValue = '';
    const roomNumber = parseFloat(rooms);
    if (propertyType === 'apartment') {
      fromRoomsValue = `${roomNumber}_zimmer_wohnung`;
    } else {
      fromRoomsValue = `${roomNumber}_zimmer_einfamilienhaus`;
    }
    
    // Weiterleitung zur Formularseite mit Parametern
    const params = new URLSearchParams({
      service: 'reinigung',
      step: '2',
      from_rooms: fromRoomsValue,
    });
    
    // Zusätzliche Parameter hinzufügen, falls vorhanden
    if (windows) params.set('windows', windows);
    if (bathrooms) params.set('bathrooms', bathrooms);
    if (kitchenCleaning) params.set('kitchen_cleaning', kitchenCleaning);
    if (balconyTerrace) params.set('balcony_terrace', balconyTerrace);
    if (blinds) params.set('blinds', blinds);
    if (condition) params.set('condition', condition);
    
    window.location.href = `/kostenlose-offerte-anfordern?${params.toString()}`;
  };

  return (
    <>
      <Card className="shadow-xl border-blue-500 border-2">
        <CardHeader className="bg-blue-50 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-blue-700 flex items-center">
            <Sparkles size={28} className="mr-3" />
            Ihre Reinigungskosten schätzen
          </CardTitle>
          <CardDescription>Füllen Sie die Felder aus, um eine ungefähre Kostenschätzung zu erhalten.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">Art der Immobilie</Label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger id="propertyType"><SelectValue placeholder="Wählen Sie die Art der Immobilie" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Wohnung</SelectItem>
                  <SelectItem value="house">Einfamilienhaus</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="rooms" className="block text-sm font-medium text-gray-700 mb-1">Anzahl Zimmer</Label>
              <Select value={rooms} onValueChange={setRooms}>
                <SelectTrigger id="rooms"><SelectValue placeholder="Wählen Sie die Zimmeranzahl" /></SelectTrigger>
                <SelectContent>
                  {roomOptions.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="windows" className="block text-sm font-medium text-gray-700 mb-1">Anzahl Fenster (ca.)</Label>
              <Input type="number" id="windows" value={windows} onChange={(e) => setWindows(e.target.value)} placeholder="z.B. 10" />
            </div>
            <div>
              <Label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">Anzahl Badezimmer</Label>
              <Select value={bathrooms} onValueChange={setBathrooms}>
                <SelectTrigger id="bathrooms"><SelectValue placeholder="Wählen Sie die Anzahl" /></SelectTrigger>
                <SelectContent>
                  {bathroomOptions.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="kitchenCleaning" className="block text-sm font-medium text-gray-700 mb-1">Küchenreinigung inklusive?</Label>
              <Select value={kitchenCleaning} onValueChange={setKitchenCleaning}>
                <SelectTrigger id="kitchenCleaning"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Ja</SelectItem>
                  <SelectItem value="no">Nein (nur falls separate Küche)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="balconyTerrace" className="block text-sm font-medium text-gray-700 mb-1">Balkon/Terrasse Reinigung?</Label>
              <Select value={balconyTerrace} onValueChange={setBalconyTerrace}>
                <SelectTrigger id="balconyTerrace"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Ja</SelectItem>
                  <SelectItem value="no">Nein</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="blinds" className="block text-sm font-medium text-gray-700 mb-1">Storen-/Rollladenreinigung?</Label>
              <Select value={blinds} onValueChange={setBlinds}>
                <SelectTrigger id="blinds"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Ja</SelectItem>
                  <SelectItem value="no">Nein</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">Zustand der Immobilie</Label>
              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger id="condition"><SelectValue placeholder="Wählen Sie den Zustand" /></SelectTrigger>
                <SelectContent>
                  {conditionOptions.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleCalculateCost} size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white group" disabled={isLoading}>
            {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : "Kosten schätzen"}
            {!isLoading && <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />}
          </Button>
          
          {error && <p className="text-red-600 text-sm text-center py-2 bg-red-50 rounded-md">{error}</p>}

          {calculatedCost !== null && (
            <div
              className="mt-6 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-md shadow"
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Geschätzte Reinigungskosten</h3>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-blue-700">
                  Ungefähre Kosten: <span className="font-bold">CHF {calculatedCost}</span>
                </p>
                <p className="text-xs text-gray-500 italic">Dies ist eine Schätzung. Die tatsächlichen Kosten können je nach Anbieter und spezifischen Anforderungen variieren.</p>
              </div>
              <Button onClick={handleOpenQuoteForm} size="lg" className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white group">
                Detaillierte Offerten anfordern
                <ExternalLink className="w-5 h-5 ml-2 transition-transform group-hover:scale-110" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

    </>
  );
};

export default CleaningCostCalculator;