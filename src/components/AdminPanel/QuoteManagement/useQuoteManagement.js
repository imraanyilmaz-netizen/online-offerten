import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

export const useQuoteManagement = () => {
    const [quotes, setQuotes] = useState([]);
    const [allPartners, setAllPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [expandedQuote, setExpandedQuote] = useState({ id: null, view: null });
    const [dialogState, setDialogState] = useState({ open: false, type: null, id: null });
    const [purchasedQuotesInfo, setPurchasedQuotesInfo] = useState({});
    const [rejectedQuotesInfo, setRejectedQuotesInfo] = useState({});
    const [refundRequests, setRefundRequests] = useState([]);
    const debounceTimers = useRef({});

    const { toast } = useToast();
    const { user } = useAuth();

    // Debounce helper
    const debouncedFetch = useCallback((key, fn, delay = 800) => {
        if (debounceTimers.current[key]) {
            clearTimeout(debounceTimers.current[key]);
        }
        debounceTimers.current[key] = setTimeout(() => {
            fn();
        }, delay);
    }, []);

    const fetchQuotes = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('quotes')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            toast({ title: 'Fehler beim Laden der Anfragen', description: error.message, variant: 'destructive' });
        } else {
            setQuotes(data);
        }
        setLoading(false);
    }, [toast]);

    const fetchPartners = useCallback(async () => {
        const { data, error } = await supabase.from('partners').select('*');
        if (error) {
            toast({ title: 'Fehler beim Laden der Partner', description: error.message, variant: 'destructive' });
        } else {
            setAllPartners(data);
        }
    }, [toast]);
    
    const fetchPurchasedQuotesInfo = useCallback(async () => {
        const { data, error } = await supabase
            .from('purchased_quotes')
            .select('quote_id, partners(id, company_name)');

        if (error) {
            toast({ title: 'Fehler beim Laden der gekauften Anfragen', description: error.message, variant: 'destructive' });
            return;
        }

        const info = data.reduce((acc, item) => {
            if (item.quote_id && item.partners) {
                if (!acc[item.quote_id]) {
                    acc[item.quote_id] = [];
                }
                acc[item.quote_id].push(item.partners);
            }
            return acc;
        }, {});
        
        setPurchasedQuotesInfo(info);
    }, [toast]);

    const fetchRejectedQuotesInfo = useCallback(async () => {
        const { data, error } = await supabase
            .from('partner_quote_rejections')
            .select('quote_id, reason, created_at, partner_id, partners(id, company_name)');

        if (error) {
            console.error('Fehler beim Laden der Ablehnungen:', error.message);
            return;
        }

        const info = data.reduce((acc, item) => {
            if (item.quote_id) {
                if (!acc[item.quote_id]) {
                    acc[item.quote_id] = [];
                }
                acc[item.quote_id].push({
                    id: item.partner_id,
                    company_name: item.partners?.company_name || 'Unbekannt',
                    reason: item.reason,
                    created_at: item.created_at,
                });
            }
            return acc;
        }, {});

        setRejectedQuotesInfo(info);
    }, []);

    const fetchRefundRequests = useCallback(async () => {
        const { data, error } = await supabase
            .from('refund_requests')
            .select('*, partners(id, company_name), quotes(id, servicetype, from_city, to_city, lead_price, firstname, lastname)')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Fehler beim Laden der Rückerstattungen:', error.message);
            return;
        }
        setRefundRequests(data || []);
    }, []);

    const handleApproveRefund = useCallback(async (refundRequest) => {
        setIsProcessing(true);
        try {
            // 1. Add refund to partner main_balance (not bonus)
            const { error: creditError } = await supabase.rpc('add_refund_credit', {
                p_partner_id: refundRequest.partner_id,
                p_amount: refundRequest.amount,
                p_description: `Rückerstattung: ${refundRequest.quotes?.servicetype || 'Anfrage'} - ${refundRequest.quotes?.from_city || ''}${refundRequest.quotes?.to_city ? ' → ' + refundRequest.quotes.to_city : ''}`,
                p_admin_id: user?.id,
            });
            if (creditError) throw creditError;

            // 2. Update refund_requests status to approved
            const { error: updateError } = await supabase
                .from('refund_requests')
                .update({ status: 'approved', resolved_at: new Date().toISOString() })
                .eq('id', refundRequest.id);
            if (updateError) throw updateError;

            toast({ title: 'Erfolg', description: `Rückerstattung von ${refundRequest.amount.toFixed(2)} CHF wurde erfolgreich erstattet.` });
            await fetchRefundRequests();
        } catch (error) {
            toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
        } finally {
            setIsProcessing(false);
        }
    }, [user, toast, fetchRefundRequests]);

    const handleRejectRefund = useCallback(async (refundId, adminNote) => {
        setIsProcessing(true);
        try {
            const { error } = await supabase
                .from('refund_requests')
                .update({ status: 'rejected', admin_note: adminNote || null, resolved_at: new Date().toISOString() })
                .eq('id', refundId);
            if (error) throw error;

            toast({ title: 'Erfolg', description: 'Rückerstattung wurde abgelehnt.' });
            await fetchRefundRequests();
        } catch (error) {
            toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
        } finally {
            setIsProcessing(false);
        }
    }, [toast, fetchRefundRequests]);

    useEffect(() => {
        fetchQuotes();
        fetchPartners();
        fetchPurchasedQuotesInfo();
        fetchRejectedQuotesInfo();
        fetchRefundRequests();
    }, [fetchQuotes, fetchPartners, fetchPurchasedQuotesInfo, fetchRejectedQuotesInfo, fetchRefundRequests]);

    // ──── Real-time Subscriptions for Quote Management ────
    useEffect(() => {
        // 1) Quotes tablosu: yeni iş, güncelleme, silme
        const quotesChannel = supabase
            .channel('qm-quotes-realtime')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'quotes' },
                (payload) => {
                    console.log('[Realtime QM] Quotes change:', payload.eventType);
                    if (payload.eventType === 'INSERT') {
                        // Yeni quote geldi → listeye ekle (tam refresh yerine)
                        setQuotes(prev => [payload.new, ...prev]);
                    } else if (payload.eventType === 'UPDATE') {
                        // Quote güncellendi → state'de güncelle
                        setQuotes(prev => prev.map(q => q.id === payload.new.id ? payload.new : q));
                    } else if (payload.eventType === 'DELETE') {
                        // Quote silindi → state'den kaldır
                        setQuotes(prev => prev.filter(q => q.id !== payload.old.id));
                    }
                }
            )
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') console.log('[Realtime QM] ✅ Quotes channel active');
            });

        // 2) Purchased Quotes: partner teklif satın aldığında
        const purchasedChannel = supabase
            .channel('qm-purchased-realtime')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'purchased_quotes' },
                (payload) => {
                    console.log('[Realtime QM] New purchase:', payload.new?.quote_id);
                    toast({
                        title: '💰 Anfrage gekauft!',
                        description: 'Ein Partner hat eine Anfrage erworben.',
                    });
                    debouncedFetch('purchased', () => {
                        fetchPurchasedQuotesInfo();
                        fetchQuotes(); // Quota durumu değişmiş olabilir
                    });
                }
            )
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') console.log('[Realtime QM] ✅ Purchased channel active');
            });

        // 3) Rejections: partner teklifi reddettiğinde
        const rejectionsChannel = supabase
            .channel('qm-rejections-realtime')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'partner_quote_rejections' },
                (payload) => {
                    console.log('[Realtime QM] New rejection:', payload.new?.quote_id);
                    debouncedFetch('rejections', fetchRejectedQuotesInfo);
                }
            )
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') console.log('[Realtime QM] ✅ Rejections channel active');
            });

        // 4) Refund Requests: rückerstellung talebi geldiğinde
        const refundsChannel = supabase
            .channel('qm-refunds-realtime')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'refund_requests' },
                (payload) => {
                    console.log('[Realtime QM] Refund change:', payload.eventType);
                    if (payload.eventType === 'INSERT') {
                        toast({
                            title: '🔄 Neue Rückerstattungsanfrage',
                            description: 'Ein Partner hat eine Rückerstattung beantragt.',
                        });
                    }
                    debouncedFetch('refunds', fetchRefundRequests);
                }
            )
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') console.log('[Realtime QM] ✅ Refunds channel active');
            });

        // Cleanup on unmount
        return () => {
            Object.values(debounceTimers.current).forEach(clearTimeout);
            supabase.removeChannel(quotesChannel);
            supabase.removeChannel(purchasedChannel);
            supabase.removeChannel(rejectionsChannel);
            supabase.removeChannel(refundsChannel);
        };
    }, [fetchQuotes, fetchPurchasedQuotesInfo, fetchRejectedQuotesInfo, fetchRefundRequests, debouncedFetch, toast]);
    
    const toggleView = (quoteId, viewType) => {
        if (expandedQuote.id === quoteId && expandedQuote.view === viewType) {
            setExpandedQuote({ id: null, view: null }); // Close if the same button is clicked
        } else {
            setExpandedQuote({ id: quoteId, view: viewType });
        }
    };
    
    const updateQuoteInState = useCallback((updatedQuote) => {
        setQuotes(prevQuotes => prevQuotes.map(q => q.id === updatedQuote.id ? updatedQuote : q));
        fetchPurchasedQuotesInfo(); // Re-fetch purchase info as quota might have changed
        setExpandedQuote({ id: null, view: null }); // Close any open views
        setIsProcessing(false);
    }, [fetchPurchasedQuotesInfo]);

    const handleUpdateQuote = useCallback(async (quoteId, updateData) => {
        setIsProcessing(true);
        const { data, error } = await supabase
            .from('quotes')
            .update(updateData)
            .eq('id', quoteId)
            .select()
            .single();

        if (error) {
            toast({ title: 'Fehler', description: `Anfrage konnte nicht aktualisiert werden: ${error.message}`, variant: 'destructive' });
            setIsProcessing(false);
            throw error; // re-throw to be caught by caller
        } else {
            toast({ title: 'Erfolg', description: 'Anfrage wurde erfolgreich aktualisiert.' });
            updateQuoteInState(data);
        }
        return data;
    }, [toast, updateQuoteInState]);

    const handleSaveMatch = useCallback(async (quoteId, price, regions, quota, partnerIds) => {
        setIsProcessing(true);
        try {
            const updatePayload = {
                lead_price: price,
                purchase_quota: quota,
                partner_target_regions: regions,
                assigned_partner_ids: partnerIds,
                status: 'matched'
            };
            
            // First, update the quote itself
            await handleUpdateQuote(quoteId, updatePayload);

            // Then, sync the assignments table
            const { error: assignmentError } = await supabase.rpc('assign_quote_to_partners', {
                p_quote_id: quoteId,
                p_partner_ids: partnerIds
            });

            if (assignmentError) throw assignmentError;

            toast({ title: 'Erfolg', description: 'Zuweisung erfolgreich gespeichert und synchronisiert.' });

        } catch (error) {
            toast({ title: 'Fehler bei der Zuweisung', description: error.message, variant: 'destructive' });
        } finally {
            setIsProcessing(false);
        }
    }, [handleUpdateQuote, toast]);

    const handleSendQuote = useCallback(async (quoteId, skipEmail = false) => {
        setIsProcessing(true);
        try {
            const { data, error } = await supabase.functions.invoke('approve_and_notify_partners', {
                body: { quoteId: quoteId, skipEmail: skipEmail },
            });

            if (error) throw error;

            toast({ title: 'Erfolg', description: skipEmail ? 'Anfrage wurde ohne E-Mail an die Partner zugewiesen.' : 'Anfrage wurde an die zugewiesenen Partner versendet.' });
            
            // Re-fetch data to get the latest status
            const { data: updatedQuote, error: fetchError } = await supabase
                .from('quotes')
                .select('*')
                .eq('id', quoteId)
                .single();
            
            if (fetchError) throw fetchError;

            updateQuoteInState(updatedQuote);

        } catch (error) {
            const errorBody = error.context?.body ? await error.context.body.json() : { message: error.message };
            toast({ title: 'Fehler', description: `Fehler beim Versenden: ${errorBody.message || error.message}`, variant: 'destructive' });
            setIsProcessing(false);
        }
    }, [toast, updateQuoteInState]);
    
    const handleArchiveQuote = useCallback(async (quoteId) => {
        await handleUpdateQuote(quoteId, { status: 'archived' });
        setDialogState({ open: false, type: null, id: null });
    }, [handleUpdateQuote]);

    const handleRestoreQuote = useCallback(async (quoteId) => {
        const originalQuote = quotes.find(q => q.id === quoteId);
        // Determine previous status before archive
        const previousStatus = originalQuote?.assigned_partner_ids?.length > 0 && originalQuote?.approved_at ? 'approved' : 
                               originalQuote?.assigned_partner_ids?.length > 0 ? 'matched' : 'pending';

        await handleUpdateQuote(quoteId, { status: previousStatus });
    }, [quotes, handleUpdateQuote]);

    const handleSendToAdditionalPartners = useCallback(async (quoteId, newPartnerIds) => {
        setIsProcessing(true);
        try {
            // 1) Edge Function: Mail senden + assigned_partner_ids aktualisieren
            const { data, error } = await supabase.functions.invoke('send-quote-to-additional-partners', {
                body: { quoteId, partnerIds: newPartnerIds },
            });

            if (error) throw error;

            // 2) quote_assignments Tabelle synchronisieren (damit get_partner_dashboard_data funktioniert)
            // Hole aktuelle assigned_partner_ids (nach Update durch Edge Function)
            const { data: updatedQuote, error: fetchError } = await supabase
                .from('quotes')
                .select('*')
                .eq('id', quoteId)
                .single();

            if (fetchError) throw fetchError;

            const allAssignedIds = updatedQuote.assigned_partner_ids || [];
            const { error: assignmentError } = await supabase.rpc('assign_quote_to_partners', {
                p_quote_id: quoteId,
                p_partner_ids: allAssignedIds
            });

            if (assignmentError) {
                console.warn('quote_assignments sync warning:', assignmentError.message);
            }

            toast({ title: 'Erfolg', description: `Anfrage wurde nachträglich an ${newPartnerIds.length} Partner gesendet.` });
            updateQuoteInState(updatedQuote);

        } catch (error) {
            const errorBody = error.context?.body ? await error.context.body.json().catch(() => ({ message: error.message })) : { message: error.message };
            toast({ title: 'Fehler', description: `Nachsendung fehlgeschlagen: ${errorBody.message || error.message}`, variant: 'destructive' });
            setIsProcessing(false);
        }
    }, [toast, updateQuoteInState]);

    const handleUpdatePurchaseQuotaAfterSend = useCallback(async (quoteId, newQuota) => {
        setIsProcessing(true);
        try {
            const normalizedQuota = Math.max(1, parseInt(newQuota, 10) || 1);
            const quote = quotes.find(q => q.id === quoteId);

            if (!quote) {
                throw new Error('Anfrage nicht gefunden.');
            }

            const purchaserCount = (purchasedQuotesInfo[quoteId] || []).length;
            let nextStatus = quote.status;

            if (purchaserCount >= normalizedQuota) {
                nextStatus = 'quota_filled';
            } else if (quote.status === 'quota_filled') {
                nextStatus = 'approved';
            }

            const { data, error } = await supabase
                .from('quotes')
                .update({
                    purchase_quota: normalizedQuota,
                    status: nextStatus,
                })
                .eq('id', quoteId)
                .select()
                .single();

            if (error) throw error;

            updateQuoteInState(data);

            toast({
                title: 'Erfolg',
                description: `Kauf-Kontingent wurde auf ${normalizedQuota} aktualisiert.`,
            });
        } catch (error) {
            toast({
                title: 'Fehler',
                description: error.message || 'Kauf-Kontingent konnte nicht aktualisiert werden.',
                variant: 'destructive',
            });
            setIsProcessing(false);
        }
    }, [quotes, purchasedQuotesInfo, toast, updateQuoteInState]);

    const handleMarkQuoteSoldOut = useCallback(async (quoteId) => {
        setIsProcessing(true);
        try {
            const quote = quotes.find(q => q.id === quoteId);
            if (!quote) throw new Error('Anfrage nicht gefunden.');

            const assignedIds = quote.assigned_partner_ids || [];

            const { data: purchasedRows, error: purchasedError } = await supabase
                .from('purchased_quotes')
                .select('partner_id')
                .eq('quote_id', quoteId);

            if (purchasedError) throw purchasedError;

            const purchasedIds = new Set((purchasedRows || []).map(r => r.partner_id));
            const nonPurchasedAssigned = assignedIds.filter(pid => !purchasedIds.has(pid));
            let validAssignedIds = assignedIds;

            if (nonPurchasedAssigned.length > 0) {
                // FK hatalarını önlemek için mevcut partner kayıtlarını doğrula.
                const { data: validPartners, error: validPartnersError } = await supabase
                    .from('partners')
                    .select('id')
                    .in('id', assignedIds);

                if (validPartnersError) throw validPartnersError;

                const validPartnerSet = new Set((validPartners || []).map(p => p.id));
                validAssignedIds = assignedIds.filter(pid => validPartnerSet.has(pid));
                const validNonPurchasedAssigned = nonPurchasedAssigned.filter(pid => validPartnerSet.has(pid));

                if (validNonPurchasedAssigned.length > 0) {
                const { data: existingRejections, error: rejectionsError } = await supabase
                    .from('partner_quote_rejections')
                    .select('partner_id')
                    .eq('quote_id', quoteId)
                    .in('partner_id', validNonPurchasedAssigned);

                if (rejectionsError) throw rejectionsError;

                const existingSet = new Set((existingRejections || []).map(r => r.partner_id));
                const rowsToInsert = validNonPurchasedAssigned
                    .filter(pid => !existingSet.has(pid))
                    .map(pid => ({
                        quote_id: quoteId,
                        partner_id: pid,
                        reason: 'Ausverkauft',
                    }));

                if (rowsToInsert.length > 0) {
                    const { error: insertError } = await supabase
                        .from('partner_quote_rejections')
                        .insert(rowsToInsert);

                    if (insertError) throw insertError;
                }
                }
            }

            const { data: updatedQuote, error: updateError } = await supabase
                .from('quotes')
                .update({
                    status: 'quota_filled',
                    // Geçersiz partner ID'lerini de temizleyerek veriyi tutarlı tut.
                    assigned_partner_ids: validAssignedIds,
                })
                .eq('id', quoteId)
                .select('*')
                .single();

            if (updateError) throw updateError;

            updateQuoteInState(updatedQuote);

            toast({
                title: 'Erfolg',
                description: 'Anfrage wurde als Kontingent erfüllt markiert.',
            });
        } catch (error) {
            toast({
                title: 'Fehler',
                description: error.message || 'Ausverkauft konnte nicht gesetzt werden.',
                variant: 'destructive',
            });
            setIsProcessing(false);
        }
    }, [quotes, toast, updateQuoteInState]);

    const openArchiveDialog = (quoteId) => {
        setDialogState({ open: true, type: 'archive', id: quoteId });
    };

    const handleConfirmDialog = () => {
        if (dialogState.type === 'archive' && dialogState.id) {
            handleArchiveQuote(dialogState.id);
        }
    };

    return {
        quotes, allPartners, purchasedQuotesInfo, rejectedQuotesInfo, refundRequests, loading, isProcessing, expandedQuote, dialogState,
        setDialogState, handleSaveMatch, handleSendQuote, handleSendToAdditionalPartners, handleUpdatePurchaseQuotaAfterSend, handleMarkQuoteSoldOut, openArchiveDialog, handleRestoreQuote,
        handleConfirmDialog, toggleView, handleUpdateQuote, handleApproveRefund, handleRejectRefund
    };
};