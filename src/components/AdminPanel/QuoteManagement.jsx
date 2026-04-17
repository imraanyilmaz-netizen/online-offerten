import React, { useMemo } from 'react';
// framer-motion removed - CSS for better INP
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, SlidersHorizontal, CheckCircle, Archive, Send, RefreshCw } from 'lucide-react';
import QuoteMatcher from '@/components/AdminPanel/QuoteManagement/QuoteMatcher.jsx';
import QuoteDetailView from '@/components/AdminPanel/QuoteManagement/QuoteDetailView.jsx';
import QuoteEditForm from '@/components/AdminPanel/QuoteManagement/QuoteEditForm.jsx';
import RefundRequestList from '@/components/AdminPanel/QuoteManagement/RefundRequestList.jsx';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useQuoteManagement } from '@/components/AdminPanel/QuoteManagement/useQuoteManagement';
import QuoteCard from './QuoteManagement/QuoteCard';

const QuoteManagement = () => {
  const {
    quotes, allPartners, purchasedQuotesInfo, rejectedQuotesInfo, refundRequests, loading, isProcessing, expandedQuote, dialogState, setDialogState,
    handleSaveMatch, handleSendQuote, handleSendToAdditionalPartners, handleUpdatePurchaseQuotaAfterSend, handleMarkQuoteSoldOut, openArchiveDialog, handleRestoreQuote,
    handleConfirmDialog, toggleView, handleUpdateQuote, handleApproveRefund, handleRejectRefund
  } = useQuoteManagement();

  const pendingRefundCount = useMemo(() => refundRequests.filter(r => r.status === 'pending').length, [refundRequests]);

  const filteredQuotes = useMemo(() => ({
    new_quote: quotes.filter(q => q.status === 'new_quote' || q.status === 'pending'),
    matched: quotes.filter(q => q.status === 'matched'),
    approved: quotes.filter(q => q.status === 'approved' || q.status === 'quota_filled'),
    archived: quotes.filter(q => q.status === 'archived'),
  }), [quotes]);
  
  const renderQuoteList = (list) => {
    if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-10 h-10 animate-spin text-green-600"/></div>;
    if (list.length === 0) return <div className="text-center p-12 text-muted-foreground bg-muted/30 rounded-xl border-2 border-dashed border-border">
      <p className="text-lg font-medium">In dieser Kategorie gibt es keine Anfragen zum Anzeigen.</p>
    </div>;
    
    return (
      <div className="space-y-4">
        
          {list.map(quote => {
            const isExpanded = expandedQuote.id === quote.id;
            const expandedView = isExpanded ? expandedQuote.view : null;
            const purchasers = purchasedQuotesInfo[quote.id] || [];
            const rejections = rejectedQuotesInfo[quote.id] || [];

            return (
              <QuoteCard 
                key={quote.id} 
                quote={quote}
                purchasers={purchasers}
                rejections={rejections}
                allPartners={allPartners}
                onSendToAdditionalPartners={handleSendToAdditionalPartners}
                onUpdatePurchaseQuota={handleUpdatePurchaseQuotaAfterSend}
                onMarkSoldOut={handleMarkQuoteSoldOut}
                onToggleView={toggleView}
                onSend={handleSendQuote}
                onArchive={openArchiveDialog}
                onRestore={handleRestoreQuote}
                expandedView={expandedView}
                onUpdateQuote={handleUpdateQuote}
                isProcessing={isProcessing}
              >
                
                  {expandedView === 'matcher' && (
                    <QuoteMatcher
                      quote={quote}
                      allPartners={allPartners}
                      isProcessing={isProcessing}
                      onSave={handleSaveMatch}
                      onClose={() => toggleView(quote.id, 'matcher')}
                    />
                  )}
                  {expandedView === 'details' && (
                    <QuoteDetailView quote={quote} purchasers={purchasers} />
                  )}
                  {expandedView === 'edit' && (
                    <QuoteEditForm 
                      quote={quote} 
                      onSave={handleUpdateQuote}
                      onCancel={() => toggleView(quote.id, 'edit')}
                      isProcessing={isProcessing}
                    />
                  )}
                
              </QuoteCard>
            );
          })}
        
      </div>
    );
  };

  return (
    <div className="px-4 md:px-6 pb-6 md:pb-8">
      <header className="mb-8 pb-4 border-b border-border">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 tracking-tight">Anfragen-Management</h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">Verwalten Sie eingehende Kundenanfragen, weisen Sie Partner zu und versenden Sie die Anfragen.</p>
      </header>
      <Tabs defaultValue="new_quote" className="w-full">
        <div className="overflow-x-auto overflow-y-hidden scrollbar-hide border-b border-border bg-gradient-to-b from-muted/40 to-background mb-6 sticky top-16 z-20">
          <TabsList className="p-2 bg-transparent rounded-lg justify-start sm:justify-start gap-2 min-h-[60px] items-center">
            <TabsTrigger 
              value="new_quote" 
              className="flex items-center gap-2 flex-shrink-0 px-5 py-3 rounded-lg font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground border border-border dark:data-[state=active]:bg-primary dark:data-[state=active]:hover:bg-primary/90"
            >
                <SlidersHorizontal className="w-4 h-4"/> Neue Anfragen ({filteredQuotes.new_quote.length})
            </TabsTrigger>
            <TabsTrigger 
              value="matched" 
              className="flex items-center gap-2 flex-shrink-0 px-5 py-3 rounded-lg font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground border border-border dark:data-[state=active]:bg-primary dark:data-[state=active]:hover:bg-primary/90"
            >
                <CheckCircle className="w-4 h-4"/> Zugewiesen ({filteredQuotes.matched.length})
            </TabsTrigger>
            <TabsTrigger 
              value="approved" 
              className="flex items-center gap-2 flex-shrink-0 px-5 py-3 rounded-lg font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground border border-border dark:data-[state=active]:bg-primary dark:data-[state=active]:hover:bg-primary/90"
            >
                <Send className="w-4 h-4"/> Versendet ({filteredQuotes.approved.length})
            </TabsTrigger>
            <TabsTrigger 
              value="refunds" 
              className="relative flex items-center gap-2 flex-shrink-0 px-5 py-3 rounded-lg font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground border border-border dark:data-[state=active]:bg-primary dark:data-[state=active]:hover:bg-primary/90"
            >
                <RefreshCw className="w-4 h-4"/> Rückerstattungen ({refundRequests.length})
                {pendingRefundCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white text-xs font-bold shadow-md animate-pulse">
                    {pendingRefundCount}
                  </span>
                )}
            </TabsTrigger>
            <TabsTrigger 
              value="archived" 
              className="flex items-center gap-2 flex-shrink-0 px-5 py-3 rounded-lg font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-card data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground border border-border dark:data-[state=active]:bg-primary dark:data-[state=active]:hover:bg-primary/90"
            >
                <Archive className="w-4 h-4"/> Archiv ({filteredQuotes.archived.length})
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="new_quote" className="mt-4">{renderQuoteList(filteredQuotes.new_quote)}</TabsContent>
        <TabsContent value="matched" className="mt-4">{renderQuoteList(filteredQuotes.matched)}</TabsContent>
        <TabsContent value="approved" className="mt-4">{renderQuoteList(filteredQuotes.approved)}</TabsContent>
        <TabsContent value="refunds" className="mt-4">
          <RefundRequestList 
            refundRequests={refundRequests}
            onApprove={handleApproveRefund}
            onReject={handleRejectRefund}
            isProcessing={isProcessing}
          />
        </TabsContent>
        <TabsContent value="archived" className="mt-4">{renderQuoteList(filteredQuotes.archived)}</TabsContent>
      </Tabs>

       <AlertDialog open={dialogState.open} onOpenChange={(open) => !open && setDialogState({ open: false, type: null, id: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sind Sie sicher?</AlertDialogTitle>
            <AlertDialogDescription>
              Diese Anfrage wird archiviert. Sie kann später wiederhergestellt werden.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDialogState({ open: false, type: null, id: null })}>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDialog}>
              Archivieren
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuoteManagement;