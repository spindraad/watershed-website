import type { Field } from '@puckeditor/core';

export type ColumnFieldOptions = 'content' | 'popout' | 'feature' | 'full';

export const columnField: Field = {
  type: 'select',
  options: [
    { label: 'Content', value: 'content' },
    { label: 'Pop-out', value: 'popout' },
    { label: 'Feature', value: 'feature' },
    { label: 'Full', value: 'full' },
  ],
};
