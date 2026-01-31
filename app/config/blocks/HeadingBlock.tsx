import { type ComponentConfig } from '@puckeditor/core';
import HeadingComponent, {
  Props as HeadingComponentProps,
} from '~/components/Heading';

export type Props = {
  align: 'left' | 'center' | 'right';
  text?: string;
  level?: HeadingComponentProps['level'];
  padding?: string;
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
      type: 'radio',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
  },
  defaultProps: {
    align: 'left',
    text: 'Mijn koptekst',
    level: 2,
  },
  render({ text = '', level = 2 }) {
    return <HeadingComponent level={level}>{text}</HeadingComponent>;
  },
};
