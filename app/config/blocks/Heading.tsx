import { ComponentConfig } from '@measured/puck';
import HeadingComponent, {
  Props as HeadingComponentProps,
} from '~/components/Heading';

export type Props = {
  align: 'left' | 'center' | 'right';
  text?: string;
  level?: HeadingComponentProps['level'];
  padding?: string;
};

const levelOptions = [
  { label: '', value: '' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
];

export const Heading: ComponentConfig<Props> = {
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
