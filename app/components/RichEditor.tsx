import { Editor } from '@tinymce/tinymce-react';

type Props = {
  /**
   * The id of the editor.
   */
  id: string;

  /**
   * The initial content of the editor.
   */
  initialValue?: string;

  /**
   * The onChange handler.
   */
  onChange: (content: string) => void;
};

export default function RichEditor({ id, initialValue, onChange }: Props) {
  return (
    <div id={`editor-${id}`} className="pointer-events-auto">
      <Editor
        id={id}
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        initialValue={initialValue}
        inline={true}
        disabled={false}
        onEditorChange={(content) => {
          onChange(content);
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
            'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
        }}
      />
    </div>
  );
}

export function Renderer({ content }: { content: string }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
