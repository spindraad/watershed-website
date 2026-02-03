import type { Field } from '@puckeditor/core';
export const illustrations = {
  'Figuur met popbeker': 'figuur met popbeker kopie.png',
  Ganzeveer: 'ganzeveer kopie.png',
  'Hak met kauwgum': 'hak met kauwgum kopie.png',
  'Mond met potlood': 'mond met potlood.png',
  'Oor in hand': 'oor in hand.png',
  'Potlood door hart': 'potlood door hart.png',
  'Vogel met potlood en nest': 'vogel met potlood en nest.png',
  'Schreeuw (geanimeerd)': 'mouth-screaming-optimized.gif',
  Kip: 'kip.png',
  'Radio Stille Willie': 'radio-stille-willie.svg',
  'De Zinnen Van Baerwaldt': 'de-zinnen-van-baerwaldt.svg',
  'Waar ik het nog ... over wil hebben': 'waar-ik-het-nog-over-wil-hebben.svg',
  'Potlood Ploeg-E (zwart-wit)': 'potlood Ploeg-E ZW.png',
} as const;

// Extract the keys as a union type
export type IllustrationKey = keyof typeof illustrations;

export const illustrationField: Field<IllustrationKey> = {
  label: 'Illustratie',
  type: 'select',
  options: Object.keys(illustrations).map((key) => ({
    label: key,
    value: key,
  })),
};

export const illustrationAltTextField: Field = {
  label: 'Alt-tekst voor illustratie',
  type: 'text',
};

export const illustrationFields = {
  illustration: illustrationField,
  illustrationAltText: illustrationAltTextField,
};
