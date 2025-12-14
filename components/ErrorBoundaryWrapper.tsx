'use client'

import ErrorBoundary from '@/components/ErrorBoundary'
import type { ReactNode } from 'react'

interface ErrorBoundaryWrapperProps {
  children: ReactNode
}

export default function ErrorBoundaryWrapper({ children }: ErrorBoundaryWrapperProps) {
  return <ErrorBoundary>{children}</ErrorBoundary>
}

