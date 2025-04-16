import { test, expect, describe } from 'vitest';
import { pageValidator } from './page';

describe('Validating page requests', () => {
  test('Page request should validate successfully', () => {
    const validData = {
      content: {
        en: {
          root: {},
          content: [],
        },
        nl: {
          root: {},
          content: [],
        },
        pap: {
          root: {},
          content: [],
        },
      },
      slug: 'valid-slug',
    };

    const invalidData = {
      content: {
        en: {
          root: {},
          content: [],
        },
        nl: {
          root: {},
          content: [],
        },
        pap: {
          root: {},
          content: [],
        },
      },
      slug: '',
    };

    const validResult = pageValidator.safeParse(validData);
    const invalidResult = pageValidator.safeParse(invalidData);

    expect(validResult.success).toBe(true);
    expect(invalidResult.success).toBe(false);
    expect(invalidResult.error!.format()).toEqual({
      _errors: [],
      slug: {
        _errors: ['String must contain at least 1 character(s)'],
      },
    });
  });

  test('Page request should transform slug correctly', () => {
    const data = {
      content: {
        en: {
          root: {
            props: {
              slug: '/valid-slug',
            },
          },
          content: [],
        },
        nl: {
          root: {
            props: {
              slug: '/valid-slug',
            },
          },
          content: [],
        },
        pap: {
          root: {
            props: {
              slug: '/valid-slug',
            },
          },
          content: [],
        },
      },
      slug: '/valid-slug',
    };

    const result = pageValidator.safeParse(data);

    expect(result.success).toBe(true);
    expect(result.data!).toStrictEqual({
      content: {
        en: {
          content: [],
          root: {
            props: {
              slug: 'valid-slug',
            },
          },
        },
        nl: {
          content: [],
          root: {
            props: {
              slug: 'valid-slug',
            },
          },
        },
        pap: {
          content: [],
          root: {
            props: {
              slug: 'valid-slug',
            },
          },
        },
      },
      slug: 'valid-slug',
    });

    data.content.en.root.props.slug = 'another-valid-slug';
    data.content.nl.root.props.slug = 'another-valid-slug';
    data.content.pap.root.props.slug = 'another-valid-slug';
    data.slug = 'another-valid-slug';

    const result2 = pageValidator.safeParse(data);
    expect(result2.success).toBe(true);
    expect(result2.data!).toStrictEqual({
      content: {
        en: {
          content: [],
          root: {
            props: {
              slug: 'another-valid-slug',
            },
          },
        },
        nl: {
          content: [],
          root: {
            props: {
              slug: 'another-valid-slug',
            },
          },
        },
        pap: {
          content: [],
          root: {
            props: {
              slug: 'another-valid-slug',
            },
          },
        },
      },
      slug: 'another-valid-slug',
    });
  });
});
