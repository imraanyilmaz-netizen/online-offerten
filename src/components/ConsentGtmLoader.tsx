'use client'

import { useEffect } from 'react'
import { getConsent } from '@/lib/cookieConsent'

const GTM_ID = 'GTM-PNCCCGC5'

type ConsentValue = 'granted' | 'denied'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function resolveDefault(): { granted: ConsentValue; redact: boolean } {
  const stored = getConsent()
  const granted: ConsentValue = stored?.analytics === true ? 'granted' : 'denied'
  return { granted, redact: granted !== 'granted' }
}

/**
 * Installiert Google Consent Mode v2 Defaults UND lädt GTM.
 * Wichtig: Die Consent-Defaults müssen gesetzt sein, BEVOR das GTM-Script
 * irgendwelche Google-Tags (GA4, Ads, …) auslöst. Deshalb wird alles in
 * einem einzigen inline-Script synchron initialisiert.
 *
 * Ohne Einwilligung:
 *   • keine Cookies, keine personenbezogenen Daten
 *   • nur cookielose, anonymisierte Pings an Google → Conversion-Modelling
 *   • DSGVO/nDSG-konform
 *
 * Mit Einwilligung:
 *   • vollständiges Tracking (GA4, Google Ads Conversions, Remarketing …)
 */
function injectConsentAndGtm(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  if (document.getElementById('google-tag-manager-consent')) return

  const host = window.location.hostname
  if (host !== 'online-offerten.ch' && host !== 'www.online-offerten.ch') return

  const { granted, redact } = resolveDefault()

  const script = document.createElement('script')
  script.id = 'google-tag-manager-consent'
  script.innerHTML = `
(function(){
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', {
    'ad_storage': '${granted}',
    'ad_user_data': '${granted}',
    'ad_personalization': '${granted}',
    'analytics_storage': '${granted}',
    'functionality_storage': 'granted',
    'personalization_storage': '${granted}',
    'security_storage': 'granted',
    'wait_for_update': 500
  });
  gtag('set', 'url_passthrough', true);
  gtag('set', 'ads_data_redaction', ${redact ? 'true' : 'false'});
})();
(function(w,d,s,l,i){
w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`
  document.head.appendChild(script)

  if (!document.getElementById('gtm-noscript-consent')) {
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
}

function pushConsentUpdate(): void {
  if (typeof window === 'undefined') return
  if (typeof window.gtag !== 'function') return

  const { granted, redact } = resolveDefault()
  window.gtag('consent', 'update', {
    ad_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted,
    analytics_storage: granted,
    personalization_storage: granted,
  })
  window.gtag('set', 'ads_data_redaction', redact)
}

export default function ConsentGtmLoader() {
  useEffect(() => {
    injectConsentAndGtm()
    const onChange = () => pushConsentUpdate()
    window.addEventListener('cookie-consent-changed', onChange)
    return () => window.removeEventListener('cookie-consent-changed', onChange)
  }, [])

  return null
}
