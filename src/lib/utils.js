import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

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
    return format(date, 'dd. MMMM yyyy', { locale: de });
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
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