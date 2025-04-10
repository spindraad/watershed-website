import { test, expect } from 'vitest';
import { pageValidator } from './page';

test('Validating the page', () => {
  const validData = {
    content: {
      en: {},
      nl: {},
      pap: {},
    },
    slug: 'valid-slug',
  };

  const invalidData = {
    content: {
      en: {},
      nl: {},
      pap: {},
    },
    slug: '',
  };

  const validResult = pageValidator.safeParse(validData);
  const invalidResult = pageValidator.safeParse(invalidData);

  expect(validResult.success).toBe(true);
  expect(invalidResult.success).toBe(false);
  // expect(invalidResult.error.format()).toEqual({
  //   slug: {
  //     _errors: ['Invalid string'],
  //   },
  // });
});
