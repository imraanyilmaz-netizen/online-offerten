import Link from 'next/link'
import React from 'react'
import { Star, MapPin, CheckCircle, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const PartnerCard = ({ partner }) => {
  if (!partner) return null

  const getBadgeClass = (tier) => {
    switch (tier) {
      case 'gold':
        return 'border-amber-400/80 bg-amber-100 text-amber-950 shadow-sm dark:border-amber-700/60 dark:bg-amber-950/50 dark:text-amber-100'
      case 'silver':
        return 'border-slate-300 bg-slate-100 text-slate-800 shadow-sm dark:border-border dark:bg-muted dark:text-foreground'
      case 'bronze':
        return 'border-orange-300 bg-orange-100 text-orange-950 shadow-sm dark:border-orange-800/60 dark:bg-orange-950/40 dark:text-orange-100'
      default:
        return 'hidden'
    }
  }

  const rating = partner.average_rating || partner.rating || 0
  const reviewCount = partner.review_count || 0
  const partnerSlug = partner.slug || partner.id

  const mainCategories = partner.main_categories || []
  const hasUmzug = mainCategories.includes('umzug')
  const hasReinigung = mainCategories.includes('reinigung')

  const getDefaultImage = () => {
    if (hasReinigung && !hasUmzug) {
      return '/reinigungsfirma/hausreinigung_mit_wohnraum.webp'
    }
    if (hasUmzug) {
      return '/bilder/6bb8eb00-0fb6-4ebd-ba5c-f5c1726ee18a.webp'
    }
    return null
  }
  const defaultImage = getDefaultImage()

  const roundedStars = Math.min(5, Math.max(0, Math.round(rating)))

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white',
        'shadow-[0_2px_12px_-4px_rgba(15,23,42,0.08)] transition-all duration-300',
        'hover:border-slate-300/90 hover:shadow-[0_12px_32px_-12px_rgba(15,23,42,0.14)]',
        'dark:border-border dark:bg-card dark:hover:border-muted-foreground/40'
      )}
    >
      <div className="relative shrink-0">
        <Link href={`/partner/${partnerSlug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
          {partner.hero_image_url ? (
            <>
              <img
                src={partner.hero_image_url}
                alt=""
                className="h-32 w-full object-cover sm:h-36"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null
                  if (defaultImage) {
                    e.target.src = defaultImage
                  } else {
                    e.target.style.display = 'none'
                    e.target.parentElement.classList.add('bg-gradient-to-br', 'from-slate-100', 'to-slate-50')
                  }
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/45 via-slate-900/5 to-transparent" />
            </>
          ) : defaultImage ? (
            <>
              <img
                src={defaultImage}
                alt=""
                className="h-32 w-full object-cover sm:h-36"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.classList.add('h-32', 'bg-gradient-to-br', 'from-slate-100', 'to-slate-50', 'sm:h-36')
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent" />
            </>
          ) : (
            <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-muted dark:to-background sm:h-36" />
          )}
        </Link>

        <div className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5">
          <img
            src={partner.logo_url || '/image/logo-icon.webp'}
            alt=""
            className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-md ring-1 ring-black/5 sm:h-14 sm:w-14"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = '/image/logo-icon.webp'
            }}
          />
        </div>

        {partner.badge_tier ? (
          <Badge
            className={cn(
              'absolute left-2 top-2 border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider sm:left-2.5 sm:top-2.5',
              getBadgeClass(partner.badge_tier)
            )}
          >
            {partner.badge_tier} Partner
          </Badge>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4 pt-3 sm:p-4 sm:pt-3.5">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-base font-semibold leading-snug tracking-tight text-slate-900 dark:text-foreground sm:text-[1.0625rem]">
          <Link
            href={`/partner/${partnerSlug}`}
            className="transition-colors hover:text-emerald-700 focus:outline-none focus-visible:text-emerald-700 dark:hover:text-emerald-400 dark:focus-visible:text-emerald-400"
          >
            {partner.company_name}
          </Link>
        </h3>

        <div className="mt-2 flex items-start gap-1.5 text-xs text-slate-500 dark:text-muted-foreground sm:text-[13px]">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-muted-foreground/80" aria-hidden />
          <span className="line-clamp-1">
            {partner.address_city}
            {partner.address_zip ? `, ${partner.address_zip}` : ''}
          </span>
        </div>

        {reviewCount > 0 ? (
          <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <div className="flex items-center gap-0.5 text-amber-500" aria-hidden>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-3.5 w-3.5',
                    i < roundedStars ? 'fill-current' : 'text-slate-200 dark:text-muted-foreground/35'
                  )}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-foreground">
              {rating.toFixed(1)}
              <span className="font-normal text-slate-500 dark:text-muted-foreground"> · {reviewCount} Bewertungen</span>
            </span>
          </div>
        ) : null}

        {partner.message ? (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-muted-foreground sm:text-[13px]">
            {partner.message.length > 100 ? (
              <>
                {partner.message.substring(0, 100)}…{' '}
                <Link
                  href={`/partner/${partnerSlug}`}
                  className="font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  mehr
                </Link>
              </>
            ) : (
              partner.message
            )}
          </p>
        ) : null}

        <div className="mt-3 flex-1">
          <ul className="space-y-1">
            {(partner.main_categories || partner.offered_services || [])
              .filter((service) => {
                const serviceLower = (service || '').toLowerCase()
                return !serviceLower.includes('garten') && serviceLower !== 'garten'
              })
              .slice(0, 2)
              .map((service) => {
                const getServiceName = (serviceKey) => {
                  const serviceLower = (serviceKey || '').toLowerCase()
                  if (serviceLower.includes('umzug') || serviceLower === 'umzug') return 'Umzugsfirma'
                  if (serviceLower.includes('reinigung') || serviceLower === 'reinigung')
                    return 'Reinigungsfirma'
                  if (serviceLower.includes('maler') || serviceLower === 'maler') return 'Malerfirmen'
                  return serviceKey
                    ? serviceKey.charAt(0).toUpperCase() + serviceKey.slice(1)
                    : serviceKey
                }
                return (
                  <li key={service} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-muted-foreground sm:text-[13px]">
                    <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden />
                    <span className="truncate">{getServiceName(service)}</span>
                  </li>
                )
              })}
          </ul>
        </div>

        <div className="mt-4 border-t border-slate-100 pt-3 dark:border-border">
          <Link
            href={`/partner/${partnerSlug}`}
            className={cn(
              'flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-600 text-sm font-semibold text-white',
              'shadow-sm shadow-emerald-900/10 transition-colors hover:bg-emerald-700',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2'
            )}
          >
            Anfrage senden
            <ArrowUpRight className="h-3.5 w-3.5 opacity-90" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default PartnerCard
