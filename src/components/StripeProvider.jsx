import React, { lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Lazy load Stripe only when needed
const STRIPE_LIVE_PUBLISHABLE_KEY = "pk_live_51MMZ0AEGiQ7uB78jKJ3ZPtAEdmu7Vs9HReKHvLCCDF2siUBF5OmgqEMWht7APuKAr7tLfoRHwynyHPJZhY4Ootor00xdjw8WqR";

let stripePromise = null;

const loadStripeLazy = async () => {
  if (!stripePromise) {
    const { loadStripe } = await import('@stripe/stripe-js');
    stripePromise = STRIPE_LIVE_PUBLISHABLE_KEY 
      ? loadStripe(STRIPE_LIVE_PUBLISHABLE_KEY)
      : null;
    
    if (!stripePromise) {
      console.error("Stripe Live Publishable Key is not set. Payments will not work.");
    }
  }
  return stripePromise;
};

const StripeElementsWrapper = lazy(async () => {
  const { Elements } = await import('@stripe/react-stripe-js');
  const stripe = await loadStripeLazy();
  
  const Wrapper = ({ children }) => (
    <Elements stripe={stripe}>
      {children}
    </Elements>
  );
  
  return { default: Wrapper };
});

const StripeProvider = ({ children }) => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    }>
      <StripeElementsWrapper>
        {children}
      </StripeElementsWrapper>
    </Suspense>
  );
};

export default StripeProvider;

