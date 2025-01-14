import type { Meta, StoryObj } from '@storybook/react';
import RichEditor from './RichEditor';

export default {
  title: 'Components/Rich Text Editor',
  component: RichEditor,
} satisfies Meta<typeof RichEditor>;

type Story = StoryObj<typeof RichEditor>;

export const Default: Story = {
  args: {},
};
