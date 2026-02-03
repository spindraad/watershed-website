import { ComponentConfig, Slot } from '@puckeditor/core';

export type ContainerBlockProps = {
  content: Slot;
  paddingTop?: string;
  paddingBottom?: string;
  width?: string;
};

export const ContainerBlock: ComponentConfig<ContainerBlockProps> = {
  label: 'Container',
  fields: {
    content: {
      type: 'slot',
    },
    paddingTop: {
      label: 'Padding boven',
      type: 'select',
      options: [
        { label: 'Geen', value: '' },
        { label: 'Klein', value: 'pt-4' },
        { label: 'Middel', value: 'pt-8' },
        { label: 'Groot', value: 'pt-16' },
        { label: 'Extra groot', value: 'pt-24' },
      ],
    },
    paddingBottom: {
      label: 'Padding onder',
      type: 'select',
      options: [
        { label: 'Geen', value: '' },
        { label: 'Klein', value: 'pb-4' },
        { label: 'Middel', value: 'pb-8' },
        { label: 'Groot', value: 'pb-16' },
        { label: 'Extra groot', value: 'pb-24' },
      ],
    },
    width: {
      label: 'Breedte (in px, %, em, rem)',
      type: 'text',
    },
  },
  render({ content: Content, paddingTop, paddingBottom, width }) {
    const classes = `${paddingTop ? paddingTop : ''} ${paddingBottom ? paddingBottom : ''} mx-auto`;

    return (
      <div className={classes} style={{ width: width ? width : '100%' }}>
        <Content />
      </div>
    );
  },
};
