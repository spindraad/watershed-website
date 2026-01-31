import type { Meta, StoryObj } from '@storybook/react';
import MarkedUpText from './MarkedUpText';

export default {
  title: 'Atoms/Marked Up Text',
  component: MarkedUpText,
  tags: ['components', 'text', 'makers'],
  argTypes: {
    slant: {
      control: { type: 'select' },
      options: ['up', 'down'],
    },
  },
} satisfies Meta<typeof MarkedUpText>;

type Story = StoryObj<typeof MarkedUpText>;

export const Default: Story = {
  args: {
    children: 'Monique Hendriks',
  },
};

export const LongText: Story = {
  args: {
    children: 'This is an example of marked up text.',
  },
};
