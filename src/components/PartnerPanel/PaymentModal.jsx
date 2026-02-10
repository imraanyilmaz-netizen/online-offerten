import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
// framer-motion removed - CSS for better INP
import StripeProvider from '@/components/StripeProvider';

// Lazy load Stripe components
const PaymentModalContent = lazy(async () => {
  const { useStripe, EmbeddedCheckoutProvider, EmbeddedCheckout } = await import('@stripe/react-stripe-js');
  
  return {
    default: ({ clientSecret, onClose }) => {
      const stripe = useStripe();
      const [isReady, setIsReady] = useState(false);

      useEffect(() => {
        if (clientSecret && stripe) {
          setIsReady(true);
        }
      }, [clientSecret, stripe]);

      const LoadingState = () => (
        <Dialog open={true} onOpenChange={onClose}>
          <DialogContent className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-xl">
            <div
            >
              <Loader2 className="h-12 w-12 animate-spin text-green-600" />
            </div>
            <p 
              className="mt-4 text-lg text-gray-700 font-medium"
            >
              Zahlung wird geladen...
            </p>
          </DialogContent>
        </Dialog>
      );

      if (!isReady) {
        return <LoadingState />;
      }

      const options = { clientSecret };

      return (
        <Dialog open={true} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-lg p-0">
            <div
            >
              <DialogHeader className="p-6 pb-2">
                <DialogTitle className="text-2xl font-bold text-center text-gray-800">Sichere Zahlung</DialogTitle>
              </DialogHeader>
              <div id="embedded-checkout">
                <EmbeddedCheckoutProvider stripe={stripe} options={options}>
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    }
  };
});

const PaymentModal = ({ clientSecret, onClose }) => {
  if (!clientSecret) {
    return null;
  }

  return (
    <StripeProvider>
      <Suspense fallback={
        <Dialog open={true} onOpenChange={onClose}>
          <DialogContent className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-xl">
            <Loader2 className="h-12 w-12 animate-spin text-green-600" />
            <p className="mt-4 text-lg text-gray-700 font-medium">Zahlung wird geladen...</p>
          </DialogContent>
        </Dialog>
      }>
        <PaymentModalContent clientSecret={clientSecret} onClose={onClose} />
      </Suspense>
    </StripeProvider>
  );
};

export default PaymentModal;
