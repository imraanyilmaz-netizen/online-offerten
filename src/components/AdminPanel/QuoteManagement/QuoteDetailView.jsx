import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
    Calendar, Clock, File, Image, Mail, 
    MapPin, MessageSquare, Phone, Truck, User, Building, 
    Sparkles, Paintbrush, ExternalLink
} from 'lucide-react';
import { getServiceTypeLabel, formatDate, formatMoveDateLine, shouldShowUmzugsartDetail, normalizeFloorLabel } from '@/lib/utils';
import { countries } from '@/data/countries';
import CleaningDetails from '@/components/common/CleaningDetails';
import PaintingDetails from '@/components/common/PaintingDetails';
import { getServiceCategory, isMovingService, isCleaningService, isPaintingService } from '@/lib/serviceCategorizer';
import { getCleaningAreaSqmLabel } from '@/components/NewCustomerForm/cleaningAreaOptions';

const DetailSection = ({ title, icon: Icon, children }) => (
    <div className="bg-card p-4 sm:p-5 rounded-xl border border-border shadow-sm">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 border-b pb-2 mb-4 uppercase tracking-wider">
             {Icon && <Icon className="w-5 h-5 text-green-600 dark:text-emerald-400" />}
            {title}
        </h3>
        <div className="space-y-3">
            {children}
        </div>
    </div>
);

const QuoteDetail = ({ label, value, noLabel = false }) => {
  if (!value && typeof value !== 'boolean' && value !== 0) return null;

  const displayValue = typeof value === 'boolean' ? (value ? 'Ja' : 'Nein') : value;

  if (noLabel) {
    return (
      <div className="flex items-start gap-3 text-sm">
        <div className="font-bold text-foreground">{displayValue}</div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 text-sm">
      <div>
        <span className="font-semibold text-foreground">{label}:</span>{' '}
        <span className="text-muted-foreground">{displayValue}</span>
      </div>
    </div>
  );
};

const AddressBox = ({ title, quote, type }) => {
    const isFrom = type === 'from';
    const street = isFrom ? quote.from_street : quote.to_street;
    const zip = isFrom ? quote.from_zip : quote.to_zip;
    const city = isFrom ? quote.from_city : quote.to_city;
    const floor = isFrom ? quote.from_floor : quote.to_floor;
    const lift = isFrom ? quote.from_lift : quote.to_lift;
    const rooms = isFrom ? quote.from_rooms : null;
    const objectType = isFrom ? quote.from_object_type : quote.to_object_type;
    const canton = isFrom ? quote.from_canton : quote.to_canton;
    const countryCode = isFrom ? quote.from_country : quote.to_country;
    
    const country = countries.find(c => c.code === countryCode);
    const isInternational = quote.servicetype === 'Auslandumzug';
    
    if (!zip && !street && !city) return null;

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const addressLine = [street, [zip, city].filter(Boolean).join(' ')].filter(Boolean).join(', ');
    const mapsUrl = addressLine ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine + ', Schweiz')}` : null;

    return (
        <div className="bg-muted/40 border border-border rounded-lg p-4">
            <h4 className="font-bold text-md flex items-center gap-2 mb-2 text-gray-700">
                <MapPin className="w-4 h-4 text-green-600" />
                {title}
            </h4>
            {mapsUrl ? (
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-green-700 hover:text-green-900 hover:underline inline-flex items-center gap-1">
                    {addressLine}
                    <ExternalLink className="w-3 h-3" />
                </a>
            ) : (
                <p className="text-sm font-semibold text-foreground">{addressLine}</p>
            )}
            <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
                {isInternational && country && <p><span className="font-semibold">Land:</span> {country.name}</p>}
                {!isInternational && canton && <p><span className="font-semibold">Kanton:</span> {canton}</p>}
                {(floor || lift !== null) && (
                    <p>{[normalizeFloorLabel(floor), lift !== null ? `Lift: ${lift ? 'Ja' : 'Nein'}` : null].filter(Boolean).join(' / ')}</p>
                )}
                {(rooms || objectType) && (
                    <p>{[rooms, objectType ? capitalizeFirstLetter(objectType) : null].filter(Boolean).join(' / ')}</p>
                )}
            </div>
        </div>
    );
};

const ContactItem = ({ icon, label, value, subValue, isLink = false, linkType = '' }) => (
    <div className="flex items-start gap-3 py-2 border-b last:border-b-0">
      <div className="mt-1 text-muted-foreground">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="flex items-center gap-2">
            {isLink && value ? (
              <a href={`${linkType}${value}`} className="text-sm font-medium text-blue-600 hover:underline">{value}</a>
            ) : (
              <p className="text-sm font-medium text-foreground">{value || 'N/A'}</p>
            )}
            {subValue && <span className="text-xs text-muted-foreground">({subValue})</span>}
        </div>
      </div>
    </div>
);

const EmailConfirmationDetail = ({ quote }) => {
    const isConfirmed = quote.email_confirmed;
    return (
        <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0 text-sm text-gray-700">
            <span className="font-semibold text-foreground">E-Mail-Bestätigung:</span>
            <span className={isConfirmed ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
                {isConfirmed ? 'Bestätigt' : 'Noch nicht bestätigt'}
            </span>
        </div>
    );
};

const QuoteDetailView = ({ quote, purchasers = [] }) => {
  if (!quote) return null;
  
  const serviceCategory = getServiceCategory(quote.servicetype);
  const selectedSpecialTransports = [
    quote.special_transport_piano && 'Klavier',
    quote.special_transport_safe && 'Tresor',
    quote.special_transport_heavy && 'Flügel',
  ].filter(Boolean);
  const selectedMovingExtras = [
    quote.additional_services_furniture_assembly && 'Möbel-De-/Montage',
    quote.additional_services_packing && 'Einpackservice',
    quote.additional_services_disposal && 'Entsorgung',
    ...(quote.special_transport
      ? selectedSpecialTransports.length > 0
        ? selectedSpecialTransports
        : ['Spezialtransporte']
      : []),
  ].filter(Boolean);
  const formatWithUnd = (items) => {
    if (!items || items.length === 0) return '';
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} und ${items[1]}`;
    return `${items.slice(0, -1).join(', ')} und ${items[items.length - 1]}`;
  };
  
  const getServiceIcon = () => {
      switch(serviceCategory) {
          case 'moving': return Truck;
          case 'cleaning': return Sparkles;
          case 'painting': return Paintbrush;
          default: return File;
      }
  };
  
  const getStatusBadge = (status) => {
    const statusMap = {
      new_quote: { label: 'Neu', className: 'bg-blue-100 text-blue-800 border-blue-200' },
      pending: { label: 'Neu', className: 'bg-blue-100 text-blue-800 border-blue-200' },
      matched: { label: 'Zugewiesen', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      approved: { label: 'Versendet', className: 'bg-green-100 text-green-800 border-green-200' },
      rejected: { label: 'Abgelehnt', className: 'bg-red-100 text-red-800 border-red-200' },
      quota_filled: { label: 'Kontingent voll', className: 'bg-orange-100 text-orange-800 border-orange-200' },
      archived: { label: 'Archiviert', className: 'bg-muted text-foreground border-border' },
    };
    const { label, className } = statusMap[status] || { label: status, className: 'bg-muted text-foreground border-border' };
    return <Badge variant="outline" className={className}>{label}</Badge>;
  };

  return (
    <div className="space-y-5 px-1 sm:px-2">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
            <File className="w-6 h-6" />
            Anfrage Details
          </h2>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {getStatusBadge(quote.status)}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="space-y-5">
          <div className="p-4 sm:p-5 bg-card border border-border rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 border-b pb-2 mb-4 uppercase">Kundenkontakt</h3>
            <ContactItem icon={<User size={16}/>} label="Anrede" value={quote.salutation} />
            <ContactItem icon={<User size={16}/>} label="Name" value={`${quote.firstname} ${quote.lastname}`} />
            {quote.firmenname && <ContactItem icon={<Building size={16}/>} label="Firma" value={quote.firmenname} />}
            <ContactItem icon={<Phone size={16}/>} label="Telefon" value={quote.phone} />
            <ContactItem icon={<Clock size={16}/>} label="Telefonische Erreichbarkeit" value={quote.preferredtime} />
            <ContactItem icon={<Mail size={16}/>} label="E-Mail" value={quote.email} isLink linkType="mailto:" />
          </div>

          <DetailSection title="Dienstleistungsdetails" icon={getServiceIcon()}>
            <QuoteDetail label="Dienstleistung" value={getServiceTypeLabel(quote.servicetype)} />
            <QuoteDetail noLabel value={formatMoveDateLine(quote.move_date, quote.move_date_flexible)} />
            <EmailConfirmationDetail quote={quote} />
            {isMovingService(quote.servicetype) &&
              shouldShowUmzugsartDetail(quote.umzugart, quote.servicetype) && (
                <QuoteDetail label="Umzugsart" value={quote.umzugart} />
              )}
            {isCleaningService(quote.servicetype) && <CleaningDetails details={quote} />}
            {isPaintingService(quote.servicetype) && <PaintingDetails details={quote} />}
          </DetailSection>

          {(quote.additional_services_furniture_assembly || quote.additional_services_packing || quote.special_transport || quote.additional_services_disposal || quote.cleaning_area_sqm || quote.cleaning_type_guarantee || quote.cleaning_additional_balcony || quote.cleaning_additional_cellar || quote.cleaning_additional_garage) && (
            <div className={`grid gap-4 ${(quote.additional_services_furniture_assembly || quote.additional_services_packing || quote.special_transport || quote.additional_services_disposal) && (quote.cleaning_area_sqm || quote.cleaning_type_guarantee || quote.cleaning_additional_balcony || quote.cleaning_additional_cellar || quote.cleaning_additional_garage) ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {(quote.additional_services_furniture_assembly || quote.additional_services_packing || quote.special_transport || quote.additional_services_disposal) && (
                <div className="bg-card p-4 sm:p-5 rounded-xl border border-border shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <h4 className="font-semibold text-sm text-foreground">Umzug – Zusatzleistungen</h4>
                  </div>
                  <div className="space-y-2">
                    {selectedMovingExtras.length > 0 && (
                      <QuoteDetail label="Umzug inkl." value={formatWithUnd(selectedMovingExtras)} />
                    )}
                  </div>
                </div>
              )}
              {(quote.cleaning_area_sqm || quote.cleaning_type_guarantee || quote.cleaning_additional_balcony || quote.cleaning_additional_cellar || quote.cleaning_additional_garage) && (
                <div className="bg-card p-4 sm:p-5 rounded-xl border border-border shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    <h4 className="font-semibold text-sm text-foreground">Reinigung – Details</h4>
                  </div>
                  <div className="space-y-2">
                    {quote.cleaning_area_sqm && (
                      <QuoteDetail label="Wohnungsfläche" value={getCleaningAreaSqmLabel(quote.cleaning_area_sqm)} />
                    )}
                    {quote.cleaning_type_guarantee && <QuoteDetail label="Art der Reinigung" value={{
                      'mit_abnahmegarantie': 'Endreinigung mit Abnahmegarantie', 'ohne_abnahmegarantie': 'Endreinigung ohne Abnahmegarantie', 'umzugsreinigung': 'Umzugsreinigung'
                    }[quote.cleaning_type_guarantee] || quote.cleaning_type_guarantee} />}
                    {(quote.cleaning_additional_balcony || quote.cleaning_additional_cellar || quote.cleaning_additional_garage) && (
                      <QuoteDetail label="Zusatzflächen" value={
                        [quote.cleaning_additional_balcony && 'Balkon', quote.cleaning_additional_cellar && 'Keller', quote.cleaning_additional_garage && 'Garage'].filter(Boolean).join(', ')
                      } />
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-5">
          <DetailSection title={isMovingService(quote.servicetype) ? "Umzugsadressen" : "Objektadresse"} icon={MapPin}>
            <div className="grid grid-cols-1 gap-4">
              <AddressBox title={isMovingService(quote.servicetype) ? "Auszugsadresse" : "Adresse"} quote={quote} type="from" />
              {isMovingService(quote.servicetype) && (quote.to_zip || quote.to_street || quote.to_city) && (
                <AddressBox title="Einzugsadresse" quote={quote} type="to" />
              )}
            </div>
          </DetailSection>
        </div>
      </div>

      {quote.additional_info && (
        <DetailSection title="Bemerkungen des Kunden" icon={MessageSquare}>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{quote.additional_info}</p>
        </DetailSection>
      )}

      {(quote.image_urls?.length > 0 || quote.file_urls?.length > 0) && (
        <DetailSection title="Anhänge" icon={Image}>
          {quote.image_urls?.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-md mb-2">Bilder</h4>
              <div className="flex flex-wrap gap-2">
                {quote.image_urls.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                    <img src={url} alt={`Anhang ${i+1}`} className="w-24 h-24 object-cover rounded-md border" />
                  </a>
                ))}
              </div>
            </div>
          )}
          {quote.file_urls?.length > 0 && (
            <div>
              <h4 className="font-semibold text-md mb-2">Dateien</h4>
              <div className="flex flex-col gap-2">
                {quote.file_urls.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-2 text-sm">
                    <File size={14} /> Datei {i+1}
                  </a>
                ))}
              </div>
            </div>
          )}
        </DetailSection>
      )}

    </div>
  );
};

export default QuoteDetailView;