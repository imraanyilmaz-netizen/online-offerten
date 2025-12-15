'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/customSupabaseClient';
import { Loader2, AlertCircle, Building, Star, Send, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AnimatePresence, motion } from 'framer-motion';

// Combined StarRating component (Input and Display)
const StarRating = ({ rating, setRating, interactive = true }: { rating: number; setRating?: (rating: number) => void; interactive?: boolean }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const calculateRating = useCallback((event: any) => {
        const target = event.currentTarget;
        const rect = target.getBoundingClientRect();
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const offsetX = clientX - rect.left;
        const starWidth = rect.width / 5;
        
        if (starWidth <= 0) return rating;

        const starIndex = Math.floor(offsetX / starWidth);
        const inStarX = offsetX - starIndex * starWidth;
        const isHalf = inStarX < starWidth / 2;
        const calculated = starIndex + (isHalf ? 0.5 : 1);
        return Math.max(0.5, Math.min(5, calculated));
    }, [rating]);

    const handleInteraction = useCallback((event: any, isSetting: boolean) => {
        if (!interactive || !setRating) return;
        const newRating = calculateRating(event);
        if (isSetting) {
            setRating(newRating);
            setHoverRating(0);
        } else {
            setHoverRating(newRating);
        }
    }, [interactive, calculateRating, setRating]);

    const handleMouseLeave = () => {
        if (!interactive) return;
        setHoverRating(0);
    };

    const displayValue = interactive ? (hoverRating > 0 ? hoverRating : rating) : rating;
    const roundedDisplayValue = Math.round(displayValue * 2) / 2;

    return (
        <div className="flex items-center gap-2">
            <div
                className={`flex ${interactive ? 'cursor-pointer' : ''}`}
                onMouseMove={(e) => handleInteraction(e, false)}
                onMouseLeave={handleMouseLeave}
                onClick={(e: React.MouseEvent) => handleInteraction(e, true)}
                onTouchStart={(e) => handleInteraction(e, false)}
                onTouchMove={(e) => handleInteraction(e, true)}
                onTouchEnd={(e) => handleInteraction(e, true)}
            >
                {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <div key={starValue} className="p-1 relative pointer-events-none">
                            <Star className="w-8 h-8 text-gray-300 transition-colors" />
                            {roundedDisplayValue >= starValue && (
                                <Star className="w-8 h-8 absolute top-1 left-1 text-yellow-400 fill-yellow-400 transition-colors" />
                            )}
                            {roundedDisplayValue === starValue - 0.5 && (
                                <div className="absolute top-1 left-1 w-[50%] h-full overflow-hidden">
                                    <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <span className="font-bold text-xl text-gray-800 w-12 text-center">{displayValue.toFixed(1)}</span>
        </div>
    );
};

const PartnerReviewForm = ({ partner, quote, onBack, onComplete }: { partner: any; quote: any; onBack: () => void; onComplete: () => void }) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [ratings, setRatings] = useState({ price: 0, workflow: 0, administration: 0 });
    const [overallRating, setOverallRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const validRatings = Object.values(ratings).filter(r => r > 0);
        if (validRatings.length > 0) {
            const avg = validRatings.reduce((a: number, b: number) => a + b, 0) / validRatings.length;
            setOverallRating(avg);
        } else {
            setOverallRating(0);
        }
    }, [ratings]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (Object.values(ratings).some(r => r === 0)) {
            toast({ title: 'Fehler', description: 'Bitte bewerten Sie alle Kategorien.', variant: 'destructive' });
            return;
        }
        setLoading(true);
        
        const { error } = await supabase.from('customer_reviews').insert({
            partner_id: partner.id,
            quote_id: quote.id,
            customer_name: `${quote.firstname} ${quote.lastname}`,
            customer_email: quote.email,
            rating: overallRating,
            rating_price: ratings.price,
            rating_workflow: ratings.workflow,
            rating_administration: ratings.administration,
            review_text: comment,
            review_date: new Date().toISOString(),
            service_type: quote.servicetype,
            city: quote.from_city,
            approval_status: 'pending',
            review_type: 'partner',
            show_on_homepage: false,
        });

        setLoading(false);
        if (error) {
            toast({ title: 'Fehler', description: `Bewertung konnte nicht übermittelt werden: ${error.message}`, variant: 'destructive' });
        } else {
            toast({ title: 'Erfolg!', description: 'Vielen Dank für Ihre Bewertung der Firma.' });
            onComplete();
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CardHeader>
                <CardTitle>Bewerten Sie: {partner.company_name}</CardTitle>
                <CardDescription>Ihre Erfahrung hilft anderen Kunden.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between items-center">
                            <Label className="font-medium">Preiseinhaltung</Label>
                            <StarRating rating={ratings.price} setRating={val => setRatings(p => ({ ...p, price: val }))} />
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-center">
                            <Label className="font-medium">Arbeitsablauf / Qualität</Label>
                            <StarRating rating={ratings.workflow} setRating={val => setRatings(p => ({ ...p, workflow: val }))} />
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-center">
                            <Label className="font-medium">Administration / Kommunikation</Label>
                            <StarRating rating={ratings.administration} setRating={val => setRatings(p => ({ ...p, administration: val }))} />
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                        <Label className="font-bold text-lg">Gesamtbewertung</Label>
                        <StarRating rating={overallRating} interactive={false} />
                    </div>
                    <div>
                        <Label htmlFor="comment" className="font-medium">Ihre Erfahrung (optional)</Label>
                        <Textarea id="comment" value={comment} onChange={e => setComment(e.target.value)} placeholder="Beschreiben Sie Ihre Erfahrung..." className="mt-2" />
                    </div>
                    <div className="flex justify-between gap-4">
                        <Button type="button" variant="outline" onClick={onBack} disabled={loading}>Zurück</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin mr-2"/> : <Send className="mr-2 h-4 w-4"/>} Bewertung absenden
                        </Button>
                    </div>
                </form>
            </CardContent>
        </motion.div>
    );
};

const PlatformReviewForm = ({ quote, onComplete }: { quote: any; onComplete: () => void }) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            toast({ title: 'Fehler', description: 'Bitte geben Sie eine Bewertung ab.', variant: 'destructive' });
            return;
        }
        setLoading(true);
        
        const { error } = await supabase.from('customer_reviews').insert({
            quote_id: quote.id,
            customer_name: `${quote.firstname} ${quote.lastname}`,
            customer_email: quote.email,
            rating: rating,
            review_text: comment,
            review_date: new Date().toISOString(),
            service_type: quote.servicetype,
            city: quote.from_city,
            approval_status: 'pending',
            review_type: 'platform',
            show_on_homepage: false,
        });

        setLoading(false);
        if (error) {
            toast({ title: 'Fehler', description: `Bewertung konnte nicht übermittelt werden: ${error.message}`, variant: 'destructive' });
        } else {
            onComplete();
        }
    };
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <CardHeader>
                <CardTitle>Bewerten Sie Online-Offerten.ch</CardTitle>
                <CardDescription>Wie war Ihre Erfahrung mit unserer Plattform?</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col items-center gap-4">
                        <Label className="text-lg font-medium">Ihre Gesamtbewertung</Label>
                        <StarRating rating={rating} setRating={setRating} />
                    </div>
                     <div>
                        <Label htmlFor="platform_comment" className="font-medium">Ihr Feedback (optional)</Label>
                        <Textarea id="platform_comment" value={comment} onChange={e => setComment(e.target.value)} placeholder="Was hat Ihnen gefallen oder was können wir verbessern?" className="mt-2" />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin mr-2"/> : <Send className="mr-2 h-4 w-4"/>} Feedback absenden
                        </Button>
                    </div>
                </form>
            </CardContent>
        </motion.div>
    )
};


const ReviewPageClient = () => {
    // Support multiple param names so existing links keep working:
    // - /bewertung-abgeben/:token
    // - /bewertung/:quoteId
    const params = useParams();
    const quoteId = params?.quoteId || params?.token || params?.id;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quote, setQuote] = useState<any>(null);
    const [partners, setPartners] = useState<any[]>([]);
    const [view, setView] = useState('selection'); // 'selection', 'partner_review', 'platform_review', 'completed'
    const [selectedPartner, setSelectedPartner] = useState<any>(null);

    useEffect(() => {
        const fetchReviewData = async () => {
            if (!quoteId) {
                setError("Ungültiger Link. Es wurde keine Anfrage-ID gefunden.");
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const { data: quoteData, error: quoteError } = await supabase
                    .from('quotes')
                    .select('*')
                    .eq('id', quoteId)
                    .single();

                if (quoteError || !quoteData) throw new Error("Anfrage nicht gefunden oder Link ungültig.");
                setQuote(quoteData);

                const { data: purchasedData, error: purchasedError } = await supabase
                    .from('purchased_quotes')
                    .select('partner_id')
                    .eq('quote_id', quoteId);

                if (purchasedError) throw new Error("Partner konnten nicht geladen werden.");

                if (purchasedData.length > 0) {
                    const partnerIds = purchasedData.map((p: any) => p.partner_id);
                    const { data: partnersData, error: partnersError } = await supabase
                        .from('partners')
                        .select('id, company_name, slug')
                        .in('id', partnerIds);
                    if (partnersError) throw new Error("Partnerdetails konnten nicht geladen werden.");
                    setPartners(partnersData);
                }
            } catch (err: any) {
                setError(err?.message || 'Ein Fehler ist aufgetreten.');
            } finally {
                setLoading(false);
            }
        };
        fetchReviewData();
    }, [quoteId]);

    const handlePartnerSelect = (partner: any) => {
        setSelectedPartner(partner);
        setView('partner_review');
    };
    
    const handleNoPartner = () => {
      setView('platform_review');
    };

    const handlePartnerReviewComplete = () => {
        setView('platform_review');
    };
    
    const handlePlatformReviewComplete = () => {
        setView('completed');
    }

    const renderContent = () => {
        if (loading) return <div className="flex justify-center items-center py-20"><Loader2 className="w-12 h-12 animate-spin text-blue-500" /></div>;
        if (error) return <div className="text-center py-20 text-red-600"><AlertCircle className="w-12 h-12 mx-auto mb-4"/><p className="font-semibold">{error}</p></div>;
        if (!quote) return null;

        return (
             <AnimatePresence mode="wait">
                <motion.div key={view}>
                    {view === 'selection' && (
                        <>
                             <CardHeader>
                                <CardTitle>Ihre Bewertung abgeben</CardTitle>
                                <CardDescription>Wählen Sie die Firma, mit der Sie zusammengearbeitet haben, um eine Bewertung abzugeben.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {partners.length > 0 ? (
                                    <div className="space-y-3">
                                    {partners.map(p => (
                                        <Button key={p.id} variant="outline" className="w-full justify-start h-auto py-3" onClick={() => handlePartnerSelect(p)}>
                                            <Building className="mr-3 h-5 w-5 text-gray-500" />
                                            <span className="font-semibold">{p.company_name}</span>
                                        </Button>
                                    ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-500 py-4">Für diese Anfrage wurden keine Firmen gefunden, die bewertet werden können.</p>
                                )}
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Oder</span></div>
                                </div>
                                <Button variant="secondary" className="w-full" onClick={handleNoPartner}>
                                    Ich habe mit keiner dieser Firmen zusammengearbeitet
                                </Button>
                            </CardContent>
                        </>
                    )}
                    {view === 'partner_review' && <PartnerReviewForm partner={selectedPartner} quote={quote} onBack={() => setView('selection')} onComplete={handlePartnerReviewComplete} />}
                    {view === 'platform_review' && <PlatformReviewForm quote={quote} onComplete={handlePlatformReviewComplete} />}
                    {view === 'completed' && (
                         <div className="text-center p-8 sm:p-12">
                             <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6"/>
                             <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Vielen Dank für Ihr Feedback!</h2>
                             <p className="mt-4 text-gray-600 max-w-md mx-auto">Ihre Bewertung wurde erfolgreich übermittelt und hilft uns, unseren Service stetig zu verbessern.</p>
                             <Button asChild className="mt-8">
                                 <Link href="/">Zurück zur Startseite</Link>
                             </Button>
                         </div>
                    )}
                </motion.div>
             </AnimatePresence>
        )
    };

    return (
        <>
            
            <div className="min-h-screen bg-gray-50 flex items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl w-full mx-auto">
                    <Card className="shadow-2xl">
                        {renderContent()}
                    </Card>
                </div>
            </div>
        </>
    );
};

export default ReviewPageClient;