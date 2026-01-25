'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useCallback, useRef, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // i18n geri eklendi - müşteri formu için
import { Button } from '@/components/ui/button';
import Step1_Service from '@/components/NewCustomerForm/Step1_Service';
import Step2_ServiceDetails from '@/components/NewCustomerForm/Step2_ServiceDetails';
import Step2_DetailsAndContact from '@/components/NewCustomerForm/Step2_DetailsAndContact';
import NewQuoteConfirmation from '@/components/NewCustomerForm/NewQuoteConfirmation';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Send, Home as HomeIcon, Loader2, ShieldCheck, Star } from 'lucide-react';
import useNewCustomerForm from './useNewCustomerForm';
import useNewFormValidation from './useNewFormValidation';
import { submitNewQuoteToSupabase } from './newFormUtils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from '@/components/ui/alert-dialog';
import { supabase } from '@/lib/supabaseClient';
import { getLanguageFromUrl } from '@/lib/urlMap'; // Müşteri formu için dil algılama

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
      <span className="text-gray-600">({reviewCount} {t('ratings', { count: reviewCount })})</span>
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
            const { data, error } = await supabase.rpc('get_recent_average_rating');
            if (!isMounted) return;
            
            if (!error && data) {
                setStats({
                    average_rating: data.average_rating,
                    review_count: data.review_count + 142
                });
            } else {
                 setStats(prev => ({ ...prev, review_count: 142 }));
            }
            setLoading(false);
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
  
  // Müşteri formu için URL'den dil algılama
  useEffect(() => {
    const detectedLang = getLanguageFromUrl(pathname);
    if (detectedLang && i18n.language !== detectedLang) {
      // Render sırasında state güncellemesini önle
      const timeoutId = setTimeout(() => {
      i18n.changeLanguage(detectedLang);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [pathname, i18n.language, i18n]);

  useEffect(() => {
    // document.documentElement.lang'ı güncelle
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStep1Completed, setIsStep1Completed] = useState(false);
  const [isStep2Completed, setIsStep2Completed] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  
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
    // Service-Parameter beibehalten, wenn er bereits in der URL ist oder wenn formData.service gesetzt ist
    if (formData.service) {
      params.set('service', formData.service);
    }
    // URL'i güncelle - scroll: false ile Next.js'in otomatik scroll'unu engelle
    // Manuel scroll handleNextStep ve useEffect'te yapılıyor
    router.push(`${pathname}?${params.toString()}`, { replace, scroll: false });
  }, [searchParamsString, pathname, router, formRef, formData.service]);

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
      case 'garten':
        return null; // Garten doesn't need this parameter
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
    
    if (serviceId === 'umzug' && !isFromUrl) {
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
    
    // Update URL with service-specific parameter name
    const params = new URLSearchParams(searchParamsString);
    
    // Remove all service art parameters to avoid conflicts
    params.delete('umzugArt');
    params.delete('reinigungArt');
    params.delete('malerArt');
    params.delete('raeumungArt');
    
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
    
    // Garten servisi için parametre gerekmez
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
    formData.what_to_garden,
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
                case 'garten':
                    return t('step1.whatToGardenTitle');
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
        case 'moebellift':
          umzugArtLabel = t('step1.moebelliftLabel');
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
    } else if (formData.service === 'garten') {
      services.push(t('step1.mainServiceGarden'));
    } else if (formData.service) {
      // Fallback to main service name
      const mainServiceKey = `step1.mainService${formData.service.charAt(0).toUpperCase() + formData.service.slice(1)}`;
      const mainServiceLabel = t(mainServiceKey);
      if (mainServiceLabel && mainServiceLabel !== mainServiceKey) {
        services.push(mainServiceLabel);
      }
    }
    
    // Additional cleaning service (if selected)
    if (formData.service === 'umzug' && formData.additionalCleaning) {
      services.push(t('step1.mainServiceCleaning')); // "Reinigung" instead of "Umzugsreinigung"
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
    <motion.div 
      id={formId}
      ref={formRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
              <motion.div 
              className="bg-green-500 h-full rounded-full"
              initial={{ width: '50%' }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              />
          </div>
      </div>
      
      <form onSubmit={handleSubmitForm} className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 border border-gray-200 rounded-xl shadow-lg bg-white" noValidate>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: currentStep > (currentStep-1) ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: currentStep > (currentStep+1) ? -30 : 30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={(currentStep === 2 && !isStep1Completed) || (currentStep === 3 && (!isStep1Completed || !isStep2Completed)) ? 'pointer-events-none opacity-50' : ''}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 sm:pt-6 border-t border-gray-200 gap-3 sm:gap-4">
          {currentStep > 1 ? (
            <Button type="button" onClick={handlePrevStep} variant="outline" className="group w-full sm:w-auto py-2.5 text-sm sm:text-base">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              {t('backButton')}
            </Button>
          ) : (
             <div className="w-full sm:w-auto"></div>
          )}
          
          <div className="flex-grow sm:block hidden"></div> {}

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
      
      <div className="px-4 sm:px-6 md:px-8 pt-0 pb-4 text-center">
        <Button onClick={handleNavigateHome} variant="link" className="text-gray-500 hover:text-green-600 text-xs sm:text-sm font-normal">
          <HomeIcon className="w-3.5 h-3.5 mr-1.5"/> 
          {t('toHomepageLink')}
        </Button>
      </div>

      <div className="mt-4 p-3 sm:p-4 bg-[#ccfbf1]/50 backdrop-blur-sm border-t border-[#99f6e4] text-center text-xs text-gray-500 rounded-lg">
          <div className="flex justify-center items-center gap-1 sm:gap-1.5">
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600" />
            <span>{t('dataSecureMessage')}</span>
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
            <AlertDialogCancel onClick={handleStayInForm}>{t('exitAlert.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmExit} className="bg-green-500 hover:bg-green-600">{t('exitAlert.confirm')}</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default CustomerForm;