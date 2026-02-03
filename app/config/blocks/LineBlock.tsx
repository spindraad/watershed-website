import { ComponentConfig } from '@puckeditor/core';
import HandDrawnLine, { DrawStyles } from '~/components/HandDrawnLine';

export type LineBlockProps = {
  style: DrawStyles;
};

const lineStyleOptions: { label: string; value: DrawStyles }[] = [
  { label: 'Solid Thick 1', value: 'solid-thick-1' },
  { label: 'Solid Thick 2', value: 'solid-thick-2' },
  { label: 'Solid Thick 3', value: 'solid-thick-3' },
  { label: 'Solid Thin 1', value: 'solid-thin-1' },
  { label: 'Solid Thin 2', value: 'solid-thin-2' },
  { label: 'Twirly Small', value: 'twirly-small' },
  { label: 'Twirly Large', value: 'twirly-large' },
  { label: 'Wonky', value: 'wonky' },
  { label: 'Zigzag Thin', value: 'zigzag-thin' },
  { label: 'Zigzag Thick', value: 'zigzag-thick' },
];

export const LineBlock: ComponentConfig<LineBlockProps> = {
  fields: {
    style: {
      type: 'select',
      options: lineStyleOptions,
    },
  },
  render({ style }) {
    return <HandDrawnLine drawStyle={style} />;
  },
};
