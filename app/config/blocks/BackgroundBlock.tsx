import { ComponentConfig, Slot } from '@puckeditor/core';
import { ColorField, colorField, getColorHex } from '~/config/fields/color';

export type BackgroundBlockProps = {
  color?: ColorField;
  content: Slot;
};

export const BackgroundBlock: ComponentConfig<BackgroundBlockProps> = {
  label: 'Achtergrond',
  fields: {
    color: colorField,
    content: {
      type: 'slot',
    },
  },
  defaultProps: {
    color: 'light-yellow',
    content: [],
  },
  render({ color, content: Content }) {
    const backgroundColor = color ? getColorHex(color) : '#FFFFFF';

    return (
      <div
        className="relative"
        style={{ backgroundColor: backgroundColor, padding: '1rem' }}
      >
        <Content />
      </div>
    );
  },
};
