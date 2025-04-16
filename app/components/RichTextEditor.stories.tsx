import type { Meta, StoryObj } from '@storybook/react';
import RichTextEditor from 'app/components/RichTextEditor';

export default {
  title: 'Molecules/Rich Text Editor',
  component: RichTextEditor,
  tags: ['components', 'content', 'input'],
} satisfies Meta<typeof RichTextEditor>;

type Story = StoryObj<typeof RichTextEditor>;

const css = `
#editor-editor-id {
  border: 1px solid #ccc;
  border-radius: 4px;
}
`;

export const Default: Story = {
  args: {
    id: 'editor-id',
  },
  decorators: [
    (Story) => (
      <>
        <style>{css}</style>
        <div className="p-4">
          <p>Write what you want:</p>
          <Story />
        </div>
      </>
    ),
  ],
};
