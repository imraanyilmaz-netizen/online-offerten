import React, { useState, useMemo } from 'react';
import { Accordion, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package as PackageIcon, ArrowRight, XCircle, Clock, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { getServiceTypeLabel } from '@/lib/utils';

const MissedQuoteList = ({ quotes }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      <div className="text-center py-12 text-muted-foreground">
        <PackageIcon className="w-16 h-16 mx-auto text-muted-foreground/40 mb-4" />
        <h3 className="text-lg font-semibold">Keine verpassten Anfragen</h3>
        <p className="text-sm text-muted-foreground/80">Gut gemacht! Sie haben keine Anfragen verpasst.</p>
      </div>
    );
  }

  const isMovingService = (servicetype) => {
    if (!servicetype) return false;
    return servicetype.toLowerCase().includes('umzug') || servicetype.toLowerCase().includes('international') || servicetype.toLowerCase().includes('privatumzug') || servicetype.toLowerCase().includes('geschäftsumzug') || servicetype.toLowerCase().includes('auslandumzug');
  };

  const getReasonDetails = (reason) => {
    const normalizedReason = (reason || '').toLowerCase();

    switch (reason) {
      case 'manual':
        return {
          text: 'Selbst abgelehnt',
          variant: 'destructive',
          className: 'bg-red-500 text-white hover:bg-red-600',
          icon: <XCircle className="w-3 h-3 mr-1.5" />,
        };
      case 'Ausverkauft':
        return {
          text: 'Ausverkauft',
          variant: 'secondary',
          className: 'bg-green-600 text-white hover:bg-green-700',
          icon: <ShoppingCart className="w-3 h-3 mr-1.5" />,
        };
      case 'expired':
      default:
        if (
          normalizedReason === 'ausverkauft' ||
          normalizedReason === 'sold_out' ||
          normalizedReason === 'quota_filled'
        ) {
          return {
            text: 'Ausverkauft',
            variant: 'secondary',
            className: 'bg-green-600 text-white hover:bg-green-700',
            icon: <ShoppingCart className="w-3 h-3 mr-1.5" />,
          };
        }
        return {
          text: 'Abgelaufen',
          variant: 'outline',
          className: '',
          icon: <Clock className="w-3 h-3 mr-1.5" />,
        };
    }
  };

  return (
    <div className="space-y-4">
      <Accordion type="multiple" className="w-full space-y-4">
        {paginatedQuotes.map((quote, index) => {
          const reasonDetails = getReasonDetails(quote.missed_reason);
          return (
            <div
              key={quote.id}
            >
              <AccordionItem value={`item-${index}`} className="border border-border rounded-lg bg-muted/35">
                <AccordionTrigger className="p-3 sm:p-4 hover:no-underline rounded-lg data-[state=open]:bg-muted">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-x-4 gap-y-2 w-full text-left items-center">
                    <div className="sm:col-span-7 flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary">{getServiceTypeLabel(quote.servicetype)}</Badge>
                      <Badge variant={reasonDetails.variant} className={`flex items-center ${reasonDetails.className}`}>
                        {reasonDetails.icon}
                        {reasonDetails.text}
                      </Badge>
                    </div>

                    <div className="sm:col-span-5 text-sm flex items-center gap-2 flex-wrap sm:justify-end sm:text-right">
                      <span className="font-medium text-foreground">{quote.from_zip} {quote.from_city}</span>
                      {isMovingService(quote.servicetype) && quote.to_zip && (
                        <>
                          <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mx-1 sm:mx-2" />
                          <span className="font-medium text-foreground">{quote.to_zip} {quote.to_city}</span>
                        </>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
              </AccordionItem>
            </div>
          );
        })}
      </Accordion>

      {/* Pagination — identisch zu Purchased/Archived für konsistentes UX */}
      {quotes.length > itemsPerPage && (
        <div className="border-t border-border px-4 py-4 bg-muted/30 rounded-lg mt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Zeige <span className="font-semibold text-foreground">{startIndex + 1}</span> bis{' '}
              <span className="font-semibold text-foreground">
                {Math.min(endIndex, quotes.length)}
              </span>{' '}
              von <span className="font-semibold text-foreground">{quotes.length}</span> Anfragen
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
                          <span className="px-2 text-muted-foreground/70">...</span>
                        )}
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => goToPage(page)}
                          className={`min-w-[40px] font-semibold h-9 ${
                            currentPage === page
                              ? "bg-green-600 hover:bg-green-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700"
                              : "hover:bg-muted"
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

export default MissedQuoteList;