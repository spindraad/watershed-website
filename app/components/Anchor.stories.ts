import { type Meta, type StoryObj } from '@storybook/react';
import Anchor from './Anchor';

export default {
  title: 'Atoms/Anchor',
  component: Anchor,
  tags: ['components', 'navigation'],
} satisfies Meta<typeof Anchor>;

type Story = StoryObj<typeof Anchor>;

export const Simple: Story = {
  args: {
    to: '/about-us',
    children: 'Read more about us',
  },
};
