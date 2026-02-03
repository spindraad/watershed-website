import type { Meta, StoryObj } from '@storybook/react';
import Footer from './Footer';

export default {
  title: 'Molecules/Footer',
  component: Footer,
  tags: ['components', 'misc'],
} satisfies Meta<typeof Footer>;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {},
};
