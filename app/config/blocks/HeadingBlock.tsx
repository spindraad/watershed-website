import { type ComponentConfig } from '@puckeditor/core';
import HeadingComponent, {
  Props as HeadingComponentProps,
} from '~/components/Heading';
import Icon, { Props as IconComponentProps } from '~/components/Icon';
import HandDrawnLine, {
  Props as HandDrawnLineComponentProps,
} from '~/components/HandDrawnLine';

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

const iconOptions: { label: string; value: IconComponentProps['name'] }[] = [
  { label: 'Pijl', value: 'heading-arrow' },
  { label: 'Hart', value: 'heart' },
  { label: 'Linker pijltje', value: 'left-caret' },
  { label: 'Rechter pijltje', value: 'right-caret' },
  { label: 'Linker pijltje gekleurd', value: 'left-caret-color-filled' },
  { label: 'Rechter pijltje gekleurd', value: 'right-caret-color-filled' },
  { label: 'Wijzer', value: 'pointer' },
  { label: 'Ster', value: 'star' },
];

const lineOptions: {
  label: string;
  value: HandDrawnLineComponentProps['drawStyle'];
}[] = [
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

export type Props = {
  align: 'left' | 'center' | 'right';
  justify?: 'top' | 'center' | 'bottom';
  text?: string;
  level?: HeadingComponentProps['level'];
  padding?: string;
  textColor?: string;
  icon?: string;
  underline?: string;
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
    icon: {
      label: 'Icon (optioneel)',
      type: 'select',
      options: [{ label: 'Geen', value: '' }, ...iconOptions],
    },
    underline: {
      label: 'Onderstreping (optioneel)',
      type: 'select',
      options: [{ label: 'Geen', value: '' }, ...lineOptions],
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
    icon,
    underline,
  }) {
    return (
      <div
        className="flex flex-col h-full"
        style={{
          alignItems: alignmentMap[align],
          justifyContent: justifyMap[justify],
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <HeadingComponent level={level} colorClass={textColor}>
            {text}
          </HeadingComponent>
          {icon ?
            <Icon name={icon as IconComponentProps['name']} />
          : null}
        </div>
        <div className="w-48">
          {underline ?
            <HandDrawnLine
              drawStyle={underline as HandDrawnLineComponentProps['drawStyle']}
            />
          : null}
        </div>
      </div>
    );
  },
};
