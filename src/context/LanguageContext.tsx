import React from 'react';

import { type Locale, messages } from '../i18n/messages';

const STORAGE_KEY = 'forge.locale';

export type TranslateFn = (key: string) => string;

function readStoredLocale(): Locale {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'ko' || raw === 'en') return raw;
  } catch {
    // ignore
  }
  return 'en';
}

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslateFn;
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [locale, setLocaleState] = React.useState<Locale>(() => readStoredLocale());

  React.useEffect(() => {
    document.documentElement.lang = locale === 'ko' ? 'ko' : 'en';
  }, [locale]);

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const t = React.useCallback(
    (key: string): string => {
      const pack = messages[locale];
      const fallback = messages.en;
      if (Object.prototype.hasOwnProperty.call(pack, key)) return pack[key];
      if (Object.prototype.hasOwnProperty.call(fallback, key)) return fallback[key];
      return key;
    },
    [locale],
  );

  const value = React.useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
