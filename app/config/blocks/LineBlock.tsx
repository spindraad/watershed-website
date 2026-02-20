import { ComponentConfig } from '@puckeditor/core';
import HandDrawnLine, { DrawStyles } from '~/components/HandDrawnLine';

export type LineBlockProps = {
  style: DrawStyles;
  width?: {
    value: number;
    unit: 'px' | '%' | 'rem';
  };
  position?: 'center' | 'left' | 'right';
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
  label: 'Lijn',
  fields: {
    style: {
      type: 'select',
      options: lineStyleOptions,
    },
    width: {
      type: 'object',
      label: 'Breedte',
      objectFields: {
        value: {
          type: 'number',
          label: 'Waarde',
        },
        unit: {
          type: 'select',
          label: 'Eenheid',
          options: [
            { label: 'Rem', value: 'rem' },
            { label: 'Procenten (%)', value: '%' },
            { label: 'Pixels (px)', value: 'px' },
          ],
        },
      },
    },
    position: {
      type: 'select',
      label: 'Positie',
      options: [
        { label: 'Gecentreerd', value: 'center' },
        { label: 'Links', value: 'left' },
        { label: 'Rechts', value: 'right' },
      ],
    },
  },
  defaultProps: {
    style: 'solid-thick-1',
  },
  render({ style, width, position }) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent:
            position === 'center' ? 'center'
            : position === 'left' ? 'flex-start'
            : 'flex-end',
          width: '100%',
        }}
      >
        <HandDrawnLine
          drawStyle={style}
          width={width ? `${width.value}${width.unit}` : '100%'}
        />
      </div>
    );
  },
};
