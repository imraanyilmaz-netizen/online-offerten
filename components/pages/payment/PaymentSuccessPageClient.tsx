'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// Removed useTranslation
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
// framer-motion removed - CSS for better INP
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const PaymentSuccessPageClient = () => {
  // Removed useTranslation
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, session } = useAuth();
  const { toast } = useToast();
  
  const [status, setStatus] = useState('verifying'); // verifying, success, error, pending
  const [message, setMessage] = useState('Zahlung wird überprüft');
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 10; // Maximum 10 retries (50 seconds total)

  useEffect(() => {
    const checkoutSessionId = searchParams?.get('session_id');

    if (!checkoutSessionId) {
      setStatus('error');
      setMessage('Zahlungsinformationen fehlen. Sie werden weitergeleitet...');
      setTimeout(() => router.push('/partner/credit-top-up'), 5000);
      return;
    }

    const verifyPayment = async (currentRetry = 0) => {
      try {
        console.log("Verifying payment for session:", checkoutSessionId, `(Retry ${currentRetry})`);
        
        // ✅ SADECE sessionId gönder - partnerId KALDIRILDI
        const { data, error } = await supabase.functions.invoke('verify-stripe-session', {
          body: { 
            sessionId: checkoutSessionId
          },
        });

        if (error) {
          throw new Error(`Function error: ${error.message}`);
        }

        if (data.error) {
          throw new Error(data.error);
        }

        // Support both response formats: { success: true } and { status: 'success' }
        if (data.success === true || data.status === 'success') {
          setStatus('success');
          setMessage('Zahlung erfolgreich!');
          toast({
            variant: 'success',
            title: 'Erfolg',
            description: 'Ihr Guthaben wurde erfolgreich aufgeladen.',
          });
          
          // ✅ Session'ı yenile (TWINT için önemli)
          try {
            await supabase.auth.refreshSession();
          } catch (refreshError) {
            console.log('Session refresh optional:', refreshError);
          }
          
          setTimeout(() => router.push('/partner/dashboard'), 3000);
        } else if (data.status === 'pending' || (data.success === false && currentRetry < MAX_RETRIES)) {
          // Payment is still pending - retry after a delay
          setStatus('verifying');
          setMessage(`Zahlung wird noch verarbeitet... (${currentRetry + 1}/${MAX_RETRIES})`);
          setRetryCount(currentRetry + 1);
          
          // Retry after 5 seconds
          setTimeout(() => {
            verifyPayment(currentRetry + 1);
          }, 5000);
        } else {
          // Max retries reached or unknown status
          throw new Error(data.message || 'Zahlung konnte nicht verifiziert werden. Bitte kontaktieren Sie den Support.');
        }
      } catch (e: any) {
        console.error('Payment verification failed:', e);
        setStatus('error');
        setMessage(e?.message || 'Zahlungsüberprüfung fehlgeschlagen. Bitte versuchen Sie es erneut.');
        toast({
          variant: 'destructive',
          title: 'Zahlungsfehler',
          description: e instanceof Error ? e.message : String(e) || 'Zahlungsüberprüfung fehlgeschlagen. Bitte versuchen Sie es erneut.',
        });
        setTimeout(() => router.push('/partner/credit-top-up'), 5000);
      }
    };

    // ✅ DOĞRUDAN ÇAĞIR - session kontrolü YOK
    verifyPayment(0);
  }, [searchParams, router, toast]); // Removed t dependency

  const StatusIcon = () => {
    if (status === 'verifying') return <Loader2 className="h-16 w-16 animate-spin text-blue-600" />;
    if (status === 'success') return <CheckCircle className="h-16 w-16 text-green-600" />;
    if (status === 'error') return <AlertTriangle className="h-16 w-16 text-red-600" />;
    return null;
  };

  return (
    <>
      
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div
        className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg"
      >
        <div
          key={status}
        >
          <StatusIcon />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-gray-800">{message}</h1>
        {status === 'verifying' && <p className="mt-2 text-gray-600">Bitte warten Sie, während wir Ihre Zahlung verarbeiten...</p>}
        {status !== 'verifying' && <p className="mt-2 text-gray-600">Sie werden zum Dashboard weitergeleitet...</p>}
      </div>
    </div>
    </>
  );
};

export default PaymentSuccessPageClient;