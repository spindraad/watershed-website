import { describe, test, expect } from 'vitest';
import type { Route } from '+/app/routes/($lang)/$/+types/_pages';
import { isSupportedLanguage, parseParamsToSlug } from 'app/utils/slug';

type Params = Route.ComponentProps['params'];

describe("URL's", () => {
  test('Return the correct urls for "/contact"', () => {
    let params: Params = {
      lang: 'contact',
      '*': '',
    };

    expect(parseParamsToSlug(params)).toStrictEqual({
      locale: 'nl',
      slug: 'contact',
      path: 'nl/contact',
    });

    params = {
      lang: 'nl',
      '*': 'contact',
    };

    expect(parseParamsToSlug(params)).toStrictEqual({
      locale: 'nl',
      slug: 'contact',
      path: 'nl/contact',
    });

    params = {
      lang: 'en',
      '*': 'contact',
    };

    expect(parseParamsToSlug(params)).toStrictEqual({
      locale: 'en',
      slug: 'contact',
      path: 'en/contact',
    });
  });

  test('Return the correct url for "/over-ons/team"', () => {
    let params: Params = {
      lang: 'over-ons',
      '*': 'team',
    };

    expect(parseParamsToSlug(params)).toStrictEqual({
      locale: 'nl',
      slug: 'over-ons/team',
      path: 'nl/over-ons/team',
    });

    params = {
      lang: 'nl',
      '*': 'over-ons/team',
    };

    expect(parseParamsToSlug(params)).toStrictEqual({
      locale: 'nl',
      slug: 'over-ons/team',
      path: 'nl/over-ons/team',
    });

    params = {
      lang: 'en',
      '*': 'over-ons/team',
    };

    expect(parseParamsToSlug(params)).toStrictEqual({
      locale: 'en',
      slug: 'over-ons/team',
      path: 'en/over-ons/team',
    });
  });

  test('Test whether a supported language is recognized', () => {
    expect(isSupportedLanguage('nl')).toBe(true);
    expect(isSupportedLanguage('en')).toBe(true);
    expect(isSupportedLanguage('pap')).toBe(true);
    expect(isSupportedLanguage('fr')).toBe(false);
    expect(isSupportedLanguage('de')).toBe(false);
    expect(isSupportedLanguage('about')).toBe(false);
    expect(isSupportedLanguage('contact')).toBe(false);
    expect(isSupportedLanguage('over-ons/team')).toBe(false);
  });
});
