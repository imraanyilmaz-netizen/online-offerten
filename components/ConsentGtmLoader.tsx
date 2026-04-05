'use client'

import { useEffect } from 'react'
import { getConsent } from '@/lib/cookieConsent'

const GTM_ID = 'GTM-PNCCCGC5'

function injectGtm(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  if (document.getElementById('google-tag-manager-consent')) return

  const host = window.location.hostname
  if (host !== 'online-offerten.ch' && host !== 'www.online-offerten.ch') return

  if (document.getElementById('gtm-noscript-consent')) return

  const script = document.createElement('script')
  script.id = 'google-tag-manager-consent'
  script.innerHTML = `(function(w,d,s,l,i){
w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`
  document.head.appendChild(script)

  const nos = document.createElement('noscript')
  nos.id = 'gtm-noscript-consent'
  const iframe = document.createElement('iframe')
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`
  iframe.height = '0'
  iframe.width = '0'
  iframe.style.display = 'none'
  iframe.style.visibility = 'hidden'
  iframe.title = 'Google Tag Manager'
  nos.appendChild(iframe)
  document.body.insertBefore(nos, document.body.firstChild)
}

/**
 * Lädt GTM nur nach Einwilligung (Analytics). Production-Host wie zuvor in layout.tsx.
 */
export default function ConsentGtmLoader() {
  useEffect(() => {
    const tryLoad = () => {
      if (getConsent()?.analytics === true) injectGtm()
    }
    tryLoad()
    window.addEventListener('cookie-consent-changed', tryLoad)
    return () => window.removeEventListener('cookie-consent-changed', tryLoad)
  }, [])

  return null
}
