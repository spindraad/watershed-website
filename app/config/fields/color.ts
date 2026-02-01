import type { Field } from '@puckeditor/core';

export type ColorField =
  | 'light-yellow'
  | 'bright-yellow'
  | 'pink'
  | 'dark-pink';

export const colorField: Field = {
  type: 'select',
  options: [
    { label: 'Lichtgeel', value: 'light-yellow' },
    { label: 'Fel geel', value: 'bright-yellow' },
    { label: 'Licht roze', value: 'pink' },
    { label: 'Donker roze', value: 'dark-pink' },
  ],
};

export function getColorHex(color: ColorField): string {
  switch (color) {
    case 'light-yellow':
      return '#FFF9E5';
    case 'bright-yellow':
      return '#FFEB3B';
    case 'pink':
      return '#FFC0CB';
    case 'dark-pink':
      return '#FF6767';
    default:
      return '#FFFFFF';
  }
}
