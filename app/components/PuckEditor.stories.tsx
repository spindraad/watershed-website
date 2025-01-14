import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import PuckEditor from './PuckEditor';

export default {
  title: 'Components/Puck Editor',
  component: PuckEditor,
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
} satisfies Meta<typeof PuckEditor>;

type Story = StoryObj<typeof PuckEditor>;

export const Default: Story = {
  args: {
    data: {
      content: [],
      root: {},
    },
    onPublish: fn(),
  },
};
