import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Check, X, Star, Trash2, Undo2, Eye, EyeOff, Building, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const StarRating = ({ rating, size = 'w-5 h-5' }) => {
  if (rating === null || rating === undefined) return <span className="text-gray-400 text-sm">N/A</span>;
  
  const totalStars = 5;
  const displayRating = Math.round(rating * 2) / 2;
  const fullStars = Math.floor(displayRating);
  const hasHalfStar = displayRating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className={`${size} text-yellow-400 fill-yellow-400`} />
      ))}
      {hasHalfStar && (
        <div style={{ position: 'relative' }}>
          <Star key="half-empty" className={`${size} text-gray-300`} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
              <Star key="half-full" className={`${size} text-yellow-400 fill-yellow-400`} />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className={`${size} text-gray-300`} />
      ))}
      <span className="ml-2 font-semibold text-gray-700">{rating.toFixed(1)}</span>
    </div>
  );
};

const ReviewCard = ({ review, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [visibilityLoading, setVisibilityLoading] = useState(false);
  const { toast } = useToast();

  const handleUpdateStatus = async (newStatus) => {
    setLoading(true);
    const { error } = await supabase
      .from('customer_reviews')
      .update({ approval_status: newStatus })
      .eq('id', review.id);

    if (error) {
      toast({ title: 'Fehler', description: 'Status konnte nicht aktualisiert werden.', variant: 'destructive' });
    } else {
      toast({ title: 'Erfolg', description: 'Bewertung wurde aktualisiert.' });
      onUpdate();
    }
    setLoading(false);
  };
  
  const handleDelete = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('customer_reviews')
      .delete()
      .eq('id', review.id);

    if (error) {
      toast({ title: 'Fehler', description: 'Bewertung konnte nicht gelöscht werden.', variant: 'destructive' });
      setLoading(false);
    } else {
      toast({ title: 'Erfolg', description: 'Bewertung wurde endgültig gelöscht.' });
      onUpdate();
    }
  };

  const handleToggleHomepageVisibility = async () => {
    setVisibilityLoading(true);
    const newVisibility = !review.show_on_homepage;
    const { error } = await supabase
      .from('customer_reviews')
      .update({ show_on_homepage: newVisibility })
      .eq('id', review.id);

    if (error) {
      toast({ title: 'Fehler', description: 'Sichtbarkeit konnte nicht geändert werden.', variant: 'destructive' });
    } else {
      toast({ title: 'Erfolg', description: `Bewertung ist jetzt auf der Startseite ${newVisibility ? 'sichtbar' : 'versteckt'}.` });
      onUpdate();
    }
    setVisibilityLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const isPlatformReview = review.review_type === 'platform';
  const targetName = isPlatformReview ? 'Online-Offerten.ch' : (review.partners?.company_name || review.partner_name || 'Unbekannte Firma');
  const TargetIcon = isPlatformReview ? Globe : Building;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 bg-gray-50 border-b">
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-md">{review.customer_name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                    <TargetIcon className="w-4 h-4 text-gray-500" />
                    für <strong>{targetName}</strong> am {formatDate(review.review_date)}
                </CardDescription>
            </div>
            <StarRating rating={review.rating} />
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {review.review_text && <p className="text-body italic">"{review.review_text}"</p>}
        
        {!isPlatformReview && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm pt-4 border-t">
              <div className="flex flex-col">
                <span className="text-gray-500">Preiseinhaltung</span>
                <StarRating rating={review.rating_price} size="w-4 h-4"/>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Arbeitsablauf</span>
                <StarRating rating={review.rating_workflow} size="w-4 h-4"/>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Administration</span>
                <StarRating rating={review.rating_administration} size="w-4 h-4"/>
              </div>
            </div>
        )}

        <div className="flex justify-end items-center flex-wrap gap-2 pt-4 border-t mt-4">
            {review.approval_status === 'pending' && (
            <>
                <Button variant="outline" size="sm" onClick={() => handleUpdateStatus('rejected')} disabled={loading}>
                <X className="w-4 h-4 mr-2" /> Ablehnen
                </Button>
                <Button size="sm" onClick={() => handleUpdateStatus('approved')} disabled={loading} className="bg-green-600 hover:bg-green-700">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Check className="w-4 h-4 mr-2" /> Genehmigen</>}
                </Button>
            </>
            )}
            {review.approval_status === 'approved' && (
              <>
                <Button variant="outline" size="sm" onClick={handleToggleHomepageVisibility} disabled={visibilityLoading}>
                  {visibilityLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                    review.show_on_homepage ? <><EyeOff className="w-4 h-4 mr-2" /> Verstecken</> : <><Eye className="w-4 h-4 mr-2" /> Anzeigen</>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleUpdateStatus('pending')} disabled={loading}>
                   <Undo2 className="w-4 h-4 mr-2" /> Rückgängig
                </Button>
              </>
            )}
            {(review.approval_status === 'approved' || review.approval_status === 'rejected') && (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" disabled={loading}>
                        <Trash2 className="w-4 h-4 mr-2" /> Löschen
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Sind Sie absolut sicher?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Diese Aktion kann nicht rückgängig gemacht werden. Dadurch wird die Bewertung dauerhaft gelöscht.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={loading}>
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Löschen'}
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            )}
        </div>
      </CardContent>
    </Card>
  );
};

const ReviewList = ({ status, onRefresh }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10; // Sayfa başına 10 yorum (2 kolon x 5 satır)

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      // Önce toplam sayıyı al
      const { count, error: countError } = await supabase
        .from('customer_reviews')
        .select('*', { count: 'exact', head: true })
        .eq('approval_status', status);

      if (countError) {
        console.error(`Error fetching ${status} reviews count:`, countError);
      } else {
        setTotalCount(count || 0);
      }

      // Sayfalama ile yorumları çek
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const { data, error } = await supabase
        .from('customer_reviews')
        .select(`
          *,
          partners!customer_reviews_partner_id_fkey (
            company_name
          )
        `)
        .eq('approval_status', status)
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        console.error(`Error fetching ${status} reviews:`, error);
      } else {
        setReviews(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, [status, currentPage]);

  const handleUpdate = useCallback(async () => {
    await fetchReviews();
    // Pending count'u güncelle (eğer bir review onaylandı/reddedildiyse)
    if (onRefresh) {
      onRefresh();
    }
  }, [fetchReviews, onRefresh]);

  useEffect(() => {
    setCurrentPage(1); // Status değiştiğinde ilk sayfaya dön
  }, [status]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Sayfa değiştiğinde en üste kaydır
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Sayfa numaralarını hesapla
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  if (reviews.length === 0 && currentPage === 1) return <p className="text-center text-gray-500 p-8">Keine Bewertungen mit Status "{status}" gefunden.</p>;

  return (
    <div className="space-y-6">
      {/* 2 Kolon Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} onUpdate={handleUpdate} />
        ))}
      </div>

      {/* Sayfalama (Pagination) */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Zurück
          </Button>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((pageNum) => (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(pageNum)}
                disabled={loading}
                className="min-w-[40px]"
              >
                {pageNum}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="flex items-center gap-1"
          >
            Weiter
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Sayfa bilgisi */}
      {totalCount > 0 && (
        <p className="text-center text-sm text-gray-500 pt-2">
          Seite {currentPage} von {totalPages} ({totalCount} Bewertungen insgesamt)
        </p>
      )}
    </div>
  );
};

const ReviewManagement = ({ onRefresh }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bewertungsmanagement</CardTitle>
        <CardDescription>Hier können Sie neue Kundenbewertungen genehmigen, ablehnen oder löschen.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Ausstehend</TabsTrigger>
            <TabsTrigger value="approved">Genehmigt</TabsTrigger>
            <TabsTrigger value="rejected">Abgelehnt</TabsTrigger>
          </TabsList>
          <TabsContent value="pending" className="pt-4">
            <ReviewList status="pending" onRefresh={onRefresh} />
          </TabsContent>
          <TabsContent value="approved" className="pt-4">
            <ReviewList status="approved" onRefresh={onRefresh} />
          </TabsContent>
          <TabsContent value="rejected" className="pt-4">
            <ReviewList status="rejected" onRefresh={onRefresh} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReviewManagement;