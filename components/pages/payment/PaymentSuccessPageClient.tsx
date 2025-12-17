'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// Removed useTranslation
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const PaymentSuccessPageClient = () => {
  // Removed useTranslation
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, session } = useAuth();
  const { toast } = useToast();
  
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('Zahlung wird überprüft');

  useEffect(() => {
    const checkoutSessionId = searchParams?.get('session_id');

    if (!checkoutSessionId) {
      setStatus('error');
      setMessage('Zahlungsinformationen fehlen. Sie werden weitergeleitet...');
      setTimeout(() => router.push('/partner/credit-top-up'), 5000);
      return;
    }

    const verifyPayment = async () => {
      try {
        console.log("Verifying payment for session:", checkoutSessionId);
        
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
        } else {
          throw new Error(data.message || 'Payment verification failed');
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
    verifyPayment();
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
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg"
      >
        <motion.div
          key={status}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
        >
          <StatusIcon />
        </motion.div>
        <h1 className="mt-6 text-2xl font-bold text-gray-800">{message}</h1>
        {status === 'verifying' && <p className="mt-2 text-gray-600">Bitte warten Sie, während wir Ihre Zahlung verarbeiten...</p>}
        {status !== 'verifying' && <p className="mt-2 text-gray-600">Sie werden zum Dashboard weitergeleitet...</p>}
      </motion.div>
    </div>
    </>
  );
};

export default PaymentSuccessPageClient;