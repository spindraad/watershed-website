import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Editor from 'app/components/Editor';

export default {
  title: 'Components/Editor',
  component: Editor,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Editor>;

type Story = StoryObj<typeof Editor>;

export const Default: Story = {
  args: {
    data: {
      content: [],
      root: {},
    },
    onPublish: fn(),
  },
};
