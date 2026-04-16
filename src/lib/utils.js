import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from 'date-fns';
import { de } from 'date-fns/locale/de';

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function normalizeFileName(fileName) {
  if (!fileName) return '';

  const cleanedName = fileName
    // German umlauts
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/Ä/g, 'Ae')
    .replace(/Ö/g, 'Oe')
    .replace(/Ü/g, 'Ue')
    .replace(/ß/g, 'ss')
    // Spaces and special characters to hyphens
    .replace(/[^a-zA-Z0-9.\-]/g, '-')
    // Replace multiple hyphens with a single one
    .replace(/-+/g, '-')
    // Trim hyphens from start and end
    .replace(/^-+|-+$/g, '');

  return cleanedName.toLowerCase();
}

export function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return original string if invalid date
    }
    return format(date, 'EEEE, dd. MMMM yyyy', { locale: de });
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
}

/** First letter of first name + first letter of last name (e.g. Katharina Baumgartner → KB). */
export function getCustomerInitials(fullName) {
  const trimmed = (fullName || '').trim();
  if (!trimmed) return '?';
  const parts = trimmed.split(/\s+/).filter(Boolean);
  const take = (s) => (s && s[0] ? s[0].toUpperCase() : '');
  if (parts.length >= 2) {
    return `${take(parts[0])}${take(parts[parts.length - 1])}` || '?';
  }
  const single = parts[0];
  if (single.length >= 2) return `${take(single)}${single[1].toUpperCase()}`;
  return take(single) || '?';
}

/** Formular-Checkbox „Datum ist flexibel“ / DB (boolean, Ja/Nein) */
export function isMoveDateFlexible(moveDateFlexible) {
  if (moveDateFlexible === true) return true;
  if (moveDateFlexible === false || moveDateFlexible == null || moveDateFlexible === '') return false;
  if (typeof moveDateFlexible === 'string') {
    const s = moveDateFlexible.trim().toLowerCase();
    if (s === 'nein' || s === 'false' || s === '0') return false;
    if (s === 'ja' || s === 'true' || s === '1' || s === 'yes') return true;
  }
  return Boolean(moveDateFlexible);
}

/** „Flexibler Termin – …“ oder „Fester Termin – …“ + formatiertes Datum */
export function formatMoveDateLine(moveDate, moveDateFlexible) {
  const datePart = formatDate(moveDate);
  if (!datePart) return '';
  const prefix = isMoveDateFlexible(moveDateFlexible) ? 'Flexibler Termin' : 'Fester Termin';
  return `${prefix} – ${datePart}`;
}

/**
 * Stockwerk-Texte bereinigen: korrekte "N. Etage" bleibt erhalten;
 * fehlerhafte Mehrfach-"Etage" (z. B. durch altes QuoteEditForm-formatFloor) wird zu "N. Etage".
 */
export function normalizeFloorLabel(floor) {
  if (floor == null || floor === '') return floor;
  const s = String(floor).trim();
  if (!s) return s;

  const lower = s.toLowerCase().replace(/\s+/g, ' ');

  if (/^(\d+)\.\s*etage$/.test(lower)) {
    const n = lower.match(/^(\d+)/)[1];
    return `${n}. Etage`;
  }

  if (/^(\d+)(?:[\s.]*etage)+[\s.]*$/i.test(lower)) {
    const n = lower.match(/^(\d+)/)[1];
    return `${n}. Etage`;
  }

  if (/^\d+\.?$/i.test(s.trim())) {
    return `${parseInt(s, 10)}. Etage`;
  }

  return s;
}

export function getServiceTypeLabel(serviceType) {
  switch (serviceType) {
    case 'Reinigung': return 'Reinigung';
    case 'Privatumzug': return 'Privatumzug';
    case 'Geschaeftsumzug': return 'Geschäftsumzug';
    case 'Internationalumzug': return 'Internationaler Umzug';
    case 'Spezialtransporte': return 'Spezialtransporte';
    case 'Klaviertransport': return 'Klaviertransport';
    case 'RaeumungEntsorgung': return 'Räumung & Entsorgung';
    case 'Malerarbeiten': return 'Malerarbeiten';
    default: return serviceType;
  }
}

/**
 * "Umzugsart" nur anzeigen, wenn sie nicht dieselbe Info wie "Dienstleistung" wiederholt
 * (z. B. Kleintransport in beiden Feldern). Vergleicht Rohwert und getServiceTypeLabel(servicetype).
 * @param {string|null|undefined} umzugart
 * @param {string|null|undefined} servicetype – quotes.servicetype
 */
export function shouldShowUmzugsartDetail(umzugart, servicetype) {
  if (umzugart == null || String(umzugart).trim() === '' || umzugart === 'Privatumzug') {
    return false;
  }
  const norm = (s) => String(s ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
  const u = norm(umzugart);
  const sameAsService =
    u === norm(servicetype) || u === norm(getServiceTypeLabel(servicetype));
  return !sameAsService;
}

export function parseFileUrls(urls) {
  if (!urls) {
    return [];
  }

  // If it's already an array, return it directly.
  if (Array.isArray(urls)) {
    return urls.filter(url => typeof url === 'string' && url.length > 0);
  }

  // If it's not a string, we can't parse it.
  if (typeof urls !== 'string') {
    return [];
  }

  // Trim whitespace
  const trimmedUrls = urls.trim();
  if (trimmedUrls === '') {
    return [];
  }

  // Try to parse as JSON array
  if (trimmedUrls.startsWith('[') && trimmedUrls.endsWith(']')) {
    try {
      const parsed = JSON.parse(trimmedUrls);
      if (Array.isArray(parsed)) {
        return parsed.filter(url => typeof url === 'string' && url.length > 0);
      }
    } catch (e) {
      // Not a valid JSON array, fall through to other methods
    }
  }

  // Try to parse as Postgres-style array string (e.g., "{url1,url2}")
  if (trimmedUrls.startsWith('{') && trimmedUrls.endsWith('}')) {
    const content = trimmedUrls.substring(1, trimmedUrls.length - 1);
    // Handle quoted strings inside the array
    if (content.includes('"')) {
       // This regex handles double-quoted strings that may contain commas
       const regex = /"([^"]+)"/g;
       let match;
       const results = [];
       while ((match = regex.exec(content)) !== null) {
         results.push(match[1]);
       }
       if (results.length > 0) return results;
    }
    return content.split(',').map(item => item.trim()).filter(Boolean);
  }
  
  // Finally, try to parse as comma-separated string
  return trimmedUrls.split(',').map(item => item.trim()).filter(Boolean);
}