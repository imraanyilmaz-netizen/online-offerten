'use client';

import { useCallback, useMemo } from 'react';
import {
  translate,
  type StaticNamespace,
  type TranslateOptions,
} from '@/lib/deTranslations';

export type { StaticNamespace, TranslateOptions } from '@/lib/deTranslations';
export { translate, tNewCustomerFormDe } from '@/lib/deTranslations';

export function useStaticT(ns: StaticNamespace) {
  const t = useCallback(
    (key: string, options?: TranslateOptions) => {
      const v = translate(ns, key, options);
      if (options?.returnObjects) {
        return v;
      }
      if (typeof v === 'string') return v;
      return String(v ?? key);
    },
    [ns]
  );

  const value = useMemo(
    () => ({
      t,
      ready: true,
    }),
    [t]
  );

  return value;
}
