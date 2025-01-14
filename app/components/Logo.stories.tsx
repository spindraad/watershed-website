import { Meta, StoryObj } from '@storybook/react';
import Logo from './Logo';

export default {
  title: 'Components/Logo',
  component: Logo,
} satisfies Meta<typeof Logo>;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {},
};
