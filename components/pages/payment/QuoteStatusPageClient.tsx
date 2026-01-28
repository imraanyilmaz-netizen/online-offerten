'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/customSupabaseClient';
import { Loader2, CheckCircle, Send, FileText as FileTextIcon, Package, AlertCircle, Image as ImageIcon, Star, Phone, Mail, Building, Award, MessageSquare, MapPin, Home, ArrowRight, Hash, Calendar, Box, Check, X, Building2, Layers, Forklift as Lift, MessageCircle, User, Paintbrush, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isPast } from 'date-fns';
import { de } from 'date-fns/locale';
import QuoteImages from '@/components/PartnerPanel/QuoteImages';
import QuoteFiles from '@/components/PartnerPanel/QuoteFiles';
import ReviewModal from '@/components/ReviewModal';
import { getGermanServiceName } from '@/lib/dataMapping';
import CleaningDetails from '@/components/common/CleaningDetails';
import PaintingDetails from '@/components/common/PaintingDetails';
import { isCleaningService, isPaintingService, isDisposalService } from '@/lib/serviceCategorizer';

const StatusTimeline = ({ status }: { status: string }) => {
  const steps = [
    { id: 'new_quote', label: 'Anfrage erhalten', icon: <FileTextIcon className="w-5 h-5" />, description: "Wir haben Ihre Anfrage erhalten und prüfen die Details." },
    { id: 'matched', label: 'Offerten werden vorbereitet', icon: <Package className="w-5 h-5" />, description: "Wir leiten Ihre Anfrage an passende, geprüfte Partner weiter." },
    { id: 'approved', label: 'Offerten versendet', icon: <Send className="w-5 h-5" />, description: "Die interessierten Firmen sehen Sie unten." },
  ];

  const getStatusIndex = (currentStatus: string) => {
    if (currentStatus === 'new_quote' || currentStatus === 'pending') return 0;
    if (currentStatus === 'matched') return 1;
    if (currentStatus === 'approved' || currentStatus === 'sold_out' || currentStatus === 'quota_filled') return 2;
    return -1;
  };

  const currentStepIndex = getStatusIndex(status);

  return (
    <div className="relative">
      <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-200" aria-hidden="true"></div>
      <ul className="space-y-8">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <li key={step.id} className="flex items-start">
              <div className="flex-shrink-0 z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-500' : isCurrent ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`}>
                  {isCompleted ? <CheckCircle className="w-5 h-5 text-white" /> : <div className="text-white">{step.icon}</div>}
                </div>
              </div>
              <div className="ml-4">
                <h4 className={`font-semibold ${isCompleted || isCurrent ? 'text-gray-800' : 'text-gray-500'}`}>{step.label}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const StarRating = ({ rating, count }: { rating: number | null | undefined; count?: number }) => {
  if (rating === null || rating === undefined || rating === 0) return null;

  const totalStars = 5;
  const displayRating = Math.round(rating * 2) / 2;
  const fullStars = Math.floor(displayRating);
  const hasHalfStar = displayRating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-bold text-gray-700">{rating.toFixed(1)}</span>
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
        {hasHalfStar && (
          <div style={{ position: 'relative' }}>
            <Star key="half-empty" className="w-4 h-4 text-gray-300" />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
              <Star key="half-full" className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
      {count !== undefined && <span className="text-xs text-gray-500">({count})</span>}
    </div>
  );
};

const PurchasedByCard = ({ partner, isReviewable, onReviewClick }: { partner: any; isReviewable: boolean; onReviewClick: (partner: any) => void }) => {
  if (!partner?.slug) return null;
  
  const getBadgeClass = (status: string) => {
    switch (status) {
      case 'gold': return 'bg-yellow-400 text-yellow-900 border-yellow-500';
      case 'platinum': return 'bg-gray-400 text-gray-900 border-gray-500';
      default: return 'hidden';
    }
  };

  const partnerHref = `/partner/${partner.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md border overflow-hidden flex flex-col"
    >
      <div className="p-4 flex-grow">
        <div className="flex items-start gap-4">
          <Link href={partnerHref} className="flex-shrink-0">
            <img
              src={partner.logo_url || '/image/logo-icon.avif'}
              alt={`Firmenlogo von ${partner.company_name}`}
              className="w-20 h-20 rounded-md object-contain border bg-gray-50"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/image/logo-icon.avif';
              }}
            />
          </Link>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <Link href={partnerHref} className="hover:underline">
                <h3 className="font-bold text-lg text-gray-800">{partner.company_name}</h3>
              </Link>
              {partner.status && (partner.status === 'gold' || partner.status === 'platinum') &&
                <Badge variant="outline" className={`capitalize flex items-center gap-1 text-xs ${getBadgeClass(partner.status)}`}>
                  <Award className="w-3 h-3" />
                  {partner.status}
                </Badge>
              }
            </div>
            <div className="mt-1">
              <StarRating rating={partner.average_rating} count={partner.review_count} />
            </div>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              {partner.phone &&
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a href={`tel:${partner.phone}`} className="hover:text-blue-600">{partner.phone}</a>
                </div>
              }
              {partner.email &&
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a href={`mailto:${partner.email}`} className="hover:text-blue-600">{partner.email}</a>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-3 mt-auto">
        <Button
          className="w-full"
          variant="outline"
          disabled={!isReviewable}
          onClick={() => onReviewClick(partner)}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Bewertung abgeben
        </Button>
      </div>
    </motion.div>
  );
};


const AddressCard = ({ title, icon, street, zip, city, floor, lift, rooms }: { title: string; icon: any; street?: string; zip?: string; city?: string; floor?: number; lift?: boolean | null; rooms?: number }) => {
    if (!zip && !city && !street) {
        return null;
    }
    return (
        <div className="border-t pt-4">
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-gray-400 w-5 h-5">{icon}</div>
                <div className="flex-grow">
                    <p className="text-sm text-gray-500">{title}</p>
                    <div className="font-medium text-gray-800 text-sm mt-1 space-y-0.5">
                        {street && <div>{street}</div>}
                        {(zip || city) && <div>{`${zip || ''} ${city || ''}`}</div>}
                        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-gray-600">
                            {floor && <span className="flex items-center gap-1"><Layers className="w-3 h-3"/> Etage: {floor}</span>}
                            {lift !== null && <span className="flex items-center gap-1"><Lift className="w-3 h-3"/> Lift: {lift ? <Check className="w-4 h-4 text-green-600"/> : <X className="w-4 h-4 text-red-600"/>}</span>}
                            {rooms && <span className="flex items-center gap-1"><Building2 className="w-3 h-3"/> Zimmer: {rooms}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const QuoteDetails = ({ quote }: { quote: any }) => {
    let services = [getGermanServiceName(quote.servicetype)];
    if (quote.additional_cleaning && !services.some(s => s.toLowerCase().includes('reinigung'))) {
        services.push(getGermanServiceName('cleaning'));
    }
    const combinedServices = services.join(' und ');

    const mainCategory = quote.main_category || 'umzug'; // Default to 'umzug'
    const serviceType = (quote.servicetype || '').toLowerCase();
    
    const getDynamicLabels = () => {
      const cleaningService = isCleaningService(serviceType);
      const paintingService = isPaintingService(serviceType);
      const disposalService = isDisposalService(serviceType);

      if (cleaningService) {
        return {
          dateLabel: 'Wunschdatum für die Reinigung',
          fromLocationLabel: 'Dienstleistungsadresse',
          toLocationLabel: null,
          fromLocationIcon: <Sparkles />,
        };
      }
      if (paintingService) {
        return {
          dateLabel: 'Ausführungsdatum',
          fromLocationLabel: 'Objektadresse',
          toLocationLabel: null,
          fromLocationIcon: <Paintbrush />,
        };
      }
      if (false) {
        return {
          dateLabel: 'Ausführungsdatum',
          fromLocationLabel: 'Objektadresse',
          toLocationLabel: null,
          fromLocationIcon: <Sparkles />,
        };
      }
      if (disposalService) {
        return {
          dateLabel: 'Entsorgungsdatum',
          fromLocationLabel: 'Entsorgungsadresse',
          toLocationLabel: null,
          fromLocationIcon: <Box />,
        };
      }
      // Default to 'umzug'
      return {
        dateLabel: 'Umzugsdatum',
        fromLocationLabel: 'Auszugsort',
        toLocationLabel: 'Einzugsort',
        fromLocationIcon: <Home />,
        toLocationIcon: <MapPin />,
      };
    };

    const labels = getDynamicLabels();
    
    return (
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg border">
             <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-gray-400 w-5 h-5"><FileTextIcon /></div>
                <div className="flex-grow">
                    <p className="text-sm text-gray-500">Dienstleistung</p>
                    <div className="font-medium text-gray-800 text-sm">{combinedServices}</div>
                </div>
            </div>
            
            {isCleaningService(quote.servicetype) && quote.reinigung_details && <div className="border-t pt-4"><CleaningDetails details={quote.reinigung_details} /></div>}
            {isPaintingService(quote.servicetype) && quote.reinigung_details && <div className="border-t pt-4"><PaintingDetails details={quote.reinigung_details} /></div>}

             <div className="border-t pt-4 flex items-start gap-3">
                <div className="flex-shrink-0 text-gray-400 w-5 h-5"><Calendar /></div>
                <div className="flex-grow">
                    <p className="text-sm text-gray-500">Erstellt am</p>
                    <div className="font-medium text-gray-800 text-sm">{format(new Date(quote.created_at), 'dd.MM.yyyy HH:mm', { locale: de })}</div>
                </div>
            </div>
            
            <AddressCard 
                title={labels.fromLocationLabel}
                icon={labels.fromLocationIcon}
                street={quote.from_street}
                zip={quote.from_zip}
                city={quote.from_city}
                floor={quote.from_floor}
                lift={quote.from_lift}
                rooms={quote.from_rooms}
            />

            {labels.toLocationLabel && (
                <AddressCard 
                    title={labels.toLocationLabel}
                    icon={labels.toLocationIcon}
                    street={quote.to_street}
                    zip={quote.to_zip}
                    city={quote.to_city}
                    floor={quote.to_floor}
                    lift={quote.to_lift}
                />
            )}
            
            {quote.move_date && (
                 <div className="border-t pt-4 flex items-start gap-3">
                    <div className="flex-shrink-0 text-gray-400 w-5 h-5"><Calendar /></div>
                    <div className="flex-grow">
                        <p className="text-sm text-gray-500">{labels.dateLabel}</p>
                        <div className="font-medium text-gray-800 text-sm">{format(new Date(quote.move_date), 'dd. MMMM yyyy', { locale: de })}</div>
                        {quote.move_date_flexible && <div className="text-xs text-blue-600 mt-1">Datum ist flexibel</div>}
                    </div>
                </div>
            )}

            <div className="pt-4 border-t space-y-4">
                {quote.quoteswanted && (
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 text-gray-400 w-5 h-5"><Hash /></div>
                        <div className="flex-grow">
                            <p className="text-sm text-gray-500">Gewünschte Offerten</p>
                            <div className="font-medium text-gray-800 text-sm">{quote.quoteswanted}</div>
                        </div>
                    </div>
                )}
                {quote.additional_info && (
                     <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 text-gray-400 w-5 h-5"><MessageCircle /></div>
                        <div className="flex-grow">
                            <p className="text-sm text-gray-500">Zusätzliche Bemerkungen</p>
                            <div className="font-medium text-gray-800 text-sm whitespace-pre-wrap">{quote.additional_info}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


const QuoteStatusPageClient = () => {
  const params = useParams();
  const quoteId = params?.quoteId || params?.id;
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchasingPartners, setPurchasingPartners] = useState<any[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedPartnerForReview, setSelectedPartnerForReview] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const confirmEmailAndFetchData = async () => {
      setLoading(true);
      setError(null);
      if (!quoteId) {
        setError('Keine Anfrage-ID angegeben.');
        setLoading(false);
        return;
      }
      try {
        const { error: rpcError } = await supabase.rpc('confirm_email', { p_quote_id: quoteId });

        if (rpcError) {
          console.warn('Could not update email confirmation status via RPC:', rpcError.message);
        }

        const { data: quoteData, error: fetchError } = await supabase
          .from('quotes')
          .select('*')
          .eq('id', quoteId)
          .single();

        if (fetchError) {
          throw new Error('Anfrage nicht gefunden oder ein Fehler ist aufgetreten.');
        }
        setQuote(quoteData);

        if (quoteData.status === 'sold_out' || quoteData.status === 'quota_filled' || quoteData.status === 'approved') {
          const { data: purchasedData, error: purchasedError } = await supabase
            .from('purchased_quotes')
            .select('partner_id')
            .eq('quote_id', quoteId);

          if (purchasedError) throw new Error('Fehler beim Abrufen der Partner.');

          if (purchasedData && purchasedData.length > 0) {
            const partnerIds = purchasedData.map((p: any) => p.partner_id);
            const { data: partnersData, error: partnersError } = await supabase
              .from('partners')
              .select('id, company_name, phone, email, slug, logo_url, average_rating, review_count, status')
              .in('id', partnerIds);

            if (partnersError) throw new Error('Fehler beim Abrufen der Partnerdetails.');

            setPurchasingPartners(partnersData || []);
          }
        }
      } catch (err: any) {
        setError(err?.message || 'Ein Fehler ist aufgetreten.');
      } finally {
        setLoading(false);
      }
    };
    confirmEmailAndFetchData();
  }, [quoteId, refreshKey]);

  const handleReviewClick = (partner: any) => {
    setSelectedPartnerForReview(partner);
    setIsReviewModalOpen(true);
  };

  const handleReviewSuccess = () => {
    setIsReviewModalOpen(false);
    setRefreshKey(prev => prev + 1);
  };

  const isMoveDatePast = quote?.move_date ? isPast(new Date(quote.move_date)) : false;

  return (
    <>
      
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
                  Status Ihrer Anfrage
                </CardTitle>
                <CardDescription className="text-center text-gray-600">
                  {quote && quoteId ? `Anfrage-ID: ${typeof quoteId === 'string' ? quoteId.substring(0, 8) : String(quoteId).substring(0, 8)}` : 'Ihre Anfrage wird geladen...'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  {loading && (
                    <motion.div key="loader" exit={{ opacity: 0 }} className="flex justify-center items-center py-20">
                      <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
                    </motion.div>
                  )}
                  {error && (
                    <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-red-600">
                      <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                      <p className="font-semibold">{error}</p>
                    </motion.div>
                  )}
                  {quote && (
                    <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
                          <div>
                              <h3 className="text-lg font-semibold mb-4 text-gray-700">Timeline</h3>
                              <StatusTimeline status={quote.status} />
                          </div>
                          <div>
                              <h3 className="text-lg font-semibold mb-4 text-gray-700">Anfragedetails</h3>
                              <QuoteDetails quote={quote} />
                          </div>
                      </div>
                      
                      {(quote.image_urls || quote.file_urls) && (
                        <div className="mt-8 pt-6 border-t space-y-4">
                           {quote.image_urls && quote.image_urls.length > 0 && <QuoteImages imageUrls={quote.image_urls} />}
                           {quote.file_urls && quote.file_urls.length > 0 && <QuoteFiles fileUrls={quote.file_urls} />}
                        </div>
                      )}

                      <div className="mt-12 pt-8 border-t">
                        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-2">Interessierte Firmen</h2>
                        <p className="text-center text-gray-600 mb-8">Hier sehen Sie die Firmen, die an Ihrer Anfrage interessiert sind und mit Ihnen Kontakt aufnehmen werden.</p>
                        {purchasingPartners.length > 0 ? (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {purchasingPartners.map(partner => (
                              <PurchasedByCard
                                key={partner.id}
                                partner={partner}
                                isReviewable={isMoveDatePast}
                                onReviewClick={handleReviewClick}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12 text-gray-500">
                            <Building className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-semibold">Noch keine Firma hat Interesse an Ihrer Anfrage gezeigt.</h3>
                            <p className="text-sm text-gray-400">Bald werden sich interessierte Partner bei Ihnen melden!</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      {selectedPartnerForReview && quote && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onOpenChange={setIsReviewModalOpen}
          partner={selectedPartnerForReview}
          quote={quote}
          onReviewSuccess={handleReviewSuccess}
        />
      )}
    </>
  );
};

export default QuoteStatusPageClient;