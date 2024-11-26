import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import * as englishBundle from '~/locales/en';
import * as dutchBundle from '~/locales/nl';

export const resources = {
  en: englishBundle,
  nl: dutchBundle,
};

const ns = ['common'];
const supportedLngs = ['en', 'nl'];

// eslint-disable-next-line import/no-named-as-default-member
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    //debug: true,
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: 'common',
    ns,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    supportedLngs,
    resources,
  });

export default i18next;
