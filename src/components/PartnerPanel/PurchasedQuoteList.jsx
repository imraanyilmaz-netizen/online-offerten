import React, { useState, useMemo } from 'react';
// framer-motion removed - CSS for better INP
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ShoppingCart, User, Phone, Mail, MapPin, CalendarDays, Archive, Building, Truck, Sparkles, Paintbrush, MessageSquare, Calendar, ChevronLeft, ChevronRight, ExternalLink, AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { countries } from '@/data/countries';
import { getServiceCategory } from '@/lib/serviceCategorizer';
import { QuoteDetail } from '@/components/common/QuoteDetail';
import ServiceDetails from '@/components/common/ServiceDetails';

const ContactItem = ({ icon, label, value, subValue, isLink = false, linkType = '' }) => (
    <div className="flex items-start gap-3 py-2 border-b last:border-b-0">
      <div className="mt-1 text-gray-500">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <div className="flex items-center gap-2">
            {isLink && value ? (
              <a href={`${linkType}${value}`} className="text-sm font-medium text-blue-600 hover:underline">{value}</a>
            ) : (
              <p className="text-sm font-medium text-gray-800">{value || 'N/A'}</p>
            )}
            {subValue && <span className="text-xs text-gray-500">({subValue})</span>}
        </div>
      </div>
    </div>
);

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

const AddressBox = ({ title, quote, type }) => {
    const isFrom = type === 'from';
    const street = isFrom ? quote.from_street : quote.to_street;
    const zip = isFrom ? quote.from_zip : quote.to_zip;
    const city = isFrom ? quote.from_city : quote.to_city;
    const floor = isFrom ? quote.from_floor : quote.to_floor;
    const lift = isFrom ? quote.from_lift : quote.to_lift;
    const rooms = isFrom ? quote.from_rooms : null;
    const objectType = isFrom ? quote.from_object_type : quote.to_object_type;
    const canton = isFrom ? quote.from_canton : quote.to_canton;
    const countryCode = isFrom ? quote.from_country : quote.to_country;
    
    const country = countries.find(c => c.code === countryCode);
    const isInternational = quote.servicetype === 'Auslandumzug';
    
    if (!zip && !street) return null;

    const addressLine = [street, [zip, city].filter(Boolean).join(' ')].filter(Boolean).join(', ');
    const mapsUrl = addressLine ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine + ', Schweiz')}` : null;

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-md flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-green-600" />
                {title}
            </h4>
            {mapsUrl ? (
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-green-700 hover:text-green-900 hover:underline inline-flex items-center gap-1">
                    {addressLine}
                    <ExternalLink className="w-3 h-3" />
                </a>
            ) : (
                <p className="text-sm font-semibold text-gray-800">{addressLine}</p>
            )}
            <div className="text-sm text-gray-600 mt-1 space-y-0.5">
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

const PurchasedQuoteList = ({ quotes, onArchiveQuote, onRequestRefund, refundRequests = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refundDialog, setRefundDialog] = useState({ open: false, quote: null });
  const [refundReason, setRefundReason] = useState('');
  const [isSubmittingRefund, setIsSubmittingRefund] = useState(false);
  const itemsPerPage = 20;

  // Create a map of quote_id -> refund request for quick lookup
  const refundRequestMap = useMemo(() => {
    const map = {};
    refundRequests.forEach(req => {
      map[req.quote_id] = req;
    });
    return map;
  }, [refundRequests]);

  const handleOpenRefundDialog = (quote) => {
    setRefundDialog({ open: true, quote });
    setRefundReason('');
  };

  const handleSubmitRefund = async () => {
    if (!refundReason.trim()) return;
    setIsSubmittingRefund(true);
    try {
      await onRequestRefund(
        refundDialog.quote.id,
        refundReason.trim(),
        refundDialog.quote.purchase_info?.purchase_price || refundDialog.quote.lead_price || 0
      );
      setRefundDialog({ open: false, quote: null });
      setRefundReason('');
    } finally {
      setIsSubmittingRefund(false);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(quotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedQuotes = useMemo(() => quotes.slice(startIndex, endIndex), [quotes, startIndex, endIndex]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (quotes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold">Keine gekauften Anfragen</h3>
        <p className="text-sm text-gray-400">Gekaufte Kundenanfragen werden hier angezeigt.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Accordion type="multiple" className="w-full space-y-4">
        {paginatedQuotes.map((quote, index) => {
        const serviceCategory = getServiceCategory(quote.servicetype);
        const icon = serviceCategory === 'moving' ? Truck : (serviceCategory === 'cleaning' ? Sparkles : Paintbrush);
        const isMoving = serviceCategory === 'moving';
        const movingExtrasText = getMovingExtrasText(quote);

        return (
        <div
          key={quote.purchase_info?.purchase_id || quote.id}
        >
          <AccordionItem value={`item-${index}`} className="border rounded-lg bg-green-50">
            <AccordionTrigger className="p-3 sm:p-4 hover:no-underline rounded-t-lg data-[state=open]:bg-green-100">
              <div className="flex items-center justify-between w-full text-left">
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
                    <CalendarDays className="w-4 h-4" />
                    <span>{quote.move_date ? formatDate(quote.move_date) : 'N/A'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  {refundRequestMap[quote.id]?.status === 'approved' && (
                    <Badge className="bg-green-600 text-white text-xs font-semibold">
                      <CheckCircle className="w-3 h-3 mr-1" /> Erstattet
                    </Badge>
                  )}
                  {refundRequestMap[quote.id]?.status === 'pending' && (
                    <Badge className="bg-yellow-500 text-white text-xs font-semibold animate-pulse">
                      <Clock className="w-3 h-3 mr-1" /> Beantragt
                    </Badge>
                  )}
                  {refundRequestMap[quote.id]?.status === 'rejected' && (
                    <Badge className="bg-red-500 text-white text-xs font-semibold">
                      <XCircle className="w-3 h-3 mr-1" /> Abgelehnt
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-white font-bold">CHF {quote.purchase_info?.purchase_price.toFixed(2)}</Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-3 sm:p-4 border-t border-green-200 bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-3 sm:p-4 bg-white border border-gray-200 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b pb-2 mb-4 uppercase">Kundenkontakt</h3>
                      <ContactItem icon={<User size={16}/>} label="Name" value={`${quote.salutation ? quote.salutation + ' ' : ''}${quote.firstname} ${quote.lastname}`} />
                      {(quote.firmenname || quote.company_name) && <ContactItem icon={<Building size={16}/>} label="Firma" value={quote.firmenname || quote.company_name} />}
                      <ContactItem icon={<Phone size={16}/>} label="Telefon" value={quote.phone} />
                      <ContactItem icon={<CalendarDays size={16}/>} label="Telefonische Erreichbarkeit" value={quote.preferredtime} />
                      <ContactItem icon={<Mail size={16}/>} label="E-Mail" value={quote.email} isLink linkType="mailto:" />
                      <div className="flex items-start gap-3 py-2 border-b last:border-b-0">
                        <div className="mt-1 text-gray-500"></div>
                        <div>
                          <p className="text-xs text-gray-500">E-Mail-Bestätigung</p>
                          <p className={`text-sm font-medium ${quote.email_confirmed ? 'text-green-700' : 'text-red-700'}`}>
                            {quote.email_confirmed ? 'Bestätigt' : 'Nicht bestätigt'}
                          </p>
                        </div>
                      </div>
                  </div>
                  
                  <DetailSection title="Dienstleistungsdetails" icon={icon}>
                      <QuoteDetail label="Dienstleistung" value={quote.servicetype} />
                      <QuoteDetail label="Wunschtermin" value={formatDate(quote.move_date)} />
                      {quote.move_date_flexible && <QuoteDetail label="Termin flexibel" value={quote.move_date_flexible} />}
                      {isMoving && quote.umzugart !== 'Privatumzug' && <QuoteDetail label="Umzugsart" value={quote.umzugart} />}
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
                            {movingExtrasText && <QuoteDetail label="Umzug inkl." value={movingExtrasText} />}
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
                </div>

                <div className="space-y-4">
                  <DetailSection title={isMoving ? "Umzugsadressen" : "Objektadresse"} icon={MapPin}>
                      <div className="grid grid-cols-1 gap-4">
                          <AddressBox title={isMoving ? "Auszugsadresse" : "Adresse"} quote={quote} type="from" />
                          {isMoving && quote.to_zip && (
                              <AddressBox title="Einzugsadresse" quote={quote} type="to" />
                          )}
                      </div>
                  </DetailSection>

                </div>
              </div>

              {quote.additional_info && (
                <div className="mt-4">
                  <DetailSection title="Bemerkungen des Kunden" icon={MessageSquare}>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{quote.additional_info}</p>
                  </DetailSection>
                </div>
              )}

              {/* Refund Status & Action Buttons - full width at bottom */}
              <div className="mt-4 space-y-3">
                {refundRequestMap[quote.id] && (
                  <div className={`p-3 rounded-lg border text-sm ${
                    refundRequestMap[quote.id].status === 'approved' 
                      ? 'bg-green-50 border-green-200 text-green-800'
                      : refundRequestMap[quote.id].status === 'rejected'
                      ? 'bg-red-50 border-red-200 text-red-800'
                      : 'bg-yellow-50 border-yellow-200 text-yellow-800'
                  }`}>
                    <div className="flex items-center gap-2 font-semibold">
                      {refundRequestMap[quote.id].status === 'approved' && <CheckCircle className="w-4 h-4" />}
                      {refundRequestMap[quote.id].status === 'rejected' && <XCircle className="w-4 h-4" />}
                      {refundRequestMap[quote.id].status === 'pending' && <Clock className="w-4 h-4" />}
                      {refundRequestMap[quote.id].status === 'approved' 
                        ? 'Guthaben wurde erstattet' 
                        : refundRequestMap[quote.id].status === 'rejected'
                        ? 'Rückerstattung abgelehnt'
                        : 'Rückerstattung beantragt'}
                    </div>
                    <p className="text-xs mt-1 opacity-80">
                      {formatDate(refundRequestMap[quote.id].created_at)}
                      {refundRequestMap[quote.id].status === 'approved' && refundRequestMap[quote.id].resolved_at && 
                        ` • Erstattet am ${formatDate(refundRequestMap[quote.id].resolved_at)}`
                      }
                    </p>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  {!refundRequestMap[quote.id] && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-orange-300 text-orange-700 hover:bg-orange-50 hover:text-orange-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenRefundDialog(quote);
                      }}
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Rückerstattung
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onArchiveQuote(quote.purchase_info.purchase_id);
                    }}
                  >
                    <Archive className="w-4 h-4 mr-2" />
                    Archivieren
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </div>
        );
      })}
      </Accordion>

      {/* Pagination */}
      {quotes.length > itemsPerPage && (
        <div className="border-t border-gray-200 px-4 py-4 bg-gray-50/50 rounded-lg mt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Zeige <span className="font-semibold text-gray-900">{startIndex + 1}</span> bis{' '}
              <span className="font-semibold text-gray-900">
                {Math.min(endIndex, quotes.length)}
              </span>{' '}
              von <span className="font-semibold text-gray-900">{quotes.length}</span> Anfragen
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="font-medium h-9"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Zurück
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    // Show first page, last page, current page, and pages around current
                    if (totalPages <= 7) return true;
                    if (page === 1 || page === totalPages) return true;
                    if (Math.abs(page - currentPage) <= 1) return true;
                    return false;
                  })
                  .map((page, index, array) => {
                    // Add ellipsis if there's a gap
                    const showEllipsisBefore = index > 0 && page - array[index - 1] > 1;
                    return (
                      <React.Fragment key={page}>
                        {showEllipsisBefore && (
                          <span className="px-2 text-gray-400">...</span>
                        )}
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => goToPage(page)}
                          className={`min-w-[40px] font-semibold h-9 ${
                            currentPage === page
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </Button>
                      </React.Fragment>
                    );
                  })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="font-medium h-9"
              >
                Weiter
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Refund Request Dialog */}
      <Dialog open={refundDialog.open} onOpenChange={(open) => { if (!open) { setRefundDialog({ open: false, quote: null }); setRefundReason(''); } }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-orange-700">
              <AlertTriangle className="w-5 h-5" />
              Rückerstattung anfordern
            </DialogTitle>
            <DialogDescription>
              Kunde nicht erreichbar? Beschreiben Sie den Grund für die Rückerstattungsanfrage. 
              Der Betrag von <span className="font-bold">{refundDialog.quote?.purchase_info?.purchase_price?.toFixed(2) || '0.00'} CHF</span> wird nach Prüfung erstattet.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Grund <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                placeholder="z.B. Kunde ist telefonisch und per E-Mail nicht erreichbar, mehrere Versuche unternommen..."
                rows={4}
                className="resize-none"
              />
              {refundReason.length === 0 && (
                <p className="text-xs text-red-500 mt-1">Bitte geben Sie einen Grund an.</p>
              )}
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => { setRefundDialog({ open: false, quote: null }); setRefundReason(''); }}
              disabled={isSubmittingRefund}
            >
              Abbrechen
            </Button>
            <Button 
              onClick={handleSubmitRefund}
              disabled={!refundReason.trim() || isSubmittingRefund}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              {isSubmittingRefund ? 'Wird gesendet...' : 'Anfrage senden'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchasedQuoteList;