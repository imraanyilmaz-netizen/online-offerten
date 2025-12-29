import React, { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, SlidersHorizontal, CheckCircle, Archive, Send } from 'lucide-react';
import QuoteMatcher from '@/components/AdminPanel/QuoteManagement/QuoteMatcher.jsx';
import QuoteDetailView from '@/components/AdminPanel/QuoteManagement/QuoteDetailView.jsx';
import QuoteEditForm from '@/components/AdminPanel/QuoteManagement/QuoteEditForm.jsx';
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
    quotes, allPartners, purchasedQuotesInfo, loading, isProcessing, expandedQuote, dialogState, setDialogState,
    handleSaveMatch, handleSendQuote, openArchiveDialog, handleRestoreQuote,
    handleConfirmDialog, toggleView, handleUpdateQuote
  } = useQuoteManagement();

  const filteredQuotes = useMemo(() => ({
    new_quote: quotes.filter(q => q.status === 'new_quote' || q.status === 'pending'),
    matched: quotes.filter(q => q.status === 'matched'),
    approved: quotes.filter(q => q.status === 'approved' || q.status === 'quota_filled'),
    archived: quotes.filter(q => q.status === 'archived'),
  }), [quotes]);
  
  const renderQuoteList = (list) => {
    if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-10 h-10 animate-spin text-green-600"/></div>;
    if (list.length === 0) return <div className="text-center p-12 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
      <p className="text-lg font-medium">In dieser Kategorie gibt es keine Anfragen zum Anzeigen.</p>
    </div>;
    
    return (
      <div className="space-y-4">
        <AnimatePresence>
          {list.map(quote => {
            const isExpanded = expandedQuote.id === quote.id;
            const expandedView = isExpanded ? expandedQuote.view : null;
            const purchasers = purchasedQuotesInfo[quote.id] || [];

            return (
              <QuoteCard 
                key={quote.id} 
                quote={quote}
                purchasers={purchasers}
                onToggleView={toggleView}
                onSend={handleSendQuote}
                onArchive={openArchiveDialog}
                onRestore={handleRestoreQuote}
                expandedView={expandedView}
                onUpdateQuote={handleUpdateQuote}
                isProcessing={isProcessing}
              >
                <AnimatePresence>
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
                </AnimatePresence>
              </QuoteCard>
            );
          })}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="px-4 md:px-6 pb-6 md:pb-8">
      <header className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 tracking-tight">Anfragen-Management</h1>
        <p className="text-base text-gray-600 leading-relaxed max-w-3xl">Verwalten Sie eingehende Kundenanfragen, weisen Sie Partner zu und versenden Sie die Anfragen.</p>
      </header>
      <Tabs defaultValue="new_quote" className="w-full">
        <div className="overflow-x-auto overflow-y-hidden scrollbar-hide border-b border-gray-200 bg-gradient-to-b from-gray-50/50 to-white mb-6 sticky top-0 z-10">
          <TabsList className="p-2 bg-transparent rounded-lg justify-start sm:justify-start gap-2 min-h-[60px] items-center">
            <TabsTrigger 
              value="new_quote" 
              className="flex items-center gap-2 flex-shrink-0 px-5 py-3 rounded-lg font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-600 data-[state=inactive]:bg-white data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900 border border-gray-200"
            >
                <SlidersHorizontal className="w-4 h-4"/> Neue Anfragen ({filteredQuotes.new_quote.length})
            </TabsTrigger>
            <TabsTrigger 
              value="matched" 
              className="flex items-center gap-2 flex-shrink-0 px-5 py-3 rounded-lg font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-600 data-[state=inactive]:bg-white data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900 border border-gray-200"
            >
                <CheckCircle className="w-4 h-4"/> Zugewiesen ({filteredQuotes.matched.length})
            </TabsTrigger>
            <TabsTrigger 
              value="approved" 
              className="flex items-center gap-2 flex-shrink-0 px-5 py-3 rounded-lg font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-600 data-[state=inactive]:bg-white data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900 border border-gray-200"
            >
                <Send className="w-4 h-4"/> Versendet ({filteredQuotes.approved.length})
            </TabsTrigger>
            <TabsTrigger 
              value="archived" 
              className="flex items-center gap-2 flex-shrink-0 px-5 py-3 rounded-lg font-semibold transition-all duration-200 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-600 data-[state=inactive]:bg-white data-[state=inactive]:hover:bg-gray-100 data-[state=inactive]:hover:text-gray-900 border border-gray-200"
            >
                <Archive className="w-4 h-4"/> Archiv ({filteredQuotes.archived.length})
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="new_quote" className="mt-4">{renderQuoteList(filteredQuotes.new_quote)}</TabsContent>
        <TabsContent value="matched" className="mt-4">{renderQuoteList(filteredQuotes.matched)}</TabsContent>
        <TabsContent value="approved" className="mt-4">{renderQuoteList(filteredQuotes.approved)}</TabsContent>
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