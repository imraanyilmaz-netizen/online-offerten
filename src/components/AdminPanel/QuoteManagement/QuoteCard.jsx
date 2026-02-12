import Link from 'next/link';
import React, { useState } from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Send, Edit, Info, Archive, Undo2, ShoppingCart, Users, MapPin, CheckCircle, Pencil, X, Loader2, ExternalLink, Mail, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format, isAfter, subDays } from 'date-fns';
import { de } from 'date-fns/locale/de';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const QuoteCard = ({ quote, onToggleView, onSend, onArchive, onRestore, expandedView, purchasers = [], rejections = [], children, onUpdateQuote, isProcessing: parentIsProcessing }) => {
  const { id, from_city, to_city, servicetype, created_at, status, lead_price, assigned_partner_ids, purchase_quota, partner_target_regions, email_confirmed, email_confirmed_at, move_date, review_email_sent_at, review_email_sent_count } = quote;
  const formattedDate = format(new Date(created_at), "d MMM yyyy, HH:mm", { locale: de });
  const { toast } = useToast();

  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState(lead_price);
  const [isSendingReviewEmail, setIsSendingReviewEmail] = useState(false);

  const handlePriceUpdate = async () => {
    if (parseFloat(newPrice) !== parseFloat(lead_price || 0)) {
      const updateData = { lead_price: parseFloat(newPrice) };
      // İlk fiyat değişikliğinde orijinal fiyatı kaydet
      if (!quote.original_price) {
        updateData.original_price = parseFloat(lead_price);
      }
      await onUpdateQuote(quote.id, updateData);
    }
    setIsEditingPrice(false);
  };

  // İndirim hesaplama
  const discountPercent = quote.original_price && lead_price < quote.original_price
    ? Math.round((1 - lead_price / quote.original_price) * 100)
    : null;
  
  const handleSendReviewEmail = async () => {
    setIsSendingReviewEmail(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-review-email', {
        body: { quoteId: quote.id },
      });

      if (error) throw error;

      toast({
        title: 'Erfolg!',
        description: 'Bewertungs-E-Mail wurde an den Kunden gesendet.',
      });
      // This will trigger a re-fetch in the parent component to get the updated count
      onUpdateQuote(quote.id, { review_email_sent_at: new Date().toISOString() });
    } catch (error) {
       const errorBody = error.context?.body ? await error.context.body.json() : { message: error.message };
      toast({
        title: 'Fehler',
        description: `E-Mail konnte nicht gesendet werden: ${errorBody.message || error.message}`,
        variant: 'destructive',
      });
    } finally {
      setIsSendingReviewEmail(false);
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'new_quote':
      case 'pending':
        return <Badge variant="outline" className="border-blue-300 text-blue-700">Neu</Badge>;
      case 'matched':
        return <Badge variant="outline" className="border-yellow-400 text-yellow-800 bg-yellow-50">Zugewiesen</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-700">Versendet</Badge>;
      case 'archived':
        return <Badge variant="outline" className="bg-gray-100 text-gray-700">Archiviert</Badge>;
      case 'quota_filled':
         return <Badge variant="destructive">Kontingent erfüllt</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  const isReviewEmailButtonActive = move_date && isAfter(new Date(), subDays(new Date(move_date), -1));
  const reviewSendLimitReached = (review_email_sent_count || 0) >= 3;

  const isMatcherExpanded = expandedView === 'matcher';
  const isDetailsExpanded = expandedView === 'details';
  const isEditExpanded = expandedView === 'edit';

  const EmailConfirmationStatus = () => {
    if (email_confirmed && email_confirmed_at) {
      return (
        <div className="flex items-center text-xs text-green-700 mt-2">
          <CheckCircle className="w-4 h-4 mr-1.5 flex-shrink-0" />
          <span className="font-medium">
            Kunde hat die E-Mail bestätigt am {format(new Date(email_confirmed_at), "dd.MM.yyyy HH:mm", { locale: de })}
          </span>
        </div>
      );
    }
    return (
      <div className="flex items-center text-xs text-orange-700 mt-2">
        <X className="w-4 h-4 mr-1.5 flex-shrink-0" />
        <span className="font-medium">Kunde hat die E-Mail noch nicht bestätigt</span>
      </div>
    );
  };
  
  const ReviewEmailStatus = () => {
    if (review_email_sent_at) {
      return (
        <div className="flex items-center text-xs text-green-700">
            <CheckCircle className="w-4 h-4 mr-1.5 flex-shrink-0" />
            Bewertungs-E-Mail gesendet am {format(new Date(review_email_sent_at), 'dd.MM.yy HH:mm')}
        </div>
      );
    }
    if (!move_date) {
        return (
            <div className="text-xs text-gray-500">Kein Umzugsdatum für Bewertung angegeben.</div>
        );
    }
    if (!isReviewEmailButtonActive) {
        return (
            <div className="text-xs text-gray-500">Bewertungslink kann ab {format(new Date(move_date), 'dd.MM.yyyy')} gesendet werden.</div>
        );
    }
    return null;
  };

  return (
    <div
      layout
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
    >
      <div className="p-5 md:p-6">
        <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-5">
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-3">
                <h3 className="font-bold text-gray-900 text-lg sm:text-xl">{servicetype}</h3>
                {getStatusBadge()}
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>{from_city} {to_city && `→ ${to_city}`}</span>
              </p>
              <p className="text-xs text-gray-500">Anfrage am: {formattedDate}</p>
              <div className="pt-1">
                <p className="text-sm font-medium text-gray-800">
                  {quote.firstname} {quote.lastname}
                </p>
                <p className="text-xs text-gray-600">{quote.email}</p>
              </div>
              <EmailConfirmationStatus />
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-center flex-wrap">
            {status === 'archived' ? (
               <>
                <Button size="sm" variant="outline" onClick={() => onRestore(quote.id)}>
                    <Undo2 className="w-4 h-4 mr-2" /> Wiederherstellen
                </Button>
                <Button size="sm" variant={isDetailsExpanded ? "secondary" : "ghost"} onClick={() => onToggleView(quote.id, 'details')}>
                  <Info className="w-4 h-4 mr-2"/>
                  {isDetailsExpanded ? "Schliessen" : "Details"}
                </Button>
              </>
            ) : (
              <>
                {(status === 'approved' || status === 'quota_filled') && (
                    <div className="text-right">
                      {isEditingPrice ? (
                          <div className="flex items-center justify-end gap-1">
                              <Input 
                                  type="number"
                                  value={newPrice || ''}
                                  onChange={(e) => setNewPrice(e.target.value)}
                                  className="h-9 w-24 text-lg font-bold"
                                  autoFocus
                                  onKeyDown={(e) => { if (e.key === 'Enter') handlePriceUpdate(); if (e.key === 'Escape') setIsEditingPrice(false); }}
                              />
                              <Button size="icon" className="h-9 w-9" onClick={handlePriceUpdate} disabled={parentIsProcessing}>
                                  {parentIsProcessing ? <Loader2 className="w-4 h-4 animate-spin"/> : <CheckCircle className="w-5 h-5" />}
                              </Button>
                              <Button size="icon" variant="ghost" className="h-9 w-9" onClick={() => setIsEditingPrice(false)} disabled={parentIsProcessing}>
                                  <X className="w-5 h-5" />
                              </Button>
                          </div>
                      ) : (
                          <div className="group flex items-center justify-end gap-1 cursor-pointer" onClick={() => { setNewPrice(lead_price); setIsEditingPrice(true); }}>
                              <div className="flex items-center gap-2">
                                {discountPercent > 0 && (
                                  <>
                                    <span className="text-sm text-gray-400 line-through">{quote.original_price} CHF</span>
                                    <span className="text-xs font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">-{discountPercent}%</span>
                                  </>
                                )}
                                <p className="font-bold text-lg text-green-600">{lead_price} CHF</p>
                              </div>
                              <Button size="icon" variant="ghost" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Pencil className="w-3.5 h-3.5" />
                              </Button>
                          </div>
                      )}
                      <p className="text-xs text-gray-500 flex items-center justify-end gap-1 mt-0.5">
                        <ShoppingCart className="w-3 h-3"/>
                        {purchasers.length} / {purchase_quota || '∞'} Gekauft
                      </p>
                    </div>
                )}
                {status === 'matched' && (
                    <>
                        <div className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              {discountPercent > 0 && (
                                <>
                                  <span className="text-sm text-gray-400 line-through">{quote.original_price} CHF</span>
                                  <span className="text-xs font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">-{discountPercent}%</span>
                                </>
                              )}
                              <p className="font-bold text-lg text-green-600">{lead_price} CHF</p>
                            </div>
                            <p className="text-xs text-gray-500">{assigned_partner_ids?.length || 0} Partner</p>
                        </div>
                        <Button size="sm" onClick={() => onSend(quote.id)} disabled={parentIsProcessing}>
                            {parentIsProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : <Send className="w-4 h-4 mr-2" />} 
                            Senden
                        </Button>
                    </>
                )}
                {(status === 'new_quote' || status === 'pending' || status === 'matched') && (
                    <Button size="sm" variant={isMatcherExpanded ? "secondary" : "outline"} onClick={() => onToggleView(quote.id, 'matcher')}>
                        {status === 'new_quote' || status === 'pending' ? <Settings className="w-4 h-4 mr-2"/> : <Edit className="w-4 h-4 mr-2"/> }
                        {isMatcherExpanded ? "Schliessen" : (status === 'new_quote' || status === 'pending' ? "Zuweisen" : "Zuweisung bearbeiten")}
                    </Button>
                )}
                <Button asChild size="sm" variant="outline">
                  <Link href={`/anfrage-status/${id}`} target="_blank">
                    <ExternalLink className="w-4 h-4 mr-2"/>
                    Kundenansicht
                  </Link>
                </Button>
                <Button size="sm" variant={isEditExpanded ? "secondary" : "outline"} onClick={() => onToggleView(quote.id, 'edit')}>
                  <Pencil className="w-4 h-4 mr-2"/>
                  {isEditExpanded ? "Schliessen" : "Bearbeiten"}
                </Button>
                <Button size="sm" variant={isDetailsExpanded ? "secondary" : "ghost"} onClick={() => onToggleView(quote.id, 'details')}>
                  <Info className="w-4 h-4 mr-2"/>
                  {isDetailsExpanded ? "Schliessen" : "Details"}
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-500 hover:bg-gray-100" onClick={() => onArchive(quote.id)}>
                    <Archive className="w-4 h-4"/>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
       {(status === 'approved' || status === 'archived' || status === 'quota_filled') && (
        <div className="p-5 md:p-6 border-t border-gray-200 bg-gradient-to-br from-gray-50 to-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500"/> 
                Zielregionen
              </h4>
              <div className="flex flex-wrap gap-2">
                {(partner_target_regions && partner_target_regions.length > 0) ? (
                  partner_target_regions.map(region => (
                    <Badge key={region} variant="secondary" className="bg-green-50 text-green-700 border-green-200 font-medium">
                      {region}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-gray-500">Keine Regionen angegeben.</span>
                )}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500"/> 
                Kaufende Partner ({purchasers.length})
              </h4>
              {purchasers.length > 0 ? (
                <ul className="text-sm text-gray-700 space-y-2">
                  {purchasers.map(p => (
                    <li key={p.id} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0"/>
                      <span className="font-medium">{p.company_name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-500">Noch keine Käufe durch Partner.</p>
              )}
            </div>
            {rejections.length > 0 && (
            <div className="md:col-span-2 border-t border-gray-200 pt-5 mt-2">
              <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <X className="w-4 h-4 text-red-500"/> 
                Ablehnende Partner ({rejections.length})
              </h4>
              <ul className="text-sm text-gray-700 space-y-2">
                {rejections.map((r, idx) => (
                  <li key={r.id || idx} className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg p-3">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5"/>
                    <div>
                      <span className="font-medium text-gray-800">{r.company_name}</span>
                      {r.reason && (
                        <p className="text-xs text-red-600 mt-1">Grund: {r.reason}</p>
                      )}
                      {r.created_at && (
                        <p className="text-xs text-gray-400 mt-0.5">{format(new Date(r.created_at), "dd.MM.yyyy HH:mm", { locale: de })}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            )}
            {(status === 'approved' || status === 'quota_filled') && (
            <div className="md:col-span-2 border-t border-gray-200 pt-5 mt-2">
               <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                 <Star className="w-4 h-4 text-gray-500"/> 
                 Kundenbewertung
               </h4>
                <div className="flex items-center gap-4">
                    <Button 
                        size="sm"
                        onClick={handleSendReviewEmail}
                        disabled={!isReviewEmailButtonActive || isSendingReviewEmail || reviewSendLimitReached}
                    >
                        {isSendingReviewEmail ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : <Mail className="w-4 h-4 mr-2"/>}
                        Bewertungslink senden
                    </Button>
                    <div className="flex flex-col">
                        <ReviewEmailStatus />
                         <span className={`text-xs ${reviewSendLimitReached ? 'text-red-500 font-semibold' : 'text-gray-500'}`}>
                           Gesendet: {review_email_sent_count || 0}/3
                         </span>
                    </div>
                </div>
            </div>
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default QuoteCard;