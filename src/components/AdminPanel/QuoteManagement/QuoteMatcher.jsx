import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Save, Loader2, Users, MapPin, Package, Briefcase, CheckCircle, Wand2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { findMatchingPartners } from '@/lib/matchUtils';
import { getFullCantonName, getGermanServiceName, cantonOptions } from '@/lib/dataMapping';
import { supabase } from '@/lib/customSupabaseClient';

const PartnerItem = ({ partner, isMatched, isSelected, onSelectionChange }) => (
  <div className="flex items-start space-x-3 p-2 rounded-md hover:bg-slate-100 transition-colors">
    <Checkbox
      id={`partner-inline-${partner.id}`}
      checked={isSelected}
      onCheckedChange={(checked) => onSelectionChange(partner.id, checked)}
      className="mt-1"
    />
    <div className="flex-1">
      <Label htmlFor={`partner-inline-${partner.id}`} className="flex items-center cursor-pointer text-sm font-normal">
        {partner.company_name}
        {isMatched && <Badge variant="outline" className="ml-2 text-green-700 border-green-300">Automatische Übereinstimmung</Badge>}
      </Label>
      <div className="mt-1.5 space-y-1">
        {partner.service_regions?.length > 0 && (
          <div className="flex flex-wrap gap-1 items-center">
            <MapPin className="w-3 h-3 text-gray-500 mr-1" />
            {partner.service_regions.map(region => (
              <Badge key={region} variant="secondary" className="text-xs font-normal">{getFullCantonName(region)}</Badge>
            ))}
          </div>
        )}
        {partner.offered_services?.length > 0 && (
          <div className="flex flex-wrap gap-1 items-center">
            <CheckCircle className="w-3 h-3 text-gray-500 mr-1" />
            {partner.offered_services.map(service => (
              <Badge key={service} variant="outline" className="text-xs font-normal">{getGermanServiceName(service)}</Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);


const QuoteMatcher = ({ quote, allPartners, onSave, onClose, isProcessing }) => {
  const { toast } = useToast();
  const [price, setPrice] = useState('');
  const [purchaseQuota, setPurchaseQuota] = useState('');
  const [targetRegions, setTargetRegions] = useState([]);
  const [newRegion, setNewRegion] = useState('');
  const [loadingPartners, setLoadingPartners] = useState(false);
  const [isFetchingCantons, setIsFetchingCantons] = useState(false);
  const [selectedPartnerIds, setSelectedPartnerIds] = useState(new Set());

  const activePartners = useMemo(() => {
    return allPartners.filter(p => p.status === 'active');
  }, [allPartners]);
  
  const fetchCantonsForQuote = useCallback(async () => {
    if (!quote) return;
    setIsFetchingCantons(true);
    try {
      const locationQueries = [];
      if (quote.from_city && quote.from_zip) {
        locationQueries.push(`${quote.from_zip} ${quote.from_city}`);
      }
      if (quote.to_city && quote.to_zip) {
        locationQueries.push(`${quote.to_zip} ${quote.to_city}`);
      }

      if (locationQueries.length === 0) {
        setIsFetchingCantons(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('fetch-canton-by-location', {
        body: { queries: locationQueries },
      });

      if (error) throw new Error(error.message);
      
      if (data && data.cantons) {
        setTargetRegions(prev => [...new Set([...prev, ...data.cantons])]);
      }
    } catch (error) {
      toast({
        title: "Kanton nicht gefunden",
        description: `Automatische Kantonserkennung fehlgeschlagen: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsFetchingCantons(false);
    }
  }, [quote, toast]);

  useEffect(() => {
    if (quote) {
      setPrice(quote.lead_price || '');
      // Prioritize saved quota, then form quota, then default
      setPurchaseQuota(quote.purchase_quota || quote.quoteswanted || '3');
      
      const initialRegions = quote.partner_target_regions || quote.selectedregions || [];
      const uniqueInitialRegions = [...new Set(initialRegions)];
      setTargetRegions(uniqueInitialRegions);
      
      // If regions are not set, try to fetch them automatically.
      if (uniqueInitialRegions.length === 0 && (quote.status === 'new_quote' || quote.status === 'pending')) {
        fetchCantonsForQuote();
      }
      
      // Initialize selected partners based on existing assignments
      if (quote.assigned_partner_ids && quote.assigned_partner_ids.length > 0) {
        setSelectedPartnerIds(new Set(quote.assigned_partner_ids));
      } else {
        setSelectedPartnerIds(new Set());
      }
    }
  }, [quote, fetchCantonsForQuote]);
  
  const matchingCriteria = useMemo(() => {
    if (!quote) return null;

    let mainService = quote.servicetype;
    // Special handling for 'moebellift' which is stored in `umzugart`
    if (quote.umzugart === 'moebellift') {
      mainService = 'moebellift_service';
    }

    const additionalServices = [];
    if (quote.additional_services_cleaning || quote.umzugsreinigung) {
        additionalServices.push('umzugsreinigung');
    }
    // Add more additional services from the quote object as needed
    // e.g., if (quote.additional_services_storage) { additionalServices.push('lagerung'); }
    
    return {
        mainService: mainService,
        additionalServices: additionalServices,
        targetRegions: targetRegions,
    };
  }, [quote, targetRegions]);


  useEffect(() => {
    // This effect handles the initial automatic selection of partners.
    // It runs when the criteria (like regions) change.
    // We only want to auto-select for *new* quotes that haven't been manually configured yet.
    if (quote.status !== 'new_quote' && quote.status !== 'pending') {
      return;
    }

    if (!matchingCriteria || !activePartners || targetRegions.length === 0) {
      if(targetRegions.length > 0) {
         setSelectedPartnerIds(new Set());
      }
      return;
    }

    const matchedPartners = findMatchingPartners(activePartners, matchingCriteria);
    
    if (matchedPartners.length > 0) {
        const matchedIds = new Set(matchedPartners.map(p => p.id));
        // For new quotes, we set the selection. For others, this effect doesn't run.
        setSelectedPartnerIds(matchedIds);
    } else {
        setSelectedPartnerIds(new Set());
    }
  }, [targetRegions, activePartners, matchingCriteria, quote.status]);

  const matchedPartners = useMemo(() => {
    if (!matchingCriteria || !activePartners || targetRegions.length === 0) return [];
    return findMatchingPartners(activePartners, matchingCriteria);
  }, [targetRegions, activePartners, matchingCriteria]);

  const unmatchedPartners = useMemo(() => {
    if (!activePartners || !matchedPartners) return [];
    const matchedIds = new Set(matchedPartners.map(p => p.id));
    return activePartners.filter(p => !matchedIds.has(p.id));
  }, [activePartners, matchedPartners]);
  
  const handlePartnerSelection = (partnerId, isSelected) => {
    setSelectedPartnerIds(prev => {
        const newSet = new Set(prev);
        if (isSelected) newSet.add(partnerId);
        else newSet.delete(partnerId);
        return newSet;
    });
  };

  const addRegion = () => {
    if (newRegion && !targetRegions.includes(newRegion)) {
      setTargetRegions(prev => [...prev, newRegion]);
      setNewRegion('');
    }
  };

  const removeRegion = (regionToRemove) => {
    setTargetRegions(prev => prev.filter(r => r !== regionToRemove));
  };

  const handleSave = () => {
    if (!price || !purchaseQuota) {
        toast({ title: "Fehlende Informationen", description: "Bitte geben Sie Preis und Kontingent an.", variant: "destructive"});
        return;
    }
    onSave(quote.id, price, targetRegions, purchaseQuota, Array.from(selectedPartnerIds));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0, transformOrigin: 'top' }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-slate-50 border-t-2 border-green-500 overflow-hidden"
    >
      <div className="p-4 sm:p-6 space-y-6">
        <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
            <h3 className="font-semibold text-blue-800 flex items-center gap-2"><Briefcase className="w-4 h-4" /> Dienstleistung</h3>
            <p className="text-blue-900">{getGermanServiceName(quote.servicetype)}</p>
             {matchingCriteria?.additionalServices?.length > 0 && (
                <div className="mt-2">
                    <span className="text-sm font-semibold text-blue-800">Zusatzdienste:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {matchingCriteria.additionalServices.map(service => (
                            <Badge key={service} variant="default" className="bg-blue-200 text-blue-900">{getGermanServiceName(service)}</Badge>
                        ))}
                    </div>
                </div>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="price" className="flex items-center gap-2 font-semibold">Verkaufspreis der Anfrage (CHF)</Label>
              <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="z.B.: 3.50" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="purchaseQuota" className="flex items-center gap-2 font-semibold"><Package className="w-4 h-4" /> Kauf-Kontingent</Label>
              <Input id="purchaseQuota" type="number" value={purchaseQuota} onChange={(e) => setPurchaseQuota(e.target.value)} placeholder="z.B.: 3" className="mt-1" />
            </div>
        </div>

        <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="flex items-center gap-2 font-semibold"><MapPin className="w-4 h-4" /> Zielregionen</Label>
              <Button variant="outline" size="sm" onClick={fetchCantonsForQuote} disabled={isFetchingCantons}>
                {isFetchingCantons ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Wand2 className="w-4 h-4 mr-2" />}
                Kantone automatisch finden
              </Button>
            </div>
            <div className="flex gap-2 my-2">
              <Select value={newRegion} onValueChange={setNewRegion}>
                <SelectTrigger><SelectValue placeholder="Region auswählen und hinzufügen" /></SelectTrigger>
                <SelectContent>{cantonOptions.filter(r => !targetRegions.includes(r.value)).map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}</SelectContent>
              </Select>
              <Button type="button" onClick={addRegion} disabled={!newRegion}><Plus className="w-4 h-4" /></Button>
            </div>
            <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px] bg-gray-50">
              {targetRegions.length > 0 ? targetRegions.map((r, i) => <Badge key={i} variant="secondary">{getFullCantonName(r)}<X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => removeRegion(r)} /></Badge>) : <span className="text-sm text-gray-500">Noch keine Regionen ausgewählt.</span>}
            </div>
        </div>
        
        <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2"><Users className="w-4 h-4" /> Partnerauswahl ({selectedPartnerIds.size} ausgewählt)</h3>
            <div className="max-h-72 overflow-y-auto border rounded-md p-2 bg-gray-100 space-y-1">
              {loadingPartners ? (
                <div className="flex items-center justify-center p-4 gap-2 text-sm text-gray-500"><Loader2 className="w-4 h-4 animate-spin" /> Partner werden geladen...</div>
              ) : activePartners.length === 0 ? (
                <p className="text-sm text-gray-500 p-2 text-center">Keine aktiven Partner im System gefunden.</p>
              ) : (
                <>
                  {matchedPartners.length > 0 && (
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider my-2 px-2">Passende Partner ({matchedPartners.length})</h4>
                      {matchedPartners.map(p => <PartnerItem key={p.id} partner={p} isMatched={true} isSelected={selectedPartnerIds.has(p.id)} onSelectionChange={handlePartnerSelection} />)}
                    </div>
                  )}

                  {targetRegions.length > 0 && matchedPartners.length === 0 && (
                    <p className="text-sm text-gray-500 p-2 text-center">Keine passenden Partner für die ausgewählten Kriterien gefunden. Sie können unten manuell auswählen.</p>
                  )}

                  {unmatchedPartners.length > 0 && (
                    <div className="space-y-1">
                      {matchedPartners.length > 0 && <Separator className="my-2" />}
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider my-2 px-2">
                        {targetRegions.length > 0 ? 'Andere Partner' : 'Alle Partner'} ({unmatchedPartners.length})
                      </h4>
                      {unmatchedPartners.map(p => <PartnerItem key={p.id} partner={p} isMatched={false} isSelected={selectedPartnerIds.has(p.id)} onSelectionChange={handlePartnerSelection} />)}
                    </div>
                  )}
                </>
              )}
            </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
          <Button variant="ghost" onClick={onClose} disabled={isProcessing}>Abbrechen</Button>
          <Button onClick={handleSave} disabled={isProcessing || loadingPartners}>
            {isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Zuweisung speichern
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuoteMatcher;