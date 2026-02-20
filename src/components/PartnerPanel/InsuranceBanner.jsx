import React from 'react';
import { AlertTriangle, Clock, XCircle, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InsuranceBanner = ({ partnerData, onUploadClick }) => {
  const status = partnerData?.insurance_status;
  const validUntil = partnerData?.insurance_valid_until;

  // Kein Banner nötig wenn status fehlt
  if (!status) return null;

  // none: Eski partner, henüz sigorta yüklenmemiş — pending_upload gibi göster
  if (status === 'none') {
    return (
      <div className="mb-6 p-4 rounded-lg border border-yellow-300 bg-yellow-50 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-yellow-800">
            Betriebshaftpflichtversicherung erforderlich
          </p>
          <p className="text-sm text-yellow-700">
            Ihr Profil ist aktiv. Bitte laden Sie Ihre Betriebshaftpflichtversicherung hoch, um Anfragen kaufen zu können.
          </p>
        </div>
        <Button size="sm" onClick={onUploadClick} className="bg-yellow-600 hover:bg-yellow-700 text-white">
          <Upload className="w-4 h-4 mr-1.5" /> Jetzt hochladen
        </Button>
      </div>
    );
  }

  // approved: Kein Banner — Partner wird per E-Mail informiert
  if (status === 'approved') {
    // Nur Warnung anzeigen wenn Versicherung bald abläuft (30 Tage)
    if (validUntil) {
      const daysLeft = Math.ceil((new Date(validUntil) - new Date()) / (1000 * 60 * 60 * 24));
      if (daysLeft <= 30 && daysLeft > 0) {
        return (
          <div className="mb-6 p-4 rounded-lg border border-orange-300 bg-orange-50 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5 sm:mt-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-orange-800">
                Ihre Versicherung läuft bald ab
              </p>
              <p className="text-sm text-orange-700">
                Gültig bis {new Date(validUntil).toLocaleDateString('de-DE')} — noch {daysLeft} {daysLeft === 1 ? 'Tag' : 'Tage'}. Bitte aktualisieren Sie Ihre Unterlagen.
              </p>
            </div>
            <Button size="sm" variant="outline" className="border-orange-400 text-orange-700 hover:bg-orange-100" onClick={onUploadClick}>
              <Upload className="w-4 h-4 mr-1.5" /> Aktualisieren
            </Button>
          </div>
        );
      }
    }
    return null;
  }

  // pending_upload: Partner muss noch hochladen
  if (status === 'pending_upload') {
    return (
      <div className="mb-6 p-4 rounded-lg border border-yellow-300 bg-yellow-50 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-yellow-800">
            Betriebshaftpflichtversicherung erforderlich
          </p>
          <p className="text-sm text-yellow-700">
            Ihr Profil ist aktiv. Bitte laden Sie Ihre Betriebshaftpflichtversicherung hoch, um Anfragen kaufen zu können.
          </p>
        </div>
        <Button size="sm" onClick={onUploadClick} className="bg-yellow-600 hover:bg-yellow-700 text-white">
          <Upload className="w-4 h-4 mr-1.5" /> Jetzt hochladen
        </Button>
      </div>
    );
  }

  // in_review: Dokument wurde hochgeladen, wird geprüft
  if (status === 'in_review') {
    return (
      <div className="mb-6 p-4 rounded-lg border border-blue-300 bg-blue-50 flex items-start sm:items-center gap-3">
        <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-blue-800">
            Versicherung wird geprüft
          </p>
          <p className="text-sm text-blue-700">
            Ihre Unterlagen werden derzeit von unserem Team überprüft. Käufe sind erst nach Freigabe möglich.
          </p>
        </div>
      </div>
    );
  }

  // rejected: Admin hat abgelehnt
  if (status === 'rejected') {
    return (
      <div className="mb-6 p-4 rounded-lg border border-red-300 bg-red-50 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-red-800">
            Versicherung abgelehnt
          </p>
          <p className="text-sm text-red-700">
            Ihre Versicherungsunterlagen wurden abgelehnt. Bitte laden Sie ein gültiges Dokument hoch.
            {partnerData?.insurance_rejection_reason && (
              <span className="block mt-1 italic">Grund: {partnerData.insurance_rejection_reason}</span>
            )}
          </p>
        </div>
        <Button size="sm" variant="outline" className="border-red-400 text-red-700 hover:bg-red-100" onClick={onUploadClick}>
          <Upload className="w-4 h-4 mr-1.5" /> Erneut hochladen
        </Button>
      </div>
    );
  }

  // expired: Versicherung abgelaufen
  if (status === 'expired') {
    return (
      <div className="mb-6 p-4 rounded-lg border border-red-300 bg-red-50 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-red-800">
            Versicherung abgelaufen
          </p>
          <p className="text-sm text-red-700">
            Ihre Versicherung ist abgelaufen. Anfragen können erst nach Einreichung und Genehmigung neuer Unterlagen gekauft werden.
          </p>
        </div>
        <Button size="sm" variant="outline" className="border-red-400 text-red-700 hover:bg-red-100" onClick={onUploadClick}>
          <Upload className="w-4 h-4 mr-1.5" /> Neue Versicherung hochladen
        </Button>
      </div>
    );
  }

  // deadline_passed: Gleich wie pending_upload behandeln
  if (status === 'deadline_passed') {
    return (
      <div className="mb-6 p-4 rounded-lg border border-yellow-300 bg-yellow-50 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-yellow-800">
            Betriebshaftpflichtversicherung erforderlich
          </p>
          <p className="text-sm text-yellow-700">
            Ihr Profil ist aktiv. Bitte laden Sie Ihre Betriebshaftpflichtversicherung hoch, um Anfragen kaufen zu können.
          </p>
        </div>
        <Button size="sm" onClick={onUploadClick} className="bg-yellow-600 hover:bg-yellow-700 text-white">
          <Upload className="w-4 h-4 mr-1.5" /> Jetzt hochladen
        </Button>
      </div>
    );
  }

  return null;
};

export default InsuranceBanner;
