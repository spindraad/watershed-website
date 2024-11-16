import { createCookie } from '@remix-run/node';
import { RemixI18Next } from 'remix-i18next/server';

import * as i18n from '~/config/i18n';

export const localeCookie = createCookie('locale', {
  path: '/',
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
});

export default new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLanguages,
    fallbackLanguage: i18n.fallbackLanguage,
    cookie: localeCookie,
    async findLocale(request) {
      const parts = new URL(request.url);
      const locale = parts.pathname.split('/')[1];
      if (i18n.supportedLanguages.includes(locale)) {
        return locale;
      }

      return i18n.fallbackLanguage;
    },
  },
  i18next: {
    ...i18n,
  },
});
