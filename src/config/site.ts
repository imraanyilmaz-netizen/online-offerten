type SiteConfig = {
  /** Full origin, e.g. https://example.com */
  url: string;
  /** Human readable brand/site name, e.g. Example.com */
  name: string;
  /** Hostname only, e.g. example.com */
  domain: string;
  /** Public logo URL */
  logoUrl: string;
  /** Default OpenGraph image URL */
  ogImageUrl: string;
  /** Public contact email shown in footer etc. */
  contactEmail: string;
};

function toOrigin(input: string | undefined, fallbackOrigin: string): string {
  const candidate = (input ?? '').trim();
  try {
    const url = new URL(candidate || fallbackOrigin);
    return url.origin;
  } catch {
    return fallbackOrigin;
  }
}

const DEFAULT_SITE_URL = 'https://online-offerten.ch';
const DEFAULT_SITE_NAME = 'Online-Offerten.ch';
const DEFAULT_CONTACT_EMAIL = 'info@online-offerten.ch';

const url = toOrigin(process.env.NEXT_PUBLIC_SITE_URL, DEFAULT_SITE_URL);
const domain = (() => {
  try {
    return new URL(url).hostname;
  } catch {
    return 'online-offerten.ch';
  }
})();

export const siteConfig: SiteConfig = {
  url,
  domain,
  name: (process.env.NEXT_PUBLIC_SITE_NAME || DEFAULT_SITE_NAME).trim() || DEFAULT_SITE_NAME,
  logoUrl: `${url}/image/logo-icon.webp`,
  ogImageUrl: `${url}/image/online-offerten.webp`,
  contactEmail:
    (process.env.NEXT_PUBLIC_CONTACT_EMAIL || DEFAULT_CONTACT_EMAIL).trim() || DEFAULT_CONTACT_EMAIL,
};

