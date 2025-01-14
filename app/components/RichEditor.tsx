import { Editor } from '@tinymce/tinymce-react';
// import { useTranslation } from 'react-i18next';
// import { ShoelaceContext } from '~/components/shoelace';

type Props = {
  /**
   * The initial content of the editor.
   */
  initialValue?: string;

  /**
   * Whether the editor is allows its content to be edited.
   */
  isEditable?: boolean;
};

export default function RichEditor({
  initialValue = '<p>This is the initial content of the editor.</p>',
  isEditable,
}: Props) {
  // const { t } = useTranslation('RichEditor');
  // const {  } = useContext(ShoelaceContext);

  return (
    <div className="pointer-events-auto">
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        initialValue={initialValue}
        init={{
          height: 500,
          menubar: false,
          inline: isEditable, // Set to true for inline editing
          disabled: !isEditable,
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
