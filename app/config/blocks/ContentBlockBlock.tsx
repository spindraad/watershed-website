import { ComponentConfig } from '@puckeditor/core';
import ContentBlock, {
  Props as ContentBlockProps,
} from '~/components/ContentBlock';
import { iconField, IconKey } from '~/config/fields/icon';

export type ContentBlockBlockProps = Omit<
  ContentBlockProps,
  'preIconName' | 'postIconName'
> & {
  preIconName?: IconKey;
  postIconName?: IconKey;
};
export const ContentBlockBlock: ComponentConfig<ContentBlockBlockProps> = {
  label: 'Content blok',
  fields: {
    title: {
      type: 'text',
      label: 'Titel',
    },
    body: {
      type: 'richtext',
      label: 'Inhoud',
    },
    preIconName: iconField,
    postIconName: iconField,
    underline: {
      type: 'select',
      label: 'Onderstreping',
      options: [
        { label: 'Geen', value: undefined },
        { label: 'Wonky', value: 'wonky' },
        { label: 'Straight', value: 'straight' },
        { label: 'Dotted', value: 'dotted' },
      ],
    },
  },
  defaultProps: {
    title: 'Nieuw content blok',
    body: `<p>Hier komt tekst</p>`,
  },
  render: (props) => {
    if (!props.title && !props.body) {
      return <></>;
    }

    return <ContentBlock {...props} />;
  },
};
