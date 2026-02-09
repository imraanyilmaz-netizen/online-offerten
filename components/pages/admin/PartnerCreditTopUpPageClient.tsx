'use client'

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useCallback, useEffect } from 'react';
// Removed useTranslation
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard, ArrowLeft, Loader2, Zap, AlertCircle, ShieldX } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/supabaseClient';
import PaymentModal from '@/components/PartnerPanel/PaymentModal';

const quickAmounts = [50, 100, 200];

const PartnerCreditTopUpPageClient = () => {
  // Removed useTranslation
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [amount, setAmount] = useState('100');
  const [minAmount, setMinAmount] = useState<number | null>(null); // Will be loaded from admin settings
  const [isLoading, setIsLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentCanceled, setPaymentCanceled] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Client-only auth check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          console.log('[PartnerCreditTopUpPageClient] No session, redirecting to /login');
          router.replace('/login');
          return;
        }

        const userRole = session.user?.user_metadata?.role;
        
        if (userRole !== 'partner') {
          console.log('[PartnerCreditTopUpPageClient] User is not partner, redirecting to /');
          router.replace('/');
          return;
        }

        // User is partner - continue
        setAuthLoading(false);
      } catch (error) {
        console.error('[PartnerCreditTopUpPageClient] Auth check error:', error);
        router.replace('/login');
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    const fetchMinAmount = async () => {
      const { data, error } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'topup_settings')
        .single();
      
      if (error) {
        console.error('Error fetching min amount:', error);
        // Default to 2 CHF if error
        setMinAmount(2);
        return;
      }
      
      if (data?.value?.min_amount) {
        // Parse to ensure it's a number
        const parsedAmount = parseFloat(data.value.min_amount);
        if (!isNaN(parsedAmount) && parsedAmount > 0) {
          console.log('Min amount from admin settings:', parsedAmount);
          setMinAmount(parsedAmount);
        } else {
          console.warn('Invalid min_amount in settings, using default');
          setMinAmount(2);
        }
      } else {
        // Default to 2 CHF if not set in admin panel
        console.log('No min_amount in settings, using default: 2');
        setMinAmount(2);
      }
    };
    fetchMinAmount();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams?.toString());
    if (queryParams.get('canceled')) {
      setPaymentCanceled(true);
      queryParams.delete('canceled');
    }
  }, [searchParams?.toString()]);

  // All hooks must be called before any conditional returns
  const validateAmount = useCallback((value: string) => {
    if (minAmount === null) {
      // Settings not loaded yet, don't validate
      return true;
    }
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < minAmount) {
      setError(`Der Betrag muss mindestens ${minAmount} CHF betragen.`);
      return false;
    }
    setError('');
    return true;
  }, [minAmount]);

  const handleTopUp = useCallback(async () => {
    if (!validateAmount(amount)) return;
    setPaymentCanceled(false);

    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Fehler',
        description: 'Benutzersitzung nicht gefunden. Bitte melden Sie sich erneut an.',
      });
      return;
    }

    setIsLoading(true);
    const numericAmount = parseFloat(amount);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('create-stripe-checkout-session', {
        body: { amount: numericAmount, partnerId: user.id },
      });

      if (functionError) throw new Error(`Function Error: ${functionError.message}`);
      if (data.error) throw new Error(data.error);
      if (!data.clientSecret) throw new Error("Payment service configuration error - no clientSecret received");

      setClientSecret(data.clientSecret);

    } catch (e) {
      console.error("Stripe session creation error:", e);
      const errorMessage = e instanceof Error ? e.message : 'Die Zahlung konnte nicht verarbeitet werden. Bitte versuchen Sie es erneut.';
      toast({
        variant: 'destructive',
        title: 'Zahlungsfehler',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, amount, toast, validateAmount]);

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto" />
          <p className="mt-4 text-lg text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authorized (redirect is handled in useEffect)
  if (!user || user.user_metadata?.role !== 'partner') {
    return null;
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
    validateAmount(value);
  };

  const handleQuickAmountClick = (quickAmount: number) => {
    setAmount(String(quickAmount));
    validateAmount(String(quickAmount));
  };
  
  const handleModalClose = () => {
    setClientSecret(null);
    setPaymentCanceled(true);
  };

  return (
    <>
      
      <AnimatePresence>
        {clientSecret && (
          <PaymentModal
            clientSecret={clientSecret}
            onClose={handleModalClose}
          />
        )}
      </AnimatePresence>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-4">
            <Button asChild variant="ghost" className="text-gray-600 hover:text-gray-900">
              <Link href="/partner/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zurück zum Dashboard
              </Link>
            </Button>
          </div>

          <AnimatePresence>
            {paymentCanceled && (
              <motion.div
                key="canceled"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <Card className="bg-amber-50 border-amber-400">
                  <CardContent className="p-4 flex items-center">
                    <ShieldX className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-amber-800">Zahlung abgebrochen</p>
                      <p className="text-sm text-amber-700">Der Zahlungsvorgang wurde nicht abgeschlossen. Sie können es erneut versuchen.</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Card className="shadow-lg animate-fade-in">
            <CardHeader className="text-center">
              <div className="mx-auto bg-green-100 p-4 rounded-full w-fit mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-3xl font-bold">Guthaben aufladen</CardTitle>
              <CardDescription className="text-lg text-gray-600">Sie werden zur sicheren Zahlungsseite weitergeleitet.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-lg font-medium">Betrag eingeben</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">CHF</span>
                    <Input
                      id="amount"
                      type="text"
                      value={amount}
                      onChange={handleAmountChange}
                      placeholder="100.00"
                      className="pl-14 text-2xl h-14 font-bold text-center"
                    />
                  </div>
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm font-medium text-red-600 flex items-center pt-1"
                      >
                        <AlertCircle className="w-4 h-4 mr-1.5" />
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-center items-center gap-3">
                  {quickAmounts.map((qAmount) => (
                    <Button
                      key={qAmount}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAmountClick(qAmount)}
                      className="rounded-full"
                    >
                      {qAmount} CHF
                    </Button>
                  ))}
                </div>
              </div>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  onClick={handleTopUp}
                  className="w-full text-lg py-6"
                  size="lg"
                  disabled={isLoading || !!error}
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="loader"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center"
                      >
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Wird verarbeitet...
                      </motion.div>
                    ) : (
                      <motion.div
                        key="pay"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center"
                      >
                        <CreditCard className="mr-2 h-5 w-5" />
                        Betrag zahlen
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PartnerCreditTopUpPageClient;