import { createCookie } from 'react-router';
import { RemixI18Next } from 'remix-i18next/server';

import * as i18n from '~/config/i18n';
import { FormatFunction } from 'i18next';

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
    interpolation: {
      format: (value, format) => {
        // TODO: Remove this when i18n is updated to latest
        if (format) {
          const { formatters } = i18n;

          const formatterFunc: FormatFunction | undefined = formatters.find(
            (formatter) => formatter.name === format,
          )?.func;

          if (formatterFunc) {
            return formatterFunc(value);
          }
        }

        return value;
      },
    },
  },
});
