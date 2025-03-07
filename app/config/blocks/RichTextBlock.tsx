import { ComponentConfig } from '@measured/puck';
import RichTextEditor from '~/components/RichTextEditor';
import { useSelectedPuckBlock } from '~/hooks/useSelectedPuckBlock';

export type RichTextBlockProps = {
  content: string;
};

export const RichTextBlock: ComponentConfig<RichTextBlockProps> = {
  label: 'Rich text field',
  fields: {
    content: {
      type: 'custom',
      render: () => <></>,
    },
  },
  render({ content, id, puck }) {
    if (puck.isEditing) {
      return <RichTextEditorWrapper id={id} initialValue={content} />;
    }

    return <RichTextRenderer content={content} />;
  },
};

function RichTextEditorWrapper({
  id,
  initialValue,
}: {
  id: string;
  initialValue?: string;
}) {
  const { onChange } = useSelectedPuckBlock(id);

  return (
    <div className="puck-rich-text-editor-wrapper">
      <RichTextEditor
        id={id}
        initialValue={initialValue}
        inline={true}
        onChange={(content) => {
          if (onChange) {
            onChange({ content });
          } else {
            console.warn('RichTextEditor missing onChange');
          }
        }}
      />
    </div>
  );
}

function RichTextRenderer({ content }: { content: string }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
