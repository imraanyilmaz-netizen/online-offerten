import Link from 'next/link';
import React from 'react';
import { Star, MapPin, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PartnerCard = ({ partner }) => {

  if (!partner) return null;

  const getBadgeClass = (tier) => {
    switch (tier) {
      case 'gold': return 'bg-yellow-400 text-yellow-900 border-yellow-500';
      case 'silver': return 'bg-gray-300 text-gray-800 border-gray-400';
      case 'bronze': return 'bg-yellow-600 text-white border-yellow-700';
      default: return 'hidden';
    }
  };

  const rating = partner.average_rating || partner.rating || 0;
  const reviewCount = partner.review_count || 0;
  const partnerSlug = partner.slug || partner.id;

  // Partner kategorilerini kontrol et
  const mainCategories = partner.main_categories || [];
  const hasUmzug = mainCategories.includes('umzug');
  const hasReinigung = mainCategories.includes('reinigung');
  const isOnlyReinigung = hasReinigung && !hasUmzug && mainCategories.length === 1;

  // Varsayılan resim seçimi
  const getDefaultImage = () => {
    if (isOnlyReinigung) {
      return '/reinigungsfirma/hausreinigung_mit_wohnraum.webp';
    } else if (hasUmzug || hasReinigung) {
      return '/bilder/6bb8eb00-0fb6-4ebd-ba5c-f5c1726ee18a.webp';
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 border border-gray-200/80 overflow-hidden flex flex-col">
      <div className="relative">
        <Link href={`/partner/${partnerSlug}`} className="block">
          {partner.hero_image_url ? (
            <>
          <img
                src={partner.hero_image_url}
                alt={`${partner.company_name} hero image`}
                className="w-full h-48 object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.classList.add('bg-white');
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </>
          ) : getDefaultImage() ? (
            <>
              <img
                src={getDefaultImage()}
            alt={`${partner.company_name} hero image`}
            className="w-full h-48 object-cover"
            loading="lazy"
            onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.classList.add('bg-white');
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </>
          ) : (
            <div className="w-full h-48 bg-white"></div>
          )}
        </Link>
        
        <div className="absolute bottom-3 left-3">
          <img
            src={partner.logo_url || '/image/logo-icon.avif'}
            alt={`${partner.company_name} logo`}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/image/logo-icon.avif';
            }}
          />
        </div>

        
        {partner.badge_tier && (
          <Badge className={`absolute top-3 left-3 text-xs font-bold uppercase tracking-wider ${getBadgeClass(partner.badge_tier)}`}>
            {partner.badge_tier} Partner
          </Badge>
        )}
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate pt-2">
          <Link href={`/partner/${partnerSlug}`} className="hover:text-green-600 transition-colors">
            {partner.company_name}
          </Link>
        </h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
          <span>{partner.address_city}, {partner.address_zip}</span>
        </div>

        {reviewCount > 0 ? (
          <div className="flex items-center text-sm mb-4">
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-gray-600 ml-2 font-medium">{rating.toFixed(1)}</span>
            <span className="text-gray-500 ml-1.5">({reviewCount} Bewertungen)</span>
          </div>
        ) : (
             <div className="flex items-center text-sm text-gray-500 mb-4 h-[28px]">
                 <span>Noch keine Bewertungen</span>
             </div>
        )}

        <div className="flex-grow mb-4">
          <ul className="space-y-1.5">
            {(partner.main_categories || partner.offered_services || [])
              .filter((service) => {
                // Garten servislerini filtrele
                const serviceLower = (service || '').toLowerCase();
                return !serviceLower.includes('garten') && serviceLower !== 'garten';
              })
              .slice(0, 2)
              .map((service) => {
              // Servis türüne göre emoji ve isim belirleme
              const getServiceInfo = (serviceKey) => {
                const serviceLower = (serviceKey || '').toLowerCase();
                
                if (serviceLower.includes('umzug') || serviceLower === 'umzug') {
                  return { emoji: '🚚', name: 'Umzugsfirma' };
                } else if (serviceLower.includes('reinigung') || serviceLower === 'reinigung') {
                  return { emoji: '🧹', name: 'Reinigungsfirma' };
                } else if (serviceLower.includes('maler') || serviceLower === 'maler') {
                  return { emoji: '🎨', name: 'Malerfirmen' };
                }
                // Varsayılan: capitalize et
                return { 
                  emoji: '✓', 
                  name: serviceKey ? serviceKey.charAt(0).toUpperCase() + serviceKey.slice(1) : serviceKey 
                };
              };
              
              const serviceInfo = getServiceInfo(service);
              
              return (
                <li key={service} className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 text-base flex-shrink-0">{serviceInfo.emoji}</span>
                  <span className="truncate">{serviceInfo.name}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <Link href={`/partner/${partnerSlug}`}
            className="w-full text-center inline-block bg-green-600 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
          >
            Profil ansehen
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PartnerCard;