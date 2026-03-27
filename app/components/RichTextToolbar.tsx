import { useContext } from 'react';
import { Editor } from '@tiptap/react';
import { ShoelaceContext } from '~/components/shoelace';

type Props = {
  editor: Editor | null;
};

export default function RichTextToolbar({ editor }: Props) {
  const { SlButtonGroup, SlButton, SlIcon, SlTooltip } =
    useContext(ShoelaceContext);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200 bg-gray-50 rounded-t">
      <SlButtonGroup label="Text formatting">
        <SlTooltip content="Bold">
          <SlButton
            size="small"
            variant={editor.isActive('bold') ? 'primary' : 'default'}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <SlIcon name="type-bold" />
          </SlButton>
        </SlTooltip>
        <SlTooltip content="Italic">
          <SlButton
            size="small"
            variant={editor.isActive('italic') ? 'primary' : 'default'}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <SlIcon name="type-italic" />
          </SlButton>
        </SlTooltip>
        <SlTooltip content="Underline">
          <SlButton
            size="small"
            variant={editor.isActive('underline') ? 'primary' : 'default'}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <SlIcon name="type-underline" />
          </SlButton>
        </SlTooltip>
        <SlTooltip content="Strikethrough">
          <SlButton
            size="small"
            variant={editor.isActive('strike') ? 'primary' : 'default'}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <SlIcon name="type-strikethrough" />
          </SlButton>
        </SlTooltip>
      </SlButtonGroup>

      <SlButtonGroup label="Headings">
        <SlTooltip content="Heading 1">
          <SlButton
            size="small"
            variant={
              editor.isActive('heading', { level: 1 }) ? 'primary' : 'default'
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <SlIcon name="type-h1" />
          </SlButton>
        </SlTooltip>
        <SlTooltip content="Heading 2">
          <SlButton
            size="small"
            variant={
              editor.isActive('heading', { level: 2 }) ? 'primary' : 'default'
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <SlIcon name="type-h2" />
          </SlButton>
        </SlTooltip>
        <SlTooltip content="Heading 3">
          <SlButton
            size="small"
            variant={
              editor.isActive('heading', { level: 3 }) ? 'primary' : 'default'
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <SlIcon name="type-h3" />
          </SlButton>
        </SlTooltip>
      </SlButtonGroup>

      <SlButtonGroup label="Lists">
        <SlTooltip content="Bullet list">
          <SlButton
            size="small"
            variant={editor.isActive('bulletList') ? 'primary' : 'default'}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <SlIcon name="list-ul" />
          </SlButton>
        </SlTooltip>
        <SlTooltip content="Numbered list">
          <SlButton
            size="small"
            variant={editor.isActive('orderedList') ? 'primary' : 'default'}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <SlIcon name="list-ol" />
          </SlButton>
        </SlTooltip>
      </SlButtonGroup>

      <SlButtonGroup label="Block">
        <SlTooltip content="Blockquote">
          <SlButton
            size="small"
            variant={editor.isActive('blockquote') ? 'primary' : 'default'}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <SlIcon name="quote" />
          </SlButton>
        </SlTooltip>
        <SlTooltip content="Code block">
          <SlButton
            size="small"
            variant={editor.isActive('codeBlock') ? 'primary' : 'default'}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <SlIcon name="code" />
          </SlButton>
        </SlTooltip>
        <SlTooltip content="Horizontal rule">
          <SlButton
            size="small"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <SlIcon name="dash-lg" />
          </SlButton>
        </SlTooltip>
      </SlButtonGroup>

      <SlButtonGroup label="Link">
        <SlTooltip content="Add link">
          <SlButton
            size="small"
            variant={editor.isActive('link') ? 'primary' : 'default'}
            onClick={() => {
              const url = window.prompt('Enter URL:');
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
          >
            <SlIcon name="link-45deg" />
          </SlButton>
        </SlTooltip>
        <SlTooltip content="Remove link">
          <SlButton
            size="small"
            disabled={!editor.isActive('link')}
            onClick={() => editor.chain().focus().unsetLink().run()}
          >
            <SlIcon name="link-45deg" />
            <SlIcon name="x" />
          </SlButton>
        </SlTooltip>
      </SlButtonGroup>

      <SlButtonGroup label="Image">
        <SlTooltip content="Add image">
          <SlButton
            size="small"
            onClick={() => {
              const url = window.prompt('Enter image URL:');
              if (url) {
                editor.chain().focus().setImage({ src: url }).run();
              }
            }}
          >
            <SlIcon name="image" />
          </SlButton>
        </SlTooltip>
      </SlButtonGroup>

      <SlButtonGroup label="History">
        <SlTooltip content="Undo">
          <SlButton
            size="small"
            disabled={!editor.can().undo()}
            onClick={() => editor.chain().focus().undo().run()}
          >
            <SlIcon name="arrow-counterclockwise" />
          </SlButton>
        </SlTooltip>
        <SlTooltip content="Redo">
          <SlButton
            size="small"
            disabled={!editor.can().redo()}
            onClick={() => editor.chain().focus().redo().run()}
          >
            <SlIcon name="arrow-clockwise" />
          </SlButton>
        </SlTooltip>
      </SlButtonGroup>
    </div>
  );
}
