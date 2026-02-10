import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Inbox, ArrowDown, ArrowUp, Gift, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TransactionHistory = ({ partnerId, key }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const fetchTransactions = useCallback(async () => {
    if (!partnerId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('partner_transactions')
        .select('*')
        .eq('partner_id', partnerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransactions(data);
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Transaktionsverlauf konnte nicht geladen werden.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [partnerId, toast]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions, key]);

  const getTransactionTypeDetails = (type) => {
    switch (type) {
      case 'top-up':
        return { label: 'Aufladung', icon: <ArrowUp className="h-4 w-4 text-green-500" />, color: 'text-green-600' };
      case 'purchase':
        return { label: 'Anfragekauf', icon: <ArrowDown className="h-4 w-4 text-red-500" />, color: 'text-red-600' };
      case 'manual_credit':
        return { label: 'Bonus-Gutschrift', icon: <Gift className="h-4 w-4 text-blue-500" />, color: 'text-blue-600' };
      case 'purchase_subscription':
        return { label: 'Abo-Anfrage', icon: <Star className="h-4 w-4 text-yellow-500" />, color: 'text-yellow-600' };
      case 'subscription':
        return { label: 'Abo-Kauf', icon: <Star className="h-4 w-4 text-purple-500" />, color: 'text-purple-600' };
      default:
        return { label: type, icon: null, color: 'text-gray-600' };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('de-CH', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Calculate pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-10">
        <Inbox className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Keine Transaktionen</h3>
        <p className="mt-1 text-sm text-gray-500">Bisher wurden keine Transaktionen erfasst.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
            <TableRow className="bg-gradient-to-r from-gray-50 to-gray-50/50 hover:bg-gray-50 border-b-2 border-gray-200">
              <TableHead className="font-bold text-gray-900 py-4 text-sm">Datum</TableHead>
              <TableHead className="font-bold text-gray-900 py-4 text-sm">Typ</TableHead>
              <TableHead className="font-bold text-gray-900 py-4 text-sm">Beschreibung</TableHead>
              <TableHead className="text-right font-bold text-gray-900 py-4 text-sm">Betrag</TableHead>
              <TableHead className="text-right font-bold text-gray-900 py-4 text-sm">Saldo danach</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {paginatedTransactions.map((tx) => {
            const typeDetails = getTransactionTypeDetails(tx.transaction_type);
            const amount = tx.amount || 0;
            return (
                <TableRow 
                  key={tx.id}
                  className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-green-50/30 hover:to-transparent transition-all duration-200"
                >
                  <TableCell className="whitespace-nowrap py-3.5 text-sm text-gray-700">{formatDate(tx.created_at)}</TableCell>
                  <TableCell className="py-3.5">
                    <Badge variant="outline" className="flex items-center gap-1.5 w-fit">
                    {typeDetails.icon}
                    {typeDetails.label}
                  </Badge>
                </TableCell>
                  <TableCell className="py-3.5 text-sm text-gray-700">{tx.description}</TableCell>
                  <TableCell className={`text-right font-semibold py-3.5 text-base ${typeDetails.color}`}>
                   {amount > 0 ? `+${amount.toFixed(2)}` : amount.toFixed(2)} CHF
                </TableCell>
                  <TableCell className="text-right py-3.5 font-semibold text-gray-900">{tx.balance_after?.toFixed(2)} CHF</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      </div>

      {/* Pagination */}
      {transactions.length > itemsPerPage && (
        <div className="border-t border-gray-200 px-4 py-4 bg-gray-50/50 rounded-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Zeige <span className="font-semibold text-gray-900">{startIndex + 1}</span> bis{' '}
              <span className="font-semibold text-gray-900">
                {Math.min(endIndex, transactions.length)}
              </span>{' '}
              von <span className="font-semibold text-gray-900">{transactions.length}</span> Transaktionen
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

export default TransactionHistory;