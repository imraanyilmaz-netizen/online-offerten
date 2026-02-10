import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

// Lazy load Stripe only when needed
let stripePromise = null;

const loadStripeLazy = async () => {
  if (!stripePromise) {
    const { loadStripe } = await import('@stripe/stripe-js');
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51PNR8nLd134Uu46YvjZJt1sL9q8R4y6f0Nq8k8mS9s1Y8E2V6q7w7k6z1e6k2z4A4K6W8W8G3z7b1sL00t1G00000000000000';
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

// Lazy load Stripe Elements wrapper
const StripeElementsWrapper = React.lazy(async () => {
  const [{ Elements }] = await Promise.all([
    import('@stripe/react-stripe-js'),
    loadStripeLazy()
  ]);
  const stripe = await loadStripeLazy();
  
  return {
    default: ({ children }) => <Elements stripe={stripe}>{children}</Elements>
  };
});

// Lazy load CheckoutForm component
const CheckoutForm = React.lazy(async () => {
  const [{ CardElement, useStripe, useElements }] = await Promise.all([
    import('@stripe/react-stripe-js'),
    loadStripeLazy()
  ]);
  
  const CheckoutFormComponent = ({ amount, onPaymentSuccess, onPaymentError, partnerId, t }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || processing) {
      return;
    }

    setProcessing(true);

    try {
      // Step 1: Create Payment Intent on your backend (Supabase Edge Function)
      const { data: paymentIntentData, error: paymentIntentError } = await supabase.functions.invoke('create-payment-intent', {
        body: JSON.stringify({ amount: amount * 100, partnerId }), // amount in cents
      });

      if (paymentIntentError) {
        console.error('Error creating payment intent:', paymentIntentError);
        onPaymentError(t('toast.purchaseErrorTitle'));
        setProcessing(false);
        return;
      }

      const clientSecret = paymentIntentData.clientSecret;

      // Step 2: Confirm the card payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (confirmError) {
        console.error('Error confirming payment:', confirmError);
        onPaymentError(confirmError.message || t('toast.purchaseErrorTitle'));
      } else if (paymentIntent.status === 'succeeded') {
        // Step 3: Verify payment on backend and update partner balance
        const { error: verifyError } = await supabase.functions.invoke('verify-stripe-session', {
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount,
            partnerId: partnerId,
          }),
        });

        if (verifyError) {
          console.error('Error verifying payment:', verifyError);
          onPaymentError(t('toast.purchaseErrorTitle'));
        } else {
          onPaymentSuccess();
        }
      } else {
        onPaymentError(t('toast.purchaseErrorTitle'));
      }
    } catch (error) {
      console.error('Payment process error:', error);
      onPaymentError(error.message || t('toast.purchaseErrorTitle'));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <Button type="submit" disabled={!stripe || processing} className="w-full">
        {processing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('topUpModal.processing')}
          </>
        ) : (
          t('topUpModal.payAmount')
        )}
      </Button>
    </form>
  );
};
  
  return { default: CheckoutFormComponent };
});

const CreditTopUpModal = ({ open, onOpenChange, partnerId, onCreditUpdate }) => {
  const { t } = useTranslation('partnerDashboard');
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1: Enter amount, 2: Payment form
  const MIN_AMOUNT = 10; // Minimum top-up amount

  useEffect(() => {
    if (open) {
      setAmount('');
      setError('');
      setStep(1);
    }
  }, [open]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]{0,2}$/.test(value)) {
      setAmount(value);
      if (parseFloat(value) < MIN_AMOUNT && value !== '') {
        setError(t('topUpModal.minAmountError', { amount: MIN_AMOUNT }));
      } else {
        setError('');
      }
    }
  };

  const handlePresetAmount = (preset) => {
    setAmount(preset.toString());
    if (preset < MIN_AMOUNT) {
      setError(t('topUpModal.minAmountError', { amount: MIN_AMOUNT }));
    } else {
      setError('');
    }
  };

  const handleProceedToPayment = () => {
    const finalAmount = parseFloat(amount);
    if (isNaN(finalAmount) || finalAmount < MIN_AMOUNT) {
      setError(t('topUpModal.minAmountError', { amount: MIN_AMOUNT }));
      return;
    }
    setStep(2);
  };

  const handlePaymentSuccess = () => {
    toast({
      title: t('toast.purchaseSuccessTitle'),
      description: t('Guthaben erfolgreich aufgeladen!'), // Add this translation
      variant: 'success',
    });
    onCreditUpdate();
    onOpenChange(false);
  };

  const handlePaymentError = (message) => {
    toast({
      title: t('toast.purchaseErrorTitle'),
      description: message,
      variant: 'destructive',
    });
    setStep(1); // Go back to amount entry on error
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <Button
            variant="ghost"
            onClick={() => router.push('/partner-dashboard')}
            className="absolute left-4 top-4 text-sm text-gray-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> {t('topUpModal.backToDashboard')}
          </Button>
          <DialogTitle className="mt-8 text-center text-2xl font-bold">
            {t('topUpModal.title')}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t('topUpModal.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">{t('topUpModal.enterAmount')}</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="100.00"
                    value={amount}
                    onChange={handleAmountChange}
                    className="pl-10"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">CHF</span>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
              <div className="flex justify-center space-x-2">
                {[50, 100, 200].map((preset) => (
                  <Button
                    key={preset}
                    variant="outline"
                    onClick={() => handlePresetAmount(preset)}
                    className="w-24"
                  >
                    {preset} CHF
                  </Button>
                ))}
              </div>
              <Button onClick={handleProceedToPayment} disabled={!!error || !amount} className="w-full">
                {t('topUpModal.payAmount')}
              </Button>
            </div>
          )}

          {step === 2 && (
            <React.Suspense fallback={
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
              </div>
            }>
              <StripeElementsWrapper>
              <CheckoutForm
                amount={parseFloat(amount)}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
                partnerId={partnerId}
                t={t}
              />
              </StripeElementsWrapper>
            </React.Suspense>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreditTopUpModal;