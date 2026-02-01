import { ComponentConfig } from '@puckeditor/core';

export type SpacingBlockProps = {
  height?: string;
};

export const SpacingBlock: ComponentConfig<SpacingBlockProps> = {
  label: 'Spacing',
  fields: {
    height: {
      label: 'Hoogte (in px, %, em, rem)',
      type: 'text',
    },
  },
  render({ height, editMode }) {
    const classes = `
      w-full
      ${editMode ? 'border-8 border-dashed border-gray-400 grid place-content-center' : ''}
    `;
    return (
      <div className={classes} style={{ height }}>
        {editMode ? 'Pas mijn hoogte aan' : null}
      </div>
    );
  },
};
