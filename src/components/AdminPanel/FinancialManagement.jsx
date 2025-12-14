import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coins, Search, Filter, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const FinancialManagement = ({ partners }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const partnerMap = useMemo(() => new Map(partners.map(p => [p.id, p.company_name])), [partners]);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('partner_transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast({ title: 'Fehler', description: 'Transaktionshistorie konnte nicht geladen werden.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchTransactions();
    
    const handleUpdate = () => fetchTransactions();
    window.addEventListener('transactions-updated', handleUpdate);
    
    return () => {
      window.removeEventListener('transactions-updated', handleUpdate);
    };
  }, [fetchTransactions]);

  const getTransactionTypeBadge = (type) => {
    switch (type) {
      case 'purchase':
        return <Badge className="bg-red-100 text-red-800 border-red-200 font-semibold">Kauf</Badge>;
      case 'manual_credit':
        return <Badge className="bg-green-100 text-green-800 border-green-200 font-semibold">Manuelle Gutschrift</Badge>;
      case 'top-up':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-semibold">Top-up</Badge>;
      case 'refund':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200 font-semibold">Rückerstattung</Badge>;
      default:
        return <Badge variant="outline" className="font-semibold">{type}</Badge>;
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions
      .map(t => ({ ...t, partner_name: partnerMap.get(t.partner_id) || 'Unbekannter Partner' }))
      .filter(t => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = !searchTerm ||
                             (t.partner_name && t.partner_name.toLowerCase().includes(searchLower)) ||
                             (t.description && t.description.toLowerCase().includes(searchLower));
        const matchesType = typeFilter === 'all' || t.transaction_type === typeFilter;
        return matchesSearch && matchesType;
      });
  }, [transactions, searchTerm, typeFilter, partnerMap]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="px-4 md:px-6 pb-6 md:pb-8 space-y-6">
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="pb-4 border-b border-gray-100">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-green-50 rounded-lg">
                <Coins className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-lg font-bold text-gray-900">Transaktionshistorie filtern</span>
            </div>
            <span className="text-sm font-semibold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
              {filteredTransactions.length} {filteredTransactions.length === 1 ? 'Ergebnis' : 'Ergebnisse'} gefunden
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Nach Partnernamen oder Beschreibung suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-11 text-base border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="w-full md:w-52">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="h-11 border-gray-300 focus:border-green-500 focus:ring-green-500">
                  <Filter className="w-4 h-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="Alle Typen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Typen</SelectItem>
                  <SelectItem value="purchase">Kauf</SelectItem>
                  <SelectItem value="manual_credit">Manuelle Gutschrift</SelectItem>
                  <SelectItem value="top-up">Top-up</SelectItem>
                  <SelectItem value="refund">Rückerstattung</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
             <div className="flex justify-center items-center py-16">
                <Loader2 className="w-10 h-10 animate-spin text-green-600"/>
             </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-gray-50/50 hover:bg-gray-50 border-b-2 border-gray-200">
                    <TableHead className="font-bold text-gray-900 py-4 text-sm">Partner</TableHead>
                    <TableHead className="font-bold text-gray-900 py-4 text-sm">Datum</TableHead>
                    <TableHead className="font-bold text-gray-900 py-4 text-sm">Typ</TableHead>
                    <TableHead className="font-bold text-gray-900 py-4 text-sm">Beschreibung</TableHead>
                    <TableHead className="text-right font-bold text-gray-900 py-4 text-sm">Betrag (CHF)</TableHead>
                    <TableHead className="text-right font-bold text-gray-900 py-4 text-sm">Endsaldo (CHF)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTransactions.length > 0 ? (
                    paginatedTransactions.map((tx, index) => {
                      const isPositive = tx.amount > 0;
                      return (
                        <TableRow 
                          key={tx.id}
                          className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-green-50/30 hover:to-transparent transition-all duration-200"
                        >
                          <TableCell className="font-semibold text-gray-900 py-3.5 whitespace-nowrap">
                            {tx.partner_name}
                          </TableCell>
                          <TableCell className="text-sm text-gray-600 py-3.5 whitespace-nowrap">
                            {formatDate(tx.created_at)}
                          </TableCell>
                          <TableCell className="py-3.5">
                            {getTransactionTypeBadge(tx.transaction_type)}
                          </TableCell>
                          <TableCell className="text-sm text-gray-700 max-w-md py-3.5">
                            <span className="line-clamp-2">{tx.description}</span>
                          </TableCell>
                          <TableCell className={`text-right font-bold py-3.5 whitespace-nowrap text-base ${
                            isPositive ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {isPositive ? `+${Number(tx.amount).toFixed(2)}` : Number(tx.amount).toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right font-semibold text-gray-900 py-3.5 whitespace-nowrap">
                            {Number(tx.balance_after || 0).toFixed(2)}
                        </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-16">
                        <div className="flex flex-col items-center justify-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                            <Coins className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-lg font-semibold text-gray-700 mb-1">Keine Transaktionen gefunden</p>
                          <p className="text-sm text-gray-500">Versuchen Sie, die Filterkriterien zu ändern.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>

        {/* Pagination */}
        {!loading && filteredTransactions.length > itemsPerPage && (
          <div className="border-t border-gray-200 px-4 py-4 bg-gray-50/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Zeige <span className="font-semibold text-gray-900">{startIndex + 1}</span> bis{' '}
                <span className="font-semibold text-gray-900">
                  {Math.min(endIndex, filteredTransactions.length)}
                </span>{' '}
                von <span className="font-semibold text-gray-900">{filteredTransactions.length}</span> Transaktionen
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="font-medium"
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
                            className={`min-w-[40px] font-semibold ${
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
                  className="font-medium"
                >
                  Weiter
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FinancialManagement;