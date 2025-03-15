import { serverOnly$ } from 'vite-env-only/macros';

import * as englishBundle from '~/locales/en';
import * as dutchBundle from '~/locales/nl';
import * as papiamentuBundle from '~/locales/pap';
import { FormatFunction } from 'i18next';

// List of supported languages, where NL is the default language.
export const supportedLanguages = ['en', 'pap', 'nl'];

export type SupportedLanguages = (typeof supportedLanguages)[number];

// Fallback language if somehow the detected language is not supported.
export const fallbackLanguage = 'nl';

export const defaultNS = 'common';

export const resources = serverOnly$({
  en: englishBundle,
  nl: dutchBundle,
  pap: papiamentuBundle,
});

type Formatter = {
  name: string;
  func: FormatFunction;
};
export const formatters: Formatter[] = [
  {
    name: 'lowercase',
    func: (value: string) => {
      return value.toLowerCase();
    },
  },
  {
    name: 'uppercase',
    func: (value: string) => {
      return value.toUpperCase();
    },
  },
  {
    name: 'capitalize',
    func: (value: string) => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
];
