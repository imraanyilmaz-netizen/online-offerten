import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Zahlung erfolgreich - Online-Offerten.ch',
  description: 'Ihre Zahlung wurde erfolgreich verarbeitet.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Zahlung erfolgreich!</h1>
        <p className="text-gray-600 mb-6">Ihre Zahlung wurde erfolgreich verarbeitet. Vielen Dank!</p>
        <a
          href="/"
          className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
        >
          Zur Startseite
        </a>
      </div>
    </div>
  )
}



