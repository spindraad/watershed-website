import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import RichTextToolbar from '~/components/RichTextToolbar';

type Props = {
  /**
   * The id of the editor.
   */
  id: string;

  /**
   * The initial content of the editor (HTML string).
   */
  initialValue?: string;

  /**
   * The onChange handler.
   */
  onChange?: (content: string) => void;

  /**
   * Placeholder text when editor is empty.
   */
  placeholder?: string;

  /**
   * Whether to show the toolbar.
   */
  showToolbar?: boolean;

  /**
   * Custom class name for the editor container.
   */
  className?: string;
};

export default function RichTextEditor({
  id,
  initialValue = '',
  onChange,
  showToolbar = true,
  className = '',
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto',
        },
      }),
      Underline,
    ],
    content: initialValue,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose max-w-none focus:outline-none min-h-[200px] p-4',
      },
    },
    immediatelyRender: false,
  });

  return (
    <div
      id={`editor-${id}`}
      className={`border border-gray-300 rounded overflow-hidden bg-white ${className}`}
    >
      {showToolbar && <RichTextToolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
