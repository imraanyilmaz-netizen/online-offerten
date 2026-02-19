import Link from 'next/link';
import React, { useState, useRef, useCallback } from 'react';
// framer-motion removed - CSS for better INP
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Send, Edit, Info, Archive, Undo2, ShoppingCart, Users, MapPin, CheckCircle, Pencil, X, Loader2, ExternalLink, Mail, Star, ChevronDown, ChevronUp, Building2, UserPlus, Plus, Search, GripHorizontal } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { format, isAfter, subDays } from 'date-fns';
import { de } from 'date-fns/locale/de';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const QuoteCard = ({ quote, onToggleView, onSend, onArchive, onRestore, expandedView, purchasers = [], rejections = [], children, onUpdateQuote, isProcessing: parentIsProcessing, allPartners = [], onSendToAdditionalPartners }) => {
  const { id, from_city, to_city, servicetype, created_at, status, lead_price, assigned_partner_ids, purchase_quota, partner_target_regions, email_confirmed, email_confirmed_at, move_date, review_email_sent_at, review_email_sent_count } = quote;
  const formattedDate = format(new Date(created_at), "d MMM yyyy, HH:mm", { locale: de });
  const { toast } = useToast();

  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState(lead_price);
  const [isSendingReviewEmail, setIsSendingReviewEmail] = useState(false);
  const [showAssignedPartners, setShowAssignedPartners] = useState(false);
  const [showAddPartner, setShowAddPartner] = useState(false);
  const [selectedNewPartnerIds, setSelectedNewPartnerIds] = useState(new Set());
  const [isSendingAdditional, setIsSendingAdditional] = useState(false);
  const [partnerSearchTerm, setPartnerSearchTerm] = useState('');
  const [listHeight, setListHeight] = useState(192); // default max-h-48 = 192px
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);
  const listRef = useRef(null);

  // Sektör-Label Helper
  const getCategoryLabel = (categories) => {
    if (!categories || categories.length === 0) return null;
    const labelMap = { umzug: 'Umzug', reinigung: 'Reinigung', maler: 'Maler' };
    return categories.map(c => labelMap[c] || c).join(', ');
  };

  // Drag-to-resize Handler
  const handleDragStart = useCallback((e) => {
    e.preventDefault();
    isDragging.current = true;
    startY.current = e.clientY || e.touches?.[0]?.clientY || 0;
    startHeight.current = listHeight;

    const handleDragMove = (ev) => {
      if (!isDragging.current) return;
      const clientY = ev.clientY || ev.touches?.[0]?.clientY || 0;
      const diff = clientY - startY.current;
      const newHeight = Math.max(120, Math.min(600, startHeight.current + diff));
      setListHeight(newHeight);
    };

    const handleDragEnd = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('touchend', handleDragEnd);
    };

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDragMove);
    document.addEventListener('touchend', handleDragEnd);
  }, [listHeight]);

  // Zugewiesene Partner mit Kauf-Status auflösen
  const purchaserIds = new Set(purchasers.map(p => p.id));
  const rejectionIds = new Set(rejections.map(r => r.partner_id || r.id));
  const assignedPartnersResolved = (assigned_partner_ids || []).map(partnerId => {
    const partner = allPartners.find(p => p.id === partnerId);
    const name = partner ? (partner.company_name || partner.name || 'Unbekannt') : 'Unbekannt';
    const hasPurchased = purchaserIds.has(partnerId);
    const hasRejected = rejectionIds.has(partnerId);
    return { id: partnerId, name, hasPurchased, hasRejected };
  });

  // Noch nicht zugewiesene aktive Partner (für Nachsenden)
  const assignedSet = new Set(assigned_partner_ids || []);
  const unassignedPartners = allPartners.filter(p => p.status === 'active' && !assignedSet.has(p.id));

  const handleToggleNewPartner = (partnerId) => {
    setSelectedNewPartnerIds(prev => {
      const next = new Set(prev);
      if (next.has(partnerId)) {
        next.delete(partnerId);
      } else {
        next.add(partnerId);
      }
      return next;
    });
  };

  const handleSendAdditional = async () => {
    if (selectedNewPartnerIds.size === 0 || !onSendToAdditionalPartners) return;
    setIsSendingAdditional(true);
    try {
      await onSendToAdditionalPartners(quote.id, [...selectedNewPartnerIds]);
      setSelectedNewPartnerIds(new Set());
      setShowAddPartner(false);
    } catch (err) {
      // Error handled in parent
    } finally {
      setIsSendingAdditional(false);
    }
  };

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
          <div className="flex flex-col items-end gap-2 self-start sm:self-center">
            {status === 'archived' ? (
               <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => onRestore(quote.id)}>
                    <Undo2 className="w-4 h-4 mr-2" /> Wiederherstellen
                </Button>
                <Button size="sm" variant={isDetailsExpanded ? "secondary" : "ghost"} onClick={() => onToggleView(quote.id, 'details')}>
                  <Info className="w-4 h-4 mr-2"/>
                  {isDetailsExpanded ? "Schliessen" : "Details"}
                </Button>
              </div>
            ) : (
              <>
                {/* Fiyat satırı */}
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
                )}
                {/* Butonlar satırı */}
                <div className="flex items-center gap-2 flex-wrap">
                  {status === 'matched' && (
                    <Button size="sm" onClick={() => onSend(quote.id)} disabled={parentIsProcessing}>
                        {parentIsProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : <Send className="w-4 h-4 mr-2" />} 
                        Senden
                    </Button>
                  )}
                  {(status === 'new_quote' || status === 'pending' || status === 'matched') && (
                      <Button size="sm" variant={isMatcherExpanded ? "secondary" : "outline"} onClick={() => onToggleView(quote.id, 'matcher')}>
                          {status === 'new_quote' || status === 'pending' ? <Settings className="w-4 h-4 mr-2"/> : <Edit className="w-4 h-4 mr-2"/> }
                          {isMatcherExpanded ? "Schliessen" : (status === 'new_quote' || status === 'pending' ? "Zuweisen" : "Zuweisung bearbeiten")}
                      </Button>
                  )}
                  {email_confirmed && (
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/anfrage-status/${id}`} target="_blank">
                      <ExternalLink className="w-4 h-4 mr-2"/>
                      Kundenansicht
                    </Link>
                  </Button>
                  )}
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
                </div>
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
            {/* Zugewiesene Partner - Collapsible mit Kauf-Status */}
            {assigned_partner_ids && assigned_partner_ids.length > 0 && (
            <div>
              <button
                onClick={() => setShowAssignedPartners(!showAssignedPartners)}
                className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3 hover:text-green-700 transition-colors w-full text-left"
              >
                <Send className="w-4 h-4 text-gray-500"/>
                Zugewiesene Partner ({assigned_partner_ids.length})
                <span className="text-xs font-normal text-gray-500 ml-1">
                  — {purchasers.length} gekauft{rejections.length > 0 ? `, ${rejections.length} abgelehnt` : ''}
                </span>
                {showAssignedPartners ? <ChevronUp className="w-4 h-4 ml-auto flex-shrink-0"/> : <ChevronDown className="w-4 h-4 ml-auto flex-shrink-0"/>}
              </button>
              {showAssignedPartners && (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {assignedPartnersResolved.map((p) => (
                      <div 
                        key={p.id} 
                        className={`inline-flex items-center gap-2 border rounded-lg px-3 py-2 text-sm ${
                          p.hasPurchased 
                            ? 'bg-green-50 border-green-200' 
                            : p.hasRejected
                              ? 'bg-red-50 border-red-200'
                              : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        {p.hasPurchased ? (
                          <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0"/>
                        ) : p.hasRejected ? (
                          <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0"/>
                        ) : (
                          <Building2 className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"/>
                        )}
                        <span className="font-medium text-gray-800">{p.name}</span>
                        {p.hasPurchased && <span className="text-xs text-green-600">Gekauft</span>}
                        {p.hasRejected && <span className="text-xs text-red-500">Abgelehnt</span>}
                      </div>
                    ))}
                  </div>

                  {/* Partner nachsenden */}
                  {(status === 'approved' || status === 'quota_filled') && unassignedPartners.length > 0 && (
                    <div className="pt-2 border-t border-gray-100">
                      {!showAddPartner ? (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setShowAddPartner(true)}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <UserPlus className="w-4 h-4 mr-2"/>
                          Partner nachsenden
                        </Button>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                              <UserPlus className="w-3.5 h-3.5"/>
                              Partner auswählen zum Nachsenden
                              <span className="text-gray-400 font-normal">({unassignedPartners.length})</span>
                            </h5>
                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => { setShowAddPartner(false); setSelectedNewPartnerIds(new Set()); setPartnerSearchTerm(''); setListHeight(192); }}>
                              <X className="w-4 h-4"/>
                            </Button>
                          </div>
                          {/* Suche */}
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
                            <Input
                              type="text"
                              placeholder="Partner suchen..."
                              value={partnerSearchTerm}
                              onChange={(e) => setPartnerSearchTerm(e.target.value)}
                              className="pl-9 h-9 text-sm"
                            />
                          </div>
                          <div className="relative">
                            <div 
                              ref={listRef}
                              style={{ maxHeight: `${listHeight}px` }}
                              className="overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-100 transition-[max-height] duration-100"
                            >
                              {unassignedPartners
                                .filter(p => {
                                  if (!partnerSearchTerm.trim()) return true;
                                  const term = partnerSearchTerm.toLowerCase();
                                  const name = (p.company_name || p.name || '').toLowerCase();
                                  const cat = getCategoryLabel(p.main_categories)?.toLowerCase() || '';
                                  return name.includes(term) || cat.includes(term);
                                })
                                .map(p => (
                                <label 
                                  key={p.id} 
                                  className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors ${
                                    selectedNewPartnerIds.has(p.id) ? 'bg-blue-50' : ''
                                  }`}
                                >
                                  <Checkbox
                                    checked={selectedNewPartnerIds.has(p.id)}
                                    onCheckedChange={() => handleToggleNewPartner(p.id)}
                                    className="h-4 w-4"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <span className="text-sm font-medium text-gray-800 block truncate">
                                      {p.company_name || p.name || 'Unbekannt'}
                                    </span>
                                    {p.main_categories && p.main_categories.length > 0 && (
                                      <span className="text-xs text-gray-500 block truncate">
                                        {getCategoryLabel(p.main_categories)}
                                      </span>
                                    )}
                                  </div>
                                </label>
                              ))}
                              {unassignedPartners.filter(p => {
                                if (!partnerSearchTerm.trim()) return true;
                                const term = partnerSearchTerm.toLowerCase();
                                const name = (p.company_name || p.name || '').toLowerCase();
                                const cat = getCategoryLabel(p.main_categories)?.toLowerCase() || '';
                                return name.includes(term) || cat.includes(term);
                              }).length === 0 && (
                                <div className="px-3 py-4 text-center text-sm text-gray-500">
                                  Kein Partner gefunden für &quot;{partnerSearchTerm}&quot;
                                </div>
                              )}
                            </div>
                            {/* Drag handle zum Vergrössern/Verkleinern */}
                            <div
                              onMouseDown={handleDragStart}
                              onTouchStart={handleDragStart}
                              className="flex items-center justify-center py-1 cursor-ns-resize hover:bg-gray-100 border border-t-0 border-gray-200 rounded-b-lg select-none"
                              title="Ziehen zum Vergrössern/Verkleinern"
                            >
                              <GripHorizontal className="w-4 h-4 text-gray-400"/>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              onClick={handleSendAdditional}
                              disabled={selectedNewPartnerIds.size === 0 || isSendingAdditional || parentIsProcessing}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              {isSendingAdditional ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : <Send className="w-4 h-4 mr-2"/>}
                              An {selectedNewPartnerIds.size} Partner senden
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => { setShowAddPartner(false); setSelectedNewPartnerIds(new Set()); }}>
                              Abbrechen
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            )}
            {(status === 'approved' || status === 'quota_filled') && isReviewEmailButtonActive && (
            <div className="md:col-span-2 border-t border-gray-200 pt-5 mt-2">
               <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                 <Star className="w-4 h-4 text-gray-500"/> 
                 Kundenbewertung
               </h4>
                <div className="flex items-center gap-4">
                    <Button 
                        size="sm"
                        onClick={handleSendReviewEmail}
                        disabled={isSendingReviewEmail || reviewSendLimitReached}
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