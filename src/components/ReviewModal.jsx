import React, { useState, useEffect, useCallback } from 'react';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { Star, Loader2 } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/customSupabaseClient';
    
    const StarRatingDisplay = ({ rating, size = 24 }) => {
        const totalStars = 5;
        const displayRating = Math.round(rating * 2) / 2;
        const fullStars = Math.floor(displayRating);
        const hasHalfStar = displayRating % 1 !== 0;
        const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
      
        return (
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} size={size} className="text-yellow-400 fill-yellow-400" />
              ))}
              {hasHalfStar && (
                <div style={{ position: 'relative' }}>
                  <Star key="half-empty" size={size} className="text-gray-300" />
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
                    <Star key="half-full" size={size} className="text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
              )}
              {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} size={size} className="text-gray-300" />
              ))}
            </div>
            <span className="font-bold text-lg text-gray-800">{rating.toFixed(1)}</span>
          </div>
        );
      };
      
    
    const StarRatingInput = ({ rating, setRating }) => {
        const [hoverRating, setHoverRating] = useState(0);
      
        const calculateRating = (event) => {
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
        };
    
        const handleInteraction = (event, isSetting) => {
            const newRating = calculateRating(event);
            if (isSetting) {
                setRating(newRating);
                setHoverRating(0);
            } else {
                setHoverRating(newRating);
            }
        };

        const handleTouchMove = (event) => {
            const newRating = calculateRating(event);
            setHoverRating(newRating);
            setRating(newRating);
        };
    
        const handleMouseLeave = () => {
            setHoverRating(0);
        };
    
        return (
            <div
                className="flex items-center touch-pan-y"
                onMouseMove={(e) => handleInteraction(e, false)}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => handleInteraction(e, true)}
                onTouchStart={(e) => handleInteraction(e, false)}
                onTouchMove={handleTouchMove}
                onTouchEnd={(e) => handleInteraction(e, true)}
            >
                {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    const displayValue = hoverRating > 0 ? hoverRating : rating;
                    const roundedDisplayValue = Math.round(displayValue * 2) / 2;
    
                    return (
                        <div key={starValue} className="p-1 relative pointer-events-none">
                            <Star className="w-7 h-7 text-gray-300 transition-colors" />
                            {roundedDisplayValue >= starValue && (
                                <Star className="w-7 h-7 absolute top-1 left-1 text-yellow-400 fill-yellow-400 transition-colors" />
                            )}
                            {roundedDisplayValue === starValue - 0.5 && (
                                <div className="absolute top-1 left-1 w-[50%] h-full overflow-hidden">
                                    <Star className="w-7 h-7 text-yellow-400 fill-yellow-400" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };
      
    
    const ReviewModal = ({ isOpen, onOpenChange, partner, quote, onReviewSuccess }) => {
      const [email, setEmail] = useState('');
      const [ratingPrice, setRatingPrice] = useState(0);
      const [ratingWorkflow, setRatingWorkflow] = useState(0);
      const [ratingAdministration, setRatingAdministration] = useState(0);
      const [overallRating, setOverallRating] = useState(0);
      const [comment, setComment] = useState('');
      const [loading, setLoading] = useState(false);
      const { toast } = useToast();
    
      const updateOverallRating = useCallback(() => {
        const ratings = [ratingPrice, ratingWorkflow, ratingAdministration].filter(r => r > 0);
        if (ratings.length > 0) {
            const avg = ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
            setOverallRating(avg);
        } else {
            setOverallRating(0);
        }
      }, [ratingPrice, ratingWorkflow, ratingAdministration]);
    
      useEffect(() => {
        updateOverallRating();
      }, [updateOverallRating]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        if (quote && email.toLowerCase() !== quote.email.toLowerCase()) {
          toast({
            title: 'Fehler',
            description: 'Die E-Mail-Adresse stimmt nicht mit der Anfrage überein.',
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }
    
        if (ratingPrice === 0 || ratingWorkflow === 0 || ratingAdministration === 0) {
          toast({
            title: 'Fehler',
            description: 'Bitte geben Sie für alle Kategorien eine Sternebewertung ab.',
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }
        
        const { data: existingReview, error: checkError } = await supabase
          .from('customer_reviews')
          .select('id')
          .eq('quote_id', quote.id)
          .eq('partner_id', partner.id)
          .maybeSingle();
    
        if (checkError) {
            toast({ title: 'Fehler', description: 'Fehler beim Überprüfen vorhandener Bewertungen.', variant: 'destructive' });
            setLoading(false);
            return;
        }
        
        if (existingReview) {
            toast({ title: 'Hinweis', description: 'Sie haben bereits eine Bewertung für diese Anfrage abgegeben.', variant: 'default' });
            setLoading(false);
            onOpenChange(false);
            return;
        }
    
        const finalOverallRating = (ratingPrice + ratingWorkflow + ratingAdministration) / 3;
    
        const reviewData = {
          partner_id: partner.id,
          quote_id: quote.id,
          customer_name: `${quote.firstname} ${quote.lastname}`,
          customer_email: email,
          rating: finalOverallRating,
          rating_price: ratingPrice,
          rating_workflow: ratingWorkflow,
          rating_administration: ratingAdministration,
          review_text: comment,
          review_date: new Date().toISOString(),
          service_type: quote.servicetype,
          city: quote.from_city,
          is_verified: false,
          approval_status: 'pending'
        };
    
        const { error } = await supabase.from('customer_reviews').insert([reviewData]);
    
        setLoading(false);
    
        if (error) {
          toast({
            title: 'Fehler',
            description: `Ihre Bewertung konnte nicht gespeichert werden: ${error.message}`,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Vielen Dank!',
            description: 'Ihre Bewertung wurde erfolgreich übermittelt und wird nach Prüfung veröffentlicht.',
          });
          onReviewSuccess();
        }
      };
    
      return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-[525px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle className="text-xl">Bewerten Sie {partner?.company_name}</DialogTitle>
                <DialogDescription>
                  Teilen Sie Ihre Erfahrung, um anderen zu helfen.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">E-Mail-Adresse zur Bestätigung</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Ihre E-Mail-Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
    
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Preiseinhaltung</Label>
                    <StarRatingInput rating={ratingPrice} setRating={setRatingPrice} />
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Arbeitsablauf</Label>
                    <StarRatingInput rating={ratingWorkflow} setRating={setRatingWorkflow} />
                  </div>
                  <div className="flex justify-between items-center">
                    <Label>Administration/Kommunikation</Label>
                    <StarRatingInput rating={ratingAdministration} setRating={setRatingAdministration} />
                  </div>
                </div>
    
                <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                    <Label className="font-bold text-base">Gesamtbewertung</Label>
                    <StarRatingDisplay rating={overallRating} />
                </div>
    
                <div className="grid gap-2">
                  <Label htmlFor="comment">Ihre Erfahrung (optional)</Label>
                  <Textarea
                    id="comment"
                    placeholder="Beschreiben Sie Ihre Erfahrung mit dem Partner..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Abbrechen
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Bewertung absenden
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      );
    };
    
    export default ReviewModal;