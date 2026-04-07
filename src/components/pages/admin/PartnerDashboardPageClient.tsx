'use client'

import React, { Suspense, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/src/contexts/SupabaseAuthContext'
import PartnerPanel from '@/src/components/PartnerPanel'
import { Loader2 } from 'lucide-react'
import type { User } from '@supabase/supabase-js'

const LoadingFallback = () => (
  <div className="flex flex-col justify-center items-center h-screen bg-slate-50 text-slate-700">
    <Loader2 className="w-16 h-16 animate-spin text-green-600 mb-4" />
  </div>
)

function partnerRole(user: User | null): string | undefined {
  return user?.user_metadata?.role ?? user?.app_metadata?.role
}

/**
 * Nur useAuth — keine zweite getSession-Kette.
 * Hydration: diese Seite wird über PartnerDashboardLoader mit dynamic(ssr:false) geladen.
 */
const PartnerDashboardPageClient = () => {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [, setCompanyName] = useState('')
  /** SSR + ilk client frame: auth farkı yüzünden div vs Suspense hydration hatası — önce aynı placeholder. */
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- kasıtlı: hydration sonrası gerçek UI
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || authLoading) return
    if (!user) {
      router.replace('/login')
      return
    }
    if (partnerRole(user) !== 'partner') {
      router.replace('/')
    }
  }, [mounted, authLoading, user, router])

  if (!mounted) {
    return <LoadingFallback />
  }

  if (authLoading) {
    return <LoadingFallback />
  }

  if (!user || partnerRole(user) !== 'partner') {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-slate-50 text-slate-700">
        <Loader2 className="w-12 h-12 animate-spin text-green-600 mb-4" />
        <p className="text-sm text-slate-600">Weiterleitung…</p>
      </div>
    )
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <PartnerPanel setCompanyName={setCompanyName} />
    </Suspense>
  )
}

export default PartnerDashboardPageClient
