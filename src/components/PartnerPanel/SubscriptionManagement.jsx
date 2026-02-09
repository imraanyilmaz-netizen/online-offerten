import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Star, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

const SubscriptionManagement = ({ partnerData, onSubscriptionSuccess }) => {
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscriptionPrice, setSubscriptionPrice] = useState(null);
  
  const totalBalance = (partnerData?.main_balance || 0) + (partnerData?.bonus_balance || 0);
  const hasActiveSubscription = partnerData?.has_active_subscription && new Date(partnerData.subscription_end_date) > new Date();

  useEffect(() => {
    const fetchSubscriptionPrice = async () => {
      const { data, error } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'subscription_settings')
        .single();
      
      if (data?.value?.monthly_price) {
        setSubscriptionPrice(data.value.monthly_price);
      }
      if (error) {
        console.error("Failed to fetch subscription price:", error);
      }
    };
    fetchSubscriptionPrice();
  }, []);
  
  const canAfford = subscriptionPrice !== null && totalBalance >= subscriptionPrice;

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.rpc('purchase_subscription', { p_partner_id: partnerData.id });
      if (error) throw error;
      if (data.success) {
        toast({ title: 'Erfolg!', description: data.message, variant: 'success' });
        if (onSubscriptionSuccess) onSubscriptionSuccess();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const formattedEndDate = hasActiveSubscription ? format(new Date(partnerData.subscription_end_date), 'dd. MMMM yyyy, HH:mm', { locale: de }) : null;

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="pb-4 border-b border-gray-100">
        <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Abonnement-Verwaltung</CardTitle>
        <CardDescription className="text-sm text-gray-600 mt-1">
          Verwalten Sie Ihr Abonnement, um unbegrenzt Anfragen freizuschalten.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5 sm:p-6 space-y-6">
        {hasActiveSubscription ? (
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl text-center shadow-sm">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">Abonnement aktiv</h3>
            <p className="text-gray-700 font-medium">Gültig bis: {formattedEndDate}</p>
          </div>
        ) : (
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl text-center shadow-sm">
            <Star className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-blue-800 mb-2">Kein aktives Abonnement</h3>
            <p className="text-gray-700">Kaufen Sie ein Abonnement, um von unbegrenzten Anfragen zu profitieren.</p>
          </div>
        )}
        
        <Card className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-gray-900">Abonnement {hasActiveSubscription ? 'verlängern' : 'kaufen'}</CardTitle>
            </CardHeader>
          <CardContent className="pt-0">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-center sm:text-left">
                <p className="text-gray-600 mb-2">{hasActiveSubscription ? 'Verlängern Sie Ihr Abonnement um einen weiteren Monat.' : 'Aktivieren Sie Ihr Monatsabonnement.'}</p>
                        {subscriptionPrice !== null ? (
                  <p className="text-2xl font-bold text-gray-900">{subscriptionPrice.toFixed(2)} CHF / Monat</p>
                        ) : <Loader2 className="w-5 h-5 animate-spin my-2" />}
                    </div>
              <Button 
                size="lg" 
                onClick={() => setIsModalOpen(true)} 
                disabled={subscriptionPrice === null}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold h-11 px-6"
              >
                        <Star className="w-4 h-4 mr-2" />
                        {hasActiveSubscription ? 'Jetzt verlängern' : 'Jetzt kaufen'}
                    </Button>
                </div>
            </CardContent>
        </Card>

      </CardContent>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Bestätigung</DialogTitle>
                <DialogDescription>
                    {`Sie sind dabei, ein Abonnement für ${subscriptionPrice?.toFixed(2) || ''} CHF zu ${hasActiveSubscription ? 'verlängern' : 'kaufen'}. Der Betrag wird von Ihrem Guthaben abgezogen.`}
                </DialogDescription>
            </DialogHeader>
            <div className="my-4 space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ihr aktuelles Guthaben</span>
                    <span className="font-semibold">{totalBalance.toFixed(2)} CHF</span>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="text-gray-600">Abonnement-Kosten</span>
                    <span className="font-semibold text-blue-600">-{subscriptionPrice?.toFixed(2) || 0} CHF</span>
                </div>
                 <hr className="my-2"/>
                 <div className="flex justify-between items-center text-lg">
                    <span className="text-gray-800 font-bold">Verbleibendes Guthaben</span>
                    <span className="font-bold text-green-600">{(totalBalance - (subscriptionPrice || 0)).toFixed(2)} CHF</span>
                </div>
            </div>
            {!canAfford && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                    <AlertCircle className="w-5 h-5" />
                    <p>Ihr Guthaben ist nicht ausreichend.</p>
                </div>
            )}
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Abbrechen</Button>
                <Button onClick={handlePurchase} disabled={!canAfford || isLoading}>
                    {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Kauf bestätigen
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SubscriptionManagement;