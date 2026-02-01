import { type ComponentConfig } from '@puckeditor/core';
import HeadingComponent, {
  Props as HeadingComponentProps,
} from '~/components/Heading';

const alignmentMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};
const justifyMap = { top: 'flex-start', center: 'center', bottom: 'flex-end' };

const textColorOptions = [
  { label: 'Paars (standaard)', value: 'text-primary-700' },
  { label: 'Paars licht', value: 'text-primary-500' },
  { label: 'Oranje', value: 'text-secondary-700' },
  { label: 'Donkergrijs', value: 'text-neutral-800' },
  { label: 'Zwart', value: 'text-neutral-1000' },
  { label: 'Wit', value: 'text-white' },
];

export type Props = {
  align: 'left' | 'center' | 'right';
  justify?: 'top' | 'center' | 'bottom';
  text?: string;
  level?: HeadingComponentProps['level'];
  padding?: string;
  textColor?: string;
};

// Since the page title is always level 1, we start at level 2.
const levelOptions = [
  { label: '', value: '' },
  { label: '1', value: 2 },
  { label: '2', value: 3 },
  { label: '3', value: 4 },
  { label: '4', value: 5 },
];

export const HeadingBlock: ComponentConfig<Props> = {
  label: 'Heading',
  fields: {
    text: {
      type: 'textarea',
    },
    level: {
      type: 'select',
      options: levelOptions,
    },
    align: {
      label: 'Horizontale uitlijning',
      type: 'radio',
      options: [
        { label: 'Links', value: 'left' },
        { label: 'Midden', value: 'center' },
        { label: 'Rechts', value: 'right' },
      ],
    },
    justify: {
      label: 'Verticale uitlijning',
      type: 'radio',
      options: [
        { label: 'Boven', value: 'top' },
        { label: 'Midden', value: 'center' },
        { label: 'Onder', value: 'bottom' },
      ],
    },
    textColor: {
      label: 'Tekstkleur',
      type: 'select',
      options: textColorOptions,
    },
  },
  defaultProps: {
    align: 'left',
    justify: 'top',
    text: 'Mijn koptekst',
    level: 2,
    textColor: 'text-primary-700',
  },
  render({
    text = '',
    level = 2,
    align = 'left',
    justify = 'top',
    textColor = 'text-primary-700',
  }) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: alignmentMap[align],
          justifyContent: justifyMap[justify],
          height: '100%',
        }}
      >
        <HeadingComponent level={level} colorClass={textColor}>
          {text}
        </HeadingComponent>
      </div>
    );
  },
};
