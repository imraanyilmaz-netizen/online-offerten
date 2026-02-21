'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useCallback, useRef, useMemo, memo } from 'react';
// framer-motion removed – using CSS transitions for better INP
import { useTranslation } from 'react-i18next'; // i18n geri eklendi - müşteri formu için
import { Button } from '@/components/ui/button';
import Step1_Service from '@/components/NewCustomerForm/Step1_Service';
import Step2_ServiceDetails from '@/components/NewCustomerForm/Step2_ServiceDetails';
import Step2_DetailsAndContact from '@/components/NewCustomerForm/Step2_DetailsAndContact';
import NewQuoteConfirmation from '@/components/NewCustomerForm/NewQuoteConfirmation';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Send, Home as HomeIcon, Loader2, ShieldCheck, Star, Clock, Lock, MapPin, ChevronLeft, ChevronRight, FileText, CheckCircle2 } from 'lucide-react';
import useNewCustomerForm from './useNewCustomerForm';
import useNewFormValidation from './useNewFormValidation';
import { submitNewQuoteToSupabase } from './newFormUtils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from '@/components/ui/alert-dialog';
import { supabase } from '@/lib/supabaseClient';

const TOTAL_FORM_STEPS = 3;

const StarRating = ({ rating, reviewCount, starSize = 16 }) => {
  const { t } = useTranslation('newCustomerForm'); // i18n geri eklendi
  const totalStars = 5;
  const displayRating = Math.round((rating || 0) * 2) / 2;
  const fullStars = Math.floor(displayRating);
  const hasHalfStar = displayRating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={starSize} className="text-yellow-400 fill-yellow-400" />
        ))}
        {hasHalfStar && (
            <div style={{ position: 'relative' }}>
                <Star key="half-empty" size={starSize} className="text-gray-300" />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
                    <Star key="half-full" size={starSize} className="text-yellow-400 fill-yellow-400" />
                </div>
            </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={starSize} className="text-gray-300" />
        ))}
      </div>
      <span className="font-semibold text-gray-800">{(rating || 0).toFixed(1)}</span>
      <a href="/kunden-bewertungen" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 hover:underline transition-colors">({reviewCount} {t('ratings', { count: reviewCount })})</a>
    </div>
  );
};

const TrustBadge = memo(() => {
    const { t } = useTranslation('newCustomerForm'); // i18n geri eklendi
    const [stats, setStats] = useState({ average_rating: 0, review_count: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchRating = async () => {
            try {
                // Sadece platform yorumlarını al
                const [countResult, reviewsResult] = await Promise.all([
                    supabase
                        .from('customer_reviews')
                        .select('*', { count: 'exact', head: true })
                        .eq('approval_status', 'approved')
                        .eq('review_type', 'platform'),
                    supabase
                        .from('customer_reviews')
                        .select('rating')
                        .eq('approval_status', 'approved')
                        .eq('review_type', 'platform')
                ]);

            if (!isMounted) return;
            
                if (!countResult.error && !reviewsResult.error) {
                    const reviewCount = countResult.count || 0;
                    const reviews = reviewsResult.data || [];
                    
                    const averageRating = reviews.length > 0
                        ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
                        : 0;

                setStats({
                        average_rating: averageRating,
                        review_count: reviewCount
                });
            } else {
                    setStats(prev => ({ ...prev, review_count: 0 }));
            }
            } catch (error) {
                if (!isMounted) return;
                setStats(prev => ({ ...prev, review_count: 0 }));
            } finally {
                if (isMounted) {
            setLoading(false);
                }
            }
        };
        fetchRating();
        
        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-center animate-pulse">
                <div className="h-4 bg-green-200 rounded w-3/4"></div>
            </div>
        );
    }

    if (stats.review_count === 0) return null;

    return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <StarRating rating={stats.average_rating} reviewCount={stats.review_count} />
            </div>
        </div>
    );
});

TrustBadge.displayName = 'TrustBadge';

const CustomerForm = ({ initialDataFromProps = {}, formId = "new-customer-form" }) => {
  const { t, i18n } = useTranslation(['newCustomerForm', 'common']); // i18n geri eklendi
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const umzugArtSectionRef = useRef(null);
  const formRef = useRef(null);
  const hasInitializedServiceFromUrl = useRef(false);
  const userManuallySelectedService = useRef(false);
  const hasInitializedAdditionalCleaningFromUrl = useRef(false);
  const userManuallyChangedAdditionalCleaning = useRef(false);
  
  // Memoize searchParams string to prevent unnecessary re-renders
  const searchParamsString = useMemo(() => searchParams?.toString() || '', [searchParams]);
  
  const {
    formData,
    handleChange,
    handleSelectChange,
    handleCheckboxChange,
    handleRadioGroupChange,
    handleServiceSelect,
    handleUmzugArtChange,
    handleHowFoundChange,
    handleQuotesWantedChange,
    resetForm,
    setErrors,
  } = useNewCustomerForm(initialDataFromProps);

  // Initial step: Wenn initialDataFromProps._initialStep gesetzt ist, verwende diesen, sonst aus URL oder 1
  const getInitialStep = () => {
    if (initialDataFromProps._initialStep) {
      return initialDataFromProps._initialStep;
    }
    const params = new URLSearchParams(searchParamsString);
    const stepFromUrl = params.get('step');
    return stepFromUrl === '3' ? 3 : (stepFromUrl === '2' ? 2 : 1);
  };
  
  const [currentStep, setCurrentStep] = useState(getInitialStep());
  const validate = useNewFormValidation(formData);
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStep1Completed, setIsStep1Completed] = useState(false);
  const [isStep2Completed, setIsStep2Completed] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [todayRequests, setTodayRequests] = useState(48);
  const [recentRequests, setRecentRequests] = useState([]);

  // 48 Basis-Anfragen (6 Min. bis 58 Min.)
  const baseRequests = useMemo(() => [
    { type: 'Privatumzug', location: 'Zürich → Bern', timeLabel: 'vor 6 Min.' },
    { type: 'Endreinigung', location: 'in Zürich', timeLabel: 'vor 7 Min.' },
    { type: 'Privatumzug', location: 'Basel → Luzern', timeLabel: 'vor 8 Min.' },
    { type: 'Entsorgung', location: 'in Bern', timeLabel: 'vor 9 Min.' },
    { type: 'Geschäftsumzug', location: 'Zürich → Zug', timeLabel: 'vor 10 Min.' },
    { type: 'Grundreinigung', location: 'in Winterthur', timeLabel: 'vor 11 Min.' },
    { type: 'Privatumzug', location: 'Winterthur → Zürich', timeLabel: 'vor 12 Min.' },
    { type: 'Endreinigung', location: 'in Basel', timeLabel: 'vor 13 Min.' },
    { type: 'Klaviertransport', location: 'Bern → Zürich', timeLabel: 'vor 14 Min.' },
    { type: 'Privatumzug', location: 'St. Gallen → Thun', timeLabel: 'vor 15 Min.' },
    { type: 'Endreinigung', location: 'in Luzern', timeLabel: 'vor 16 Min.' },
    { type: 'Geschäftsumzug', location: 'Bern → Thun', timeLabel: 'vor 17 Min.' },
    { type: 'Privatumzug', location: 'Biel → Solothurn', timeLabel: 'vor 18 Min.' },
    { type: 'Grundreinigung', location: 'in St. Gallen', timeLabel: 'vor 19 Min.' },
    { type: 'Entsorgung', location: 'in Zürich', timeLabel: 'vor 20 Min.' },
    { type: 'Privatumzug', location: 'Aarau → Olten', timeLabel: 'vor 21 Min.' },
    { type: 'Endreinigung', location: 'in Bern', timeLabel: 'vor 22 Min.' },
    { type: 'Privatumzug', location: 'Luzern → Zürich', timeLabel: 'vor 24 Min.' },
    { type: 'Geschäftsumzug', location: 'Basel → Liestal', timeLabel: 'vor 25 Min.' },
    { type: 'Endreinigung', location: 'in Aarau', timeLabel: 'vor 27 Min.' },
    { type: 'Privatumzug', location: 'Thun → Bern', timeLabel: 'vor 28 Min.' },
    { type: 'Entsorgung', location: 'in Luzern', timeLabel: 'vor 30 Min.' },
    { type: 'Klaviertransport', location: 'Luzern → Basel', timeLabel: 'vor 31 Min.' },
    { type: 'Privatumzug', location: 'Zug → Zürich', timeLabel: 'vor 33 Min.' },
    { type: 'Grundreinigung', location: 'in Zürich', timeLabel: 'vor 34 Min.' },
    { type: 'Endreinigung', location: 'in Winterthur', timeLabel: 'vor 35 Min.' },
    { type: 'Privatumzug', location: 'Solothurn → Bern', timeLabel: 'vor 37 Min.' },
    { type: 'Geschäftsumzug', location: 'Winterthur → St. Gallen', timeLabel: 'vor 38 Min.' },
    { type: 'Privatumzug', location: 'Bern → Fribourg', timeLabel: 'vor 39 Min.' },
    { type: 'Entsorgung', location: 'in Basel', timeLabel: 'vor 40 Min.' },
    { type: 'Endreinigung', location: 'in Olten', timeLabel: 'vor 41 Min.' },
    { type: 'Privatumzug', location: 'Zürich → Winterthur', timeLabel: 'vor 42 Min.' },
    { type: 'Grundreinigung', location: 'in Basel', timeLabel: 'vor 43 Min.' },
    { type: 'Privatumzug', location: 'Luzern → Zug', timeLabel: 'vor 44 Min.' },
    { type: 'Endreinigung', location: 'in Thun', timeLabel: 'vor 45 Min.' },
    { type: 'Geschäftsumzug', location: 'Zürich → Aarau', timeLabel: 'vor 46 Min.' },
    { type: 'Privatumzug', location: 'Bern → Zürich', timeLabel: 'vor 47 Min.' },
    { type: 'Entsorgung', location: 'in Winterthur', timeLabel: 'vor 48 Min.' },
    { type: 'Endreinigung', location: 'in Solothurn', timeLabel: 'vor 50 Min.' },
    { type: 'Privatumzug', location: 'Olten → Aarau', timeLabel: 'vor 51 Min.' },
    { type: 'Grundreinigung', location: 'in Bern', timeLabel: 'vor 52 Min.' },
    { type: 'Privatumzug', location: 'Fribourg → Bern', timeLabel: 'vor 53 Min.' },
    { type: 'Klaviertransport', location: 'Zürich → Bern', timeLabel: 'vor 54 Min.' },
    { type: 'Endreinigung', location: 'in Zug', timeLabel: 'vor 55 Min.' },
    { type: 'Privatumzug', location: 'Basel → Zürich', timeLabel: 'vor 56 Min.' },
    { type: 'Entsorgung', location: 'in St. Gallen', timeLabel: 'vor 57 Min.' },
    { type: 'Geschäftsumzug', location: 'Luzern → Zug', timeLabel: 'vor 58 Min.' },
    { type: 'Privatumzug', location: 'St. Gallen → Zürich', timeLabel: 'vor 59 Min.' },
  ], []);

  // Heutige echte Anfragen aus Supabase laden + mit Basis-Anfragen zusammenführen
  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayISO = today.toISOString();

        const [countResult, recentResult] = await Promise.all([
          supabase
            .from('quotes')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', todayISO),
          supabase
            .from('quotes')
            .select('servicetype, from_city, to_city, created_at')
            .gte('created_at', todayISO)
            .order('created_at', { ascending: false })
            .limit(15)
        ]);

        // Heutige Anzahl setzen (Basis 48 + echte heutige Anfragen)
        if (!countResult.error && countResult.count !== null) {
          setTodayRequests(48 + countResult.count);
        }

        // Echte heutige Anfragen formatieren
        const realRequests = [];
        if (!recentResult.error && recentResult.data && recentResult.data.length > 0) {
          recentResult.data.forEach((q) => {
            const now = new Date();
            const created = new Date(q.created_at);
            const diffMs = now - created;
            const diffMin = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);

            let timeLabel;
            if (diffMin < 1) timeLabel = 'gerade eben';
            else if (diffMin < 60) timeLabel = `vor ${diffMin} Min.`;
            else if (diffHours < 24) timeLabel = `vor ${diffHours} Std.`;
            else timeLabel = `vor ${Math.floor(diffHours / 24)} Tag(en)`;

            let location = '';
            if (q.from_city && q.to_city && q.from_city !== q.to_city) {
              location = `${q.from_city} → ${q.to_city}`;
            } else if (q.from_city) {
              location = `in ${q.from_city}`;
            } else if (q.to_city) {
              location = `in ${q.to_city}`;
            }

            realRequests.push({
              type: q.servicetype || 'Anfrage',
              location,
              timeLabel,
            });
          });
        }

        // Echte Anfragen zuerst, dann die 48 Basis-Anfragen
        setRecentRequests([...realRequests, ...baseRequests]);
      } catch (err) {
        console.error('Fehler beim Laden der Anfragen:', err);
        // Fallback: nur Basis-Anfragen anzeigen
        setRecentRequests(baseRequests);
      }
    };
    fetchData();
  }, [baseRequests]);

  // Auto-slide ticker
  useEffect(() => {
    if (recentRequests.length === 0) return;
    const ticker = setInterval(() => {
      setTickerIndex(prev => (prev + 1) % recentRequests.length);
    }, 3500);
    return () => clearInterval(ticker);
  }, [recentRequests.length]);
  
  // beforeunload event'ini kaldırdık - tarayıcının varsayılan dialog'u yerine özel popup kullanıyoruz

  // URL'den step parametresini kontrol et - tek bir useEffect ile tüm step geçişlerini yönet
  useEffect(() => {
    const params = new URLSearchParams(searchParamsString);
    const stepFromUrl = params.get('step');
    const serviceFromUrl = params.get('service');
    
    // Sadece URL gerçekten değiştiğinde işlem yap (currentStep ile karşılaştır)
    const targetStep = stepFromUrl === '3' ? 3 : (stepFromUrl === '2' ? 2 : 1);
    
    // Eğer zaten doğru step'teysek, hiçbir şey yapma (gereksiz re-render'ları önle)
    if (currentStep === targetStep) {
      return;
    }
    
    // Step 2 veya 3'e geçiş kontrolü
    if (stepFromUrl === '2' || stepFromUrl === '3') {
      // Wenn _initialStep gesetzt ist (z.B. vom Rechner), direkt zu diesem Schritt springen
      if (initialDataFromProps._initialStep && initialDataFromProps._initialStep === targetStep) {
        if (formData.service && currentStep !== targetStep) {
          setCurrentStep(targetStep);
        }
        return;
      }
      
      // Wenn Service in URL ist und formData.service noch nicht gesetzt ist, warte kurz
      if (serviceFromUrl && !formData.service) {
        // Service wird in einem anderen useEffect gesetzt, warte darauf
        return;
      }
      
      if (isStep1Completed && currentStep !== targetStep) {
        // Step 1 tamamlandıysa und doğru step'te değilsek, hedef step'e geç
        setCurrentStep(targetStep);
      } else if (!isStep1Completed && formData.service) {
        // Service ist gesetzt, aber Step 1 noch nicht validiert - prüfe nochmal
        const { isValid } = validate(1);
        if (isValid) {
          setCurrentStep(targetStep);
        } else {
          // Step 1 tamamlanmadıysa, step 2/3'e erişimi engelle und step 1'e yönlendir
          const newParams = new URLSearchParams(searchParamsString);
          newParams.delete('step');
          // Service-Parameter beibehalten
          if (formData.service) {
            newParams.set('service', formData.service);
          }
          router.push(`${pathname}?${newParams.toString()}`, { replace: true, scroll: false });
          setCurrentStep(1);
        }
      } else if (!isStep1Completed) {
        // Step 1 tamamlanmadıysa, step 2/3'e erişimi engelle und step 1'e yönlendir
        const newParams = new URLSearchParams(searchParamsString);
        newParams.delete('step');
        // Service-Parameter beibehalten, wenn er bereits in der URL ist
        if (formData.service) {
          newParams.set('service', formData.service);
        }
        router.push(`${pathname}?${newParams.toString()}`, { replace: true, scroll: false });
        setCurrentStep(1);
      }
    } 
    // Step 1'e geçiş kontrolü (URL'de step yoksa veya step=1 ise)
    else if ((!stepFromUrl || stepFromUrl === '1') && currentStep !== 1) {
      setCurrentStep(1);
    }
  }, [searchParamsString, isStep1Completed, currentStep, pathname, router, formData.service, validate]);

  const updateUrlStep = useCallback((step, replace = true) => {
    const params = new URLSearchParams(searchParamsString);
    if (step > 1) {
      params.set('step', step);
    } else {
      params.delete('step');
    }
    // Service-Parameter beibehalten
    if (formData.service) {
      params.set('service', formData.service);
    }
    // umzugArt / reinigungArt / malerArt / raeumungArt Parameter beibehalten
    if (formData.umzugArt) {
      const serviceArtParamMap = {
        umzug: 'umzugArt',
        reinigung: 'reinigungArt',
        maler: 'malerArt',
        raeumung: 'raeumungArt',
      };
      const paramName = serviceArtParamMap[formData.service] || 'umzugArt';
      params.set(paramName, formData.umzugArt);
    }
    // Sub-Parameter für Seitenaktualisierung beibehalten
    params.delete('special_transport_type');
    params.delete('raeumung_scope');
    if (formData.special_transport_type && formData.umzugArt === 'spezialtransport') {
      params.set('special_transport_type', formData.special_transport_type);
    }
    if (formData.raeumung_scope && formData.service === 'raeumung' && formData.umzugArt === 'raeumung') {
      params.set('raeumung_scope', formData.raeumung_scope);
    }
    router.push(`${pathname}?${params.toString()}`, { replace, scroll: false });
  }, [searchParamsString, pathname, router, formRef, formData.service, formData.umzugArt, formData.special_transport_type, formData.raeumung_scope]);

  const scrollToFormTop = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  const handleConfirmExit = () => {
    const navigationPath = pendingNavigation;
    setShowExitDialog(false);
      setPendingNavigation(null);
    
    // Kısa bir delay ile navigation yap ki dialog kapanma animasyonu tamamlansın
    setTimeout(() => {
      if (navigationPath) {
        // Belirli bir path varsa oraya git
        router.push(navigationPath);
      } else {
        // Formdan tamamen çık - önceki sayfaya git
        const referrer = document.referrer;
        if (referrer && referrer.includes(window.location.origin)) {
          // Referrer aynı origin'de ise, path'i parse et ve router.push kullan
          try {
            const referrerUrl = new URL(referrer);
            const referrerPath = referrerUrl.pathname + referrerUrl.search;
            router.push(referrerPath);
          } catch (e) {
            // URL parse hatası olursa ana sayfaya git
            router.push('/');
          }
    } else {
          // Referrer yoksa veya farklı origin'de ise ana sayfaya git
          router.push('/');
        }
    }
    }, 100);
  };

  const handleStayInForm = () => {
    setShowExitDialog(false);
    setPendingNavigation(null);
  };

  const scrollToUmzugArt = useCallback(() => {
    if (umzugArtSectionRef.current) {
      requestAnimationFrame(() => {
        umzugArtSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [umzugArtSectionRef]);

  // Ref to track if user manually changed umzugArt
  const userManuallySelectedUmzugArt = useRef(false);
  const hasInitializedUmzugArtFromUrl = useRef(false);
  
  // Helper function to get the correct URL parameter name based on service
  const getServiceArtParamName = useCallback((service) => {
    switch (service) {
      case 'umzug':
        return 'umzugArt';
      case 'reinigung':
        return 'reinigungArt';
      case 'maler':
        return 'malerArt';
      case 'raeumung':
        return 'raeumungArt';
      default:
        return 'umzugArt'; // Default fallback
    }
  }, []);
  
  const memoizedHandleServiceSelect = useCallback((serviceId, isFromUrl = false) => {
    handleServiceSelect(serviceId, isFromUrl);
    
    // Kullanıcı manuel seçim yaptıysa flag'i set et (URL'den otomatik seçim değilse)
    if (!isFromUrl) {
      userManuallySelectedService.current = true;
      // Wenn Service geändert wird, umzugArt Refs zurücksetzen, damit URL wieder gelesen werden kann
      userManuallySelectedUmzugArt.current = false;
      hasInitializedUmzugArtFromUrl.current = false;
    }
    
    // URL'den okuma yapılıyorsa (sayfa yenileme), URL'yi değiştirme
    // Çünkü URL zaten doğru parametrelere sahip
    if (isFromUrl) {
      return;
    }
    
    const params = new URLSearchParams(searchParamsString);
    params.set('service', serviceId);
    
    // Remove all service art parameters when service changes
    params.delete('umzugArt');
    params.delete('reinigungArt');
    params.delete('malerArt');
    params.delete('raeumungArt');
    
    if(currentStep > 1) params.delete('step');
    const newUrl = `${pathname}?${params.toString()}`;
    // router.replace kullan ki URL değişikliği görünsün ama history'ye entry eklenmesin
    router.replace(newUrl);
    
    if (serviceId === 'umzug') {
      setTimeout(scrollToUmzugArt, 50); 
    }
  }, [scrollToUmzugArt, handleServiceSelect, pathname, currentStep, searchParamsString, router]);

  // Memoized handleUmzugArtChange that updates URL
  const memoizedHandleUmzugArtChange = useCallback((umzugArtValue, isFromUrl = false) => {
    handleUmzugArtChange(umzugArtValue);
    
    // Mark that user manually selected umzugArt (if not from URL)
    if (!isFromUrl) {
      userManuallySelectedUmzugArt.current = true;
    }
    
    // URL'den okuma yapılıyorsa (sayfa yenileme), URL'yi değiştirme
    // Çünkü URL zaten doğru parametrelere sahip
    if (isFromUrl) {
      return;
    }
    
    // Update URL with service-specific parameter name
    const params = new URLSearchParams(searchParamsString);
    
    // Remove all service art parameters to avoid conflicts
    params.delete('umzugArt');
    params.delete('reinigungArt');
    params.delete('malerArt');
    params.delete('raeumungArt');
    // Remove sub-parameters (they belong to old umzugArt)
    params.delete('special_transport_type');
    params.delete('raeumung_scope');
    
    // Set the correct parameter for current service
    const paramName = getServiceArtParamName(formData.service);
    if (paramName && umzugArtValue) {
      params.set(paramName, umzugArtValue);
    }
    
    // Keep service and step in URL
    if (formData.service) {
      params.set('service', formData.service);
    }
    if (currentStep > 1) {
      params.set('step', currentStep.toString());
    }
    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl);
  }, [handleUmzugArtChange, pathname, currentStep, searchParamsString, router, formData.service, getServiceArtParamName]);


  // URL'den service parametresini sadece ilk yüklemede oku
  // Kullanıcı manuel seçim yaptığında URL güncellenir ama tekrar URL'den okuma yapılmaz
  useEffect(() => {
    // Eğer kullanıcı zaten manuel seçim yaptıysa, URL'den okuma yapma
    if (userManuallySelectedService.current) {
      return;
    }
    
    // Sadece ilk yüklemede ve daha önce URL'den okuma yapılmadıysa çalış
    if (hasInitializedServiceFromUrl.current) {
      return;
    }
    
    const params = new URLSearchParams(searchParamsString);
    const serviceFromUrl = params.get('service');
    
    if (serviceFromUrl && serviceFromUrl !== formData.service) {
      handleServiceSelect(serviceFromUrl, true);
      hasInitializedServiceFromUrl.current = true;
    } else if (!serviceFromUrl) {
      // URL'de service yoksa bile flag'i true yap, tekrar kontrol etme
      hasInitializedServiceFromUrl.current = true;
    }
  }, [searchParamsString, formData.service, handleServiceSelect]);

  // URL'den servise özel art parametresini oku ve otomatik setzen
  useEffect(() => {
    // Service seçilmemişse, art parametresi okuma
    if (!formData.service) {
      return;
    }
    
    // Eğer kullanıcı zaten manuel seçim yaptıysa, URL'den okuma yapma
    if (userManuallySelectedUmzugArt.current) {
      return;
    }
    
    // Sadece ilk yüklemede ve daha önce URL'den okuma yapılmadıysa çalış
    if (hasInitializedUmzugArtFromUrl.current) {
      return;
    }
    
    const params = new URLSearchParams(searchParamsString);
    const paramName = getServiceArtParamName(formData.service);
    
    if (!paramName) {
      hasInitializedUmzugArtFromUrl.current = true;
      return;
    }
    
    // Servise özel parametreyi oku
    const artValueFromUrl = params.get(paramName);
    
    if (artValueFromUrl && artValueFromUrl !== formData.umzugArt) {
      memoizedHandleUmzugArtChange(artValueFromUrl, true);
      hasInitializedUmzugArtFromUrl.current = true;
    } else if (!artValueFromUrl) {
      // URL'de parametre yoksa bile flag'i true yap, tekrar kontrol etme
      hasInitializedUmzugArtFromUrl.current = true;
    }
  }, [searchParamsString, formData.service, formData.umzugArt, memoizedHandleUmzugArtChange, getServiceArtParamName]);

  // umzugArt değiştiğinde additional_cleaning flag'lerini sıfırla
  useEffect(() => {
    // umzugArt değiştiğinde, yeni seçim için additional_cleaning flag'lerini sıfırla
    hasInitializedAdditionalCleaningFromUrl.current = false;
    // Eğer yeni umzugArt privatumzug veya geschaeftsumzug değilse, kullanıcı manuel değiştirmiş sayılabilir
    if (formData.umzugArt && 
        formData.umzugArt !== 'privatumzug' && 
        formData.umzugArt !== 'geschaeftsumzug') {
      userManuallyChangedAdditionalCleaning.current = false;
    }
  }, [formData.umzugArt]);

  // Service değiştiğinde umzugArt URL okuma flag'ini sıfırla
  useEffect(() => {
    // Service değiştiğinde, yeni servis için URL'den umzugArt okunabilmesi için flag'i sıfırla
    hasInitializedUmzugArtFromUrl.current = false;
  }, [formData.service]);

  // URL'den special_transport_type parametresini oku ve otomatik setzen
  useEffect(() => {
    const params = new URLSearchParams(searchParamsString);
    const specialTransportTypeFromUrl = params.get('special_transport_type');
    
    // Nur wenn service=umzug, umzugArt=spezialtransport ist und special_transport_type in URL vorhanden ist
    if (formData.service === 'umzug' && formData.umzugArt === 'spezialtransport' && specialTransportTypeFromUrl && specialTransportTypeFromUrl !== formData.special_transport_type) {
      handleRadioGroupChange('special_transport_type', specialTransportTypeFromUrl);
    }
  }, [searchParamsString, formData.service, formData.umzugArt, formData.special_transport_type, handleRadioGroupChange]);

  // URL'den raeumung_scope parametresini oku ve otomatik setzen
  useEffect(() => {
    const params = new URLSearchParams(searchParamsString);
    const raeumungScopeFromUrl = params.get('raeumung_scope');
    
    // Nur wenn service=raeumung, raeumungArt=raeumung ist und raeumung_scope in URL vorhanden ist
    if (formData.service === 'raeumung' && formData.umzugArt === 'raeumung' && raeumungScopeFromUrl && raeumungScopeFromUrl !== formData.raeumung_scope) {
      handleRadioGroupChange('raeumung_scope', raeumungScopeFromUrl);
    }
  }, [searchParamsString, formData.service, formData.umzugArt, formData.raeumung_scope, handleRadioGroupChange]);

  // URL'den additional_cleaning parametresini oku ve otomatik setzen
  useEffect(() => {
    // Eğer kullanıcı zaten manuel değişiklik yaptıysa, URL'den okuma yapma
    if (userManuallyChangedAdditionalCleaning.current) {
      return;
    }
    
    // Sadece ilk yüklemede ve daha önce URL'den okuma yapılmadıysa çalış
    if (hasInitializedAdditionalCleaningFromUrl.current) {
      return;
    }
    
    const params = new URLSearchParams(searchParamsString);
    const additionalCleaningFromUrl = params.get('additional_cleaning');
    
    // Nur wenn service=umzug, umzugArt=privatumzug veya geschaeftsumzug ise ve additional_cleaning=true ise
    if (formData.service === 'umzug' && 
        (formData.umzugArt === 'privatumzug' || formData.umzugArt === 'geschaeftsumzug') && 
        additionalCleaningFromUrl === 'true' && 
        !formData.additional_cleaning) {
      handleCheckboxChange('additional_cleaning', true);
      hasInitializedAdditionalCleaningFromUrl.current = true;
    }
    // Eğer umzugArt privatumzug veya geschaeftsumzug değilse ve additional_cleaning true ise, false yap
    else if (formData.service === 'umzug' && 
             formData.umzugArt && 
             formData.umzugArt !== 'privatumzug' && 
             formData.umzugArt !== 'geschaeftsumzug' && 
             formData.additional_cleaning) {
      handleCheckboxChange('additional_cleaning', false);
      hasInitializedAdditionalCleaningFromUrl.current = true;
    } else if (!additionalCleaningFromUrl) {
      // URL'de parametre yoksa bile flag'i true yap, tekrar kontrol etme
      hasInitializedAdditionalCleaningFromUrl.current = true;
    }
  }, [searchParamsString, formData.service, formData.umzugArt, formData.additional_cleaning, handleCheckboxChange]);

  // Additional cleaning checkbox'ı manuel değiştirildiğinde flag'i set et
  const handleAdditionalCleaningChange = useCallback((checked) => {
    userManuallyChangedAdditionalCleaning.current = true;
    handleCheckboxChange('additional_cleaning', checked);
  }, [handleCheckboxChange]);

  // URL'den from_plz ve from_city parametrelerini oku ve ilk adres alanlarına otomatik doldur
  useEffect(() => {
    const params = new URLSearchParams(searchParamsString);
    const fromPlzFromUrl = params.get('from_plz');
    const fromCityFromUrl = params.get('from_city');
    
    // Eğer URL'de from_plz varsa ve formData'da henüz set edilmemişse, set et
    if (fromPlzFromUrl && fromPlzFromUrl !== formData.from_zip) {
      handleChange({ target: { name: 'from_zip', value: fromPlzFromUrl } });
    }
    
    // Eğer URL'de from_city varsa ve formData'da henüz set edilmemişse, set et
    if (fromCityFromUrl && fromCityFromUrl !== formData.from_city) {
      handleChange({ target: { name: 'from_city', value: fromCityFromUrl } });
    }
  }, [searchParamsString, formData.from_zip, formData.from_city, handleChange]); 

  // Check if Step 1 is completed whenever formData changes - memoized for performance
  // Step 1: Nur Hauptservice-Auswahl
  const step1ValidationResult = useMemo(() => {
    return validate(1);
  }, [
    formData.service,
    validate
  ]);

  useEffect(() => {
    setIsStep1Completed(step1ValidationResult.isValid);
  }, [step1ValidationResult.isValid]);

  // Check if Step 2 is completed whenever formData changes
  const step2ValidationResult = useMemo(() => {
    return validate(2);
  }, [
    formData.service,
    formData.umzugArt, 
    formData.special_transport_type, 
    formData.special_transport_other_details, 
    formData.cleaning_frequency, 
    formData.what_to_clean, 
    formData.estimated_area, 
    formData.floor_types, 
    formData.floor_area, 
    formData.fassadenreinigung_flaeche, 
    formData.fassadenreinigung_erreichbarkeit, 
    formData.fassadenreinigung_verschmutzung, 
    formData.fensterreinigung_anzahl, 
    formData.fensterreinigung_scope, 
    formData.fensterreinigung_zugang, 
    formData.raeumung_scope, 
    formData.what_to_paint, 
    validate
  ]);

  useEffect(() => {
    setIsStep2Completed(step2ValidationResult.isValid);
  }, [step2ValidationResult.isValid]);

  const handleNextStep = () => {
    if (currentStep < TOTAL_FORM_STEPS) {
      const { isValid, errors } = validate(currentStep);
      if (isValid) {
        setErrors({}); 
        // Step 2'ye geçerken history'ye entry ekle (geri tuşu için)
        if (currentStep === 1) {
          updateUrlStep(currentStep + 1, false);
          setTimeout(() => {
            scrollToFormTop();
          }, 100);
        } else {
          updateUrlStep(currentStep + 1);
          setTimeout(() => {
            scrollToFormTop();
          }, 100);
        }
      } else {
        setErrors(errors);
        toast({ title: t('errors.validationErrorTitle'), description: t('errors.validationErrorDescription'), variant: "destructive" });
        const firstErrorKey = Object.keys(errors)[0];
        if (firstErrorKey) {
            const errorElement = document.querySelector(`[name="${firstErrorKey}"], [id*="${firstErrorKey}"]`);
            errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setErrors({});
      updateUrlStep(currentStep - 1);
      // Scroll yapma - form konumunda kal
    }
  };

  // Bu useEffect kaldırıldı - step kontrolü yukarıdaki tek useEffect'te yapılıyor
  // Geri tuşu ile step 1'e dönüş, yukarıdaki useEffect tarafından handle ediliyor

  // Browser geri tuşu ile formdan çıkış kontrolü
  // Sadece Step 1'de ve formdan tamamen çıkışta uyarı ver
  useEffect(() => {
    if (isSubmitted) return;
    
    // Step 2'deyken history manipulation yapma - normal navigation'a izin ver
    // Step 2'den Step 1'e geçiş için başka bir useEffect handle ediyor
    if (currentStep === 2) {
      return;
    }
    
    // Sadece Step 1'deyken history manipulation yap
    if (currentStep !== 1) {
      return;
    }
    
    const handlePopState = (e) => {
      // Step 1'de ve form doluysa uyarı ver (formdan tamamen çıkış)
      const hasFormData = formData.service || formData.email || formData.firstName;
      if (hasFormData && !showExitDialog) {
        e.preventDefault();
        window.history.pushState(null, '', window.location.href);
        setPendingNavigation(null);
        setShowExitDialog(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    // History'ye bir entry ekle ki popstate event'i tetiklensin (sadece Step 1'de)
    window.history.pushState(null, '', window.location.href);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isSubmitted, currentStep, formData.service, formData.email, formData.firstName, showExitDialog]);


  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validate('all');
    setErrors(errors); 

    if (!isValid) {
      console.error("Form submission validation failed. Errors:", errors);
      toast({ title: t('errors.validationErrorTitle'), description: t('errors.validationErrorDescription'), variant: "destructive" });
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        let errorElement;
        if (firstErrorKey.includes('.')) {
          const baseName = firstErrorKey.split('.')[0];
          errorElement = document.querySelector(`[name^="${baseName}"]`);
        } else {
          errorElement = document.querySelector(`[name="${firstErrorKey}"]`);
        }
        errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsLoading(true);
    try {
      // Admin Panel'e Almanca olarak gönderilmeli, i18n instance'ını geçir
      const { error } = await submitNewQuoteToSupabase(formData, t, i18n);
      if (error) throw error;
      setIsSubmitted(true);
      
      // Google Tag Manager - Dönüşüm Event'i (Conversion Tracking)
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'form_submission',
          form_type: 'offerte_anfrage',
          service_type: formData.serviceType || '',
          from_city: formData.fromCity || '',
          to_city: formData.toCity || '',
          currency: 'CHF'
        });
      }
      
      toast({ title: t('quoteConfirmation.title'), description: t('quoteConfirmation.subtitle') });
      // Teşekkür mesajının görünmesi için formun bulunduğu konuma scroll et
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast({ title: t('errors.submissionErrorTitle'), description: `${t('errors.submissionErrorDescription')} ${error.message}`, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const resetFormAndSteps = useCallback(() => {
    setIsSubmitted(false);
    updateUrlStep(1);
    setErrors({});
    resetForm();
    const params = new URLSearchParams(searchParamsString);
    params.delete('step');
    router.push(`${pathname}?${params.toString()}`, { replace: true });
  }, [updateUrlStep, setErrors, resetForm, searchParamsString, pathname, router]);
  
  const getStepTitle = () => {
    switch (currentStep) {
        case 1:
            return t('step1.headerTitle');
        case 2:
            // Dynamischer Titel basierend auf dem ausgewählten Service
            switch (formData.service) {
                case 'umzug':
                    return t('step1.moveTypeSelectionTitle');
                case 'reinigung':
                    return t('step1.cleaningTypeSelectionTitle');
                case 'maler':
                    return t('step1.painterTypeSelectionTitle');
                case 'raeumung':
                    return t('step1.entsorgungTypeSelectionTitle');
                default:
                    return t('step1.moveTypeSelectionTitle') || 'Welche Art planen Sie?';
            }
        case 3:
            return t('step2.headerTitleNew');
        default:
            return '';
    }
  };

  const stepTitle = getStepTitle();
  
  // Get selected service names for Step 3
  const getSelectedServiceText = () => {
    if (currentStep !== 3) return null;
    
    const services = [];
    
    // Main service
    if (formData.service === 'umzug' && formData.umzugArt) {
      let umzugArtLabel = '';
      switch (formData.umzugArt) {
        case 'privatumzug':
          umzugArtLabel = t('step1.privateMoveLabel');
          break;
        case 'geschaeftsumzug':
          umzugArtLabel = t('step1.businessMoveLabel');
          break;
        case 'international':
          umzugArtLabel = t('step1.internationalMoveLabel');
          break;
        case 'spezialtransport':
          if (formData.special_transport_type) {
            // Map special_transport_type to translation key
            const transportTypeMap = {
              'klaviertransport': 'specialTransportTypePiano',
              'tresortransport': 'specialTransportTypeSafe',
              'maschinen_geraete': 'specialTransportTypeMachine',
              'sonstiges': 'specialTransportTypeOther'
            };
            const translationKey = transportTypeMap[formData.special_transport_type];
            if (translationKey) {
              umzugArtLabel = t(`step1.${translationKey}`);
              // Fallback if translation not found
              if (umzugArtLabel === `step1.${translationKey}`) {
                umzugArtLabel = t('step1.specialTransportLabel');
              }
            } else {
              umzugArtLabel = t('step1.specialTransportLabel');
            }
          } else {
            umzugArtLabel = t('step1.specialTransportLabel');
          }
          break;
        case 'kleintransport':
          umzugArtLabel = t('step1.kleintransportLabel');
          break;
        case 'lagerung':
          umzugArtLabel = t('step1.lagerungLabel');
          break;
        default:
          umzugArtLabel = t('step1.mainServiceMove');
      }
      if (umzugArtLabel) services.push(umzugArtLabel);
    } else if (formData.service === 'reinigung' && formData.umzugArt) {
      const cleaningLabel = t(`step1.cleaningOptions.${formData.umzugArt}`);
      // Check if translation was found (not the key itself)
      if (cleaningLabel && cleaningLabel !== `step1.cleaningOptions.${formData.umzugArt}`) {
        services.push(cleaningLabel);
      } else {
        // Fallback to main cleaning service
        services.push(t('step1.mainServiceCleaning'));
      }
    } else if (formData.service === 'maler' && formData.umzugArt) {
      // Für Privat ve Für Gewerbe yerine her ikisi için de Malerarbeit kullan
      services.push(t('step1.mainServicePainter'));
    } else if (formData.service === 'raeumung' && formData.umzugArt) {
      // entsorgungType keys: entsorgungTypeRaeumungLabel, entsorgungTypeEntsorgungLabel
      let disposalLabel = '';
      if (formData.umzugArt === 'raeumung') {
        disposalLabel = t('step1.entsorgungTypeRaeumungLabel');
      } else if (formData.umzugArt === 'entsorgung') {
        disposalLabel = t('step1.entsorgungTypeEntsorgungLabel');
      }
      if (disposalLabel && disposalLabel !== 'step1.entsorgungTypeRaeumungLabel' && disposalLabel !== 'step1.entsorgungTypeEntsorgungLabel') {
        services.push(disposalLabel);
      } else {
        services.push(t('step1.mainServiceDisposal'));
      }
    } else if (formData.service) {
      // Fallback to main service name
      const mainServiceKey = `step1.mainService${formData.service.charAt(0).toUpperCase() + formData.service.slice(1)}`;
      const mainServiceLabel = t(mainServiceKey);
      if (mainServiceLabel && mainServiceLabel !== mainServiceKey) {
        services.push(mainServiceLabel);
      }
    }
    
    // Additional cleaning service (if selected) - only for privatumzug and geschaeftsumzug
    if (formData.service === 'umzug' && 
        formData.additional_cleaning && 
        (formData.umzugArt === 'privatumzug' || formData.umzugArt === 'geschaeftsumzug')) {
      services.push('Endreinigung');
    }
    
    if (services.length === 0) return null;
    
    if (services.length === 1) {
      return `Offerten für ${services[0]}`;
    } else {
      return `Offerten für ${services.join(' und ')}`;
    }
  };
  
  const selectedServiceText = getSelectedServiceText();
  
  const handleNavigateHome = () => {
    setPendingNavigation('/');
    setShowExitDialog(true);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1_Service 
                  formData={formData} 
                  handleServiceSelect={memoizedHandleServiceSelect} 
                  handleUmzugArtChange={memoizedHandleUmzugArtChange} 
                  handleRadioGroupChange={handleRadioGroupChange}
                  handleChange={handleChange}
                  handleCheckboxChange={handleCheckboxChange}
                  handleSelectChange={handleSelectChange}
                  errors={formData.errors} 
                  umzugArtSectionRef={umzugArtSectionRef}
                />;
      case 2:
        return (
          <div className={!isStep1Completed ? 'pointer-events-none opacity-50' : ''}>
            <Step2_ServiceDetails 
              formData={formData} 
              handleUmzugArtChange={handleUmzugArtChange} 
              handleRadioGroupChange={handleRadioGroupChange}
              handleChange={handleChange}
              handleCheckboxChange={handleCheckboxChange}
              handleAdditionalCleaningChange={handleAdditionalCleaningChange}
              handleSelectChange={handleSelectChange}
              errors={formData.errors} 
              umzugArtSectionRef={umzugArtSectionRef}
            />
          </div>
        );
      case 3:
        return (
          <div className={(!isStep1Completed || !isStep2Completed) ? 'pointer-events-none opacity-50' : ''}>
            <Step2_DetailsAndContact 
              formData={formData} 
              handleChange={handleChange} 
              handleSelectChange={handleSelectChange} 
              handleCheckboxChange={handleCheckboxChange}
              handleRadioGroupChange={handleRadioGroupChange}
              handleHowFoundChange={handleHowFoundChange}
              handleQuotesWantedChange={handleQuotesWantedChange}
              errors={formData.errors} 
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return <NewQuoteConfirmation onResetForm={resetFormAndSteps} />;
  }
  
  const progressPercentage = ((currentStep) / TOTAL_FORM_STEPS) * 100;

  const submitButtonText = isLoading 
    ? t('submittingButton') 
    : `${formData.quotes_wanted} ${formData.quotes_wanted === '1' ? t('step3.quotesWantedOptionSingular') : t('step3.quotesWantedOptionPlural')} ${t('submitButtonSuffix')}`;


  return (
    <div 
      id={formId}
      ref={formRef}
      className="w-full max-w-6xl mx-auto py-3 sm:py-4 md:py-5 px-2 sm:px-0"
    >
      <div className="px-4 sm:px-6 md:px-8 mb-3">
        <TrustBadge />
      </div>

      <div className="text-center p-2 sm:p-3 md:p-4">
        <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium">{stepTitle}</p>
        {selectedServiceText && (
          <p className="text-xs sm:text-sm text-gray-500 mt-1">{selectedServiceText}</p>
        )}
      </div>

      <div className="p-2 sm:p-3">
          <div className="flex justify-between items-center mb-1.5 sm:mb-2 px-1 sm:px-2">
              <span className="text-xs text-gray-500">{t('stepProgress', { currentStep, totalSteps: TOTAL_FORM_STEPS })}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
              <div 
              className="bg-green-500 h-full rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
              />
          </div>
      </div>
      
      <form onSubmit={handleSubmitForm} className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 border border-gray-200 rounded-xl shadow-lg bg-white" noValidate>
        <div
          key={currentStep}
          className={`transition-opacity duration-300 ease-in-out ${(currentStep === 2 && !isStep1Completed) || (currentStep === 3 && (!isStep1Completed || !isStep2Completed)) ? 'pointer-events-none opacity-50' : ''}`}
        >
          {renderStepContent()}
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-between items-center pt-4 sm:pt-6 border-t border-gray-200 gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>Kostenlos - Unverbindlich</span>
          </div>
          
          <div className="flex-grow sm:block hidden"></div>

          {currentStep < TOTAL_FORM_STEPS && (
            <Button 
              type="button" 
              onClick={handleNextStep} 
              className="bg-green-500 hover:bg-green-600 text-white group w-full sm:w-auto py-2.5 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={(currentStep === 1 && !isStep1Completed) || (currentStep === 2 && !isStep2Completed)}
            >
                {t('nextButton')}
                <ArrowLeft className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 rotate-180" />
            </Button>
          )}
          
          {currentStep === TOTAL_FORM_STEPS && (
            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white group w-full sm:w-auto py-2.5 text-sm sm:text-base" disabled={isLoading}>
              {submitButtonText}
              {isLoading ? <Loader2 className="w-4 h-4 ml-2 animate-spin" /> : <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />}
            </Button>
          )}

        </div>
      </form>
      
      {/* Zurück zur Startseite - jetzt nur in Step 1 im Button-Bereich sichtbar */}

      {/* Neueste Anfragen Ticker */}
      <div className="mt-6 border-t border-gray-100 bg-gray-50 overflow-hidden">
        {recentRequests.length > 0 && (
        <>
        <div className="py-3 px-4 sm:px-8">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Neueste Anfragen</p>
            <div className="flex items-center gap-1">
              <button 
                type="button"
                onClick={() => setTickerIndex(prev => prev === 0 ? recentRequests.length - 1 : prev - 1)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors text-gray-400 hover:text-gray-600"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                type="button"
                onClick={() => setTickerIndex(prev => (prev + 1) % recentRequests.length)}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors text-gray-400 hover:text-gray-600"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="relative h-14 sm:h-12">
          <div
            key={tickerIndex}
            className="absolute inset-0 flex items-center px-4 sm:px-8 transition-opacity duration-300 ease-in-out"
          >
            <div className="flex items-center justify-between w-full max-w-4xl mx-auto bg-white rounded-lg border border-gray-100 px-4 py-2.5 shadow-sm">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-green-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{recentRequests[tickerIndex]?.type}</p>
                  <p className="text-xs text-gray-500 truncate">{recentRequests[tickerIndex]?.location}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0 ml-3">{recentRequests[tickerIndex]?.timeLabel}</span>
            </div>
          </div>
        </div>
        </>
        )}
        <div className="py-3 px-4 sm:px-8 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-gray-500 max-w-4xl mx-auto">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-xs">Letzte Anfrage vor <span className="font-semibold text-green-600">6</span> Min.</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-xs">Es wurden heute <span className="font-semibold text-green-600">{todayRequests}</span> Anfragen gestellt</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="text-xs"><span className="font-semibold">SSL gesichert</span></span>
            </div>
          </div>
        </div>
      </div>
    
      <AlertDialog open={showExitDialog}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>{t('exitAlert.title')}</AlertDialogTitle>
            <AlertDialogDescription>
                {t('exitAlert.description')}
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={handleStayInForm} className="bg-green-500 hover:bg-green-600 text-white border-none">{t('exitAlert.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmExit} className="bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-300">{t('exitAlert.confirm')}</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CustomerForm;