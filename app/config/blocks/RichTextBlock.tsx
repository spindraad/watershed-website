import { ComponentConfig } from '@puckeditor/core';
import { ReactElement } from 'react';

export type RichTextBlockProps = {
  content: ReactElement | string;
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
  },
  render: ({ content }) => {
    if (typeof content === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return content;
  },
};
