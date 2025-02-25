import type { Meta, StoryObj } from '@storybook/react';
import RichEditor from './RichEditor';

export default {
  title: 'Components/Rich Text Editor',
  component: RichEditor,
} satisfies Meta<typeof RichEditor>;

type Story = StoryObj<typeof RichEditor>;

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
