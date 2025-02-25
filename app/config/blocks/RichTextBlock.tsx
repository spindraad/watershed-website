import { ComponentConfig } from '@measured/puck';
import RichEditor, { Renderer } from '~/components/RichEditor';

export type RichTextBlockProps = {
  content: string;
};

export const RichTextBlock: ComponentConfig<RichTextBlockProps> = {
  fields: {
    content: {
      type: 'custom',
      render: () => <></>,
    },
  },
  render({ content, id, puck }) {
    if (puck.isEditing) {
      return <RichEditor id={id} initialValue={content} />;
    }

    return <Renderer content={content} />;
  },
};
