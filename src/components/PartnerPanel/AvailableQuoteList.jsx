import React, { useState, useCallback } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Calendar, Truck, Eye, CheckCircle, Package, Ban, Star, MessageSquare, Sparkles, Paintbrush } from 'lucide-react';
import QuoteImages from './QuoteImages';
import QuoteFiles from './QuoteFiles';
import { countries } from '@/data/countries';
import { getServiceCategory } from '@/lib/serviceCategorizer';
import { QuoteDetail } from '@/components/common/QuoteDetail';
import { formatMoveDateLine, shouldShowUmzugsartDetail, normalizeFloorLabel } from '@/lib/utils';
import { getCleaningAreaSqmLabel } from '@/components/NewCustomerForm/cleaningAreaOptions';

/** Kauf-Limit (Admin) oder Kundenwunsch «Anzahl Offerten» */
function getLeadSlotMeta(quote) {
  const wanted = parseInt(String(quote.quoteswanted ?? ''), 10);
  const quota = parseInt(String(quote.purchase_quota ?? ''), 10);
  const ok = (n) => Number.isFinite(n) && n > 0;
  const totalSlots = ok(quota) ? quota : ok(wanted) ? wanted : 0;
  const displayWanted = ok(wanted) ? wanted : null;
  const purchased = Number(quote.lead_purchase_count) || 0;
  const remaining = Math.max(0, totalSlots - purchased);
  return { displayWanted, totalSlots, purchased, remaining };
}

/** Nur wenn bereits Käufe – volle Liste verschwindet bei ausverkauftem Kontingent ohnehin */
function formatInteressiertZeile(purchased, remaining) {
  if (purchased <= 0 || remaining <= 0) return null;
  const firmaWort = purchased === 1 ? 'Firma' : 'Firmen';
  const platzWort = remaining === 1 ? 'Platz' : 'Plätze';
  return `${purchased} ${firmaWort} interessiert – noch ${remaining} ${platzWort} verfügbar`;
}

const LeadAvailabilityCallout = ({ quote }) => {
  const { displayWanted, totalSlots, purchased, remaining } = getLeadSlotMeta(quote);
  const interessiertText = formatInteressiertZeile(purchased, remaining);

  if (purchased === 0) {
    if (displayWanted == null) return null;
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50/90 dark:border-amber-800 dark:bg-amber-950/40 p-4 text-left shadow-sm">
        <p className="text-sm font-semibold text-amber-950 dark:text-amber-100">
          {displayWanted} Offerten gewünscht
        </p>
      </div>
    );
  }

  if (!interessiertText) return null;

  const headerZahl = displayWanted ?? (totalSlots > 0 ? totalSlots : null);

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50/90 dark:border-amber-800 dark:bg-amber-950/40 p-4 text-left shadow-sm">
      {headerZahl != null && (
        <p className="text-sm font-semibold text-amber-950 dark:text-amber-100">
          {headerZahl} Offerten gewünscht
        </p>
      )}
      <p className={`text-sm text-amber-900 dark:text-amber-200/90 ${headerZahl != null ? 'mt-1' : ''}`}>
        {interessiertText}
      </p>
    </div>
  );
};

const EmailConfirmationDetail = ({ quote }) => {
    const isConfirmed = quote.email_confirmed;
    return (
        <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0 text-sm text-muted-foreground">
            <span className="font-bold text-foreground">E-Mail-Bestätigung:</span>
            <span className={isConfirmed ? 'text-green-700 dark:text-emerald-400 font-semibold' : 'text-red-700 dark:text-red-400 font-semibold'}>
                {isConfirmed ? 'Bestätigt' : 'Noch nicht bestätigt'}
            </span>
        </div>
    );
};


const DetailSection = ({ title, icon: Icon, children }) => (
    <div className="bg-card border-border p-4 rounded-lg border shadow-sm dark:shadow-none dark:ring-1 dark:ring-border/60 text-card-foreground">
        <h3 className="text-[11px] sm:text-xs font-bold text-foreground flex items-center gap-2 border-b border-border pb-2 mb-3 uppercase tracking-wider">
            {Icon && <Icon className="w-3.5 h-3.5 shrink-0 text-green-600 dark:text-emerald-400" />}
            <span className="min-w-0 break-words leading-tight">{title}</span>
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
            <h4 className="font-bold text-md text-foreground flex items-center gap-2 mb-1">
                {Icon && <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                {title}:
            </h4>
            <div className="text-sm text-muted-foreground pl-7 space-y-0.5">
                <p className="font-semibold">{zip} {city}</p>
                {isInternational && country && <p><span className="font-bold">Land:</span> {country.name}</p>}
                {!isInternational && canton && <p><span className="font-bold">Kanton:</span> {canton}</p>}
                {(floor || lift !== null) && (
                    <p>{[normalizeFloorLabel(floor), lift !== null ? `Lift: ${lift ? 'Ja' : 'Nein'}` : null].filter(Boolean).join(' / ')}</p>
                )}
                {(rooms || objectType) && (
                    <p>{[rooms, objectType ? objectType.charAt(0).toUpperCase() + objectType.slice(1) : null].filter(Boolean).join(' / ')}</p>
                )}
            </div>
        </div>
    );
};

const formatWithUnd = (items) => {
  if (!items || items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} und ${items[1]}`;
  return `${items.slice(0, -1).join(', ')} und ${items[items.length - 1]}`;
};

const getMovingExtrasText = (quote) => {
  const selectedSpecialTransports = [
    quote.special_transport_piano && 'Klavier',
    quote.special_transport_safe && 'Tresor',
    quote.special_transport_heavy && 'Flügel',
  ].filter(Boolean);

  const selectedMovingExtras = [
    quote.additional_services_furniture_assembly && 'Möbel-De-/Montage',
    quote.additional_services_packing && 'Einpackservice',
    quote.additional_services_disposal && 'Entsorgung',
    ...(quote.special_transport
      ? selectedSpecialTransports.length > 0
        ? selectedSpecialTransports
        : ['Spezialtransporte']
      : []),
  ].filter(Boolean);

  return formatWithUnd(selectedMovingExtras);
};


const RejectionDialog = ({ open, onOpenChange, onConfirm }) => {
  const [reason, setReason] = useState('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kein Interesse?</DialogTitle>
          <DialogDescription>
            Sie geben damit an, an dieser Anfrage kein Interesse zu haben. Diese Entscheidung können Sie nicht mehr ändern.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label htmlFor="reason">Grund (optional)</Label>
          <Textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Geben Sie hier einen Grund an..." />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Abbrechen</Button>
          <Button variant="destructive" onClick={() => onConfirm(reason)}>Ja, kein Interesse</Button>
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
                    <DialogTitle>Kontakt freischalten</DialogTitle>
                    <DialogDescription>
                        {hasActiveSubscription
                            ? 'Dank Ihres Abonnements ist der Kontakt für Sie kostenlos. Möchten Sie ihn jetzt freischalten?'
                            : `Sie schalten den Kontakt zu diesem Auftrag für ${quote.lead_price.toFixed(2)} CHF frei. Möchten Sie fortfahren?`
                        }
                    </DialogDescription>
                </DialogHeader>
                <div className="my-4 p-4 bg-muted/40 rounded-md border border-border">
                    <p className="font-semibold">{quote.servicetype}</p>
                    <p className="text-sm text-muted-foreground">{quote.from_zip} {quote.from_city} {quote.to_zip && `→ ${quote.to_zip}` } {quote.to_city}</p>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Abbrechen</Button>
                    <Button onClick={onConfirm}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Kontakt freischalten
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
  const [purchasingId, setPurchasingId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);


  const handleRejectClick = (quoteId) => {
    setSelectedQuoteForRejection(quoteId);
    setOpenRejectionDialog(true);
  };

  const confirmRejection = (reason) => {
    const quoteId = selectedQuoteForRejection;
    setOpenRejectionDialog(false);
    setSelectedQuoteForRejection(null);
    if (!quoteId) return;
    setRejectingId(quoteId);
    /** 0.45s = CSS animation cardSlideOutRight */
    setTimeout(() => {
      onRejectQuote(quoteId, reason);
    }, 420);
  };

  const handlePurchaseClick = (quote) => {
    setSelectedQuoteForPurchase(quote);
    setIsPurchaseModalOpen(true);
  };

  const confirmPurchase = () => {
    const quote = selectedQuoteForPurchase;
    setIsPurchaseModalOpen(false);
    setSelectedQuoteForPurchase(null);
    if (!quote) return;
    setPurchasingId(quote.id);
    /** 0.65s = CSS animation cardPurchaseSuccess */
    setTimeout(() => {
      onPurchaseQuote(quote.id);
    }, 600);
  };

  const handleTriggerClick = useCallback((quote) => {
    if (!quote.is_viewed) {
      onQuoteViewed(quote.id);
    }
  }, [onQuoteViewed]);

  if (!quotes || quotes.length === 0) {
    return (
      <div className="text-center py-10 px-4">
        <Package className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-lg font-medium text-foreground">Keine verfügbaren Anfragen</h3>
        <p className="mt-1 text-sm text-muted-foreground">Sobald neue Anfragen für Sie verfügbar sind, erscheinen sie hier.</p>
      </div>
    );
  }

  return (
    <>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {quotes.map((quote, index) => {
          const canAfford = partnerBalance >= quote.lead_price;
          const stripeBg = index % 2 === 0 ? 'bg-muted/35' : 'bg-card';
          const unreadAccent = !quote.is_viewed ? 'border-l-4 border-l-green-500' : '';
          const serviceCategory = getServiceCategory(quote.servicetype);
          const icon = serviceCategory === 'moving' ? Truck : (serviceCategory === 'cleaning' ? Sparkles : Paintbrush);
          const movingExtrasText = getMovingExtrasText(quote);

          const isPurchasing = purchasingId === quote.id;
          const isRejecting = rejectingId === quote.id;
          const exitClass = isPurchasing
            ? 'animate-card-purchase-success'
            : isRejecting
            ? 'animate-card-slide-out-right'
            : '';

          return (
            <AccordionItem key={quote.id} value={quote.id} className={`border-none ${exitClass}`}>
              <Card
                className={`overflow-hidden transition-shadow hover:shadow-md ${stripeBg} ${unreadAccent}`}
              >
                <CardHeader className="p-0">
                  <AccordionTrigger
                    onClick={() => handleTriggerClick(quote)}
                    className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/50 data-[state=open]:bg-muted/40"
                  >
                    <div className="flex-1 min-w-0">
                      {(() => {
                        const Icon = icon;
                        return (
                          <div className="flex items-center gap-2 font-semibold text-[15px] text-foreground">
                            <Icon className="w-4 h-4 shrink-0 text-green-600 dark:text-primary" />
                            <span className="truncate">{quote.servicetype}</span>
                          </div>
                        );
                      })()}
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5 min-w-0">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{quote.from_zip} {quote.from_city}{quote.to_zip && ` → ${quote.to_zip} ${quote.to_city}`}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          <span>{formatMoveDateLine(quote.move_date, quote.move_date_flexible)}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {!quote.is_viewed && <Badge variant="destructive" className="animate-pulse">Neu</Badge>}
                      <Eye className={`w-5 h-5 ${quote.is_viewed ? 'text-green-500 dark:text-primary' : 'text-muted-foreground'}`} />
                    </div>
                  </AccordionTrigger>
                </CardHeader>
                <AccordionContent>
                  <CardContent className="p-4 sm:p-6 border-t border-border bg-muted/25">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <DetailSection title="Dienstleistungsdetails" icon={icon}>
                              <QuoteDetail label="Dienstleistung" value={quote.servicetype} />
                              <QuoteDetail noLabel value={formatMoveDateLine(quote.move_date, quote.move_date_flexible)} />
                              {(quote.cleaning_area_sqm || quote.cleaning_type_guarantee || quote.cleaning_additional_balcony || quote.cleaning_additional_cellar || quote.cleaning_additional_garage) && (
                                <div className="space-y-2 border-t border-border pt-3 mt-2">
                                  {quote.cleaning_area_sqm && (
                                    <QuoteDetail label="Wohnungsfläche" value={getCleaningAreaSqmLabel(quote.cleaning_area_sqm)} />
                                  )}
                                  {quote.cleaning_type_guarantee && (
                                    <QuoteDetail
                                      label="Art der Reinigung"
                                      value={{
                                        mit_abnahmegarantie: 'Endreinigung mit Abnahmegarantie',
                                        ohne_abnahmegarantie: 'Endreinigung ohne Abnahmegarantie',
                                        umzugsreinigung: 'Umzugsreinigung',
                                      }[quote.cleaning_type_guarantee] || quote.cleaning_type_guarantee}
                                    />
                                  )}
                                  {(quote.cleaning_additional_balcony || quote.cleaning_additional_cellar || quote.cleaning_additional_garage) && (
                                    <QuoteDetail
                                      label="Zusatzflächen"
                                      value={[quote.cleaning_additional_balcony && 'Balkon', quote.cleaning_additional_cellar && 'Keller', quote.cleaning_additional_garage && 'Garage'].filter(Boolean).join(', ')}
                                    />
                                  )}
                                </div>
                              )}
                              {serviceCategory === 'moving' && shouldShowUmzugsartDetail(quote.umzugart, quote.servicetype) && (
                                <QuoteDetail label="Umzugsart" value={quote.umzugart} />
                              )}
                          </DetailSection>
                          <DetailSection title={serviceCategory === 'moving' ? 'Umzugsadressen' : 'Objektadresse'} icon={MapPin}>
                              <div className="grid grid-cols-1 gap-4">
                                  <AddressBox title={serviceCategory === 'moving' ? 'Von Adresse' : 'Adresse'} quote={quote} type="from" />
                                  {serviceCategory === 'moving' && quote.to_zip && (
                                      <AddressBox title="Nach Adresse" quote={quote} type="to" />
                                  )}
                              </div>
                          </DetailSection>
                        </div>

                        {/* Umzug – Zusatzleistungen (Reinigungsfelder siehe Dienstleistungsdetails) */}
                        {(quote.additional_services_furniture_assembly || quote.additional_services_packing || quote.special_transport || quote.additional_services_disposal) && (
                          <div className="bg-card border-border p-4 rounded-lg border shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                              <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              <h4 className="font-semibold text-sm text-foreground">Umzug – Zusatzleistungen</h4>
                            </div>
                            <div className="space-y-2">
                              {movingExtrasText && <QuoteDetail label="Umzug inkl." value={movingExtrasText} />}
                            </div>
                          </div>
                        )}

                        {quote.additional_info && (
                            <DetailSection title="Bemerkungen des Kunden" icon={MessageSquare}>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap md:col-span-2">{quote.additional_info}</p>
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
                        <LeadAvailabilityCallout quote={quote} />
                        <div className="rounded-lg border border-border bg-card p-4 text-left shadow-sm">
                          <EmailConfirmationDetail quote={quote} />
                        </div>
                         <div className={`p-3 rounded-lg text-center border ${hasActiveSubscription ? 'bg-green-50/80 border-green-200 dark:bg-emerald-950/35 dark:border-emerald-800' : (canAfford ? 'bg-muted/40 border-border' : 'bg-card border-border') }`}>
                            {hasActiveSubscription ? (
                                <>
                                    <h4 className="font-semibold text-base text-green-800 dark:text-emerald-200">Kostenlos mit Abo</h4>
                                    <Star className="w-6 h-6 mx-auto text-yellow-500 my-1.5" />
                                    <p className="text-sm text-green-700 dark:text-emerald-300/90">Diese Anfrage ist in Ihrem Abonnement enthalten.</p>
                                </>
                            ) : (
                                <>
                                    <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Preis (Kontakt)</h4>
                                    {/* Rabatt bleibt in den Daten; Altpreis + %-Badge nicht anzeigen */}
                                    <p className="mt-1 text-lg font-semibold tabular-nums text-foreground">{quote.lead_price.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">CHF</span></p>
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
                                Kontakt freischalten
                            </Button>
                            {!canPurchaseInsurance && (
                              <p className="text-xs text-orange-600 text-center">
                                {insuranceStatus === 'in_review' ? (
                                  <>⏳ Versicherung wird geprüft. Kontakt-Freischaltung nach Freigabe möglich.</>
                                ) : (
                                  <>
                                    ⚠️ Kontakt-Freischaltung erst nach Versicherungsprüfung möglich.
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
                                variant="outline" 
                                size="sm" 
                                className="w-full border-border text-foreground hover:bg-muted"
                                onClick={() => handleRejectClick(quote.id)}
                            >
                                <Ban className="w-4 h-4 mr-2 opacity-70" /> 
                                Kein Interesse
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