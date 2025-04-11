import { Meta, StoryObj } from '@storybook/react';
import Logo from './Logo';

export default {
  title: 'Atoms/Logo',
  component: Logo,
  tags: ['components', 'navigation'],
} satisfies Meta<typeof Logo>;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {},
};
