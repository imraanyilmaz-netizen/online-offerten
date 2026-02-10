'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import HeroSection from '@/components/PartnerRegistrationForm/HeroSection'
import HowItWorksSection from '@/components/PartnerRegistrationForm/HowItWorksSection'
import BenefitsSection from '@/components/PartnerRegistrationForm/BenefitsSection'
import RegistrationForm from '@/components/PartnerRegistrationForm/RegistrationForm'

const PartnerRegistrationPageClient = () => {
  const router = useRouter()

  const handleBackToLogin = () => {
    router.push('/login')
  }

  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <RegistrationForm onBackToLogin={handleBackToLogin} />
    </>
  )
}

export default PartnerRegistrationPageClient



