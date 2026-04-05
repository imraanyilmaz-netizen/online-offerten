import newCustomerFormDe from '../../public/locales/de/newCustomerForm.json';
import partnerProfilePageDe from '../translations/de/partnerProfilePage.json';
import partnerDashboardDe from '../translations/de/partnerDashboard.json';
import reinigungPageDe from '../translations/de/reinigungPage.json';
import privateUmzugPageDe from '../translations/de/privateUmzugPage.json';

export type StaticNamespace =
  | 'newCustomerForm'
  | 'partnerProfilePage'
  | 'partnerDashboard'
  | 'reinigungPage'
  | 'privateUmzugPage';

const bundles: Record<StaticNamespace, Record<string, unknown>> = {
  newCustomerForm: newCustomerFormDe as Record<string, unknown>,
  partnerProfilePage: partnerProfilePageDe as Record<string, unknown>,
  partnerDashboard: partnerDashboardDe as Record<string, unknown>,
  reinigungPage: reinigungPageDe as Record<string, unknown>,
  privateUmzugPage: privateUmzugPageDe as Record<string, unknown>,
};

function getByPath(obj: unknown, path: string): unknown {
  if (obj === null || obj === undefined) return undefined;
  const parts = path.split('.');
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in (cur as object)) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }
  return cur;
}

export type TranslateOptions = {
  returnObjects?: boolean;
  [key: string]: unknown;
};

export function translate(
  ns: StaticNamespace,
  key: string,
  options?: TranslateOptions
): string | unknown[] | Record<string, unknown> | undefined {
  const raw = getByPath(bundles[ns], key);

  if (options?.returnObjects) {
    return raw as unknown[] | Record<string, unknown> | undefined;
  }

  if (Array.isArray(raw) || (raw && typeof raw === 'object' && typeof raw !== 'string')) {
    return key;
  }

  if (typeof raw !== 'string') {
    return String(raw ?? key);
  }

  let s = raw;
  if (options) {
    s = s.replace(/\{\{(\w+)\}\}/g, (_, name: string) =>
      String(options[name] ?? '')
    );
  }
  return s;
}

export function tNewCustomerFormDe(
  key: string,
  options?: TranslateOptions
): string {
  const v = translate('newCustomerForm', key, options);
  return typeof v === 'string' ? v : String(v);
}
