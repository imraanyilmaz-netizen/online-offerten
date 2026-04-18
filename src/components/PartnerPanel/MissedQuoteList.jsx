import React from 'react';
// framer-motion removed - CSS for better INP
import { Accordion, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Package as PackageIcon, ArrowRight, AlertTriangle, XCircle, Clock, ShoppingCart } from 'lucide-react';
import { formatDate, getServiceTypeLabel } from '@/lib/utils'; // Import formatDate from utils

const MissedQuoteList = ({ quotes }) => {
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
    <Accordion type="multiple" className="w-full space-y-4">
      {quotes.map((quote, index) => {
        const reasonDetails = getReasonDetails(quote.missed_reason);
        return (
          <div
            key={quote.id}
          >
            <AccordionItem value={`item-${index}`} className="border border-border rounded-lg bg-muted/35">
              <AccordionTrigger className="p-3 sm:p-4 hover:no-underline rounded-lg data-[state=open]:bg-muted">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-x-4 gap-y-3 w-full text-left items-center">
                  <div className="sm:col-span-8 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary">{getServiceTypeLabel(quote.servicetype)}</Badge>
                       <Badge variant={reasonDetails.variant} className={`flex items-center ${reasonDetails.className}`}>
                        {reasonDetails.icon}
                        {reasonDetails.text}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground pt-1">
                      <span>{quote.move_date ? formatDate(quote.move_date).split(',')[0] : 'N/A'}</span>
                    </div>
                  </div>

                  <div className="sm:col-span-4 text-sm flex items-center gap-2 flex-wrap sm:justify-end sm:text-right">
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
  );
};

export default MissedQuoteList;