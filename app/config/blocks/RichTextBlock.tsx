import { ComponentConfig } from '@measured/puck';
import RichEditor, { Renderer } from '~/components/RichEditor';
import { useSelectedPuckBlock } from '~/hooks/useSelectedPuckBlock';

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
      return <RichTextEditor id={id} initialValue={content} />;
    }

    return <Renderer content={content} />;
  },
};

function RichTextEditor({
  id,
  initialValue,
}: {
  id: string;
  initialValue?: string;
}) {
  const { onChange } = useSelectedPuckBlock(id);

  return (
    <RichEditor
      id={id}
      initialValue={initialValue}
      onChange={(content) => {
        if (onChange) {
          onChange({ content });
        } else {
          console.warn('RichTextEditor missing onChange');
        }
      }}
    />
  );
}
