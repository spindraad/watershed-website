import { Editor } from '@tinymce/tinymce-react';
import { useSelectedPuckBlock } from '~/hooks/useSelectedPuckBlock';

type Props = {
  /**
   * The id of the editor.
   */
  id: string;

  /**
   * The initial content of the editor.
   */
  initialValue?: string;
};

export default function RichEditor({ id, initialValue }: Props) {
  const { onChange } = useSelectedPuckBlock(id);

  return (
    <div className="pointer-events-auto">
      <Editor
        id={id}
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        initialValue={initialValue}
        inline={true}
        onEditorChange={(content) => {
          console.log('RichEditor onEditorChange', content);
          if (onChange) {
            onChange({ content });
          } else {
            console.warn('RichEditor missing onChange');
          }
        }}
        init={{
          height: 500,
          width: '100%',
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'preview',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
    </div>
  );
}

export function Renderer({ content }: { content: string }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
