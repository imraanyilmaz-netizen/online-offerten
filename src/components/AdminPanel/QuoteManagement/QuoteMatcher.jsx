import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Save, Loader2, Users, MapPin, Package, Briefcase, CheckCircle, Wand2, Building2, Star, Sparkles, Truck, Paintbrush, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { findMatchingPartners } from '@/lib/matchUtils';
import { getFullCantonName, getGermanServiceName, cantonOptions } from '@/lib/dataMapping';
import { supabase } from '@/lib/customSupabaseClient';

const mainCategoryConfig = {
  umzug: { icon: Truck, label: 'Umzugsfirma', color: 'text-blue-600' },
  reinigung: { icon: Sparkles, label: 'Reinigungsfirma', color: 'text-purple-600' },
  maler: { icon: Paintbrush, label: 'Malerfirma', color: 'text-orange-600' },
};

const PartnerItem = ({ partner, isMatched, isSelected, onSelectionChange }) => {
  const [expandedRegions, setExpandedRegions] = useState(false);
  const [expandedServices, setExpandedServices] = useState(false);

  const hasMoreRegions = partner.service_regions?.length > 8;
  const hasMoreServices = partner.offered_services?.length > 6;
  const visibleRegions = expandedRegions ? partner.service_regions : partner.service_regions?.slice(0, 8);
  const visibleServices = expandedServices ? partner.offered_services : partner.offered_services?.slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={`cursor-pointer transition-all duration-200 ${
          isSelected 
            ? 'border-green-500 bg-green-50 shadow-md' 
            : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-sm'
        }`}
        onClick={() => onSelectionChange(partner.id, !isSelected)}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <Checkbox
                id={`partner-inline-${partner.id}`}
                checked={isSelected}
                onCheckedChange={(checked) => onSelectionChange(partner.id, checked)}
                onClick={(e) => e.stopPropagation()}
                className="h-5 w-5"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Building2 className={`w-5 h-5 flex-shrink-0 ${isSelected ? 'text-green-600' : 'text-gray-400'}`} />
                    <Label 
                      htmlFor={`partner-inline-${partner.id}`} 
                      className={`font-semibold text-base cursor-pointer truncate ${
                        isSelected ? 'text-green-800' : 'text-gray-900'
                      }`}
                    >
                      {partner.company_name}
                    </Label>
                  </div>
                  {partner.main_categories && partner.main_categories.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 ml-7">
                      {partner.main_categories.map(category => {
                        const config = mainCategoryConfig[category];
                        if (!config) return null;
                        const Icon = config.icon;
                        return (
                          <Badge 
                            key={category}
                            variant="outline"
                            className={`text-xs font-medium px-2 py-0.5 flex items-center gap-1 ${
                              isSelected
                                ? 'bg-white border-green-300 text-green-700'
                                : 'bg-gray-50 border-gray-300 text-gray-700'
                            }`}
                          >
                            <Icon className={`w-3 h-3 ${config.color}`} />
                            {config.label}
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </div>
                {isMatched && (
                  <Badge 
                    variant="outline" 
                    className="flex-shrink-0 bg-green-100 text-green-700 border-green-300 font-medium px-2.5 py-0.5"
                  >
                    <Sparkles className="w-3 h-3 mr-1.5" />
                    Automatische Übereinstimmung
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2.5">
                {partner.service_regions?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <MapPin className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-green-600' : 'text-gray-500'}`} />
                    <div className="flex flex-wrap gap-1.5">
                      <AnimatePresence mode="popLayout">
                        {visibleRegions.map((region, index) => (
                          <motion.div
                            key={region}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2, delay: index * 0.02 }}
                          >
                            <Badge 
                              variant="secondary" 
                              className={`text-xs font-medium px-2 py-0.5 ${
                                isSelected 
                                  ? 'bg-green-100 text-green-700 border-green-200' 
                                  : 'bg-gray-100 text-gray-700 border-gray-200'
                              }`}
                            >
                              {getFullCantonName(region)}
                            </Badge>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {hasMoreRegions && (
                        <Badge 
                          variant="secondary" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedRegions(!expandedRegions);
                          }}
                          className={`text-xs font-medium px-2 py-0.5 cursor-pointer hover:opacity-80 transition-all duration-200 flex items-center gap-1 ${
                            isSelected 
                              ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                          }`}
                        >
                          {expandedRegions ? (
                            <>
                              <ChevronUp className="w-3 h-3 transition-transform duration-200" />
                              Weniger anzeigen
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3 h-3 transition-transform duration-200" />
                              +{partner.service_regions.length - 8} weitere
                            </>
                          )}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                
                {partner.offered_services?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <CheckCircle className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-green-600' : 'text-gray-500'}`} />
                    <div className="flex flex-wrap gap-1.5">
                      <AnimatePresence mode="popLayout">
                        {visibleServices.map((service, index) => (
                          <motion.div
                            key={service}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2, delay: index * 0.02 }}
                          >
                            <Badge 
                              variant="outline" 
                              className={`text-xs font-medium px-2 py-0.5 ${
                                isSelected 
                                  ? 'bg-white text-green-700 border-green-300' 
                                  : 'bg-gray-50 text-gray-700 border-gray-300'
                              }`}
                            >
                              {getGermanServiceName(service)}
                            </Badge>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {hasMoreServices && (
                        <Badge 
                          variant="outline" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedServices(!expandedServices);
                          }}
                          className={`text-xs font-medium px-2 py-0.5 cursor-pointer hover:opacity-80 transition-all duration-200 flex items-center gap-1 ${
                            isSelected 
                              ? 'bg-white text-green-700 border-green-300 hover:bg-green-50' 
                              : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                          }`}
                        >
                          {expandedServices ? (
                            <>
                              <ChevronUp className="w-3 h-3 transition-transform duration-200" />
                              Weniger anzeigen
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3 h-3 transition-transform duration-200" />
                              +{partner.offered_services.length - 6} weitere
                            </>
                          )}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};


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
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" /> 
                Partnerauswahl
                <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700 border-green-300 font-semibold">
                  {selectedPartnerIds.size} ausgewählt
                </Badge>
              </h3>
            </div>
            
            <div className="max-h-[600px] overflow-y-auto border-2 border-gray-200 rounded-lg bg-gradient-to-b from-gray-50 to-white p-4 space-y-3 custom-scrollbar">
              {loadingPartners ? (
                <div className="flex flex-col items-center justify-center p-8 gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                  <p className="text-sm font-medium text-gray-600">Partner werden geladen...</p>
                </div>
              ) : activePartners.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 gap-2">
                  <Building2 className="w-12 h-12 text-gray-400" />
                  <p className="text-sm font-medium text-gray-500 text-center">
                    Keine aktiven Partner im System gefunden.
                  </p>
                </div>
              ) : (
                <>
                  {matchedPartners.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>
                        <h4 className="text-sm font-bold text-green-700 uppercase tracking-wider px-3 py-1 bg-green-50 rounded-full border border-green-200 flex items-center gap-2">
                          <Star className="w-3.5 h-3.5 fill-green-600 text-green-600" />
                          Passende Partner ({matchedPartners.length})
                        </h4>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>
                      </div>
                      <div className="space-y-3">
                        {matchedPartners.map(p => (
                          <PartnerItem 
                            key={p.id} 
                            partner={p} 
                            isMatched={true} 
                            isSelected={selectedPartnerIds.has(p.id)} 
                            onSelectionChange={handlePartnerSelection} 
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {targetRegions.length > 0 && matchedPartners.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-8 gap-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <MapPin className="w-10 h-10 text-yellow-600" />
                      <p className="text-sm font-medium text-gray-700 text-center max-w-md">
                        Keine passenden Partner für die ausgewählten Kriterien gefunden. 
                        <br />
                        <span className="text-gray-600">Sie können unten manuell auswählen.</span>
                      </p>
                    </div>
                  )}

                  {unmatchedPartners.length > 0 && (
                    <div className="space-y-3">
                      {matchedPartners.length > 0 && (
                        <div className="flex items-center gap-2 my-4">
                          <Separator className="flex-1" />
                          <span className="text-xs font-medium text-gray-400 px-2">oder</span>
                          <Separator className="flex-1" />
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                        <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wider px-3 py-1 bg-gray-100 rounded-full border border-gray-200">
                          {targetRegions.length > 0 ? 'Andere Partner' : 'Alle Partner'} ({unmatchedPartners.length})
                        </h4>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                      </div>
                      <div className="space-y-3">
                        {unmatchedPartners.map(p => (
                          <PartnerItem 
                            key={p.id} 
                            partner={p} 
                            isMatched={false} 
                            isSelected={selectedPartnerIds.has(p.id)} 
                            onSelectionChange={handlePartnerSelection} 
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t-2 border-gray-200 bg-white -mx-4 sm:-mx-6 px-4 sm:px-6 pb-4 sm:pb-6">
          <Button 
            variant="ghost" 
            onClick={onClose} 
            disabled={isProcessing}
            className="px-6 font-medium"
          >
            Abbrechen
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isProcessing || loadingPartners}
            className="bg-green-600 hover:bg-green-700 text-white px-6 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Wird gespeichert...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Zuweisung speichern
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuoteMatcher;