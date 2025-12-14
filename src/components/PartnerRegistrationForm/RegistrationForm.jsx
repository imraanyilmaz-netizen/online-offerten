import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { Loader2, ArrowLeft } from 'lucide-react';

import FormSidebar from './FormSidebar';
import Step1Services from './Step1Services';
import Step2Regions from './Step2Regions';
import Step3CompanyData from './Step3CompanyData';
import SuccessMessage from './SuccessMessage';

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
    agreedToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const nextStep = () => setStep(s => s < 3 ? s + 1 : s);
  const prevStep = () => setStep(s => s > 1 ? s - 1 : s);

  const handleMainCategoryChange = (categoryId) => {
    setFormData(prev => {
      const newCategories = prev.mainCategories.includes(categoryId)
        ? prev.mainCategories.filter(c => c !== categoryId)
        : [...prev.mainCategories, categoryId];
      return { ...prev, mainCategories: newCategories };
    });
  };

  const handleServiceChange = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(s => s !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
  };

  const handleRegionChange = (canton) => {
    setFormData(prev => ({
      ...prev,
      selectedRegions: prev.selectedRegions.includes(canton)
        ? prev.selectedRegions.filter(c => c !== canton)
        : [...prev.selectedRegions, canton]
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleValueChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    if (step === 1 && formData.mainCategories.length === 0) {
      toast({ variant: "destructive", title: "Fehler", description: "Bitte wählen Sie mindestens eine Hauptkategorie aus." });
      return false;
    }
     if (step === 1 && formData.selectedServices.length === 0) {
      toast({ variant: "destructive", title: "Fehler", description: "Bitte wählen Sie mindestens eine Dienstleistung aus." });
      return false;
    }
    if (step === 2 && formData.selectedRegions.length === 0) {
      toast({ variant: "destructive", title: "Fehler", description: "Bitte wählen Sie mindestens eine Region aus." });
      return false;
    }
    if (step === 3) {
      if (!formData.companyName || !formData.contactPerson || !formData.email || !formData.phone) {
        toast({ variant: "destructive", title: "Fehler", description: "Bitte füllen Sie alle Pflichtfelder aus." });
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast({ variant: "destructive", title: "Fehler", description: "Bitte geben Sie eine gültige E-Mail-Adresse ein." });
        return false;
      }
      if (!formData.password || formData.password.length < 8) {
        toast({ variant: "destructive", title: "Fehler", description: "Das Passwort muss mindestens 8 Zeichen lang sein." });
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        toast({ variant: "destructive", title: "Fehler", description: "Die Passwörter stimmen nicht überein." });
        return false;
      }
      if (!formData.agreedToTerms) {
        toast({ variant: "destructive", title: "Fehler", description: "Bitte akzeptieren Sie die Allgemeinen Geschäftsbedingungen." });
        return false;
      }
    }
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
        agreed_to_terms: formData.agreedToTerms,
      };

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
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
      } else if (data.user) {
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

  if (embedded) {
    return (
      <Card className="overflow-hidden bg-transparent shadow-none rounded-none border-transparent">
        <div className="grid md:grid-cols-12 min-h-[600px]">
          <div className="md:col-span-4 bg-slate-50 p-8">
            <FormSidebar currentStep={submitted ? 4 : step} />
          </div>
          <div className="md:col-span-8 p-8 md:p-12 bg-white flex flex-col">
            <AnimatePresence mode="wait">
              {submitted ? (
                <div className="flex-grow flex items-center justify-center">
                  <SuccessMessage formData={formData} />
                </div>
              ) : (
                <motion.div
                  key={step}
                  className="flex-grow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {step === 1 && <Step1Services formData={formData} onMainCategoryChange={handleMainCategoryChange} onServiceChange={handleServiceChange} />}
                  {step === 2 && <Step2Regions formData={formData} onRegionChange={handleRegionChange} />}
                  {step === 3 && <Step3CompanyData formData={formData} onInputChange={handleInputChange} onValueChange={handleValueChange} />}
                </motion.div>
              )}
            </AnimatePresence>
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-shadow">Partner werden</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">Registrieren Sie Ihr Unternehmen</p>
        </div>
        <Card className="overflow-hidden bg-white shadow-2xl rounded-2xl border-transparent">
          <div className="grid md:grid-cols-12 min-h-[600px]">
            <div className="md:col-span-4 bg-slate-50 p-8">
              <FormSidebar currentStep={submitted ? 4 : step} />
            </div>
            <div className="md:col-span-8 p-8 md:p-12 bg-white flex flex-col">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <div className="flex-grow flex items-center justify-center">
                    <SuccessMessage formData={formData} />
                  </div>
                ) : (
                  <motion.div
                    key={step}
                    className="flex-grow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {step === 1 && <Step1Services formData={formData} onMainCategoryChange={handleMainCategoryChange} onServiceChange={handleServiceChange} />}
                    {step === 2 && <Step2Regions formData={formData} onRegionChange={handleRegionChange} />}
                    {step === 3 && <Step3CompanyData formData={formData} onInputChange={handleInputChange} onValueChange={handleValueChange} />}
                  </motion.div>
                )}
              </AnimatePresence>
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