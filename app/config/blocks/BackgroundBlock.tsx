import { ComponentConfig, Slot } from '@puckeditor/core';
import { ColorField, colorField, getColorHex } from '~/config/fields/color';
import { columnField, ColumnFieldOptions } from '~/config/fields/column';

export type BackgroundBlockProps = {
  color?: ColorField;
  content: Slot;
  column?: ColumnFieldOptions;
};

export const BackgroundBlock: ComponentConfig<BackgroundBlockProps> = {
  label: 'Achtergrond',
  fields: {
    color: colorField,
    content: {
      type: 'slot',
    },
    column: columnField,
  },
  defaultProps: {
    color: 'light-yellow',
    content: [],
    column: 'content',
  },
  render({ color, content: Content, column }) {
    const backgroundColor = color ? getColorHex(color) : '#FFFFFF';

    return (
      <div
        className={`${column ?? ''} relative`}
        style={{ backgroundColor: backgroundColor, padding: '1rem' }}
      >
        <Content />
      </div>
    );
  },
};
