import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { Calculator, ArrowRight, Loader2, ExternalLink, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useRouter } from 'next/navigation';

const NewCustomerForm = lazy(() => import('@/components/NewCustomerForm/index'));

const FormLoadingSpinner = () => (
    <div className="flex justify-center items-center h-full w-full p-10">
      <Loader2 className="h-10 w-10 text-green-600 animate-spin" />
    </div>
);

const LocationInfo = ({ zip, onLocationUpdate }) => {
    const [location, setLocation] = useState({ city: null, canton: null });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCity = async () => {
            if (zip && zip.length >= 4) {
                setLoading(true);
                setError(false);
                try {
                    const { data, error: functionError } = await supabase.functions.invoke('fetch-city-by-zip', {
                        body: { zipCode: zip },
                    });
                    if (functionError) throw functionError;
                    
                    if(data && data.city) {
                       setLocation({ city: data.city, canton: data.canton });
                       onLocationUpdate({ city: data.city, canton: data.canton });
                       setError(false);
                    } else {
                       setLocation({ city: null, canton: null });
                       onLocationUpdate(null);
                       setError(true);
                    }
                } catch (err) {
                    console.error("Error fetching city:", err);
                    setLocation({ city: null, canton: null });
                    onLocationUpdate(null);
                    setError(true);
                } finally {
                    setLoading(false);
                }
            } else {
                setLocation({ city: null, canton: null });
                onLocationUpdate(null);
                setError(false);
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchCity();
        }, 500);

        return () => clearTimeout(timer);
    }, [zip, onLocationUpdate]);

    if (loading) {
        return <div className="text-xs text-gray-500 flex items-center mt-1"><Loader2 className="w-3 h-3 mr-1 animate-spin" />Lade Ort...</div>;
    }
    if (error) {
         return <div className="text-xs text-red-500 flex items-center mt-1"><MapPin className="w-3 h-3 mr-1" />Ort nicht gefunden</div>;
    }
    if (location.city) {
        return <div className="text-xs text-green-600 flex items-center mt-1"><MapPin className="w-3 h-3 mr-1" />{location.city}{location.canton ? `, ${location.canton}` : ''}</div>;
    }
    return null;
};


const MovingCostCalculator = ({ onRequestQuote, hideInlineForm = false, shouldOpenForm = false, onFormOpened, hideCalculator = false }) => {
  const router = useRouter();
  const [rooms, setRooms] = useState("3.5");
  const [cleaning, setCleaning] = useState("no");
  const [furnitureAssembly, setFurnitureAssembly] = useState("no");
  const [fromZip, setFromZip] = useState("");
  const [toZip, setToZip] = useState("");
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);

  const [calculatedDistance, setCalculatedDistance] = useState(null);
  const [calculatedCost, setCalculatedCost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showInlineForm, setShowInlineForm] = useState(false);
  const [initialFormDataForForm, setInitialFormDataForForm] = useState({});

  // Effect to open form when shouldOpenForm is true (component mounts with shouldOpenForm=true)
  useEffect(() => {
    if (shouldOpenForm && !hideInlineForm) {
      console.log('[MovingCostCalculator] Opening form, shouldOpenForm:', shouldOpenForm, 'hideInlineForm:', hideInlineForm);
      // Get form data from URL parameters
      const params = new URLSearchParams(window.location.search);
      const formData = {
        service: params.get('service') || 'umzug',
        umzugArt: params.get('umzugArt') || 'privatumzug',
        from_rooms: params.get('from_rooms') || rooms,
        from_zip: params.get('from_zip') || fromZip,
        from_city: params.get('from_city') || fromLocation?.city || '',
        from_canton: params.get('from_canton') || fromLocation?.canton || '',
        to_zip: params.get('to_zip') || toZip,
        to_city: params.get('to_city') || toLocation?.city || '',
        to_canton: params.get('to_canton') || toLocation?.canton || '',
        additional_cleaning: params.get('additional_cleaning') === 'true' || cleaning === 'yes',
        furniture_assembly: params.get('furniture_assembly') === 'true' || furnitureAssembly === 'yes',
        calculated_distance: params.get('calculated_distance') || calculatedDistance,
        _initialStep: 2,
      };
      
      console.log('[MovingCostCalculator] Setting form data:', formData);
      setInitialFormDataForForm(formData);
      setShowInlineForm(true);
      
      // Call onFormOpened after form is rendered (just for notification, not to close)
      setTimeout(() => {
        if (onFormOpened) {
          console.log('[MovingCostCalculator] Form rendered, calling onFormOpened');
          onFormOpened();
        }
      }, 500);
    }
  }, [shouldOpenForm, hideInlineForm]);

  const roomOptions = [
    { value: "1.5", label: "1 - 1.5 Zimmer" },
    { value: "2.5", label: "2 - 2.5 Zimmer" },
    { value: "3.5", label: "3 - 3.5 Zimmer" },
    { value: "4.5", label: "4 - 4.5 Zimmer" },
    { value: "5.5", label: "5.5+ Zimmer" },
  ];

  const basePrices = {
    "1.5": 600, 
    "2.5": 900,
    "3.5": 1200,
    "4.5": 1750,
    "5.5": 2250,
  };
  const cleaningCost = 500; 
  const furnitureAssemblyCost = 400; // Möbel De-/Montage maliyeti
  const costPerKm = 2; 

  const handleCalculateCost = async () => {
    if (!fromZip || !toZip) {
      const errorMsg = "Bitte geben Sie beide Postleitzahlen an.";
      setError(errorMsg);
      toast({ title: errorMsg, variant: "destructive" });
      setCalculatedCost(null);
      setCalculatedDistance(null);
      return;
    }
    setError(null);
    setIsLoading(true);
    setCalculatedCost(null);
    setCalculatedDistance(null);

    try {
      const { data: distanceData, error: distanceError } = await supabase.functions.invoke('calculate-distance', {
        body: { fromZip, toZip },
      });

      if (distanceError) {
        console.error("Distance calculation error (Edge Function):", distanceError.message);
        const apiErrorMsg = distanceData?.error || distanceError.message || "Die Kosten konnten nicht berechnet werden. Bitte versuchen Sie es später erneut.";
        throw new Error(apiErrorMsg);
      }
      
      let distance = distanceData?.distance_km;

      if (distanceData?.warning) {
        // Backend'den gelen uyarıyı Almanca'ya çevir
        let germanWarning = distanceData.warning;
        if (distanceData.warning.includes("Could not find coordinates")) {
          germanWarning = "Koordinaten für eine oder beide Postleitzahlen konnten nicht gefunden werden. Es wird eine Standarddistanz verwendet.";
        } else if (distanceData.warning.includes("Using a default distance")) {
          germanWarning = "Es wird eine Standarddistanz verwendet.";
        }
        toast({ 
          title: "Distanz-Warnung", 
          description: germanWarning, 
          variant: "default", 
          duration: 7000 
        });
      }
      
      if (typeof distance !== 'number' || isNaN(distance) || distance === null) {
         toast({ 
            title: "Distanz-Warnung", 
            description: `Die Distanz konnte nicht genau bestimmt werden. Es wird eine Standarddistanz von 50 km verwendet.`, 
            variant: "default", 
            duration: 7000 
        });
        distance = 50; 
      }
      
      setCalculatedDistance(distance);

      let totalCost = basePrices[rooms] || basePrices["3.5"]; 
      if (cleaning === "yes") {
        totalCost += cleaningCost;
      }
      if (furnitureAssembly === "yes") {
        totalCost += furnitureAssemblyCost;
      }
      totalCost += distance * costPerKm;
      
      setCalculatedCost(Math.round(totalCost));

    } catch (err) {
      console.error("Error calculating cost (Client-side):", err);
      const errorMessage = err.message || "Die Kosten konnten nicht berechnet werden. Bitte versuchen Sie es später erneut.";
      setError(errorMessage);
      toast({ title: "Berechnungsfehler", description: errorMessage, variant: "destructive" });
      setCalculatedCost(null); 
      setCalculatedDistance(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOpenQuoteForm = () => {
    // Wenn onRequestQuote prop vorhanden ist, rufe diese Funktion auf (für Hero-Bereich)
    if (onRequestQuote) {
      // Setze URL-Parameter mit Formulardaten für die Seite
      const params = new URLSearchParams(window.location.search);
      params.set('service', 'umzug');
      params.set('step', '2');
      params.set('umzugArt', 'privatumzug');
      if (rooms) params.set('from_rooms', rooms);
      if (fromZip) params.set('from_zip', fromZip);
      if (fromLocation?.city) params.set('from_city', fromLocation.city);
      if (fromLocation?.canton) params.set('from_canton', fromLocation.canton);
      if (toZip) params.set('to_zip', toZip);
      if (toLocation?.city) params.set('to_city', toLocation.city);
      if (toLocation?.canton) params.set('to_canton', toLocation.canton);
      if (cleaning === 'yes') params.set('additional_cleaning', 'true');
      if (furnitureAssembly === 'yes') params.set('furniture_assembly', 'true');
      if (calculatedDistance) params.set('calculated_distance', calculatedDistance.toString());
      
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
      
      onRequestQuote();
      return;
    }
    
    // Setze die initialen Formulardaten mit service=umzug und step=2
    setInitialFormDataForForm({
        service: 'umzug',
        umzugArt: 'privatumzug',
        from_rooms: rooms,
        from_zip: fromZip,
        from_city: fromLocation?.city || '',
        from_canton: fromLocation?.canton || '',
        to_zip: toZip,
        to_city: toLocation?.city || '',
        to_canton: toLocation?.canton || '',
        additional_cleaning: cleaning === 'yes',
        furniture_assembly: furnitureAssembly === 'yes',
        calculated_distance: calculatedDistance,
        // Setze einen speziellen Parameter, um direkt zu Schritt 2 zu springen
        _initialStep: 2,
    });
    
    // Öffne das Inline-Formular
    setShowInlineForm(true);
    
    // Scroll zum Formular und aktualisiere die URL für Schritt 2
    setTimeout(() => {
        const formElement = document.getElementById('calculator-inline-form');
        formElement?.scrollIntoView({ behavior: 'smooth' });
        
        // Aktualisiere die URL, damit das Formular zu Schritt 2 springt
        const params = new URLSearchParams(window.location.search);
        params.set('service', 'umzug');
        params.set('step', '2');
        params.set('umzugArt', 'privatumzug');
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    }, 100);
  };
  
  const handleFromLocationUpdate = useCallback((location) => {
    setFromLocation(location);
  }, []);
  
  const handleToLocationUpdate = useCallback((location) => {
    setToLocation(location);
  }, []);

  return (
    <>
      {!hideCalculator && (
      <Card className="shadow-xl border-green-500 border-2">
        <CardHeader className="bg-green-50 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-green-700 flex items-center">
            <Calculator size={28} className="mr-3" />
            Umzugskosten online berechnen
          </CardTitle>
          <CardDescription>Erhalten Sie eine sofortige Kostenschätzung basierend auf Ihren Angaben.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="rooms" className="block text-sm font-medium text-gray-700 mb-1">Anzahl Zimmer</Label>
              <Select value={rooms} onValueChange={setRooms}>
                <SelectTrigger id="rooms">
                  <SelectValue placeholder="Wohnungsgrösse auswählen" />
                </SelectTrigger>
                <SelectContent>
                  {roomOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cleaning" className="block text-sm font-medium text-gray-700 mb-1">Mit Umzugsreinigung?</Label>
              <Select value={cleaning} onValueChange={setCleaning}>
                <SelectTrigger id="cleaning">
                  <SelectValue placeholder="Reinigung auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">Nein, nur Umzug</SelectItem>
                  <SelectItem value="yes">Ja, mit Abnahmegarantie</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="furnitureAssembly" className="block text-sm font-medium text-gray-700 mb-1">Möbel De-/Montage?</Label>
              <Select value={furnitureAssembly} onValueChange={setFurnitureAssembly}>
                <SelectTrigger id="furnitureAssembly">
                  <SelectValue placeholder="Möbelmontage auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">Nein</SelectItem>
                  <SelectItem value="yes">Ja</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="from_zip" className="block text-sm font-medium text-gray-700 mb-1">Von (PLZ)</Label>
              <Input type="text" id="from_zip" value={fromZip} onChange={(e) => setFromZip(e.target.value)} placeholder="z.B. 8000" />
              <LocationInfo zip={fromZip} onLocationUpdate={handleFromLocationUpdate} />
            </div>
            <div>
              <Label htmlFor="to_zip" className="block text-sm font-medium text-gray-700 mb-1">Nach (PLZ)</Label>
              <Input type="text" id="to_zip" value={toZip} onChange={(e) => setToZip(e.target.value)} placeholder="z.B. 3000" />
              <LocationInfo zip={toZip} onLocationUpdate={handleToLocationUpdate} />
            </div>
          </div>
          <Button 
            onClick={handleCalculateCost} 
            size="lg" 
            className={`w-full text-white group transition-all duration-300 ${
              calculatedCost !== null 
                ? 'bg-green-700 hover:bg-green-800 shadow-lg' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Berechne...
              </>
            ) : calculatedCost !== null ? (
              <>
                Neu berechnen
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </>
            ) : (
              <>
                Jetzt Preis berechnen
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
          
          {error && <p className="text-red-600 text-sm text-center py-2 bg-red-50 rounded-md">{error}</p>}

          {calculatedCost !== null && (
            <div
              className="mt-6 p-6 bg-green-50 border-l-4 border-green-500 rounded-md shadow"
            >
              <h3 className="text-xl font-semibold text-green-800 mb-3">Ihre Kostenschätzung</h3>
              <div className="space-y-2">
                {calculatedDistance !== null && (
                  <p className="text-gray-700">
                    Geschätzte Distanz: <span className="font-bold">{calculatedDistance} km</span>
                  </p>
                )}
                <p className="text-2xl font-bold text-green-700">
                  Geschätzte Umzugskosten: <span className="font-bold">CHF {calculatedCost}</span>
                </p>
                <p className="text-xs text-gray-500 italic">Dies ist eine Schätzung. Der definitive Preis kann je nach Aufwand und Zusatzleistungen variieren.</p>
              </div>
              <Button onClick={handleOpenQuoteForm} size="lg" className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white group">
                Detaillierte Offerten anfordern
                <ExternalLink className="w-5 h-5 ml-2 transition-transform group-hover:scale-110" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      )}

      {showInlineForm && !hideInlineForm && (
        <div
          id="calculator-inline-form"
          className="mt-8 p-6 bg-white rounded-lg border-2 border-gray-200 shadow-lg"
        >
          <Suspense fallback={<FormLoadingSpinner />}>
           <NewCustomerForm 
              key={`form-${showInlineForm}-${initialFormDataForForm.service || 'default'}`}
              initialDataFromProps={initialFormDataForForm}
            />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default MovingCostCalculator;