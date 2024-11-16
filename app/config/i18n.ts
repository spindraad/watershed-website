import { serverOnly$ } from 'vite-env-only/macros';

import * as englishBundle from '~/locales/en';
import * as dutchBundle from '~/locales/nl';
import * as papiamentuBundle from '~/locales/pap';

// List of supported languages, where NL is the default language.
export const supportedLanguages = ['en', 'pap', 'nl'] as string[];

// Fallback language if somehow the detected language is not supported.
export const fallbackLanguage = 'nl';

export const defaultNS = 'common';

export const resources = serverOnly$({
  en: englishBundle,
  nl: dutchBundle,
  pap: papiamentuBundle,
});
