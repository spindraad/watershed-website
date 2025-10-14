import type { Meta, StoryObj } from '@storybook/react';
import Loader from './Loader';

export default {
  title: 'Atoms/Loader',
  component: Loader,
  tags: ['components', 'misc'],
} satisfies Meta<typeof Loader>;

type Story = StoryObj<typeof Loader>;

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};
