import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
    Calendar, CheckCircle, Clock, File, Image, Mail, 
    MapPin, MessageSquare, Phone, Truck, User, Building, 
    Sparkles, Paintbrush, Leaf, Users
} from 'lucide-react';
import { getServiceTypeLabel, formatDate } from '@/lib/utils';
import { countries } from '@/data/countries';
import CleaningDetails from '@/components/common/CleaningDetails';
import PaintingDetails from '@/components/common/PaintingDetails';
import { getServiceCategory, isMovingService, isCleaningService, isPaintingService } from '@/lib/serviceCategorizer';

const DetailSection = ({ title, icon: Icon, children }) => (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b pb-2 mb-4 uppercase tracking-wider">
             {Icon && <Icon className="w-5 h-5 text-green-600" />}
            {title}
        </h3>
        <div className="space-y-3">
            {children}
        </div>
    </div>
);

const QuoteDetail = ({ label, value }) => {
  if (!value && typeof value !== 'boolean' && value !== 0) return null;
  
  const displayValue = typeof value === 'boolean' ? (value ? 'Ja' : 'Nein') : value;

  return (
    <div className="flex items-start gap-3 text-sm text-gray-700">
      <div>
        <span className="font-semibold text-gray-800">{label}:</span> {displayValue}
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

    return (
        <div>
            <h4 className="font-bold text-md flex items-center gap-2 mb-2 text-gray-700">
                {title}:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 pl-2">
                {street && <li><span className="font-semibold">Strasse:</span> {street}</li>}
                {zip && city && <li><span className="font-semibold">Ort:</span> {zip} {city}</li>}
                {isInternational && country && <li><span className="font-semibold">Land:</span> {country.name}</li>}
                {!isInternational && canton && <li><span className="font-semibold">Kanton:</span> {canton}</li>}
                {floor && <li><span className="font-semibold">Stockwerk:</span> {floor}</li>}
                {lift !== null && <li><span className="font-semibold">Lift:</span> {lift ? 'Ja' : 'Nein'}</li>}
                {rooms && <li><span className="font-semibold">Zimmer:</span> {rooms}</li>}
                {objectType && <li><span className="font-semibold">Objektart:</span> {capitalizeFirstLetter(objectType)}</li>}
            </ul>
        </div>
    );
};

const ContactItem = ({ icon, label, value, subValue, isLink = false, linkType = '' }) => (
    <div className="flex items-start gap-3 py-2 border-b last:border-b-0">
      <div className="mt-1 text-gray-500">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <div className="flex items-center gap-2">
            {isLink && value ? (
              <a href={`${linkType}${value}`} className="text-sm font-medium text-blue-600 hover:underline">{value}</a>
            ) : (
              <p className="text-sm font-medium text-gray-800">{value || 'N/A'}</p>
            )}
            {subValue && <span className="text-xs text-gray-500">({subValue})</span>}
        </div>
      </div>
    </div>
);

const EmailConfirmationDetail = ({ quote }) => {
    const isConfirmed = quote.email_confirmed;
    return (
        <div className="flex items-start gap-3 text-sm text-gray-700">
            <span className="font-semibold text-gray-800">E-Mail-Bestätigung:</span> 
            <span className={isConfirmed ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
                {isConfirmed ? 'Bestätigt' : 'Nicht bestätigt'}
            </span>
        </div>
    );
};

const QuoteDetailView = ({ quote, purchasers = [] }) => {
  if (!quote) return null;
  
  const serviceCategory = getServiceCategory(quote.servicetype);
  
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
      archived: { label: 'Archiviert', className: 'bg-gray-100 text-gray-800 border-gray-200' },
    };
    const { label, className } = statusMap[status] || { label: status, className: 'bg-gray-100 text-gray-800 border-gray-200' };
    return <Badge variant="outline" className={className}>{label}</Badge>;
  };

  return (
    <div className="space-y-4">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
            <File className="w-6 h-6" />
            Anfrage Details
          </h2>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {getStatusBadge(quote.status)}
        </div>
      </header>
      
        <div className="p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b pb-2 mb-4 uppercase">Kundenkontakt</h3>
            <ContactItem icon={<User size={16}/>} label="Anrede" value={quote.salutation} />
            <ContactItem icon={<User size={16}/>} label="Name" value={`${quote.firstname} ${quote.lastname}`} />
            {quote.firmenname && <ContactItem icon={<Building size={16}/>} label="Firma" value={quote.firmenname} />}
            <ContactItem icon={<Phone size={16}/>} label="Telefon" value={quote.phone} />
            <ContactItem icon={<Clock size={16}/>} label="Telefonische Erreichbarkeit" value={quote.preferredtime} />
            <ContactItem icon={<Mail size={16}/>} label="E-Mail" value={quote.email} isLink linkType="mailto:" />
        </div>
        
        <DetailSection title="Dienstleistungsdetails" icon={getServiceIcon()}>
            <QuoteDetail label="Dienstleistung" value={getServiceTypeLabel(quote.servicetype)} />
            <EmailConfirmationDetail quote={quote} />
            {isMovingService(quote.servicetype) && quote.umzugart && quote.umzugart !== 'Privatumzug' && <QuoteDetail label="Umzugsart" value={quote.umzugart} />}
            {isMovingService(quote.servicetype) && quote.additional_services_piano && <QuoteDetail label="Klaviertransport" value="Ja" />}
            {isMovingService(quote.servicetype) && (quote.umzugart === 'Privatumzug' || quote.umzugart === 'Auslandumzug') && quote.services_detail1 && quote.services_detail1.includes('Möbel De-/Montage: Ja') && <QuoteDetail label="Möbel De-/Montage" value="Ja" />}
            {isMovingService(quote.servicetype) && <QuoteDetail label="Spezialtransport Art" value={quote.special_transport_type} />}
            {isMovingService(quote.servicetype) && <QuoteDetail label="Details Spezialtransport" value={quote.special_transport_other_details} />}

            {isCleaningService(quote.servicetype) && <CleaningDetails details={quote} />}
            {isPaintingService(quote.servicetype) && <PaintingDetails details={quote} />}
        </DetailSection>

        <DetailSection title={isMovingService(quote.servicetype) ? "Umzugsadressen" : "Objektadresse"} icon={MapPin}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AddressBox title={isMovingService(quote.servicetype) ? "Von Adresse" : "Adresse"} quote={quote} type="from" />
                {isMovingService(quote.servicetype) && (quote.to_zip || quote.to_street || quote.to_city) && (
                    <AddressBox title="Nach Adresse" quote={quote} type="to" />
                )}
            </div>
        </DetailSection>
        
        <DetailSection title="Termin & Zusatzinformationen" icon={Calendar}>
            <QuoteDetail label="Wunschtermin" value={formatDate(quote.move_date)} />
            <QuoteDetail label="Termin flexibel" value={quote.move_date_flexible} />
        </DetailSection>

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

        {purchasers && purchasers.length > 0 && (
            <DetailSection title="Gekauft von" icon={Users}>
              <ul className="text-sm text-gray-600 space-y-2">
                {purchasers.map(p => <li key={p.id} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500"/>{p.company_name}</li>)}
              </ul>
            </DetailSection>
        )}
    </div>
  );
};

export default QuoteDetailView;