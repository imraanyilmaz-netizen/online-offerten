import React, { useState, useRef, useEffect } from 'react';
// framer-motion removed - CSS for better INP
import { supabase } from '@/lib/supabaseClient';
import { supabase as customSupabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { Loader2, ArrowLeft } from 'lucide-react';

import Step1Services from './Step1Services';
import Step2Regions from './Step2Regions';
import Step3CompanyData from './Step3CompanyData';
import SuccessMessage from './SuccessMessage';
import LogoUpload from './LogoUpload';
import { CheckCircle2, Edit3 } from 'lucide-react';

const RegistrationForm = ({ embedded = false, onBackToLogin }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    mainCategories: [], // e.g., ['umzug', 'reinigung']
    selectedServices: [], // e.g., ['privatumzug', 'wohnungsreinigung']
    selectedRegions: [],
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address_street: '',
    address_zip: '',
    address_city: '',
    website: '',
    year_founded: '',
    employee_count: '',
    liability_insurance: null,
    commercial_register_number: '',
    company_description: '',
    logoFile: null,
    agreedToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const formTopRef = useRef(null);
  const prevStepRef = useRef(step);

  // Scroll to top when step changes (but not on initial mount)
  useEffect(() => {
    if (prevStepRef.current !== step && formTopRef.current) {
      // Calculate scroll position
      const element = formTopRef.current;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 20; // 20px offset from top
      
      // Smooth scroll
      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 150);
      prevStepRef.current = step;
    }
  }, [step]);

  const nextStep = () => {
    setStep(s => {
      const newStep = s < 3 ? s + 1 : s;
      return newStep;
    });
  };
  
  const prevStep = () => {
    setStep(s => {
      const newStep = s > 1 ? s - 1 : s;
      return newStep;
    });
  };

  const handleMainCategoryChange = (categoryId) => {
    setFormData(prev => {
      const newCategories = prev.mainCategories.includes(categoryId)
        ? prev.mainCategories.filter(c => c !== categoryId)
        : [...prev.mainCategories, categoryId];
      return { ...prev, mainCategories: newCategories };
    });
    // Clear error when user makes selection
    if (errors.mainCategories) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.mainCategories;
        return newErrors;
      });
    }
  };

  const handleServiceChange = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(s => s !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
    // Clear error when user makes selection
    if (errors.selectedServices) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.selectedServices;
        return newErrors;
      });
    }
  };

  const handleRegionChange = (canton) => {
    setFormData(prev => ({
      ...prev,
      selectedRegions: prev.selectedRegions.includes(canton)
        ? prev.selectedRegions.filter(c => c !== canton)
        : [...prev.selectedRegions, canton]
    }));
    // Clear error when user makes selection
    if (errors.selectedRegions) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.selectedRegions;
        return newErrors;
      });
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleValueChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error when user changes value
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (step === 1) {
      if (formData.mainCategories.length === 0) {
        newErrors.mainCategories = "Bitte wählen Sie mindestens eine Hauptkategorie aus.";
      }
      if (formData.selectedServices.length === 0) {
        newErrors.selectedServices = "Bitte wählen Sie mindestens eine Dienstleistung aus.";
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        toast({ variant: "destructive", title: "Fehler", description: "Bitte überprüfen Sie Ihre Eingaben." });
      return false;
    }
    }
    
    if (step === 2) {
      if (formData.selectedRegions.length === 0) {
        newErrors.selectedRegions = "Bitte wählen Sie mindestens eine Region aus.";
        setErrors(newErrors);
      toast({ variant: "destructive", title: "Fehler", description: "Bitte wählen Sie mindestens eine Region aus." });
      return false;
    }
    }
    
    if (step === 3) {
      // Company Name validation
      if (!formData.companyName || formData.companyName.trim() === '') {
        newErrors.companyName = "Firmenname ist ein Pflichtfeld.";
      }
      
      // Contact Person validation
      if (!formData.contactPerson || formData.contactPerson.trim() === '') {
        newErrors.contactPerson = "Ansprechpartner ist ein Pflichtfeld.";
      }
      
      // Email validation
      if (!formData.email || formData.email.trim() === '') {
        newErrors.email = "E-Mail-Adresse ist ein Pflichtfeld.";
      } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
          newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
        }
      }
      
      // Phone validation
      if (!formData.phone || formData.phone.trim() === '') {
        newErrors.phone = "Telefonnummer ist ein Pflichtfeld.";
      }
      
      // Password validation
      if (!formData.password || formData.password.trim() === '') {
        newErrors.password = "Passwort ist ein Pflichtfeld.";
      } else if (formData.password.length < 8) {
        newErrors.password = "Das Passwort muss mindestens 8 Zeichen lang sein.";
      }
      
      // Confirm Password validation
      if (!formData.confirmPassword || formData.confirmPassword.trim() === '') {
        newErrors.confirmPassword = "Bitte bestätigen Sie Ihr Passwort.";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Die Passwörter stimmen nicht überein.";
      }
      
      // Liability Insurance validation (Haftpflichtversicherung)
      if (formData.liability_insurance === null || formData.liability_insurance === undefined) {
        newErrors.liability_insurance = "Haftpflichtversicherung ist ein Pflichtfeld.";
      }
      
      // Commercial Register Number validation (Handelsregisternummer)
      if (!formData.commercial_register_number || formData.commercial_register_number.trim() === '') {
        newErrors.commercial_register_number = "Handelsregisternummer ist ein Pflichtfeld.";
      }
      
      // Terms validation
      if (!formData.agreedToTerms) {
        newErrors.agreedToTerms = "Bitte akzeptieren Sie die Allgemeinen Geschäftsbedingungen.";
      }
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        // İlk hatayı göster
        const firstError = Object.values(newErrors)[0];
        toast({ variant: "destructive", title: "Fehler", description: firstError });
        return false;
      }
    }
    
    setErrors({});
    return true;
  };
  
  const handleNextStep = () => {
    if (validateForm()) {
      nextStep();
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const partnerMetaData = {
        role: 'partner',
        company_name: formData.companyName,
        contact_person: formData.contactPerson,
        phone: formData.phone,
        main_categories: formData.mainCategories,
        offered_services: formData.selectedServices,
        service_regions: formData.selectedRegions,
        address_street: formData.address_street,
        address_zip: formData.address_zip,
        address_city: formData.address_city,
        website: formData.website,
        year_founded: formData.year_founded,
        employee_count: formData.employee_count,
        liability_insurance: formData.liability_insurance,
        commercial_register_number: formData.commercial_register_number,
        message: formData.company_description, // Database column is 'message', not 'company_description'
        agreed_to_terms: formData.agreedToTerms,
      };

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: 'https://online-offerten.ch/email-confirmed',
          data: partnerMetaData,
        },
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          toast({
            variant: "destructive",
            title: "Fehler",
            description: "Diese E-Mail-Adresse ist bereits registriert. Bitte verwenden Sie eine andere E-Mail oder loggen Sie sich ein.",
          });
        } else {
          throw error;
        }
      } else if (data?.user) {
        let logoUrl = null;
        
        // Upload logo if provided
        if (formData.logoFile && data.user.id) {
          try {
            const fileExt = formData.logoFile.name.split('.').pop();
            const fileName = `${data.user.id}/${Date.now()}.${fileExt}`;
            
            const { error: uploadError } = await customSupabase.storage
              .from('partner-logos')
              .upload(fileName, formData.logoFile);
            
            if (!uploadError) {
              const { data: publicUrlData } = customSupabase.storage
                .from('partner-logos')
                .getPublicUrl(fileName);
              
              logoUrl = publicUrlData.publicUrl;
              
              // Update user metadata with logo URL
              await customSupabase.auth.updateUser({
                data: { ...partnerMetaData, logo_url: logoUrl }
              });
            }
          } catch (logoError) {
            console.error('Error uploading logo:', logoError);
            // Don't fail registration if logo upload fails
          }
        }
        
        // Update partners table with logo_url (retry mechanism in case record doesn't exist yet)
        if (logoUrl && data.user.id) {
          const updatePartnersTable = async (retries = 3) => {
            for (let i = 0; i < retries; i++) {
              try {
                // Try to update first
                const { error: updateError } = await customSupabase
                  .from('partners')
                  .update({ logo_url: logoUrl })
                  .eq('id', data.user.id);
                
                // If update succeeds or record doesn't exist yet, wait and retry
                if (updateError && updateError.message.includes('No rows')) {
                  if (i < retries - 1) {
                    await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Wait 1s, 2s, 3s
                    continue;
                  }
                } else if (!updateError) {
                  // Successfully updated
                  break;
                } else {
                  console.error('Error updating partners table with logo_url:', updateError);
                  break;
                }
              } catch (err) {
                console.error('Error updating partners table:', err);
                if (i < retries - 1) {
                  await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
                }
              }
            }
          };
          
          // Start update process (non-blocking)
          updatePartnersTable().catch(err => {
            console.error('Failed to update partners table with logo_url:', err);
          });
        }
        
        setSubmitted(true);
        toast({
          title: "Registrierung erfolgreich!",
          description: "Ihr Profil wurde erfolgreich erstellt und wartet auf die Überprüfung.",
        });

        // Partner registration successful – trigger notification emails via Edge Function (Resend version)
        try {
          const { error: fnError, data: fnData } = await supabase.functions.invoke('send-partner-notification', {
            body: {
              // Bu Edge Function beklediği format: { partnerData: { ... } }
              partnerData: {
                email: formData.email,
                ...partnerMetaData,
              },
            },
          });

          if (fnError) {
            console.error('send-partner-notification function error:', fnError);
          } else if (fnData?.error) {
            console.error('send-partner-notification returned error:', fnData.error);
          } else {
            console.log('send-partner-notification success:', fnData);
          }
        } catch (notifyError) {
          console.error('Error calling send-partner-notification:', notifyError);
          // Registrierung bleibt erfolgreich, Mail-Fehler nur im Log
        }
      }

    } catch (error) {
      console.error('Registration error:', error);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error.message || "Ein unerwarteter Fehler ist aufgetreten.",
      });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, name: 'Leistungen auswählen', description: 'Wählen Sie Ihre Hauptkategorien' },
    { id: 2, name: 'Regionen auswählen', description: 'Wählen Sie Ihre Service-Regionen' },
    { id: 3, name: 'Firmendaten eingeben', description: 'Vervollständigen Sie Ihr Profil' },
  ];

  if (embedded) {
    return (
      <Card className="overflow-hidden bg-transparent shadow-none rounded-none border-transparent">
        {/* Progress Indicator at the top */}
        <div ref={formTopRef} className="border-b border-slate-100 bg-white px-6 md:px-12 pt-12 pb-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900 tracking-tight">Partner werden</h2>
              <p className="text-slate-600 text-base md:text-lg">Registrieren Sie Ihr Unternehmen in wenigen Schritten</p>
            </div>
            
            {/* Modern Stepper */}
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-[2px] bg-slate-200 hidden md:block">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500 ease-out"
                  style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>
              
              <div className="relative flex justify-between items-start">
                {steps.map((stepItem, index) => {
                  const isActive = step === stepItem.id;
                  const isCompleted = step > stepItem.id;
                  const stepNumber = index + 1;
                  
                  return (
                    <div key={stepItem.id} className="flex-1 flex flex-col items-center relative z-10">
                      {/* Step Circle */}
                      <div className="relative mb-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30 scale-110'
                            : isCompleted
                              ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md'
                              : 'bg-white border-2 border-slate-300 text-slate-400'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle2 className="w-6 h-6" strokeWidth={2.5} />
                          ) : (
                            <span className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-400'}`}>
                              {stepNumber}
                            </span>
                          )}
                        </div>
                        {isActive && (
                          <div
                            className="absolute inset-0 rounded-full bg-green-500 opacity-20"
                          />
                        )}
                      </div>
                      
                      {/* Step Content */}
                      <div className="text-center max-w-[180px]">
                        <p className={`font-semibold text-sm mb-1 transition-colors ${
                          isActive 
                            ? 'text-green-600' 
                            : isCompleted 
                              ? 'text-slate-700' 
                              : 'text-slate-400'
                        }`}>
                          {stepItem.name}
                        </p>
                        <p className="text-xs text-slate-500 leading-snug hidden md:block">
                          {stepItem.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-[600px]">
          <div className="p-8 md:p-12 bg-white flex flex-col">
            
              {submitted ? (
                <div className="flex-grow flex items-center justify-center">
                  <SuccessMessage formData={formData} />
                </div>
              ) : (
                <div
                  key={step}
                  className="flex-grow"
                >
                  {step === 1 && <Step1Services formData={formData} onMainCategoryChange={handleMainCategoryChange} onServiceChange={handleServiceChange} errors={errors} />}
                  {step === 2 && <Step2Regions formData={formData} onRegionChange={handleRegionChange} errors={errors} />}
                  {step === 3 && <Step3CompanyData formData={formData} onInputChange={handleInputChange} onValueChange={handleValueChange} onLogoChange={(file) => setFormData(prev => ({ ...prev, logoFile: file }))} errors={errors} />}
                </div>
              )}
            
            <div className="flex justify-between mt-8 pt-8 border-t border-slate-200">
              <div>
                {submitted ? (
                  <Button variant="outline" onClick={onBackToLogin}><ArrowLeft className="mr-2 h-4 w-4" /> Zurück zum Login</Button>
                ) : (
                  step > 1 && (
                    <Button variant="outline" onClick={prevStep}>Zurück</Button>
                  )
                )}
                {!submitted && step === 1 && (
                  <Button variant="outline" onClick={onBackToLogin}><ArrowLeft className="mr-2 h-4 w-4" /> Zurück zum Login</Button>
                )}
              </div>
              <div>
                {!submitted && (
                  <>
                    {step < 3 ? (
                      <Button onClick={handleNextStep}>Weiter</Button>
                    ) : (
                      <Button onClick={handleSubmit} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {loading ? "Wird gesendet..." : "Registrieren"}
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <section id="register" className="py-16 md:py-24 bg-slate-100">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <Card className="overflow-hidden bg-white shadow-2xl rounded-2xl border-transparent">
          {/* Progress Indicator at the top */}
          <div ref={formTopRef} className="border-b border-slate-100 bg-white px-6 md:px-12 pt-12 pb-10">
            <div className="max-w-4xl mx-auto">
              <div className="mb-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900 tracking-tight">Partner werden</h2>
                <p className="text-slate-600 text-base md:text-lg">Registrieren Sie Ihr Unternehmen in wenigen Schritten</p>
              </div>
              
              {/* Modern Stepper */}
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-6 left-0 right-0 h-[2px] bg-slate-200 hidden md:block">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500 ease-out"
                    style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                  />
                </div>
                
                <div className="relative flex justify-between items-start">
                  {steps.map((stepItem, index) => {
                    const isActive = step === stepItem.id;
                    const isCompleted = step > stepItem.id;
                    const stepNumber = index + 1;
                    
                    return (
                      <div key={stepItem.id} className="flex-1 flex flex-col items-center relative z-10">
                        {/* Step Circle */}
                        <div className="relative mb-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30 scale-110'
                              : isCompleted
                                ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md'
                                : 'bg-white border-2 border-slate-300 text-slate-400'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle2 className="w-6 h-6" strokeWidth={2.5} />
                            ) : (
                              <span className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-400'}`}>
                                {stepNumber}
                              </span>
                            )}
                          </div>
                          {isActive && (
                            <div
                              className="absolute inset-0 rounded-full bg-green-500 opacity-20"
                            />
                          )}
                        </div>
                        
                        {/* Step Content */}
                        <div className="text-center max-w-[180px]">
                          <p className={`font-semibold text-sm mb-1 transition-colors ${
                            isActive 
                              ? 'text-green-600' 
                              : isCompleted 
                                ? 'text-slate-700' 
                                : 'text-slate-400'
                          }`}>
                            {stepItem.name}
                          </p>
                          <p className="text-xs text-slate-500 leading-snug hidden md:block">
                            {stepItem.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="min-h-[600px]">
            <div className="p-8 md:p-12 bg-white flex flex-col">
              
                {submitted ? (
                  <div className="flex-grow flex items-center justify-center">
                    <SuccessMessage formData={formData} />
                  </div>
                ) : (
                  <div
                    key={step}
                    className="flex-grow"
                  >
                    {step === 1 && <Step1Services formData={formData} onMainCategoryChange={handleMainCategoryChange} onServiceChange={handleServiceChange} errors={errors} />}
                    {step === 2 && <Step2Regions formData={formData} onRegionChange={handleRegionChange} errors={errors} />}
                    {step === 3 && <Step3CompanyData formData={formData} onInputChange={handleInputChange} onValueChange={handleValueChange} onLogoChange={(file) => setFormData(prev => ({ ...prev, logoFile: file }))} errors={errors} />}
                  </div>
                )}
              
              {!submitted && (
                <div className="flex justify-between mt-8 pt-8 border-t border-slate-200">
                  <div>
                    {step > 1 && (
                      <Button variant="outline" onClick={prevStep}>Zurück</Button>
                    )}
                  </div>
                  <div>
                    {step < 3 ? (
                      <Button onClick={handleNextStep}>Weiter</Button>
                    ) : (
                      <Button onClick={handleSubmit} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {loading ? "Wird gesendet..." : "Registrieren"}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default RegistrationForm;