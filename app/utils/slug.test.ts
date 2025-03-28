import { describe, test, expect } from 'vitest';
import type { Route } from '+/app/routes/($lang)/$/+types/_pages';
import { parseParamsToSlug } from 'app/utils/slug';

type Params = Route.ComponentProps['params'];

describe('parseURL', () => {
  test('Return the correct urls for "/contact"', () => {
    let params: Params = {
      lang: 'contact',
      '*': '',
    };

    expect(parseParamsToSlug(params)).toEqual('contact');

    params = {
      lang: 'nl',
      '*': 'contact',
    };

    expect(parseParamsToSlug(params)).toEqual('nl/contact');

    params = {
      lang: 'en',
      '*': 'contact',
    };

    expect(parseParamsToSlug(params)).toEqual('en/contact');
  });

  test('Return the correct url for "/over-ons/team"', () => {
    let params: Params = {
      lang: 'over-ons',
      '*': 'team',
    };

    expect(parseParamsToSlug(params)).toEqual('over-ons/team');

    params = {
      lang: 'nl',
      '*': 'over-ons/team',
    };

    expect(parseParamsToSlug(params)).toEqual('nl/over-ons/team');

    params = {
      lang: 'en',
      '*': 'over-ons/team',
    };

    expect(parseParamsToSlug(params)).toEqual('en/over-ons/team');
  });
});
