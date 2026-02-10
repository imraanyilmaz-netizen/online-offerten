import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
// framer-motion removed - CSS for better INP
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Loader2, Settings, Send, Edit, SlidersHorizontal, CheckCircle, Clock, Archive } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale/de';
import { Badge } from '@/components/ui/badge';
import QuoteMatcher from '@/components/AdminPanel/QuoteManagement/QuoteMatcher.jsx';
import QuoteDetailModal from './QuoteDetailModal';

const QuoteCard = ({ quote, onToggleMatch, onSend, onOpenDetails, isMatching, children }) => {
  const { from_city, to_city, servicetype, created_at, status, lead_price, assigned_partner_ids } = quote;
  const formattedDate = format(new Date(created_at), "d MMM yyyy, HH:mm", { locale: de });

  const getStatusBadge = () => {
    switch (status) {
      case 'new_quote':
        return <Badge variant="outline" className="border-blue-300 text-blue-700">Yeni Gelen</Badge>;
      case 'matched':
        return <Badge variant="outline" className="border-yellow-400 text-yellow-800 bg-yellow-50">Eşleştirilmiş</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-700">Gönderildi</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div
      layout
      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      <div className="p-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div className="flex-grow">
            <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-800 text-base sm:text-lg">{servicetype}</h3>
                {getStatusBadge()}
            </div>
            <p className="text-sm text-gray-600">
              {from_city} {to_city && `→ ${to_city}`}
            </p>
            <p className="text-xs text-gray-500 mt-1">{formattedDate}</p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-center">
            {status === 'matched' && (
                <>
                    <div className="text-right">
                        <p className="font-bold text-lg text-green-600">{lead_price} CHF</p>
                        <p className="text-xs text-gray-500">{assigned_partner_ids?.length || 0} Partner/Firma</p>
                    </div>
                    <Button size="sm" onClick={() => onSend(quote.id)}><Send className="w-4 h-4 mr-2" /> Gönder</Button>
                </>
            )}
             {(status === 'new_quote' || status === 'matched') && (
                <Button size="sm" variant={isMatching ? "secondary" : "outline"} onClick={() => onToggleMatch(quote.id)}>
                    {status === 'new_quote' ? <Settings className="w-4 h-4 mr-2"/> : <Edit className="w-4 h-4 mr-2"/> }
                    {isMatching ? "Kapat" : (status === 'new_quote' ? "Eşleştir" : "Düzenle")}
                </Button>
            )}
            <Button size="sm" variant="ghost" onClick={() => onOpenDetails(quote)}>Detaylar</Button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

const QuoteManagement = () => {
  const [quotes, setQuotes] = useState([]);
  const [allPartners, setAllPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [matchingQuoteId, setMatchingQuoteId] = useState(null);
  const [detailQuote, setDetailQuote] = useState(null);
  const { toast } = useToast();

  const fetchQuotesAndPartners = useCallback(async () => {
    setLoading(true);
    try {
      const [quotesRes, partnersRes] = await Promise.all([
        supabase.from('quotes').select('*').order('created_at', { ascending: false }),
        supabase.from('partners').select('id, company_name, service_regions, offered_services').eq('status', 'active'),
      ]);

      if (quotesRes.error) throw quotesRes.error;
      if (partnersRes.error) throw partnersRes.error;

      setQuotes(quotesRes.data || []);
      setAllPartners(partnersRes.data || []);
    } catch (error) {
      toast({ title: 'Hata', description: `Veri alınamadı: ${error.message}`, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchQuotesAndPartners();
  }, [fetchQuotesAndPartners]);

  const handleSaveMatch = async (quoteId, price, regions, quota, partnerIds) => {
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from('quotes')
        .update({
          lead_price: price,
          purchase_quota: quota,
          partner_target_regions: regions,
          assigned_partner_ids: partnerIds,
          status: 'matched'
        })
        .eq('id', quoteId);

      if (error) throw error;

      toast({ title: "Başarılı!", description: "Teklif eşleştirildi ve kaydedildi." });
      setMatchingQuoteId(null);
      fetchQuotesAndPartners();
    } catch (error) {
      toast({ title: 'Eşleştirme Hatası', description: error.message, variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendQuote = async (quoteId) => {
    setIsProcessing(true);
     try {
      const { error } = await supabase
        .from('quotes')
        .update({ status: 'approved' })
        .eq('id', quoteId);

      if (error) throw error;
      
      toast({ title: "Başarılı!", description: "Teklif partnerlere gönderildi." });
      fetchQuotesAndPartners();
    } catch (error) {
      toast({ title: 'Gönderme Hatası', description: error.message, variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleMatcher = (quoteId) => {
    setMatchingQuoteId(prevId => (prevId === quoteId ? null : quoteId));
  };
  
  const filteredQuotes = useMemo(() => ({
    new_quote: quotes.filter(q => q.status === 'new_quote'),
    matched: quotes.filter(q => q.status === 'matched'),
    approved: quotes.filter(q => q.status === 'approved'),
  }), [quotes]);
  
  const renderQuoteList = (list) => {
    if (loading) return <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-green-600"/></div>;
    if (list.length === 0) return <div className="text-center p-8 text-gray-500">Bu kategoride gösterilecek teklif bulunmuyor.</div>;
    
    return (
      <div className="space-y-3">
        
          {list.map(quote => (
            <QuoteCard 
              key={quote.id} 
              quote={quote}
              onToggleMatch={toggleMatcher}
              onSend={handleSendQuote}
              onOpenDetails={setDetailQuote}
              isMatching={matchingQuoteId === quote.id}
            >
              
                {matchingQuoteId === quote.id && (
                  <QuoteMatcher
                    quote={quote}
                    allPartners={allPartners}
                    isProcessing={isProcessing}
                    onSave={handleSaveMatch}
                    onClose={() => setMatchingQuoteId(null)}
                  />
                )}
              
            </QuoteCard>
          ))}
        
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-navbar mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Teklif Yönetimi</h1>
          <p className="text-gray-600 mt-1">Gelen müşteri taleplerini yönetin, partnerlerle eşleştirin ve gönderin.</p>
        </header>
        <Tabs defaultValue="new_quote" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-200">
            <TabsTrigger value="new_quote" className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4"/> Yeni Gelenler ({filteredQuotes.new_quote.length})
            </TabsTrigger>
            <TabsTrigger value="matched" className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4"/> Eşleştirilmişler ({filteredQuotes.matched.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-2">
                <Archive className="w-4 h-4"/> Gönderilmişler ({filteredQuotes.approved.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="new_quote" className="mt-4">{renderQuoteList(filteredQuotes.new_quote)}</TabsContent>
          <TabsContent value="matched" className="mt-4">{renderQuoteList(filteredQuotes.matched)}</TabsContent>
          <TabsContent value="approved" className="mt-4">{renderQuoteList(filteredQuotes.approved)}</TabsContent>
        </Tabs>
      </div>
       {detailQuote && (
        <QuoteDetailModal
          quote={detailQuote}
          isOpen={!!detailQuote}
          onClose={() => setDetailQuote(null)}
        />
      )}
    </div>
  );
};

export default QuoteManagement;