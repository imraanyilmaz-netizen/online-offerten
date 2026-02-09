import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Loader2, Save, Wallet, Settings, Lock, Eye, EyeOff } from 'lucide-react';

const AdminSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [subscriptionPrice, setSubscriptionPrice] = useState('');
  const [loadingSubscription, setLoadingSubscription] = useState(false);

  const [minTopUpAmount, setMinTopUpAmount] = useState('');
  const [loadingTopUp, setLoadingTopUp] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from('app_settings')
        .select('key, value');
      
      if (error) {
        console.error("Error fetching app settings: ", error);
        toast({ title: 'Fehler', description: 'Einstellungen konnten nicht geladen werden.', variant: 'destructive' });
        return;
      }
      
      const settings = data.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {});

      if (settings.subscription_settings?.monthly_price) {
        setSubscriptionPrice(settings.subscription_settings.monthly_price);
      }
      if (settings.topup_settings?.min_amount) {
        setMinTopUpAmount(settings.topup_settings.min_amount);
      }
    };
    fetchSettings();
  }, [toast]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: 'Fehler', description: 'Neue Passwörter stimmen nicht überein.', variant: 'destructive' });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: 'Fehler', description: 'Das neue Passwort muss mindestens 6 Zeichen lang sein.', variant: 'destructive' });
      return;
    }
    setLoadingPassword(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email: user.email, password: oldPassword });
      if (signInError) throw new Error('Altes Passwort ist falsch.');
      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
      if (updateError) throw updateError;
      toast({ title: 'Erfolgreich', description: 'Ihr Passwort wurde erfolgreich aktualisiert.' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast({ title: 'Passwortänderungsfehler', description: error.message, variant: 'destructive' });
    } finally {
      setLoadingPassword(false);
    }
  };
  
  const handleSettingSave = async (key, value, setLoading, successMessage) => {
    setLoading(true);
    try {
        const { data, error } = await supabase
            .from('app_settings')
            .update({ value, updated_at: new Date().toISOString() })
            .eq('key', key)
            .select()
            .single();

        if (error && error.code === 'PGRST116') { // if row doesn't exist
             const { insertError } = await supabase
                .from('app_settings')
                .insert({ key, value });
             if(insertError) throw insertError;
        } else if (error) {
            throw error;
        }
      
        toast({ title: 'Erfolgreich', description: successMessage });
    } catch (error) {
        toast({ title: 'Fehler beim Speichern', description: error.message, variant: 'destructive' });
    } finally {
        setLoading(false);
    }
  };

  const handleSubscriptionPriceChange = (e) => {
    e.preventDefault();
    const price = parseFloat(subscriptionPrice);
    if (isNaN(price) || price < 0) {
      toast({ title: 'Fehler', description: 'Bitte geben Sie einen gültigen Preis ein.', variant: 'destructive' });
      return;
    }
    handleSettingSave('subscription_settings', { monthly_price: price }, setLoadingSubscription, 'Der Abonnementpreis wurde aktualisiert.');
  };

  const handleMinTopUpAmountChange = (e) => {
    e.preventDefault();
    const amount = parseFloat(minTopUpAmount);
    if (isNaN(amount) || amount < 0) {
      toast({ title: 'Fehler', description: 'Bitte geben Sie einen gültigen Betrag ein.', variant: 'destructive' });
      return;
    }
    handleSettingSave('topup_settings', { min_amount: amount }, setLoadingTopUp, 'Der minimale Aufladebetrag wurde aktualisiert.');
  };


  return (
    <div className="px-4 md:px-6 pb-6 md:pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Allgemeine Einstellungen - Left Card */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-green-50 rounded-lg">
                <Settings className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-900">Allgemeine Einstellungen</CardTitle>
                <CardDescription className="text-sm text-gray-600 mt-1">
                  Verwalten Sie hier die globalen Anwendungseinstellungen.
                </CardDescription>
              </div>
            </div>
        </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <form onSubmit={handleSubscriptionPriceChange} className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">Partner-Abonnement</h3>
            <div className="space-y-2">
                  <Label htmlFor="subscriptionPrice" className="text-sm font-medium text-gray-700">
                    Monatlicher Preis (CHF)
                  </Label>
                <Input
                  id="subscriptionPrice"
                  type="number"
                  step="0.01"
                  value={subscriptionPrice}
                  onChange={(e) => setSubscriptionPrice(e.target.value)}
                  required
                    className="h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
                    placeholder="0.00"
                />
              </div>
            </div>
              <Button 
                type="submit" 
                disabled={loadingSubscription}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-11"
              >
                {loadingSubscription ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
              Abo-Preis speichern
            </Button>
          </form>

            <div className="border-t border-gray-200 pt-6">
              <form onSubmit={handleMinTopUpAmountChange} className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Guthabenaufladung</h3>
            <div className="space-y-2">
                    <Label htmlFor="minTopUpAmount" className="text-sm font-medium text-gray-700">
                      Minimaler Aufladebetrag (CHF)
                    </Label>
               <div className="relative">
                <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="minTopUpAmount"
                  type="number"
                  step="1"
                  value={minTopUpAmount}
                  onChange={(e) => setMinTopUpAmount(e.target.value)}
                  required
                        className="pl-10 h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
                        placeholder="0"
                />
              </div>
            </div>
                </div>
                <Button 
                  type="submit" 
                  disabled={loadingTopUp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-11"
                >
                  {loadingTopUp ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
              Aufladebetrag speichern
            </Button>
          </form>
            </div>
        </CardContent>
      </Card>
      
        {/* Admin-Konto - Right Card */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-green-50 rounded-lg">
                <Lock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-gray-900">Admin-Konto</CardTitle>
                <CardDescription className="text-sm text-gray-600 mt-1">
                  Hier können Sie die Sicherheitseinstellungen Ihres Kontos ändern.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handlePasswordChange} className="space-y-5">
              <h3 className="text-base font-semibold text-gray-900">Passwort ändern</h3>
              
              <div className="space-y-2">
                <Label htmlFor="oldPassword" className="text-sm font-medium text-gray-700">
                  Altes Passwort
                </Label>
                <div className="relative">
                  <Input
                    id="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                    className="h-11 pr-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

            <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                  Neues Passwort
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="h-11 pr-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Neues Passwort bestätigen
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-11 pr-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
            </div>

              <Button 
                type="submit" 
                disabled={loadingPassword}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-11 mt-6"
              >
                {loadingPassword ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
              Passwort speichern
            </Button>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default AdminSettings;