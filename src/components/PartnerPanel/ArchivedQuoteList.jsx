import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Archive, User, Phone, Mail, MoveRight, Box, FolderArchive as Unarchive, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate, getServiceTypeLabel } from '@/lib/utils'; // Import formatDate from utils

const ContactItem = ({ icon, label, value, isLink = false, linkType = '' }) => (
    <div className="flex items-start gap-3 py-2 border-b last:border-b-0">
      <div className="mt-1 text-gray-500">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        {isLink && value ? (
          <a href={`${linkType}${value}`} className="text-sm font-medium text-blue-600 hover:underline">{value}</a>
        ) : (
          <p className="text-sm font-medium text-gray-800">{value || 'N/A'}</p>
        )}
      </div>
    </div>
);

const isMovingService = (servicetype) => {
  if (!servicetype) return false;
  const lowerCaseService = servicetype.toLowerCase();
  return lowerCaseService.includes('umzug') || lowerCaseService.includes('international') || lowerCaseService.includes('raeumung');
};

const ArchivedQuoteList = ({ quotes, onUnarchiveQuote }) => {
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
        <Box className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold">Keine archivierten Anfragen</h3>
        <p className="text-sm text-gray-400">Hier werden Ihre archivierten Anfragen angezeigt.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Accordion type="multiple" className="w-full space-y-4">
        {paginatedQuotes.map((quote, index) => (
        <motion.div
          key={quote.purchase_info?.purchase_id || quote.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <AccordionItem value={`item-${index}`} className="border rounded-lg bg-gray-50">
            <AccordionTrigger className="p-3 sm:p-4 hover:no-underline rounded-t-lg data-[state=open]:bg-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full text-left gap-2">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-gray-500">{getServiceTypeLabel(quote.servicetype)}</p>
                  <h3 className="text-base font-bold text-gray-800">{quote.firstname} {quote.lastname}</h3>
                  {isMovingService(quote.servicetype) && (
                    <div className="flex items-center text-xs text-gray-500 font-medium">
                      <span>{quote.from_city || quote.from_zip}</span>
                      {quote.to_city && <MoveRight className="w-3 h-3 mx-1.5" />}
                      {quote.to_city && <span>{quote.to_city || quote.to_zip}</span>}
                    </div>
                  )}
                  <div className="text-sm font-semibold text-gray-600">CHF {quote.purchase_info?.purchase_price.toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:text-right w-full sm:w-auto self-start sm:self-center">
                  <Badge variant="outline" className="bg-white w-fit">
                    <Archive className="w-3 h-3 mr-1.5"/>
                    Archiviert
                  </Badge>
                  <p className="text-xs text-gray-500">{formatDate(quote.purchase_info?.purchased_at)}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-3 sm:p-4 border-t border-gray-200">
                <div className="space-y-4">
                    <div className="p-3 sm:p-4 bg-white border border-gray-200 rounded-lg">
                        <h4 className="text-md font-semibold text-gray-700 mb-2">Kundenkontakt</h4>
                        <ContactItem icon={<User size={16}/>} label="Name" value={`${quote.firstname} ${quote.lastname}`} />
                        <ContactItem icon={<Phone size={16}/>} label="Telefon" value={quote.phone} isLink linkType="tel:" />
                        <ContactItem icon={<Mail size={16}/>} label="E-Mail" value={quote.email} isLink linkType="mailto:" />
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                            e.stopPropagation();
                            onUnarchiveQuote(quote.purchase_info.purchase_id);
                            }}
                        >
                            <Unarchive className="w-4 h-4 mr-2" />
                            Dearchivieren
                        </Button>
                    </div>
                </div>
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
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

export default ArchivedQuoteList;