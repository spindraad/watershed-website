import { Editor } from '@tinymce/tinymce-react';
// import { useTranslation } from 'react-i18next';
// import { ShoelaceContext } from '~/components/shoelace';

type Props = {
  /**
   * The initial content of the editor.
   */
  initialValue?: string;
};

export default function RichEditor({
  initialValue = '<p>This is the initial content of the editor.</p>',
}: Props) {
  // const { t } = useTranslation('RichEditor');
  // const {  } = useContext(ShoelaceContext);

  return (
    <Editor
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      licenseKey="gpl"
      initialValue={initialValue}
      init={{
        height: 500,
        menubar: false,
        inline: false, // Set to true for inline editing
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
  );
}
