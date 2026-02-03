import { ComponentConfig } from '@puckeditor/core';
import { ReactElement } from 'react';
import { iconField, IconKey } from '~/config/fields/icon';
import Icon from '~/components/Icon';

const alignmentMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const justifyMap = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};

const textColorOptions = [
  { label: 'Standaard (erft over)', value: '' },
  { label: 'Paars', value: 'text-primary-700' },
  { label: 'Paars licht', value: 'text-primary-500' },
  { label: 'Oranje', value: 'text-secondary-700' },
  { label: 'Donkergrijs', value: 'text-neutral-800' },
  { label: 'Zwart', value: 'text-neutral-1000' },
  { label: 'Wit', value: 'text-white' },
];

const textSizeMap = {
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
};

export type RichTextBlockProps = {
  content: ReactElement | string;
  alignment?: 'left' | 'center' | 'right';
  justify?: 'top' | 'center' | 'bottom';
  textColor?: string;
  textSize?: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  icon?: IconKey;
};

export const RichTextBlock: ComponentConfig<RichTextBlockProps> = {
  label: 'Rich text field',
  fields: {
    content: {
      type: 'richtext',
      contentEditable: true,
      options: {
        heading: {
          levels: [2, 3, 4, 5, 6],
        },
      },
    },
    alignment: {
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
    textSize: {
      label: 'Tekstgrootte',
      type: 'select',
      options: [
        { label: 'Klein', value: 'sm' },
        { label: 'Normaal', value: 'base' },
        { label: 'Groot', value: 'lg' },
        { label: 'Extra groot', value: 'xl' },
        { label: 'Zeer groot', value: '2xl' },
      ],
    },
    icon: iconField,
  },
  defaultProps: {
    content: '',
    alignment: 'left',
    justify: 'top',
    textColor: '',
    textSize: 'base',
  },
  render: ({
    content,
    alignment = 'left',
    justify = 'top',
    textColor,
    textSize = 'base',
    icon,
  }) => {
    const wrapperStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: alignmentMap[alignment],
      justifyContent: justifyMap[justify],
      height: '100%',
      fontSize: textSizeMap[textSize],
    };

    if (textColor) {
      wrapperStyle.color = `rgb(var(--${textColor.replace('text-', '')}))`;
    }

    let TextBlockContent: ReactElement;
    if (typeof content === 'string') {
      TextBlockContent = (
        <div
          style={wrapperStyle}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    } else {
      TextBlockContent = <div style={wrapperStyle}>{content}</div>;
    }

    return (
      <div className="flex flex-row gap-2 items-start">
        {icon ?
          <Icon name={icon} size="small" />
        : null}
        {TextBlockContent}
      </div>
    );
  },
};
