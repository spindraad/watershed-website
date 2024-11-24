import { type Meta, type StoryObj } from '@storybook/react';
import Anchor from './Anchor';

export default {
  title: 'Components/Anchor',
  component: Anchor,
} satisfies Meta<typeof Anchor>;

type Story = StoryObj<typeof Anchor>;

export const Simple: Story = {
  args: {
    to: '/about-us',
    children: 'Read more about us',
  },
};
