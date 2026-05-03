import React from 'react';
import { AlertTriangle, ShieldCheck, Info, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InsuranceBanner = ({ partnerData, onUploadClick }) => {
  const status = partnerData?.insurance_status;
  const validUntil = partnerData?.insurance_valid_until;

  if (!status) return null;

  // none / pending_upload / deadline_passed: noch nicht hochgeladen — freiwilliger Hinweis
  if (status === 'none' || status === 'pending_upload' || status === 'deadline_passed') {
    return (
      <div className="mb-6 p-4 rounded-lg border border-blue-200 bg-blue-50 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-blue-800">
            Betriebshaftpflichtversicherung
          </p>
          <p className="text-sm text-blue-700">
            Steigern Sie das Vertrauen Ihrer Kunden: Laden Sie Ihre Betriebshaftpflichtversicherung hoch und erhalten Sie ein Verifizierungs-Badge in Ihrem Profil.
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={onUploadClick} className="border-blue-300 text-blue-700 hover:bg-blue-100">
          <Upload className="w-4 h-4 mr-1.5" /> Hochladen
        </Button>
      </div>
    );
  }

  // approved: nur Hinweis wenn Versicherung bald abläuft
  if (status === 'approved') {
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
                Gültig bis {new Date(validUntil).toLocaleDateString('de-DE')} — noch {daysLeft} {daysLeft === 1 ? 'Tag' : 'Tage'}. Bitte aktualisieren Sie Ihre Unterlagen, damit Ihr Verifizierungs-Badge erhalten bleibt.
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

  // in_review: wird gerade vom Team geprüft
  if (status === 'in_review') {
    return (
      <div className="mb-6 p-4 rounded-lg border border-blue-300 bg-blue-50 flex items-start sm:items-center gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-blue-800">
            Versicherung wird geprüft
          </p>
          <p className="text-sm text-blue-700">
            Ihre Unterlagen werden derzeit von unserem Team überprüft. Sie werden per E-Mail informiert, sobald das Verifizierungs-Badge freigeschaltet ist.
          </p>
        </div>
      </div>
    );
  }

  // rejected: Admin hat abgelehnt — freundliche Aufforderung
  if (status === 'rejected') {
    return (
      <div className="mb-6 p-4 rounded-lg border border-orange-300 bg-orange-50 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Info className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-orange-800">
            Versicherungsdokument konnte nicht akzeptiert werden
          </p>
          <p className="text-sm text-orange-700">
            Für das Verifizierungs-Badge laden Sie bitte ein gültiges Dokument hoch.
            {partnerData?.insurance_rejection_reason && (
              <span className="block mt-1 italic">Grund: {partnerData.insurance_rejection_reason}</span>
            )}
          </p>
        </div>
        <Button size="sm" variant="outline" className="border-orange-400 text-orange-700 hover:bg-orange-100" onClick={onUploadClick}>
          <Upload className="w-4 h-4 mr-1.5" /> Erneut hochladen
        </Button>
      </div>
    );
  }

  // expired: Versicherung abgelaufen — freundliche Aktualisierungs-Aufforderung
  if (status === 'expired') {
    return (
      <div className="mb-6 p-4 rounded-lg border border-orange-300 bg-orange-50 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-orange-800">
            Ihre Versicherung ist abgelaufen
          </p>
          <p className="text-sm text-orange-700">
            Bitte laden Sie eine aktuelle Versicherungsbescheinigung hoch, damit Ihr Verifizierungs-Badge weiterhin angezeigt wird.
          </p>
        </div>
        <Button size="sm" variant="outline" className="border-orange-400 text-orange-700 hover:bg-orange-100" onClick={onUploadClick}>
          <Upload className="w-4 h-4 mr-1.5" /> Aktualisieren
        </Button>
      </div>
    );
  }

  return null;
};

export default InsuranceBanner;
