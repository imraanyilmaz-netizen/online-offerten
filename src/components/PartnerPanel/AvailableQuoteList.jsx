import React, { useState, useCallback } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Calendar, Truck, Eye, CheckCircle, Package, Ban, Star, ShoppingCart, MessageSquare, Sparkles, Paintbrush } from 'lucide-react';
import QuoteImages from './QuoteImages';
import QuoteFiles from './QuoteFiles';
import { countries } from '@/data/countries';
import { getServiceCategory } from '@/lib/serviceCategorizer';
import { QuoteDetail } from '@/components/common/QuoteDetail';
import ServiceDetails from '@/components/common/ServiceDetails';
import { formatDate } from '@/lib/utils';

const EmailConfirmationDetail = ({ quote }) => {
    const isConfirmed = quote.email_confirmed;
    return (
        <div className="flex items-start gap-3 text-sm text-gray-700">
            <span className="font-bold text-gray-800">E-Mail-Bestätigung:</span> 
            <span className={isConfirmed ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
                {isConfirmed ? 'Bestätigt' : 'Nicht bestätigt'}
            </span>
        </div>
    );
};


const DetailSection = ({ title, icon: Icon, children }) => (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b pb-2 mb-4 uppercase">
            {Icon && <Icon className="w-5 h-5 text-green-600" />}
            {title}
        </h3>
        <div className="space-y-3">
            {children}
        </div>
    </div>
);

const AddressBox = ({ title, icon: Icon, quote, type }) => {
    const isFrom = type === 'from';
    const zip = isFrom ? quote.from_zip : quote.to_zip;
    if (!zip) return null;

    const city = isFrom ? quote.from_city : quote.to_city;
    const floor = isFrom ? quote.from_floor : quote.to_floor;
    const lift = isFrom ? quote.from_lift : quote.to_lift;
    const rooms = isFrom ? quote.from_rooms : null;
    const objectType = isFrom ? quote.from_object_type : quote.to_object_type;
    const canton = isFrom ? quote.from_canton : quote.to_canton;
    const countryCode = isFrom ? quote.from_country : quote.to_country;
    
    const country = countries.find(c => c.code === countryCode);

    const isInternational = quote.servicetype === 'Auslandumzug';
    
    return (
        <div>
            <h4 className="font-bold text-md flex items-center gap-2 mb-1">
                {Icon && <Icon className="w-5 h-5 text-blue-600" />}
                {title}:
            </h4>
            <div className="text-sm text-gray-700 pl-7 space-y-0.5">
                <p className="font-semibold">{zip} {city}</p>
                {isInternational && country && <p><span className="font-bold">Land:</span> {country.name}</p>}
                {!isInternational && canton && <p><span className="font-bold">Kanton:</span> {canton}</p>}
                {(floor || lift !== null) && (
                    <p>{[floor, lift !== null ? `Lift: ${lift ? 'Ja' : 'Nein'}` : null].filter(Boolean).join(' / ')}</p>
                )}
                {(rooms || objectType) && (
                    <p>{[rooms, objectType ? objectType.charAt(0).toUpperCase() + objectType.slice(1) : null].filter(Boolean).join(' / ')}</p>
                )}
            </div>
        </div>
    );
};


const RejectionDialog = ({ open, onOpenChange, onConfirm }) => {
  const [reason, setReason] = useState('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Anfrage ablehnen</DialogTitle>
          <DialogDescription>Möchten Sie diese Anfrage wirklich ablehnen? Diese Aktion kann nicht rückgängig gemacht werden.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="reason">Grund (optional)</Label>
          <Textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Geben Sie hier einen Grund an..." />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Abbrechen</Button>
          <Button variant="destructive" onClick={() => onConfirm(reason)}>Ablehnen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const PurchaseConfirmationDialog = ({ open, onOpenChange, onConfirm, quote, hasActiveSubscription }) => {
    if (!quote) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Anfrage kaufen</DialogTitle>
                    <DialogDescription>
                        {hasActiveSubscription 
                            ? 'Dank Ihres Abonnements ist diese Anfrage für Sie kostenlos. Möchten Sie sie jetzt freischalten?'
                            : (quote.original_price && quote.lead_price < quote.original_price
                                ? `Originalpreis: ${quote.original_price.toFixed(2)} CHF → Jetzt nur ${quote.lead_price.toFixed(2)} CHF (-${Math.round((1 - quote.lead_price / quote.original_price) * 100)}%). Möchten Sie fortfahren?`
                                : `Sie sind dabei, diese Anfrage für ${quote.lead_price.toFixed(2)} CHF zu kaufen. Möchten Sie fortfahren?`
                            )
                        }
                    </DialogDescription>
                </DialogHeader>
                <div className="my-4 p-4 bg-gray-50 rounded-md border">
                    <p className="font-semibold">{quote.servicetype}</p>
                    <p className="text-sm text-gray-600">{quote.from_zip} {quote.from_city} {quote.to_zip && `→ ${quote.to_zip}` } {quote.to_city}</p>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Abbrechen</Button>
                    <Button onClick={onConfirm}>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Jetzt kaufen
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


const AvailableQuoteList = ({ quotes, onPurchaseQuote, onQuoteViewed, onRejectQuote, partnerBalance, hasActiveSubscription, insuranceStatus, onInsuranceUploadClick }) => {
  const canPurchaseInsurance = insuranceStatus === 'approved';
  const [openRejectionDialog, setOpenRejectionDialog] = useState(false);
  const [selectedQuoteForRejection, setSelectedQuoteForRejection] = useState(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedQuoteForPurchase, setSelectedQuoteForPurchase] = useState(null);


  const handleRejectClick = (quoteId) => {
    setSelectedQuoteForRejection(quoteId);
    setOpenRejectionDialog(true);
  };

  const confirmRejection = (reason) => {
    onRejectQuote(selectedQuoteForRejection, reason);
    setOpenRejectionDialog(false);
    setSelectedQuoteForRejection(null);
  };

  const handlePurchaseClick = (quote) => {
    setSelectedQuoteForPurchase(quote);
    setIsPurchaseModalOpen(true);
  };

  const confirmPurchase = () => {
    onPurchaseQuote(selectedQuoteForPurchase.id);
    setIsPurchaseModalOpen(false);
    setSelectedQuoteForPurchase(null);
  };

  const handleTriggerClick = useCallback((quote) => {
    if (!quote.is_viewed) {
      onQuoteViewed(quote.id);
    }
  }, [onQuoteViewed]);

  if (!quotes || quotes.length === 0) {
    return (
      <div className="text-center py-10 px-4">
        <Package className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">Keine verfügbaren Anfragen</h3>
        <p className="mt-1 text-sm text-gray-500">Sobald neue Anfragen für Sie verfügbar sind, erscheinen sie hier.</p>
      </div>
    );
  }

  return (
    <>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {quotes.map((quote) => {
          const canAfford = partnerBalance >= quote.lead_price;
          const cardBackgroundColorClass = quote.is_viewed ? 'bg-white' : 'bg-green-50';
          const serviceCategory = getServiceCategory(quote.servicetype);
          const icon = serviceCategory === 'moving' ? Truck : (serviceCategory === 'cleaning' ? Sparkles : Paintbrush);

          return (
            <AccordionItem key={quote.id} value={quote.id} className="border-none">
              <Card className={`overflow-hidden transition-shadow hover:shadow-md ${cardBackgroundColorClass}`}>
                <CardHeader className="p-0">
                  <AccordionTrigger onClick={() => handleTriggerClick(quote)} className="flex items-center justify-between w-full p-4 hover:bg-gray-50 text-left">
                    <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
                      {(() => {
                        const Icon = icon;
                        return (
                          <div className="flex items-center gap-2 font-semibold text-base">
                            <Icon className="w-5 h-5 text-green-600" />
                            <span>{quote.servicetype}</span>
                          </div>
                        );
                      })()}
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{quote.from_zip} {quote.from_city} {quote.to_zip && `→ ${quote.to_zip} ${quote.to_city}`}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(quote.move_date)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {quote.original_price && quote.lead_price < quote.original_price && (
                        <Badge className="bg-red-500 text-white font-bold animate-pulse">
                          -{Math.round((1 - quote.lead_price / quote.original_price) * 100)}%
                        </Badge>
                      )}
                      {!quote.is_viewed && <Badge variant="destructive" className="animate-pulse">Neu</Badge>}
                      <Eye className={`w-5 h-5 ${quote.is_viewed ? 'text-green-500' : 'text-gray-400'}`} />
                    </div>
                  </AccordionTrigger>
                </CardHeader>
                <AccordionContent>
                  <CardContent className="p-4 sm:p-6 border-t bg-gray-50/70">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-6">
                        <DetailSection title="Dienstleistungsdetails" icon={icon}>
                            <QuoteDetail label="Dienstleistung" value={quote.servicetype} />
                            <QuoteDetail label="Wunschtermin" value={formatDate(quote.move_date)} />
                            {quote.move_date_flexible && <QuoteDetail label="Termin flexibel" value={quote.move_date_flexible} />}
                            <EmailConfirmationDetail quote={quote} />
                            {serviceCategory === 'moving' && quote.umzugart !== 'Privatumzug' && <QuoteDetail label="Umzugsart" value={quote.umzugart} />}
                        </DetailSection>

                        {/* Umzug + Reinigung Zusatzinfos nebeneinander */}
                        {(quote.additional_services_furniture_assembly || quote.additional_services_packing || quote.special_transport || quote.additional_services_disposal || quote.cleaning_area_sqm || quote.cleaning_type_guarantee || quote.cleaning_additional_balcony || quote.cleaning_additional_cellar || quote.cleaning_additional_garage) && (
                          <div className={`grid gap-4 ${(quote.additional_services_furniture_assembly || quote.additional_services_packing || quote.special_transport || quote.additional_services_disposal) && (quote.cleaning_area_sqm || quote.cleaning_type_guarantee || quote.cleaning_additional_balcony || quote.cleaning_additional_cellar || quote.cleaning_additional_garage) ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                            {/* Umzug Zusatzleistungen */}
                            {(quote.additional_services_furniture_assembly || quote.additional_services_packing || quote.special_transport || quote.additional_services_disposal) && (
                              <div className="bg-white p-4 rounded-lg border shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                  <Truck className="w-4 h-4 text-blue-600" />
                                  <h4 className="font-semibold text-sm text-gray-800">Umzug – Zusatzleistungen</h4>
                                </div>
                                <div className="space-y-2">
                                  {quote.additional_services_furniture_assembly && <QuoteDetail label="Möbel De-/Montage" value="Ja" />}
                                  {quote.additional_services_packing && <QuoteDetail label="Einpackservice" value="Ja" />}
                                  {quote.special_transport && (
                                    <QuoteDetail label="Spezialtransporte" value={
                                      [quote.special_transport_piano && 'Klavier/Flügel', quote.special_transport_safe && 'Tresor', quote.special_transport_heavy && 'Schwere Möbel/Geräte'].filter(Boolean).join(', ') || 'Ja'
                                    } />
                                  )}
                                  {quote.additional_services_disposal && <QuoteDetail label="Entsorgung" value="Ja" />}
                                </div>
                              </div>
                            )}
                            {/* Reinigung Zusatzinfos */}
                            {(quote.cleaning_area_sqm || quote.cleaning_type_guarantee || quote.cleaning_additional_balcony || quote.cleaning_additional_cellar || quote.cleaning_additional_garage) && (
                              <div className="bg-white p-4 rounded-lg border shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                  <Sparkles className="w-4 h-4 text-teal-600" />
                                  <h4 className="font-semibold text-sm text-gray-800">Reinigung – Details</h4>
                                </div>
                                <div className="space-y-2">
                                  {quote.cleaning_area_sqm && <QuoteDetail label="Wohnungsfläche" value={{
                                    'bis_40': 'bis 40 m²', '40_60': '40 – 60 m²', '60_80': '60 – 80 m²',
                                    '80_100': '80 – 100 m²', '100_120': '100 – 120 m²', '120_140': '120 – 140 m²', 'ueber_140': 'über 140 m²'
                                  }[quote.cleaning_area_sqm] || quote.cleaning_area_sqm} />}
                                  {quote.cleaning_type_guarantee && <QuoteDetail label="Art der Reinigung" value={{
                                    'mit_abnahmegarantie': 'Endreinigung mit Abnahmegarantie', 'ohne_abnahmegarantie': 'Endreinigung ohne Abnahmegarantie', 'umzugsreinigung': 'Umzugsreinigung'
                                  }[quote.cleaning_type_guarantee] || quote.cleaning_type_guarantee} />}
                                  {(quote.cleaning_additional_balcony || quote.cleaning_additional_cellar || quote.cleaning_additional_garage) && (
                                    <QuoteDetail label="Zusatzflächen" value={
                                      [quote.cleaning_additional_balcony && 'Balkon', quote.cleaning_additional_cellar && 'Keller', quote.cleaning_additional_garage && 'Garage'].filter(Boolean).join(', ')
                                    } />
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                         <DetailSection title={serviceCategory === 'moving' ? "Umzugsadressen" : "Objektadresse"} icon={MapPin}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AddressBox title={serviceCategory === 'moving' ? "Von Adresse" : "Adresse"} quote={quote} type="from" />
                                {serviceCategory === 'moving' && quote.to_zip && (
                                    <AddressBox title="Nach Adresse" quote={quote} type="to" />
                                )}
                            </div>
                        </DetailSection>



                        {quote.additional_info && (
                            <DetailSection title="Bemerkungen des Kunden" icon={MessageSquare}>
                                <p className="text-sm text-gray-700 whitespace-pre-wrap md:col-span-2">{quote.additional_info}</p>
                            </DetailSection>
                        )}

                         {(quote.image_urls && quote.image_urls.length > 0) && (
                            <QuoteImages imageUrls={quote.image_urls} />
                        )}
                         {(quote.file_urls && quote.file_urls.length > 0) && (
                            <QuoteFiles fileUrls={quote.file_urls} />
                        )}
                      </div>
                      <div className="lg:col-span-1 space-y-4">
                         <div className={`p-4 rounded-lg text-center ${hasActiveSubscription ? 'bg-green-50 border-green-200' : (canAfford ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200') } border`}>
                            {hasActiveSubscription ? (
                                <>
                                    <h4 className="font-bold text-lg text-green-800">Kostenlos mit Abo</h4>
                                    <Star className="w-8 h-8 mx-auto text-yellow-500 my-2" />
                                    <p className="text-sm text-green-700">Diese Anfrage ist in Ihrem Abonnement enthalten.</p>
                                </>
                            ) : (
                                <>
                                    <h4 className="text-sm font-medium text-gray-600">Preis der Anfrage</h4>
                                    {quote.original_price && quote.lead_price < quote.original_price && (
                                      <div className="flex items-center justify-center gap-2 mb-1">
                                        <span className="text-lg text-gray-400 line-through">{quote.original_price.toFixed(2)} CHF</span>
                                        <span className="text-sm font-bold text-white bg-red-500 px-2 py-0.5 rounded-full">-{Math.round((1 - quote.lead_price / quote.original_price) * 100)}%</span>
                                      </div>
                                    )}
                                    <p className="text-3xl font-bold text-gray-800">{quote.lead_price.toFixed(2)} <span className="text-lg font-normal">CHF</span></p>
                                    {!canAfford && (
                                        <p className="text-xs text-red-600 mt-1">Guthaben nicht ausreichend.</p>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                           <Button 
                                size="lg" 
                                onClick={() => handlePurchaseClick(quote)} 
                                disabled={(!canAfford && !hasActiveSubscription) || !canPurchaseInsurance} 
                                className="w-full"
                            >
                                <CheckCircle className="w-5 h-5 mr-2" /> 
                                Anfrage kaufen
                            </Button>
                            {!canPurchaseInsurance && (
                              <p className="text-xs text-orange-600 text-center">
                                {insuranceStatus === 'in_review' ? (
                                  <>⏳ Versicherung wird geprüft. Käufe nach Freigabe möglich.</>
                                ) : (
                                  <>
                                    ⚠️ Käufe erst nach Versicherungsprüfung möglich.
                                    {onInsuranceUploadClick && (
                                      <button onClick={onInsuranceUploadClick} className="underline ml-1 font-semibold hover:text-orange-800">
                                        Jetzt hochladen
                                      </button>
                                    )}
                                  </>
                                )}
                              </p>
                            )}
                           <Button 
                                variant="destructive" 
                                size="sm" 
                                className="w-full"
                                onClick={() => handleRejectClick(quote.id)}
                            >
                                <Ban className="w-4 h-4 mr-2" /> 
                                Ablehnen
                            </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          );
        })}
      </Accordion>
      <RejectionDialog 
        open={openRejectionDialog} 
        onOpenChange={setOpenRejectionDialog} 
        onConfirm={confirmRejection} 
      />
      <PurchaseConfirmationDialog
        open={isPurchaseModalOpen}
        onOpenChange={setIsPurchaseModalOpen}
        onConfirm={confirmPurchase}
        quote={selectedQuoteForPurchase}
        hasActiveSubscription={hasActiveSubscription}
      />
    </>
  );
};

export default AvailableQuoteList;