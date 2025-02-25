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

  /**
   * Whether the editor is inline or not.
   */
  inline?: boolean;
};

export default function RichTextEditor({
  id,
  initialValue,
  onChange,
  inline,
}: Props) {
  return (
    <div id={`editor-${id}`}>
      <Editor
        id={id}
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        initialValue={initialValue}
        inline={inline}
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
