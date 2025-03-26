import { describe, expect, test } from 'vitest';
import { countErrorsForLocalisedFields, transformFormData } from './content';

describe('Content utilities', () => {
  test('Parse a localised form data object into a localised value object', () => {
    const formData = new FormData();
    formData.append('title.en', 'Hello');
    formData.append('title.nl', 'Hallo');
    formData.append('title.pap', 'Bon dia');
    formData.append('description.en', 'World');
    formData.append('description.nl', 'Wereld');
    formData.append('description.pap', 'Mundu');

    const result = transformFormData(formData);

    expect(result).toEqual({
      title: {
        en: 'Hello',
        nl: 'Hallo',
        pap: 'Bon dia',
      },
      description: {
        en: 'World',
        nl: 'Wereld',
        pap: 'Mundu',
      },
    });
  });

  test('Retrieve the number of errors for each localised field', () => {
    const errors = {
      _errors: [],
      title: {
        _errors: [],
        nl: {
          _errors: ['This field is required'],
        },
      },
      description: {
        _errors: [],
        en: {
          _errors: ['This field is required'],
        },
      },
    };

    const result = countErrorsForLocalisedFields(errors);

    expect(result).toEqual({
      nl: 1,
      en: 1,
    });
  });
});
