import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Phone, Mail, MapPin, CalendarDays, MoveRight, Archive, Building, Truck, Sparkles, Paintbrush, MessageSquare, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate, getServiceTypeLabel } from '@/lib/utils'; // Import formatDate from utils
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

    return (
        <div>
            <h4 className="font-bold text-md flex items-center gap-2 mb-2">
                {title}:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 pl-2">
                {street && <li><span className="font-bold">Strasse:</span> {street}</li>}
                {zip && city && <li><span className="font-bold">Ort:</span> {zip} {city}</li>}
                {isInternational && country && <li><span className="font-bold">Land:</span> {country.name}</li>}
                {!isInternational && canton && <li><span className="font-bold">Kanton:</span> {canton}</li>}
                {floor && <li><span className="font-bold">Stockwerk:</span> {floor}</li>}
                {lift !== null && <li><span className="font-bold">Lift:</span> {lift ? 'Ja' : 'Nein'}</li>}
                {rooms && <li><span className="font-bold">Zimmer:</span> {rooms}</li>}
                {objectType && <li><span className="font-bold">Objektart:</span> {objectType}</li>}
            </ul>
        </div>
    );
};

const PurchasedQuoteList = ({ quotes, onArchiveQuote }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

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

        return (
        <motion.div
          key={quote.purchase_info?.purchase_id || quote.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <AccordionItem value={`item-${index}`} className="border rounded-lg bg-green-50">
            <AccordionTrigger className="p-3 sm:p-4 hover:no-underline rounded-t-lg data-[state=open]:bg-green-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full text-left gap-2">
                <div className="flex-1 space-y-1">
                  <p className="text-base font-bold text-black">{getServiceTypeLabel(quote.servicetype)}</p>
                  <h3 className="text-sm font-semibold text-gray-800">{quote.firstname} {quote.lastname}</h3>
                  {isMoving && (
                    <div className="flex items-center text-xs text-gray-500 font-medium">
                      <span>{quote.from_zip || quote.from_city}</span>
                      {quote.to_city && <MoveRight className="w-3 h-3 mx-1.5" />}
                      {quote.to_city && <span>{quote.to_zip || quote.to_city}</span>}
                    </div>
                  )}
                  <div className="flex items-center text-base font-bold text-gray-900">
                    <CalendarDays className="w-4 h-4 mr-1.5 text-gray-700" /> {quote.move_date ? `${formatDate(quote.move_date)} ${quote.move_date_flexible ? `(flexibel)` : ''}`.trim() : 'N/A'}
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:text-right w-full sm:w-auto self-start sm:self-center">
                  <Badge variant="secondary" className="bg-white w-fit">CHF {quote.purchase_info?.purchase_price.toFixed(2)}</Badge>
                  <p className="text-xs text-gray-500">{formatDate(quote.purchase_info?.purchased_at)}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-3 sm:p-4 border-t border-green-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-3 sm:p-4 bg-white border border-gray-200 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b pb-2 mb-4 uppercase">Kundenkontakt</h3>
                      <ContactItem icon={<User size={16}/>} label="Name" value={`${quote.firstname} ${quote.lastname}`} />
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
                      {isMoving && quote.umzugart !== 'Privatumzug' && <QuoteDetail label="Umzugsart" value={quote.umzugart} />}
                      {isMoving && quote.additional_services_piano && <QuoteDetail label="Klaviertransport" value="Ja" />}
                      {isMoving && (quote.umzugart === 'Privatumzug' || quote.umzugart === 'Auslandumzug') && quote.services_detail1 && quote.services_detail1.includes('Möbel De-/Montage: Ja') && <QuoteDetail label="Möbel De-/Montage" value="Ja" />}
                      {isMoving && <QuoteDetail label="Spezialtransport Art" value={quote.special_transport_type} />}
                      {isMoving && <QuoteDetail label="Details Spezialtransport" value={quote.special_transport_other_details} />}

                      <ServiceDetails details={quote.services_detail1} />
                  </DetailSection>
                </div>

                <div className="space-y-4">
                  <DetailSection title={isMoving ? "Umzugsadressen" : "Objektadresse"} icon={MapPin}>
                      <div className="grid grid-cols-1 gap-4">
                          <AddressBox title={isMoving ? "Von Adresse" : "Adresse"} quote={quote} type="from" />
                          {isMoving && quote.to_zip && (
                              <AddressBox title="Nach Adresse" quote={quote} type="to" />
                          )}
                      </div>
                  </DetailSection>

                  <DetailSection title="Termin & Zusatzinformationen" icon={Calendar}>
                      <QuoteDetail label="Wunschtermin" value={formatDate(quote.move_date)} />
                      <QuoteDetail label="Termin flexibel" value={quote.move_date_flexible} />
                  </DetailSection>

                  {quote.additional_info && (
                      <DetailSection title="Bemerkungen des Kunden" icon={MessageSquare}>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">{quote.additional_info}</p>
                      </DetailSection>
                  )}

                  <div className="flex justify-end pt-2">
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
              </div>
            </AccordionContent>
          </AccordionItem>
        </motion.div>
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
    </div>
  );
};

export default PurchasedQuoteList;