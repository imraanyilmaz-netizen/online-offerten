import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, FileText, Phone, Globe, Sparkles, ArrowRight } from 'lucide-react';

/** Gleiche Textquellen wie die öffentliche Profilseite (PartnerProfilePageClient). */
function getCompanyDescriptionText(partner) {
  if (!partner) return '';
  const raw =
    partner.message ??
    partner.company_description ??
    partner.description ??
    '';
  return String(raw).trim();
}

/**
 * Zeigt eine freundliche Erinnerung, wenn das öffentliche Partnerprofil
 * unvollständig ist (Logo, Firmenbeschreibung, Telefonnummer, Webseite, Hero-Bild).
 * Wird ausgeblendet, sobald alles ausgefüllt ist.
 */
const ProfileCompletionBanner = ({ partnerData }) => {
  if (!partnerData) return null;

  const checks = [
    {
      key: 'logo',
      label: 'Firmenlogo',
      icon: ImageIcon,
      ok: Boolean(partnerData.logo_url && String(partnerData.logo_url).trim().length > 0),
    },
    {
      key: 'description',
      label: 'Firmenbeschreibung',
      icon: FileText,
      // Kein Mindestzeichenlimit: sobald etwas Gespeichertes vorliegt, gilt die Beschreibung als vorhanden.
      ok: getCompanyDescriptionText(partnerData).length > 0,
    },
    {
      key: 'phone',
      label: 'Telefonnummer',
      icon: Phone,
      ok: Boolean(partnerData.phone && String(partnerData.phone).trim().length > 0),
    },
    {
      key: 'website',
      label: 'Webseite',
      icon: Globe,
      ok: Boolean(partnerData.website && String(partnerData.website).trim().length > 0),
    },
    {
      key: 'hero',
      label: 'Titelbild (Hero)',
      icon: Sparkles,
      ok: Boolean(partnerData.hero_image_url && String(partnerData.hero_image_url).trim().length > 0),
    },
  ];

  const missing = checks.filter((c) => !c.ok);
  if (missing.length === 0) return null;

  const total = checks.length;
  const completed = total - missing.length;
  const percent = Math.round((completed / total) * 100);

  return (
    <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/60 dark:bg-amber-950/30">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
              Profil zu {percent}% ausgefüllt
            </p>
            <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800 dark:border-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
              {completed} / {total}
            </span>
          </div>
          <p className="mt-1 text-sm text-amber-800/90 dark:text-amber-200/90">
            Vervollständigen Sie Ihr öffentliches Profil, um das Vertrauen Ihrer Kunden zu stärken und mehr Anfragen zu erhalten.
          </p>

          {/* Fortschrittsbalken */}
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-amber-100 dark:bg-amber-900/40">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500 dark:from-amber-500 dark:to-amber-300"
              style={{ width: `${percent}%` }}
              aria-hidden
            />
          </div>

          {/* Eksik alan listesi */}
          <ul className="mt-3 flex flex-wrap gap-2">
            {missing.map(({ key, label, icon: Icon }) => (
              <li
                key={key}
                className="inline-flex items-center gap-1.5 rounded-md border border-amber-300/80 bg-white/80 px-2 py-1 text-xs font-medium text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200"
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-shrink-0 self-start">
          <Button asChild size="sm" className="bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-amber-950">
            <Link href="/partner/einstellungen">
              Jetzt vervollständigen
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionBanner;
