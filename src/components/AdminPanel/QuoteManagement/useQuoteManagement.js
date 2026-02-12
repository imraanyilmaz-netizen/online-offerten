import { useState, useEffect, useCallback, useMemo } from 'react';
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

    const { toast } = useToast();
    const { user } = useAuth();

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

    const handleSendQuote = useCallback(async (quoteId) => {
        setIsProcessing(true);
        try {
            const { data, error } = await supabase.functions.invoke('approve_and_notify_partners', {
                body: { quoteId: quoteId },
            });

            if (error) throw error;

            toast({ title: 'Erfolg', description: 'Anfrage wurde an die zugewiesenen Partner versendet.' });
            
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
        setDialogState, handleSaveMatch, handleSendQuote, openArchiveDialog, handleRestoreQuote,
        handleConfirmDialog, toggleView, handleUpdateQuote, handleApproveRefund, handleRejectRefund
    };
};