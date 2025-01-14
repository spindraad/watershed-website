import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import PageEditor from '~/components/PageEditor';

export default {
  title: 'Components/Page Editor',
  component: PageEditor,
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
} satisfies Meta<typeof PageEditor>;

type Story = StoryObj<typeof PageEditor>;

export const Default: Story = {
  args: {
    data: {
      content: [],
      root: {},
    },
    onPublish: fn(),
  },
};
