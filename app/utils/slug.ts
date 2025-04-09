import type { Route } from '+/app/routes/($lang)/$/+types/_pages';
import {
  fallbackLanguage,
  supportedLanguages,
  SupportedLanguages,
} from '~/config/i18n';

export type SlugObject = {
  locale: string;
  slug: string;
  path: string;
};

export function parseParamsToSlug(
  params: Route.ComponentProps['params'],
): SlugObject {
  const { lang, '*': parts } = params;

  if (lang === 'en' || lang === 'pap') {
    return {
      locale: lang,
      slug: parts,
      path: `${lang}/${parts}`,
    };
  } else if (lang === 'nl') {
    return {
      locale: lang,
      slug: parts,
      path: `${lang}/${parts}`,
    };
  }

  const slug = [lang, parts].filter(Boolean).join('/');
  return {
    locale: fallbackLanguage,
    slug,
    path: `${fallbackLanguage}/${slug}`,
  };
}

export function isSupportedLanguage(lang: string): lang is SupportedLanguages {
  return supportedLanguages.includes(lang);
}
